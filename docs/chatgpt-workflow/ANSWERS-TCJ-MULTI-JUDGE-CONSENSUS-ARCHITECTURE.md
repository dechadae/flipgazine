# TCJ — Multi-Judge Consensus Architecture

**Status:** APPROVED METHOD · NOT YET LIVE  
**Approved:** 20 August 2026  
**Updated:** 20 August 2026 · blind two-stage judge-admission protocol approved  
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
blind judge admission
        ↓
qualified independent model diagnoses
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

The approved admission method now tests two distinct abilities:

1. **Can the candidate model produce Thai that survives blind native-human review?**
2. **Can the candidate model correctly recognize strong and weak Thai when acting as a TCJ judge?**

A candidate should not receive production judging authority merely because it performs well on only one of these abilities.

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

## 3. Judge Admission is a blind two-stage protocol

Every candidate model must pass a versioned admission process before it may contribute to a production TCJ Panel conclusion.

The approved admission design deliberately separates:

```text
STAGE A
blind Thai production competence

from

STAGE B
TCJ judging competence
```

This separation matters because a model can write plausible Thai yet be a weak evaluator, or evaluate some kinds of Thai reasonably well despite having weaknesses in its own generation style.

Neither provider reputation, model size, price nor general benchmark rank substitutes for this admission evidence.

The full admission flow is:

```text
candidate models selected privately
        ↓
freeze same 10 Thai scenarios for every candidate
        ↓
all candidates generate responses independently
        ↓
strip provider/model identity
        ↓
assign opaque response IDs + globally randomize
        ↓
BLIND NATIVE-HUMAN REVIEW
ACCEPT / EDIT / REWRITE
        ↓
human decisions frozen
        ↓
reconstruct anonymous candidate-level production evidence
        ↓
36-case TCJ judging test
        ↓
compute anonymous judging-competence evidence
        ↓
anonymous candidate dossiers
      ↙         ↘
ChatGPT review   Grok review
      ↘         ↙
analyses frozen independently
        ↓
ONLY THEN reveal model identities
        ↓
qualified / partially_qualified /
research_only / rejected
        ↓
select TCJ Panel
```

The identity reveal is therefore a methodological event, not an informal convenience.

---

## 4. Stage A — Blind Native-Thai Production Competence Screen

### 4.1 Same scenarios for every candidate

The first screen uses the **same 10 frozen scenarios for every candidate model**.

Different models must not receive different questions because paired scenarios make model-to-model comparison more meaningful and reduce scenario difficulty as a confound.

For an initial six-model test:

```text
10 scenarios
× 6 candidate models
= 60 blind Thai responses
```

Five or six candidates is a practical initial target, not a permanent protocol requirement. The exact candidate set and admission protocol version must be frozen before results are reviewed.

### 4.2 Scenario coverage

The 10-scenario screen should deliberately span materially different Thai-language surfaces rather than ten near-duplicate casual-chat prompts.

Coverage should include, where practical:

```text
close-friend pragmatics
workplace hierarchy / role distance
particles, omission and implication
Thai-English lexical borrowing
humor / deadpan / mock-politeness
service or institutional language
decision / advice stance
metaphor / figurative interpretation
social register / relationship fit
composition / landing / information amount
```

The 10 cases are a competence screen, not a claim of complete Thai-language coverage.

### 4.3 Generation conditions

Each candidate receives the same frozen scenario text and the same task definition.

Generation settings should be made as comparable as technically practical while preserving provider compatibility. Record privately:

```text
provider
model
model version/snapshot where available
temperature / sampling settings
system/task instruction version
timestamp
latency / usage where available
raw response
response hash
```

Provider/model identity is provenance and must be preserved privately even though it is hidden from blind reviewers.

### 4.4 Identity stripping and randomization

Before native-human review, remove:

```text
provider name
model name
model family
API/provider metadata
candidate grouping
original generation order
```

Each response receives an opaque review ID such as:

```text
X-037
X-012
X-055
```

All responses are **globally randomized**, not shown in blocks by candidate. The reviewer must not be able to infer that ten consecutive responses came from the same model.

The sealed identity map must be stored separately from the review surface.

### 4.5 Native-human review

The native reviewer sees only:

```text
scenario
candidate Thai response
```

No model label, machine score, prior benchmark reputation or other candidate hint is shown.

The first-pass review uses the established editorial decision vocabulary:

```text
ACCEPT
EDIT
REWRITE
```

Reason tags may be added where useful, including:

```text
translation-shaped
unnatural lexical choice
over-explained
pronoun/subject issue
particle/stance issue
register mismatch
semantic drift
code-mixing issue
humor/timing issue
generic/cliche
metaphor issue
line-composition issue
too formal
too verbose
other
```

The human decision must be committed before any candidate identity or aggregate candidate performance is revealed.

### 4.6 Stage A evidence

After all native decisions are frozen, reconstruct results by anonymous candidate ID.

Useful evidence includes:

```text
ACCEPT rate
EDIT rate
REWRITE rate
failure-tag distribution
semantic failures
Thai-pragmatic failures
register failures
lexical/cultural failures
code-mixing failures
composition failures
scenario-specific failure clusters
```

Ten responses per model are sufficient for an initial screen and qualitative failure-pattern inspection. They are **not** sufficient by themselves to declare a model a qualified TCJ judge.

---

## 5. Stage B — TCJ Judging Competence Test

Candidates that remain under consideration after Stage A are then tested on the ability TCJ actually needs from a judge.

The initial judging set is the existing **36-case native-human calibration suite** used to ground the current Voice evaluator selection.

Each candidate judge receives the same frozen scenarios, candidate responses, TCJ profile definitions and deterministic output contract.

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

Stage B must not be replaced by Stage A. Good Thai generation is evidence of language competence, not proof of evaluator competence.

Likewise, a strong Stage B score does not erase serious Stage A evidence that a candidate repeatedly produces Thai a native reviewer considers materially unnatural. The two evidence classes should be considered together.

---

## 6. Per-dimension competence

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

## 7. Anonymous candidate dossiers

After Stage A and Stage B are complete, construct one **anonymous evidence dossier** per candidate.

The dossier may contain:

```text
opaque candidate ID
blind production ACCEPT / EDIT / REWRITE counts
production failure-pattern summary
representative anonymized production failures
36-case judging metrics
per-dimension judging error
false-fluent / false-major behavior
semantic-drift behavior
repeat-run stability
structured-output reliability
uncertainty / caveats
```

The dossier must not contain:

```text
provider name
model name
model family
pricing tier
brand reputation
public leaderboard position
```

The purpose is to force admission analysis to respond to observed Thai evidence rather than model prestige.

---

## 8. Independent ChatGPT and Grok meta-review

Before candidate identities are revealed, the anonymous dossiers are independently reviewed by **ChatGPT** and **Grok**.

Each reviewer should answer, at minimum:

```text
Which three candidates would you admit to the initial TCJ Panel?
Which candidates would you reject or keep research-only?
Which dimensions would you trust each candidate on?
What systematic failure pattern is most concerning for each candidate?
What uncertainty remains?
```

The two AI meta-reviews must be performed independently. Neither should receive the other review before its own conclusion is frozen.

### 8.1 No 2-of-3 governance vote

The admission decision is **not**:

```text
native human vote
+ ChatGPT vote
+ Grok vote
→ 2 of 3 wins
```

ChatGPT and Grok provide independent methodological analyses of the evidence. They do not outvote the native-human evidence.

If both AI meta-reviewers prefer a model whose blind Thai production repeatedly failed native review, that discrepancy is itself a research finding that must be investigated rather than resolved by majority vote.

### 8.2 Protecting reviewer blindness

An AI system that has already been given the candidate identity map during orchestration must **not** be treated as a genuinely blind meta-reviewer merely because labels are later renamed.

Where practical, use:

```text
separate fresh model context / session
+ anonymous dossiers only
+ no identity map in context
```

for the ChatGPT and Grok meta-review stage.

The same principle applies to any future third-party meta-reviewer.

---

## 9. Identity reveal and admission decision

Model identities are revealed only after all of the following are frozen:

```text
native-human Stage A decisions
Stage A candidate-level evidence
Stage B judging metrics
ChatGPT anonymous recommendation
Grok anonymous recommendation
```

Only then disclose:

```text
anonymous candidate ID → provider / model / version
```

The reveal allows the project to verify provider-specific operational and commercial considerations **after the competence evidence has been judged without brand influence**.

The final candidate state is then assigned:

### `qualified`

The model has demonstrated sufficient Thai performance under the active two-stage admission protocol and may contribute to production consensus for its qualified dimensions.

### `partially_qualified`

The model may contribute only to dimensions for which it passed the admission floor.

### `research_only`

The model may be run and its output preserved for comparison, but its diagnosis does not influence the production conclusion.

### `rejected`

The model is materially unsuitable for the TCJ panel under the active admission protocol.

A model's state is versioned. A provider/model upgrade does not inherit qualification automatically.

---

## 10. Production panel size

The approved initial target is **three qualified judges** in TCJ Panel mode.

Three is preferred initially because it provides:

- genuine cross-model evidence;
- meaningful disagreement detection;
- manageable API cost;
- manageable provenance;
- parallel execution with latency dominated largely by the slowest judge rather than the sum of all calls.

TCJ may test more than three candidate models during admission. Only the qualified production panel contributes to the final consensus.

Five-judge production is not rejected permanently, but it is not justified until evidence shows that the additional judges materially improve reliability or disagreement detection.

If only two candidates genuinely qualify, TCJ should use two qualified judges with explicit uncertainty handling rather than admit a weak third model just to create an odd-number panel.

---

## 11. Parallel independent evaluation

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

## 12. Raw and calibrated evidence remain separate per judge

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

## 13. Consensus is dimension-level, not verdict-level

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

## 14. Qualification precedes aggregation

The correct order is:

```text
candidate judges
      ↓
BLIND HUMAN-GROUNDED QUALIFICATION
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

## 15. Judge disagreement is first-class evidence

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

## 16. Disagreement can defeat false certainty

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

## 17. Native-human authority remains above panel consensus

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

## 18. Standard mode and Panel mode remain distinct

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

## 19. Approved implementation sequence

The approved implementation order is now:

```text
1. freeze Judge Admission protocol version
2. privately select candidate models and record provider/model provenance
3. freeze the same 10 Thai production scenarios for all candidates
4. generate candidate responses under comparable recorded conditions
5. strip identity, assign opaque IDs and globally randomize all responses
6. native-human blind ACCEPT / EDIT / REWRITE review
7. freeze all Stage A human decisions before any identity reveal
8. reconstruct anonymous candidate-level production evidence
9. run surviving candidates on the existing 36-case TCJ judging suite
10. compute per-model + per-dimension judging competence evidence
11. build anonymous candidate dossiers
12. run independent blind ChatGPT meta-review
13. run independent blind Grok meta-review
14. freeze both AI recommendations
15. reveal provider/model identities
16. verify provider-specific operational/commercial constraints
17. assign qualified / partially_qualified / research_only / rejected states
18. select initial production panel from the qualified evidence
19. implement parallel panel invocation
20. preserve per-judge raw + calibrated evidence
21. implement experimental dimension consensus
22. implement judge-agreement metrics
23. calibrate escalation thresholds against frozen evidence
24. run shadow comparison against current TCJ Standard
25. only after measured acceptance, expose TCJ Panel as production capability
```

No current production endpoint changes merely because this method is approved.

---

## 20. Admission protocol must not be circular

The competence gate exists to determine whether a model can usefully judge Thai under TCJ. It must not be tuned merely to admit a desired set of branded models.

Rules:

- freeze the 10 Stage A scenarios before candidate responses are reviewed;
- use the same Stage A scenarios for every candidate;
- freeze admission metrics before comparing candidate results;
- preserve failed models and failed dimensions as evidence;
- do not remove difficult cases merely because several models fail them;
- do not change human labels because a model majority disagrees;
- do not reveal model identities before the human and AI meta-reviews are frozen;
- version any later expansion/revision of either admission set;
- distinguish genuine model improvement from benchmark overfitting;
- do not promote a candidate solely because ChatGPT and Grok agree on it;
- do not demote native-human evidence merely because model metrics look strong.

The research question is:

> **Which models can both demonstrate credible Thai competence and provide useful independent Thai judgment under this methodology, and where do they fail?**

not:

> **How can we assemble three famous models that agree with each other?**

---

## 21. Provider/model diversity

Provider diversity is desirable because shared model-family failure modes can create false agreement.

However:

```text
Thai competence > provider diversity
```

If only two models meet the qualification standard, TCJ should operate with two qualified judges plus explicit uncertainty rather than add a materially weak third model simply to produce an odd-number panel.

A third model can remain `research_only` until it demonstrates sufficient competence.

Provider/model/version changes must trigger requalification.

The blind protocol is intended to prevent provider reputation from influencing admission; it does not erase provider provenance after reveal.

---

## 22. Commercial and provenance boundary

Multi-judge execution creates additional provenance dependencies.

Before a candidate provider/model is used in a commercial TCJ Panel, verify the applicable provider terms for the intended evaluation, output retention and commercial licensing context.

Provider terms may also need to be checked before running admission tests where the planned storage/use of model output is material. Blindness concerns the reviewer, not the project's responsibility to know which service it is invoking.

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

## 23. Research assets created by admission and panel operation

The blind admission protocol creates a private evidence layer distinct from normal TCJ Panel runs:

> **Blind Judge Admission Evidence**

This may contain:

```text
same 10 frozen scenarios
→ anonymous candidate generations
→ native-human ACCEPT / EDIT / REWRITE
→ failure tags
→ sealed identity map
→ candidate-level production profile
→ 36-case judging profile
→ anonymous ChatGPT recommendation
→ anonymous Grok recommendation
→ final identity reveal + admission state
```

TCJ Panel operation then creates a second private evidence layer:

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

These should be treated as strategic private research assets.

Together they can reveal systematic evaluator behavior such as:

- strong general reasoning but weak Thai production;
- good Thai generation but poor evaluator calibration;
- over-penalizing Thai-English borrowing;
- missing semantic drift;
- over-reading formality from particles;
- misreading deadpan/mock-politeness;
- over-rewarding assistant-style completeness;
- weakness in role/register inference;
- model-family correlated failure.

Full raw admission or panel evidence is not automatically public or included in a standard buyer package.

---

## 24. Future language extension

The panel mechanism may later support languages other than Thai, but judge admission is **language-profile specific**.

A model qualified for Thai does not become qualified for another language automatically.

Each language requires:

```text
native-language methodological authority
language-specific blind production screen
language-specific frozen calibration evidence
language-specific judge admission
language-specific disagreement calibration
```

The Thai rubric or Thai admission scenarios must not simply be translated and treated as a valid calibration framework for another language.

---

## 25. Engineering invariants for TCJ Panel

1. **No raw majority vote.** Consensus follows competence qualification.
2. **Thai competence outranks diversity.** Weak judges do not gain authority through panel membership.
3. **Admission is blind before identity reveal.** Brand/model reputation must not contaminate the native review or anonymous meta-review.
4. **Generation competence and judging competence are different gates.** Neither substitutes for the other.
5. **Same Stage A scenarios for every candidate.** Candidate comparisons must be paired against the same frozen prompts.
6. **Global randomization.** Native review must not expose candidate grouping or generation order.
7. **Human decisions freeze first.** No identity reveal before Stage A review is committed.
8. **ChatGPT and Grok are independent meta-reviewers, not votes.** Their recommendations do not outvote native evidence.
9. **Qualification is versioned.** New model versions must requalify.
10. **Dimension competence matters.** A model may be useful for one dimension and excluded from another.
11. **Judges are independent in production.** They do not see each other's outputs before diagnosis.
12. **Raw stays raw.** Preserve raw and calibrated state separately for each judge.
13. **Disagreement is evidence.** Never erase it just to produce a cleaner score.
14. **Low agreement may escalate.** TCJ is allowed to say automated judgment is uncertain.
15. **Server owns aggregation.** Models do not negotiate or author the authoritative consensus.
16. **Native-human authority remains separate.** Panel consensus does not overwrite blind human judgment.
17. **Measure before promotion.** Panel mode must pass shadow evaluation before becoming production authority.
18. **Commercial rights remain scoped.** Panel access does not imply model-development rights.

---

## 26. Short mental model

```text
CANDIDATE MODELS
      ↓
SAME 10 FROZEN THAI SCENARIOS
      ↓
ANONYMOUS RANDOMIZED RESPONSES
      ↓
BLIND NATIVE-HUMAN REVIEW
      ↓
production competence evidence
      ↓
36-CASE TCJ JUDGING TEST
      ↓
judging competence evidence
      ↓
ANONYMOUS DOSSIERS
   ↙             ↘
ChatGPT          Grok
blind review     blind review
   ↘             ↙
recommendations frozen
      ↓
IDENTITY REVEAL
      ↓
JUDGE ADMISSION
      ↓
QUALIFIED AI JUDGES
  ↓       ↓       ↓
 raw     raw      raw
  ↓       ↓       ↓
calibrate independently
  ↓       ↓       ↓
dimension-level consensus
        +
 disagreement evidence
        ↓
deterministic TCJ result
        ↓
human escalation if needed
```

The approved principle is:

> **TCJ Panel is not three AIs voting. It is a blind, native-human-grounded admission system that first tests whether candidate models can produce credible Thai, then tests whether they can judge Thai, compares anonymous evidence through independent meta-review, reveals model identities only after conclusions are frozen, and combines only qualified evidence while preserving disagreement.**