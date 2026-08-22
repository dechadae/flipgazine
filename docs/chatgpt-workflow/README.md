# ChatGPT Workflow — Flipgazine / The Book of Answers

**Purpose:** canonical human-readable entry point for continuing the Answers / TCJ project across sessions.

Before consequential work, inspect canonical Supabase project `sjpvhgxacsiorrtijqua` and current GitHub state. Do not execute stale next-action text from historical documents.

`CURRENT-STATE.json` is the compact machine-readable checkpoint. `DOCUMENT-AUTHORITY-MAP.md` classifies current authorities and supersession rules.

---

## Current TCJ authorities — read first

1. `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-FREEZE-20260822.md` — **frozen commercial topology and trust boundaries**. This controls component order, Voice Profile placement, Private Evidence Engine, derived-signal boundary, BYOJ abstraction, writer/judge roles, risk-triggered challenge, independent six-dimension resolver, one-revision default and deployment shapes. It does not grant production authority.
2. `ANSWERS-TCJ-SOL-PRIVATE-EVIDENCE-TOOL-AND-COMMERCIAL-LICENSING-CLARIFICATION-20260822.md` — **governing clarification** for judge-initiated private evidence access and BYOK commercial licensing. A selected judge may call a narrow TCJ Private Evidence Tool; it never receives SQL/database/vault/raw-corpus access. Tool schema/call budget is authority-bearing.
3. `ANSWERS-TCJ-FINAL-PRODUCT-IMPLEMENTATION-AND-QUALIFICATION-PLAN-20260822.md` — **governing final-product execution plan**. It aligns the final product with the clarification and distinguishes eager/precomputed v1.5 authority from the later interactive Evidence Tool evaluator.
4. `ANSWERS-TCJ-SOL-V15-RESEARCH-FREEZE-AND-FRESH-QUALIFICATION-V2-20260822.md` — **current execution checkpoint**. v1.5 is research-frozen and fresh Qualification v2 is waiting for native-human blind review.
5. `ANSWERS-TCJ-PRIVATE-EVIDENCE-ENGINE-AND-BUYER-ISOLATION-POLICY-20260822.md` — raw-corpus isolation and buyer/writer evidence boundary. Read with the clarification: narrow derived-analysis tool access is allowed; generic/raw retrieval is not.
6. `ANSWERS-TCJ-BYOJ-JUDGE-RUNTIME-AND-API-KEY-POLICY-20260822.md` — BYOJ / Local Judge / BYOK Judge terminology and runtime boundary.
7. `ANSWERS-TCJ-PLUG-AND-PLAY-DEPLOYMENT-AND-VOICE-PROFILE-POLICY-20260822.md` — deployment, setup, private-server improvement and packaging policy.
8. `ANSWERS-TCJ-MULTI-JUDGE-CONSENSUS-ARCHITECTURE.md` — Panel methodology; production Panel remains Qualification-gated.
9. `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md` — commercial-use and provenance authority.
10. `ANSWERS-THAI-CONVERSATION-JUDGE-ARCHITECTURE.md` — TCJ core/profile method details where not superseded by newer frozen-product authorities.

Historical v1.1 Qualification, v3 ablation and earlier v4-direction documents remain evidence, not current next-action authority.

---

## Frozen final product shape

Base topology:

```text
BUYER WRITER
→ TCJ GATEWAY
→ VOICE PROFILE
→ PRIVATE TCJ EVIDENCE ENGINE
→ DERIVED NON-RECONSTRUCTIVE SIGNALS
→ SELECTED BYOJ JUDGE
→ TCJ GUARDS
→ RISK-TRIGGERED CHALLENGE
→ INDEPENDENT SIX-DIMENSION RESOLVER
→ ACCEPT / REVISE / ESCALATE
→ TARGETED WRITER REVISION ONCE IF REQUIRED
→ TCJ RECHECK
→ FINAL OUTPUT
```

Preferred interactive Sol/BYOJ reference form:

```text
candidate
→ Voice Profile
→ selected TCJ Judge
   ↕
   tcj_evidence_assess
   ↓
   PRIVATE TCJ Evidence Engine / Data Vault
   ↓
   derived non-reconstructive signals only
   ↑
→ selected Judge
→ Guards / Challenge / Resolver
→ ACCEPT / REVISE / ESCALATE
```

The interactive tool is a narrow capability, not database access. The judge cannot request SQL, generic corpus search, raw rows, nearest examples, hidden Qualification/Assurance cases or unrestricted resource browsing.

---

## Current reference evaluator

```text
Evaluator                     TCJ-EVAL-ANSWERS-BFF-SOL-v1.5-frozen-dev
Configuration SHA             2894444317a07cccc89bef3a80d6d3851740c726f61863109afad487978f3191
Reference judge               OpenAI GPT-5.6 alias / observed GPT-5.6 Sol
Evidence mode                 eager/precomputed derived signals
Private Evidence Engine       TCJ-PRIVATE-EVIDENCE-v2
Guard                         TCJ-SOL-GUARDS-v1.1
Resolver                      TCJ-DIM-RESOLVER-v1.1
Production authority          none
```

Exposed-development result:

```text
48 cases
288/288 persisted resolution cells
overall MAE 0.3542
extreme reversals 0
false-fluent on human MAJOR/CRITICAL 0
28 ACCEPT / 7 REVISE / 13 ESCALATE
```

These are development results only.

### Critical scope rule

v1.5 does **not** bind an interactive Evidence Tool schema, allowed analysis families, allowed dimensions or tool-call budget.

Therefore a fresh v1.5 Qualification pass can authorize only:

```text
mode = eager_precomputed_derived_signals
interactive_private_evidence_tool = not_in_scope
```

It must not be marketed or recorded as qualification of the preferred interactive Sol Private Evidence Tool runtime.

---

## Current human gate

Fresh Qualification v2:

```text
Protocol       TCJ-EVALUATOR-QUALIFICATION-2026Q3-v2
Cases          48
Threshold SHA  b805b1f9484ea5ce576f09187c467b268c1f7c20263efa3889041680af426836
Evaluator      frozen before bank construction
Human reviews  pending
Machine access none
```

Blind review:

`https://flipgazine.pages.dev/tcj-evaluator-qualification-review.html`

The reviewer sees scenario + candidate and rates the six frozen dimensions plus severity/confidence/ambiguity. Construction labels, model identity and TCJ judgments remain hidden.

If v1.5 passes, issue a scoped eager/precomputed Passport only.

---

## Final interactive reference evaluator — required successor

To ship the preferred final Sol/BYOJ interactive product, implement a successor evaluator that binds at minimum:

```text
Evidence Tool version
Evidence Tool schema/hash
opaque evaluation-ID resolution contract
allowed analysis families
allowed dimensions
maximum tool-call budget
derived-signal response schema/hash
signal aggregation policy
Private Evidence Engine/evidence manifest
Voice Profile version/hash
judge provider/model/settings
adapter
prompt/instruction hash
guards
challenge policy
resolver
revision policy
complete evaluator configuration hash
```

Preferred tool:

```text
tcj_evidence_assess(
  evaluation_id,
  requested_analysis_families,
  requested_dimensions
)
```

Initial analysis-family target:

```text
literal_vs_social_intent
unconventional_but_native
register_inversion
hierarchy_particle
code_switch_integration
linebreak_composition
stance_decisiveness
known_failure_cluster
```

A materially changed interactive successor must be frozen as a new evaluator configuration and face a **new fresh hidden Qualification bank created after that freeze**.

---

## Final release sequence

```text
current v1.5 blind Qualification
→ scoped eager/precomputed Passport if PASS
→ implement narrow tcj_evidence_assess + capability-denial security
→ replay interactive successor on exposed DEV evidence only
→ freeze exact interactive evaluator
→ create NEW fresh hidden Qualification bank
→ native-human blind review/freeze
→ interactive Qualification
→ interactive authority-bearing Passport if PASS
→ qualified Panel / reliability architecture
→ untouched independent Assurance
→ source-identity invariance
→ evidence-exfiltration + prompt-injection tests
→ tenant isolation
→ security/secrets acceptance
→ reproducibility / fresh-install PASS
→ Docker Compose / Helm packaging where claimed
→ local-only and BYOK deployment acceptance
→ latency / cost / revision-success measurement
→ commercial/provider diligence
→ final commercial release freeze
```

Frozen native-human gold and preregistered thresholds are never weakened because a model/configuration fails.

---

## Commercial default

Preferred BYOK enterprise structure:

```text
BUYER PAYS TCJ FOR
- TCJ Runtime / Gateway
- TCJ Core
- Voice Profile(s)
- Private Evidence Intelligence
- Private Evidence Tool
- guards / challenge / resolver
- Qualification / Passport framework
- optional Assurance, support and improvement service

BUYER SEPARATELY PROVIDES / PAYS FOR
- chosen external provider account/API usage
```

For OpenAI-backed deployment:

```text
TCJ license
+ buyer-owned OpenAI organization/account
+ buyer-controlled API credential
+ buyer pays OpenAI usage directly
```

TCJ does not sell or transfer buyer API keys. OpenAI/Sol is a reference BYOK judge, not a mandatory dependency. Local Judge remains supported for VPC/on-prem/provider-independent deployment.

---

## Buyer-specific private improvement

Private-server/VPC buyers may opt into:

```text
buyer-owned eligible evidence
→ buyer-private evidence namespace
→ pattern analysis
→ proposed Voice Profile / evidence-policy delta
→ frozen validation
→ Assurance/policy gate
→ signed approved version
→ deploy with rollback
```

No silent production self-modification. Buyer A data cannot be reused for Buyer B or general TCJ improvement without separate explicit permission.

---

## Security invariants for the interactive tool

Commercial acceptance must prove:

- opaque evaluation IDs cannot enumerate corpus rows;
- unsupported analysis families/dimensions are rejected server-side;
- arbitrary phrase/corpus search is impossible;
- judge context never receives database/service-role credentials;
- serializer paths cannot return raw rows/examples/anchors;
- prompt injection cannot widen tool capability;
- hidden Qualification/Assurance evidence is inaccessible;
- tenant evidence cannot cross tenants;
- tool-call budgets are server-enforced;
- exact tool request/response provenance is auditable without leaking reconstructive evidence;
- secrets are independently rotatable.

---

## Related Answers authorities

- `ANSWERS-BATCH2-BUYER-DATA-EXTRACTION-SPEC.md` — buyer export contract.
- `ANSWERS-BATCH2-HUMAN-FIRST-REVIEW-CORRECTION.md` — human-first visibility authority.
- `ANSWERS-BATCH2-SOURCESET-V1-1-REPLACEMENT-PATCH.md` — clean source replacement authority.
- `ANSWERS-COMMERCIAL-EXECUTION-TIMELINE.md` — commercialization schedule.
- `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md` — positioning/claim boundaries.
- `ANSWERS-VOICE-TONE.md` — Thai/English editorial authority.
- `ANSWERS-HUMAN-REVIEW.md` — immutable Batch 1 provenance.
- `ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md` — completed private-server migration proof.

Repository-root `AGENTS.md` remains the short operational entry point.
