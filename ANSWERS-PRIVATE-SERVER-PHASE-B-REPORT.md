# The Book of Answers — Private Server Migration Phase B Report

**Status:** PHASE B COMPLETE  
**Date:** 17 August 2026  
**Supabase project:** `sjpvhgxacsiorrtijqua`  
**Migration plan:** `ANSWERS-PRIVATE-SERVER-MIGRATION-PLAN.md`  
**Phase A baseline:** `ANSWERS-PRIVATE-SERVER-PHASE-A-INVENTORY.md`  
**Public cutover:** **NOT PERFORMED**  
**Live routing implementation changed:** **NO**

> Migration invariant remains frozen: preserve live v124 Focus → selected pool → Support additions → recent-6 handling → exactly two distinct Universal additions on every matched non-generic route → one uniform final pick across the complete eligible list. Phase B creates an exact private data/config mirror only; it does not redesign or replace routing.

---

## B1. Live source remained untouched

Before and after Phase B:

| Path | Version | Bytes | MD5 |
|---|---:|---:|---|
| `/fg-page-answers.js` | 124 | 342604 | `c8a382f0562737422e891e3300bb08f6` |
| `/wip/provenance-final-2026-08-16/fg-page-answers-v124-final-production.js` | 124 | 342604 | `c8a382f0562737422e891e3300bb08f6` |

The live controller remains the active production implementation. No public Answers file, animation, routing behavior, answer copy, tags, dictionary, index, CARE rule, intent rule, or probability mechanic was changed during Phase B.

---

## B2. New private model

Created unexposed Postgres schema:

```text
private
```

Created tables:

```text
private.answers
private.answer_routing_assets
private.answer_sessions
private.answer_requests
private.answer_usage
private.answer_settings
```

All six tables have RLS enabled as defense in depth.

Explicit privileges were revoked from:

```text
PUBLIC
anon
authenticated
service_role
```

For all six tables, verification showed:

```text
anon schema USAGE             = false
authenticated schema USAGE    = false
service_role schema USAGE     = false
anon SELECT                   = false
authenticated SELECT          = false
service_role SELECT           = false
RLS enabled                   = true
```

No public/client policy was added. Server access will be introduced explicitly in the later service phase rather than exposing the corpus during the mirror phase.

---

## B3. Exact 948-row corpus mirror

The import was generated directly from the frozen/live v124 source after an extraction preflight.

Preflight result:

```text
objects                 948
ID range                 1–948
missing Thai/English     0
Universal rows           75
Support-tagged rows      44
parsed row MD5           e59dfde7321ff8f9f79691fd32bcf4d2
```

Imported into `private.answers` with IDs preserved exactly.

Post-import field-by-field comparison against a fresh parse of live v124 compared:

```text
answer_id
thai
english
topics
focus
support
helpers
is_universal
active
revision
```

Result:

```text
private rows             948
min ID                   1
max ID                   948
Universal rows           75
Support-tagged rows      44
exact field differences  0
private row MD5          e59dfde7321ff8f9f79691fd32bcf4d2
```

The private mirror therefore matches the imported live v124 data representation exactly.

The Phase A count discrepancy remains intentionally unresolved in favor of the actual source: the frozen/live v124 assets parse to 182 dictionary concepts with `kind:"focus"` and 44 Support-tagged answer rows. The plan prose's 183/42 summary is not being used to mutate production data.

---

## B4. Exact frozen routing assets

One routing/config record was imported at corpus revision `124`.

```text
router_version           1.0.0-wip
source controller        /fg-page-answers.js
source version           124
source bytes             342604
source MD5               c8a382f0562737422e891e3300bb08f6
dictionary concepts      268 total
Universal IDs            75
```

Exact source-span fingerprints stored in `private.answer_routing_assets`:

| Asset | MD5 |
|---|---|
| Answers literal | `c8e159c6f32ce9513056fbbe4585830d` |
| CARE | `406dd4fb9bd3278e5300a1b46d86fd8e` |
| Focus dictionary source | `c488cef1270aed127cfd0e6d86452bfd` |
| Focus index source | `0fca819ceb7bc2832d052e2e56b801f9` |
| INTENTS | `895bdcb00bfeddb1fe0f33be0fe83bcb` |
| Router constants | `fdda764fa67985aa66bd396630ec3cd6` |
| Router core | `0136cd0b127f4c6c30c8ec098d7ac2e8` |
| `chooseAnswer()` final fallback | `76abfbf89bb565575a48f2bead0c6981` |

The dictionary and index are also stored as parsed `jsonb` while their exact original source-span fingerprints are retained for provenance.

---

## B5. Frozen operational settings

Seeded `private.answer_settings`:

```text
prepare_token_ttl_seconds = 120
recent_limit              = 6
min_pool                  = 2
max_broad_widen           = 12
migration_source          = v124 source/provenance metadata
```

These settings do not alter production. They establish the private service configuration baseline for later phases.

---

## B6. Migrations

Applied Supabase migrations:

```text
20260817050333  answers_private_phase_b_schema
20260817050508  answers_private_phase_b_import_v124
20260817050648  answers_private_phase_b_fk_indexes
```

Additional indexes added after the Supabase performance advisor identified uncovered foreign keys:

```text
answer_requests_answer_id_idx
answer_requests_corpus_revision_idx
answer_usage_answer_id_idx
```

The private schema currently contains 13 indexes total.

---

## B7. Import guard behavior

The first attempted import correctly aborted before writing corpus data because the initially chosen router-core end marker produced a fingerprint mismatch.

Immediately after that abort:

```text
private.answers rows                0
private.answer_routing_assets rows  0
private.answer_settings rows        0
```

The marker was recalibrated against the Phase A source offsets so the intended frozen router span ended at position `260018` and retained the already-recorded MD5:

```text
0136cd0b127f4c6c30c8ec098d7ac2e8
```

The final-fallback end marker was similarly anchored to `var thaiSource=` at position `261097`, retaining:

```text
76abfbf89bb565575a48f2bead0c6981
```

The hash checks were not weakened or removed. The corrected import then passed all source assertions and completed atomically.

---

## B8. Advisor review

Supabase security advisor was run after DDL.

For the six new private tables it reported only informational `RLS enabled, no policy` notices. This is intentional for Phase B because no client role has schema usage or table privileges and no public access policy should exist.

The advisor also reported multiple pre-existing findings in unrelated public project objects. Those were not changed as part of Answers migration scope.

Supabase performance advisor identified three missing foreign-key indexes in the new private model. Those three were added in `answers_private_phase_b_fk_indexes`. Other advisor findings were pre-existing or expected zero-traffic/unused-index notices and were left outside this migration scope.

---

## B9. Empty runtime state is intentional

Current runtime-state tables remain empty:

```text
private.answer_sessions   0
private.answer_requests   0
private.answer_usage      0
```

Phase B is a data/config mirror only. Session, prepare/reveal and usage behavior belongs to later phases.

---

## B10. Phase B exit gate

```text
[x] private schema created
[x] 948 IDs imported exactly
[x] Thai/English exact
[x] topics/focus/support/helpers exact
[x] Universal membership exact
[x] exact field differences = 0
[x] frozen dictionary imported
[x] frozen index imported
[x] CARE source frozen
[x] INTENTS source frozen
[x] router constants frozen
[x] router core source frozen
[x] final fallback source frozen
[x] per-asset fingerprints recorded
[x] anon has no private access
[x] authenticated has no private access
[x] service_role has no private access by default
[x] RLS enabled as defense in depth
[x] Supabase advisors run
[x] new FK advisor findings addressed
[x] live /fg-page-answers.js still v124 / same MD5
[x] no production routing cutover performed
```

**Phase B exit condition: PASS.**

---

# Next: Phase C — canonical server routing core

Phase C must now port the v124 router with minimal syntax adaptation and zero semantic changes.

Required invariants:

```text
CARE first
normalize() exact
alias matching exact
collision repairs exact
tier construction/order exact
selectTier() exact
Support ownership/addition exact
RECENT_LIMIT = 6
MIN_POOL = 2
MAX_BROAD_WIDEN = 12
exactly 2 distinct Universal additions on matched non-generic routes
one uniform final pick over eligible
probability = 1 / eligible.length
final fallback order exact
physical depth remains non-semantic
```

The canonical core must accept an injectable deterministic RNG and remain isolated from public production. No public API/cutover should occur in Phase C.

Phase D deterministic parity remains the hard gate before any production routing replacement.
