# TCJ Architecture v2 — Low-Tier Judge Transfer Research Checkpoint

**Date:** 23 August 2026  
**Status:** current execution checkpoint  
**Canonical Supabase:** `sjpvhgxacsiorrtijqua`  
**Live status:** `https://flipgazine.pages.dev/tcj-status.html`

## Purpose

This checkpoint records the post-freeze research track testing whether TCJ Architecture v2 can transfer useful Thai conversational judgment into weaker / cheaper / free semantic judges.

This research does **not** replace Qualification 2.0 and must not expose the fresh Qualification 2.0 bank to development models.

The commercial research question is:

> Does TCJ's Methodology Pack + Context Retriever + bounded Private Evidence capability + independent Release Policy carry enough of the Thai conversational judgment system that different inexpensive judges can operate usefully behind it?

## Frozen reference evaluator remains unchanged

Reference freeze:

`TCJ-ARCHV2-REFERENCE-EVALUATOR-FREEZE-v1`

Freeze manifest:

`916ffa3632e428f287692632d9e11b0eda5ea88fe39399fc39e362e0cae13d5c`

Frozen components remain:

- `TCJ-METHODOLOGY-BFF-v1.1`
- `TCJ-CONTEXT-RETRIEVER-v1.4`
- `TCJ-VOICE-ANSWERS-BFF-v1`
- `TCJ-PRIVATE-EVIDENCE-ASSESS-v1.1`
- `TCJ-RELEASE-POLICY-v1.1`
- `TCJ-JUDGE-ADAPTER-v2.1`
- `TCJ-RUNTIME-ANSWERS-BFF-ARCHV2-v1`

Do not silently mutate the frozen reference stack while running low-tier compatibility research.

## Qualification 2.0 remains protected

Protocol:

`TCJ-QUALIFICATION-2.0-2026Q3-v1`

Current human state:

- 28 / 28 human judgments complete
- human evidence frozen
- hidden reversed repeats: 4 / 4 consistent
- human manifest: `07a25c08b331c215bf6a7378665726c376045bcb9d547d3cd21eaca22b51428d`
- bank manifest: `8e3d6c5fff4860f97bfbfcd8d69c46e5484da0d5c315ed6f4888d0061d09b7c8`
- threshold SHA: `c9bd44181023471a961ddcce698e6c4141961573d4eae359ea73529ee12026e5`

**Hard rule:** do not send Qualification 2.0 scenarios/candidates to Groq, Gemini, Claude, xAI, OpenAI development probes, or any other development judge.

The final OpenAI authority run remains unexecuted:

`TCJ-QUALIFICATION-2.0-FINAL-RUN-2026Q3-v1`

Live safety state at this checkpoint:

- status: `stopped_incident`
- incident field: null
- machine-incident rows: none
- provider requests: `0`
- actual provider cost: `$0.000000`
- `external_dispatch_enabled = false`
- `user_approved_at = null`
- estimated cost fields preserved: low `$1.10`, expected `$1.75`, high `$3.80`

Interpret `stopped_incident` here as an administrative locked/stopped state pending later revalidation; it is **not** a semantic Qualification result because no provider request was ever sent. Do not restart or reinterpret it without verifying live state and getting explicit user approval.

## Low-tier research bank

Use only already-exposed development evidence.

Primary stress bank:

`TCJ-EVALUATOR-QUALIFICATION-BANK-2026Q3-v3`

Properties:

- 48 frozen native-human-reviewed cases
- already machine-exposed
- already used as development evidence after the failed v1.7 Qualification
- never again eligible as fresh authority evidence

### Important interpretation limit

Architecture v2 / Methodology Pack v1.1 was developed using lessons from v1.1/v2/v3 exposed evidence. Therefore performance on v3 can measure:

- provider compatibility;
- whether a weak judge can follow the TCJ Methodology Pack;
- whether context retrieval is portable across judge families;
- protocol/schema weakness;
- Release Policy containment;
- tool-call behavior;
- operational cost/rate limits.

It **cannot** independently prove generalization to unseen cases. Extremely strong v3 fit may partly reflect that v3 informed the architecture. Final unseen Qualification 2.0 exists to test authority/generalization after the frozen evaluator is fixed.

## Groq free stress test — GPT-OSS 20B

Run:

`TCJ-ARCHV2-GROQ-GPTOSS20B-STRESS-v1`

Provider/model:

- Groq free API
- `openai/gpt-oss-20b`

Worker:

`tcj-groq-stress-worker`

Throttle helper:

`tcj-groq-stress-orchestrator`

Observed free-tier limit:

- 8,000 TPM

Rate-limit 429s are operational throttling, not semantic failures.

### Final run state

- run status: `complete`
- source cases: 48
- usable semantic completions: 47
- terminal protocol failures: 1
- run request count: 50, including preserved compatibility probes / rejected rate-limit or contract requests
- PEE evidence calls across usable cases: **0**

The one terminal case was not a Thai judgment failure. Groq rejected the generated tool call because the model attempted to call a non-existent tool named `json`:

`provider_error: Tool call validation failed: attempted to call tool 'json' which was not in request.tools`

Preserve that failure as BYOJ protocol-compliance evidence. Do not silently regenerate it and call the original run 48/48.

### Provider compatibility findings

1. Groq `gpt-oss-20b` rejected `response_format=json_object` when function tools were enabled. The Groq-compatible adapter therefore uses tool calling + TCJ JSON instructions + deterministic validation instead of JSON mode.
2. The model sometimes returned `rationale` as one string rather than the full keyed rationale object.
3. It sometimes omitted empty `flags` or `escalated_dimensions` arrays.
4. Allowed compatibility normalization is strictly non-semantic:
   - one rationale string -> same string copied into required rationale fields;
   - omitted empty `flags` -> `[]`;
   - omitted empty `escalated_dimensions` -> `[]`.
5. Never alter dimension scores, severity, confidence, explicit escalations, or semantic content.
6. Never regenerate a usable semantic result merely to repair formatting.

### Human-score fit on the 47 usable cases

A direct cell-mismatch audit found:

- 47 usable cases
- 282 six-dimension cells
- **1 mismatched dimension cell total**
- the only mismatch was Lexical/Social Fit and differed by one point
- Intent mismatches: 0
- Thai Pragmatics mismatches: 0
- BFF Voice mismatches: 0
- Stance mismatches: 0
- Composition mismatches: 0
- errors >= 2 points: 0

Therefore the simple absolute score MAE across the 282 usable dimension cells is approximately `1 / 282 = 0.0035`.

Earlier exploratory SQL reported `0.0833`; that calculation was superseded by the later direct mismatch audit. Use the direct mismatch count as the canonical metric for this run.

### Release-safety behavior

Across the 47 usable cases:

- human MAJOR/CRITICAL cases: 17
- human PASS cases: 20
- human MAJOR/CRITICAL falsely ACCEPTed by TCJ Release Policy: **0**
- human PASS falsely blocked: **0**
- model serious-severity undercalls (`PASS`/`MINOR` on human MAJOR/CRITICAL): 1
- Release Policy rescue of that undercall: **1 / 1**

Illustrative serious case already recorded during the run:

- human dimensions: `1/1/1/1/1/1`, severity `CRITICAL`
- GPT-OSS 20B: approximately `1/1/1/2/1/1`, severity `MINOR`
- TCJ Release Policy: `ESCALATE`

This shows a useful separation between semantic scoring and release authority, but it remains exposed-bank development evidence.

### PEE interpretation

The 47 usable cases made **zero Private Evidence Tool calls**.

Therefore this run does **not** demonstrate PEE benefit. It primarily demonstrates:

`Methodology Pack + Context Retriever + Voice Profile + GPT-OSS-20B semantic reasoning + Release Policy`

The later research matrix must distinguish these components instead of attributing the whole result to TCJ/PEE generically.

## Planned free low-tier model matrix

Target a small number of genuinely different model families, not an endless leaderboard.

Planned order:

1. **Groq GPT-OSS 20B** — complete; preserve 47 usable + 1 protocol failure.
2. **Groq Qwen 3.6 27B** — next free cross-family test on the same exposed v3 bank.
3. **Free Gemini API model** — use a genuinely free Flash / Flash-Lite style tier available to the connected account at test time; verify model/account availability before running.
4. **Claude** — test only if there is genuinely free API allowance/credit available to the connected account. If any paid spend would occur, stop and ask the user first.

Optional additional model families should be recommended only if they add genuinely different architecture evidence. Do not turn this project into a broad benchmark leaderboard.

## Research measurements for each judge family

Record at minimum:

- usable semantic completion rate;
- protocol/schema compliance failures;
- six-dimension cell mismatches / MAE;
- errors >= 2 points;
- per-dimension mismatch distribution;
- human MAJOR/CRITICAL false ACCEPTs;
- human PASS false blocks;
- Release Policy rescues;
- Release Policy mistakes;
- PEE tool-call frequency;
- provider rate-limit behavior;
- approximate production economics;
- provider-specific adapter requirements.

Explicitly separate:

1. base semantic judge capability;
2. Methodology Pack / Context Retriever transfer;
3. PEE contribution;
4. Release Policy containment/rescue;
5. mere serialization/protocol normalization.

## Spending rules

- OpenAI paid development inference: **forbidden**.
- Qualification 2.0 paid authority run: remains locked until explicit user approval.
- Groq free-tier testing: allowed.
- Gemini free-tier testing: allowed only after verifying the request is actually free under the connected account/current provider terms.
- Claude: allowed only if genuinely free API allowance exists; otherwise stop for explicit spend approval.
- Do not silently switch from free to paid tier after rate limits.

## Immediate next action

1. Treat the completed GPT-OSS-20B run as provider-portability / exposed-bank fit evidence, not unseen authority evidence.
2. Stage and run `qwen/qwen3.6-27b` through the same Architecture-v2 stress harness using only exposed v3 cases.
3. Preserve provider-specific failures rather than hiding them through semantic retries.
4. Compare Qwen results against GPT-OSS 20B using the research measurements above.
5. Then test a verified-free Gemini family.
6. Test Claude only if a genuinely free API path exists; otherwise stop for user permission.
7. Keep Qualification 2.0 completely untouched throughout.
8. Only after the free low-tier research matrix is complete should the project return to the final OpenAI authority-run decision.
