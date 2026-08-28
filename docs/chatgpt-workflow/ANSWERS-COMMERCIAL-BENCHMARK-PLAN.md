# The Book of Answers — Final Commercial & Benchmark Plan

**Status:** FINAL LOCKED WORKING PLAN  
**Created:** 17 August 2026  
**Updated:** 17 August 2026  
**Project:** Flipgazine / The Book of Answers  
**Supabase:** `sjpvhgxacsiorrtijqua`  
**Security migration:** COMPLETE  
**Public evaluator authority:** `ANSWERS-VOICE-BENCHMARK-PLAN.md`  
**Human evaluation authority:** `ANSWERS-HUMAN-EVALUATION-SCHEME.md`

---

## 1. Final strategic decision

The project now has four distinct assets and they should not be collapsed into one sales story:

1. **The Book** — public product demonstration of the language system.
2. **Voice** — public explanation of the editorial methodology, evidence and limitations.
3. **Thai Voice Benchmark** — free public evaluator that makes the methodology testable.
4. **Private corpus / evaluation methodology** — the deeper evidence and commercial asset.

The final execution order is:

```text
finish Voice + benchmark
→ select a sufficiently strong free-tier evaluator API by human calibration
→ launch the benchmark publicly
→ start OpenAI outreach
→ start Thai/SEA LLM developer outreach in parallel
→ build and review the next 1,000 records in parallel
→ finish the combined 1,948-record suite
→ update every substantive conversation with the completed second batch
```

There is no longer an OpenAI-only waiting period before speaking with Thai or Southeast Asian LLM developers.

The distinction is in **what is offered**:

- **OpenAI:** disclosure-forward corpus/evaluation pitch, including the ChatGPT-assisted provenance.
- **Thai/SEA LLM teams:** Book + Voice + public benchmark + rubric/evaluation methodology + human evaluation capability. Do not default to offering the historical ChatGPT-assisted corpus as unrestricted third-party training data.

---

## 2. Batch 1 — preserve, do not rebuild

Batch 1 remains the immutable historical corpus:

```text
948 normal reviewed records
564 accepted unchanged
384 human-edited
40.5% human intervention rate
```

Preserve the original provenance exactly.

Do **not** spend time applying the full six-dimension human evaluation to all 948 records.

Instead, select only a deliberately stratified calibration subset from Batch 1.

### Calibration subset target

Use approximately **30–50 records**, with a practical target around **36–48**.

The set should deliberately cover:

- all six benchmark dimensions;
- ratings 1, 2, 3 and 4 wherever practical;
- PASS / MINOR / MAJOR / CRITICAL where applicable;
- strong intent + weak Thai pragmatics;
- natural Thai + weak stance;
- good wording + weak composition;
- translation-shaped Thai;
- advisor-like prose;
- excessive slang/camp;
- natural vs forced Thai-English code-mixing;
- semantic drift;
- weak final landing;
- genuinely excellent responses;
- a small number of CARE cases.

Each calibration record may use the full human-evaluation structure:

```text
question/scenario
→ candidate response
→ six human scores
→ human comment on every score
→ severity + diagnostic flags
→ overall human assessment
→ at least two human rewrite options
```

These records serve two purposes:

1. human gold labels for choosing/calibrating the automated benchmark judge;
2. concrete examples of what the deeper human evaluation layer looks like.

This is enough. Do not expand the deep rubric overlay to all 948 unless a later buyer or research need specifically justifies it.

---

## 3. Voice benchmark — finish before outreach

The public benchmark lives on `/voice.html` after the AI probes and before the final Mental Model section.

Public flow:

```text
Question / scenario
+ AI response
→ Evaluate
→ overall score
→ View details
→ human-style rubric lightbox
```

The automated evaluator:

- scores;
- flags;
- explains;
- classifies severity;
- reports confidence;
- never rewrites;
- never suggests a preferred answer.

The backend computes the final 0–100 score deterministically from the six 1–4 criterion ratings.

### API strategy

Prefer a **free-tier evaluator API** if human calibration shows it is good enough.

Candidate free routes may be tested, but provider/model choice is not based on brand or model size. Select the judge with the best combination of:

- agreement with the human calibration labels;
- repeat-test stability;
- useful diagnostic flags;
- rationale quality;
- latency;
- practical free-tier limits.

If a free-tier judge is sufficiently strong, the public benchmark may operate at effectively **zero model-API cost** within its free allowance.

Do not pay merely to make the architecture look more serious. Move to a paid judge only if the free option demonstrably fails the quality or reliability threshold.

The model API key remains server-side and the private 948-record corpus is never sent to the public judge.

---

## 4. Public experience principle

The public experience must stay easy to understand.

Visitors should experience:

```text
try the Book
→ understand the Voice
→ test an AI answer
```

Do not expose:

- JSON;
- model parameters;
- weighting mathematics;
- API architecture;
- rate-limit mechanics;
- corpus internals;
- calibration implementation detail unless deliberately reading the methodology.

The technical complexity stays behind the interface.

Do not add public commercial funnel language such as plans, upgrades, subscriptions or packages.

Human contact remains quiet:

```text
Want a human opinion?
I work best with contemporary Thai conversation, editorial voice and creative/product contexts. I’m not the right reviewer for every field, and I may decline work outside my expertise.
Ask Decha
```

---

## 5. Human evaluation remains one complete scheme

If suitable work reaches the human reviewer, the accepted human task follows `ANSWERS-HUMAN-EVALUATION-SCHEME.md`.

Every completed task contains:

- all six benchmark scores;
- explanation for every criterion;
- deterministic overall score;
- severity and diagnostics;
- overall human editorial judgment;
- at least two complete human-written alternatives;
- scope/uncertainty notes where needed.

The human reviewer may disagree with the automated benchmark and should explain the disagreement rather than force alignment.

The human layer is not intended to be a universal Thai-language service. Unsuitable work may be declined.

---

## 6. Batch 2 — next 1,000 records

Batch 2 remains a second independent repeatability corpus.

Target:

```text
Batch 1:   948
Batch 2: 1,000
----------------
Total:    1,948 normal reviewed records
```

Workflow:

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

Batch 2 is not a blinded scientific experiment. Its value is that the same review process can be repeated independently at another 1,000-row scale.

Do not burden Batch 2 with six-point commentary on every row. Keep the 1,000-row workflow practical and consistent with Batch 1.

---

## 7. Batch 2 creation protocol

### 7.1 Freeze source questions first

Create and freeze 1,000 question/scenario IDs before reviewing model quality.

Suggested fields:

```text
id
question_or_scenario
domain
intended_focus
created_at
source_set_version
```

Coverage should span real Book territory including relationships, work/hierarchy, friends, money/decisions, food/coffee, everyday life, appearance, travel, colloquial Thai, ellipsis, particles, Thai-English lexical mixing, humor, shade, timing and register.

### 7.2 Preserve generation provenance

For every row preserve:

```text
source question/scenario
provider
model/model snapshot when available
generation date/time
generation instruction version
raw model output
```

### 7.3 Review all 1,000

Every row gets exactly one decision:

- **ACCEPT** — natural/publishable enough unchanged.
- **EDIT** — meaningful source structure remains but language/composition changes.
- **REWRITE** — substantially re-expressed by the editor.

These are editorial/provenance labels, not copyright conclusions.

### 7.4 Lightweight reason tags

Use a practical multi-select vocabulary such as:

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

### 7.5 English sibling layer

Thai remains authoritative. English is an adaptation preserving recommendation direction, certainty, humor/social intent and emotional temperature rather than Thai syntax.

### 7.6 Freeze immutable outputs

At minimum:

```text
batch2_full_review.jsonl
batch2_edits.jsonl
batch2_accepted.jsonl
batch2_final_bilingual.jsonl
batch2_review_summary.csv
batch2_manifest.json
SHA256SUMS.txt
```

---

## 8. OpenAI pitch

OpenAI remains the most natural corpus target because the provenance can be completely disclosure-forward:

```text
ChatGPT draft
→ native Thai review
→ accepted / edited / rewritten
→ final Thai
→ documented reasons and provenance
```

Offer:

- secured Batch 1;
- the live Book;
- Voice methodology;
- the working benchmark;
- the 30–50 human calibration cases as evidence of rubric operationalization;
- Batch 2 as actively in progress;
- the future combined 1,948-record suite.

The pitch should emphasize where conversational Thai can be semantically correct but pragmatically/socially wrong.

Do not wait for Batch 2 completion before making contact.

When Batch 2 completes, send a substantive update rather than a generic reminder.

Preferred consideration may still be API credits if that is more useful than cash, but this is private negotiation detail and not part of the public Voice experience.

---

## 9. Thai and Southeast Asian LLM developer outreach

Begin outreach in parallel once Voice + benchmark are live.

The public demonstration itself should carry most of the explanation:

```text
Book = language in use
Voice = why it works
Benchmark = test your own output
```

The strongest likely developer reaction is not merely “interesting dataset,” but:

> **We do not currently have an eval for this.**

Default discussion areas:

- Thai pragmatic evaluation;
- benchmark/rubric adaptation;
- evaluation methodology;
- model-response testing;
- human evaluation;
- native editorial failure analysis;
- possible organization-specific benchmark work.

Do not default to offering the historical OpenAI-assisted corpus as unrestricted training data for competing models.

Likely relevant groups include Thai-language model teams, SCB 10X/Typhoon, KBTG/Thai AI groups, Sea AI Lab and other Southeast Asian language/evaluation teams.

No exclusivity window is required before these conversations begin.

---

## 10. What the final 1,948-record package can honestly claim

The combined package can demonstrate:

- two independently traceable review batches;
- a repeatable single-native-editor Thai pragmatic review process;
- explicit human judgment on all 1,000 Batch 2 rows;
- documented raw-model-output → editor-final differences;
- recurring Thai pragmatic failure categories;
- a larger evaluation surface than Batch 1 alone;
- frozen provenance suitable for technical diligence;
- a live Book product;
- a public rubric-backed evaluator calibrated against selected native-editor cases.

Do not claim:

- that all 1,948 rows are fully human-authored;
- that the suite is unrestricted training data for every third party;
- that Batch 2 is a randomized scientific benchmark;
- that the two batches prove causal model improvement;
- that the benchmark is an objective universal measure of Thai correctness;
- that the automated judge is equivalent to the human editor.

Strong positioning:

> **Single-editor Thai pragmatic evaluation corpus and rubric documenting where model-generated conversational Thai is accepted, edited or rewritten by a native Thai editor.**

---

## 11. Cross-batch analysis

After Batch 2, compare:

```text
Batch 1 intervention rate
Batch 2 intervention rate
accepted-as-is rate
EDIT rate
REWRITE rate
recurring failure categories
new failure categories
register patterns
code-mixing patterns
humor/timing patterns
line-composition patterns
```

Report what the data actually shows. Do not target a preferred intervention rate.

Where historical Batch 1 labels cannot map cleanly onto newer Batch 2 tags, state the limitation rather than manufacturing symmetry.

---

## 12. Final package structure

Keep both batches separately traceable:

```text
THAI-PRAGMATIC-EVALUATION-SUITE/
│
├── README.md
├── DATA-CARD.md
├── METHODOLOGY.md
├── RUBRIC.md
├── BENCHMARK-CALIBRATION/
│   └── selected-human-gold-cases
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

Do not erase provenance by presenting the asset only as an anonymous joined file.

---

## 13. Public/private boundaries

Keep the bulk corpus private.

The public assets are:

- Book;
- Voice;
- benchmark interface;
- high-level rubric/methodology;
- selected examples as deliberately published.

The private assets are:

- bulk corpus;
- raw provenance files;
- unreleased calibration records;
- buyer-specific evaluation work;
- internal commercial terms.

Public bulk release remains an irreversible decision and is not part of the current plan.

---

## 14. Explicitly rejected work

Do not revive unnecessary complexity unless a real buyer/research need appears.

Not required:

- six-point evaluation of all 948 historical rows;
- baseline-vs-guided A/B generation;
- blind X/Y review;
- randomized condition reveal;
- 800/200 sealed holdout;
- 100-row repeat-review reliability study;
- fixed 5×5 experimental matrix;
- causal treatment claims;
- public model leaderboard;
- account/subscription system for the benchmark;
- automated rewrites in the public benchmark.

The final priority is:

> **easy public experience + rigorous hidden machinery + selective deep calibration + repeatable Batch 2 review + parallel outreach.**

---

## 15. Definition of success

This plan succeeds if:

- Voice + benchmark are complete and public;
- the evaluator is selected by human calibration rather than model reputation;
- a free-tier API is used if it meets the quality threshold;
- approximately 30–50 carefully selected human-gold cases cover the full rubric surface;
- Batch 1 provenance remains immutable;
- Batch 2 reaches 1,000/1,000 explicit human decisions;
- OpenAI outreach begins without waiting for Batch 2 completion;
- Thai/SEA LLM developer outreach begins in parallel rather than after an exclusive wait;
- the corpus pitch remains disclosure-forward and appropriately scoped;
- the benchmark/rubric becomes independently useful even to teams that never acquire corpus access;
- the public experience remains simple and non-SaaS-like;
- the full corpus stays private while its private value remains useful.

---

## 16. Next instruction

> **Finish `/voice.html` with the Thai Voice Benchmark, calibrate candidate free-tier judges against the selected 30–50 native-editor gold cases, choose the best sufficiently reliable free judge, launch the benchmark, then begin Batch 2 and OpenAI + Thai/SEA developer outreach in parallel according to `ANSWERS-COMMERCIAL-EXECUTION-TIMELINE.md`.**
