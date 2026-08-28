# TCJ Hidden Judge Qualification Bank v1 — Foundation Checkpoint — 22 Aug 2026

Protocol: `TCJ-JUDGE-QUALIFICATION-2026Q3-v1`  
Evidence set: `TCJ-JUDGE-QUALIFICATION-v1`  
Profile: `answers-bff-v2`

## Why this bank exists

The completed Judge Admission campaign produced three frozen preliminary Passports, all `research_only`, because the historical 36-case Stage B bank is methodology-exposed Calibration evidence. It cannot legitimately establish clean production authority.

This Qualification Bank is a fresh hidden evidence stratum whose sole purpose is to test whether an admitted candidate judge can earn production authority on individual TCJ dimensions. Qualification evidence is permanently distinct from both Calibration and Assurance evidence.

## Human-first validity boundary

The bank is constructed and reviewed under this ordering:

1. create fresh candidate cases;
2. freeze the qualification threshold contract;
3. native editorial owner reviews and may edit every scenario and candidate response;
4. native editorial owner assigns all six dimension ratings, severity and confidence;
5. freeze the 48-item human/evidence manifest;
6. only then may candidate judges see the bank;
7. Qualification items never become Assurance items later.

No candidate judge execution is permitted before step 5.

## Construction provenance

The 48 starting cases are **OpenAI GPT-5.6 Sol constructed drafts**. They are not represented as human-authored material.

Their research role is to provide fresh, balanced test stimuli. The native editorial owner remains responsible for reviewing/editing the actual Thai scenario and candidate text and for creating the human gold before bank freeze.

The later Assurance stratum should use stronger independent provenance, preferably newly human-authored/private cases plus independent native validation.

## Bank composition

- total cases: **48**
- TCJ dimensions: **6**
- hidden primary-target cases per dimension: **8**
- construction balance per dimension: **4 likely acceptable + 4 likely problematic**
- review order: deterministic hidden-hash randomization, positions 1–48
- reviewer-visible case identity: opaque `QH-*` ID only
- hidden from review UI: primary target dimension, construction class, construction note

All six dimensions are still rated on every case. The primary target is used later only for qualification diagnostics and threshold evaluation.

## Frozen qualification thresholds

Threshold version: `TCJ-JUDGE-QUALIFICATION-THRESHOLDS-v1`

Threshold SHA-256:
`b805b1f9484ea5ce576f09187c467b268c1f7c20263efa3889041680af426836`

The threshold contract was frozen before any human review and before any candidate judge exposure.

### Qualified dimension

- valid cells: at least 47 / 48
- mean absolute error: at most 0.50
- within-one-point cells: at least 45 / 48
- extreme reversals: 0
- hidden primary-target cases: 8
- primary-target within-one: at least 7 / 8

### Partially qualified dimension

- valid cells: at least 46 / 48
- mean absolute error: at most 0.75
- within-one-point cells: at least 43 / 48
- extreme reversals: at most 1
- hidden primary-target within-one: at least 6 / 8

### Global production-authority gates

- false-fluent judgments on human `MAJOR` or `CRITICAL`: 0
- terminal generation-contract failures: 0
- expected cells per candidate: 48

Exact-match rate is reported but is not itself a production-authority gate. A material rating error is absolute error greater than one point. An extreme reversal is human <=2 with judge 4, or human 4 with judge <=2.

## Pre-review QA

Before native review opened:

- qualification items: **48 / 48**
- `exposure_state = private`: **48 / 48**
- human reviews: **0**
- Stage B machine judgments on these items: **0**
- Stage B attempts on these items: **0**
- robustness references to these items: **0**
- generic human-review-queue references: **0**
- exact scenario overlap with other TCJ evidence sets: **0**
- exact candidate overlap with other TCJ evidence sets: **0**
- construction balance: **4 / 4 for every dimension**

## Pre-review storage corrections

Two construction corrections occurred while human review count was still exactly zero:

1. `QF-CMP-04` was revised to restore the intended 4/4 acceptable/problematic construction balance for Composition.
2. A byte-level audit found 34 candidate drafts containing literal backslash-`n` separators rather than real newline characters. Migration `20260822074359_tcj_hidden_qualification_bank_v1_linebreak_normalization` converted only those separators to actual newlines, refreshed hashes and preserved draft copies. No semantic wording was changed by that normalization.

After normalization:

- literal backslash-`n` candidate artifacts: **0**
- candidates intentionally containing real line breaks: **35**
- human reviews remained **0**
- machine judgments remained **0**
- overlap remained **0**
- threshold hash remained unchanged

These corrections are explicit provenance and are not post-hoc changes to human or machine evidence.

## Server-side controls

New private tables:

- `private.tcj_qualification_protocols`
- `private.tcj_qualification_case_designs`
- `private.tcj_qualification_human_reviews`

Direct `anon` / `authenticated` privileges are revoked. RLS is enabled. The browser uses a JWT/admin-protected Edge Function rather than direct table access.

Frozen human reviews, frozen qualification items and the frozen threshold contract are protected by database triggers. The freeze RPC verifies counts, private exposure, scenario/candidate hashes, human-review hashes and exact gold synchronization before producing manifests.

## Human review service

Edge Function:
`tcj-qualification-review`

- JWT required
- Flipgazine admin required
- no model API key is used
- no model execution exists in this function
- actions: `status`, `case`, `save_review`, `freeze`
- hidden construction metadata is never returned to the browser

Live operator page:
`https://flipgazine.pages.dev/tcj-qualification-review.html?v=1`

The reviewer may edit scenario/candidate Thai and revise saved ratings until the final bank freeze.

## Repository mirrors

- `supabase/migrations/20260822073742_tcj_hidden_qualification_bank_v1_human_review_foundation.sql`
- `supabase/migrations/20260822074017_tcj_hidden_qualification_bank_v1_composition_balance_fix.sql`
- `supabase/migrations/20260822074359_tcj_hidden_qualification_bank_v1_linebreak_normalization.sql`
- `supabase/functions/tcj-qualification-review/index.ts`
- `supabase/site-files/tcj-qualification-review.html`
- `supabase/site-files/fg-page-tcj-qualification-review-v1.js`

## Next execution order

1. Native editorial owner reviews all 48 cases in randomized review order.
2. Revise any saved drafts as needed while the bank remains `draft`.
3. When satisfied with all 48, freeze Qualification Bank v1 exactly once.
4. Independently verify all 48 frozen review hashes, evidence manifest, human manifest, threshold hash and continued private exposure.
5. Confirm zero candidate-judge execution occurred before freeze.
6. Only then build the dedicated 144-cell qualification runner: 48 cases × 3 admitted judges.
7. Judge payload contains only the canonical TCJ rubric plus scenario/candidate data. Hidden primary target, construction class, human gold and frozen thresholds must not be sent to candidate judges.
8. Persist raw attempts, exact request settings, raw outputs, parsed diagnoses, hashes, latency/usage and one schema-only repair provenance.
9. Apply the frozen threshold contract per dimension and global authority gates.
10. Update versioned Judge Passports from clean Qualification evidence; Assurance remains separate and subsequent.
