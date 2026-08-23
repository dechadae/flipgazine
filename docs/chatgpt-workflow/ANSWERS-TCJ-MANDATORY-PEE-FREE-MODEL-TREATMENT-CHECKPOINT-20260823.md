# TCJ Architecture v2.1 — Mandatory Protected Evidence Free-Model Treatment Checkpoint

**Date:** 23 August 2026  
**Status:** CURRENT EXECUTION CHECKPOINT  
**Canonical Supabase:** `sjpvhgxacsiorrtijqua`  
**Governing amendment:** `ANSWERS-TCJ-MANDATORY-PROTECTED-EVIDENCE-ARCHITECTURE-AMENDMENT-20260823.md`

## 1. Governing runtime decision

Protected Evidence is no longer optional/risk-driven in the intended TCJ product.

Every evaluation must perform a protected-evidence pass before the semantic judge's first diagnosis:

```text
Writer
→ Voice Profile
→ Context Retriever
→ Methodology Pack
→ Protected Evidence Planner
→ mandatory bounded Private Evidence assessment
→ semantic judge
↔ optional one additional targeted evidence call
→ six-dimension diagnosis
→ independent Release Policy
→ ACCEPT / REVISE / ESCALATE
```

Runtime invariant:

```text
minimum protected-evidence calls per evaluation = 1
maximum total protected-evidence calls per evaluation = 2
raw evidence exported = false
```

The semantic judge receives only bounded derived/non-reconstructive evidence. It never receives raw TCJ corpus rows, nearest proprietary examples, raw human edit pairs, hidden Qualification cases, private row IDs or arbitrary private search capability.

## 2. Successor research runtime

```text
Runtime       TCJ-RUNTIME-ANSWERS-BFF-ARCHV2-v2-MANDATORY-PEE
Config SHA    9c418186601158ffe0afa85a1ce68a22e48b81e9dbd086d8b1fc10f0f9e51842
Adapter       TCJ-JUDGE-ADAPTER-v2.2-MANDATORY-PEE
Planner       TCJ-PROTECTED-EVIDENCE-PLAN-v1
Status        research_active — not frozen / not production-authoritative
```

The planner is private/server-only. Live privilege verification on 23 August 2026:

- `anon`: no EXECUTE
- `authenticated`: no EXECUTE
- `postgres`: EXECUTE

It deterministically uses `TCJ-CONTEXT-RETRIEVER-v1.4`, requests grounding across all six dimensions, selects at most four allowlisted evidence families, guarantees one initial call and caps the total at two.

## 3. Historical controls remain immutable

The old optional-PEE freeze remains historical evidence only:

```text
TCJ-ARCHV2-REFERENCE-EVALUATOR-FREEZE-v1
manifest 916ffa3632e428f287692632d9e11b0eda5ea88fe39399fc39e362e0cae13d5c
runtime  TCJ-RUNTIME-ANSWERS-BFF-ARCHV2-v1
```

Preserved controls:

- `TCJ-ARCHV2-GROQ-GPTOSS20B-STRESS-v1` — completed Methodology/Context control; 47 usable + 1 protocol failure; zero PEE calls.
- `TCJ-ARCHV2-GROQ-QWEN36-27B-STRESS-v2` — stopped preserved partial optional-PEE control.
- `TCJ-ARCHV2-GEMINI35-FLASHLITE-STRESS-v2` — stopped preserved partial optional-PEE control.

Nothing in these ledgers is rewritten to make the new architecture look better.

## 4. GPT-OSS mandatory-PEE adapter calibration incident

An initial mandatory treatment run existed as:

`TCJ-ARCHV2-GROQ-GPTOSS20B-STRESS-MANDATORY-PEE-v1`

It was stopped and preserved as **adapter-calibration evidence**, not used as the fair treatment result.

Reason: the inherited mandatory prompt omitted the explicit severity and confidence enum definitions that were present in the successful GPT-OSS control harness. Raw provider reasoning explicitly stated that the severity definition was missing and consequently emitted numeric or non-contract severity/confidence values. The resulting `bad_severity` / `bad_confidence` failures were therefore adapter-induced.

No failed row or provider response was deleted or relabeled.

Clean successor treatment:

`TCJ-ARCHV2-GROQ-GPTOSS20B-STRESS-MANDATORY-PEE-v2`

Its output contract again explicitly requires:

```text
severity   = PASS | MINOR | MAJOR | CRITICAL
confidence = high | medium | low
```

and keeps the same no-semantic-resampling rule.

Validation case `Q3-001` completed in one provider request with:

- exactly one mandatory initial protected-evidence call;
- native JSON protected-evidence packet;
- evidence SHA present;
- `TCJ-PROTECTED-EVIDENCE-PLAN-v1` recorded;
- `raw_evidence_exported=false`;
- native JSON diagnosis and release result;
- no terminal error.

## 5. Current mandatory-PEE treatment matrix

All treatment runs use only the already-exposed development bank:

`TCJ-EVALUATOR-QUALIFICATION-BANK-2026Q3-v3`

Active fair treatments:

- `TCJ-ARCHV2-GROQ-GPTOSS20B-STRESS-MANDATORY-PEE-v2`
- `TCJ-ARCHV2-GROQ-QWEN36-27B-STRESS-MANDATORY-PEE-v1`
- `TCJ-ARCHV2-GEMINI35-FLASHLITE-STRESS-MANDATORY-PEE-v1`

Every processed treatment case must persist:

```text
Protected Evidence: REQUIRED
initial_protected_evidence: present
initial_protected_evidence_sha256: present
evidence_planner_key: TCJ-PROTECTED-EVIDENCE-PLAN-v1
raw_evidence_exported: false
evidence_call_count >= 1
```

The mandatory evidence packet is produced before provider inference. If mandatory evidence cannot be produced, the evaluation must not silently fall back to an ungrounded normal result.

Provider 429 throttling may be retried as an operational transport condition. Semantic/schema/protocol failures are terminal evidence and are not resampled away.

## 6. Live treatment checkpoint during this update

Latest verified progression during the 23 August 2026 session:

```text
GPT-OSS 20B mandatory v2
  complete >= 1 / 48
  terminal 0 at clean validation
  mandatory evidence invariant verified

Qwen 3.6 27B mandatory v1
  complete >= 9 / 48
  terminal 0 at checkpoint
  mandatory evidence invariant verified

Gemini 3.5 Flash-Lite mandatory v1
  complete >= 34 / 48
  terminal 0 at checkpoint
  mandatory evidence invariant verified
```

These are a durable minimum checkpoint, not a claim that asynchronous batch invocations cannot have progressed further after the document write. Live Supabase remains canonical for exact counts.

Gemini has already exercised at least one permitted optional second protected-evidence call, demonstrating both paths:

- mandatory initial orchestrator-driven grounding;
- optional one additional targeted call when requested.

## 7. Provider execution policy

Gemini can run independently of Groq.

GPT-OSS 20B and Qwen 3.6 27B share the same observed Groq free-tier 8,000 TPM quota. Their paced batch runners must therefore be serialized rather than intentionally competing for the same token allowance.

Current workers:

- `tcj-groq-stress-worker-mandatory-pee`
- `tcj-qwen36-stress-worker-mandatory-pee`
- `tcj-gemini35-flashlite-stress-worker-mandatory-pee`

Current orchestrators:

- `tcj-gptoss20b-mandatory-pee-orchestrator`
- `tcj-qwen36-mandatory-pee-orchestrator`
- `tcj-gemini35-mandatory-pee-orchestrator`

Server-side launch functions are private/postgres-only. Provider/API credentials remain secret and are never passed through client-visible code.

## 8. Research question

The experiment is a control/treatment comparison:

```text
CONTROL
Methodology Pack
+ Context Retriever
+ Voice Profile
+ judge
+ Release Policy

TREATMENT
same stack
+ mandatory protected evidence before first semantic diagnosis
+ optional one additional targeted protected-evidence call
```

Record at minimum:

- usable semantic completion rate;
- protocol/schema failure rate;
- six-dimension MAE / mismatch distribution against native-human gold;
- errors >=2;
- serious false ACCEPTs;
- PASS false blocks;
- Release Policy rescues/mistakes;
- initial evidence-family usage;
- optional second-call frequency;
- rate-limit behavior;
- provider-specific adapter requirements;
- token/production economics.

Separate Methodology/Context effect, mandatory protected-evidence effect, optional second-call effect, Release Policy containment and mere serialization compatibility.

## 9. Qualification consequence

`TCJ-QUALIFICATION-2.0-2026Q3-v1` remains protected human-frozen evidence and must not be sent to free development models.

Because the evaluator topology changed after that instrument was constructed, Qualification 2.0 must not certify the mandatory-PEE successor as though the evaluator had remained unchanged.

A future hidden authority instrument must be constructed only after the mandatory-PEE successor is finalized and frozen.

The old staged paid authority path remains non-authoritative and must not be restarted without live-state revalidation and explicit user approval.

## 10. Spend rule

- Groq free research: allowed.
- verified free Gemini research: allowed.
- paid OpenAI development: forbidden.
- paid Claude/other provider development: explicit user approval required.
- never silently convert a free experiment into paid inference.

## 11. Immediate next action

Continue the three fair mandatory-PEE treatment runs on exposed v3 evidence. Keep Gemini independent; alternate/serialize GPT-OSS and Qwen on the shared Groq quota. Preserve every provider response, mandatory evidence packet/hash, optional second evidence call, rate-limit event and terminal failure. After all treatments finish, compute paired control-vs-treatment metrics before any successor freeze or fresh hidden Qualification design.
