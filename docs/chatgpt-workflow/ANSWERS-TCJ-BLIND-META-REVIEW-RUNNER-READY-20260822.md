# TCJ — Blind Meta-Review Runner Ready

**Status:** 3 ANONYMOUS DOSSIERS FROZEN · 6 REVIEW SLOTS PENDING · RUNNER READY · ZERO REVIEWER CALLS · IDENTITIES SEALED  
**Date:** 22 August 2026 (Thailand)  
**Campaign:** `TCJ-JUDGE-ADMISSION-2026Q3-v1.2`

## Foundation

Production migrations:

- `20260822004614_tcj_anonymous_passport_dossiers_and_meta_review_ledger`
- `20260822004837_tcj_blind_meta_review_runner_foundation`

Private evidence objects:

- `private.tcj_admission_passport_dossiers`
- `private.tcj_admission_meta_reviews`
- `private.tcj_admission_meta_review_attempts`

Exactly three immutable `TCJ-JUDGE-PASSPORT-DOSSIER-v1` dossiers exist and exactly six `TCJ-JUDGE-META-REVIEW-v1` reviewer slots exist: one ChatGPT slot and one Grok slot for each dossier.

## Blindness

Reviewer-visible dossier JSON contains no provider, candidate model, model family, judge-candidate database ID, identity state, or candidate mapping. The reviewer receives only the frozen anonymous dossier plus the shared review contract.

Neither reviewer receives the other review.

Candidate identities remain sealed until all six reviews pass the server-owned freeze gate.

## Review contract

Each reviewer must return independent recommendations for:

- intent
- thai_pragmatics
- bff_voice
- lexical_social_fit
- stance
- composition

Allowed recommendation states:

- qualified
- partially_qualified
- research_only
- rejected

The contract explicitly states that exposed Calibration evidence cannot be upgraded into clean Qualification or Assurance evidence by reviewer opinion.

One predefined schema-only repair is permitted. The repair instruction forbids changing substantive recommendations. A second contract failure blocks the protocol rather than resampling until favorable.

Transport failures use bounded retry. Non-retryable provider/credential failures become explicit infrastructure failures.

## Server-owned meta-review freeze

`private.tcj_try_freeze_meta_reviews(...)` transitions the campaign to `meta_review_frozen` only when:

- all three dossiers are frozen;
- exactly six independent review slots are valid and frozen;
- both reviewer slots exist per dossier;
- every review remains linked to the exact frozen dossier SHA-256;
- raw reviewer-output hashes verify;
- parsed-review hashes verify;
- all three candidate identities are still sealed.

Only after this transition may the approved identity-reveal step be considered.

## Runner and control plane

Edge Function:

- `tcj-admission-meta-review v1`
- JWT required
- admin-only

Live expert control surface:

- `/tcj-meta-review.html`
- controller `/fg-page-tcj-meta-review-v1.js`

The browser receives aggregate progress and reviewer-configuration readiness only. It does not receive dossier contents, candidate-level metrics, candidate mapping, or either reviewer output.

The runner uses current provider Responses APIs with environment-configurable reviewer model IDs. Defaults at implementation time are `gpt-5.6-sol` for the ChatGPT/OpenAI slot and `grok-4.6` for the Grok/xAI slot. Both reviewer credentials must be configured before any reviewer call is allowed.

## Current authoritative state

- perturbation v1: complete, 99 / 99 valid
- anonymous dossiers: 3 / 3 frozen
- meta-review slots: 6 pending
- meta-review attempts: 0
- valid meta-reviews: 0
- `meta_reviews_frozen_at`: null
- `identity_revealed_at`: null
- candidate identities: 3 sealed

## Next valid action

Open `/tcj-meta-review.html` and inspect reviewer configuration. If both reviewer credentials are ready, press **Run blind meta-review** once and leave the page open. If either credential is not configured, stop before execution and configure that reviewer rather than substituting a different model or weakening the two-reviewer requirement.

After six reviews freeze, independently verify all six raw/parsed hashes and the campaign meta-review freeze before revealing any candidate identity.
