# TCJ Architecture v2.1 — Free-Model Finalist Selection

**Date:** 23 August 2026  
**Status:** FINAL DEVELOPMENT-SELECTION RESULT  
**Canonical Supabase:** `sjpvhgxacsiorrtijqua`  
**Governing architecture:** mandatory Protected Evidence Architecture v2.1  
**Authority role:** development-model selection only; not hidden qualification / not production authority

## Decision

**Selected reference-judge candidate: `gemini-3.5-flash-lite`.**

This selection ends the free-model finalist experiment. Qwen and GPT-OSS are intentionally stopped as preserved partial finalist runs at the user's request. Ox Alpha was previously stopped and excluded.

The selected model is a **reference judge for the next TCJ refinement phase**, not a permanent vendor lock. TCJ remains architecturally BYOJ/BYOK-capable; Gemini-specific optimization should live in adapter/evidence-presentation/configuration layers wherever possible.

## Final live run states

```text
Gemini 3.5 Flash-Lite — run 8
  48 complete / 0 terminal / 0 staged
  49 provider requests
  48 mandatory initial PEE packets
  49 total PEE calls (1 case used the permitted second targeted call)
  status: complete

Qwen 3.6 27B — run 7
  21 complete / 4 terminal / 23 staged
  status: stopped_preserved_partial_finalist

GPT-OSS 20B — run 9
  16 complete / 3 terminal / 29 staged
  status: stopped_preserved_partial_finalist
```

No paid OpenAI/xAI/Claude development calls were used. Qualification 2.0 was not exposed.

## Fair same-case comparison

The primary semantic ranking uses the **13 cases successfully judged by all three finalists**.

| Metric | Gemini 3.5 Flash-Lite | Qwen 3.6 27B | GPT-OSS 20B |
|---|---:|---:|---:|
| Common cases | 13 | 13 | 13 |
| Six-dimension MAE | **0.5385** | 0.8077 | 1.0897 |
| >=2-point error cells | **10** | 18 | 28 |
| Cases with any >=2 error | **4** | 7 | 10 |
| Intent MAE | **0.5385** | 0.8462 | 1.1538 |
| Thai pragmatics MAE | **0.4615** | 1.2308 | 1.2308 |
| BFF voice MAE | **0.3846** | 1.0000 | 1.4615 |
| Lexical/social fit MAE | **0.5385** | 0.7692 | 1.0000 |
| Stance MAE | 0.6923 | **0.6154** | 0.6923 |
| Composition MAE | 0.6154 | **0.3846** | 1.0000 |
| Human-serious cases | 2 | 2 | 2 |
| Serious false ACCEPT | **0** | **0** | 2 |
| Human-PASS cases | 9 | 9 | 9 |
| PASS false block | **3** | 4 | 5 |

Gemini wins the common-case set on overall MAE, large-error count, four of six dimensions, serious false-ACCEPT containment and PASS false-block rate. Qwen is better on stance and composition within this subset, which should be useful as a diagnostic reference during Gemini refinement.

## Pairwise robustness checks

### Gemini vs Qwen on every Qwen-completed case (21 matched cases)

```text
Gemini MAE              0.5238
Qwen MAE                0.7460
Gemini >=2 cells        16
Qwen >=2 cells          25
Gemini serious FA       0 / 5
Qwen serious FA         1 / 5
Gemini PASS false block 3 / 13
Qwen PASS false block   5 / 13
```

### Gemini vs GPT-OSS on every GPT-completed case (16 matched cases)

```text
Gemini MAE              0.5729
GPT-OSS MAE             1.0000
Gemini >=2 cells        13
GPT-OSS >=2 cells       31
Gemini serious FA       0 / 4
GPT-OSS serious FA      2 / 4
Gemini PASS false block 3 / 9
GPT-OSS PASS false block 5 / 9
```

The winner therefore does not depend on the 13-way intersection alone.

## Full available completed-sample metrics

These are **not directly comparable as a ranking** because Qwen/GPT-OSS stopped on smaller/different subsets, but they corroborate the matched-case result.

```text
Gemini (48 cases)
  MAE 0.6875
  serious false ACCEPT 2 / 17
  PASS false block 4 / 21
  protocol terminals 0

Qwen (21 completed cases)
  MAE 0.7460
  serious false ACCEPT 1 / 5
  PASS false block 5 / 13
  protocol terminals 4

GPT-OSS (16 completed cases)
  MAE 1.0000
  serious false ACCEPT 2 / 4
  PASS false block 5 / 9
  protocol terminals 3
```

## Protocol / adapter reliability

Among cases that reached a semantic attempt before the runs were stopped:

```text
Gemini: 48 complete / 0 terminal = 100% semantic protocol completion
Qwen:   21 complete / 4 terminal = 84.0%
GPT-OSS:16 complete / 3 terminal = 84.2%
```

Qwen terminal classes:
- three non-JSON prose outputs despite JSON-only contract;
- one invalid optional-evidence tool call with unsupported/misspelled schema values.

GPT-OSS terminal classes:
- two missing/invalid structured rationale fields (`bad_rationale_intent`);
- one truncated/unterminated JSON response.

Gemini completed all 48 cases with no terminal schema/provider failure and successfully exercised the optional second PEE path once.

## Operational observations

Groq free-tier execution for Qwen/GPT-OSS repeatedly hit rolling 200,000-token/day TPD limits and 8,000 TPM limits. These 429s are operational evidence only and were not counted as semantic failures.

Qwen valid-response token usage observed in dispatch ledgers:
- 32 valid provider responses
- 113,854 total recorded tokens
- ~3,557.9 tokens / valid response

GPT-OSS:
- 20 valid provider responses
- 77,270 total recorded tokens
- ~3,863.5 tokens / valid response

Gemini's dispatch usage is stored differently in this harness, so direct token totals are not used for cross-provider ranking. Operationally, Gemini completed the entire 48-case treatment with 49 requests and zero rate-limit/provider failures in the observed run.

## Critical refinement finding: the two Gemini serious false ACCEPTs

Gemini's full 48-case run contains two serious false ACCEPTs:

- `Q3-026` — human MAJOR; model scored all six dimensions as 4/PASS.
- `Q3-043` — human CRITICAL; human ratings are 1 across all six dimensions, while Gemini scored all six as 4/PASS.

This is not purely a Gemini-prompt problem. Both cases received the **same mandatory Protected Evidence assessment pattern**, including a `linebreak_and_structural_completeness` assessment stating that no high-confidence structural failure was detected.

For `Q3-043`, that PEE conclusion failed to detect a clearly incomplete/dangling line structure. Therefore the next refinement phase must target both:

1. Gemini's use of bounded evidence and dimension-isolation discipline; and
2. TCJ's Protected Evidence detector/planner quality, especially structural completeness and false reassurance.

This is a key architecture lesson: mandatory PEE only helps if the PEE packet itself is discriminative and correctly calibrated.

## Selection rationale

Gemini is selected because it currently provides the best combination of:

1. native-human agreement on identical cases;
2. substantially fewer large semantic errors;
3. better serious-false-ACCEPT behavior than GPT-OSS and better matched safety than Qwen;
4. lower PASS false-blocking than both competitors;
5. 100% protocol/schema completion across the full 48-case treatment;
6. successful compatibility with mandatory initial PEE plus the optional second targeted PEE path;
7. markedly lower adapter fragility than Qwen/GPT-OSS in this experiment.

This is a **development selection**, not proof that Gemini is production-authoritative.

## Next phase — Gemini-centered TCJ refinement

Do not continue the stopped Qwen/GPT-OSS finalist runs merely to complete 48/48. Their partial ledgers are preserved as comparison evidence.

Refinement should proceed against exposed/development evidence only and should prioritize:

1. the two serious Gemini false ACCEPTs;
2. PEE structural-completeness detection and false-reassurance behavior;
3. BFF voice calibration, which remains Gemini's highest full-bank dimension MAE (0.8542);
4. stance and composition calibration;
5. evidence-family/planner routing so relevant risk families are selected when lexical/register/composition failures are plausible;
6. release-policy containment for cases where the semantic judge becomes globally over-positive;
7. a Gemini-specific adapter/evidence presentation strategy without contaminating the provider-neutral BYOJ/BYOK architecture.

After refinement, validate on a **fresh development validation set** not used for tuning. Only after the refined configuration is finalized and frozen should a new hidden native-human authority qualification be constructed.

`TCJ-QUALIFICATION-2.0-2026Q3-v1` remains protected and must not be used to tune or certify this successor configuration.
