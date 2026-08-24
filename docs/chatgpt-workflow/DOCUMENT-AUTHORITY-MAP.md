# ChatGPT Workflow — Document Authority Map

**Checkpoint:** 24 August 2026, 17:25 Asia/Bangkok  
**Purpose:** prevent stopped TCJ experiments and superseded validation instructions from being mistaken for current authority.

## Read these first

1. `CURRENT-STATE.json` — canonical machine-readable state.
2. `ANSWERS-TCJ-V7-COMMERCIAL-SIM-SELECTIVE-GATE-20260824.md` — **current diagnostic checkpoint and architectural pivot.**
3. `ANSWERS-TCJ-MANDATORY-PROTECTED-EVIDENCE-ARCHITECTURE-AMENDMENT-20260823.md` — protected private evidence remains mandatory on the TCJ/editor side and bounded/non-reconstructive.
4. `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-V2-20260823.md` — commercial architecture where not superseded below.
5. `ANSWERS-TCJ-METHODOLOGY-PACK-AND-CONTEXT-RETRIEVER-SPEC-20260823.md`.
6. `ANSWERS-TCJ-ROADMAP-TO-FINAL-COMMERCIAL-PRODUCT-20260823.md`.

## Current product model

The evidence now favors a simpler split:

```text
customer/source task
→ capable writer gets compact role/voice capsule only
→ finished local-language copy
→ TCJ inspects exact finished copy
→ SHIP or REVISE
→ if REVISE: one smallest useful editorial instruction
→ same writer edits its CURRENT draft under the same role capsule
→ optional TCJ re-check
```

Do not inject raw private evidence, detailed TCJ methodology, retrieved corpus examples or large editorial briefs into the writer. Those remain on the TCJ/editor side.

## v7 — frozen failed diagnostic

```text
Bank             TCJ-SELECTIVE-EDITOR-SOURCE-BANK-2026Q3-v7
Bank manifest    b487efa82f88f295d825d2b12e300b43ab25075423a494b048ca275aee0208ba
Human manifest   b2c32f637afd14fdefea89f7f293bfe48b39f25edc879bc88b43c87ebb930f76
Cases            24
Human SHIP        1
Human REVISE     23
TCJ SHIP         16
TCJ REVISE        8
Correct SHIP      1
Correct REVISE    8
Missed revisions 15
Agreement         9 / 24 = 37.5%
```

v7 is **not qualification evidence**. The writer simulation produced generally poor, often overlong copy, and TCJ falsely SHIPPED 15 of 23 drafts the native editor would revise.

The failure is not solved by a character-count rule: some false-SHIP drafts were short. TCJ already knew the vocabulary of assistantese/over-explanation but applied the publishability test inconsistently.

Do not rerun, relabel, rewrite or tune v7 to improve its score.

## Important historical evidence — simple role-conditioned writer

`TCJ-REWRITE-LIFT-GEMINI35-v1` used a strong specialist BFF writer role plus a few simple instructions including keeping the response concise. The TCJ arm added an editorial brief on top of the same writer role.

Frozen blind result:

```text
TCJ wins       2
Baseline wins  1
Ties          13
Neither        0
```

The role-conditioned baseline averaged `157.6` characters versus `224.5` for v7's commercial-simulation baseline.

This does **not** prove the role was the sole causal factor because v1 also rewrote an existing source draft while v7 composed more freely from a semantic source. But it is strong evidence that adding heavier TCJ guidance to the writer is not the right direction.

## Immediate next action

Run a small fresh **role-writer feasibility pilot** before another selective-editor experiment.

Rules:

1. Fresh cases only.
2. Use the simple v1-style specialist writer role; no TCJ methodology/evidence/editorial brief.
3. TCJ must not see the pilot cases yet.
4. Native human reviews only the raw writer drafts: exact-copy `SHIP` or `REVISE`.
5. Purpose is to verify that the writer simulator itself produces realistic, reasonably concise copy and a meaningful quality distribution.
6. If the writer pilot is still systematically bad, fix the writer simulation rather than testing TCJ against a broken baseline.
7. If viable, create a separate fresh selective-editor bank; do not reuse pilot or v7 cases for scoring.

## Protected historical authority — Qualification 2.0

`TCJ-QUALIFICATION-2.0-2026Q3-v1` remains `human_frozen`, with `machine_exposed_at = null`. It must not be run during development and cannot certify the current successor topology.

## Paid frontier resources

No paid OpenAI/xAI development calls. Any later paid authority experiment requires a live pricing/balance/request-count preflight and explicit user approval immediately before dispatch.

## Commercial sequence

```text
role-writer feasibility pilot ← CURRENT
→ fresh selective-editor gate
→ freeze candidate runtime if supported
→ new hidden native-human authority instrument
→ final paid OpenAI/xAI causal frontier experiment (explicit approval)
→ authority decision
→ plug-and-play API
→ private-server / BYOJ / BYOK edition
→ customer Voice Profile + controlled improvement
→ operator/control plane
→ production/security hardening
→ commercial release
```
