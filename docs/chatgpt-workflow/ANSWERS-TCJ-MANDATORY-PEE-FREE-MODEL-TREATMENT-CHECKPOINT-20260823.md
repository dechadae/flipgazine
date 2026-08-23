# TCJ Architecture v2.1 — Mandatory Protected Evidence Free-Model Treatment Checkpoint

**Date:** 23 August 2026  
**Status:** CURRENT EXECUTION CHECKPOINT  
**Canonical Supabase:** `sjpvhgxacsiorrtijqua`  
**Governing amendment:** `ANSWERS-TCJ-MANDATORY-PROTECTED-EVIDENCE-ARCHITECTURE-AMENDMENT-20260823.md`

## 1. Governing runtime decision

Private Evidence is no longer optional/risk-driven in the intended TCJ product.

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

Current invariant:

```text
minimum protected-evidence calls per evaluation = 1
maximum total protected-evidence calls per evaluation = 2
raw evidence exported = false
```

The judge receives only bounded derived/non-reconstructive evidence. It never receives raw TCJ corpus rows, nearest proprietary examples, hidden Qualification cases, private row IDs or arbitrary private search capability.

## 2. Successor research runtime

Runtime:

`TCJ-RUNTIME-ANSWERS-BFF-ARCHV2-v2-MANDATORY-PEE`

Configuration SHA:

`9c418186601158ffe0afa85a1ce68a22e48b81e9dbd086d8b1fc10f0f9e51842`

Adapter:

`TCJ-JUDGE-ADAPTER-v2.2-MANDATORY-PEE`

Planner:

`TCJ-PROTECTED-EVIDENCE-PLAN-v1`

Status: `research_active` — not frozen and not production-authoritative.

The planner is private/server-only. Live privilege verification on 23 August 2026 showed:

- `anon`: no EXECUTE
- `authenticated`: no EXECUTE
- `postgres`: EXECUTE

It deterministically uses `TCJ-CONTEXT-RETRIEVER-v1.4`, requests all six dimensions, selects at most four allowlisted evidence families, guarantees one initial call and caps the total at two.

## 3. Historical optional-PEE stack

The frozen reference manifest

`916ffa3632e428f287692632d9e11b0eda5ea88fe39399fc39e362e0cae13d5c`

and runtime

`TCJ-RUNTIME-ANSWERS-BFF-ARCHV2-v1`

remain immutable historical evidence. They must not be rewritten or represented as the intended final commercial topology.

The completed GPT-OSS run with zero PEE calls remains a particularly useful control:

`TCJ-ARCHV2-GROQ-GPTOSS20B-STRESS-v1`

The partially executed optional-PEE Qwen/Gemini runs are also preserved as historical controls and have been stopped rather than rewritten:

- `TCJ-ARCHV2-GROQ-QWEN36-27B-STRESS-v2`
- `TCJ-ARCHV2-GEMINI35-FLASHLITE-STRESS-v2`

## 4. Mandatory-PEE treatment matrix

All treatment runs use only already-exposed development bank:

`TCJ-EVALUATOR-QUALIFICATION-BANK-2026Q3-v3`

Treatment runs:

- `TCJ-ARCHV2-GROQ-GPTOSS20B-STRESS-MANDATORY-PEE-v1`
- `TCJ-ARCHV2-GROQ-QWEN36-27B-STRESS-MANDATORY-PEE-v1`
- `TCJ-ARCHV2-GEMINI35-FLASHLITE-STRESS-MANDATORY-PEE-v1`

Each treatment case must persist before/with evaluation audit state:

```text
Protected Evidence: REQUIRED
initial_protected_evidence: present
initial_protected_evidence_sha256: present
evidence_planner_key: TCJ-PROTECTED-EVIDENCE-PLAN-v1
raw_evidence_exported: false
evidence_call_count: >= 1
provider request may occur only after mandatory initial evidence is available
```

No semantic retry/resampling is permitted merely because a provider/model fails schema, tool or serialization requirements. Historical failures remain evidence. Provider 429 throttling may be retried as an operational transport condition.

## 5. Provider execution policy

Gemini can run independently of Groq.

GPT-OSS 20B and Qwen 3.6 27B share the same Groq free-tier token quota. Their paced batch runners should therefore be serialized rather than intentionally competing for the same 8,000 TPM allowance.

Current workers:

- `tcj-groq-stress-worker-mandatory-pee`
- `tcj-qwen36-stress-worker-mandatory-pee`
- `tcj-gemini35-flashlite-stress-worker-mandatory-pee`

Current paced orchestrators:

- `tcj-gptoss20b-mandatory-pee-orchestrator`
- `tcj-qwen36-mandatory-pee-orchestrator`
- `tcj-gemini35-mandatory-pee-orchestrator`

Server-side launch functions are private/postgres-only. Provider/API credentials remain secret and are not passed through client-visible code.

## 6. Research question

The primary experiment is now a control/treatment comparison:

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

Measure at minimum:

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

Do not attribute a treatment improvement generically to the model. Separate Methodology/Context effect, mandatory protected-evidence effect, optional interactive PEE effect, Release Policy containment and serialization compatibility.

## 7. Qualification consequence

`TCJ-QUALIFICATION-2.0-2026Q3-v1` remains protected human-frozen historical final-test evidence for the old optional-PEE freeze and must not be sent to free development models.

Because the intended evaluator topology changed after that instrument was constructed, Qualification 2.0 must not be used to certify the mandatory-PEE successor as if the evaluator had remained unchanged.

A future authority instrument must be constructed only after the mandatory-PEE successor configuration is finalized/frozen.

The staged paid run for the old optional-PEE configuration remains non-authoritative and must not be restarted without explicit user approval and live-state revalidation.

## 8. Spend rule

- Groq free research: allowed.
- verified free Gemini research: allowed.
- paid OpenAI development: forbidden.
- paid Claude/other provider development: requires explicit user approval.
- never silently convert free research into paid inference.

## 9. Immediate next action

Continue all three mandatory-PEE treatment runs on exposed v3 evidence, preserving every provider response, evidence packet/hash, rate-limit event and terminal failure. Keep Gemini independent and serialize GPT-OSS/Qwen use of the shared Groq quota. After treatments complete, compute paired control-vs-treatment metrics before any new authority freeze or hidden Qualification design.
