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
const FROZEN_REVISION = 124;
const FROZEN_ANSWER_COUNT = 948;
const MAX_QUESTION_CHARS = 500;

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

type AuthContext = {
  kind: 'cloudflare' | 'internal';
  ipHash: string | null;
  cfRay: string | null;
};

type LimitHit = {
  error: string;
  reason: string;
  retryAfter: number;
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
  // Deliberately no Max-Age/Expires: frozen v124 recent history is page-memory
  // scoped, so the migration must not silently become durable tracking.
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
      'usage_retention_seconds',
      'min_pool',
      'max_broad_widen',
      'recent_limit',
      'prepare_session_minute_limit',
      'prepare_session_hour_limit',
      'prepare_ip_minute_limit',
      'prepare_ip_hour_limit',
      'reveal_session_minute_limit',
      'reveal_session_hour_limit',
      'reveal_ip_minute_limit',
      'reveal_ip_hour_limit',
      'reveal_distinct_session_hour_limit',
      'reveal_distinct_ip_hour_limit',
      'outstanding_token_limit'
    )
  `;
  return {
    tokenTtl: numericSetting(rows, 'prepare_token_ttl_seconds', 120),
    requestRetention: numericSetting(rows, 'request_retention_seconds', 86400),
    sessionRetention: numericSetting(rows, 'session_idle_ttl_seconds', 86400),
    usageRetention: numericSetting(rows, 'usage_retention_seconds', 604800),
    minPool: numericSetting(rows, 'min_pool', MIN_POOL),
    maxBroadWiden: numericSetting(rows, 'max_broad_widen', MAX_BROAD_WIDEN),
    recentLimit: numericSetting(rows, 'recent_limit', RECENT_LIMIT),
    prepareSessionMinute: numericSetting(rows, 'prepare_session_minute_limit', 10),
    prepareSessionHour: numericSetting(rows, 'prepare_session_hour_limit', 40),
    prepareIpMinute: numericSetting(rows, 'prepare_ip_minute_limit', 20),
    prepareIpHour: numericSetting(rows, 'prepare_ip_hour_limit', 100),
    revealSessionMinute: numericSetting(rows, 'reveal_session_minute_limit', 20),
    revealSessionHour: numericSetting(rows, 'reveal_session_hour_limit', 60),
    revealIpMinute: numericSetting(rows, 'reveal_ip_minute_limit', 40),
    revealIpHour: numericSetting(rows, 'reveal_ip_hour_limit', 120),
    distinctSessionHour: numericSetting(rows, 'reveal_distinct_session_hour_limit', 50),
    distinctIpHour: numericSetting(rows, 'reveal_distinct_ip_hour_limit', 100),
    outstandingTokens: numericSetting(rows, 'outstanding_token_limit', 3),
  };
}

async function opportunisticCleanup(
  tx: any,
  requestRetention: number,
  sessionRetention: number,
  usageRetention: number,
) {
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
  await tx`
    delete from private.answer_usage
    where occurred_at < now() - (${usageRetention} * interval '1 second')
  `;
}

async function authenticate(req: Request): Promise<AuthContext | null> {
  const internalKey = req.headers.get('apikey') || '';
  if (
    internalKey &&
    configuredSecretKeys().some((key) => secureEqual(internalKey, key))
  ) {
    const candidateIp = req.headers.get('x-fg-ip-hash') || '';
    return {
      kind: 'internal',
      ipHash: HEX64_RE.test(candidateIp) ? candidateIp.toLowerCase() : null,
      cfRay: null,
    };
  }

  const edgeKey = req.headers.get('x-fg-answers-key') || '';
  if (!edgeKey) return null;

  const expectedRows = await sql`
    select value #>> '{}' as secret_hash
    from private.answer_settings
    where setting_key = 'cloudflare_shared_secret_sha256'
    limit 1
  `;
  const expectedHash = String(expectedRows[0]?.secret_hash || '').toLowerCase();
  if (!HEX64_RE.test(expectedHash)) return null;

  const presentedHash = await sha256Hex(edgeKey);
  if (!secureEqual(presentedHash, expectedHash)) return null;

  // Cloudflare-authenticated traffic must carry a server-generated IP hash.
  // The raw address is never persisted by this service.
  const ipHash = req.headers.get('x-fg-ip-hash') || '';
  if (!HEX64_RE.test(ipHash)) return null;

  const ray = req.headers.get('x-fg-cf-ray') || '';
  return {
    kind: 'cloudflare',
    ipHash: ipHash.toLowerCase(),
    cfRay: CF_RAY_RE.test(ray) ? ray : null,
  };
}

async function lockAbuseKeys(tx: any, sessionHash: string | null, ipHash: string | null) {
  // Serialize quota decisions for the same anonymous session/IP cluster so a
  // request burst cannot race the count-and-insert gate.
  if (sessionHash) {
    await tx`
      select pg_advisory_xact_lock(
        hashtextextended(${`fg_answers_session:${sessionHash}`}, 0)
      )
    `;
  }
  if (ipHash) {
    await tx`
      select pg_advisory_xact_lock(
        hashtextextended(${`fg_answers_ip:${ipHash}`}, 0)
      )
    `;
  }
}

async function logUsage(
  tx: any,
  auth: AuthContext,
  eventType: string,
  sessionHash: string | null,
  answerId: number | null,
  metadata: Record<string, unknown>,
) {
  await tx`
    insert into private.answer_usage(
      session_hash, answer_id, event_type, occurred_at,
      corpus_revision, router_version, ip_hash, metadata
    ) values (
      ${sessionHash}, ${answerId}, ${eventType}, now(),
      ${FROZEN_REVISION}, ${ROUTER_VERSION}, ${auth.ipHash},
      ${JSON.stringify({
        ...metadata,
        auth_kind: auth.kind,
        ...(auth.cfRay ? { cf_ray: auth.cfRay } : {}),
      })}::text::jsonb
    )
  `;
}

function limitHit(reason: string, retryAfter: number): LimitHit {
  return { error: 'rate_limited', reason, retryAfter };
}

async function prepareLimit(
  tx: any,
  settings: any,
  sessionHash: string,
  ipHash: string | null,
): Promise<LimitHit | null> {
  const sessionCounts = await tx`
    select
      count(*) filter (where occurred_at > now() - interval '1 minute')::int as minute_count,
      count(*)::int as hour_count
    from private.answer_usage
    where session_hash = ${sessionHash}
      and event_type = 'prepare'
      and occurred_at > now() - interval '1 hour'
  `;
  const sc = sessionCounts[0] || {};
  if (Number(sc.minute_count || 0) >= settings.prepareSessionMinute) {
    return limitHit('prepare_session_minute', 60);
  }
  if (Number(sc.hour_count || 0) >= settings.prepareSessionHour) {
    return limitHit('prepare_session_hour', 3600);
  }

  if (ipHash) {
    const ipCounts = await tx`
      select
        count(*) filter (where occurred_at > now() - interval '1 minute')::int as minute_count,
        count(*)::int as hour_count
      from private.answer_usage
      where ip_hash = ${ipHash}
        and event_type = 'prepare'
        and occurred_at > now() - interval '1 hour'
    `;
    const ic = ipCounts[0] || {};
    if (Number(ic.minute_count || 0) >= settings.prepareIpMinute) {
      return limitHit('prepare_ip_minute', 60);
    }
    if (Number(ic.hour_count || 0) >= settings.prepareIpHour) {
      return limitHit('prepare_ip_hour', 3600);
    }
  }

  const outstanding = await tx`
    select count(*)::int as live_count
    from private.answer_requests
    where session_hash = ${sessionHash}
      and revealed_at is null
      and expires_at > now()
  `;
  if (Number(outstanding[0]?.live_count || 0) >= settings.outstandingTokens) {
    return limitHit('outstanding_tokens', 120);
  }

  return null;
}

async function revealAttemptLimit(
  tx: any,
  settings: any,
  sessionHash: string,
  ipHash: string | null,
): Promise<LimitHit | null> {
  const sessionCounts = await tx`
    select
      count(*) filter (where occurred_at > now() - interval '1 minute')::int as minute_count,
      count(*)::int as hour_count
    from private.answer_usage
    where session_hash = ${sessionHash}
      and occurred_at > now() - interval '1 hour'
      and (
        event_type = 'reveal'
        or (event_type = 'reject' and metadata ->> 'action' = 'reveal')
      )
  `;
  const sc = sessionCounts[0] || {};
  if (Number(sc.minute_count || 0) >= settings.revealSessionMinute) {
    return limitHit('reveal_session_minute', 60);
  }
  if (Number(sc.hour_count || 0) >= settings.revealSessionHour) {
    return limitHit('reveal_session_hour', 3600);
  }

  if (ipHash) {
    const ipCounts = await tx`
      select
        count(*) filter (where occurred_at > now() - interval '1 minute')::int as minute_count,
        count(*)::int as hour_count
      from private.answer_usage
      where ip_hash = ${ipHash}
        and occurred_at > now() - interval '1 hour'
        and (
          event_type = 'reveal'
          or (event_type = 'reject' and metadata ->> 'action' = 'reveal')
        )
    `;
    const ic = ipCounts[0] || {};
    if (Number(ic.minute_count || 0) >= settings.revealIpMinute) {
      return limitHit('reveal_ip_minute', 60);
    }
    if (Number(ic.hour_count || 0) >= settings.revealIpHour) {
      return limitHit('reveal_ip_hour', 3600);
    }
  }

  return null;
}

async function distinctRevealLimit(
  tx: any,
  settings: any,
  sessionHash: string,
  ipHash: string | null,
  tokenHash: string,
): Promise<LimitHit | null> {
  // Quota preview only. This SELECT never authorizes or consumes a reveal;
  // the later compare-and-set UPDATE remains the sole token-consumption gate.
  const candidateRows = await tx`
    select response_kind, answer_id
    from private.answer_requests
    where token_hash = ${tokenHash}
      and session_hash = ${sessionHash}
    limit 1
  `;
  const candidate = candidateRows[0];
  if (!candidate || candidate.response_kind !== 'normal' || candidate.answer_id == null) {
    return null;
  }
  const answerId = Number(candidate.answer_id);

  const sessionDistinct = await tx`
    select
      count(distinct answer_id)::int as distinct_count,
      bool_or(answer_id = ${answerId}) as already_seen
    from private.answer_usage
    where session_hash = ${sessionHash}
      and event_type = 'reveal'
      and answer_id is not null
      and occurred_at > now() - interval '1 hour'
  `;
  const sd = sessionDistinct[0] || {};
  if (
    Number(sd.distinct_count || 0) >= settings.distinctSessionHour &&
    !Boolean(sd.already_seen)
  ) {
    return limitHit('reveal_distinct_session_hour', 3600);
  }

  if (ipHash) {
    const ipDistinct = await tx`
      select
        count(distinct answer_id)::int as distinct_count,
        bool_or(answer_id = ${answerId}) as already_seen
      from private.answer_usage
      where ip_hash = ${ipHash}
        and event_type = 'reveal'
        and answer_id is not null
        and occurred_at > now() - interval '1 hour'
    `;
    const id = ipDistinct[0] || {};
    if (
      Number(id.distinct_count || 0) >= settings.distinctIpHour &&
      !Boolean(id.already_seen)
    ) {
      return limitHit('reveal_distinct_ip_hour', 3600);
    }
  }

  return null;
}

async function prepare(req: Request, body: any, auth: AuthContext) {
  const question = typeof body?.question === 'string' ? body.question : '';
  if (!question.trim()) return responseJson({ error: 'question_required' }, 400);
  if (question.length > MAX_QUESTION_CHARS) {
    return responseJson({ error: 'question_too_long' }, 413);
  }

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

    await lockAbuseKeys(tx, sessionHash, auth.ipHash);
    await opportunisticCleanup(
      tx,
      settings.requestRetention,
      settings.sessionRetention,
      settings.usageRetention,
    );

    const sessions = await tx`
      insert into private.answer_sessions(session_hash, recent_revealed_answer_ids, created_at, last_seen_at)
      values (${sessionHash}, '{}'::integer[], now(), now())
      on conflict (session_hash) do update
        set last_seen_at = now()
      returning recent_revealed_answer_ids
    `;

    const blocked = await prepareLimit(tx, settings, sessionHash, auth.ipHash);
    if (blocked) {
      await logUsage(tx, auth, 'reject', sessionHash, null, {
        action: 'prepare',
        reason: blocked.reason,
      });
      return { blocked };
    }

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
      await logUsage(tx, auth, 'prepare', sessionHash, null, {
        action: 'prepare',
        response_kind: 'care',
      });
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
      await logUsage(tx, auth, 'prepare', sessionHash, answerId, {
        action: 'prepare',
        response_kind: 'normal',
      });
    }

    return { expiresIn: settings.tokenTtl };
  });

  const cookieHeaders = createdSessionCookie ? { 'set-cookie': sessionCookie(rawSid) } : {};
  if ('blocked' in prepared) {
    return responseJson(
      { error: prepared.blocked.error },
      429,
      {
        ...cookieHeaders,
        'retry-after': String(prepared.blocked.retryAfter),
      },
    );
  }

  return responseJson(
    { request_token: requestToken, expires_in: prepared.expiresIn },
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

  const revealed = await sql.begin(async (tx: any) => {
    const settings = await loadSettings(tx);
    await lockAbuseKeys(tx, sessionHash, auth.ipHash);
    await opportunisticCleanup(
      tx,
      settings.requestRetention,
      settings.sessionRetention,
      settings.usageRetention,
    );

    const attemptBlocked = await revealAttemptLimit(
      tx,
      settings,
      sessionHash,
      auth.ipHash,
    );
    if (attemptBlocked) {
      await logUsage(tx, auth, 'reject', sessionHash, null, {
        action: 'reveal',
        reason: attemptBlocked.reason,
      });
      return { blocked: attemptBlocked };
    }

    const distinctBlocked = await distinctRevealLimit(
      tx,
      settings,
      sessionHash,
      auth.ipHash,
      tokenHash,
    );
    if (distinctBlocked) {
      await logUsage(tx, auth, 'reject', sessionHash, null, {
        action: 'reveal',
        reason: distinctBlocked.reason,
      });
      return { blocked: distinctBlocked };
    }

    // Hard invariant: exactly one compare-and-set consumes a token. A quota
    // preview above never grants the answer and cannot make this UPDATE succeed.
    const requests = await tx`
      update private.answer_requests
      set revealed_at = now()
      where token_hash = ${tokenHash}
        and session_hash = ${sessionHash}
        and revealed_at is null
        and expires_at > now()
      returning response_kind, answer_id, care_thai, care_english
    `;
    if (!requests.length) {
      await logUsage(tx, auth, 'reject', sessionHash, null, {
        action: 'reveal',
        reason: 'reveal_unavailable',
      });
      return { unavailable: true };
    }

    const prepared = requests[0];
    if (prepared.response_kind === 'care') {
      await tx`
        update private.answer_sessions
        set last_seen_at = now()
        where session_hash = ${sessionHash}
      `;
      await logUsage(tx, auth, 'reveal', sessionHash, null, {
        action: 'reveal',
        response_kind: 'care',
      });
      return {
        answer: {
          id: null,
          thai: String(prepared.care_thai),
          english: String(prepared.care_english),
        },
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

    await logUsage(tx, auth, 'reveal', sessionHash, answerId, {
      action: 'reveal',
      response_kind: 'normal',
    });

    return {
      answer: {
        id: Number(answers[0].answer_id),
        thai: String(answers[0].thai),
        english: String(answers[0].english),
      },
    };
  });

  if ('blocked' in revealed) {
    return responseJson(
      { error: revealed.blocked.error },
      429,
      { 'retry-after': String(revealed.blocked.retryAfter) },
    );
  }
  if ('unavailable' in revealed) {
    return responseJson({ error: 'reveal_unavailable' }, 404);
  }
  return responseJson(revealed.answer);
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
    // Never log the request body/question/token. Operational logs get only a
    // coarse error class; public callers receive no routing/database detail.
    console.error('answers-service error', error instanceof Error ? error.message : 'unknown');
    return responseJson({ error: 'service_unavailable' }, 503);
  }
});
