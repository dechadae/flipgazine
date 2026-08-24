# ChatGPT Workflow — Document Authority Map

**Checkpoint:** 24 August 2026, 19:22 Asia/Bangkok  
**Purpose:** prevent stopped TCJ experiments, superseded prompt architectures, contaminated writer/evaluator evidence and stale next-actions from being mistaken for current authority.

## Read these first

1. `CURRENT-STATE.json` — canonical machine-readable state.
2. `ANSWERS-TCJ-SESSION-REPLICA-WRITER-HUMAN-GATE-20260824.md` — **current execution checkpoint and native-human gate.**
3. `ANSWERS-TCJ-ROLE-WRITER-FEASIBILITY-FAILURE-AND-SESSION-REPLICA-PIVOT-20260824.md` — frozen 0/8 role-writer failure and architectural pivot.
4. `ANSWERS-TCJ-SESSION-REPLICA-WRITER-SAFE-MEMORY-V1.md` — hosted searchable Git-memory view for the current writer experiment; not a substitute for full local Git in private-server deployments.
5. `ANSWERS-TCJ-REPOSITORY-CONNECTED-REFERENCE-RUNTIME-AND-SESSION-CONTINUITY-PLAN-20260824.md` — governing repository-connected architecture and session-continuity plan.
6. `ANSWERS-TCJ-V7-COMMERCIAL-SIM-SELECTIVE-GATE-20260824.md` — frozen failed diagnostic; never retune.
7. `ANSWERS-TCJ-MANDATORY-PROTECTED-EVIDENCE-ARCHITECTURE-AMENDMENT-20260823.md` — protected evidence remains bounded/non-reconstructive.
8. `ANSWERS-TCJ-METHODOLOGY-PACK-AND-CONTEXT-RETRIEVER-SPEC-20260823.md` — methodology concepts where compatible; Methodology Pack is a portable fallback, not the reference brain.
9. broad commercial architecture/roadmap docs only where not superseded above.

## Current reference architecture

```text
full private-server mode:
  pinned local Git checkout
  + customer/private evidence
  + focus/reachability
  + capable model

hosted research mode:
  pinned safe Git-memory view
  + bounded focus/reachability native-human projection
  + capable model

writer writes
TCJ evaluates exact finished copy
```

Raw private rows, nearest proprietary examples/edit pairs, hidden qualification cases and secrets remain outside provider prompts.

## Closed role-only writer feasibility gate

```text
source manifest  42fe22fa2c0c7b4be43d45fba087c629627e1ff78fce928156abb59643db7e07
human manifest   97c372791de1f4af77950f5b100efa8c8b0956efa5bced19f4de5cd48a4270e1
human SHIP       0
human REVISE     8
TCJ exposed      false
```

Diagnosis after freeze: performed BFF caricature—forced intimacy/slang, stretched vowels, camp/emojis, generic reassurance, over-explanation and unsupported additions.

These eight cases are closed diagnostic evidence only. Never expose them to TCJ or reuse them for evaluator scoring.

## CURRENT — session-replica writer human gate

Fresh bank:

```text
set id             21
set key            TCJ-SESSION-REPLICA-WRITER-SOURCE-BANK-2026Q3-v1
cases              6
phenomena          6
prior hash overlap 0
source manifest    c2516eb9b1214fc5175ff95e36811a92fcdd97a870d959c3f13fbcb4db01d3f0
```

Hosted repository memory:

```text
Git memory file    ANSWERS-TCJ-SESSION-REPLICA-WRITER-SAFE-MEMORY-V1.md
file commit        2b3ac6d2705c0706d7fdefdfeb31868570bbe2dc
snapshot key       TCJ-REPO-SESSION-REPLICA-WRITER-20260824-757a0690
snapshot commit    2b3ac6d2705c0706d7fdefdfeb31868570bbe2dc
snapshot files     2
snapshot bytes     28,434
snapshot manifest  1c788bec1f3f18509aa652387043647749abbfd796915c360b3e089ad2309f35
```

The snapshot key's embedded old prefix is a pre-freeze naming artifact. The stored source commit and manifest above are authoritative.

Bounded empirical memory:

```text
function   private.tcj_writer_context_projection_v1
contract   TCJ-WRITER-CONTEXT-PROJECTION-v1-research
raw text   never exported
raw IDs    never exported
examples   never exported
```

Every trial froze its context JSON/hash before generation.

Writer:

```text
model               gemini-3.5-flash-lite
prompt SHA          109edee6839af516ab1b24891fdc743dfe243d911b91834d2f492946563333b3
temperature         0.3
max output tokens   180
worker slot         tcj-rewrite-lift-neutral-gemini35-worker-v3
active version      8
active SHA          c3f7f272a759abb3808cc7562c1efa853f57d30b2f7e7a32df6bbc333aa04cd7
```

Version 7 produced one fail-closed pre-provider incident due Postgres-vs-JavaScript JSON serialization hashing. No provider request was sent. It is preserved as `writer_context_hash_serialization_mismatch_v7`. Version 8 changed only canonical hash comparison; no frozen inputs changed.

Generation integrity:

```text
complete                     6 / 6
terminal failures            0
provider attempts            6 complete
HTTP 429                     0
TCJ exposed                  0
output hash mismatch         0
frozen context mismatch      0
average chars                79.5
range                        49–107
```

The assistant did not inspect the six finished Thai outputs before the human gate.

Human review:

```text
protocol   TCJ-SESSION-REPLICA-WRITER-HUMAN-REVIEW-2026Q3-v1
state      0 / 6 at checkpoint
URL        https://flipgazine.pages.dev/tcj-session-replica-writer-review-v1.html
API        tcj-rewrite-lift-hard-review-v2 v7
API SHA    2a24bb02d36ffa450f57ebe540b28e2a7ddc679f44fbe2a8b44e719a172c0ea2
page SHA   d5c5fdc8754d467b95f9fbef35fc4b6f73bf8ac2a575b654d5ad15ee7ee23d65
JS SHA     a07e09efd967288c84072ef19ea834bd5c073a5fb509c397e8bb899c23d71ce8
```

### Human rule

`SHIP` only if exact copy is publishable unchanged. `REVISE` for any meaningful edit including shortening. Do not balance labels.

After 6/6:

1. compute and freeze the human manifest before inspecting distribution;
2. only then inspect SHIP/REVISE result and drafts diagnostically;
3. never expose these six feasibility cases to TCJ;
4. if writer is viable, create a separate fresh A/B/C evaluator bank;
5. if writer remains systematically bad, preserve failure and stop evaluator progression.

## A/B/C remains downstream

Only after writer viability:

```text
A = strong semantic model alone
B = repository-connected TCJ
C = repository-connected TCJ + bounded private evidence
```

Use a separate fresh bank. Freeze human gold before unblinding. Never tune reviewed cases.

## Protected Qualification 2.0

Reverified immediately before current checkpoint:

```text
protocol            TCJ-QUALIFICATION-2.0-2026Q3-v1
status              human_frozen
human manifest      07a25c08b331c215bf6a7378665726c376045bcb9d547d3cd21eaca22b51428d
bank manifest       8e3d6c5fff4860f97bfbfcd8d69c46e5484da0d5c315ed6f4888d0061d09b7c8
machine_exposed_at  null
```

Do not expose Q2 to development models.

## Paid resources

No paid OpenAI/xAI development calls. Later paid authority work still requires explicit user approval immediately before dispatch.

## Immediate next action

```text
native human reviews six session-replica drafts ← CURRENT
→ freeze/hash human manifest
→ determine writer viability
→ only if viable: create separate fresh evaluator A/B/C bank
```
