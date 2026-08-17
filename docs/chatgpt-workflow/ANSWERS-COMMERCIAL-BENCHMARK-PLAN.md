# The Book of Answers — Final Commercial & Benchmark Plan

**Status:** FINAL WORKING PLAN  
**Created:** 17 August 2026  
**Project:** Flipgazine / The Book of Answers  
**Supabase:** `sjpvhgxacsiorrtijqua`  
**Security implementation authority:** `ANSWERS-PRIVATE-SERVER-MIGRATION-PLAN.md`  
**Production reference:** `/fg-page-answers.js` v124 · MD5 `c8a382f0562737422e891e3300bb08f6`

> Read this file together with `ANSWERS-PRIVATE-SERVER-MIGRATION-PLAN.md` before continuing in a new chat.
>
> The security plan is unchanged. This document freezes the commercial strategy and replaces the heavier ThaiPrag blind-X/Y/holdout proposal with a simpler second-batch workflow modeled on the already-completed first batch.

---

## 1. Final strategic decision

The commercial asset will contain two independently traceable review batches.

### Batch 1 — existing historical corpus

- 948 normal answer records.
- 564 explicitly human-accepted unchanged.
- 384 human-edited.
- 40.5% human intervention rate in the completed Thai review.
- Final Thai/English copy frozen at v122; semantic/routing production state finalized at v124.
- Existing provenance package remains immutable.
- AI/ChatGPT involvement is disclosed honestly.
- For external buyers, position as an **evaluation/benchmark asset**, not unrestricted model-training data.

### Batch 2 — new 1,000-record repeatability corpus

Use the same basic workflow class as Batch 1:

```text
new question/scenario
→ ChatGPT draft
→ single native Thai editor reviews every row
→ ACCEPT / EDIT / REWRITE
→ final approved Thai
→ English sibling/adaptation where required
→ lightweight intervention reason tags
→ frozen provenance
```

Batch 2 is **not** a blinded A/B experiment. Its purpose is to show that the same single-editor review process can be repeated independently at another 1,000-row scale.

Combined commercial package target:

```text
Batch 1:   948
Batch 2: 1,000
----------------
Total:    1,948 normal reviewed records
```

CARE/safety responses remain separate and should not be counted as ordinary benchmark rows.

---

## 2. What the combined package can honestly claim

The package demonstrates:

- a repeatable single-editor Thai pragmatic review process;
- explicit accept/edit/rewrite judgment on every row across two collection rounds;
- documented raw-model-output → native-editor-final deltas;
- recurring Thai pragmatic failure categories;
- a larger evaluation surface than the original 948 alone;
- frozen provenance suitable for technical diligence;
- a live Book product that uses the corpus without bulk-public distribution after the security migration.

Do **not** claim:

- that 1,948 rows are large-scale foundation-model training data;
- that every Batch-1 row is fully human-authored;
- that Batch 2 is a randomized scientific benchmark;
- that two batches prove causal model improvement;
- that the dataset mathematically eliminates “translation smell”;
- that all 1,948 rows are DPO preference pairs;
- that the asset is unrestricted training data.

The strongest positioning is:

> **Single-editor Thai pragmatic evaluation corpus documenting where model-generated conversational Thai is accepted, edited or rewritten by a native Thai editor.**

---

## 3. Phase 0 — security migration is the hard commercial blocker

Before commercial outreach, complete `ANSWERS-PRIVATE-SERVER-MIGRATION-PLAN.md`.

The Book stays live and visually unchanged. Only the data architecture changes.

Required end-state:

```text
question
→ server runs SAME live-v124 Focus Router
→ SAME Focus/Topic/Helper tier selection
→ SAME Support joins
→ SAME recent-six semantics
→ exactly 2 distinct Universal additions on matched non-generic routes
→ SAME uniform random pick across final eligible pool
→ short-lived opaque token
→ user opens book
→ ONE Thai/English answer leaves server
```

Hard invariants:

- `MIN_POOL = 2`.
- `MAX_BROAD_WIDEN = 12`.
- `RECENT_LIMIT = 6`.
- CARE remains first.
- Tier order and widening rules remain identical.
- Support behavior remains identical.
- Exactly two Universal answers join every matched non-generic pool.
- Every eligible ID, including the two Universal additions, has the same final probability: `1 / eligible.length`.
- Generic routes use the Universal pool itself.
- Physical drag depth remains theatrical and does not affect selection.
- Deterministic seeded-RNG parity against frozen v124 must show zero unexplained differences before cutover.

The security migration must also remove/gate every other public corpus-bearing route, not only `/fg-page-answers.js`.

After cutover, freeze a commercial checkpoint recording the date, hashes, parity report and exposure audit.

Do not claim the corpus “was never public.” Use the narrower factual wording:

> **The production corpus is no longer bulk-accessible publicly. The live Book exposes individual outputs through normal product interaction only.**

---

## 4. Batch 2 creation protocol

### 4.1 Freeze 1,000 new source questions first

Create 1,000 new question/scenario IDs before generation. Do not simply duplicate Batch-1 answers.

Suggested fields:

```text
id
question_or_scenario
domain
intended subject/focus
created_at
source_set_version
```

Coverage should span the real social territory of the Book: relationships, work/hierarchy, friends/social life, money/decisions, food/coffee/everyday life, appearance, plans, travel, colloquial Thai, ellipsis, particles, Thai-English lexical mixing, humor, shade, timing and register.

This is coverage design, not a scientific 5×5 matrix requirement.

### 4.2 Generation provenance

For every row preserve:

```text
source question/scenario
provider
model/model snapshot when available
generation date/time
generation instruction version
raw model output
```

For an OpenAI-first pitch, do not hide that the draft came from ChatGPT/OpenAI. That is part of the evidence.

Use a stable generation instruction during the batch. If it changes materially, increment the protocol version.

### 4.3 Human review — all 1,000 rows

Every row receives one explicit decision:

- **ACCEPT** — publishable/natural enough unchanged.
- **EDIT** — retains meaningful source structure but receives human language/composition changes.
- **REWRITE** — substantially re-expressed by the editor.

These are editorial/provenance labels, **not legal copyright conclusions**.

For EDIT and REWRITE, preserve both raw and final versions.

### 4.4 Lightweight reason tags

Suggested multi-select vocabulary:

```text
translation-shaped
unnatural lexical choice
over-explained
pronoun/subject issue
particle/stance issue
register mismatch
semantic drift
code-mixing issue
humor/timing issue
generic/cliche
metaphor issue
line-composition issue
too formal
too verbose
other
```

Keep this light enough that 1,000 rows can actually be completed quickly.

### 4.5 English layer

If Batch 2 includes English siblings, Thai remains the authority. English is an adaptation, not the source. Preserve recommendation direction, certainty, humor/social intent and emotional temperature rather than Thai word order.

### 4.6 Freeze immutable outputs

At completion create at minimum:

```text
batch2_full_review.jsonl
batch2_edits.jsonl
batch2_accepted.jsonl
batch2_final_bilingual.jsonl
batch2_review_summary.csv
batch2_manifest.json
SHA256SUMS.txt
```

Do not overwrite the frozen evidence after release.

---

## 5. What Batch 2 adds commercially

The second 1,000 should not be sold as “double the data, therefore double the price.”

Its premium comes from **repeatability**:

> A second independently generated 1,000-record corpus passed through the same single-native-editor accept/edit/rewrite process, producing another documented round of Thai pragmatic judgments.

Useful cross-batch analysis:

```text
Batch 1 intervention rate vs Batch 2 intervention rate
Batch 1 reason distribution vs Batch 2 reason distribution
accepted-as-is rate
EDIT rate
REWRITE rate
recurring failure categories
new failure categories
```

Report whatever the second batch actually shows. Do not target a desired intervention percentage.

---

## 6. Final package structure

Keep both batches separately traceable inside one delivery.

```text
THAI-PRAGMATIC-EVALUATION-SUITE/
│
├── README.md
├── COMMERCIAL-DATA-CARD.md
├── METHODOLOGY.md
├── LICENSE-SCOPE.md
│
├── BATCH-1-948/
│   ├── final-reviewed.jsonl
│   ├── edited-384.jsonl
│   ├── accepted-564.jsonl
│   ├── review-summary.csv
│   └── provenance/
│
├── BATCH-2-1000/
│   ├── source-prompts.jsonl
│   ├── raw-model-outputs.jsonl
│   ├── human-reviews.jsonl
│   ├── final-reviewed.jsonl
│   ├── review-summary.csv
│   └── provenance/
│
├── ANALYSIS/
│   ├── cross-batch-summary.csv
│   ├── intervention-rates.csv
│   └── failure-mode-summary.csv
│
└── SHA256SUMS.txt
```

A joined convenience file may exist, but do not erase batch provenance by presenting the asset only as an anonymous `1948.jsonl`.

---

## 7. Option 1 — OpenAI first-look offer

OpenAI is the most natural first target because the provenance can be disclosure-forward:

```text
ChatGPT draft
→ native Thai review
→ accepted / edited / rewritten
→ final Thai
→ documented reasons and provenance
```

### What to offer

- Batch 1 after Phase 0 is secure.
- Batch 2 completed or in progress, depending timing.
- Raw-to-final correction signal.
- Methodology and failure taxonomy.
- A 50-row representative sample.
- The live Book as a product demonstration while bulk files stay private.

### Preferred consideration

Preferred first ask: **API credits rather than cash**.

Treat this as a requested form of consideration, not an assumption that any specific OpenAI program guarantees credit compensation.

Set an internal minimum-equivalent value before negotiating; do not publish that floor in initial outreach.

### First-look window

1. Submit after secure Phase 0.
2. Allow roughly 4–6 weeks.
3. Send one concise follow-up.
4. If there is substantive human engagement, continue it.
5. If there is no substantive engagement, move to Option 2.

A real sample request, technical discussion, call, NDA/procurement conversation or active human back-and-forth counts as substantive. An automated receipt does not.

Batch 2 may be built privately during this first-look window.

---

## 8. Option 2 — external non-exclusive benchmark licensing

If OpenAI declines, times out, or the consideration is not worthwhile, offer the combined 1,948-row package externally.

For external buyers, the default license should be **evaluation/benchmark-focused** unless legal review explicitly clears broader rights.

### Intended permitted uses

```text
model evaluation
benchmarking
quality measurement
internal research analysis
linguistic/error analysis
```

### Intended excluded uses

```text
model training
fine-tuning
DPO/RLHF training
distillation
gradient updates
synthetic training-data generation
incorporation into training corpora
```

Final contract language must be reviewed before the first signed sale.

---

## 9. Pricing — final working anchors

These are **negotiation/planning anchors, not verified market-price guarantees**.

### Combined 1,948-row non-exclusive benchmark license

Working range:

```text
US$5,000 – US$12,000 per buyer
```

Recommended opening anchor:

```text
US$8,000 – US$9,000
```

Keep the lowest acceptable number private.

The premium over Batch 1 alone comes from process repeatability, a larger evaluation surface, richer failure-mode evidence and two separately frozen provenance rounds—not simply the extra row count.

### Multi-buyer planning scenario

Internal scenario, not a promise:

```text
2–3 non-exclusive licenses
≈ US$12,000 – US$25,000 cumulative
≈ 6–12 months
```

### Rights/negotiation rule

Prefer preserving:

- non-exclusive rights;
- no redistribution;
- no sublicensing;
- no training rights under the benchmark license;
- confidentiality of the bulk corpus;
- ability to license the same benchmark to additional buyers.

Charge substantially more before considering exclusivity, redistribution or broader downstream rights.

---

## 10. External target order

After OpenAI first look resolves:

1. KBTG / Thai-language AI research teams.
2. SCB 10X / Typhoon.
3. Sea AI Lab / Southeast Asian language teams.
4. Other Thai/SEA model-evaluation groups.
5. Defined.ai / dataset-marketplace or partnership route as a secondary channel.

Pitch evaluation quality, native-human judgment, failure taxonomy and provenance—not unrestricted training data.

---

## 11. Public release strategy

Keep the full bulk corpus private while private monetization remains realistic.

The Book itself can remain public indefinitely because Phase 0 changes it to one-answer-at-a-time delivery.

Public bulk release is a separate irreversible commercial decision. It may later create research/reputation value, but it reduces scarcity and private-license leverage.

Default rule:

> **Keep the corpus private. Treat public release as irreversible.**

---

## 12. Explicitly rejected from the earlier ThaiPrag-1K proposal

The following are **not required** under this final plan:

- baseline vs guided A/B generation;
- blind X/Y review;
- randomized condition reveal;
- 800/200 sealed holdout;
- 100-row repeat-review reliability study;
- fixed 5×5 experimental matrix;
- causal model-treatment claims;
- OpenAI Evals packaging as a prerequisite.

These remain optional future research enhancements only.

The final priority is:

> **speed + repeatability + 100% explicit human review + honest provenance.**

---

## 13. Final execution order

### Phase A — secure the asset

Execute `ANSWERS-PRIVATE-SERVER-MIGRATION-PLAN.md` completely. Do not submit commercially while the bulk corpus is still trivially downloadable from public JS/lab routes.

### Phase B — freeze secure commercial checkpoint

Create post-cutover manifest and buyer-safe provenance wording.

### Phase C — OpenAI first look

Prepare disclosure-forward data card, 50-row sample, Batch-1 provenance and the live Book demonstration. Submit and start the 4–6 week first-look clock.

### Phase D — build Batch 2 privately

During the OpenAI window:

1. freeze 1,000 new source questions/scenarios;
2. generate raw drafts under a recorded protocol;
3. review all 1,000 personally;
4. assign ACCEPT / EDIT / REWRITE;
5. preserve raw/final pairs;
6. record lightweight reasons;
7. produce English siblings if needed;
8. QA duplicates, empty rows and metadata;
9. freeze immutable exports/hashes;
10. generate cross-batch summary.

### Phase E — OpenAI decision point

Continue substantive engagement. If there is no meaningful engagement or the offer is not worthwhile, proceed externally.

### Phase F — external non-exclusive benchmark licensing

Offer the combined 1,948-row suite. Opening anchor approximately US$8,000–US$9,000; working range US$5,000–US$12,000. Preserve non-exclusive rights and benchmark-only scope unless broader rights are separately reviewed and negotiated.

### Phase G — optional later public release

Only after private commercial attempts are genuinely exhausted or a deliberate research/reputation strategy outweighs scarcity value.

---

## 14. Definition of success

The plan succeeds if:

- the live Book remains visually and behaviorally intact;
- v124 Focus → pool → exactly-two-Universal → uniform-probability mechanics remain exact;
- the corpus is no longer a one-request public download;
- Batch 1 remains immutable and historically auditable;
- Batch 2 reaches 1,000/1,000 explicit human decisions;
- both batches retain separate provenance;
- commercial claims remain narrower than the evidence;
- OpenAI gets the first disclosure-forward opportunity;
- external buyers receive a clearly scoped evaluation/benchmark license;
- the same asset can be licensed non-exclusively more than once;
- full public release is avoided while private value remains realistic.

---

## 15. First instruction for the next chat

> **Read `ANSWERS-PRIVATE-SERVER-MIGRATION-PLAN.md` and `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md`. The final direction is: secure Phase 0 first; preserve live v124 Focus → pool → exactly-two-Universal → uniform-probability mechanics exactly; give OpenAI the first disclosure-forward opportunity; build Batch 2 as another 1,000-row ChatGPT-draft → single-native-editor ACCEPT/EDIT/REWRITE round; then, if needed, sell the combined 1,948-row asset externally as a non-exclusive benchmark/evaluation license anchored around US$8k–US$9k. Do not revive the heavier blind-X/Y ThaiPrag protocol unless explicitly requested.**
