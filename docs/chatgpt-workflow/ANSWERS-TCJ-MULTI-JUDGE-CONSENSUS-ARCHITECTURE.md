# TCJ — Multi-Judge Consensus & Measurement Architecture

**Status:** APPROVED METHOD · PARTIAL FOUNDATION IMPLEMENTED · PANEL/ASSURANCE NOT YET LIVE  
**Approved:** 20 August 2026  
**Updated:** 20 August 2026 · expert-operable control plane added; evidence-bank weaknesses and realistic completion plan retained  
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

Judge qualification, native-human evidence, disagreement, uncertainty, hidden challenge material, benchmark integrity and longitudinal judge behavior are first-class components.

A second product principle is equally important:

> **TCJ must be expert-operable by design.**

The measurement system should be operable directly by a domain expert who may not write SQL, scripts or application code. The frontend is therefore not a cosmetic dashboard. It is a **methodology-aware control plane** that turns approved research procedures into constrained, auditable actions while the server remains the methodological authority.

This document does **not** change the current live TCJ Standard endpoint merely because the method is approved. The live parent architecture remains authoritative for deployed Standard behavior until a versioned promotion is explicitly accepted.

---

## 2. Strategic scope — what TCJ should and should not become

TCJ should **not** attempt to win a generic eval-platform feature race.

Generic tracing, experiment management, datasets, dashboards, annotation queues and generic LLM-as-judge tools are useful infrastructure, but they are not TCJ's defensible core.

TCJ's differentiated purpose is narrower:

> **Measure socially natural Thai behavior for a specific relationship, role, channel, communicative task and house profile — while also measuring how trustworthy the evaluator is.**

Long-term defensibility should come primarily from accumulated human-grounded evidence and measurement history, not from a secret prompt, a score formula or a dashboard.

The operator experience is strategically important because the domain expert should not need to translate every linguistic or methodological decision into an engineering ticket before the evidence loop can continue.

The desired loop is:

```text
native-language insight
        ↓
purpose-built control
        ↓
server-enforced experiment
        ↓
frozen evidence
        ↓
comparison / diagnosis
        ↓
methodology decision
        ↓
next controlled experiment
```

This shortens the time between expert judgment and measurable system improvement without weakening validity.

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

A third governing rule is:

> **The frontend may make rigorous methodology easy to operate, but it must never become the methodological authority.**

---

## 4. Expert-operable by design — the methodology-aware control plane

### 4.1 Product principle

TCJ should be usable as a serious measurement instrument by a native-language expert, editor, evaluator or research lead who does not need to write code.

This does **not** mean moving logic into the browser.

It means the interface exposes the approved workflow in human terms while the backend enforces the rules.

```text
DOMAIN EXPERT
sees:
scenario
candidate
review choices
progress
allowed next action
methodological status

        ↓

CONTROL PLANE
translates:
Generate sealed pool
Run remaining
Blind review
Accept / Edit / Rewrite
Freeze
Escalate
Run Panel
Run Assurance

        ↓

SERVER AUTHORITY
enforces:
identity blindness
evidence-bank separation
versioning
immutability
hashes
qualification state
retry policy
thresholds
provenance
access control
```

The interface should make the **correct research procedure the easiest available procedure**.

### 4.2 Why this matters

Most evaluation infrastructure sits at one of two extremes:

```text
developer infrastructure
API / SQL / notebooks / CLI / JSON
```

or:

```text
generic annotation software
easy to use
but methodologically shallow
```

TCJ should occupy the middle:

> **A rigorous measurement backend with a domain-expert operating surface.**

This matters because Thai pragmatic expertise is scarce. The person with the language judgment should be able to operate the evaluation loop directly rather than hand methodology to a coder who may not understand the linguistic distinction being measured.

### 4.3 Operator / server responsibility boundary

The human operator may:

- choose an approved workflow;
- provide or review natural-language evidence;
- make blind A/E/R judgments;
- edit or rewrite Thai where the protocol requires it;
- approve a freeze point when the protocol allows;
- inspect post-freeze evidence;
- initiate an approved shadow or Assurance run;
- inspect uncertainty, disagreement and known limitations.

The human operator must **not** manually control:

- candidate identity exposure before reveal;
- evidence-bank eligibility;
- whether an exposed case still counts as holdout;
- scoring formulas;
- hidden judge weights;
- whether a failed generation is silently retried until favorable;
- whether an invalid result is overwritten;
- whether a model bypasses admission;
- whether a review can be edited after freeze without versioned invalidation;
- whether a public/browser client can read private evidence directly.

Those remain server-owned.

### 4.4 The control plane is a state machine, not a collection of pages

Every workflow should have a versioned server state.

Example Judge Admission:

```text
draft
  ↓
candidate_set_frozen
  ↓
stage_a_generation
  ↓
pool_complete
  ↓
globally_randomized
  ↓
blind_human_review
  ↓
human_review_frozen
  ↓
stage_b
  ↓
meta_review_frozen
  ↓
identity_reveal
  ↓
passport_assigned
```

The browser renders the current state and valid next actions. It does not invent state transitions locally.

A button is therefore an **intent request**, not an authority grant.

### 4.5 Progressive disclosure protects methodology

The UI should reveal only what is valid at the current methodological stage.

Before blind review freeze:

```text
show:
scenario
candidate response
opaque response ID
allowed review controls

hide:
model
provider
family
candidate grouping
machine score
other judge output
aggregate candidate performance
```

After the defined reveal point, additional evidence may become visible.

The browser should never receive hidden metadata merely to hide it with CSS.

### 4.6 No-code does not mean low-rigor

The operator should not need to know:

```text
SQL table names
JWT structure
Edge Function names
database constraints
hash implementation
provider payload schema
retry backoff
RLS policy syntax
```

but the system must still perform all of those correctly.

The frontend should use language such as:

```text
Generate sealed pool
30 / 30 generated
Globally randomized
Open blind review
Decision frozen
Human final Thai saved
Stage B ready
Panel requires human review
```

rather than exposing infrastructure terminology unless diagnostics are intentionally opened.

### 4.7 Human review interaction contract

For Stage A and similar review workflows:

```text
ACCEPT
→ one-step save
→ human_final_text = candidate response
→ hash and freeze

EDIT
→ open candidate text in editable Thai field
→ human edits
→ explicit Save Edit
→ human_final_text + hash + decision freeze

REWRITE
→ open blank or explicitly reset editor
→ human rewrites
→ explicit Save Rewrite
→ human_final_text + hash + decision freeze
```

A/E/R without the human-final Thai is incomplete evidence.

If a UI defect freezes an EDIT/REWRITE without final text, that review must be **voided/versioned as invalid provenance**, not silently deleted or treated as valid.

### 4.8 Error handling is part of methodology

The UI must distinguish:

```text
transport retry
provider outage / 429 / 5xx

generation-contract failure
empty final answer
length exhaustion
invalid schema
unsupported model adapter

methodology block
campaign not frozen
review not open
holdout exposure
qualification failure

unexpected infrastructure error
```

Only genuinely retryable transport failures may be labeled safe to retry.

A generation-contract failure must not be repeatedly sampled until a favorable response appears.

The UI should say **Blocked** when the protocol is blocked, not generic “Paused.”

### 4.9 Resumable workflows without evidence corruption

Long operations should run in small idempotent steps.

Example:

```text
Run remaining 30
→ server executes one eligible cell
→ persists provenance
→ returns aggregate progress
→ browser requests next eligible cell
```

A network interruption must not:

- duplicate evidence;
- regenerate completed cells;
- alter randomized order;
- reset frozen decisions;
- expose candidate identities.

The workflow resumes from authoritative server state.

### 4.10 Mobile-first domain-expert operation

TCJ's expert-operable layer should remain usable on a phone because linguistic review does not inherently require a workstation.

Requirements:

- large readable Thai;
- one current judgment at a time;
- no horizontal data grids for primary review;
- safe tap targets;
- explicit save for destructive/final actions;
- no accidental native tap overlays that obscure state;
- clear reviewed/remaining count;
- keyboard-friendly Thai editing;
- preserved line breaks;
- low visual noise during blind review.

Desktop may expose richer research summaries, but the core human judgment path should remain mobile-capable.

### 4.11 Control-plane surfaces

Approved / intended surfaces:

```text
TCJ Research
/tcj-research.html
- research experiments
- calibration reruns
- Stage A generation status
- safe transition to blind review

TCJ Blind Admission Review
/tcj-admission-review.html
- opaque randomized responses
- A/E/R
- human-final Thai
- reason tags / notes
- frozen review progress

Future: Judge Passport
- anonymous before reveal where required
- per-dimension competence
- failure fingerprints
- requalification status

Future: Panel Operations
- run qualified panel
- individual evidence preserved
- disagreement / uncertainty
- escalation status

Future: Human Escalation Review
- blind-first cases
- random audit cases
- post-freeze Panel reveal
- human↔model delta capture

Future: Assurance
- pack selection subject to permission
- frozen manifest
- run progress
- human audit sample
- report generation
```

These are not generic CMS pages. Each is a constrained operational surface for one methodological role.

### 4.12 Server-side requirements for every control-plane action

Every consequential action should:

1. authenticate the operator;
2. authorize the operator for the specific workflow;
3. verify current server state;
4. verify the requested transition is allowed;
5. perform the smallest valid mutation;
6. persist provenance;
7. return only the minimum data needed by the UI;
8. remain safe under retry;
9. never weaken evidence blindness;
10. log enough information to reconstruct what happened.

### 4.13 Versioning

The following should be versioned independently where relevant:

```text
methodology
profile
judge adapter
campaign
scenario set
prompt/instruction
Edge Function
page/controller
database migration
report schema
```

A frontend change that affects what the human can see or how a human decision is recorded is a **methodologically relevant change**, not merely cosmetic.

### 4.14 Acceptance criteria for expert-operable design

This principle is considered implemented only if:

- a non-coder domain expert can complete the approved workflow without SQL/CLI/manual API calls;
- browser-visible controls cannot bypass server protocol;
- the operator can always tell what state the workflow is in;
- the operator can tell whether a failure is retryable or blocked;
- blind workflows do not deliver hidden identity metadata to the browser;
- frozen human decisions are immutable except through explicit versioned invalidation;
- EDIT/REWRITE preserve human-final Thai;
- every run can be reconstructed from backend provenance;
- page refresh or connection loss cannot corrupt evidence;
- control-plane convenience does not change evidence eligibility.

---

## 5. Three different kinds of authority must remain separate

### 5.1 `answers-bff`

The Answers profile measures an intentionally authored house/editorial voice.

```text
designated native editorial owner
        = final editorial authority
```

Independent native reviewers may still be useful for research and external validation, but this profile does not attempt to estimate an average Thai speaker.

### 5.2 `general-v1` live limitation

The current live General Thai profile is a practical evaluator. Its current human evidence must **not** be described as universal or population-level Thai ground truth.

### 5.3 Future `general-v2`

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

## 6. Human review must be blind before model evidence is shown

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

## 7. Human evidence is partitioned into three banks

### 7.1 Calibration Bank

Cases that may influence:

```text
rubric/profile wording
calibration rules
deterministic guards
failure taxonomy
judge adapters
```

Once a case influences methodology, it belongs here permanently for validity accounting.

### 7.2 Judge Qualification Bank

Fresh frozen cases used to determine whether candidate judges deserve production authority. Qualification evidence must remain separate from ordinary calibration development.

### 7.3 Assurance Holdout

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

### 7.4 Historical 36-case bank has a permanent evidence classification

The historical 36-case bank has already been used to compare candidate evaluators and influence TCJ methodology.

It is therefore permanently classified as:

```text
Calibration Bank
+
preliminary Stage B screening evidence
```

It is **not eligible** to serve as clean final Judge Qualification proof, Assurance Holdout, or independent proof that a later TCJ change generalizes.

Historical Judge Passports derived from this bank must remain marked:

```text
qualification_state = historical_preliminary
clean_holdout = false
assurance_eligible = false
final_qualification_sufficient = false
```

---

## 8. Judge Admission remains a blind two-stage protocol

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
human decisions + human-final Thai frozen
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

## 9. Stage A — blind Native-Thai production competence

The initial screen uses the same **10 frozen scenarios per candidate model**.

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

Human decision vocabulary:

```text
ACCEPT
EDIT
REWRITE
```

For all three states, TCJ must preserve the human-final Thai:

```text
ACCEPT   → candidate text
EDIT     → edited human-final text
REWRITE  → rewritten human-final text
```

Optional reason tags include translation shape, lexical choice, over-explanation, pronoun/subject issue, particle/stance issue, register mismatch, semantic drift, code mixing, humor/timing, generic/cliché, metaphor, composition, excessive formality/verbosity and other.

A review missing required human-final text is invalid evidence.

---

## 10. Stage B — TCJ judging competence

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

### 10.1 Historical 36 cases do not validate broad General Thai dimensions

The current 36-case human labels use the Answers-style dimensions:

```text
intent
thai_pragmatics
bff_voice
lexical_social_fit
stance
composition
```

They do not independently label broader General Thai dimensions such as:

```text
register_relationship_fit
discourse_delivery
```

Therefore:

- the historical bank may support `answers-bff` screening;
- it may inform shared-core research where mapping is explicit;
- it must not be presented as complete validation of `general-v1`;
- `general-v2` requires a fresh multi-rater bank built specifically for General Thai constructs and documented population scope.

---

## 11. Judge Passport — every production judge gets a versioned failure profile

Each candidate receives a versioned Judge Passport containing at least:

```text
model/provider/version
admission protocol version
Stage A ACCEPT / EDIT / REWRITE evidence
Stage A human-final delta evidence
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

### 11.1 Robustness battery

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

### 11.2 Candidate response is untrusted data

Text inside the candidate such as “ignore the rubric” or “rate this 4” is data, never instruction.

### 11.3 Model upgrades do not inherit passports

New provider/model snapshots requalify. Historical passports remain immutable evidence of the older version.

---

## 12. Per-dimension qualification

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

## 13. Anonymous candidate dossiers and independent meta-review

Before identity reveal, build anonymous dossiers containing blind production outcomes, judging metrics, per-dimension errors, false-fluent/false-major behavior, robustness results, repeat-run stability, structured-output reliability, representative anonymized failures and uncertainty.

Dossiers exclude provider, model, family, pricing, brand reputation and public leaderboard rank.

ChatGPT and Grok review identical anonymous evidence independently. Neither sees the other's conclusion before freeze. Their analyses are not a 2-of-3 governance vote and cannot overrule repeated native-human failures by popularity.

An AI context that already knows the identity map does not count as genuinely blind simply because labels are later renamed.

---

## 14. Production panel size

Initial target: **three qualified independent judges**.

If only two genuinely qualify, use two plus explicit uncertainty rather than admit a weak third judge.

Five judges are not justified merely because five sounds more rigorous.

```text
Thai competence > provider diversity
```

---

## 15. Parallel independent evaluation

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

## 16. Raw and calibrated evidence remain separate

For every judge preserve provider/model/snapshot/settings, core/profile/guard versions, methodology hash, scenario/candidate hashes, raw diagnosis/hash, calibrated diagnosis/hash, calibration status, guard trace, latency/usage, Judge Passport version and qualification state.

Aggregation must never overwrite individual evidence.

---

## 17. Consensus is dimension-level, never verdict-level voting

Raw majority verdict voting remains prohibited.

### 17.1 Shadow implementation — robust median

Median may be used in the first shadow implementation because it is simple, auditable and robust to one extreme value.

> **Median consensus is transitional experimental machinery, not the intended final premium measurement method.**

### 17.2 Target implementation — human-calibrated reliability model

When enough fresh frozen human evidence exists, estimate each judge's behavior per dimension and derive a distribution over the human-grounded state rather than treating each judge as an equally trustworthy integer.

No probabilistic weighting becomes production authority until:

```text
human evidence is sufficient
method is frozen
assumptions are documented
shadow results improve unseen-human prediction versus the simpler baseline
```

### 17.3 Correlated judge errors

Three APIs are not automatically three independent measurements. Residual errors against blind human evidence must be measured before any correlation correction is introduced. No invented correlation penalties are permitted.

---

## 18. Disagreement and uncertainty are first-class outputs

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

## 19. Human escalation is normal operation

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

## 20. Native-human authority does not mean one universal Thai truth

```text
Answers editorial-owner judgment
        = house-style/corpus authority

General Thai multiple native judgments
        = empirical reference evidence for a documented population/scope
```

Neither should be described as metaphysical ground truth.

---

## 21. Thai Pragmatic Contrast Bank

Build private human-designed minimal or near-minimal pairs where one socially causal variable changes:

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

## 22. Contamination resistance — use genuinely new hidden material

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

## 23. Benchmark QA attacks TCJ itself

Every evidence item should maintain item-health evidence including human agreement/ambiguity, judge disagreement, observed difficulty, discrimination, known shortcuts, formatting sensitivity, exposure state, review history and retirement reason.

Automated investigators may flag suspicious items, but humans should form independent judgments before seeing machine proposals when anchoring risk exists.

Broken, ambiguous or compromised items are versioned/retired, not silently rewritten.

---

## 24. Product modes

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

## 25. Do not reduce serious results to one 0–100 score

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

## 26. Strategic private assets / copy resistance

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

The expert-operable control plane strengthens this moat operationally because it lets the domain expert generate high-quality evidence faster and more consistently. The screens themselves are copyable; the accumulated frozen evidence and the server-enforced history behind them are not.

> **The frontend is an accelerator of the moat, not the moat by itself.**

---

## 27. Research assets must not collapse into training rights

```text
Benchmark Use
≠
Model-Development Use
```

TCJ scores, diagnoses, flags, disagreement evidence, human audits and Assurance reports do not automatically grant rights for training, fine-tuning, preference optimization, reward modeling, distillation, synthetic-data filtering, checkpoint selection or other model-development feedback.

---

## 28. Explicitly rejected for now

Not approved merely because they sound advanced:

- generic platform expansion as the moat;
- raw model voting;
- five judges by default;
- judge debate/deliberation before independent commitment;
- secret prompt as moat;
- paraphrasing as contamination solution;
- immediate IRT/complex latent-trait machinery;
- a TCJ-trained reward model before evidence justifies it;
- universal Thai truth claims;
- moving authoritative methodology into client-side JavaScript;
- exposing hidden metadata to the browser and relying on CSS to hide it;
- generic admin CRUD that allows operators to bypass evidence-state rules;
- retry-until-success behavior for non-transport model failures.

---

## 29. Expert-operable implementation architecture

### 29.1 Control-plane backend pattern

Use one server-mediated action contract per methodological workflow.

```text
browser
  ↓ authenticated intent
workflow Edge Function / service
  ↓
auth + authorization
  ↓
state validation
  ↓
methodology validation
  ↓
small atomic mutation / run step
  ↓
append provenance
  ↓
minimal response
```

Do not give the browser general database access to private TCJ research tables.

### 29.2 Data model pattern

Each workflow should separate:

```text
definition
state
evidence
provenance
human judgment
derived result
```

Example Judge Admission:

```text
tcj_admission_campaigns
tcj_admission_campaign_candidates
tcj_admission_scenarios
tcj_admission_generations
tcj_admission_generation_failures
tcj_admission_human_reviews
```

This lets the UI remain simple while the backend remains reconstructable.

### 29.3 Command semantics

Prefer explicit commands:

```text
status
run_next
next_review
save_review
freeze
review_summary
```

over generic client-side CRUD.

The command validates protocol state before mutation.

### 29.4 Aggregate progress only where blindness requires it

During sealed generation, the browser may receive:

```text
generated = 17
pending = 13
state = ready
```

but not:

```text
Candidate A = 10/10
Candidate B = 7/10
Candidate C = 0/10
```

if that distribution could reveal candidate identity or bias the reviewer.

### 29.5 Human-edit storage

Stage A human review storage must include:

```text
decision
human_final_text
human_final_sha256
reason_tags
review_note
blind_review
frozen_at
voided_at
void_reason
```

`ACCEPT` stores the original candidate as human-final text.

`EDIT` / `REWRITE` require changed human-final text.

A voided row stays in history but does not count as active review evidence.

### 29.6 Retry provenance

Generation should preserve:

```text
failure_class
attempt_count
last_http_status
error_code
first_failed_at
last_failed_at
next_retry_at
resolved_at
error_meta
```

Retryable transport failure and protocol-invalid generation failure are different states.

### 29.7 Frontend/controller separation

The visual page may be versioned separately from its controller.

This enables:

- backup before surgical fixes;
- isolated page logic;
- centralized shell stability;
- independent audit of review behavior;
- rollback without touching the methodology tables.

Central shell/auth code should not be changed merely to fix one TCJ workflow.

### 29.8 Future operator surfaces

Build in this order:

1. Research control plane.
2. Blind Admission Review.
3. Judge Passport inspector.
4. Panel shadow control.
5. Human escalation review.
6. Contrast-bank authoring/validation.
7. Assurance run control.
8. Assurance report viewer/export.

Do **not** build generic CRUD for all tables first.

### 29.9 Domain-expert workflow design rule

For every future page ask:

> **What methodological decision is the expert making here?**

If the answer is unclear, the page probably should not exist.

The interface should be organized around decisions, not database entities.

---

## 30. Implementation baseline — 20 August 2026

Already live or implemented in the vNext foundation:

```text
TCJ Standard canonical core/profile architecture
raw vs calibrated diagnosis separation
versioned deterministic guards
deterministic score/verdict
methodology hashes
private TCJ research tables
evidence-bank separation
historical preliminary Judge Passports
Judge Admission campaign structures
sealed candidate generation
global randomization
blind review service
blind review mobile UI
human A/E/R review
human-final Thai + hash
review invalidation/void provenance
research control page
server-side retry/failure provenance
```

Current expert-operable proof points include:

```text
/tcj-research.html
- operator can run approved research jobs without SQL/API work
- aggregate progress only where blindness requires it

/tcj-admission-review.html
- operator reviews one randomized Thai response at a time
- model identity remains server-hidden
- A/E/R maps to frozen backend evidence
- EDIT/REWRITE capture human-final Thai
```

This proves the control-plane concept on a real TCJ workflow before Panel/Assurance exists.

---

## 31. Completion plan and realistic timeline

### Timeline principle

Engineering is not the critical path. **Fresh hidden human evidence and external native review are the critical path.**

Realistic planning window from the 20 August 2026 baseline:

```text
control-plane + core engineering foundation  ~4–7 focused working days
first qualified Panel evidence               ~5–10 calendar days
Assurance-quality hidden bank                ~2–3 weeks
General-v2 / external validation             ~3–6 weeks depending reviewer availability
```

Earliest credible full-architecture completion target:

> **mid-to-late September 2026**

Conservative completion window:

> **late September to early October 2026**

Acceptance gates outrank dates.

### Phase 0 — Freeze Standard baseline

Record live engine/function versions, methodology hashes and schema checkpoint. Panel work must not change Standard behavior.

### Phase 1 — Research persistence

Run frozen human-reviewed material through the canonical TCJ research path and verify raw diagnosis, calibrated diagnosis, guards and human comparison persist correctly.

### Phase 2 — Measurement foundation

Evidence-bank, Passport, admission, Panel, human-loop, contrast, Assurance and item-health schema.

**Status:** implemented.

### Phase 3 — Expert-operable admission control plane

Authenticated server-mediated generation + globally randomized blind review UI + human-final text capture + immutable freeze/void semantics.

**Status:** materially implemented; Stage A review in progress.

### Phase 4 — Complete Stage A human evidence

Finish blind A/E/R review for the current frozen candidate pool.

**Exit:** all active Stage A human reviews frozen with valid human-final Thai.

### Phase 5 — Stage B + robustness

Run surviving candidates on the legacy 36-case preliminary screen plus robustness battery.

### Phase 6 — Blind meta-review + identity reveal

Independent anonymous ChatGPT and Grok dossier reviews; freeze before identity reveal.

### Phase 7 — Judge Passport control plane

Build expert-readable Passport view showing competence, uncertainty, known failures, qualification state and requalification conditions.

### Phase 8 — `tcj-panel-shadow`

Build server-side parallel execution plus an operator control surface. Preserve individual runs and use median only as shadow consensus.

### Phase 9 — Human escalation control plane

Build blind-first escalation and random high-confidence audit workflow.

### Phase 10 — Fresh hidden Judge Qualification Bank

Create genuinely new human-first hidden qualification evidence.

### Phase 11 — Thai Pragmatic Contrast Bank

Build and blind-validate social-causal contrast families, with a constrained author/validate workflow rather than raw table editing.

### Phase 12 — Panel validity study

Compare Standard vs shadow Panel vs blind humans on unseen evidence.

### Phase 13 — Empirical reliability model

Fit only after enough fresh human evidence exists; compare against median on untouched cases.

### Phase 14 — Correlated-error study

Measure residual judge-error correlation before dependence treatment.

### Phase 15 — Uncertainty/escalation thresholds

Calibrate thresholds on frozen human evidence.

### Phase 16 — First Assurance Holdout + item QA

Author, validate, freeze, hash and exposure-track a genuinely new private pack.

### Phase 17 — Assurance control plane

Build guided run flow:

```text
select approved pack
→ validate model/settings
→ run qualified Panel
→ perform required blind human audit
→ freeze
→ generate reproducible report
```

### Phase 18 — General-v2 multi-rater program

Recruit independent native reviewers and build broader General Thai evidence.

### Phase 19 — External native-methodology validation

Independent reviewers challenge case validity, labels, register/dialect assumptions and disagreement handling.

### Phase 20 — Commercial/operational hardening

Freeze provider/version provenance, budgets, report schema, buyer-facing claim boundaries, pack exposure and requalification triggers.

### Phase 21 — Production promotion

Promote only after Gates A–G pass:

```text
TCJ Standard   LIVE baseline
TCJ Panel      LIVE higher-confidence mode
TCJ Assurance  LIVE high-assurance mode
```

---

## 32. Acceptance gates

### Gate A — human evidence integrity

Human review is blind, machine reveal follows freeze, evidence banks are separated, ambiguity remains visible, and EDIT/REWRITE preserve human-final Thai.

### Gate B — judge qualification

Production and judging competence are measured, per-dimension state exists, robustness failures are recorded, versions are pinned, and final authority is not based solely on the exposed 36.

### Gate C — Panel validity

Panel performance against unseen blind-human evidence is measured and disagreement is not hidden behind arithmetic.

### Gate D — uncertainty validity

Escalation/uncertainty behavior is calibrated on frozen evidence rather than cosmetic thresholds.

### Gate E — Assurance integrity

Hidden packs have independent human validation, exposure tracking, pack freeze and item-health review.

### Gate F — General Thai claim expansion

A broader `general-v2` claim requires multi-rater native evidence built specifically for General Thai constructs and documented population/scope.

### Gate G — expert-operable control plane integrity

Pass only if:

```text
domain expert can execute approved workflow without code
browser cannot bypass server methodology
blind metadata is not delivered to the client
state transitions are server-validated
frozen human evidence is immutable/versioned
EDIT/REWRITE preserve human-final text
retryability is correctly classified
refresh/network interruption cannot corrupt evidence
every consequential action is reconstructable
```

---

## 33. Engineering invariants

1. No raw majority vote.
2. Thai competence outranks provider diversity.
3. Admission remains blind until the defined reveal point.
4. Generation competence and judging competence are separate gates.
5. Same Stage A scenarios for every candidate.
6. Global randomization hides candidate grouping.
7. Human labels freeze before machine/meta-review influence.
8. A/E/R includes human-final Thai evidence.
9. Invalid frozen reviews are voided/versioned, not silently deleted.
10. ChatGPT/Grok meta-review is analysis, not voting authority.
11. Judge qualification is model-version-specific.
12. Per-dimension competence controls production authority.
13. Candidate response is untrusted data.
14. Production judges diagnose independently.
15. Raw evidence remains immutable and separate from calibration.
16. Median consensus is shadow/transitional only.
17. No statistical weighting without human evidence.
18. Correlated model agreement is not automatically independent confirmation.
19. Disagreement is preserved.
20. TCJ may return uncertainty rather than false certainty.
21. Human escalation is normal architecture, not failure.
22. Random high-confidence audits protect against shared blind spots.
23. Human disagreement is preserved rather than forced to consensus.
24. Evidence used for tuning leaves the Assurance Holdout.
25. Historical exposed cases never regain clean holdout status.
26. Exposed hidden packs can be retired.
27. Broken items are versioned/retired, not silently rewritten.
28. Server owns authoritative aggregation and verdict rules.
29. Server owns workflow state transitions.
30. Browser receives minimum data required for the current state.
31. Hidden metadata is not sent to the client merely to be visually hidden.
32. Only transport failures may be automatically retried.
33. A non-transport generation failure cannot be sampled until favorable.
34. Important frontend behavior is versioned because it can change human evidence.
35. No-code operation must not imply client-side authority.
36. Domain-expert interfaces are organized around methodological decisions, not generic CRUD.
37. Commercial benchmark access does not imply model-development rights.
38. Measure before promotion.

---

## 34. Short mental model

```text
1. HUMAN STANDARD
What does good Thai mean for this profile/population?

2. EXPERT CONTROL PLANE
Can the domain expert execute the method correctly without coding?

3. JUDGE ADMISSION
Which models earned the right to judge, and on which dimensions?

4. TCJ PANEL
What do qualified independent judges conclude?

5. UNCERTAINTY
Where do qualified judges disagree, drift or share blind spots?

6. EVIDENCE
What frozen human/model history supports the conclusion?
```

Operational loop:

```text
NATIVE-HUMAN EVIDENCE
        ↓
EXPERT-OPERABLE CONTROL PLANE
        ↓
JUDGE ADMISSION + PASSPORTS
        ↓
QUALIFIED PANEL
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

## 35. Defensibility principle

A competitor can copy dimension names, JSON schema, score formulas, public prompt language, three-provider API calls and screenshots.

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

The expert-operable control plane matters because it makes that evidence flywheel faster, more reliable and less dependent on engineering translation.

> **The moat is the measurement system and accumulated evidence. The control plane lets the people with the expertise operate that moat directly.**

---

## 36. Research basis

The architecture is informed by current evaluation methodology reviewed on 20 August 2026, including work on benchmarking evaluators, blinded expert grading, mixed human/model evaluation, uncertainty/statistical validity, LLM-judge bias and instability, human anchoring from model suggestions, and benchmark contamination.

Key sources previously reviewed include:

- OpenAI — PaperBench
- OpenAI — GDPval
- OpenAI — A shared playbook for trustworthy third-party evaluations
- Anthropic — Demystifying evals for AI agents
- NIST AI 800-3 — Expanding the AI Evaluation Toolbox with Statistical Models
- Shi et al. — Judging the Judges
- Haldar & Hockenmaier — Rating Roulette
- Schroeder, Roy & Kabbara — Just Put a Human in the Loop?
- Sun et al. — The Emperor's New Clothes in Benchmarking?

These sources inform design choices; they do not make TCJ equivalent to any one laboratory's evaluation system.

---

## 37. Final governing statement

> **TCJ Panel is not three AIs voting. It is a native-human-grounded measurement system that qualifies judges before trusting them, records where each judge fails, keeps calibration and holdout evidence separate, combines only qualified dimension evidence, preserves uncertainty and disagreement, returns difficult or randomly audited cases to blind humans, and compounds that human–model delta into a private evidence base. Its expert-operable control plane lets domain experts run that rigorous methodology without writing code, while the server—not the interface—continues to own methodological authority, state, provenance and validity.**
