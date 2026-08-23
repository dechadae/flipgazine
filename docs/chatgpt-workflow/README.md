# ChatGPT Workflow — Flipgazine / The Book of Answers

**Purpose:** canonical human-readable entry point for continuing the Answers / TCJ project across sessions.

Before consequential work, inspect canonical Supabase project `sjpvhgxacsiorrtijqua` and current GitHub state. Do not execute stale next-action text from historical documents.

`CURRENT-STATE.json` is the compact machine-readable checkpoint. `DOCUMENT-AUTHORITY-MAP.md` classifies current authorities and supersession rules.

## Current TCJ state

TCJ is on **Architecture v2** and the exact reference evaluator is frozen.

Production authority remains **NONE** until the final Qualification 2.0 machine run passes all pre-registered gates.

Qualification 2.0 human evidence is now **28/28 complete and frozen**. The current work is no longer human review; it is **free low-tier judge transfer research on already-exposed development evidence** before deciding whether to spend on the final OpenAI authority run.

Current live status:

`https://flipgazine.pages.dev/tcj-status.html`

### Read these first

1. `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-V2-20260823.md` — current commercial architecture.
2. `ANSWERS-TCJ-FINAL-PRODUCT-IMPLEMENTATION-AND-QUALIFICATION-PLAN-V2-20260823.md` — current execution/spend plan.
3. `ANSWERS-TCJ-METHODOLOGY-PACK-AND-CONTEXT-RETRIEVER-SPEC-20260823.md` — Methodology Pack and retrieval contract.
4. `ANSWERS-TCJ-LOW-TIER-JUDGE-TRANSFER-RESEARCH-CHECKPOINT-20260823.md` — **current execution checkpoint and immediate next action.**
5. `ANSWERS-TCJ-ARCHV2-REFERENCE-FREEZE-AND-QUALIFICATION2-HUMAN-GATE-20260823.md` — frozen reference evaluator and final Qualification 2.0 construction/human-freeze record.
6. `ANSWERS-TCJ-V17-QUALIFICATION-FAILURE-AND-CONTEXT-ENGINE-PIVOT-20260823.md` — preserved v1.7 failure and Architecture-v2 pivot evidence.
7. `ANSWERS-TCJ-PRIVATE-EVIDENCE-ENGINE-AND-BUYER-ISOLATION-POLICY-20260822.md` — protected-evidence boundary.
8. `ANSWERS-TCJ-BYOJ-JUDGE-RUNTIME-AND-API-KEY-POLICY-20260822.md` — local/BYOK judge boundary.
9. `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md` — commercial-use/provenance boundary.

Older freeze/checkpoint documents remain historical evidence; do not delete them or treat old next-action text as current authority.

## Current product definition

TCJ is:

> **a portable Thai conversational methodology + protected native-human evidence system + replaceable semantic judge + deterministic release authority.**

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

Production does **not** reread GitHub for every request. Git/docs are development sources compiled into a versioned Methodology Pack; runtime retrieval selects only relevant modules.

## Frozen reference evaluator

```text
Freeze key       TCJ-ARCHV2-REFERENCE-EVALUATOR-FREEZE-v1
Freeze SHA       916ffa3632e428f287692632d9e11b0eda5ea88fe39399fc39e362e0cae13d5c
Methodology      TCJ-METHODOLOGY-BFF-v1.1
Retriever        TCJ-CONTEXT-RETRIEVER-v1.4
Voice Profile    TCJ-VOICE-ANSWERS-BFF-v1
PEE tool         TCJ-PRIVATE-EVIDENCE-ASSESS-v1.1
Release Policy   TCJ-RELEASE-POLICY-v1.1
Judge Adapter    TCJ-JUDGE-ADAPTER-v2.1
Runtime          TCJ-RUNTIME-ANSWERS-BFF-ARCHV2-v1
Runtime SHA      43df71f47353c6abfd96f2a020e3bd8dc97e9ef4dc7c5071df8f4309a138f6da
```

Do not mutate the frozen reference stack during compatibility research.

## Qualification 2.0 — protected final authority evidence

```text
Protocol         TCJ-QUALIFICATION-2.0-2026Q3-v1
Status           human_frozen
Unique pairs     24
Human clicks     28 / 28
Hidden repeats   4 / 4 consistent
Human manifest   07a25c08b331c215bf6a7378665726c376045bcb9d547d3cd21eaca22b51428d
Threshold SHA    c9bd44181023471a961ddcce698e6c4141961573d4eae359ea73529ee12026e5
Bank SHA         8e3d6c5fff4860f97bfbfcd8d69c46e5484da0d5c315ed6f4888d0061d09b7c8
Evaluator SHA    916ffa3632e428f287692632d9e11b0eda5ea88fe39399fc39e362e0cae13d5c
```

**Do not expose this bank to free-development models.** It remains reserved for the final frozen authority run.

The staged OpenAI final run has sent **0 provider requests** and spent **$0**. Live status currently reports `stopped_incident` with no incident row / null incident field, external dispatch off and no user approval. Treat that as a locked administrative state, not a semantic Qualification result.

## Current research — low-tier judge transfer

Use the already-exposed v3 human bank only.

### Groq GPT-OSS 20B — complete

```text
Run                  TCJ-ARCHV2-GROQ-GPTOSS20B-STRESS-v1
Provider/model        Groq free / openai/gpt-oss-20b
Source cases          48
Usable semantic       47
Terminal protocol     1
PEE calls             0
Dimension cells       282
Mismatched cells      1
Errors >=2            0
False ACCEPT serious  0
False BLOCK PASS      0
Serious undercalls    1
Release rescues       1 / 1
Free-tier limit       8000 TPM
```

The one terminal failure was protocol compliance: the model attempted a nonexistent `json` tool. Preserve it rather than silently regenerating it.

The 47 usable cases differed from human six-dimensional gold on only one Lexical/Social Fit cell by one point. Simple cell MAE is approximately `0.0035`.

**Interpretation warning:** v3 is exposed development evidence and informed Architecture-v2 development. This near-perfect result is strong provider-portability / exposed-bank-fit evidence, but it is **not independent unseen generalization evidence**. Qualification 2.0 remains the authority test.

The 47 usable cases made **zero PEE calls**, so this run primarily demonstrates Methodology Pack + Retriever + Voice Profile + low-tier judge + Release Policy behavior, not PEE benefit.

## Planned free model matrix

Keep this small and cross-family:

1. Groq `openai/gpt-oss-20b` — complete.
2. Groq `qwen/qwen3.6-27b` — **next**.
3. Verified-free Gemini API model — after Qwen.
4. Claude only if a genuinely free API allowance/credit exists; otherwise stop and ask before any spend.

Measure semantic completion rate, protocol failures, dimension mismatch/MAE, serious false ACCEPTs, PASS false blocks, Release Policy rescues/mistakes, PEE calls, rate limits, adapter requirements and production economics.

Separate:

- base-model capability;
- Methodology Pack / Retriever transfer;
- PEE contribution;
- Release Policy containment;
- mere serialization/protocol normalization.

## Spend rule

**Paid OpenAI development inference is forbidden.**

- Groq free research: allowed.
- Gemini: only after verifying a genuinely zero-cost current-account path.
- Claude: only if genuinely free API allowance exists; otherwise stop for permission.
- Never silently upgrade a free tier to paid.
- Qualification 2.0 paid authority run remains locked until explicit user approval.

## Immediate next action

Run `qwen/qwen3.6-27b` through the same Architecture-v2 stress harness on the already-exposed v3 bank, preserve provider-specific failures, compare it against GPT-OSS 20B, then move to a verified-free Gemini family.
