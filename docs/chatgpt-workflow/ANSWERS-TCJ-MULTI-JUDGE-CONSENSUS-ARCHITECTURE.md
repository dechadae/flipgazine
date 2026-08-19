# TCJ — Multi-Judge Consensus Architecture

**Status:** APPROVED METHOD · NOT YET LIVE  
**Approved:** 20 August 2026  
**Project:** Flipgazine / The Book of Answers / Thai Conversation Judge  
**Parent architecture:** `ANSWERS-THAI-CONVERSATION-JUDGE-ARCHITECTURE.md`  
**Commercial-use boundary:** `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md`

---

## 1. Purpose

This document defines the approved next-stage TCJ architecture for evaluating one candidate response with multiple independent AI judges while preserving native-human judgment as the methodological authority.

The purpose is **not** to replace one model with a popularity vote among several models.

The purpose is to create a calibrated panel in which:

```text
native-human evidence
        ↓
judge qualification
        ↓
independent model diagnoses
        ↓
per-judge calibration
        ↓
dimension-level consensus
        ↓
explicit disagreement analysis
        ↓
deterministic TCJ conclusion
        ↓
human escalation where needed
```

The governing principle is:

> **Judge diversity is useful only after judge competence is established. A model that is materially weak at Thai must not influence the TCJ conclusion merely because it is another independent model.**

This extends, rather than replaces, the existing TCJ rule:

> **Models provide stochastic semantic interpretation. The server owns deterministic methodology. Native-human judgment remains the calibration authority.**

---

## 2. Why simple majority voting is rejected

TCJ must not implement a rule such as:

```text
Judge A = fluent
Judge B = minor_problem
Judge C = fluent
→ fluent wins 2–1
```

This is rejected for four reasons:

1. a model can be systematically weak at Thai pragmatics while still producing confident structured output;
2. different models can have different strengths across intent, pragmatics, register, lexical fit, stance and delivery;
3. a verdict-level vote throws away the dimension evidence that TCJ already treats as methodologically primary;
4. disagreement itself is useful research evidence and should not be hidden by a majority label.

Therefore TCJ uses **qualified, calibrated consensus**, not raw majority voting.

---

## 3. Judge Admission / Competence Gate

Every candidate model must pass a Thai-competence qualification stage before it may contribute to a production TCJ Panel conclusion.

The initial admission set is the existing **36-case native-human calibration suite** used to ground the current Voice evaluator selection. Additional frozen calibration cases may be added later under a versioned protocol, but a new model does not gain production authority merely by being newer, larger or from a different provider.

Each candidate judge is run against the same frozen scenarios, responses, TCJ profile definitions and deterministic scoring rules.

Admission measures should include, where the underlying human evidence supports them:

```text
exact human rating agreement
±1 rating agreement
mean absolute rating error
error by TCJ dimension
severity / verdict agreement
false-fluent behavior
false-major / false-critical behavior
semantic-drift false positives
register / relationship failures
Thai-pragmatic failures
lexical / cultural failures
repeat-run stability
structured-output reliability
```

Qualification is empirical. Provider reputation or model size is not a substitute for measured Thai performance.

---

## 4. Per-dimension competence

A judge does not have to be equally competent on every TCJ dimension.

TCJ therefore records judge competence by dimension rather than assigning one undifferentiated global trust score.

Conceptual example:

```text
                 intent  pragmatics  register  lexical  stance  delivery
Judge A           .92       .81        .76      .89      .80      .74
Judge B           .84       .93        .90      .75      .85      .88
Judge C           .90       .78        .86      .94      .82      .91
```

These values are illustrative only. No production weighting may use invented or unmeasured coefficients.

A candidate may therefore be:

```text
qualified globally
qualified only for selected dimensions
research-only
rejected from production consensus
```

A judge that falls below the admission floor for a dimension contributes **zero production weight** to that dimension, even if it remains useful as research evidence.

---

## 5. Candidate judge states

Each evaluated model/version must have an explicit state:

### `qualified`

The model has demonstrated sufficient Thai performance under the frozen admission protocol and may contribute to production consensus for its qualified dimensions.

### `partially_qualified`

The model may contribute only to dimensions for which it passed the admission floor.

### `research_only`

The model may be run and its output preserved for comparison, but its diagnosis does not influence the production conclusion.

### `rejected`

The model is materially unsuitable for the TCJ panel under the active admission protocol.

A model's state is versioned. A provider/model upgrade does not inherit qualification automatically.

---

## 6. Production panel size

The approved initial target is **three qualified judges** in TCJ Panel mode.

Three is preferred initially because it provides:

- genuine cross-model evidence;
- meaningful disagreement detection;
- manageable API cost;
- manageable provenance;
- parallel execution with latency dominated largely by the slowest judge rather than the sum of all calls.

TCJ may test more than three candidate models during admission. Only the qualified production panel contributes to the final consensus.

Five-judge production is not rejected permanently, but it is not justified until evidence shows that the additional judges materially improve reliability or disagreement detection.

---

## 7. Parallel independent evaluation

For each TCJ Panel request:

```text
scenario + candidate response
          ↓
 ┌────────┼────────┐
Judge A  Judge B  Judge C
 └────────┼────────┘
          ↓
raw diagnosis from each judge
          ↓
strict schema validation per judge
          ↓
active TCJ calibration applied per judge
          ↓
calibrated diagnosis per judge
```

The judges must not see each other's outputs before submitting their diagnoses.

Each model receives the same frozen TCJ core/profile semantics, subject only to adapter differences required to call the provider safely and obtain the canonical schema.

The panel is therefore **parallel and independent**, not a debate, chain-of-thought exchange or sequential critique loop.

---

## 8. Raw and calibrated evidence remain separate per judge

The existing TCJ dual-state rule now applies independently to every panel member.

For each judge preserve:

```text
provider
model
model snapshot/version where available
settings
core/profile/guard-set version
methodology hash
scenario hash
candidate hash
raw model diagnosis
raw diagnosis hash
calibrated diagnosis
calibrated diagnosis hash
calibration status
guard trace
latency / usage where available
judge qualification state
judge competence profile version
```

No panel aggregation may overwrite or replace the underlying per-judge evidence.

---

## 9. Consensus is dimension-level, not verdict-level

TCJ aggregates the six calibrated dimension judgments before computing the overall score/verdict.

Conceptual example:

| Judge | Intent | Pragmatics | Register/BFF | Lexical | Stance | Delivery |
|---|---:|---:|---:|---:|---:|---:|
| A | 4 | 4 | 3 | 4 | 4 | 3 |
| B | 4 | 2 | 3 | 4 | 3 | 3 |
| C | 4 | 4 | 4 | 4 | 4 | 4 |

A simple robust statistic such as the median may be used in the first experimental implementation **only after all participating judges have passed the relevant competence gate**.

Longer term, a dimension may use empirically calibrated judge weights where the frozen human evidence justifies them.

No weighting coefficient may be chosen merely to make TCJ agree with a desired outcome.

---

## 10. Qualification precedes aggregation

The correct order is:

```text
candidate judges
      ↓
HUMAN-GROUNDED QUALIFICATION
      ↓
qualified dimensions only
      ↓
independent evaluation
      ↓
per-judge calibration
      ↓
consensus
```

The following architecture is explicitly prohibited:

```text
three available models
      ↓
raw vote
      ↓
majority answer
```

A weak Thai judge does not receive equal authority for the sake of model diversity.

Example:

```text
Judge A  pragmatics = 4   qualified
Judge B  pragmatics = 4   qualified
Judge C  pragmatics = 1   research_only for pragmatics
```

Production consensus uses A and B. Judge C's failure remains preserved as cross-model evidence but contributes no pragmatics weight.

---

## 11. Judge disagreement is first-class evidence

TCJ Panel introduces explicit **Judge Agreement / Disagreement** evidence.

The panel should preserve, per dimension:

```text
number of qualified judges
rating spread
consensus rating
agreement level
outlier judges
whether the outlier was qualified
whether disagreement triggered escalation
```

A future public/commercial result may expose a simplified form such as:

```text
TCJ score            86
verdict              minor_problem
judge agreement      high
human escalation     not required
```

or:

```text
TCJ score            71
verdict              uncertain
judge agreement      low
disagreement         Thai pragmatics / stance
human review         recommended
```

Exact public wording and thresholds must be frozen before launch and must not be inferred from these examples.

---

## 12. Disagreement can defeat false certainty

A multi-judge panel is not useful if it always forces a confident result.

If highly qualified judges materially disagree on a linguistically important dimension, TCJ may return an uncertainty/escalation state rather than hiding the disagreement behind an arithmetic average.

Conceptual example:

```text
qualified Judge A = 4
qualified Judge B = 2
qualified Judge C = 3
```

This may be more appropriately represented as:

```text
consensus            provisional 3
agreement            low
human escalation     recommended
```

rather than pretending the panel has established a stable linguistic fact.

The exact escalation thresholds require calibration against native-human evidence before production use.

---

## 13. Native-human authority remains above panel consensus

TCJ Panel does not convert model agreement into human ground truth.

For Batch 2 and other editor-grounded research:

```text
native-human judgment
      = methodological reference / corpus authority

AI panel consensus
      = machine-evaluation evidence
```

If all three qualified judges disagree with a blind native-human decision, that is a high-value disagreement case. It does **not** silently reverse the human decision.

Such cases should be preserved for:

- judge error analysis;
- profile calibration research;
- guard research;
- possible external human validation;
- future methodology revision.

---

## 14. Standard mode and Panel mode remain distinct

The approved architecture keeps two operational modes.

### TCJ Standard

```text
one qualified semantic judge
→ TCJ calibration
→ deterministic score/verdict
```

Use cases:

- fast public evaluation;
- lower-cost QA;
- current compatibility routes;
- baseline research.

### TCJ Panel

```text
three qualified independent judges
→ per-judge calibration
→ dimension consensus
→ disagreement analysis
→ deterministic TCJ conclusion
→ escalation where warranted
```

Use cases:

- higher-confidence evaluation;
- commercial benchmark work;
- evaluator research;
- difficult/high-disagreement Thai cases;
- cross-model judge analysis.

Panel mode does not automatically replace Standard mode.

---

## 15. Initial implementation sequence

The approved implementation order is:

```text
1. freeze Judge Admission protocol version
2. run candidate models on existing 36-case native-human calibration suite
3. compute per-model + per-dimension competence evidence
4. native-human review of observed failure patterns
5. assign qualified / partial / research-only / rejected states
6. select initial three-judge production panel
7. implement parallel panel invocation
8. preserve per-judge raw + calibrated evidence
9. implement experimental dimension consensus
10. implement judge-agreement metrics
11. calibrate escalation thresholds against frozen evidence
12. run shadow comparison against current TCJ Standard
13. only after measured acceptance, expose TCJ Panel as production capability
```

No current production endpoint changes merely because this method is approved.

---

## 16. Admission protocol must not be circular

The competence gate exists to determine whether a model can judge Thai under TCJ. It must not be tuned merely to admit a desired set of branded models.

Rules:

- freeze admission metrics before comparing candidate results;
- preserve failed models and failed dimensions as evidence;
- do not remove difficult cases merely because several models fail them;
- do not change human labels because a model majority disagrees;
- version any later expansion/revision of the calibration set;
- distinguish genuine model improvement from benchmark overfitting.

The research question is:

> **Which models provide useful independent Thai judgment under this methodology, and where do they fail?**

not:

> **How can we assemble three models that agree with each other?**

---

## 17. Provider/model diversity

Provider diversity is desirable because shared model-family failure modes can create false agreement.

However:

```text
Thai competence > provider diversity
```

If only two models meet the qualification standard, TCJ should operate with two qualified judges plus explicit uncertainty rather than add a materially weak third model simply to produce an odd-number panel.

A third model can remain `research_only` until it demonstrates sufficient competence.

Provider/model/version changes must trigger requalification.

---

## 18. Commercial and provenance boundary

Multi-judge execution creates additional provenance dependencies.

Before a new provider/model is used in a commercial TCJ Panel, verify the applicable provider terms for the intended evaluation, output retention and commercial licensing context.

Panel outputs must preserve provider/model provenance rather than being collapsed into an anonymous TCJ score.

The existing TCJ commercial-use policy remains unchanged:

```text
Benchmark Use
≠
Model-Development Use
```

A buyer receiving TCJ Panel scores, diagnoses, disagreement evidence or judge-comparison evidence does **not** thereby receive the right to use those outputs as training, fine-tuning, preference, reward, distillation, checkpoint-selection or other model-development signals.

Any Model-Development Use remains a separately reviewed licensing/provenance question.

---

## 19. Research asset created by the panel

TCJ Panel creates a new private evidence layer:

> **Cross-Judge Calibration & Disagreement Evidence**

This may contain:

```text
same scenario / candidate
→ Judge A raw + calibrated diagnosis
→ Judge B raw + calibrated diagnosis
→ Judge C raw + calibrated diagnosis
→ consensus state
→ disagreement state
→ native-human reference where available
```

This should be treated as a strategic private research asset.

It can reveal systematic evaluator behavior such as:

- over-penalizing Thai-English borrowing;
- missing semantic drift;
- over-reading formality from particles;
- misreading deadpan/mock-politeness;
- over-rewarding assistant-style completeness;
- weakness in role/register inference;
- model-family correlated failure.

Full raw panel evidence is not automatically public or included in a standard buyer package.

---

## 20. Future language extension

The panel mechanism may later support languages other than Thai, but judge admission is **language-profile specific**.

A model qualified for Thai does not become qualified for another language automatically.

Each language requires:

```text
native-language methodological authority
language-specific frozen calibration evidence
language-specific judge admission
language-specific disagreement calibration
```

The Thai rubric must not simply be translated and treated as a valid calibration framework for another language.

---

## 21. Engineering invariants for TCJ Panel

1. **No raw majority vote.** Consensus follows competence qualification.
2. **Thai competence outranks diversity.** Weak judges do not gain authority through panel membership.
3. **Qualification is versioned.** New model versions must requalify.
4. **Dimension competence matters.** A model may be useful for one dimension and excluded from another.
5. **Judges are independent.** They do not see each other's outputs before diagnosis.
6. **Raw stays raw.** Preserve raw and calibrated state separately for each judge.
7. **Disagreement is evidence.** Never erase it just to produce a cleaner score.
8. **Low agreement may escalate.** TCJ is allowed to say automated judgment is uncertain.
9. **Server owns aggregation.** Models do not negotiate or author the authoritative consensus.
10. **Native-human authority remains separate.** Panel consensus does not overwrite blind human judgment.
11. **Measure before promotion.** Panel mode must pass shadow evaluation before becoming production authority.
12. **Commercial rights remain scoped.** Panel access does not imply model-development rights.

---

## 22. Short mental model

```text
NATIVE-HUMAN CALIBRATION
          ↓
   JUDGE ADMISSION
          ↓
 QUALIFIED AI JUDGES
    ↓      ↓      ↓
  raw    raw     raw
    ↓      ↓      ↓
 calibrate independently
    ↓      ↓      ↓
dimension-level consensus
          +
   disagreement evidence
          ↓
deterministic TCJ result
          ↓
  human escalation if needed
```

The approved principle is:

> **TCJ Panel is not three AIs voting. It is a native-human-grounded system deciding which AI judges are competent, combining only qualified evidence, and preserving disagreement instead of hiding it.**
