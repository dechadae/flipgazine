# The Book of Answers — Private Server Migration Phase F Report

**Status:** PHASE F COMPLETE — CLOUDFLARE BOUNDARY + ABUSE CONTROLS PASS  
**Date:** 17 August 2026  
**Supabase project:** `sjpvhgxacsiorrtijqua`  
**DB migration:** `20260817074835 answers_private_phase_f_abuse_controls`  
**Canonical router:** `supabase/functions/answers-service/router-v124.mjs`  
**Private service:** `answers-service` v3 (`97eff1fe-ac32-42b9-a6dd-afa6ef7d0282`)  
**Cloudflare Pages worker:** `flipgazine-root-3/_worker.js`  
**Public Answers UI integration:** **NOT YET PERFORMED**

> Phase F adds a same-origin Cloudflare boundary and server-side abuse controls around the Phase E token service. The canonical v124 router was not modified.

---

## F1. Same-origin public boundary

The existing Cloudflare Pages Advanced Mode worker now owns exactly two Answers routes:

```text
POST /api/answers/prepare
POST /api/answers/reveal
```

The public Book controller still does not call them. Phase G will integrate a lab copy first.

Boundary checks include:

- POST only;
- JSON only;
- bounded request body (4096 bytes);
- question length <= 500 characters;
- reveal token syntax check;
- foreign `Origin` rejected;
- incompatible `Sec-Fetch-Site` rejected;
- no-store/private response headers;
- no question/token/cookie/IP content in Worker logs.

Non-Answers `_worker.js` behavior for assets, shortlinks and OG metadata remains in the existing worker path.

---

## F2. Worker -> Supabase credential

A dedicated 32-byte service credential was generated in a one-time GitHub Actions bootstrap.

The raw credential exists only as Cloudflare Pages secret binding:

```text
ANSWERS_UPSTREAM_KEY
```

Supabase stores only:

```text
private.answer_settings.cloudflare_shared_secret_sha256
```

Final verification:

```text
hash length: 64
valid lowercase/hex SHA-256: true
```

The one-time bootstrap function was immediately replaced by an inert HTTP 410 implementation and its GitHub workflow was deleted.

The public anon key cannot authenticate to `answers-service`.

---

## F3. IP privacy / edge signal

The Worker reads the Cloudflare-provided connecting address only at the edge, computes:

```text
HMAC-SHA256(ANSWERS_UPSTREAM_KEY, CF-Connecting-IP)
```

and sends only that 64-hex digest to the private service.

`private.answer_usage.ip_hash` stores the digest. The raw address is never written by the Answers service.

An optional sanitized Cloudflare Ray ID may be retained in structured usage metadata for operational correlation.

---

## F4. Server-side limits

Phase F configuration is database-native:

| Control | Limit |
|---|---:|
| prepare / session / minute | 10 |
| prepare / session / hour | 40 |
| prepare / IP hash / minute | 20 |
| prepare / IP hash / hour | 100 |
| reveal attempts / session / minute | 20 |
| reveal attempts / session / hour | 60 |
| reveal attempts / IP hash / minute | 40 |
| reveal attempts / IP hash / hour | 120 |
| distinct normal reveals / session / hour | 50 |
| distinct normal reveals / IP hash / hour | 100 |
| outstanding unconsumed tokens / session | 3 |
| usage-log retention | 604800 seconds (7 days) |

The original token/recent settings remain:

```text
prepare token TTL = 120 seconds
recent limit      = 6
MIN_POOL          = 2
MAX_BROAD_WIDEN   = 12
```

The migration also adds covering usage indexes for session/event/time, IP/event/time and distinct normal-answer reveal accounting.

---

## F5. Race resistance

Quota decisions acquire transaction-scoped Postgres advisory locks keyed independently by:

```text
anonymous session hash
IP hash
```

This serializes count-and-log decisions for the same abuse identity and prevents a concurrent request burst from trivially racing the configured counters.

Token consumption remains the Phase E single compare-and-set `UPDATE ... WHERE revealed_at IS NULL AND expires_at > now() RETURNING ...` inside the transaction. No quota preview grants or consumes an answer.

---

## F6. Structured private usage logging

`private.answer_usage` now records only coarse server-side events:

```text
prepare
reveal
reject
```

Fields available for abuse accounting include:

```text
session_hash
answer_id (when applicable)
ip_hash
event_type
occurred_at
corpus_revision
router_version
metadata
```

No raw question, request token, session token, cookie or raw IP is stored.

During Phase F testing, a real serialization defect was caught: parameterized `JSON.stringify(...)::jsonb` was stored by the Postgres client as a JSONB string rather than a JSONB object. This meant `metadata ->> 'action'` could not count rejected reveal attempts.

The service was corrected to cast through text:

```sql
... ::text::jsonb
```

and redeployed as `answers-service` v3. The deterministic quota suite then passed all reveal-attempt counters, proving rejected reveal events are queryable and countable.

---

## F7. Cloudflare cookie transport defect found and fixed

The first real boundary test proved prepare/token generation but reveal failed because the `HttpOnly` anonymous cookie did not cross the Worker proxy.

Root cause: `Set-Cookie` is a special multi-value header. Forwarding it as a normal single-value `headers.get('set-cookie')` was not reliable in the Pages Worker path.

The Worker now uses the runtime's multi-cookie accessor when available and appends every `Set-Cookie` value to the outgoing response, with safe fallbacks.

After redeployment, the same production path proved:

```text
prepare -> cookie present -> reveal 200 -> replay 404
```

No session/token model change was required.

---

## F8. Real production HTTP boundary proof

GitHub Actions run:

```text
32009263638
```

exercised the live `https://flipgazine.pages.dev` boundary and returned:

```json
{
  "status":"PASS",
  "prepare_token_only":true,
  "normal_reveal":true,
  "replay_rejected":true,
  "session_bound":true,
  "care_tokenized":true,
  "cross_origin_rejected":true,
  "direct_bypass_rejected":true,
  "no_store":true,
  "outstanding_token_limit":3
}
```

The test specifically proved:

- prepare returns only token + 120-second TTL;
- session cookie crosses the Cloudflare proxy;
- normal bilingual reveal succeeds once;
- replay returns 404;
- a token cannot be revealed without its creating session;
- CARE remains tokenized and reveals only after the reveal call;
- foreign Origin returns 403;
- oversized question returns 413 at Cloudflare;
- direct Supabase function call without a credential returns 401;
- direct call using the public Supabase anon key also returns 401;
- three live tokens are accepted for one session and the fourth returns 429 with `Retry-After`;
- prepare/reveal responses remain no-store/private.

The one-time HTTP smoke workflow was deleted after PASS.

---

## F9. Deterministic quota proof

A second temporary harness pre-seeded isolated private counters and then invoked the deployed `answers-service` itself. This avoids relying on a slow sequential external runner to manufacture a true one-minute burst.

Final quota run (`32009712085`, rerun after the structured-log fix) returned HTTP 200 and:

```json
{
  "status":"PASS",
  "settings":{
    "prepare_session_minute_limit":10,
    "prepare_session_hour_limit":40,
    "prepare_ip_minute_limit":20,
    "prepare_ip_hour_limit":100,
    "reveal_session_minute_limit":20,
    "reveal_session_hour_limit":60,
    "reveal_ip_minute_limit":40,
    "reveal_ip_hour_limit":120,
    "reveal_distinct_session_hour_limit":50,
    "reveal_distinct_ip_hour_limit":100,
    "outstanding_token_limit":3
  },
  "checks":{
    "prepare_session_minute":true,
    "prepare_session_hour":true,
    "prepare_ip_minute":true,
    "prepare_ip_hour":true,
    "reveal_session_minute":true,
    "reveal_session_hour":true,
    "reveal_ip_minute":true,
    "reveal_ip_hour":true,
    "distinct_session_hour":true,
    "distinct_ip_hour":true,
    "distinct_duplicate_allowed":true
  }
}
```

The last invariant is intentional: reaching the distinct-answer ceiling blocks a *new* distinct normal answer, but does not prevent a legitimate repeat of an already-seen answer.

The quota harness cleaned its own rows, was redeployed as inert HTTP 410, and its workflow was deleted.

---

## F10. Test cleanup / final private state

All known Phase F HTTP test sessions and usage records were removed after validation.

Final state:

```text
private.answer_sessions = 0
private.answer_requests = 0
private.answer_usage    = 0
private.answers         = 948
routing asset revisions = 1
```

The Phase E smoke, Phase F bootstrap and Phase F quota-smoke functions remain only as inert historical deployments returning HTTP 410; no capability-bearing workflow remains in GitHub.

---

## F11. Private access remains sealed

Final privilege verification:

```text
anon private schema USAGE          false
authenticated private schema USAGE false
service_role private schema USAGE  false

anon private.answers SELECT          false
authenticated private.answers SELECT false
service_role private.answers SELECT  false
```

No Data API access was opened for the corpus or routing assets.

Supabase security advisor continues to report `rls_enabled_no_policy` INFO on the private tables. This is intentional for the sealed private schema: RLS is enabled as defense in depth and client roles have no schema/table grants.

No new Answers-specific security ERROR was introduced. Existing unrelated public-schema advisor findings were not modified.

The performance advisor reports no new unindexed Answers foreign key. Private indexes may still appear as unused before real production traffic begins; that is expected at this pre-integration stage.

---

## F12. v124 production/router integrity

The canonical router file was not changed in Phase F. Phase D's 64,626-case zero-difference proof therefore remains applicable.

Final public-controller check:

```text
/fg-page-answers.js
  version 124
  bytes   342604
  MD5     c8a382f0562737422e891e3300bb08f6

/wip/provenance-final-2026-08-16/fg-page-answers-v124-final-production.js
  version 124
  bytes   342604
  MD5     c8a382f0562737422e891e3300bb08f6
```

The live public Answers UI/controller still uses the old v124 client implementation. Phase F only made the secure API boundary available; it did not switch users to it.

---

## F13. Exit

**PASS.** Phase F's objective is met:

> one-request bulk extraction has been replaced at the new server boundary by session-bound, single-use, rate-limited, observable one-answer interactions, while direct underlying service bypass with public credentials is rejected.

No routing or probability mechanic changed.

**Five phases remain: G, H, I, J, K.**

Next is **Phase G — public lab integration**:

1. clone current v124 interaction behavior into a secure lab route;
2. remove the local corpus/router from the lab controller;
3. submit triggers background `/api/answers/prepare`;
4. drag/open remains local and immediate;
5. reveal occurs at the existing physical release/open beat;
6. compare UX and answer behavior before touching the live public Book.
