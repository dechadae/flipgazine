# TCJ — v3 Prompt Ablation Completion & Private-Evidence v4 Direction

**Status:** CURRENT TCJ RESEARCH EXECUTION AUTHORITY  
**Date:** 22 August 2026  
**Source Qualification:** `TCJ-JUDGE-QUALIFICATION-RUN-2026Q3-v1.1`  
**Replay:** `TCJ-ANSWERS-BFF-v3-REPLAY-QWEN-20260822`  
**Next evaluator:** `TCJ-EVAL-ANSWERS-BFF-v4-research`

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

## 4. New final runtime trust boundary

The governing product path is now:

```text
buyer AI candidate
        ↓
TCJ Gateway
        ↓
PRIVATE TCJ Evidence Engine
        ↓
PRIVATE TCJ local semantic evaluator
        ↓
TCJ guards + independent-dimension resolver
        ↓
final diagnosis / ACCEPT / REVISE / ESCALATE
        ↓
buyer AI receives only revision guidance / final decision
```

The buyer AI is writer/reviser only.

Internal Batch 1, Batch 2, future batches, native-human review rows, Qualification cases and proprietary anchors remain inside the TCJ evidence boundary and are non-deliverable by default.

Runtime evidence exposure is governed by:

`ANSWERS-TCJ-PRIVATE-EVIDENCE-ENGINE-AND-BUYER-ISOLATION-POLICY-20260822.md`

## 5. Private Evidence Engine

The current 968-anchor human review layer becomes an input to a private evidence service rather than a corpus exposed to the buyer model.

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

Raw internal records are not a buyer-facing runtime surface.

## 6. v4 evaluator configuration

`TCJ-EVAL-ANSWERS-BFF-v4-research` remains research-only and has no production authority.

It should evolve into an immutable configuration containing at minimum:

```text
TCJ Core
canonical Voice Profile
Private Evidence Engine version / evidence manifest
private local judge model snapshot
model adapter
risk detector policy
challenge policy
independent dimension resolver
disagreement / uncertainty policy
revision policy
exact configuration hash
```

Production Qualification will eventually apply to this **full evaluator configuration**, not to a naked LLM name.

## 7. v4 research algorithm

The next development loop is:

```text
candidate
→ deterministic/risk-family detection
→ private evidence retrieval
→ contrastive derived signals
→ standard private local diagnosis
→ challenge only risky high/low decisions
→ independently resolve each dimension
→ disagreement > 1 becomes explicit uncertainty, challenge or escalation
→ final diagnosis
```

The v1.1 exposed bank remains development evidence only.

Do not change:

- native-human gold;
- historical v1.1 thresholds;
- frozen historical model outputs;
- historical Passports.

## 8. Buyer-specific profile architecture

A buyer may use its own authorized evidence to create a private Voice Profile and evidence namespace.

For private deployment:

```text
buyer-owned evidence
→ buyer-private Evidence Engine
→ buyer-specific Voice Profile intelligence
→ private TCJ evaluator
→ final TCJ diagnosis
→ buyer AI revision instruction
```

The buyer's raw data does not need to be sent to OpenAI, xAI or another external AI platform.

Cross-customer reuse remains separately opt-in.

## 9. Provider-output boundary

Internal provider-derived evidence can remain useful for runtime retrieval, non-model Voice Profile development, failure analysis, benchmarking and regression without becoming training data for the private local judge.

If a future local judge is trained/fine-tuned, only evidence with an explicit model-training eligibility basis may enter its training corpus.

The private-runtime architecture does not use the label `Voice Profile` to bypass model-development restrictions. Technical substance controls classification.

## 10. External API release gate

OpenAI and xAI paid API adapters remain disconnected during this research phase.

They may be connected only after:

```text
v4 evaluator research convergence
→ evaluator configuration freeze
→ fresh hidden Qualification PASS
→ qualified Panel
→ independent Assurance PASS
→ reproducibility / clean-install PASS
→ final TCJ architecture/runtime freeze
```

External APIs are then replaceable runtime integrations. They do not redefine the canonical Voice Profile or receive proprietary TCJ development corpora by default.

## 11. Immediate automatic next action

Continue autonomously:

1. implement the Private Evidence Engine retrieval/derived-signal layer;
2. define deterministic risk-family detection for the eight known failure clusters;
3. implement private local evaluator calls and independent dimension resolution;
4. implement risk-triggered challenge rather than universal extra prompting;
5. replay v4 on exposed v1.1 development evidence;
6. compare with historical Qwen v2 and negative-ablation v3;
7. iterate only while preserving immutable history;
8. when obvious research defects have converged, freeze the complete evaluator configuration;
9. construct a fresh hidden Qualification bank;
10. stop for native-human blind review/freeze.

No human judgment is required before that fresh hidden bank is ready.