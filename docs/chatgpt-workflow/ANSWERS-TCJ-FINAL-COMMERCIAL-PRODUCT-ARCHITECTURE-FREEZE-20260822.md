# TCJ — Final Commercial Product Architecture Freeze

**Status:** FROZEN PRODUCT ARCHITECTURE — IMPLEMENTATION / QUALIFICATION / RELEASE AUTHORITY PENDING  
**Freeze date:** 22 August 2026  
**Project:** Flipgazine / The Book of Answers / Thai Conversation Judge (TCJ)  
**Scope:** final commercial product topology, trust boundaries, component roles, judge-runtime abstraction, evidence exposure, revision loop and deployment shape  
**Does not mean:** TCJ is production-ready, qualified, assured, security-accepted or commercially released  

This document freezes the intended final commercial TCJ architecture. Future implementation must converge toward this architecture rather than redesigning the product whenever a model/provider limitation appears.

If an implementation detail conflicts with this freeze, the implementation must change unless a new explicit architecture decision supersedes this document.

---

## 1. Frozen end-to-end runtime

```text
USER
  ↓
BUYER APPLICATION
  ↓
BUYER WRITER MODEL
creates first Thai response
  ↓
TCJ GATEWAY
  ↓
VOICE PROFILE
defines what “good” means for this tenant/domain
  ↓
PRIVATE TCJ EVIDENCE ENGINE
may inspect proprietary/private evidence inside the TCJ trust boundary
  ↓
DERIVED NON-RECONSTRUCTIVE EVIDENCE SIGNALS
  ↓
SELECTED TCJ JUDGE RUNTIME
  ├─ TCJ Local Judge
  │   buyer/TCJ self-hosted private model endpoint
  │
  └─ TCJ BYOK Judge
      supported external provider using buyer-controlled API credentials
  ↓
TCJ DETERMINISTIC GUARDS
  ↓
RISK-TRIGGERED CHALLENGE
  ↓
INDEPENDENT SIX-DIMENSION RESOLVER
  ↓
ACCEPT / REVISE / ESCALATE
  ↓
if REVISE:
buyer writer receives targeted revision instructions only
  ↓
BUYER WRITER MODEL
rewrites at current inference
  ↓
TCJ RECHECK
  ↓
FINAL RESPONSE
  ↓
USER
```

The frozen principle is:

> **The writer writes. The Voice Profile defines quality. The Private Evidence Engine supplies protected native-human intelligence. The selected judge reasons over the candidate/profile/derived signals. TCJ Core owns the final policy decision.**

---

## 2. Frozen component roles

### 2.1 TCJ Gateway

The Gateway is the buyer-facing integration layer. It owns transport and tenant/runtime routing concerns such as:

- authentication;
- tenant/profile selection;
- writer/judge configuration references;
- request IDs and audit correlation;
- rate limits;
- timeouts;
- safe streaming behavior;
- health/readiness;
- API compatibility;
- failure routing.

The Gateway SHALL NOT expose the private corpus or internal retrieval surface.

### 2.2 Voice Profile

The Voice Profile sits **after the Gateway and before the Private Evidence Engine**.

It is a non-model, versioned quality/voice contract defining what “good” means for a domain, brand or conversational style.

It may define:

- register;
- lexical preferences;
- Thai-English code-switch behavior;
- particles and hierarchy;
- stance and decisiveness;
- omission / implication;
- humor / deadpan / camp tolerance;
- explanation density;
- composition and line-break behavior;
- failure-family policy;
- retrieval policy;
- thresholds;
- revision policy;
- escalation policy.

The Voice Profile may reference an internal evidence namespace/version, but SHALL NOT expose raw proprietary evidence.

Frozen shorthand:

```text
Voice Profile = what good means
```

### 2.3 Private TCJ Evidence Engine

The Private Evidence Engine is the proprietary intelligence layer.

It may privately inspect eligible internal evidence such as:

- Batch 1;
- Batch 2;
- Batch 3+;
- native-human reviews;
- before→after human edits;
- approved anchors;
- negative contrasts;
- Qualification failures;
- Assurance failures;
- failure-family history;
- future approved TCJ R&D evidence.

These are non-deliverable internal development assets by default.

The Evidence Engine may perform:

- risk-family detection;
- contrastive retrieval;
- positive/negative support estimation;
- hierarchy/particle analysis;
- code-switch integration analysis;
- register analysis;
- composition/line-break analysis;
- similarity/distance calculations;
- historical failure lookup;
- confidence/support aggregation.

Its normal downstream interface is **derived, non-reconstructive signals**, not raw rows.

Examples:

```text
risk_family
native_positive_support
native_negative_support
contrast_strength
register_fit
code_switch_fit
hierarchy_risk
composition_risk
failure_cluster_ids
confidence
challenge_dimensions
```

Frozen shorthand:

```text
Private Evidence Engine = what TCJ has learned privately
```

### 2.4 Selected TCJ Judge Runtime

The semantic judge is behind the BYOJ abstraction.

#### TCJ Local Judge

`Local Judge` means the judge actually runs inside a buyer-controlled or TCJ-controlled private environment, for example:

- vLLM;
- Ollama;
- llama.cpp;
- an OpenAI-compatible internal endpoint;
- a bank/enterprise proprietary LLM;
- another supported private inference service.

No external AI provider is required for this mode.

#### TCJ BYOK Judge

`BYOK Judge` means a supported external provider/model is called using a credential supplied and controlled by the buyer.

Possible provider adapters include OpenAI, xAI, Anthropic, Gemini and future supported providers.

OpenAI/Sol may be the reference/recommended BYOK configuration, but OpenAI is **not a mandatory TCJ dependency**.

#### BYOJ

`BYOJ = Bring Your Own Judge` is the umbrella covering Local Judge and BYOK Judge.

Connected does not mean qualified.

Frozen shorthand:

```text
Judge Runtime = replaceable semantic reasoning engine
```

### 2.5 TCJ Core

TCJ Core owns the non-model orchestration and policy layer, including:

- deterministic guards;
- risk-trigger policy;
- challenge orchestration;
- six-dimension independence;
- disagreement handling;
- final resolver policy;
- ACCEPT / REVISE / ESCALATE;
- revision-cycle limits;
- provenance;
- manifests;
- Qualification/Passport binding;
- Assurance binding;
- auditability;
- reproducibility controls.

The LLM judge does not get the final policy word merely because it produced a semantic diagnosis.

---

## 3. Frozen judge-input boundary

A selected Local or BYOK Judge may receive only the runtime material required for the current decision, normally:

```text
current scenario/context
current candidate response
selected Voice Profile contract
TCJ-derived non-reconstructive evidence signals
required six-dimension structured judgment contract
```

It SHALL NOT receive by default:

```text
raw Batch 1 / Batch 2 / future Batch rows
raw human-review rows
nearest proprietary examples
verbatim proprietary anchor packets
raw contrast pairs
hidden Qualification cases
Assurance holdouts
private corpus search tools
private evidence retrieval APIs
provider-response research ledgers
```

The commercial design SHALL make prompt-injection exfiltration ineffective by keeping those assets physically/tool-wise outside the connected model context.

---

## 4. Frozen buyer-writer boundary

The buyer writer is generation/revision compute.

It may receive a compact TCJ decision/revision packet such as:

```text
failed_dimensions
failure_family_labels
targeted_revision_instruction
hard_constraints
preserve_constraints
confidence_or_escalation_status
```

It SHALL NOT receive proprietary TCJ evidence.

Default production loop:

```text
writer draft
→ TCJ evaluation
→ ACCEPT
```

or:

```text
writer draft
→ REVISE
→ writer rewrites once
→ TCJ recheck
→ ACCEPT / ESCALATE / configured safe fallback
```

Frozen real-time default:

```text
max_revision_cycles = 1
```

There is no unbounded writer/judge agent loop.

---

## 5. Frozen six-dimensional contract

The canonical evaluator resolves these dimensions independently:

1. `intent`
2. `thai_pragmatics`
3. `bff_voice` or the selected Voice Profile equivalent
4. `lexical_social_fit`
5. `stance`
6. `composition`

A serious error in one dimension SHALL NOT mechanically collapse the other dimensions.

Cross-dimension error cascade remains an explicit failure family.

---

## 6. Frozen challenge policy

A second semantic pass is **risk-triggered**, not universal.

Challenge may trigger for conditions such as:

- mock-formal/register inversion;
- unusual omission / compact inference;
- heavy code-switching;
- hierarchy-sensitive relationships;
- weird-but-possibly-native constructions;
- extreme score decisions;
- private-evidence/judge disagreement;
- known catastrophic failure families.

The objective is to reduce tail-risk/extreme reversals without turning every request into a costly multi-pass conversation.

---

## 7. Frozen qualification unit

TCJ does not grant production authority to a naked model name.

Authority belongs to the exact frozen evaluator configuration, including at minimum:

```text
TCJ Core version
Voice Profile version/hash
Private Evidence Engine / evidence artifact version/hash
derived-signal schema/version
judge type: Local or BYOK
judge provider/runtime
exact judge model/version/snapshot where available
judge adapter version
reasoning/settings contract
deterministic guard policy
challenge policy
independent-dimension resolver policy
revision policy
complete configuration hash
```

Changing an authority-bearing component requires the applicable regression/requalification policy.

Reference wording:

> “This TCJ evaluator configuration using Model X is qualified.”

Not:

> “Model X is inherently a qualified Thai judge.”

---

## 8. Frozen deployment forms

### Managed TCJ

```text
buyer application
→ TCJ-managed Gateway/Core/Evidence Engine
→ supported BYOK Judge or another qualified configured runtime
```

### Customer VPC

```text
buyer VPC
├─ TCJ Gateway
├─ Voice Profiles
├─ buyer-private evidence namespace where applicable
├─ TCJ Core
└─ Local Judge or BYOK Judge
```

### Fully private / on-prem / air-gapped

```text
buyer infrastructure
├─ TCJ Core
├─ Voice Profile
├─ signed compiled/distilled non-reconstructive evidence artifact
├─ Local Judge
├─ resolver
└─ private audit store
```

The raw proprietary TCJ R&D corpus is not included in the air-gapped commercial package by default.

---

## 9. Frozen buyer-specific profile architecture

A buyer may opt in to a private customer-specific Voice Profile using buyer-authorized evidence.

```text
buyer-owned evidence
→ buyer-private Evidence Engine namespace
→ buyer-specific Voice Profile intelligence
→ selected qualified Local/BYOK Judge
→ TCJ diagnosis
→ buyer writer revision packet
```

Buyer evidence may remain entirely within the buyer's VPC/on-prem environment.

Permission to improve Buyer A does not authorize reuse for Buyer B or general TCJ improvement.

---

## 10. Frozen commercial asset boundary

The buyer licenses TCJ capability, not the internal R&D corpus.

Commercial assets may include:

```text
TCJ Runtime License
Voice Profile License
Private Evidence Intelligence capability
judge/model adapters
Qualification/Passport framework
Assurance framework
deployment/support
Voice Profile Improvement Service
```

Internal non-deliverable R&D assets include by default:

```text
Batch 1
Batch 2
Batch 3+
raw human correction history
hidden Qualification banks
Assurance holdouts
raw proprietary anchor library
research failure ledgers
```

The internal corpus is the development moat; TCJ is the product.

---

## 11. Frozen commercial vocabulary

Use these terms consistently:

- **Writer Model** — creates/revises user-facing output.
- **Voice Profile** — non-model target-quality contract.
- **Private Evidence Engine** — proprietary evidence/retrieval/intelligence layer.
- **BYOJ** — Bring Your Own Judge umbrella.
- **Local Judge** — self-hosted/private inference.
- **BYOK Judge** — supported external provider using buyer-owned credentials.
- **TCJ Core** — orchestration, guards, challenge, resolver, qualification and audit.
- **Evaluator Configuration** — exact authority-bearing frozen combination of the above runtime components/settings.

Preferred commercial statement:

> **Bring your writer. Bring your judge or your API key. TCJ keeps the proprietary Thai evidence private and qualifies the complete evaluator configuration before granting production authority.**

Shorter operational statement:

> **Your AI writes. TCJ judges privately.**

---

## 12. What is frozen versus still pending

### Frozen by this document

- component order and trust boundaries;
- Voice Profile runtime position;
- Private Evidence Engine role;
- derived-signal default boundary;
- BYOJ abstraction;
- Local Judge / BYOK Judge terminology;
- model/provider replaceability;
- raw-evidence isolation;
- buyer-writer role;
- one-revision default;
- independent six-dimension resolution;
- risk-triggered challenge concept;
- full evaluator configuration as Qualification unit;
- managed/VPC/on-prem deployment shapes;
- commercial corpus non-deliverability principle.

### Not yet frozen as production implementation

- exact v4 algorithms;
- exact derived-signal schema values/weights;
- exact risk-detector implementation;
- exact judge prompt/runtime contract;
- exact OpenAI Sol API identifier/settings;
- exact resolver thresholds beyond already frozen historical test thresholds;
- exact performance/cost/latency claims;
- exact packaging implementation;
- final security acceptance;
- final provider adapter set;
- final qualified evaluator Passport.

These implementation details may evolve while preserving the architecture above.

---

## 13. Release gates remain mandatory

This architecture freeze does **not** grant production authority.

TCJ commercial release still requires:

```text
v4 research convergence
→ exact evaluator configuration freeze
→ fresh hidden Qualification
→ native-human blind gold freeze
→ Qualification PASS
→ authority-bearing Passport
→ qualified Panel / final reliability architecture
→ independent Assurance PASS
→ source-identity invariance
→ no-evidence-leakage tests
→ tenant-isolation tests
→ security/secrets acceptance
→ reproducibility / clean-install PASS
→ latency/cost measurement
→ packaging acceptance
→ commercial release freeze
```

Frozen native-human gold and preregistered thresholds SHALL NOT be weakened because a judge/model fails.

---

## 14. Architecture-inversion rule remains mandatory

When a provider, model, licensing, privacy, latency or evidence-exposure limitation appears, implementation must first test whether TCJ can:

1. eliminate the dependency;
2. move the trust boundary;
3. keep the external/buyer model writer-only;
4. keep proprietary evidence behind the Private Evidence Engine;
5. replace raw evidence with non-reconstructive signals;
6. replace an external dependency with a Local Judge;
7. separate the commercial capability from the R&D asset;
8. qualify the complete evaluator rather than weakening the standard for a naked model.

Only a genuine product decision that cannot be resolved within this frozen architecture should reopen architecture discussion.

---

## 15. Supersession rule

For final commercial product topology, component placement, evidence exposure, BYOJ terminology and judge/writer roles, this document supersedes conflicting older planning language.

It does **not** erase historical evidence or supersede domain-specific authorities for:

- human gold;
- Qualification evidence;
- commercial-use/provenance rights;
- Voice Profile licensing classification;
- historical research outcomes;
- security migration evidence.

Those remain governed by their own current authorities.

---

## 16. Freeze declaration

As of **22 August 2026**, the final commercial TCJ product architecture is frozen to:

```text
BUYER WRITER
→ TCJ GATEWAY
→ VOICE PROFILE
→ PRIVATE TCJ EVIDENCE ENGINE
→ DERIVED NON-RECONSTRUCTIVE SIGNALS
→ BYOJ SELECTED JUDGE (LOCAL OR BYOK)
→ TCJ GUARDS
→ RISK-TRIGGERED CHALLENGE
→ INDEPENDENT SIX-DIMENSION RESOLVER
→ ACCEPT / REVISE / ESCALATE
→ TARGETED WRITER REVISION IF REQUIRED
→ TCJ RECHECK
→ FINAL OUTPUT
```

Future TCJ work SHALL implement, qualify, assure and package this architecture rather than redesigning its core trust boundaries.