# TCJ Rewrite-Lift Development Checkpoint — 24 Aug 2026

## Product definition

TCJ is not only an evaluator. Evaluation is the feedback engine.

**draft → TCJ understands what is wrong and why → bounded native-editor brief → same/customer model rewrites → TCJ can check the rewrite again**

The rewrite question is:

> Can TCJ transfer a private native house voice into the same underlying model better than a plain request to rewrite in that voice?

## v1 — frozen, limited evidence only

`TCJ-REWRITE-LIFT-GEMINI35-v1`

16 blind comparisons: **13 ties / 2 TCJ / 1 baseline / 0 neither**.

Do not claim material lift. The baseline was overpowered: it already received the specialist BFF writer role plus distilled house-voice rules, making it effectively TCJ-lite.

Useful diagnostic only: on RW-014 the baseline wrote `Green flag ... 🚩`, while the TCJ-guided output avoided the contradictory red-flag emoji.

## v2 — stopped and invalid for causal rewrite lift

`TCJ-REWRITE-LIFT-HARD-GEMINI35-v2`

The source drafts themselves leaked Answers-BFF rhythm, slang, mock-politeness, compression and punchline structure. The user detected the confound after 5/12 blind reviews and stopped.

Protocol `TCJ-REWRITE-LIFT-HARD-BLIND-REVIEW-2026Q3-v2` is frozen with invalid-test manifest:

`3dac4bcafa578e656e04c4906d49e82f372643da1e53e1a59554ced8a3a0cce8`

The five saved choices are diagnostic history only and must never be counted as causal evidence.

## v3 — stopped before review; source too close to finished copy

`TCJ-REWRITE-LIFT-NEUTRAL-GEMINI35-v3`

The source was generic Thai but still too polished as final copy. The user correctly identified that if the source is already good copy, there is little meaningful rewrite task left.

State preserved: 4 completed trials; remaining 8 closed as `terminal_failure` with stop reason `stopped_invalid_test_source_too_finished`. No human review gate was opened. Do not resume.

## v4 — ACTIVE: semantic skeleton → Answers BFF

### Clean causal design

Source bank:

`TCJ-REWRITE-LIFT-SEMANTIC-SKELETON-BANK-2026Q3-v4`

Source manifest:

`4e684729e4dbe8ff9416533ea0d34aa8e0bb80fd6ca5436ffd61d0ec44138616`

Cases: **12**

Source-draft rule:

- correct/useful meaning only;
- generic common Thai;
- deliberately not publishable Answers copy;
- one plain paragraph;
- no performance line breaks;
- no emoji;
- no English/code-switch;
- no BFF slang, particles, punchlines or house-voice mechanics.

This is **correct content, wrong voice**.

### Experiment

Experiment:

`TCJ-REWRITE-LIFT-SEMANTIC-GEMINI35-v4`

Model in both arms:

`gemini-3.5-flash-lite`

Writer instruction in both arms is exactly the same:

> Rewrite the SOURCE DRAFT as a natural reply from a close Thai friend/BFF to the SCENARIO. Preserve the useful meaning, but make the final Thai conversational and appropriate to the situation. Do not explain your choices. Output only the rewritten response.

**Baseline**

scenario + generic semantic draft → same Gemini writer.

**TCJ**

scenario + same generic semantic draft → TCJ reachability/context + frozen Voice Profile + methodology + bounded private evidence → senior Thai magazine/conversation editor produces short derived brief → exact same Gemini writer instruction rewrites from the brief.

The writer sees no raw private rows, reconstructive examples, Voice Profile packet, private warning packet, row IDs or internal TCJ mechanisms.

### Generation result before human review

- 12/12 baseline outputs complete
- 12/12 TCJ-guided outputs complete
- 0 terminal failures at final state
- 0 identical pairs
- 0 obvious internal/private-evidence leakage
- 12/12 trials verified to use the same writer system instruction
- one intermediate empty Gemini final-output incident on SS-002 was retried from preserved baseline + editorial-brief state; no prompt/case change

Worker:

`tcj-rewrite-lift-semantic-gemini35-worker-v4`

Worker SHA-256:

`813f6b91cd080ae125afd834eaaaa74c5a9ebb08fbe0e733517423cf70565c41`

### Blind human gate

Protocol:

`TCJ-REWRITE-LIFT-SEMANTIC-BLIND-REVIEW-2026Q3-v4`

Protocol id: `3`

State at checkpoint: **reviewing, 0/12 reviewed**

Private review URL:

`https://flipgazine.pages.dev/tcj-rewrite-lift-semantic-review.html`

A/B order is deterministic and hidden. The reviewer sees:

scenario → generic semantic draft → Rewrite A → Rewrite B → A better / B better / Tie / Neither.

Review standard:

> Which final answer would actually belong in Answers BFF without another rewrite?

The generic semantic draft is only a meaning reference. Generic competent Thai can lose if it does not fit the house voice; slangier copy does not automatically win.

## Active next action

1. User reviews all 12 v4 blind pairs.
2. Freeze the human preference manifest.
3. Unblind exactly once.
4. Report TCJ wins / baseline wins / ties / neither.
5. Do not tune this bank after unblinding to force a TCJ win.
6. Use non-ties only to understand the general type of editorial intelligence transferred or lost.
7. Then decide whether rewrite guidance is strong enough to freeze as a core product capability before the new hidden authority phase.

## Invariants

- Qualification 2.0 remains protected and untouched.
- No paid OpenAI/xAI development calls.
- Human judgment remains authority.
- Reasoning first; measurement verifies rather than drives complexity.
- Raw private evidence stays server-side.
- The remaining OpenAI/xAI budget is reserved for the post-freeze frontier experiment and requires explicit user approval immediately before dispatch.
