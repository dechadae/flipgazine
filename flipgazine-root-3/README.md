# flipgazine — deploy bundle

This is the **whole** static build. Everything visible on the site — the
homepage and every flipbook — lives in Supabase (`site_files`) and is fetched at
load time. This bundle is just the shell that fetches it.

## Deploying this

Replace the contents of the Pages project with this folder, then re-add your
`og/` directory (see below).

### The `sindhornmidtown/` folder is gone, deliberately

Older builds kept a static shell per book there, which shadowed the database and
made those URLs uneditable. Two later builds shipped `index.html` copies at those
paths as a workaround. Both are now removed: the books live at descriptive slugs
(`anju-rooftop-bar.html`, `countdown-to-midnight.html`) and the old paths hold
redirect shims in `site_files` which will start working once this deploy lands.

**Do not put files under `sindhornmidtown/` again.** Anything there wins over the
`_redirects` catch-all and silently overrides the database.

**Keep `og/`.** It is not in this zip. `sw.js` and `index.html` reference
`/og/home-v2.png` for social previews. Nothing breaks without it (the service
worker caches entries individually and tolerates a miss) but link previews lose
their image.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The shell: branded boot animation, then fetches the row for the current path from `site_files` and writes it into the document. |
| `_redirects` | `/*  /index.html  200` — every path falls through to the shell, so deep links work. |
| `_headers` | Keeps the shell and service worker uncached; serves the manifest with the right content type. |
| `manifest.webmanifest` | PWA manifest — install name, icons, splash colour. |
| `icons/` | Full-bleed app icons, plus a dedicated maskable one. |
| `sw.js` | Service worker — installability and offline reading. |
| `flipbook-ui.js` | Shared flipbook overlay: home button and glass magnifier. Reads `window.__FG_ACCENT`. |
| `favicon-v3.svg` | Browser tab icon. |
| `supabase-setup.sql` | One-time SQL for the catalog and settings tables. |

### What belongs on Cloudflare

**Only the shell.** `index.html`, `_redirects`, `_headers`, `sw.js`, the manifest,
the icons, `favicon-v3.svg`, `robots.txt` and `sitemap.xml` -- the things that
must be real files at real paths. Everything else is a `site_files` row served
through the shell, or a table row.

That includes the pitch deck: `/sindhornmidtown/pilot.html` is one self-contained
row with its CSS and JS inline, exactly like every book. It was briefly split into
`pilot.css` / `pilot.js` deploy files; that was a mistake and cost several
redeploys and a cache-busting `?v=` scheme. **Do not reintroduce content files
here.** If something needs editing without a deploy -- and content always does --
it belongs in Supabase.

Editorial palettes live in the `flipgazine_periods` table. Adding or recolouring
a period is an insert or update, no deploy, exactly like adding a book.
| `robots.txt` | Real static file. Without it, `/robots.txt` fell through the SPA catch-all and crawlers received the app shell's HTML instead -- Lighthouse flagged this as 119 syntax errors. |
| `sitemap.xml` | Real static file listing the homepage and all six books. **Static, not generated** -- a book added straight to `site_files` (as several were) will not appear here until this file is edited too. Fine for six titles; if the catalog grows much further, a Cloudflare Pages Function generating this from `flipgazine_catalog` would be worth it. |

## How a URL resolves

- `/` -> shell -> `site_files["/home.html"]`
- `/sindhornmidtown/<slug>.html` -> shell -> `site_files` row of the same path
- anything else -> shell -> `site_files[path]`, or a friendly not-found

## Adding a book — no redeploy

1. Insert the page into `site_files` at `/sindhornmidtown/<slug>.html`.
2. Insert its card into `flipgazine_catalog` (fill **every** column, including
   `cover_css` and `cover_lines`, or the thumbnail renders empty).

Because each book is now served directly rather than through a shell, its HTML
must carry three things itself. Copying an existing book gets you all three:

```html
<link rel="manifest" href="/manifest.webmanifest">   <!-- in <head> -->
<script>window.__FG_ACCENT = "#RRGGBB";</script>      <!-- before page-flip -->
<script src="/flipbook-ui.js"></script>
```

## When you DO need to redeploy

Only for the shell itself: `index.html`, `sw.js`, `_redirects`, `_headers`,
`manifest.webmanifest`, `flipbook-ui.js`, `favicon-v3.svg`, `icons/`, `og/`.
Content changes never require one.

## Two things that will bite you

**Boot hold is 180ms.** It was 420ms to mask a cold fetch; the first-load
repaint below removed the need for it.

**Edits now appear on the first load.** The shell still paints from
`localStorage` (`fg:<path>`) for an instant start, but it compares the fetched
copy against what it painted and swaps it in when they differ. You may see a
brief re-render on the first load after a database change; that is the swap.
Before this, edits did not surface until the *next* load, which was the single
most common source of "the change didn't work".

**`document.write()` replaces the whole document, including `<head>`.** Anything
the shell puts in its head is gone by the time Chrome evaluates installability,
which is why installs used to fall back to the page title and a white splash.
`keepPWA()` in `index.html` re-injects the manifest, theme-color and touch icon,
and every database-served page also carries its own manifest link. Keep both.

**After deploying, uninstall and reinstall the home-screen app.** Android freezes
the manifest and icon at install time; a redeploy alone will not refresh them.

## Keys

`index.html` and the books contain the Supabase anon key, which is safe in client
code — it grants only what row-level security allows. The service-role key must
never appear here.
