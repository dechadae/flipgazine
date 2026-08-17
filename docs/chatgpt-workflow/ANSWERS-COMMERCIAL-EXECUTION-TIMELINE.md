# The Book of Answers — Commercial Execution Timeline

**Status:** ACTIVE MASTER EXECUTION PLAN — FINAL SEQUENCE  
**Created:** 17 August 2026  
**Updated:** 17 August 2026  
**Project:** Flipgazine / The Book of Answers  
**Repository:** `dechadae/flipgazine`  
**Supabase:** `sjpvhgxacsiorrtijqua`  
**Commercial authority:** `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md`  
**Public benchmark authority:** `ANSWERS-VOICE-BENCHMARK-PLAN.md`  
**Human evaluation authority:** `ANSWERS-HUMAN-EVALUATION-SCHEME.md`  
**Security gate:** COMPLETE — 17 August 2026

---

# 1. Executive direction

The security migration and Book showcase are complete. Do not reopen them as dependencies unless a verified regression appears.

The remaining work follows one short sequential gate and then three parallel tracks:

```text
GATE — finish Voice + public benchmark
       + calibrate/select evaluator judge

THEN IN PARALLEL:
TRACK A — OpenAI corpus/evaluation pitch
TRACK B — Thai + SEA LLM developer benchmark/rubric outreach
TRACK C — build and review Batch 2 (1,000 new records)
```

The key operating principle is:

> **Finish the demonstrator first. Then let outreach and dataset expansion happen at the same time.**

Do not wait for Batch 2 before making contact, and do not wait for OpenAI before speaking with Thai/SEA LLM teams.

---

# 2. Final milestone calendar

| Date | Milestone |
|---|---|
| **17 Aug 2026** | ✅ Security migration complete; final commercial/benchmark strategy locked |
| **18–19 Aug** | Finish Voice benchmark UI/backend; create human calibration set; compare free-tier judge candidates |
| **19 Aug target** | Select sufficiently reliable free-tier evaluator and make Voice benchmark public |
| **19–20 Aug** | Launch OpenAI outreach and Thai/SEA LLM developer outreach in parallel |
| **18–20 Aug** | Freeze 1,000 Batch 2 source questions/scenarios |
| **20–21 Aug** | Generate and preserve Batch 2 raw drafts |
| **21 Aug–3 Sep** | Human review all 1,000 Batch 2 records |
| **21 Aug–4 Sep** | English sibling/adaptation layer in parallel |
| **4–6 Sep** | Batch 2 QA and immutable freeze |
| **6–8 Sep** | Cross-batch analysis |
| **8–10 Sep** | Assemble complete 1,948-record suite |
| **9–10 Sep** | Send substantive completion update to active OpenAI and Thai/SEA conversations |
| **Sep onward** | Continue substantive technical/commercial discussions; benchmark/rubric opportunities may proceed independently of corpus discussions |

Dates are working targets. Evidence quality and explicit human review take precedence over cosmetic schedule perfection.

---

# 3. Phase 0 — completed security baseline

## Status

**COMPLETE — 17 August 2026.**

The production corpus is private-server owned and no longer bulk-accessible through the public controller.

Preserve the completed security/parity artifacts. Do not retune the router during commercial or benchmark work.

The live Book remains a product demonstration, not a public bulk-data endpoint.

---

# 4. Phase 1 — finish the Voice benchmark

## Target

**18–19 August 2026**

## Objective

Turn `/voice.html` into the complete public demonstration before outreach begins.

The visitor experience is intentionally simple:

```text
Question / scenario
+ AI response
→ Evaluate
→ overall score
→ View details
→ human-style rubric lightbox
```

The automated benchmark must:

- evaluate the six rubric dimensions;
- return 1–4 ratings;
- return severity, flags, rationale and confidence;
- let the backend calculate the final 0–100 score deterministically;
- never rewrite;
- never suggest corrections;
- never expose the private corpus.

Public design remains editorial and understandable. Technical implementation stays behind the interface.

---

# 5. Phase 2 — human calibration set

## Target

**18–19 August 2026**, overlapping benchmark implementation.

## Size

Approximately **30–50 selected cases**, preferably around **36–48** if that gives full coverage without unnecessary repetition.

Do not deeply re-evaluate all 948 Batch 1 rows.

## Selection principle

Choose cases to cover the **rubric surface**, not to produce a representative census of Batch 1.

Cover:

- all six dimensions;
- 1/4, 2/4, 3/4 and 4/4 ratings where practical;
- PASS / MINOR / MAJOR / CRITICAL where applicable;
- semantic success with pragmatic failure;
- translation-shaped Thai;
- advisor-like delivery;
- weak stance;
- weak composition;
- weak landing;
- natural vs forced code-mixing;
- excessive slang/camp;
- semantic drift;
- genuinely excellent responses;
- several CARE cases.

## Human gold format

Each selected case may receive the complete human scheme:

```text
six scores
+ comment on every score
+ severity
+ diagnostic flags
+ overall editorial judgment
+ at least two human rewrite options
```

These labels become the benchmark calibration truth set.

---

# 6. Phase 3 — select the evaluator API

## Target

**By 19 August 2026 if calibration results are sufficient.**

## Rule

Prefer a **free-tier model API** if it agrees sufficiently with the human gold cases.

Compare candidate judges on:

```text
criterion-score agreement
severity agreement
diagnostic usefulness
rationale quality
repeat-test consistency
latency
free-tier practicality
```

Do not choose by model size or provider reputation.

If a free-tier judge passes the quality threshold, use it. The benchmark may therefore have effectively zero model-API cost within the free allowance.

Only move to a paid evaluator if the free candidates are materially inadequate.

Keep provider keys server-side and maintain invisible abuse controls.

---

# 7. Phase 4 — launch Voice + benchmark

## Target

**19 August 2026**

## Acceptance conditions

Before calling the public benchmark ready:

- two-input workflow works on mobile and desktop;
- overall result is simple and readable;
- View details opens the complete rubric lightbox;
- score is deterministic from the rubric ratings;
- malformed output is safely rejected;
- repeated identical tests are acceptably stable;
- CARE behavior works;
- no automated result contains a rewrite;
- private corpus is not sent to the evaluator;
- API secrets remain private;
- human-contact CTA includes the reviewer's scope limitations;
- no SaaS-style commercial funnel appears.

Once this is true, treat Book + Voice + Benchmark as the completed public showroom.

---

# 8. Phase 5A — OpenAI outreach

## Start

**19–20 August 2026**

Do not wait for Batch 2 completion.

## Core evidence

Present:

- the live Book;
- the Voice methodology page;
- the working benchmark;
- secured Batch 1 provenance;
- Batch 1 review statistics;
- selected human-gold calibration cases;
- Batch 2 as actively in progress;
- the planned 1,948-record combined suite.

## Positioning

Use disclosure-forward provenance:

```text
ChatGPT draft
→ native Thai editor review
→ accepted / edited / rewritten
→ final conversational Thai
→ documented failure signal
```

Emphasize the gap between semantic correctness and native Thai pragmatic/social fit.

OpenAI remains the natural target for corpus-level discussion because the ChatGPT-assisted history can be disclosed directly rather than hidden.

Any preferred form of consideration remains private negotiation detail and does not appear on the public Voice page.

---

# 9. Phase 5B — Thai + SEA LLM developer outreach

## Start

**19–20 August 2026**, parallel with OpenAI.

## Public demonstration

Let the product explain itself:

```text
Book = what the language feels like
Voice = why the editorial decisions exist
Benchmark = test your own model output
```

## Discussion focus

Lead with:

- Thai pragmatic evaluation;
- benchmark/rubric methodology;
- model-response evaluation;
- native-editor failure analysis;
- organization-specific evaluation design;
- human evaluation when the domain fits.

Do not default to pitching the historical ChatGPT-assisted corpus as unrestricted training data for competing models.

Relevant audiences include Thai model developers, SCB 10X/Typhoon, KBTG/Thai-language AI teams, Sea AI Lab and other Southeast Asian language/evaluation teams.

No OpenAI exclusivity period blocks these conversations.

---

# 10. Phase 5C — freeze 1,000 Batch 2 source scenarios

## Target

**18–20 August 2026**

Create the source evaluation surface before reviewing outputs.

Required fields:

```text
id
question_or_scenario
domain
intended_focus
created_at
source_set_version
```

Coverage should span the Book's real social territory rather than a rigid scientific matrix.

Once approved, freeze the source questions before seeing model quality.

---

# 11. Phase 6 — generate Batch 2 raw drafts

## Target

**20–21 August 2026**

For each row preserve:

```text
source_id
question_or_scenario
provider
model/model snapshot where available
generation_timestamp
generation_instruction_version
raw_model_output
```

Use a stable generation instruction. If it changes materially, increment the protocol version.

Do not clean weak outputs before human review; weakness is part of the evidence.

---

# 12. Phase 7 — human review all 1,000 Batch 2 rows

## Target

**21 August – 3 September 2026**

Use ten review blocks of 100 for restartability and QA.

Every row receives exactly one decision:

- **ACCEPT**
- **EDIT**
- **REWRITE**

For EDIT/REWRITE retain both raw and final versions.

Use lightweight reason tags only. Do **not** add the full six-point commentary scheme to all 1,000 rows.

Suggested daily target:

```text
70–100 rows/day
```

Do not target a preferred intervention rate. The observed rate is evidence.

---

# 13. Phase 8 — English sibling/adaptation

## Target

**21 August – 4 September 2026**, continuously in parallel with Thai review.

Thai is authoritative.

English should preserve:

- recommendation direction;
- certainty;
- humor/social intent;
- emotional temperature.

Do not mechanically translate Thai syntax.

---

# 14. Phase 9 — Batch 2 QA and freeze

## Target

**4–6 September 2026**

Required checks:

- exactly 1,000 source IDs;
- exactly 1,000 review decisions;
- no duplicate IDs;
- no empty required fields;
- all raw outputs preserved;
- all final Thai present;
- EDIT/REWRITE retain raw + final;
- reason tags validate;
- bilingual IDs match;
- Thai line breaks preserved;
- JSONL/CSV parse and row counts match;
- immutable hashes generated.

Frozen outputs:

```text
batch2_full_review.jsonl
batch2_edits.jsonl
batch2_accepted.jsonl
batch2_final_bilingual.jsonl
batch2_review_summary.csv
batch2_manifest.json
SHA256SUMS.txt
```

Do not overwrite frozen evidence afterward.

---

# 15. Phase 10 — cross-batch analysis

## Target

**6–8 September 2026**

Compare at minimum:

```text
Batch 1 intervention rate
Batch 2 intervention rate
accepted-as-is rates
Batch 2 EDIT rate
Batch 2 REWRITE rate
recurring failure modes
new failure modes
register patterns
code-mixing patterns
humor/timing patterns
line-composition patterns
```

Do not invent false symmetry where Batch 1 historical labels differ from Batch 2 taxonomy.

The commercial value of Batch 2 is process repeatability, not simply twice as many rows.

---

# 16. Phase 11 — assemble the full suite

## Target

**8–10 September 2026**

Target structure:

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

Keep the two batches separately traceable.

---

# 17. Phase 12 — substantive completion update

## Target

**9–10 September 2026**

Send an update to every conversation that has become substantive.

Useful update:

> The second independent review batch is complete; the suite now contains 1,948 reviewed records with separately frozen provenance, and the public Thai pragmatic benchmark is live.

Do not send repetitive generic follow-ups where active human discussion is already underway.

---

# 18. Claims discipline

The project may honestly say:

- Batch 1 contains 948 reviewed records;
- Batch 2 adds 1,000 independently reviewed records;
- the combined suite reaches 1,948 normal records;
- the benchmark uses a six-dimension rubric;
- the automated judge is calibrated/selected against native-editor gold labels if the calibration actually supports that statement;
- the public benchmark evaluates alignment with the Book's editorial/pragmatic criteria;
- the corpus is no longer bulk-publicly exposed.

Do not say:

- every record is fully human-authored;
- the benchmark is universal Thai correctness;
- the automated judge is equivalent to a human;
- the corpus is unrestricted third-party training data;
- Batch 2 is a randomized causal experiment.

---

# 19. Explicitly not required

Do not spend time on:

- six-point evaluation of all 948 Batch 1 records;
- deep human commentary on all 1,000 Batch 2 rows;
- blind A/B methodology;
- sealed holdouts;
- fixed matrices;
- public leaderboards;
- user accounts for the benchmark;
- automated public rewrites;
- SaaS-style funnel mechanics.

The final priority is:

> **finish the showroom → prove the rubric on a selective human gold set → expand the corpus → talk to the right people in parallel.**

---

# 20. Daily operating checklist

Each project check-in should answer:

```text
1. Is Voice + benchmark complete?
2. How many calibration cases are human-scored?
3. Has a free-tier judge passed the quality threshold?
4. Is OpenAI outreach active?
5. Is Thai/SEA developer outreach active?
6. How many Batch 2 source questions are frozen?
7. How many Batch 2 rows are generated/reviewed?
8. What is blocked?
9. Is any shortcut weakening provenance or human-review quality?
10. What is the smallest action that advances the next milestone today?
```

---

# 21. Current next action

> **Finish `/voice.html` with the Thai Voice Benchmark and complete the selected 30–50 human calibration cases. Compare free-tier evaluator candidates, select the strongest sufficiently reliable judge, make the benchmark public, then begin OpenAI + Thai/SEA outreach and Batch 2 production in parallel.**
