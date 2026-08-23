# ChatGPT Workflow — Document Authority Map

**Checkpoint:** 23 August 2026  
**Purpose:** prevent historical TCJ plans, failed Qualification loops and superseded topology from being mistaken for current authority.

`CURRENT-STATE.json` is the compact machine-readable checkpoint. Historical evidence remains preserved even when its next-action text is superseded.

## Current governing TCJ authorities — read first

1. `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-V2-20260823.md` — **current commercial product architecture authority.** Methodology Pack + local Context Retriever are first-class; PEE remains protected/bounded; diagnosis and Release Policy are separate; BYOJ/BYOK is first-class; GitHub is not a production runtime dependency.
2. `ANSWERS-TCJ-METHODOLOGY-PACK-AND-CONTEXT-RETRIEVER-SPEC-20260823.md` — governing Methodology Pack / Context Retriever specification.
3. `ANSWERS-TCJ-FINAL-PRODUCT-IMPLEMENTATION-AND-QUALIFICATION-PLAN-V2-20260823.md` — governing execution/spend plan. Ordinary development makes zero paid provider calls; one final frozen authority run requires explicit user approval.
4. `ANSWERS-TCJ-ARCHV2-REFERENCE-FREEZE-AND-QUALIFICATION2-HUMAN-GATE-20260823.md` — **current execution checkpoint. Read this before taking any next action.** Architecture v2 is frozen and the current gate is the 28-click Qualification 2.0 native-human review.
5. `ANSWERS-TCJ-V17-QUALIFICATION-FAILURE-AND-CONTEXT-ENGINE-PIVOT-20260823.md` — preserved v1.7 fresh-Qualification failure and architecture-pivot evidence. v1.7 has no authority.
6. `ANSWERS-TCJ-PRIVATE-EVIDENCE-ENGINE-AND-BUYER-ISOLATION-POLICY-20260822.md` — raw-corpus and buyer-evidence isolation authority where not superseded by Architecture v2.
7. `ANSWERS-TCJ-SOL-PRIVATE-EVIDENCE-TOOL-AND-COMMERCIAL-LICENSING-CLARIFICATION-20260822.md` — narrow judge-initiated evidence capability; no SQL, arbitrary search, raw rows or hidden-test retrieval.
8. `ANSWERS-TCJ-BYOJ-JUDGE-RUNTIME-AND-API-KEY-POLICY-20260822.md` — Local Judge / BYOK / buyer-owned key policy.
9. `ANSWERS-TCJ-PLUG-AND-PLAY-DEPLOYMENT-AND-VOICE-PROFILE-POLICY-20260822.md` — deployment and private-server voice-profile policy where consistent with Architecture v2.
10. `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md` — commercial-use/provenance boundary.
11. `ANSWERS-THAI-CONVERSATION-JUDGE-ARCHITECTURE.md` and `ANSWERS-VOICE-TONE.md` — legacy method/editorial source material where not superseded.

`ANSWERS-TCJ-ARCHITECTURE-V2-OFFLINE-COMPONENTS-AND-CONTRASTIVE-HUMAN-GATE-20260823.md` is now a **superseded checkpoint**: its 30-click development contrastive gate was completed and incorporated before the reference evaluator freeze.

## Current core architecture

```text
BUYER WRITER
→ TCJ GATEWAY
→ VOICE PROFILE
→ LOCAL CONTEXT RETRIEVER
→ RELEVANT TCJ METHODOLOGY PACK MODULES
→ SELECTED BYOJ JUDGE
↔ OPTIONAL BOUNDED PRIVATE EVIDENCE TOOL
→ SIX-DIMENSION DIAGNOSIS
→ INDEPENDENT TCJ RELEASE POLICY
→ ACCEPT / REVISE / ESCALATE
→ optional targeted writer revision outside evaluator authority
```

Hard distinctions:

```text
Methodology Pack = portable TCJ mental model
Voice Profile     = what good means for this profile/domain
Context Retriever = which TCJ ideas matter for this request
Private Evidence  = protected empirical native-human memory
Judge             = replaceable semantic reasoner
Release Policy    = may this candidate ship?
```

## Frozen Architecture-v2 reference evaluator

Freeze:

```text
TCJ-ARCHV2-REFERENCE-EVALUATOR-FREEZE-v1
manifest SHA 916ffa3632e428f287692632d9e11b0eda5ea88fe39399fc39e362e0cae13d5c
```

Frozen components:

```text
Methodology Pack     TCJ-METHODOLOGY-BFF-v1.1
SHA                  4050f13b38efdabc6c36cc99b10b813ef46909ca11b6596d1591c9dea76df6e6
13 modules           M00–M12

Context Retriever    TCJ-CONTEXT-RETRIEVER-v1.4
registry SHA         8fbb7346175be7ea8ffecdcf3b4a799b8926fca403d6dbab89c6102c6a2c4cdd
implementation SHA   aefc5ed958c1d5a05b818e1945bfe4393f335d6f4d5b0dd5ae5dbe2a3f9ac130

Voice Profile        TCJ-VOICE-ANSWERS-BFF-v1
contract SHA         731121e592c773d36bbe7414dfdcee98b0a338fecee71dd6da1da9e8ef41bb9d

Private Evidence     TCJ-PRIVATE-EVIDENCE-ASSESS-v1.1
registry SHA         ff28943fcb133c5819a197a600039fe7ab92364d2d725161909c6124570beee7
max runtime calls    2
raw evidence export  no

Release Policy       TCJ-RELEASE-POLICY-v1.1
SHA                  c237fcf664ee67083bc4c7c3a46645a12fbad929cf2a93c363818d9b95a75e23
human PASS hard false blocks on exposed v2+v3  0 / 49

Judge Adapter        TCJ-JUDGE-ADAPTER-v2.1
SHA                  cdc8ba26f611cc5fe5f9915478ffbb7827db4b0580efae1a635f45c4a63a6727
reference API        OpenAI Responses
reference model      gpt-5.6 / gpt-5.6-sol family
semantic calls       one coherent six-dimension call per option
semantic retry       forbidden

Runtime              TCJ-RUNTIME-ANSWERS-BFF-ARCHV2-v1
config SHA           43df71f47353c6abfd96f2a020e3bd8dc97e9ef4dc7c5071df8f4309a138f6da
external dispatch    false by default
```

## Preserved v1.7 failure

```text
Run             TCJ-EVALUATOR-QUALIFICATION-RUN-2026Q3-v3-SOL-v1.7
48 cases
288 resolved cells
101 challenge judgments
overall MAE .5729
extreme reversals 17
false-fluent human MAJOR/CRITICAL ACCEPT 3
terminal generation failures 0
credit incidents 0
Qualification FAILED
Authority NONE
Summary SHA 52c507629205ddbb532faf57db2b9e8346ad82cfcf2e65d014231f80ddc70fd5
```

Do not rerun v1.7 or reinterpret v3 as fresh authority evidence.

## Completed development contrastive gate

`TCJ-CONTRASTIVE-DEVELOPMENT-v1`

```text
30/30 reviewed
26 unique
4 hidden reversed repeats
4/4 consistency
manifest c2424faff7f7169ee69babd1205654a636d82d0845138fc3d8487f70bfc784f2
```

Its evidence has already been incorporated into Methodology v1.1 / Retriever v1.4 / PEE v1.1 / Release Policy v1.1 before the reference freeze.

## Current human gate — Qualification 2.0

Protocol:

`TCJ-QUALIFICATION-2.0-2026Q3-v1`

```text
status              draft_review
24 unique comparisons
28 human clicks
4 hidden reversed repeats
reviewed             0 / 28 at checkpoint
threshold SHA        c9bd44181023471a961ddcce698e6c4141961573d4eae359ea73529ee12026e5
bank manifest SHA    8e3d6c5fff4860f97bfbfcd8d69c46e5484da0d5c315ed6f4888d0061d09b7c8
bank locked          yes, before first human review
evaluator freeze     916ffa3632e428f287692632d9e11b0eda5ea88fe39399fc39e362e0cae13d5c
```

Review page:

`https://flipgazine.pages.dev/tcj-qualification2-review.html`

Measurement is deliberately different from the old 48×6 matrix:

- A / B / Tie comparisons;
- one true context flip;
- dimension-isolation comparisons;
- direct release questions using A only / B only / Both / Neither;
- four hidden reversed consistency checks.

The evaluator was frozen before bank construction, and the bank/thresholds were locked before any human review record existed.

## External API spend rule

```text
Paid external model/API calls for ordinary TCJ development = NO.
Background provider-capable TCJ cron jobs = 0.
```

After the 28 human choices are frozen:

1. verify evaluator/bank/human/threshold manifests;
2. materialize machine scoring for the 24 unique comparisons only;
3. estimate final provider calls/tool follow-ups/cost and current balance;
4. ask the user for explicit permission;
5. if approved, run the exact frozen evaluator once;
6. no semantic retry/resampling;
7. issue Passport/authority only if every pre-registered gate passes.

If the final run fails, preserve the failure and do not automatically create another paid loop.

## Operating rules

When documents conflict:

1. Architecture v2 governs current topology.
2. The v2 execution plan governs release sequence/spend policy.
3. The current freeze + Qualification 2.0 checkpoint governs the immediate next action.
4. Human gold remains authoritative.
5. Frozen thresholds/hashes must not be relaxed after seeing human or machine results.
6. Historical failures remain evidence and must not be rewritten away.
7. Raw TCJ corpus/evidence must not be exposed to writer or external judge context.
8. Buyer-private evidence is tenant-local and is not pooled across customers by default.
