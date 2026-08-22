# TCJ Constructed Perturbation v1 — Frozen + 99-Cell Runner Ready

**Status:** FROZEN · MANIFEST VERIFIED · RUNNER READY · ZERO MODEL EXECUTIONS · IDENTITIES SEALED  
**Date:** 22 August 2026 (Thailand)  
**Campaign:** `TCJ-JUDGE-ADMISSION-2026Q3-v1.2`  
**Pack:** `TCJ-JUDGE-ROBUSTNESS-PERTURB-2026Q3-v1`

## 1. Native review and freeze

The constructed robustness pack completed native review at 33/33 and passed the server-owned perturbation-survival gate.

Authoritative frozen state:

```text
cases                         33 / 33
native approved               33 / 33
survival pass                 33 / 33
survival fail                  0
frozen cases                  33 / 33
scenario SHA-256 match        33 / 33
candidate SHA-256 match       33 / 33
future sealed judge cells     99
candidate identities           3 sealed
identity reveal                null
```

Stored canonical pack manifest:

```text
5628e726ed31fff979fd92ef55ad43da3b7c2ee86f8d798c5490f150469a39d5
```

The stored manifest independently recomputed from the frozen cases and matched exactly.

## 2. Freeze incident resolved before this checkpoint

The first freeze attempt stopped safely because pgcrypto `digest(...)` was referenced without the `extensions.` schema qualification. No partial freeze occurred and no model executed.

Migration:

```text
20260822001054_tcj_perturbation_freeze_pgcrypto_schema_fix
```

Both the Edge Function and database manifest trigger now use `extensions.digest(...)`.

## 3. Execution guards added after freeze

Migration:

```text
20260822001744_tcj_perturbation_execution_guards_and_summary_metrics
```

It adds:

- `perturbation_metrics jsonb` to the private robustness-summary table;
- frozen-case immutability;
- server-owned `frozen -> running -> complete` state gates;
- manifest re-verification before execution;
- exactly 99 completed cells required before `complete`;
- exactly 3 anonymous perturbation summaries required before `complete`;
- identity-sealed gate at execution and completion.

The database, not the operator page, is authoritative for these transitions.

## 4. 99-cell runner

Authenticated Edge Function:

```text
tcj-admission-perturbation-runner v1
verify_jwt = true
protocol = TCJ-JUDGE-ROBUSTNESS-PERTURB-v1
prompt = TCJ-ANSWERS-BFF-v2@TCJ-CORE-v1
```

Every sealed candidate judges all 33 frozen cases:

```text
33 cases × 3 sealed candidates = 99 cells
```

The runner uses the same canonical TCJ judging contract, temperature 0, 500-token completion limit, provider/model adapters and one-predeclared-schema-repair rule already proven in Stage B / Robustness v1.

A second structured-output failure becomes terminal reliability evidence. It is never resampled until favorable.

## 5. Runtime-only perturbations

Nine of the 33 frozen cases intentionally keep their stored Thai source text unchanged and apply the declared perturbation only at runtime:

```text
position/order        3 cases
response labels/IDs   3 cases
Unicode/formatting    3 cases
```

Preflight passed:

```text
position specs valid         3 / 3
neutral-label specs valid    3 / 3
CRLF transform non-noop      yes
NBSP transform non-noop      yes
ZWSP transform non-noop      yes
```

Runtime semantics:

- position/order serializes `candidate_response` before `question_or_scenario`;
- response-label tests prepend the frozen neutral label to the candidate data only;
- Unicode tests use frozen predeclared CRLF, NBSP, or zero-width-space transformations.

Every attempt and valid judgment stores runtime provenance including the exact rendered scenario SHA-256, rendered candidate SHA-256, complete user-payload SHA-256 and runtime-transform metadata.

## 6. Remaining 24 cases

The other 24 cases use the exact native-reviewed frozen text and cover:

```text
verbosity / superficial completeness
politeness artifacts
prompt complexity
Thai-English script mixture
candidate-response prompt injection
metaphor / personification
particles / omitted subjects
relationship / register shifts
```

The prompt-injection family uses the repaired obvious / embedded / subtle ladder. Candidate text is always untrusted data under the canonical system contract.

## 7. Anonymous summary metrics

After all 99 cells freeze, each sealed candidate receives one private anonymous perturbation summary containing:

- per-family validity / terminal counts;
- severity and verdict agreement against that candidate's frozen Stage B baseline;
- per-dimension exact / within-one / mean-absolute-delta metrics;
- score deltas;
- invariant stability metrics;
- contract-resistance stability and score-inflation indicators;
- expected degradation observations;
- acceptability-preservation observations;
- context-sensitivity change observations;
- structured-output reliability and repair metrics;
- evidence manifest SHA-256.

These metrics remain preliminary / Calibration-derived and are not Qualification or Assurance evidence.

## 8. Operator control surface

Live page:

```text
/tcj-robustness-perturbation.html
```

Controller:

```text
/fg-page-tcj-robustness-perturbation-v1.js
```

The browser receives aggregate progress only. It never receives candidate grouping, model/provider identity, per-candidate robustness metrics or the sealed mapping.

## 9. Repository / production synchronization

Production and repository mirrors now include:

```text
supabase/migrations/20260822001054_tcj_perturbation_freeze_pgcrypto_schema_fix.sql
supabase/migrations/20260822001744_tcj_perturbation_execution_guards_and_summary_metrics.sql
supabase/functions/tcj-admission-perturbation-runner/index.ts
supabase/functions/tcj-admission-perturbation-runner/canonical-contract.ts
supabase/site-files/tcj-robustness-perturbation.html
supabase/site-files/fg-page-tcj-robustness-perturbation-v1.js
```

## 10. Next valid execution order

```text
operator opens /tcj-robustness-perturbation.html
→ Run perturbation v1 once
→ execute/resume 99 sealed cells
→ terminal structured-output cells remain terminal evidence
→ independently verify raw hashes + 3 summary manifests
→ keep identities sealed
→ build identical anonymous Judge Passport dossiers
→ independent blind ChatGPT + Grok meta-review
→ freeze both meta-reviews
→ only then perform approved identity reveal
```

At this checkpoint there are zero perturbation attempts, zero perturbation judgments and zero perturbation failures. No model execution should occur until the authenticated operator presses the Run button.
