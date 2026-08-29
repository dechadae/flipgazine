/**
 * flipgazine — Pages Advanced Mode edge worker
 *
 * Owns two intentionally small server-side concerns:
 * 1. same-origin private Answers prepare/reveal boundary;
 * 2. link preview / shortlink rendering for the existing Supabase-backed shell.
 *
 * This file must sit at the deployment root beside index.html. Non-API behavior
 * below remains the existing preview renderer: static assets pass through and
 * HTML metadata is rewritten only when matching Supabase metadata exists.
 */

const SUPABASE = "https://sjpvhgxacsiorrtijqua.supabase.co";
const ANSWERS_SERVICE = SUPABASE + "/functions/v1/answers-service";
const ANSWERS_REGION = "ap-southeast-1";
const ANSWERS_PREPARE = "/api/answers/prepare";
const ANSWERS_REVEAL = "/api/answers/reveal";
const ANSWERS_MAX_BODY_BYTES = 4096;
const ANSWERS_MAX_QUESTION_CHARS = 500;
const ANSWERS_TOKEN_RE = /^[A-Za-z0-9_-]{43}$/;

const EDGE_CLEANUP_API = "/api/admin/edge-function-cleanup";
const EDGE_CLEANUP_MANAGEMENT =
  "https://api.supabase.com/v1/projects/sjpvhgxacsiorrtijqua/functions";
const EDGE_CLEANUP_CONFIRMATION = "DELETE APPROVED EDGE FUNCTIONS";
const EDGE_CLEANUP_MAX_BODY_BYTES = 16384;
const EDGE_CLEANUP_MAX_RESPONSE_BYTES = 1024 * 1024;
const EDGE_CLEANUP_EXPECTED = Object.freeze({
  "summarize-log-entry": {
    "version": 10,
    "sha": "194a0af3809223c70a4ba1b5bb8435b3d00619dcce1ac1645be4288c962331ff"
  },
  "answers-service-phase-e-smoke": {
    "version": 9,
    "sha": "f94f85e0b413ef304df8645228eb9e5151f1ec44f594c02eef7e2cd1d9b06b53"
  },
  "answers-service-phase-f-bootstrap": {
    "version": 9,
    "sha": "6e5a24c1e04d1d636e635c2d94b212053f03828d2deed3ef5badba597dbebeaf"
  },
  "answers-service-phase-f-quota-smoke": {
    "version": 9,
    "sha": "2c2897b7effa184eb9f30e7d4f6a0620f9580103497452427da596e878593803"
  },
  "answers-phase-g-syntax-probe": {
    "version": 9,
    "sha": "42824eac89fecc7af4f848345fd8e2f69dda9ad288986667af897523232053c6"
  },
  "answers-phase-g-regional-smoke": {
    "version": 11,
    "sha": "5b19d989ce58cca36a9d1c3afa6291c8cffa0cb0c6b46da43cdaa46e3f2ef6af"
  },
  "answers-phase-h-admin-smoke": {
    "version": 10,
    "sha": "78ea0918e1c4b23eae9cc9dd1fa14e09483ad5b244a3e70a96b46f7ae6735747"
  },
  "answers-phase-i-admin-smoke": {
    "version": 9,
    "sha": "759a5eb1c7e6c81cb8eed9c6fbd9a5d4cd9c7a0caecc12cd9ea3c0372cec6c18"
  },
  "answers-phase-j-nonadmin-smoke": {
    "version": 9,
    "sha": "9472223c1f1090da6d0890ea4a1163fbc93d08ed718469249d6c8a97ed9a93f5"
  },
  "voice-evidence-bundle-20260817": {
    "version": 11,
    "sha": "6f97fba785aed14896713590ef6eee36280c190e38cabacfae00d030f0919164"
  },
  "voice-eval-calibration-runner-20260818": {
    "version": 13,
    "sha": "b82fc939e076a8511f8377673d36c643b517830c1f1718c917a778449ee6092b"
  },
  "voice-eval-regression-20260818": {
    "version": 10,
    "sha": "13789610b1a61dae5576ec045c39f60ef892baddfd320cf13141fcbe418d2427"
  },
  "voice-groq-models-20260818": {
    "version": 9,
    "sha": "66aeb92f8ee213a9202eabe20c26f45f5f89b577a0676fa8e1dd5ad65acbc366"
  },
  "voice-thai-audit-probe-20260818": {
    "version": 12,
    "sha": "62211e0a0e98e34c89ac32ac1649caad1a24ec7fa19babfba93092d430369b22"
  },
  "tcj-openai-reference-probe": {
    "version": 6,
    "sha": "e415ee487372dd6c373386a5f35f86d8b2f8bc13752956ce70d4ecfad37b1a88"
  },
  "tcj-evaluator-qualification-review": {
    "version": 5,
    "sha": "c74be22bc5b79dfeb8aab07e5b2667703b6a586fc521b5d35caf2be808bf2299"
  },
  "tcj-runtime-v2-admin": {
    "version": 5,
    "sha": "a20063f73723b6e0af783813be61fba0ab3031f709f975de5c175e5b175d03cb"
  },
  "tcj-evidence-v2-internal": {
    "version": 5,
    "sha": "7624dbab7cda2e69aa3880f56a1e3c1aae9f4dcf55a126a175e6e2536b001141"
  },
  "tcj-qualification-autoworker": {
    "version": 5,
    "sha": "3ead293d68b00b0ef9951e7cfc3e491d10743f2015370e09b684de2ae038a72d"
  },
  "tcj-groq-free-probe": {
    "version": 5,
    "sha": "afa0f910d8edd84177390f001b6d0c8ee8e8d81258ef89fc4f07af7c24af7da3"
  },
  "tcj-groq-stress-worker": {
    "version": 8,
    "sha": "ff5b6b7577a53c6a997669d53bc4d49ca280929c0ad67479482325151d5909fb"
  },
  "tcj-groq-stress-worker-mandatory-pee": {
    "version": 7,
    "sha": "a89eb86409569e87bcc7c1daea98a649d80cd891fd9ed0fb968f8d1cf1600c0b"
  },
  "tcj-qwen36-stress-worker-v2": {
    "version": 4,
    "sha": "002118b948536e5e09e5dc5ded49a569812691690266fdea9022b53666e06e6d"
  }
});

/* The public anon key, already present in the source of every page on the
   site. Not a secret. Set SUPABASE_ANON in the Pages dashboard to override. */
const ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
  "eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqcHZoZ3hhY3Npb3JydGlqcXVhIiwicm9sZSI6" +
  "ImFub24iLCJpYXQiOjE3ODM3NDE5MjcsImV4cCI6MjA5OTMxNzkyN30." +
  "9rQa7r9pxoBwh5SrYLlBGzzvbZkkUXKdvahCPugZncY";

const SITE = "https://flipgazine.pages.dev";
const FALLBACK_IMAGE = "/og/home-v2.png";
const FALLBACK_DESC = "Digital stories for curious minds, creators and dreamers.";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === ANSWERS_PREPARE || url.pathname === ANSWERS_REVEAL) {
      return answersApi(request, env, url);
    }

    if (url.pathname === EDGE_CLEANUP_API) {
      return edgeFunctionCleanupApi(request, url);
    }

    /* Resolve short codes at the edge before the shell is fetched. A short
       link is a redirect, not a page: returning the real 302 here prevents a
       second shell boot and keeps the destination URL authoritative. */
    const shortCode = url.pathname.match(/^\/([a-z0-9]{4,10})$/);
    if (shortCode) {
      try {
        const link = await shortlink(env, shortCode[1]);
        if (link && /^\//.test(link.target_path || "")) {
          return Response.redirect(new URL(link.target_path, url.origin), 302);
        }
      } catch (e) {
        /* A lookup failure falls through to the ordinary shell response. */
      }
    }

    /* Advanced mode owns every request, so the static asset must be fetched
       explicitly. This still applies _redirects and _headers. */
    const res = await env.ASSETS.fetch(request);

    const type = res.headers.get("content-type") || "";
    if (!type.includes("text/html")) return res;

    let token = url.searchParams.get("s");
    let path = url.pathname;

    let meta = null;
    try {
      meta = token
        ? await row(env, "fg_shares", "token", token)
        : await row(env, "fg_page_meta", "path", path);
    } catch (e) {
      return res;
    }
    if (!meta || !meta.title) return res;

    const title = meta.title;
    const desc = meta.description || FALLBACK_DESC;
    const image = absolute(meta.image_url || FALLBACK_IMAGE);
    /* The resolved path, not the short code: the canonical URL should point at
       the real board so a share and its short link are not two pages. */
    const canonical =
      SITE + path + (token ? "?s=" + encodeURIComponent(token) : "");

    const content = (v) => ({ element: (el) => el.setAttribute("content", v) });
    const href = (v) => ({ element: (el) => el.setAttribute("href", v) });
    const drop = { element: (el) => el.remove() };

    let rw = new HTMLRewriter()
      .on("title", { element: (el) => el.setInnerContent(title) })
      .on('meta[name="description"]', content(desc))
      .on('meta[property="og:title"]', content(title))
      .on('meta[property="og:description"]', content(desc))
      .on('meta[property="og:url"]', content(canonical))
      .on('meta[name="twitter:title"]', content(title))
      .on('meta[name="twitter:description"]', content(desc))
      .on('link[rel="canonical"]', href(canonical));

    if (token) {
      /* Shared links preview as text only: link, title, description.
         Removing og:image alone is not enough. Chat apps fall back to the
         apple-touch-icon and the manifest icons, which is where the small
         square mark was coming from, so those go too. twitter:card must drop
         to "summary" or a large empty image frame is still reserved.
         Ordinary pages and the books keep their artwork. */
      rw = rw
        .on('meta[property="og:image"]', drop)
        .on('meta[property="og:image:width"]', drop)
        .on('meta[property="og:image:height"]', drop)
        .on('meta[property="og:image:alt"]', drop)
        .on('meta[name="twitter:image"]', drop)
        .on('meta[name="twitter:card"]', content("summary"))
        .on('link[rel="apple-touch-icon"]', drop)
        .on('link[rel="manifest"]', drop);
    } else {
      rw = rw
        .on('meta[property="og:image"]', content(image))
        .on('meta[property="og:image:width"]', content("1200"))
        .on('meta[property="og:image:height"]', content("630"))
        .on('meta[property="og:image:alt"]', content(title))
        .on('meta[name="twitter:image"]', content(image));
    }

    return rw.transform(res);
  },
};

/* ------------------------------------------------------------- Answers API */

async function answersApi(request, env, url) {
  const started = Date.now();
  const route = url.pathname === ANSWERS_PREPARE ? "prepare" : "reveal";
  let status = 500;

  try {
    if (request.method !== "POST") {
      status = 405;
      return answersJson({ error: "method_not_allowed" }, status, { Allow: "POST" });
    }

    const origin = request.headers.get("Origin");
    if (origin && origin !== url.origin) {
      status = 403;
      return answersJson({ error: "forbidden" }, status);
    }

    const fetchSite = request.headers.get("Sec-Fetch-Site");
    if (fetchSite && !["same-origin", "same-site", "none"].includes(fetchSite)) {
      status = 403;
      return answersJson({ error: "forbidden" }, status);
    }

    const contentType = request.headers.get("Content-Type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      status = 415;
      return answersJson({ error: "unsupported_media_type" }, status);
    }

    const declaredLength = Number(request.headers.get("Content-Length") || 0);
    if (Number.isFinite(declaredLength) && declaredLength > ANSWERS_MAX_BODY_BYTES) {
      status = 413;
      return answersJson({ error: "payload_too_large" }, status);
    }

    const parsed = await readJsonBounded(request, ANSWERS_MAX_BODY_BYTES);
    if (parsed.tooLarge) {
      status = 413;
      return answersJson({ error: "payload_too_large" }, status);
    }
    if (parsed.invalid) {
      status = 400;
      return answersJson({ error: "invalid_json" }, status);
    }

    let upstreamBody;
    if (route === "prepare") {
      const question = typeof parsed.value?.question === "string" ? parsed.value.question : "";
      if (!question.trim()) {
        status = 400;
        return answersJson({ error: "question_required" }, status);
      }
      if (question.length > ANSWERS_MAX_QUESTION_CHARS) {
        status = 413;
        return answersJson({ error: "question_too_long" }, status);
      }
      upstreamBody = { action: "prepare", question };
    } else {
      const requestToken = typeof parsed.value?.request_token === "string"
        ? parsed.value.request_token
        : "";
      if (!ANSWERS_TOKEN_RE.test(requestToken)) {
        status = 404;
        return answersJson({ error: "reveal_unavailable" }, status);
      }
      upstreamBody = { action: "reveal", request_token: requestToken };
    }

    const upstreamKey = env && env.ANSWERS_UPSTREAM_KEY;
    if (!upstreamKey) {
      status = 503;
      return answersJson({ error: "service_unavailable" }, status);
    }

    const rawIp = request.headers.get("CF-Connecting-IP") || "unknown";
    const ipHash = await hmacHex(upstreamKey, rawIp);
    const headers = new Headers({
      "content-type": "application/json",
      "x-fg-answers-key": upstreamKey,
      "x-fg-ip-hash": ipHash,
      "x-region": ANSWERS_REGION,
    });
    const cfRay = request.headers.get("CF-Ray");
    if (cfRay) headers.set("x-fg-cf-ray", cfRay);
    const cookie = request.headers.get("Cookie");
    if (cookie) headers.set("cookie", cookie);

    const upstream = await fetch(ANSWERS_SERVICE, {
      method: "POST",
      headers,
      body: JSON.stringify(upstreamBody),
    });
    status = upstream.status;

    const outHeaders = answersNoStoreHeaders();
    const upstreamType = upstream.headers.get("content-type");
    if (upstreamType) outHeaders.set("content-type", upstreamType);

    let setCookies = [];
    if (typeof upstream.headers.getSetCookie === "function") {
      setCookies = upstream.headers.getSetCookie();
    } else if (typeof upstream.headers.getAll === "function") {
      setCookies = upstream.headers.getAll("Set-Cookie");
    } else {
      const oneCookie = upstream.headers.get("set-cookie");
      if (oneCookie) setCookies = [oneCookie];
    }
    setCookies.forEach((cookieValue) => outHeaders.append("Set-Cookie", cookieValue));

    const retryAfter = upstream.headers.get("retry-after");
    if (retryAfter) outHeaders.set("retry-after", retryAfter);

    return new Response(upstream.body, { status, headers: outHeaders });
  } catch (e) {
    status = 503;
    return answersJson({ error: "service_unavailable" }, status);
  } finally {
    const cf = request.cf || {};
    console.log(JSON.stringify({
      event: "answers_api",
      route,
      status,
      ms: Date.now() - started,
      cf_ray: request.headers.get("CF-Ray") || null,
      colo: cf.colo || null,
    }));
  }
}

function answersNoStoreHeaders() {
  return new Headers({
    "cache-control": "no-store, private, max-age=0",
    pragma: "no-cache",
    expires: "0",
    "x-content-type-options": "nosniff",
  });
}

function answersJson(body, status = 200, extraHeaders = {}) {
  const headers = answersNoStoreHeaders();
  headers.set("content-type", "application/json; charset=utf-8");
  Object.entries(extraHeaders).forEach(([key, value]) => headers.set(key, String(value)));
  return new Response(JSON.stringify(body), { status, headers });
}

async function readJsonBounded(request, maxBytes) {
  if (!request.body) return { invalid: true };
  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel();
        return { tooLarge: true };
      }
      chunks.push(value);
    }
  } catch (e) {
    return { invalid: true };
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  chunks.forEach((chunk) => {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  });

  try {
    return { value: JSON.parse(new TextDecoder().decode(bytes)) };
  } catch (e) {
    return { invalid: true };
  }
}

async function hmacHex(secret, value) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, encoder.encode(value)),
  );
  return Array.from(signature, (byte) => byte.toString(16).padStart(2, "0")).join("");
}


/* -------------------------------------------- Edge Function cleanup API */

async function edgeFunctionCleanupApi(request, url) {
  const started = Date.now();
  let action = "unknown";
  let status = 500;
  let selectedForLog = [];

  try {
    if (request.method !== "POST") {
      status = 405;
      return cleanupJson({ error: "method_not_allowed" }, status, { Allow: "POST" });
    }

    const origin = request.headers.get("Origin");
    if (origin && origin !== url.origin) {
      status = 403;
      return cleanupJson({ error: "forbidden" }, status);
    }

    const fetchSite = request.headers.get("Sec-Fetch-Site");
    if (fetchSite && !["same-origin", "same-site", "none"].includes(fetchSite)) {
      status = 403;
      return cleanupJson({ error: "forbidden" }, status);
    }

    const contentType = request.headers.get("Content-Type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      status = 415;
      return cleanupJson({ error: "unsupported_media_type" }, status);
    }

    const authorization = request.headers.get("Authorization") || "";
    if (!/^Bearer [^\s]{20,512}$/.test(authorization)) {
      status = 401;
      return cleanupJson({ error: "management_token_required" }, status);
    }

    const parsed = await readJsonBounded(request, EDGE_CLEANUP_MAX_BODY_BYTES);
    if (parsed.tooLarge) {
      status = 413;
      return cleanupJson({ error: "payload_too_large" }, status);
    }
    if (parsed.invalid || !parsed.value || typeof parsed.value !== "object") {
      status = 400;
      return cleanupJson({ error: "invalid_json" }, status);
    }

    action = parsed.value.action;
    if (!["inventory", "delete"].includes(action)) {
      status = 400;
      return cleanupJson({ error: "invalid_action" }, status);
    }

    const beforeResult = await cleanupInventory(authorization);
    if (!beforeResult.ok) {
      status = beforeResult.status;
      return cleanupJson(beforeResult.body, status);
    }

    const before = beforeResult.functions;
    const approved = Object.entries(EDGE_CLEANUP_EXPECTED).map(([slug, expected]) => {
      const live = before.find((fn) => fn && fn.slug === slug) || null;
      const liveSha = live && typeof live.ezbr_sha256 === "string" ? live.ezbr_sha256 : null;
      const liveVersion = live && Number.isInteger(live.version) ? live.version : null;
      const drift = !live ||
        live.status !== "ACTIVE" ||
        liveVersion !== expected.version ||
        liveSha !== expected.sha;
      return {
        slug,
        expected_version: expected.version,
        expected_sha: expected.sha,
        deployed: Boolean(live),
        status: live ? live.status : null,
        live_version: liveVersion,
        live_sha: liveSha,
        drift,
      };
    });

    if (action === "inventory") {
      status = 200;
      return cleanupJson({
        project_ref: "sjpvhgxacsiorrtijqua",
        function_count: before.length,
        expected_after_all_23: 77,
        approved,
      }, status);
    }

    const requested = Array.isArray(parsed.value.slugs) ? parsed.value.slugs : [];
    const selected = [...new Set(requested.filter((slug) => typeof slug === "string"))];
    selectedForLog = selected;

    if (
      parsed.value.confirmation !== EDGE_CLEANUP_CONFIRMATION ||
      selected.length < 1 ||
      selected.length > Object.keys(EDGE_CLEANUP_EXPECTED).length ||
      selected.some((slug) => !Object.hasOwn(EDGE_CLEANUP_EXPECTED, slug))
    ) {
      status = 400;
      return cleanupJson({ error: "invalid_delete_request" }, status);
    }

    const drift = approved.filter((item) => selected.includes(item.slug) && item.drift);
    if (drift.length) {
      status = 409;
      return cleanupJson({ error: "function_metadata_drift", drift }, status);
    }

    const deleted = [];
    for (const slug of selected) {
      const live = before.find((fn) => fn && fn.slug === slug);
      const response = await fetch(
        EDGE_CLEANUP_MANAGEMENT + "/" + encodeURIComponent(slug),
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: authorization,
          },
        },
      );

      if (!response.ok) {
        status = response.status === 401 || response.status === 403
          ? response.status
          : 502;
        return cleanupJson({
          error: "delete_failed",
          failed_slug: slug,
          upstream_status: response.status,
          deleted,
        }, status);
      }

      deleted.push({
        slug,
        previous_version: live.version,
        previous_sha: live.ezbr_sha256,
        reason: "Tier-1 historical smoke/probe runtime; no live caller found",
        no_live_caller_evidence:
          "Private Git deployable code, live site_files, DB routines, cron, triggers and webhooks checked 2026-08-29",
      });
    }

    const afterResult = await cleanupInventory(authorization);
    if (!afterResult.ok) {
      status = 502;
      return cleanupJson({
        error: "post_delete_inventory_failed",
        deleted,
        before_count: before.length,
      }, status);
    }

    const afterCount = afterResult.functions.length;
    const expectedAfter = before.length - deleted.length;
    status = afterCount === expectedAfter ? 200 : 502;
    return cleanupJson({
      ok: status === 200,
      project_ref: "sjpvhgxacsiorrtijqua",
      before_count: before.length,
      deleted_count: deleted.length,
      after_count: afterCount,
      expected_after: expectedAfter,
      deleted,
      count_mismatch: afterCount !== expectedAfter,
    }, status);
  } catch (error) {
    status = 503;
    return cleanupJson({ error: "cleanup_service_unavailable" }, status);
  } finally {
    console.log(JSON.stringify({
      event: "edge_function_cleanup",
      action,
      status,
      selected_slugs: selectedForLog,
      ms: Date.now() - started,
      cf_ray: request.headers.get("CF-Ray") || null,
    }));
  }
}

async function cleanupInventory(authorization) {
  const response = await fetch(EDGE_CLEANUP_MANAGEMENT, {
    headers: {
      Accept: "application/json",
      Authorization: authorization,
    },
  });

  if (!response.ok) {
    return {
      ok: false,
      status: response.status === 401 || response.status === 403
        ? response.status
        : 502,
      body: {
        error: "inventory_failed",
        upstream_status: response.status,
      },
    };
  }

  const parsed = await readJsonBounded(response, EDGE_CLEANUP_MAX_RESPONSE_BYTES);
  const value = parsed.value;
  const functions = Array.isArray(value)
    ? value
    : Array.isArray(value && value.functions)
      ? value.functions
      : null;

  if (parsed.tooLarge || parsed.invalid || !functions) {
    return {
      ok: false,
      status: 502,
      body: { error: "invalid_inventory_response" },
    };
  }

  return { ok: true, functions };
}

function cleanupJson(body, status = 200, extraHeaders = {}) {
  const headers = new Headers({
    "cache-control": "no-store, private, max-age=0",
    pragma: "no-cache",
    expires: "0",
    "content-type": "application/json; charset=utf-8",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
    "referrer-policy": "no-referrer",
  });
  Object.entries(extraHeaders).forEach(([key, value]) => headers.set(key, String(value)));
  return new Response(JSON.stringify(body), { status, headers });
}

/* ---------------------------------------------------------------- helpers */

function absolute(path) {
  return /^https?:\/\//.test(path) ? path : SITE + path;
}

async function shortlink(env, code) {
  const key = (env && env.SUPABASE_ANON) || ANON;
  const q =
    SUPABASE +
    "/rest/v1/fg_shortlinks?code=eq." +
    encodeURIComponent(code) +
    "&active=eq.true&select=target_path&limit=1";
  const r = await fetch(q, {
    headers: { apikey: key, Authorization: "Bearer " + key },
    cf: { cacheTtl: 60, cacheEverything: true },
  });
  if (!r.ok) return null;
  const j = await r.json();
  return j && j[0] ? j[0] : null;
}

async function row(env, table, column, value) {
  const key = (env && env.SUPABASE_ANON) || ANON;
  const q =
    SUPABASE +
    "/rest/v1/" +
    table +
    "?" +
    column +
    "=eq." +
    encodeURIComponent(value) +
    "&select=title,description,image_url&limit=1";

  const r = await fetch(q, {
    headers: { apikey: key, Authorization: "Bearer " + key },
    /* Cached at the edge so this costs almost nothing per request. Two
       minutes is short enough that an edit in Supabase shows up quickly. */
    cf: { cacheTtl: 120, cacheEverything: true },
  });
  if (!r.ok) return null;

  const rows = await r.json();
  return Array.isArray(rows) && rows.length ? rows[0] : null;
}

