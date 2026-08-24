# ChatGPT Workflow — Document Authority Map

**Checkpoint:** 24 August 2026, 17:16 Asia/Bangkok  
**Purpose:** prevent stopped TCJ experiments, exposed development banks, superseded gates and stale next-actions from being mistaken for current authority.

## Read these first

1. `CURRENT-STATE.json` — machine-readable canonical checkpoint.
2. `ANSWERS-TCJ-V7-COMMERCIAL-SIM-SELECTIVE-GATE-20260824.md` — **current execution checkpoint. Native-human v7 manifest is frozen; TCJ remains sealed until one post-sync unblind.**
3. `ANSWERS-TCJ-MANDATORY-PROTECTED-EVIDENCE-ARCHITECTURE-AMENDMENT-20260823.md` — protected private evidence is mandatory and bounded/non-reconstructive.
4. `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-V2-20260823.md` — commercial product architecture where not superseded by later checkpoints.
5. `ANSWERS-TCJ-METHODOLOGY-PACK-AND-CONTEXT-RETRIEVER-SPEC-20260823.md` — methodology/context specification.
6. `ANSWERS-TCJ-ROADMAP-TO-FINAL-COMMERCIAL-PRODUCT-20260823.md` — commercial roadmap.

## Current product definition

TCJ is a native-editor feedback engine, not merely a scalar evaluator.

```text
customer model writes finished local-language copy
→ TCJ decides whether the native editor would publish that exact copy unchanged
→ SHIP or REVISE
→ if REVISE, the same/customer model edits its current finished draft using the smallest useful bounded instruction
→ optional TCJ re-check
```

For Answers BFF, `SHIP` means exact-copy publication with no meaningful edit. Any meaningful shortening, restructuring, voice correction, semantic/pragmatic correction, stance/certainty correction, removal of generic/model-like elaboration or composition correction is `REVISE`.

## Current execution state — v7

```text
Source bank       TCJ-SELECTIVE-EDITOR-SOURCE-BANK-2026Q3-v7
Evidence set id   18
Source manifest   b487efa82f88f295d825d2b12e300b43ab25075423a494b048ca275aee0208ba
Experiment        TCJ-SELECTIVE-EDITOR-COMMERCIAL-SIM-GEMINI35-v7
Model             gemini-3.5-flash-lite
Cases             24
Generation        24 / 24 complete
Terminal failures 0
Gemini HTTP 429   0
Human protocol    TCJ-SELECTIVE-EDITOR-HUMAN-REVIEW-2026Q3-v7
Human review      FROZEN 24 / 24
Human SHIP        1
Human REVISE      23
Human manifest    b2c32f637afd14fdefea89f7f293bfe48b39f25edc879bc88b43c87ebb930f76
TCJ distribution  SEALED
Q2 exposure       null
Paid frontier     locked
```

The native-human qualitative finding is part of the evidence: the v7 writer simulation produced generally poor, frequently severely overlong copy; some responses were three paragraphs. This is a design finding, not a reason to alter any reviewed case.

### v7 pre-unblind interpretation

The 1/23 human class distribution means v7 is strongly imbalanced toward `REVISE`. Therefore v7 may be useful for measuring false-SHIP behavior, but by itself it is weak evidence that TCJ is truly **selective**—there are too few genuinely publishable writer outputs to demonstrate that TCJ reliably leaves good copy untouched.

Do **not** repair this by balancing labels, rewriting reviewed cases, regenerating v7 or tuning TCJ against these 24 examples.

### Immediate next action

1. Human manifest is already frozen.
2. Canonical GitHub synchronization is now complete.
3. Unblind TCJ v7 exactly once.
4. Report agreement and confusion matrix honestly.
5. If the result is dominated by the bad writer baseline, classify v7 as diagnostic rather than qualification evidence.
6. Any successor selective-editor test must use a completely fresh bank and should validate the writer baseline before TCJ is allowed to see the cases.
7. Do not touch Qualification 2.0.
8. Do not spend paid OpenAI/xAI development credits.

## v6 — stopped before human review

`TCJ-SELECTIVE-EDITOR-BINARY-GEMINI35-v6` is immutable diagnostic history, not active evidence.

- source bank frozen before generation;
- 12/12 generation completed;
- native-human review count remained `0 / 12`;
- v6 was stopped because its task construction strongly encouraged advice-like, over-explained responses, making the selective gate structurally weak;
- hidden v6 TCJ decisions and provider evidence remain preserved;
- the former v6 review page is retired and must not be reopened as an active gate.

## v5 — frozen negative development evidence

The v5 selective editor gate is closed historical evidence:

```text
TCJ SHIP     12
TCJ REVISE    0
Human SHIP    1
Human REVISE 11
```

Interpretation: v5's REVISE definition was too narrow and accepted copy the native editor would still edit/shorten.

## Earlier rewrite/evaluator evidence

Earlier rewrite-lift, evaluator and exposed-bank experiments remain valid only for the claims stated in their own frozen checkpoints. They are not active next-action authority and must not be tuned further to improve their published scores.

Important previously closed findings include:

- exposed evaluator regression improved after focus-normalized/editor-role simplification but must not be tuned to 48/48;
- fresh 24-case evaluator comparison showed no net lift (`21/24` baseline vs `21/24` full TCJ);
- rewrite-lift v1 had `2 TCJ wins / 1 baseline win / 13 ties` but the control already contained substantial BFF guidance and therefore cannot support a strong causal uplift claim;
- later rewrite tests motivated the simpler selective-editor architecture.

## Protected historical authority — Qualification 2.0

```text
Protocol       TCJ-QUALIFICATION-2.0-2026Q3-v1
Unique pairs   24
Human clicks   28 / 28
Hidden repeats 4 / 4 consistent
Human manifest 07a25c08b331c215bf6a7378665726c376045bcb9d547d3cd21eaca22b51428d
Bank SHA       8e3d6c5fff4860f97bfbfcd8d69c46e5484da0d5c315ed6f4888d0061d09b7c8
Machine exposed_at null
```

**Do not expose Qualification 2.0 to development models.** It is historical authority for an older topology and cannot certify the current successor.

## Paid frontier budget

Paid OpenAI/xAI calls remain reserved for a later post-freeze authority experiment. Development must remain on free resources unless the user explicitly changes that rule, and any paid dispatch requires an immediate live pricing/balance/request-count preflight plus explicit user approval.

## Historical/stopped runs

All older phase documents, v4/v5/v6 selective experiments, prior rewrite-lift gates, Qwen/GPT-OSS/Ox Alpha finalist runs and exposed development regressions are historical evidence unless a newer checkpoint explicitly promotes them.

Stopped finalist runs remain stopped unless explicitly reopened:

- Qwen 3.6 27B run 7
- GPT-OSS 20B run 9
- Ox Alpha

## Commercial sequence from here

```text
v7 single unblind ← CURRENT NEXT ACTION
→ decide whether v7 is diagnostic or supports selective-editor evidence
→ if needed, build fresh writer-baseline-qualified selective test
→ freeze candidate runtime only after native-human evidence supports it
→ construct new hidden authority instrument
→ final paid OpenAI/xAI causal frontier experiment (with explicit approval)
→ authority decision
→ plug-and-play API
→ private-server / BYOJ / BYOK edition
→ customer-specific Voice Profile + controlled improvement
→ operator/control plane
→ production/security hardening
→ commercial release
```
