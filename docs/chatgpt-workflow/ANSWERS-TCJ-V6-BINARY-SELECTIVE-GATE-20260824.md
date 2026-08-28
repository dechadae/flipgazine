# TCJ v6 Binary Selective Editor — Fresh Human Gate

Date: 24 Aug 2026

## Settled human contract

TCJ rewrite guidance is now deliberately binary.

- **SHIP** = the native editor would publish the exact finished draft unchanged.
- **REVISE** = the native editor would make any meaningful edit before publication.

REVISE explicitly includes shortening/compression, removing over-explanation, restructuring, house-voice correction, removing generic/model-like cadence, stance/certainty correction, semantic/pragmatic correction, factual correction, or composition correction.

A separate VOICE_POLISH state was rejected by native-human review. In the frozen v6 preflight, all 11 prior v5 misses were classified REVISE because shortening/editing the copy is itself revision.

Preflight protocol: `TCJ-SELECTIVE-VOICE-VS-REVISE-REVIEW-2026Q3-v6-preflight`

Preflight manifest: `bcbd3f65ac78caf4c6abba2b9845d0a6957e9ad9ab7404fb3a56b95f38d61538`

## Fresh v6 source bank

Evidence set: `TCJ-SELECTIVE-EDITOR-SOURCE-BANK-2026Q3-v6`

Evidence set id: `17`

Version: `binary-selective-v6`

Cases: **12**

Status: **frozen before generation**

Manifest SHA-256:

`30d2d02160ed47f91e40b3b1c7f61e6618edb2b79355823487976ac9503e9850`

Bank provenance records:

- correct/useful semantic meaning;
- neutral generic Thai source wording;
- no Answers-BFF performance leakage;
- no v4 reuse;
- no v5 reuse;
- no Qualification 2.0 reuse;
- created after the v5/preflight unblind.

## v6 experiment

Experiment key:

`TCJ-SELECTIVE-EDITOR-BINARY-GEMINI35-v6`

Model:

`gemini-3.5-flash-lite`

The baseline writer instruction is unchanged from v4/v5:

> Rewrite the SOURCE DRAFT as a natural reply from a close Thai friend/BFF to the SCENARIO. Preserve the useful meaning, but make the final Thai conversational and appropriate to the situation. Do not explain your choices. Output only the rewritten response.

Flow:

```text
fresh semantic skeleton
→ Gemini writes finished BFF draft
→ TCJ inspects exact finished draft
   → SHIP: preserve byte-for-byte; no second writer call
   → REVISE: one primary publishability problem + one short instruction
→ same Gemini edits CURRENT FINISHED DRAFT only when REVISE
```

The writer never receives raw private corpus rows, raw Voice Profile internals, corpus IDs, similarity data, or protected evidence. It receives only the current draft plus the bounded editorial instruction when revision is required.

## v6 worker

Development worker slot:

`tcj-rewrite-lift-neutral-gemini35-worker-v3`

The historical v5 implementation remains preserved as version 2.

Current v6 worker version: **3**

Current v6 worker SHA-256:

`c1797aeb182d383afae9ce47b9f47390cca277f88567413384a4ab200cbcea48`

The v6 decision schema is:

```json
{
  "decision": "SHIP | REVISE",
  "problem": "",
  "instruction": ""
}
```

SHIP requires empty `problem` and `instruction`.

REVISE requires exactly one primary publishability problem and one short actionable instruction. When the defect is over-length/generic elaboration, the instruction explicitly requires shortening/removal/compression rather than addition.

## Generation status

All **12/12** fresh trials are complete.

- terminal failures: **0**
- baseline request/response/output/hash integrity: **12/12**
- TCJ decision request/response/guidance/hash/protected-evidence integrity: **12/12**
- final output/hash integrity: **12/12**
- SHIP byte-preservation integrity violations: **0**
- REVISE targeted-rewrite evidence violations: **0**
- obvious private/internal leakage flags: **0**

The TCJ SHIP/REVISE distribution is intentionally **sealed until native-human review is frozen**. Do not expose it to the reviewer before unblinding.

### Provider-attempt preservation

`private.tcj_rewrite_provider_attempts_v6` is the immutable provider-attempt ledger for this experiment.

Successful baseline/editor/revision provider calls were backfilled from the preserved raw trial request/response fields after deployment handoff.

Five transient Gemini HTTP 429 retry events were also preserved:

- V6-008: three editor-stage retryable 429 events;
- V6-009: two baseline-writer retryable 429 events.

The pre-ledger worker did not retain the raw Gemini 429 error bodies; the ledger explicitly records that limitation and preserves the worker dispatch IDs/statuses from `net._http_response`. All affected cases later completed successfully.

## Active native-human gate

Protocol:

`TCJ-SELECTIVE-EDITOR-HUMAN-REVIEW-2026Q3-v6`

Status at checkpoint: **reviewing, 0/12**

Review URL:

`https://flipgazine.pages.dev/tcj-selective-editor-review-v6.html`

The reviewer sees only:

1. scenario;
2. generic semantic source as meaning reference;
3. raw Gemini finished draft;
4. SHIP / REVISE;
5. optional note.

TCJ's decision, problem, instruction, and revised output are hidden.

Human question:

> **Would you publish this exact finished response in Answers BFF without changing it?**

Human rule:

- **SHIP** = publish exact copy unchanged.
- **REVISE** = actually edit it before publication. If it should merely be shorter, that still counts as REVISE.

Review API:

`tcj-rewrite-lift-hard-review-v2`

Current review API version: **4**

Review API SHA-256:

`b80b1edd087570839ef73d82ab42b554bf006ec9b1ba343aaffa5afbf98b798c`

## Rollback and protected authority verification

v4 rollback worker was independently reverified after v6 generation:

- worker: `tcj-rewrite-lift-semantic-gemini35-worker-v4`
- version: **1**
- status: **ACTIVE**
- SHA-256: `813f6b91cd080ae125afd834eaaaa74c5a9ebb08fbe0e733517423cf70565c41`
- `updated_at` remains unchanged from its original deployment.

Qualification 2.0 remains protected and untouched:

- protocol: `TCJ-QUALIFICATION-2.0-2026Q3-v1`
- status: `human_frozen`
- human manifest: `07a25c08b331c215bf6a7378665726c376045bcb9d547d3cd21eaca22b51428d`
- bank manifest: `8e3d6c5fff4860f97bfbfcd8d69c46e5484da0d5c315ed6f4888d0061d09b7c8`
- machine exposure: **null**

No paid OpenAI/xAI calls were used for v6 development. Free Gemini only.

## Stop condition

Do not unblind, score, tune, regenerate, or modify v6 based on these 12 cases until the native human completes all 12 reviews.

After 12/12:

1. freeze the human review manifest before reading TCJ's hidden distribution;
2. compare SHIP/REVISE gate accuracy directly;
3. inspect missed/unnecessary interventions in plain human-editor language;
4. do not tune these same 12 cases;
5. only then decide whether a fresh revision-value test is warranted.
