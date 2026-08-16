# The Book of Answers — Thai Human Review Protocol

**Review round:** `thai-human-v1`  
**Frozen source:** `/wip/answers-human-review-source-v119-948.js`  
**Source controller version:** `v119`  
**Source MD5:** `6dc18662953f897a390eea0a038f0edf`  
**Frozen authored answer count:** `948`

This document defines the human editorial review round for the Thai answer corpus in **The Book of Answers**.

The purpose of this round is to establish a clean provenance layer showing that every Thai answer has been individually read and either approved or edited by a human reviewer. The review is not performed against a moving live corpus. It is tied to the frozen source above.

## Review interface

Internal page:

`/answers-thai-review.html`

Controller:

`/fg-page-answers-thai-review.js`

The review interface deliberately shows **Thai only**. English adaptation is hidden so that English wording cannot influence Thai rhythm, implication, slang, code-switching or line composition during the human review.

Each answer is presented in its existing authored line structure inside a textarea. Pressing Enter inserts a real authored line break. No keyboard shortcut intercepts Enter.

## Review states

Each answer can have one of three stored states:

- `draft` — the reviewer has edited the answer, but has not approved it yet;
- `approved` — the reviewer approved the frozen Thai answer without changing it;
- `edited` — the reviewer changed the Thai answer and approved the human-edited result.

Only `approved` and `edited` count as completed human review.

## Database audit record

Review records are stored in:

`public.answers_thai_reviews`

Each record preserves:

- review round;
- answer ID;
- frozen source path;
- frozen source version;
- frozen source MD5;
- original Thai;
- reviewed Thai;
- review status;
- reviewer user ID;
- review timestamp;
- update timestamp.

The table is protected by RLS and is writable only by an authenticated Flipgazine admin reviewing their own records.

The database also enforces review-state integrity:

- `approved` requires `reviewed_thai = original_thai` and a non-null `reviewed_at`;
- `edited` requires `reviewed_thai <> original_thai` and a non-null `reviewed_at`;
- `draft` does not count as completed review.

This means buyer-facing before/after evidence is not inferred from a UI label; the stored text itself must agree with the review state.

## Completion criterion

The round is complete only when:

```text
948 / 948 answers
status ∈ {approved, edited}
source_version = 119
source_md5 = 6dc18662953f897a390eea0a038f0edf
```

No `draft` or missing record counts as reviewed.

At completion, the final reviewed Thai can be applied back to the live canonical answer rows in one controlled publication pass. That publication must preserve answer IDs, English copy and semantic metadata unless a separate approved task explicitly changes them.

## Editorial authority

Thai review should follow:

`ANSWERS-VOICE-TONE.md`

The reviewer may intentionally prefer natural Thai implication, omission, particles, queer/camp timing, modern slang, code-switching and spoken rhythm over textbook grammatical completeness.

Line breaks are authored language data and must be preserved exactly.

## Buyer-facing comparison / preference-pair export

The human-review records must remain extractable after completion as evidence of the difference between the frozen pre-review corpus and the human-reviewed Thai.

There are two commercially useful buckets:

### 1. Human accepted as-is

Rows with:

```text
review_status = approved
original_thai = reviewed_thai
```

These show that a human Thai editor individually read the item and accepted the pre-review wording without modification.

They are useful as **human-validated positive examples**.

### 2. Human edited preference pairs

Rows with:

```text
review_status = edited
original_thai != reviewed_thai
```

These are the most important comparison assets. Each row preserves:

```text
pre-human-review Thai
→ human-edited Thai
```

They can demonstrate concrete corrections in areas such as:

- translated-sounding Thai;
- over-complete grammar;
- unnatural explicit subjects/objects;
- weak implication or omission;
- particles and social register;
- contemporary slang;
- Thai/English code-switching;
- queer/camp timing;
- humor and punchline rhythm;
- line breaks as breath/body-language cues;
- word choice and native conversational cadence.

For machine-learning use, these edited rows can later be exported as **preference pairs** analogous to rejected/preferred examples, subject to accurate provenance wording.

### Required export fields

A canonical completed-review export should preserve at least:

```text
answer_id
review_round
source_path
source_version
source_md5
original_thai
reviewed_thai
review_status
reviewer_user_id or buyer-safe reviewer attestation
reviewed_at
```

A derived `changed` boolean may be included, but the original and reviewed strings must remain the source of truth.

For research/commercial packaging, semantic metadata may later be joined by `answer_id` from the **frozen source corpus**:

```text
focus
topics
support
helpers
```

Do not join against an unrelated future moving corpus when creating historical evidence.

### Export formats

After review completion, preserve at least these deliverables:

1. **Full reviewed corpus** — all 948 rows, suitable for CSV/JSONL.
2. **Edited preference-pair subset** — only `review_status = edited`, with exact before/after Thai.
3. **Accepted-as-is subset** — only `review_status = approved`.
4. **Human-readable comparison sample** — selected before/after pairs rendered with authored line breaks intact for buyer/demo material.
5. **Provenance manifest** — frozen source version/hash, review round, counts, timestamps and review methodology.

Do not destroy or overwrite `original_thai` after the reviewed Thai is promoted to production. The before/after relationship is part of the dataset asset.

### Accurate commercial wording

Do **not** automatically describe every `original_thai` row as a pure AI-generated output. The frozen v119 corpus already contains a mixture of AI-assisted writing and earlier direct human corrections.

The defensible description is:

> **Pre-human-review source → individually human-reviewed final Thai.**

For rows where independent provenance proves an untouched model draft followed by a human correction, those may additionally be labeled as true **model draft → human correction** preference pairs.

This distinction makes the evidence stronger, not weaker, because the provenance claim remains precise.

## Dataset provenance statement after completion

Once the completion criterion is verified, the project may accurately describe the Thai corpus along these lines:

> Every Thai answer in this corpus was individually reviewed by a human editor. Each item has an auditable approval or human-edit record tied to a frozen source corpus and timestamped reviewer identity.

For the edited subset, it may additionally state:

> Human-edited items preserve the exact pre-review Thai and final human-reviewed Thai as paired evidence of the editorial correction.

These statements should not be used before the review round reaches 948/948 completed records.
