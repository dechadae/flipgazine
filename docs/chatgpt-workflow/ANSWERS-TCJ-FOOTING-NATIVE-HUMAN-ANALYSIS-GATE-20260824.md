# TCJ Footing-First Native-Human Analysis Gate

**Date:** 24 August 2026  
**Status:** CURRENT EXECUTION CHECKPOINT  
**Project:** TCJ / Thai Conversation Judge  
**Production authority:** NONE — development only

## 1. Purpose

The next TCJ step is no longer another writer prompt or evaluator bank.

The current goal is to establish a small native-human authority set for **conversational footing, stance and local discourse structure** before any model is asked to reconstruct or judge those social scenes.

Governing order:

```text
native-human social interpretation
→ freeze/hash
→ only then expose cases to a fresh publicly deployable model
→ compare model reconstruction against human authority
→ refine discourse reachability / rewrite semantics
→ only later return to writer/judge/rewrite qualification
```

GPT-Live is not part of this gate or production dependency.

## 2. Live Supabase set

Canonical project:

`sjpvhgxacsiorrtijqua`

Private set:

```text
set id       1
set key      TCJ-FOOTING-NATIVE-HUMAN-ANALYSIS-2026Q3-v1
status       reviewing
cases        8
tracks       5 Answers BFF / 3 formal enterprise
prior exact scenario/text hash overlap  0
source manifest  060fc4ffcf3b4c53034b40cba65bc1a63ce98627157fe0ba0095cc399047d75e
```

This is a **development linguistic R&D set**, not a Qualification or Assurance bank.

Each case remains `exposure_state = human_only` until the complete native-human interpretation manifest is frozen.

## 3. Case coverage

The eight constructed development cases cover:

- proposed speech to a higher-status recipient and return to BFF footing;
- reported speech without full endorsement;
- mock-formal quoted voice between close friends;
- implicit social judgment / omission;
- Dek-Inter-style Thai-English code-switching inside proposed speech;
- bank agent → customer service footing;
- supervisor → junior with embedded customer-facing wording;
- telecom supervisor internal instruction with controlled vendor reference.

These phenomenon labels are engineering provenance only and are **not shown in the human review UI**.

## 4. Human annotation contract

Native-human reviewer receives only:

- scenario;
- Thai utterance to analyze.

The reviewer is not asked to SHIP/REVISE or repair the wording.

The reviewer provides open-text interpretation for:

1. Who am I right now?
2. Who am I talking to?
3. Whose words am I voicing?
4. Am I endorsing, proposing, reporting, imitating or imagining those words?
5. How close are we?
6. What hierarchy is active locally?
7. How much can remain implicit?
8. Where does my own stance resume after any shift?
9. Whose particle/pronoun/politeness marker is active?

Plus:

- social-scene summary;
- free-form segment map;
- optional ambiguity/discomfort note.

These are open-text prompts rather than enums so engineering instrumentation does not become the linguistic theory.

## 5. Human review protocol

```text
protocol id     1
protocol key    TCJ-FOOTING-NATIVE-HUMAN-REVIEW-2026Q3-v1
status          reviewing
reviewed        0 / 8 at checkpoint
human manifest  null until 8 / 8 and frozen
```

Review URL:

`https://flipgazine.pages.dev/tcj-footing-analysis-review-v1.html`

The page is admin-authenticated through the existing Flipgazine session.

### Live assets

```text
page
/tcj-footing-analysis-review-v1.html
version 1
SHA-256 bb0ea9fbacc52e1f16d9861b9f897a6d151e418981a47a9cf41a3bc5e2b1d156

controller
/fg-page-tcj-footing-analysis-review-v1.js
version 1
SHA-256 31ef9e48164a1641eb4b5f01ffdf25554461ea2eed6bfca0036d9bc438ed7171
```

### Review API

No new Edge Function slot could be created because the project is at its function-slot limit.

The already historical human-review slot was reused while preserving its prior versions:

```text
slug      tcj-rewrite-lift-hard-review-v2
version   8
status    ACTIVE
verify_jwt true
SHA-256   3ac59c4dcf1212905190bf54f89bad4cd55affc8de948cdc7bba0ddcd5225ca9
```

Version 8 is dedicated to this footing-human-review protocol.

## 6. Isolation rule

Until the native-human manifest is frozen:

- do not dispatch these eight cases to any evaluator/writer/rewrite model;
- do not generate model interpretations for these cases;
- do not use protected Qualification 2.0;
- do not alter a frozen source case to make interpretation easier;
- if a case is genuinely ambiguous, record that ambiguity as human evidence rather than repairing it after review begins.

After 8 / 8:

1. verify all case-manifest hashes still match;
2. compute a deterministic human manifest over ordered case key + case manifest + all human interpretation fields;
3. freeze protocol + set + timestamp before reading aggregate/model-comparison implications;
4. only then create a separate model-facing reconstruction runner.

## 7. Protected Qualification 2.0

Reverified immediately before this gate:

```text
protocol            TCJ-QUALIFICATION-2.0-2026Q3-v1
status              human_frozen
bank manifest       8e3d6c5fff4860f97bfbfcd8d69c46e5484da0d5c315ed6f4888d0061d09b7c8
human manifest      07a25c08b331c215bf6a7378665726c376045bcb9d547d3cd21eaca22b51428d
machine_exposed_at  null
```

Q2 remains development-sealed.

## 8. Paid resources

No paid OpenAI/xAI call is authorized or required for this human gate.

Any later paid authority test still requires explicit user approval immediately before dispatch.

## 9. Immediate next action

```text
NATIVE HUMAN GATE ← CURRENT
review 8 footing cases
→ say “done”
→ freeze/hash human interpretation manifest
→ only then build fresh publicly-deployable model reconstruction test
```

Do not resume the old binary writer v2 build.

Do not return to writer/judge/rewrite qualification until the footing representation has survived native-human → model reconstruction testing.
