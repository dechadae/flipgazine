# TCJ — Final Commercial Product Architecture v2

**Status:** GOVERNING COMMERCIAL PRODUCT ARCHITECTURE — supersedes the 22 Aug 2026 topology where conflicting  
**Date:** 23 August 2026  
**Project:** Flipgazine / The Book of Answers / Thai Conversation Judge (TCJ)  
**Production authority:** NONE until final Qualification/Assurance/release gates pass

---

## 1. Why architecture v2 exists

The 22 Aug architecture correctly established the buyer/private trust boundary, BYOJ/BYOK model abstraction, Voice Profile, Private Evidence Engine and release ownership by TCJ Core.

However, later evidence showed that it placed too much semantic burden on **precomputed derived evidence signals** and not enough on a portable, coherent TCJ methodology context supplied directly to the semantic judge.

A clean ChatGPT account with repository access reproduced much of the intended BFF behavior after reading TCJ documentation, while the v1.7 API evaluator failed a fresh native-human Qualification despite receiving precomputed TCJ signals.

Architecture v2 therefore adds a first-class **TCJ Methodology Pack + Context Retriever** and demotes eager scalar evidence from “primary intelligence carrier” to one optional supporting mechanism.

The v1.7 failure remains preserved and is not reinterpreted as a pass.

---

## 2. Governing end-to-end runtime

```text
USER / CALLING SYSTEM
  ↓
BUYER APPLICATION
  ↓
BUYER WRITER MODEL
creates or revises Thai output
  ↓
TCJ GATEWAY
  ↓
VOICE PROFILE
selects target voice / domain contract
  ↓
TCJ CONTEXT RETRIEVER
selects relevant modules from the frozen TCJ Methodology Pack
  ↓
SELECTED TCJ JUDGE RUNTIME (BYOJ)
  ├─ Local Judge
  └─ BYOK Judge using buyer-controlled provider credentials
  │
  │  receives:
  │  - current scenario/context
  │  - candidate response
  │  - compact Voice Profile contract
  │  - relevant Methodology Pack modules
  │  - structured judgment contract
  │
  ↕ optional / risk-driven
TCJ PRIVATE EVIDENCE TOOL
  ↓
PRIVATE EVIDENCE ENGINE / DATA VAULT
  ↓
RICH BOUNDED NON-RECONSTRUCTIVE EVIDENCE RESPONSE
  ↑
SELECTED JUDGE
  ↓
TCJ CORE
  ├─ dimension outputs / diagnosis
  ├─ deterministic invariants
  ├─ optional challenge policy
  └─ independent RELEASE POLICY
  ↓
ACCEPT / REVISE / ESCALATE
  ↓
if REVISE:
targeted instruction only → BUYER WRITER rewrites once
  ↓
TCJ RECHECK
  ↓
FINAL OUTPUT
```

Governing principle:

> **The Methodology Pack gives the judge the TCJ mental model. The Private Evidence Engine provides protected native-human evidence when needed. The judge supplies semantic reasoning. TCJ Core owns the release decision.**

---

## 3. TCJ Methodology Pack

### 3.1 Definition

The Methodology Pack is a compiled, versioned, portable representation of the conceptual knowledge that currently lives across TCJ/Answers documentation and has proven transferable to a clean capable model.

It is **not** the raw repository and is **not** the raw corpus.

Canonical shorthand:

```text
Methodology Pack = how TCJ thinks about Thai conversational quality
```

It may encode:

- the TCJ conversational-quality philosophy;
- BFF/Voice Profile ontology;
- Intent and speech-act ontology;
- factual-information request vs advice/judgment request distinctions;
- Thai pragmatics and hierarchy;
- relationship license and channel effects;
- particles / register / social stance;
- proportionality of advice and escalation;
- event valence and socially appropriate response behavior;
- lexical/social fit;
- Thai-English code-switch integration;
- omission, implication and nonliteral recoverability;
- line-break and composition principles;
- deliberate repetition vs low-information repetition;
- formal vs bureaucratic vs mock-formal behavior;
- advisor/assistant scaffolding vs conversational voice;
- false fluency;
- dimension-isolation rules;
- release-policy concepts;
- known model failure families;
- constructed explanatory examples and counterexamples that do not reconstruct protected corpus rows.

### 3.2 Compile once, do not reread GitHub per request

GitHub/docs are development sources.

Production shall compile them into a signed artifact such as:

`TCJ-METHODOLOGY-BFF-v1`

with:

```text
pack_version
pack_sha256
module_manifest
module_ids
module_text_hashes
retrieval_metadata
profile_compatibility
language/domain scope
construction provenance
```

A production request does **not** need to reconnect to GitHub or reread all documentation.

### 3.3 External-judge eligibility

The Methodology Pack is deliberately the portion of TCJ knowledge that may be supplied to a Local/BYOK judge.

It must be reviewed for commercial/IP exposure and must not contain by default:

- raw proprietary Batch rows;
- human edit pairs that reconstruct protected rows;
- hidden Qualification/Assurance items;
- raw anchor library entries;
- buyer-private evidence;
- enumeratable record IDs;
- private review notes;
- database credentials or internal schema access.

---

## 4. TCJ Context Retriever

The Context Retriever is a local/private deterministic or retrieval component that chooses the minimum relevant Methodology Pack modules for the current evaluation.

Canonical shorthand:

```text
Context Retriever = which TCJ ideas matter for this request
```

It may use:

- speech-act classification;
- relationship/channel metadata;
- Voice Profile;
- local embeddings over Methodology Pack modules;
- deterministic keyword/ontology routing;
- already-known failure families;
- a small local classifier;
- hybrid retrieval.

It shall not need an external paid LLM to perform ordinary routing.

Default objective:

```text
stable core prefix
+ only relevant methodology modules
+ scenario/candidate
```

rather than:

```text
full Git repository on every request
```

The exact selected module IDs and Methodology Pack SHA are audit/provenance fields.

---

## 5. Voice Profile

The Voice Profile remains the tenant/domain-specific definition of target quality.

Shorthand:

```text
Voice Profile = what good means for this buyer/brand/domain
```

Architecture v2 clarifies the division:

```text
Methodology Pack = general TCJ Thai judgment knowledge
Voice Profile    = selected target voice and buyer/domain preferences
```

The Context Retriever uses both the current situation and Voice Profile to select relevant methodology.

Buyer-specific improvement may create signed new Voice Profile versions without mutating the shared TCJ Methodology Pack unless a separate general-TCJ R&D decision is made.

---

## 6. Selected Judge Runtime / BYOJ

BYOJ remains the umbrella:

```text
Local Judge = buyer/self-hosted private inference endpoint
BYOK Judge  = external provider/model using buyer-controlled credentials
```

OpenAI/Sol may remain the reference BYOK runtime, but is not mandatory.

The buyer's API key is eligible because the authority unit is the **exact evaluator configuration**, not ownership of the key.

For a qualified BYOK configuration, changing only from TCJ's test credential to Buyer A's credential does not by itself change semantic configuration, provided the following remain exact/compatible:

- provider;
- model/version/snapshot where available;
- endpoint behavior;
- reasoning/settings;
- adapter;
- Methodology Pack version/hash;
- Context Retriever version/config;
- Voice Profile;
- Private Evidence Tool contract;
- release policy;
- structured output contract.

Connected ≠ compatible ≠ qualified remains mandatory.

---

## 7. Judge input boundary

A selected judge may receive:

```text
current scenario/context
current candidate
current Voice Profile contract
stable TCJ core methodology prefix
retrieved Methodology Pack modules
structured dimension/diagnosis contract
bounded Private Evidence Tool response when invoked
```

It does not receive by default:

```text
raw TCJ R&D corpus
raw buyer evidence
nearest proprietary examples
human before/after rows
hidden Qualification/Assurance evidence
arbitrary private search
SQL/database credentials
service-role credentials
private repository secrets
```

This architecture intentionally supplies **more conceptual knowledge** to the judge while preserving the raw-evidence trust boundary.

---

## 8. Private Evidence Engine and Tool

### 8.1 Role

The Private Evidence Engine remains the proprietary native-human evidence layer.

Architecture v2 changes its role from:

> “compress most TCJ intelligence into precomputed scalar signals”

into:

> “provide targeted protected evidence when the judge or TCJ Core needs additional native-human grounding.”

### 8.2 Tool shape

Target tool remains conceptually:

```text
tcj_evidence_assess(
  evaluation_id,
  requested_analysis_families,
  requested_dimensions
)
```

The judge does not submit arbitrary corpus queries.

### 8.3 Rich bounded responses

The response should be richer than v1.7 scalar-only packets when useful.

Example permitted shape:

```text
analysis_family: code_switch_integration
assessment: "Thai clause spine is preserved; English insertions are locally integrated. Any defect is primarily lexical/social fit and should not automatically lower BFF voice."
confidence: high
native_positive_support_band: strong
native_negative_support_band: weak
recommended_sensitive_dimensions:
  - lexical_social_fit
protected_dimensions:
  - bff_voice
signal_version: ...
```

The explanation must still be non-reconstructive and bounded.

Forbidden:

```text
"Here are the five nearest human rows"
raw examples
raw human edits
row IDs
arbitrary phrase search results
hidden test cases
```

---

## 9. Six-dimensional diagnosis remains, but score calibration is not the entire product

Canonical dimensions remain:

1. `intent`
2. `thai_pragmatics`
3. `bff_voice` / selected profile voice dimension
4. `lexical_social_fit`
5. `stance`
6. `composition`

They remain useful for diagnosis, buyer reporting and targeted revision.

However:

> **A perfect numeric match to one human 1–4 rating scale is not the sole definition of TCJ success.**

Architecture v2 distinguishes:

```text
semantic/dimensional diagnosis
from
production release decision
```

---

## 10. Independent Release Policy

TCJ Core owns a separate versioned Release Policy.

Canonical shorthand:

```text
Release Policy = may this output ship?
```

A candidate may be `REVISE` or `ESCALATE` even when model dimension scores are mostly 3/4 if TCJ has a high-confidence policy invariant such as:

- concrete factual-answer non-completion;
- severe structural incompletion;
- unlicensed serious hierarchy violation;
- high-confidence event-valence mismatch;
- grossly disproportionate stance/risk escalation;
- other frozen catastrophic family.

This avoids fabricating low numeric scores merely to force the correct product decision.

Conversely, Release Policy must be tested against false blocks so it does not become “reject anything unusual.”

Release-policy version/hash is authority-bearing.

---

## 11. Challenge policy

Risk-triggered semantic challenge remains optional as an architecture capability, but it is no longer assumed to be the main method for fixing semantic blind spots.

A second call to the same model is correlated evidence, not an independent human perspective.

Challenge should exist only where measured incremental value justifies:

- cost;
- latency;
- disagreement handling;
- provider dependence.

The final frozen reference may use:

```text
no challenge
single risk-triggered challenge
or a bounded alternative
```

provided that exact behavior is frozen and qualified.

No universal second pass is required by architecture v2.

---

## 12. Buyer writer boundary

The buyer writer still receives only an actionable revision packet, for example:

```text
production_decision
failed_dimensions
failure_family_labels
targeted_revision_instruction
preserve_constraints
hard_constraints
```

It does not receive proprietary evidence.

Default maximum revision cycles remains:

`1`

unless a separately qualified buyer configuration changes it.

---

## 13. Commercial deployment modes

### 13.1 BYOK enterprise default

```text
buyer application
→ TCJ Runtime in buyer/VPC environment
→ local Methodology Pack + Context Retriever
→ buyer-controlled external judge API key
→ optional local Private Evidence Engine/Tool
→ TCJ Release Policy
```

Buyer pays the provider directly.

### 13.2 Local / fully private

```text
buyer infrastructure
├─ TCJ Gateway/Core
├─ Methodology Pack
├─ Context Retriever
├─ Voice Profiles
├─ Private Evidence Engine / permitted evidence artifact
├─ Local Judge
├─ Release Policy
└─ audit store
```

No external AI provider is required.

### 13.3 Managed TCJ

Possible but not the preferred initial bank/enterprise structure. It requires separate billing/data-processing/provider review.

---

## 14. Commercial asset boundary

Buyer may license:

```text
TCJ Runtime / Core
TCJ Methodology Pack
Context Retriever
Voice Profile(s)
Private Evidence Intelligence capability
Private Evidence Tool
Release Policy
BYOJ adapters
Qualification / Passport framework
optional Assurance / improvement service
support / deployment artifacts
```

Internal R&D assets remain non-deliverable by default:

```text
raw Batch 1/2/3+ corpus
raw human edit history
raw anchor libraries
hidden test banks
research response ledgers
private buyer evidence from other tenants
```

The commercial moat is therefore layered:

```text
portable methodology knowledge
+ private native-human evidence
+ qualification/release machinery
+ profile/domain adaptation
```

---

## 15. Buyer-specific private improvement

Buyer-owned evidence can remain entirely in the buyer environment:

```text
buyer evidence
→ buyer-private evidence namespace
→ analysis / contrastive review
→ proposed Voice Profile / Methodology overlay / Release Policy delta
→ frozen validation
→ buyer-specific version
→ rollback-capable deployment
```

No silent self-modification.

A buyer-specific Methodology overlay must be distinguishable from the canonical TCJ Methodology Pack.

Permission for Buyer A does not authorize Buyer B or general TCJ reuse.

---

## 16. Production does not reread GitHub

This is a hard architecture invariant.

GitHub is a development/source-control authority, not a runtime dependency.

Production flow:

```text
repository/docs
  ↓ build/release time
compile + review + sign
  ↓
TCJ-METHODOLOGY-... artifact
  ↓ runtime
local retrieval of relevant modules
```

A provider-hosted file/vector store may optionally be supported for a buyer that chooses it, but the portable default is local retrieval so TCJ is not locked to any single provider and the exact context corpus can be hashed/reproduced.

---

## 17. Qualification unit under architecture v2

Authority belongs to the exact frozen evaluator configuration, including:

```text
TCJ Core version
Methodology Pack version/hash
Context Retriever version/hash/config
selected Voice Profile version/hash
Private Evidence Engine version/manifest where used
Private Evidence Tool version/schema/allowlist/call budget where used
judge mode: Local or BYOK
provider/runtime/model/version
judge adapter
reasoning/settings
structured-output contract
core prompt/instruction hash
Release Policy version/hash
challenge policy if used
revision policy
complete evaluator configuration hash
```

A naked model name is never qualified by itself.

---

## 18. Qualification methodology v2 direction

The old 48 cases × six absolute 1–4 ratings remain historical development evidence.

Architecture v2 does not require repeating that mechanic indefinitely.

The final authority test should combine preregistered fresh evidence for:

- contrastive A/B/Tie discrimination;
- controlled minimal-pair mechanism sensitivity;
- dimension isolation;
- context counterfactuals;
- release safety;
- preservation of acceptable/unconventional native Thai;
- limited calibration sanity checks where still useful.

The final hidden test instrument must be created only **after** the exact architecture-v2 evaluator is frozen.

Changing the measurement instrument does not erase v1.7's failure. The old failure remains historical evidence for the old evaluator/test combination.

---

## 19. API-spend invariant

Development default:

```text
external paid judge calls = 0
```

Use stored provider traces, offline replay, local tests, contrastive human evidence and current ChatGPT reasoning during development.

Paid external provider credit is reserved for a single final frozen test unless the user explicitly authorizes an exception.

No autonomous cron/worker may spend external-model credit during development.

---

## 20. Supersession

For commercial runtime topology and current final-product design, this document supersedes conflicting portions of:

- `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-FREEZE-20260822.md`
- `ANSWERS-TCJ-FINAL-PRODUCT-IMPLEMENTATION-AND-QUALIFICATION-PLAN-20260822.md`
- older statements that make eager/precomputed scalar evidence the default primary TCJ intelligence carrier.

Those files remain historical evidence and must not be deleted.

Existing authorities for provenance, buyer isolation, licensing, security and immutable human gold remain in force where not contradicted here.

---

## 21. Architecture v2 declaration

As of 23 August 2026, the intended final commercial TCJ product converges toward:

```text
BUYER WRITER
→ TCJ GATEWAY
→ VOICE PROFILE
→ TCJ CONTEXT RETRIEVER
→ RELEVANT TCJ METHODOLOGY PACK MODULES
→ SELECTED BYOJ JUDGE
↔ OPTIONAL NARROW PRIVATE EVIDENCE TOOL
→ TCJ CORE DIMENSION DIAGNOSIS
→ INDEPENDENT RELEASE POLICY
→ ACCEPT / REVISE / ESCALATE
→ ONE TARGETED WRITER REVISION IF REQUIRED
→ RECHECK
→ FINAL OUTPUT
```

The product is not “a pile of regex guards around an LLM.”

It is:

> **a portable Thai conversational methodology + protected native-human evidence system + replaceable semantic judge + deterministic release authority.**