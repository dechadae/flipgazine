import postgres from 'npm:postgres@3.4.7';
import { MAX_BROAD_WIDEN, MIN_POOL, resolve } from './router-v124.mjs';

const dbUrl = Deno.env.get('SUPABASE_DB_URL');
if (!dbUrl) throw new Error('SUPABASE_DB_URL is required');
const sql = postgres(dbUrl, { prepare: false, max: 2, idle_timeout: 20, connect_timeout: 10 });

const ALLOWED_ORIGINS = new Set(['https://flipgazine.pages.dev']);
const BASE_HEADERS: Record<string,string> = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store, private, max-age=0',
  pragma: 'no-cache',
  expires: '0',
  'x-content-type-options': 'nosniff',
};

type Claims = { sub: string; session_id: string; role?: string };

function corsHeaders(req: Request) {
  const origin = req.headers.get('origin') || '';
  if (!origin || !ALLOWED_ORIGINS.has(origin)) return {};
  return {
    'access-control-allow-origin': origin,
    'access-control-allow-headers': 'authorization, apikey, content-type, x-client-info',
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-max-age': '600',
    vary: 'Origin',
  };
}

function json(req: Request, body: unknown, status = 200, extra: Record<string,string> = {}) {
  return new Response(JSON.stringify(body), { status, headers: { ...BASE_HEADERS, ...corsHeaders(req), ...extra } });
}

function decodeBase64Url(input: string) {
  const base64 = input.replace(/-/g,'+').replace(/_/g,'/') + '='.repeat((4 - input.length % 4) % 4);
  return atob(base64);
}

function verifiedClaims(req: Request): Claims | null {
  const header = req.headers.get('authorization') || '';
  const m = header.match(/^Bearer\s+([^\s]+)$/i);
  if (!m) return null;
  const parts = m[1].split('.');
  if (parts.length !== 3) return null;
  try {
    const claims = JSON.parse(decodeBase64Url(parts[1]));
    if (!claims || typeof claims.sub !== 'string' || typeof claims.session_id !== 'string') return null;
    return { sub: claims.sub, session_id: claims.session_id, role: claims.role };
  } catch (_) {
    return null;
  }
}

async function withAdmin<T>(claims: Claims, fn: (tx: any, actor: string) => Promise<T>): Promise<{kind:'ok',value:T}|{kind:'unauthorized'}|{kind:'forbidden'}> {
  return await sql.begin(async (tx) => {
    const active = await tx`
      select exists(
        select 1
        from auth.users u
        join auth.sessions s on s.user_id=u.id
        where u.id=${claims.sub}::uuid
          and s.id=${claims.session_id}::uuid
          and u.deleted_at is null
          and (u.banned_until is null or u.banned_until<=pg_catalog.now())
          and (s.not_after is null or s.not_after>pg_catalog.now())
      ) as ok
    `;
    if (!active?.[0]?.ok) return { kind: 'unauthorized' } as const;
    await tx`select pg_catalog.set_config('request.jwt.claim.sub', ${claims.sub}, true)`;
    const admin = await tx`select public.is_fg_admin() as ok`;
    if (!admin?.[0]?.ok) return { kind: 'forbidden' } as const;
    return { kind: 'ok', value: await fn(tx, claims.sub) } as const;
  });
}

function seeded(seed: number) {
  let x = (seed >>> 0) || 1;
  return () => {
    x += 0x6D2B79F5;
    let t = x;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

async function loadAdmin(tx: any) {
  const revRows = await tx`
    select r.revision,r.parent_revision,r.active_answer_count,r.max_answer_id,r.corpus_md5,r.index_md5,r.created_at,
           a.dictionary_json
    from private.answer_corpus_revisions r
    join private.answer_routing_assets a on a.corpus_revision=r.revision
    order by r.revision desc limit 1
  `;
  if (!revRows.length) throw new Error('current corpus revision missing');
  const answers = await tx`
    select answer_id,thai,english,topics,focus,support,helpers,is_universal
    from private.answers where active order by answer_id
  `;
  const settings = await tx`
    select setting_key,value from private.answer_settings
    where setting_key in ('admin_allowed_topics','admin_allowed_helpers')
  `;
  const semantic: Record<string,unknown> = {};
  for (const row of settings) semantic[row.setting_key] = row.value;
  const r = revRows[0];
  return {
    revision: Number(r.revision),
    parent_revision: r.parent_revision == null ? null : Number(r.parent_revision),
    active_answer_count: Number(r.active_answer_count),
    max_answer_id: Number(r.max_answer_id),
    corpus_md5: r.corpus_md5,
    index_md5: r.index_md5,
    created_at: r.created_at,
    dictionary: r.dictionary_json,
    allowed_topics: semantic.admin_allowed_topics || [],
    allowed_helpers: semantic.admin_allowed_helpers || [],
    answers: answers.map((a:any)=>({
      answer_id:Number(a.answer_id),thai:a.thai,english:a.english,topics:a.topics||[],focus:a.focus||[],support:a.support||[],helpers:a.helpers||[],is_universal:!!a.is_universal,
    })),
  };
}

async function saveAdmin(tx: any, actor: string, body: any) {
  const expected = Number(body?.expected_revision);
  if (!Number.isInteger(expected) || expected < 1) return { status:'invalid', error:'invalid_revision' };
  if (!Array.isArray(body?.answers)) return { status:'invalid', error:'invalid_answers' };
  const rows = await tx`select private.answer_admin_save_guarded(${expected}::bigint,${actor}::uuid,${sql.json(body.answers)}::jsonb) as result`;
  return rows?.[0]?.result || { status:'error' };
}

async function auditAdmin(tx: any, body: any) {
  const question = typeof body?.question === 'string' ? body.question : '';
  if (!question.trim()) return { status:'invalid', error:'question_required' };
  if (question.length > 500) return { status:'invalid', error:'question_too_long' };
  const rows = await tx`
    select r.revision,a.dictionary_json,a.index_json
    from private.answer_corpus_revisions r
    join private.answer_routing_assets a on a.corpus_revision=r.revision
    order by r.revision desc limit 1
  `;
  if (!rows.length) throw new Error('routing assets missing');
  const seed = Number.isInteger(body?.seed) ? Number(body.seed) : 1;
  const r = resolve(question, rows[0].dictionary_json, rows[0].index_json, [], {
    rng: seeded(seed), minPool: MIN_POOL, maxBroadWiden: MAX_BROAD_WIDEN,
  });
  return {
    status:'ok', revision:Number(rows[0].revision), seed,
    parsed:r.parsed, selectedTier:r.selectedTier, basePool:r.basePool,
    supportKeys:r.supportKeys, supportAdds:r.supportAdds, pool:r.pool,
    eligible:r.eligible, universalAdds:r.universalAdds, pick:r.pick,
    widened:r.widened, small:r.small, fallback:r.fallback,
    probability:r.probability, minPool:r.minPool, maxBroadWiden:r.maxBroadWiden,
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    const origin = req.headers.get('origin') || '';
    if (!ALLOWED_ORIGINS.has(origin)) return new Response(null,{status:403,headers:BASE_HEADERS});
    return new Response(null,{status:204,headers:{...BASE_HEADERS,...corsHeaders(req)}});
  }
  if (req.method !== 'POST') return json(req,{error:'method_not_allowed'},405,{allow:'POST, OPTIONS'});
  const origin = req.headers.get('origin');
  if (origin && !ALLOWED_ORIGINS.has(origin)) return json(req,{error:'forbidden'},403);

  const claims = verifiedClaims(req);
  if (!claims) return json(req,{error:'unauthorized'},401);
  let body:any;
  try { body = await req.json(); } catch (_) { return json(req,{error:'invalid_json'},400); }
  const action = body?.action;

  try {
    const result = await withAdmin(claims, async (tx, actor) => {
      if (action === 'load') return await loadAdmin(tx);
      if (action === 'save') return await saveAdmin(tx,actor,body);
      if (action === 'audit') return await auditAdmin(tx,body);
      return { status:'invalid', error:'unknown_action' };
    });
    if (result.kind === 'unauthorized') return json(req,{error:'unauthorized'},401);
    if (result.kind === 'forbidden') return json(req,{error:'forbidden'},403);
    const value:any = result.value;
    if (value?.status === 'conflict') return json(req,value,409);
    if (value?.status === 'busy') return json(req,value,409,{'retry-after':String(value.retry_after||1)});
    if (value?.status === 'invalid') return json(req,value,422);
    return json(req,value,200);
  } catch (error) {
    console.error('answers-admin-service error', error instanceof Error ? error.message : 'unknown');
    return json(req,{error:'service_unavailable'},503);
  }
});
