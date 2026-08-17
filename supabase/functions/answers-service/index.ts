import postgres from 'npm:postgres@3.4.7';
import {
  chooseAnswer,
  MAX_BROAD_WIDEN,
  MIN_POOL,
  RECENT_LIMIT,
  ROUTER_VERSION,
  SOURCE_FINGERPRINTS,
} from './router-v124.mjs';

const COOKIE_NAME = 'fg_ans_sid';
const OPAQUE_RE = /^[A-Za-z0-9_-]{43}$/;
const FROZEN_REVISION = 124;
const FROZEN_ANSWER_COUNT = 948;

const dbUrl = Deno.env.get('SUPABASE_DB_URL');
if (!dbUrl) throw new Error('SUPABASE_DB_URL is required');

// Edge/serverless traffic uses transaction pooling. Prepared statements must be
// disabled for Supavisor transaction mode.
const sql = postgres(dbUrl, {
  prepare: false,
  max: 2,
  idle_timeout: 20,
  connect_timeout: 10,
});

const BASE_HEADERS: Record<string, string> = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store, private, max-age=0',
  pragma: 'no-cache',
  expires: '0',
  vary: 'Cookie',
};

function responseJson(body: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...BASE_HEADERS, ...extraHeaders },
  });
}

function secureEqual(a: string, b: string) {
  const aa = new TextEncoder().encode(a);
  const bb = new TextEncoder().encode(b);
  if (aa.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < aa.length; i++) diff |= aa[i] ^ bb[i];
  return diff === 0;
}

function configuredSecretKeys() {
  const keys: string[] = [];
  const raw = Deno.env.get('SUPABASE_SECRET_KEYS');
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        for (const value of Object.values(parsed)) {
          if (typeof value === 'string' && value) keys.push(value);
        }
      }
    } catch (_) {
      // Misconfigured secret JSON must fail closed below.
    }
  }
  const legacy = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (legacy) keys.push(legacy);
  return [...new Set(keys)];
}

function isAuthorized(req: Request) {
  const presented = req.headers.get('apikey') || '';
  if (!presented) return false;
  return configuredSecretKeys().some((key) => secureEqual(presented, key));
}

function parseCookie(header: string | null, name: string) {
  if (!header) return null;
  for (const part of header.split(';')) {
    const at = part.indexOf('=');
    if (at < 0) continue;
    const key = part.slice(0, at).trim();
    if (key !== name) continue;
    return part.slice(at + 1).trim();
  }
  return null;
}

function opaqueRandom32() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

async function sha256Hex(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));
  return Array.from(digest, (x) => x.toString(16).padStart(2, '0')).join('');
}

function sessionCookie(rawSid: string) {
  // Session cookie deliberately has no Max-Age/Expires. v124 recentAnswers is
  // in-memory only; this avoids turning routing history into durable tracking.
  return `${COOKIE_NAME}=${rawSid}; Path=/; HttpOnly; Secure; SameSite=Lax`;
}

function numericSetting(rows: any[], key: string, fallback: number) {
  const row = rows.find((x) => x.setting_key === key);
  const n = Number(row?.value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

async function loadSettings(tx: any) {
  const rows = await tx`
    select setting_key, value
    from private.answer_settings
    where setting_key in (
      'prepare_token_ttl_seconds',
      'request_retention_seconds',
      'session_idle_ttl_seconds',
      'min_pool',
      'max_broad_widen',
      'recent_limit'
    )
  `;
  return {
    tokenTtl: numericSetting(rows, 'prepare_token_ttl_seconds', 120),
    requestRetention: numericSetting(rows, 'request_retention_seconds', 86400),
    sessionRetention: numericSetting(rows, 'session_idle_ttl_seconds', 86400),
    minPool: numericSetting(rows, 'min_pool', MIN_POOL),
    maxBroadWiden: numericSetting(rows, 'max_broad_widen', MAX_BROAD_WIDEN),
    recentLimit: numericSetting(rows, 'recent_limit', RECENT_LIMIT),
  };
}

async function opportunisticCleanup(tx: any, requestRetention: number, sessionRetention: number) {
  await tx`
    delete from private.answer_requests
    where (revealed_at is null and expires_at <= now())
       or (revealed_at is not null and revealed_at < now() - (${requestRetention} * interval '1 second'))
  `;
  await tx`
    delete from private.answer_sessions s
    where s.last_seen_at < now() - (${sessionRetention} * interval '1 second')
      and not exists (
        select 1
        from private.answer_requests r
        where r.session_hash = s.session_hash
          and r.revealed_at is null
          and r.expires_at > now()
      )
  `;
}

async function prepare(req: Request, body: any) {
  const question = typeof body?.question === 'string' ? body.question : '';
  if (!question.trim()) return responseJson({ error: 'question_required' }, 400);

  let rawSid = parseCookie(req.headers.get('cookie'), COOKIE_NAME);
  let createdSessionCookie = false;
  if (!rawSid || !OPAQUE_RE.test(rawSid)) {
    rawSid = opaqueRandom32();
    createdSessionCookie = true;
  }
  const sessionHash = await sha256Hex(rawSid);
  const requestToken = opaqueRandom32();
  const tokenHash = await sha256Hex(requestToken);

  const prepared = await sql.begin(async (tx: any) => {
    const settings = await loadSettings(tx);
    if (settings.recentLimit !== RECENT_LIMIT) throw new Error('recent_limit drift');
    await opportunisticCleanup(tx, settings.requestRetention, settings.sessionRetention);

    const sessions = await tx`
      insert into private.answer_sessions(session_hash, recent_revealed_answer_ids, created_at, last_seen_at)
      values (${sessionHash}, '{}'::integer[], now(), now())
      on conflict (session_hash) do update
        set last_seen_at = now()
      returning recent_revealed_answer_ids
    `;
    const recent = Array.isArray(sessions[0]?.recent_revealed_answer_ids)
      ? sessions[0].recent_revealed_answer_ids.map(Number)
      : [];

    const assets = await tx`
      select corpus_revision, router_version, dictionary_json, index_json, source_controller_md5
      from private.answer_routing_assets
      where corpus_revision = ${FROZEN_REVISION}
      limit 1
    `;
    if (!assets.length) throw new Error('frozen routing assets missing');
    const asset = assets[0];
    if (asset.router_version !== ROUTER_VERSION) throw new Error('router version drift');
    if (asset.source_controller_md5 !== SOURCE_FINGERPRINTS.sourceControllerMd5) {
      throw new Error('routing source drift');
    }

    const chosen = chooseAnswer(
      question,
      asset.dictionary_json,
      asset.index_json,
      recent,
      {
        minPool: settings.minPool,
        maxBroadWiden: settings.maxBroadWiden,
        answerCount: FROZEN_ANSWER_COUNT,
      },
    );

    if (chosen.care) {
      const thai = String(chosen.answer?.thai || '');
      const english = String(chosen.answer?.english || '');
      if (!thai || !english) throw new Error('CARE payload missing');
      await tx`
        insert into private.answer_requests(
          token_hash, session_hash, answer_id, response_kind,
          care_thai, care_english, created_at, expires_at, revealed_at,
          corpus_revision, router_version
        ) values (
          ${tokenHash}, ${sessionHash}, null, 'care',
          ${thai}, ${english}, now(), now() + (${settings.tokenTtl} * interval '1 second'), null,
          ${asset.corpus_revision}, ${asset.router_version}
        )
      `;
    } else {
      const answerId = Number(chosen.id);
      if (!Number.isInteger(answerId) || answerId < 1 || answerId > FROZEN_ANSWER_COUNT) {
        throw new Error('normal answer selection invalid');
      }
      await tx`
        insert into private.answer_requests(
          token_hash, session_hash, answer_id, response_kind,
          care_thai, care_english, created_at, expires_at, revealed_at,
          corpus_revision, router_version
        ) values (
          ${tokenHash}, ${sessionHash}, ${answerId}, 'normal',
          null, null, now(), now() + (${settings.tokenTtl} * interval '1 second'), null,
          ${asset.corpus_revision}, ${asset.router_version}
        )
      `;
    }

    return { expiresIn: settings.tokenTtl };
  });

  const headers = createdSessionCookie ? { 'set-cookie': sessionCookie(rawSid) } : {};
  return responseJson(
    { request_token: requestToken, expires_in: prepared.expiresIn },
    200,
    headers,
  );
}

async function reveal(req: Request, body: any) {
  const requestToken = typeof body?.request_token === 'string' ? body.request_token : '';
  const rawSid = parseCookie(req.headers.get('cookie'), COOKIE_NAME);
  if (!OPAQUE_RE.test(requestToken) || !rawSid || !OPAQUE_RE.test(rawSid)) {
    return responseJson({ error: 'reveal_unavailable' }, 404);
  }

  const tokenHash = await sha256Hex(requestToken);
  const sessionHash = await sha256Hex(rawSid);

  const revealed = await sql.begin(async (tx: any) => {
    // Hard invariant: one compare-and-set consumes the token. There is no
    // SELECT-before-UPDATE race window.
    const requests = await tx`
      update private.answer_requests
      set revealed_at = now()
      where token_hash = ${tokenHash}
        and session_hash = ${sessionHash}
        and revealed_at is null
        and expires_at > now()
      returning response_kind, answer_id, care_thai, care_english
    `;
    if (!requests.length) return null;

    const prepared = requests[0];
    if (prepared.response_kind === 'care') {
      await tx`
        update private.answer_sessions
        set last_seen_at = now()
        where session_hash = ${sessionHash}
      `;
      return {
        id: null,
        thai: String(prepared.care_thai),
        english: String(prepared.care_english),
      };
    }

    const answerId = Number(prepared.answer_id);
    const answers = await tx`
      select answer_id, thai, english
      from private.answers
      where answer_id = ${answerId}
      limit 1
    `;
    if (!answers.length) throw new Error('prepared answer missing');

    // Append only after the token was successfully consumed, and keep exactly
    // the latest six normal revealed answer IDs in chronological order.
    await tx`
      update private.answer_sessions s
      set recent_revealed_answer_ids = (
            select coalesce(array_agg(last_ids.answer_id order by last_ids.ord), '{}'::integer[])
            from (
              select u.answer_id, u.ord
              from unnest(array_append(s.recent_revealed_answer_ids, ${answerId}::integer))
                   with ordinality as u(answer_id, ord)
              order by u.ord desc
              limit ${RECENT_LIMIT}
            ) as last_ids
          ),
          last_seen_at = now()
      where session_hash = ${sessionHash}
    `;

    return {
      id: Number(answers[0].answer_id),
      thai: String(answers[0].thai),
      english: String(answers[0].english),
    };
  });

  if (!revealed) return responseJson({ error: 'reveal_unavailable' }, 404);
  return responseJson(revealed);
}

Deno.serve(async (req: Request) => {
  try {
    if (!isAuthorized(req)) return responseJson({ error: 'unauthorized' }, 401);
    if (req.method !== 'POST') return responseJson({ error: 'method_not_allowed' }, 405);

    let body: any;
    try {
      body = await req.json();
    } catch (_) {
      return responseJson({ error: 'invalid_json' }, 400);
    }

    if (body?.action === 'prepare') return await prepare(req, body);
    if (body?.action === 'reveal') return await reveal(req, body);
    return responseJson({ error: 'unknown_action' }, 400);
  } catch (error) {
    // Never log the request body/question. Operational logs get only a coarse
    // error class; public callers receive no routing/database diagnostics.
    console.error('answers-service error', error instanceof Error ? error.message : 'unknown');
    return responseJson({ error: 'service_unavailable' }, 503);
  }
});
