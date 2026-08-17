# The Book of Answers — Private Server Migration Phase I Acceptance Report

**Status:** PHASE I COMPLETE — FULL ACCEPTANCE PASS  
**Date:** 17 August 2026  
**Authoritative repo:** `dechadae/flipgazine` / `main`  
**Supabase project:** `sjpvhgxacsiorrtijqua` (`ap-southeast-1`)  
**Frozen behavioral source:** `/fg-page-answers.js` v124  
**Source controller MD5:** `c8a382f0562737422e891e3300bb08f6`  
**Production cutover:** **NOT PERFORMED**

> Phase I tested the complete private-server candidate before cutover: frozen v124 behavior, CARE, exact Universal probability behavior, server recent history, opaque prepare/reveal security, Cloudflare same-origin enforcement and abuse limits, DB-native Admin behavior, mobile interaction, latency, browser exposure, failure recovery, cleanup and rollback readiness. Production `/answers.html` remains on the original v124 client controller until Phase J.

---

## I1. Phase H prerequisite was re-verified and closed first

Phase I did not start from chat memory. GitHub, Supabase and live deployed functions were re-queried first.

Phase H had an incomplete closeout: the intended proof-recording workflow had passed deterministic parity but failed its final git push because `main` advanced concurrently, leaving no committed Phase H proof/report. More importantly, live `answers-service` v6 still packaged a rejected emergency-fallback variant even though repository `main` had already restored exact v124 fallback behavior.

That live mismatch was corrected before Phase I:

- Phase H closeout commit: **`3c117ad34562cf782c030c77f3f787ede90ab5ac`**;
- `answers-service`: **v7**, ACTIVE;
- `answers-service` SHA-256: **`72fea6c9a8d6b6365a83e41f52c8435c58784905cd6e6cc16ec839742d2b4998`**;
- `answers-admin-service`: **v1**, ACTIVE, JWT-authenticated;
- `answers-admin-service` SHA-256: **`b48fc7f702c78ab150d3df57c26dd0190827edb078d0dbe4cbc2b118ff90f4db`**.

Phase H then closed PASS with revision 124, 948 active answers and clean test state. Phase I proceeded only after that gate.

---

## I2. Frozen corpus and routing source remain exact

Final live database state after all Phase I tests and cleanup:

```text
revision rows         1
current revision      124
source                frozen-v124
active answers        948
inactive answers      0
max answer ID         948
corpus MD5            46ef8b51cf90d847523b82d823c6e796
routing index MD5     b837414f2930498fba61022dde0263c8
```

The public source controller also remains byte-identical to the frozen source:

```text
path       /fg-page-answers.js
version    124
bytes      342604
MD5        c8a382f0562737422e891e3300bb08f6
```

No Phase I test created revision 125 persistently and no answer ID above 948 remains stored.

---

## I3. Deterministic v124 behavior and probability — PASS

Phase I reran the canonical deterministic parity harness against the acceptance state.

- workflow run: **`32028787891`**;
- parity job: **`95383848221`**;
- tested commit: **`0da4c84fa446371c539ce99615b8e46f1ffdfca6`**;
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

This is the acceptance proof for the sacred v124 semantics: CARE first, exact Focus/Support tier selection and widening/fallback behavior, generic Universal behavior, exactly two Universals on matched non-generic routes, and uniform `1 / eligible.length` selection.

A live authenticated Admin audit independently exercised the shared core with `barista หล่อ` and seed 42:

```text
selected tier          all-focus
Universal additions   2
eligible IDs           17
probability            0.058823529411764705 = 1 / 17
```

---

## I4. Same-origin prepare/reveal security — PASS

Final live HTTP acceptance:

- workflow run: **`32029431073`**;
- job: **`95385856163`**;
- conclusion: **PASS**.

Exact result:

```json
{
  "status": "PASS",
  "direct_no_key": 401,
  "direct_publishable": 401,
  "cross_origin": 403,
  "ttl": 120,
  "replay": 404,
  "wrong_session": 404,
  "care_id": null,
  "outstanding": [200, 200, 200, 429],
  "recent_ids": [59, 680, 705, 682, 668, 669, 694],
  "recent_unique": 7,
  "recovery_id": 684,
  "latency_ms": [1170, 1417, 1049],
  "latency_median_ms": 1170,
  "secure_controller_bytes": 25224,
  "secure_controller_md5": "355cf2a1f7285d8598952096828ac878",
  "shell_http": 200
}
```

Additional assertions in that successful job:

- `prepare` response fields are only `request_token` and `expires_in`;
- request token is 43-character opaque base64url data;
- token TTL is exactly 120 seconds;
- `Cache-Control` includes `no-store`;
- `reveal` returns only the one selected `id`, Thai and English answer, with no route/pool/eligible diagnostics;
- successful reveal is single-use;
- the same token fails in a different browser session;
- after a wrong-session attempt, the correct session can still reveal successfully;
- CARE uses the same tokenized flow and returns `id: null`;
- invalid-token failure does not poison the session; a subsequent valid cycle succeeds.

### Expiry proof

The first full HTTP acceptance attempt, run **`32028787891`**, job **`95383848252`**, explicitly waited **122 seconds** after prepare and verified that reveal returned **404** after token expiry. That job later failed only on a bad test assumption that the DB-backed secure controller should be directly served as a static Pages asset. The expiry assertion had already passed. The corrected final HTTP job above is fully green.

---

## I5. Server-owned recent history — PASS

Live DB state was inspected during the acceptance run, not inferred from the browser.

One session performed eight successful normal reveals. Its server-owned recent list contained exactly the final six IDs:

```text
[686, 681, 675, 692, 703, 120]
```

Therefore `RECENT_LIMIT=6` is enforced server-side.

A separate successful CARE reveal left the normal recent list length at **0**, proving CARE does not contaminate normal answer recency.

The final HTTP run also produced seven consecutive normal generic reveals with seven unique IDs:

```text
[59, 680, 705, 682, 668, 669, 694]
```

Recent state is changed by guarded reveal, not by theatrical drag position and not merely by prepare.

---

## I6. Cloudflare same-origin abuse controls — PASS

Phase I exercised the deployed browser → Cloudflare → Supabase path rather than relying only on the earlier Phase F database quota harness.

### Outstanding-token ceiling

The live public path returned:

```text
prepare #1  200
prepare #2  200
prepare #3  200
prepare #4  429
```

This re-proves the outstanding-token ceiling of 3.

### IP prepare ceiling

A dedicated final acceptance run created a new session for each prepare from one GitHub runner IP:

- workflow run: **`32030016147`**;
- job: **`95387696699`**;
- conclusion: **PASS**.

Exact status sequence:

```json
[200,200,200,200,200,200,200,200,200,200,
 200,200,200,200,200,200,200,200,200,200,429]
```

The first **20** prepares were accepted and the **21st** was blocked with **429**, matching the configured 20/minute prepare-IP ceiling.

Cross-origin prepare was independently rejected with 403, while direct access to the Supabase service without the private Cloudflare credential was rejected with 401 even when the public Supabase publishable key was supplied.

The complete Phase F quota matrix remains unchanged; Phase I specifically re-proved the two most important public-path controls after all later routing/Admin work.

---

## I7. CARE behavior — PASS

CARE was covered at three independent levels:

1. deterministic parity: 6 CARE cases, zero differences;
2. live HTTP: chest-pain/medicine query tokenized at prepare, reveal returned the exact clinician response with `id: null`;
3. mobile Book: the same CARE answer rendered through the real opening sequence and displayed answer number `—`.

CARE is still checked before normal routing and remains hidden until reveal.

---

## I8. DB-native authenticated Admin — PASS

Authenticated Admin acceptance ran against the live `answers-admin-service`:

- workflow run: **`32028787891`**;
- Admin job: **`95383848292`**;
- conclusion: **PASS**.

Exact result:

```json
{
  "status": "PASS",
  "non_admin_audit_http": 403,
  "admin_load_http": 200,
  "admin_load_revision": 124,
  "admin_load_answers": 948,
  "admin_audit_http": 200,
  "admin_audit_shared_core": true,
  "admin_audit_tier": "all-focus",
  "admin_audit_universal_adds": 2,
  "admin_audit_probability": 0.058823529411764705,
  "admin_audit_eligible": 17,
  "stale_save_http": 409,
  "stale_save_status": "conflict",
  "invalid_save_http": 422,
  "invalid_save_status": "invalid",
  "invalid_save_error": "universal floor must be at least 2",
  "no_store": true
}
```

### Real save/revision/ID behavior with forced rollback

A transactional acceptance probe called the real guarded Admin save function with:

- expected revision 124;
- existing answer ID 1 omitted;
- one new answer supplied with no ID;
- total active corpus still 948.

Inside the candidate transaction, the save correctly produced:

```text
candidate revision       125
candidate active rows    948
new stable answer ID     949
answer ID 1 active       false
answer ID 949 active     true
candidate corpus MD5     723784ddcaae4b500f64103d0b698370
candidate index MD5      9cb9cc296ed52eb60c1ea7df9c3c51e9
```

The transaction was then deliberately rolled back. Final state returned exactly to revision 124 / max ID 948 with no ID 949 row.

This proves DB-native Admin create/delete/save/revision mechanics, stable IDs, monotonic new-ID allocation, optimistic concurrency and rollback readiness without introducing a test revision into the canonical corpus.

The live Admin controller remains DB-native:

```text
/answers-admin.html          v46  MD5 22f6083ec713bb9fda8a104c2f136a94
/fg-page-answers-admin.js    v23  MD5 1934a265ab7d7b3212391db1df4a8790
```

It contains no `/fg-page-answers.js` parser/reference, no `FOCUS_INDEX`, and no `new Function` corpus extraction path.

---

## I9. Mobile interaction and theatrical drag independence — PASS

### Shell/mount diagnostic

- workflow run: **`32029249148`**;
- job: **`95385282601`**;
- result: PASS.

At 412 × 915 / DPR 2.625 the live public lab returned HTTP 200 and mounted successfully:

```text
stage              ask
#main              present
#bookEdge          present
request failures   0
page errors        0
```

### Full mobile Book acceptance

Headless Chromium cannot reliably reproduce native mobile pointer capture; this limitation had already been documented in the Phase G report. The final acceptance therefore used the same established method: deterministic synthetic touch `pointerdown` / `pointermove` / `pointerup` events against the unchanged real pointer handler.

- workflow run: **`32029794312`**;
- job: **`95386994538`**;
- conclusion: **PASS**.

Exact result:

```json
{
  "status": "PASS",
  "viewport": [412, 915],
  "dpr": 2.625,
  "closed_center": 206.71149444580078,
  "closed_width": 180.77145385742188,
  "open_center": 206,
  "open_width": 380,
  "no_horizontal_overflow": true,
  "thai_height_fit": true,
  "thai_children_fit": true,
  "thai_font_size": "27.98px",
  "normal": true,
  "care": true,
  "recovery_after_prepare_503": true,
  "depths": [0.82, 0.18, 0.64],
  "pointer_method": "synthetic-touch"
}
```

The original v124 and secure-lab pointer handler block remains byte-identical at **4,021 bytes**, MD5 **`846cad3a313b74e8b165120b297c8f53`**.

The secure controller sends:

```text
prepare  { question }
reveal   { request_token }
```

It never sends `depth`, book position or any physical opening coordinate. The three materially different tested depths therefore exercised theatrical motion only; semantic routing had already completed from the question before the physical opening.

No production UI code was changed during Phase I.

---

## I10. Public-browser exposure — PASS

Final secure lab controller:

```text
path       /fg-page-answers-server-lab.js
version    1
bytes      25224
MD5        355cf2a1f7285d8598952096828ac878
```

Live scans confirm the secure controller contains none of the following:

- bulk `ANSWERS` corpus literal;
- `FOCUS_INDEX`;
- `chooseAnswer` routing implementation;
- reference to the public `/fg-page-answers.js` corpus controller;
- `eligible` pool data;
- `universalAdds` membership/diagnostics.

The public browser receives only the single revealed bilingual answer after a successful token reveal.

Prepare carries only the question; reveal carries only the opaque token. Focus dictionary/index, Support pools, Universal membership, eligible pools and routing diagnostics remain server/private-DB state.

---

## I11. Latency — PASS

The final public HTTP run measured three complete prepare+reveal cycles from a GitHub runner:

```text
1170 ms
1417 ms
1049 ms
median 1170 ms
```

These are WAN acceptance samples, not Singapore-local benchmarks. They are comfortably below the 5-second catastrophic guard used by the acceptance harness.

The Phase G Singapore regional proof remains the more representative local-path benchmark: warm complete cycle 707 ms and CARE 804 ms, with the prepare operation starting at submit and overlapping the user’s physical drag.

No latency fallback answer was added. A slow or failed network still leaves the semantic answer on the server rather than exposing a local corpus.

---

## I12. Failure and recovery — PASS

Phase I tested failure at multiple boundaries:

- invalid reveal token → 404, followed by a successful new cycle;
- wrong-session token → 404, followed by successful reveal in the correct session;
- expired token → 404;
- replay → 404;
- cross-origin request → 403;
- direct Supabase service call → 401;
- outstanding-token abuse → 429;
- IP-rate abuse → 429;
- stale Admin save → 409;
- invalid Admin corpus → 422;
- synthetic mobile prepare 503 → book stayed recoverable and the next prepare/reveal succeeded.

No failure path returned the corpus, local fallback pools or routing diagnostics.

---

## I13. Rollback readiness — PASS

Phase I deliberately performed **no production cutover**, so the lowest-risk rollback position still exists in production by default:

```text
/answers.html          v99   MD5 ec265ada07b882356699ef6b118b0167
/fg-page-answers.js    v124  MD5 c8a382f0562737422e891e3300bb08f6
```

`/answers.html` still uses the old public v124 client controller.

Therefore a Phase J cutover can be rolled back by restoring that already-known production controller/page relationship. The canonical private corpus also remains revision 124 with no acceptance revisions to unwind.

The Admin save acceptance probe explicitly demonstrated transaction rollback from a candidate revision 125 back to 124.

---

## I14. Test-artifact cleanup — PASS

Phase I generated temporary runtime rows only on the non-production server candidate. The first acceptance batch generated usage IDs 1361–1443; the final public IP-rate proof generated usage IDs 1444–1464. Those exact acceptance artifacts were removed after evidence capture.

Final runtime state:

```text
private.answer_sessions   0
private.answer_requests   0
private.answer_usage      0
```

Disposable Auth/Admin identities are also clean:

```text
phase-i temporary auth users   0
phase-i temporary admin rows   0
phase-i temporary connection rows 0
```

The temporary authenticated probe cannot be deleted through the available function deployment interface, so it has been replaced with an inert tombstone:

```text
answers-phase-i-admin-smoke
version   2
behavior  HTTP 410 Gone only
SHA-256   759a5eb1c7e6c81cb8eed9c6fbd9a5d4cd9c7a0caecc12cd9ea3c0372cec6c18
```

All temporary Phase I GitHub workflow definitions are removed in the same closeout commit as this report. Historical workflow runs remain as immutable evidence.

No unrelated Supabase advisor warning was changed.

---

## I15. Final security/source-of-truth state

Final privilege check:

```text
anon private schema USAGE            false
authenticated private schema USAGE   false
anon private.answers SELECT          false
authenticated private.answers SELECT false
```

Current operational candidate remains:

```text
browser
  → Cloudflare same-origin /api/answers/prepare + /reveal
  → Supabase answers-service v7
  → canonical shared v124 router
  → private revision-124 corpus
```

Admin remains authenticated, DB-native and revision-based through `answers-admin-service` v1.

---

# Phase I exit decision

## **PASS**

Every Phase I exit condition is green:

- deterministic v124 parity: PASS, 64,626/64,626, zero differences;
- 948-row revision-124 corpus exact;
- CARE exact;
- Focus/Support/Universal behavior exact;
- exactly two Universals on matched non-generic routes;
- exact uniform `1 / eligible.length` probability;
- server-owned recent-6 behavior;
- opaque 120-second prepare token;
- atomic/session-bound/single-use reveal behavior;
- expiry/replay/wrong-session rejection;
- Cloudflare same-origin and live abuse controls;
- direct endpoint rejection;
- public browser exposure scan clean;
- DB-native Admin load/audit/save/conflict/validation behavior;
- non-admin Admin boundary rejection;
- mobile Book normal/CARE/recovery and geometry/autofit;
- theatrical drag proven semantically irrelevant;
- latency accepted;
- failure/recovery accepted;
- rollback position intact;
- temporary test state clean;
- production Book not cut over and old public corpus not removed.

**Next allowed phase: Phase J — Production Cutover.**

Phase J should switch production `/answers.html` to the secure corpus-free controller/API path, immediately run the post-cutover acceptance/exposure checks defined in the migration plan, verify the rollback path, and only then perform whatever old-public-corpus cleanup Phase J explicitly authorizes. No Phase J cutover has been performed in this Phase I closeout.
