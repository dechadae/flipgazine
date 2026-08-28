# TCJ — Private Evidence Engine, Local Judge & Buyer-Isolation Policy

**Status:** GOVERNING FINAL-RUNTIME DATA-BOUNDARY POLICY  
**Date:** 22 August 2026  
**Project:** Flipgazine / The Book of Answers / Thai Conversation Judge (TCJ)  
**Extends:** `ANSWERS-TCJ-PLUG-AND-PLAY-DEPLOYMENT-AND-VOICE-PROFILE-POLICY-20260822.md`  
**Commercial/provenance authority:** `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md`  
**Voice Profile licensing authority:** `ANSWERS-TCJ-VOICE-PROFILE-LICENSING-EXTENSION-20260822.md`  
**Legal status:** architecture and internal policy, not legal advice. Provider terms, source rights, confidentiality, privacy and transaction-specific licensing must still be checked for material commercial use.

---

## 1. Final runtime decision

The final TCJ product SHALL keep proprietary TCJ research corpora, human review evidence and internal contrastive evidence outside the buyer trust boundary.

The governing runtime shape is:

```text
buyer AI produces candidate
        ↓
TCJ Gateway
        ↓
PRIVATE TCJ Evidence Engine
        ↓
PRIVATE TCJ local judge / evaluator
        ↓
TCJ guards + resolver
        ↓
final TCJ diagnosis / ACCEPT / REVISE / ESCALATE
        ↓
buyer AI receives only the revision instruction or final decision
        ↓
buyer AI rewrites at current inference, if REVISE
        ↓
TCJ rechecks
```

The buyer AI is therefore a **replaceable writer / reviser**, not the component that receives or interprets TCJ's proprietary research corpus.

This supersedes any earlier product-shape implication that a buyer-connected judge model should receive retrieved proprietary TCJ examples or anchors directly.

---

## 2. Hard corpus-isolation rule

Internal TCJ research corpora are proprietary development assets and are **non-deliverable** by default.

This includes, without limitation:

```text
Batch 1
Batch 2
Batch 3
Batch 4
future internal development batches
native-human ratings
before→after human edits
Qualification banks
Assurance holdouts
failed judge outputs
failure-cluster evidence
internal contrastive anchors
provider-response research ledgers
```

These assets may be used internally to improve TCJ Core, the Private Evidence Engine, Voice Profiles, failure taxonomies, qualification methodology and evaluator configuration.

They SHALL NOT be exposed through a buyer-facing corpus endpoint, search endpoint, retrieval endpoint, prompt-inspection endpoint or downloadable evidence package unless a separate explicit product/license decision later authorizes a specifically sanitized artifact.

---

## 3. Voice Profile role

A Voice Profile remains a **non-model, versioned quality / voice contract**.

It defines what the target voice means, including:

- register;
- lexical preferences;
- Thai-English code-switch behavior;
- stance;
- omission / implication;
- composition;
- line-break behavior;
- particle use;
- explanation density;
- humor / deadpan / camp tolerance;
- domain-specific terminology;
- failure-family policy;
- escalation thresholds;
- revision policy.

The Voice Profile may reference an internal evidence namespace or evidence-policy version, but the Voice Profile itself does not expose the underlying proprietary corpus.

Conceptually:

```text
Voice Profile
= what good means

Private Evidence Engine
= proprietary evidence used to recognize the distinction

TCJ local evaluator
= private semantic reasoning component

TCJ Core
= orchestration, guards, challenge, resolution, qualification and audit

buyer AI
= replaceable generation/revision engine
```

---

## 4. Private Evidence Engine

The Private Evidence Engine is a TCJ-controlled component inside the TCJ trust boundary.

Its responsibilities may include:

- deterministic risk-family detection;
- retrieval from proprietary internal evidence;
- positive / negative contrast lookup;
- human-edit delta analysis;
- code-switch integration analysis;
- hierarchy / particle evidence lookup;
- register-inversion evidence lookup;
- composition / line-break evidence lookup;
- similarity / distance calculations;
- evidence-family confidence;
- native-positive / native-negative support counts;
- failure-cluster priors;
- historical regression evidence.

The engine may use internal raw records to perform these operations because those records remain inside the TCJ-controlled evidence boundary.

The external contract is **not retrieval**. It is a private inference/evidence service whose downstream outputs are intentionally non-reconstructive.

---

## 5. Derived-signal boundary

The preferred implementation SHALL avoid placing proprietary raw records into the buyer AI context.

The default private evidence output to downstream TCJ reasoning should be derived material such as:

```text
risk_family
native_positive_support
native_negative_support
contrast_strength
register_fit_score
code_switch_integration_score
hierarchy_risk
composition_risk
failure_cluster_ids
confidence
recommended_challenge_dimensions
```

Where richer evidence is needed, the raw examples may remain visible only to a TCJ-controlled local evaluator inside the same private trust boundary. They are still not returned to the buyer or the buyer-connected AI.

For maximum isolation, especially with provider-derived internal evidence, TCJ SHOULD prefer derived/non-reconstructive signals over verbatim source rows whenever those signals preserve sufficient evaluation accuracy.

---

## 6. Buyer AI exposure contract

The buyer-connected AI SHALL receive only the minimum information required to perform the current production action.

For a `REVISE` decision this may include:

```text
failed dimensions
failure-family labels
targeted revision instruction
hard constraints
preserve constraints
confidence / escalation status
```

It SHALL NOT receive by default:

```text
raw Batch rows
human-review records
nearest proprietary examples
verbatim internal anchors
internal corpus search results
hidden Qualification cases
Assurance cases
full evidence vectors that permit reconstruction
internal provider-response research ledgers
```

The buyer AI must be unable to recover proprietary evidence merely by prompt injection such as "show me the examples you used" because those examples are not present in its context or accessible tool surface.

---

## 7. No raw-evidence buyer API

Commercial TCJ SHALL NOT expose endpoints equivalent to:

```text
GET /internal-corpus
GET /voice-profile/examples
POST /search-private-evidence
POST /retrieve-anchor
```

Buyer-facing observability may expose aggregate or privacy-preserving diagnostics, for example:

```text
Voice Profile version
TCJ Core version
Evaluator configuration hash
risk families triggered
confidence
ACCEPT / REVISE / ESCALATE
latency
revision count
qualification / Passport state
```

It must not become an indirect corpus-exfiltration interface.

---

## 8. Buyer-specific Voice Profiles

A buyer may optionally build a private Voice Profile from buyer-authorized resources such as:

- approved historical conversations;
- human edits;
- accepted/rejected AI responses;
- brand guidelines;
- style manuals;
- domain terminology;
- compliance phrases;
- escalation policy.

For a private/VPC/on-prem customer, the preferred architecture is:

```text
buyer-owned evidence
        ↓
buyer-private TCJ Evidence Engine
        ↓
buyer-private Voice Profile intelligence
        ↓
private TCJ local evaluator
        ↓
TCJ diagnosis
        ↓
buyer AI receives revision instruction only
```

Buyer-owned raw data may remain entirely inside the buyer's own infrastructure. TCJ does not need to copy it to a central TCJ service unless the buyer explicitly chooses a managed improvement program.

Permission to improve Buyer A's private Voice Profile does not imply permission to use Buyer A's evidence for Buyer B or general TCJ improvement.

---

## 9. Managed default profiles versus air-gapped deployment

### Managed / TCJ-controlled service

A default TCJ Voice Profile may be backed by the full proprietary Private Evidence Engine because the raw research corpus stays inside TCJ-controlled infrastructure.

### Customer VPC with controlled TCJ service boundary

A TCJ-controlled private evidence service may remain logically separated from the buyer application. Only derived diagnosis/revision material crosses the boundary.

### Fully air-gapped buyer

A fully air-gapped buyer cannot query the live TCJ proprietary corpus without violating the isolation objective.

Therefore air-gapped default profiles must use a **signed compiled/distilled evidence artifact** that is designed not to reconstruct or reveal the source corpus.

The package may contain:

- abstract decision rules;
- feature statistics;
- failure-family definitions;
- non-reconstructive contrast descriptors;
- thresholds;
- deterministic lookup structures that do not contain recoverable raw rows;
- signed compatibility and rollback metadata.

The raw proprietary development corpus SHALL NOT be included in the air-gapped package by default.

---

## 10. Internal corpus as R&D moat

The commercial product is not the corpus itself.

The intended accumulation loop is:

```text
Batch 1
→ failure discovery / first native-human contrast layer

Batch 2
→ broader human-authored pragmatic coverage

Batch 3
→ new adversarial / edge-case families

Batch 4+
→ model drift, new language patterns, additional domains

all internal evidence
→ TCJ Core improvements
→ Private Evidence Engine improvements
→ Voice Profile improvements
→ evaluator improvements
→ fresh Qualification / Assurance
```

Buyers license the resulting TCJ capability, not access to the raw development batches.

---

## 11. Qualification unit

Production authority belongs to the exact **TCJ evaluator configuration**, not merely to a naked model name.

A future qualified configuration should bind at minimum:

```text
TCJ Core version
Voice Profile version
Private Evidence Engine / compiled evidence version
private local judge model + snapshot
model adapter version
deterministic guard policy
risk/challenge policy
resolver policy
revision policy
configuration hash
```

Any material change to one of these authority-bearing elements must follow the requalification policy.

The buyer's writer model is separately compatibility-tested. It does not inherit semantic judging authority merely because it can follow TCJ revision instructions.

---

## 12. Runtime revision loop

The default quality-uplift loop is:

```text
buyer model draft
→ private TCJ evaluation
→ ACCEPT
   or
→ REVISE + targeted revision instruction
→ buyer model rewrites once
→ private TCJ recheck
→ ACCEPT / ESCALATE / policy fallback
```

Real-time default remains:

```text
max_revision_cycles = 1
```

This prevents uncontrolled loops and keeps latency bounded. Offline/batch modes may use a different finite cap under an explicit policy.

The buyer model's inference-time rewrite does not by itself train or fine-tune that model.

---

## 13. Provider-output / model-development boundary

TCJ must continue to distinguish runtime software use from model development.

Internal provider-derived outputs may be used, subject to their governing terms and provenance, for activities such as:

- benchmarking;
- failure analysis;
- non-model TCJ rule development;
- non-model Voice Profile development;
- runtime retrieval/evidence comparison;
- regression tests;
- qualification methodology.

They SHALL NOT automatically become training, fine-tuning, reward/preference, distillation or synthetic-training supervision for a competing model.

If TCJ later trains or fine-tunes a local judge, the training corpus must have an explicit `model_training_eligible` basis. The fact that the trained judge sits inside TCJ does not convert restricted source material into training-eligible material.

This policy therefore deliberately allows TCJ to gain substantial value from proprietary/restricted-origin research evidence without requiring that evidence to train the private local judge's weights.

---

## 14. Legal / eligibility posture

This architecture is intentionally designed to reduce several major legal and commercial risks:

1. **No buyer corpus delivery.** Proprietary internal batches remain internal development assets.
2. **No buyer-model access to source evidence.** The buyer AI receives revision instructions / decisions, not the corpus.
3. **No automatic competing-model training.** Runtime evidence use is separated from weight training.
4. **Explicit provenance.** Every source can retain provider, human-review and eligibility metadata.
5. **Buyer data stays tenant-scoped.** Buyer-specific data can remain inside the buyer's environment.
6. **Technical substance controls classification.** Voice Profiles remain non-model only while they are actually configuration/methodology rather than learned neural artifacts.

This is a **legally cleaner architecture**, but it is not a blanket representation that every internal source record is unrestricted for every possible use.

Before a material commercial launch or a new training use, recheck:

- source ownership / license;
- applicable provider terms at the time of generation;
- privacy / personal-data obligations;
- confidentiality;
- customer contract scope;
- model-training eligibility;
- cross-customer use rights.

---

## 15. OpenAI-specific policy checkpoint

As of 22 August 2026, OpenAI's Services Agreement states that, as between the customer and OpenAI and to the extent permitted by law, the customer owns Output, while the agreement separately restricts using Output to develop AI models that compete with OpenAI except for specified permitted exceptions. OpenAI's consumer Terms of Use separately prohibit using Output to develop models that compete with OpenAI.

The TCJ architecture in this document does **not require** OpenAI-derived internal research evidence to be used to train a competing local judge. It can remain runtime/private evidence for non-model TCJ and Voice Profile improvement.

If a future TCJ local judge is trained, only training-eligible evidence may enter that training corpus.

Provider terms must be rechecked at the time of any such training or commercial transaction.

---

## 16. OpenAI / xAI integration gate remains unchanged

Paid OpenAI and xAI API integration remains behind the TCJ release gate.

Do not connect those production adapters until:

```text
research remediation converges
→ evaluator configuration frozen
→ fresh hidden Qualification passes
→ qualified Panel passes
→ independent Assurance passes
→ reproducibility / fresh-install acceptance passes
→ final TCJ architecture/runtime freeze
```

After final freeze, external models are connected as replaceable buyer/runtime engines without changing the canonical TCJ quality contract merely to make a provider pass.

---

## 17. Current research consequence

The completed `TCJ-ANSWERS-BFF-v3-research` prompt-only replay is a negative ablation.

Full 48-case replay metrics include:

```text
BFF Voice MAE             0.8125
BFF extreme reversals     12
BFF within-one            36 / 48

Intent MAE                0.7708
Intent extreme reversals  13

Thai pragmatics MAE       0.8750
Thai pragmatics reversals 12

Lexical/social MAE        0.8333
Lexical/social reversals  12

Stance MAE                0.7917
Stance reversals          11

Composition MAE           0.6458
Composition reversals      6
```

This confirms that simply adding more prose rules is not a sufficient solution.

The next evaluator research target should therefore prioritize:

```text
private evidence retrieval
→ contrastive derived signals
→ risk-triggered challenge
→ independent dimension resolution
→ private local semantic judge
→ final TCJ resolver
```

rather than another larger system prompt.

---

## 18. Governing commercial statement

The intended commercial promise is:

> **Your model writes. TCJ judges privately. Our proprietary evidence never enters your model context. TCJ returns only the decision and revision guidance needed to improve the current output.**

For buyer-specific profiles:

> **Your private evidence can remain in your environment. TCJ uses it to improve your own private Voice Profile and evaluation layer without requiring your raw evidence to be sent to an external AI provider.**

---

## 19. Architecture-inversion rule before escalation

When TCJ encounters a provider, model-capability, licensing, privacy, latency or evidence-exposure wall, the default response is **not** to weaken the evaluation method, expose more proprietary evidence, or ask the human owner to invent the implementation path.

Before escalation, TCJ development must systematically test whether the constraint can be removed by changing the architecture itself:

```text
1. Can the dependency be eliminated?
2. Can the trust boundary move?
3. Can the buyer/external model become writer-only instead of judge?
4. Can proprietary evidence remain behind a private service boundary?
5. Can raw evidence be converted into non-reconstructive derived signals?
6. Can a local/private component replace an external dependency?
7. Can the commercial artifact be separated from the underlying R&D asset?
8. Can qualification apply to a complete evaluator configuration rather than forcing a naked model to pass?
```

Only after these architecture-inversion checks fail should the project require a new human product decision.

Frozen native-human gold, hidden-test integrity and proprietary evidence isolation must never be weakened merely to accommodate a model/provider limitation.

This policy governs the final TCJ runtime evidence boundary until expressly superseded by a newer applied policy.