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

## v4 — frozen result: semantic skeleton → Answers BFF

### Clean causal design

Source bank: `TCJ-REWRITE-LIFT-SEMANTIC-SKELETON-BANK-2026Q3-v4`

Source manifest: `4e684729e4dbe8ff9416533ea0d34aa8e0bb80fd6ca5436ffd61d0ec44138616`

Cases: **12**

Source-draft rule: correct/useful meaning only; generic common Thai; deliberately not publishable Answers copy; one plain paragraph; no performance line breaks, emoji, English/code-switch, BFF slang, particles, punchlines or house-voice mechanics.

This is **correct content, wrong voice**.

Experiment: `TCJ-REWRITE-LIFT-SEMANTIC-GEMINI35-v4`

Model in both arms: `gemini-3.5-flash-lite`

Writer instruction in both arms was exactly the same:

> Rewrite the SOURCE DRAFT as a natural reply from a close Thai friend/BFF to the SCENARIO. Preserve the useful meaning, but make the final Thai conversational and appropriate to the situation. Do not explain your choices. Output only the rewritten response.

**Baseline:** scenario + generic semantic draft → same Gemini writer.

**TCJ:** scenario + same generic semantic draft → TCJ reachability/context + frozen Voice Profile + methodology + bounded private evidence → senior Thai magazine/conversation editor produces short derived brief → exact same Gemini writer rewrites from the brief.

The writer saw no raw private rows, reconstructive examples, Voice Profile packet, private warning packet, row IDs or internal TCJ mechanisms.

Generation integrity:

- 12/12 baseline outputs complete
- 12/12 TCJ-guided outputs complete
- 0 terminal failures at final state
- 0 identical pairs
- 0 obvious internal/private-evidence leakage
- 12/12 trials verified to use the same writer system instruction
- one intermediate empty Gemini final-output incident on SS-002 was retried from preserved baseline + editorial-brief state; no prompt/case change

Worker: `tcj-rewrite-lift-semantic-gemini35-worker-v4`

Worker SHA-256: `813f6b91cd080ae125afd834eaaaa74c5a9ebb08fbe0e733517423cf70565c41`

### Frozen blind-human result

Protocol: `TCJ-REWRITE-LIFT-SEMANTIC-BLIND-REVIEW-2026Q3-v4`

Human preference manifest SHA-256: `4b3bfad5efc653d5584b3140eeb2b61cdc89267fdb1e331892ebbdb0df5ead1c`

12/12 reviewed and frozen.

Unblinded result:

- **Baseline preferred: 6**
- **TCJ preferred: 2**
- **Tie: 3**
- **Neither: 1**

This does **not** demonstrate rewrite lift. On this clean semantic-skeleton test, plain Gemini with only a simple BFF-target instruction outperformed the current TCJ-guided rewrite path.

Do not tune these 12 cases to reverse the result. Treat it as evidence that the current TCJ rewrite brief can over-direct or interfere with a model that already has strong Thai conversational rewriting ability.

### Gemini API memory/cache audit

The unexpectedly strong baseline was checked for hidden conversational state.

Observed across all 12 baseline requests:

- all were independent `generateContent` single-turn requests;
- each request contained exactly one `contents` turn;
- 0/12 used the explicit `cachedContent` field;
- there was exactly one shared baseline system instruction and no prior conversation history;
- baseline prompt size was only about 101–119 tokens per case;
- stored usage metadata showed no cached-token field/cache-hit accounting.

Conclusion for this experiment: **no application-level or API conversation memory was supplied to baseline Gemini.** The strong baseline should be treated as genuine model capability under a short BFF-target instruction, not as remembered TCJ examples.

Provider-side logging/data-retention policy is a separate issue from inference-time conversation memory and does not constitute evidence that prior calls were fed into these later generations.

## Current interpretation

The rewrite capability should not be marketed yet as “TCJ makes the same model write better.” The clean v4 evidence says the opposite for this model/task: a lightweight BFF instruction often performed better than the current mandatory TCJ editorial-brief path.

The architectural question is therefore simpler:

> When should TCJ intervene at all?

A plausible next direction is **selective guidance** rather than mandatory rewriting guidance: let a capable writer produce its draft first, then use TCJ only when it detects a meaningful house-voice or pragmatic defect. Do not implement this merely to fit the 12 v4 cases; validate the principle on fresh material if development continues.

## Invariants

- Qualification 2.0 remains protected and untouched.
- No paid OpenAI/xAI development calls.
- Human judgment remains authority.
- Reasoning first; measurement verifies rather than drives complexity.
- Raw private evidence stays server-side.
- Do not retune v4 to force a TCJ win.
- The remaining OpenAI/xAI budget is reserved for the post-freeze frontier experiment and requires explicit user approval immediately before dispatch.
