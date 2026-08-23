# TCJ Phase B Checkpoint — Focus-Normalized PEE, Professional Judge Role, and Fresh Development Validation

**Date:** 23 August 2026  
**Status:** active research checkpoint; exposed-bank tuning intentionally stopped  
**Canonical Supabase:** `sjpvhgxacsiorrtijqua`  
**Selected development reference judge:** Gemini 3.5 Flash-Lite  
**Production authority:** none

## 1. Plain-language state

TCJ's main problem was not that Gemini needed more clever prompting. The private evidence system was often looking in the wrong part of the corpus and then asking lexical similarity to do too much.

The simpler architecture is now:

1. **Understand what the conversation is about.** Normalize messy Thai, English, aliases, slang and typos into canonical conversational focuses, using the same reachability principle that solved the Book of Answers routing problem.
2. **Go to the right private neighborhood.** Pull only private voice evidence that is relevant to that conversational focus before calculating bounded evidence.
3. **Recognize licensed weirdness.** Some Thai looks suspicious to a literal model but is normal in the target voice: mock politeness, hyperbole, deliberate compression, dry irony, etc. Keep a small human-approved mechanism bank so unusual surface form is not automatically treated as a defect.
4. **Do not whitelist whole categories.** Code-switching, for example, can be excellent or terrible. TCJ now distinguishes ordinary mixed Thai/English from badly integrated English load or a register collision.
5. **Give the model a real professional job.** For Answers BFF, Gemini judges as a senior Thai magazine/conversation editor, not as a generic helpful assistant. Future profiles can use the analogous professional frame, e.g. Thai customer-service QA editor for a bank.
6. **Judge the boundary that actually matters.** Native-human authority clarified that `PASS` and `MINOR` are broadly on the usable side, while `MAJOR` and `CRITICAL` are on the failed side. The important error is crossing the `MINOR` / `MAJOR` boundary. Exact `PASS↔MINOR` and `MAJOR↔CRITICAL` agreement remains diagnostic, not the primary optimization target.

This checkpoint intentionally follows the principle:

> sophisticated ≠ complicated

The system should be explainable to a non-developer buyer as native editorial reasoning made secure, repeatable and private.

## 2. Why the architecture changed

The old private evidence path compared the candidate against a broad private anchor bank and relied heavily on text similarity. That conflated two separate questions:

- **Which private evidence is relevant to this conversation?**
- **What does that relevant evidence say about the candidate?**

The Book of Answers had already solved the first problem through canonical focus normalization and reachability routing. TCJ now uses that same class of solution before private evidence assessment.

The private 968-anchor voice bank already carried Book-derived `focus`, `topics` and `support` metadata. The 948 legacy anchors exactly preserve the corresponding Book metadata, so the routing knowledge did not need to be recreated from scratch.

## 3. Focus-normalized private evidence

Current research components include:

- frozen Book taxonomy snapshot: `TCJ-SEMANTIC-TAXONOMY-ANSWERS-r127`
- TCJ semantic overlay taxonomy for concepts not covered by the Book
- context-matched private anchor neighborhood retrieval
- context-relative structural/advisor/register/code-switch evidence
- licensed-weirdness / licensed-mechanism bank
- bounded evidence only; no raw examples or row identifiers exported to the judge

A typical flow is now:

```text
scenario
→ semantic normalization
→ canonical focus / topic / overlay concepts
→ relevant private neighborhood
→ family-specific bounded evidence
→ professional-role semantic judge
→ usable / failed boundary + diagnostic dimensions
→ independent release policy
```

Private evidence remains server-only. Raw corpus rows, nearest proprietary examples, row IDs, human edit pairs and arbitrary corpus search are still prohibited from reaching the external judge.

## 4. Licensed weirdness bank

The private corpus contains many human-approved examples of a small number of mechanisms that can look suspicious to literal models. Initial families include examples such as:

- mock-polite BFF particles
- performative / hyperbolic directives
- licensed compression
- complete micro-line composition
- dry ironic reframing
- other explicitly human-attested voice mechanisms

The bank is not a blanket PASS whitelist. Its meaning is narrower:

> this particular unusual mechanism is not, by itself, a valid reason to fail the response.

A separate real defect can still fail the response. A proven structural failure also overrides any licensed surface mechanism.

### Code-switch correction

`natural_code_switch` is no longer treated as a positive licensed-quality exception.

The correct rule is:

> mixed Thai/English is normal enough that the fact of mixing is non-diagnostic; integration quality still has to be judged.

Research PEE v10 distinguishes:

- ordinary mixed-script language → do not reward or punish merely for mixing;
- extreme Latin-heavy / long-form outlier → strong integration warning;
- context-mismatched formal-register collision → strong register warning.

On the exposed 48-case bank, the two definition-level anomaly rules used for this correction had zero usable-human false flags:

- heavy code-switch integration outlier flagged only `Q3-028` (human MAJOR);
- context-mismatched formal-register collision flagged `Q3-020` and `Q3-042` (both human serious).

The follow-up six-case Gemini sanity run (`run 26`) was intentionally stopped at **0 provider requests** because the shadow evidence audit was sufficient and the user explicitly directed the project not to chase exposed-bank perfection.

## 5. Professional judge role

Gemini's generic-assistant priors were a recurring source of error. It tended to prefer safer, more empathetic, more literal or more formally complete answers even when those preferences were not the target house voice.

The Answers profile now frames the semantic model as:

> a senior Thai magazine/conversation editor responsible for approving finished copy for the Answers BFF house voice.

It is explicitly **not** the friend, counselor, safety advisor, author or factual-answering assistant.

This role is intended to become a formal Voice Profile field rather than a Gemini-specific hack. Other customers can use an equivalent professional QA frame appropriate to their domain.

## 6. Human severity boundary

The human authority clarified the operational meaning of the four severity labels:

```text
PASS  ┐
       ├─ broadly usable
MINOR ┘

MAJOR ┐
       ├─ failed / substantial repair required
CRITICAL ┘
```

Therefore the primary development metric is **band correctness** at the `MINOR / MAJOR` boundary.

The six dimension ratings and four exact labels remain useful diagnostics, but TCJ must not be tuned as though the human scores were a mathematically perfect interval scale.

## 7. Exposed 48-case result

The original Gemini mandatory-PEE run (`run 8`) on the exposed 48-case development bank had:

```text
usable/failure band correct: 39 / 48 = 81.25%
false usable on human failure: 5
false failure on human usable: 4
```

The simplified focus-normalized PEE + Thai-editor-role + banded release run (`run 25`) completed all 48 cases with no terminal semantic/protocol failures:

```text
usable/failure band correct: 44 / 48 = 91.67%
false usable on human failure: 2
false failure on human usable: 2
provider requests: 53
mandatory evidence calls: 48
optional second PEE calls: 3
terminal failures: 0
```

This is a material improvement in the operational boundary that matters, but it is **not** being treated as a reason to keep tuning until 48/48.

The remaining exposed errors were useful only to identify the general code-switch/register definition correction above. Exposed-bank model tuning stops here.

## 8. Fresh development validation bank — active human gate

A new 24-case bank has now been created for human-first development validation.

```text
Evidence set key: TCJ-DEVELOPMENT-VALIDATION-BANK-2026Q3-v1
Evidence set id: 8
Bank type: calibration (development validation semantics)
Protocol key: TCJ-DEVELOPMENT-VALIDATION-2026Q3-v1
Protocol id: 5
Cases: 24
Protocol state: draft_review
Bank state: draft
Gemini exposure: false
Qualification 2.0 reuse: false
Threshold SHA: 11e3e2448e048633925e6dc7148323021f57282d5da1c471a5b5a7a997dd1c06
```

The case-design labels are hypotheses only and are hidden from the human review UI. Native-human review is authoritative.

The 24 cases cover both ordinary and adversarial conversational mechanisms, including:

- performative hyperbole
- mock-polite BFF language
- same-concern reassurance under unavailable facts
- integrated code-switching
- dry irony
- complete micro-line composition
- deliberate omission
- mild peer advice
- slang/social fit
- principled uncertainty
- rhetorical answers
- playful mock-formality
- unrecoverable structure
- advisor overbuild
- concrete non-answer
- register collision
- heavy code-switch integration failure
- cutesy minimization
- hierarchy mismatch
- literal high-stakes reckless advice
- awkward management-style code-switch calque
- semantic drift
- broken fragmentation
- generic assistantese

### Human review page

Private admin page:

`https://flipgazine.pages.dev/tcj-development-validation-review.html`

Review behavior:

- scenario + candidate only;
- no Gemini output;
- no construction hypothesis;
- no PEE signal;
- user may edit a poorly constructed scenario/candidate;
- all six dimensions preserved as diagnostics;
- UI explicitly emphasizes `PASS/MINOR = usable` and `MAJOR/CRITICAL = failed`.

The dedicated review function is:

`tcj-development-validation-review-v1`

## 9. Pre-registered development-validation objective

This bank is **not** a commercial authority qualification. Its purpose is to answer one practical question:

> Does full TCJ materially improve the same low-tier Gemini over Gemini alone on fresh native-human-reviewed cases?

Primary comparison after human freeze:

```text
A = Gemini 3.5 Flash-Lite alone, professional neutral/banded judge contract
C = same Gemini + full current TCJ (methodology, voice profile, focus-normalized PEE, licensed mechanisms, release policy)
```

Development guidance was frozen before Gemini exposure:

- 24 valid cases;
- primary metric = usable/failure band accuracy;
- full TCJ target band accuracy ≥ 80%;
- boundary-error reduction versus model alone target ≥ 20%;
- full TCJ false-usable count must not exceed model alone;
- full TCJ false-usable count target ≤ 3;
- terminal protocol failures target = 0.

These are development guidance, not immutable commercial authority thresholds.

## 10. Immediate next action

**Native-human gate now.**

1. User reviews all 24 fresh cases at the private review page.
2. Do not expose these cases to Gemini before the human review is complete/frozen.
3. After 24/24 human review, freeze the human manifest/bank.
4. Run the same Gemini model in two conditions: model-alone vs full TCJ.
5. Score the `PASS/MINOR` vs `MAJOR/CRITICAL` boundary first. Exact severity and dimension MAE are secondary diagnostics.
6. If the simplified TCJ materially lifts low-tier Gemini without a new general architectural defect, stop development refinement and freeze the candidate runtime.
7. Only after candidate freeze: construct a new hidden native-human authority instrument.
8. Paid OpenAI/xAI balances remain untouched until the later post-freeze frontier authority experiment and still require explicit preflight approval.

## 11. Design principle for the remaining project

Before adding a mechanism, ask:

> Can the problem be represented more directly in the way a competent native human editor or QA lead would reason about it?

Use measurement to verify the reasoning, not to design an increasingly complicated machine around individual errors.
