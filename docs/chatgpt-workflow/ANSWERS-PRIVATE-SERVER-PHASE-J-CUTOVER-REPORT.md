# The Book of Answers — Private Server Migration Phase J Cutover Report

**Status:** PHASE J COMPLETE — PRODUCTION CUTOVER PASS  
**Date:** 17 August 2026  
**Authoritative repo:** `dechadae/flipgazine` / `main`  
**Supabase project:** `sjpvhgxacsiorrtijqua` (`ap-southeast-1`)  
**Frozen behavioral source:** v124 / MD5 `c8a382f0562737422e891e3300bb08f6`  
**Production private-server cutover:** **PERFORMED**

> Phase J moved the live Book from the browser-shipped v124 corpus/router to the already accepted private-server path. The cutover changed the production controller source of truth, not routing semantics or physical Book mechanics. The canonical corpus remains revision 124 with 948 active bilingual answers in the private database.

---

## J1. Exact migration-plan gate

The Phase J section of `ANSWERS-PRIVATE-SERVER-MIGRATION-PLAN.md` was re-read immediately before implementation. The required controlled window was executed in the plan order: preserve rollback material, promote the secure controller/API path, make the private DB authoritative, retain the DB-native Admin, retire public corpus-bearing review surfaces, perform fresh/cache-busted retrieval checks, hostile retrieval tests, and live Book acceptance.

Phase I was already PASS before the window. Its immutable deterministic proof remains the frozen behavioral reference: **64,626 route cases, 0 differences**, CARE parity, `MIN_POOL=2`, `MAX_BROAD_WIDEN=12`, `RECENT_LIMIT=6`, exactly two Universals on matched non-generic routes, and uniform `1 / eligible.length` selection.

---

## J2. Pre-cutover state and backups

Immediately before cutover:

```text
/answers.html          v99   31,216 bytes   ec265ada07b882356699ef6b118b0167
/fg-page-answers.js    v124 342,604 bytes   c8a382f0562737422e891e3300bb08f6
```

The private corpus was revision 124 / 948 active answers / max ID 948 and the Answers runtime tables were empty.

Before changing live paths, the current content of these rows was copied under `/private/answers-phase-j-backup-20260817...`:

- `/answers.html`;
- `/fg-page-answers.js`;
- `/answers-admin.html`;
- `/fg-page-answers-admin.js`;
- `/answers-server-lab.html`;
- `/fg-page-answers-server-lab.js`;
- `/answers-longest-review.html`.

The backup prefix is excluded from public `site_files` reads. The hostile public Data API test later proved the old v124 controller backup returns **0 public rows**.

The old corpus-bearing controller is therefore retained only as private rollback/provenance material, not as a public fallback.

---

## J3. Production controller cutover

Cutover transaction timestamp:

```text
UTC       2026-08-17 12:36:42.515112+00
Bangkok   2026-08-17 19:36:42.515112+07
```

The already accepted Phase G/I secure controller was promoted to the live `/fg-page-answers.js` path. Its only production adaptation is its controller registry key:

```text
lab        var PATH="/fg-page-answers-server-lab.js"
production var PATH="/fg-page-answers.js"
```

A database byte comparison confirms that after reversing that one registry string, the production controller is **exactly identical** to the accepted lab controller.

Final production controller:

```text
path       /fg-page-answers.js
version    125
bytes      25,213
MD5        4693d0cdb12c395ec95a4d4112b0067d
```

The previous controller was 342,604 bytes. The public controller is now approximately 92.6% smaller because the 948-answer corpus, CARE corpus, Focus dictionary/index, Support pools and routing implementation are no longer shipped to the browser.

`/answers.html` itself remains unchanged at v99 / MD5 `ec265ada07b882356699ef6b118b0167`, so no visual markup or Book layout was changed during cutover.

---

## J4. Private DB is the explicit canonical owner

Phase J recorded the authoritative mode in `private.answer_settings`:

```text
canonical_corpus_owner = private_db
public_controller_mode = private_server
phase_j_cutover_at      = 2026-08-17 12:36:42.515112+00
```

Final canonical corpus:

```text
revision             124
revision rows        1
source               frozen-v124
active answers       948
inactive answers     0
max answer ID        948
corpus MD5           46ef8b51cf90d847523b82d823c6e796
routing index MD5    b837414f2930498fba61022dde0263c8
```

No revision 125 corpus was created by the cutover.

Final access checks remain deny-by-default:

- `anon` private-schema usage: false;
- `authenticated` private-schema usage: false;
- `anon` SELECT on `private.answers`: false;
- `authenticated` SELECT on `private.answers`: false.

---

## J5. Deployed services retained

The accepted private services remained deployed unchanged through cutover:

### `answers-service`

```text
version     7
status      ACTIVE
function ID 97eff1fe-ac32-42b9-a6dd-afa6ef7d0282
SHA-256     72fea6c9a8d6b6365a83e41f52c8435c58784905cd6e6cc16ec839742d2b4998
```

### `answers-admin-service`

```text
version     1
status      ACTIVE
JWT auth    true
function ID e60677af-dab1-4412-8e18-87e7b0718d1f
SHA-256     b48fc7f702c78ab150d3df57c26dd0190827edb078d0dbe4cbc2b118ff90f4db
```

The same-origin Cloudflare `/api/answers/prepare` and `/api/answers/reveal` boundary was already live and accepted in Phase I, so Phase J did not rewrite it.

---

## J6. DB-native Admin remains authoritative — PASS

The production Admin remained unchanged:

```text
/answers-admin.html       v46  MD5 22f6083ec713bb9fda8a104c2f136a94
/fg-page-answers-admin.js v23  MD5 1934a265ab7d7b3212391db1df4a8790
```

A fresh source scan confirms the Admin controller:

- does **not** reference `/fg-page-answers.js` as a corpus source;
- contains no `FOCUS_INDEX`;
- contains no `new Function` parser/extractor;
- does reference `answers-admin-service`.

Fresh authenticated non-admin acceptance:

- workflow run **`32031376156`**;
- job **`95391938266`**;
- conclusion **PASS**;
- authenticated non-admin `audit` returned **403**.

The disposable user and automatically-created connection rows were removed after the probe. Final Phase J temporary Auth users: 0. Temporary connection rows: 0.

---

## J7. Corpus-bearing public surfaces retired/gated — PASS

### Production controller

The old 342,604-byte public corpus/router at `/fg-page-answers.js` is gone. The path now contains only the 25,213-byte private-server controller.

### Longest-review

`/answers-longest-review.html` previously contained 177,682 bytes of corpus-oriented review material. It was retired in the same cutover transaction:

```text
version  2
bytes    284
MD5      ce28521ba666f97cf587ddb94e3ce78b
robots   noindex,nofollow
```

### Three lab

`/fg-page-answers-three-lab.js` is absent from `site_files`; the hostile public query confirmed 0 rows.

### WIP provenance and private cutover backups

Public Data API checks returned 0 rows for:

- `/wip/provenance-final-2026-08-16/fg-page-answers-v124-final-production.js`;
- `/private/answers-phase-j-backup-20260817/fg-page-answers.js`.

### Whole-public-file answer signature scan

A database scan compared public-readable `site_files` content against all 948 canonical answer strings. No remaining bulk corpus mirror was found.

`/voice.html` intentionally contains a small curated human-review sample: exact matches for 16 Thai answers and 2 English strings. Inspection confirms these are labelled pre-review/human-reviewed voice examples, not a hidden corpus, router, index, Universal pool, or extraction source. This page is therefore recorded as a deliberate sample surface rather than a bulk corpus leak.

---

## J8. Hostile retrieval and token acceptance — PASS

Corrected final hostile job:

- Phase J run **`32031621194`**;
- job **`95392699441`**;
- conclusion **PASS**.

Exact result:

```json
{
  "status": "PASS",
  "controller_version": 125,
  "controller_bytes": 25213,
  "controller_md5": "4693d0cdb12c395ec95a4d4112b0067d",
  "longest_review_bytes": 284,
  "private_rest_status": 406,
  "direct_no_key": 401,
  "direct_publishable": 401,
  "admin_no_auth": 401,
  "cross_origin": 403,
  "replay": 404,
  "wrong_session": 404,
  "expired": 404,
  "care_id": null,
  "invalid_reveal_statuses": [404],
  "latency_ms": [1219, 1157, 1512],
  "latency_median_ms": 1219,
  "cache_bust_shell": 200
}
```

That job also asserted:

- prepare response contains only `request_token` + `expires_in`;
- TTL remains exactly 120 seconds;
- prepare carries `Cache-Control: no-store`;
- reveal returns only `id`, Thai and English for the single selected answer;
- direct access to `answers-service` without the private Cloudflare credential is rejected even with the public Supabase key;
- direct unauthenticated Admin access is rejected;
- wrong-session use does not consume the token for the correct session;
- CARE remains tokenized and returns `id: null`;
- 25 random invalid reveal tokens returned only 404;
- a token held for 122 seconds was rejected with 404;
- a fresh cache-busted production shell returned HTTP 200.

---

## J9. Cloudflare abuse controls — PASS

A dedicated post-cutover runner performed no other Answers prepares before the quota test, avoiding the accounting ambiguity found in the first draft harness.

- Phase J run **`32031621194`**;
- job **`95392699376`**;
- conclusion **PASS**.

Exact prepare status sequence from one IP:

```json
[200,200,200,200,200,200,200,200,200,200,
 200,200,200,200,200,200,200,200,200,200,429]
```

The first 20 prepares were accepted and the 21st was blocked with 429, matching the configured per-IP minute ceiling.

The first draft Phase J harness had observed 12 additional successes and then 429 only because that same job had already made eight prepares before starting its quota loop. That result was correct server behavior; the final isolated job removes the test ambiguity.

---

## J10. Production mobile Book — PASS

Final live production mobile acceptance:

- Phase J run **`32031621194`**;
- job **`95392699417`**;
- conclusion **PASS**.

Exact result:

```json
{
  "status": "PASS",
  "viewport": [412, 915],
  "dpr": 2.625,
  "production_registry": true,
  "closed_center": 206.71149444580078,
  "open_center": 206,
  "open_width": 380,
  "no_horizontal_overflow": true,
  "thai_height_fit": true,
  "normal": true,
  "care": true,
  "recovery_after_prepare_503": true,
  "depths": [0.82, 0.18, 0.64],
  "semantic_payloads": ["question", "request_token"]
}
```

The browser registry contains `/fg-page-answers.js`, not the lab controller path. Three materially different physical drag depths opened normally, while the semantic requests remained exactly:

```text
prepare  { question }
reveal   { request_token }
```

No depth/position enters routing.

One early diagnostic used an over-strict per-child width assertion on a random answer and another diagnostic ran while the shared test IP was quota-saturated. Neither represented a cutover regression. The production controller is database-proven identical to the previously accepted lab controller except for its one self-registration path, and the corrected live mobile test above is green. No UI code was changed to make Phase J pass.

---

## J11. Frozen v124 semantic guard after the public corpus removal — PASS

The old deterministic workflow originally expected the *public* `/fg-page-answers.js` itself to remain the frozen v124 source. That assertion is intentionally invalid after a successful Phase J cutover.

The permanent guard was therefore adapted to the new architecture rather than weakening routing semantics:

1. the immutable Phase I full parity proof remains the reference: 64,626 cases / 0 differences;
2. the current canonical server router must retain the frozen source-controller, router-core, CARE and fallback fingerprints;
3. current canonical router regression tests execute on every router change.

Final post-cutover guard:

- workflow run **`32031693881`**;
- job **`95392927582`**;
- conclusion **PASS**.

Guard result:

```json
{
  "status": "PASS",
  "frozen_full_parity_run_id": 32028787891,
  "frozen_full_parity_job_id": 95383848221,
  "frozen_route_cases": 64626,
  "frozen_route_differences": 0,
  "source_controller_md5": "c8a382f0562737422e891e3300bb08f6",
  "router_core_md5": "0136cd0b127f4c6c30c8ec098d7ac2e8",
  "care_source_md5": "406dd4fb9bd3278e5300a1b46d86fd8e",
  "final_fallback_md5": "76abfbf89bb565575a48f2bead0c6981",
  "min_pool": 2,
  "max_broad_widen": 12,
  "recent_limit": 6,
  "exactly_two_universals_proved": true,
  "uniform_probability_proved": true
}
```

All **11/11** current canonical router regression tests passed, covering constants, normalization/collision behavior, recent-6, generic Universal behavior, exactly-two-Universal matched routing, CARE precedence, exact fallback order and non-mutation of recent history.

This preserves the v124 behavioral proof without reintroducing the private source into a public controller simply to satisfy a pre-cutover test harness.

---

## J12. Cache/stale-client verification — PASS

The production content system serves the controller from Supabase `site_files`; the cutover did not deploy a second static copy of the old controller. Repo inspection found no Answers service-worker registration that could preserve the v124 corpus independently.

Post-cutover verification used both:

- brand-new headless browser contexts with no local cache/history;
- cache-busted `/answers.html?phasej=<timestamp>` requests with `cache: no-store`.

Both mounted the production v125 controller successfully. API responses continue to use `no-store`.

The old public `site_files` row was replaced in the cutover transaction, so there is no second public v124 row to purge. The private backup remains inaccessible to public Data API clients.

---

## J13. Rollback readiness

Rollback material exists, but the preferred rollback does **not** republish the old corpus-bearing v124 JavaScript.

If the production browser controller must be rolled back, re-promote the accepted slim lab controller to `/fg-page-answers.js` with the production registry key. If the backend must be rolled back, deploy the prior known-good secure `answers-service` version while leaving:

- corpus ownership in `private_db`;
- `/fg-page-answers.js` slim;
- DB-native Admin authoritative;
- public corpus mirrors retired.

The `/private/answers-phase-j-backup-20260817...` material is forensic/recovery provenance only. Republish of the 342,604-byte v124 controller is not the preferred rollback path.

---

## J14. Cleanup

After the final acceptance run:

```text
private.answer_sessions  0
private.answer_requests  0
private.answer_usage     0
Phase J temp Auth users  0
Phase J connection rows  0
```

`answers-phase-j-nonadmin-smoke` was replaced by an inert HTTP **410 Gone** tombstone:

```text
version  2
SHA-256  9472223c1f1090da6d0890ea4a1163fbc93d08ed718469249d6c8a97ed9a93f5
```

Temporary Phase J GitHub workflow definitions are removed after this report/proof commit. Historical Actions runs remain available as evidence. The permanent `answers-v124-parity.yml` has been converted into the post-cutover router guard and remains on `main`.

---

## Phase J conclusion

**PASS.**

Production now uses the private-server architecture:

```text
browser
  -> Cloudflare same-origin /api/answers/*
  -> answers-service v7
  -> shared canonical v124 router
  -> private revision-124 DB corpus
```

The live browser no longer receives the bulk 948-answer corpus or routing internals. The current UI/Book mechanics remain the accepted secure-lab implementation, the canonical corpus is private and DB-native, the Admin is DB-native/authenticated, direct backend access remains rejected, token/session/replay/expiry controls are intact, Cloudflare abuse limits are intact, and rollback can preserve the private-server security boundary.

**Phase J exit gate: PASS.**

Next: **Phase K — Post-Cutover Proof Manifest**, producing the final manifest of corpus hash, routing index hash, deployed service hashes/versions, public controller hash, Admin hash, parity-proof hash, rollback references and public exposure proof.
