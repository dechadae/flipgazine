# TCJ — v3 Prompt Ablation Completion & Private-Evidence v4 Direction

**Status:** CURRENT TCJ RESEARCH EXECUTION AUTHORITY  
**Date:** 22 August 2026  
**Source Qualification:** `TCJ-JUDGE-QUALIFICATION-RUN-2026Q3-v1.1`  
**Replay:** `TCJ-ANSWERS-BFF-v3-REPLAY-QWEN-20260822`  
**Next evaluator:** `TCJ-EVAL-ANSWERS-BFF-v4-research`  
**Frozen product architecture authority:** `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-FREEZE-20260822.md`  
**Sol/private-evidence tool clarification:** `ANSWERS-TCJ-SOL-PRIVATE-EVIDENCE-TOOL-AND-COMMERCIAL-LICENSING-CLARIFICATION-20260822.md`

The v4 evaluator implementation may evolve internally, but it SHALL remain inside the frozen commercial topology/trust boundaries unless a later explicit architecture decision supersedes the freeze.

## 1. Source Qualification remains valid

Qualification v1.1 remains valid completed hidden evidence.

Native-human frozen ratings are authoritative gold. Case-design labels are hypotheses only. The historical thresholds are unchanged.

All three historical candidates remain `research_only`; the current work is remediation/development, not post-hoc threshold relaxation.

## 2. v3 prompt-only replay is complete

The prompt-only v3 research replay completed all 48 exposed development cases.

```text
replay key
TCJ-ANSWERS-BFF-v3-REPLAY-QWEN-20260822

status
complete

cases
48 / 48
```

Full v3 metrics against the same frozen native-human gold:

| Dimension | MAE | Within-one | Extreme reversals |
|---|---:|---:|---:|
| intent | 0.7708 | 34/48 | 13 |
| thai_pragmatics | 0.8750 | 34/48 | 12 |
| bff_voice | 0.8125 | 36/48 | 12 |
| lexical_social_fit | 0.8333 | 35/48 | 12 |
| stance | 0.7917 | 36/48 | 11 |
| composition | 0.6458 | 42/48 | 6 |

For comparison, historical Qwen v2 BFF Voice MAE was `0.4583` with 6 BFF extreme reversals.

Therefore v3 is a **negative ablation**. More textual instructions made catastrophic native-pragmatic discrimination worse.

It receives no authority and will not become the production profile merely because it encodes more explicit rules.

## 3. Research conclusion

The principal problem is not lack of awareness that Thai conversational phenomena exist.

A general-purpose model can know that:

- mock-formality can be funny;
- English borrowing can be natural;
- omission can be intentional;
- line breaks can carry delivery;

and still fail to distinguish when those devices are actually native-good versus superficially similar bad output.

The missing signal is **contrastive native evidence plus a controlled decision algorithm**, not a longer system prompt.

## 4. Frozen final runtime trust boundary

The product topology is frozen by `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-FREEZE-20260822.md`.

Base/eager execution:

```text
buyer writer candidate
        ↓
TCJ Gateway
        ↓
selected Voice Profile
        ↓
PRIVATE TCJ Evidence Engine
        ↓
derived, non-reconstructive evidence signals
        ↓
SELECTED TCJ JUDGE RUNTIME
Local Judge OR BYOK Judge
        ↓
TCJ deterministic guards
        ↓
risk-triggered challenge
        ↓
independent six-dimension resolver
        ↓
final diagnosis / ACCEPT / REVISE / ESCALATE
        ↓
buyer writer receives only revision guidance / final decision
        ↓
writer rewrites once if required
        ↓
TCJ recheck
```

The approved interactive Sol/BYOJ implementation is equivalent at the trust-boundary level:

```text
candidate
→ selected Voice Profile
→ SELECTED TCJ JUDGE
   ↕
   TCJ PRIVATE EVIDENCE TOOL
   ↓
   PRIVATE TCJ Evidence Engine / Data Vault
   ↓
   derived non-reconstructive signals only
   ↑
→ SELECTED TCJ JUDGE
→ TCJ guards / challenge / independent resolver
```

The selected judge may choose which **allowlisted derived analysis** to request during the current evaluation. It never receives SQL/database credentials, arbitrary corpus search, raw rows, raw anchors, nearest examples or hidden authority evidence.

The buyer writer is generation/revision compute. A buyer may separately supply the semantic judge through BYOJ, but that judge also does not receive the proprietary raw corpus.

Internal Batch 1, Batch 2, future batches, native-human review rows, Qualification cases and proprietary anchors remain inside the TCJ evidence boundary and are non-deliverable by default.

Runtime evidence exposure is governed by:

- `ANSWERS-TCJ-PRIVATE-EVIDENCE-ENGINE-AND-BUYER-ISOLATION-POLICY-20260822.md`
- `ANSWERS-TCJ-BYOJ-JUDGE-RUNTIME-AND-API-KEY-POLICY-20260822.md`
- `ANSWERS-TCJ-SOL-PRIVATE-EVIDENCE-TOOL-AND-COMMERCIAL-LICENSING-CLARIFICATION-20260822.md`

Do not redesign this trust boundary merely because a model/provider cannot satisfy it. Use the architecture-inversion rule first.

## 5. Private Evidence Engine and tool

The current 968-anchor human review layer becomes an input to a private evidence service rather than a corpus exposed to the buyer writer or selected judge runtime.

Current research evidence:

```text
anchor set            ANSWERS-BFF-VOICE-ANCHORS-v1
anchors               968
approved unchanged    566
human-edited pairs    402
manifest SHA-256      260bdf1c00f7c4ac8560b29ef2f4895438fb5a368a644f9658a3c335f584a92a
```

The engine should retrieve internally and produce non-reconstructive derived signals where possible.

Examples:

```text
risk_family
positive_support
negative_support
contrast_strength
register_fit
code_switch_fit
hierarchy_risk
composition_risk
confidence
challenge_dimensions
```

For the Sol reference evaluator, prefer a narrow tool such as:

```text
tcj_evidence_assess(
  evaluation_id,
  requested_analysis_families,
  requested_dimensions
)
```

The tool should use an opaque evaluation ID where practical and allowlisted analysis families/dimensions rather than accepting free-form corpus search requests.

Raw internal records are not a buyer-facing runtime surface and are not a judge-runtime input.

## 6. v4 evaluator configuration

`TCJ-EVAL-ANSWERS-BFF-v4-research` remains research-only and has no production authority.

It should evolve into an immutable configuration containing at minimum:

```text
TCJ Core
canonical Voice Profile
Private Evidence Engine version / evidence manifest
derived-signal contract
Private Evidence Tool version/schema
allowed tool analysis families
maximum tool-call budget
judge runtime type: research | local | byok
judge provider/model/snapshot
model adapter
risk detector policy
challenge policy
independent dimension resolver
disagreement / uncertainty policy
revision policy
exact configuration hash
```

Production Qualification will eventually apply to this **full evaluator configuration**, not to a naked LLM name.

The semantic judge is therefore an interchangeable authority-bearing component behind the BYOJ abstraction. The Evidence Tool is also authority-bearing because it can change what evidence reaches the judge.

## 7. v4 research algorithm

For the Sol reference path, the preferred next development loop is:

```text
candidate
→ bind canonical Voice Profile
→ create opaque evaluation context
→ selected Sol/BYOJ judge diagnosis begins
→ judge requests only allowlisted evidence analyses as needed
→ Private Evidence Engine computes derived contrastive signals privately
→ judge receives bounded non-reconstructive signals
→ deterministic/risk-family checks
→ challenge only risky high/low decisions
→ independently resolve each dimension
→ disagreement > 1 becomes explicit uncertainty, challenge or escalation
→ final diagnosis
```

The eager/precomputed signal path may also be benchmarked as a separate evaluator configuration.

The v1.1 exposed bank remains development evidence only.

Do not change:

- native-human gold;
- historical v1.1 thresholds;
- frozen historical model outputs;
- historical Passports;
- frozen product trust boundaries merely to make a model pass.

## 8. Buyer-specific profile architecture

A buyer may use its own authorized evidence to create a private Voice Profile and evidence namespace.

For private deployment:

```text
buyer-owned evidence
→ buyer-private Evidence Engine
→ buyer-specific Voice Profile intelligence
→ derived signals / narrow private evidence tool
→ selected Local Judge or BYOK Judge
→ TCJ final diagnosis
→ buyer writer revision instruction
```

The buyer's raw data does not need to be sent to OpenAI, xAI or another external AI platform. If a buyer chooses a BYOK Judge, the default interface sends only the current candidate, selected Voice Profile contract and derived/non-reconstructive evidence signals required for the current judgment.

Cross-customer reuse remains separately opt-in.

## 9. Provider-output boundary

Internal provider-derived evidence can remain useful for runtime retrieval, non-model Voice Profile development, failure analysis, benchmarking and regression without becoming training data for the selected judge.

If a future Local Judge is trained/fine-tuned, only evidence with an explicit model-training eligibility basis may enter its training corpus.

The private-runtime architecture does not use the label `Voice Profile`, `BYOJ` or `Private Evidence Tool` to bypass model-development restrictions. Technical substance controls classification.

Runtime use of the current candidate + Voice Profile + derived signals is distinct from accumulating those outputs as model-training supervision.

## 10. Judge-runtime terminology, commercial posture and external API release gate

Governing terminology:

```text
BYOJ         Bring Your Own Judge — umbrella
Local Judge  self-hosted/private judge endpoint; no external provider required
BYOK Judge   supported external provider using buyer-supplied credential
```

A cloud OpenAI/xAI judge is not called `Local Judge` merely because TCJ runs locally.

For commercial deployment, BYOK is the preferred initial enterprise structure:

```text
buyer licenses TCJ / Voice Profile / evidence intelligence
+
buyer supplies and controls its provider account/API credential
+
buyer pays provider usage directly
```

TCJ does not sell/transfer the buyer's API key. Managed bundled inference remains a separately reviewed future option.

The product architecture is frozen, but paid external-provider integration remains an implementation/release gate. OpenAI and xAI BYOK adapters may be connected when the project is ready to qualify the exact reference evaluator configuration under the frozen architecture.

Before production authority, the exact evaluator still must pass:

```text
v4 evaluator research convergence
→ exact evaluator configuration freeze
→ fresh hidden Qualification PASS
→ authority-bearing Passport
→ qualified Panel / final reliability architecture
→ independent Assurance PASS
→ security + evidence-isolation acceptance
→ reproducibility / clean-install PASS
→ commercial release freeze
```

The latest approved OpenAI Sol-class model may be used as a recommended/reference BYOK judge candidate, with the exact API model/version resolved and frozen at integration/Qualification time. OpenAI is not mandatory; a qualified Local Judge or another supported BYOK Judge may replace it.

External APIs do not redefine the canonical Voice Profile and do not receive proprietary TCJ development corpora.

## 11. Immediate automatic next action

Continue autonomously **inside the frozen commercial architecture**:

1. implement canonical Voice Profile binding;
2. implement the Private Evidence Engine retrieval/derived-signal layer;
3. implement narrow `tcj_evidence_assess` with opaque evaluation IDs and allowlisted analysis families/dimensions;
4. hard-prohibit SQL, raw-row, nearest-example and generic corpus-search outputs by capability/schema;
5. define deterministic risk-family detection for the eight known failure clusters;
6. abstract semantic judging behind a BYOJ-compatible judge interface;
7. implement the Sol/reference judge adapter and bounded tool-call loop without granting raw-corpus access;
8. bind tool version/schema/families/call budget into evaluator hashing/provenance;
9. implement independent dimension resolution;
10. implement risk-triggered challenge rather than universal extra prompting;
11. replay v4 on exposed v1.1 development evidence;
12. compare with historical Qwen v2 and negative-ablation v3;
13. iterate only while preserving immutable history;
14. when obvious research defects have converged, freeze the complete evaluator configuration;
15. construct a fresh hidden Qualification bank;
16. stop for native-human blind review/freeze.

No human judgment is required before that fresh hidden bank is ready.

## 12. Commercial runtime consequence

The final commercial judge is not fixed to one vendor.

A qualified deployment may use:

```text
A. Local Judge
   buyer/self-hosted model through a supported private endpoint

B. BYOK Judge
   supported provider model through buyer-owned API credentials
```

Both operate behind the same frozen TCJ product topology. Either may use the narrow Private Evidence Tool, but neither receives direct/raw vault access.

The approved product statement is:

> **Bring your writer. Bring your judge or your API key. TCJ keeps the proprietary Thai evidence private and qualifies the complete evaluator configuration before granting production authority.**

The approved tool statement is:

> **The judge can ask TCJ for evidence analysis; TCJ consults the private vault and returns only non-reconstructive signals.**
