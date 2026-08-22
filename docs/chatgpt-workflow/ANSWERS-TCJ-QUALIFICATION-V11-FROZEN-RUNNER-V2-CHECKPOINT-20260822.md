# TCJ Qualification v1.1 — Frozen Bank + Runner v2 Checkpoint

Date: 2026-08-22

## Purpose

This checkpoint replaces the compromised Qualification v1 execution path with Qualification v1.1 and Runner v2. Qualification v1 remains permanently blocked and auditable; it is not reset, deleted, or reused for authority.

## Frozen Qualification v1.1 bank

Evidence set: `TCJ-JUDGE-QUALIFICATION-v1.1`
Protocol: `TCJ-JUDGE-QUALIFICATION-2026Q3-v1.1`
Profile: `answers-bff-v2`

Composition:
- 48 total cases.
- 47 verified-undispatched v1 cases carried forward unchanged with frozen native-human gold.
- 1 fresh BFF replacement case received a new direct native-human review.
- 47 carried reviews are marked `carry_forward_verified_unexposed` and point to their original frozen review rows.
- Carried review content is database-immutable; only the draft -> frozen lifecycle transition was permitted.
- 48 / 48 reviews are now frozen.

Pre-freeze integrity gate:
- 48 reviews / 48 draft reviews before freeze.
- 47 carried reviews + 1 native-direct replacement review.
- 0 bad review hashes.
- 0 bad rating objects.
- 0 review scenario/candidate hash failures.
- 0 evidence scenario/candidate hash failures.
- 0 review/evidence hash mismatches.
- 0 gold mismatches.
- 48 / 48 evidence items private.
- 0 v1.1 runs, exposure events, attempts, judgments, or failures before freeze.

Expected manifests were independently computed before the freeze function was called:
- threshold SHA-256: `b805b1f9484ea5ce576f09187c467b268c1f7c20263efa3889041680af426836`
- evidence manifest SHA-256: `b4d45ad054fd96fbc4cde9dea3eca25f5afd367dd5f3515ee7537cd6ecc7c617`
- human manifest SHA-256: `2e72ec6a0850e92fa74f7ee658ac091c34ee1fb40d4e1db30a400d9c350d5be0`

Freeze result matched those values exactly. Post-freeze independent recomputation also matched exactly.

Post-freeze state:
- protocol = `bank_frozen`
- evidence set = `frozen`
- 48 frozen human reviews
- 48 private evidence items
- 0 qualification-exposed items

## Frozen Runner v2 configuration

Run key: `TCJ-JUDGE-QUALIFICATION-RUN-2026Q3-v1.1`
Run protocol: `TCJ-JUDGE-QUALIFICATION-RUN-v2`
Prompt: `TCJ-ANSWERS-BFF-v2@TCJ-CORE-v1`
Canonical core: `TCJ-CORE-v1`
Expected cells: 144

Frozen run config SHA-256:
`71132feec222c5bc45c30bdc0882f498c1aab103e2f7920648ecd7c63f1b8ac7`

The run configuration is bound to the threshold, human, and evidence manifests above.

## Runner v2 evidence contract

Runner v2 removes the failed v1 design where PostgreSQL attempted to reconstruct JavaScript `JSON.stringify()` request bytes after the provider call.

For every provider transmission Runner v2 now performs:

1. Build the exact request in the Edge Function.
2. Compute the exact JavaScript request string passed to `fetch()`.
3. Commit an append-only dispatch row containing:
   - run / evidence item / judge identity,
   - dispatch index and primary/repair role,
   - provider/model/endpoint,
   - parsed request JSON,
   - exact request body text + SHA-256,
   - exact system prompt text + SHA-256,
   - exact serialized user payload text + SHA-256,
   - generation settings.
4. Only after that database commit succeeds may `fetch()` contact the provider.
5. Preserve the exact provider HTTP response body in a separate append-only response ledger.
6. Project the durable dispatch + response pair into the legacy attempt ledger, now explicitly linked by `dispatch_id` and `response_id`.
7. Create a judgment only from a preserved valid attempt.

Database CHECK constraints recompute all exact request/system/user hashes from the stored exact strings. The attempt trigger no longer overwrites exact strings supplied by Runner v2 with a SQL reconstruction.

## Ambiguity policy

A committed dispatch with no durable response is never silently resent.

- While recent, it is treated as in-flight and the client reconciles server state.
- If it remains unresolved past the grace period, Runner v2 records a compromising `ambiguous_dispatch` incident and blocks the run.
- A fetch exception after a committed dispatch is immediately treated as ambiguous and compromising.
- If the Edge Function receives a response but normal response-ledger persistence repeatedly fails, the exact response body is written into the incident ledger as a forensic artifact and the run is blocked.
- HTTP 429/5xx responses may retry only after the failed response itself has been durably preserved; every retry gets a new dispatch row.
- Semantic output still receives at most one schema-only repair. There is no semantic resampling.

## Leakage boundary

Judge requests contain only:
- frozen TCJ system rubric,
- `question_or_scenario`,
- `candidate_response`.

They exclude:
- human ratings and severity,
- human confidence / ambiguity / notes,
- hidden primary dimension,
- design class / construction note,
- threshold specification,
- admission results,
- meta-reviews,
- Passport state.

## Exposure-transition rehearsal

The production exposure function and its database triggers were rehearsed inside an explicit transaction.

Inside the transaction the expected state was reached:
- run = running
- protocol = running
- 48 qualification-exposed items
- 1 exposure event

The transaction was then rolled back.

Authoritative state after rollback:
- run = frozen
- protocol = bank_frozen
- evidence set = frozen
- 48 private items
- 0 exposed items
- 0 exposure events
- 0 dispatches
- 0 responses
- 0 attempts
- 0 judgments

No provider call occurred during this rehearsal.

## Live control surface

Edge Function: `tcj-qualification-runner` v2, ACTIVE, JWT protected.

Control page: `/tcj-qualification-run.html`
Controller: `/fg-page-tcj-qualification-run-v2.js`

The page runs an authenticated zero-write `preflight` before enabling the Run button. Preflight builds the first real request without persisting or transmitting it and checks that the Edge Function and PostgreSQL hash the exact request/system/user strings identically.

The UI displays committed dispatches and durable responses separately. A mismatch is therefore visible rather than hidden behind a generic provider-call count.

## Final zero-exposure checkpoint before user run

At the final canonical read before handing the Run button back to the native owner:
- run = `frozen`
- protocol = `bank_frozen`
- evidence set = `frozen`
- run config hash valid
- run manifests bound to frozen source manifests
- 48 frozen reviews
- 48 private items
- 0 exposed items
- 0 exposure events
- 0 dispatches
- 0 responses
- 0 attempts
- 0 judgments
- 0 failures
- 0 v1.1 incidents
- control page version 2
- controller version 2

## Post-run stop gate

At 144 / 144, do not immediately derive authority. First independently verify:
- dispatch cardinality and per-cell ordering,
- dispatch request/system/user hashes,
- one durable response per completed dispatch,
- response hashes,
- attempt projection references and hashes,
- parsed diagnosis hashes,
- judge/provider/model pairings,
- retry semantics,
- schema-repair semantics,
- zero unapproved semantic resampling,
- exact expected-cell cardinality.

Only after that verification may the frozen qualification thresholds be applied and Judge Passports be updated. Assurance remains a separate later evidence stratum.
