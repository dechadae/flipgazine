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
const HEX64_RE = /^[a-f0-9]{64}$/i;
const CF_RAY_RE = /^[A-Za-z0-9-]{1,80}$/;
const MAX_QUESTION_CHARS = 500;

// The raw boundary key remains encrypted in Cloudflare. This verifier is a
// non-secret SHA-256 fingerprint and removes one cold Edge→Postgres round trip.
const CLOUDFLARE_SHARED_SECRET_SHA256 = '9b925d00227821d8965f0ab287cb332f5b14ffdd65f7c0091948f7aedca4936a';

const dbUrl = Deno.env.get('SUPABASE_DB_URL');
if (!dbUrl) throw new Error('SUPABASE_DB_URL is required');

// Supabase documents transaction-pool mode for Edge/serverless traffic and
// requires prepared statements to be disabled in this mode.
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

type AuthContext = {
  kind: 'cloudflare' | 'internal';
  ipHash: string | null;
  cfRay: string | null;
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
      // Misconfigured secret JSON fails closed below.
    }
  }
  const legacy = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (legacy) keys.push(legacy);
  return [...new Set(keys)];
}

function parseCookie(header: string | null, name: string) {
  if (!header) return null;
  for (const part of header.split(';')) {
    const at = part.indexOf('=');
    if (at < 0) continue;
    if (part.slice(0, at).trim() !== name) continue;
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
  // Keep v124's page-memory lifetime; do not silently turn recent history into
  // durable tracking by adding Max-Age or Expires.
  return `${COOKIE_NAME}=${rawSid}; Path=/; HttpOnly; Secure; SameSite=Lax`;
}

async function authenticate(req: Request): Promise<AuthContext | null> {
  const internalKey = req.headers.get('apikey') || '';
  if (internalKey && configuredSecretKeys().some((key) => secureEqual(internalKey, key))) {
    const candidateIp = req.headers.get('x-fg-ip-hash') || '';
    return {
      kind: 'internal',
      ipHash: HEX64_RE.test(candidateIp) ? candidateIp.toLowerCase() : null,
      cfRay: null,
    };
  }

  const edgeKey = req.headers.get('x-fg-answers-key') || '';
  if (!edgeKey) return null;
  const presentedHash = await sha256Hex(edgeKey);
  if (!secureEqual(presentedHash, CLOUDFLARE_SHARED_SECRET_SHA256)) return null;

  const ipHash = req.headers.get('x-fg-ip-hash') || '';
  if (!HEX64_RE.test(ipHash)) return null;

  const ray = req.headers.get('x-fg-cf-ray') || '';
  return {
    kind: 'cloudflare',
    ipHash: ipHash.toLowerCase(),
    cfRay: CF_RAY_RE.test(ray) ? ray : null,
  };
}

function unwrapResult(rows: any[]) {
  const result = rows?.[0]?.result;
  if (!result || typeof result !== 'object') throw new Error('database result missing');
  return result;
}

async function abortPending(sessionHash: string, tokenHash: string) {
  try {
    await sql`select private.answer_prepare_abort(${sessionHash}, ${tokenHash})`;
  } catch (_) {
    // Best-effort rollback of a reservation. It remains opaque and expires in
    // 120 seconds even if this cleanup itself cannot reach Postgres.
  }
}

async function prepare(req: Request, body: any, auth: AuthContext) {
  const question = typeof body?.question === 'string' ? body.question : '';
  if (!question.trim()) return responseJson({ error: 'question_required' }, 400);
  if (question.length > MAX_QUESTION_CHARS) return responseJson({ error: 'question_too_long' }, 413);

  let rawSid = parseCookie(req.headers.get('cookie'), COOKIE_NAME);
  let createdSessionCookie = false;
  if (!rawSid || !OPAQUE_RE.test(rawSid)) {
    rawSid = opaqueRandom32();
    createdSessionCookie = true;
  }

  const sessionHash = await sha256Hex(rawSid);
  const requestToken = opaqueRandom32();
  const tokenHash = await sha256Hex(requestToken);
  const cookieHeaders = createdSessionCookie ? { 'set-cookie': sessionCookie(rawSid) } : {};

  const claim = unwrapResult(await sql`
    select private.answer_prepare_claim_current(
      ${sessionHash}, ${tokenHash}, ${auth.ipHash}, ${auth.kind}, ${auth.cfRay},
      ${ROUTER_VERSION}, ${SOURCE_FINGERPRINTS.sourceControllerMd5}
    ) as result
  `);

  if (claim.status === 'blocked') {
    return responseJson(
      { error: 'rate_limited' },
      429,
      { ...cookieHeaders, 'retry-after': String(Number(claim.retry_after) || 60) },
    );
  }
  if (claim.status !== 'ok') throw new Error('prepare claim unavailable');

  const recent = Array.isArray(claim.recent) ? claim.recent.map(Number) : [];
  if (recent.length > RECENT_LIMIT) throw new Error('recent history drift');
  if (Number(claim.min_pool) !== MIN_POOL || Number(claim.max_broad_widen) !== MAX_BROAD_WIDEN) {
    throw new Error('router setting drift');
  }
  if (!claim.dictionary || !claim.index) throw new Error('routing assets missing');
  const maxAnswerId = Number(claim.max_answer_id);
  const activeIds = Array.isArray(claim.active_ids) ? claim.active_ids.map(Number) : [];
  const activeSet = new Set(activeIds);
  if (!Number.isInteger(maxAnswerId) || maxAnswerId < 1 || !activeIds.length) throw new Error('active corpus missing');

  let chosen: any;
  try {
    chosen = chooseAnswer(question, claim.dictionary, claim.index, recent, {
      minPool: MIN_POOL,
      maxBroadWiden: MAX_BROAD_WIDEN,
      answerCount: maxAnswerId,
      answerExists: (id: number) => activeSet.has(Number(id)),
    });

    let responseKind: 'normal' | 'care';
    let answerId: number | null = null;
    let careThai: string | null = null;
    let careEnglish: string | null = null;

    if (chosen.care) {
      responseKind = 'care';
      careThai = String(chosen.answer?.thai || '');
      careEnglish = String(chosen.answer?.english || '');
      if (!careThai || !careEnglish) throw new Error('CARE payload missing');
    } else {
      responseKind = 'normal';
      answerId = Number(chosen.id);
      if (!Number.isInteger(answerId) || !activeSet.has(answerId)) {
        throw new Error('normal answer selection invalid');
      }
    }

    const committed = unwrapResult(await sql`
      select private.answer_prepare_commit(
        ${sessionHash}, ${tokenHash}, ${responseKind}, ${answerId}, ${careThai}, ${careEnglish}
      ) as result
    `);
    if (committed.status !== 'ok') throw new Error('prepare commit unavailable');
  } catch (error) {
    await abortPending(sessionHash, tokenHash);
    throw error;
  }

  return responseJson(
    { request_token: requestToken, expires_in: Number(claim.expires_in) || 120 },
    200,
    cookieHeaders,
  );
}

async function reveal(req: Request, body: any, auth: AuthContext) {
  const requestToken = typeof body?.request_token === 'string' ? body.request_token : '';
  const rawSid = parseCookie(req.headers.get('cookie'), COOKIE_NAME);
  if (!OPAQUE_RE.test(requestToken) || !rawSid || !OPAQUE_RE.test(rawSid)) {
    return responseJson({ error: 'reveal_unavailable' }, 404);
  }

  const tokenHash = await sha256Hex(requestToken);
  const sessionHash = await sha256Hex(rawSid);
  const revealed = unwrapResult(await sql`
    select private.answer_reveal_guarded_current(
      ${sessionHash}, ${tokenHash}, ${auth.ipHash}, ${auth.kind}, ${auth.cfRay}, ${ROUTER_VERSION}
    ) as result
  `);

  if (revealed.status === 'blocked') {
    return responseJson(
      { error: 'rate_limited' },
      429,
      { 'retry-after': String(Number(revealed.retry_after) || 60) },
    );
  }
  if (revealed.status === 'unavailable') return responseJson({ error: 'reveal_unavailable' }, 404);
  if (revealed.status !== 'ok') throw new Error('reveal result invalid');

  const normal = Number.isInteger(revealed.id) && revealed.id >= 1;
  const care = revealed.id === null;
  if ((!normal && !care) || typeof revealed.thai !== 'string' || !revealed.thai || typeof revealed.english !== 'string' || !revealed.english) {
    throw new Error('reveal payload invalid');
  }

  return responseJson({ id: revealed.id, thai: revealed.thai, english: revealed.english });
}

Deno.serve(async (req: Request) => {
  try {
    const auth = await authenticate(req);
    if (!auth) return responseJson({ error: 'unauthorized' }, 401);
    if (req.method !== 'POST') return responseJson({ error: 'method_not_allowed' }, 405);

    let body: any;
    try {
      body = await req.json();
    } catch (_) {
      return responseJson({ error: 'invalid_json' }, 400);
    }

    if (body?.action === 'prepare') return await prepare(req, body, auth);
    if (body?.action === 'reveal') return await reveal(req, body, auth);
    return responseJson({ error: 'unknown_action' }, 400);
  } catch (error) {
    // Never log request bodies, questions, tokens, cookies or IP addresses.
    console.error('answers-service error', error instanceof Error ? error.message : 'unknown');
    return responseJson({ error: 'service_unavailable' }, 503);
  }
});
