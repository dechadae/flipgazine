# TCJ — Final Product Implementation & Qualification Plan

**Status:** GOVERNING FINAL-PRODUCT EXECUTION PLAN  
**Date:** 22 August 2026  
**Project:** Flipgazine / The Book of Answers / Thai Conversation Judge (TCJ)  
**Topology authority:** `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-FREEZE-20260822.md`  
**Governing clarification:** `ANSWERS-TCJ-SOL-PRIVATE-EVIDENCE-TOOL-AND-COMMERCIAL-LICENSING-CLARIFICATION-20260822.md`  
**Deployment policy:** `ANSWERS-TCJ-PLUG-AND-PLAY-DEPLOYMENT-AND-VOICE-PROFILE-POLICY-20260822.md`  
**Evidence boundary:** `ANSWERS-TCJ-PRIVATE-EVIDENCE-ENGINE-AND-BUYER-ISOLATION-POLICY-20260822.md`  
**Judge runtime:** `ANSWERS-TCJ-BYOJ-JUDGE-RUNTIME-AND-API-KEY-POLICY-20260822.md`  

This plan does not reopen the frozen product architecture. It defines the implementation and qualification path required for the final commercial product to conform to the governing Private Evidence Tool / Sol / BYOK clarification.

---

## 1. Final commercial reference runtime

The preferred Sol-backed commercial reference runtime is:

```text
BUYER APPLICATION
  ↓
BUYER WRITER MODEL
  ↓
TCJ GATEWAY
  ↓
VOICE PROFILE
  ↓
SELECTED TCJ JUDGE
  ↕
TCJ PRIVATE EVIDENCE TOOL: tcj_evidence_assess
  ↓
PRIVATE TCJ EVIDENCE ENGINE / DATA VAULT
  ↓
DERIVED NON-RECONSTRUCTIVE SIGNALS ONLY
  ↑
SELECTED TCJ JUDGE
  ↓
TCJ DETERMINISTIC GUARDS
  ↓
RISK-TRIGGERED CHALLENGE
  ↓
INDEPENDENT SIX-DIMENSION RESOLVER
  ↓
ACCEPT / REVISE / ESCALATE
  ↓
if REVISE: targeted instruction only
  ↓
BUYER WRITER rewrites once
  ↓
TCJ RECHECK
  ↓
FINAL RESPONSE
```

The equivalent eager/precomputed path remains a valid TCJ evaluator mode:

```text
Voice Profile → Private Evidence Engine → derived signals → selected judge
```

But eager and interactive evidence-tool variants are different authority-bearing evaluator configurations if their evidence access behavior differs materially.

---

## 2. Non-negotiable evidence boundary

The selected Local/BYOK judge may request only allowlisted derived analysis. It never receives direct database or raw-corpus capability.

Allowed:

```text
judge → tcj_evidence_assess → private engine → bounded derived signals
```

Forbidden by capability absence:

```text
judge → SQL/database session
judge → service-role credential
judge → arbitrary corpus search
judge → raw row/document browser
judge → nearest-example retrieval
judge → hidden Qualification/Assurance evidence
judge → unrestricted MCP/resource namespace over the corpus
```

Prompt-injection protection is structural: the forbidden capabilities do not exist in the judge tool surface.

---

## 3. Preferred Private Evidence Tool contract

Target interface:

```text
tcj_evidence_assess(
  evaluation_id,
  requested_analysis_families,
  requested_dimensions
)
```

`evaluation_id` should be opaque and server-resolved. The judge does not supply corpus queries.

Initial allowlisted analysis families:

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

Dimensions:

```text
intent
thai_pragmatics
bff_voice / selected profile voice dimension
lexical_social_fit
stance
composition
```

The response may contain bounded fields such as:

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
signal_version
```

It must not return raw examples, matched rows, enumerable row IDs, human-edit pairs, review notes, verbatim anchors, Qualification/Assurance cases, SQL results, or reconstructive vectors.

---

## 4. Current v1.5 evaluator scope

Current frozen evaluator:

`TCJ-EVAL-ANSWERS-BFF-SOL-v1.5-frozen-dev`

SHA-256:

`2894444317a07cccc89bef3a80d6d3851740c726f61863109afad487978f3191`

It binds:

- GPT-5.6 / observed GPT-5.6 Sol reference BYOK judge runtime;
- Voice Profile;
- Private Evidence Engine v2;
- derived-signal schema;
- independent dimension prompts;
- risk-triggered challenge;
- deterministic guards;
- independent resolver;
- one-revision policy.

It does **not** bind an interactive Private Evidence Tool schema, allowed analysis-family contract, or tool-call budget.

Therefore:

> A fresh Qualification pass by v1.5 can authorize only the exact eager/precomputed derived-signal evaluator represented by SHA `28944443…f3191`. It must not be described as qualification of the preferred interactive Sol Private Evidence Tool runtime.

This distinction is mandatory for Passports, status pages, commercial claims and release gating.

---

## 5. Current fresh Qualification v2 remains valid

Protocol:

`TCJ-EVALUATOR-QUALIFICATION-2026Q3-v2`

The fresh bank was created after the v1.5 evaluator freeze and remains a valid hidden authority bank for **v1.5 only**.

If v1.5 passes, issue a Passport whose scope explicitly says:

```text
mode = eager_precomputed_derived_signals
interactive_private_evidence_tool = not_in_scope
```

If v1.5 fails, preserve the failure and do not alter human gold or thresholds.

The current native-human blind review therefore remains useful and valid; it is a qualification of the eager reference evaluator, not final certification of the later interactive tool variant.

---

## 6. Interactive reference evaluator must be a successor configuration

Before the preferred final Sol commercial reference runtime can receive authority, create a successor evaluator configuration after implementing the narrow Private Evidence Tool.

The successor must bind at minimum:

```text
TCJ Core version
Voice Profile version/hash
Private Evidence Engine/evidence manifest version/hash
Evidence Tool version
Evidence Tool schema/hash
allowed analysis families
allowed dimensions
maximum tool-call budget
server-side evaluation-id resolution contract
derived-signal response schema/hash
signal aggregation policy
judge provider
exact model identifier/snapshot where available
judge adapter
reasoning/settings
structured-output schema
prompt/instruction hash
guard policy
challenge policy
resolver policy
revision policy
complete evaluator configuration hash
```

Changing any materially semantic tool policy requires the applicable regression/requalification policy.

---

## 7. Qualification chronology for the interactive successor

The authority sequence is strict:

```text
implement tool + security boundary
→ test capability-denial / exfiltration behavior
→ replay only on exposed development evidence
→ converge without changing native-human gold or thresholds
→ freeze exact interactive evaluator configuration
→ create a NEW fresh hidden Qualification bank after that freeze
→ native-human blind review and gold freeze
→ only then expose the frozen interactive evaluator to that bank
→ apply unchanged qualification thresholds
→ if PASS: issue authority-bearing interactive evaluator Passport
```

The current fresh Qualification v2 bank must not later be recycled as hidden authority evidence for a materially changed interactive successor after v1.5 has seen it.

---

## 8. Panel and Assurance

No evaluator, eager or interactive, enters production Panel authority merely because it passed development replay.

After an evaluator earns a scoped Qualification Passport:

```text
qualified evaluator Passport(s)
→ competence-aware Panel assembly
→ frozen disagreement / escalation policy
→ independent untouched Assurance bank
→ native-human blind Assurance gold
→ Assurance PASS
```

Panel membership and Assurance evidence remain version-bound to the exact evaluator configurations used.

---

## 9. Commercial product packaging

Default enterprise commercial structure:

```text
BUYER LICENSES / PAYS TCJ FOR
- TCJ Gateway / Runtime
- TCJ Core
- licensed Voice Profile(s)
- Private Evidence Intelligence capability
- Private Evidence Tool runtime
- guards / challenge / resolver
- Qualification / Passport framework
- optional Assurance
- deployment/support
- optional Voice Profile Improvement Service

BUYER SEPARATELY PROVIDES / PAYS FOR
- chosen BYOK provider account and API usage
```

For OpenAI-backed deployment:

```text
TCJ license
+
buyer-owned OpenAI organization/account
+
buyer-controlled API credential
+
buyer pays OpenAI usage directly
```

TCJ does not sell, transfer or trade buyer API keys. A managed bundled-inference service is a separate future commercial option and requires separate provider/account/billing/data-processing review.

OpenAI is a reference BYOK judge, not a mandatory dependency. Local Judge remains the private/on-prem path.

---

## 10. Buyer-facing product modes

The final product should expose simple modes while keeping research machinery behind the trust layer:

```text
Judge Only
Quality Gate
Full Runtime Refinement
Buyer-Writer Final Rewrite
```

Buyer-visible configuration should include:

```text
Voice Profile
Writer endpoint
Judge mode: Local | BYOK
Provider/model where applicable
Evidence mode: eager | interactive-tool
Auto Revision: on/off
Escalation policy
Qualification/Passport state
```

A buyer must not need to operate raw Qualification banks, internal evidence tables, research ledgers or corpus retrieval manually.

---

## 11. Buyer-specific private improvement

For opted-in private-server/VPC customers:

```text
buyer-owned eligible evidence
→ buyer-private evidence namespace
→ provenance classification
→ repeated-pattern analysis
→ proposed Voice Profile / evidence-policy delta
→ frozen validation
→ Assurance/policy gate
→ signed approved profile version
→ deploy with rollback target
```

No silent production self-modification.

Permission to improve Buyer A does not authorize cross-customer reuse. Cross-customer improvement requires separate explicit permission.

---

## 12. Security acceptance specific to the interactive tool

Before commercial release, prove at minimum:

1. opaque evaluation IDs cannot enumerate corpus records;
2. unsupported analysis families are rejected server-side;
3. arbitrary text search is impossible through the tool schema;
4. SQL/database credentials are absent from judge context;
5. raw rows/examples/anchors cannot be returned by serializer paths;
6. prompt injection cannot expand tool capabilities;
7. hidden Qualification/Assurance evidence namespaces are inaccessible at runtime;
8. tenant-scoped evidence cannot cross tenants;
9. tool-call budgets are enforced server-side;
10. exact tool request/response provenance is auditable without storing reconstructive corpus output;
11. secrets are independently rotatable;
12. Local Judge and BYOK Judge paths enforce the same evidence boundary.

---

## 13. Plug-and-play release gates

After interactive Qualification/Panel/Assurance:

```text
security + exfiltration PASS
→ source-identity invariance PASS
→ fresh-install reproducibility PASS
→ Docker Compose package PASS
→ Helm/Kubernetes package where claimed
→ restart/resume/rollback PASS
→ local-only/offline mode PASS where claimed
→ BYOK connection/setup PASS
→ first evaluated response <30 min from fresh environment
→ stretch target <10 min for default OpenAI-compatible path
→ latency/cost/revision-success measurements
→ audit/provenance UX
→ buyer-ready licensing/data-processing diligence
→ final commercial release freeze
```

The time targets are acceptance targets until demonstrated; they are not yet marketing claims.

---

## 14. Immediate execution order

Current sequence:

```text
1. Complete current native-human blind Qualification v2 for frozen v1.5.
2. If v1.5 passes, issue a scoped eager/precomputed evaluator Passport only.
3. Implement the commercial narrow tcj_evidence_assess tool and capability-denial boundary.
4. Bind tool schema, families, dimensions, call budget and signal contract into a successor interactive evaluator.
5. Replay successor on exposed development evidence only.
6. Freeze exact interactive evaluator.
7. Construct a new fresh hidden Qualification bank after that freeze.
8. Stop for native-human blind review/freeze.
9. Run interactive Qualification; issue Passport only if unchanged gates pass.
10. Assemble qualified Panel/reliability architecture.
11. Run independent Assurance.
12. Complete security, exfiltration, tenant isolation, reproducibility and packaging gates.
13. Complete commercial/provider diligence.
14. Freeze commercial release.
```

This plan deliberately preserves the value of the current v1.5 Qualification while preventing it from being misrepresented as authority for a later interactive tool configuration.

---

## 15. Final invariant

The final product must satisfy all of these simultaneously:

```text
raw proprietary evidence stays private
+ judge can request only allowlisted derived analysis
+ tool capability cannot be widened by prompting
+ writer sees only actionable revision/decision output
+ BYOJ remains replaceable
+ BYOK billing/provider account remains buyer-owned by default
+ exact evaluator configuration, including tool behavior, is qualified
+ Panel and Assurance remain independent gates
+ buyer integration is plug-and-play
```

If an implementation violates any of those conditions, change the implementation rather than weakening the frozen architecture or the Qualification standard.
