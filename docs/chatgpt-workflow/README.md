# ChatGPT Workflow — Flipgazine / The Book of Answers

**Purpose:** canonical human-readable documentation for continuing the Answers project across ChatGPT sessions.

This folder keeps the project plans, editorial authority, provenance records, commercial workflow and completed security-migration audit trail together. Executable code and machine proof artifacts remain outside this folder.

## Read first

The repository-root `AGENTS.md` is the short operational entry point. It contains the current source-of-truth rules and points here for deeper documentation.

For current Answers work, use this order:

1. `ANSWERS-COMMERCIAL-EXECUTION-TIMELINE.md` — current dated execution schedule and next milestones.
2. `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md` — commercial strategy, Batch 2 methodology, positioning, licensing scope and claim boundaries.
3. `ANSWERS-VOICE-TONE.md` — canonical Thai/English editorial authority and AI-transfer findings.
4. `ANSWERS-HUMAN-REVIEW.md` — immutable Batch 1 Thai human-review methodology and provenance record.
5. `ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md` — current frozen proof of the completed private-server migration.

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
- **Current schedule:** `ANSWERS-COMMERCIAL-EXECUTION-TIMELINE.md`.
- **Commercial methodology / claims / licensing:** `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md`.
- **Thai and English editorial decisions:** `ANSWERS-VOICE-TONE.md`.
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
- Active commercial work: Batch 1 commercial checkpoint, OpenAI first-look package and Batch 2 creation according to the execution timeline.

Do not reopen the completed security migration as a planning dependency unless a verified security regression appears.