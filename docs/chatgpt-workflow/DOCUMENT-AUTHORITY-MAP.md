# ChatGPT Workflow — Document Authority Map

**Checkpoint:** 24 August 2026, 20:37 Asia/Bangkok  
**Purpose:** prevent superseded prompt architectures, unavailable-model dependencies, invalidated writer evidence and diagnosis-only product assumptions from being mistaken for current TCJ authority.

## Read these first

1. `CURRENT-STATE.json` — canonical machine-readable state.
2. `ANSWERS-TCJ-FOOTING-NATIVE-HUMAN-ANALYSIS-GATE-20260824.md` — **CURRENT execution checkpoint and human gate.**
3. `ANSWERS-TCJ-CONVERSATIONAL-FOOTING-STANCE-AND-DISCOURSE-ARCHITECTURE-20260824.md` — **governing linguistic architecture.**
4. `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-V3-FOOTING-FIRST-REWRITE-CAPABLE-20260824.md` — **governing commercial architecture.**
5. `ANSWERS-TCJ-REGISTER-DIFFICULTY-AND-BFF-STRESS-TEST-20260824.md` — **governing profile-difficulty / qualification strategy.**
6. `ANSWERS-TCJ-GPT-LIVE-AVAILABILITY-AND-DEPENDENCY-POLICY-20260824.md` — GPT-Live is optional R&D reference only, not a production dependency.
7. `ANSWERS-TCJ-BFF-SPEAKER-AND-QUOTED-SPEECH-CONTRACT-20260824.md` — useful speaker/quoted-speech authority; binary task modes are instrumentation under the richer footing model.
8. `ANSWERS-TCJ-REPOSITORY-CONNECTED-REFERENCE-RUNTIME-AND-SESSION-CONTINUITY-PLAN-20260824.md` — durable repository-memory architecture.
9. protected-evidence / methodology docs where compatible.
10. old writer/evaluator checkpoints only as frozen failed or invalidated history.

## Current linguistic principle

```text
CONVERSATIONAL FOOTING FIRST
→ language surface second
```

Before judging or rewriting, TCJ should understand:

```text
Who am I right now?
Who am I talking to?
Whose words am I voicing?
Am I endorsing those words or merely proposing/reporting/imitating them?
How close are we?
What hierarchy is active locally?
How much can remain implicit?
Where does my own stance resume?
Whose particle/pronoun/politeness marker is this?
```

Task modes, focus tags, register labels and enums are implementation instrumentation only.

> **Do not let the state machine become the linguistic theory.**

## Complete TCJ requirement

A qualified TCJ must be able to:

```text
understand
→ judge exact copy
→ diagnose the primary problem
→ rewrite better when necessary
→ recheck
→ release
```

Customer policy may hide or ignore the proposed rewrite, but rewrite competence is mandatory for qualification.

## CURRENT — native-human footing analysis gate

Live private set:

```text
set id       1
set key      TCJ-FOOTING-NATIVE-HUMAN-ANALYSIS-2026Q3-v1
status       reviewing
cases        8
BFF          5
formal enterprise  3
prior exact hash overlap  0
source manifest  060fc4ffcf3b4c53034b40cba65bc1a63ce98627157fe0ba0095cc399047d75e
exposure state   human_only
```

This is development linguistic R&D, not Qualification/Assurance.

Human review protocol:

```text
protocol id    1
protocol key   TCJ-FOOTING-NATIVE-HUMAN-REVIEW-2026Q3-v1
status         reviewing
state          0 / 8 at checkpoint
human manifest null
```

Review URL:

`https://flipgazine.pages.dev/tcj-footing-analysis-review-v1.html`

Review page:

```text
/tcj-footing-analysis-review-v1.html
v1
SHA-256 bb0ea9fbacc52e1f16d9861b9f897a6d151e418981a47a9cf41a3bc5e2b1d156
```

Controller:

```text
/fg-page-tcj-footing-analysis-review-v1.js
v1
SHA-256 31ef9e48164a1641eb4b5f01ffdf25554461ea2eed6bfca0036d9bc438ed7171
```

Review API reuses the closed historical human-review Edge Function slot because the Supabase project has reached its function-slot limit:

```text
slug      tcj-rewrite-lift-hard-review-v2
version   8
verify_jwt true
SHA-256   3ac59c4dcf1212905190bf54f89bad4cd55affc8de948cdc7bba0ddcd5225ca9
```

Prior versions remain preserved.

### Human task

This is **not** SHIP / REVISE.

For each scenario + Thai utterance, native human writes:

- social-scene summary;
- answers to the nine footing questions in open text;
- free-form segment map;
- optional ambiguity/discomfort note.

Do not force every example into a footing shift. If no shift exists, say so. If the case is genuinely ambiguous, record the ambiguity instead of repairing the source after review begins.

### Freeze rule

Before any model gets a reconstruction task on these eight cases:

1. human completes 8 / 8;
2. verify all source case manifests still match;
3. hash ordered case key + case manifest + every human interpretation field;
4. freeze set and protocol;
5. only then expose the source cases to a fresh publicly deployable model candidate;
6. compare the model's social-scene reconstruction against frozen human authority.

No model worker receives the human interpretations before freeze.

## Profile strategy

```text
formal bank / telecom / enterprise Thai
= lower conversational entropy, high commercial value

Answers BFF
= higher conversational entropy, hard stress test
```

Formal profiles may eventually qualify earlier only if the complete TCJ loop is proven inside the declared profile. Passing formal Thai never authorizes a claim that BFF/casual Thai or Thai conversation generally has been solved.

## GPT-Live policy

GPT-Live is outside the critical path while its public API is unavailable.

Do not architect production TCJ around it. If it later becomes public and proves strong on Thai judging + rewriting, test whether TCJ adds measurable control/lift and simplify the architecture if it does not.

## Historical experiment status

### Role-only writer v1 — CLOSED FAILED

```text
SHIP   0
REVISE 8
```

Persona pressure produced performed BFF caricature. Never retune/reuse those cases for evaluator scoring.

### Session-replica writer v1 — INVALIDATED

Speaker/addressee ambiguity invalidated formal scoring. One human review is preserved; TCJ was never exposed.

### Session-replica writer v2 binary build — STOPPED BEFORE PROVIDER GENERATION

The replacement build was stopped when the footing-first linguistic architecture superseded its two-mode ontology. Empty snapshot id 4 is retired.

## Protected Qualification 2.0

Reverified before the current gate:

```text
protocol            TCJ-QUALIFICATION-2.0-2026Q3-v1
status              human_frozen
bank manifest       8e3d6c5fff4860f97bfbfcd8d69c46e5484da0d5c315ed6f4888d0061d09b7c8
human manifest      07a25c08b331c215bf6a7378665726c376045bcb9d547d3cd21eaca22b51428d
machine_exposed_at  null
```

Never expose Q2 to development models.

## Paid frontier resources

No paid OpenAI/xAI development call is authorized. Any later paid authority experiment requires explicit user approval immediately before dispatch.

## CURRENT next action

```text
native human reviews 8 footing cases ← CURRENT
→ say “done”
→ freeze/hash human footing manifest
→ create fresh model reconstruction test using a publicly deployable candidate
→ analyze disagreements
→ refine discourse reachability / rewrite semantics
→ only after footing stabilizes, return to writer/judge/rewrite qualification
```

The project may repeat this loop for months.

> **Do not ship TCJ until it behaves like a genuinely useful native senior editor inside its declared qualification scope.**
