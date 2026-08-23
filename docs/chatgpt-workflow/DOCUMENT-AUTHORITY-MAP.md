# ChatGPT Workflow — Document Authority Map

**Checkpoint:** 23 August 2026, mandatory-PEE architecture amendment applied  
**Purpose:** prevent historical TCJ plans, failed Qualification loops and superseded optional-PEE checkpoints from being mistaken for current authority.

`CURRENT-STATE.json` is the compact machine-readable checkpoint. Historical evidence remains preserved even when its next-action text is superseded.

## Current governing TCJ authorities — read first

1. `ANSWERS-TCJ-MANDATORY-PROTECTED-EVIDENCE-ARCHITECTURE-AMENDMENT-20260823.md` — **highest current topology amendment.** Protected Evidence is required before every semantic diagnosis. Supersedes all older wording that makes PEE optional/risk-driven.
2. `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-V2-20260823.md` — underlying commercial Architecture-v2 authority where not superseded by the mandatory-evidence amendment.
3. `ANSWERS-TCJ-METHODOLOGY-PACK-AND-CONTEXT-RETRIEVER-SPEC-20260823.md` — governing Methodology Pack / Context Retriever specification.
4. `ANSWERS-TCJ-MANDATORY-PEE-FREE-MODEL-TREATMENT-CHECKPOINT-20260823.md` — **current execution checkpoint. Read this before taking the next research action.**
5. `ANSWERS-TCJ-FINAL-PRODUCT-IMPLEMENTATION-AND-QUALIFICATION-PLAN-V2-20260823.md` — governing execution/spend plan except its optional-PEE topology language is superseded by item 1.
6. `ANSWERS-TCJ-ARCHV2-REFERENCE-FREEZE-AND-QUALIFICATION2-HUMAN-GATE-20260823.md` — historical optional-PEE reference freeze + Qualification 2.0 construction/human-freeze authority. The frozen stack remains immutable evidence but is not the intended final product.
7. `ANSWERS-TCJ-LOW-TIER-JUDGE-TRANSFER-RESEARCH-CHECKPOINT-20260823.md` — historical pre-amendment low-tier checkpoint. Its GPT-OSS control evidence remains valid; its optional-PEE next-action sequence is superseded.
8. `ANSWERS-TCJ-V17-QUALIFICATION-FAILURE-AND-CONTEXT-ENGINE-PIVOT-20260823.md` — preserved v1.7 failure/pivot evidence. No authority.
9. `ANSWERS-TCJ-PRIVATE-EVIDENCE-ENGINE-AND-BUYER-ISOLATION-POLICY-20260822.md` — raw-corpus / tenant isolation authority. Still fully governing.
10. `ANSWERS-TCJ-SOL-PRIVATE-EVIDENCE-TOOL-AND-COMMERCIAL-LICENSING-CLARIFICATION-20260822.md` — bounded evidence capability and no-raw-row/search boundary. Optional-only invocation language is superseded.
11. `ANSWERS-TCJ-BYOJ-JUDGE-RUNTIME-AND-API-KEY-POLICY-20260822.md` — Local Judge / BYOK / buyer-owned key policy. Raw evidence remains inaccessible to the judge; mandatory derived evidence is now supplied before diagnosis.
12. `ANSWERS-TCJ-PLUG-AND-PLAY-DEPLOYMENT-AND-VOICE-PROFILE-POLICY-20260822.md` — deployment and private-server voice-profile policy where consistent with Architecture v2.1.
13. `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md` — commercial-use/provenance boundary.
14. `ANSWERS-THAI-CONVERSATION-JUDGE-ARCHITECTURE.md` and `ANSWERS-VOICE-TONE.md` — legacy source material where not superseded.

## Current governing architecture — v2.1 mandatory protected evidence

```text
BUYER WRITER
→ TCJ GATEWAY
→ VOICE PROFILE
→ LOCAL CONTEXT RETRIEVER
→ RELEVANT TCJ METHODOLOGY PACK MODULES
→ MANDATORY PROTECTED-EVIDENCE PLANNER
→ MANDATORY BOUNDED PRIVATE EVIDENCE ASSESSMENT
→ SELECTED BYOJ/BYOK SEMANTIC JUDGE
↔ OPTIONAL ONE ADDITIONAL TARGETED PRIVATE-EVIDENCE CALL
→ SIX-DIMENSION DIAGNOSIS
→ INDEPENDENT TCJ RELEASE POLICY
→ ACCEPT / REVISE / ESCALATE
```

Hard distinctions:

```text
Methodology Pack     = portable TCJ conceptual knowledge
Voice Profile        = what good means for this profile/domain
Context Retriever    = which TCJ ideas matter for this request
Protected Evidence   = protected native-human empirical grounding; REQUIRED
Judge                = replaceable semantic reasoner
Release Policy       = may this candidate ship?
```

Mandatory does not mean raw evidence leaves the private layer. The selected judge may receive only bounded, non-reconstructive derived evidence. It must not receive raw corpus rows, nearest proprietary examples, raw human edit pairs, hidden Qualification cases, private row IDs or arbitrary database/search access.

## Successor research runtime

```text
Runtime        TCJ-RUNTIME-ANSWERS-BFF-ARCHV2-v2-MANDATORY-PEE
Runtime SHA    9c418186601158ffe0afa85a1ce68a22e48b81e9dbd086d8b1fc10f0f9e51842
Judge Adapter  TCJ-JUDGE-ADAPTER-v2.2-MANDATORY-PEE
Planner        TCJ-PROTECTED-EVIDENCE-PLAN-v1
Status         research_active / NOT production authority
Min PEE calls  1
Max PEE calls  2
```

The planner is server-only. `anon` and `authenticated` have no execute permission; `postgres` does. It deterministically uses the local Context Retriever, requests all six dimensions, and selects at most four allowlisted evidence families.

## Historical frozen Architecture-v2 reference evaluator

```text
Freeze key       TCJ-ARCHV2-REFERENCE-EVALUATOR-FREEZE-v1
manifest SHA     916ffa3632e428f287692632d9e11b0eda5ea88fe39399fc39e362e0cae13d5c
Methodology      TCJ-METHODOLOGY-BFF-v1.1
Retriever        TCJ-CONTEXT-RETRIEVER-v1.4
Voice Profile    TCJ-VOICE-ANSWERS-BFF-v1
Private Evidence TCJ-PRIVATE-EVIDENCE-ASSESS-v1.1
Release Policy   TCJ-RELEASE-POLICY-v1.1
Judge Adapter    TCJ-JUDGE-ADAPTER-v2.1
Runtime          TCJ-RUNTIME-ANSWERS-BFF-ARCHV2-v1
```

Do not mutate or delete this stack. It is historical optional-PEE evidence and useful as an ablation/control, but it is not the intended final commercial topology.

## Qualification 2.0 — protected historical final-test evidence

```text
Protocol         TCJ-QUALIFICATION-2.0-2026Q3-v1
Status           human_frozen
Unique pairs     24
Human clicks     28 / 28
Hidden repeats   4 / 4 consistent
Human manifest   07a25c08b331c215bf6a7378665726c376045bcb9d547d3cd21eaca22b51428d
Threshold SHA    c9bd44181023471a961ddcce698e6c4141961573d4eae359ea73529ee12026e5
Bank SHA         8e3d6c5fff4860f97bfbfcd8d69c46e5484da0d5c315ed6f4888d0061d09b7c8
```

**Do not expose Qualification 2.0 to development models.** It was constructed for the older optional-PEE freeze. It must not be used to certify the mandatory-PEE successor as though the evaluator had not changed. A future authority instrument must be created only after the successor is finalized/frozen.

The old staged paid authority run remains non-authoritative and must not be restarted without live-state revalidation and explicit user approval.

## Current execution track — mandatory-PEE free-model control/treatment research

Development source bank only:

`TCJ-EVALUATOR-QUALIFICATION-BANK-2026Q3-v3`

Historical controls are preserved, including the completed GPT-OSS zero-PEE run and stopped partial optional-PEE Qwen/Gemini runs.

Current treatment runs:

```text
TCJ-ARCHV2-GROQ-GPTOSS20B-STRESS-MANDATORY-PEE-v1
TCJ-ARCHV2-GROQ-QWEN36-27B-STRESS-MANDATORY-PEE-v1
TCJ-ARCHV2-GEMINI35-FLASHLITE-STRESS-MANDATORY-PEE-v1
```

Every treatment task must have a mandatory initial evidence packet and SHA before the judge produces a diagnosis. Provider 429s may be retried as operational throttling; semantic/schema/protocol failures must be preserved, not resampled away.

Gemini can run independently. GPT-OSS and Qwen share the Groq free-tier quota and should be serialized/paced so the experiment does not manufacture rate-limit noise.

## Spend rule

```text
Paid OpenAI development calls = NO.
Groq free research = allowed.
Verified free Gemini research = allowed.
Claude/other paid research = explicit user approval required.
Never silently upgrade a free experiment to paid inference.
```

## Operating rules

1. Architecture v2.1 mandatory Protected Evidence governs current topology.
2. Human gold remains authoritative.
3. Frozen historical hashes/thresholds are never relaxed or rewritten.
4. Raw TCJ/buyer evidence stays private; only bounded derived evidence reaches the judge.
5. Qualification 2.0 stays untouched by free development models.
6. Preserve all provider responses, evidence packets/hashes, rate-limit events and terminal failures.
7. Separate semantic quality, mandatory-evidence lift, optional second-call value, Release Policy rescue and provider serialization compatibility.
8. No successor configuration receives production authority until frozen and independently qualified.
