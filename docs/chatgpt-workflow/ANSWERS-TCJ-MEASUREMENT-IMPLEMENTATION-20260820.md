# TCJ Measurement System — Implementation Checkpoint · 20 August 2026

**Status:** PARTIAL FOUNDATION COMPLETE · STANDARD UNCHANGED · PANEL/ASSURANCE NOT LIVE  
**Architecture authority:** `ANSWERS-TCJ-MULTI-JUDGE-CONSENSUS-ARCHITECTURE.md`  
**Live Standard authority:** `ANSWERS-THAI-CONVERSATION-JUDGE-ARCHITECTURE.md` + `ANSWERS-TCJ-LIVE-DEPLOYMENT-20260819.md`

---

## 1. Purpose

This record captures what was actually implemented after the 20 August 2026 TCJ measurement-system research review.

It is an implementation checkpoint, not a replacement for the governing architecture.

The live public TCJ Standard methodology and endpoint behavior were deliberately left unchanged while the next-stage evidence system was added alongside it.

---

## 2. Architecture weaknesses patched before implementation

### 2.1 Historical 36-case circularity

The existing 36-case Voice/Answers calibration bank had already influenced evaluator comparison and TCJ methodology.

It is now structurally classified as:

```text
Calibration Bank
+
preliminary Stage B judge-screening evidence
```

It is permanently ineligible to serve as:

```text
clean final Judge Qualification proof
Assurance Holdout
independent generalization proof for later methodology changes
```

### 2.2 General-Thai evidence mismatch

The historical 36-case gold labels use the Answers-style dimensions:

```text
intent
thai_pragmatics
bff_voice
lexical_social_fit
stance
composition
```

They therefore do not constitute complete human validation of the broader General Thai dimensions such as:

```text
register_relationship_fit
discourse_delivery
```

A future `general-v2` remains dependent on a fresh multi-rater native-Thai evidence bank designed for General Thai constructs and documented population scope.

---

## 3. Live migrations added

### `20260819225121_tcj_measurement_foundation_vnext`

Created the private vNext measurement schema.

### `20260819225157_tcj_measurement_backfill_legacy36`

Classified/backfilled the historical calibration evidence and historical judge metrics.

### `20260819230014_tcj_measurement_fk_indexes`

Added covering indexes identified by the Supabase performance advisor for the new foreign-key access paths.

All three migrations are mirrored in `supabase/migrations/` using the exact live migration versions.

---

## 4. New private measurement tables

The foundation now includes:

```text
private.tcj_evidence_sets
private.tcj_evidence_items

private.tcj_judge_candidates
private.tcj_judge_passports
private.tcj_judge_dimension_metrics

private.tcj_admission_campaigns
private.tcj_admission_campaign_candidates
private.tcj_admission_scenarios
private.tcj_admission_generations
private.tcj_admission_human_reviews

private.tcj_panel_runs
private.tcj_panel_members
private.tcj_panel_consensus

private.tcj_human_review_queue
private.tcj_human_judgments

private.tcj_contrast_families
private.tcj_contrast_items
private.tcj_contrast_human_validation

private.tcj_assurance_packs
private.tcj_assurance_pack_items
private.tcj_assurance_pack_exposures

private.tcj_item_health
```

The existing TCJ run tables remain authoritative for individual model runs:

```text
private.tcj_evaluation_runs
private.tcj_guard_applications
private.batch2_tcj_links
```

Panel tables link to those underlying run records rather than duplicating or overwriting them.

---

## 5. Security verification

For every new private TCJ table:

```text
RLS enabled                true
anon direct SELECT         false
authenticated direct SELECT false
```

No public RLS policy was added merely to silence the database linter. These research tables are intentionally server-mediated.

The Supabase security advisor reports `rls_enabled_no_policy` INFO on these private tables because they are deliberately inaccessible to browser roles. Existing project-wide legacy security warnings remain separate from this TCJ implementation and were not introduced by these migrations.

---

## 6. Historical evidence backfill

Three evidence sets now exist:

```text
TCJ-LEGACY-CALIBRATION-36-v1
  bank    calibration
  status  legacy_exposed

TCJ-JUDGE-QUALIFICATION-v1
  bank    qualification
  status  draft

TCJ-ASSURANCE-HOLDOUT-v1
  bank    assurance
  status  draft
```

Backfill state:

```text
legacy evidence items            36
legacy item-health records       36
historical judge candidates       3
historical preliminary Passports  3
historical dimension metrics     18
```

The historical judge records are preliminary only:

```text
Qwen 3.6-27B via Groq
GPT-OSS 20B via Groq
GPT-OSS 120B via Groq
```

Their historical 36-case results are useful screening evidence but cannot establish formal production qualification because the bank is already exposed to methodology development.

---

## 7. Judge Admission campaign created

Draft campaign:

```text
campaign_key      TCJ-JUDGE-ADMISSION-2026Q3-v1
protocol_version  TCJ-JUDGE-ADMISSION-v1
profile           answers-bff-v2
stage_a_scenarios 10
status            draft
```

No fresh candidate set, Stage A scenario set, generation, or human Stage A decision has been frozen yet.

This is intentional: candidate identities should remain private from the native reviewer until the protocol-defined reveal point.

---

## 8. Blind admission backend deployed

Edge Function:

```text
tcj-admission-admin v1
verify_jwt = true
```

The function:

- accepts only the Flipgazine production origin;
- requires a valid authenticated session;
- verifies the session against `auth.sessions`;
- verifies Flipgazine admin authority;
- exposes only blind review material;
- never joins or returns provider/model identity during Stage A;
- supports `status`, `next_review`, `save_review`, and `review_summary`;
- freezes ACCEPT / EDIT / REWRITE decisions append-only for the reviewer;
- does not expose a reveal action.

Repository mirror:

`supabase/functions/tcj-admission-admin/index.ts`

---

## 9. Blind Stage A review surface deployed

Live private/admin page:

```text
/tcj-admission-review.html
/fg-page-tcj-admission-review-v1.js
```

The page shows only:

```text
opaque response ID
scenario
phenomenon label where supplied
Thai candidate response
ACCEPT / EDIT / REWRITE
optional reason tags
optional private note
```

It does not display candidate provider, model, family, candidate grouping or candidate aggregate performance.

The page is safe to load before Stage A material exists; the current campaign remains `draft` and review is not writable until the candidate set is explicitly frozen.

---

## 10. B2-0021–0040 research rerun path prepared

The approved first TCJ persistence experiment must evaluate the **pre-human frozen raw drafts**, because those are the exact texts the human ACCEPT / EDIT / REWRITE decisions judged.

Using corrected final Thai would answer a different research question and is therefore prohibited for this comparison.

Existing secure internal path remains:

```text
batch2-qwen-audit v3
    ↓ server-to-server internal key
tcj-engine v2
```

Because `batch2-qwen-audit` deliberately rejects browser-origin calls, a new admin-only proxy was added without weakening that boundary:

```text
tcj-research-admin v1
verify_jwt = true
```

Flow:

```text
Authenticated developer browser
        ↓
tcj-research-admin
  active session + FG admin check
        ↓ server-side, no browser Origin
batch2-qwen-audit v3
        ↓ existing internal credential
tcj-engine v2
        ↓
append-only calibration_rerun evidence
```

The proxy is resumable and runs one source row per call.

Live control page:

```text
/tcj-research.html
/fg-page-tcj-research-v1.js
```

The page targets exactly:

```text
B2-0021–B2-0040
stage = pre_human
action = research_rerun
profile = answers-bff-v2 through canonical TCJ routing
```

No rerun had been executed at the time this checkpoint was written. Running the page requires the user's live Flipgazine developer session, which is intentionally not available to server maintenance tooling.

---

## 11. Performance-advisor follow-up

The Supabase performance advisor identified missing covering indexes on several new foreign-key paths.

Migration `20260819230014_tcj_measurement_fk_indexes` added indexes for:

```text
admission campaign candidate → judge
admission generation → scenario
admission generation → judge
Assurance exposure → pack
Assurance pack item → evidence item
human review queue → evidence item
human review queue → panel run
Judge Passport → evidence set
Panel member → evaluation run
Panel member → judge
Panel member → Passport
Panel run → evidence set
```

Newly created indexes may initially appear as unused until the corresponding workflows begin accumulating queries; that is expected at this stage.

---

## 12. Current completion state

```text
TCJ Standard baseline                         LIVE / unchanged
architecture weakness patches                COMPLETE
Measurement schema                           COMPLETE
legacy evidence classification               COMPLETE
historical preliminary Passports             COMPLETE
FK performance follow-up                     COMPLETE
Judge Admission campaign shell               COMPLETE
blind Stage A backend                        COMPLETE
blind Stage A review page                    COMPLETE
B2 clean20 rerun secure proxy/page            READY · not yet run
fresh Stage A scenarios                      NOT FROZEN
fresh candidate set                          NOT FROZEN
Stage A generations                          NONE
Stage A human decisions                      NONE
Stage B robustness battery                   NOT RUN
blind meta-review                            NOT RUN
formal qualified Passports                   NOT ASSIGNED
Panel shadow runtime                         NOT BUILT
human escalation automation                  NOT BUILT
fresh Qualification Bank content             EMPTY
Thai Pragmatic Contrast Bank content         EMPTY
Assurance Holdout content                    EMPTY
probabilistic consensus                      NOT JUSTIFIED YET
correlated-error treatment                   NOT JUSTIFIED YET
General-v2 native multi-rater evidence        NOT STARTED
production Panel                             NOT LIVE
production Assurance                         NOT LIVE
```

---

## 13. Next execution order

The immediate next actions are:

```text
1. run B2-0021–0040 pre-human TCJ calibration rerun through /tcj-research.html
2. verify tcj_evaluation_runs / tcj_guard_applications / batch2_tcj_links are populated correctly
3. compute raw-vs-calibrated-vs-human comparison
4. privately freeze fresh Judge Admission candidate set
5. author/freeze the same 10 Stage A Thai scenarios
6. generate and globally randomize candidate outputs
7. open /tcj-admission-review.html for blind native-human review
```

The first action requiring the user's own browser session is Step 1. The first action requiring native-human linguistic judgment is Step 7.

---

## 14. Timeline

The governing architecture records the realistic completion window:

```text
engineering foundation                  ~4–7 focused working days
first qualified Panel evidence          ~5–10 calendar days
Assurance-quality hidden evidence       ~2–3 weeks
General-v2 / external validation        ~3–6 weeks depending reviewer access
```

Earliest credible full-architecture completion remains **mid-to-late September 2026**, with a conservative **late September to early October 2026** window.

Dates never override the acceptance gates.

---

## 15. Governing rule

> **Do not promote complexity merely because it can be implemented. Every TCJ layer must correspond to a measurable failure mode, and every production claim must be backed by evidence that was not used to manufacture the claimed result.**
