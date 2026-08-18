# ChatGPT Workflow — Flipgazine / The Book of Answers

**Purpose:** canonical human-readable documentation for continuing the Answers project across ChatGPT sessions.

This folder contains current operational authority, editorial methodology, Batch 2 provenance, buyer-export rules, commercialization planning and the completed private-server migration record.

---

## Read first

For current Answers work, use this order:

1. `ANSWERS-BATCH2-CORPUS-ROUTING-REACHABILITY-IMPLEMENTATION-REPORT.md` — **current live implementation checkpoint**: definitive production cycle, technical first20 full corpus promotion, revision 126 verification, routing-service v5 and current next action.
2. `ANSWERS-BATCH2-TECH-PILOT-COMPLETION-REPORT.md` — B2-0001–B2-0020 full-cycle record: 4 ACCEPT / 9 EDIT / 7 REWRITE, non-metric provenance, enrichment, validation, corpus IDs 949–968 and buyer preview.
3. `ANSWERS-BATCH2-BUYER-DATA-EXTRACTION-SPEC.md` — **governing buyer export contract**: corpus vs benchmark count language, technical-pilot treatment, clean replacement set, JSONL/CSV schema, routing evidence and per-promotion export checkpoint.
4. `ANSWERS-BATCH2-ACTIVE-REVIEW-ORDER-CORRECTION.md` — historical correction that restored the first20 review before clean production. Its immediate-next-action text is superseded by the current implementation report where necessary.
5. `ANSWERS-BATCH2-HUMAN-FIRST-REVIEW-CORRECTION.md` — machine judgments are sealed until the native-human ACCEPT / EDIT / REWRITE decision is committed.
6. `ANSWERS-BATCH2-CORPUS-ROUTING-REACHABILITY-PLAN.md` — governing routing/promotion architecture: same canonical Book corpus, same semantics, deterministic reachability and atomic 20-row promotion.
7. `ANSWERS-BATCH2-SELF-AUDIT-IMPLEMENTATION-REPORT.md` — generation/audit infrastructure history; use newer implementation reports for current state.
8. `ANSWERS-BATCH2-SELF-AUDIT-PROTOCOL.md` — frozen generation, ChatGPT self-audit, Qwen escalation and historical blind-assignment protocol. Human visibility is superseded by the human-first correction.
9. `ANSWERS-COMMERCIAL-EXECUTION-TIMELINE.md` — commercialization schedule.
10. `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md` — commercial positioning, licensing and methodology claim boundaries.
11. `ANSWERS-VOICE-TONE.md` — Thai / English editorial authority.
12. `ANSWERS-VOICE-BENCHMARK-PLAN.md` — public Voice evaluator design history.
13. `ANSWERS-HUMAN-EVALUATION-SCHEME.md` — human-evaluation deliverable.
14. `ANSWERS-HUMAN-REVIEW.md` — immutable Batch 1 provenance.
15. `ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md` — final private-server migration proof.

Repository-root `AGENTS.md` remains the short operational entry point.

---

## Current authority boundaries

- **Current production state / cycle order:** `ANSWERS-BATCH2-CORPUS-ROUTING-REACHABILITY-IMPLEMENTATION-REPORT.md`.
- **First20 technical evidence:** `ANSWERS-BATCH2-TECH-PILOT-COMPLETION-REPORT.md`.
- **Buyer extraction / counts / schema:** `ANSWERS-BATCH2-BUYER-DATA-EXTRACTION-SPEC.md`.
- **Human-review visibility:** `ANSWERS-BATCH2-HUMAN-FIRST-REVIEW-CORRECTION.md`.
- **Routing architecture:** `ANSWERS-BATCH2-CORPUS-ROUTING-REACHABILITY-PLAN.md`.
- **Frozen generation/audit design:** `ANSWERS-BATCH2-SELF-AUDIT-PROTOCOL.md`.
- **Commercial methodology:** `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md`.
- **Thai / English editorial decisions:** `ANSWERS-VOICE-TONE.md`.
- **Batch 1 provenance:** `ANSWERS-HUMAN-REVIEW.md`.
- **Completed security migration:** `ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md`.

When older checkpoint wording conflicts with a newer authority, follow the newer document that owns that decision. In particular, older statements that B2-0001–B2-0020 are “not promotion eligible” are superseded: they are now corpus-linked as reviewed technical-pilot content while remaining excluded from clean benchmark metrics.

---

## Definitive Batch 2 production rhythm

For every clean 20-row unit:

```text
frozen scenarios / drafts / sealed audits
→ native-human REVIEW 20
→ reveal machine comparison
→ ENGLISH from final Thai
→ semantic + dictionary ENRICHMENT
→ reachability + Batch 1 regression VALIDATION
→ atomic PROMOTION
→ live VERIFY
→ buyer EXPORT PREVIEW
→ NEXT 20
```

Do not generate later units before the preceding unit has passed its full promotion + verification + export checkpoint unless a governing document explicitly changes this cadence.

---

## Current project checkpoint — 18 August 2026

### Canonical Book

```text
corpus revision                126
active canonical answers       968
Batch 1 reviewed answers       948
B2 technical-pilot answers      20
active index-unreachable         0
surface collisions               0
```

The first20 were atomically added as answer IDs **949–968**.

### B2-0001–B2-0020

```text
human review          COMPLETE 20/20
ACCEPT                  4
EDIT                    9
REWRITE                 7
semantic enrichment    COMPLETE
routing validation     PASS
corpus promotion       COMPLETE
buyer preview          COMPLETE
record_class           technical_pilot
benchmark eligible     NO
corpus linked          YES
```

B2-0001 alone has the historical human-first exposure exception. The original escaped-linebreak raw-draft defect remains preserved for all 20.

Promotion proof:

```text
base revision       125
new revision        126
promotion id        1
promotion class     technical_pilot
answer IDs          949–968
```

Buyer preview:

```text
ANSWERS-B2-TECH-PILOT-v1-preview
rows 20 · revision 126
SHA-256 6a6e0ca0d51b3d342d0f4a14521df5466c6f8e0e8b9d3c94fe7bff4c4ee92a2d
```

### Current clean unit

**B2-0021–B2-0040** is the active first clean metric-eligible production unit in `/answers-thai-review-batch2.html`.

It was prepared with real LF raw drafts and sealed machine evidence. Its human decisions belong in `private.batch2_human_reviews` and, after all 20 are complete, it follows the full cycle above.

### Benchmark / corpus count rule

Do not confuse the canonical Book count with the clean benchmark denominator.

Planned final structure:

```text
CANONICAL BOOK
Batch 1                            948
Original Batch 2                 1,000
--------------------------------------
canonical reviewed corpus        1,948

CLEAN BATCH 2 BENCHMARK
B2-0021–B2-1000                    980
B2R clean supplemental              20
--------------------------------------
clean benchmark                   1,000
```

The first20 technical rows are part of the canonical Book but not part of the clean benchmark denominator. The 20 future B2R rows are clean benchmark replacements and must never overwrite B2-0001–B2-0020.

---

## Current infrastructure

- `batch2-production-review-service` — clean human-first reviewer service.
- `batch2-routing-service` — **v5 ACTIVE, JWT verified**, deterministic validation/promotion service using PostgreSQL-canonical JSONB hashes.
- `private.batch2_deploy_reviews` — private deployment compatibility view separating record class / benchmark eligibility from corpus usability.
- `private.batch2_semantic_staging` — English + semantics + dictionary delta + probes.
- `private.batch2_routing_checks` — append-only validation proof.
- `private.batch2_promotions` — append-only promotion proof with `promotion_class`.
- `private.batch2_answer_map` — immutable B2 source → canonical answer mapping.
- `private.batch2_buyer_export_snapshots` — private export-QA snapshots.

Machine proof for the completed first20 cycle:

```text
../../answers-private-server/batch2-tech-pilot-full-cycle-proof.json
```

---

## Security migration archive

The private-server migration was completed on 17 August 2026. Keep the phase reports as diligence evidence; do not reopen the migration as a planning dependency unless a verified regression appears.

The final authority is:

```text
ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md
```

Executable router/parity code and machine proof stay in `../../answers-private-server/`. Deployed Edge Function mirrors stay in `../../supabase/functions/`. Wider Flipgazine shell documentation stays outside this workflow folder.

---

## Immediate next action

Continue native-human review of **B2-0021–B2-0040**.

When the twentieth clean decision is committed, do **not** manually copy rows into the corpus. Continue through:

```text
English
→ semantics / aliases / typos / concepts
→ deterministic validation
→ atomic promotion
→ live verification
→ buyer export preview
→ next 20
```
