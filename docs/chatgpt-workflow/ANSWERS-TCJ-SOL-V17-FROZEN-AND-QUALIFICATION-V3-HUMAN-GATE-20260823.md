# TCJ Sol v1.7 frozen + fresh Qualification v3 human gate

Date: 2026-08-23

## Canonical state

TCJ Sol development is parked at the next genuine native-human gate.

- Evaluator: `TCJ-EVAL-ANSWERS-BFF-SOL-v1.7-frozen-dev`
- Evaluator status: `research_frozen`
- Evaluator configuration SHA256: `5eb3d2354717573e1d8f48a574a960d3bea63a855409ac23932530be7bc23d07`
- Authority: **NONE** until a new fresh hidden Qualification passes unchanged thresholds.
- OpenAI API calls used for v1.7 development: **0**.
- OpenAI API credit is reserved for the final frozen Qualification execution only.

The exact live implementation bodies were attested against the frozen configuration before the v3 bank was constructed.

### Frozen implementation SHAs

- Private Evidence enrichment implementation: `0e3230395839a73d48ef7d7d9e0ca202da7226da01fbcc58081a503ba5be2f63`
- Private Evidence wrapper implementation: `6243d5279d7df097b67de8af24f6b71a947a10035c969739b5198f59e2051adb`
- Router implementation: `f105ab3311c5b72fb857d405ee1daf225ba9ac2f3bf79af6b9f56e1e744ddf42`
- Guard implementation: `62c59a384c062e4c8c00f52b0656e5ff49664d25973872d16abeb047041a117a`
- Resolver implementation: `09441b3e72688108d5dcdc915173302d4b2fa1149facc9edeefb1bdc21721ad5`

Frozen registry definitions:

- PEE v3 algorithm SHA: `a284bbe64613495c1518f9e24250e2e4de06f44a167231f0b3d320588563a193`
- Router v1.7 definition SHA: `b9d5bc35336ea732f7e3517c35e544b4e96cd76ffec58bb58ecfa037ce4fd6a8`
- Guard v1.7 definition SHA: `28757862a8bc714a591e95353e4b58e76d152ea87e8d6d767fa463fffe636268`
- Resolver v1.7 definition SHA: `14031b49432c5226e8152f01e8dda9dc2293c2141f8b47f560e3057de56f0dca`

## Cross-bank exposed-development replay

These results are development evidence only and confer no authority.

### Historical exposed v1.1 bank

- overall MAE: `0.3472`
- extreme reversals: `0`
- false-fluent MAJOR/CRITICAL accepts: `0`
- routed challenge cells: `128`

### Exposed v2 bank

- overall MAE: `0.3542`
- extreme reversals: `0`
- false-fluent MAJOR/CRITICAL accepts: `0`
- routed challenge cells: `134`

All frozen per-dimension gates cleared on both exposed banks. The tightest exposed-v2 dimension was Lexical/Social Fit at MAE `0.5000`, exactly at the frozen full-qualification ceiling.

All genuinely new v1.7 challenge cells on exposed evidence were stress-tested across hypothetical challenge ratings 1–4. None can create an extreme reversal under the frozen resolver.

## Key v1.7 design changes

The v1.7 development pass replaced broad score-repair behavior with narrower runtime-visible evidence and bounded dimension-isolation rules.

Important families include:

- directional upward-casualness detection using speaker/recipient status rather than title keywords alone;
- relationship / reciprocal-register handling, with token-boundary repair so `แก` cannot match inside `แก้`;
- `รุ่นน้อง` added to subordinate-role coverage;
- service defer-before-acknowledgment risk;
- unrecoverable conditional / dangling structure risk;
- low-information repeated-core risk;
- Thai-clause-spine code-switch isolation;
- literal-task vs Lexical/Social Fit isolation;
- bounded formal-register isolation;
- multi-line native-redirection support only with positive evidence and structural exclusions;
- no guard stacking; deterministic movement remains bounded to one point toward rating 3;
- conflicting valid guards do not arithmetically cancel;
- resolver remains dimension-specific and cannot invent new linguistic facts.

The clean-room GPT-5.6 Sol account was used only as a gold-blind linguistic/adversarial critic. It was not used as Qualification evidence and is not numerically interchangeable with the frozen API evaluator.

## Fresh hidden Qualification v3

Created only **after** the v1.7 research freeze.

- Protocol: `TCJ-EVALUATOR-QUALIFICATION-2026Q3-v3`
- Evidence set: `TCJ-EVALUATOR-QUALIFICATION-BANK-2026Q3-v3`
- Protocol DB id: `4`
- Evidence-set DB id: `6`
- State: `draft_review` / `draft`
- Cases: `48`
- Primary-dimension design balance: exactly `8` per each of the six dimensions
- Human reviews at creation: `0`
- Human gold at creation: none (`{}` on every evidence item)
- Exposure state: private
- Candidate evaluator exposure: false
- Threshold SHA256: `b805b1f9484ea5ce576f09187c467b268c1f7c20263efa3889041680af426836`

Design labels are hypotheses only and are hidden from native-human review. Human frozen judgment is authoritative unless there is a mechanical integrity defect.

### Freshness / leakage gates enforced before insertion

The bank was rewritten until all pre-registered similarity ceilings passed:

- max scenario similarity to prior Qualification material `< 0.60`
- max candidate similarity to prior Qualification material `< 0.40`
- max candidate similarity to private Voice anchors `< 0.45`
- max internal scenario similarity `< 0.65`
- max internal candidate similarity `< 0.50`

The v3 set was inserted through migration:

`tcj_fresh_hidden_evaluator_qualification_v3_bank`

## Human-review surface

Review page:

`https://flipgazine.pages.dev/tcj-evaluator-qualification-review.html`

The existing page now points to a dedicated v3 endpoint:

`tcj-evaluator-qualification-review-v3`

The v2 review endpoint remains deployed unchanged for audit history.

Review requirements remain:

- inspect scenario + candidate only;
- rate all six dimensions 1–4;
- choose PASS / MINOR / MAJOR / CRITICAL;
- choose human confidence;
- mark ambiguity only when genuinely ambiguous;
- edit scenario/candidate only for genuine case integrity or wording defects, never to help the evaluator pass;
- do not consult model output, TCJ diagnosis, design class, or previous benchmark results while reviewing.

Human drafts remain editable until bank freeze. When 48/48 are reviewed, use the page freeze control. `private.tcj_freeze_qualification_bank` rechecks hashes, private exposure, human-gold consistency, item count and the frozen threshold contract before making the bank immutable.

## Status page

`https://flipgazine.pages.dev/tcj-status.html`

The live status endpoint and page were updated for:

- Sol v1.5 preserved fresh-Qualification failure;
- v1.6 exposed-v2 research replay;
- v1.7 cross-bank development + research freeze;
- fresh v3 native-human review as the current gate;
- authority remains NONE.

## Next actions

1. Native human completes all 48 v3 reviews blind.
2. Freeze v3 human gold through the review page.
3. Verify human/evidence manifests and v1.7 freeze attestation again.
4. Create the v1.7 authority run bound to protocol v3 and exact evaluator configuration SHA.
5. Only then use OpenAI API for the final controlled Qualification.
6. Watch every provider response for quota / `credit_balance_exhausted`. If encountered, stop immediately and notify the user. Do not silently retry semantic calls.
7. Preserve exact requests/responses, hashes, attempts, failures and any terminal generation-contract incidents.
8. Do not resample a terminal semantic failure merely to obtain a passing result.
9. Compare against the unchanged frozen threshold hash above.
10. Authority becomes eligible only if every frozen per-dimension and global gate passes.

## Explicit non-scope

Interactive `tcj_evidence_assess` Private Evidence Tool authority is still **not** covered by this v1.7 Qualification configuration. v1.7 remains scoped to eager/precomputed derived signals. The preferred future interactive commercial runtime requires a successor frozen evaluator configuration binding the tool contract, followed by another fresh hidden Qualification; authority cannot transfer automatically.
