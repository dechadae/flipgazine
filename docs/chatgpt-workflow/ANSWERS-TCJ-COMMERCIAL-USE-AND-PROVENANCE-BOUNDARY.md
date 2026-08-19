# TCJ — Commercial Use, Model-Development Boundary & Provenance Policy

**Status:** GOVERNING INTERNAL COMMERCIAL POLICY  
**Created:** 20 August 2026  
**Project:** Flipgazine / The Book of Answers  
**Applies to:** TCJ Core, General Thai, Answers Voice, public/private evaluators, calibration guards, benchmark outputs, methodology documents and related buyer packages  
**Architecture authority:** `ANSWERS-THAI-CONVERSATION-JUDGE-ARCHITECTURE.md`  
**Commercial-plan authority:** `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md`  
**Legal status:** internal operational policy and contract-drafting guidance; **not legal advice and not a substitute for counsel on a specific transaction**

---

## 1. Purpose

This document establishes the commercial boundary between:

1. using TCJ as an **evaluation / benchmark system**; and
2. using TCJ, TCJ outputs or TCJ-derived evidence as part of **developing an AI model**.

The distinction must be documented before TCJ materials, private deployment rights, benchmark outputs or repository access are offered to a frontier-model lab, foundation-model developer, enterprise AI team or other buyer.

The policy exists for four reasons:

- preserve accurate provenance for ChatGPT/OpenAI-assisted assets;
- avoid granting broader rights than the project can safely support;
- keep ordinary benchmark/evaluation licensing commercially usable;
- create a clear diligence path for any future model-development license.

The core rule is:

> **A TCJ Benchmark License measures a model. It does not grant the right to use TCJ as a feedback, supervision, reward, selection or optimization mechanism for developing that model.**

---

## 2. Current OpenAI terms snapshot

This policy records the terms relevant to the current architecture as of **20 August 2026**. Terms may change; they must be rechecked before a material license is signed.

### Individual Terms of Use

OpenAI's Terms of Use effective **1 January 2026** state, in substance, that:

- as between the user and OpenAI, and to the extent permitted by applicable law, the user owns Output and OpenAI assigns to the user any rights OpenAI has in that Output;
- Output may not be unique;
- users remain responsible for ensuring their use of Content complies with applicable law and the Terms; and
- users may not use Output to develop models that compete with OpenAI.

Official source:

`https://openai.com/policies/terms-of-use/`

### OpenAI Services Agreement

The current Services Agreement likewise restricts customers, except for defined permitted exceptions, from using Output to develop AI models that compete with OpenAI products and services.

Official source:

`https://openai.com/policies/services-agreement/`

### Important interpretation rule for this project

This document **does not claim that “benchmark use” is an explicit OpenAI safe harbor**. The terms use the broader concept of developing competing models, not merely training them.

Accordingly, this project adopts a conservative licensing boundary: TCJ can be licensed for measurement, QA, reporting and release evaluation, while model-development rights are **not granted by default** where ChatGPT/OpenAI-derived Output is materially involved.

---

## 3. The two commercial-use classes

### 3.1 Benchmark Use

**Benchmark Use** means using TCJ to measure, compare, diagnose, validate, red-team or report the behavior of an AI system **without using TCJ outputs as a signal for developing the underlying model**.

Permitted Benchmark Use may include:

- evaluating an already-created model or product;
- comparing frozen model releases;
- regression testing an already-built application;
- Thai conversational-quality QA;
- safety or linguistic evaluation;
- model-card or research-report metrics;
- independent benchmark publication;
- release-readiness review of a finalized candidate;
- customer-service / banking / hospitality / product-language QA;
- evaluating vendor models for procurement;
- diagnosing product-layer behavior for human review;
- application-layer prompt, routing or UX quality checks where the underlying model is not being trained, fine-tuned or otherwise developed from TCJ feedback.

The operative question is:

> **Are we measuring what the system currently does, or are TCJ results being fed back into making the underlying model better?**

### 3.2 Model-Development Use

**Model-Development Use** means using TCJ, its outputs, diagnoses, scores, labels, calibration evidence or derived data directly or indirectly as a mechanism to train, fine-tune, optimize, distill, select, supervise or otherwise improve an AI model.

Model-Development Use includes, without limitation:

- supervised fine-tuning labels;
- training examples derived from TCJ failures;
- preference data;
- RLHF labels;
- DPO / IPO / preference-optimization labels;
- RLAIF or evaluator-as-reward loops;
- reward-model targets;
- distillation targets;
- synthetic-training-data acceptance/rejection filters;
- automated data selection for model training;
- checkpoint selection during training or post-training;
- hyperparameter selection based on TCJ scores;
- architecture/model-selection loops whose purpose is to improve the model;
- using TCJ disagreement cases to construct corrective training sets;
- using TCJ guard outputs as machine supervision;
- repeatedly optimizing a competing model against TCJ until its score improves;
- training another evaluator or reward model to imitate TCJ judgments for use in model development.

The operative question is:

> **Do TCJ results become part of the learning or optimization loop?**

If yes, treat the use as Model-Development Use regardless of whether the buyer calls it “benchmarking,” “evaluation,” “post-training,” “alignment,” “quality improvement,” “checkpointing,” or another label.

---

## 4. Frontier-lab examples

The following examples define the intended commercial line for an AI frontier/foundation-model lab.

| Use case | Classification | Default TCJ Benchmark License |
|---|---|---|
| Run TCJ once on a frozen model and report Thai quality | Benchmark Use | Permitted |
| Compare several already-released models | Benchmark Use | Permitted |
| Publish TCJ results in a model card/paper | Benchmark Use | Permitted, subject to attribution/confidentiality terms |
| Independent linguistic/safety red-team | Benchmark Use | Permitted |
| Evaluate a finalized release candidate as a pass/fail gate | Benchmark Use | Permitted |
| Use TCJ to audit a deployed chatbot without changing model weights | Benchmark Use | Permitted |
| Tune product prompts/routing/UI only, without changing the underlying model or producing training data | Application-layer evaluation | Normally permitted; document scope |
| Use TCJ to choose the best checkpoint during training | Model-Development Use | Not granted |
| Turn TCJ failures into SFT examples | Model-Development Use | Not granted |
| Use TCJ scores as DPO/RLHF/RLAIF rewards | Model-Development Use | Not granted |
| Filter synthetic data by TCJ score before training | Model-Development Use | Not granted |
| Train a reward model to imitate TCJ | Model-Development Use | Not granted |
| Repeatedly adjust model weights until TCJ score rises | Model-Development Use | Not granted |
| Use TCJ disagreement data to build the next foundation-model training set | Model-Development Use | Not granted |

### Release gating vs checkpoint selection

These are intentionally treated differently.

**Release gating** evaluates an already-finalized candidate and decides whether to ship it.

**Checkpoint selection** uses TCJ during model development to decide which learned state becomes the next model.

The latter is part of a development loop and is outside the default Benchmark License.

---

## 5. Enterprise product evaluation is different from foundation-model development

A bank, hotel group, marketplace, telco or other enterprise can use TCJ to test the Thai quality of an AI product without necessarily developing a competing foundation model.

Examples normally within Benchmark Use:

```text
customer question + chatbot response
→ TCJ
→ QA report
→ human product team fixes workflow/prompt/content policy
```

Examples that cross into Model-Development Use:

```text
customer question + chatbot response
→ TCJ score / labels
→ training dataset
→ fine-tune model
```

or:

```text
candidate model checkpoints
→ TCJ
→ select / optimize checkpoint
→ next training cycle
```

The buyer's industry is therefore not decisive. **The feedback loop is decisive.**

---

## 6. Asset provenance classes

TCJ is a mixed-provenance system. Commercial rights and legal protection are not identical across every component, so buyer packages must not flatten everything into a claim of uniform human authorship.

Use the following provenance classes.

### H — Human-authored / native-human evidence

Examples:

- native-human ACCEPT / EDIT / REWRITE decisions;
- final human edits/rewrites to the extent authored by the human editor;
- human-created editorial judgments;
- human-created research decisions;
- manually determined methodology choices;
- human-selected calibration evidence and interpretations.

### HA — Human-directed, AI-assisted implementation

Examples:

- architecture assembled through iterative human direction with ChatGPT coding assistance;
- code substantially edited, selected, coordinated or integrated by the human developer;
- methodology documents drafted with AI assistance and substantively directed/revised by the human author.

### OA — OpenAI/ChatGPT Output

Examples:

- raw ChatGPT-generated code blocks retained substantially as generated;
- raw ChatGPT-generated Thai drafts;
- ChatGPT-generated audit/diagnostic text;
- other retained output produced by OpenAI services.

### TP — Third-party model output

Examples:

- Qwen/Groq diagnoses;
- other external evaluator outputs.

These remain subject to the relevant provider terms and should never be misrepresented as human-authored.

### D — Deterministic / factual system data

Examples:

- hashes;
- IDs;
- timestamps;
- deterministic score calculations;
- routing traces;
- version numbers;
- append-only provenance records.

### MIX — Derived / mixed-provenance research evidence

Examples:

- raw-model vs calibrated-model vs human disagreement records;
- Evaluator Calibration Delta Dataset;
- guard evidence derived from machine/human comparison;
- benchmark reports combining human and model evidence.

---

## 7. Commercial provenance matrix

Maintain a transaction-specific version of this matrix before a buyer receives material non-public assets.

| Asset | Typical provenance | Benchmark licensing | Model-development licensing |
|---|---|---|---|
| TCJ orchestration/runtime | HA / OA mix | Yes, subject to agreement | Separate rights review required |
| TCJ Core methodology | HA / MIX | Yes | Separate rights review required |
| `general-v1` profile | HA / MIX | Yes | Separate rights review required |
| `answers-bff-v2` profile | H / HA / MIX | Yes | Separate rights review required |
| Deterministic score/verdict logic | HA / D | Yes | Review required if bundled with OA implementation |
| Calibration guard definitions | H / HA / MIX | Yes | Separate review |
| Raw ChatGPT Batch 1/2 drafts | OA | Evaluation-only by default | Not offered by default |
| Native-human final Thai | H + inherited source provenance where applicable | Yes within stated license | Case-by-case provenance review |
| Human ACCEPT/EDIT/REWRITE decisions | H | Yes | Case-by-case review |
| Qwen raw diagnoses | TP | Yes subject to provider rights | Provider + project rights review |
| Calibration delta evidence | MIX | Yes | Separate review |
| Public benchmark result | MIX / D | Yes | Does not itself grant development rights |
| Documentation/diagrams | H / HA | Yes | Documentation license does not imply model-development rights |

This table is an operational classification, not a legal opinion about copyrightability.

---

## 8. Copyright, ownership and licensing are separate questions

Do not use the phrase “we own every part of TCJ by copyright.”

The safer position is:

- OpenAI's current Terms allocate Output ownership to the user as between the user and OpenAI, to the extent permitted by applicable law;
- copyright protection depends on applicable law and sufficient human authorship;
- abstract ideas, methods, systems and procedures are not protected by copyright merely because they were documented;
- specific human-authored expression, source-code contributions, documentation, diagrams and original selection/arrangement may have copyright protection;
- confidential implementation know-how, calibration evidence and methods may also be protected contractually and potentially as trade secrets when the legal requirements are satisfied;
- TCJ can be commercially licensed even where copyright is not the sole or strongest legal right.

Commercial packages should therefore rely on a **bundle of rights and controls**, not a single copyright claim:

```text
software license
+ contractual permitted-use limits
+ confidential know-how
+ private calibration evidence
+ documentation
+ access control
+ support / implementation services
+ brand / attribution terms
+ applicable IP rights
```

---

## 9. Default TCJ Benchmark License scope

Until counsel approves broader rights, the commercial default is **Benchmark Use only**.

### Permitted by default

The agreement may authorize the buyer to:

- submit scenarios and model responses to TCJ;
- receive diagnoses, ratings, flags and deterministic verdicts;
- run internal regression/evaluation suites;
- compare models for reporting/procurement/research;
- perform Thai-language QA;
- use benchmark results for release-readiness assessment;
- publish agreed aggregate benchmark findings;
- integrate TCJ into QA pipelines that do not train or optimize the underlying model.

### Not granted by default

The agreement should state that no right is granted to use TCJ or TCJ-derived information as:

- model-training data;
- fine-tuning supervision;
- reward/preference labels;
- distillation targets;
- synthetic-data training filters;
- checkpoint/model optimization signals;
- evaluator/reward-model training targets intended for model development;
- any other direct or indirect mechanism for developing a competing AI model where that use would exceed the rights available for the included assets.

### No implied rights

Access to any of the following does **not** imply Model-Development rights:

- API access;
- benchmark scores;
- diagnoses;
- methodology documents;
- source code;
- private deployment;
- calibration reports;
- repository access;
- human-review evidence.

Model-Development rights must be expressly granted in a separately reviewed written agreement.

---

## 10. Contract-drafting language for counsel

The following is a **drafting concept**, not final legal language.

### Benchmark Use concept

> “Benchmark Use” means use of the Licensed Materials solely to measure, compare, diagnose, validate, test, red-team or report the behavior of an AI system, without using the Licensed Materials or resulting outputs as training, fine-tuning, reward, preference, distillation, data-selection, checkpoint-selection or other model-development signals.

### Model-Development Use concept

> “Model-Development Use” means use of the Licensed Materials, their outputs or derived information directly or indirectly to train, fine-tune, optimize, distill, supervise, select checkpoints for, generate or filter training data for, or otherwise improve or develop an AI model.

### No implied development rights concept

> The grant of Benchmark Use rights does not include Model-Development Use. No Model-Development Use rights arise by implication, estoppel, receipt of source code, private deployment, access to benchmark results, or access to documentation.

### Buyer disclosure concept

> Before using the Licensed Materials in a process connected to model training, fine-tuning, post-training, reward modeling, preference optimization, synthetic-data generation, model/checkpoint selection or analogous development activity, Licensee must obtain Licensor's prior written approval.

These concepts should be converted into jurisdiction-appropriate language by qualified technology/IP counsel before the first material frontier-model transaction.

---

## 11. Buyer diligence question — mandatory for frontier/model labs

Before issuing a non-trivial trial, private deployment or license to a frontier/foundation-model developer, obtain a written answer to:

> **Will TCJ results be used solely for evaluation/reporting, or will any TCJ score, diagnosis, label, flag, rationale, calibration result or derived data feed into training, fine-tuning, preference/reward optimization, synthetic-data generation/filtering, checkpoint selection or another model-development process?**

Record the answer with:

```text
buyer
project / team
intended model(s)
intended use
benchmark-only confirmation
application-layer optimization, if any
model-development use requested? yes/no
assets requested
license version
reviewed by
review date
```

If the answer is unclear, do not assume Benchmark Use. Escalate for clarification/legal review.

---

## 12. Required deal record

For each commercial TCJ transaction maintain a private deal record containing at minimum:

```text
deal_id
buyer legal entity
buyer team
purpose
licensed TCJ versions
profiles included
guard-set version
source-code access yes/no
private calibration evidence yes/no
corpus access yes/no
permitted-use class
prohibited-use clause version
asset provenance manifest
applicable provider-terms snapshot
agreement version
start / end date
exceptions approved
counsel review if required
```

The transaction record is part of provenance and diligence, not marketing collateral.

---

## 13. Source-code access does not change the use boundary

A buyer may receive:

- hosted API access only;
- a private container/package;
- a source-available private deployment;
- selected repository source;
- or, in a strategic diligence process, deeper repository access.

None of these delivery methods automatically changes the licensed purpose.

A frontier lab receiving TCJ source code under a Benchmark License still has only Benchmark Use rights.

Conversely, withholding source code does not make an otherwise model-development feedback loop into Benchmark Use. **Purpose and feedback flow govern the classification.**

---

## 14. Public benchmark and buyer benchmark are separate from training-data licensing

The existence of the public Voice benchmark does not place the private methodology, corpus or calibration evidence into the public domain.

Public users can evaluate responses under the published interface and receive the published result surface. They do not thereby receive:

- private corpus rights;
- source-code rights;
- calibration-dataset rights;
- guard-evidence rights;
- training rights;
- model-development rights;
- repository rights.

Similarly, a paid buyer can license TCJ without licensing any raw ChatGPT-generated corpus.

This separation should remain explicit in every data-room package and commercial pitch.

---

## 15. Future Model-Development License

A future `TCJ Model-Development License` is **not prohibited as a business concept**, but it must not be offered automatically from the current mixed-provenance package.

Before such a license exists, perform a dedicated review covering:

1. the precise assets to be included;
2. whether each included asset contains or is derived from OpenAI Output;
3. which OpenAI service/account and terms governed creation of that Output;
4. third-party evaluator/provider terms;
5. human-authorship / copyright status where relevant;
6. trade-secret/confidentiality status;
7. whether the proposed buyer/model would create a terms conflict;
8. whether an independently authored replacement implementation or other rights-cleared version is necessary;
9. local law and contract requirements;
10. written legal advice for the actual transaction.

Do **not** assume that renaming a development activity “benchmarking” changes its legal character.

Do **not** assume that independently rewriting one code component automatically clears every provenance or contractual issue in the overall methodology/dataset package.

---

## 16. Commercial positioning

Buyer-facing language should stay simple:

> **TCJ is licensed for independent Thai conversational evaluation, QA, benchmarking and reporting. Model-training or model-development rights are separate and are not included unless expressly agreed in writing.**

For a frontier lab:

> **You can benchmark a frozen model with TCJ. Using TCJ judgments as a training, reward, preference, distillation, synthetic-data or checkpoint-optimization signal requires a separately reviewed license.**

Do not lead a sales conversation with legal complexity. Provide the restriction clearly in the written scope, proposal and agreement.

---

## 17. Repository / data-room disclosure policy

The full Flipgazine/Answers repository is not a routine evaluation deliverable.

Normal buyer evaluation should use progressively disclosed material:

```text
public Book / Voice / benchmark
→ methodology summary
→ selected benchmark/calibration evidence
→ API or controlled private trial
→ scoped technical documentation
→ limited source/private deployment if deal requires
→ deeper repository diligence only for strategic partnership/acquisition
```

The complete repository contains mixed provenance, unpublished research, calibration history and commercial/security records. Full access should therefore require an appropriate confidentiality and diligence framework.

---

## 18. Terms-change control

Because provider terms may change, recheck the relevant terms when any of these occurs:

- before signing the first frontier-model license;
- before granting Model-Development rights;
- before transferring substantial TCJ source code to a model developer;
- after OpenAI materially changes its Terms of Use or Services Agreement;
- when TCJ begins using a new model/provider whose outputs become part of the licensed asset;
- before a strategic acquisition or IP assignment.

Record:

```text
provider
terms document
version/effective date
review date
relevant restriction
assets affected
commercial consequence
```

Never silently update historical provenance to match newer terms. Preserve which terms applied when an asset was created where that information can be determined.

---

## 19. Governance rule

When commercial urgency conflicts with provenance clarity, provenance clarity wins.

Do not:

- describe AI-generated material as human-generated;
- promise unrestricted model-development rights without review;
- erase raw/final provenance;
- represent Benchmark Use as an explicit provider safe harbor;
- rely on “training” as the only restricted category when the governing terms use broader development language;
- give full repository access merely because a buyer asks to inspect the benchmark.

The project may move quickly commercially while remaining precise about what is being licensed.

---

## 20. Current default decision

As of **20 August 2026**:

```text
TCJ Benchmark License
STATUS                  available commercial path
DEFAULT PURPOSE         evaluation / QA / reporting
FRONTIER-LAB USE        frozen-model benchmark permitted by project policy
MODEL-DEVELOPMENT USE   not granted by default
RAW CHATGPT CORPUS      not included by default
FULL REPOSITORY         not included by default
SOURCE CODE             scoped deal-by-deal
FUTURE DEVELOPMENT      separate provenance + terms + legal review
```

This is the governing project policy until expressly superseded by a newer commercial-use/provenance document.
