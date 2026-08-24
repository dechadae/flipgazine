# TCJ Rewrite-Lift Development Checkpoint — 24 Aug 2026

## Product definition

TCJ is not only an evaluator. Evaluation is the feedback engine.

**draft → TCJ understands what is wrong and why → bounded native-editor intervention when needed → same/customer model revises → TCJ can check again**

The rewrite research has now exposed two different requirements:

1. do not damage a capable writer by over-directing it;
2. do not mistake competent generic BFF Thai for the actual Answers BFF house voice.

## Preserved prior evidence

### v1 — limited / overpowered control

`TCJ-REWRITE-LIFT-GEMINI35-v1`

16 blind comparisons: **13 ties / 2 TCJ / 1 baseline / 0 neither**. Do not claim material lift. The baseline already received a specialist BFF writer role and distilled house-voice rules, effectively making it TCJ-lite.

### v2 — invalid source-voice leak

`TCJ-REWRITE-LIFT-HARD-GEMINI35-v2`

The source drafts themselves leaked Answers-BFF rhythm/slang/compression. User stopped after 5/12 reviews. Protocol remains frozen with invalid-test manifest `3dac4bcafa578e656e04c4906d49e82f372643da1e53e1a59554ced8a3a0cce8`. Partial preferences are diagnostic history only.

### v3 — invalid because source was too close to finished copy

`TCJ-REWRITE-LIFT-NEUTRAL-GEMINI35-v3`

Stopped before human review. Four completed trials preserved; remaining eight closed with stop reason. Do not resume.

### v4 — clean semantic-skeleton rewrite test, frozen

Source bank: `TCJ-REWRITE-LIFT-SEMANTIC-SKELETON-BANK-2026Q3-v4`

Source manifest: `4e684729e4dbe8ff9416533ea0d34aa8e0bb80fd6ca5436ffd61d0ec44138616`

Experiment: `TCJ-REWRITE-LIFT-SEMANTIC-GEMINI35-v4`

Model: `gemini-3.5-flash-lite`

Worker: `tcj-rewrite-lift-semantic-gemini35-worker-v4`

Worker SHA-256: `813f6b91cd080ae125afd834eaaaa74c5a9ebb08fbe0e733517423cf70565c41`

The v4 worker remains **ACTIVE and untouched** and is the explicit rollback target for rewrite research.

Frozen human manifest: `4b3bfad5efc653d5584b3140eeb2b61cdc89267fdb1e331892ebbdb0df5ead1c`

Result across 12 clean semantic-skeleton cases:

- baseline preferred: **6**
- TCJ mandatory-guidance preferred: **2**
- tie: **3**
- neither: **1**

Interpretation: plain Gemini with a short BFF-target instruction already writes surprisingly strong Thai. Mandatory TCJ editorial briefs often over-direct, lengthen, intensify, or otherwise interfere with copy that already works. Do not retune v4 to reverse this result.

Gemini-memory audit: all 12 baseline calls were independent single-turn `generateContent` requests, no explicit `cachedContent`, no prior conversation history, and no cache-hit accounting. Treat the strong baseline as model capability, not remembered TCJ context.

## v5 — selective editor, human gate frozen

### Architecture tested

```text
semantic skeleton
→ Gemini writes one finished BFF draft
→ TCJ inspects the exact finished draft
   → USE AS IS: preserve byte-for-byte
   → REVISE: one material problem + one short instruction
→ only a REVISE case is sent back to Gemini once
```

The selective editor was explicitly told not to revise merely to make copy punchier, funnier, slangier, more emotional, longer, or more distinctive.

### Rollback / reversibility

v5 was implemented without modifying v4.

- v4 rollback worker: `tcj-rewrite-lift-semantic-gemini35-worker-v4`
- v4 rollback SHA: `813f6b91cd080ae125afd834eaaaa74c5a9ebb08fbe0e733517423cf70565c41`
- v5 selective worker slot: `tcj-rewrite-lift-neutral-gemini35-worker-v3`, version 2
- v5 selective worker SHA: `172117389d4bc925d0c378c5d82fc806b091d115194d65478c9f2e90f5a5ea07`

No v4 source bank, output, provider response, hash, human preference, or worker code was mutated.

### Fresh v5 source bank

`TCJ-SELECTIVE-EDITOR-SOURCE-BANK-2026Q3-v5`

Source-bank id: `15`

Manifest SHA-256: `d7dfaa5488cc6cd80dd16200e32249849c50f74d21255a98c55156a0d5a68187`

12 fresh generic Thai semantic skeletons, frozen before generation.

Experiment: `TCJ-SELECTIVE-EDITOR-GEMINI35-v5`

Generation:

- 12/12 complete
- 0 terminal failures
- 0 obvious internal/private leakage
- TCJ decision before human review: **USE AS IS 12/12**
- therefore selective output equaled raw Gemini output 12/12

### Frozen native-human publishability review

Protocol: `TCJ-SELECTIVE-EDITOR-HUMAN-REVIEW-2026Q3-v5`

Frozen at: `2026-08-24 02:08:43.350902+00`

Human manifest SHA-256:

`e2a2293ac467edef834b7cf6484985823905035239d371b147e86af5a496cded`

Human result:

- **Needs revision: 11/12**
- **Use as is: 1/12**

TCJ hidden decisions:

- **USE AS IS: 12/12**
- **REVISE: 0/12**

Direct intervention-gate comparison:

- correct non-intervention: **1**
- correct intervention: **0**
- missed interventions: **11**
- unnecessary interventions: **0**

The only human `Use as is` case was `SEL-010`.

This is not a small threshold miss. The binary v5 abstraction is wrong for the product. It solved v4 over-editing by suppressing intervention so aggressively that TCJ accepted generic Gemini BFF prose as finished Answers copy.

### What the 11 misses appear to contain

The human review itself was binary and did not provide per-case reason labels, so the following is analytical interpretation, not new human gold.

The missed cases visibly include two different classes:

1. **voice-distance / house-voice misses** — competent, friendly Thai that still carries a generic Gemini/assistant cadence: complete explanations, decision-tree phrasing, canned reassurance, explicit conclusions, and prose that continues after the social answer has already landed;
2. **actual editorial/pragmatic defects** in at least some cases — e.g. unnecessary aggression/escalation, questionable factual confidence, or not answering the exact social decision as cleanly as a native editor would want.

This supports separating “good answer but not yet our voice” from “actual problem.”

## Current conceptual direction — not implemented yet

The next candidate architecture should not simply loosen the binary threshold. A more human-recognizable model is:

```text
Gemini/customer model writes first
→ TCJ inspects finished copy
   → SHIP
       already publishable and genuinely belongs in the house voice
   → VOICE POLISH
       meaning/social judgment are usable, but copy is still generic/model-like rather than house voice
       preserve content; make the smallest house-voice transformation
   → REVISE
       material semantic/pragmatic/register/factual/composition defect
       one targeted correction first
→ check again
```

Important distinction:

**Good generic BFF Thai ≠ Answers BFF house voice.**

v4 suggests the TCJ Voice Profile/private methodology can transfer some house-voice signature, but its full pre-rewrite brief was too heavy. v5 shows that removing voice transfer almost entirely exposes strong but recognizably generic Gemini prose.

The likely goal for the next research design is therefore to preserve v4's useful house-voice transfer while removing its permission to elaborate or re-compose unnecessarily.

Do not implement this merely from the same 12 cases. First settle the plain-language contract, then validate any implementation on a new fresh bank.

## Diagnostic regression against frozen v4 baseline drafts

Experiment: `TCJ-SELECTIVE-EDITOR-V4-BASELINE-REGRESSION-v5`

Retrospective diagnostic only; not fresh causal evidence and not a tuning bank.

- USE AS IS: 11/12
- REVISE: 1/12
- single revision was literal typo `หลร` → `หล่อ`

This independently showed the selective gate was extremely conservative.

## Invariants

- Qualification 2.0 remains protected and untouched.
- No paid OpenAI/xAI development calls.
- Human judgment remains authority.
- Reasoning first; measurement verifies rather than drives complexity.
- Raw private evidence stays server-side.
- v4 remains the rollback implementation.
- Do not retune v4 or v5 reviewed cases to force a result.
- Do not treat the 11 v5 human revisions as a case-specific tuning list; derive general editorial principles and validate on fresh material.
- Remaining paid budget is reserved for post-freeze authority research and requires explicit user approval immediately before dispatch.
