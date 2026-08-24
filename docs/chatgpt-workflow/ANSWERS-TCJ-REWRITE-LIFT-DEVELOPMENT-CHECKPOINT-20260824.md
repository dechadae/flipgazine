# TCJ Rewrite-Lift Development Checkpoint — 24 Aug 2026

## Product definition

TCJ is not only an evaluator. Evaluation is the feedback engine.

**draft → TCJ understands what is wrong and why → bounded native-editor intervention when needed → same/customer model revises → TCJ can check again**

The rewrite research has now exposed two requirements:

1. do not damage a capable writer by over-directing it;
2. do not mistake competent generic BFF Thai for publishable Answers BFF copy.

The native-human publishing rule is now deliberately simple:

> **SHIP = I would publish this exact copy unchanged.**
>
> **REVISE = I would make any meaningful edit before publishing, including shortening, compression, restructuring, house-voice correction, stance/certainty correction, or semantic/pragmatic correction.**

There is no separate `VOICE_POLISH` state in the current design. If the copy must be shortened or edited to sound like the house voice, that is a revision.

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

## v5 — selective editor, frozen human gate

### Architecture tested

```text
semantic skeleton
→ Gemini writes one finished BFF draft
→ TCJ inspects the exact finished draft
   → USE AS IS: preserve byte-for-byte
   → REVISE: one material problem + one short instruction
→ only a REVISE case is sent back to Gemini once
```

The v5 editor was explicitly told not to revise merely to make copy more distinctive or stylistically preferable. This prohibition turned out to be too broad because house-voice compression and removal of model-like elaboration can themselves be necessary publication edits.

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

Human manifest SHA-256: `e2a2293ac467edef834b7cf6484985823905035239d371b147e86af5a496cded`

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

Interpretation: v5 did not merely miss a threshold. Its definition of “leave a capable writer alone” was too permissive. It accepted responses that were understandable and BFF-like but still required editorial shortening/compression before publication.

## v6 preflight — frozen human definition gate

The 11 v5 human `Needs revision` cases were shown again in a separate append-only classification protocol to test whether the missing category should be a third state called `VOICE_POLISH` or whether the human editor simply considers those changes revisions.

Protocol: `TCJ-SELECTIVE-VOICE-VS-REVISE-REVIEW-2026Q3-v6-preflight`

Frozen at: `2026-08-24 02:29:20.294993+00`

Human manifest SHA-256: `bcbd3f65ac78caf4c6abba2b9845d0a6957e9ad9ab7404fb3a56b95f38d61538`

Result:

- `VOICE_POLISH`: **0/11**
- `REVISE`: **11/11**

Native-human clarification:

- all 11 responses were too long / over-elaborated for publication;
- shortening and editing the copy counts as **revision**;
- therefore a separate `VOICE_POLISH` product state is unnecessary and does not match the human editor's mental model.

This is the key simplification after v5.

## Settled v6 plain-language contract — ready to implement on a fresh bank

```text
customer/Gemini model writes first
→ TCJ inspects the exact finished draft
   → SHIP
       publish this exact copy unchanged
   → REVISE
       any meaningful publication edit is required
       this includes shortening/compression, removing generic/model-like elaboration,
       house-voice correction, restructuring, stance/certainty correction,
       or semantic/pragmatic correction
→ if REVISE, give the same writer the current finished draft plus the smallest useful correction
→ writer edits the current draft rather than recomposing from the semantic skeleton
→ TCJ can check again
```

### Critical v6 distinction

The problem with v4 was **not that TCJ cared about voice**. The problem was that it gave a rich pre-writing brief and then asked Gemini to compose again from the source, which invited elaboration.

The problem with v5 was **not that it used a binary state**. The problem was that `REVISE` was defined too narrowly and effectively treated “competent generic BFF prose” as publishable.

The v6 correction should therefore remain binary and human-recognizable:

> **Would the human editor touch this exact copy before publication?**

- No → `SHIP`.
- Yes → `REVISE`.

If revision is needed because the answer is overlong/generic, the instruction should explicitly ask the writer to **shorten and preserve the useful meaning**, not to add personality, examples, explanation, stronger emotion, or new facts.

The writer should receive the **current finished draft**, not be invited to generate a fresh composition from the semantic skeleton.

## v6 implementation/validation requirements

Implementation must be separate and reversible. Do not mutate v4 or v5 evidence.

Use a **new fresh semantic-skeleton bank** after the v6 mechanism is implemented. Do not tune on the 12 v5 cases or the 11 preflight classifications.

Validation should answer two different questions:

1. **Gate accuracy:** on the fresh raw Gemini drafts, does TCJ correctly predict whether the native human would publish the exact draft unchanged (`SHIP`) or edit it (`REVISE`)?
2. **Revision value:** where revision is needed, does the targeted TCJ-guided edit improve publishability without recreating v4-style elaboration?

For revision-value review, keep the baseline and TCJ-edited outputs blind. A shorter output is not automatically better; the human publishing judgment remains authority.

## Diagnostic regression against frozen v4 baseline drafts

Experiment: `TCJ-SELECTIVE-EDITOR-V4-BASELINE-REGRESSION-v5`

Retrospective diagnostic only; not fresh causal evidence and not a tuning bank.

- USE AS IS: 11/12
- REVISE: 1/12
- single revision was literal typo `หลร` → `หล่อ`

This independently showed the old selective gate was extremely conservative.

## Invariants

- Qualification 2.0 remains protected and untouched.
- Never run `tcj-q2-final-worker` during development.
- No paid OpenAI/xAI development calls without explicit user approval immediately before dispatch.
- Free Gemini development calls are allowed.
- Human judgment remains authority.
- Reasoning first; measurement verifies rather than drives complexity.
- Raw private evidence stays server-side; writer receives only bounded derived guidance, never private rows/examples/IDs.
- v4 remains an intact rollback implementation.
- Do not retune v4/v5 reviewed cases to force a result.
- Do not use the 11 v5/preflight cases as a case-specific tuning bank; derive only the general human rule above and validate on fresh material.
- Preserve provider responses, hashes, manifests, attempts and historical failures.
