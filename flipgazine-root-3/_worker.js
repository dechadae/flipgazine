/**
 * flipgazine — link preview renderer
 * Pages Advanced mode. This file must sit at the root of the upload, beside
 * index.html. Do not rename it.
 *
 * WHY THIS FILE AND NOT functions/
 * Cloudflare's dashboard drag-and-drop deploy silently ignores a functions/
 * directory — it uploads the files and never compiles them, with no warning.
 * A root _worker.js is supported by drag-and-drop, so this is the version that
 * actually runs without a terminal or a Git connection.
 *
 * WHAT IT SOLVES
 * _redirects maps /* to /index.html, so every URL returns the same shell and
 * every link previewed as "flipgazine — Stories that inspire." The real page
 * arrives from Supabase after JavaScript runs, and link crawlers never run
 * JavaScript.
 *
 * HOW IT WORKS
 * It fetches the static asset as normal, then rewrites the title, description,
 * canonical and Open Graph tags on the way out, from values in Supabase:
 *
 *   ?s=<token>  ->  fg_shares.token      a shared board, card, or book
 *   otherwise   ->  fg_page_meta.path    an ordinary page
 *
 * The rewrite is streamed, so there is no redirect and no intermediate page.
 * People see exactly what they saw before.
 *
 * In Advanced mode this Worker owns every request, so anything that is not an
 * HTML document is passed straight through untouched. If Supabase is slow,
 * unreachable, or has no matching row, the original response is returned as-is.
 * A missing preview must never break a page.
 */

const SUPABASE = "https://sjpvhgxacsiorrtijqua.supabase.co";

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
