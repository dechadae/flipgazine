-- ===========================================================================
-- flipgazine · Supabase content tables
-- Run this once in the Supabase SQL editor. After that, ALL site content is
-- edited from the Supabase Table Editor — you never redeploy for content again.
--
-- Homepage copy is stored directly in the /home.html site_files row by the CMS.
-- site_config holds shared site settings. There is intentionally no separate
-- flipgazine_site table.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- 1. CATALOG  (already in use — shown here for reference / recreation)
-- ---------------------------------------------------------------------------
create table if not exists public.flipgazine_catalog (
  id           bigint generated always as identity primary key,
  title        text not null,
  code         text,              -- e.g. 'flipbook-02'  (shown top-left on cover)
  tag          text,              -- e.g. 'Rooftop'      (shown top-right on cover)
  accent_color text default '#00F0D1',
  description  text,
  url          text,              -- link the "Open flipbook" button points to
  cover_css    text,              -- any CSS background value for the mini cover
  cover_lines  jsonb,             -- [{ "text": "...", "variant": "meta|title|sub|tagline" }]
  published    boolean default true,
  sort_order   int  default 0,
  created_at   timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- 2. PUBLIC READ ACCESS  (the site uses the anon key to read this table)
-- ---------------------------------------------------------------------------
alter table public.flipgazine_catalog enable row level security;

drop policy if exists "public read published catalog" on public.flipgazine_catalog;
create policy "public read published catalog"
  on public.flipgazine_catalog for select
  using (published = true);
