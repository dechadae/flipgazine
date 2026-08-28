# TCJ — Final Commercial Product Architecture v3

**Status:** GOVERNING COMMERCIAL PRODUCT ARCHITECTURE — supersedes v2 where conflicting  
**Date:** 24 August 2026  
**Project:** Flipgazine / The Book of Answers / Thai Conversation Judge (TCJ)  
**Production authority:** NONE until fresh qualification proves the complete system

## 1. Why v3 exists

TCJ v2 improved reproducibility and private-evidence discipline, but later native-human work exposed two structural problems:

1. conversational Thai was being modeled too rigidly through global style/task labels;
2. the commercial topology treated TCJ primarily as a diagnosis/release gate while delegating rewrite authority back to the buyer writer.

The current product direction is stricter.

> **TCJ must first understand the social scene inside the language.**

And:

> **A production judge that cannot produce a better rewrite has not demonstrated complete editorial competence.**

TCJ may remain in R&D for months if necessary. Shipping a half-complete evaluator is explicitly prohibited.

## 2. Governing runtime

```text
USER / BUYER APPLICATION
        ↓
BUYER WRITER or SOURCE TEXT
        ↓
TCJ GATEWAY
        ↓
VOICE / DOMAIN CONTEXT
        ↓
PINNED TCJ REPOSITORY MEMORY
        ↓
FOCUS + DISCOURSE REACHABILITY
        ↓
BOUNDED PRIVATE NATIVE-HUMAN EVIDENCE
        ↓
TCJ SEMANTIC EDITOR
  1. reconstruct conversational footing
  2. reconstruct stance / hierarchy / implication
  3. evaluate exact finished copy
        ↓
   SHIP / REVISE
        ↓
if REVISE:
  one primary problem
  one surgical instruction
  TCJ proposed rewrite
        ↓
optional buyer policy:
  show rewrite
  auto-apply rewrite
  send instruction to buyer writer
  compare buyer rewrite vs TCJ rewrite
        ↓
TCJ RECHECK
        ↓
FINAL OUTPUT
```

## 3. Repository-connected reference brain

The reference TCJ runtime uses a pinned repository snapshot or local Git checkout as durable conceptual memory.

The repository contains:

- current state and authority map;
- linguistic architecture;
- voice/domain knowledge;
- known failure history;
- private-evidence contract;
- commercial/runtime rules;
- test methodology;
- native-human discoveries.

Hosted deployments may use a safe mirrored repository view. Private-server deployments may mount a full pinned local checkout subject to protected-evidence and hidden-test exclusions.

The Methodology Pack remains a portable compiled fallback, not the reference brain.

## 4. Footing-first semantic editor

Before evaluating style, TCJ must understand the active conversational scene.

Core questions:

```text
Who am I right now?
Who am I talking to?
Whose words am I voicing?
Am I endorsing those words or proposing/reporting/imitating them?
How close are we?
What hierarchy is active locally?
What can remain implicit?
Where does my own stance resume?
Whose particle/pronoun/politeness marker is this?
```

The detailed authority is:

`ANSWERS-TCJ-CONVERSATIONAL-FOOTING-STANCE-AND-DISCOURSE-ARCHITECTURE-20260824.md`

Engineering task modes and labels may assist routing, but they do not replace this semantic interpretation.

## 5. Focus + discourse reachability

Private evidence retrieval expands from topic/focus routing toward social/discourse routing.

Possible retrieval coordinates:

```text
topic / focus
speaker role
addressee role
relationship distance
hierarchy direction
speech act
stance
quoted/reported/proposed speech
voiced speaker
quoted recipient
facework/accountability
channel
CARE state
code-switch environment
composition function
```

The private system may return bounded derived findings only. Raw rows, nearest complete examples, edit pairs, IDs and hidden qualification items remain sealed.

## 6. Complete judge contract

### SHIP

SHIP means a native senior editor would publish the exact copy unchanged.

```json
{
  "editorial_decision": "SHIP",
  "primary_problem": "",
  "instruction": "",
  "proposed_rewrite": null
}
```

TCJ must not rewrite a SHIP response merely because another version is possible.

### REVISE

```json
{
  "editorial_decision": "REVISE",
  "primary_problem": "one actual defect",
  "instruction": "one smallest useful instruction",
  "proposed_rewrite": "complete improved Thai response"
}
```

The rewrite is a required capability of the qualified TCJ runtime even if a customer chooses not to expose or apply it.

## 7. Why rewrite authority is mandatory

Evaluation alone can hide shallow pattern matching.

A system may learn that a response is too formal, too long, too assistant-like or pragmatically wrong without actually understanding how to repair it.

Rewrite provides a stronger test of understanding.

A valid TCJ rewrite must:

- preserve useful meaning;
- repair the diagnosed issue;
- preserve correct portions of the original;
- preserve local speaker/addressee/footing structure;
- use recipient-appropriate register;
- avoid unsupported additions;
- avoid helper/therapist scaffolding;
- preserve recoverable implication;
- remain naturally Thai;
- improve publishability under native-human review.

## 8. Separation of capability from customer policy

A customer may prefer TCJ to act only as a gate.

Supported policy surfaces may include:

```text
VERDICT_ONLY
VERDICT_PLUS_DIAGNOSIS
VERDICT_PLUS_INSTRUCTION
VERDICT_PLUS_REWRITE
AUTO_REWRITE_AND_RECHECK
```

But these are customer-facing policies.

They do not reduce the qualification requirement: the underlying TCJ runtime must still possess rewrite competence.

## 9. Writer and judge roles

The buyer writer and TCJ are no longer defined as mutually exclusive writing authorities.

The buyer writer may create the initial draft.

TCJ must independently be able to:

```text
understand
judge
diagnose
rewrite
recheck
```

This allows several commercial workflows:

```text
buyer writer → TCJ rewrite
buyer writer → TCJ instruction → buyer writer revision → TCJ recheck
human writer → TCJ rewrite suggestion
TCJ direct generation → TCJ self-check under separated calls/configuration
```

Qualification must guard against self-confirming behavior when the same model family performs multiple roles.

## 10. Voice is relational, not only profile-level

Voice Profile remains useful, especially for customers.

But Voice Profile must not be interpreted as a global style skin.

The active realization depends on:

```text
voice profile
+ current speaker
+ current addressee
+ local relationship
+ hierarchy
+ speech act
+ stance
+ voiced/quoted speaker
+ channel
```

One response may contain several locally correct registers while remaining coherent under one outer product voice.

## 11. Native-human qualification must test the full system

Final qualification must separately establish:

### Evaluation quality

Can TCJ correctly distinguish exact-copy SHIP vs meaningful REVISE?

### False-SHIP control

Does TCJ avoid publishing copy a native senior editor would still change?

### Diagnosis validity

Does the stated primary problem correspond to the real reason for revision?

### Rewrite lift

When TCJ proposes a rewrite, is it actually better than the original under blind native-human review?

### Meaning preservation

Does the rewrite preserve useful intent and avoid unsupported information?

### Footing preservation

Does the rewrite keep speaker/addressee/stance/register relationships correct across local shifts?

### Regression control

Does TCJ avoid damaging already-good segments while fixing one local defect?

### Evidence value

Does protected native-human evidence add measurable value without leaking proprietary material?

### Reproducibility

Can the exact qualified configuration be pinned and audited?

Production authority remains NONE until all required gates pass.

## 12. Rewrite benchmark design

Rewrite capability should not be inferred from evaluator accuracy.

Use fresh native-human experiments where:

1. source drafts are frozen;
2. TCJ diagnosis is frozen;
3. TCJ proposed rewrite is generated;
4. human reviewers see the original and rewrite under a blinded ordering where practical;
5. reviewers judge publishability, preference, semantic preservation and whether the diagnosed issue was actually fixed;
6. the human manifest is frozen before aggregate interpretation.

Do not tune reviewed items and then reuse them as authority evidence.

## 13. Research horizon

TCJ has no artificial deadline to ship.

The project may remain in R&D for months while conversational behavior is refined.

The release criterion is not elapsed time or feature completeness.

It is:

> **Does this behave like a genuinely useful native senior editor?**

If not, continue research.

## 14. Native-human discovery loop

```text
native-human example/correction
→ linguistic hypothesis
→ canonical documentation
→ small fresh experiment
→ frozen inputs
→ model run
→ blind native-human review
→ frozen manifest
→ interpretation
→ architecture update only if evidence supports it
```

This loop is a first-class product-development mechanism, not temporary cleanup.

## 15. What must not happen

Do not ship TCJ because:

- the API is finished;
- the corpus is valuable;
- the judge sounds sophisticated;
- the evaluator beats one baseline;
- the UI looks commercial;
- a customer is interested;
- paid credits are available;
- a deadline exists.

Do not weaken a frozen test because TCJ fails it.

Do not use hidden Qualification 2.0 as development material.

Do not claim rewrite authority from diagnosis-only evidence.

Do not turn linguistic discoveries into rigid enums merely because enums are easier to implement.

## 16. Private-server customer architecture

A private-server deployment may contain:

```text
TCJ core Git checkout
customer voice/domain repository
customer private evidence vault
focus + discourse reachability
customer-selected judge model
customer-selected writer model
TCJ rewrite capability
TCJ release policy
```

Customer human corrections can improve the local system through two paths:

```text
durable conceptual lesson → customer repository knowledge
empirical example/outcome → customer private evidence
```

Neither path requires exposing customer data to other tenants.

## 17. Versioning

A production candidate must freeze at least:

```text
repository commit
linguistic architecture SHA
Voice Profile/customer profile version
focus/discourse reachability implementation
private-evidence contract
judge model/version/settings
rewrite model/version/settings if separate
judge prompt/configuration
rewrite prompt/configuration
output schema
release policy
qualification bank manifest
human manifest
```

A material change creates a successor runtime and requires appropriate fresh qualification.

## 18. Governing product statement

```text
TCJ is not a Thai style checker.
TCJ is not a prompt pack.
TCJ is not a diagnosis-only classifier.

TCJ is intended to become a native-language senior editorial system that:
understands the social scene,
judges exact-copy publishability,
explains the primary defect,
can rewrite the copy better,
and proves those abilities against frozen native-human authority.
```

Until that standard is met, TCJ remains development-only.
