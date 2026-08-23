# TCJ — Final Product Implementation & Qualification Plan v2

**Status:** GOVERNING FINAL-PRODUCT EXECUTION PLAN  
**Date:** 23 August 2026  
**Architecture authority:** `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-V2-20260823.md`  
**Methodology/context authority:** `ANSWERS-TCJ-METHODOLOGY-PACK-AND-CONTEXT-RETRIEVER-SPEC-20260823.md`  
**Failure/pivot checkpoint:** `ANSWERS-TCJ-V17-QUALIFICATION-FAILURE-AND-CONTEXT-ENGINE-PIVOT-20260823.md`

This plan supersedes conflicting next-action sequences in the 22 Aug final-product plan. Historical evidence, human gold, qualification failures and provenance remain preserved.

---

## 1. Product objective

Ship TCJ as a plug-and-play Thai conversational quality-control layer that can sit around a buyer's writer and a replaceable judge runtime.

The final product should make a capable model behave more like a well-contextualized TCJ-aware reviewer without rereading the repository per request and without exposing the proprietary native-human corpus.

Commercial shorthand:

> **Bring your writer. Bring your judge or your API key. TCJ supplies the Thai conversational methodology, protected native-human evidence and release authority.**

---

## 2. Final reference runtime

```text
BUYER APPLICATION
  ↓
BUYER WRITER
  ↓
TCJ GATEWAY
  ↓
VOICE PROFILE
  ↓
LOCAL TCJ CONTEXT RETRIEVER
  ↓
RELEVANT MODULES FROM FROZEN TCJ METHODOLOGY PACK
  ↓
SELECTED BYOJ JUDGE
  ↕ optional/risk-driven
TCJ PRIVATE EVIDENCE TOOL
  ↓
PRIVATE EVIDENCE ENGINE / DATA VAULT
  ↓
BOUNDED NON-RECONSTRUCTIVE ASSESSMENT
  ↑
SELECTED JUDGE
  ↓
TCJ DIMENSION DIAGNOSIS
  ↓
TCJ RELEASE POLICY
  ↓
ACCEPT / REVISE / ESCALATE
  ↓
if REVISE: one targeted writer rewrite
  ↓
TCJ RECHECK
  ↓
FINAL OUTPUT
```

---

## 3. Hard development-spend rule

From this plan onward:

```text
Paid external-model/API development calls: FORBIDDEN by default.
```

Use external provider credit only for the final frozen authority test unless the user explicitly authorizes an exception.

Development uses:

- v1.1/v2/v3 human-reviewed evidence;
- stored paid provider responses;
- deterministic replay;
- current ChatGPT reasoning;
- local/context compilation;
- contrastive human A/B/Tie evidence;
- local/private test tooling.

Before any final paid run:

1. show the exact proposed provider/model/settings;
2. show the exact number/type of planned calls;
3. estimate cost from the frozen test shape;
4. check available credit/balance where possible;
5. obtain explicit user approval;
6. ensure no background worker can exceed the preregistered call plan.

---

## 4. Phase A — Freeze the architecture-v2 product contract

**Goal:** stop redesign loops.

Deliverables:

- architecture v2 authority;
- Methodology Pack spec;
- Context Retriever contract;
- Voice Profile relationship;
- Private Evidence Tool boundary;
- Release Policy role;
- BYOJ/BYOK deployment contract;
- final qualification methodology direction.

Acceptance:

```text
GitHub is not a runtime dependency
raw corpus remains private
Methodology Pack is judge-visible by design
PEE is second-stage protected evidence
Release Policy is independent from raw score calibration
BYOK is first-class
no external API required for development
```

**Status:** architecture documentation established by this plan and its companion authorities.

---

## 5. Phase B — Build `TCJ-METHODOLOGY-BFF-v1`

### B1. Source extraction

Extract durable conceptual material from canonical TCJ/Answers docs.

Exclude:

- stale execution history;
- duplicated prose;
- secret/configuration material;
- raw/protected corpus rows;
- hidden qualification items;
- reconstructive human edit pairs.

### B2. Module compilation

Build the initial module families defined in the Methodology Pack spec:

```text
M00 core judgment contract
M01 intent / speech acts
M02 Thai pragmatics
M03 BFF / voice
M04 lexical / social fit
M05 stance proportionality
M06 composition
M07 event valence
M08 code-switch
M09 formality ontology
M10 dimension isolation
M11 release safety
M12 known judge traps
```

### B3. Constructed examples

Create compact examples/counterexamples where explanation requires them.

They must be independently written abstractions, not protected corpus reproduction.

### B4. Pack manifest

Produce:

```text
pack ID
pack SHA
module list
module SHA set
source-document provenance
IP/exposure classification
compatibility metadata
```

No paid API required.

---

## 6. Phase C — Build Context Retriever v1

### C1. Local routing

Implement provider-neutral routing that can select relevant modules from scenario/candidate/profile.

Start with deterministic/hybrid methods using:

- speech-act ontology;
- relationship/channel features;
- module metadata;
- local similarity where useful;
- known exposed failure families.

Avoid an external LLM dependency for retrieval.

### C2. Reproducibility

For a frozen input/config, record:

```text
selected module IDs
retrieval reason codes
context SHA
retriever version
retriever config hash
```

### C3. Offline retrieval tests

Use exposed v1.1/v2/v3 cases and constructed minimal pairs to verify that:

- factual questions retrieve Intent/factual modules;
- hierarchy cases retrieve Thai-pragmatics/hierarchy modules;
- event-loss cases retrieve event-valence modules;
- code-switch cases retrieve code-switch + dimension-isolation modules;
- broken composition retrieves composition modules;
- ordinary cases do not receive unnecessary specialist context.

No paid API required.

---

## 7. Phase D — Refactor the Private Evidence Tool

The PEE remains valuable but should stop trying to encode the entire TCJ worldview into scalar SQL features.

### D1. Narrow analysis families

Refactor toward semantically meaningful families such as:

```text
factual_vs_social_intent
unconventional_but_native
register_inversion
hierarchy_and_relationship_license
code_switch_integration
linebreak_and_structural_completeness
stance_proportionality
event_valence
known_failure_cluster
dimension_isolation_support
```

### D2. Rich bounded output

Return compact explanatory assessments plus confidence/support bands, not only scalar values.

### D3. Capability denial

Prove:

- no arbitrary text search;
- no SQL/database surface;
- no raw examples;
- no row IDs;
- no hidden-bank retrieval;
- server-enforced allowlist and call budget;
- tenant isolation;
- auditable request/response hashes.

No external API required.

---

## 8. Phase E — Build Release Policy v1

The release policy answers:

> **May this candidate ship?**

It is separate from six-dimensional score calibration.

### E1. Initial catastrophic/policy families

Develop using exposed evidence only:

- concrete factual-answer non-completion;
- severe structural incompletion;
- unlicensed serious hierarchy/casualness;
- event-valence mismatch;
- grossly disproportionate stance;
- high-confidence catastrophic profile violations.

### E2. Preserve unusual good Thai

Explicitly test the opposite side:

- native omission;
- playful/mock-formal language;
- natural code-switch;
- deliberate line rhythm;
- principled uncertainty;
- BFF brevity.

### E3. Development metrics

Primary release metrics on exposed evidence:

```text
false ACCEPT on human MAJOR/CRITICAL
false block on human PASS
REVISE vs ESCALATE distribution
reason-code precision by mechanism
```

Do not optimize solely for legacy absolute MAE.

No paid API required.

---

## 9. Phase F — Complete Contrastive Review v1

Existing development instrument:

```text
30 A/B/Tie screens
26 unique comparisons
4 reversed consistency repeats
12 mechanism families
```

URL:

`https://flipgazine.pages.dev/tcj-contrastive-review.html`

This is development evidence, not final authority evidence.

Human review should answer only the comparison actually being tested, e.g.:

- which better answers the question;
- which is more socially appropriate;
- which is better composed;
- which sounds more like a close friend;
- Tie when genuinely equivalent.

Use the results to validate mechanism boundaries and retriever/release-policy design.

No external judge is needed for this stage.

---

## 10. Phase G — Build the architecture-v2 judge adapter without calling it

Implement the request/runtime code against a mock/local fixture first.

The final judge request must bind:

```text
stable core TCJ instruction
selected Methodology Pack module text
Voice Profile contract
scenario/candidate
structured output schema
Private Evidence Tool definition where enabled
provider/model/settings
```

Tests should use stored provider responses or deterministic fixtures wherever possible.

Required adapter modes:

```text
BYOK OpenAI-compatible reference
Local/OpenAI-compatible endpoint
adapter abstraction for future providers
```

Do not consume provider credit merely to verify HTTP plumbing if mock integration can prove it.

---

## 11. Phase H — Full offline/exposed-bank system replay

Run the complete v2 architecture against all available exposed evidence without fresh generation.

Where stored responses cannot perfectly emulate the new Methodology Pack context, use them only for the aspects they can legitimately test:

- orchestration;
- deterministic release policy;
- resolution;
- context retrieval coverage;
- evidence-tool routing;
- provenance;
- failure handling.

Do **not** pretend this proves the new context-aware judge behavior.

Exit criteria before final freeze:

- no known catastrophic exposed failure family is structurally unhandled;
- release policy has zero or near-zero false-ACCEPT on serious exposed cases with documented exceptions;
- false blocks on human PASS are understood and acceptably bounded;
- context retriever covers every known mechanism family;
- Methodology Pack contradictions are resolved;
- PEE tool security/capability-denial tests pass;
- install/restart/audit paths work.

---

## 12. Phase I — Plug-and-play productization

### I1. Product API

Target buyer-facing interface should be simple, e.g.:

```text
POST /v1/evaluate
POST /v1/refine
GET  /v1/health
GET  /v1/configuration
GET  /v1/passport
```

Example evaluation request:

```json
{
  "profile": "answers-bff-v1",
  "scenario": "...",
  "candidate": "...",
  "mode": "quality_gate"
}
```

Example response:

```json
{
  "decision": "REVISE",
  "dimensions": {...},
  "reason_codes": ["..."],
  "revision_instruction": "...",
  "configuration_hash": "..."
}
```

### I2. Setup UX

Buyer configures:

- Voice Profile;
- judge mode Local/BYOK;
- endpoint/model;
- buyer API secret if BYOK;
- release policy mode;
- auto-revision on/off;
- audit retention;
- optional buyer-private evidence namespace.

### I3. Secrets

Buyer API keys must be buyer-controlled and independently rotatable. TCJ must not require the developer's OpenAI account for production.

### I4. Deployment packages

Priority:

1. Docker Compose private-server package;
2. customer VPC deployment;
3. Kubernetes/Helm only if commercially necessary;
4. fully local/openAI-compatible judge mode.

---

## 13. Phase J — Security and commercial acceptance before final provider test

Do these before spending final API credit so a successful semantic test is not wasted on an unshippable system.

Required:

- resolve/isolate remaining Supabase SECURITY DEFINER/public findings where relevant to the commercial runtime;
- dedicated TCJ internal secret instead of service-role-key reuse;
- tenant isolation;
- raw-evidence exfiltration tests;
- Methodology Pack exposure classification;
- Private Evidence Tool capability-denial tests;
- audit-log redaction;
- fresh-install/restart/rollback tests;
- BYOK secret rotation;
- local-judge path acceptance;
- reproducible configuration manifest;
- licensing/data-processing documentation.

---

## 14. Phase K — Freeze the final reference evaluator

Only after Phases B–J pass.

Freeze one exact reference configuration including:

```text
TCJ Core
Methodology Pack SHA
Context Retriever SHA/config
Voice Profile SHA
Private Evidence Engine manifest
Private Evidence Tool schema/allowlist/budget
judge provider/model/version
judge adapter
reasoning/settings
structured output schema
core prompt hash
Release Policy SHA
challenge policy
revision policy
complete configuration SHA
```

Once frozen, **no semantic changes** are allowed before the final authority test.

---

## 15. Phase L — Final Qualification 2.0 instrument

Do **not** create another clone of the 48×6 absolute-rating banks.

Create a fresh post-freeze hidden instrument with multiple evidence types.

Recommended structure:

### L1. Contrastive discrimination

Fresh A/B/Tie pairs testing controlled differences.

### L2. Context counterfactuals

Same/similar response under friend/boss/customer/elder/private/group contexts.

### L3. Dimension isolation

Pairs where only one intended quality dimension changes.

### L4. Release safety

Fresh serious-defect cases where ACCEPT would be unacceptable.

### L5. Preservation

Fresh weird-but-native / compact / code-switched / playful cases that should not be over-rejected.

### L6. Limited absolute calibration

A smaller absolute-rating sample may remain for continuity, but it is secondary to discrimination and release behavior.

Preregister the instrument and thresholds before any model sees it.

---

## 16. Phase M — Human gold for the final instrument

Human review happens before machine exposure.

Prefer low-friction A/B/Tie where possible.

Use hidden reversed repeats to estimate reviewer consistency.

Do not expose:

- mechanism labels;
- intended winner;
- model output;
- TCJ route;
- design hypothesis.

Freeze human gold and manifests before the final paid run.

---

## 17. Phase N — The one final paid provider run

This is the first planned external API spend after the development stop.

Before launch:

- show call count and estimated cost;
- verify credit;
- explicit user approval;
- bind worker to the exact final configuration;
- enforce hard dispatch ceiling;
- no semantic retry except preregistered transport/generation rules;
- immediately stop and report billing/quota exhaustion.

Run the exact frozen reference evaluator against the frozen final instrument.

No tuning after seeing results can convert the same instrument back into fresh authority evidence.

If it fails:

- preserve failure;
- use it as development evidence;
- do not keep burning API credit automatically;
- decide explicitly whether the commercial product is good enough for scoped release, needs another development cycle, or should stop.

---

## 18. Qualification 2.0 decision gates

Exact numeric thresholds must be preregistered later, but the gate families should include:

### Contrastive accuracy

Correct A/B/Tie preference on controlled pairs by mechanism family.

### Dimension-isolation accuracy

Target dimension responds while protected dimensions remain acceptably stable.

### Release safety

```text
false ACCEPT on human MAJOR/CRITICAL = 0
```

or another explicitly preregistered safety rule that is not weakened after seeing results.

### Preservation

Bound false rejection/escalation of native-human acceptable cases.

### Consistency

Repeated/reversed pair stability.

### Generation integrity

No terminal contract failures beyond preregistered tolerance.

### Calibration sanity

Absolute scores remain directionally useful, but legacy MAE is not the sole product gate.

---

## 19. Phase O — Passport / Assurance / release

If final Qualification passes:

```text
issue exact evaluator Passport
→ run independent Assurance/holdout if required by commercial claim
→ finalize source-identity invariance
→ final security sign-off
→ latency/cost measurement on buyer-owned or explicitly approved credentials
→ packaging acceptance
→ commercial release freeze
```

If latency/cost measurement itself requires provider calls, perform it after Qualification using buyer/test credentials explicitly budgeted for that purpose; it is not hidden qualification evidence.

---

## 20. Buyer-owned API eligibility

BYOK is the preferred initial enterprise model.

```text
BUYER PAYS TCJ FOR
- Runtime/Core
- Methodology Pack
- Context Retriever
- Voice Profile(s)
- Private Evidence capability
- Release Policy
- Qualification/Passport framework
- deployment/support

BUYER PAYS PROVIDER DIRECTLY FOR
- its selected model inference
```

Production does not depend on the developer's API credit.

A qualified OpenAI reference configuration can be deployed with a buyer-controlled OpenAI key when semantic configuration is otherwise unchanged.

Other providers/local judges are Connected/Compatible until separately qualified to the required level.

---

## 21. Buyer-private self-improvement

Optional future/private-server feature:

```text
buyer evidence
→ buyer-private review/contrastive store
→ proposed profile/methodology-overlay/evidence-policy delta
→ offline validation
→ signed buyer-specific version
→ explicit deployment
```

No autonomous online learning that silently changes production judge behavior.

---

## 22. What we deliberately stop doing

This plan ends the following loops:

- repeated full paid replays during architecture development;
- another 48×6 human bank just because the last one failed;
- adding prompt text without evidence;
- treating a second call to the same model as independent truth;
- encoding every semantic distinction as increasingly complex SQL regexes;
- forcing numeric score changes merely to obtain a release decision;
- using the developer's API account as the commercial runtime dependency.

---

## 23. Immediate execution order

From the current state:

```text
1. Complete Methodology Pack v1 compilation.
2. Build/test Context Retriever v1 offline.
3. Refactor PEE tool families and rich bounded response schema.
4. Narrow Release Policy using exposed false-block analysis.
5. Complete/analyze Contrastive Review v1.
6. Build provider-neutral judge adapter with mocks/stored fixtures.
7. Integrate full architecture-v2 runtime.
8. Complete security + plug-and-play packaging gates.
9. Freeze exact final reference configuration.
10. Construct fresh Qualification 2.0 instrument after freeze.
11. Human blind A/B/Tie + limited calibration review; freeze gold.
12. Ask user for explicit approval to spend final API credit.
13. Run one final provider Qualification.
14. If PASS: Passport → Assurance/security/release completion.
15. If FAIL: preserve failure and make an explicit product decision; do not enter an automatic paid retry loop.
```

---

## 24. Final product definition

The intended product is:

> **TCJ is a portable Thai conversational methodology and release-control system that supplies a capable buyer-selected model with the right TCJ context, optionally grounds uncertainty in protected native-human evidence, and independently decides whether the output should ship.**

The final product should be useful even when the buyer provides all model inference and all API billing.