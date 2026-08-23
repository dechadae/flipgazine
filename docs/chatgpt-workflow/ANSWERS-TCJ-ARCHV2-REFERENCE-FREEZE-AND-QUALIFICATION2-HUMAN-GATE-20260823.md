# TCJ Architecture v2 — Reference Evaluator Freeze and Qualification 2.0 Human Gate

**Date:** 23 August 2026  
**Status:** current execution checkpoint  
**Canonical Supabase:** `sjpvhgxacsiorrtijqua`  
**Live status:** `https://flipgazine.pages.dev/tcj-status.html`  
**Human review:** `https://flipgazine.pages.dev/tcj-qualification2-review.html`

## Executive state

TCJ Architecture v2 is now frozen as a reference evaluator candidate. Ordinary development must make **zero paid external-model calls**. OpenAI/xAI/provider credit is reserved for one final frozen Qualification 2.0 machine run, and that run requires an explicit user-approved cost/call-count preflight.

Production authority remains **NONE** until Qualification 2.0 passes every pre-registered gate.

The old 48-cases × six absolute-score mechanic is retired as the default final instrument. Qualification 2.0 is a fresh contrastive/counterfactual instrument created only **after** the evaluator freeze.

## Preserved v1.7 failure

Historical run:

- evaluator: `TCJ-EVAL-ANSWERS-BFF-SOL-v1.7-frozen-dev`
- run: `TCJ-EVALUATOR-QUALIFICATION-RUN-2026Q3-v3-SOL-v1.7`
- 48 cases / 288 resolved cells / 101 challenge cells
- overall MAE `0.5729`
- extreme reversals `17`
- false-fluent human MAJOR/CRITICAL ACCEPTs `3`
- terminal generation failures `0`
- credit incidents `0`
- summary SHA `52c507629205ddbb532faf57db2b9e8346ad82cfcf2e65d014231f80ddc70fd5`
- result: FAILED, authority NONE

v1.7/v3 are exposed development evidence only and must never be reinterpreted as fresh authority evidence.

## Contrastive development evidence incorporated

`TCJ-CONTRASTIVE-DEVELOPMENT-v1` is frozen:

- 30 reviews
- 26 unique comparisons
- 4 hidden reversed repeats
- hidden-repeat consistency: 4/4
- human manifest `c2424faff7f7169ee69babd1205654a636d82d0845138fc3d8487f70bfc784f2`

Important human-derived corrections incorporated before final freeze:

1. relationship closeness attenuates hierarchy but does not erase upward asymmetry;
2. casual wording from a boss is not automatically symmetric permission for a subordinate, especially during accountability/error/reporting acts;
3. pairwise preference and release eligibility are different labels — losing an A/B comparison does not automatically make a response unshippable;
4. BFF sarcasm, mock-formality and hyperbole can be valid when pragmatic intent is recoverable;
5. factual completion, event congruence, stance proportionality, code-switch integration, composition and dimension isolation remain separate mechanisms.

## Frozen Architecture-v2 reference evaluator

Freeze key:

`TCJ-ARCHV2-REFERENCE-EVALUATOR-FREEZE-v1`

Freeze manifest SHA:

`916ffa3632e428f287692632d9e11b0eda5ea88fe39399fc39e362e0cae13d5c`

Freeze timestamp:

`2026-08-23 04:38:42.296898+00`

### Frozen components

| Component | Key | Frozen hash |
|---|---|---|
| Methodology Pack | `TCJ-METHODOLOGY-BFF-v1.1` | `4050f13b38efdabc6c36cc99b10b813ef46909ca11b6596d1591c9dea76df6e6` |
| Context Retriever | `TCJ-CONTEXT-RETRIEVER-v1.4` | registry `8fbb7346175be7ea8ffecdcf3b4a799b8926fca403d6dbab89c6102c6a2c4cdd` |
| Voice Profile | `TCJ-VOICE-ANSWERS-BFF-v1` | `731121e592c773d36bbe7414dfdcee98b0a338fecee71dd6da1da9e8ef41bb9d` |
| Private Evidence Tool | `TCJ-PRIVATE-EVIDENCE-ASSESS-v1.1` | registry `ff28943fcb133c5819a197a600039fe7ab92364d2d725161909c6124570beee7` |
| Release Policy | `TCJ-RELEASE-POLICY-v1.1` | `c237fcf664ee67083bc4c7c3a46645a12fbad929cf2a93c363818d9b95a75e23` |
| Judge Adapter | `TCJ-JUDGE-ADAPTER-v2.1` | `cdc8ba26f611cc5fe5f9915478ffbb7827db4b0580efae1a635f45c4a63a6727` |
| Runtime config | `TCJ-RUNTIME-ANSWERS-BFF-ARCHV2-v1` | `43df71f47353c6abfd96f2a020e3bd8dc97e9ef4dc7c5071df8f4309a138f6da` |
| Portable runtime | `tcj-runtime/src/server-v2.mjs` | Git blob `b598210bc0d2f4069e9e59d13b4db8eb53874fe6` |

### Frozen live implementation hashes

- `tcj_context_retrieve_v1_4` — `aefc5ed958c1d5a05b818e1945bfe4393f335d6f4d5b0dd5ae5dbe2a3f9ac130`
- `tcj_evidence_assess_internal_v1_1` — `701915d76a27a4f265d2cf86acb650399dc9eb7b68eb56c7dc4e6172f497e2b2`
- `tcj_release_evidence_v1_1` — `91662d5d75e2943a30e23a66bfd5bbc3293cc5d40135422d5633a365dd4f21ef`
- `tcj_release_policy_v1_1` — `c237fcf664ee67083bc4c7c3a46645a12fbad929cf2a93c363818d9b95a75e23`
- `tcj_evidence_sidecar_register_v1` — `a273d28da582e09dcb88951773011d67bf9a2a5ae0ca0f35b50d5e71bdc263ba`
- `tcj_evidence_sidecar_assess_v1` — `86fac51c82f56e2268edde6c9ff28018dad7fe0feeedd8d24e7d7d5055eed1ac`

## Reference judge contract

The frozen reference configuration uses:

- provider: OpenAI
- reference model id: `gpt-5.6`
- model family: `gpt-5.6-sol`
- API style: Responses API
- one coherent six-dimension semantic judgment per option
- Methodology Pack + Voice Profile in semantic context
- optional bounded `tcj_evidence_assess` function tool
- max Evidence calls per evaluation: 2
- `parallel_tool_calls=false`
- strict structured diagnosis schema
- no second semantic challenge pass
- no automatic semantic retry/resampling
- tool follow-up uses `previous_response_id` and resends TCJ instructions + tool declaration
- external dispatch disabled by default

The old six-separate-call architecture is not the final reference architecture.

## Security / spend boundary at freeze

Freeze-time checks:

- public/anon/authenticated grants on relevant private TCJ runtime/final-evidence tables: `0`
- scheduled jobs referencing TCJ/OpenAI/xAI/Grok: `0`
- external dispatch default: `false`
- paid development model calls allowed: `false`
- raw Evidence export: `false`
- Methodology Pack exact private-anchor leakage scan: `0`
- Methodology Pack exact old-Qualification-text leakage scan: `0`
- dedicated private Evidence sidecar secret: `tcj_runtime_v2_internal_key`
- sidecar wrong-key HTTP test: 401
- sidecar Vault-held-key session registration: HTTP 200; opaque ID/hash/TTL only

Project-wide legacy Flipgazine Supabase advisor findings remain outside the isolated TCJ package and must not be modified casually during TCJ qualification because unrelated live features may depend on them.

## Offline release-policy preservation evidence

Across frozen exposed v2 + v3 human gold:

- human-PASS cases checked: 49
- deterministic high-confidence false hard blocks: 0
- serious cases are intentionally not all handled by deterministic blockers; nuanced failures remain the semantic judge's job

This is a preservation/safety check, not authority evidence for the new semantic evaluator.

## Qualification 2.0 — final human instrument

Protocol:

`TCJ-QUALIFICATION-2.0-2026Q3-v1`

Current state:

- status: `draft_review`
- unique comparisons: 24
- human clicks: 28
- hidden reversed repeats: 4
- reviews at checkpoint: 0/28
- evaluator freeze manifest: `916ffa3632e428f287692632d9e11b0eda5ea88fe39399fc39e362e0cae13d5c`
- threshold SHA: `c9bd44181023471a961ddcce698e6c4141961573d4eae359ea73529ee12026e5`
- bank manifest SHA: `8e3d6c5fff4860f97bfbfcd8d69c46e5484da0d5c315ed6f4888d0061d09b7c8`
- bank locked at `2026-08-23 04:48:27.180113+00`
- human manifest: pending

The evaluator was frozen before the bank was constructed. The bank was then locked before any human review record existed. Case/order/design/threshold mutation is blocked while human choices remain editable until human freeze.

### Measurement suites

Six suites, four unique comparisons each:

1. task discrimination
2. social pragmatics
3. voice / lexical fit
4. stance / event fit
5. composition
6. release preservation

The 28-click review includes:

- ordinary response A/B/Tie comparisons;
- one true context-flip comparison using the same response in two social contexts;
- dimension-isolation cases;
- four direct release decisions using A only / B only / Both / Neither;
- four hidden reversed consistency repeats.

No six-dimensional human sliders are used.

### Pre-registered gates

- unique pair count = 24
- human clicks = 28
- hidden consistency repeats = 4; minimum consistent = 3/4
- pairwise target comparisons = 20; minimum correct = 18/20
- each of five pairwise suites minimum = 3/4
- isolation cases = 5; target direction minimum = 4/5
- protected-dimension stability minimum = 4/5, max protected score delta = 1
- release pairs = 4; exact classification minimum = 3/4
- false ACCEPT on human-unshippable options = 0
- false BLOCK on human-shippable options <= 1
- terminal provider failures = 0
- tool-budget violations = 0
- semantic retry/resampling to turn failure into pass = forbidden
- all global and suite gates must pass

Freshness ceilings were frozen into the protocol and passed before bank insertion/lock:

- prior scenario similarity < 0.55
- prior candidate similarity < 0.45
- private Voice anchor similarity < 0.35
- internal cross-case similarity < 0.40

Observed pre-insertion maxima were below those limits; the only initially over-close hierarchy candidate was rewritten before insertion rather than relaxing the threshold.

## Human-review surface

`https://flipgazine.pages.dev/tcj-qualification2-review.html`

Dedicated endpoint:

`tcj-qualification2-review`

Properties:

- admin-authenticated
- A/B order randomized per reviewer
- hidden design labels never returned
- one-click save + auto-next
- after save/navigation the page scrolls back to the review/scenario area
- manual Previous/Next remains available before freeze
- pair/context items: A / B / Tie
- release items: A only / B only / Both / Neither
- four hidden reversed repeats
- review choices can be revised until human freeze
- human freeze creates immutable human manifest

## Live status

`tcj-live-status` version 9 reflects this checkpoint.

The status page now reports Qualification 2.0 as the current human gate.

## What to do next

**STOP for native-human judgment.**

The user should complete all 28 Qualification 2.0 choices and freeze the human evidence.

After human freeze:

1. re-verify evaluator freeze manifest, bank manifest, human manifest and threshold SHA;
2. build/materialize the exact machine scoring ledger for the 24 unique comparisons only — hidden human repeats do not generate extra provider calls;
3. estimate exact external call count/tool-follow-up budget and expected cost against current API balance;
4. ask the user for explicit permission before any external provider dispatch;
5. if approved, run the exact frozen evaluator once with a hard dispatch ceiling;
6. no semantic retry/resampling;
7. compute all pre-registered pairwise, isolation, release-safety and consistency gates;
8. issue production authority/Passport only if every gate passes;
9. if it fails, preserve the failure and do not automatically create another paid loop.

## Non-negotiable spend rule

Until explicit user approval after human freeze:

> **OpenAI/xAI/Groq/other paid semantic inference calls = 0.**

Do not use provider credit for debugging, prompt tuning, case checking, or development replay.
