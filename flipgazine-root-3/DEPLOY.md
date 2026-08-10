# flipgazine — deploy bundle

## Shared interface system — 10 August 2026

The shell now composes the canonical `/fg-header.html` Supabase row into every
interface page before first paint. Existing pages include a fallback header
between `<!--FG_HEADER_START-->` and `<!--FG_HEADER_END-->`, so they remain safe
while the older shell is still live. New interface pages may use the single
`<!--FG_HEADER-->` marker.

The glyph field is owned by `/fg-glyph.js`, and WebGL is owned by
`/fg-atmos.js`. `/fg-runtime.js` no longer contains a second shader. Those rows
can be edited in Supabase without another shell deployment.

Deploy the contents of this folder, not the containing folder. This release
bumps the service-worker cache to `fg-v7` so it replaces `fg-v6`.

Everything Cloudflare Pages needs. Only **one file is new** since your last
deploy: `functions/[[path]].js`. Every other file here is your existing shell,
unchanged.

## What changed since your last deploy

Two new files, and one small correction.

**`_worker.js`** — the link preview renderer, at the root beside index.html.
Do not rename it. Cloudflare's dashboard drag-and-drop deploy silently ignores
a `functions/` folder — it uploads the files and never compiles them, with no
warning. A root `_worker.js` IS compiled by drag-and-drop, which is why the
renderer is written this way.

**`og/home-v2.png`** — `index.html` and `_headers` both referenced this image,
but it did not exist. That 404 is why link previews fell back to the app icon.
It is now generated from your own mark: the glyph from `icon-512-v3.png` on the
brand field (#0D1110) with a soft teal bloom, at the correct 1200x630.

**`index.html`** — `og:image:width` and `og:image:height` said 1080x1920, which
described neither the old file nor the new one. Corrected to 1200x630. This is
the only edit to a file you already had.

## Folder layout

```
index.html                  shell — the only static page
_headers                    cache rules
_redirects                  /* -> /index.html 200  (SPA fallback)
sw.js                       service worker
manifest.webmanifest        PWA manifest
flipbook-ui.js              reader UI
flipbook-core.js
flipbook-core.css
favicon-v3.svg
robots.txt
sitemap.xml
supabase-setup.sql          reference only, not served
icons/                      three PWA icons
og/
  home-v2.png               NEW — link preview image, 1200x630
_worker.js                  NEW — link preview renderer
```

## Deploying

1. Copy these files over your project folder, keeping `og/` in place.
2. Commit and push. Pages builds automatically.
3. No build command and no dependencies. The function is plain JavaScript
   using Cloudflare's built-in `HTMLRewriter`.

## What the new function does

Every URL on this site returns the same shell, because `_redirects` maps `/*`
to `/index.html`. Real content arrives from Supabase after JavaScript runs, and
link crawlers never run JavaScript — so until now every link previewed as
"flipgazine — Stories that inspire," whichever page it pointed at.

The function runs before the shell is served, fetches it as normal, then
rewrites the title, description, canonical and Open Graph tags on the way out
using values read from Supabase:

- `?s=<token>` → `fg_shares` — a shared board, card, or later a book
- anything else → `fg_page_meta` — looked up by path

It streams the rewrite, so there is no redirect and no intermediate page.
Humans get exactly what they got before.

If Supabase is unreachable or no row matches, the original response is returned
untouched. A missing preview must never break a page.

## After this, no more deploys for previews

Preview text lives in the database. Adding a book, changing a description, or
creating a share needs no deploy — same as the books themselves.

```sql
-- give a new page a preview
insert into fg_page_meta (path, title, description)
values ('/sindhornmidtown/new-book.html', 'Title here', 'One line here')
on conflict (path) do update
  set title = excluded.title,
      description = excluded.description,
      updated_at = now();
```

Lookups are cached at the Cloudflare edge for 120 seconds, so an edit takes up
to two minutes to appear. Chat apps cache previews per URL for much longer —
test with a freshly created share rather than a link already in your history.

## Optional

The anon key is hardcoded in the function, exactly as it already appears in the
source of every page on the site — it is not a secret. If you would rather keep
it out of git, set `SUPABASE_ANON` as an environment variable in the Pages
dashboard; the function prefers it when present.
