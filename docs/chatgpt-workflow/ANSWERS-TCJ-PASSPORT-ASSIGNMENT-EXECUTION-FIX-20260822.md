# TCJ Preliminary Passport Assignment Execution Fix — 22 Aug 2026

## Incident
After identity reveal was correctly frozen, the operator pressed **Assign preliminary passports** once. The request reached `tcj-admission-passport` and returned HTTP 503. PostgreSQL logged `passport_assignment_count_gate:0`.

## Evidence safety
The failed transaction wrote nothing:
- campaign remained `identity_revealed`
- preliminary passports: 0
- frozen preliminary passports: 0
- passport assignment events: 0
- identity reveal event remained intact and hash-verified

No evidence was regenerated and no meta-review call was repeated.

## Root cause
The v1 assignment function placed the Passport insert in an `ins` data-modifying CTE while the following count query did not reference that CTE. In the live execution path the intended Passport rows were not materialized before the count gate, so the count gate correctly failed at 0 and rolled the transaction back.

## Fix
Supabase migration:
`20260822072622_tcj_preliminary_passport_assignment_execution_fix`

The function `private.tcj_assign_preliminary_passports(text,uuid)` now performs an explicit Passport `INSERT ... SELECT` before the count gate, then verifies exactly three frozen preliminary Passports before creating the assignment manifest/event and transitioning the campaign to `complete`.

## Zero-write preflight after fix
- source dossiers: 3
- blind meta-reviews: 6
- Passport payloads constructible: 3
- both reviewers present on all payloads: yes
- would-be Passport SHA-256 lengths: 64 / 64
- evidence item count represented per preliminary Passport: 145
- existing preliminary Passports before retry: 0
- campaign state before retry: `identity_revealed`

## Methodological boundary
The repair changes execution only. It does not change the evidence, meta-review recommendations, identity mapping, or admission outcome. The intended preliminary Passport state remains:
- `qualification_state = research_only`
- no production-qualified dimensions
- `clean_holdout = false`
- `hidden_qualification_bank_completed = false`
- `assurance_eligible = false`
- `final_qualification_sufficient = false`
- `production_authority = false`
- fresh hidden Qualification Bank required before production authority
