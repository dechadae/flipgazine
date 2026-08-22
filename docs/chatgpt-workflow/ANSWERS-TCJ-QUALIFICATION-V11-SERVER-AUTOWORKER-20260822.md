# TCJ Qualification v1.1 — Server Autoworker Execution Addendum

Date: 2026-08-22

## Purpose

This addendum records the server-owned execution layer added after `ANSWERS-TCJ-QUALIFICATION-V11-FROZEN-RUNNER-V2-CHECKPOINT-20260822.md`.

The frozen Qualification v1.1 protocol, evidence bank, human manifest, threshold manifest, candidate set, prompt contract, repair policy, and 144-cell target are unchanged. This layer changes only orchestration: the run no longer depends on a browser or phone remaining open.

## Server-owned execution

Live worker: `tcj-qualification-autoworker`
Worker contract: `TCJ-QUAL-AUTOWORKER-v1`
Run key: `TCJ-JUDGE-QUALIFICATION-RUN-2026Q3-v1.1`

Execution is driven by PostgreSQL `pg_cron` once per minute. The cron job calls the Edge Function through `pg_net` with a dedicated worker token stored in Supabase Vault. The worker token is not a browser credential and is not committed to GitHub.

The worker processes at most one ready evidence cell per tick. A database lease prevents concurrent workers from processing the same run simultaneously.

## Frozen-protocol invariants preserved

Before exposure the worker performs the real dispatch insertion inside a transaction and deliberately rolls it back. This proves that the exact serialized JavaScript request, system prompt, user payload, generation settings, and SHA-256 fields satisfy the production dispatch constraints without making a provider call or leaving a durable dispatch.

The irreversible start remains the existing atomic `tcj_begin_qualification_exposure_v2` transition. All 48 items are exposed together and the run/protocol transition to `running` only after the source-manifest and count gates pass.

Provider execution retains Runner v2 semantics:

1. Commit exact serialized dispatch before provider contact.
2. Make one provider request only after the dispatch commit succeeds.
3. Preserve exact provider response body and hash.
4. Project dispatch + response into the attempt ledger.
5. Validate diagnosis under the frozen TCJ contract.
6. Persist judgment only from preserved valid evidence.
7. Allow at most one schema-only repair; no semantic resampling.
8. Never silently resend a committed dispatch with no durable response.

## Automatic stop conditions

The worker disables itself and stops execution if any of the following appears:

- blocking or compromising research incident,
- stale committed dispatch without durable response,
- unresolved adapter/infrastructure blocker,
- source-manifest or frozen-state mismatch,
- non-retryable provider/evidence-contract failure,
- provider response that cannot be durably preserved,
- ambiguous post-dispatch network state.

HTTP 429/5xx responses can retry only after the failed response itself is durably preserved, using a new dispatch row and the preregistered retry policy.

## Transport normalization fix

The Edge/Postgres driver can bind JSON objects as JSON strings on some parameter paths. A narrow `BEFORE INSERT` normalization layer unwraps only that transport wrapper before the original JSON-object/hash CHECK constraints execute.

This does not relax the evidence constraints. The existing CHECK constraints remain authoritative and still recompute exact request/system/user hashes from stored strings.

## Diagnosis-hash projection correction

During independent verification after the first automated cells, the exact provider response, attempt projection, and normalized TCJ diagnosis were all preserved correctly, but the auxiliary `diagnosis_sha256` field on the first two judgment rows had been calculated before transport normalization.

Disposition:

- the two original judgment rows remain immutable;
- each diagnosis exactly equals the deterministic TCJ normalization of its preserved provider output;
- append-only hash attestations bind those rows to the canonical SHA-256 of the normalized diagnosis;
- one warning incident records the metadata-only projection defect;
- no provider rerun is permitted or required;
- a `BEFORE INSERT` canonicalization trigger now forces future `diagnosis_sha256` values to the hash of the normalized stored diagnosis object before commit.

Independent verification after the fix confirmed that new judgment rows carry the correct canonical diagnosis hash and that all historical mismatches are covered by valid attestations.

## Operational audit boundary

Autoworker state/events are operational metadata only. They are explicitly outside the frozen research evidence manifests and do not change human gold, thresholds, model outputs, judgments, or admission policy.

## Live checkpoint

At the independent canonical read during this addendum:

- run = `running`
- protocol = `running`
- evidence set = `frozen`
- 48 / 48 items qualification-exposed
- 11 dispatches
- 11 durable provider responses
- 11 attempts
- 11 valid judgments
- 0 terminal failures
- 0 active failures
- 0 blocking/compromising incidents
- 1 warning incident for the documented auxiliary diagnosis-hash projection correction
- 0 unattested diagnosis-hash mismatches
- worker enabled and healthy
- cron job `tcj-qualification-v11-autoworker` active once per minute

The live database remains the execution authority while the run is in progress.

## Post-run gate remains unchanged

Completion of 144 / 144 machine cells is not by itself authority to update Judge Passports. The pre-existing post-run integrity verification and frozen qualification thresholds must be applied first. Any step that requires native-human adjudication or a new research-policy decision remains a hard stop for automation.
