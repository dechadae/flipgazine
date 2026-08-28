# TCJ Qualification v1 incident and v1.1 recovery

Date: 2026-08-22

## Status

Qualification v1 is permanently blocked as research evidence. Qualification v1.1 is the active recovery bank and is still private / human-review stage.

## Qualification v1 incident

Original run: `TCJ-JUDGE-QUALIFICATION-RUN-2026Q3-v1`

Original bank/protocol:
- `TCJ-JUDGE-QUALIFICATION-v1`
- `TCJ-JUDGE-QUALIFICATION-2026Q3-v1`

The first successful lifecycle start changed all 48 bank items from `private` to `qualification_exposed` and wrote one exposure event. The first evidence cell selected for provider execution was:

- evidence item: `QF-BFF-01`
- opaque judge: `J-57BE65E2`
- provider: `groq`
- model: `qwen/qwen3.6-27b`

The provider request completed far enough for the Edge Function to receive a provider response in memory. The subsequent insert into `private.tcj_qualification_attempts` failed the database CHECK `tcj_qualification_attempts_exact_request_text_check`.

Root cause: Qualification runner v1 attempted to reconstruct the exact JavaScript `JSON.stringify()` request bytes inside PostgreSQL from stored JSONB. A synthetic serializer test had matched, but the real request payload demonstrated that this reconstruction was not a reliable evidence-preservation mechanism.

Because the provider response existed only in Edge Function memory and the attempt-row insert failed, neither the exact provider response nor a valid immutable attempt record survived. Under the frozen research rules, rerunning the same cell cannot be treated as equivalent evidence.

Incident ledger:
- incident key: `TCJ-Q-RUN-2026Q3-v1-INC-001`
- class: `unlogged_provider_response`
- severity: `compromising`
- provider call reached: true
- exact request preserved as an immutable dispatch record: false
- exact response preserved: false

Disposition:
- v1 run -> `blocked`
- v1 protocol -> `compromised`
- v1 evidence set -> `compromised`
- exposure event retained; no rollback or deletion
- no qualification result or Passport authority may be derived from v1

## Why 47 cases may be carried forward

Runner v1 executes at most one evidence cell per `run_next` request. The sole failed execution request selected `QF-BFF-01 × J-57BE65E2`. Subsequent client traffic was status/reconciliation traffic and produced no qualification attempts, judgments, or failure rows.

Therefore the content of the other 47 cases was never delivered to a candidate judge. The bank-wide `qualification_exposed` flag was lifecycle activation metadata, not proof that every item had been included in a provider payload.

The recovery does not reset v1 to private. Instead it creates a distinct Qualification bank and copies only the 47 verified-undispatched cases into new private evidence rows with explicit source provenance.

## Qualification v1.1 recovery bank

Evidence set: `TCJ-JUDGE-QUALIFICATION-v1.1`
Protocol: `TCJ-JUDGE-QUALIFICATION-2026Q3-v1.1`
Profile: `answers-bff-v2`

Thresholds were not changed. v1.1 uses the same pre-registered threshold specification and SHA-256:

`b805b1f9484ea5ce576f09187c467b268c1f7c20263efa3889041680af426836`

Composition:
- 47 cases copied unchanged from v1 because those specific cases were never provider-dispatched;
- 47 corresponding frozen native-human reviews copied with `review_origin='carry_forward_verified_unexposed'` and `source_review_id` pointing to the original frozen review;
- 1 fresh BFF case replaces the provider-dispatched `QF-BFF-01`;
- 48 total cases;
- 8 BFF primary-target designs remain in the hidden construction layer;
- all 48 v1.1 evidence items are `private`;
- 0 v1.1 model attempts, judgments, failures, or exposure events exist.

The 47 carried-forward review contents are protected by a database trigger. They cannot be edited or deleted; the only permitted update is the draft -> frozen lifecycle transition performed when the v1.1 bank freezes.

The one fresh replacement is the only native-human review still required before v1.1 freeze. Its hidden construction target/design class is not returned by the review API.

Current v1.1 checkpoint at creation:
- protocol state: `draft_review`
- evidence-set state: `draft`
- target: 48
- reviewed: 47
- remaining: 1
- private items: 48
- carried reviews: 47
- fresh reviews: 0

Review Edge Function v4 points to v1.1 and is JWT protected.

## Runner v2 requirement before any v1.1 model call

Qualification v1.1 must not use runner v1.

Runner v2 must persist an immutable dispatch record **before** network transmission. The exact `requestJson` string that will be passed to `fetch()` must be written directly by the Edge Function; PostgreSQL must not reconstruct the JavaScript serialization from JSONB.

Each provider call must have its own dispatch record containing at least:
- run / item / judge identity;
- dispatch index and primary/repair role;
- exact serialized request-body text and SHA-256;
- exact system-prompt text and SHA-256;
- exact serialized user-payload text and SHA-256;
- parsed request JSONB and generation settings;
- dispatch timestamp.

Only after the dispatch transaction commits may the Edge Function call the provider. The response ledger then references the dispatch row and preserves exact HTTP response bytes/status, assistant output, parsing result, usage and latency.

If a committed dispatch exists with no corresponding response row, the system must treat the cell as an ambiguous provider interaction and block/escalate according to the frozen protocol. It must never silently resend the cell.

Transport retries require new dispatch rows. A semantic schema repair is allowed only after the primary provider response is durably preserved and shown to be schema-invalid. No hidden semantic resampling is permitted.

Qualification v1.1 may enter machine execution only after:
1. the one fresh native review is saved;
2. all 48 v1.1 review/text/hash integrity gates pass;
3. the v1.1 bank is frozen and its manifests independently recompute;
4. runner v2 / dispatch-before-fetch ledger is frozen and rehearsed without provider transmission;
5. a final zero-exposure checkpoint passes.
