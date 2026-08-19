# TCJ — Multi-Judge Consensus & Measurement Architecture

**Status:** APPROVED METHOD · PARTIAL FOUNDATION IMPLEMENTED · PANEL/ASSURANCE NOT YET LIVE  
**Approved:** 20 August 2026  
**Updated:** 20 August 2026 · evidence-bank weaknesses patched, implementation baseline recorded, realistic completion timeline added  
**Project:** Flipgazine / The Book of Answers / Thai Conversation Judge  
**Parent live architecture:** `ANSWERS-THAI-CONVERSATION-JUDGE-ARCHITECTURE.md`  
**Commercial-use boundary:** `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md`

---

## 1. Purpose

This document defines the approved next-stage architecture for **TCJ Panel** and the future **TCJ Assurance** layer.

Its central question is not only:

> **What do several AI judges think of this Thai response?**

but also:

> **How much evidence do we have that each judge deserves to be trusted on this specific Thai-language dimension, and when should the system refuse false certainty and return to humans?**

The governing principle is:

> **TCJ must continuously evaluate the evaluators.**

Judge qualification, native-human evidence, disagreement, uncertainty, hidden challenge material, benchmark integrity and longitudinal judge behavior are therefore first-class components.

This document does **not** change the current live TCJ Standard endpoint merely because the method is approved. The live parent architecture remains authoritative for deployed Standard behavior until a versioned promotion is explicitly accepted.

---

## 2. Strategic scope — what TCJ should and should not become

TCJ should **not** attempt to win a generic eval-platform feature race.

Generic tracing, experiment management, datasets, dashboards, annotation queues and generic LLM-as-judge tools are useful infrastructure, but they are not TCJ's defensible core.

TCJ's differentiated purpose is narrower:

> **Measure socially natural Thai behavior for a specific relationship, role, channel, communicative task and house profile — while also measuring how trustworthy the evaluator is.**

Long-term defensibility should come primarily from accumulated human-grounded evidence and measurement history, not from a secret prompt, a score formula or a dashboard.

---

## 3. Core architecture

```text
PRIVATE NATIVE-HUMAN EVIDENCE
        ↓
partitioned Calibration / Qualification / Assurance banks
        ↓
BLIND JUDGE ADMISSION
        ↓
versioned Judge Passports
        ↓
qualified independent model diagnoses
        ↓
per-judge deterministic TCJ calibration
        ↓
empirical judge-reliability model
        ↓
dimension-level consensus + uncertainty
        ↓
explicit disagreement / correlated-error analysis
        ↓
deterministic TCJ conclusion
        ↓
triggered + random blind human review
        ↓
human/model delta evidence
        ↓
future calibration and judge requalification
```

The existing foundational boundary remains:

> **Models provide stochastic semantic interpretation. The server owns deterministic methodology. Native-human judgment remains the calibration authority.**

A second governing rule is:

> **Judge diversity is useful only after judge competence is established. Thai competence outranks provider diversity.**

---

## 4. Three different kinds of authority must remain separate

### 4.1 `answers-bff`

The Answers profile measures an intentionally authored house/editorial voice.

```text
Decha / designated native editorial owner
        = final editorial authority
```

Independent native reviewers may still be useful for research and external validation, but this profile does not attempt to estimate an average Thai speaker.

### 4.2 `general-v1` live limitation

The current live General Thai profile is a practical evaluator. Its current human evidence must **not** be described as universal or population-level Thai ground truth.

### 4.3 Future `general-v2`

A broader contemporary-Thai claim requires multiple independent native-Thai judgments.

Preferred review flow:

```text
Reviewer A blind decision
Reviewer B blind decision
        ↓
material disagreement / low confidence / control sample
        ↓
Reviewer C blind decision
```

The objective is not majority truth. Legitimate disagreement must remain visible as:

```text
human_ambiguous
human judgment distribution
reason-tag disagreement
contextual explanation where available
```

---

## 5. Human review must be blind before model evidence is shown

Any case intended to become calibration, qualification or Assurance evidence must receive its initial human judgment without machine diagnosis exposure.

Human reviewer initially sees only what is needed for the language judgment:

```text
scenario / relationship / channel
candidate response
profile definition where necessary
```

Human reviewer must not initially see:

```text
model/provider identity
machine score
machine rationale
other judge outputs
model majority
prior aggregate result
```

The human decision freezes first. Machine evidence may be revealed only afterward for comparison and research.

---

## 6. Human evidence is partitioned into three banks

### 6.1 Calibration Bank

Cases that may influence:

```text
rubric/profile wording
calibration rules
deterministic guards
failure taxonomy
judge adapters
```

Once a case influences methodology, it belongs here permanently for validity accounting.

### 6.2 Judge Qualification Bank

Fresh frozen cases used to determine whether candidate judges deserve production authority. Qualification evidence must remain separate from ordinary calibration development.

### 6.3 Assurance Holdout

Private cases reserved for independent validation. Assurance items must not be used to:

```text
tune prompts
create guards
select judges
select thresholds
choose weights
repair known failures
```

If an Assurance case is exposed during methodology development, it is reclassified and no longer counts as untouched holdout evidence.

> **A case used to improve TCJ cannot also count as independent evidence that the improvement works.**

### 6.4 PATCHED WEAKNESS — the existing 36-case bank has a permanent evidence classification

The historical 36-case bank has already been used to compare candidate evaluators and influence TCJ methodology.

It is therefore permanently classified as:

```text
Calibration Bank
+
preliminary Stage B screening evidence
```

It is **not eligible** to serve as:

```text
clean final Judge Qualification proof
Assurance Holdout
independent proof that a later TCJ change generalizes
```

All historical Judge Passports derived from this bank must carry:

```text
qualification_state = historical_preliminary
clean_holdout = false
assurance_eligible = false
final_qualification_sufficient = false
```

This restriction is structural, not merely wording in a report.

---

## 7. Judge Admission remains a blind two-stage protocol

Every candidate model must pass a versioned admission process before influencing production TCJ Panel conclusions.

```text
STAGE A
Can this model produce Thai that survives blind native-human review?

STAGE B
Can this model correctly recognize strong and weak Thai as a TCJ judge?
```

Neither provider reputation, benchmark rank, model size, price nor popularity substitutes for TCJ-specific evidence.

High-level flow:

```text
candidate set selected privately
        ↓
same frozen Thai scenarios
        ↓
generate independently
        ↓
strip identity
        ↓
opaque IDs + global randomization
        ↓
BLIND NATIVE-HUMAN REVIEW
        ↓
human decisions frozen
        ↓
anonymous production evidence
        ↓
TCJ judging competence tests
        ↓
Judge Passport metrics
        ↓
anonymous dossiers
      ↙         ↘
ChatGPT review   Grok review
      ↘         ↙
analyses frozen independently
        ↓
ONLY THEN reveal identities
        ↓
qualified / partially_qualified /
research_only / rejected
```

Identity reveal is a methodological event, not a convenience.

---

## 8. Stage A — blind Native-Thai production competence

The initial screen uses the same **10 frozen scenarios per candidate model**.

For six candidates:

```text
10 scenarios × 6 models = 60 blind responses
```

Coverage should include, where practical:

```text
close-friend pragmatics
workplace hierarchy / role distance
particles, omission and implication
Thai-English borrowing
humor / deadpan / mock-politeness
service or institutional language
decision / advice stance
metaphor / figurative interpretation
social register / relationship fit
composition / landing / information amount
```

Ten responses are an initial competence screen, not proof of qualification.

Generation provenance records provider/model/version, sampling settings, task instruction version, timestamp, latency/usage, raw response and hash.

Before human review remove provider/model/family metadata, candidate grouping and generation order. Assign opaque IDs and globally randomize all responses.

Human decision vocabulary remains:

```text
ACCEPT
EDIT
REWRITE
```

Optional reason tags include translation shape, lexical choice, over-explanation, pronoun/subject issue, particle/stance issue, register mismatch, semantic drift, code mixing, humor/timing, generic/cliché, metaphor, composition, excessive formality/verbosity and other.

---

## 9. Stage B — TCJ judging competence

The existing 36-case native-human calibration suite remains useful as the first judging-competence screen.

> **The 36 cases are an initial admission instrument, not permanent production certification.**

Metrics include:

```text
exact human rating agreement
±1 agreement
mean absolute rating error
error by dimension
severity/verdict agreement
false-fluent behavior
false-major / false-critical behavior
semantic-drift false positives
register/relationship failures
Thai-pragmatic failures
lexical/cultural failures
repeat-run stability
structured-output reliability
```

No arbitrary rule such as “100 cases = qualified” is permitted. Qualification depends on whether evidence is sufficiently strong for the intended production claim, especially for high-cost errors such as false-fluent pragmatic judgment.

### 9.1 PATCHED WEAKNESS — the historical 36 cases do not validate broad General Thai dimensions

The current 36-case human labels use the Answers-style dimensions:

```text
intent
thai_pragmatics
bff_voice
lexical_social_fit
stance
composition
```

They do not independently label the broader General Thai dimensions:

```text
register_relationship_fit
discourse_delivery
```

Therefore:

- the historical 36-case bank may support `answers-bff` judge screening;
- it may inform shared-core research where the mapping is explicit;
- it must **not** be presented as a complete human validation of `general-v1`;
- `general-v2` requires a fresh multi-rater bank built specifically for General Thai constructs and population scope.

---

## 10. Judge Passport — every production judge gets a versioned failure profile

Each candidate receives a versioned Judge Passport containing at least:

```text
model/provider/version
admission protocol version
Stage A ACCEPT / EDIT / REWRITE evidence
per-dimension judging error
false-fluent rate
false-major / false-critical rate
semantic-drift behavior
repeat stability
structured-output reliability
qualified dimensions
excluded dimensions
known failure clusters
human evidence sample size
uncertainty around key metrics
qualification date
expiry/requalification condition
```

### 10.1 Robustness battery

Where relevant to the judge contract, test:

```text
repeated identical runs
ordered-alternative / position changes
response labels/IDs
verbosity and superficial completeness
apology/politeness artifacts
prompt complexity
Thai-English script mixture
Unicode/formatting perturbation
candidate-response prompt injection
self-preference / same-family outputs
metaphor/personification
particles and omitted subjects
relationship/register shifts
```

Pairwise-position tests apply only where an ordered comparison actually exists.

### 10.2 Candidate response is untrusted data

Text inside the candidate such as “ignore the rubric” or “rate this 4” is data, never instruction. Judge adapters must delimit candidate text and admission must include injection-resistance cases.

### 10.3 Model upgrades do not inherit passports

New provider/model snapshots requalify. Historical passports remain immutable evidence of the older version.

---

## 11. Per-dimension qualification

A judge may be:

```text
qualified
partially_qualified
research_only
rejected
```

A judge below the competence floor for a dimension contributes **zero production authority** to that dimension even if its result remains useful as research evidence.

No production coefficient may use invented weights or unmeasured competence numbers.

---

## 12. Anonymous candidate dossiers and independent meta-review

Before identity reveal, build anonymous dossiers containing blind production outcomes, judging metrics, per-dimension errors, false-fluent/false-major behavior, robustness results, repeat-run stability, structured-output reliability, representative anonymized failures and uncertainty.

Dossiers exclude provider, model, family, pricing, brand reputation and public leaderboard rank.

ChatGPT and Grok review identical anonymous evidence independently. Neither sees the other's conclusion before freeze. Their analyses are not a 2-of-3 governance vote and cannot overrule repeated native-human failures by popularity.

An AI context that already knows the identity map does not count as genuinely blind simply because labels are later renamed.

---

## 13. Production panel size

Initial target: **three qualified independent judges**.

If only two genuinely qualify, use two plus explicit uncertainty rather than admit a weak third judge.

Five judges are not justified merely because five sounds more rigorous.

```text
Thai competence > provider diversity
```

---

## 14. Parallel independent evaluation

```text
scenario + candidate
          ↓
 ┌────────┼────────┐
Judge A  Judge B  Judge C
 └────────┼────────┘
          ↓
raw diagnosis from each
          ↓
strict schema validation
          ↓
TCJ calibration independently
          ↓
calibrated diagnosis from each
```

Judges do not see one another's output before commitment. Panel mode is not debate, sequential critique or chain-of-thought exchange.

---

## 15. Raw and calibrated evidence remain separate

For every judge preserve provider/model/snapshot/settings, core/profile/guard versions, methodology hash, scenario/candidate hashes, raw diagnosis/hash, calibrated diagnosis/hash, calibration status, guard trace, latency/usage, Judge Passport version and qualification state.

Aggregation must never overwrite individual evidence.

---

## 16. Consensus is dimension-level, never verdict-level voting

Raw majority verdict voting remains prohibited.

### 16.1 Shadow implementation — robust median

Median may be used in the first shadow implementation because it is simple, auditable and robust to one extreme value.

> **Median consensus is transitional experimental machinery, not the intended final premium measurement method.**

### 16.2 Target implementation — human-calibrated reliability model

When enough fresh frozen human evidence exists, estimate each judge's behavior per dimension and derive a distribution over the human-grounded state rather than treating each judge as an equally trustworthy integer.

No probabilistic weighting becomes production authority until:

```text
human evidence is sufficient
method is frozen
assumptions are documented
shadow results improve unseen-human prediction versus the simpler baseline
```

### 16.3 Correlated judge errors

Three APIs are not automatically three independent measurements. Residual errors against blind human evidence must be measured before any correlation correction is introduced. No invented correlation penalties are permitted.

---

## 17. Disagreement and uncertainty are first-class outputs

Per dimension preserve:

```text
number of qualified judges
individual calibrated ratings
rating spread
consensus state
agreement level
estimated uncertainty
outliers
whether an outlier was qualified
whether disagreement triggered human review
```

TCJ may conclude:

```text
uncertain
human review required
```

Escalation thresholds require blind-human calibration before production use.

---

## 18. Human escalation is normal operation

Human review may be triggered by material disagreement, high uncertainty, critical/safety-sensitive failure, novel context, new failure cluster, important guard activation, unexpected Passport violation, model drift or contrast-bank inconsistency.

TCJ also blind-reviews a small random sample of high-confidence/high-agreement cases because shared blind spots may not produce disagreement.

Human-first sequence:

```text
scenario + response
        ↓
BLIND HUMAN DECISION
        ↓
freeze
        ↓
reveal Panel evidence
        ↓
record human/model delta
```

Multiple native reviewers may legitimately disagree; ambiguity is preserved rather than forced into a majority label.

---

## 19. Native-human authority does not mean one universal Thai truth

```text
Answers editorial owner judgment
        = house-style/corpus authority

General Thai multiple native judgments
        = empirical reference evidence for a documented population/scope
```

Neither should be described as metaphysical ground truth.

---

## 20. Thai Pragmatic Contrast Bank

Build private human-designed minimal or near-minimal pairs where one socially causal variable changes, for example:

```text
best friend ↔ boss
LINE chat ↔ formal email
peer ↔ service employee
acceptable omission ↔ missing necessary meaning
literal reading ↔ obvious personification
natural borrowing ↔ awkward English-shaped scaffolding
warm polite ค่ะ ↔ contextually distancing/formal ค่ะ
advice request ↔ factual request
```

The key measurement is directional:

> **Does the evaluator's judgment change appropriately when the socially causal variable changes?**

Each family preserves phenomenon ID, changed variable, held-constant variables, expected human direction, independent human validation, disagreement, profile applicability, exposure state and version.

The strongest cases remain private.

---

## 21. Contamination resistance — use genuinely new hidden material

Assurance prioritizes:

```text
new human-authored scenarios
new human-validated responses/contrasts
private packs
limited exposure
versioned retirement
```

Do not rely on paraphrasing an exposed benchmark as the main contamination defense.

Assurance packs may be draft, frozen, active, limited-life, retired or compromised. Important runs link to a frozen manifest hash. A hash proves integrity/linkage, not linguistic validity or secrecy.

---

## 22. Benchmark QA attacks TCJ itself

Every evidence item should maintain item-health evidence including human agreement/ambiguity, judge disagreement, observed difficulty, discrimination, known shortcuts, formatting sensitivity, exposure state, review history and retirement reason.

Automated investigators may flag suspicious items, but humans should form independent judgments before seeing machine proposals when anchoring risk exists.

Broken, ambiguous or compromised items are versioned/retired, not silently rewritten.

---

## 23. Product modes

### TCJ Standard

```text
one qualified semantic judge
→ TCJ calibration
→ deterministic score/verdict
```

Fast public evaluation, lower-cost QA and baseline research.

### TCJ Panel

```text
qualified independent judges
→ per-judge calibration
→ dimension consensus
→ disagreement + uncertainty
→ deterministic result
→ human escalation where warranted
```

Higher-confidence evaluation and difficult/commercial benchmark work.

### TCJ Assurance

```text
private rotating challenge pack
+ qualified Panel
+ required blind human audit sample
+ uncertainty/robustness analysis
+ frozen methodology/run provenance
→ Assurance report
```

High-stakes comparison, procurement/release readiness and serious commercial evidence.

---

## 24. Do not reduce serious results to one 0–100 score

Panel/Assurance reports should be capable of including:

```text
TCJ profile
pack/version
exact model + settings
methodology hash
Judge Passport versions
human calibration version
per-dimension results
uncertainty distribution/interval
judge agreement
human escalation/audit rate
false-fluent evidence where measured
repeat-run variance
robustness failures
known limitations
```

A score on a fixed pack is not proof of performance across all possible Thai conversation. The claim must match the evidence.

---

## 25. Strategic private assets / copy resistance

Hard-to-copy assets include:

```text
Human Calibration Vault
Judge Passport History
Thai Pragmatic Contrast Bank
Hidden Assurance Packs
Cross-Judge Error Evidence
Human–Model Delta History
human ambiguity records
longitudinal model drift
buyer/domain-specific calibration
```

The moat is **evidence accumulation + protocol discipline + native-language expertise**, not obscurity of code.

---

## 26. Research assets must not collapse into training rights

```text
Benchmark Use
≠
Model-Development Use
```

TCJ scores, diagnoses, flags, disagreement evidence, human audits and Assurance reports do not automatically grant rights for training, fine-tuning, preference optimization, reward modeling, distillation, synthetic-data filtering, checkpoint selection or other model-development feedback.

---

## 27. Explicitly rejected for now

Not approved merely because they sound advanced:

- generic platform expansion as the moat;
- raw model voting;
- five judges by default;
- judge debate/deliberation before independent commitment;
- secret prompt as moat;
- paraphrasing as contamination solution;
- immediate IRT/complex latent-trait machinery;
- a TCJ-trained reward model before evidence justifies it;
- universal Thai truth claims.

---

## 28. Implementation baseline — 20 August 2026

### 28.1 Already live before vNext foundation

```text
TCJ Standard canonical core/profile architecture
Qwen semantic judge through Groq
raw vs calibrated diagnosis separation
versioned deterministic guards
deterministic score/verdict
methodology hashes
private tcj_evaluation_runs / guard applications / Batch2 links
public Voice privacy boundary
secure internal Batch2 route
36 human-labelled historical calibration cases
historical calibration runs for three candidate models
```

### 28.2 Implemented on 20 August 2026 as the first vNext foundation

Two migrations are now live:

```text
20260819225121  tcj_measurement_foundation_vnext
20260819225157  tcj_measurement_backfill_legacy36
```

New private measurement structures now exist for:

```text
evidence sets/items
judge candidates/passports/dimension metrics
admission campaigns/candidates/scenarios/generations/human reviews
panel runs/members/consensus
human review queue/judgments
contrast families/items/human validation
Assurance packs/items/exposure ledger
item-health records
```

Security boundary:

```text
RLS enabled on all new private TCJ tables
anon direct SELECT = false
authenticated direct SELECT = false
```

Backfill completed:

```text
3 evidence sets
  TCJ-LEGACY-CALIBRATION-36-v1
  TCJ-JUDGE-QUALIFICATION-v1
  TCJ-ASSURANCE-HOLDOUT-v1

36 legacy evidence items classified methodology_exposed
3 historical judge candidates
3 historical preliminary Judge Passports
18 per-dimension historical metrics
1 draft admission campaign: TCJ-JUDGE-ADMISSION-2026Q3-v1
```

The existing 36 cases are now structurally marked as ineligible for clean Assurance/final-qualification claims.

### 28.3 Not implemented yet

```text
fresh Stage A scenarios/candidate generations
blind Stage A review UI/service
robustness battery execution
fresh Qualification Bank content
blind ChatGPT/Grok dossier review workflow
formal qualified Judge Passports
parallel Panel runtime
shadow median consensus runtime
disagreement-to-human queue automation
random high-confidence audit sampling
Contrast Bank content
probabilistic reliability model
correlated-error treatment
fresh Assurance pack content
General-v2 multi-rater corpus
external native validation
production Panel/Assurance promotion
```

---

## 29. Completion plan and realistic timeline

### Timeline principle

Engineering is not the critical path. **Fresh hidden human evidence and external native review are the critical path.**

A realistic estimate from the 20 August 2026 baseline is:

```text
core engineering foundation     ~4–7 focused working days
first qualified Panel evidence  ~5–10 calendar days
Assurance-quality hidden bank   ~2–3 weeks
General-v2 / external validation ~3–6 weeks depending reviewer availability
```

Earliest credible full-architecture completion target, if reviewer access is smooth:

> **mid-to-late September 2026**

Conservative completion window:

> **late September to early October 2026**

These are planning windows, not promises. Acceptance gates outrank dates.

### Phase 0 — Freeze Standard baseline · 20 Aug

Record live engine/function versions, methodology hashes and schema checkpoint. No Panel work changes Standard behavior.

**Exit:** reproducible live baseline.

### Phase 1 — Prove TCJ research persistence · 20–21 Aug

Run the already-approved `B2-0021–0040` `answers-bff-v2` calibration rerun through the canonical TCJ path and compare raw model diagnosis, calibrated diagnosis, guards and frozen human decisions.

**Constraint:** must use the existing authenticated/internal route; do not create a weaker bypass merely to automate the rerun.

**Exit:** research-storage path proven end to end.

### Phase 2 — Measurement foundation · 20 Aug · IMPLEMENTED

Create evidence-bank, Passport, admission, Panel, human-loop, contrast, Assurance and item-health schema; backfill the legacy 36 cases and historical judge metrics.

**Exit:** completed and verified.

### Phase 3 — Admission backend + blind review UI · 20–21 Aug

Implement an authenticated admin-only admission service and a dedicated review page that never returns candidate identity/model information during Stage A.

**Exit:** reviewer can process globally randomized opaque responses without identity leakage.

### Phase 4 — Freeze candidate set + Stage A material · 21 Aug

Privately select candidate models, freeze comparable generation conditions, author/freeze 10 Stage A scenarios, generate responses, strip identity and globally randomize.

**Human workload:** approximately 50–60 blind responses for a 5–6 model campaign; expected concentrated native review approximately 2–4 focused hours, but quality outranks speed.

**Exit:** Stage A human decisions frozen.

### Phase 5 — Stage B + robustness · 21–22 Aug

Run surviving candidates on the legacy 36-case preliminary screen plus the robustness battery. Compute dimension error, false-fluent behavior, stability, structured-output reliability and injection/perturbation failures.

**Exit:** anonymous preliminary dossiers frozen.

### Phase 6 — Blind meta-review + identity reveal · 22–23 Aug

Run independent anonymous ChatGPT and Grok dossier reviews, freeze both, then reveal identities and verify provider/version/commercial constraints.

**Current operational dependency:** if no direct Grok/xAI integration is available, use a fresh independent Grok session/API externally and import the frozen result. Do not substitute a non-blind orchestrator and call it blind.

**Exit:** first formal qualification states assigned by dimension.

### Phase 7 — `tcj-panel-shadow` · 23–24 Aug

Build parallel internal-only Panel execution around qualified judges. Preserve per-judge raw/calibrated runs. Use robust median as shadow consensus only.

**Exit:** first Panel result can be reproduced from member runs.

### Phase 8 — Human escalation loop · 24–26 Aug

Connect material disagreement, uncertainty, new failure clusters and a small random high-confidence sample to blind human review.

**Exit:** human↔Panel delta begins accumulating without machine anchoring.

### Phase 9 — Fresh hidden Judge Qualification Bank · 24 Aug–2 Sep

Create genuinely new, human-first hidden qualification cases. Do not use them to tune prompts/guards before measurement.

Coverage emphasizes false-fluent risk, Thai pragmatics, semantic drift, register and composition.

No fixed case count automatically means “qualified”; continue until confidence is sufficient for the intended claim.

**Exit:** formal Judge Passports are supported by unseen evidence rather than the exposed 36 alone.

### Phase 10 — Thai Pragmatic Contrast Bank · 25 Aug–3 Sep

Build and blind-validate social-causal contrast families. Keep strongest items private.

**Exit:** directional pragmatic sensitivity can be measured.

### Phase 11 — Panel validity study · 27 Aug–4 Sep

Compare Standard vs shadow Panel vs blind humans on unseen evidence. Measure where Panel helps, where it does not, and where judges share blind spots.

**Exit:** Gate C evidence available.

### Phase 12 — Empirical reliability model · 1–6 Sep

Fit per-judge/per-dimension confusion or reliability distributions only after enough fresh human evidence exists. Compare against median on untouched cases.

**Exit:** probabilistic consensus adopted only if it improves unseen-human prediction; otherwise median remains.

### Phase 13 — Correlated-error study · 2–7 Sep

Measure residual judge-error correlation on shared human-labelled items. Add dependence treatment only if evidence justifies it.

**Exit:** correlation mechanism empirically adopted or explicitly rejected.

### Phase 14 — Uncertainty/escalation thresholds · 4–8 Sep

Calibrate when disagreement, low confidence or model-drift signals predict human mismatch. Do not choose thresholds cosmetically.

**Exit:** Gate D passes.

### Phase 15 — First Assurance Holdout + item QA · 3–9 Sep

Author genuinely new private Assurance items, obtain blind native validation, freeze the pack, create item-health records and manifest hash, and retire ambiguous/broken items rather than editing history.

**Exit:** Gate E candidate pack exists.

### Phase 16 — TCJ Assurance shadow · 8–12 Sep

Run hidden pack + qualified Panel + uncertainty + mandatory blind human audit sample + reproducible report, still private.

**Exit:** end-to-end Assurance report reproduces from immutable evidence.

### Phase 17 — General-v2 multi-rater program · 24 Aug–12 Sep in parallel

Recruit at least two independent native reviewers, with a third for disagreement/control cases. Build fresh General-Thai labels for `register_relationship_fit`, `discourse_delivery` and the other general dimensions under a documented population/scope.

**Exit:** General-v2 no longer rests mainly on one editorial authority or Answers-style labels.

### Phase 18 — External native-methodology validation · 7–18 Sep

Ask independent Thai reviewers to challenge case validity, labels, register/dialect assumptions and disagreement handling without being shown desired conclusions first.

**Exit:** external concerns are either resolved by evidence or cause a versioned methodology revision.

### Phase 19 — Commercial/operational hardening · 10–18 Sep

Freeze provider/version provenance, report schema, rate/budget controls, buyer-facing claim boundaries, pack exposure handling and requalification triggers.

**Exit:** no commercial claim exceeds measured evidence.

### Phase 20 — Production promotion · target 14–30 Sep, conservative early Oct

Promote only after Gates A–F pass:

```text
TCJ Standard   LIVE baseline
TCJ Panel      LIVE higher-confidence mode
TCJ Assurance  LIVE high-assurance mode
```

If a gate fails, the relevant mode stays shadow regardless of calendar date.

---

## 30. Acceptance gates

### Gate A — human evidence integrity

Pass only if human review is blind, machine reveal follows freeze, evidence banks are separated and ambiguous human cases remain visible.

### Gate B — judge qualification

Pass only if production + judging competence are measured, per-dimension state exists, robustness failures are recorded, model versions are pinned, and final authority is not based solely on the exposed 36 cases.

### Gate C — Panel validity

Pass only if Panel performance against unseen blind-human evidence is measured and disagreement is not hidden behind arithmetic.

### Gate D — uncertainty validity

Pass only if escalation/uncertainty behavior is calibrated on frozen evidence rather than cosmetic thresholds.

### Gate E — Assurance integrity

Pass only if hidden packs have independent human validation, exposure tracking, pack freeze and item-health review.

### Gate F — General Thai claim expansion

A broader `general-v2` claim requires multi-rater native evidence built specifically for General Thai constructs and a documented reviewer population/scope.

---

## 31. Engineering invariants

1. No raw majority vote.
2. Thai competence outranks provider diversity.
3. Admission remains blind until the defined reveal point.
4. Generation competence and judging competence are separate gates.
5. Same Stage A scenarios for every candidate.
6. Global randomization hides candidate grouping.
7. Human labels freeze before machine/meta-review influence.
8. ChatGPT/Grok meta-review is analysis, not voting authority.
9. Judge qualification is model-version-specific.
10. Per-dimension competence controls production authority.
11. Candidate response is untrusted data.
12. Production judges diagnose independently.
13. Raw evidence remains immutable and separate from calibration.
14. Median consensus is shadow/transitional only.
15. No statistical weighting without human evidence.
16. Correlated model agreement is not automatically independent confirmation.
17. Disagreement is preserved.
18. TCJ may return uncertainty rather than false certainty.
19. Human escalation is normal architecture, not failure.
20. Random high-confidence audits protect against shared blind spots.
21. Human disagreement is preserved rather than forced to consensus.
22. Evidence used for tuning leaves the Assurance Holdout.
23. The historical 36 cases are never promoted back into clean holdout status.
24. Exposed hidden packs can be retired.
25. Broken items are versioned/retired, not silently rewritten.
26. Server owns authoritative aggregation and verdict rules.
27. Answers editorial authority and General-Thai population claims remain distinct.
28. Historical Answers-style labels cannot be presented as complete General-Thai validation.
29. Panel/Assurance results include uncertainty and provenance, not only one score.
30. Commercial benchmark access does not imply model-development rights.
31. Measure before promotion.
32. Every new layer must address an observed failure or measurable validity need.

---

## 32. Short mental model

```text
1. HUMAN STANDARD
What does good Thai mean for this profile/population?

2. JUDGE ADMISSION
Which models earned the right to judge it, and on which dimensions?

3. TCJ PANEL
What do qualified independent judges conclude?

4. UNCERTAINTY
Where do qualified judges disagree, drift or share blind spots?

5. EVIDENCE
What frozen human/model history supports the conclusion?
```

Operational loop:

```text
NATIVE-HUMAN EVIDENCE
        ↓
JUDGE ADMISSION + PASSPORTS
        ↓
QUALIFIED PANEL
        ↓
DIMENSION EVIDENCE
        ↓
CONSENSUS + UNCERTAINTY
        ↓
TRIGGERED / RANDOM BLIND HUMAN REVIEW
        ↓
HUMAN–MODEL DELTA
        ↓
FUTURE CALIBRATION / REQUALIFICATION
```

---

## 33. Defensibility principle

A competitor can copy dimension names, JSON schema, score formulas, public prompt language and three-provider API calls.

The hard-to-copy layer is:

```text
years of blind native-human evidence
versioned Judge Passports
private pragmatic contrast families
hidden Assurance packs
human ambiguity records
cross-judge error correlations
longitudinal model-version drift
raw → calibrated → Panel → human delta history
buyer/domain-specific calibration evidence
```

> **Time and disciplined evidence accumulation are part of TCJ's defensibility.**

---

## 34. Research basis for this revision

The architecture is informed by current evaluation methodology reviewed on 20 August 2026, including work on benchmarking evaluators, blinded expert grading, mixed human/model evaluation, uncertainty/statistical validity, LLM-judge bias and instability, human anchoring from model suggestions, and benchmark contamination.

The detailed source list remains:

- OpenAI — PaperBench  
  <https://openai.com/index/paperbench/>
- OpenAI — GDPval  
  <https://openai.com/index/gdpval/>
- OpenAI — A shared playbook for trustworthy third-party evaluations  
  <https://openai.com/index/trustworthy-third-party-evaluations-foundations/>
- Anthropic — Demystifying evals for AI agents  
  <https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents>
- NIST AI 800-3 — Expanding the AI Evaluation Toolbox with Statistical Models  
  <https://www.nist.gov/publications/expanding-ai-evaluation-toolbox-statistical-models>
- Shi et al. — Judging the Judges: position bias in LLM-as-a-Judge  
  <https://aclanthology.org/2025.ijcnlp-long.18/>
- Haldar & Hockenmaier — Rating Roulette: self-inconsistency in LLM-as-a-Judge  
  <https://aclanthology.org/2025.findings-emnlp.1361/>
- Schroeder, Roy & Kabbara — Just Put a Human in the Loop?  
  <https://aclanthology.org/2025.findings-acl.1323/>
- Sun et al. — The Emperor's New Clothes in Benchmarking?  
  <https://proceedings.mlr.press/v267/sun25t.html>

These sources inform design choices; they do not make TCJ equivalent to any one laboratory's evaluation system.

---

## 35. Execution checkpoint · 20 August 2026

At this checkpoint:

```text
architecture weakness: exposed 36-case bank         PATCHED
architecture weakness: General evidence mismatch    PATCHED
realistic timeline                                  RECORDED
measurement schema                                  LIVE
legacy evidence classification                      LIVE
historical preliminary Judge Passports              LIVE
draft Judge Admission campaign                      LIVE
Stage A content/review                               NEXT
Panel runtime                                        NOT LIVE
Assurance                                            NOT LIVE
```

The next implementation step is **Phase 3: admission backend + blind review UI**, while Phase 1's B2 calibration rerun should be executed through the existing authenticated route as soon as the invocation path is available without weakening security.

---

## 36. Final governing statement

> **TCJ Panel is not three AIs voting. It is a native-human-grounded measurement system that qualifies judges before trusting them, records where each judge fails, keeps calibration and holdout evidence separate, combines only qualified dimension evidence, preserves uncertainty and disagreement, returns difficult or randomly audited cases to blind humans, and compounds that human–model delta into a private evidence base that makes future TCJ judgments more defensible and harder to reproduce.**
