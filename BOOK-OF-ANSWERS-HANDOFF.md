# The Book of Answers — Operational Handoff

**Updated:** 16 August 2026  
**Project:** Flipgazine / The Book of Answers  
**Repository:** `dechadae/flipgazine`  
**Supabase project:** `sjpvhgxacsiorrtijqua`

> **Read this file first in a new Answers chat.**
>
> The corpus migration is COMPLETE. Thai human review, Thai application, English adaptation, bilingual QA and production promotion have all finished. Live production is now **v123**. Do not restart the v120/v121/v122 migration sequence.
>
> v122 remains the canonical **bilingual copy freeze**. v123 contains the same Thai/English copy and adds exactly one routing-dictionary alias: `ทะเล` → Focus concept `beach`.
>
> Re-query Supabase before any live write. Version/hash values below are a verified checkpoint, not permission to overwrite a newer live row.

---

## 1. Authority and precedence

Read before substantial Answers work:

1. `BOOK-OF-ANSWERS-HANDOFF.md` — current operational state and next work.
2. `ANSWERS-VOICE-TONE.md` — canonical Thai/English editorial authority and full-corpus case study.
3. `ANSWERS-HUMAN-REVIEW.md` — completed review protocol, provenance and evidence exports.
4. `AGENTS.md` — Flipgazine/Answers architecture, routing, ownership and QA rules.

Editorial precedence:

> **direct user-approved wording → voice guide → established human-reviewed corpus voice → generic grammar/style convention**

Architecture precedence:

> **current live Supabase state → this handoff → historical snapshots**

Historical `/wip/` stages are evidence/recovery artifacts, not parallel live truth.

---

## 2. Current verified production state

Verified 16 August 2026 after bilingual migration and the subsequent beach-alias routing fix:

| path | version | MD5 | chars |
|---|---:|---|---:|
| `/answers.html` | 99 | `ec265ada07b882356699ef6b118b0167` | 30691 |
| `/fg-page-answers.js` | **123** | **`4f4cebce4460cec5d826796cb119a5f3`** | 270978 |
| `/answers-admin.html` | 45 | `0c8ebc38df87f2acd5275ba081f1343b` | 15562 |
| `/fg-page-answers-admin.js` | 22 | `35153068bc4ade1e97ae9b0490bf2f65` | 25608 |
| `/answers-thai-review.html` | 2 | `4d01e1355f5bbe4a369723c752b677b1` | 8067 |
| `/fg-page-answers-thai-review.js` | 3 | `49455a79f6eff499f4f732f57d3f7e07` | 13053 |
| `/voice.html` | **11** | **`88d8f317d90dbe609c6697010dd456ca`** | 34561 |
| `/fg-devnav.js` | 29 | `679095417a3a8052624d648c86a6df76` | 29449 |

Most Answers owners are Supabase `public.site_files`. A content-only change there does **not** require a Cloudflare Pages redeploy.

---

## 3. Canonical corpus lineage

The production lineage is deliberately auditable:

### v119 — frozen pre-human-review source

- path: `/wip/answers-human-review-source-v119-948.js`
- MD5: `6dc18662953f897a390eea0a038f0edf`
- 948 normal authored answers
- frozen source for review round `thai-human-v1`

### v120 — human-reviewed Thai only

- path: `/wip/fg-page-answers-v120-thai-human-v1-preview.js`
- MD5: `7773badc93f5d8887945729c2ea1703f`
- exactly the **384** human-edited Thai fields changed from v119
- English and all non-Thai structure preserved from v119

### v121 — English adaptation

- path: `/wip/answers-human-thai-english-v121-preview.js`
- MD5: `235e80362da4bf4a3543692311140a0f`
- dedicated English adaptation pass using reviewed Thai as authority
- v121 changed 140 English siblings

### v122 — bilingual editorial QA / copy freeze

- path: `/wip/answers-bilingual-canonical-v122-948.js`
- MD5: `d12ef72740edd955ddc11aedfe232c2c`
- final bilingual copy freeze
- final English change set vs v120: **149 unique answer IDs**
- 145 of those belong to human-edited Thai rows
- 4 belong to Thai rows accepted unchanged
- separate QA pass inspected 11 problem rows; 2 refined already-changed IDs and 9 added new changed IDs

### v123 — current live controller/runtime state

- live `/fg-page-answers.js`
- canonical snapshot: `/wip/answers-bilingual-canonical-v123-948.js`
- MD5: `4f4cebce4460cec5d826796cb119a5f3`
- production manifest: `/wip/answers-bilingual-v123-production-manifest.md`

**v123 changes exactly one routing dictionary item from v122:** Focus concept `beach` gains alias `ทะเล`.

Removing only that alias from v123 reconstructs the v122 MD5 exactly. Therefore:

- Thai answer copy in v123 = v122;
- English answer copy in v123 = v122;
- v122 remains the canonical bilingual copy freeze;
- v123 is the canonical current live runtime/controller state.

Do not overwrite or rename the historical stages. Their separation is part of the provenance value.

---

## 4. Final Thai human-review evidence

Review round:

`thai-human-v1`

Table:

`public.answers_thai_reviews`

Frozen source:

- version 119
- MD5 `6dc18662953f897a390eea0a038f0edf`
- IDs 1–948

Final verified result:

- **948 / 948 reviewed**
- **564 approved unchanged = 59.5%**
- **384 human edited = 40.5%**
- **0 drafts**
- **0 missing IDs**
- **0 source-version/hash mismatches**
- one reviewer identity across the completed round

Editorial structure:

- 107 answers changed line count
- 55 answers gained lines
- 52 answers lost lines
- 36 edits are composition-only when all whitespace is ignored
- 27 of those are strict newline-only edits with otherwise byte-identical text
- average pre-review Thai: 36.4 characters
- average reviewed Thai: 36.8 characters
- net change across all 948: **+436 characters**

The review table is now evidence. **Do not clean, normalize, rewrite, bulk-approve or repurpose it as a moving production table.**

Canonical review exports:

- `/wip/answers-thai-human-v1-complete-948.jsonl` — `3e77b8e4f83ccb2ff9aecb2ba5e1f07b`
- `/wip/answers-thai-human-v1-complete-948.csv` — `a1460783cab3bb3be5fb79b0e1518230`
- `/wip/answers-thai-human-v1-manifest.md`

English/bilingual evidence:

- `/wip/answers-english-v121-audit.jsonl` — `98ecf39199171ac6fc4c25c853b22432`
- `/wip/answers-bilingual-v122-qa.jsonl` — `c5b4fdbba1971da5e7073a35340b9fb4`
- `/wip/answers-bilingual-v122-final-changes.jsonl` — `41d13215807b73b70036a87bc23a56c1`
- `/wip/answers-bilingual-v122-production-manifest.md` — `ee27c570e4ab5cd0126465d04933ebc2`
- `/wip/answers-bilingual-v123-production-manifest.md` — current runtime/copy distinction

---

## 5. Provenance language

Do not claim every v119 source answer was untouched AI output. The pre-review source already contained AI-assisted writing plus earlier direct human influence during development.

Default defensible wording:

> **pre-human-review source → individually human-reviewed final Thai**

For edited rows:

> **pre-human-review Thai → human-edited Thai**

For approved rows:

> **pre-human-review Thai → explicitly human-accepted unchanged**

The English layer is a later editorial adaptation from the reviewed Thai, not human review of an English source corpus in the same sense.

Do not casually label the asset “RLHF data.” More accurate descriptions include:

- human-reviewed correction corpus;
- acceptance/correction dataset;
- preference/evaluation corpus;
- production-derived Thai pragmatics dataset.

It can later be transformed for supervised preference/DPO/RLHF-style tasks when the task design and rights allow it.

---

## 6. Current corpus and routing invariants

Normal authored corpus:

- **948 answers**
- **75 Universal**
- **42 Support**
- **183 canonical Focus concepts**
- **3 CARE responses** handled separately before normal routing

Core principle:

> **Precision chooses the pool. Chance chooses the answer.**

Normal routing:

```text
CARE
→ semantic parsing
→ precise Focus / Topic / Helper owner
→ relevant Support joins
→ recent-answer handling
→ exactly 2 distinct random Universal answers join matched non-generic pools
→ uniform random final choice
```

If nothing is understood, use the full 75-answer Universal pool.

Focus = concrete subject owner.  
Support = secondary advice/action pattern.  
Universal = genuinely subject-neutral fallback/mix-in.

Do not reintroduce Router v4, score weighting, legacy parallel tag truth, or physical page depth as answer ID.

The v123 `ทะเล` alias is a routing vocabulary fix only; it does not alter the bilingual corpus copy.

---

## 7. Product invariant — this is not a chatbot

The public ritual remains:

```text
question
→ ถามดิ
→ question committed
→ tactile paper/book gesture
→ release/open
→ bilingual answer
→ ถามอีกดิ
```

Physical page depth is theatrical interaction, not answer selection.

The semantic system should remain invisible. The user should feel that the physical book answered them.

Public Answers remains intentionally headerless unless the user explicitly changes that direction.

The Three.js/book-mechanism experiment is a separate product thread. Do not mix mechanism experimentation with corpus/provenance work unless explicitly requested.

---

## 8. Thai editorial authority — distilled

Canonical guide:

`ANSWERS-VOICE-TONE.md`

Central principle:

> **Contemporary natural Thai is defined by choosing what a Thai speaker would naturally say in that exact social situation — including what they would leave unsaid.**

Hard rules supported by the completed 948 review:

- Thai thought first; do not construct English logic then translate it.
- Natural Thai may intentionally remain grammatically incomplete.
- Omit subjects/pronouns when context carries them.
- Particles carry stance and performance; they are not decoration.
- Specific social reality often beats abstract cleverness.
- Humor should be recognizable social performance, not a manufactured metaphor.
- Borrowed/embedded English is not automatically code-switching.
- Use English-origin vocabulary when it is the natural Thai lexical item.
- Remove English when Thai is the natural lexical item.
- Line breaks are authored language: width, breath, timing and body-language cues.
- CARE stays outside the playful house register.

Guardrail:

> **Do not imitate surface features. Learn the decision behind them.**

---

## 9. English adaptation authority

English is the sibling/adaptation, not the source.

The completed v121/v122 passes demonstrated the rule in practice:

- preserve recommendation direction;
- preserve certainty and emotional temperature;
- preserve joke/social intent;
- do not preserve Thai word order mechanically;
- do not preserve stale English metaphors when the reviewed Thai has moved elsewhere;
- write natural English in its own voice.

Examples from final QA include:

- #552: old salary/maxim wording → `Payday just happened. Where did the money go?`
- #794: `Sleep once` → `Sleep on it.`
- #863: abstract public-transport explanation → direct comic `Grab, come get me. I'm out.`

Final v122 English copy is frozen. v123 changes no English answer text.

---

## 10. Voice / case-study state

Live internal reference:

`/voice.html`

Current verified state:

- v11
- MD5 `88d8f317d90dbe609c6697010dd456ca`

It now contains:

- final 948-review statistics;
- methodology and limitations;
- hard rules vs observed tendencies;
- Thai before/after case studies;
- line-composition evidence;
- borrowing vs true code-switching distinction;
- completed v121/v122 English adaptation evidence;
- v122 copy-freeze vs v123 runtime distinction.

Do not regress it to a “first 400 reviews” checkpoint or say English validation is still pending.

---

## 11. Main live ownership map

### Public Answers

- `/answers.html`
- `/fg-page-answers.js`

Owns public ritual, CARE, routing, answer data, rendering, sharing, review mode and interaction state.

### Answers Library

- `/answers-admin.html`
- `/fg-page-answers-admin.js`

Owns answer editing and canonical semantic metadata. It is separate from Main Flipgazine Admin.

### Thai review evidence UI

- `/answers-thai-review.html`
- `/fg-page-answers-thai-review.js`
- `public.answers_thai_reviews`

The round is complete; this system is now primarily evidence/audit infrastructure.

### Voice

- `/voice.html`
- centralized diamond-menu link lives in `/fg-devnav.js`

### Shell/edge ownership

GitHub `flipgazine-root-3/` owns shell-level files such as `_worker.js`, redirects, service worker, manifests and edge social metadata.

Do not redeploy shell for an ordinary `site_files` content change.

---

## 12. Safe live-change discipline

Before a risky Answers controller change:

1. query current live version/hash;
2. identify the real owner;
3. create a timestamped `/wip/` backup;
4. stage a separate preview where practical;
5. prove anchor uniqueness before text surgery;
6. validate JS/newline boundaries;
7. validate answer count/IDs and semantic invariants;
8. promote exact approved bytes;
9. verify live MD5 afterward.

Do not blind-replace a 270k controller.

Do not edit the frozen v119/v120/v121/v122 historical stages in place.

---

## 13. What is finished

The following corpus/editorial phases are complete:

- corpus expansion to 948;
- Universal/Support/Focus architecture;
- vocabulary consolidation;
- frozen v119 review source;
- 948/948 human Thai review;
- human-review evidence exports;
- v120 exact Thai application;
- v121 English adaptation;
- v122 bilingual QA and copy freeze;
- production promotion;
- v123 beach alias routing fix;
- full Voice evidence/case-study upgrade;
- canonical Voice/Tone documentation upgrade.

Do **not** start these phases again merely because an older backup or stale chat mentions them.

---

## 14. Recommended next data/commercial phase

If the user wants to continue the corpus-as-language-asset work, the next useful phase is packaging rather than rewriting production copy.

Recommended deliverables:

### A. Final dataset package

Create clean, buyer/research-friendly derived outputs without changing the evidence table:

- full 948 reviewed Thai dataset;
- 384 edited preference/correction pairs;
- 564 accepted-as-is validations;
- final bilingual v122/v123 answer dataset;
- compact review-summary CSV;
- semantic metadata joined by stable answer ID where useful.

### B. Data card / methodology

Document:

- source creation;
- frozen v119 review protocol;
- human-review semantics;
- line-break treatment;
- v120/v121/v122 lineage;
- v123 runtime-only alias delta;
- intended uses;
- limitations;
- rights/provenance language;
- what claims the data does and does not support.

### C. Buyer-facing case study

Suggested thesis:

> **How to stop an LLM sounding like it thought in English and translated into Thai.**

Use selected before/after evidence, not invented category percentages.

### D. Final provenance freeze

Preserve immutable hashes/manifests for:

```text
v119 source
→ thai-human-v1 review evidence
→ v120 reviewed Thai
→ v121 English adaptation
→ v122 bilingual copy freeze
→ v123 live runtime state
```

These are documentation/data-product tasks. They should not change production copy unless a separately identified bug is found.

---

## 15. Current checkpoint in one sentence

**The Book of Answers now runs a 948-answer, human-reviewed bilingual corpus in live controller v123; Thai review and English adaptation are complete, v122 is the bilingual copy freeze, v123 adds only `ทะเล` → `beach`, and the next corpus-focused work is packaging/provenance/case-study rather than another migration.**
