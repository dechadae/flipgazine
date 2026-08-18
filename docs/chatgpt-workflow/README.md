# ChatGPT Workflow — Flipgazine / The Book of Answers

**Purpose:** canonical human-readable documentation for continuing the Answers project across ChatGPT sessions.

This folder keeps the project plans, editorial authority, provenance records, commercial workflow and completed security-migration audit trail together. Executable code and machine proof artifacts remain outside this folder.

## Read first

The repository-root `AGENTS.md` is the short operational entry point. It contains the current source-of-truth rules and points here for deeper documentation.

For current Answers work, use this order:

1. `ANSWERS-BATCH2-SELF-AUDIT-IMPLEMENTATION-REPORT.md` — latest Batch 2 implementation checkpoint; pre-pilot infrastructure is complete and the next dependency is the real frozen 1,000-row source set.
2. `ANSWERS-COMMERCIAL-EXECUTION-TIMELINE.md` — current dated execution schedule and next milestones.
3. `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md` — commercial strategy, Batch 2 methodology, positioning, licensing scope and claim boundaries.
4. `ANSWERS-BATCH2-SELF-AUDIT-PROTOCOL.md` — frozen Batch 2 self-audit, Qwen escalation and blind-control methodology. Its original planning-status header is superseded by the implementation report above; the protocol content remains the governing v1 design.
5. `ANSWERS-VOICE-TONE.md` — canonical Thai/English editorial authority and AI-transfer findings.
6. `ANSWERS-VOICE-BENCHMARK-PLAN.md` — approved public Thai-response evaluator: human-style rubric, deterministic scoring, calibration, lightbox UX and safeguards.
7. `ANSWERS-HUMAN-EVALUATION-SCHEME.md` — approved single human-evaluation deliverable: full criterion commentary, at least two rewrites, internal task value, scope limits and rights model.
8. `ANSWERS-HUMAN-REVIEW.md` — immutable Batch 1 Thai human-review methodology and provenance record.
9. `ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md` — current frozen proof of the completed private-server migration.

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
- **Latest Batch 2 implementation checkpoint:** `ANSWERS-BATCH2-SELF-AUDIT-IMPLEMENTATION-REPORT.md`.
- **Current schedule:** `ANSWERS-COMMERCIAL-EXECUTION-TIMELINE.md`.
- **Commercial methodology / claims / licensing:** `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md`.
- **Batch 2 self-audit / blind-control methodology:** `ANSWERS-BATCH2-SELF-AUDIT-PROTOCOL.md`.
- **Thai and English editorial decisions:** `ANSWERS-VOICE-TONE.md`.
- **Public Voice evaluator design / rubric / scoring:** `ANSWERS-VOICE-BENCHMARK-PLAN.md`.
- **Human evaluation deliverable / value / rights model:** `ANSWERS-HUMAN-EVALUATION-SCHEME.md`.
- **Batch 1 provenance:** `ANSWERS-HUMAN-REVIEW.md`.
- **Completed migration proof:** `ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md`.

When documents overlap, use the document that owns the decision rather than copying the same rule into another file.

## Files intentionally kept elsewhere

`../../answers-private-server/` contains executable router/parity code and machine-readable proof artifacts. It is not documentation and should remain separate.

`../../flipgazine-root-3/` contains Cloudflare Pages shell code and shell-specific README/deployment documentation. Those files describe the wider Flipgazine infrastructure, not the Answers ChatGPT workflow.

Historical Supabase `/wip/` and `/private/` corpus artifacts remain evidence/recovery material and are not replaced by this documentation folder.

## Current project checkpoint

- Security/private-server migration: **COMPLETE — 17 August 2026**.
- Canonical corpus owner: private database.
- Canonical corpus revision: 124.
- Normal reviewed Batch 1 records: 948.
- Public Answers controller after cutover: v125 corpus-free client controller.
- Batch 2 self-audit implementation: **PRE-PILOT IMPLEMENTATION COMPLETE — 18 August 2026**; Phase 5D A–F complete, production Batch 2 data still empty, real 20-row pilot pending the real frozen 1,000-row source set.
- Thai Voice benchmark design: **APPROVED**; implementation follows `ANSWERS-VOICE-BENCHMARK-PLAN.md`.
- Human evaluation scheme: **APPROVED**; full six-dimension commentary + at least two human rewrites per accepted task, with rights/source-material limits documented in `ANSWERS-HUMAN-EVALUATION-SCHEME.md`.
- Active commercial work: Batch 1 commercial checkpoint, OpenAI first-look package and Batch 2 creation according to the execution timeline.

Do not reopen the completed security migration as a planning dependency unless a verified security regression appears.
