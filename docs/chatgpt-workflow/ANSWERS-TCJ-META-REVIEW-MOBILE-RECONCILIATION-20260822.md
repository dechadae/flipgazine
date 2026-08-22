# TCJ — Blind Meta-Review Mobile Response Reconciliation

**Date:** 22 August 2026 (Thailand)  
**Campaign:** `TCJ-JUDGE-ADMISSION-2026Q3-v1.2`  
**Protocol:** `TCJ-JUDGE-META-REVIEW-v1`

## Incident

During the first operator-triggered blind meta-review run on a mobile browser, the UI reported:

- `1` frozen review
- `5` remaining
- `Failed to fetch`
- apparent UI state `Error`

The operator stopped and did not manually retry.

## Authoritative reconciliation

Server and database inspection established that this was a browser/network response-loss event, not a reviewer/provider evidence failure.

The relevant long Edge Function request completed with HTTP `200` after approximately `105168 ms`. The response was no longer available to the mobile browser, but the server-side transaction completed normally.

Post-incident authoritative state:

- valid frozen meta-reviews: `2`
- pending meta-reviews: `4`
- recorded attempts: `2`
- contract failures: `0`
- infrastructure failures: `0`
- sealed candidate identities: `3 / 3`
- identity reveal: not performed
- campaign meta-review freeze: not yet reached

The two completed reviews are one ChatGPT and one Grok review for the same first anonymous dossier. Both are immutable frozen evidence and must not be rerun.

## Root cause

The v1 browser controller treated a rejected/lost `fetch()` response as a terminal UI error even though the Edge Function could continue running and commit its result after the mobile connection stopped waiting.

This was a control-plane presentation/reconciliation defect. It did not alter reviewer outputs, evidence hashes, reviewer independence, dossier contents, or the blindness protocol.

## Repair

The live meta-review page now uses:

- `/fg-page-tcj-meta-review-v2.js`
- page version `2`

Controller v2 changes the failure behavior:

1. A browser-level network/fetch loss does **not** trigger another reviewer call.
2. The controller enters `reconciling` state.
3. It polls the authoritative `status` endpoint.
4. It advances only after server-side progress is observed through valid/pending/attempt counts.
5. If the original server request eventually freezes the review, the controller continues from the new frozen state without resubmitting that review.
6. If no progress can be confirmed for three minutes, it stops safely and disables manual continuation pending server inspection.
7. Confirmed protocol/provider validity failures remain blocking errors and are not converted into connection-recovery behavior.

## Methodological consequence

No evidence invalidation is required. The two frozen reviews remain admissible because each was produced exactly once under the frozen blind meta-review contract and persisted before any subsequent reviewer call.

The UI incident itself is operational provenance only.

## Next valid action

Reload `/tcj-meta-review.html?v=2`. It should reconcile to `2 / 6` frozen and `4` remaining. A single operator press may then resume the remaining four reviewer slots. If a long mobile request loses its browser response again, controller v2 must reconcile server state rather than resubmit the unresolved slot.
