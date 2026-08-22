# TCJ — BYOJ Judge Runtime, Local Judge & BYOK API-Key Policy

**Status:** GOVERNING JUDGE-RUNTIME / COMMERCIAL INTEGRATION POLICY  
**Date:** 22 August 2026  
**Project:** Flipgazine / The Book of Answers / Thai Conversation Judge (TCJ)  
**Extends:** `ANSWERS-TCJ-PRIVATE-EVIDENCE-ENGINE-AND-BUYER-ISOLATION-POLICY-20260822.md` and `ANSWERS-TCJ-PLUG-AND-PLAY-DEPLOYMENT-AND-VOICE-PROFILE-POLICY-20260822.md`  
**Commercial/provenance authority:** `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md`  
**Legal status:** architecture and internal product/licensing guidance, not legal advice. Provider terms, source rights, privacy, confidentiality and transaction-specific licensing must still be checked before material commercial use.

---

## 1. Governing terminology

TCJ SHALL use the following runtime terminology consistently.

### BYOJ — Bring Your Own Judge

`BYOJ` is the umbrella capability allowing a buyer to choose the semantic judge used by an otherwise fixed TCJ evaluator configuration.

BYOJ has two primary forms:

```text
BYOJ
├─ TCJ Local Judge
│  └─ buyer/self-hosted/private model endpoint
│     no external AI provider required
│
└─ TCJ BYOK Judge
   └─ external provider model
      buyer supplies its own provider/API credential
```

### TCJ Local Judge

`Local Judge` means the judge model actually runs inside the buyer-controlled or TCJ-controlled private environment, for example through:

- vLLM;
- Ollama;
- llama.cpp server;
- an OpenAI-compatible internal endpoint;
- a bank/enterprise proprietary model endpoint;
- another supported private inference runtime.

A model called through OpenAI, xAI, Anthropic, Gemini or another external SaaS/API provider is **not** called a Local Judge merely because TCJ invokes it from a local server.

### TCJ BYOK Judge

`BYOK Judge` means TCJ calls a supported external provider/model using a credential supplied and controlled by the buyer.

Possible supported providers may include OpenAI, xAI, Anthropic, Gemini and other future adapters. Support is adapter- and qualification-dependent; the commercial promise is not that literally every model/API on the market is automatically compatible.

### External Judge

`External Judge` may be used as a descriptive synonym for a BYOK provider judge where useful, but `BYOK Judge` is the preferred buyer-facing product term when the buyer supplies the credential.

---

## 2. Final runtime layering

The final TCJ runtime SHALL place the Voice Profile before evidence interpretation and SHALL keep raw evidence inaccessible to the selected judge runtime.

```text
buyer writer model produces candidate
        ↓
TCJ Gateway
        ↓
VOICE PROFILE
defines what good means for this tenant/domain
        ↓
PRIVATE TCJ EVIDENCE ENGINE
may access raw proprietary / tenant-scoped evidence
        ↓
derived, non-reconstructive evidence signals
        ↓
SELECTED TCJ JUDGE RUNTIME
Local Judge OR BYOK Judge
        ↓
TCJ guards + challenge + independent-dimension resolver
        ↓
ACCEPT / REVISE / ESCALATE
        ↓
buyer writer receives only final decision / targeted revision instruction
        ↓
writer rewrites at current inference if required
        ↓
TCJ rechecks
```

Roles are therefore distinct:

```text
Voice Profile
= what good means

Private Evidence Engine
= what proprietary/native evidence supports the distinction

Selected Judge Runtime
= semantic reasoning over the current candidate + profile contract + derived signals

TCJ Core
= orchestration, guards, challenge, resolution, qualification and audit

Buyer writer
= replaceable generation/revision engine
```

The same underlying model may technically be used in both writer and judge roles, but TCJ SHALL treat those roles as separate runtime functions with separate prompts/contracts, provenance and qualification status.

---

## 3. Hard evidence-isolation invariant

The selected judge runtime — Local or BYOK — SHALL NOT require direct access to the proprietary TCJ development corpus.

The commercial runtime default is:

```text
raw Batch 1 / 2 / 3 / 4+ evidence
native-human review rows
before→after pairs
Qualification banks
Assurance holdouts
internal anchors
provider-response research ledgers
        ↓
PRIVATE TCJ EVIDENCE ENGINE ONLY
        ↓
derived/non-reconstructive signals
        ↓
judge runtime
```

The judge may receive:

- current scenario/input as required;
- current candidate response;
- selected Voice Profile contract/instructions;
- TCJ-derived risk-family labels;
- derived contrast/support scores;
- hierarchy/register/code-switch/composition risk signals;
- challenge dimensions;
- uncertainty/confidence metadata permitted by the evaluator contract.

The judge SHALL NOT receive by default:

- raw Batch rows;
- nearest proprietary examples;
- verbatim internal anchors;
- raw human-review records;
- hidden Qualification cases;
- raw Assurance evidence;
- an internal corpus search/retrieval tool;
- a prompt-inspection path that can reveal the corpus.

This rule applies even when the buyer supplies the judge model or API key.

For commercial product safety, raw-proprietary-evidence access by a semantic model is treated as an explicit research-only exception requiring a separate evidence policy; it is not the default commercial architecture.

---

## 4. Voice Profile relationship to the evidence layer

A Voice Profile remains a non-model, versioned quality/voice contract.

It may contain or reference:

```text
profile_id
profile_version
register policy
lexical policy
Thai-English code-switch policy
stance policy
omission / implication policy
composition / line-break policy
particle / hierarchy policy
humor / deadpan / camp policy
failure-family policy
revision policy
thresholds
retrieval-policy version
evidence-namespace reference
evaluator compatibility metadata
```

The Voice Profile SHALL NOT expose the proprietary evidence namespace itself.

A licensed profile may therefore improve over time as the private evidence layer grows without requiring the buyer or the buyer's judge to receive the underlying corpus.

---

## 5. Internal TCJ batches remain R&D assets

Batch 1, Batch 2, Batch 3, Batch 4 and future internal research batches remain proprietary, non-deliverable development assets by default.

They may be used, subject to provenance/rights rules, to improve:

- TCJ Core algorithms;
- Private Evidence Engine retrieval and derived-signal logic;
- failure taxonomies;
- deterministic guards;
- challenge policies;
- resolver logic;
- non-model Voice Profiles;
- evaluator calibration and regression methodology;
- future Qualification / Assurance design.

The commercial buyer licenses the resulting capability, not access to the private batch corpus.

The buyer's selected judge does not acquire corpus access merely because it participates in runtime evaluation.

---

## 6. Connected is not qualified

Technical connectivity SHALL be distinguished from semantic authority.

```text
CONNECTED
= TCJ can call the judge endpoint successfully

COMPATIBLE
= endpoint passes transport/format/Thai/JSON/latency requirements

QUALIFIED
= the complete frozen TCJ evaluator configuration passes the required hidden native-human-grounded qualification gates
```

A buyer may connect a model that is technically compatible but not qualified for production semantic authority.

Production authority belongs to the complete configuration, not the model name alone.

A future Passport should bind at minimum:

```text
TCJ Core version
Voice Profile version
Private Evidence Engine / derived-signal version
judge runtime type: local | byok
judge provider/model/snapshot
adapter version
risk/challenge policy
independent-dimension resolver
revision policy
exact configuration hash
```

Changing the judge model/version may trigger the applicable requalification/regression policy.

---

## 7. Local Judge commercial mode

Local Judge is the preferred mode for buyers requiring provider independence, VPC isolation or full on-prem operation.

Example:

```text
Bank proprietary model / vLLM endpoint
        ↓
TCJ Local Judge adapter
        ↓
current candidate + Voice Profile + derived signals
        ↓
structured semantic diagnosis
```

No external AI provider is required for the judge call.

The buyer bears the infrastructure/compute cost of the local model unless a managed commercial agreement states otherwise.

TCJ must not claim that every self-hosted model is good enough to judge. It becomes authoritative only if the full evaluator configuration passes the applicable Qualification/Assurance gates.

---

## 8. BYOK Judge commercial mode

A buyer may instead supply its own API credential for a supported external provider/model.

Example:

```text
TCJ
→ buyer-owned OpenAI/xAI/other supported API credential
→ provider judge
→ structured diagnosis
```

Default commercial billing posture:

```text
Buyer pays TCJ:
- TCJ runtime/license
- Voice Profile license(s)
- optional Voice Profile Improvement Service
- optional support/Qualification/Assurance services

Buyer pays model provider directly:
- API token/compute usage for BYOK Judge
```

TCJ therefore does not need to resell provider tokens as the default enterprise model.

A managed bundled-usage tier may be offered later if commercially justified, but it is not the required architecture.

Provider credentials must be stored and handled according to the deployment's secrets policy and SHALL never be committed into TCJ source code or images.

---

## 9. OpenAI Sol reference-judge strategy

OpenAI's latest approved Sol-class model may be used as a **recommended/reference BYOK judge candidate** after the external-API release gate is opened.

The exact OpenAI API model identifier/version must be resolved and frozen at integration/qualification time rather than assumed permanently from a conversational product name.

The reference role means:

- TCJ may provide an optimized supported OpenAI adapter;
- the Sol configuration can be used as a benchmark/reference evaluator;
- the buyer may supply its own OpenAI API credential;
- the buyer pays OpenAI API usage directly under BYOK by default.

It does **not** mean:

- OpenAI is mandatory for TCJ;
- the OpenAI model receives proprietary TCJ Batch rows;
- a buyer must use OpenAI if its own Local Judge or another BYOK Judge qualifies;
- Sol obtains production authority merely because it is a frontier model.

The complete Sol-backed TCJ evaluator configuration must still pass fresh hidden Qualification and subsequent release gates.

---

## 10. External API release gate

The existing methodological gate remains unchanged.

Do not activate production OpenAI/xAI or other new external judge adapters until:

```text
current TCJ evaluator research converges
→ evaluator configuration freeze
→ fresh hidden Qualification PASS
→ qualified Panel / required disagreement layer PASS
→ independent Assurance PASS
→ reproducibility / clean-install acceptance PASS
→ final TCJ architecture/runtime freeze
```

After the freeze, OpenAI Sol and xAI may be integrated first as reference/supported BYOK adapters, followed by other providers as justified.

The adapters must not change the canonical Voice Profile semantics merely to make one provider pass.

---

## 11. Buyer-specific Voice Profile and private evidence mode

A buyer may develop its own Voice Profile from buyer-authorized resources while preserving the same isolation model.

```text
buyer-owned chats / edits / guidelines / accepted-rejected outputs
        ↓
buyer-private Evidence Engine
        ↓
buyer Voice Profile + derived signals
        ↓
selected Local or BYOK Judge
        ↓
TCJ final diagnosis
```

For private/VPC/on-prem buyers, raw buyer evidence can remain inside the buyer's environment.

A BYOK Judge still need not receive the raw buyer corpus; only the derived runtime signals and profile contract required for the current judgment need to leave the private Evidence Engine.

Permission to improve one buyer's profile does not imply permission for cross-customer reuse.

---

## 12. Legal / provenance posture

This architecture is designed to keep runtime evaluation separate from model training.

A judge model consuming current inference-time TCJ signals is not automatically being trained or fine-tuned.

Internal provider-derived evidence may remain useful for non-model TCJ/Voice Profile development and private runtime evidence analysis subject to its provenance/rights rules, without being fed into competing-model weight training.

If TCJ later trains/fine-tunes a judge, the training corpus must have an explicit `model_training_eligible` basis. BYOJ does not change that requirement.

This architecture is legally/contractually cleaner because proprietary evidence remains private and runtime inference is separated from model development, but it is not a blanket warranty that every provider, source record or commercial transaction is unrestricted. Provider terms and transaction-specific rights remain controlling.

---

## 13. Correct commercial vocabulary

Approved terminology:

```text
BYOJ             Bring Your Own Judge — umbrella
Local Judge      buyer/self-hosted/private judge endpoint
BYOK Judge       external provider judge using buyer-supplied credential
Writer Model     buyer's generation/revision engine
Voice Profile    non-model versioned quality/voice contract
Evidence Engine  private TCJ evidence/retrieval/derived-signal layer
```

Avoid:

```text
calling an OpenAI/xAI cloud API judge "local"
claiming any connected model is automatically qualified
claiming TCJ requires OpenAI
claiming the buyer/API judge can retrieve the proprietary corpus
claiming BYOK means literally every provider/model is supported without an adapter
```

---

## 14. Governing commercial statement

Preferred concise statement:

> **Bring your writer. Bring your judge or your API key. TCJ keeps the proprietary Thai evidence private, gives the selected judge only the signals needed for the current evaluation, and qualifies the complete evaluator configuration before granting production authority.**

Alternative short buyer-facing statement:

> **Your model writes. Your chosen judge reasons. TCJ supplies the private Thai quality intelligence and keeps the underlying corpus out of both models' reach.**

For private customers:

> **Run your own Local Judge inside your environment, or use a supported BYOK provider. Your evidence can remain private and the raw TCJ development corpus is never required by the judge.**

---

## 15. Supersession rule

This document supersedes earlier TCJ wording only where that wording conflicts with the judge-runtime definitions above.

In particular:

- references that imply the final semantic judge must always be TCJ-owned/local are superseded;
- references that call an external API model a `Local Judge` are superseded;
- references that imply a buyer-connected judge must receive raw proprietary anchors/evidence are superseded;
- the Private Evidence Engine corpus-isolation rules remain fully in force and are tightened here so the commercial judge interface is derived-signal-first;
- the Voice Profile remains a non-model quality contract;
- the current OpenAI/xAI release gate remains in force;
- frozen Qualification history, native-human gold and thresholds remain unchanged.

This policy governs TCJ judge-runtime terminology and BYOJ/BYOK integration until expressly superseded by a newer applied policy.
