# The Book of Answers — Operational Handoff

**Updated:** 16 August 2026  
**Project:** Flipgazine / The Book of Answers  
**Repository:** `dechadae/flipgazine`  
**Supabase project:** `sjpvhgxacsiorrtijqua`

> **Read this file first in a new Answers chat.**
>
> The Thai human-review phase is now COMPLETE: all 948 answers were individually reviewed by the user against the frozen v119 source. The next mission is no longer review and is not the Three.js mechanism experiment. The next mission is the controlled corpus-application phase: freeze the evidence, build a staged Thai-reviewed v120, validate it, then adapt English siblings and complete final QA.
>
> Do not rely on old counts in `AGENTS.md`. Re-query Supabase before live writes.

---

## 1. Authorities and precedence

Read before substantial work:

1. `BOOK-OF-ANSWERS-HANDOFF.md` — this file; current operational state and next mission.
2. `ANSWERS-VOICE-TONE.md` — canonical Thai/English editorial rules. It currently predates the final 948-review statistics and must be upgraded later.
3. `ANSWERS-HUMAN-REVIEW.md` — review/provenance/export requirements.
4. `AGENTS.md` — broader Flipgazine architecture; some Answers snapshot numbers are stale.

Editorial precedence:

**direct user-approved wording → voice guide → established human-reviewed corpus voice → generic grammar/style convention**.

Architecture precedence:

**live Supabase state → current handoff → older repo snapshots**.

---

## 2. Final human-review milestone — COMPLETE

Review round:

`thai-human-v1`

Frozen source:

- path: `/wip/answers-human-review-source-v119-948.js`
- source version: **119**
- source MD5: **`6dc18662953f897a390eea0a038f0edf`**
- answer count: **948**

Database table:

`public.answers_thai_reviews`

Final live audit verified:

- **948 / 948 reviewed**
- **0 drafts**
- **0 missing IDs**
- IDs exactly **1–948**
- **0 missing `reviewed_at`**
- **0 source-version/hash mismatches**
- **1 reviewer identity** across all rows
- **0 broken approved semantics** (`approved` always equals source)
- **0 broken edited semantics** (`edited` always differs from source)
- first formal review timestamp: `2026-08-16 04:01:59.145+00`
- last formal review timestamp: `2026-08-16 14:58:26.765+00`

Final status split:

- **564 approved unchanged = 59.5%**
- **384 human edited = 40.5%**

Edit structure:

- **348** edits changed wording and/or punctuation
- **36** edits changed line composition only
- **107** answers changed line count
- **55** gained lines
- **52** lost lines

Length evidence:

- average pre-review Thai: **36.4 characters**
- average reviewed Thai: **36.8 characters**
- net change across all 948: **+436 characters**

This is important: the review changed how Thai is expressed far more than how much information it contains.

Final structural sweep across all 948 is clean:

- no trailing spaces;
- no spaces immediately before/after line breaks;
- no CR characters;
- no unwanted terminal newlines;
- no double-space artifacts.

**Do not edit or “clean up” the review table. It is now evidence.**

---

## 3. Provenance language — use precisely

Do not claim every original v119 Thai string was untouched AI output. Some source items already contained earlier human influence during development.

Default commercial/research wording:

**pre-human-review source → human-reviewed final**

For `edited` rows:

- `original_thai` = frozen pre-human-review source
- `reviewed_thai` = final human-edited preference

For `approved` rows:

- source was explicitly human-accepted unchanged

Only label an individual example **model draft → human correction** if its provenance independently proves that.

Do not casually call the dataset “RLHF.” It can support supervised correction, preference/evaluation tasks, or be transformed into DPO/RLHF-style formats later.

---

## 4. Current live Supabase owners

Verified after review completion:

| path | version | MD5 | chars |
|---|---:|---|---:|
| `/answers.html` | 99 | `ec265ada07b882356699ef6b118b0167` | 30691 |
| `/fg-page-answers.js` | **119** | **`6dc18662953f897a390eea0a038f0edf`** | 270553 |
| `/answers-admin.html` | 45 | `0c8ebc38df87f2acd5275ba081f1343b` | 15562 |
| `/fg-page-answers-admin.js` | 22 | `35153068bc4ade1e97ae9b0490bf2f65` | 25608 |
| `/answers-thai-review.html` | 2 | `4d01e1355f5bbe4a369723c752b677b1` | 8067 |
| `/fg-page-answers-thai-review.js` | 3 | `49455a79f6eff499f4f732f57d3f7e07` | 13053 |
| `/voice.html` | 7 | `571f9756780eef858a2391ad084f1b69` | 22932 |
| `/fg-devnav.js` | 29 | `679095417a3a8052624d648c86a6df76` | 29449 |
| `/wip/answers-human-review-source-v119-948.js` | 1 | **`6dc18662953f897a390eea0a038f0edf`** | 270553 |

The live controller is still v119. **The human-reviewed Thai has NOT yet been applied to production.**

`/voice.html` is a CI-style internal Voice reference page linked from the centralized diamond menu. Its evidence section still reflects the earlier 400-answer checkpoint and must later be upgraded to the full 948 evidence.

`/answers-admin.html` now includes a **Thai Audit ↗** button linking to `/answers-thai-review.html`.

---

## 5. Corpus / routing invariants — preserve exactly

Current normal corpus:

- **948 authored answers**
- **75 Universal**
- **42 Support**
- **183 Focus concepts**
- CARE handled separately before normal routing

Core routing principle:

> **Precision chooses the pool. Chance chooses the answer.**

Normal architecture:

```text
CARE
→ semantic parsing
→ precise Focus / Topic / Helper matching
→ relevant Support
→ recent-answer handling
→ exactly 2 distinct Universal answers join matched non-generic pools
→ uniform random choice inside eligible pool
```

If nothing is understood, use the full 75 Universal pool.

Do not reintroduce Router v4, legacy parallel tags, probability weighting, or physical page depth as an answer selector.

The next corpus apply must preserve:

- all 948 answer IDs;
- Focus/Topic/Helper metadata;
- Universal/Support assignments;
- Focus dictionary/index;
- CARE;
- routing and widening behavior;
- randomness behavior;
- runtime mechanics.

Only reviewed copy should change during the first apply step.

---

## 6. Thai voice — distilled full-review rules

Central principle:

> **Contemporary natural Thai is not defined by slang, English words, short sentences, or grammatical informality. It is defined by choosing what a Thai speaker would naturally say in that exact social situation, including what they would leave unsaid.**

Hard rules supported by the completed review:

- Thai thought comes first. Do not construct English logic then translate it.
- Natural Thai may intentionally leave meaning incomplete.
- Omit pronouns/subjects when context carries them.
- Particles are semantic/performance decisions, not decoration.
- Line breaks are authored language and body/breath rhythm, not mechanical wrapping.
- Humor should come from recognizable social reality rather than constructed cleverness.
- Specific Thai social/cultural references often beat abstract generic concepts.
- Do not insert English merely to sound modern.
- Do not translate naturally embedded English into stiff Thai merely because a Thai equivalent exists.
- CARE stays clear, direct and grounded outside the playful house register.

### Borrowed English is NOT automatically code-switching

This distinction is critical.

Contemporary Thai naturally incorporates foreign lexical items without necessarily switching languages.

Examples such as `deadline`, `meeting`, `mute`, `jobsdb`, `OT`, `GPS`, `read`, `Fit check`, `chemistry`, `consistency`, etc. can remain Thai discourse when Thai grammar/rhythm/social framing continues around them.

**True code-switching** means an actual discourse-level language shift because context/audience requires it.

Do not describe the corpus as “Thai speakers code-switch constantly.”

Also do not imitate surface features mechanically. Learn the decision behind the human preference.

---

## 7. NEXT CHAT MISSION — controlled v120 apply

The immediate mission is:

> **Freeze the completed human-review evidence, then create a staged v120 from v119 in which ONLY Thai answer strings are replaced by the final `reviewed_thai`, preserving every ID and every semantic/runtime invariant.**

Do not begin with English adaptation. First prove the Thai apply is exact.

### Step A — freeze review evidence

Before touching the controller, export/snapshot the completed `thai-human-v1` rows with at least:

- answer ID
- `original_thai`
- `reviewed_thai`
- `review_status`
- reviewer ID
- `reviewed_at`
- source path/version/hash
- review round

Preferred durable outputs later include CSV, JSONL and a human-readable Markdown/PDF comparison set.

The review table itself remains immutable evidence.

### Step B — build staged v120, Thai only

Use `/fg-page-answers.js` v119 as the production base.

For each answer ID 1–948:

- replace the canonical Thai string with exactly `reviewed_thai` from `thai-human-v1`;
- preserve authored line breaks exactly;
- do not normalize spelling, punctuation or borrowed English;
- do not touch the English sibling yet;
- do not change metadata or routing.

Stage to a clear `/wip/` preview first. Do not directly overwrite live v119.

Also create a `/wip/` backup of the current live v119 owner before promotion work.

### Step C — prove the Thai-only diff

Before any production promotion, validate mechanically that:

1. answer count remains exactly 948;
2. answer IDs remain exactly 1–948, same order;
3. for every answer, staged Thai equals `reviewed_thai` byte-for-byte;
4. every non-Thai field is identical to v119;
5. English strings are identical to v119;
6. Focus/Topic/Helper arrays are identical;
7. Universal/Support membership is identical;
8. dictionary/index/runtime logic is identical;
9. CARE is identical;
10. controller parses successfully;
11. no structural whitespace artifacts were introduced.

A reverse/reconstruction test is desirable: replacing staged Thai with `original_thai` should reconstruct the relevant v119 answer content.

### Step D — stop and report

After staged Thai-only v120 passes, report the exact preview path, version/hash, count checks and diff proof to the user.

**Do not promote to live and do not adapt English until the user approves the staged Thai apply.**

---

## 8. After Thai-only v120 is approved

The next phases are deliberately separate so provenance stays easy to audit.

### English sibling adaptation

Revisit English siblings with the final reviewed Thai as authority.

Priority:

- all **384 edited** Thai answers must be checked;
- the **564 approved** answers can generally retain existing English unless the sibling is already mismatched.

English is an adaptation, not a literal translation. Preserve:

- recommendation;
- attitude;
- joke weight;
- emotional temperature;
- social intent.

Do not preserve Thai word order mechanically.

Prefer a separate staged version after Thai-only v120 has been proven, so Thai application and English adaptation remain independently auditable.

### Final corpus QA

After English adaptation:

- duplicate/near-duplicate review;
- Thai/English sibling alignment;
- line-break QA;
- JS parse;
- answer count/ID integrity;
- semantic-index/routing invariants;
- CARE regression;
- matched and generic routing smoke tests;
- mobile Answers ritual smoke test.

Only then freeze the human-reviewed production corpus.

---

## 9. Voice guide upgrade after corpus apply

`/voice.html` and `ANSWERS-VOICE-TONE.md` currently contain evidence from the earlier 400-answer milestone.

After the corpus application is stable, upgrade them to the full 948 evidence:

- 948 reviewed
- 564 accepted unchanged
- 384 human edited
- 59.5% / 40.5%
- 348 wording/punctuation edits
- 36 pure line-composition edits
- 107 line-count changes
- +436 net characters across all 948

Add strong rejected/preferred pairs from the completed review and distinguish:

- hard rules supported repeatedly;
- observed tendencies that remain context-sensitive.

Do not turn human tendencies into mechanical slang rules.

---

## 10. Commercial dataset / buyer-facing outputs

After production corpus freeze, package the completed review as a contemporary Thai language asset.

Useful product layers:

### Core Corpus

- 948 final human-reviewed Thai answers
- English siblings
- answer IDs
- basic semantic labels

### Thai Preference / Alignment Layer

- all **384 edited** pre-review → human-final pairs
- all **564 accepted-as-is** validations
- exact authored line breaks
- source version/hash
- review timestamps/reviewer metadata as appropriate
- voice methodology / failure taxonomy

### Research / Enterprise layer

- benchmark/evaluation tasks
- model failure analysis
- naturalness/pragmatics categories
- optional ontology/aliases/mappings

Strong positioning:

> **How to stop an LLM sounding like it thought in English and translated into Thai.**

Better formal framing:

> **A production-derived, human-validated contemporary Thai corpus developed inside a functioning consumer application.**

Do not overclaim enterprise readiness until schema, data card, rights/provenance, license terms and evaluation package are complete.

---

## 11. Product invariant — The Book of Answers is not a chatbot

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

Physical page depth is theatrical interaction, not answer ID.

The current Three.js/book-mechanism work is a separate project thread. Do not let it contaminate corpus/routing work in the v120 apply chat.

---

## 12. Source-of-truth discipline for live changes

Most Answers owners live in Supabase `public.site_files`.

Before a risky controller change:

1. re-query current live version/hash;
2. create a `/wip/` backup;
3. create a separate staged preview;
4. validate counts/diff independently;
5. ask for user approval where the handoff requires it;
6. promote the exact staged bytes;
7. verify live MD5 equals staged MD5.

Do not blind-replace large sections of the ~270k controller.

Supabase `site_files` changes do not require a Cloudflare Pages redeploy.

Main Admin is separate from Answers Library. Do not touch Main Admin for Answers work.

---

## 13. Current checkpoint in one sentence

**The user has personally completed the first auditable Thai review of all 948 frozen v119 Answers items; the evidence is clean and complete, while live production still runs v119, so the next task is to freeze/export that evidence and build a rigorously validated Thai-only staged v120 without changing English, semantics, routing, CARE or runtime.**
