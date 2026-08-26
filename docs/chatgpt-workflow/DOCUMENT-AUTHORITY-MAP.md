# ChatGPT Workflow — Document Authority Map

**Checkpoint:** 26 August 2026, 22:36 Asia/Bangkok  
**Purpose:** prevent completed footing experiments, superseded prompt architectures, unavailable-model dependencies, invalidated writer evidence and diagnosis-only assumptions from being mistaken for current TCJ authority.

## Read these first

1. `CURRENT-STATE.json` — canonical machine-readable state.
2. `ANSWERS-TCJ-FOOTING-ABLATIONS-V2-V3-AND-SPEECH-EVENT-OMISSION-GATE-20260826.md` — **CURRENT execution checkpoint and native-human gate.**
3. `ANSWERS-TCJ-CONVERSATIONAL-FOOTING-STANCE-AND-DISCOURSE-ARCHITECTURE-20260824.md` — governing footing-first linguistic architecture.
4. `ANSWERS-TCJ-FOOTING-BLIND-RECONSTRUCTION-V1-RESULTS-AND-REFINEMENT-20260826.md` — completed v1 reconstruction discovery checkpoint.
5. `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-V3-FOOTING-FIRST-REWRITE-CAPABLE-20260824.md` — governing commercial architecture.
6. `ANSWERS-TCJ-REGISTER-DIFFICULTY-AND-BFF-STRESS-TEST-20260824.md` — profile-difficulty / qualification strategy.
7. `ANSWERS-TCJ-BFF-SPEAKER-AND-QUOTED-SPEECH-CONTRACT-20260824.md` — useful historical speaker/quoted-speech authority under the richer speech-event frame.
8. `ANSWERS-TCJ-REPOSITORY-CONNECTED-REFERENCE-RUNTIME-AND-SESSION-CONTINUITY-PLAN-20260824.md` — durable repository-memory architecture.
9. `ANSWERS-TCJ-GPT-LIVE-AVAILABILITY-AND-DEPENDENCY-POLICY-20260824.md` — GPT-Live remains outside the critical path.
10. protected evidence / methodology docs where compatible.

Old writer/evaluator checkpoints are frozen failed/invalidated history unless explicitly promoted by a newer authority document.

## Current linguistic principle

```text
CONVERSATIONAL FOOTING FIRST
→ speech-event roles
→ omission license
→ language surface
```

TCJ should reconstruct the outer conversation frame before judging wording.

Current speech-event interpretation:

```text
outer speaker
outer addressee

if embedded/reported/proposed/imitated words exist:
  source/origin
  current author
  projected speaker
  projected addressee
  outer stance toward those words

then:
  relationship distance per local relation
  hierarchy / authority per local relation
  omission license
  outer voice resumption
  pronoun / particle / politeness ownership
  segment map
```

Important non-equivalences:

```text
author ≠ necessarily projected speaker
reported content ≠ necessarily projected voice shift
relationship distance ≠ institutional role ≠ hierarchy
politeness ≠ hierarchy
omitted scenario fact ≠ pragmatic omission license
```

This remains an interpretive linguistic model, not a finite-state ontology.

> **Do not let the state machine become the linguistic theory.**

## Complete TCJ requirement

A qualified TCJ must eventually demonstrate:

```text
understand
→ judge exact copy
→ diagnose the primary problem
→ rewrite better when necessary
→ recheck
→ release
```

Rewrite competence remains mandatory for qualification even if customer policy hides the proposed rewrite.

## Completed footing v1 human authority

```text
set id          1
set key         TCJ-FOOTING-NATIVE-HUMAN-ANALYSIS-2026Q3-v1
status          frozen
cases           8
human manifest  cf3075977ed229adfeb4e640e7fe44b5fc9e747100fbd43c6172f989f1772095
source manifest 060fc4ffcf3b4c53034b40cba65bc1a63ce98627157fe0ba0095cc399047d75e
```

Three Gemini 3.5 Flash-Lite mechanism runs are completed and immutable:

```text
v1  TCJ-FOOTING-BLIND-RECONSTRUCTION-2026Q3-v1
v2  TCJ-FOOTING-DISCOURSE-ANCHOR-ABLATION-2026Q3-v2
v3  TCJ-FOOTING-LOCAL-VOICE-IMPLICITNESS-ABLATION-2026Q3-v3
```

All were 8/8 valid, `gold_exposed_to_model = false`.

Research conclusion:

```text
v2/v3 improved outer-turn anchoring and some local relation reconstruction
but
source / author / projected-speaker distinctions remain unstable
and
pragmatic omission is still not reconstructed reliably
```

Same-case prompt tuning is **STOPPED AFTER v3** to avoid overfitting.

These runs are development mechanism evidence, not qualification scores.

## CURRENT — speech-event / omission native-human gate

Live private set:

```text
set id             2
set key            TCJ-FOOTING-SPEECH-EVENT-OMISSION-HUMAN-2026Q3-v2
status             reviewing
cases              6
Answers BFF        4
formal enterprise  2
prior footing exact hash overlap       0
prior qualification exact hash overlap 0
source manifest    ac6229a9d82abf696c2a602b5832a7375b17a8ddbc62e9b2c35faa77118d3c95
exposure           6 human_only / 0 model_exposed
```

Human review protocol:

```text
protocol id     2
protocol key    TCJ-FOOTING-SPEECH-EVENT-OMISSION-REVIEW-2026Q3-v2
status          reviewing
state           0 / 6 at checkpoint
human manifest  null
```

Review URL:

`https://flipgazine.pages.dev/tcj-footing-speech-event-review-v2.html`

Live assets:

```text
/tcj-footing-speech-event-review-v2.html
version 1
SHA-256 3dfb1fea12b3da842fb71ab99d5437e3d16a29d839db3d61087863005fcdcfef

/fg-page-tcj-footing-speech-event-review-v2.js
version 1
SHA-256 52475e696662f056d1ac1ba1706bbe4dc8fa2083708da3f5394be816fe3b1d5a
```

Review API:

```text
slug       tcj-rewrite-lift-hard-review-v2
version    9
verify_jwt true
SHA-256    d205c13b9e53b64bc0af445cad764a26302c1184b2c0079f41ac29a27b2461e4
```

API v9 is protocol-aware. The omitted protocol key defaults to frozen v1 for archival compatibility. The new controller explicitly selects v2. Only `reviewing` + `human_only` cases are writable.

### Human task

This is **not** SHIP / REVISE and not a rewriting task.

For each scenario + utterance, native human gives short natural interpretations of:

- outer speaker;
- outer addressee;
- speech-event roles: source/current author/projected speaker/projected addressee when applicable;
- stance toward embedded words;
- relationship distance per relevant segment;
- hierarchy/authority per relevant segment;
- omission license — what does not need explaining;
- where outer voice resumes;
- important marker ownership;
- segment map;
- optional ambiguity/discomfort.

The redundant Social Scene Summary field is removed from the UI. A neutral database placeholder is used only to preserve the existing storage schema.

### Freeze rule

Before any reconstruction model sees these six cases as a test bank:

1. human completes 6 / 6;
2. verify all case manifests still match;
3. compute deterministic human manifest over ordered case + all stored interpretation fields;
4. freeze set and protocol;
5. enforce DB immutability;
6. only then create a fresh reconstruction run;
7. do not tune after seeing that result and still describe it as independent evidence.

## Profile strategy

```text
formal bank / telecom / enterprise Thai
= lower conversational entropy, high commercial value

Answers BFF
= higher conversational entropy, hard stress test
```

Formal success can support a scoped formal profile only after the **complete understand → judge → diagnose → rewrite → recheck → release loop** is qualified. It never authorizes a universal Thai claim.

## Protected Qualification 2.0

Reverified from dedicated `tcj_q2_*` authority tables on 26 August 2026:

```text
protocol            TCJ-QUALIFICATION-2.0-2026Q3-v1
status              human_frozen
bank manifest       8e3d6c5fff4860f97bfbfcd8d69c46e5484da0d5c315ed6f4888d0061d09b7c8
human manifest      07a25c08b331c215bf6a7378665726c376045bcb9d547d3cd21eaca22b51428d
machine_exposed_at  null
machine run         stopped_incident / started_at null
```

Never expose Q2 to development models.

## Historical writer experiments

### Role-only BFF writer — CLOSED FAILED

```text
SHIP   0
REVISE 8
```

Persona pressure produced BFF caricature. Never reuse those cases for evaluator scoring.

### Session-replica writer v1 — INVALIDATED

Speaker/addressee ambiguity invalidated formal scoring. One human review is preserved; TCJ was never exposed.

### Session-replica writer v2 binary build — STOPPED BEFORE PROVIDER GENERATION

Superseded by footing-first / speech-event architecture.

## Paid frontier and GPT-Live

No paid OpenAI/xAI development call is authorized. Explicit user approval remains required immediately before any paid authority dispatch.

GPT-Live remains outside the critical path while its public API is unavailable.

## CURRENT next action

```text
native human reviews 6 fresh speech-event / omission cases ← CURRENT
→ say "done"
→ freeze/hash the new human manifest
→ run one fresh reconstruction test with the representation frozen in advance
→ analyze residual disagreement
→ only after footing + omission stabilize return to judge/rewrite qualification
```

> **Do not ship TCJ until it behaves like a genuinely useful native senior editor inside its declared qualification scope.**
