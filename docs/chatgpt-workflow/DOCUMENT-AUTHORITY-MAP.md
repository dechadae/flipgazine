# ChatGPT Workflow — Document Authority Map

**Checkpoint:** 24 August 2026, 19:46 Asia/Bangkok  
**Purpose:** prevent stopped TCJ experiments, superseded prompt architectures, contaminated writer/evaluator evidence and stale next-actions from being mistaken for current authority.

## Read these first

1. `CURRENT-STATE.json` — canonical machine-readable state.
2. `ANSWERS-TCJ-BFF-SPEAKER-CONTRACT-CORRECTION-AND-SRW-V1-INVALIDATION-20260824.md` — **current execution checkpoint; invalidates the ambiguous six-case writer gate and defines v2 build.**
3. `ANSWERS-TCJ-BFF-SPEAKER-AND-QUOTED-SPEECH-CONTRACT-20260824.md` — **current writer speaker/addressee authority.**
4. `ANSWERS-TCJ-SESSION-REPLICA-WRITER-SAFE-MEMORY-V1.md` — hosted searchable Git-memory view, now amended with the speaker/quote boundary.
5. `ANSWERS-TCJ-ROLE-WRITER-FEASIBILITY-FAILURE-AND-SESSION-REPLICA-PIVOT-20260824.md` — frozen 0/8 persona-only failure and architectural pivot.
6. `ANSWERS-TCJ-REPOSITORY-CONNECTED-REFERENCE-RUNTIME-AND-SESSION-CONTINUITY-PLAN-20260824.md` — governing repository-connected architecture and session-continuity plan.
7. `ANSWERS-TCJ-V7-COMMERCIAL-SIM-SELECTIVE-GATE-20260824.md` — frozen failed diagnostic; never retune.
8. `ANSWERS-TCJ-MANDATORY-PROTECTED-EVIDENCE-ARCHITECTURE-AMENDMENT-20260823.md` — protected evidence remains bounded/non-reconstructive.
9. `ANSWERS-TCJ-METHODOLOGY-PACK-AND-CONTEXT-RETRIEVER-SPEC-20260823.md` — methodology concepts where compatible; Methodology Pack is a portable fallback, not the reference brain.
10. broad commercial architecture/roadmap docs only where not superseded above.

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

## Mandatory BFF speaker contract

The outer speaker is always **Answers BFF speaking directly to the user**.

Two task modes are allowed:

```text
DIRECT_BFF_RESPONSE
  Answers BFF → user
  no third-party quote required

BFF_WITH_QUOTED_SCRIPT
  Answers BFF → user
  + quoted wording the user can say/write to a third party
```

For quoted-script mode:

- outside quotes = Answers BFF voice;
- inside quotes = user-to-third-party speech;
- quote register follows the actual recipient/context and may be casual, BFF, Dek Inter, workplace-polished, formal, deferential, ceremonial, romantic, customer-service appropriate, restrained, etc.;
- a formal quote to a boss is not a BFF-voice failure;
- SHIP still applies to the whole finished answer unchanged.

Every writer case must freeze these fields before generation:

```text
task_mode
outer_speaker
outer_addressee
quote_required
quoted_speaker
quoted_addressee
quoted_register_target
```

A case with ambiguous speaker/addressee roles is invalid for formal evidence.

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

## INVALIDATED — session-replica writer v1

The first six-case repository-memory writer gate is **not writer-quality evidence** because its task design did not explicitly distinguish speaker/addressee roles.

```text
set id             21
set key            TCJ-SESSION-REPLICA-WRITER-SOURCE-BANK-2026Q3-v1
source manifest    c2516eb9b1214fc5175ff95e36811a92fcdd97a870d959c3f13fbcb4db01d3f0
review protocol    TCJ-SESSION-REPLICA-WRITER-HUMAN-REVIEW-2026Q3-v1
protocol status    invalidated
evidence-set state retired
saved reviews      1
formal score       prohibited
TCJ exposed        false
```

Preserve all outputs and the one saved human review as immutable test-design history. Do not complete the old review and do not infer writer viability from it.

## CURRENT — session-replica writer v2 build

Build a fresh six-case bank with zero scenario/source hash overlap.

Required mix:

```text
DIRECT_BFF_RESPONSE
BFF_WITH_QUOTED_SCRIPT
```

For every case, freeze the structured speaker/addressee contract separately from scenario/source meaning before generation.

The hosted safe Git memory must include the canonical speaker/quote contract. Per-case focus/reachability writer-context projections remain bounded and non-reconstructive.

Human review UI must display the task mode and explain:

```text
Outside quotes: review as Answers BFF speaking to you.
Inside quotes: review as wording you would actually say/write to the named recipient.
```

`SHIP` remains exact-copy publishability for the entire answer.

Session-replica v2 is writer-feasibility evidence only and must never score TCJ itself.

## A/B/C remains downstream

Only after a valid writer-feasibility gate demonstrates viable finished copy:

```text
A = strong semantic model alone
B = repository-connected TCJ
C = repository-connected TCJ + bounded private evidence
```

Use a separate fresh bank. Freeze human gold before unblinding. Never tune reviewed cases.

## Protected Qualification 2.0

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
build fresh six-case v2 with explicit speaker contracts ← CURRENT
→ freeze bank + task metadata + safe Git memory + per-case bounded context
→ sequential generation
→ native-human whole-answer review with quote-layer guidance
→ freeze/hash manifest before interpretation
→ only if viable: separate fresh evaluator A/B/C bank
```
