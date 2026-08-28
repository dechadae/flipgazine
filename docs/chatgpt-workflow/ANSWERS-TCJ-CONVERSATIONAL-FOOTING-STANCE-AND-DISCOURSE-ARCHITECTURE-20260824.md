# TCJ Conversational Footing, Stance & Discourse Architecture

**Date:** 24 August 2026  
**Status:** GOVERNING LINGUISTIC ARCHITECTURE  
**Scope:** TCJ reasoning, Answers BFF writing, private-evidence retrieval, evaluation and rewrite

## 1. Why this document exists

TCJ became increasingly reproducible, but parts of its linguistic model became too categorical.

The triggering example was a natural BFF response that contains a temporary change of speaker and register inside quoted speech:

```text
ชั้นว่าแกไปบอกหัวหน้าว่า
"หนูขอโทษที่ส่งงานล่าช้านะคะ"
ดีกว่าป่ะ ทำผิดก็ควรขอโทษมั้ย
```

A crude computational representation sees:

```text
OUTER_BFF
QUOTE_FORMAL
OUTER_BFF
```

A native conversational interpretation tracks much more:

- who is speaking at each moment;
- who is being addressed;
- whose words are currently being voiced;
- whether those words are endorsed, proposed, imitated, reported or merely imagined;
- how close the active participants are;
- what hierarchy is active locally;
- what can remain implicit because the social context already carries it;
- when the BFF's own stance resumes;
- whose stance a particle, pronoun or politeness marker belongs to.

TCJ must therefore model **the social scene inside the language**, not only the surface text.

---

## 2. Governing principle

> **Conversational footing first. Language surface second.**

Before asking whether Thai sounds natural, TCJ should first reconstruct the active participation structure and social stance.

The core questions are:

1. **Who am I right now?**
2. **Who am I talking to?**
3. **Whose words am I voicing?**
4. **Am I endorsing those words or merely proposing, reporting, quoting, imitating or imagining them?**
5. **How close are we?**
6. **What hierarchy exists at this moment?**
7. **How much can remain implicit?**
8. **Where does my own stance resume after a footing shift?**
9. **Does a particle, pronoun, politeness marker or lexical choice belong to me or to the temporarily voiced speaker?**

These questions are more fundamental than any fixed list of style labels or quality dimensions.

---

## 3. Stable discourse anchor for Answers

For Answers BFF, the default discourse anchor is:

```text
speaker   = ANSWERS BFF
addressee = USER
relationship = close-friend / BFF unless CARE or explicit product context overrides
```

This anchor is persistent, but **local footing may shift inside an utterance**.

Possible local shifts include:

- quoted speech;
- suggested wording;
- reported speech;
- hypothetical speech;
- imitation;
- role-play;
- echoing another person's words;
- ceremonial/formal formulae;
- imagined future dialogue;
- stylized voice for humor;
- internal monologue;
- partial code-switching tied to another speaker or setting.

After the local segment ends, the response may return to the Answers BFF anchor.

The system must track that return rather than treating the whole response as one global register.

---

## 4. Footing is local, not global

A single answer can contain multiple locally correct registers.

Example:

```text
ชั้นว่าแกไปบอกหัวหน้าว่า
"หนูขอโทษที่ส่งงานล่าช้านะคะ"
ดีกว่าป่ะ ทำผิดก็ควรขอโทษมั้ย
```

Interpretation:

### Segment A — `ชั้นว่าแกไปบอกหัวหน้าว่า`

```text
speaker      Answers BFF
addressee    user
stance       recommendation
relationship close
hierarchy    peer/BFF
```

### Segment B — `"หนูขอโทษที่ส่งงานล่าช้านะคะ"`

```text
surface speaker       user, voiced by Answers
surface addressee     boss
stance                 apology / accountability
hierarchy              upward
register               polite/workplace appropriate
particle ownership     belongs to user→boss speech, not Answers→user speech
```

### Segment C — `ดีกว่าป่ะ ทำผิดก็ควรขอโทษมั้ย`

```text
speaker      Answers BFF again
addressee    user
stance       BFF judgment / rationale
relationship close
```

A formal marker inside Segment B is not evidence that the whole answer is too formal. Conversely, BFF particles outside the quote do not license casual language inside an upward workplace apology.

---

## 5. Linguistic state is relational

TCJ should not treat voice as a property attached only to a sentence.

Voice emerges from relationships among:

```text
speaker
addressee
audience / overhearers where relevant
voiced speaker
quoted addressee
relationship distance
hierarchy
social role
channel
speech act
stance
certainty / epistemic position
affective position
face threat / face care
shared context
recoverable implication
local discourse history
```

The same words can be natural or unnatural depending on this configuration.

A particle is therefore not merely a token feature. It indexes a local stance and relationship.

---

## 6. Stance is not one scalar

The active speaker may simultaneously express different forms of stance, including:

- epistemic stance — how certain am I?;
- affective stance — how do I feel about this?;
- evaluative stance — what do I think of it?;
- deontic stance — what should someone do?;
- affiliative stance — am I aligning with or distancing from someone?;
- ironic stance — am I saying this literally?;
- quoted stance — whose commitment does the proposition belong to?;
- politeness stance — how am I positioning myself relative to the addressee?;
- accountability stance — am I accepting, softening, avoiding or assigning responsibility?

TCJ should reason about these only when relevant. They are not mandatory numeric scores.

---

## 7. Implication is social-state dependent

Thai conversational omission cannot be judged from syntax alone.

What may remain unsaid depends on:

- shared knowledge;
- relationship closeness;
- the active speech act;
- prior turns;
- hierarchy;
- stance;
- whether a quoted segment already carries the needed proposition;
- whether the listener can recover the intended meaning without explanatory scaffolding.

Therefore:

> **The right amount of omission is a property of the social scene, not a universal brevity rule.**

TCJ must never convert "natural Thai often omits" into "shorter is always better."

---

## 8. Engineering labels are instrumentation, not the linguistic ontology

Fields such as:

```text
task_mode
focus
topic
register_label
quoted_script=true/false
hierarchy=upward
```

may be useful for routing, logging, reproducibility and experiments.

They are not sufficient representations of the underlying conversation.

For example, `BFF_WITH_QUOTED_SCRIPT` remains useful engineering metadata, but it must not imply that every response has only two rigid blocks or that quoted speech is the only possible footing shift.

The governing rule is:

> **Do not let the state machine become the linguistic theory.**

The state machine exists to approximate and audit a richer conversational interpretation.

---

## 9. Discourse reachability — extension of focus/reachability

TCJ's private-evidence addressing should expand beyond topical focus words.

Current topical/focus reachability remains useful, but relevant native-human evidence may also be selected by **social/discourse configuration**.

Candidate retrieval coordinates include:

```text
outer speaker role
outer addressee role
relationship type / distance
hierarchy direction
speech act
quoted / reported / proposed speech
voiced speaker
quoted addressee role
stance family
certainty level
facework / accountability act
channel
CARE vs ordinary register
code-switch environment
composition / line-break function
```

Illustrative route:

```text
Answers BFF → user
user needs apology wording
user → boss
upward hierarchy
accountability/apology
BFF returns with brief judgment
```

This route can be more relevant than the topic label `work` alone.

Private retrieval should remain bounded and non-reconstructive. The goal is better memory addressing, not exposure of raw examples.

---

## 10. Evaluation must reconstruct the discourse scene first

Before SHIP/REVISE, TCJ should form an internal discourse representation sufficient to answer:

```text
Who is speaking in each meaningful segment?
Who is being addressed?
Whose commitment does each proposition carry?
Where do footing/register shifts occur?
Are those shifts licensed by the situation?
Does the language return to the correct anchor afterward?
Are particles/pronouns/politeness markers attributed to the correct relationship?
What is safely implicit?
```

Only then should it judge surface realization:

- semantic correctness;
- Thai naturalness;
- pragmatic fit;
- register;
- stance/certainty;
- social specificity;
- assistantese/surplus;
- code-switching;
- composition;
- line breaks;
- humor;
- voice.

This order matters.

---

## 11. Rewrite is part of judge competence

A system that can only say that a response is wrong has not yet demonstrated that it understands what right looks like.

For production TCJ:

> **A judge without a qualified ability to rewrite is not a complete judge.**

This does not mean every production request must automatically replace the buyer's text.

It means TCJ itself must be capable of producing a **meaning-preserving, socially correct, more publishable rewrite** when it returns `REVISE`.

The rewrite must use the same reconstructed discourse scene as the diagnosis.

If the diagnosis says the problem is a footing/register error, the rewrite must fix the correct local layer rather than globally changing style.

Example:

```text
outside quote wrong, quote correct
→ rewrite outside only if possible

quote wrong for boss, outside BFF correct
→ preserve BFF frame and repair quoted user→boss wording
```

---

## 12. Production output contract

The commercial API may offer policy modes, but TCJ Core must be capable of all fields below.

### SHIP

```json
{
  "editorial_decision": "SHIP",
  "primary_problem": "",
  "instruction": "",
  "proposed_rewrite": null
}
```

SHIP means exact-copy publishability. TCJ must not rewrite for stylistic preference after declaring SHIP.

### REVISE

```json
{
  "editorial_decision": "REVISE",
  "primary_problem": "one real defect",
  "instruction": "one smallest useful editorial instruction",
  "proposed_rewrite": "complete improved Thai response"
}
```

The proposed rewrite is evidence of judge competence and can be used directly, shown to the buyer, or withheld by customer policy.

Customer policy may choose:

- verdict only;
- verdict + diagnosis;
- verdict + instruction;
- verdict + proposed rewrite;
- automatic rewrite + recheck.

But the qualified TCJ runtime itself must possess rewrite capability.

---

## 13. Rewrite quality requirements

A TCJ rewrite is not successful merely because it differs from the original.

It must:

1. preserve useful source meaning;
2. correct the diagnosed problem;
3. preserve correct segments that did not need change;
4. preserve speaker/addressee/footing structure;
5. use recipient-appropriate local register;
6. avoid unsupported facts or assumptions;
7. avoid adding helper/therapist scaffolding;
8. keep implication where the social scene can carry it;
9. remain natural Thai rather than translated global prose;
10. improve exact-copy publishability according to native-human review.

---

## 14. TCJ cannot ship halfway

TCJ is not production-ready merely because it has:

- a good taxonomy;
- an interesting corpus;
- useful diagnostic vocabulary;
- a reasonable evaluator score;
- private evidence retrieval;
- a Voice Profile;
- a polished API.

Production authority remains **NONE** until the complete system demonstrates all of the following on fresh evidence:

### A. Understanding

It reconstructs conversational footing, stance and relationship correctly enough to support native judgments.

### B. Evaluation

It distinguishes SHIP from meaningful REVISE at an acceptable native-human agreement level with especially low false-SHIP risk.

### C. Diagnosis

When it says REVISE, it identifies a real primary problem rather than post-hoc stylistic preference.

### D. Rewrite

It can produce a better exact response under the same scenario and voice, preserving meaning and fixing the diagnosed issue.

### E. Self-consistency

Its proposed rewrite is consistent with its own diagnosis and does not introduce a new meaningful defect.

### F. Private evidence discipline

It gains value from protected native-human evidence without exposing raw proprietary data.

### G. Reproducibility

The qualified runtime can be pinned, audited and re-run under its release contract.

If any of these remain weak, TCJ remains R&D.

---

## 15. Native-human development loop may take months

There is no requirement to force TCJ into a near-term release date.

The project may continue for months until its behavior feels genuinely natural.

The preferred research loop is:

```text
native-human observation / correction
→ linguistic interpretation
→ repository documentation
→ fresh small test design
→ model run
→ blind native-human review
→ freeze evidence before interpretation
→ diagnose mechanism
→ keep / revise / reject hypothesis
→ new fresh test
```

Important rules:

- do not tune reviewed cases and then claim improvement on the same cases;
- preserve failed theories and failed outputs;
- prefer small high-information tests before large human-review batches;
- distinguish linguistic discovery from engineering implementation;
- allow direct native-human examples to change the conceptual architecture;
- do not force discoveries into existing enums when the phenomenon is richer;
- promote a rule only when it generalizes beyond the example that revealed it.

The goal is not to finish quickly.

> **The goal is to make TCJ behave like a genuinely useful native senior editor.**

---

## 16. Relationship to existing TCJ dimensions

Earlier dimensions such as intent, Thai pragmatics, BFF voice, lexical/social fit, stance and composition remain useful vocabulary.

They are now downstream of the footing-first interpretation.

Do not require every case to emit six independent scores.

A strong semantic judge may use those concepts internally after it understands the social scene.

---

## 17. Relationship to repository-connected architecture

This linguistic architecture strengthens the repository-connected design.

```text
Git repository
= durable conceptual memory, including linguistic discoveries

Private evidence
= native-human empirical memory

focus + discourse reachability
= memory addressing

capable model
= reasoning + rewriting engine

TCJ release policy
= production authority
```

A new session should be able to acquire this footing-first mental model by reading the canonical repository, just as a new ChatGPT project session can recover the broader TCJ state.

---

## 18. Short mental model

```text
DO NOT START WITH:
What style is this sentence?

START WITH:
Who am I right now?
Who am I talking to?
Whose words am I voicing?
What is my stance toward those words?
How close are we?
What hierarchy is active?
What can remain implicit?
Where does my own footing resume?
Whose particle / pronoun / politeness marker is this?

THEN:
Is the Thai surface natural for that social scene?

AND IF IT IS NOT:
Can TCJ rewrite it better without breaking the scene?
```

That is the governing linguistic direction for the next phase of TCJ research.
