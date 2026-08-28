# TCJ — Perturbation Complete + Anonymous Passport Dossiers

**Status:** 99/99 PERTURBATION CELLS COMPLETE · 3 ANONYMOUS DOSSIERS FROZEN · META-REVIEW PENDING · IDENTITIES SEALED  
**Date:** 22 August 2026 (Thailand)  
**Campaign:** `TCJ-JUDGE-ADMISSION-2026Q3-v1.2`

## 1. Constructed perturbation v1 completion

Pack:

`TCJ-JUDGE-ROBUSTNESS-PERTURB-2026Q3-v1`

Protocol:

`TCJ-JUDGE-ROBUSTNESS-PERTURB-v1`

Authoritative completion state:

- 33 frozen cases
- 99 / 99 sealed judge cells complete
- 99 valid judgments
- 0 terminal contract cells
- 101 raw provider attempts
- 2 schema-repair attempts
- 101 / 101 raw-output SHA-256 checks pass
- 99 / 99 canonical diagnosis SHA-256 checks pass
- 3 / 3 anonymous perturbation summary manifests independently recompute and match
- 3 candidate identities remain sealed
- `identity_revealed_at` remains null

Frozen pack manifest:

`5628e726ed31fff979fd92ef55ad43da3b7c2ee86f8d798c5490f150469a39d5`

## 2. Anonymous Judge Passport dossiers

Migration:

`20260822004614_tcj_anonymous_passport_dossiers_and_meta_review_ledger`

The system now contains exactly three immutable anonymous dossier records under:

`private.tcj_admission_passport_dossiers`

Dossier version:

`TCJ-JUDGE-PASSPORT-DOSSIER-v1`

Each dossier combines selected, identity-free evidence from:

1. Stage A blind native-human review;
2. Stage B judging-competence evidence;
3. Robustness v1 repeat/self-preference evidence;
4. Constructed perturbation v1 evidence.

The dossier explicitly preserves the evidence boundary:

- Stage B uses methodology-exposed Calibration evidence;
- robustness evidence remains preliminary / Calibration-derived;
- no hidden Qualification Bank has yet been completed;
- no Assurance evidence is included;
- meta-review recommendations are preliminary admission recommendations, not production authority.

All dossier objects are frozen and versioned. Updating or deleting a frozen dossier is blocked by the database.

## 3. Blindness verification

Post-build checks:

- dossiers: 3 / 3
- dossier SHA-256: 3 / 3 match
- recursive forbidden reviewer-visible key scan: 0 hits for provider/model/family/judge_candidate_id/identity metadata
- candidate identities sealed: 3 / 3
- admission Passports assigned: 0
- identity reveal: not performed

## 4. Meta-review ledger

A separate private ledger now exists:

`private.tcj_admission_meta_reviews`

Review protocol:

`TCJ-JUDGE-META-REVIEW-v1`

Exactly six pending slots exist:

- 3 dossiers × ChatGPT
- 3 dossiers × Grok

The two reviewer slots are independent. Neither reviewer should receive the other review. Reviewer-visible input is the frozen anonymous dossier only.

A frozen review cannot be silently edited or deleted; a future correction requires versioned invalidation/new evidence.

## 5. Next valid action

Build/activate the independent blind meta-review runner/control surface.

Required sequence:

1. submit the same anonymous dossier format independently to ChatGPT and Grok;
2. require per-dimension recommendations among `qualified`, `partially_qualified`, `research_only`, `rejected`;
3. preserve provider/model/version and raw response as provenance outside the reviewer-visible dossier;
4. allow bounded transport retry and at most one predefined schema repair;
5. freeze all six valid meta-reviews;
6. independently verify all six review hashes/manifests;
7. set `meta_reviews_frozen_at` only after the six-review gate passes;
8. reveal candidate identities only after the meta-review freeze;
9. then assign versioned Judge Passport states by dimension.

Do not create Panel/Assurance authority from this preliminary evidence. Hidden Qualification Bank, Panel Shadow, human escalation, reliability modeling, Assurance and external validation remain downstream.
