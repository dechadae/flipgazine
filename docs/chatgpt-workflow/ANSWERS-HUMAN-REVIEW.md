# The Book of Answers — Completed Thai Human Review & Provenance Record

**Review round:** `thai-human-v1`  
**Status:** **COMPLETE — 948 / 948**  
**Frozen source:** `/wip/answers-human-review-source-v119-948.js`  
**Source controller version:** `v119`  
**Source MD5:** `6dc18662953f897a390eea0a038f0edf`  
**Frozen authored answer count:** `948`

This document is the permanent protocol and provenance record for the completed Thai human-review round used by **The Book of Answers**.

The round was intentionally tied to one frozen source rather than a moving production corpus. Every answer was individually read by the human reviewer and ended in one of two completed states:

- explicitly accepted unchanged; or
- human edited and then explicitly re-approved.

The review table is now evidence. It is **not** a production editing table and must not be normalized after the fact.

---

## 1. Review interface and isolation

Internal review page:

`/answers-thai-review.html`

Controller:

`/fg-page-answers-thai-review.js`

Database table:

`public.answers_thai_reviews`

The interface showed **Thai only** during the review. Existing English siblings were intentionally hidden so English wording could not anchor Thai syntax, implication, lexical borrowing, humor or line composition.

Each answer was shown with its authored line breaks inside a textarea. Enter inserted a real authored line break. Line composition therefore formed part of the human editorial decision rather than being treated as post-render wrapping.

---

## 2. Stored review states

The review system supports:

- `draft` — edited but not yet re-approved;
- `approved` — frozen source Thai explicitly accepted unchanged;
- `edited` — Thai changed by the reviewer and explicitly approved.

Only `approved` and `edited` counted as completed review.

Editing an already completed row invalidated its approval until the revised wording was approved again.

Database integrity rules require:

```text
approved → reviewed_thai = original_thai
edited   → reviewed_thai != original_thai
completed → reviewed_at is non-null
```

This means before/after evidence is grounded in stored text, not merely a UI label.

---

## 3. Final completion result

The completed round was verified with:

```text
948 / 948 answers
status ∈ {approved, edited}
source_version = 119
source_md5 = 6dc18662953f897a390eea0a038f0edf
```

Final counts:

- **948 reviewed**
- **564 approved unchanged = 59.5%**
- **384 human edited = 40.5%**
- **0 drafts**
- **0 missing IDs**
- IDs exactly **1–948**
- **0 missing review timestamps**
- **0 source-version/hash mismatches**
- **1 reviewer identity** across the completed round

First formal review timestamp:

`2026-08-16 04:01:59.145+00`

Last formal review timestamp:

`2026-08-16 14:58:26.765+00`

Final structural QA found no trailing spaces, CR characters, unwanted terminal newlines, spaces around authored line breaks or double-space artifacts.

---

## 4. What the review changed

Across all 948 answers:

- **107 answers changed line count**;
- **55 answers gained lines**;
- **52 answers lost lines**;
- **36 edits changed only composition when all whitespace is ignored**;
- among those, **27 are strict newline-only edits with otherwise byte-identical text**;
- average pre-review Thai length: **36.4 characters**;
- average reviewed Thai length: **36.8 characters**;
- net change across the full corpus: **+436 characters**.

The review therefore changed **how Thai was expressed** much more than **how much information was present**.

This is one of the key findings of the corpus:

> **Large editorial impact. Almost no increase in information volume.**

The evidence supports analysis of pragmatic alignment, lexical choice, omission, register, social specificity, humor and line delivery. It does not justify invented category percentages unless the 384 edits are later exhaustively coded into a formal taxonomy.

---

## 5. Editorial authority used during review

Canonical editorial guide:

`ANSWERS-VOICE-TONE.md`

Central rule:

> **Thai is the original. English is the adaptation.**

The review permitted and often preferred:

- implication over explicit completeness;
- omitted subjects/pronouns when context carried them;
- particles as stance/performance choices;
- spoken/social rhythm over textbook grammar;
- socially specific Thai contexts over generic abstract advice;
- culturally recognizable humor over constructed cleverness;
- borrowed/embedded English when that was the natural Thai lexical item;
- Thai wording when visible English was less natural;
- authored line breaks as breath/timing/body-language cues.

### Borrowed English vs true code-switching

Latin script inside Thai discourse is **not automatically code-switching**.

Words such as `OT`, `deadline`, `mute`, `jobsdb`, `brief`, `timeline`, `chemistry` or `consistency` can function as ordinary lexical items inside Thai grammar and Thai social rhythm.

Reserve **code-switching** for a genuine discourse-level language change required by audience/context.

Do not describe the corpus as if “more English” or “more slang” makes Thai more contemporary. The review demonstrates the opposite in many cases as well.

---

## 6. Canonical review exports

The completed review was frozen into durable exports in Supabase `site_files`.

### Full completed review

JSONL:

`/wip/answers-thai-human-v1-complete-948.jsonl`

MD5:

`3e77b8e4f83ccb2ff9aecb2ba5e1f07b`

CSV:

`/wip/answers-thai-human-v1-complete-948.csv`

MD5:

`a1460783cab3bb3be5fb79b0e1518230`

Manifest:

`/wip/answers-thai-human-v1-manifest.md`

These exports preserve the review table as stored. Do not normalize `reviewed_thai`, punctuation or line breaks when generating derived datasets.

---

## 7. Required evidence fields

Canonical review evidence must preserve at least:

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

A derived `changed` field may be included, but the original/reviewed strings remain source of truth.

Semantic metadata may be joined by stable `answer_id` from the appropriate frozen corpus stage, for example:

```text
focus
topics
support
helpers
```

Historical evidence should not be reconstructed from an unrelated future moving corpus when the frozen source or canonical stage exists.

---

## 8. Two primary Thai evidence buckets

### A. Human accepted as-is

Final count:

**564**

Semantics:

```text
review_status = approved
original_thai = reviewed_thai
```

These are not “unreviewed negatives.” They are individually inspected **human-validated positive examples**.

### B. Human edited correction/preference pairs

Final count:

**384**

Semantics:

```text
review_status = edited
original_thai != reviewed_thai
```

Each preserves:

```text
pre-human-review Thai
→ human-edited Thai
```

These pairs are useful for studying failure modes including:

- English-first thought structure;
- over-complete grammar;
- unnecessary explicit subjects/objects;
- missed Thai implication;
- poor particle/register choice;
- decorative or unnatural English borrowing;
- overly generic social framing;
- culturally weak metaphors;
- constructed humor;
- line composition and timing.

Do not call every pair a true model-output preference pair unless independent provenance proves the original was untouched model output.

---

## 9. Accurate provenance language

The frozen v119 source contains AI-assisted writing **and** earlier direct human influence from development.

Therefore the default defensible description is:

> **Pre-human-review source → individually human-reviewed final Thai.**

For `edited` rows:

> **Pre-human-review Thai → human-edited Thai.**

For `approved` rows:

> **Pre-human-review Thai → explicitly human-accepted unchanged.**

Only when a specific item has independent provenance proving an untouched model draft should it be labeled:

> **model draft → human correction**

Precision strengthens the dataset claim.

---

## 10. Publication lineage after review

The completed review was applied through deliberately separated stages.

### v119 — frozen review source

`6dc18662953f897a390eea0a038f0edf`

### v120 — reviewed Thai only

Path:

`/wip/fg-page-answers-v120-thai-human-v1-preview.js`

MD5:

`7773badc93f5d8887945729c2ea1703f`

Exactly the 384 human-edited Thai fields changed from v119. English and non-Thai structure remained unchanged.

### v121 — English adaptation

Path:

`/wip/answers-human-thai-english-v121-preview.js`

MD5:

`235e80362da4bf4a3543692311140a0f`

The English adaptation audit changed 140 English siblings.

Audit evidence:

`/wip/answers-english-v121-audit.jsonl`

MD5 `98ecf39199171ac6fc4c25c853b22432`

### v122 — bilingual QA / copy freeze

Canonical copy snapshot:

`/wip/answers-bilingual-canonical-v122-948.js`

MD5:

`d12ef72740edd955ddc11aedfe232c2c`

QA evidence:

- `/wip/answers-bilingual-v122-qa.jsonl` — `c5b4fdbba1971da5e7073a35340b9fb4`
- `/wip/answers-bilingual-v122-final-changes.jsonl` — `41d13215807b73b70036a87bc23a56c1`
- `/wip/answers-bilingual-v122-production-manifest.md` — `ee27c570e4ab5cd0126465d04933ebc2`

Final English result vs v120:

- **149 unique English siblings changed**;
- 145 on human-edited Thai rows;
- 4 on Thai rows accepted unchanged.

### v123 — current live controller state

Canonical runtime snapshot:

`/wip/answers-bilingual-canonical-v123-948.js`

MD5:

`4f4cebce4460cec5d826796cb119a5f3`

v123 changes **no Thai or English answer copy** from v122. It adds one routing dictionary alias:

```text
ทะเล → beach
```

Removing only that alias reconstructs the v122 MD5 exactly.

---

## 11. English adaptation evidence

The English layer was intentionally produced **after** Thai became canonical.

It is not a literal translation exercise. Final English is expected to preserve:

- recommendation direction;
- stance;
- emotional temperature;
- humor/camp weight where possible;
- practical/social meaning.

It may change joke mechanics or syntax to become natural English.

Examples from final QA:

### #552

Old English:

`Salary just arrived. Do not let every dream invoice you at once.`

Final:

`Payday just happened. Where did the money go?`

### #794

Old:

`Draft the resignation. Sleep once. Read it again.`

Final:

`Start the resignation letter. Sleep on it. Then think again.`

### #863

Old:

`When the rain arrives, loyalty to public transport may take the night off.`

Final:

`If it rains: Grab, come get me. I'm out.`

The completed English passes should not be described as pending in future documentation.

---

## 12. Buyer/research-facing dataset layers

Useful derived products include:

### Full reviewed corpus

All 948 review records with exact original/final Thai and provenance.

### Edited subset

384 correction/preference pairs.

### Accepted subset

564 individually human-accepted examples.

### Final bilingual corpus

Reviewed Thai + final v122/v123 English siblings + stable answer ID and appropriate semantic metadata.

### Human-readable case study

Selected before/after pairs with authored line breaks intact and qualitative annotations.

### Data card / provenance manifest

Methodology, stages, hashes, limitations and intended uses.

The review table itself must remain untouched while these derived products are generated.

---

## 13. Appropriate commercial/research claims

After completion, the project may accurately state:

> Every Thai answer in this 948-answer corpus was individually reviewed by a human editor against one frozen source. Each item has an auditable accepted-as-is or human-edited record tied to source version/hash and reviewer timestamp.

For the edited subset:

> Human-edited items preserve the exact pre-review Thai and final human-reviewed Thai as paired editorial evidence.

For the production corpus:

> The reviewed Thai was published in a Thai-only stage, followed by a separate English adaptation and bilingual QA stage, preserving an auditable language-production lineage.

Avoid claiming:

- that one reviewer represents all Thai speakers;
- that each original is pure AI output;
- that the corpus proves universal Thai correctness;
- that the asset is already “RLHF data” without specifying a training-task transformation;
- category-level correction percentages that have not been formally annotated.

---

## 14. Limitations

- One human reviewer does not represent every Thai region, age, gender, subculture or register.
- The corpus expresses one deliberate house voice and product context.
- Contemporary slang and lexical preferences can age.
- The qualitative Case Study categories are illustrative, not an exhaustive coded taxonomy.
- English siblings were editorially adapted/QA'd after Thai review; they were not independently reviewed through the same 948-item human acceptance protocol.

The evidence is strongest when used to study **editorial decisions and pragmatic alignment**, not to claim one wording is universally correct Thai.

---

## 15. Immutability rule

The completed `thai-human-v1` table and frozen exports are provenance evidence.

Do not:

- rewrite original Thai;
- rewrite reviewed Thai;
- normalize line breaks;
- change statuses;
- bulk-reapprove;
- delete rows;
- repoint rows to v122/v123;
- replace the frozen v119 source hash with the current production hash.

Production can continue to evolve through new versioned stages. The review evidence must continue to describe exactly what was reviewed on 16 August 2026.
