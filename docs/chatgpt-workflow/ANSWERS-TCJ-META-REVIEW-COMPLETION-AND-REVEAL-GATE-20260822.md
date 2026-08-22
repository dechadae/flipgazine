# TCJ — Blind Meta-Review Completion & Identity-Reveal Gate

**Date:** 22 August 2026  
**Campaign:** `TCJ-JUDGE-ADMISSION-2026Q3-v1.2`  
**Meta-review protocol:** `TCJ-JUDGE-META-REVIEW-v1`  
**Dossier version:** `TCJ-JUDGE-PASSPORT-DOSSIER-v1`  
**State at checkpoint:** `meta_review_frozen`  
**Candidate identity:** SEALED

## 1. Blind meta-review completion

The independent blind meta-review phase completed successfully.

Authoritative completion state:

- 3 frozen anonymous Judge Passport dossiers;
- 2 independent reviewers per dossier: ChatGPT and Grok;
- 6 / 6 valid frozen meta-reviews;
- 6 / 6 unique dossier/reviewer pairs;
- 6 provider attempts total;
- all 6 attempts were primary attempts;
- 0 schema-repair attempts;
- 0 contract failures;
- 0 infrastructure-failure evidence rows;
- 3 / 3 candidate identities remained sealed through freeze.

The campaign entered `meta_review_frozen` at the server level before any identity reveal.

## 2. Independent integrity verification

After the UI showed 6 / 6, the following were independently recomputed from PostgreSQL state:

- 6 / 6 review raw-output SHA-256 values matched the persisted raw text;
- 6 / 6 parsed-review SHA-256 values matched canonical PostgreSQL `jsonb::text` serialization;
- 6 / 6 review dossier links matched the frozen dossier SHA-256;
- 3 / 3 dossier SHA-256 values recomputed from the frozen dossier JSON;
- 6 / 6 attempt raw-output hashes matched;
- 3 ChatGPT slots were served by OpenAI `gpt-5.6-sol`;
- 3 Grok slots were served by xAI `grok-4.6`;
- no hidden retry, repair, or resampling occurred.

This closes the blind-evidence phase.

## 3. Anonymous meta-review outcome

Before identity reveal, both independent meta-reviewers reached the same overall recommendation for all three anonymous dossiers:

`research_only`

The reviewers disagreed on some dimension-level recommendations, including whether particular dimensions merited `partially_qualified`, `research_only`, or in one case `rejected` treatment. Those disagreements are evidence and must remain preserved rather than averaged away.

No meta-review recommendation can create production authority because this campaign still lacks a clean hidden Judge Qualification Bank.

## 4. Evidence boundary retained

The current admission dossier combines:

- blind native-human Stage A evidence;
- methodology-exposed Stage B Calibration evidence;
- frozen-input robustness evidence;
- constructed perturbation robustness evidence derived from exposed Calibration sources;
- two independent blind meta-reviews.

It does **not** include:

- a fresh hidden Qualification Bank;
- Assurance Holdout evidence;
- external validation sufficient for production-authority claims.

Therefore any Passport assigned from this campaign must retain:

- `qualification_state = research_only`;
- `clean_holdout = false`;
- `hidden_qualification_bank_completed = false`;
- `assurance_eligible = false`;
- `final_qualification_sufficient = false`;
- `production_authority = false`;
- zero production-qualified dimensions.

## 5. Mobile transport incident

During the first Grok meta-review, the mobile browser reported `Failed to fetch` after its connection window expired. The Supabase Edge Function continued executing and completed successfully with HTTP 200 after approximately 105 seconds.

The database showed that the Grok review had frozen correctly, so the event was classified as a client transport/UI timeout, not a failed or invalid evidence cell.

The meta-review controller was upgraded to v2 so that lost browser responses enter server-state reconciliation and do not automatically resubmit a paid reviewer call. The remainder of the run completed without duplicates.

## 6. Identity reveal / Passport gate implemented

The next approved architecture transition is:

`meta_review_frozen -> identity_revealed -> complete`

Migration:

`20260822071521_tcj_identity_reveal_and_preliminary_passport_gate`

New private provenance tables:

- `private.tcj_admission_identity_reveal_events`
- `private.tcj_admission_passport_assignment_events`

New private functions:

- `private.tcj_reveal_admission_identities(text, uuid)`
- `private.tcj_assign_preliminary_passports(text, uuid)`

The reveal function rechecks the complete frozen evidence gate before exposing candidate mapping. It records both a reveal-evidence hash and an identity-mapping hash. Revealed identity fields become immutable.

The Passport-assignment function creates three versioned `admission-preliminary-v1` Passports. New Passports are content-hashed and frozen/immutable. Both independent meta-review outputs are retained inside each Passport.

The preliminary Passport deliberately grants no production-qualified dimensions. All six dimensions remain excluded from production authority until a fresh hidden Qualification Bank is completed.

## 7. Operator surface

Live page:

`/tcj-judge-passports.html`

Controller:

`/fg-page-tcj-judge-passports-v1.js`

Edge Function:

`tcj-admission-passport`

The page is a two-step explicit operator flow:

1. **Reveal candidate identities** — irreversible reveal after all blind hashes are rechecked.
2. **Assign preliminary Passports** — creates three frozen research-only Passports and completes the admission campaign.

Before step 1, candidate/provider/model identity metadata is not returned to the browser.

## 8. State at this checkpoint

At the time this checkpoint was written:

- campaign status: `meta_review_frozen`;
- meta-review freeze: complete;
- valid meta-reviews: 6 / 6;
- candidate identities: 3 / 3 sealed;
- identity reveal events: 0;
- preliminary Passport assignment events: 0;
- `admission-preliminary-v1` Passports: 0.

Identity reveal has **not** been performed by this checkpoint.

## 9. Next execution order

1. Operator opens `/tcj-judge-passports.html`.
2. Verify page shows 6 frozen reviews, Identity = Sealed, Passports = 0.
3. Operator explicitly presses **Reveal candidate identities**.
4. Independently verify reveal-evidence hash, mapping hash, campaign state, and 3 / 3 revealed identities.
5. Review the revealed identity-to-dossier mapping.
6. Operator presses **Assign preliminary Passports**.
7. Independently verify all three Passport hashes and the assignment manifest.
8. Begin design/construction of a fresh hidden Qualification Bank. Do not promote any current candidate to production Panel authority from this campaign alone.
