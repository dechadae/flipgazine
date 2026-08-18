# ChatGPT Workflow — Flipgazine / The Book of Answers

**Purpose:** canonical human-readable documentation for continuing the Answers project across ChatGPT sessions.

This folder keeps the project plans, editorial authority, provenance records, commercial workflow and completed security-migration audit trail together. Executable code and machine proof artifacts remain outside this folder.

## Read first

The repository-root `AGENTS.md` is the short operational entry point. It contains the current source-of-truth rules and points here for deeper documentation.

For current Answers work, use this order:

1. `ANSWERS-BATCH2-CORPUS-ROUTING-REACHABILITY-IMPLEMENTATION-REPORT.md` — **current live checkpoint**: Batch 2 production reviewer, LF integrity gate, 129-focus reconciliation, semantic staging, alias/typo enrichment, reachability validation and atomic 20-row corpus promotion are implemented; clean unit B2-0021–B2-0040 is ready for human-first review.
2. `ANSWERS-BATCH2-HUMAN-FIRST-REVIEW-CORRECTION.md` — governing human-review exposure rule: all machine judgments are sealed from the native-human reviewer until the first ACCEPT / EDIT / REWRITE decision is committed. This supersedes the earlier 900-assisted / 100-blind visibility design.
3. `ANSWERS-BATCH2-CORPUS-ROUTING-REACHABILITY-PLAN.md` — governing Batch 2 routing/promotion specification: same canonical `private.answers` schema, same focus/topic/support/helper routing, dictionary alias/typo enrichment, per-answer reachability proof, atomic 20-row promotion and Batch 1 regression protection. The implementation report above records its current live implementation.
4. `ANSWERS-BATCH2-SELF-AUDIT-IMPLEMENTATION-REPORT.md` — underlying Batch 2 generation/audit infrastructure record. Read together with the newer human-first and routing implementation reports where its older pre-pilot checkpoint is superseded.
5. `ANSWERS-COMMERCIAL-EXECUTION-TIMELINE.md` — dated commercialization schedule and milestones; older Batch 2 checkpoint text should be interpreted through the live implementation report above.
6. `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md` — commercial strategy, Batch 2 methodology, positioning, licensing scope and claim boundaries.
7. `ANSWERS-BATCH2-SELF-AUDIT-PROTOCOL.md` — frozen Batch 2 generation, self-audit, Qwen escalation and historical blind-assignment design. Its reviewer-exposure rule is superseded by the human-first correction.
8. `ANSWERS-VOICE-TONE.md` — canonical Thai/English editorial authority and AI-transfer findings.
9. `ANSWERS-VOICE-BENCHMARK-PLAN.md` — public Thai-response evaluator design. Older numeric public-score material is superseded by the newer qualitative Voice-page implementation and Batch 2 claim boundary.
10. `ANSWERS-HUMAN-EVALUATION-SCHEME.md` — approved human-evaluation deliverable and rights/scope model.
11. `ANSWERS-HUMAN-REVIEW.md` — immutable Batch 1 Thai human-review methodology and provenance record.
12. `ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md` — frozen proof of the completed private-server migration.

## Security migration archive

The private-server migration is complete as of 17 August 2026. The following files are retained as implementation and diligence evidence, not as pending work:

- `ANSWERS-PRIVATE-SERVER-MIGRATION-PLAN.md` — original security specification.
- `ANSWERS-PRIVATE-SERVER-PHASE-A-INVENTORY.md`
- `ANSWERS-PRIVATE-SERVER-PHASE-B-REPORT.md`
- `ANSWERS-PRIVATE-SERVER-PHASE-C-REPORT.md`
- `ANSWERS-PRIVATE-SERVER-PHASE-D-PARITY-REPORT.md`
- `ANSWERS-PRIVATE-SERVER-PHASE-E-REPORT.md`
- `ANSWERS-PRIVATE-SERVER-PHASE-F-REPORT.md`
- `ANSWERS-PRIVATE-SERVER-PHASE-G-REPORT.md`
- `ANSWERS-PRIVATE-SERVER-PHASE-H-REPORT.md`
- `ANSWERS-PRIVATE-SERVER-PHASE-I-ACCEPTANCE-REPORT.md`
- `ANSWERS-PRIVATE-SERVER-PHASE-J-CUTOVER-REPORT.md`
- `ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md`

Phase K is the best single document for the final post-cutover state. Phase J records the production cutover itself. Phase D/H/I contain the deterministic parity and acceptance evidence.

## Current authority boundaries

- **Architecture / operational guardrails:** repository-root `AGENTS.md`.
- **Current live Batch 2 checkpoint:** `ANSWERS-BATCH2-CORPUS-ROUTING-REACHABILITY-IMPLEMENTATION-REPORT.md`.
- **Current Batch 2 human-review exposure rule:** `ANSWERS-BATCH2-HUMAN-FIRST-REVIEW-CORRECTION.md`.
- **Batch 2 corpus/routing/reachability specification:** `ANSWERS-BATCH2-CORPUS-ROUTING-REACHABILITY-PLAN.md`.
- **Batch 2 generation/audit implementation history:** `ANSWERS-BATCH2-SELF-AUDIT-IMPLEMENTATION-REPORT.md`.
- **Current schedule:** `ANSWERS-COMMERCIAL-EXECUTION-TIMELINE.md`.
- **Commercial methodology / claims / licensing:** `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md`.
- **Frozen generation/audit protocol and historical blind assignment:** `ANSWERS-BATCH2-SELF-AUDIT-PROTOCOL.md`.
- **Thai and English editorial decisions:** `ANSWERS-VOICE-TONE.md`.
- **Public Voice evaluator:** live `/voice.html`; `ANSWERS-VOICE-BENCHMARK-PLAN.md` is design history where older numeric-score text conflicts with the live qualitative evaluator.
- **Human evaluation deliverable:** `ANSWERS-HUMAN-EVALUATION-SCHEME.md`.
- **Batch 1 provenance:** `ANSWERS-HUMAN-REVIEW.md`.
- **Completed migration proof:** `ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md`.

When documents overlap, use the document that owns the decision. The 18 August 2026 human-first correction and corpus/routing implementation report are authoritative over older pre-pilot or assisted-review text.

## Files intentionally kept elsewhere

`../../answers-private-server/` contains executable router/parity code and machine-readable proof artifacts, including `batch2-routing-implementation-proof.json`. It is not documentation and should remain separate.

`../../supabase/functions/` contains the deployed/repository-mirrored Edge Function source, including `batch2-qwen-audit`, `batch2-production-review-service`, and `batch2-routing-service`.

`../../flipgazine-root-3/` contains Cloudflare Pages shell code and shell-specific README/deployment documentation. Those files describe wider Flipgazine infrastructure, not the Answers ChatGPT workflow.

Historical Supabase `/wip/` and `/private/` corpus artifacts remain evidence/recovery material and are not replaced by this documentation folder.

## Current project checkpoint — 18 August 2026

- Security/private-server migration: **COMPLETE — 17 August 2026**.
- Canonical corpus owner: private database.
- Canonical live corpus: **revision 125 / 948 active reviewed Batch 1 answers**.
- Batch 1 routing parity baseline: **0 semantic-zero answers / 0 index-unreachable active answers / 0 normalized alias-typo cross-concept collisions**.
- Public Answers controller after cutover: v125 corpus-free client controller.
- Real Batch 2 source set: **FROZEN — 1,000 unique scenarios**; historical 100-row blind assignment remains provenance only.
- Batch 2 human-review exposure: **100% HUMAN-FIRST** — ChatGPT/Qwen judgments are generated against frozen drafts, sealed from the reviewer, and revealed only after the first human ACCEPT / EDIT / REWRITE decision.
- Technical B2-0001–B2-0020: **PRESERVED / NON-METRIC / NOT PROMOTION-ELIGIBLE** because the first raw write stored intended line breaks as transport escapes.
- Raw/final LF integrity guard: **IMPLEMENTED AND DESTRUCTIVELY TESTED**; literal `\\n` transport escapes are rejected.
- Intended-focus reconciliation: **COMPLETE — 129/129**; 121 reuse canonical concepts, 7 justified new focus candidates, 1 (`care`) derives semantics from the reviewed scenario.
- Batch 2 semantic staging + alias/typo delta + reachability proof: **IMPLEMENTED**.
- Batch 2 atomic 20-row corpus/dictionary/index promotion: **IMPLEMENTED** and gated on zero alias collisions, zero semantic-zero rows, zero index-unreachable rows, zero parser-probe-unreachable rows and zero Batch 1 dictionary regressions.
- New production reviewer: `batch2-production-review-service` v1 ACTIVE / JWT + active-session + admin guarded.
- New routing service: `batch2-routing-service` v1 ACTIVE / JWT + active-session + admin guarded.
- Live Thai Audit Batch 2 page: `/answers-thai-review-batch2.html` **site_files v7**, production human-first path.
- First clean metric-eligible review unit: **B2-0021–B2-0040** — 20 frozen raw drafts, 0 literal escape rows, exactly 3 real LF bytes per draft, 20 sealed ChatGPT self-audits, 17 rows requiring sealed Qwen before the human button enables.
- Official Batch 2 human reviews at this checkpoint: **0**.
- Semantic staging rows / routing checks / promotions / promoted Batch 2 answers at this checkpoint: **0 / 0 / 0 / 0**.
- Production rhythm after the first unit: **review 20 → enrich 20 → validate 20 → promote 20 → verify 20 → generate next 20**. Do not pre-generate the remaining 960 before the preceding unit passes its routing/promotion gate.
- Thai Voice public evaluator remains qualitative and separate from Batch 2 audit machinery.
- Active commercial evidence work: human/machine disagreement, routing/reachability provenance, buyer-facing methodology and eventual ~1,948-row reviewed corpus package.

The next action is native-human review of B2-0021–B2-0040 in `/answers-thai-review-batch2.html`. After all 20 decisions are committed, run semantic enrichment, reachability validation and atomic promotion before generating B2-0041–B2-0060.

Do not reopen the completed security migration as a planning dependency unless a verified security regression appears.
