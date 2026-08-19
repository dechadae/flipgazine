# ChatGPT Workflow — Flipgazine / The Book of Answers

**Purpose:** canonical human-readable documentation for continuing the Answers project across ChatGPT sessions.

This folder contains current operational authority, editorial methodology, Batch 2 provenance, buyer-export rules, commercialization planning and the completed private-server migration record.

---

## Read first

For current Answers work, use this order:

1. `ANSWERS-BATCH2-CORPUS-ROUTING-REACHABILITY-IMPLEMENTATION-REPORT.md` — **current corpus-production architecture**: definitive production cycle, technical first20 promotion and routing-service v5. Use the newer commercial execution timeline and this README for the latest live checkpoint where snapshot wording has advanced.
2. `ANSWERS-THAI-CONVERSATION-JUDGE-ARCHITECTURE.md` — **current live machine-evaluation architecture**: shared TCJ core, General Thai + Answers Voice profiles, CARE override, server-side calibration/provenance and Batch 2 integration.
3. `ANSWERS-TCJ-MULTI-JUDGE-CONSENSUS-ARCHITECTURE.md` — **approved next-stage TCJ Panel method, not yet live**: native-human-grounded judge admission, per-dimension competence, qualified calibrated consensus, disagreement evidence and human escalation. Raw majority voting is explicitly rejected.
4. `ANSWERS-TCJ-LIVE-DEPLOYMENT-20260819.md` — **final live TCJ deployment checkpoint**: runtime/proxy versions, internal-boundary hardening, Voice UI cutover and smoke verification. This supersedes only the live version snapshot in the architecture document.
5. `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md` — **governing TCJ commercial-use boundary**: benchmark/evaluation rights vs model-development use, mixed-provenance classes, buyer diligence, default licensing scope and provider-terms review controls.
6. `ANSWERS-BATCH2-TECH-PILOT-COMPLETION-REPORT.md` — B2-0001–B2-0020 full-cycle record: 4 ACCEPT / 9 EDIT / 7 REWRITE, non-metric provenance, enrichment, validation, corpus IDs 949–968 and buyer preview.
7. `ANSWERS-BATCH2-BUYER-DATA-EXTRACTION-SPEC.md` — **governing buyer export contract**: corpus vs benchmark count language, technical-pilot treatment, clean replacement set, JSONL/CSV schema, routing evidence and per-promotion export checkpoint.
8. `ANSWERS-BATCH2-ACTIVE-REVIEW-ORDER-CORRECTION.md` — historical correction that restored the first20 review before clean production. Its immediate-next-action text is superseded by newer implementation/checkpoint documents.
9. `ANSWERS-BATCH2-HUMAN-FIRST-REVIEW-CORRECTION.md` — machine judgments are sealed until the native-human ACCEPT / EDIT / REWRITE decision is committed.
10. `ANSWERS-BATCH2-CORPUS-ROUTING-REACHABILITY-PLAN.md` — governing routing/promotion architecture: same canonical Book corpus, same semantics, deterministic reachability and atomic 20-row promotion.
11. `ANSWERS-BATCH2-SELF-AUDIT-IMPLEMENTATION-REPORT.md` — generation/audit infrastructure history; use newer implementation reports for current state.
12. `ANSWERS-BATCH2-SELF-AUDIT-PROTOCOL.md` — frozen generation and ChatGPT self-audit protocol plus historical Qwen-v1 design. Human visibility is superseded by the human-first correction; new Qwen runs use the TCJ architecture document above.
13. `ANSWERS-COMMERCIAL-EXECUTION-TIMELINE.md` — commercialization schedule and newer production checkpoint.
14. `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md` — commercial positioning, licensing and methodology claim boundaries.
15. `ANSWERS-VOICE-TONE.md` — Thai / English editorial authority.
16. `ANSWERS-VOICE-BENCHMARK-PLAN.md` — public Voice evaluator design history.
17. `ANSWERS-HUMAN-EVALUATION-SCHEME.md` — human-evaluation deliverable.
18. `ANSWERS-HUMAN-REVIEW.md` — immutable Batch 1 provenance.
19. `ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md` — final private-server migration proof.

Repository-root `AGENTS.md` remains the short operational entry point.

---

## Current authority boundaries

- **Current production state / cycle order:** `ANSWERS-COMMERCIAL-EXECUTION-TIMELINE.md` for the newest checkpoint, together with `ANSWERS-BATCH2-CORPUS-ROUTING-REACHABILITY-IMPLEMENTATION-REPORT.md` for the production architecture.
- **Machine-evaluation architecture / live TCJ:** `ANSWERS-THAI-CONVERSATION-JUDGE-ARCHITECTURE.md`.
- **Approved TCJ multi-judge / Panel method:** `ANSWERS-TCJ-MULTI-JUDGE-CONSENSUS-ARCHITECTURE.md` — approved methodology only; not a live deployment claim.
- **Live TCJ component versions / deployment verification:** `ANSWERS-TCJ-LIVE-DEPLOYMENT-20260819.md`.
- **TCJ commercial-use / benchmark-vs-model-development / provenance boundary:** `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md`.
- **First20 technical evidence:** `ANSWERS-BATCH2-TECH-PILOT-COMPLETION-REPORT.md`.
- **Buyer extraction / counts / schema:** `ANSWERS-BATCH2-BUYER-DATA-EXTRACTION-SPEC.md`.
- **Human-review visibility:** `ANSWERS-BATCH2-HUMAN-FIRST-REVIEW-CORRECTION.md`.
- **Routing architecture:** `ANSWERS-BATCH2-CORPUS-ROUTING-REACHABILITY-PLAN.md`.
- **Frozen generation / ChatGPT self-audit design:** `ANSWERS-BATCH2-SELF-AUDIT-PROTOCOL.md`.
- **Commercial methodology:** `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md`.
- **Thai / English editorial decisions:** `ANSWERS-VOICE-TONE.md`.
- **Batch 1 provenance:** `ANSWERS-HUMAN-REVIEW.md`.
- **Completed security migration:** `ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md`.

When older checkpoint wording conflicts with a newer authority, follow the newer document that owns that decision. In particular:

- older statements that B2-0001–B2-0020 are “not promotion eligible” are superseded: they are corpus-linked reviewed technical-pilot content while remaining excluded from clean benchmark metrics;
- B2-0021–B2-0040 has completed the full production cycle and is live at corpus revision 127; older text describing it as only human-reviewed is superseded;
- `B2-QWEN-AUDIT-v1` remains immutable historical evidence, while new selected Qwen audits are governed by `TCJ-ANSWERS-BFF-v2` through the shared TCJ runtime;
- TCJ Panel is approved as a future methodology but has not replaced the live single-judge TCJ Standard path;
- TCJ source/API/private-deployment access does **not** imply model-development rights. The default commercial path is Benchmark Use only unless a separately reviewed written agreement expressly grants broader rights.

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

## Current project checkpoint — 20 August 2026

### Canonical Book

```text
corpus revision                127
active canonical answers       988
Batch 1 reviewed answers       948
original Batch 2 corpus-linked  40
  technical B2-0001–0020        20
  clean B2-0021–0040            20
active index-unreachable         0
surface collisions               0
```

Canonical mappings:

```text
B2-0001–B2-0020 → answer IDs 949–968
B2-0021–B2-0040 → answer IDs 969–988
```

### B2-0001–B2-0020 · technical pilot

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

### First clean metric unit · B2-0021–B2-0040

The first clean unit has completed the **entire production cycle**:

```text
human review          COMPLETE 20/20
ACCEPT                  9
EDIT                    8
REWRITE                 3
English adaptation     COMPLETE 20/20
semantic staging       COMPLETE 20/20
routing validation     PASS
Batch 1 regressions    0
corpus promotion       COMPLETE
promotion id           2
corpus revision        127
answer IDs             969–988
buyer preview          COMPLETE
```

Buyer-export checkpoint:

```text
ANSWERS-B2-CLEAN-0021-0040-v1-preview
rows 20 · revision 127
SHA-256 dc5bef48ccc93032eacbbb69d58b300ea9664654d5b7d15cf3a0970ab190f8df
```

The frozen B2-0021–B2-0040 human decisions remain the intended first comparison set for `answers-bff-v2`. Any TCJ rerun must be stored separately as `calibration_rerun`; it must never overwrite the original Qwen-v1 judgment or human decision.

### Current clean unit · B2-0041–B2-0060

Verified current state:

```text
active rows                       20 / 20
raw drafts                        20 / 20
real LF integrity                 20 / 20
sealed ChatGPT self-audits        20 / 20
Qwen / TCJ audits                  0 / 20
human reviews                      0 / 20
active protocol exceptions             0
```

This is the active production unit. Human review remains gated behind the required sealed machine evidence for each row.

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

### Batch 2 / corpus

- `batch2-production-review-service` — clean human-first reviewer service.
- `batch2-routing-service` — **v5 ACTIVE, JWT verified**, deterministic validation/promotion service using PostgreSQL-canonical JSONB hashes.
- `private.batch2_deploy_reviews` — private deployment compatibility view separating record class / benchmark eligibility from corpus usability.
- `private.batch2_semantic_staging` — English + semantics + dictionary delta + probes.
- `private.batch2_routing_checks` — append-only validation proof.
- `private.batch2_promotions` — append-only promotion proof with `promotion_class`.
- `private.batch2_answer_map` — immutable B2 source → canonical answer mapping.
- `private.batch2_buyer_export_snapshots` — private export-QA snapshots.

### Thai Conversation Judge

```text
tcj-engine                v2 ACTIVE · canonical semantic/calibration runtime
voice-eval                v10 ACTIVE · thin public compatibility proxy
batch2-qwen-audit         v3 ACTIVE · JWT-verified internal compatibility proxy
TCJ core                  TCJ-CORE-v1
General profile           TCJ-GENERAL-v1
Answers profile           TCJ-ANSWERS-BFF-v2
Guard set                 TCJ-GUARDS-v1
TCJ Panel                 APPROVED METHOD · NOT YET LIVE
```

The v2/v3 runtime hardening adds a private server-to-server credential to the Batch 2 path in addition to the active-session/admin checks. The credential is sourced from the Edge runtime environment and is never sent to browsers or committed to the repository.

Private append-only TCJ evidence tables:

```text
private.tcj_guard_definitions
private.tcj_evaluation_runs
private.tcj_guard_applications
private.batch2_tcj_links
```

At this checkpoint, no TCJ `calibration_rerun` has been stored and the TCJ research-run/link tables remain empty. Public Voice submissions are not persisted into those research tables.

The approved TCJ Panel method adds a future competence-gated multi-judge layer but does not alter the currently deployed endpoints or tables merely by being documented.

Machine proof for the completed first20 corpus cycle:

```text
../../answers-private-server/batch2-tech-pilot-full-cycle-proof.json
```

Deployed Edge Function mirrors are under `../../supabase/functions/`, including the `tcj-engine/` source and schema.

---

## TCJ commercial-use boundary

Default licensing is explicitly split from model-development rights.

```text
TCJ Benchmark License
✓ independent evaluation / comparison
✓ Thai QA / regression testing
✓ safety / linguistic research
✓ model-card or internal reporting
✓ finalized release gating
✓ scoped application-layer QA

not granted by default
✗ SFT / fine-tuning supervision
✗ preference / RLHF / DPO / RLAIF labels
✗ reward-model or distillation targets
✗ synthetic-training-data filtering
✗ checkpoint optimization
✗ other model-development feedback loops
```

The detailed definitions, mixed-provenance matrix, frontier-lab examples, buyer diligence question, deal-record requirements and terms-change control live in:

```text
ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md
```

That document is the current authority whenever a buyer asks whether TCJ can be used to benchmark a model versus train, fine-tune, optimize or otherwise develop one.

For TCJ Panel specifically, each additional judge/provider adds its own provenance and provider-terms diligence requirement before its outputs are used in a commercial panel.

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

### Batch 2 production

Continue **B2-0041–B2-0060** through the normal human-first cycle:

```text
required Qwen / TCJ evidence sealed
→ native-human REVIEW 20
→ reveal machine comparison
→ English from final Thai
→ semantic / alias / typo / concept enrichment
→ deterministic validation
→ atomic promotion
→ live verification
→ buyer export preview
```

### TCJ Panel research

The newly approved Panel method is a separate research/architecture track:

```text
freeze Judge Admission protocol
→ test candidate models on the existing 36-case native-human calibration suite
→ measure per-model + per-dimension competence
→ native-human review of failure patterns
→ qualify / partially qualify / research-only / reject
→ select the initial qualified panel
→ implement and shadow-test before any production cutover
```

Do not modify the live TCJ Standard path merely because Panel architecture has been approved.