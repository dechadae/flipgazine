# TCJ Judge Admission — Stage B v1.1 Validity Remediation

**Status:** LIVE · READY TO RUN · IDENTITIES SEALED  
**Date:** 20 August 2026  
**Campaign:** `TCJ-JUDGE-ADMISSION-2026Q3-v1.2`  
**Authority:** `ANSWERS-TCJ-MULTI-JUDGE-CONSENSUS-ARCHITECTURE.md` + `ANSWERS-TCJ-EXPERT-OPERABLE-CONTROL-PLANE-IMPLEMENTATION.md`

---

## 1. Why Stage B v1 stopped

The first Stage B v1 cell returned HTTP 200 and a JSON object, but the six TCJ rating fields contained prose rather than the required integer ratings 1–4. Validation stopped at `bad_intent` and the operator page correctly entered `Blocked` rather than retrying until a favorable sample appeared.

Diagnosis found that Stage B v1 had introduced a simplified judging prompt instead of reusing the canonical `answers-bff-v2` TCJ judging contract. The canonical TCJ path had already demonstrated valid structured output under its established prompt/input/settings contract. Because the failure could therefore not be cleanly attributed to candidate competence, the v1 cell is classified as an **implementation-validity failure**, not candidate evidence.

The failed v1 record was not deleted. It is preserved as invalidated provenance and excluded from candidate metrics.

No valid Stage B v1 judgment existed when remediation occurred.

---

## 2. Preserved provenance

Migration:

```text
20260820141228_tcj_admission_stage_b_v11_validity_and_attempt_provenance
```

The migration:

- marks the v1 failed cell `invalidated` with an explicit reason;
- preserves its original timing/error/content preview;
- creates append-only `private.tcj_admission_stage_b_attempts`;
- records the invalid v1 attempt with `evidence_eligible = false`;
- resets only the incomplete Stage B campaign state to `human_review_frozen`;
- leaves all frozen Stage A human evidence untouched;
- leaves candidate identities sealed.

A second migration makes failure identity protocol-aware:

```text
20260820141331_tcj_admission_stage_b_failure_protocol_identity
```

This prevents a later protocol version from overwriting or coalescing the v1 provenance row.

---

## 3. Stage B v1.1 contract

Live Edge Function:

```text
tcj-admission-stage-b v2
protocol = TCJ-JUDGE-ADMISSION-STAGE-B-v1.1
prompt   = TCJ-ANSWERS-BFF-v2@TCJ-CORE-v1
verify_jwt = true
```

Stage B v1.1 now uses the canonical TCJ `answers-bff-v2` semantic judging contract rather than the simplified v1 prompt.

The canonical contract provenance is pinned to:

```text
TCJ core version      TCJ-CORE-v1
canonical core blob   459d9831cf439696e0861f85c26839a43f6b6a64
profile               answers-bff-v2
rating dimensions     intent / thai_pragmatics / bff_voice /
                      lexical_social_fit / stance / composition
temperature           0
max completion tokens 500
response format       JSON object
user payload keys     question_or_scenario / candidate_response
```

Repository mirrors:

```text
supabase/functions/tcj-admission-stage-b/index.ts
supabase/functions/tcj-admission-stage-b/canonical-contract.ts
```

---

## 4. Structured-output reliability policy

Structured-output reliability is itself Stage B evidence.

The frozen v1.1 rule is:

```text
primary attempt
    ↓
valid schema → persist judgment
    ↓ otherwise, if schema-invalid
exactly one predefined repair attempt
    ↓
valid repair → persist judgment + preserve first-pass failure
invalid repair → terminal contract evidence for that cell
```

The system does **not** keep sampling until valid output appears.

A terminal candidate-generation contract failure is counted in the Judge Passport reliability evidence and the remaining independent cells continue.

Different failure classes remain distinct:

```text
429 / provider 5xx
→ transient transport
→ bounded retry

schema-invalid first pass
→ one predefined repair
→ both attempts preserved

schema-invalid repair / length / empty output
→ terminal candidate contract evidence
→ no favorable resampling
→ continue other cells

unsupported adapter / non-retryable provider-contract problem / infrastructure validity problem
→ Blocked
→ stop and diagnose
```

---

## 5. Evidence boundary remains unchanged

Stage B uses the historical 36-case bank only as:

```text
Calibration Bank
+
preliminary judging-competence screening evidence
```

It remains permanently ineligible for clean final Judge Qualification proof or Assurance.

The Stage B matrix remains:

```text
3 sealed candidates × 36 exposed Calibration cases = 108 cells
```

Browser-visible progress is aggregate only. Candidate/model/provider/family/grouping and per-candidate performance remain absent from the browser until the approved reveal point.

---

## 6. Operator surface

Live control:

```text
/tcj-stage-b.html                  v2
/fg-page-tcj-stage-b-v2.js         v1
```

The page now distinguishes:

- valid frozen judgments;
- terminal structured-output cells;
- transient transport retries;
- true adapter/infrastructure blocks.

A terminal structured-output cell continues automatically because it is now frozen reliability evidence, not a reason to resample until success.

A true `Blocked` state still requires diagnosis before proceeding.

---

## 7. Exact checkpoint after remediation

```text
Stage A human evidence             30 / 30 frozen · unchanged
Stage A anonymous summaries         3 / 3 frozen · unchanged
candidate identities               SEALED
Stage B v1 valid judgments           0
Stage B v1 invalid provenance        1 preserved / excluded
Stage B v1.1 valid judgments         0
Stage B v1.1 terminal cells          0
Stage B v1.1 active failures         0
campaign state                     human_review_frozen
Stage B v1.1 runner                LIVE / ready
Stage B v1.1 operator page         LIVE / ready
identity reveal                    NOT PERMITTED
```

The next valid action is for the authenticated domain expert to refresh `/tcj-stage-b.html` and start **Run Stage B v1.1**. If the server returns a true `Blocked` state, stop and diagnose before any further run action.
