# ChatGPT Workflow — Flipgazine / The Book of Answers

**Purpose:** canonical human-readable entry point for continuing the Answers / TCJ project across sessions.

Before consequential work, inspect canonical Supabase project `sjpvhgxacsiorrtijqua` and current GitHub state. Do not execute stale next-action text from historical documents.

`CURRENT-STATE.json` is the compact machine-readable checkpoint. `DOCUMENT-AUTHORITY-MAP.md` classifies current authorities and supersession rules.

## Current TCJ state

TCJ is on **Architecture v2** and the exact reference evaluator is now frozen.

Production authority remains **NONE** until the final Qualification 2.0 machine run passes all pre-registered gates.

Current human-review page:

`https://flipgazine.pages.dev/tcj-qualification2-review.html`

Current live status:

`https://flipgazine.pages.dev/tcj-status.html`

### Read these first

1. `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-V2-20260823.md` — current commercial architecture.
2. `ANSWERS-TCJ-FINAL-PRODUCT-IMPLEMENTATION-AND-QUALIFICATION-PLAN-V2-20260823.md` — current execution/spend plan.
3. `ANSWERS-TCJ-METHODOLOGY-PACK-AND-CONTEXT-RETRIEVER-SPEC-20260823.md` — Methodology Pack and retrieval contract.
4. `ANSWERS-TCJ-ARCHV2-REFERENCE-FREEZE-AND-QUALIFICATION2-HUMAN-GATE-20260823.md` — **current execution checkpoint and immediate next action.**
5. `ANSWERS-TCJ-V17-QUALIFICATION-FAILURE-AND-CONTEXT-ENGINE-PIVOT-20260823.md` — preserved v1.7 failure and Architecture-v2 pivot evidence.
6. `ANSWERS-TCJ-PRIVATE-EVIDENCE-ENGINE-AND-BUYER-ISOLATION-POLICY-20260822.md` — protected-evidence boundary.
7. `ANSWERS-TCJ-BYOJ-JUDGE-RUNTIME-AND-API-KEY-POLICY-20260822.md` — local/BYOK judge boundary.
8. `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md` — commercial-use/provenance boundary.

Older freeze/checkpoint documents remain historical evidence; do not delete them or treat their old next-action text as current authority.

## Current product definition

TCJ is:

> **a portable Thai conversational methodology + protected native-human evidence system + replaceable semantic judge + deterministic release authority.**

It is not an ever-growing pile of regex guards around a model.

```text
BUYER WRITER
→ TCJ GATEWAY
→ VOICE PROFILE
→ LOCAL CONTEXT RETRIEVER
→ RELEVANT METHODOLOGY PACK MODULES
→ SELECTED BYOJ JUDGE
↔ OPTIONAL BOUNDED PRIVATE EVIDENCE TOOL
→ SIX-DIMENSION DIAGNOSIS
→ INDEPENDENT RELEASE POLICY
→ ACCEPT / REVISE / ESCALATE
```

```text
Methodology Pack = how TCJ reasons about Thai conversational quality
Context Retriever = which concepts matter for this request
Voice Profile = what good means for this buyer/domain/voice
Private Evidence Engine = protected native-human empirical memory
Judge = replaceable semantic reasoner
Release Policy = may this output ship?
```

Production does **not** reread GitHub for every request. Git/docs are development sources compiled into a versioned Methodology Pack; runtime retrieval selects only relevant modules.

## Frozen reference evaluator

```text
Freeze key       TCJ-ARCHV2-REFERENCE-EVALUATOR-FREEZE-v1
Freeze SHA       916ffa3632e428f287692632d9e11b0eda5ea88fe39399fc39e362e0cae13d5c

Methodology      TCJ-METHODOLOGY-BFF-v1.1
Pack SHA         4050f13b38efdabc6c36cc99b10b813ef46909ca11b6596d1591c9dea76df6e6
Modules          13

Retriever        TCJ-CONTEXT-RETRIEVER-v1.4
PEE tool         TCJ-PRIVATE-EVIDENCE-ASSESS-v1.1
Voice Profile    TCJ-VOICE-ANSWERS-BFF-v1
Release Policy   TCJ-RELEASE-POLICY-v1.1
Judge Adapter    TCJ-JUDGE-ADAPTER-v2.1
Runtime          TCJ-RUNTIME-ANSWERS-BFF-ARCHV2-v1
Runtime SHA      43df71f47353c6abfd96f2a020e3bd8dc97e9ef4dc7c5071df8f4309a138f6da
```

Reference semantic contract:

- one coherent six-dimension judge call per option;
- OpenAI Responses API for the reference configuration;
- reference model id `gpt-5.6`, model family `gpt-5.6-sol`;
- up to two bounded PEE tool calls;
- strict structured output;
- `parallel_tool_calls=false`;
- no universal second semantic pass;
- no semantic retry/resampling;
- external dispatch off by default.

OpenAI is a reference qualified judge target, not a mandatory product dependency. Buyers can use a compatible buyer-owned API key or local/self-hosted judge, but a different evaluator configuration is not automatically Qualified.

## Completed development evidence

The original 48×6 human banks v1.1/v2/v3 are now exposed development evidence. They are not the template for another final bank.

The later `TCJ-CONTRASTIVE-DEVELOPMENT-v1` is complete:

```text
30/30 reviewed
26 unique comparisons
4 hidden reversed repeats
4/4 repeat consistency
manifest c2424faff7f7169ee69babd1205654a636d82d0845138fc3d8487f70bfc784f2
```

Its human evidence was incorporated before the Architecture-v2 reference freeze.

## Current gate — Qualification 2.0

```text
Protocol         TCJ-QUALIFICATION-2.0-2026Q3-v1
Status           draft_review
Unique cases     24
Human clicks     28
Hidden repeats   4
Reviewed         0 / 28 at checkpoint
Threshold SHA    c9bd44181023471a961ddcce698e6c4141961573d4eae359ea73529ee12026e5
Bank SHA         8e3d6c5fff4860f97bfbfcd8d69c46e5484da0d5c315ed6f4888d0061d09b7c8
Bank locked      yes, before any human review
Evaluator SHA    916ffa3632e428f287692632d9e11b0eda5ea88fe39399fc39e362e0cae13d5c
```

This is deliberately a different measurement instrument:

- A / B / Tie controlled comparisons;
- true context flip;
- dimension isolation;
- release-safety classification using A only / B only / Both / Neither;
- hidden reversed consistency checks;
- no six human score sliders.

The evaluator was frozen before bank construction. The bank, hidden design contract and thresholds were then locked before the first human choice.

## Spend rule

**Paid external model calls for ordinary development are forbidden.**

Current provider-capable background TCJ cron jobs: `0`.

Do not use OpenAI/xAI/Groq/other provider credit for prompt tuning, debugging, replay or case checking.

After human Qualification 2.0 is frozen:

1. verify evaluator/bank/human/threshold manifests;
2. materialize machine scoring for the 24 unique pairs only;
3. estimate exact provider calls, tool-followups and cost;
4. ask the user for explicit approval;
5. run the exact frozen evaluator once if approved;
6. no semantic retry/resampling;
7. issue Passport/authority only if every gate passes;
8. if it fails, preserve failure and stop automatic paid retries.

## Security boundary

The Architecture-v2 freeze attests:

- zero public/anon/authenticated grants on relevant private TCJ tables;
- zero provider-capable background cron jobs;
- dedicated rotatable Evidence-sidecar secret `tcj_runtime_v2_internal_key`;
- raw Evidence export disabled;
- Methodology Pack private-anchor/old-Qualification exact-leak scans clean;
- external provider dispatch disabled by default.

Project-wide legacy Flipgazine Supabase advisor findings remain outside the isolated TCJ package and should only be changed through a separate impact-reviewed site-security project.

## Immediate next action

**Native-human gate:** complete and freeze the 28 choices at:

`https://flipgazine.pages.dev/tcj-qualification2-review.html`

Until that is complete, do not run the reference provider and do not construct another human bank.
