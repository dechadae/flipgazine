# ChatGPT Workflow — Document Authority Map

**Checkpoint:** 23 August 2026, 13:47 ICT  
**Purpose:** prevent historical TCJ plans, failed Qualification loops and superseded checkpoints from being mistaken for current authority.

`CURRENT-STATE.json` is the compact machine-readable checkpoint. Historical evidence remains preserved even when its next-action text is superseded.

## Current governing TCJ authorities — read first

1. `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-V2-20260823.md` — **current commercial product architecture authority.** Methodology Pack + local Context Retriever are first-class; PEE remains protected/bounded; diagnosis and Release Policy are separate; BYOJ/BYOK is first-class; GitHub is not a production runtime dependency.
2. `ANSWERS-TCJ-METHODOLOGY-PACK-AND-CONTEXT-RETRIEVER-SPEC-20260823.md` — governing Methodology Pack / Context Retriever specification.
3. `ANSWERS-TCJ-FINAL-PRODUCT-IMPLEMENTATION-AND-QUALIFICATION-PLAN-V2-20260823.md` — governing execution/spend plan. Ordinary paid development inference is forbidden; the final authority run requires explicit user approval.
4. `ANSWERS-TCJ-LOW-TIER-JUDGE-TRANSFER-RESEARCH-CHECKPOINT-20260823.md` — **current execution checkpoint. Read this before taking any next action.** Qualification 2.0 human evidence is frozen and protected; current work is free low-tier judge transfer research on already-exposed v3 evidence.
5. `ANSWERS-TCJ-ARCHV2-REFERENCE-FREEZE-AND-QUALIFICATION2-HUMAN-GATE-20260823.md` — reference evaluator freeze + Qualification 2.0 construction/human-freeze authority. Its human-review next-action text is now superseded because 28/28 review is complete.
6. `ANSWERS-TCJ-V17-QUALIFICATION-FAILURE-AND-CONTEXT-ENGINE-PIVOT-20260823.md` — preserved v1.7 fresh-Qualification failure and architecture-pivot evidence. v1.7 has no authority.
7. `ANSWERS-TCJ-PRIVATE-EVIDENCE-ENGINE-AND-BUYER-ISOLATION-POLICY-20260822.md` — raw-corpus and buyer-evidence isolation authority where not superseded by Architecture v2.
8. `ANSWERS-TCJ-SOL-PRIVATE-EVIDENCE-TOOL-AND-COMMERCIAL-LICENSING-CLARIFICATION-20260822.md` — narrow judge-initiated evidence capability; no SQL, arbitrary search, raw rows or hidden-test retrieval.
9. `ANSWERS-TCJ-BYOJ-JUDGE-RUNTIME-AND-API-KEY-POLICY-20260822.md` — Local Judge / BYOK / buyer-owned key policy.
10. `ANSWERS-TCJ-PLUG-AND-PLAY-DEPLOYMENT-AND-VOICE-PROFILE-POLICY-20260822.md` — deployment and private-server voice-profile policy where consistent with Architecture v2.
11. `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md` — commercial-use/provenance boundary.
12. `ANSWERS-THAI-CONVERSATION-JUDGE-ARCHITECTURE.md` and `ANSWERS-VOICE-TONE.md` — legacy method/editorial source material where not superseded.

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

```text
Freeze key       TCJ-ARCHV2-REFERENCE-EVALUATOR-FREEZE-v1
manifest SHA     916ffa3632e428f287692632d9e11b0eda5ea88fe39399fc39e362e0cae13d5c

Methodology      TCJ-METHODOLOGY-BFF-v1.1
Pack SHA         4050f13b38efdabc6c36cc99b10b813ef46909ca11b6596d1591c9dea76df6e6
Retriever        TCJ-CONTEXT-RETRIEVER-v1.4
Voice Profile    TCJ-VOICE-ANSWERS-BFF-v1
Private Evidence TCJ-PRIVATE-EVIDENCE-ASSESS-v1.1
Release Policy   TCJ-RELEASE-POLICY-v1.1
Judge Adapter    TCJ-JUDGE-ADAPTER-v2.1
Runtime          TCJ-RUNTIME-ANSWERS-BFF-ARCHV2-v1
Runtime SHA      43df71f47353c6abfd96f2a020e3bd8dc97e9ef4dc7c5071df8f4309a138f6da
```

Do not silently mutate this frozen reference stack.

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

**Do not expose Qualification 2.0 to development models.** Groq, Qwen, Gemini, Claude and any other free/experimental judge must use already-exposed development evidence only.

Final OpenAI run:

`TCJ-QUALIFICATION-2.0-FINAL-RUN-2026Q3-v1`

Live checkpoint:

- status `stopped_incident`;
- no incident row / incident field null;
- provider requests `0`;
- actual spend `$0`;
- external dispatch disabled;
- user approval absent.

This is an administrative locked/stopped pre-dispatch state, not a semantic Qualification result. Reverify live state and require explicit user approval before any provider dispatch.

## Current execution track — low-tier judge transfer research

Use only exposed v3 development evidence:

`TCJ-EVALUATOR-QUALIFICATION-BANK-2026Q3-v3`

The purpose is to test provider portability and whether TCJ context/release architecture can support weaker judges. Because v3 informed Architecture-v2 development, this is **not independent unseen generalization evidence**.

### Groq GPT-OSS 20B — completed

```text
Run                  TCJ-ARCHV2-GROQ-GPTOSS20B-STRESS-v1
Provider/model        Groq free / openai/gpt-oss-20b
Source cases          48
Usable semantic       47
Terminal protocol     1
PEE calls             0
Dimension cells       282
Mismatched cells      1 total
Errors >=2            0
False ACCEPT serious  0
False BLOCK PASS      0
Serious undercalls    1
Release rescues       1 / 1
Observed free limit   8000 TPM
```

The terminal protocol failure was a model attempt to call a nonexistent `json` tool. Preserve it as compatibility evidence; do not silently regenerate it and claim 48/48.

Allowed provider-compatibility normalization is structural only: rationale-string container normalization and omitted empty arrays. Never change scores, severity, confidence, explicit escalation, or semantic content.

The 47 usable cases made **zero PEE calls**, so this run primarily tests:

`Methodology Pack + Retriever + Voice Profile + low-tier model + Release Policy`

not PEE benefit.

### Planned cross-family sequence

1. Groq `openai/gpt-oss-20b` — complete.
2. Groq `qwen/qwen3.6-27b` — **next action**.
3. Verified-free Gemini API family — after Qwen.
4. Claude only if a genuinely free API allowance/credit exists; otherwise stop and ask the user before spending anything.

Do not turn this into an endless model leaderboard. The goal is a small set of genuinely different model families.

For each family record semantic completion rate, schema/protocol failures, dimension mismatch/MAE, serious false ACCEPTs, PASS false blocks, Release Policy rescues/mistakes, PEE call frequency, rate limits and production economics.

## Spend rule

```text
Paid OpenAI development calls = NO.
Qualification 2.0 paid authority run = locked until explicit user approval.
Groq free tests = allowed.
Gemini tests = allowed only after verifying a genuinely zero-cost path.
Claude = only if genuinely free API allowance exists; otherwise stop for permission.
Never silently upgrade a free tier to paid.
```

## Operating rules

1. Architecture v2 governs current topology.
2. The current low-tier research checkpoint governs the immediate next action.
3. Human gold remains authoritative.
4. Frozen thresholds/hashes must not be relaxed.
5. Historical failures remain evidence and must not be rewritten away.
6. Raw TCJ corpus/evidence must not be exposed to external judges.
7. Qualification 2.0 must remain untouched until the final authority run.
8. Preserve provider-specific contract failures separately from semantic failures.
