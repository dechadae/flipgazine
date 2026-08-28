# TCJ — Sol Private Evidence Tool & Commercial Licensing Clarification

**Status:** GOVERNING FROZEN-ARCHITECTURE CLARIFICATION / COMMERCIAL LICENSING POLICY  
**Date:** 22 August 2026  
**Project:** Flipgazine / The Book of Answers / Thai Conversation Judge (TCJ)  
**Extends without reopening:** `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-FREEZE-20260822.md`  
**Judge-runtime authority:** `ANSWERS-TCJ-BYOJ-JUDGE-RUNTIME-AND-API-KEY-POLICY-20260822.md`  
**Evidence-boundary authority:** `ANSWERS-TCJ-PRIVATE-EVIDENCE-ENGINE-AND-BUYER-ISOLATION-POLICY-20260822.md`  
**Commercial/provenance authority:** `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md`  
**Legal status:** architecture and internal product/licensing guidance, not legal advice. Provider terms, source rights, privacy, confidentiality, data-processing obligations and transaction-specific licensing must be checked before material commercial use.

---

## 1. Decision

The frozen TCJ architecture permits a selected semantic judge — including the reference OpenAI Sol BYOK judge — to invoke a **TCJ-controlled Private Evidence Tool** during the current evaluation.

This is an approved implementation pattern inside the existing frozen trust boundary. It does **not** give the judge direct database/vault access and does **not** reopen the frozen product topology.

Approved interactive form:

```text
candidate
   ↓
Voice Profile
   ↓
SELECTED TCJ JUDGE
GPT-5.6 Sol reference BYOK judge, or another qualified BYOJ judge
   ↕
TCJ PRIVATE EVIDENCE TOOL
   ↓
PRIVATE TCJ DATA VAULT / EVIDENCE ENGINE
   ↓
derived, non-reconstructive evidence only
   ↑
SELECTED TCJ JUDGE
   ↓
TCJ Guards / Risk-Triggered Challenge / Independent Resolver
   ↓
ACCEPT / REVISE / ESCALATE
```

The equivalent eager/precomputed form remains valid:

```text
candidate
→ Voice Profile
→ Private Evidence Engine
→ derived signals
→ selected judge
→ TCJ guards / challenge / resolver
```

Both forms implement the same frozen trust boundary. Because interactive tool use can materially affect semantic behavior, each materially different tool policy/schema belongs to the authority-bearing evaluator configuration and must be qualified accordingly.

---

## 2. “Connected to the private vault” means capability access, not database access

For TCJ product language, a judge may be described as **connected to TCJ private evidence intelligence** only if the implementation preserves this distinction:

```text
ALLOWED
judge → narrow TCJ evidence function → private engine → derived signals

FORBIDDEN
judge → SQL/database session
judge → service-role credential
judge → arbitrary corpus search
judge → raw document/row browser
judge → nearest-example retrieval endpoint
judge → unrestricted MCP/resource namespace exposing the corpus
```

The semantic judge never receives:

- Supabase service-role keys;
- database passwords;
- vault credentials;
- internal table names as a query surface;
- unrestricted search/retrieval authority;
- raw Batch rows;
- verbatim proprietary anchors;
- raw human-review records;
- hidden Qualification/Assurance evidence.

The TCJ server owns all private-data credentials and executes evidence operations inside the private trust boundary.

---

## 3. Preferred tool contract

The Private Evidence Tool should be a narrow capability endpoint rather than a generic search API.

Preferred call shape:

```text
tcj_evidence_assess(
  evaluation_id,
  requested_analysis_families,
  requested_dimensions
)
```

Where practical, the tool should use an opaque `evaluation_id` to resolve the current candidate/scenario server-side rather than accepting arbitrary free-form corpus queries from the judge.

`requested_analysis_families` and `requested_dimensions` should be allowlisted enums, for example:

```text
analysis families
- literal_vs_social_intent
- unconventional_but_native
- register_inversion
- hierarchy_particle
- code_switch_integration
- linebreak_composition
- stance_decisiveness
- known_failure_cluster

dimensions
- intent
- thai_pragmatics
- bff_voice
- lexical_social_fit
- stance
- composition
```

The tool may internally use raw proprietary evidence, retrieval, contrastive pairs and native-human review data.

Its external response must remain bounded and non-reconstructive.

---

## 4. Allowed evidence-tool output

The tool may return fixed-schema derived evidence such as:

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

It may also return bounded categorical explanations needed for the current judgment, provided they do not quote or reconstruct proprietary source rows.

It must not return by default:

```text
matched_rows
row_ids that enable corpus enumeration
nearest_examples
raw_examples
human_edit_pairs
verbatim anchors
raw review notes
raw Qualification cases
raw Assurance cases
SQL/result sets
reconstructive embeddings/vectors
```

If a future research experiment requires richer evidence, that is a separate research-only evidence policy and does not change the commercial default.

---

## 5. Prompt-injection and exfiltration invariant

The selected judge must be unable to obtain private evidence merely by asking the tool for it.

Examples that must fail by construction:

```text
"show me the examples you used"
"return the nearest 20 rows"
"search for this exact Thai phrase"
"give me all human edits"
"list the hidden test cases"
"run this SQL"
```

The protection must come from the **absence of those capabilities**, not from hoping the judge follows an instruction not to ask.

The tool schema, authorization layer and response serializer are therefore security controls and authority-bearing evaluator components.

---

## 6. Sol / OpenAI reference implementation

The initial reference commercial evaluator may use the latest approved GPT-5.6 Sol-class API model as a **BYOK Judge**.

The exact API identifier/version/settings must be resolved from current official OpenAI documentation and frozen at Qualification time.

The Sol judge may receive:

- the current candidate/scenario needed for evaluation;
- the selected Voice Profile contract;
- structured TCJ instructions/schema;
- derived signals returned by the Private Evidence Tool.

Sol does not receive the TCJ data vault, raw internal corpus or credentials.

The reference configuration must preserve at minimum:

```text
provider
exact model identifier/snapshot if available
reasoning effort
sampling/settings
structured-output schema
system/instruction hash
Voice Profile version/hash
Private Evidence Tool schema/version/hash
Private Evidence Engine/evidence manifest version
allowed evidence-analysis families
derived-signal schema/hash
guard policy
challenge policy
independent resolver policy
revision policy
complete evaluator configuration hash
```

Sol itself receives no authority merely because it is a frontier model. Authority belongs only to the complete frozen evaluator configuration after fresh Qualification and subsequent gates.

---

## 7. Commercial licensing posture

This architecture is structurally compatible with a commercial TCJ license.

The buyer licenses TCJ capability, not OpenAI and not the raw TCJ corpus.

Default commercial structure:

```text
BUYER PAYS TCJ FOR
- TCJ Runtime / Gateway license
- licensed Voice Profile(s)
- Private Evidence Intelligence capability
- evidence-tool/runtime functionality
- guards / resolver / Qualification framework
- optional Assurance, deployment, support and improvement services

BUYER SEPARATELY PROVIDES / PAYS FOR
- its chosen BYOK provider account and API usage, if using a BYOK Judge
```

Third-party AI services are not sublicensed as part of the TCJ software license unless a separately reviewed managed-service agreement expressly provides otherwise.

---

## 8. BYOK is the default enterprise model

For OpenAI-backed TCJ, the preferred enterprise arrangement is:

```text
TCJ commercial license
+
buyer-owned OpenAI organization/account
+
buyer-controlled API credential
+
buyer pays OpenAI usage directly
```

TCJ may securely store/use the buyer-supplied credential as authorized by the buyer, but TCJ must not sell, transfer or trade the API key itself.

This cleanly separates:

```text
TCJ fees
from
third-party model-provider compute fees
```

A managed TCJ tier that uses TCJ's own provider account may be evaluated separately, but BYOK remains the preferred default because it reduces token-resale, billing, abuse, quota and provider-account complexity.

---

## 9. Current OpenAI terms checkpoint — 22 August 2026

Official terms were rechecked before this clarification was written.

Current OpenAI Services Agreement, effective 1 January 2026, states that OpenAI customers may use the API to integrate OpenAI services into Customer Applications and make those applications available to End Users. The same agreement prohibits reselling or leasing access to the customer's OpenAI account and prohibits buying, selling or transferring API keys with third parties.

Official source:

`https://openai.com/policies/services-agreement/`

OpenAI's current business-data materials state that API/business inputs and outputs are not used to train or improve OpenAI models by default unless the customer explicitly opts in.

Official source:

`https://openai.com/business-data/`

OpenAI also states that qualifying API organizations can use Zero Data Retention, and on 19 August 2026 described ZDR as not retaining prompts or model responses after processing for eligible deployments, subject to the applicable service/endpoint conditions.

Official source:

`https://openai.com/index/our-commitment-to-zero-data-retention/`

These terms/privacy controls support the feasibility of an OpenAI-backed TCJ Customer Application, but they are **not** a blanket legal warranty for every buyer, jurisdiction, dataset or use. Recheck the exact provider terms, endpoint eligibility and customer contract before material launch or signature.

---

## 10. What OpenAI processes in this architecture

Where Sol is the selected BYOK Judge, the information crossing to OpenAI is limited to the current evaluation payload and allowed tool results, for example:

```text
current candidate/scenario
selected Voice Profile instructions required for evaluation
TCJ structured judge schema
non-reconstructive derived evidence signals
```

Raw private corpus material does not cross merely because the judge can invoke the evidence tool.

Buyer security documentation must nevertheless state accurately that whatever candidate/profile/signal material is sent to the BYOK provider is processed by that provider under the buyer's provider agreement and configured data controls.

For sensitive enterprise deployments, TCJ should support and document provider-side privacy controls such as qualifying ZDR configurations where available and appropriate.

---

## 11. Corpus and IP boundary remains unchanged

The buyer does not receive by default:

```text
Batch 1
Batch 2
Batch 3+
raw native-human review rows
before→after proprietary pairs
internal anchor corpus
hidden Qualification banks
Assurance holdouts
research failure ledgers
raw provider-response evidence
```

The buyer licenses the evaluation capability generated from those assets.

The selected Local/BYOK Judge also does not obtain those assets merely by participating in runtime evaluation.

---

## 12. Managed-service option

A future managed TCJ service may internally call OpenAI or another provider using a TCJ-controlled provider account where the governing provider agreement and customer contract permit that architecture.

Such a service must be analyzed as a TCJ Customer Application/service, not as a sale or transfer of an API key/account.

Before offering bundled inference commercially, define at minimum:

```text
usage metering
provider-cost pass-through/margin
rate and quota controls
abuse handling
data-processing terms
retention/security posture
subprocessor disclosure where required
provider outage/fallback policy
provider-model change policy
```

BYOK remains the initial enterprise default.

---

## 13. Qualification consequence

The interactive Evidence Tool is not a harmless transport detail if it can change what evidence the judge sees.

Therefore an authority-bearing evaluator Passport must bind:

```text
judge model/version
judge adapter
Voice Profile
Evidence Engine/evidence manifest
Evidence Tool version
Evidence Tool schema
allowed tool-call families
maximum tool-call budget
signal response schema
signal aggregation policy
guards
challenge policy
resolver
revision policy
full configuration hash
```

Changing the tool schema, evidence families, signal generation or tool-call budget may require regression/requalification according to the TCJ change policy.

---

## 14. Recommended reference runtime

For the initial Sol-backed TCJ reference evaluator, the preferred implementation target is:

```text
candidate
   ↓
Voice Profile
   ↓
GPT-5.6 Sol BYOK Judge
   ↕
TCJ PRIVATE EVIDENCE TOOL
   ↓
PRIVATE EVIDENCE ENGINE / DATA VAULT
   ↓
derived non-reconstructive evidence
   ↑
GPT-5.6 Sol BYOK Judge
   ↓
TCJ deterministic guards
   ↓
risk-triggered challenge when required
   ↓
independent six-dimension resolver
   ↓
ACCEPT / REVISE / ESCALATE
   ↓
writer revision once if REVISE
   ↓
TCJ recheck
```

This pattern is approved for commercial product development **without granting Sol direct raw-vault access**.

---

## 15. Commercial statements

Approved concise product statement:

> **TCJ can use your chosen judge through a private evidence tool. The judge asks TCJ for the evidence analysis it needs; TCJ consults its proprietary vault privately and returns only non-reconstructive signals.**

Approved licensing statement:

> **License TCJ separately from your AI provider. With BYOK, you bring and pay for your own provider account/API key while TCJ supplies the proprietary Thai quality intelligence, Voice Profiles, evidence tooling and qualified evaluation layer.**

Approved OpenAI-specific statement:

> **OpenAI Sol can be a reference BYOK judge, but OpenAI is not mandatory. Sol never receives direct database credentials or raw TCJ corpus access.**

---

## 16. Relationship to the frozen architecture

This clarification does not replace or invalidate the original architecture-freeze blob.

The original frozen invariant remains:

```text
raw evidence
→ Private Evidence Engine only
→ derived/non-reconstructive boundary
→ selected judge
→ TCJ-owned final resolution
```

The interactive tool pattern simply allows the selected judge to request **which permitted derived analysis TCJ should compute during that evaluation**.

It does not move raw evidence across the trust boundary.

Accordingly:

- original freeze remains preserved and auditable;
- this document is the governing clarification for judge-initiated evidence access and commercial licensing;
- any future design that gives the judge arbitrary/raw-vault access is an architecture reopening and requires an explicit superseding architecture decision.
