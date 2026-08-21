# TCJ Measurement System — Implementation Checkpoint · 20 August 2026

> **Historical implementation checkpoint.** Stage A and the measurement foundation remain authoritative evidence. Stage B execution and the immediate-next-action text in this document are superseded by the Stage B v1.1 remediation/CARE records and `ANSWERS-TCJ-ROBUSTNESS-V1-COMPLETION-AND-PERTURBATION-DRAFT-20260821.md`.

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

---

## 16. Live advancement checkpoint · 20 August 2026 · Stage A frozen / Stage B ready

This section supersedes the earlier current-state snapshot in Sections 7–13 where the later live state differs.

### 16.1 Admission campaign provenance

The first two fresh admission attempts remain preserved as aborted provenance:

```text
TCJ-JUDGE-ADMISSION-2026Q3-v1     aborted before human review
TCJ-JUDGE-ADMISSION-2026Q3-v1.1   aborted before human review
```

They were not deleted or repurposed.

The clean campaign is:

```text
TCJ-JUDGE-ADMISSION-2026Q3-v1.2
protocol TCJ-JUDGE-ADMISSION-v1.2
profile  answers-bff-v2
```

It generated 30 / 30 valid Stage A responses for three sealed candidates across the same ten frozen scenarios and globally randomized them into one 1–30 blind review order.

### 16.2 Stage A human review is complete and frozen

Live native-human evidence passed the freeze gate:

```text
active reviews                 30 / 30
blind reviews                  30 / 30
frozen reviews                 30 / 30
human-final Thai present       30 / 30
human-final SHA-256 valid      30 / 30
ACCEPT                          9
EDIT                            7
REWRITE                        14
voided invalid historical row   1  (preserved provenance)
```

All ACCEPT rows use the candidate text as `human_final_text`. All active EDIT/REWRITE rows contain changed human-final Thai. The earlier one-tap EDIT produced before human-final capture was corrected remains voided/versioned with its reason and does not count toward active review evidence.

Migration:

```text
20260820130350_tcj_admission_stage_a_freeze_stage_b_foundation
```

The migration re-ran the full 30-review integrity gate atomically before allowing the transition. It then set:

```text
campaign status           human_review_frozen
human_review_frozen_at    set
identity_revealed_at      null
```

Candidate identities remain sealed.

### 16.3 Anonymous Stage A summaries

The same migration created:

```text
private.tcj_admission_stage_a_summaries
```

There are exactly three frozen internal summary rows, one per sealed candidate. Each summary preserves counts and an evidence-manifest SHA-256 over the frozen Stage A evidence. These summaries are private/server-only; candidate-level performance is not returned to the browser before the approved reveal point.

### 16.4 Stage B persistence foundation

The Stage A freeze migration also created server-only persistence for judging-competence evidence:

```text
private.tcj_admission_stage_b_judgments
private.tcj_admission_stage_b_failures
private.tcj_admission_stage_b_summaries
```

All four new Stage A/Stage B tables have RLS enabled and no direct `anon` or `authenticated` SELECT privilege.

Performance follow-up migration:

```text
20260820131458_tcj_admission_stage_b_fk_indexes
```

adds the covering foreign-key indexes identified by the Supabase performance advisor for these new paths. Existing unrelated project advisor findings were intentionally left untouched.

### 16.5 Stage B runner

Live Edge Function:

```text
tcj-admission-stage-b v1
verify_jwt = true
```

Repository mirror:

```text
supabase/functions/tcj-admission-stage-b/index.ts
```

The runner is purpose-specific and server authoritative. It:

- requires the authenticated Flipgazine admin session and production origin;
- requires Stage A to be frozen and identity to remain unrevealed;
- uses only `TCJ-LEGACY-CALIBRATION-36-v1` with its permanent `legacy_exposed` / Calibration classification;
- treats the 36 cases as preliminary Stage B judging-competence evidence only;
- runs each sealed candidate independently on the same 36 cases;
- therefore expects 108 candidate × case judgments;
- uses one frozen structured judging contract;
- preserves raw structured output, normalized diagnosis, hashes, settings, usage and latency;
- retries only bounded transport failures;
- blocks on generation-contract failure rather than resampling until favorable;
- returns aggregate progress only to the browser;
- does not return candidate model, provider, family, grouping or candidate-level performance before reveal.

When all 108 valid judgments exist, the runner freezes three private Stage B summaries with per-dimension agreement/error evidence and preliminary failure metrics, then sets the campaign state to `stage_b_frozen` without revealing identity.

### 16.6 Expert-operable control surface

Live pages/controllers:

```text
/tcj-admission-review.html          v2
/fg-page-tcj-admission-review-v2.js

/tcj-stage-b.html                   v1
/fg-page-tcj-stage-b-v1.js
```

The Stage A page is now read-only after freeze and links into the approved next methodological action. The Stage B page shows only aggregate progress and the evidence-boundary warning; it does not receive sealed candidate metadata.

Because `tcj-admission-stage-b` requires the operator's live authenticated browser session, server maintenance tooling does not bypass that boundary. The domain expert initiates the approved Stage B run from `/tcj-stage-b.html`; the backend, not the browser, selects and persists each eligible sealed judgment.

### 16.7 Exact checkpoint after implementation

```text
TCJ Standard baseline                         LIVE / unchanged
current admission campaign                    v1.2
Stage A generation                            30 / 30 complete
Stage A human evidence                        30 / 30 frozen + integrity verified
Stage A anonymous internal summaries           3 / 3 frozen
candidate identities                          SEALED
Stage B runner/control surface                LIVE / ready
Stage B judgments                               0 / 108 at implementation handoff
Stage B summary                               NOT YET FROZEN
robustness battery                            NOT RUN
anonymous Judge Passport dossiers             NOT BUILT
blind ChatGPT + Grok meta-review              NOT RUN
identity reveal                               NOT PERMITTED YET
Panel production                              NOT LIVE
Assurance production                          NOT LIVE
```

The next valid action is to run Stage B through the authenticated control plane. After Stage B freezes successfully, verify its evidence and then implement/run the approved robustness battery before anonymous Judge Passport meta-review.
