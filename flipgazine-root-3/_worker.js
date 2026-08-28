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
