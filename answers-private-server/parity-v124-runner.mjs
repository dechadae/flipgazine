import assert from 'node:assert/strict';
import crypto from 'node:crypto';

const LIVE_CONTROLLER_URL = 'https://flipgazine.pages.dev/fg-page-answers.js';
const SUPABASE = 'https://sjpvhgxacsiorrtijqua.supabase.co/rest/v1';
// Public anon key, identical to the key already shipped in the Flipgazine shell.
const ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXAiLCJyZWYiOiJzanB2aGd4YWNzaW9ycnRpand1YSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzgzNzQxOTI3LCJleHAiOjIwOTkzMTc5Mjd9.9rQa7r9pxoBwh5SrYLlBGzzvbZkkUXKdvahCPugZncY';
const EXPECTED_VERSION = 124;
const EXPECTED_MD5 = 'c8a382f0562737422e891e3300bb08f6';
const nativeFetch = globalThis.fetch.bind(globalThis);

function md5(text) {
  return crypto.createHash('md5').update(text, 'utf8').digest('hex');
}

globalThis.fetch = async function parityFetch(input, init) {
  const url = typeof input === 'string' ? input : input?.url;
  if (url !== LIVE_CONTROLLER_URL) return nativeFetch(input, init);

  const q = `${SUPABASE}/site_files?path=eq.${encodeURIComponent('/fg-page-answers.js')}&select=content,version&limit=1`;
  const response = await nativeFetch(q, {
    headers: { apikey: ANON, Authorization: `Bearer ${ANON}` },
    cache: 'no-store',
  });
  assert.equal(response.status, 200, `Supabase reference fetch failed: HTTP ${response.status}`);
  const rows = await response.json();
  assert.ok(Array.isArray(rows) && rows.length === 1, 'Supabase reference row missing or ambiguous');
  assert.equal(rows[0].version, EXPECTED_VERSION, 'Supabase live controller version drifted');
  assert.equal(md5(rows[0].content), EXPECTED_MD5, 'Supabase live controller MD5 drifted from frozen v124');

  return new Response(rows[0].content, {
    status: 200,
    headers: { 'content-type': 'application/javascript; charset=utf-8', 'x-fg-reference': 'supabase-site-files-v124' },
  });
};

await import('./parity-v124.mjs');
