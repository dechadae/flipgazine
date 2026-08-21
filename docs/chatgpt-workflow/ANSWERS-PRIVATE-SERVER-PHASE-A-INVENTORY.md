# The Book of Answers — Private Server Migration Phase A Inventory

> **Archive note:** Historical Phase A evidence. The migration is complete; do not treat its operational freeze or next-phase language as current.

**Status:** PHASE A BASELINE RECORDED  
**Date:** 17 August 2026  
**Supabase project:** `sjpvhgxacsiorrtijqua`  
**Migration plan:** `ANSWERS-PRIVATE-SERVER-MIGRATION-PLAN.md`  
**Production modification during this inventory:** **NONE**

> Migration invariant: this is a security/source-of-truth migration only. Preserve live v124 Focus → selected pool → Support additions → recent-6 handling → exactly two distinct Universal additions on matched non-generic routes → one uniform final pick across the complete eligible list. Do not retag, reweight, vectorize, reinterpret, or redesign routing during the migration.

---

## A1. Current live owner / version / fingerprint

Current live public Answers controller in Supabase `public.site_files`:

| Path | Version | Bytes | MD5 | Updated (UTC) |
|---|---:|---:|---|---|
| `/fg-page-answers.js` | 124 | 342604 | `c8a382f0562737422e891e3300bb08f6` | 2026-08-16 16:42:48.300053+00 |

Frozen provenance reference:

| Path | Version | Bytes | MD5 |
|---|---:|---:|---|
| `/wip/provenance-final-2026-08-16/fg-page-answers-v124-final-production.js` | 124 | 342604 | `c8a382f0562737422e891e3300bb08f6` |

Database comparison result:

```text
live.content = frozen.content → TRUE
```

The frozen provenance file is therefore an exact text copy of current live v124 and is the immutable routing reference for parity work.

---

## A2. Canonical bilingual copy freeze verification

Compared the 948 sequential `{thai, english}` pairs extracted from:

- live `/fg-page-answers.js` v124; and
- `/wip/answers-bilingual-canonical-v122-948.js` v122.

Results:

```text
v124 pair count:       948
v122 pair count:       948
bilingual raw MD5:     4158d92b7cdae896b2d0e81004097edf  (both)
Thai differences:      0
English differences:   0
Total pair differences: 0
```

This confirms the live v124 Thai/English answer copy remains identical to the v122 bilingual freeze.

---

## A3. Exact v124 extraction map and fingerprints

The following spans are defined directly against the exact frozen/live v124 source. Character positions are 1-based PostgreSQL `strpos` positions. MD5 is over the exact extracted text span.

| Asset | Start | End | Chars | Bytes | MD5 |
|---|---:|---:|---:|---:|---|
| Answers literal (`var answers=[` → before `var CARE=[`) | 859 | 183228 | 182369 | 242165 | `c8e159c6f32ce9513056fbbe4585830d` |
| CARE | 183228 | 183895 | 667 | 1107 | `406dd4fb9bd3278e5300a1b46d86fd8e` |
| Focus dictionary | 183895 | 227813 | 43918 | 52924 | `c488cef1270aed127cfd0e6d86452bfd` |
| Focus index | 227813 | 247476 | 19663 | 20079 | `0fca819ceb7bc2832d052e2e56b801f9` |
| Intent rules | 247587 | 248271 | 684 | 1132 | `895bdcb00bfeddb1fe0f33be0fe83bcb` |
| Router constants | 248271 | 248338 | 67 | 67 | `fdda764fa67985aa66bd396630ec3cd6` |
| Pure router core (`function uniq` → router IIFE end) | 248338 | 260018 | 11680 | 11850 | `0136cd0b127f4c6c30c8ec098d7ac2e8` |
| `chooseAnswer()` + defensive final fallback | 260184 | 261097 | 913 | 913 | `76abfbf89bb565575a48f2bead0c6981` |

Important fixed constants observed directly in live v124:

```js
MIN_POOL = 2
MAX_BROAD_WIDEN = 12
RECENT_LIMIT = 6
```

These hashes are the Phase A extraction fingerprints. Phase C/D implementations must trace back to these exact source spans rather than a regenerated approximation.

---

## A4. Live source structure counts

Directly parsed from current/frozen v124:

```text
Normal answers:                         948
CARE responses:                           3
Universal IDs in FOCUS_INDEX.generic:    75
Dictionary concepts total:              268
  kind=focus:                            182
  kind=support:                           24
  kind=slang:                             38
  kind=bridge:                            15
  kind=topic:                              9
Distinct non-empty answer support IDs:    44
Distinct IDs present in index.support:    44
Support ↔ Universal ID overlap:            0
FOCUS_INDEX.focus keys:                  220
FOCUS_INDEX.support keys:                 36
FOCUS_INDEX.topics keys:                  20
FOCUS_INDEX.helpers keys:                  4
```

### Inventory discrepancy vs migration-plan prose

The migration plan's summary currently says **183 canonical Focus concepts** and **42 Support answers**. The exact live/frozen v124 source parses to **182 `kind="focus"` dictionary rows** and **44 answers with non-empty `support` membership / 44 distinct support-index answer IDs**.

This is **not live drift**: live v124 and the frozen provenance controller are exact-text-equal with MD5 `c8a382f0562737422e891e3300bb08f6`.

Therefore Phase B/C must use the exact v124 assets above as source of truth. Do **not** alter the corpus/index to force the prose counts to 183/42. The count-definition/documentation discrepancy should remain documented until the parity harness establishes the canonical interpretation.

---

## A5. Public corpus exposure inventory

Re-scan of current non-`/wip/` `site_files` confirms these corpus-bearing routes:

| Path | Version | Bytes | MD5 | Evidence |
|---|---:|---:|---|---|
| `/fg-page-answers.js` | 124 | 342604 | `c8a382f0562737422e891e3300bb08f6` | 951 `{thai:` objects; full answers + CARE; dictionary/index |
| `/fg-page-answers-three-lab.js` | 37 | 340488 | `54458acdeec3faec446cd9491971a9de` | 951 `{thai:` objects; full corpus-bearing lab; dictionary/index |
| `/answers-longest-review.html` | 1 | 177682 | `399cc0f1fd7b0f2d6a45c98511fbf82e` | 576 embedded `{thai:` objects |

Parser/marker false positives observed but **not classified as corpus mirrors**:

- `/fg-page-answers-admin.js` v22 — only parser/marker snippets (`{thai:` count 2), not the corpus itself.
- `/fg-page-answers-thai-review.js` v3 — parser/marker reference, no embedded answer objects.

### Route/controller ownership map

```text
/answers.html            → /fg-page-answers.js
/answers-three-lab.html  → /fg-page-answers-three-lab.js
/answers-admin.html      → /fg-page-answers-admin.js
/answers-thai-review.html→ /fg-page-answers-thai-review.js
/answers-longest-review.html → corpus embedded directly in HTML
```

These three corpus-bearing public paths must all be secured during the eventual controlled cutover; stripping only `/fg-page-answers.js` is insufficient.

---

## A6. Routing invariants frozen for parity

The Phase A baseline explicitly freezes these behaviors from live v124:

1. CARE check precedes normal routing.
2. Exact v124 normalization and alias matching.
3. Focus owns semantic routing when Focus exists; otherwise Slang may own it.
4. Tier order remains `all-focus → near-focus → any-focus → all-topics → any-topic → all-helpers → any-helper → generic`.
5. Exact widening / small-pool behavior with `MIN_POOL=2` and `MAX_BROAD_WIDEN=12`.
6. Support keys remain `unique(focus + slang + support)`.
7. Support may own a Support-only/no-subject route; otherwise relevant Support IDs append to non-generic owner pool.
8. Recent history remains last six revealed normal-answer IDs; filter then restore original pool if filtering empties it.
9. Every matched non-generic route samples exactly **2 distinct Universal IDs** using v124 candidate fallback rules.
10. The final answer is a **uniform pick across the full `eligible` list**. No Focus/Support/Universal weighting exists after eligibility is constructed.
11. Reported probability remains `1 / eligible.length`.
12. Generic routes use the Universal pool itself and do not add two more Universals.
13. `chooseAnswer()` defensive fallback order remains generic excluding recent → full generic → all answers excluding recent → all answers → ID 1.
14. Physical book depth remains theatrical only and is not an answer-selection input.

---

## A7. Answer-editing freeze

**Operational freeze is active for migration work:** do not edit answer copy, tags, dictionary, index, CARE rules, intent rules, router constants, or production controller routing while Phase B–D import/parity work is underway.

No technical production write lock was added in Phase A because the migration plan also requires production behavior to remain untouched until deterministic parity is proven in isolation. The frozen v124 provenance copy and the fingerprints in this file are the authority if any accidental edit occurs; any source change before parity must stop the migration and restart Phase A inventory against an explicitly approved new baseline.

---

## Phase A exit status

```text
[x] Current live version/hash re-queried
[x] Exact v124 frozen provenance confirmed text-identical to live
[x] v124 Thai/English identity vs v122 confirmed: 0 differences
[x] Exact answer/CARE/dictionary/index/intent/router/fallback spans fingerprinted
[x] Public corpus-bearing routes re-inventoried
[x] Operational answer-edit freeze declared
[x] No production rows/controllers modified
```

**Phase A exit condition: satisfied.**

Next allowed work: **Phase B private database model**, while public live v124 remains unchanged. Deterministic parity remains the hard gate before any production cutover.
