# TCJ — Plug-and-Play Deployment, Runtime Product Boundary & Voice Profile Improvement Policy

**Status:** GOVERNING PRODUCT / DEPLOYMENT POLICY  
**Created:** 22 August 2026  
**Project:** Flipgazine / The Book of Answers / Thai Conversation Judge (TCJ)  
**Applies to:** final commercial TCJ runtime, managed/VPC/private-server deployment, TCJ Gateway, TCJ Core, Voice Profiles, provider adapters, customer improvement programs and buyer licensing packages  
**Commercial-use authority:** `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md`  
**Method authority:** `ANSWERS-THAI-CONVERSATION-JUDGE-ARCHITECTURE.md` and `ANSWERS-TCJ-MULTI-JUDGE-CONSENSUS-ARCHITECTURE.md`  
**Private-server migration evidence:** `ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md`  
**Legal status:** product architecture and internal contract-drafting guidance; not legal advice. Provider terms and transaction-specific rights must be rechecked before material licensing.

---

## 1. Product objective

The final commercial TCJ product must behave like infrastructure, not like a research workflow.

A buyer should be able to insert TCJ into an existing conversational-AI stack with minimal preparation:

```text
existing
buyer application → buyer model → customer

with TCJ
buyer application → buyer model → TCJ Gateway → final decision / optional rewrite path → customer
```

Where practical, an OpenAI-compatible buyer should be able to integrate TCJ primarily by changing a base URL / endpoint and credential rather than rewriting application logic.

TCJ's commercial value is therefore not only its evaluation methodology. It is the combination of:

- Thai conversational quality control;
- qualified judge / Panel logic;
- deterministic guards;
- Voice Profile enforcement;
- provenance and evidence controls;
- optional rewrite orchestration;
- deployment independence;
- continuous customer-specific improvement;
- low-friction integration.

---

## 2. Final product decomposition

The final product must keep the following layers technically and contractually distinct.

### 2.1 TCJ Core — non-model software / methodology layer

TCJ Core includes ordinary software and configuration such as:

- orchestration;
- routing;
- deterministic guards;
- decision policy;
- scoring / threshold application;
- disagreement handling;
- provenance;
- evidence manifests;
- release gates;
- audit logs;
- profile selection;
- provider adapters;
- API compatibility;
- configuration and deployment logic.

TCJ Core is **not itself an AI model** merely because AI-assisted coding or model outputs were involved in its development.

### 2.2 Voice Profile — non-model versioned configuration layer

A TCJ Voice Profile is defined for product and licensing purposes as a **non-model, versioned configuration/methodology artifact**. It may contain:

- lexical preferences;
- register boundaries;
- preferred / discouraged particles;
- Thai-English code-switching policy;
- stance preferences;
- explanation-density rules;
- preferred omission / implication behavior;
- banned phrases / boilerplate;
- line-break and composition preferences;
- humor / deadpan / camp tolerance;
- customer-specific terminology;
- deterministic weights / thresholds;
- prompt/runtime instructions;
- approved examples where rights permit;
- policy and escalation settings.

A Voice Profile must **not silently become a neural model artifact**. If a future implementation turns a profile into a LoRA, neural adapter, embedding model, reward model, classifier or other learned parameter set, that component must be separately classified as a model and undergo provider-rights / licensing review.

### 2.3 Judge / generative models — separately sourced runtime components

TCJ may use one or more AI models at runtime for semantic/pragmatic judgment or optional rewriting. These are separate components with their own:

- provider;
- license / terms;
- model version;
- qualification evidence;
- Passports;
- allowed dimensions;
- deployment boundary.

The product must never imply that a third-party or local judge model is owned by TCJ merely because TCJ orchestrates it.

---

## 3. Plug-and-play deployment target

The commercial release requirement is:

> **Fresh customer environment → TCJ installed → buyer model connected → first evaluated production response in under 30 minutes without manual database work or TCJ-specific ML expertise.**

For an OpenAI-compatible buyer using defaults, the stretch target is:

> **First evaluated response in under 10 minutes.**

This target is a product requirement, not a current production claim until demonstrated by a reproducible deployment test.

---

## 4. Deployment forms

TCJ should expose the same behavior through three packaging levels.

### Managed TCJ

TCJ-hosted control plane/runtime for buyers comfortable with managed service deployment.

### Customer VPC

TCJ runs in the buyer-controlled cloud/network boundary while support and updates remain streamlined.

### Fully private / on-premises

TCJ runs entirely on buyer infrastructure. No external AI provider is required if the buyer selects qualified local judge models.

Preferred packaging:

```text
small / pilot deployment     signed Docker image + Docker Compose
enterprise deployment        signed containers + Helm chart
managed deployment           hosted TCJ Gateway
future optional package      single-node appliance / installer if justified
```

Installation must include automated migrations, health checks, secrets validation, rollback and upgrade checks. Buyers should not have to understand TCJ's internal research tables to operate the service.

---

## 5. TCJ Gateway integration contract

The recommended commercial surface is a **TCJ Gateway** placed between the buyer application/model path and the customer-facing output.

Target integration patterns:

```text
A. Judge only
buyer draft → TCJ → score / diagnosis → buyer decides

B. Quality gate
buyer draft → TCJ → ACCEPT / REVISE / ESCALATE

C. Full runtime refinement
buyer draft → TCJ → targeted correction signal / optional rewrite → recheck → final response

D. Buyer-model final writer
buyer draft → TCJ diagnosis / decision → buyer model rewrites at inference time → customer
```

Pattern D is explicitly supported as a runtime architecture. Feeding TCJ output into a buyer model's current inference request is distinct from training or fine-tuning that model.

Where feasible, TCJ should provide:

- OpenAI-compatible request/response adapters;
- native `/judge` endpoint;
- native `/gate` endpoint;
- optional `/rewrite` orchestration;
- health/readiness endpoint;
- profile/version endpoint;
- structured audit/provenance output;
- streaming compatibility where safe;
- explicit model/provider routing.

---

## 6. Minimal setup wizard

The buyer-facing setup should require only the minimum information needed to start safely.

### Required

1. **Model / endpoint** — provider, OpenAI-compatible URL or local endpoint, plus credential if required.
2. **TCJ operating mode** — Judge Only, Quality Gate or Full Runtime Refinement.
3. **Voice Profile** — General Thai, packaged domain profile or customer-specific profile.
4. **Failure action** — return score, revise, block, or human escalation.

### Optional later

- customer brand corpus;
- approved historical responses;
- human-editor examples;
- domain dictionaries;
- customer-specific escalation policy;
- data-improvement opt-in.

A buyer must be able to start with **zero custom training data**. Customer-specific adaptation is progressive rather than a prerequisite.

---

## 7. No-browser / server-owned operation

Commercial TCJ must not depend on a browser session, manual Run button or operator keeping a page open.

Deterministic operational processes should be server-owned and resumable from durable state:

```text
preflight
→ health / manifest gates
→ runtime processing
→ durable evidence
→ reconciliation / retry under frozen policy
→ automatic stop on ambiguity
→ integrity verification
```

Human interaction is required only when a methodology explicitly needs native judgment, approval, adjudication or a policy decision that cannot be predetermined.

This is the governing product direction for all future TCJ execution architecture.

---

## 8. External-AI independence

The final TCJ product should **not require an external AI vendor to operate**.

Supported runtime tiers:

### TCJ Guard

Zero-AI deterministic checks. Suitable for known rules, structural failures, policy constraints, forbidden patterns and fast pre-gating.

### TCJ Local

Qualified local judge models run entirely in buyer infrastructure. This is the preferred private-server architecture when external-provider independence is required.

### TCJ Hybrid

Local TCJ with optional external providers for hard cases, disagreement resolution or rewriting when the buyer explicitly enables them.

The full semantic/pragmatic value of TCJ generally requires a semantic judge somewhere in the runtime. "No external AI" is therefore a valid product target; "no AI model anywhere" describes only the deterministic Guard subset rather than full TCJ semantic judgment.

---

## 9. Buyer data-improvement opt-in

TCJ may offer a voluntary data-improvement program.

The buyer must be able to choose separately:

```text
A. Improve my own TCJ / Voice Profile using my eligible data
B. Allow de-identified / aggregated eligible evidence to improve general TCJ
```

Option B must be a separate, explicit permission. Permission to operate TCJ or improve Buyer A's profile does not imply permission to use Buyer A's confidential data to improve another buyer's profile or the general product.

Enterprise agreements must define:

- data classes collected;
- retention;
- purpose;
- confidentiality;
- de-identification where applicable;
- cross-customer use yes/no;
- deletion / termination handling;
- ownership / license to resulting customer profile;
- whether TCJ may retain generalized non-identifying rules after termination.

---

## 10. Voice Profile continuous-improvement loop

The preferred customer-specific loop is:

```text
production evidence
→ provenance classification
→ profile-learning eligibility check
→ pattern / failure analysis
→ proposed Voice Profile delta
→ validation / Assurance
→ approved profile version
→ signed package
→ license / deploy back to buyer
```

The system may automate analysis and proposal generation, but production profile changes must be versioned and independently validated before promotion.

The product must not silently self-modify production judging.

---

## 11. OpenAI-derived output and TCJ improvement

Project policy distinguishes **improving TCJ's non-model software/configuration** from **developing a competing AI model**.

Where the buyer has the necessary rights and has opted into the relevant improvement purpose, OpenAI-derived production evidence may be reviewed and used to improve **non-model TCJ components**, including a Voice Profile, for example by deriving or validating:

- lexical preferences;
- shorter/longer response policies;
- register constraints;
- explanation-density rules;
- deterministic profile thresholds;
- allowed code-switching patterns;
- banned boilerplate;
- routing or escalation rules;
- prompt/runtime configuration.

The raw OpenAI-derived material must not automatically become training, fine-tuning, preference, reward, distillation or synthetic-training supervision for a competing AI model.

This distinction is represented as:

```text
OpenAI-derived production evidence
→ MAY be eligible for TCJ non-model configuration / Voice Profile improvement
→ MUST NOT automatically become competing-model training or distillation material
```

This is an internal product/legal-policy interpretation, not an external legal warranty. OpenAI/provider terms must be rechecked before a material transaction, especially where the buyer is itself an AI-model developer.

---

## 12. Provenance and eligibility fields

Every evidence artifact used by the improvement system should carry at least:

```text
origin
provider_if_any
source_model_if_any
buyer_id / tenant scope
collection_consent_version
purpose_scope
raw_content_retention_class
voice_profile_eligible
non_model_tcj_learning_eligible
model_training_eligible
cross_customer_learning_eligible
human_review_state
created_at
```

Recommended origins:

```text
buyer_human
buyer_model
tcj_deterministic
tcj_local_judge
openai_output
third_party_model_output
human_reauthored
mixed
```

Eligibility must be explicit. Do not infer `model_training_eligible=true` merely because `voice_profile_eligible=true`.

---

## 13. Default eligibility policy

Operational default until transaction-specific rights review says otherwise:

| Evidence source | TCJ non-model / Voice Profile improvement | Competing-model training |
|---|---:|---:|
| Buyer historical human-authored content | Yes, with buyer rights/consent | Buyer-rights dependent |
| Native editor independently authors/re-authors response | Yes | Usually cleaner; buyer-rights dependent |
| Buyer model output | Yes, subject to model/provider license | Provider/license dependent |
| Human preference / accept-edit-rewrite labels | Yes | Case-by-case |
| Deterministic TCJ measurements | Yes | Case-by-case if used as model-development supervision |
| OpenAI-generated rewrite / diagnosis / score | May be used for non-model TCJ/profile improvement after rights/provenance review | Not granted for competing-model development by default |
| Third-party model output | Provider-specific review | Provider-specific review |

The fact that a Voice Profile is a TCJ component does not permit a future neural implementation to bypass model-development review. Technical substance governs classification.

---

## 14. Customer-specific packaging and licensing

A normal private customer improvement service may be structured as:

```text
Buyer A opts in
→ eligible Buyer A evidence collected
→ TCJ analyzes recurring voice / quality patterns
→ TCJ Voice Profile A vN+1 produced
→ profile validated
→ signed/versioned package returned to Buyer A
→ licensed/deployed as part of Buyer A's TCJ instance
```

The resulting profile should include:

- profile ID/version;
- source-evidence manifest or privacy-preserving reference;
- rules/config hash;
- validation/Assurance result;
- effective date;
- compatibility version;
- rollback target;
- provenance summary.

---

## 15. Shared TCJ improvement program

A separate optional program may permit eligible buyer evidence to improve general TCJ.

This requires explicit cross-customer permission and controls preventing confidential customer-specific wording from leaking into another customer's profile.

Preferred transformation:

```text
customer evidence
→ de-identify / abstract pattern
→ aggregate
→ general TCJ rule / profile candidate
→ validation
→ general release
```

Do not treat a generic service-improvement clause as sufficient permission for cross-customer reuse if the commercial agreement has not clearly granted it.

---

## 16. Runtime output handling

TCJ may support these customer-facing flows without treating them as model training merely because multiple models participate at inference time:

```text
buyer model draft
→ TCJ local/external judge
→ TCJ decision / diagnosis
→ optional buyer-model rewrite at inference time
→ final customer response
```

or:

```text
buyer model draft
→ TCJ rewrite component
→ buyer model performs final inference-time rewrite
→ customer
```

No model-development rights arise merely because one model consumes another runtime component's output as context for the current request. A separate model-development analysis is required if outputs are accumulated and used for training, fine-tuning, reward/preference optimization, distillation, synthetic-data construction, checkpoint selection or analogous development.

---

## 17. Automatic improvement safety rule

For private-server customers TCJ may use customer-owned compute/resources to automate observation and proposal generation.

Allowed automated chain:

```text
observe
→ classify provenance
→ detect repeated profile/quality pattern
→ propose change
→ test on frozen validation evidence
→ Assurance / policy gate
→ promote approved version
```

Not allowed:

```text
observe
→ silently change production Voice Profile or judge behavior
```

or:

```text
OpenAI-derived output
→ silently enter competing-model training corpus
```

All promoted changes need versioning, auditability and rollback.

---

## 18. Buyer-facing product surface

The buyer should not need to operate Qualification, Passports, evidence manifests or research strata manually. Those remain the trust layer underneath the product.

A normal operating surface should look more like:

```text
TCJ 1.x
Thai Quality                  Active
Voice Profile                 Bank-TH-v3
Operating Mode                Quality Gate
Auto Revision                 On
Human Escalation              Critical only
Writer Model                  buyer-vLLM
Judge Runtime                 Local TCJ Panel
External Provider             Off
Profile Learning              Buyer-only / opted in
Status                        Healthy
```

Expert/research controls may exist separately for qualified operators.

---

## 19. Release acceptance criteria for plug-and-play TCJ

Before marketing TCJ as friction-free / plug-and-play, demonstrate and preserve evidence for at least:

1. clean install from documented package;
2. automated schema/storage setup;
3. model endpoint connection without source-code edits;
4. first evaluated request under 30 minutes from fresh environment;
5. OpenAI-compatible integration path where claimed;
6. Docker Compose deployment;
7. Helm/Kubernetes deployment where claimed;
8. restart/resume without evidence loss;
9. upgrade + rollback;
10. secrets remain outside images/repository;
11. tenant separation;
12. local-only mode with no external network dependency where claimed;
13. profile import/export/version rollback;
14. provenance/eligibility firewall;
15. automatic hard-stop on ambiguous evidence state;
16. documented uninstall/data-retention behavior;
17. measurable latency/cost overhead;
18. reproducibility from a fresh operator/account using only the packaged TCJ materials.

Do not advertise a target as achieved until its acceptance run is preserved.

---

## 20. Reproducibility requirement

Commercial TCJ must not rely on tacit knowledge from one developer or one ChatGPT conversation.

Final requirement:

> **A fresh model session/account with no prior conversation must recover statistically equivalent intended Thai judgment/generation behavior using only the versioned TCJ package delivered to the buyer.**

Exact sentence reproduction is not required. Intended behavior, qualification rules and profile effects must be reproducible from packaged assets and versioned configuration.

---

## 21. Product positioning

Preferred buyer-facing statement:

> **Add TCJ in front of your existing model to get a Thai conversational quality-control layer without rebuilding your AI stack. TCJ can run managed, in your VPC or fully on-premises, and can operate with qualified local models so customer data does not need to leave your environment.**

For customer-specific adaptation:

> **With explicit opt-in, eligible production evidence can be used to improve the buyer's versioned TCJ Voice Profile. The Voice Profile is a non-model TCJ configuration layer; model-training rights remain a separate provenance/licensing question.**

Do not state or imply that provider restrictions disappear because an asset is labelled "TCJ". Technical substance and actual use govern classification.

---

## 22. Governing decision

As of **22 August 2026**, the final-product direction is:

```text
TCJ DELIVERY               plug-and-play Gateway / service
BROWSER REQUIRED           no
MANUAL DB SETUP            no
CUSTOM TRAINING REQUIRED   no
EXTERNAL AI REQUIRED       no; local qualified runtime supported
TCJ CORE                   non-model software / methodology layer
VOICE PROFILE              non-model versioned configuration layer
JUDGE MODELS               separately sourced / qualified runtime components
BUYER FINAL WRITER         may be buyer's own model at inference time
BUYER DATA IMPROVEMENT     opt-in, provenance-controlled
OPENAI-DERIVED EVIDENCE    may inform non-model TCJ/profile improvement after rights review
COMPETING MODEL TRAINING   not granted by default for OpenAI-derived output
PROFILE SELF-MODIFICATION  prohibited without versioned validation/promotion
DEPLOYMENT TARGET          <30 min fresh environment; <10 min stretch for compatible defaults
```

This document governs final-product deployment and Voice Profile improvement design until expressly superseded by a newer applied policy.