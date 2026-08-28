# TCJ — Voice Profile Classification & Licensing Extension

**Status:** GOVERNING COMMERCIAL / PRODUCT ADDENDUM  
**Created:** 22 August 2026  
**Project:** Flipgazine / The Book of Answers / Thai Conversation Judge (TCJ)  
**Extends:** `ANSWERS-TCJ-PLUG-AND-PLAY-DEPLOYMENT-AND-VOICE-PROFILE-POLICY-20260822.md`  
**Commercial-use authority:** `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md`  
**Legal status:** product architecture and internal contract-drafting guidance; not legal advice. Provider terms and transaction-specific rights must be rechecked before material licensing.

---

## 1. Purpose

This addendum records a clarification that is commercially important enough to preserve explicitly:

> **TCJ Voice Profile improvement is a legitimate non-model product capability when the Voice Profile remains, in technical substance, a software/configuration/methodology artifact. It is not a workaround for model-development restrictions.**

The classification follows what the component technically is and does, not what it is called.

---

## 2. Substance-over-label rule

The product must classify an artifact according to technical substance.

### Non-model TCJ / Voice Profile artifacts

Examples include:

- lexical preferences;
- register rules;
- preferred / discouraged particles;
- Thai-English code-switching policy;
- stance and explanation-density rules;
- omission / implication preferences;
- banned phrases and boilerplate;
- line-break / composition preferences;
- customer terminology;
- deterministic thresholds / weights;
- routing / escalation rules;
- prompts and runtime instructions;
- policy configuration;
- versioned examples where rights permit.

Improving these artifacts is improvement of TCJ software/configuration/methodology.

### Model artifacts

Examples include:

- model weight updates;
- LoRA / neural adapters;
- fine-tuned checkpoints;
- learned reward models;
- neural classifiers;
- trained embedding models;
- distilled student models;
- other learned parameter sets.

If a future Voice Profile implementation becomes one of these, it must be reclassified as a model component and undergo the applicable provider-rights, model-development and licensing review.

Therefore:

```text
calling a neural artifact “Voice Profile” does not make it non-model
and
using model-derived evidence to improve genuine software/configuration does not automatically make that software a model
```

---

## 3. OpenAI-derived evidence boundary

Where the buyer has the necessary rights and has explicitly opted into the relevant improvement purpose, OpenAI-derived production evidence may be eligible to inform **non-model TCJ / Voice Profile improvement**, subject to provenance and provider-terms review.

Examples of permitted product-level transformations under project policy may include deriving or validating:

```text
response should be shorter
→ profile explanation-density rule

formal apology boilerplate repeatedly underperforms
→ banned / discouraged phrase rule

English noun borrowing works in this customer context
→ code-switching policy

customer consistently prefers indirect conclusion
→ stance / omission preference
```

The raw material must not silently become training, fine-tuning, reward/preference, distillation or synthetic-training supervision for a competing AI model.

Project policy therefore separates:

```text
NON-MODEL TCJ LEARNING
production evidence
→ rules / preferences / thresholds / prompts / configuration
→ versioned Voice Profile

MODEL DEVELOPMENT
production evidence
→ training / fine-tuning / distillation / learned parameters
→ separate rights and provider-terms analysis
```

This is a technical/product classification, not a promise that every conceivable use is legally permitted. The broader governing provider terms still control the actual transaction.

---

## 4. Voice Profile is a portable commercial asset

The customer Voice Profile belongs to the TCJ quality layer rather than to a particular underlying LLM.

Example:

```text
Bank-TH-v3 + Qwen
Bank-TH-v3 + Llama
Bank-TH-v3 + proprietary BankLLM
```

The buyer can replace the generation model while retaining the same canonical Voice Profile version/hash and re-running compatibility/portability validation.

This means the commercial asset is not merely a provider-specific prompt. It is a **portable, versioned Thai quality-and-voice contract**.

---

## 5. Voice Profile Improvement Service

TCJ commercial packaging should include an optional ongoing service/license extension:

> **TCJ Voice Profile Improvement Service**

The normal customer-specific lifecycle is:

```text
initial TCJ license / deployment
→ Customer Voice Profile v1
→ buyer opt-in to eligible production evidence
→ provenance-controlled collection
→ recurring pattern / failure analysis
→ proposed profile delta
→ validation / Assurance
→ Voice Profile v2
→ signed/versioned package
→ license/deploy to buyer
→ repeat as agreed
```

This may be sold as:

- annual maintenance / improvement extension;
- quarterly profile refresh;
- managed Voice Profile service;
- enterprise support tier;
- customer-specific linguistic QA retainer;
- separately scoped profile-upgrade project.

The commercial value is recurring because the buyer's products, vocabulary, campaigns, service policies and customer language evolve even when the underlying LLM does not.

---

## 6. Suggested license decomposition

A commercial TCJ transaction may separate the following rights/services:

```text
TCJ Runtime License
+ Customer Voice Profile License
+ Voice Profile Improvement Service
+ optional Managed / VPC / On-Prem Support
+ optional General TCJ Improvement Program opt-in
```

These should not be collapsed into one ambiguous grant.

### TCJ Runtime License

Right to deploy/use the licensed TCJ runtime under the agreed deployment mode and permitted use.

### Customer Voice Profile License

Right to use a named/versioned customer-specific Voice Profile with TCJ across compatible buyer models.

### Voice Profile Improvement Service

Right/service allowing agreed eligible buyer evidence to be used to propose, validate, version and deliver updated non-model Voice Profiles.

### General TCJ Improvement Program

Separate optional permission allowing de-identified/aggregated eligible evidence to improve general TCJ. This must remain distinct from buyer-specific improvement permission.

---

## 7. Buyer consent and provenance requirements

Buyer opt-in is necessary for collection/use of buyer production evidence, but consent does not by itself override upstream provider restrictions.

Every evidence item considered for profile improvement should retain at least:

```text
origin
provider_if_any
source_model_if_any
buyer / tenant scope
collection_consent_version
purpose_scope
voice_profile_eligible
non_model_tcj_learning_eligible
model_training_eligible
cross_customer_learning_eligible
human_review_state
retention class
```

Do not infer:

```text
voice_profile_eligible = true
therefore
model_training_eligible = true
```

These are separate permissions and separate technical uses.

---

## 8. Product guardrail against loophole behavior

TCJ must never rely on relabeling to evade a model-development restriction.

Prohibited classification behavior includes:

```text
fine-tune a neural model
→ rename the learned weights “Voice Profile”
→ claim non-model status
```

or:

```text
train a reward/classifier model from restricted output
→ embed it inside TCJ
→ claim the restriction no longer applies because TCJ is middleware
```

The correct rule is:

> **Technical substance controls. A genuinely non-model configuration remains a non-model configuration; a learned model remains a model even when embedded inside TCJ.**

This rule protects both the credibility of TCJ's licensing position and buyer diligence.

---

## 9. Commercial positioning

Recommended buyer-facing framing:

> **TCJ separates your Thai quality-and-voice contract from your base model. Your Voice Profile remains portable across supported models and can be versioned over time as your brand and customer language evolve.**

For the improvement extension:

> **With explicit opt-in, eligible production evidence can be used to improve your non-model TCJ Voice Profile. Updated profiles are validated, versioned and licensed back into your TCJ deployment without requiring you to retrain your underlying model.**

Do not market this as a legal workaround. Market it as what it is: a non-model enterprise configuration and QA asset with separate provenance controls.

---

## 10. Governing decision

As of 22 August 2026:

```text
VOICE PROFILE CLASS                non-model configuration/methodology by default
CLASSIFICATION RULE                technical substance over label
PORTABLE ACROSS MODELS             yes, subject to compatibility validation
BUYER-SPECIFIC IMPROVEMENT         supported with explicit opt-in and provenance controls
OPENAI-DERIVED EVIDENCE            may inform non-model TCJ/profile improvement after rights review
MODEL TRAINING RIGHTS              separate; never implied by profile-learning eligibility
RECURRING COMMERCIAL EXTENSION     TCJ Voice Profile Improvement Service
CROSS-CUSTOMER IMPROVEMENT         separate explicit opt-in required
NEURAL PROFILE IMPLEMENTATION      reclassify as model and review separately
```

This addendum governs the commercial classification and licensing-extension interpretation of Voice Profiles unless superseded by a newer applied policy.
