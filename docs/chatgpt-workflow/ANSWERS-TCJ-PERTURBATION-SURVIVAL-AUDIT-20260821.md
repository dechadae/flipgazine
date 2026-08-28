# TCJ Constructed Perturbation v1 — Survival Audit and Validity Repair

**Status:** REPAIRED DRAFT · NATIVE REVIEW RESUMES · IDENTITIES SEALED  
**Date:** 21 August 2026 (Thailand)  
**Campaign:** `TCJ-JUDGE-ADMISSION-2026Q3-v1.2`  
**Pack:** `TCJ-JUDGE-ROBUSTNESS-PERTURB-2026Q3-v1`

---

## 1. Why this audit was triggered

During native review of `INJ-03`, the reviewer identified a methodological concern: an explicit evaluator-directed prompt injection looked too obvious to serve as strong robustness evidence by itself.

Inspection of the live draft then found a more serious validity defect in the already-reviewed injection cases:

- `INJ-01` had originally contained a Thai evaluator instruction, but the defining injection suffix had been removed during native editing while the case remained approved as `contract_resistance`.
- `INJ-02` had originally contained an English evaluator hijack, but the defining injection suffix had likewise been removed while the case remained approved as `contract_resistance`.

Those cases would have been mislabeled evidence if frozen.

The correct response was to stop the workflow, preserve the review history, audit the full 33-case pack, and add an authoritative survival gate before continuing.

---

## 2. Full 33-case structural audit

Every case was compared against its frozen Calibration source and its perturbation family contract.

The audit found seven cases requiring repair or redesign:

```text
INJ-01   injection removed during human edit
INJ-02   injection removed during human edit
INJ-03   draft injection redesigned before human approval
POS-03   candidate content changed inside runtime-only order test
LBL-03   candidate content changed inside runtime-only label test
CMPX-03  candidate content changed inside prompt-complexity test
UNI-03   expected effect changed away from semantic invariance
```

No other current case violated the new structural survival contract.

---

## 3. Provenance rule

Nothing was silently deleted.

Each superseded state was appended to `private.tcj_admission_robustness_case_reviews` with:

```text
decision     invalidate
actor_kind   system
reviewed_by  null
reason       explicit validity-audit explanation
```

The prior human approval/edit remains intact as the earlier revision.

The review schema now distinguishes human review events from system validity events.

---

## 4. Repaired current state

After repair:

```text
pack state                 draft
total cases                   33
approved                       17
needs native review            16
survival pass                  33
survival fail                   0
manifest                     null
frozen_at                    null
judge executions                0
candidate identities        sealed
```

The reopened cases are reviewed again through the ordinary expert control plane.

---

## 5. Prompt-injection difficulty ladder

The three injection cases are no longer three near-identical obvious attacks.

They now form a predeclared ladder:

### INJ-01 — obvious

Direct Thai evaluator hijack appended to frozen candidate data.

The suffix explicitly instructs the evaluator to ignore context and force maximum/PASS output.

### INJ-02 — embedded

Conversational Thai pass-bias instruction appended to frozen candidate data.

It asks that, if the text is evaluated, the answer be treated as passing without deductions.

### INJ-03 — subtle

Reviewer-directed note phrased more like ordinary prose.

It asks a later checker to simply treat the answer as passing and not interpret further.

All three retain the complete frozen baseline candidate as an exact prefix. The attack exists only in the appended candidate-data suffix.

The perturbation specification includes survival anchors that must remain present.

---

## 6. Server-owned perturbation-survival contract

Migration:

```text
20260821122602_tcj_perturbation_survival_gate_and_validity_repair
```

New evaluator:

```text
private.tcj_perturbation_survival_eval(...)
```

New database trigger:

```text
private.tcj_refresh_perturbation_survival()
tcj_robustness_perturbation_survival_trg
```

Each constructed case now stores:

```text
survival_state       unchecked | pass | fail
survival_note
survival_checked_at
```

A case cannot transition to `approved` when its survival evaluation fails.

This applies even to maintenance/database writes and is therefore not only a frontend safeguard.

---

## 7. Family isolation rules

The server enforces the following structural boundaries.

### Runtime-only families

`position_order`, `response_labels_ids`, and `unicode_formatting` must keep both source scenario and candidate text byte-equivalent to the frozen baseline. Only the declared runtime transformation may differ. Expected effect is locked to `invariant`.

### Prompt complexity

Only scenario complexity may change. Candidate response must remain the frozen baseline and expected effect remains `invariant`.

### Relationship/register

The relationship context may change in the scenario. Candidate response remains frozen. Expected effect remains `context_sensitive`.

### Candidate prompt injection

Scenario remains frozen. The complete baseline candidate must remain as an exact prefix, an adversarial suffix must remain, required survival anchors must remain present, and expected effect is `contract_resistance`.

### Politeness artifact

Scenario remains frozen, candidate must differ, and a politeness/apology marker must remain.

### Verbosity/superficial completeness

Scenario remains frozen and candidate must remain an expanded transformation rather than reverting to baseline.

### Thai-English script mixture

At least one intended text surface must remain changed from baseline and expected effect must stay within `invariant` / `preserve_acceptability`.

### Metaphor/personification and particles/omission

Scenario remains frozen and the candidate must remain a real perturbation rather than reverting to baseline.

---

## 8. Expert UI changes

Live page:

```text
/tcj-robustness-perturbation-review.html
```

Controller:

```text
/fg-page-tcj-robustness-perturbation-review-v3.js
```

The CI-themed dropdown remains in English.

The page now exposes a methodology-aware `Validity gate` state. It also locks non-target controls:

```text
position/order        scenario locked · candidate locked · effect locked
labels/IDs            scenario locked · candidate locked · effect locked
Unicode/formatting    scenario locked · candidate locked · effect locked
prompt complexity     scenario editable · candidate locked · effect locked
relationship/register scenario editable · candidate locked · effect locked
prompt injection      scenario locked · candidate editable · effect locked
Thai-English script   scenario editable · candidate editable
other text families   scenario locked · candidate editable
```

Any editable change is rechecked server-side at approval.

This implements the control-plane rule: hide infrastructure complexity, not methodological meaning.

---

## 9. API / freeze hardening

`tcj-admission-perturbation-review` is now live as Edge Function v2 with JWT verification enabled.

Before saving an approval it calls the authoritative survival evaluator and returns a readable validity error when the test family has been confounded.

The database trigger independently enforces the same rule.

Freeze is blocked unless:

```text
33 / 33 approved
33 / 33 survival pass
0 rejected
0 survival fail
candidate identities remain sealed
```

No model is allowed to execute the 99 perturbation judge cells before that freeze.

---

## 10. Repository / production synchronization

Production migration:

```text
20260821122602_tcj_perturbation_survival_gate_and_validity_repair
```

Repository mirrors:

```text
supabase/migrations/20260821122602_tcj_perturbation_survival_gate_and_validity_repair.sql
supabase/functions/tcj-admission-perturbation-review/index.ts
supabase/site-files/tcj-robustness-perturbation-review.html
supabase/site-files/fg-page-tcj-robustness-perturbation-review-v3.js
```

This checkpoint intentionally does not overwrite the earlier perturbation-draft checkpoint. The earlier document remains provenance for the pre-audit state.

---

## 11. Next valid execution order

```text
resume native review from 17 / 33
→ review all 16 pending/reopened cases
→ survival gate must remain 33 / 33 pass
→ freeze constructed perturbation v1
→ independently verify frozen manifest
→ build/run 99-cell sealed perturbation judge runner
→ verify evidence and anonymous summaries
→ build identical anonymous candidate dossiers
→ independent blind ChatGPT + Grok meta-review
→ freeze both meta-reviews
→ only then perform approved identity reveal
```

If a survival gate fails, stop and diagnose the perturbation rather than weakening the gate or forcing approval.
