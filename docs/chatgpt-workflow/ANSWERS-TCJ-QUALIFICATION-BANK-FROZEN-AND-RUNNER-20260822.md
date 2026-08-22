# TCJ Hidden Qualification Bank v1 — Frozen Human Gold + Qualification Runner

Date: 2026-08-22

## Human bank freeze

Protocol: `TCJ-JUDGE-QUALIFICATION-2026Q3-v1`

- 48 / 48 native-human reviews completed.
- 48 / 48 review hashes independently recomputed before freeze.
- 48 / 48 scenario hashes and candidate hashes matched the canonical evidence rows.
- 48 / 48 ratings passed the six-dimension validator.
- 48 / 48 items were still `private` at freeze.
- 0 Stage B judgments, 0 Stage B attempts, and 0 robustness source references pointed to this bank before freeze.
- Bank status after freeze: `frozen`.
- Protocol status after freeze: `bank_frozen`.
- Threshold SHA-256: `b805b1f9484ea5ce576f09187c467b268c1f7c20263efa3889041680af426836`.
- Evidence manifest SHA-256: `1bcc7cbe92d713449b220b5529f0272023bc99f1d90d4642c9ce54779cd3c499`.
- Human manifest SHA-256: `e06aa01c042bb7224f4002a9954d6c7e9f19cbf1118bcd2ef270a7e2547f83fd`.
- Evidence manifest and human manifest were independently recomputed after freeze and matched exactly.

## Frozen machine-run configuration

Run key: `TCJ-JUDGE-QUALIFICATION-RUN-2026Q3-v1`

- Run protocol: `TCJ-JUDGE-QUALIFICATION-RUN-v1`.
- Prompt: `TCJ-ANSWERS-BFF-v2@TCJ-CORE-v1`.
- Canonical core: `TCJ-CORE-v1` / blob `459d9831cf439696e0861f85c26839a43f6b6a64`.
- 48 frozen cases × 3 admitted judges = 144 expected evidence cells.
- Temperature: 0.
- Max completion tokens: 500.
- Response format: JSON object.
- Qwen adapter reasoning effort: `none`.
- GPT-OSS adapters reasoning effort: `low`.
- Semantic retry policy: one schema-only repair, then terminal; no semantic resampling.
- Transport retries are preserved as separate provider attempts and do not consume the one semantic repair.
- Frozen config SHA-256: `3723d69d601a18c707d7e6ac103c7fa22f6e26d1e661b8e917546ec267aab028`.

## Leakage boundary

Every judge request is constructed only from:

1. the frozen TCJ system rubric,
2. `question_or_scenario`,
3. `candidate_response`.

The following are explicitly excluded from judge payloads:

- human gold ratings,
- human severity,
- human confidence,
- human ambiguity marker,
- human review note,
- hidden `primary_dimension`,
- design class / construction note,
- qualification threshold specification,
- prior admission results,
- meta-reviews,
- Passport state.

## Evidence preservation improvements over Stage B

Each Qualification provider call preserves:

- parsed request payload JSONB,
- exact serialized request-body text,
- request SHA-256,
- exact system prompt text,
- system prompt SHA-256,
- exact serialized user-payload text,
- user payload SHA-256,
- exact provider HTTP response body,
- provider response SHA-256,
- extracted assistant output,
- assistant output SHA-256,
- parsed output when available,
- generation settings,
- usage,
- latency,
- attempt role and transport attempt index.

The exact-request serializer is private and reconstructs the frozen JavaScript `JSON.stringify()` field order from stored JSONB. Before model exposure it was cross-checked against an independently generated JavaScript-compatible serialization containing Thai, English, quotes, newlines, and backslashes; the SHA-256 matched exactly. All 48 frozen scenario/candidate texts were also scanned and contained no unusual control characters or backslashes. Database CHECK gates require every attempt's stored exact request/system/user text to recompute to its corresponding SHA-256.

Attempts, judgments, and summaries are append-only. Run configuration becomes immutable once frozen.

## Exposure transition

The 48 cases remain `private` until the first `run_next` call. The first model call atomically changes all 48 to `qualification_exposed` and changes the qualification protocol/run from frozen to running.

At the checkpoint recorded here:

- run state = `frozen`,
- protocol state = `bank_frozen`,
- 48 private items,
- 0 qualification-exposed items,
- 0 provider attempts,
- 0 qualification judgments.

## Runner / control surface

Edge Function: `tcj-qualification-runner` v1, ACTIVE, JWT protected.

Control page: `/tcj-qualification-run.html`

Controller: `/fg-page-tcj-qualification-run-v1.js`

The controller runs one evidence cell at a time, supports safe resume, and reconciles a dropped mobile response before sending another provider call. It stops at 144 / 144 evidence cells. It does not apply qualification thresholds or update Passports automatically.

## Post-run gate

After 144 / 144, do not derive qualification decisions immediately. First verify independently:

- exact cell cardinality,
- exact request-body hashes,
- exact system-prompt hashes,
- exact user-payload hashes,
- provider-response hashes,
- assistant-output hashes,
- parsed diagnosis hashes,
- one-repair semantics,
- provider/model pairing,
- zero unapproved resampling.

Only after that verification should the pre-registered threshold contract be applied per dimension and Judge Passports be updated.
