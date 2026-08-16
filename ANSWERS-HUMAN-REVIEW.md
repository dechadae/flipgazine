# The Book of Answers — Thai Human Review Protocol

**Review round:** `thai-human-v1`  
**Frozen source:** `/wip/answers-human-review-source-v118-948.js`  
**Source controller version:** `v118`  
**Source MD5:** `6fdb83f33f1cf768d97a190be8279777`  
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

## Completion criterion

The round is complete only when:

```text
948 / 948 answers
status ∈ {approved, edited}
source_version = 118
source_md5 = 6fdb83f33f1cf768d97a190be8279777
```

No `draft` or missing record counts as reviewed.

At completion, the final reviewed Thai can be applied back to the live canonical answer rows in one controlled publication pass. That publication must preserve answer IDs, English copy and semantic metadata unless a separate approved task explicitly changes them.

## Editorial authority

Thai review should follow:

`ANSWERS-VOICE-TONE.md`

The reviewer may intentionally prefer natural Thai implication, omission, particles, queer/camp timing, modern slang, code-switching and spoken rhythm over textbook grammatical completeness.

Line breaks are authored language data and must be preserved exactly.

## Dataset provenance statement after completion

Once the completion criterion is verified, the project may accurately describe the Thai corpus along these lines:

> Every Thai answer in this corpus was individually reviewed by a human editor. Each item has an auditable approval or human-edit record tied to a frozen source corpus and timestamped reviewer identity.

This statement should not be used before the review round reaches 948/948 completed records.
