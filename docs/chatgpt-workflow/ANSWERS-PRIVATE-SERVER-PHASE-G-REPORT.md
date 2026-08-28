# The Book of Answers — Private Server Migration Phase G Report

> **Archive note:** Historical Phase G evidence. Production cutover later completed in Phase J; do not use the no-cutover statement as current.

**Status:** PHASE G COMPLETE — SECURE LAB + REGIONAL UX PASS  
**Date:** 17 August 2026  
**Supabase project:** `sjpvhgxacsiorrtijqua` (`ap-southeast-1`)  
**Canonical live source:** `/fg-page-answers.js` v124  
**Public production cutover:** **NOT PERFORMED**

> Phase G integrates the private prepare/reveal service into a lab copy of the real v124 Book, proves that the browser no longer receives the corpus/router, preserves the existing physical interaction, and brings the secure path into a usable Bangkok/Singapore latency envelope. The production `/answers.html` continues to use the original v124 client controller.

---

## G1. Secure lab artifacts

Two lab-only `site_files` were created from the live page/controller:

| Path | Version | Bytes | MD5 |
|---|---:|---:|---|
| `/answers-server-lab.html` | 1 | 31,258 | `35401fa37741fa7fdb707c9c3d851ec7` |
| `/fg-page-answers-server-lab.js` | 1 | 25,224 | `355cf2a1f7285d8598952096828ac878` |

The live controller is 342,604 bytes. The secure lab controller is 25,224 bytes, a reduction of about **92.6%**, principally because the answer corpus, CARE corpus, routing dictionary/index and routing implementation are absent from the browser bundle.

The lab HTML is the production page with only these intended differences:

- controller path changed to `/fg-page-answers-server-lab.js`;
- privacy copy changed to `ชิลๆ ไม่เก็บคำถามนี้ไว้`;
- `noindex,nofollow` added for the lab.

No production page was switched to this controller in Phase G.

---

## G2. Browser exposure scan

The final secure lab controller was scanned directly in `site_files`.

Results:

- `var answers=[` — absent;
- `FOCUS_DICT` — absent;
- `FOCUS_INDEX` — absent;
- client CARE corpus — absent;
- `function chooseAnswer` — absent;
- answer-object literals — 0;
- `/api/answers/prepare` — present;
- `/api/answers/reveal` — present;
- prepare payload contains only `{question}`;
- reveal payload contains only `{request_token}`;
- drag `depth` / physical `position` are not sent to either API.

The browser therefore cannot download the 948 normal answers, all CARE responses as a corpus, Focus/Support/Universal membership, eligible pools, or routing diagnostics from the lab controller.

---

## G3. Preserved v124 physical interaction

The live and secure-lab pointer/drag handler block from `bookEdge.addEventListener("pointerdown"...)` through the `askAgain` boundary was byte-compared.

Both are:

- **4,021 bytes**;
- MD5 **`846cad3a313b74e8b165120b297c8f53`**.

This proves the real pointer-drag mechanics themselves were not rewritten for the migration.

The secure integration changes only the semantic boundary:

1. genuine submit enters the existing pick stage and starts `/api/answers/prepare`;
2. drag remains theatrical and updates the same v124 paper/depth UI;
3. release retains the existing **220 ms** seam beat;
4. opening waits for the prepared token and `/api/answers/reveal` result;
5. only the one returned bilingual answer is rendered;
6. network failure leaves the book closed and allows retry;
7. no local hidden answer fallback exists.

CARE remains tokenized and reveals through the same book-opening flow; a CARE result has `id: null` and renders answer number `—`.

---

## G4. Browser functional gate

A Chromium mobile-profile smoke used a **412 × 915** viewport at DPR 2.625 and exercised the public lab URL.

The functional matrix passed:

- lab controller registration and mount;
- normal prepare → release → reveal → bilingual open;
- prepare payload keys exactly `question`;
- reveal payload keys exactly `request_token`;
- drag depth not present in semantic requests;
- CARE prepare/reveal and `—` answer number;
- failed prepare keeps the book in `pick` rather than exposing/opening an answer;
- retry after network recovery succeeds;
- Thai answer autofit remains within its container;
- no page errors.

Headless touch emulation did not reproduce Chrome's native pointer-capture behavior reliably, so the changed secure boundary was exercised with deterministic synthetic pointer events while the actual v124 pointer handler was separately protected by the exact byte/MD5 equality gate above.

The first functional run exposed a real latency blocker (multi-second Edge↔Postgres orchestration). Phase G did not accept that result; the backend was optimized and region-pinned before completion.

---

## G5. Latency refactor — semantics unchanged

`pg_stat_statements` showed that the SQL work itself was only milliseconds while the previous Edge service paid many remote Edge→Postgres round trips per request.

The canonical JavaScript `chooseAnswer()` remains unchanged. Instead, database orchestration was collapsed into private transaction functions:

- `private.answer_prepare_claim(...)`;
- `private.answer_prepare_commit(...)`;
- `private.answer_prepare_abort(...)`;
- `private.answer_reveal_fast(...)`;
- `private.answer_reveal_guarded(...)`.

The internal request state now permits `pending | normal | care`. `pending` exists only while the service reserves a token/quota slot before running the unchanged v124 selection; commit converts it to the final normal/CARE payload.

All five functions are:

- in schema `private`;
- `SECURITY INVOKER`;
- `search_path=''`;
- not executable by `anon`, `authenticated`, or `service_role`.

The deployed private function is now:

- `answers-service` **v5**;
- function ID `97eff1fe-ac32-42b9-a6dd-afa6ef7d0282`;
- deployment SHA-256 `4824c5e15de8f6a3ba8f87bb5fc87e85f8ad3f7dddbd3a3790883c74ccc7614a`.

Cloudflare's Pages Worker now sends `x-region: ap-southeast-1` to the Supabase function, pinning Answers execution to Singapore, the same region as the database. The raw Worker→Supabase credential remains only in Cloudflare's encrypted secret store; the service contains only its SHA-256 verifier.

---

## G6. Recorded Phase G migrations

The latency/transaction changes are recorded as real Supabase migrations:

| Version | Migration |
|---|---|
| `20260817092338` | `answers_private_phase_g_pending_contract` |
| `20260817092406` | `answers_private_phase_g_prepare_fast_path` |
| `20260817092437` | `answers_private_phase_g_reveal_fast_path` |

The preceding Phase F abuse-control migration remains `20260817074835 answers_private_phase_f_abuse_controls`.

---

## G7. Singapore regional UX + security gate

A one-use probe was explicitly invoked in `ap-southeast-1` and confirmed by Supabase's `x-sb-edge-region: ap-southeast-1` response header. It exercised Singapore → Cloudflare same-origin API → Singapore Supabase service/database.

Final successful regional result:

```json
{
  "status": "PASS",
  "region": "ap-southeast-1",
  "timing": {
    "cold": { "prepare_ms": 1876, "reveal_ms": 1602, "total_ms": 3478 },
    "warm": { "prepare_ms": 412, "reveal_ms": 295, "total_ms": 707 },
    "care": { "prepare_ms": 528, "reveal_ms": 276, "total_ms": 804 }
  },
  "checks": {
    "replay_404": true,
    "wrong_session_404": true,
    "care_tokenized": true,
    "outstanding_limit": [200, 200, 200, 429],
    "cross_origin_403": true,
    "direct_no_key_401": true,
    "direct_anon_401": true,
    "no_store": true
  }
}
```

Prepare starts at the genuine submit, before the user drags through the paper. On the warm regional path the reveal operation itself is about **276–295 ms**, so most prepare time can overlap the physical interaction and the post-release secure reveal is close to the existing 220 ms theatrical seam rather than the original multi-second orchestration.

Cold start remains slower and will be observed again in Phase I acceptance, but it no longer changes mechanics or exposes a fallback answer.

---

## G8. Abuse-control regression after fast-path refactor

The configured Phase F limits were re-proved against the new Postgres transaction functions.

Passed:

- prepare session 10/min;
- prepare session 40/hour;
- prepare IP 20/min;
- prepare IP 100/hour;
- outstanding token ceiling 3;
- reveal session 20/min;
- reveal session 60/hour;
- reveal IP 40/min;
- reveal IP 120/hour;
- 50 distinct normal answers/session/hour;
- 100 distinct normal answers/IP/hour;
- at the distinct ceiling, a previously seen answer remains allowed.

The final regional gate independently re-proved the outstanding-token public behavior as `200, 200, 200, 429`.

---

## G9. Fresh frozen-v124 parity gate

The deterministic Phase D harness was run again after the Phase G server refactor.

- workflow: `Answers v124 deterministic parity`;
- run ID: **`32014656678`**;
- job ID: **`95341438775`**;
- tested commit: `a0546d7e6268c0b253d388eafcb2a1d6806c724e`;
- Node: 22.23.2;
- conclusion: **PASS**.

Exact result:

```json
{
  "status": "PASS",
  "storedSourceControllerMd5": "c8a382f0562737422e891e3300bb08f6",
  "transportControllerMd5": "c8a382f0562737422e891e3300bb08f6",
  "transportBytes": 342604,
  "frozenCriticalSlicesVerified": true,
  "dictionaryConcepts": 268,
  "focusIndexKeys": 220,
  "supportIndexKeys": 36,
  "universalIds": 75,
  "generatedQuestions": 5386,
  "deterministicSeeds": [1, 42, 12648430],
  "routeCases": 64626,
  "routeDifferences": 0,
  "careCases": 6,
  "normalChooseAnswerCases": 15,
  "finalFallbackCases": 4,
  "invariants": {
    "minPool": 2,
    "maxBroadWiden": 12,
    "recentLimit": 6,
    "exactlyTwoUniversalOnMatchedNonGeneric": true,
    "uniformProbabilityOneOverEligible": true
  }
}
```

Later Phase G commits after this parity run only changed the server transaction guard, Cloudflare regional routing, test cleanup/workflow removal and documentation; the canonical v124 router file was not changed.

---

## G10. Security and advisor closeout

Final access verification:

- private answers: **948**;
- private routing assets: **1**;
- interaction sessions: **0**;
- prepared requests: **0**;
- usage events: **0**;
- stored Cloudflare verifier: **64 hex characters**;
- `anon` private schema usage: false;
- `authenticated` private schema usage: false;
- `service_role` private schema usage: false;
- `anon/authenticated/service_role` SELECT on `private.answers`: false;
- all five Phase G private functions executable by those three roles: false.

Supabase security/performance advisors were run after the DDL. No new Phase-G-specific security error or unindexed-foreign-key problem was introduced. The private tables continue to receive the intentional `RLS enabled, no policy` INFO notice because the design is deny-by-default with no client grants. Reference: [Supabase database linter — RLS enabled/no policy](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy).

Other higher-severity advisor findings are pre-existing public-schema findings outside this Answers migration and were not altered as part of Phase G.

---

## G11. Temporary test surfaces closed

Temporary Phase G GitHub workflows were removed from `main` after their final successful runs:

- `answers-phase-g-lab-smoke.yml`;
- `answers-phase-g-regional-smoke.yml`;
- `answers-phase-g-reveal-guard-patch.yml`.

Temporary Supabase probes cannot be deleted through the available deployment interface, so they were replaced with inert **HTTP 410 Gone** tombstones:

- `answers-phase-g-syntax-probe` v2;
- `answers-phase-g-regional-smoke` v4.

All test-generated sessions, requests and usage events were deleted after the gates completed.

---

## G12. Production integrity — no cutover

Final production `site_files` state:

| Path | Version | Bytes | MD5 | Updated |
|---|---:|---:|---|---|
| `/answers.html` | 99 | 31,216 | `ec265ada07b882356699ef6b118b0167` | 2026-08-16 11:09:57.36982+00 |
| `/fg-page-answers.js` | 124 | 342,604 | `c8a382f0562737422e891e3300bb08f6` | 2026-08-16 16:42:48.300053+00 |
| `/wip/provenance-final-2026-08-16/fg-page-answers-v124-final-production.js` | 124 | 342,604 | `c8a382f0562737422e891e3300bb08f6` | 2026-08-16 16:58:24.637568+00 |

`/answers.html` still points to `/fg-page-answers.js`.

Therefore Phase G introduced **no public Answers UI cutover and no production corpus removal**. The secure lab remains separate for later acceptance/cutover work.

---

## Phase G conclusion

**PASS.**

The migration now has a real corpus-free browser candidate, a same-origin secure API, server-owned session/recent state, opaque one-use reveal tokens, preserved v124 physical mechanics, unchanged routing semantics, enforced abuse limits, and a Singapore-pinned backend with subsecond warm normal/CARE cycles in the regional gate.

The next migration phase is **Phase H — DB-native Admin**, so future answer/content maintenance writes the private canonical tables rather than rebuilding a browser-shipped JavaScript corpus.
