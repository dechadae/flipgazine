# ChatGPT Workflow — Flipgazine / The Book of Answers

**Purpose:** canonical human-readable entry point for continuing the Answers / TCJ project across sessions.

Before consequential work, inspect canonical Supabase project `sjpvhgxacsiorrtijqua` and current GitHub state. Do not execute stale next-action text from historical documents.

`CURRENT-STATE.json` is the compact machine-readable checkpoint. `DOCUMENT-AUTHORITY-MAP.md` classifies current authorities and supersession rules.

---

## Current TCJ authorities — read first

1. `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-V2-20260823.md` — **current final commercial architecture.** The judge receives a compiled TCJ Methodology Pack through a local Context Retriever; the raw corpus remains behind the Private Evidence Engine; six-dimensional diagnosis and production Release Policy are separate; BYOJ/BYOK remains first-class.
2. `ANSWERS-TCJ-METHODOLOGY-PACK-AND-CONTEXT-RETRIEVER-SPEC-20260823.md` — **governing Methodology Pack / retrieval spec.** GitHub is a development source, not a runtime dependency. Production compiles TCJ knowledge once and retrieves only relevant modules per request.
3. `ANSWERS-TCJ-FINAL-PRODUCT-IMPLEMENTATION-AND-QUALIFICATION-PLAN-V2-20260823.md` — **governing final-product execution plan.** No paid external model calls during ordinary development; one final paid authority run only after full freeze and explicit user approval.
4. `ANSWERS-TCJ-V17-QUALIFICATION-FAILURE-AND-CONTEXT-ENGINE-PIVOT-20260823.md` — **current execution checkpoint.** v1.7 failed fresh v3 Qualification, has no authority, and the project pivoted from repeated 48×6/API replay loops to context-engine + contrastive development.
5. `ANSWERS-TCJ-PRIVATE-EVIDENCE-ENGINE-AND-BUYER-ISOLATION-POLICY-20260822.md` — raw-corpus and buyer-evidence isolation authority.
6. `ANSWERS-TCJ-SOL-PRIVATE-EVIDENCE-TOOL-AND-COMMERCIAL-LICENSING-CLARIFICATION-20260822.md` — narrow judge-initiated evidence-tool capability; no SQL/arbitrary corpus search/raw rows.
7. `ANSWERS-TCJ-BYOJ-JUDGE-RUNTIME-AND-API-KEY-POLICY-20260822.md` — Local Judge / BYOK Judge / BYOJ and buyer-owned key policy.
8. `ANSWERS-TCJ-PLUG-AND-PLAY-DEPLOYMENT-AND-VOICE-PROFILE-POLICY-20260822.md` — deployment/private-server improvement policy where not superseded by architecture v2.
9. `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md` — commercial-use/provenance authority.
10. `ANSWERS-THAI-CONVERSATION-JUDGE-ARCHITECTURE.md` and `ANSWERS-VOICE-TONE.md` — legacy methodology/editorial source material where not superseded; important inputs to Methodology Pack compilation.

The 22 Aug final architecture freeze and execution plan are preserved historical design evidence but are superseded for current topology/execution where they conflict with architecture v2.

---

## Current product definition

TCJ is now intended to be:

> **a portable Thai conversational methodology + protected native-human evidence system + replaceable semantic judge + deterministic release authority.**

It is not intended to become an ever-growing pile of regex guards around a model.

---

## Architecture v2

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

Component meanings:

```text
Methodology Pack = how TCJ reasons about Thai conversational quality
Context Retriever = which TCJ concepts matter for this request
Voice Profile = what good means for this buyer/domain/voice
Private Evidence Engine = protected native-human empirical memory
Judge = replaceable semantic reasoner
Release Policy = may this output ship?
```

---

## Production does not reread GitHub

The clean-account GitHub experiment showed that a capable model can acquire much of the intended TCJ/BFF behavior by reading the project's documentation.

The production lesson is **not** to browse GitHub on each request.

Production should do this:

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

### Judge-visible

- stable TCJ core methodology;
- relevant Methodology Pack modules;
- Voice Profile contract;
- current scenario/candidate;
- structured evaluation contract;
- bounded derived PEE response when invoked.

### Private

- raw Batch rows;
- raw human edits;
- anchor library;
- hidden test cases;
- private review notes;
- buyer-private evidence;
- arbitrary database/search access.

The Private Evidence Engine is now a **targeted second-stage evidence source**, not the sole carrier of TCJ intelligence.

---

## Current failed Qualification evidence

Frozen evaluator:

```text
TCJ-EVAL-ANSWERS-BFF-SOL-v1.7-frozen-dev
SHA 5eb3d2354717573e1d8f48a574a960d3bea63a855409ac23932530be7bc23d07
```

Fresh v3 Qualification:

```text
48 cases
288 primary judgments
101 challenge judgments
389 dispatches / 389 responses
288 resolution cells
overall MAE .5729
false-fluent human MAJOR/CRITICAL ACCEPT = 3
terminal generation failures = 0
credit incidents = 0
Qualification = FAILED
production authority = NONE
summary SHA 52c507629205ddbb532faf57db2b9e8346ad82cfcf2e65d014231f80ddc70fd5
```

Do not modify the human gold or old thresholds to make this pass. v3 is now exposed development evidence.

---

## Current development mode

**No paid external model/API calls.**

Development uses:

- v1.1/v2/v3 human-reviewed evidence;
- already-paid stored model responses;
- deterministic replay;
- current ChatGPT reasoning;
- local Methodology Pack/retrieval work;
- contrastive A/B/Tie human evidence.

External provider credit is reserved for **one final frozen authority test** unless the user explicitly authorizes an exception.

There must be no background cron/worker that silently consumes development credit.

---

## Contrastive Review v1

Current development instrument:

```text
30 A/B/Tie comparisons
26 unique comparisons
4 hidden reversed consistency repeats
12 mechanism families
```

Review page:

`https://flipgazine.pages.dev/tcj-contrastive-review.html`

It is designed to give more mechanism evidence per human action than another six-slider absolute-rating bank.

It is development evidence, not the future final hidden Qualification.

---

## Current offline v1.8 direction

A parallel research path uses only stored judgments and deterministic logic.

First release-safety result on exposed evidence:

```text
v2 human MAJOR/CRITICAL falsely ACCEPTed = 0
v3 human MAJOR/CRITICAL falsely ACCEPTed = 0
```

This is not authority and not a claim that v1.8 is finished. The current Release Policy remains somewhat conservative and false-blocks some human-PASS cases; narrowing that behavior is active work.

The main architecture lesson is that Release Policy should not be forced to operate only through manipulated 1–4 scores.

---

## BYOK commercial default

Preferred enterprise structure:

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

The developer's OpenAI credit is not a production dependency.

Local Judge remains supported for VPC/on-prem/provider-independent deployment.

Connected ≠ compatible ≠ qualified.

---

## Final implementation sequence

```text
1. Compile TCJ-METHODOLOGY-BFF-v1.
2. Build/test Context Retriever v1 offline.
3. Refactor PEE into richer bounded analysis families.
4. Narrow Release Policy false blocks using exposed evidence.
5. Complete/analyze Contrastive Review v1.
6. Build provider-neutral judge adapter with mocks/stored fixtures.
7. Integrate architecture-v2 runtime.
8. Complete security, tenant isolation and plug-and-play packaging.
9. Freeze exact final reference configuration.
10. Construct a fresh post-freeze Qualification 2.0 instrument.
11. Native-human blind A/B/Tie + limited calibration review; freeze gold.
12. Show final call count/cost/balance and obtain explicit user approval.
13. Run one final paid provider Qualification.
14. If PASS: issue Passport and finish Assurance/security/release gates.
15. If FAIL: preserve the failure and make an explicit product decision; do not enter an automatic paid retry loop.
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

---

## Related Answers authorities

- `ANSWERS-BATCH2-BUYER-DATA-EXTRACTION-SPEC.md` — buyer export contract.
- `ANSWERS-BATCH2-HUMAN-FIRST-REVIEW-CORRECTION.md` — human-first visibility authority.
- `ANSWERS-BATCH2-SOURCESET-V1-1-REPLACEMENT-PATCH.md` — clean source replacement authority.
- `ANSWERS-COMMERCIAL-EXECUTION-TIMELINE.md` — commercialization schedule.
- `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md` — positioning/claim boundaries.
- `ANSWERS-HUMAN-REVIEW.md` — immutable Batch 1 provenance.
- `ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md` — completed private-server migration proof.

Repository-root `AGENTS.md` remains a short operational entry point, but this README + `CURRENT-STATE.json` + `DOCUMENT-AUTHORITY-MAP.md` control current TCJ continuation.
