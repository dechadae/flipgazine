# TCJ — Roadmap to Final Commercial Product

**Date:** 23 August 2026  
**Status:** GOVERNING EXECUTION ROADMAP  
**Scope:** path from the current Gemini-selected Architecture v2.1 research state to a qualified, deployable, plug-and-play commercial TCJ product  
**Canonical repository:** `dechadae/flipgazine`  
**Canonical Supabase project:** `sjpvhgxacsiorrtijqua`

---

## 1. Purpose

This document defines the execution sequence from the current Thai Conversation Judge (TCJ) research state to the final commercial product.

It is an execution roadmap, not a replacement for the governing Architecture v2.1 topology. Where this document conflicts with the mandatory-Protected-Evidence architecture amendment, the architecture amendment wins.

The central sequencing rule is:

```text
Gemini-centered TCJ refinement
→ fresh development validation
→ candidate runtime freeze
→ new closed native-human authority qualification
→ one final paid OpenAI/xAI causal frontier experiment
→ authority decision
→ product hardening
→ private-server / BYOJ-BYOK / customer-adaptation productization
→ commercial release
```

Do not spend paid frontier-model credits while TCJ is still being tuned.

---

## 2. Current starting state

### 2.1 Architecture

Current governing topology is Architecture v2.1 with mandatory protected evidence:

```text
BUYER WRITER
→ TCJ GATEWAY
→ VOICE PROFILE
→ LOCAL CONTEXT RETRIEVER
→ RELEVANT METHODOLOGY PACK
→ PROTECTED-EVIDENCE PLANNER
→ MANDATORY BOUNDED PRIVATE EVIDENCE ASSESSMENT
→ BYOJ/BYOK SEMANTIC JUDGE
↔ OPTIONAL ONE ADDITIONAL TARGETED PEE CALL
→ SIX-DIMENSION DIAGNOSIS
→ INDEPENDENT RELEASE POLICY
→ ACCEPT / REVISE / ESCALATE
```

Invariants:

- minimum one protected-evidence call per evaluation;
- maximum two protected-evidence calls total;
- raw private corpus rows never leave the protected server boundary;
- external judges receive bounded, non-reconstructive derived evidence only;
- raw human edit pairs, hidden qualification cases, row IDs, arbitrary SQL and nearest proprietary examples are prohibited from judge exposure;
- Release Policy remains independent from semantic score calibration;
- BYOJ/BYOK portability remains a product requirement.

### 2.2 Selected development reference judge

The free-model finalist experiment is closed for selection purposes.

Selected candidate:

```text
Gemini 3.5 Flash-Lite
run 8
48 complete / 0 terminal
full-bank MAE 0.6875
serious false ACCEPT 2 / 17 human-serious cases
PASS false block 4 / 21 human-PASS cases
```

Stopped/preserved comparison runs:

```text
Qwen 3.6 27B       run 7   stopped
GPT-OSS 20B        run 9   stopped
Ox Alpha           excluded / stopped
```

Gemini is the **development reference judge**, not yet production authority.

### 2.3 Critical refinement finding

The most important current failure is not merely model prompting.

Gemini's two serious false ACCEPT cases received protected evidence that was itself overly reassuring. Structural-completeness evidence in particular failed to identify a clearly incomplete/dangling construction.

Therefore refinement must target the full causal chain:

```text
Protected Evidence detector quality
→ evidence-family routing
→ evidence presentation
→ Gemini interpretation/calibration
→ six-dimension diagnosis
→ Release Policy containment
```

Priority areas:

1. `linebreak_and_structural_completeness`;
2. false-reassurance detection;
3. evidence-family routing;
4. BFF voice calibration;
5. stance proportionality;
6. composition;
7. Thai-pragmatics edge cases;
8. global over-positive judge containment;
9. Release Policy safety backstop.

---

## 3. Fixed paid frontier-model budget

The user has explicitly decided there will be **no additional top-up**.

Current available balances supplied by the user on 23 August 2026:

```text
OpenAI API credit remaining:  USD 1.82
xAI API credit remaining:     USD 3.42
------------------------------------
Total remaining paid research budget: USD 5.24
```

These balances are to be treated as a hard lifetime research budget for the final TCJ authority experiment.

Rules:

- no OpenAI or xAI paid development calls during Gemini refinement;
- no silent overage or account-billing fallback;
- no paid call before an explicit final user approval immediately before dispatch;
- re-check live model prices, balances, token estimates and exact request count immediately before dispatch;
- preserve exact usage and cost per request;
- stop when remaining credit cannot safely fund another high-information request;
- use leftover paid budget only for the highest-information post-primary diagnostics, not random extra sampling.

The intended final frontier models are the then-current approved OpenAI and xAI reference models. As of this roadmap, the working targets are GPT-5.6 Sol and Grok 4.6, but exact model identifiers and prices must be reverified immediately before paid dispatch.

---

# PHASE A — Close and archive finalist research

## A1. Goal

Make the free-model selection evidence immutable enough that later refinement cannot accidentally reinterpret or overwrite the selection experiment.

## A2. Actions

- preserve Gemini/Qwen/GPT-OSS/Ox run records;
- preserve provider responses, rate-limit events, terminal failures, PEE packets, hashes and manifests;
- preserve the common-case and pairwise finalist comparison metrics;
- classify protocol failures separately from semantic failures;
- keep Qwen/GPT-OSS stopped unless the user explicitly reopens that experiment;
- do not use Qualification 2.0 for further tuning.

## A3. Exit gate

Phase A is complete when canonical documentation unambiguously says:

- Gemini 3.5 Flash-Lite is the selected development reference judge;
- stopped finalist runs are historical comparison evidence;
- no production authority has been granted.

**Current state:** effectively complete.

---

# PHASE B — Gemini-centered TCJ refinement

## B1. Goal

Make Architecture v2.1 as accurate, safe and operationally reliable as possible using free development resources before exposing any new hidden authority bank.

## B2. Development evidence

Use only already-exposed/development evidence and newly created development-only material.

Allowed:

- exposed 48-case v3 bank;
- existing human gold for exposed development cases;
- frozen provider responses already created during development;
- free Gemini calls;
- deterministic synthetic perturbations clearly labelled as development data;
- new development-only native-human-reviewed cases.

Forbidden:

- Qualification 2.0 exposure to development models;
- future hidden authority cases;
- paid OpenAI/xAI calls.

## B3. Workstreams

### B3.1 Protected Evidence quality

Audit every evidence family for:

- false reassurance;
- false alarms;
- incorrect confidence;
- failure to distinguish structural vs stylistic variation;
- hidden dependence on superficial fluency;
- relationship/hierarchy blindness;
- failure to distinguish unconventional-but-native Thai from actual failure.

Priority work:

- rebuild/strengthen structural-completeness detection;
- detect dangling/incomplete constructions;
- detect when a bounded evidence assessment is uncertain rather than reassuring;
- add explicit negative evidence / uncertainty signaling where warranted;
- make evidence-family routing sensitive to the actual risk pattern rather than generic similarity.

### B3.2 Evidence planner

Refine which evidence families are selected and how they are prioritized.

Requirements:

- deterministic for identical frozen inputs/config;
- bounded to allowlisted families;
- no raw-row leakage;
- always one mandatory initial packet;
- optional second call only when materially justified;
- preserve planner decisions and hashes.

### B3.3 Gemini judge adapter

Optimize Gemini-specific interpretation without changing the portable TCJ semantics.

Possible improvements:

- evidence ordering;
- explicit instruction that PEE is evidence, not a verdict;
- counterweight against over-positive fluent-answer bias;
- dimension-separation reminders;
- stricter treatment of high-stakes stance failures;
- clearer BFF-voice calibration;
- explicit structural incompleteness handling;
- confidence/escalation calibration;
- strict schema reliability.

Model-specific behavior should remain in adapter/configuration/evidence-presentation layers where possible.

### B3.4 Release Policy containment

Test whether independent Release Policy can catch cases where the semantic judge remains overly positive.

Refine only from development evidence.

Target properties:

- serious human-risk cases should almost never become false ACCEPT;
- clear human-PASS cases should not be unnecessarily blocked;
- Release Policy should be explainable and deterministic;
- semantic score calibration and release-safety logic remain separate.

### B3.5 Regression harness

Every consequential refinement must be run through a deterministic regression harness measuring at least:

- six-dimension MAE;
- per-dimension MAE;
- >=2-point error cells;
- cases with >=2-point errors;
- serious false ACCEPT;
- human-PASS false block;
- Release Policy rescues;
- Release Policy mistakes;
- evidence-family usage;
- optional second-PEE frequency;
- schema/protocol completion;
- latency/token footprint.

Never weaken a frozen development threshold merely because a model fails it.

## B4. Exit gate

Stop refining the exposed bank when additional changes produce no meaningful, generalizable improvement or begin trading one failure class for another.

Do **not** declare success from the exposed 48 alone.

---

# PHASE C — Fresh development validation bank

## C1. Goal

Prove that Phase B improvements generalize beyond the exposed development bank before freezing the candidate runtime.

## C2. Size

Target approximately:

```text
24–32 unique fresh development cases
```

Exact size may vary based on failure-mode coverage.

## C3. Case design

Prioritize cases that stress discoveries from Phase B:

- structural completeness;
- dangling/unfinished Thai;
- BFF voice;
- hierarchy and relationship license;
- event valence;
- code-switch integration;
- unconventional-but-native wording;
- polished-but-socially-wrong responses;
- factual vs social intent;
- stance proportionality;
- controlled line-break changes;
- near-identical cases where only one dimension should move.

## C4. Human gate

The user reviews the fresh development cases as native-human gold.

This is a genuine human gate and cannot be automated away.

## C5. Validation rule

Run the refined Gemini-centered TCJ against the fresh development set.

If the improvement does not generalize:

```text
return to Phase B
```

If it does generalize:

```text
advance to Phase D
```

Do not use the future hidden authority bank to repair a failure here.

---

# PHASE D — Candidate final runtime freeze

## D1. Goal

Freeze the exact TCJ configuration that will face the independent hidden authority test.

## D2. Freeze contents

Freeze/hash at minimum:

- Methodology Pack;
- Context Retriever;
- Voice Profile contract;
- Protected Evidence Planner;
- each protected-evidence detector/family implementation;
- evidence presentation contract;
- Gemini reference adapter;
- six-dimension diagnosis schema;
- confidence/severity contract;
- independent Release Policy;
- runtime wiring/configuration;
- provider settings;
- deterministic regression manifest.

## D3. Immutability rule

Once the hidden authority bank begins human freeze or model exposure, the candidate runtime must not be silently modified and retested against the same hidden bank.

If a material authority failure later requires redesign, that release remains a failed qualification attempt and a new authority instrument is required for a materially changed successor.

---

# PHASE E — New closed native-human authority qualification

## E1. Goal

Construct an authority instrument that has never influenced development and is valid for the frozen mandatory-PEE successor.

Qualification 2.0 remains protected historical evidence but does **not** certify the successor topology.

## E2. Proposed size

Current planning target:

```text
32 unique hidden cases
+ 4 concealed consistency / reversal checks
≈ 36 total judgment presentations per condition/model
```

This is a planning target, not yet a frozen count. Final composition is chosen only after Phase C/D reveal the final failure surface.

## E3. Coverage

The hidden authority instrument should include:

- Thai conversational intent;
- pragmatics;
- relationship distance;
- hierarchy/license;
- BFF voice;
- lexical/social fit;
- code switching;
- event valence;
- stance proportionality;
- composition;
- line-break and structural completeness;
- unconventional-but-native constructions;
- fluent-but-socially-wrong traps;
- dimension-isolation cases;
- controlled context flips;
- concealed reversed/consistency repeats;
- release-safety cases.

## E4. Human gate

The user reviews the hidden cases **before any development or frontier model sees them**.

Native-human ratings are frozen and authoritative.

AI outputs must not bias the human review interface.

## E5. Freeze artifacts

Persist:

- case bank manifest;
- human-review manifest;
- threshold manifest;
- presentation/repeat map;
- hashes;
- timestamps;
- immutable review evidence.

---

# PHASE F — Final paid frontier causal experiment

## F1. Goal

Use the fixed remaining OpenAI/xAI balances to measure not only frontier-model quality, but **TCJ's causal contribution**.

This is more valuable than a simple leaderboard.

## F2. Primary three-condition design

For each unique hidden case, test:

### Condition A — frontier model alone

Receives:

- scenario;
- candidate;
- neutral six-dimension schema.

Purpose:

> How good is the frontier model without TCJ?

### Condition B — TCJ methodology/context only

Receives:

- scenario;
- candidate;
- relevant Methodology Pack;
- Voice Profile;
- Context Retriever output;
- no private PEE packet.

Purpose:

> How much value comes from TCJ's explicit methodology/context layer?

### Condition C — full TCJ

Receives:

- all Condition B context;
- mandatory bounded Protected Evidence packet;
- optional one targeted second PEE call only if supported and materially justified;
- independent Release Policy after diagnosis.

Purpose:

> How much additional value comes from TCJ's proprietary protected evidence and release architecture?

## F3. Models

Primary frontier comparison:

- selected Gemini reference judge — same frozen hidden bank, free path where available;
- approved OpenAI frontier model;
- approved xAI frontier model.

OpenAI/xAI calls are paid and require explicit approval immediately before dispatch.

## F4. Cost strategy

### OpenAI

Current available balance: **USD 1.82**.

Use the cheapest eligible API mode that preserves the frozen test contract. Batch processing is preferred if still supported and materially cheaper at dispatch time.

Primary budget priority:

1. complete the most informative balanced A/B/C hidden comparison possible;
2. preserve sufficient reserve for a small number of post-primary forensic calls;
3. never intentionally exceed the remaining account balance.

### xAI

Current available balance: **USD 3.42**.

Because xAI historically provides useful exact per-request cost telemetry and the balance is larger, use xAI for broader post-primary diagnostics after the common A/B/C core is complete.

## F5. Primary metrics

For each model and condition:

- six-dimension MAE;
- per-dimension MAE;
- >=2-point errors;
- serious false ACCEPT;
- human-PASS false block;
- release decisions;
- Release Policy rescues/mistakes;
- repeat consistency;
- evidence-family usage;
- optional second-PEE usage;
- schema/protocol reliability;
- latency;
- input/output/reasoning tokens;
- exact/estimated USD cost.

Critical derived comparisons:

```text
A → B = methodology/context contribution
B → C = protected-evidence contribution
A → C = total TCJ contribution
```

This enables a defensible commercial claim about what TCJ itself adds to a frontier model.

## F6. Primary-score freeze

Primary A/B/C scores are frozen before any forensic diagnostic follow-ups.

Do not improve TCJ and retroactively rewrite the primary authority result.

---

# PHASE G — Spend remaining frontier credits on highest-information diagnostics

## G1. Goal

Use any remaining paid balance for maximum research value rather than random extra cases.

## G2. Priority order

Spend remaining credit only on cases exhibiting one or more of:

1. serious false ACCEPT;
2. frontier-vs-human disagreement;
3. Gemini-vs-OpenAI-vs-xAI disagreement;
4. methodology helps but PEE hurts;
5. PEE rescues baseline failure;
6. full TCJ performs worse than model-alone;
7. Release Policy rescues a judge failure;
8. Release Policy incorrectly blocks a good answer;
9. unstable repeat judgments;
10. high-confidence wrong diagnosis.

## G3. xAI-specific diagnostic opportunities

If balance allows:

- reasoning-effort sensitivity on hardest cases;
- second-PEE recovery study;
- metamorphic robustness;
- repeated-judgment stability;
- context/hierarchy/line-break perturbation studies.

## G4. OpenAI-specific diagnostic opportunities

Because the OpenAI balance is smaller, prioritize only the most decision-relevant disagreements and serious failures after the primary test.

## G5. Stop rule

Stop automatically when the remaining balance cannot safely fund another high-information request.

Do not top up.

---

# PHASE H — Authority decision

## H1. Goal

Determine whether the frozen TCJ successor is qualified for commercial reference use.

## H2. Decision evidence

Use:

- frozen native-human hidden gold;
- Gemini hidden result;
- OpenAI A/B/C result;
- xAI A/B/C result;
- consistency checks;
- cost/latency/protocol evidence;
- frozen thresholds established before model exposure.

## H3. Possible outcomes

### Qualified

TCJ becomes the qualified reference release.

### Qualified with explicit limitations

Release allowed with documented limitations and possibly stronger ESCALATE policy for known weak regions.

### Failed authority qualification

Do not weaken the test.

Preserve the failure and redesign a successor. A materially changed successor requires a new hidden authority instrument.

---

# PHASE I — Plug-and-play commercial API product

## I1. Product goal

A buyer should not need to understand TCJ's research internals.

Basic use should be:

```text
submit scenario + candidate + optional context
→ receive structured TCJ judgment
```

## I2. Public response contract

Return at minimum:

- six-dimension scores/diagnosis;
- severity;
- flags;
- confidence;
- ACCEPT / REVISE / ESCALATE;
- bounded explanation;
- request/evaluation ID;
- runtime/version identifiers.

Never return:

- raw private corpus rows;
- nearest proprietary examples;
- internal SQL;
- hidden qualification data;
- raw human edit pairs.

## I3. Product interfaces

Deliver:

- REST API;
- batch API;
- simple SDK/examples;
- health/status endpoint;
- request tracing;
- audit history;
- provider adapter registry;
- usage/cost accounting;
- error taxonomy;
- retry/idempotency behavior.

---

# PHASE J — Private-server / enterprise edition

## J1. Goal

Allow banks, labs and enterprises to run TCJ with proprietary resources without exposing raw data to external judge providers.

## J2. Deployment properties

Support:

- private cloud / VPC / customer server deployment;
- containerized services;
- local Context Retriever;
- local Protected Evidence Engine;
- buyer-managed secrets;
- optional restricted/no-public-egress mode;
- internal-model endpoint adapters;
- logs/audit retention;
- backup/restore;
- version pinning;
- controlled upgrades/rollback.

## J3. BYOJ/BYOK

The buyer may use:

- Gemini;
- OpenAI;
- xAI;
- an internal LLM;
- another supported semantic judge.

TCJ remains the evaluator architecture; the judge is replaceable.

Gemini is the qualified/default reference candidate, not a permanent architectural dependency.

---

# PHASE K — Customer-specific Voice Profile and controlled quality improvement

## K1. Goal

Let private-server customers improve TCJ using their own approved resources.

## K2. Customer resources

Possible inputs:

- approved conversations;
- style guides;
- terminology;
- human corrections;
- domain-specific response examples;
- organization-specific policy/context;
- native-human evaluation outcomes.

## K3. Adaptation outputs

TCJ may build/version:

- customer Voice Profile;
- local retrieval index;
- customer-specific evidence-family calibration;
- domain/risk routing;
- judge adapter calibration;
- organization-specific Release Policy extensions where contractually allowed.

## K4. Governance rule

Do **not** default to uncontrolled autonomous self-training.

The improvement loop must be:

```text
observe failure
→ propose measurable configuration/evidence/profile change
→ validate against customer-local held-out gold
→ compare regressions
→ human/operator approval if required
→ versioned promotion
→ rollback available
```

Every promoted improvement must be auditable and reversible.

---

# PHASE L — Operator / control plane

## L1. Goal

Make TCJ operable by a buyer's AI/evaluation team without SQL or research-document knowledge.

## L2. Control-plane capabilities

Include:

- active TCJ runtime/version;
- judge/provider configuration;
- BYOK secret status;
- Voice Profile management;
- evidence-engine health;
- evaluation history;
- quality trends;
- failure clusters;
- false-accept/false-block monitoring where gold is available;
- model comparison;
- cost/usage monitoring;
- tenant/project isolation;
- version promotion;
- rollback;
- exportable audit report.

---

# PHASE M — Production hardening and security qualification

## M1. Security test pack

Test at minimum:

- tenant isolation;
- RLS/security-definer boundaries;
- secret leakage;
- prompt injection;
- raw-evidence exfiltration;
- evidence reconstruction attempts;
- row-ID leakage;
- hidden-qualification leakage;
- replay/idempotency;
- concurrency;
- rate limiting;
- provider failure;
- malformed judge output;
- tool misuse;
- fail-closed Release Policy behavior;
- audit-log integrity.

## M2. Evidence isolation acceptance rule

The product must demonstrate that external judges cannot obtain raw internal private evidence, arbitrary corpus search, nearest proprietary examples or hidden authority data.

---

# PHASE N — Commercial packaging and data room

## N1. Buyer package

Prepare:

- architecture overview;
- methodology overview;
- frozen runtime/version manifest;
- native-human qualification report;
- frontier A/B/C causal-value study;
- model portability/BYOJ-BYOK policy;
- private-server deployment guide;
- customer adaptation policy;
- security/isolation design;
- API documentation;
- benchmark methodology;
- limitations;
- licensing/right/provenance documents;
- buyer-facing demo;
- reproducible evidence references.

## N2. Claims rule

Every commercial claim must map to immutable evidence.

Do not market a result more strongly than the authority evidence permits.

---

# PHASE O — Final commercial release criteria

TCJ is commercially complete only when all of the following exist:

- qualified frozen TCJ runtime;
- Gemini reference judge configuration;
- independent frontier-model authority evidence;
- causal model-alone vs methodology vs full-TCJ evidence;
- mandatory Protected Evidence architecture;
- six-dimension diagnosis;
- independent Release Policy;
- plug-and-play API;
- batch interface;
- BYOJ/BYOK;
- private-server deployment;
- customer-specific Voice Profiles;
- customer-local protected evidence/retrieval;
- controlled quality-improvement loop;
- operator/control plane;
- auditability;
- production security test pack;
- versioning/rollback;
- benchmark/qualification report;
- complete commercial/licensing documentation;
- buyer-ready data room/demo.

---

## 4. Human gates

The system should automate everything else and stop only at genuine human gates.

Expected user involvement:

### Human Gate 1 — fresh development validation

Review approximately 24–32 fresh development cases.

### Human Gate 2 — final closed authority bank

Review/freeze approximately 32 unique hidden cases plus concealed consistency checks.

### Human Gate 3 — paid frontier dispatch approval

Immediately before paid OpenAI/xAI inference, review the exact:

- models;
- prices;
- case count;
- conditions;
- projected spend;
- remaining balances;
- hard stop behavior.

Explicit approval is required.

Everything else should be automated where technically deterministic.

---

## 5. Indicative schedule

Estimated technical execution after current state:

```text
Focused technical work: approximately 5–8 working days
```

This is not a calendar guarantee. The critical path is primarily native-human review availability, not coding time.

Indicative sequence:

```text
Day 1–2   Gemini-centered PEE/judge/release refinement
Day 2–3   regression + fresh development bank construction
Human     development-bank native review
Day 3–4   fresh validation + final tuning + candidate freeze
Day 4     hidden authority-bank construction/interface
Human     hidden native review/freeze
Day 5     paid frontier preflight + user approval + A/B/C dispatch
Day 5–6   authority scoring + targeted remaining-credit diagnostics
Day 6–8   API/private-server/control-plane/security/commercial packaging
```

Product-hardening work can overlap where it cannot contaminate the research freeze.

---

## 6. Immediate next action

Begin **Phase B — Gemini-centered TCJ refinement** using exposed development evidence only.

First priority:

```text
1. audit Gemini's two serious false ACCEPTs end-to-end;
2. repair structural-completeness / false-reassurance evidence;
3. test evidence-family routing;
4. calibrate Gemini evidence consumption;
5. strengthen Release Policy containment;
6. rerun full exposed-bank regression;
7. only then build the fresh development-validation bank.
```

Do not spend OpenAI/xAI credit during this phase.

---

## 7. Authority relationship

This roadmap should be read together with:

1. `ANSWERS-TCJ-MANDATORY-PROTECTED-EVIDENCE-ARCHITECTURE-AMENDMENT-20260823.md`
2. `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-V2-20260823.md`
3. `ANSWERS-TCJ-METHODOLOGY-PACK-AND-CONTEXT-RETRIEVER-SPEC-20260823.md`
4. `ANSWERS-TCJ-FREE-MODEL-FINALIST-SELECTION-20260823.md`
5. `DOCUMENT-AUTHORITY-MAP.md`
6. `CURRENT-STATE.json`

If an older document says to continue Qwen/GPT-OSS finalist testing, use optional PEE, or use Qualification 2.0 as the successor's final authority test, that instruction is superseded.
