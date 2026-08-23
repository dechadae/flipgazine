# TCJ Rewrite-Lift Development Checkpoint — 24 Aug 2026

## Plain-language product correction

TCJ is not only an evaluator. Evaluation is the feedback engine.

The intended product loop is:

**draft → TCJ understands what is wrong and why → TCJ produces a bounded native-editor brief → the same/customer model rewrites → TCJ can check the rewrite again**

The commercial question is therefore not merely “does TCJ score Thai better?” It is also:

> **Can TCJ make the same underlying model produce better final Thai by giving it better native editorial guidance?**

## Rewrite-lift experiment v1 — frozen development evidence

Experiment: `TCJ-REWRITE-LIFT-GEMINI35-v1`

Blind protocol: `TCJ-REWRITE-LIFT-BLIND-REVIEW-2026Q3-v1`

Source bank: `TCJ-REWRITE-LIFT-SOURCE-BANK-2026Q3-v1`

Source-bank manifest: `37fc7c3d5206b8272b07d4928ff50ab0eff22c40edf6bd38970f71d4842c584a`

Human blind-review manifest: `427a6e71042804d8ca987819edad7d555c673539c28f63a338ae12432c30e877`

Result across 16 fresh comparisons:

- Tie: **13**
- TCJ-guided rewrite preferred: **2**
- Baseline rewrite preferred: **1**
- Neither: **0**

### Important interpretation

This is **not** evidence of a material rewrite lift.

The baseline was too strong for the intended commercial comparison because both arms were explicitly given the same specialist writer role:

> expert Thai conversational copywriter for a modern close-friend/BFF magazine voice

The baseline also received distilled voice knowledge such as permission for Thai-English mixing, slang, mock politeness, sarcasm, hyperbole and line breaks when natural.

Therefore the control was effectively **TCJ-lite**, not ordinary model use.

The correct interpretation is:

> Once low-tier Gemini is already given a strong specialist BFF writer role, the additional full-TCJ editorial pass produces mostly equivalent outputs on these 16 cases.

Do not market the 2–1 non-tie result as a lift claim.

### Useful diagnostic example

On `RW-014`, the baseline wrote:

`Green flag ตะโกนมากแม่! 🚩✨`

The text says “green flag” while using the red-flag emoji. The TCJ-guided version did not make that contradiction.

This is a useful example of the kind of small editorial-execution defect that a native editorial layer can catch, but it is not by itself a statistical claim.

## Rewrite-lift experiment v2 — active human gate

The next experiment corrects the v1 baseline problem.

Source bank: `TCJ-REWRITE-LIFT-HARD-SOURCE-BANK-2026Q3-v2`

Source-bank manifest: `fc76e21ad36a5d11685db3dd4aa16398bc817ba0882dd3a20a04a31e0ecd8d79`

Experiment: `TCJ-REWRITE-LIFT-HARD-GEMINI35-v2`

Model in both arms: `gemini-3.5-flash-lite`

Cases: **12 fresh subtle native-language cases**

Generation state: **12/12 complete**

Terminal failures: **0**

Obvious private/TCJ leakage in final outputs: **0**

Text-identical A/B pairs: **1** (legitimate tie candidate; preserved)

Worker: `tcj-rewrite-lift-hard-gemini35-worker-v2`

Worker SHA-256: `bd6aa2b5afed8dc71468d22d12957de7d9cd311a354f5a00176c04a73465b6b7`

Blind protocol: `TCJ-REWRITE-LIFT-HARD-BLIND-REVIEW-2026Q3-v2`

Review API: `tcj-rewrite-lift-hard-review-v2`

Review API SHA-256: `2d65c604b21116fc61eca9132c68b3a33aee86974c79c5c4048114567504c402`

Private review URL:

`https://flipgazine.pages.dev/tcj-rewrite-lift-hard-review.html`

Current review state at checkpoint: **0/12 reviewed**

### Clean v2 comparison contract

Both arms use the same ordinary writer instruction:

> Rewrite the source draft naturally in Thai for the scenario. Make the final response appropriate to the situation and preserve useful meaning from the source. Do not explain your choices. Output only the rewritten response.

**Control arm**

Scenario + source draft → ordinary Gemini rewrite.

**TCJ arm**

Scenario + source draft → TCJ context/reachability + Voice Profile + methodology + bounded private warning evidence + candidate-specific licensed-weirdness rescue → senior Thai magazine/conversation editor produces a short derived editorial brief → the **same ordinary Gemini writer instruction** rewrites from that brief.

The writer does not receive raw private rows or reconstructive private examples.

### Case design

The 12 cases deliberately avoid easy “formal consultant paragraph → casual BFF paragraph” transformations. They include:

- valid mock-politeness that should survive;
- natural code-switching that should survive;
- badly integrated code-switching that should be repaired;
- pragmatic omission / missing the actual social concern;
- high-stakes emotional stance;
- mock-politeness plus genuine register collision;
- uncertainty without false factual certainty;
- line-break delivery with a dangling ending;
- topic answer vs actual social-conversation concern;
- dry ironic negative-event reframing;
- contextually wrong polite/service register;
- micro-line / queer timing that should survive.

The point is to test **reasoning about composition**, not surface-rule application.

## Active next action

**Native-human blind gate:** review all 12 pairs at `tcj-rewrite-lift-hard-review.html` and choose only:

- A better
- B better
- Tie
- Neither

A/B identity is hidden and stable.

After 12/12:

1. freeze the human preference manifest;
2. unblind once;
3. report TCJ wins / baseline wins / ties / neither;
4. inspect non-ties and failures for general product reasoning only;
5. **do not retune this same bank to chase a win**;
6. decide whether rewrite lift is sufficiently demonstrated, needs one principled architecture correction, or should remain a secondary capability claim rather than the primary proof.

## Invariants still in force

- Do not touch protected Qualification 2.0 for development.
- Do not use paid OpenAI/xAI credits during this development test.
- Do not chase 100% exposed-bank performance.
- Reasoning first; simple representation second; measurement verifies rather than drives complexity.
- Raw private rows/examples do not leave the protected server-side evidence boundary.
- Paid frontier budget remains reserved for the post-freeze authority experiment and requires explicit user approval immediately before dispatch.
