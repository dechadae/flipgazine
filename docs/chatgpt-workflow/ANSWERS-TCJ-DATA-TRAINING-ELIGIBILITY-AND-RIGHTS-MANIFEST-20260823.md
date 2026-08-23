# TCJ — Data Training Eligibility & Rights Manifest

**Status:** GOVERNING INTERNAL TRAINING-ELIGIBILITY POLICY  
**Created:** 23 August 2026  
**Project:** Flipgazine / Thai Conversation Judge (TCJ)  
**Applies to:** TCJ Methodology Pack, Voice Profiles, raw/private evidence, human labels, model outputs, Book of Answers corpus rows, buyer-private evidence, exports and future training-data packages  
**Related authority:** `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md`  
**Legal status:** internal operational policy and contract/data-card guidance; **not legal advice and not a substitute for transaction-specific counsel**.

---

## 1. Why this policy exists

TCJ now has several different ways data can be used:

```text
runtime judge context
benchmark / evaluation
human QA
release gating
model training / fine-tuning
preference or reward optimization
synthetic-data filtering
checkpoint selection
model distillation
```

These uses are **not legally or commercially interchangeable**.

The most important distinction is:

> **A TCJ asset may be safe and useful to show to a judge at runtime while still not being licensed or eligible as model-training data.**

Examples:

- the compiled TCJ Methodology Pack is intentionally judge-visible runtime context;
- raw private TCJ corpus rows are not judge-visible by default;
- historical ChatGPT-assisted corpus rows may be licensed for evaluation while not being offered as third-party model-development data;
- buyer-owned data may be eligible for that buyer's own training only if the buyer has the necessary rights and explicitly authorizes that use.

Training eligibility therefore must be represented as its own machine-readable field. It must never be inferred from benchmark eligibility, corpus membership, human review, source-code access or runtime-context eligibility.

---

## 2. Five separate eligibility questions

Every material TCJ asset should be capable of answering these independently:

```text
runtime_context_allowed?
benchmark_evaluation_allowed?
buyer_export_allowed?
model_development_allowed?
raw_private_evidence_export_allowed?
```

A `true` value in one field does not imply `true` in another.

In particular:

```text
runtime_context_allowed = true
```

does **not** imply:

```text
model_development_allowed = true
```

and:

```text
benchmark_metric_eligible = true
```

does **not** imply:

```text
training_eligible = true
```

---

## 3. Canonical training-eligibility states

TCJ uses the following states.

### `TRAINING_ELIGIBLE`

The asset may be used for the expressly defined model-development purpose because all required rights/provenance conditions have been affirmatively satisfied.

Minimum requirements:

- the party granting the right owns or is authorized to grant the relevant rights;
- no known provider/output restriction conflicts with the proposed use;
- confidentiality/privacy/consent constraints permit the proposed use;
- the permitted model-development use is expressly granted in writing;
- the exact asset/version is identified in a rights manifest;
- any buyer/domain restrictions are recorded.

This state is **never inferred automatically from human authorship alone**.

### `TRAINING_ELIGIBLE_WITH_CONDITIONS`

Training is permitted only within an explicit scope, for example:

- named buyer only;
- named model/project only;
- internal non-transferable use;
- no redistribution;
- no foundation-model training;
- only application-specific fine-tuning;
- only buyer-owned data;
- only after privacy/consent controls are satisfied.

The conditions must be machine-readable and contract-referenced.

### `EVALUATION_ONLY`

The asset may be used for benchmark/evaluation/QA under the applicable license, but model-development rights are not granted.

This is the **default TCJ commercial state** for mixed-provenance TCJ evidence and documentation unless a separate training-rights review expressly changes it.

### `BUYER_CONTROLLED`

The asset belongs to or is supplied by the buyer and TCJ makes no independent representation that it is training-eligible.

The buyer must affirm:

- ownership/authorization;
- privacy/consent basis;
- provider/contract compatibility;
- intended training use.

Only after buyer authorization and tenant policy approval may the asset move to a buyer-scoped `TRAINING_ELIGIBLE_WITH_CONDITIONS` state.

### `REVIEW_REQUIRED`

Training eligibility cannot yet be determined because one or more material rights/provenance facts are missing, ambiguous or transaction-specific.

Do not treat `REVIEW_REQUIRED` as permission.

### `PROHIBITED`

The proposed model-development use is not allowed under the current policy/rights state.

Examples include:

- hidden Qualification evidence being used to train the candidate evaluator it is supposed to test;
- raw private TCJ evidence being exported into an external training loop contrary to the isolation policy;
- buyer-private data being pooled into another customer's model without authorization;
- an asset with an applicable provider/contract restriction that conflicts with the proposed model-development use.

---

## 4. Runtime context vs training data

### TCJ Methodology Pack

The Methodology Pack exists specifically to transfer TCJ's conceptual judgment framework into a semantic judge at runtime.

Default rights state:

```text
runtime_context_allowed          true
benchmark_evaluation_allowed     true
model_development_allowed        false by default
training_eligibility             EVALUATION_ONLY
```

A buyer receiving or using the Methodology Pack in TCJ does **not** automatically receive permission to fine-tune, distill or train a model on the Methodology Pack.

A separate written Model-Development grant is required.

### Voice Profile

Default:

```text
runtime_context_allowed          true
benchmark_evaluation_allowed     true
model_development_allowed        false by default
training_eligibility             EVALUATION_ONLY
```

A customer-specific Voice Profile can become buyer-scoped training material only if the rights manifest explicitly authorizes that use.

### Private Evidence Tool output

PEE outputs are bounded evaluation evidence, not raw corpus exports.

Default:

```text
runtime_context_allowed          true, through bounded tool only
benchmark_evaluation_allowed     true
model_development_allowed        false by default
training_eligibility             EVALUATION_ONLY
```

Using PEE signals as RLHF/DPO/reward-model labels or synthetic-data filters is Model-Development Use and requires an explicit development license.

### Raw Private Evidence Vault

Default:

```text
runtime_context_allowed          false
raw_private_evidence_export      false
model_development_allowed        false
training_eligibility             PROHIBITED by default
```

A future separately licensed training corpus must be packaged from expressly eligible assets; it must not be created by simply opening the private vault to a buyer/model.

---

## 5. Provenance classes and training effect

Existing provenance classes remain authoritative:

- `H` — human-authored/native-human evidence;
- `HA` — human-directed, AI-assisted implementation/documentation;
- `OA` — OpenAI/ChatGPT Output;
- `TP` — third-party model Output;
- `D` — deterministic/factual system data;
- `MIX` — derived/mixed evidence.

Training eligibility is **not identical to provenance**, but provenance is a required input.

### Human-authored (`H`)

Human authorship is favorable evidence but is not sufficient by itself.

A human-authored asset may become `TRAINING_ELIGIBLE` only when rights, consent/confidentiality and the express Model-Development grant are also satisfied.

### Human-directed AI-assisted (`HA`)

Default to `EVALUATION_ONLY` or `REVIEW_REQUIRED` for model-development licensing unless the exact retained material and applicable provider terms have been reviewed.

### OpenAI Output (`OA`)

If materially retained in an asset, default to `EVALUATION_ONLY` for third-party model-development licensing unless an explicit current rights review establishes that the proposed use is permitted.

Human review, ACCEPT/EDIT/REWRITE status or buyer interest must not silently override this rule.

### Third-party model Output (`TP`)

Default to `REVIEW_REQUIRED` or `EVALUATION_ONLY` depending on the provider/license record. Provider-specific rights must be recorded.

### Deterministic (`D`)

Hashes, timestamps and mechanical calculations are usually not useful training content by themselves. Their inclusion does not grant rights to the underlying protected material.

### Mixed (`MIX`)

Default to `EVALUATION_ONLY` or `REVIEW_REQUIRED` until the component rights are separable and reviewed.

---

## 6. Current TCJ / Answers asset matrix

This is the default internal classification. It can be narrowed by contract; it may be broadened only through a separately recorded rights review.

| Asset | Typical provenance | Runtime context | Benchmark/eval | Default training eligibility |
|---|---|---:|---:|---|
| `TCJ-METHODOLOGY-BFF-v1.1` | H / HA / MIX | Yes | Yes | `EVALUATION_ONLY` |
| `TCJ-VOICE-ANSWERS-BFF-v1` | H / HA / MIX | Yes | Yes | `EVALUATION_ONLY` |
| Context Retriever rules/code | HA / D / possible OA | Internal | Yes | `REVIEW_REQUIRED` for model-development redistribution |
| Release Policy rules/code | H / HA / D | Internal | Yes | `REVIEW_REQUIRED` |
| bounded PEE assessment output | MIX | Yes through tool | Yes | `EVALUATION_ONLY` |
| raw TCJ private evidence/anchors | H / MIX | No raw export | Internal eval | `PROHIBITED` by default |
| hidden Qualification 2.0 evidence | H / MIX | No before authority run | Qualification only | `PROHIBITED` for candidate-model training |
| historical Batch 1 raw ChatGPT drafts | OA | No | Yes under benchmark scope | `EVALUATION_ONLY` |
| historical Batch 1 reviewed/final rows | H / OA / MIX | No raw runtime need | Yes | `EVALUATION_ONLY` by default |
| current Batch 2 AI-draft → human-review rows | OA / H / MIX | No raw runtime need | Yes when benchmark-eligible | `EVALUATION_ONLY` by default |
| a future independently human-authored clean corpus | H | Optional | Yes | `REVIEW_REQUIRED` until explicit rights manifest; may become `TRAINING_ELIGIBLE` |
| native-human preference/review labels over model outputs | H / MIX | Internal | Yes | `EVALUATION_ONLY` by default |
| Groq/Qwen/Gemini/Claude raw judge outputs | TP | Internal research | Yes subject to provider rights | `REVIEW_REQUIRED` |
| buyer-supplied private data | buyer-controlled | Tenant-local | Buyer-defined | `BUYER_CONTROLLED` |
| buyer-owned, rights-cleared training corpus | buyer-controlled / H | Tenant-local | Buyer-defined | `TRAINING_ELIGIBLE_WITH_CONDITIONS` when buyer authorizes |

### Important Batch 2 rule

A row does **not** become training-eligible merely because the native editor chose `REWRITE`.

`REWRITE` is an editorial/provenance label, not automatic legal clearance. A row proposed for training use needs row-level evidence that the final expression is independently human-authored enough for the intended rights claim, plus explicit rights/provider review.

---

## 7. Machine-readable `training_eligibility` contract

Every future buyer/export record that may plausibly be considered for model-development use should support:

```json
{
  "training_eligibility": {
    "state": "EVALUATION_ONLY",
    "policy_version": "TCJ-TRAINING-ELIGIBILITY-v1",
    "asset_version": "...",
    "provenance_classes": ["H", "OA", "MIX"],
    "runtime_context_allowed": false,
    "benchmark_evaluation_allowed": true,
    "model_development_allowed": false,
    "permitted_model_development_uses": [],
    "prohibited_model_development_uses": [
      "SFT",
      "fine_tuning",
      "RLHF",
      "DPO",
      "RLAIF",
      "reward_model_training",
      "distillation",
      "synthetic_training_filter",
      "checkpoint_selection"
    ],
    "provider_output_materially_involved": true,
    "provider_rights_review": "required",
    "human_authorship_review": "recorded_but_not_training_clearance",
    "rights_owner_or_authorized": null,
    "privacy_consent_clearance": null,
    "explicit_model_development_grant": false,
    "buyer_scope": null,
    "conditions": [],
    "reason_codes": ["mixed_provenance", "model_development_rights_not_granted"],
    "reviewed_at": null,
    "reviewed_by": null,
    "rights_manifest_sha256": null
  }
}
```

Do not omit `state` and expect buyers to infer it from provenance fields.

---

## 8. Eligibility decision rules

The Training Eligibility Gate applies in this order.

### Gate A — hard protected evidence

If an asset contains:

- hidden Qualification evidence intended to remain unseen by the candidate model;
- raw private TCJ vault evidence contrary to the isolation policy;
- another buyer's private evidence;

then the requested training use is `PROHIBITED` unless a newer explicit authority specifically creates a lawful isolated training package.

### Gate B — buyer-controlled data

If the asset is buyer-owned/buyer-supplied:

- TCJ does not assert ownership;
- default state is `BUYER_CONTROLLED`;
- training can be enabled only after buyer rights/consent authorization is recorded;
- authorization is tenant-specific and must not transfer to another buyer.

### Gate C — provider/model Output involvement

If `OA` or `TP` Output is materially retained:

- do not infer model-development rights from ordinary ownership language;
- consult the current provider terms/contract applicable to the asset and intended use;
- until cleared, state is `EVALUATION_ONLY` or `REVIEW_REQUIRED`.

### Gate D — human authorship

If content is genuinely independently human-authored and no restricted source Output is materially retained:

- confirm rights owner/authorization;
- confirm confidentiality/privacy/consent;
- confirm explicit Model-Development grant;
- then it may become `TRAINING_ELIGIBLE` or `TRAINING_ELIGIBLE_WITH_CONDITIONS`.

### Gate E — explicit grant

Even if all provenance/rights checks are favorable, no TCJ commercial buyer receives model-development rights merely by implication.

Without an explicit grant:

```text
model_development_allowed = false
```

---

## 9. Training use classes

When training is expressly allowed, record which uses are included rather than using one vague `training=true` flag.

Canonical use codes:

```text
SFT
fine_tuning
preference_data
RLHF
DPO
RLAIF
reward_model_training
distillation
synthetic_training_generation
synthetic_training_filter
checkpoint_selection
hyperparameter_optimization
evaluator_training
embedding_or_retrieval_index_for_model_development
```

A grant for one use does not imply all other use codes.

For example:

```json
{
  "state": "TRAINING_ELIGIBLE_WITH_CONDITIONS",
  "permitted_model_development_uses": ["SFT", "fine_tuning"],
  "prohibited_model_development_uses": ["distillation", "reward_model_training"],
  "conditions": ["buyer_internal_only", "named_model_family_only", "no_redistribution"]
}
```

---

## 10. TCJ private-server buyer mode

A private-server customer may want TCJ to improve a buyer-owned model using buyer-owned resources.

This is supported only through an explicit **Buyer Training Mode** policy boundary.

Default TCJ mode remains:

```text
training_mode = disabled
```

Buyer Training Mode may be enabled only when:

```text
buyer_data_state in (TRAINING_ELIGIBLE, TRAINING_ELIGIBLE_WITH_CONDITIONS)
AND buyer_training_authorization = true
AND tenant_isolation = verified
AND prohibited_TCJ_assets are excluded
AND training use code is permitted
```

The buyer's training pipeline may consume eligible **buyer-owned** evidence while TCJ's protected methodology/corpus remains evaluation infrastructure unless separately licensed.

This creates the intended separation:

```text
BUYER-ELIGIBLE TRAINING DATA
→ buyer training/fine-tuning loop

TCJ METHODOLOGY + PEE
→ evaluation / diagnosis / release authority
```

The two streams do not merge automatically.

---

## 11. Rights manifest

Any asset moved to `TRAINING_ELIGIBLE` or `TRAINING_ELIGIBLE_WITH_CONDITIONS` must have a signed/frozen manifest containing at minimum:

```text
asset_key
asset_version
asset_sha256
eligibility_policy_version
eligibility_state
provenance_classes
source lineage
provider/model involvement
provider terms/contract snapshot reference
human authorship basis
rights owner / authorization basis
privacy / consent basis
buyer legal entity if scoped
permitted use codes
prohibited use codes
conditions
territory / term if applicable
redistribution allowed? yes/no
sublicensing allowed? yes/no
reviewed_by
reviewed_at
agreement / amendment reference
manifest_sha256
```

Changing the underlying asset invalidates the old rights manifest unless the manifest explicitly covers the new version.

---

## 12. Buyer export requirements

Future buyer exports must keep these concepts separate:

```text
benchmark_metric_eligible
corpus_promotion_eligible
runtime_context_allowed
training_eligibility.state
model_development_allowed
```

A typical historical AI-assisted row should therefore be allowed to say:

```text
benchmark_metric_eligible       true
corpus_promotion_eligible       true
training_eligibility.state      EVALUATION_ONLY
model_development_allowed       false
```

This is not a defect. It is accurate rights/provenance reporting.

---

## 13. Claims policy

Do not market an asset as:

- “training-ready”;
- “training-safe”;
- “fully human-authored”;
- “unrestricted training data”;
- “owned outright for every use”;

unless the exact asset/version has passed the Training Eligibility Gate and the statement is supported by the rights manifest.

Safer language before clearance:

> **training-eligibility review available**

or:

> **evaluation-licensed dataset with row-level provenance; model-development rights available only for separately cleared assets**

---

## 14. Relationship to TCJ Qualification

Training eligibility must never contaminate Qualification integrity.

Rules:

1. hidden Qualification cases are not training material for the candidate evaluator;
2. failed Qualification cases may become exposed development evidence only after the exposure state is recorded;
3. exposed development evidence still remains `EVALUATION_ONLY` unless separately cleared for model-development use;
4. no model may be trained on fresh final Qualification evidence and then be evaluated against that same evidence as an authority claim;
5. the eligibility registry must preserve `qualification_exposure_state` when relevant.

---

## 15. Relationship to low-tier judge research

Groq/Qwen/Gemini/Claude stress-test outputs are **research evidence**, not automatically TCJ-owned training labels.

Default:

```text
benchmark/research use           allowed subject to provider terms
TCJ product calibration          allowed only within applicable rights
third-party model training       REVIEW_REQUIRED
```

Do not turn free-provider outputs into a commercial training corpus merely because the API call cost was zero.

---

## 16. Definition of done for a training-eligible asset

An asset may be labeled `TRAINING_ELIGIBLE` only when all are true:

```text
[ ] exact asset/version frozen
[ ] SHA-256 recorded
[ ] provenance classes complete
[ ] source lineage complete
[ ] provider-output involvement reviewed
[ ] rights owner / authorization recorded
[ ] confidentiality/privacy/consent cleared
[ ] intended model-development use codes listed
[ ] explicit Model-Development grant exists
[ ] conditions/prohibitions recorded
[ ] buyer scope recorded if applicable
[ ] rights manifest frozen
[ ] no hidden Qualification contamination
```

If any required item is unresolved, use `REVIEW_REQUIRED`, `EVALUATION_ONLY`, `BUYER_CONTROLLED` or `PROHIBITED` as appropriate.

---

## 17. Current conclusion

TCJ now treats **training eligibility as a first-class provenance/right state**, separate from quality, benchmark eligibility and runtime use.

The default commercial product remains evaluation-first:

```text
TCJ Methodology / Voice / PEE / Release Policy
→ evaluate and control model behavior
```

Training use is an additional licensed capability only for expressly cleared data:

```text
rights-cleared human or buyer-owned data
→ Training Eligibility Gate
→ frozen Rights Manifest
→ expressly permitted training use
```

This lets TCJ support future buyer training workflows without falsely converting the existing mixed-provenance benchmark corpus or TCJ documentation into unrestricted training data.