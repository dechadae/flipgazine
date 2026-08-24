# TCJ Register Difficulty & Answers BFF Stress-Test Strategy

**Date:** 24 August 2026  
**Status:** GOVERNING RESEARCH / QUALIFICATION STRATEGY  
**Scope:** Thai profile difficulty, bank/telecom applicability, Answers BFF benchmark role

## 1. Core observation

Not all Thai language profiles are equally difficult for a model or for TCJ.

A useful current hypothesis is:

> **Formal enterprise Thai is generally easier to constrain and evaluate than casual intimate Thai such as Answers BFF.**

This is not because formal Thai is linguistically simple. It is because many enterprise contexts reduce the number of socially plausible realizations.

Bank, telecom, government-adjacent, customer-service and regulated enterprise writing often provide stronger external constraints:

- speaker role is clearer;
- addressee role is clearer;
- hierarchy is more explicit;
- approved terminology is narrower;
- speech acts are often conventional;
- politeness expectations are more stable;
- ambiguity tolerance is lower;
- humor and irony are limited;
- code-switching is more controlled;
- omission is less aggressive;
- legal/compliance meaning often constrains acceptable variation;
- house style can be specified more directly.

These constraints reduce the conversational search space.

---

## 2. Why Answers BFF is harder

Answers BFF operates in a much higher-entropy conversational space.

The model must continuously reason about:

- relationship closeness;
- whether intimacy is licensed in this exact moment;
- shifting speaker footing;
- quoted/reported/proposed speech;
- hierarchy inside locally embedded speech;
- implication and omission;
- what does not need to be said;
- irony and nonliteral stance;
- particles as local stance markers;
- code-switching and borrowed English;
- slang without caricature;
- humor timing;
- queer-aware timing without costume;
- social specificity;
- line composition and landing;
- when a response should be one short line versus several lines;
- when helpfulness becomes assistantese;
- when reassurance becomes generic or patronizing;
- when the BFF should stop talking.

A formally grammatical sentence can fail many of these simultaneously while still appearing fluent.

Therefore:

> **BFF is not merely another Voice Profile. It is a stress test for whether TCJ understands Thai conversational pragmatics deeply enough to survive a high-variance social environment.**

---

## 3. Difficulty is not the same as commercial value

An easier linguistic profile may still have very high commercial value.

For banks or telecoms, errors in:

- hierarchy;
- clarity;
- terminology;
- politeness;
- customer stance;
- accountability;
- certainty;
- regulatory wording;
- service recovery;
- escalation language;
- complaint handling;
- formal-to-friendly boundary;

can have large operational and reputational consequences.

TCJ should not undervalue a profile merely because it is easier than BFF.

The correct interpretation is:

```text
formal enterprise Thai
= lower conversational entropy, high commercial importance

Answers BFF
= higher conversational entropy, hard research benchmark
```

---

## 4. Profile-scoped authority

Qualification should be profile/domain scoped.

A future TCJ runtime may become qualified for a bank or telecom profile before it becomes qualified for Answers BFF.

That is acceptable **only if the system is complete inside the qualified profile**.

A profile-scoped release must still demonstrate:

1. correct conversational/social understanding for that domain;
2. reliable SHIP/REVISE judgment;
3. low false-SHIP risk;
4. valid diagnosis;
5. meaning-preserving rewrite capability;
6. correct hierarchy/register handling;
7. recheck/self-consistency;
8. bounded private-evidence discipline;
9. reproducibility under a pinned configuration.

Passing only evaluation without rewrite is not sufficient.

Passing only formal enterprise Thai does not authorize claims that TCJ has solved casual Thai or BFF Thai.

---

## 5. No universal score

TCJ should not collapse all language competence into a single number.

Performance should be reported by profile and phenomenon.

For example:

```text
Bank service Thai
Telecom support Thai
Formal workplace Thai
Executive / corporate Thai
Customer complaint Thai
Answers BFF casual Thai
BFF quoted-speech / footing shift
CARE Thai
```

Each profile may contain different difficulty clusters.

A model could be excellent in one and weak in another.

---

## 6. Suggested difficulty ladder

This is a research hypothesis, not a fixed universal ranking.

A practical progression may look like:

```text
LOWER VARIANCE
↓
formal transactional Thai
regulated/customer-service templates
formal workplace communication
friendly professional Thai
mixed professional + casual Thai
close-friend direct advice
BFF humor / irony / omission
BFF with quoted speech and local hierarchy shifts
multi-party / multi-footing conversational Thai
↓
HIGHER VARIANCE
```

CARE is not placed on a simple ease/difficulty ladder because safety requirements create a separate authority regime.

The ranking should be revised from evidence rather than treated as doctrine.

---

## 7. Why BFF remains strategically useful even for enterprise TCJ

Answers BFF can act as a linguistic wind tunnel.

If TCJ learns to handle:

- local footing changes;
- subtle stance;
- implicit meaning;
- particles;
- social timing;
- over-helpfulness;
- register shifts;
- natural code-switching;
- meaning-preserving rewrite;

under BFF conditions, many of those capabilities should transfer to easier enterprise profiles.

The reverse is less certain.

A system that performs well on formal banking copy may still fail badly when asked to reason about:

- irony;
- close-friend teasing;
- quoted boss speech inside BFF commentary;
- omission;
- social inference;
- casual particles;
- relationship-sensitive certainty.

Therefore BFF remains a valuable **upper-bound stress test**, even if early commercial deployments target more constrained enterprise profiles.

---

## 8. Research allocation

TCJ R&D should maintain at least two tracks:

### Track A — constrained commercial profiles

Purpose:

- prove buyer-facing utility;
- test formal hierarchy/register;
- test rewrite quality in high-value enterprise contexts;
- establish profile-scoped qualification methodology.

Candidate domains:

- bank service and customer communication;
- telecom support/service recovery;
- formal workplace communication;
- executive/corporate communications.

### Track B — Answers BFF stress test

Purpose:

- push the linguistic architecture beyond easy constraints;
- discover failures in footing, stance, omission, social timing and local register shifts;
- prevent TCJ from becoming merely a formal-Thai style checker;
- improve the general native-editor mental model.

Track B may continue for months even if Track A becomes commercially useful earlier.

---

## 9. Release language

If a constrained profile qualifies first, commercial claims must be explicit.

Good:

> TCJ Bank Service Thai Profile v1 is qualified for the tested service and customer-communication scope.

Bad:

> TCJ has solved native Thai conversational quality.

Qualification scope must name:

```text
profile/domain
speech-act coverage
register/hierarchy coverage
model/runtime configuration
rewrite capability
known exclusions
qualification manifest
```

---

## 10. Relationship to the no-halfway rule

The project rule remains:

> **Do not ship a half-finished judge.**

This means:

- no diagnosis-only TCJ;
- no evaluator-only TCJ;
- no rewrite claims without rewrite evidence;
- no universal Thai claims from one easy profile;
- no production authority when a profile's own critical capabilities are incomplete.

A profile-scoped release is not "halfway" if the **complete TCJ editorial loop** is qualified inside that declared scope.

The core loop is:

```text
understand social scene
→ judge exact copy
→ diagnose
→ rewrite better when needed
→ recheck
→ release decision
```

---

## 11. Current strategic interpretation

```text
Formal bank / telecom Thai
= likely easier first commercial qualification target

Answers BFF
= hardest current native-language research environment

TCJ Core
= must learn from both
```

The enterprise track can prove practical value.

The BFF track prevents us from mistaking constrained correctness for deep conversational competence.

Both belong in the final TCJ research program.
