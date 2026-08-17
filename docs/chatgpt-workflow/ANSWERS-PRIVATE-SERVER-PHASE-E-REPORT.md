# The Book of Answers — Private Server Migration Phase E Report

**Status:** PHASE E COMPLETE — PRIVATE HTTP E2E PASS  
**Date:** 17 August 2026  
**Supabase project:** `sjpvhgxacsiorrtijqua`  
**Migration:** `20260817071622 answers_private_phase_e_token_contract`  
**Canonical router:** `supabase/functions/answers-service/router-v124.mjs`  
**Service:** `supabase/functions/answers-service/index.ts`  
**Deployed function:** `answers-service` v1 (`97eff1fe-ac32-42b9-a6dd-afa6ef7d0282`)  
**Public Answers integration:** **NOT PERFORMED**  
**Cloudflare API boundary:** **NOT YET PERFORMED**

> Phase E adds only the anonymous session / opaque prepare-reveal envelope around the already-proven v124 router. It does not change Focus, Support, Universal mixing, recent-six routing semantics, or answer probability.

---

## E1. One canonical routing core

The canonical server router now physically lives beside the private Supabase service:

```text
supabase/functions/answers-service/router-v124.mjs
```

The older Phase C/D path is now only a compatibility re-export:

```text
answers-private-server/router-v124.mjs
  -> ../supabase/functions/answers-service/router-v124.mjs
```

The Phase D CI workflow also watches the canonical server file directly. There is therefore one routing implementation for the future public prepare service, deterministic parity harness, and later admin audit consumer.

After relocation, GitHub Actions parity run `32005215297` passed the complete frozen-v124 gate again:

```text
questions                 5,386
full routing comparisons  64,626
route differences         0
CARE cases                6 PASS
normal chooseAnswer       15 PASS
final fallback cases      4 PASS
Universal additions       exactly 2 on matched non-generic routes
probability                exactly 1 / eligible.length
```

Frozen source remained:

```text
version 124
bytes   342604
MD5     c8a382f0562737422e891e3300bb08f6
```

---

## E2. Private request model

Migration `20260817071622 answers_private_phase_e_token_contract` extends `private.answer_requests` so both normal and frozen v124 CARE responses can obey the same prepare/reveal contract.

Added:

```text
response_kind  normal | care
care_thai
care_english
```

`answer_id` remains the normal-answer FK but is nullable only for `response_kind='care'`.

Database checks require exactly one valid payload shape:

```text
normal -> answer_id present; CARE fields null
care   -> answer_id null; CARE Thai/English present
```

This prevents CARE from leaking during prepare while preserving v124's CARE-first behavior.

Also added:

```text
answer_sessions_last_seen_idx
request_retention_seconds = 86400
session_idle_ttl_seconds  = 86400
```

Existing sacred settings remain:

```text
prepare_token_ttl_seconds = 120
recent_limit              = 6
min_pool                  = 2
max_broad_widen           = 12
```

---

## E3. Anonymous session

Cookie:

```text
fg_ans_sid=<32 random bytes encoded base64url>
Path=/
HttpOnly
Secure
SameSite=Lax
```

It is deliberately a browser-session cookie with no persistent Max-Age/Expires. Frozen v124 keeps `recentAnswers` only in page memory, so Phase E does not turn routing history into a durable tracking identifier.

Only SHA-256 of the session identifier is stored in `private.answer_sessions`.

Server-owned recent history contains normal revealed answer IDs only and is capped at six.

---

## E4. Prepare contract

Private service request:

```json
{"action":"prepare","question":"..."}
```

Prepare:

1. creates or resolves the anonymous session;
2. reads current private v124 dictionary/index and hard-checks revision/router/source MD5;
3. runs the canonical `chooseAnswer()` with server-owned recent history;
4. generates a cryptographically random 32-byte opaque request token;
5. stores only SHA-256 of that token;
6. stores the already-selected normal answer ID or private CARE payload;
7. sets a 120-second expiry;
8. returns only the token and TTL.

Response shape:

```json
{"request_token":"<opaque>","expires_in":120}
```

No answer, route, pool, selected tier, probability, answer ID, dictionary data, or corpus data is returned from prepare. The raw question is not stored in the Phase E tables.

Abandoned prepare requests do not alter recent history.

---

## E5. Reveal contract

Private service request:

```json
{"action":"reveal","request_token":"<opaque>"}
```

Token consumption is a single compare-and-set UPDATE inside a database transaction:

```sql
update private.answer_requests
set revealed_at = now()
where token_hash = $token_hash
  and session_hash = $session_hash
  and revealed_at is null
  and expires_at > now()
returning response_kind, answer_id, care_thai, care_english;
```

There is no SELECT-before-UPDATE race window.

Wrong-session, expired, missing, malformed, and already-used tokens all collapse to the same public result:

```json
{"error":"reveal_unavailable"}
```

For a normal answer, successful reveal fetches only the chosen bilingual answer and then appends its ID to server-owned recent history, retaining the latest six in chronological order.

For CARE, reveal returns the previously selected frozen CARE bilingual response but does not add anything to normal recent history.

All prepare/reveal responses use no-store/private/max-age=0 plus Pragma/Expires no-cache headers.

---

## E6. Database atomic state-machine proof

A transactional database self-test proved:

```text
valid first consume            1 row
same-token replay              0 rows
wrong-session consume          0 rows
expired-token consume          0 rows
CARE correct-session consume   1 row
```

Normal reveal transformed:

```text
[1,2,3,4,5,6]
-> [2,3,4,5,6,441]
```

CARE reveal left that recent array unchanged.

The test transaction/state was cleaned afterward.

---

## E7. Real deployed HTTP end-to-end proof

Because the project server secret must never be exposed to the browser or this conversation, the final Phase E HTTP proof used a temporary one-time smoke Edge Function. The smoke function stored only the SHA-256 hash of an ephemeral capability and internally called the deployed `answers-service` using Supabase's server-held credential.

GitHub Actions run:

```text
32005856098
```

returned:

```json
{
  "status":"PASS",
  "prepare_token_only":true,
  "ttl_seconds":120,
  "reveal_once":true,
  "replay_rejected":true,
  "session_bound":true,
  "care_tokenized":true,
  "normal_answer_id":441
}
```

This is a real HTTP exercise of the deployed service, not only a SQL simulation.

Immediately after PASS:

- the temporary smoke function was redeployed as inert version 2 that only returns HTTP 410;
- the one-time GitHub workflow was removed from `main`;
- the smoke session was deleted, cascading its request records;
- final private state returned to `0` sessions and `0` requests.

The ephemeral capability has no active endpoint to authorize against.

---

## E8. Private access remains sealed

Rechecked after the migration:

```text
private.answers               RLS on
private.answer_routing_assets RLS on
private.answer_sessions       RLS on
private.answer_requests       RLS on
private.answer_settings       RLS on
```

For `anon`, `authenticated`, and `service_role`:

```text
private schema USAGE = false
private table SELECT = false
```

The Edge Function reads `private.*` through its trusted direct Postgres connection. No Data API grant was added.

Supabase security advisor still reports `rls_enabled_no_policy` INFO for the sealed private tables. That is intentional: they have no API grants and no client policies. Existing unrelated public-schema advisor findings were not changed.

Performance advisor reported no new unindexed foreign key caused by Phase E. Pre-cutover private indexes naturally remain reported as unused because production traffic has not started.

---

## E9. Production unchanged

Final verification after Phase E:

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

No public Answers controller, page, lab, Cloudflare route, or user-visible mechanic was changed in Phase E.

---

## E10. Phase E exit

**PASS.** The private service now demonstrates the required one-question → one-token → one-reveal lifecycle over real HTTP while preserving v124 routing and server-owned recent-six semantics.

Next is **Phase F — Cloudflare same-origin boundary + abuse controls**:

- `/api/answers/prepare`
- `/api/answers/reveal`
- Worker-held server credential only
- direct browser bypass rejected
- separate prepare/reveal rate limits
- outstanding-token/session abuse controls
- no-store preserved

Phase F must not modify the canonical router or probability mechanics.
