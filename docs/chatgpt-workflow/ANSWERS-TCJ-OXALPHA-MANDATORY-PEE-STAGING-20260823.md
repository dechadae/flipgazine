# TCJ — Ox Alpha Mandatory-PEE Comparison Staging

**Date:** 23 August 2026  
**Status:** STAGED / ZERO PROVIDER REQUESTS  
**Canonical Supabase:** `sjpvhgxacsiorrtijqua`

## Purpose

Add OpenRouter `stealth/ox-alpha` as a fourth free-model family in the TCJ Architecture v2.1 judge-transfer experiment.

This is development research only. It uses the already-exposed `TCJ-EVALUATOR-QUALIFICATION-BANK-2026Q3-v3` and MUST NOT access Qualification 2.0.

## Run

```text
run_key: TCJ-ARCHV2-OPENROUTER-OXALPHA-STRESS-MANDATORY-PEE-v1
provider: openrouter
model: stealth/ox-alpha
expected cases: 48
runtime: TCJ-RUNTIME-ANSWERS-BFF-ARCHV2-v2-MANDATORY-PEE
runtime SHA: 9c418186601158ffe0afa85a1ce68a22e48b81e9dbd086d8b1fc10f0f9e51842
evidence mode: mandatory_initial_plus_optional_targeted
status at staging: staged
provider requests at staging: 0
```

All 48 exposed-v3 case rows are staged.

## Evidence boundary

Every case must perform:

```text
Context Retriever
→ Protected Evidence Planner
→ mandatory bounded Private Evidence assessment
→ Ox Alpha semantic judge
↔ at most one additional targeted PEE call
→ six-dimension diagnosis
→ independent Release Policy
```

The provider/model receives only the current exposed-v3 scenario/candidate, Methodology Pack context, Voice Profile, and bounded non-reconstructive derived PEE packet. It MUST NOT receive raw TCJ private rows, nearest proprietary examples, raw human edit pairs, hidden Qualification 2.0 content, internal row IDs, or arbitrary private search access.

## Adapter

Edge worker:

`tcj-oxalpha-stress-worker-mandatory-pee`

OpenRouter model ID:

`stealth/ox-alpha`

The worker uses OpenRouter's OpenAI-compatible chat-completions interface, tool calling, strict JSON-schema response format, no provider fallbacks, bounded reasoning, and the same strict TCJ six-dimension diagnosis contract used by the fair mandatory-PEE treatments.

No semantic retry/resampling is permitted. Operational 429 throttling may be retried later without changing semantic content.

## Credential gate

Required Edge Function secret:

`OPENROUTER_API_KEY`

Live secret-name probe at staging found no OpenRouter secret. Therefore no provider request has been made.

Do not paste the API key into chat. Create an OpenRouter API key and store it in Supabase Edge Function Secrets under the exact name `OPENROUTER_API_KEY`.

Before first Ox Alpha dispatch, re-check:

1. secret presence without revealing the value;
2. current OpenRouter key/free-tier state;
3. current `stealth/ox-alpha` availability and zero-price status;
4. current free-request quota;
5. run request count remains zero;
6. Qualification 2.0 remains unexposed.

## Free-tier caution

OpenRouter's documented free account limit is currently 50 free-model requests/day unless the account has purchased at least $10 of credits, in which case the free-model limit is higher. A 48-case TCJ run normally requires at least 48 provider requests and can require additional requests when the judge invokes the optional second PEE turn. Therefore the run must inspect the key quota before launch and must not silently switch to a paid model or paid route.

## Comparison metrics

Use the same metrics as other mandatory-PEE treatments:

- usable semantic completion rate;
- schema/tool/protocol failures;
- six-dimension MAE and >=2-point errors;
- per-dimension error distribution;
- serious false ACCEPTs;
- PASS false blocks;
- Release Policy rescues/mistakes;
- mandatory evidence-family distribution;
- optional second-PEE-call frequency;
- token/request usage;
- rate-limit behavior;
- provider-specific adapter defects.

Ox Alpha results must be compared against native-human gold and the other free-model treatment families, not against coding benchmark claims.
