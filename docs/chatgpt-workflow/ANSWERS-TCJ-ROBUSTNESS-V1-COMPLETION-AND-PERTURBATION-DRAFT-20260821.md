# TCJ Judge Admission — Robustness v1 Completion + Constructed Perturbation Draft

**Status:** ROBUSTNESS v1 VERIFIED COMPLETE · PERTURBATION v1 DRAFT / NATIVE REVIEW REQUIRED · IDENTITIES SEALED  
**Date:** 21 August 2026 (Thailand)  
**Campaign:** `TCJ-JUDGE-ADMISSION-2026Q3-v1.2`

---

## 1. Frozen-input Robustness v1 completed

Pack:

```text
TCJ-JUDGE-ROBUSTNESS-2026Q3-v1
protocol TCJ-JUDGE-ROBUSTNESS-v1
```

Final authoritative state:

```text
cases                         66
sealed judge cells            198
valid judgments               197
terminal generation contract    1
active failures                 0
anonymous summaries             3
candidate identities            3 sealed
identity reveal                 not performed
```

The 198 cells consist of:

```text
repeat-identical stability   36 cases × 3 judges = 108 cells
self/same-family preference  30 cases × 3 judges =  90 cells
```

No Robustness v1 evidence is eligible for Qualification or Assurance. It remains preliminary / Calibration-derived evidence.

---

## 2. The one terminal cell is valid reliability evidence

One repeat-identical cell, `RPT-552-final`, did not satisfy the frozen structured-output contract.

Primary attempt:

```text
HTTP                    200
finish                   stop
outcome                  invalid_schema
error                    output_keys
specific defect          required confidence key omitted
```

The one predefined repair was then used.

Repair attempt:

```text
HTTP                    200
finish                   stop
outcome                  invalid_schema
error                    output_keys
specific defect          required confidence key omitted again
```

The cell was therefore frozen as a terminal `generation_contract` event under the predeclared one-repair-then-terminal rule.

It was not resampled until valid and is retained as structured-output reliability evidence for the anonymous dossier.

---

## 3. Independent integrity audit

All raw attempt text was independently rehashed after completion:

```text
total stored attempts        200
attempts with raw text       200
raw SHA-256 mismatches         0
valid attempts               197
invalid-schema attempts        3
```

The extra invalid attempt reflects the successful repair elsewhere plus the two failed attempts in the terminal cell.

Pack manifest independently recomputed:

```text
bf2c71dcbc6e163e895b880409aa2d3353ad2cd4d8b8ee3c38eed693c01afd63
MATCH = true
```

All three anonymous summary manifests were independently reconstructed from the frozen valid-judgment hashes and terminal-attempt hashes.

```text
summary manifest 1   MATCH
summary manifest 2   MATCH
summary manifest 3   MATCH
```

Identity mapping remains sealed.

---

## 4. Aggregate Robustness v1 observations

Anonymous aggregate only:

```text
repeat valid cells                   107 / 108
repeat terminal cells                  1 / 108
mean severity exact agreement        0.9161
mean deterministic-verdict agreement 0.9071
self-preference valid cells           90 / 90
self-preference terminal cells         0 / 90
structured-output repair attempts      2
successful structured repair           1
terminal contract failures             1
provider transport-failure attempts   27
```

These numbers are descriptive preliminary evidence. Per-candidate robustness performance remains hidden until the approved anonymous-dossier stage.

---

## 5. Remaining approved robustness families

The approved architecture defines thirteen families in total. Robustness v1 completed:

```text
1. repeated identical runs
2. self-preference / same-family outputs
```

The constructed perturbation stratum covers the remaining eleven:

```text
3.  ordered-alternative / position changes
4.  response labels / IDs
5.  verbosity and superficial completeness
6.  apology / politeness artifacts
7.  prompt complexity
8.  Thai-English script mixture
9.  Unicode / formatting perturbation
10. candidate-response prompt injection
11. metaphor / personification
12. particles and omitted subjects
13. relationship / register shifts
```

---

## 6. Constructed perturbation pack is intentionally draft

Pack:

```text
TCJ-JUDGE-ROBUSTNESS-PERTURB-2026Q3-v1
```

Evidence class:

```text
preliminary_constructed_calibration_derived
```

Current state:

```text
status                 draft
families                  11
cases per family           3
total cases               33
future judge cells        99
native approved            0
native review remaining   33
manifest                 null
frozen_at                null
candidate identities       3 sealed
```

Every constructed case derives from the already methodology-exposed historical Calibration bank. The pack is explicitly never Qualification or Assurance evidence.

The reason it is not frozen automatically is methodological: newly constructed Thai wording must not be silently treated as valid perturbation evidence without native-domain review.

---

## 7. Native-review contract

The domain expert reviews one perturbation at a time.

For each case the control plane shows:

```text
frozen Calibration source scenario
frozen Calibration source candidate
perturbation family
perturbation specification
constructed scenario
constructed candidate
expected robustness effect
```

The reviewer may edit the constructed Thai and/or expected effect before approval.

Every approval/edit is written to:

```text
private.tcj_admission_robustness_case_reviews
```

with before/after text, effect, perturbation specification, revision number, reviewer and timestamp.

Freeze is server-blocked until exactly all 33 cases are approved and all candidate identities remain sealed.

---

## 8. Manifest hardening

Perturbation manifests are canonicalized by PostgreSQL at the draft → frozen transition.

The database recomputes each component from:

```text
case key
SHA-256(scenario UTF-8)
SHA-256(candidate UTF-8)
family
expected effect
SHA-256(canonical jsonb perturbation specification)
```

The pack manifest is then SHA-256 over the ordered case components.

This prevents JavaScript object-key ordering from affecting evidence identity and makes the frozen manifest independently reconstructable from PostgreSQL state.

Migration:

```text
20260820192432_tcj_admission_robustness_perturbation_manifest_canonicalization
```

---

## 9. Live expert control

Native-review page:

```text
/tcj-robustness-perturbation-review.html
```

Controller:

```text
/fg-page-tcj-robustness-perturbation-review-v1.js
```

Authenticated Edge Function:

```text
tcj-admission-perturbation-review
verify_jwt = true
```

The browser receives Calibration source text and the constructed case under review, but no model/provider identity, candidate grouping, self/other mapping, per-candidate Stage B metric, or per-candidate robustness metric.

---

## 10. Repository / production synchronization

Production migrations:

```text
20260820191901_tcj_admission_robustness_perturbation_review_foundation
20260820192432_tcj_admission_robustness_perturbation_manifest_canonicalization
```

Repository mirrors:

```text
supabase/migrations/20260820191901_tcj_admission_robustness_perturbation_review_foundation.sql
supabase/migrations/20260820192432_tcj_admission_robustness_perturbation_manifest_canonicalization.sql
supabase/functions/tcj-admission-perturbation-review/index.ts
supabase/site-files/tcj-robustness-perturbation-review.html
supabase/site-files/fg-page-tcj-robustness-perturbation-review-v1.js
```

---

## 11. Next valid execution order

```text
native review 33 / 33 constructed perturbations
→ freeze TCJ-JUDGE-ROBUSTNESS-PERTURB-2026Q3-v1
→ independently verify frozen manifest
→ deploy/run the 99-cell perturbation judge runner
→ verify 99-cell evidence + robustness summaries
→ build identical anonymous candidate dossiers
→ independent blind ChatGPT + Grok meta-review
→ freeze both meta-reviews
→ only then perform approved identity reveal
```

No model execution for the 99-cell constructed stratum should occur before native review and pack freeze.
