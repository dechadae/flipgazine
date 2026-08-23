# ChatGPT Workflow — Document Authority Map

**Checkpoint:** 23 August 2026, free-model finalist selected  
**Purpose:** prevent historical TCJ plans, failed Qualification loops, stopped finalist runs and superseded optional-PEE checkpoints from being mistaken for current authority.

`CURRENT-STATE.json` is the compact machine-readable checkpoint. Historical evidence remains preserved even when its next-action text is superseded.

## Current governing TCJ authorities — read first

1. `ANSWERS-TCJ-MANDATORY-PROTECTED-EVIDENCE-ARCHITECTURE-AMENDMENT-20260823.md` — **highest current topology amendment.** Protected Evidence is required before every semantic diagnosis. Supersedes all older wording that makes PEE optional/risk-driven.
2. `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-V2-20260823.md` — underlying commercial Architecture-v2 authority where not superseded by the mandatory-evidence amendment.
3. `ANSWERS-TCJ-METHODOLOGY-PACK-AND-CONTEXT-RETRIEVER-SPEC-20260823.md` — governing Methodology Pack / Context Retriever specification.
4. `ANSWERS-TCJ-FREE-MODEL-FINALIST-SELECTION-20260823.md` — **current research decision. Gemini 3.5 Flash-Lite is the selected reference-judge candidate for the next model-specific TCJ refinement phase. Read this before taking the next research action.**
5. `ANSWERS-TCJ-MANDATORY-PEE-FREE-MODEL-TREATMENT-CHECKPOINT-20260823.md` — preserved execution checkpoint for the finalist experiment. Its instruction to continue Qwen/GPT-OSS is superseded by item 4.
6. `ANSWERS-TCJ-FINAL-PRODUCT-IMPLEMENTATION-AND-QUALIFICATION-PLAN-V2-20260823.md` — governing execution/spend plan except its optional-PEE topology language is superseded by item 1 and its generic judge-selection phase is now superseded by item 4.
7. `ANSWERS-TCJ-ARCHV2-REFERENCE-FREEZE-AND-QUALIFICATION2-HUMAN-GATE-20260823.md` — historical optional-PEE reference freeze + Qualification 2.0 construction/human-freeze authority. The frozen stack remains immutable evidence but is not the intended final product.
8. `ANSWERS-TCJ-LOW-TIER-JUDGE-TRANSFER-RESEARCH-CHECKPOINT-20260823.md` — historical pre-amendment low-tier checkpoint. Its GPT-OSS control evidence remains valid; its optional-PEE next-action sequence is superseded.
9. `ANSWERS-TCJ-V17-QUALIFICATION-FAILURE-AND-CONTEXT-ENGINE-PIVOT-20260823.md` — preserved v1.7 failure/pivot evidence. No authority.
10. `ANSWERS-TCJ-PRIVATE-EVIDENCE-ENGINE-AND-BUYER-ISOLATION-POLICY-20260822.md` — raw-corpus / tenant isolation authority. Still fully governing.
11. `ANSWERS-TCJ-SOL-PRIVATE-EVIDENCE-TOOL-AND-COMMERCIAL-LICENSING-CLARIFICATION-20260822.md` — bounded evidence capability and no-raw-row/search boundary. Optional-only invocation language is superseded.
12. `ANSWERS-TCJ-BYOJ-JUDGE-RUNTIME-AND-API-KEY-POLICY-20260822.md` — Local Judge / BYOK / buyer-owned key policy. Raw evidence remains inaccessible to the judge; mandatory derived evidence is supplied before diagnosis.
13. `ANSWERS-TCJ-PLUG-AND-PLAY-DEPLOYMENT-AND-VOICE-PROFILE-POLICY-20260822.md` — deployment and private-server voice-profile policy where consistent with Architecture v2.1.
14. `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md` — commercial-use/provenance boundary.
15. `ANSWERS-THAI-CONVERSATION-JUDGE-ARCHITECTURE.md` and `ANSWERS-VOICE-TONE.md` — legacy source material where not superseded.

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

Mandatory does not mean raw evidence leaves the private layer. The judge receives bounded, non-reconstructive derived evidence only. Raw corpus rows, nearest proprietary examples, human edit pairs, hidden Qualification cases, row IDs and arbitrary private search are prohibited.

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

## Free-model finalist result — current research decision

The free-model comparison is complete for **selection purposes**. The user explicitly chose to stop extending the partial Groq runs and decide from the evidence already collected.

Selected reference-judge candidate:

```text
Gemini 3.5 Flash-Lite
run 8
48 complete / 0 terminal
```

Preserved stopped finalists:

```text
Qwen 3.6 27B
run 7
21 complete / 4 terminal / 23 staged
status: stopped

GPT-OSS 20B
run 9
16 complete / 3 terminal / 29 staged
status: stopped
```

Primary fair ranking uses the 13 cases successfully judged by all three:

```text
Gemini MAE   0.5385
Qwen MAE     0.8077
GPT-OSS MAE  1.0897
```

On that common set Gemini had 10 >=2-point error cells versus Qwen 18 and GPT-OSS 28. Serious false ACCEPT was 0/2 for Gemini, 0/2 for Qwen and 2/2 for GPT-OSS. PASS false blocks were 3/9, 4/9 and 5/9 respectively.

Pairwise checks confirm the ranking:

```text
Gemini vs Qwen on 21 Qwen-completed cases:
  Gemini MAE 0.5238 vs Qwen 0.7460
  serious false ACCEPT 0/5 vs 1/5

Gemini vs GPT-OSS on 16 GPT-completed cases:
  Gemini MAE 0.5729 vs GPT-OSS 1.0000
  serious false ACCEPT 0/4 vs 2/4
```

Protocol completion among semantic attempts:

```text
Gemini 48/48 = 100%
Qwen   21/25 = 84.0%
GPT-OSS 16/19 = 84.2%
```

Do **not** restart Qwen/GPT-OSS merely to complete 48/48 unless the user explicitly reopens that experiment. The stopped ledgers are historical comparison evidence.

## Critical refinement finding

Gemini's full 48-case run still produced two serious false ACCEPTs (`Q3-026`, `Q3-043`). Both received a mandatory PEE packet whose structural assessment was overly reassuring. In particular the structural-completeness evidence failed to flag the clearly incomplete/dangling construction in `Q3-043`.

Therefore the next phase is **not just Gemini prompt tuning**. It must refine both:

1. Gemini-specific evidence consumption / judgment calibration; and
2. TCJ Protected Evidence planner/detectors, especially structural completeness, false reassurance and evidence-family routing.

Keep model-specific optimization in the adapter/evidence-presentation/configuration layer where possible so TCJ remains BYOJ/BYOK portable.

## Historical optional-PEE reference

```text
Freeze key       TCJ-ARCHV2-REFERENCE-EVALUATOR-FREEZE-v1
manifest SHA     916ffa3632e428f287692632d9e11b0eda5ea88fe39399fc39e362e0cae13d5c
Runtime          TCJ-RUNTIME-ANSWERS-BFF-ARCHV2-v1
```

Do not mutate/delete it. It is historical control/ablation evidence, not the intended final commercial topology.

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

**Do not expose Qualification 2.0 to development models.** It was constructed for the older optional-PEE freeze and cannot certify the mandatory-PEE successor as if the evaluator had not changed. Build a new hidden authority instrument only after the refined successor is finalized/frozen.

## Spend rule

```text
Paid OpenAI development calls = NO.
Groq free research = allowed only if a new experiment is explicitly opened.
Verified free Gemini development research = allowed.
Claude/other paid research = explicit user approval required.
Never silently upgrade a free experiment to paid inference.
```

## Operating rules

1. Architecture v2.1 mandatory Protected Evidence governs current topology.
2. Human gold remains authoritative.
3. Gemini 3.5 Flash-Lite is the selected development reference judge; this is not production authority.
4. Frozen historical hashes/thresholds are never relaxed or rewritten.
5. Raw TCJ/buyer evidence stays private; only bounded derived evidence reaches the judge.
6. Qualification 2.0 stays untouched by development models.
7. Preserve all provider responses, evidence packets/hashes, rate-limit events and terminal failures.
8. Do not restart stopped finalist runs without explicit user intent.
9. Refine against exposed/development evidence, then validate on a fresh development set before any freeze.
10. No successor configuration receives production authority until frozen and independently qualified with a new hidden instrument.
