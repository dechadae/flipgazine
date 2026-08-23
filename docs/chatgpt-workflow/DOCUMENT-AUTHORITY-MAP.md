# ChatGPT Workflow — Document Authority Map

**Checkpoint:** 23 August 2026  
**Purpose:** prevent historical TCJ plans, failed Qualification loops and superseded topology from being mistaken for current authority.

`CURRENT-STATE.json` is the compact machine-readable checkpoint. Historical evidence remains preserved even when its next-action text is superseded.

## Current governing TCJ authorities — read first

1. `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-V2-20260823.md` — **current final commercial product architecture authority.** Adds the TCJ Methodology Pack + local Context Retriever as first-class components, keeps the Private Evidence Engine behind a bounded tool, separates six-dimensional diagnosis from independent Release Policy, preserves BYOJ/BYOK, and explicitly removes GitHub as a production runtime dependency.

2. `ANSWERS-TCJ-METHODOLOGY-PACK-AND-CONTEXT-RETRIEVER-SPEC-20260823.md` — **governing Methodology Pack / Context Retriever implementation spec.** Defines judge-visible methodology knowledge, private evidence tiers, module map, retrieval contract, BYOK portability and build-time compilation from canonical docs.

3. `ANSWERS-TCJ-METHODOLOGY-BFF-V1-COMPILED-20260823.md` — **current compiled Methodology Pack implementation checkpoint.** Records `TCJ-METHODOLOGY-BFF-v1`, all 13 module hashes, current Retriever/PEE/Release Policy hashes and the human-gold corrections incorporated into release-policy v1.1.

4. `ANSWERS-TCJ-FINAL-PRODUCT-IMPLEMENTATION-AND-QUALIFICATION-PLAN-V2-20260823.md` — **governing final-product execution plan.** Development uses no paid external model calls by default. It defines offline build, plug-and-play packaging, final evaluator freeze, Qualification 2.0, and one final paid provider run after explicit user approval.

5. `ANSWERS-TCJ-ARCHITECTURE-V2-OFFLINE-COMPONENTS-AND-CONTRASTIVE-HUMAN-GATE-20260823.md` — **current execution checkpoint.** Architecture-v2 Phases B–E are implemented offline; the next required action is 30 native-human A/B/Tie contrastive choices.

6. `ANSWERS-TCJ-V17-QUALIFICATION-FAILURE-AND-CONTEXT-ENGINE-PIVOT-20260823.md` — preserved **v1.7 fresh Qualification failure and pivot evidence.** v1.7 has no authority; v3 is exposed development evidence; repeated 48×6 banks are retired as the default loop.

7. `ANSWERS-TCJ-PRIVATE-EVIDENCE-ENGINE-AND-BUYER-ISOLATION-POLICY-20260822.md` — raw-corpus / buyer-evidence isolation authority where not superseded by architecture v2. PEE is protected empirical memory/evidence, not the sole carrier of TCJ conceptual intelligence.

8. `ANSWERS-TCJ-SOL-PRIVATE-EVIDENCE-TOOL-AND-COMMERCIAL-LICENSING-CLARIFICATION-20260822.md` — governing narrow judge-initiated evidence capability where not superseded by richer bounded-response language in architecture v2. No SQL, arbitrary corpus search, raw rows or hidden-test retrieval.

9. `ANSWERS-TCJ-BYOJ-JUDGE-RUNTIME-AND-API-KEY-POLICY-20260822.md` — Local Judge / BYOK Judge / BYOJ terminology and buyer-owned API-key boundary. Buyer pays provider usage directly by default.

10. `ANSWERS-TCJ-PLUG-AND-PLAY-DEPLOYMENT-AND-VOICE-PROFILE-POLICY-20260822.md` — deployment/setup/private-server improvement authority where not contradicted by architecture v2.

11. `ANSWERS-TCJ-MULTI-JUDGE-CONSENSUS-ARCHITECTURE.md` — Panel/reliability methodology if the final product uses a Panel. Architecture v2 does not require a universal Panel or universal second semantic pass.

12. `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md` — commercial-use/provenance/model-development boundary.

13. `ANSWERS-THAI-CONVERSATION-JUDGE-ARCHITECTURE.md` and `ANSWERS-VOICE-TONE.md` — legacy method/editorial authorities that remain source material where not superseded by Architecture v2.

## Architecture-v2 supersession rules

For current product topology and execution sequencing, Architecture v2 supersedes conflicting portions of:

- `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-FREEZE-20260822.md`;
- `ANSWERS-TCJ-FINAL-PRODUCT-IMPLEMENTATION-AND-QUALIFICATION-PLAN-20260822.md`;
- older next-action language requiring another mechanically identical 48×6 Qualification bank;
- older assumptions that eager/precomputed scalar PEE signals should carry most TCJ intelligence;
- older development loops that repeatedly call paid external judges before final freeze.

Those files remain historical evidence. Do not rewrite or delete them to hide the design evolution.

## Current core architecture

```text
BUYER WRITER
→ TCJ GATEWAY
→ VOICE PROFILE
→ LOCAL CONTEXT RETRIEVER
→ RELEVANT TCJ METHODOLOGY PACK MODULES
→ SELECTED BYOJ JUDGE
↔ OPTIONAL NARROW PRIVATE EVIDENCE TOOL
→ DIMENSION DIAGNOSIS
→ INDEPENDENT TCJ RELEASE POLICY
→ ACCEPT / REVISE / ESCALATE
→ ONE TARGETED WRITER REVISION IF REQUIRED
→ RECHECK
→ FINAL OUTPUT
```

Hard distinctions:

```text
Methodology Pack = portable TCJ mental model / conceptual knowledge
Voice Profile     = what good means for this profile/buyer/domain
Context Retriever = which TCJ ideas matter for this request
Private Evidence  = protected native-human empirical memory
Judge             = replaceable semantic reasoner
Release Policy    = may the candidate ship?
```

## Current implemented Architecture-v2 components

```text
Methodology Pack     TCJ-METHODOLOGY-BFF-v1
Pack SHA             22ab0440b41708f41d8abe3a546b7c6197220a1824c59de56a6e86a4b7761f0a
Modules              13 (M00–M12)
Status               research_compiled

Context Retriever    TCJ-CONTEXT-RETRIEVER-v1.1
Retriever SHA        ce572d4ad361d563229c27da9c111647c4571af7ceab02b6940dd2eca6d693a2
Status               research_active
External LLM needed  no

PEE assessment       TCJ-PRIVATE-EVIDENCE-ASSESS-v1
PEE tool SHA         9f6a93d92e79651b095803cd064d0d9c9e1414ef2db9b6c2314d1196e19a67cf
Max families/call    4
Status               research_active
Raw evidence output  no

Release Policy       TCJ-RELEASE-POLICY-v1.1
Policy SHA           c237fcf664ee67083bc4c7c3a46645a12fbad929cf2a93c363818d9b95a75e23
Status               research_active
Human-PASS hard false blocks on frozen v2+v3  0 / 49
```

Retriever v1 and Release Policy v1 remain preserved as retired research evidence rather than being silently overwritten.

## Preserved v1.7 failure

```text
Evaluator       TCJ-EVAL-ANSWERS-BFF-SOL-v1.7-frozen-dev
Config SHA      5eb3d2354717573e1d8f48a574a960d3bea63a855409ac23932530be7bc23d07
Run             TCJ-EVALUATOR-QUALIFICATION-RUN-2026Q3-v3-SOL-v1.7
48 cases
288 primary judgments
101 challenge judgments
389 provider dispatches/responses
288 resolved cells
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

## Current human gate

`TCJ-CONTRASTIVE-DEVELOPMENT-v1`

```text
30 A/B/Tie comparisons
26 unique
4 hidden reversed repeats
12 mechanism families
reviewed 0 / 30
```

Review page:

`https://flipgazine.pages.dev/tcj-contrastive-review.html`

This is development evidence, not final hidden Qualification evidence. It validates mechanism boundaries in the Methodology Pack, Retriever, PEE and Release Policy before judge-adapter/productization work proceeds.

## External API spend rule

```text
Paid external model/API calls for ordinary TCJ development = NO.
```

Use stored historical provider outputs, exposed human-reviewed banks, deterministic replay, contrastive human evidence, local pack/retrieval tests and current ChatGPT reasoning.

Paid provider credit is reserved for **one final frozen authority test** after explicit user approval and a call-count/cost/balance check. No autonomous cron/worker may consume external-model credit during development.

## Final Qualification direction

Do not construct the final hidden instrument until the exact Architecture-v2 evaluator is frozen.

Qualification 2.0 should combine fresh post-freeze evidence for:

- A/B/Tie controlled discrimination;
- context counterfactuals;
- dimension isolation;
- release safety;
- preservation of acceptable/unconventional native Thai;
- repeated/reversed consistency;
- limited absolute calibration for continuity.

A new instrument may use preregistered thresholds appropriate to that new measurement method. This does not rewrite or weaken the historical v1.7 failure contract.

## Operating rules

When documents conflict:

1. follow the document that owns the decision domain;
2. within that domain, follow the newer verified/applied authority;
3. Architecture v2 governs current commercial topology;
4. the v2 execution plan governs release sequence;
5. the Methodology Pack spec/compiled pack govern judge-visible conceptual context;
6. PEE/buyer-isolation docs govern raw-evidence privacy;
7. BYOJ/BYOK docs govern provider/key ownership;
8. human gold remains authoritative historical evidence;
9. old Qualification thresholds are not retroactively changed;
10. final Qualification 2.0 is created only after exact evaluator freeze;
11. no paid external development calls occur without explicit user authorization;
12. GitHub is source control/documentation, not a production runtime dependency;
13. buyer-owned API credentials are the preferred external-provider production structure;
14. authority belongs to the exact frozen evaluator configuration, never a naked model name;
15. update `README.md`, `CURRENT-STATE.json` and this map together whenever execution authority changes.
