# The Book of Answers — Batch 2 Technical Pilot Completion Report

**Status:** FULL CYCLE COMPLETE — CORPUS-LINKED / NON-METRIC  
**Completed:** 18 August 2026  
**Rows:** B2-0001–B2-0020

---

## 1. Human review completion

The original 20-row Batch 2 technical pilot is fully native-human reviewed.

```text
reviewed     20 / 20
ACCEPT        4
EDIT          9
REWRITE       7
```

The original technical decisions remain stored in:

```text
public.answers_thai_reviews
review_round = batch2-tech-pilot-v1
answer_id = 2000001 … 2000020
```

They are **not** copied into `private.batch2_human_reviews`, so the clean metric-eligible review table remains uncontaminated by the technical pilot.

The 4/9/7 split is descriptive technical-pilot evidence only, not an official Batch 2 benchmark result.

---

## 2. Why the pilot remains non-metric

The first 20 preserve two experimental/provenance defects:

1. their original immutable raw drafts stored designed line breaks as literal escaped transport text rather than real LF bytes;
2. B2-0001 had machine-judgment exposure before its human decision during early reviewer development.

Therefore:

```text
record_class                  technical_pilot
benchmark_metric_eligible     false
buyer_export_included         true
```

The raw defect is disclosed and preserved. It is never silently rewritten.

B2-0002–B2-0020 satisfy the later human-first visibility behavior; B2-0001 carries the explicit exception flag.

---

## 3. Machine evidence

ChatGPT pre-human self-audits exist for all 20 rows.

Qwen diagnosis exists for 18 rows under the frozen escalation rules.

Technical-pilot distributions recorded before human review:

```text
ChatGPT
fluent          14
minor_problem    5
major_problem    1
not_acceptable   0

Qwen — 18 audited rows
fluent          15
minor_problem    0
major_problem    3
not_acceptable   0
```

Machine judgments remain diagnosis evidence only. They are not the editorial target and are not human ground truth.

---

## 4. Editorial result of the first 20

The native-human review changed **16 of 20** drafts: 9 EDIT + 7 REWRITE.

This is useful qualitatively because the changes are not merely typo repair.

Observed editorial effects include:

- stronger spoken-Thai rhythm;
- less advisor-like explanation;
- sharper final landings;
- more specific everyday imagery;
- selective Thai-English code-mixing where it sounds authored rather than translated;
- occasional stance change, proving the human reviewer is exercising independent editorial judgment rather than polishing toward an AI score.

Examples:

### B2-0004 — compression and sharper landing

The final answer removes the generic “check your balance first” type ending and lands on:

```text
ลด 30%
แต่เงินเดือน
ไม่ได้ขึ้น 30%
```

### B2-0007 — human changes the stance

The model draft advised putting the shoes down because they hurt. The human rewrite instead becomes:

```text
รองเท้าสวย
...ซื้อค่ะ
แต่กัดมันก่อน
ที่มันจะกัดเรา
```

That is a real editorial choice, not a surface edit.

### B2-0015 — human rejects machine harshness

The native human ACCEPTED the battery answer unchanged even though Qwen marked a major problem. This is useful evidence that the human review is not calibrated to obey the stricter machine judge.

### B2-0001 — machines say fluent, human still edits

Both machine judges rated the draft fluent, yet the human still changed the opening to sound more natural and lived-in.

These examples are valuable buyer-facing qualitative evidence, but the technical pilot must not be used to estimate the clean benchmark intervention rate.

---

## 5. Post-review enrichment

After the human final Thai was fixed, all 20 received:

```text
English adaptation
Batch 1-compatible topics[]
focus[]
support[]
helpers[]
is_universal
realistic reachability probes
```

Only three new focus concepts were needed:

```text
consistency
home
stress
```

All other semantic ownership reused the live Batch 1 dictionary.

No technical row was made universal.

---

## 6. Routing validation

The technical unit passed the same routing and regression conditions used for production corpus promotion:

```text
alias collisions          0
semantic-zero rows        0
index-unreachable rows    0
probe-unreachable rows    0
Batch 1 regressions       0
```

Every original source scenario reached the corresponding candidate answer in the eligibility pool.

The first validation exposed a hash-serialization mismatch between JavaScript JSON serialization and PostgreSQL canonical JSONB serialization. The routing result was valid; a second persisted preflight recomputed the required hashes in the exact database representation before promotion.

```text
parser/probe check id      1
canonical hash check id    2
```

The routing service was subsequently fixed so future clean units calculate canonical hashes directly.

---

## 7. Corpus promotion

The final reviewed Thai from the technical pilot is useful Book content even though the experimental evidence is non-metric. Benchmark eligibility and corpus usability are therefore treated separately.

All 20 were promoted atomically into the canonical Book:

```text
promotion id          1
promotion class       technical_pilot
base revision         125
new revision          126
active answers        948 → 968
answer IDs            949 → 968
source mappings       20
```

Integrity proof:

```text
dictionary SHA-256  453996612271cd15bf942ca764d6e63fb32e50a6c3ec884ab477fb4a255f2438
index SHA-256       d6f8df9cf5658690cb7ab809c5e616344c5c61ff03fadb1996671dda4f9e30b6
promotion SHA-256   bfe59d7edef89f98b5be576f4350eb0c52c8effbacd43e87d0026b17b73260c0
```

Corpus revision source:

```text
batch2-technical-pilot-promotion
```

---

## 8. Live verification

Verified after promotion:

```text
canonical revision                       126
active answers                            968
B2-0001 → canonical answer                949
B2-0020 → canonical answer                968
semantic rows promoted                     20
source → answer mappings                   20
active answers unreachable from index       0
normalized surface collisions                0
technical rows in clean human table          0
technical rows in clean benchmark             0
```

The first 20 are therefore **live and usable in the Book**, but they remain excluded from clean Batch 2 benchmark statistics.

---

## 9. Buyer export preview

The full technical cycle ends with an internal buyer-export checkpoint.

Private snapshot:

```text
ANSWERS-B2-TECH-PILOT-v1-preview
schema        ANSWERS-B2-BUYER-v1
rows          20
revision      126
SHA-256       6a6e0ca0d51b3d342d0f4a14521df5466c6f8e0e8b9d3c94fe7bff4c4ee92a2d
```

The snapshot carries raw generation, audits, human decision, final Thai, English, semantics, reachability, canonical answer ID and publication hashes while retaining the technical exclusion flags.

---

## 10. Completion verdict

B2-0001–B2-0020 are now **closed**.

They should not be re-reviewed, regenerated, or rewritten for the sake of making the benchmark cleaner.

Their correct long-term status is:

```text
reviewed                         yes
live in canonical Book           yes
buyer evidence included          yes
clean benchmark denominator      no
technical provenance preserved   yes
```

The next active unit is **B2-0021–B2-0040**, the first clean metric-eligible production unit.

The governing next-unit cycle is:

```text
REVIEW 20
→ ENGLISH
→ ENRICH
→ VALIDATE
→ PROMOTE
→ VERIFY
→ EXPORT PREVIEW
→ NEXT 20
```
