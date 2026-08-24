# TCJ Footing-First / Rewrite-Capable Architecture Reset

**Date:** 24 August 2026  
**Status:** CURRENT DEVELOPMENT CHECKPOINT  
**Production authority:** NONE

## 1. Why development changed direction

A native-human clarification exposed that TCJ was becoming too rigid in how it represented Thai conversation.

The important linguistic questions are not merely:

```text
what topic?
what task mode?
what global voice?
what register label?
```

They are:

```text
Who am I right now?
Who am I talking to?
Whose words am I voicing?
Am I endorsing those words or merely proposing/reporting/imitating them?
How close are we?
What hierarchy exists at this moment?
How much can remain implicit?
Where does my own stance resume?
Does a particle/pronoun/politeness marker belong to me or to the temporarily voiced speaker?
```

This changes TCJ from a text-classification-style architecture toward a discourse/footing-first native-editor architecture.

## 2. Governing linguistic authority

Current authority:

`ANSWERS-TCJ-CONVERSATIONAL-FOOTING-STANCE-AND-DISCOURSE-ARCHITECTURE-20260824.md`

Core rule:

> **Conversational footing first. Language surface second.**

Engineering enums remain allowed for routing/logging, but they are not the linguistic theory.

## 3. Rewrite-capability requirement

The project owner clarified a second non-negotiable requirement:

> **A judge without the ability to rewrite better should not be considered a complete judge.**

TCJ therefore must qualify the complete loop:

```text
understand
→ judge
→ diagnose
→ rewrite better
→ recheck
→ release
```

A customer may choose a verdict-only product surface, but the underlying qualified TCJ runtime must still possess demonstrated rewrite competence.

Commercial architecture authority:

`ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-V3-FOOTING-FIRST-REWRITE-CAPABLE-20260824.md`

## 4. No artificial release deadline

TCJ may remain in R&D for months.

Do not ship merely because the system is commercially interesting, technically complete, or partially useful.

The release question is:

> **Does TCJ behave like a genuinely useful native senior editor inside its declared qualification scope?**

If not, continue research.

## 5. Formal enterprise Thai vs Answers BFF

A further native-human observation is now a governing research hypothesis:

> **Formal bank/telecom Thai is likely easier to constrain and qualify than casual Answers BFF Thai.**

Formal enterprise contexts often reduce conversational entropy through clearer roles, hierarchy, terminology, speech acts and politeness expectations.

Answers BFF remains a harder stress test because it requires flexible handling of:

- footing shifts;
- intimacy;
- implication/omission;
- particles;
- irony;
- humor;
- code-switching;
- social timing;
- quoted speech with local hierarchy;
- assistantese avoidance;
- stopping at the right moment.

Authority:

`ANSWERS-TCJ-REGISTER-DIFFICULTY-AND-BFF-STRESS-TEST-20260824.md`

A bank/telecom profile may eventually qualify earlier, but only if the complete TCJ loop is proven within that profile. Success there does not authorize universal claims about casual Thai or BFF competence.

## 6. Status of previous writer experiments

### Role-only writer v1

Frozen failed evidence:

```text
human SHIP   0
human REVISE 8
```

Do not reuse or retune those cases.

### Session-replica writer v1

Invalidated for task-design ambiguity after one preserved human review.

Do not score it.

### Session-replica writer v2 binary task-mode build

Stopped before provider generation because the new footing-first theory supersedes the assumption that two rigid task modes are the primary linguistic representation.

The unpopulated hosted snapshot created for that build was retired:

```text
snapshot id   4
status        retired
file_count    0
manifest      null
```

No provider generation from that replacement bank is authority evidence.

The `DIRECT_BFF_RESPONSE` / `BFF_WITH_QUOTED_SCRIPT` distinction may remain useful engineering metadata, but it must sit underneath the richer footing model.

## 7. Next research architecture

The next experimental system should separate three layers:

### A. Linguistic interpretation

A capable model reconstructs the local social scene and footing transitions.

### B. Memory addressing

Focus/reachability expands toward **discourse reachability** using relevant social coordinates such as:

```text
speaker
addressee
relationship
hierarchy
speech act
stance
quoted/reported/proposed speech
voiced speaker
quoted addressee
channel
CARE state
```

### C. Editorial action

TCJ must be able to:

```text
SHIP exact copy
or
REVISE + primary problem + surgical instruction + proposed rewrite
```

## 8. Experimental design from here

Do not immediately generate another six-case writer bank.

First build the conceptual/discourse instrumentation and test whether it can correctly represent native-human examples.

Preferred sequence:

1. collect a small set of native-human conversational examples that contain meaningful footing/stance variation;
2. annotate them qualitatively with the nine core questions;
3. test whether a fresh repo-connected model reconstructs the same social scene;
4. refine the linguistic model where native-human interpretation disagrees;
5. only then create fresh writing/evaluation/rewrite experiments;
6. keep all new authority banks separate from previously exposed development examples.

## 9. Research tracks

Maintain two complementary tracks:

```text
Track A — formal enterprise Thai
  bank / telecom / workplace / customer-service
  lower variance, high commercial value

Track B — Answers BFF
  high-variance conversational stress test
  footing / stance / omission / humor / intimacy
```

TCJ Core learns from both.

## 10. Governing product statement

```text
TCJ is not a style checker.
TCJ is not a binary task router.
TCJ is not a diagnosis-only judge.

TCJ is being built toward a native senior-editor system that:
understands who is speaking to whom,
tracks local changes in footing and stance,
knows what can remain implicit,
judges exact-copy publishability,
explains the actual problem,
rewrites the copy better when necessary,
and proves those abilities against frozen native-human evidence.
```

Until that standard is met, production authority remains NONE.
