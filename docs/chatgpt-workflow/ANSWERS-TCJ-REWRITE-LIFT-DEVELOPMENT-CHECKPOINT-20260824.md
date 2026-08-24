# TCJ Rewrite-Lift Development Checkpoint — 24 Aug 2026

## Product definition

TCJ is not only an evaluator. Evaluation is the feedback engine.

**draft → TCJ understands what is wrong and why → bounded native-editor intervention when needed → same/customer model revises → TCJ can check again**

The current product question is now narrower:

> **Can TCJ know when a capable Thai writer should be left alone, and when one surgical native-editor intervention is actually necessary?**

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

## v5 — ACTIVE: selective editor

### Plain-language architecture

```text
semantic skeleton
→ Gemini writes one finished BFF draft
→ TCJ inspects the exact finished draft
   → USE AS IS: preserve byte-for-byte
   → REVISE: name one material problem + give one short instruction
→ only a REVISE case is sent back to the same Gemini writer once
```

The selective editor is explicitly forbidden to revise merely to make copy punchier, funnier, slangier, more emotional, longer, or more distinctive. Short/simple/natural copy is allowed. `USE AS IS` is a successful TCJ outcome.

### Rollback / reversibility

v5 was implemented **without modifying the v4 worker**.

- v4 rollback worker remains active: `tcj-rewrite-lift-semantic-gemini35-worker-v4`
- v4 rollback SHA: `813f6b91cd080ae125afd834eaaaa74c5a9ebb08fbe0e733517423cf70565c41`
- v5 selective worker uses version 2 of the obsolete v3 worker slot: `tcj-rewrite-lift-neutral-gemini35-worker-v3`
- v5 selective worker SHA: `172117389d4bc925d0c378c5d82fc806b091d115194d65478c9f2e90f5a5ea07`
- historical v3 worker version remains in Supabase function history.

No v4 source bank, output, provider response, hash, human preference, or worker code was mutated.

### Fresh v5 source bank

`TCJ-SELECTIVE-EDITOR-SOURCE-BANK-2026Q3-v5`

Source-bank id: `15`

Manifest SHA-256: `d7dfaa5488cc6cd80dd16200e32249849c50f74d21255a98c55156a0d5a68187`

12 cases, frozen before generation. Generic Thai semantic skeletons only; 0 source line-break performance and 0 Latin/code-switch source leakage. No v4 cases or outputs were reused.

Experiment: `TCJ-SELECTIVE-EDITOR-GEMINI35-v5`

Generation result:

- 12/12 complete
- 0 terminal failures
- 0 obvious internal/private leakage
- selective editor decision: **USE AS IS 12/12**
- selective output therefore equals the original Gemini finished draft 12/12

This means v5 successfully eliminated mandatory over-editing, but the fresh generation alone cannot tell whether 12/12 non-intervention is correct.

### Diagnostic regression against frozen v4 baseline drafts

Experiment: `TCJ-SELECTIVE-EDITOR-V4-BASELINE-REGRESSION-v5`

This is **retrospective diagnostic evidence only**, not fresh causal evidence and not a tuning bank.

The selective gate inspected the exact frozen v4 baseline drafts without rewriting them:

- USE AS IS: **11/12**
- REVISE: **1/12**
- the single revision was a literal typo (`หลร` → `หล่อ`) in SS-011, which the human had rated Tie
- it left SS-004 unchanged even though the human v4 choice was Neither
- it also left SS-007 and SS-010 unchanged where the human preferred the prior TCJ alternative; those two preference wins do not necessarily imply the baseline was unpublishable

Interpretation: the selective gate is intentionally conservative and avoids preference-chasing. The unresolved question is whether it is **too** conservative at the actual publishability boundary. Do not loosen it from the v4 pairwise-preference labels alone.

## ACTIVE HUMAN GATE — test intervention accuracy directly

Protocol: `TCJ-SELECTIVE-EDITOR-HUMAN-REVIEW-2026Q3-v5`

Experiment under review: `TCJ-SELECTIVE-EDITOR-GEMINI35-v5`

Cases: **12**

Review state at checkpoint: **0/12**

Private review URL:

`https://flipgazine.pages.dev/tcj-selective-editor-review.html`

The reviewer sees only:

1. scenario
2. generic semantic source (meaning reference)
3. finished Gemini BFF draft
4. **Use as is** / **Needs revision**
5. optional note

TCJ's own decision is hidden.

Human rule:

- **Use as is** = publish this exact response even if a slightly nicer alternative could exist.
- **Needs revision** = genuinely change something before publishing.

After 12/12:

1. freeze the native-human review manifest;
2. compare human `use_as_is / revise` with TCJ's already-preserved decisions;
3. measure false intervention and missed intervention directly;
4. only for cases where both human and TCJ say REVISE, test whether the one-instruction revision actually improves the copy;
5. do not tune these same 12 cases to force agreement.

## Invariants

- Qualification 2.0 remains protected and untouched.
- No paid OpenAI/xAI development calls.
- Human judgment remains authority.
- Reasoning first; measurement verifies rather than drives complexity.
- Raw private evidence stays server-side.
- v4 remains the rollback implementation.
- Do not retune v4 or v5 reviewed cases to force a TCJ win.
- Remaining paid budget is reserved for post-freeze authority research and requires explicit user approval immediately before dispatch.
