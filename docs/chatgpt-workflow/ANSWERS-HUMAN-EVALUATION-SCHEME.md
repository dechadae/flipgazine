# The Book of Answers — Human Evaluation Scheme

**Status:** APPROVED INTERNAL SCHEME  
**Created:** 17 August 2026  
**Updated:** 18 August 2026  
**Project:** Flipgazine / The Book of Answers  
**Related public evaluator:** `ANSWERS-VOICE-BENCHMARK-PLAN.md`  
**Editorial authority:** `ANSWERS-VOICE-TONE.md`

## 1. Purpose

Define the single human-evaluation deliverable offered after a suitable project reaches the reviewer through the quiet human-contact path on `/voice.html`.

This is not a tiered service menu and must not become a public pricing/plan page.

The human deliverable is intentionally much denser than the public automated benchmark.

---

## 2. One scheme only

Every accepted task uses the same structure.

For each user-prompt / model-response pair, the completed human task contains:

1. the original user prompt or scenario exactly as supplied;
2. a dedicated human evaluation of the **user prompt itself**;
3. the original model response exactly as supplied;
4. all six response-benchmark scores using the same 1–4 rubric;
5. the deterministic overall response score derived from those ratings;
6. a written human comment on **every response benchmark dimension**, explaining why that score was given;
7. severity classification and relevant diagnostic flags;
8. explicit **failure attribution** identifying whether any important weakness came primarily from the prompt, the model response, both, or neither;
9. an overall human editorial assessment of the complete prompt → response interaction;
10. **at least two complete human-written rewrite options** for the response;
11. any necessary note about uncertainty, domain limits, prompt insufficiency, or why a rewrite direction was chosen.

The human reviewer may disagree with the automated evaluator. Human disagreement should be explained, not forced into machine alignment.

---

## 3. Human prompt evaluation standard

The original user prompt is evaluated as its own object before judging the model response.

Do **not** force the six response dimensions onto the prompt. A user prompt has a different function from a model answer, so prompt quality receives its own compact human assessment.

Evaluate the prompt for:

- **Intent clarity** — is it reasonably clear what the user wants?
- **Context sufficiency** — did the user provide enough information for a useful answer?
- **Ambiguity** — are there multiple plausible interpretations that materially affect the answer?
- **Natural user language** — does the wording resemble something a Thai user would realistically ask in that context?
- **Constraint quality** — are important requirements present, missing, conflicting, or unnecessarily restrictive?
- **Prompt-caused risk of failure** — did the prompt itself make a weak or misleading model response more likely?

The prompt evaluation should identify concrete issues rather than blaming the user for ordinary conversational brevity. Real users often ask incomplete, elliptical or context-dependent questions; that can itself be an important part of evaluating whether a model handles natural Thai interaction well.

### Failure attribution

Every completed task should include one primary attribution label:

```text
PROMPT
MODEL
BOTH
NEITHER
```

Meaning:

- **PROMPT** — the main failure is caused by missing, conflicting, misleading or unusably ambiguous input.
- **MODEL** — the prompt is adequate, but the model materially fails to understand or answer it.
- **BOTH** — limitations in the prompt and the model response both materially contribute.
- **NEITHER** — no meaningful failure is present; the interaction is fundamentally sound.

A short explanation should accompany the label where the reason is not self-evident.

This attribution is valuable because it distinguishes a model-quality problem from an input-quality problem instead of collapsing both into a single response score.

---

## 4. Human response rewrite standard

At least two rewrites are required for every completed standard task unless the task is declined for scope reasons.

The two rewrites should represent genuinely useful editorial alternatives, not trivial synonym swaps.

Possible differences may include:

- warmer vs sharper;
- dry vs playful;
- more decisive vs appropriately nuanced;
- tighter vs slightly more conversational;
- different but equally natural social positioning;
- different composition or line hierarchy where the format benefits from it.

Each rewrite remains an editorial option, not a claim of universally correct Thai.

The reviewer must not manufacture slang, English borrowing, camp, cultural references, particles, or line breaks merely to imitate the Book's surface style.

When the original prompt is genuinely insufficient, the rewrites should not invent unsupported facts merely to make the response look better. The evaluation should state the prompt limitation clearly.

---

## 5. Scope and quality control

The reviewer is a Thai designer and solo developer with strongest judgment in selected fields, not a universal Thai-language authority.

Strong-fit areas include:

- contemporary conversational Thai;
- editorial voice and tone;
- creative and product language;
- hospitality;
- lifestyle;
- culture and social context;
- adjacent design-led or consumer-facing fields where the reviewer has real subject familiarity.

The reviewer may decline:

- an entire project;
- individual prompts within a larger project;
- a rewrite where specialist knowledge is required;
- legal, medical, regulated, highly technical, or other domain-specific material outside appropriate expertise.

The governing quality principle is:

> **Know where the judgment is strong. Do not overclaim beyond it.**

---

## 6. Task value

The task is valued as a reusable training/evaluation artifact, not as an hourly labor wage.

Internal planning value for the standard task:

- **THB 2,500 per completed task**
- approximately **USD 75 per completed task** for rough planning only; use the current exchange rate whenever an exact USD equivalent is needed.

This is the floor for the complete standard artifact described above, not a generic annotation rate.

The addition of prompt-quality analysis and failure attribution is included in the same single scheme. It strengthens the information density of the task rather than creating a second tier.

Do not publish this value on the Voice page. The public experience remains non-commercial in presentation and uses no pricing, package, upgrade, subscription, or quote language.

---

## 7. Why the completed task is a dense data asset

A simple before/after edit pair shows only that one output changed into another.

The full human task preserves substantially more supervision:

```text
original user prompt / scenario
→ human prompt-quality evaluation
→ original model response
→ six criterion-level response scores
→ point-by-point human reasoning
→ severity
→ diagnostic labels
→ prompt/model failure attribution
→ overall human judgment of the interaction
→ rewrite option A
→ rewrite option B
```

This allows the record to distinguish, for example:

- an adequate prompt followed by a weak model answer;
- an underspecified prompt handled reasonably by the model;
- a failure caused jointly by prompt ambiguity and model behavior;
- a strong prompt-response interaction with no meaningful failure.

Depending on the buyer's lawful use case, this structure may support model evaluation, error analysis, preference work, supervised learning, evaluator development, benchmark construction, prompt-robustness analysis, or other downstream research/training workflows.

The value is in the density and specificity of the finished human judgment, not simply the time taken to produce it.

---

## 8. Rights model for buyer-supplied tasks

For the standard external workflow, the buyer supplies the prompt/scenario and model response and is responsible for having the rights and permissions required to supply and use that source material.

The human reviewer creates the original human-authored prompt evaluation, response evaluation, comments, scoring rationale, diagnostic judgment, failure attribution, overall assessment, and rewrite options.

The commercial intention is simple: once the completed task is delivered, the buyer may receive broad or exclusive rights in the reviewer's human-authored contribution so the buyer can use that contribution without an ongoing licensing relationship.

However, rights in the **source prompt, source model output, third-party material, trademarks, personal data, or other underlying content do not automatically transfer from the reviewer**. Any transfer can cover only rights the reviewer actually owns or is legally able to transfer.

For serious commercial use, the written agreement should therefore state that:

1. the buyer warrants that it has the necessary rights to the supplied source material;
2. the reviewer assigns or exclusively licenses the human-authored prompt evaluation, response evaluation and rewrite material to the agreed extent;
3. the buyer's downstream use remains subject to any third-party rights and any terms governing the source model/output;
4. no representation is made that third-party or AI-generated source material becomes exclusively owned merely because it appears inside a completed evaluation record.

This keeps the transaction simple without promising rights that neither party can lawfully transfer.

---

## 9. Existing Book corpus is a separate rights case

The existing Book corpus must not automatically be treated as identical to a buyer-supplied human-evaluation task.

Batch 1 contains historical AI-assisted drafting, human acceptance/editing, final editorial decisions, and project-specific provenance. Before granting broad external training rights in a Batch 1 record, confirm the applicable rights and model-provider terms for the original source material.

If selected Batch 1 records are upgraded for calibration or demonstration, preserve the original immutable record and add the deeper evaluation as a separate overlay rather than replacing historical provenance.

Recommended structure:

```text
Batch 1 original provenance
+ human prompt evaluation where applicable
+ six-dimension human response evaluation overlay
+ point-by-point commentary
+ prompt/model failure attribution
+ at least two fresh human rewrite alternatives
```

Only the deliberately selected calibration subset needs this deeper treatment under the current project plan; there is no requirement to apply it to all 948 historical records.

The new human-authored overlay can have clearer authorship/provenance than the historical AI-assisted layer, but it does not erase third-party or platform terms attached to earlier source material.

---

## 10. Public/private boundary

The public automated benchmark remains:

- free in presentation;
- diagnosis-only;
- no rewrite;
- no suggested correction;
- no visible commercial language.

The human layer begins only after deliberate contact and fit review.

Preferred public CTA remains:

```text
Want a human opinion?
I work best with contemporary Thai conversation, editorial voice and creative/product contexts. I’m not the right reviewer for every field, and I may decline work outside my expertise.
Ask Decha
```

---

## 11. Core principle

One accepted human task should leave the buyer with a complete, high-density record of **what the user asked, whether the prompt itself was adequate, what the model did, how a native editor judged the response, where any failure came from, why each judgment was made, and at least two credible human alternatives**.

That is the product of the human evaluation—not the reviewer's hourly time.
