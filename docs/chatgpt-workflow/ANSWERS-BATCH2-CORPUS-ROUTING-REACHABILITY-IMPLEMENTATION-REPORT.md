# The Book of Answers — Batch 2 Corpus, Routing & Reachability Implementation Report

**Status:** TECHNICAL PILOT FULL CYCLE COMPLETE · CLEAN PRODUCTION UNIT ACTIVE  
**Updated:** 18 August 2026  
**Supabase project:** `sjpvhgxacsiorrtijqua`  
**Governing routing plan:** `ANSWERS-BATCH2-CORPUS-ROUTING-REACHABILITY-PLAN.md`  
**Human-review authority:** `ANSWERS-BATCH2-HUMAN-FIRST-REVIEW-CORRECTION.md`  
**Buyer extraction authority:** `ANSWERS-BATCH2-BUYER-DATA-EXTRACTION-SPEC.md`  
**Machine proof:** `../../answers-private-server/batch2-tech-pilot-full-cycle-proof.json`

---

## 1. Current implementation verdict

The Batch 2 production path is implemented end to end.

Batch 2 does **not** have a separate runtime. Once a reviewed answer is promoted, it becomes an ordinary canonical `private.answers` row and uses exactly the same Book routing graph, dictionary, index builder, semantic pools, universal mixing, recent-answer exclusion and private reveal path as Batch 1.

The first 20 technical-pilot records have now been taken through the complete post-review deployment cycle and are live in the canonical Book. Their technical provenance remains separate from clean benchmark eligibility.

Current canonical state:

```text
corpus revision                 126
parent revision                 125
active answers                  968
Batch 1 answers                 948
B2 technical-pilot answers       20
B2-0001 canonical answer_id     949
B2-0020 canonical answer_id     968
active index-unreachable          0
normalized surface collisions     0
```

The current clean human-review unit remains **B2-0021–B2-0040**.

---

## 2. Definitive production cycle

This is the governing 20-row rhythm from this checkpoint forward:

```text
frozen source scenarios
→ frozen ChatGPT Thai drafts
→ raw LF integrity gate
→ sealed ChatGPT diagnosis
→ required/selected sealed Qwen diagnosis
→ native-human ACCEPT / EDIT / REWRITE
→ immutable final Thai
→ machine comparison revealed
→ English adaptation from final Thai
→ Batch 1-compatible semantic tagging
→ alias / typo / concept enrichment where justified
→ realistic reachability probes
→ deterministic routing + Batch 1 regression validation
→ atomic 20-row corpus + dictionary + index promotion
→ verify live revision / mappings / routing / reveal
→ generate or update the internal buyer-export preview
→ only then prepare the next 20
```

Short form:

```text
REVIEW 20
→ ENGLISH
→ ENRICH
→ VALIDATE
→ PROMOTE
→ VERIFY
→ EXPORT PREVIEW
→ NEXT 20
```

The buyer-export checkpoint is part of the production cycle, not an optional end-of-project cleanup step. It catches provenance/export defects while the unit is still fresh.

---

## 3. Technical pilot: review evidence vs deployment eligibility

B2-0001–B2-0020 have two separate status dimensions.

### Benchmark status

They remain:

```text
record_class                    technical_pilot
buyer_export_included           true
benchmark_metric_eligible       false
```

Why they are excluded from the clean benchmark denominator:

1. their original immutable raw draft records stored intended line breaks as literal escaped transport text rather than real LF bytes;
2. B2-0001 additionally has a machine-judgment visibility exception from before the final human-first UI correction.

These defects are provenance defects. They are preserved and disclosed rather than silently repaired.

### Corpus status

Their **final native-human-reviewed Thai is valid Book content**. Therefore the deployment layer now treats benchmark eligibility and corpus usability independently.

All 20 are now:

```text
human reviewed                  true
semantic enriched               true
routing validated               true
corpus linked                   true
active in private.answers       true
```

They are not copied into the official clean `private.batch2_human_reviews` table. The technical review evidence remains in its original technical lane, while `private.batch2_deploy_reviews` provides a private deploy-time compatibility view.

---

## 4. Technical-pilot human review result

Completed native-human decisions:

```text
reviewed          20 / 20
ACCEPT              4
EDIT                9
REWRITE             7
```

This 4/9/7 split is a **technical-pilot observation**, not an official Batch 2 benchmark metric.

ChatGPT pre-human diagnosis exists for all 20 rows. Qwen diagnosis exists for 18 rows under the frozen escalation rules.

Machine judgments remain evidence, not editorial authority.

---

## 5. Deploy-review bridge

A private deployment bridge was added so corpus usability does not require rewriting benchmark provenance.

### `private.batch2_deploy_reviews`

Security-invoker private view that presents a common deployment contract for:

- clean official human reviews from `private.batch2_human_reviews`;
- technical-pilot final reviews from `public.answers_thai_reviews` round `batch2-tech-pilot-v1`.

It exposes deployment fields such as:

```text
source_id
decision
final_thai
final_sha256
reviewed_at
record_class
benchmark_metric_eligible
human_first_protocol_compliant
```

For the technical 20:

```text
benchmark_metric_eligible = false   for all 20
human_first_protocol_compliant = false only for B2-0001
```

The view has no direct `anon`, `authenticated` or `service_role` access.

`private.batch2_stage_semantics`, its trigger helper, and `private.batch2_promote_unit` were updated to use this deployment contract while retaining their private / owner-only execution model.

`private.batch2_promotions` now records:

```text
promotion_class = clean_metric | technical_pilot
```

This keeps corpus deployment provenance explicit.

---

## 6. Semantic enrichment of B2-0001–B2-0020

English adaptations were created only **after** the human Thai decisions were complete.

All 20 then received Batch 1-compatible:

```text
topics[]
focus[]
support[]
helpers[]
is_universal
probe_questions[]
```

No technical row was made universal.

The unit required only three genuinely new focus concepts:

```text
consistency
home
stress
```

These were added atomically with the unit. Existing concepts were reused everywhere else.

No normalized alias/typo ownership collision was introduced.

---

## 7. Routing and reachability validation

The first complete validation found:

```text
alias collisions            0
semantic-zero rows          0
index-unreachable rows      0
probe-unreachable rows      0
Batch 1 regressions         0
```

Every one of the 20 original source scenarios reached its corresponding candidate answer through the same routing logic used by the Book.

Examples include:

```text
B2-0001 → answer 949 via relationship / situationship / direct-talk routing
B2-0019 → answer 967 through the new `home` focus
B2-0020 → answer 968 through `stress` + work context
```

The current hard CARE interceptor was not weakened to improve reachability.

### Canonical hash bridge discovered during this first full run

The first routing preflight correctly passed all parser and regression tests, but its original Edge implementation calculated SHA-256 over JavaScript `JSON.stringify(...)`, while the database promotion gate hashes PostgreSQL canonical `jsonb::text`.

Those two serializations can represent identical JSON while producing different byte strings and therefore different hashes.

For this technical unit, a second persisted check was generated using database-canonical JSONB hashes before promotion:

```text
parser / probe check id       1
canonical hash check id       2
```

Check 2 retained check 1's zero-failure routing evidence and recomputed the candidate dictionary, index and semantic manifest hashes in the exact format required by the promotion gate.

The production routing service was then fixed so future clean units use database-canonical JSONB hashes directly.

---

## 8. Atomic technical-pilot promotion

Promotion proof:

```text
promotion id                  1
promotion class               technical_pilot
base revision                 125
new revision                  126
answer IDs                    949–968
active count                  948 → 968
routing check                 2
```

Integrity hashes:

```text
dictionary SHA-256  453996612271cd15bf942ca764d6e63fb32e50a6c3ec884ab477fb4a255f2438
index SHA-256       d6f8df9cf5658690cb7ab809c5e616344c5c61ff03fadb1996671dda4f9e30b6
promotion SHA-256   bfe59d7edef89f98b5be576f4350eb0c52c8effbacd43e87d0026b17b73260c0
```

The corpus revision source is:

```text
batch2-technical-pilot-promotion
```

The atomic transaction wrote:

- 20 canonical `private.answers` rows;
- a new routing dictionary and index for revision 126;
- the new corpus revision;
- one immutable promotion record;
- 20 immutable B2 source → canonical answer mappings;
- promoted status on all 20 semantic rows.

---

## 9. Post-promotion verification

Verified live after commit:

```text
corpus revision                         126
active answers                          968
max answer_id                           968
B2 source → answer mappings              20
semantic rows promoted                   20
active answers unreachable from index     0
normalized alias/typo collisions          0
technical rows in clean human table        0
technical rows in clean metric denominator 0
human-first exceptions                    1  (B2-0001 only)
```

The three new concepts each exist once in the live revision-126 dictionary.

The technical records therefore have a permanent source → review → final Thai → semantics → canonical answer → corpus revision lineage without being misrepresented as clean benchmark observations.

---

## 10. Buyer-export checkpoint

The first internal export preview is frozen in the private database:

```text
snapshot_name      ANSWERS-B2-TECH-PILOT-v1-preview
schema_version     ANSWERS-B2-BUYER-v1
records            20
corpus_revision    126
snapshot SHA-256   6a6e0ca0d51b3d342d0f4a14521df5466c6f8e0e8b9d3c94fe7bff4c4ee92a2d
```

It contains, per record:

```text
source provenance
raw AI generation + raw hash
normalized display copy for the technical transport defect
ChatGPT / Qwen machine judgments
native-human decision + final Thai + final hash
human-first compliance flag
English adaptation
semantic routing fields
dictionary delta
reachability evidence
canonical answer_id
corpus revision and promotion hashes
```

This is an internal QA snapshot, not a public asset and not a buyer delivery yet.

---

## 11. Routing service current state

`batch2-routing-service` is now **version 5 ACTIVE** with Supabase gateway JWT verification enabled.

Current deployment SHA-256:

```text
b12acd588ec37c4d57ce44db5b5e0d299723be171c0a3c618aa9555ac19f0d48
```

Version 5 fixes:

- deployment reads through `private.batch2_deploy_reviews`;
- clean and technical record classes stay explicit;
- candidate dictionary/index/semantic hashes use PostgreSQL canonical `jsonb::text` SHA-256;
- persisted routing reports are JSONB objects rather than JSON-string payloads;
- promotion submits the candidate dictionary through an explicit text→JSONB conversion matching the database gate.

The production reviewer remains separate and continues to enforce the clean human-first review flow for B2-0021 onward.

---

## 12. Current next action

The technical first-20 cycle is **closed**.

Do not re-review or regenerate B2-0001–B2-0020.

Continue with:

```text
B2-0021–B2-0040 native-human review
→ English adaptation from final Thai
→ semantic/dictionary enrichment
→ routing + regression validation
→ atomic promotion to the next corpus revision
→ live verification
→ buyer-export preview update
→ prepare B2-0041–B2-0060
```

The 20 technical records remain visible in buyer provenance and live in the Book, but they never enter clean Batch 2 benchmark percentages.
