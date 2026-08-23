# ChatGPT Workflow — Flipgazine / The Book of Answers

**Purpose:** canonical human-readable entry point for continuing the Answers / TCJ project across sessions.

Before consequential work, inspect canonical Supabase project `sjpvhgxacsiorrtijqua` and current GitHub state. Do not execute stale next-action text from historical documents.

`CURRENT-STATE.json` is the compact machine-readable checkpoint. `DOCUMENT-AUTHORITY-MAP.md` classifies current authorities and supersession rules.

---

## Current TCJ authorities — read first

1. `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-V2-20260823.md` — **current final commercial architecture.** The judge receives a compiled TCJ Methodology Pack through a local Context Retriever; the raw corpus remains behind the Private Evidence Engine; six-dimensional diagnosis and production Release Policy are separate; BYOJ/BYOK remains first-class.
2. `ANSWERS-TCJ-METHODOLOGY-PACK-AND-CONTEXT-RETRIEVER-SPEC-20260823.md` — governing Methodology Pack / retrieval spec. GitHub is a development source, not a runtime dependency.
3. `ANSWERS-TCJ-METHODOLOGY-BFF-V1-COMPILED-20260823.md` — current compiled `TCJ-METHODOLOGY-BFF-v1` artifact and module/component hashes.
4. `ANSWERS-TCJ-FINAL-PRODUCT-IMPLEMENTATION-AND-QUALIFICATION-PLAN-V2-20260823.md` — governing final-product execution plan. No paid external model calls during ordinary development; one final paid authority run only after full freeze and explicit user approval.
5. `ANSWERS-TCJ-ARCHITECTURE-V2-OFFLINE-COMPONENTS-AND-CONTRASTIVE-HUMAN-GATE-20260823.md` — **current execution checkpoint.** Offline Phases B–E are ready; the current gate is 30 A/B/Tie native-human comparisons.
6. `ANSWERS-TCJ-V17-QUALIFICATION-FAILURE-AND-CONTEXT-ENGINE-PIVOT-20260823.md` — preserved v1.7 fresh-Qualification failure and architecture pivot evidence.
7. `ANSWERS-TCJ-PRIVATE-EVIDENCE-ENGINE-AND-BUYER-ISOLATION-POLICY-20260822.md` — raw-corpus and buyer-evidence isolation authority.
8. `ANSWERS-TCJ-SOL-PRIVATE-EVIDENCE-TOOL-AND-COMMERCIAL-LICENSING-CLARIFICATION-20260822.md` — narrow judge-initiated private-evidence capability; no SQL/arbitrary corpus search/raw rows.
9. `ANSWERS-TCJ-BYOJ-JUDGE-RUNTIME-AND-API-KEY-POLICY-20260822.md` — Local Judge / BYOK Judge / BYOJ and buyer-owned key policy.
10. `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md` — commercial-use/provenance authority.
11. `ANSWERS-THAI-CONVERSATION-JUDGE-ARCHITECTURE.md` and `ANSWERS-VOICE-TONE.md` — legacy method/editorial source material where not superseded; important inputs to Methodology Pack compilation.

The 22 Aug final architecture freeze and execution plan remain historical design evidence but are superseded for current topology/execution where they conflict with Architecture v2.

---

## Current product definition

TCJ is intended to be:

> **a portable Thai conversational methodology + protected native-human evidence system + replaceable semantic judge + deterministic release authority.**

It is not intended to become an ever-growing pile of regex guards around a model.

```text
BUYER WRITER
→ TCJ GATEWAY
→ VOICE PROFILE
→ LOCAL TCJ CONTEXT RETRIEVER
→ RELEVANT TCJ METHODOLOGY PACK MODULES
→ SELECTED BYOJ JUDGE
↔ OPTIONAL NARROW PRIVATE EVIDENCE TOOL
→ TCJ DIMENSION DIAGNOSIS
→ INDEPENDENT RELEASE POLICY
→ ACCEPT / REVISE / ESCALATE
→ ONE TARGETED WRITER REVISION IF REQUIRED
→ RECHECK
→ FINAL OUTPUT
```

```text
Methodology Pack = how TCJ reasons about Thai conversational quality
Context Retriever = which TCJ concepts matter for this request
Voice Profile = what good means for this buyer/domain/voice
Private Evidence Engine = protected native-human empirical memory
Judge = replaceable semantic reasoner
Release Policy = may this output ship?
```

---

## Architecture-v2 components now implemented

```text
Methodology Pack
  TCJ-METHODOLOGY-BFF-v1
  13 modules M00–M12
  SHA 22ab0440b41708f41d8abe3a546b7c6197220a1824c59de56a6e86a4b7761f0a
  status research_compiled

Context Retriever
  TCJ-CONTEXT-RETRIEVER-v1.1
  SHA ce572d4ad361d563229c27da9c111647c4571af7ceab02b6940dd2eca6d693a2
  status research_active
  module cap 8
  external LLM required: no

Private Evidence Assessment
  TCJ-PRIVATE-EVIDENCE-ASSESS-v1
  SHA 9f6a93d92e79651b095803cd064d0d9c9e1414ef2db9b6c2314d1196e19a67cf
  status research_active
  max 4 allowlisted analysis families/call
  raw rows / arbitrary search / nearest examples: no

Release Policy
  TCJ-RELEASE-POLICY-v1.1
  SHA c237fcf664ee67083bc4c7c3a46645a12fbad929cf2a93c363818d9b95a75e23
  status research_active
  dimension scores do not mechanically drive release
  deterministic high-confidence false blocks on frozen human-PASS v2+v3: 0 / 49
```

Retriever v1 and Release Policy v1 are preserved as retired research evidence; they were not silently overwritten.

---

## Production does not reread GitHub

The clean-account GitHub experiment showed that a capable model can acquire much of the intended TCJ/BFF behavior by reading the project's documentation.

The production lesson is not to browse GitHub on each request. Production should do this:

```text
canonical Git/docs
→ build-time compile/review
→ TCJ-METHODOLOGY-BFF-v1
→ local Context Retriever selects only relevant modules
→ selected judge receives those modules
```

GitHub remains source control and development provenance only.

---

## Judge-visible vs private knowledge

Judge-visible:

- stable TCJ core methodology;
- relevant Methodology Pack modules;
- Voice Profile contract;
- current scenario/candidate;
- structured evaluation contract;
- bounded PEE assessment when invoked.

Private:

- raw Batch rows;
- raw human edits;
- anchor library;
- hidden test cases;
- private review notes;
- buyer-private evidence;
- arbitrary database/search access.

The Private Evidence Engine is a targeted second-stage evidence source, not the sole carrier of TCJ intelligence.

---

## Preserved failed Qualification evidence

```text
Evaluator     TCJ-EVAL-ANSWERS-BFF-SOL-v1.7-frozen-dev
Config SHA    5eb3d2354717573e1d8f48a574a960d3bea63a855409ac23932530be7bc23d07
Run           TCJ-EVALUATOR-QUALIFICATION-RUN-2026Q3-v3-SOL-v1.7
48 cases
288 primary judgments
101 challenge judgments
389 provider dispatches / responses
288 resolution cells
overall MAE .5729
extreme reversals 17
false-fluent human MAJOR/CRITICAL ACCEPT 3
terminal generation failures 0
credit incidents 0
Qualification FAILED
production authority NONE
summary SHA 52c507629205ddbb532faf57db2b9e8346ad82cfcf2e65d014231f80ddc70fd5
```

Do not modify human gold or old thresholds to make this pass. v3 is exposed development evidence only.

---

## Current human gate — Contrastive Review v1

The next required action is now native-human judgment, not more implementation and not another API call.

```text
Protocol       TCJ-CONTRASTIVE-DEVELOPMENT-v1
30 A/B/Tie comparisons
26 unique
4 hidden reversed consistency repeats
12 mechanism families
reviewed 0 / 30
```

Review page:

`https://flipgazine.pages.dev/tcj-contrastive-review.html`

Each screen asks only the comparison that matters, e.g. which response better answers the question, which is more socially appropriate, which is better composed, or which sounds more like a close friend. `Tie` is allowed.

This is development evidence, not the future final hidden Qualification 2.0.

After the 30 choices, development resumes autonomously with consistency/mechanism analysis, general corrections where the human evidence invalidates a hypothesis, mock judge adapters, runtime integration, offline replay, security and packaging.

---

## Current development spend rule

**No paid external model/API calls.**

Development uses:

- v1.1/v2/v3 human-reviewed evidence;
- already-paid stored model responses;
- deterministic replay;
- current ChatGPT reasoning;
- Methodology Pack/retrieval work;
- contrastive A/B/Tie human evidence;
- mocks/local fixtures.

External provider credit is reserved for **one final frozen authority test** unless the user explicitly authorizes an exception. There must be no background cron/worker that silently consumes development credit.

---

## BYOK commercial default

```text
BUYER PAYS TCJ FOR
- TCJ Runtime/Core
- Methodology Pack
- Context Retriever
- Voice Profile(s)
- Private Evidence capability/tool
- Release Policy
- Qualification/Passport framework
- deployment/support

BUYER SEPARATELY PROVIDES / PAYS FOR
- its chosen provider account/API usage
```

For OpenAI-backed deployment:

```text
TCJ software in buyer environment
+ buyer-owned OpenAI organization/account
+ buyer-controlled API key
+ buyer pays OpenAI directly
```

Developer OpenAI credit is not a production dependency. Local Judge remains supported for VPC/on-prem/provider-independent deployment. Connected ≠ compatible ≠ qualified.

---

## Remaining implementation sequence

```text
1. Complete/analyze Contrastive Review v1.
2. Correct only general mechanisms invalidated by native-human contrastive evidence.
3. Build provider-neutral BYOJ/BYOK + Local Judge adapters with mocks/stored fixtures.
4. Integrate the complete Architecture-v2 runtime.
5. Run full offline/exposed-bank orchestration and provenance replay.
6. Complete security, tenant isolation, exfiltration testing and plug-and-play packaging.
7. Freeze the exact final reference configuration.
8. Construct a fresh post-freeze Qualification 2.0 instrument.
9. Native-human blind A/B/Tie + limited calibration review; freeze gold.
10. Show exact final call count/cost/balance and obtain explicit user approval.
11. Run one final paid provider Qualification.
12. If PASS: issue Passport and finish Assurance/security/release gates.
13. If FAIL: preserve failure and make an explicit product decision; no automatic paid retry loop.
```

---

## Final Qualification 2.0 direction

Do not create another clone of the old 48×6 instrument.

The final hidden post-freeze instrument should combine:

- fresh A/B/Tie controlled discrimination;
- context counterfactuals;
- dimension isolation;
- release safety;
- preservation of good/unconventional native Thai;
- hidden reversed consistency checks;
- limited absolute calibration for continuity.

The new thresholds must be preregistered before model exposure. Historical threshold failures remain historical evidence and are not retroactively weakened.

---

## Security release blockers still apply

Before final commercial release:

- resolve/isolate relevant remaining Supabase SECURITY DEFINER/public findings;
- replace service-role-key reuse with a dedicated independently rotatable TCJ internal secret;
- complete tenant-isolation/evidence-exfiltration testing;
- prove PEE tool capability denial and server-side call budgets;
- scan/classify the Methodology Pack for protected-evidence leakage;
- prove BYOK secret rotation and no developer-key dependency;
- prove fresh install/restart/rollback/reproducibility;
- complete licensing/data-processing diligence.

Repository-root `AGENTS.md` remains a short operational entry point, but this README + `CURRENT-STATE.json` + `DOCUMENT-AUTHORITY-MAP.md` control current TCJ continuation.
