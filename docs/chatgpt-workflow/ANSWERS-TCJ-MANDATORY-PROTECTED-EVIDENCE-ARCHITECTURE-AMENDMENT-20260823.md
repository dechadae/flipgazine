# TCJ Architecture v2.1 — Mandatory Protected Evidence Amendment

**Date:** 23 August 2026  
**Status:** GOVERNING AMENDMENT — supersedes Architecture-v2 language that describes Private Evidence as optional/risk-driven  
**Scope:** TCJ commercial runtime, BYOJ/BYOK adapters, low-tier research, future reference evaluator freeze and Qualification

## 1. Governing decision

Protected TCJ evidence is **not optional**.

Every TCJ evaluation must invoke the bounded Private Evidence Engine before the semantic judge produces its first diagnosis.

The governing runtime is now:

```text
BUYER WRITER
→ TCJ GATEWAY
→ VOICE PROFILE
→ LOCAL CONTEXT RETRIEVER
→ RELEVANT TCJ METHODOLOGY PACK MODULES
→ MANDATORY PROTECTED-EVIDENCE PLANNER
→ MANDATORY BOUNDED PRIVATE EVIDENCE ASSESSMENT
→ SELECTED BYOJ/BYOK SEMANTIC JUDGE
↔ OPTIONAL ONE ADDITIONAL TARGETED PRIVATE-EVIDENCE CALL
→ SIX-DIMENSION DIAGNOSIS
→ INDEPENDENT RELEASE POLICY
→ ACCEPT / REVISE / ESCALATE
```

Canonical shorthand:

```text
Methodology Pack = portable TCJ conceptual knowledge
Protected Evidence = protected native-human empirical grounding, required on every evaluation
Judge = replaceable semantic reasoner
Release Policy = may the candidate ship?
```

## 2. Why this changes the prior Architecture-v2 topology

The earlier Architecture-v2 design correctly moved conceptual intelligence into the Methodology Pack, but it made PEE invocation optional/risk-driven. That is no longer the intended product.

The purpose of TCJ is maximum Thai conversational accuracy while preserving a replaceable judge. If the protected native-human evidence layer is available, withholding it from ordinary cases creates unnecessary variance and makes weak judges depend too heavily on their own priors.

Therefore:

> **Every evaluation receives TCJ methodology and TCJ protected evidence.**

A judge must not have to recognize that it is confused before TCJ supplies grounding.

This is particularly important for low-tier/local judges, which may have enough reasoning ability to use TCJ evidence but may not reliably decide when to request it.

## 3. Mandatory initial evidence pass

A local/private `Protected Evidence Planner` selects the relevant allowlisted evidence families before semantic inference.

Current research implementation:

`TCJ-PROTECTED-EVIDENCE-PLAN-v1`

The planner:

- receives only the current scenario/candidate and local Context Retriever output;
- requests evidence across all six TCJ dimensions;
- chooses at most four relevant evidence families for the initial bounded call;
- guarantees at least one protected-evidence call per evaluation;
- never decides the semantic score or release result;
- never exports raw rows or nearest proprietary examples.

The initial bounded assessment is injected into the judge's first semantic context.

## 4. Optional second protected-evidence call

The total default evidence-call budget remains bounded.

Current contract:

```text
minimum protected-evidence calls per evaluation = 1
maximum total protected-evidence calls per evaluation = 2
```

Call 1 is mandatory and orchestrator-driven.

Call 2 may be requested by the judge when a specific material uncertainty remains after the initial evidence packet.

This preserves targeted interactive evidence without allowing a low-tier model to skip TCJ's proprietary grounding entirely.

## 5. Evidence remains non-reconstructive

Mandatory does **not** mean raw evidence is exposed.

The external/local judge may receive bounded conclusions such as:

```text
task class: other_or_uncertain
confidence: low
preserve semantic uncertainty for the judge
```

or:

```text
Thai clause spine is preserved
lexical integration is the sensitive dimension
BFF voice should not automatically be penalized
```

It must not receive:

- raw corpus rows;
- nearest examples;
- human before/after pairs;
- raw anchor text;
- private row IDs;
- arbitrary search results;
- hidden Qualification cases;
- buyer evidence from another tenant.

## 6. Authority consequence

The earlier frozen reference configuration:

`TCJ-RUNTIME-ANSWERS-BFF-ARCHV2-v1`

freeze manifest:

`916ffa3632e428f287692632d9e11b0eda5ea88fe39399fc39e362e0cae13d5c`

used optional PEE and is now historical evidence only. It must not be represented as the intended final commercial product.

Its frozen components and human evidence remain preserved; nothing is rewritten to hide the design change.

Successor research runtime:

`TCJ-RUNTIME-ANSWERS-BFF-ARCHV2-v2-MANDATORY-PEE`

configuration SHA at creation:

`9c418186601158ffe0afa85a1ce68a22e48b81e9dbd086d8b1fc10f0f9e51842`

Successor judge adapter:

`TCJ-JUDGE-ADAPTER-v2.2-MANDATORY-PEE`

Protected Evidence Planner:

`TCJ-PROTECTED-EVIDENCE-PLAN-v1`

No successor receives production authority until it is frozen and independently qualified.

## 7. Qualification 2.0 consequence

Human-frozen protocol:

`TCJ-QUALIFICATION-2.0-2026Q3-v1`

human manifest:

`07a25c08b331c215bf6a7378665726c376045bcb9d547d3cd21eaca22b51428d`

remains preserved and, at the time of this amendment, has **not been machine-exposed**.

However, it was constructed after the optional-PEE evaluator freeze, not after the new mandatory-PEE successor freeze. It therefore must **not** be used to certify the successor as if the evaluator had been unchanged.

The staged paid run for the old optional-PEE configuration is disabled with zero provider requests.

A future authority test for mandatory PEE must be constructed only after the exact successor configuration is frozen.

## 8. Low-tier research consequence

The completed/near-completed Groq `openai/gpt-oss-20b` stress run that used zero PEE calls is preserved as a valuable **Methodology-only ablation/control**.

Control:

```text
Methodology Pack + Voice Profile + Judge + Release Policy
```

Treatment:

```text
same stack
+ mandatory protected evidence before judge
+ optional one additional targeted protected-evidence call
```

Research treatment run:

`TCJ-ARCHV2-GROQ-GPTOSS20B-STRESS-MANDATORY-PEE-v1`

This paired design allows TCJ to measure the incremental value of protected evidence without paid OpenAI inference and without exposing fresh final Qualification evidence.

## 9. BYOJ/BYOK requirement

Mandatory protected evidence applies equally to:

- OpenAI BYOK;
- Gemini BYOK;
- Claude BYOK;
- Groq/OpenAI-compatible endpoints;
- local/self-hosted judges.

A provider adapter may differ in tool/JSON syntax, but it may not silently bypass the mandatory initial evidence pass.

If a provider cannot support interactive tool follow-up, TCJ can still perform the mandatory PEE call locally and inject the bounded evidence into the initial prompt/context.

This makes the invariant portable across providers.

## 10. Commercial product invariant

The final product must expose this state clearly:

```text
Protected Evidence: REQUIRED
Initial evidence call: COMPLETE / FAILED
Evidence families used: ...
Evidence packet SHA: ...
Raw evidence exported: false
Optional follow-up calls used: 0 or 1
```

If the mandatory protected-evidence step fails, the evaluation must not silently fall back to an ungrounded judge and report a normal qualified result.

The runtime should fail closed or escalate according to the frozen policy.

## 11. Supersession rule

Where older documents say any of the following:

- `PEE optional`;
- `risk-driven PEE only`;
- `judge may invoke PEE when needed` as the only PEE path;

interpret them as historical design language superseded by this amendment.

The still-valid part is that an **additional targeted evidence call** may remain judge-initiated after the mandatory initial packet.

## 12. Spend rule unchanged

This architectural correction does not authorize paid development inference.

Free-provider research is allowed where already authorized. Paid OpenAI/Claude/other inference still requires the user's explicit approval.

Qualification 2.0 remains untouched by free development models.