# The Book of Answers — Thai Voice Benchmark Plan

**Status:** APPROVED PLAN  
**Created:** 17 August 2026  
**Updated:** 17 August 2026  
**Project:** Flipgazine / The Book of Answers  
**Placement:** `/voice.html`, after the AI probe sections and before the final Mental Model section  
**Editorial authority:** `ANSWERS-VOICE-TONE.md`

## 1. Purpose

Turn the Voice page from passive documentation into an interactive Thai-response evaluator.

The benchmark accepts:

1. a user question or scenario;
2. an AI-generated Thai response;
3. evaluates the response against the Book of Answers criteria;
4. shows a single overall score immediately;
5. reveals the detailed human-style evaluation in a lightbox.

The benchmark is an evaluator only.

It must **not** rewrite, correct, continue, improve, or suggest alternative wording.

The public experience must remain free in presentation. Do not add Pricing, Plans, Subscription, Upgrade, Premium, Quote, or similar commercial language.

---

## 2. Public interaction

### Input state

The benchmark contains two fields:

- **Question / scenario**
- **AI response**

Primary action:

`Evaluate`

Do not expose model controls, temperature, prompt settings, evaluator internals, or advanced configuration in V1.

### Immediate result

After evaluation, show only:

- overall score, 0–100;
- a short qualitative label;
- `View details`;
- a quiet `Test another` action.

Example:

```text
74 / 100
Mixed alignment
View details
```

The initial result should feel editorial and calm rather than like a technical dashboard.

### Detail lightbox

`View details` opens a lightbox containing the complete evaluation.

The lightbox contains:

- Overall quality
- Intent / Cause
- Thai Pragmatic Naturalness
- BFF Conversational Voice
- Lexical / Social Fit
- Stance / Decision Strength
- Composition / Delivery
- Error severity
- Diagnostic flags
- Evaluator rationale
- Evaluator confidence

No correction or rewrite appears anywhere.

At the bottom, the human-contact CTA uses quiet non-commercial language only:

```text
Want a human opinion?
I work best with contemporary Thai conversation, editorial voice and creative/product contexts. I’m not the right reviewer for every field, and I may decline work outside my expertise.
Ask Decha
```

Do not add pricing, quote, package, subscription, consultation-sales, or upgrade language around this CTA.

---

## 3. Human-evaluation rubric

The evaluator imitates the structure of a professional human model-response annotation task without claiming to reproduce any proprietary rubric.

Each dimension receives an integer rating from 1–4.

### Rating scale

```text
4 — Fully meets criteria
3 — Mostly meets criteria
2 — Partially meets criteria
1 — Fails criteria
```

### Dimensions and weights

| Dimension | Weight | Core question |
|---|---:|---|
| Intent / Cause | 20% | Does the response understand and address the actual dilemma? |
| Thai Pragmatic Naturalness | 25% | Would a Thai person naturally say this here? |
| BFF Conversational Voice | 20% | Does it sound like a close friend rather than an advisor/model? |
| Lexical / Social Fit | 15% | Are vocabulary, register, cultural references and English borrowing appropriate? |
| Stance / Decision Strength | 10% | Does it give enough of a position rather than hiding behind hedging? |
| Composition / Delivery | 10% | Does it feel intentionally composed in rhythm, hierarchy and landing? |

---

## 4. Deterministic overall score

The AI judge must **not** invent the final 0–100 score.

It returns only the six 1–4 ratings plus qualitative diagnostics.

The backend converts each rating to a normalized percentage:

```text
normalized = (rating - 1) / 3 × 100
```

Then applies the fixed weights above.

This makes identical rubric ratings produce an identical overall score regardless of wording in the model rationale.

---

## 5. Dimension definitions

### 5.1 Intent / Cause

Judge whether the response:

- understands the actual question/dilemma;
- addresses the implied cause or decision;
- stays contextually coherent;
- avoids semantic drift;
- does not answer a neighboring but different problem.

### 5.2 Thai Pragmatic Naturalness

Judge whether the Thai feels socially natural in the specific situation.

Consider:

- implication and omission;
- whether the sentence is more explicit than Thai conversation requires;
- pronouns and subjects;
- particles and stance;
- natural lexical choice;
- translation smell;
- contextual social plausibility.

Do not reward shorter copy automatically.

### 5.3 BFF Conversational Voice

Judge whether the response sounds like a close Thai friend replying in chat/DM rather than:

- a customer-service agent;
- therapist;
- generic advice columnist;
- textbook;
- brand voice;
- translated assistant response.

Consider intimacy, confidence, timing, warmth, shade, humor and social fluency.

Do not reward slang, camp, particles or English merely because they are present.

### 5.4 Lexical / Social Fit

Judge whether vocabulary belongs naturally to the situation.

Consider:

- Thai vs borrowed English;
- appropriate contemporary register;
- real social objects/apps/behaviors when relevant;
- cultural plausibility;
- whether specificity is useful rather than decorative;
- whether code-mixing is natural rather than forced.

### 5.5 Stance / Decision Strength

Judge whether the response gives an appropriate degree of decisiveness.

Flag responses that hide behind generic hedging, endless conditional language or empty `it depends` structures when the Book format calls for a clearer position.

Do not require false certainty where the situation genuinely calls for nuance.

### 5.6 Composition / Delivery

This is both language evaluation and graphic/editorial evaluation.

Do not score by number of line breaks.

Judge whether:

- line breaks create intentional hierarchy;
- the text block has coherent visual shape;
- negative space is used well;
- short phrases are isolated for a reason;
- the landing works verbally and visually;
- emphasis/focus acts as an intentional anchor;
- composition feels authored rather than automatically wrapped.

A response with many line breaks can score poorly if the hierarchy is arbitrary.

---

## 6. Error severity

The evaluator returns one severity classification:

```text
PASS
MINOR
MAJOR
CRITICAL
```

Definitions:

- **PASS** — no meaningful problem under the benchmark criteria.
- **MINOR** — small weakness that does not fundamentally damage the response.
- **MAJOR** — one or more important criteria are substantially missed.
- **CRITICAL** — fundamental misunderstanding, severe semantic failure, or applicable safety failure.

Severity is reported separately from the numeric score.

---

## 7. Diagnostic flag taxonomy

The evaluator may select multiple flags:

```text
over_explained
too_complete
advisor_like
translation_shaped
weak_stance
excessive_hedging
semantic_drift
unnatural_lexical_choice
inappropriate_code_mixing
particle_stance_problem
register_mismatch
generic_cliche
culturally_implausible
forced_humor
forced_camp
overly_slangy
weak_social_grounding
weak_composition
grammatical_not_designed_breaks
weak_final_landing
```

Flags diagnose; they do not trigger an automatic rewrite.

---

## 8. Evaluator rationale and confidence

The evaluator returns:

- a short rationale, normally 2–4 sentences;
- confidence: `high`, `medium`, or `low`.

The rationale should explain the judgment using the rubric without proposing corrected wording.

Forbidden evaluator behavior:

- `A better version would be...`
- `Try saying...`
- rewritten Thai;
- alternative punchlines;
- suggested line breaks;
- completion of unfinished responses.

---

## 9. Judge structured output

Target conceptual response:

```json
{
  "intent": 3,
  "thai_pragmatics": 2,
  "bff_voice": 2,
  "lexical_social_fit": 3,
  "stance": 2,
  "composition": 2,
  "severity": "major",
  "flags": [
    "over_explained",
    "advisor_like",
    "weak_stance"
  ],
  "rationale": "The response understands the dilemma but sounds more like polished advice than a close Thai friend. It explains implications that the listener could already infer and avoids a clear enough position for the Book format.",
  "confidence": "high"
}
```

The server must validate enum values, score bounds, required fields and response length before returning results to the browser.

---

## 10. CARE mode

CARE is not an ordinary weighted criterion.

If a question contains a serious safety context, switch to a dedicated CARE evaluation mode.

CARE should evaluate whether the candidate response:

- recognized the safety context;
- remained clear and grounded;
- avoided minimizing danger;
- avoided inappropriate humor/camp;
- avoided unsafe advice.

The UI should disclose:

`CARE evaluation applied`

Do not penalize a serious CARE response for failing ordinary BFF/camp/humor expectations.

---

## 11. Placement on `/voice.html`

Insert the benchmark after the AI-probe material and before the final Mental Model section.

Narrative sequence:

```text
human-review evidence
→ Voice rules
→ case study
→ AI transfer probes
→ interactive benchmark
→ final mental model
```

The benchmark should inherit the existing Voice page visual system rather than introducing a SaaS-dashboard aesthetic.

Desktop lightbox:

- centered;
- approximately 680–720 px maximum width;
- scroll internally when required.

Mobile lightbox:

- near-full-screen;
- comfortable safe-area padding;
- persistent close control;
- overall score remains visible near the top.

---

## 12. Architecture

Do not attach the evaluator to the Book's private routing/corpus service.

Create a separate endpoint, conceptually:

`voice-eval`

Flow:

```text
/voice.html
    ↓
voice-eval
    ↓
input validation + abuse controls
    ↓
selected evaluator model API
    ↓
structured 1–4 rubric response
    ↓
server validation
    ↓
deterministic score calculation
    ↓
Voice page result/lightbox
```

The evaluator receives only:

- compressed Book Voice rubric;
- question/scenario;
- candidate response.

It does **not** receive or expose the private 948-row corpus.

API keys remain server-side only.

---

## 13. Judge-model calibration

Do not choose the evaluator solely by model size or provider reputation.

Before public release, create approximately 30–50 calibration cases.

For each case:

1. freeze the question/scenario;
2. freeze the candidate AI response;
3. human editor scores all six criteria first;
4. run the identical evaluation task through candidate free/low-cost APIs;
5. compare model ratings and classifications against the human labels.

Candidate providers may include free tiers from Gemini, Groq-hosted models and Cloudflare Workers AI.

Selection criteria:

- agreement with human 1–4 ratings;
- agreement on Pass/Minor/Major/Critical;
- useful and accurate diagnostic flags;
- quality of rationale;
- repeat-test consistency;
- latency;
- practical cost/limits.

The winning judge is the model that best reproduces the native-editor evaluation behavior, not necessarily the largest model.

If supported by calibration results, buyer-safe wording may later state:

> The automated evaluator was selected and calibrated against native-editor ratings.

Do not claim human equivalence.

---

## 14. Public safeguards

Recommended V1 controls:

- question maximum length around 500 characters;
- candidate response maximum length around 2,000–3,000 characters;
- monthly API-spend cap;
- reasonable per-IP/request rate protection;
- server-side API key only;
- strict structured-output validation;
- no permanent storage of submitted text by default.

Start without visible CAPTCHA if normal abuse controls are sufficient.

Add Turnstile only if real abuse appears.

The public experience should feel unrestricted even though invisible technical limits protect the service.

---

## 15. Explicitly excluded from V1

Do not build:

- AI rewrite;
- suggested correction;
- preferred-answer generation;
- subscription plans;
- pricing page;
- quote workflow;
- paid/free tiers;
- account/login requirement;
- saved user history;
- public leaderboard;
- public model ranking;
- access to the private Book corpus;
- integration with the production Answers routing service.

---

## 16. Implementation order

### Phase A — Rubric freeze

Freeze:

- six criteria;
- weights;
- 1–4 anchors;
- severity definitions;
- diagnostic taxonomy;
- CARE mode;
- structured JSON schema.

### Phase B — Human calibration set

Create 30–50 representative Thai response evaluations and score them manually before running automated judges.

### Phase C — Judge comparison

Run candidate free/low-cost evaluator APIs against the frozen set and select the judge based on agreement and stability.

### Phase D — Private backend prototype

Build the isolated `voice-eval` endpoint with:

- input validation;
- structured model call;
- output validation;
- deterministic score calculation;
- rate controls;
- spend protection;
- no corpus access.

### Phase E — Voice-page integration

Add:

- question field;
- AI response field;
- Evaluate action;
- overall score result;
- qualitative label;
- View details lightbox;
- Test another action;
- CARE state;
- mobile/desktop QA;
- quiet human-contact CTA with scope disclosure.

### Phase F — Acceptance test

Test:

- natural high-quality Thai;
- grammatically correct but translation-shaped Thai;
- advisor-like prose;
- excessive slang/camp;
- natural Thai-English borrowing;
- unnatural code mixing;
- over-compression;
- semantic drift;
- strong vs weak composition;
- long inputs;
- malformed inputs;
- repeated identical evaluations;
- CARE scenarios.

---

## 17. Definition of done

The benchmark is complete when:

- users can paste a question/scenario and AI response directly on `/voice.html`;
- Evaluate returns an overall 0–100 score;
- the overall score is calculated deterministically from fixed 1–4 rubric ratings;
- View details opens the complete human-style evaluation in a lightbox;
- the six criteria remain faithful to `ANSWERS-VOICE-TONE.md`;
- surface-style imitation is not rewarded automatically;
- CARE uses the correct separate evaluation behavior;
- repeated tests are acceptably stable;
- the selected judge shows reasonable agreement with the human calibration set;
- no evaluator output contains a rewrite or suggested correction;
- no private corpus data is sent to or exposed by the evaluator;
- the API key remains private;
- monthly spend is capped;
- the page remains free and non-commercial in presentation;
- the human-contact CTA clearly discloses specialist scope and the possibility of declining unsuitable work.

---

## 18. Human contact scope and limitations

The human-contact layer must be as explicit about its limits as the Voice page is about the limits of the benchmark itself.

The human reviewer is a Thai designer and solo developer with strong editorial judgment in selected fields, not a universal Thai-language authority and not a general-purpose language-services company.

Strongest-fit work includes areas such as:

- contemporary conversational Thai;
- editorial voice and tone;
- creative and product language;
- hospitality;
- lifestyle;
- culture and social context;
- adjacent design-led or consumer-facing fields where the reviewer has real subject familiarity.

The site must not imply equivalent expertise in every specialist domain. Work may be declined when the subject requires knowledge, professional credentials, technical depth, legal/medical expertise, industry experience, or linguistic context outside the reviewer’s competence.

This is a quality-control principle, not an apology:

> **Know where the judgement is strong. Do not overclaim beyond it.**

The preferred public copy is:

```text
Want a human opinion?
I work best with contemporary Thai conversation, editorial voice and creative/product contexts. I’m not the right reviewer for every field, and I may decline work outside my expertise.
Ask Decha
```

Do not replace this with sales language. Contact should begin as a human conversation; any scope, availability or commercial terms happen privately only after fit is established.

---

## 19. Product principle

The benchmark exists to answer one question:

> **How well does this AI response align with the editorial and pragmatic criteria documented by The Book of Answers?**

It is not a universal measure of Thai correctness and should never be presented as one.

The Book demonstrates the language in use. The Voice page explains the decisions. The benchmark makes those decisions testable.
