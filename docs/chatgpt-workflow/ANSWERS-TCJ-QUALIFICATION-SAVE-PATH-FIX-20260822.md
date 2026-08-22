# TCJ Qualification Review — First Save Rollback and v2 Fix — 22 Aug 2026

Protocol: `TCJ-JUDGE-QUALIFICATION-2026Q3-v1`

## Incident

The native reviewer pressed `Save & next` on the first Qualification Bank case. The Edge Function returned HTTP 409 and the v1 controller refreshed the current unreviewed case, which visually looked like a reset.

Authoritative PostgreSQL state immediately afterward showed:

- human reviews: **0**
- draft reviews: **0**
- bank state: `draft`
- protocol state: `draft_review`
- private evidence items: **48 / 48**

Therefore the failed attempt produced no partial human evidence and no evidence mutation survived the transaction rollback.

## Root cause

PostgreSQL reported a violation of `tcj_qualification_human_reviews_ratings_check`, whose contract requires `ratings` to be a JSON object.

The browser payload itself was valid. A direct PostgreSQL validation of the six-rating shape returned `jsonb_typeof = object` and `private.tcj_qualification_ratings_valid(...) = true`.

The defect was the v1 Edge Function binding pattern `JSON.stringify(rr)::jsonb`, which could reach PostgreSQL as the wrong JSON type under the postgres.js interpolation path.

## Repair

`tcj-qualification-review` v2 now constructs ratings with PostgreSQL `jsonb_build_object(...)` directly for:

- human review hash input;
- evidence-item gold;
- review insert;
- review update.

The function additionally runs `private.tcj_qualification_ratings_valid(...)` before any write and aborts if that server-side check fails.

A zero-production-write temporary-table test using the exact shape shown in the failed first review — all six ratings `1`, severity `CRITICAL`, confidence `low` — passed both the JSON-object constraint and the six-dimension validator.

## UI hardening

Controller `/fg-page-tcj-qualification-review-v2.js` no longer refreshes the case after a save rejection. It preserves the reviewer's current selections and reports that nothing was saved.

The live page now points to controller v2.

## Evidence-validity conclusion

This was an implementation failure before the first human-label commit, not a research-evidence correction. No candidate model was called, no human gold was persisted, and the Qualification Bank remained fully private and editable throughout the repair.
