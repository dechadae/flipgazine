# The Book of Answers — Commercial Execution Timeline

**Status:** ACTIVE MASTER EXECUTION PLAN — VOICE/BENCHMARK GATE COMPLETE  
**Created:** 17 August 2026  
**Updated:** 18 August 2026  
**Project:** Flipgazine / The Book of Answers  
**Repository:** `dechadae/flipgazine`  
**Supabase:** `sjpvhgxacsiorrtijqua`  
**Commercial authority:** `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md`  
**Public benchmark authority:** `ANSWERS-VOICE-BENCHMARK-PLAN.md`  
**Human evaluation authority:** `ANSWERS-HUMAN-EVALUATION-SCHEME.md`  
**Benchmark implementation record:** `ANSWERS-VOICE-BENCHMARK-IMPLEMENTATION-REPORT.md`  
**Benchmark acceptance record:** `ANSWERS-VOICE-BENCHMARK-ACCEPTANCE-2026-08-18.md`  
**Security gate:** COMPLETE — 17 August 2026  
**Voice/public-benchmark gate:** COMPLETE — 18 August 2026

---

# 1. Executive direction

The security migration, Book showcase, Voice methodology page, public Voice benchmark and evaluator selection are complete. Do not reopen them as dependencies unless a verified production regression appears.

The project now moves into the three already-approved parallel tracks:

```text
TRACK A — OpenAI corpus/evaluation pitch
TRACK B — Thai + SEA LLM developer benchmark/rubric outreach
TRACK C — build and review Batch 2 (1,000 new records)
```

The key operating principle remains:

> **The demonstrator is finished. Let outreach and dataset expansion happen at the same time.**

Do not wait for Batch 2 before making contact, and do not wait for OpenAI before speaking with Thai/SEA LLM teams.

---

# 2. Final milestone calendar

| Date | Milestone |
|---|---|
| **17 Aug 2026** | ✅ Security migration complete; final commercial/benchmark strategy locked |
| **18 Aug 2026** | ✅ Voice benchmark UI/backend shipped; 36-case editor-grounded selective calibration completed; Groq judge selected |
| **18 Aug 2026** | ✅ `qwen/qwen3.6-27b` selected; production acceptance tests passed; public benchmark gate complete |
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

# 4. Phase 1 — Voice benchmark implementation

## Status

**COMPLETE — 18 August 2026.**

Live `/voice.html` now contains the approved public benchmark after the AI-probe material and before the final Mental Model section.

The visitor flow is:

```text
Question / scenario
+ AI response
→ Evaluate
→ overall score
→ View details
→ human-style rubric lightbox
→ Test another
```

Production behavior:

- evaluates the six frozen rubric dimensions;
- returns 1–4 ratings;
- returns severity, flags, rationale and confidence;
- calculates the final 0–100 score deterministically on the backend;
- never rewrites;
- never suggests corrections;
- keeps CARE separate;
- never exposes or sends the private 948-row corpus to the judge.

Live implementation evidence is frozen in:

```text
ANSWERS-VOICE-BENCHMARK-IMPLEMENTATION-REPORT.md
ANSWERS-VOICE-BENCHMARK-ACCEPTANCE-2026-08-18.md
```

Do not redesign the public benchmark into a SaaS dashboard.

---

# 5. Phase 2 — selective calibration set

## Status

**COMPLETE — 18 August 2026.**

## Size

**36 selected cases.**

The set deliberately covers the rubric surface rather than deeply re-evaluating all 948 Batch 1 rows.

Provenance:

```text
24 editor-grounded cases
  = 12 documented native-editor pre/final pairs

6 constructed rubric-edge cases
  = advisor-like prose, weak stance, natural/forced code-mixing,
    semantic drift and nuanced stance

6 constructed CARE cases
  = self-harm, medical emergency and violence/abuse,
    with safe and unsafe/minimizing variants
```

Coverage includes:

- all six dimensions;
- 1/4, 2/4, 3/4 and 4/4 across every dimension;
- PASS / MINOR / MAJOR / CRITICAL;
- semantic success with pragmatic failure;
- translation-shaped Thai;
- advisor-like delivery;
- weak stance;
- weak composition and landing;
- natural vs forced code-mixing;
- excessive slang/camp;
- semantic drift;
- genuinely excellent responses;
- several CARE cases.

## Claims discipline

Call this an **editor-grounded selective calibration set**.

Do **not** describe it as a new blind 36-case multi-annotator human panel, and do not claim that all 36 cases were newly independently rescored by multiple humans.

The private calibration rows and comparison evidence remain in Supabase `private` schema and are not public endpoints.

---

# 6. Phase 3 — evaluator API selection

## Status

**COMPLETE — 18 August 2026.**

Three suitable models available through the configured Groq project were compared on the same 36-case surface:

```text
qwen/qwen3.6-27b
openai/gpt-oss-20b
openai/gpt-oss-120b
```

Selection result:

| Judge | Rating exact | Rating MAE | Severity accuracy | Mean latency | Rewrite leakage |
|---|---:|---:|---:|---:|---:|
| **Qwen3.6-27B** | **70.5%** | **0.462** | **57.1%** | **488 ms** | **0** |
| GPT-OSS 20B | 40.9% | 1.111 | 36.4% | 705 ms | 0 |
| GPT-OSS 120B | 33.3% | 1.194 | 41.7% | 1,161 ms | 0 |

**Selected production judge: `qwen/qwen3.6-27b`.**

The selection was based on agreement with the editor-grounded rubric behavior, not model size or provider reputation.

Production adds strict server validation and one constrained repair retry for malformed judge output.

Provider keys remain server-side and invisible abuse/spend controls are active.

---

# 7. Phase 4 — Voice + benchmark launch

## Status

**COMPLETE — 18 August 2026.**

Acceptance evidence includes:

- two-input workflow present in live `/voice.html`;
- overall result and qualitative label;
- complete six-dimension details lightbox;
- deterministic backend score;
- malformed/missing input rejection;
- strict judge-output validation;
- three identical production repeat tests returning identical six 4/4 ratings, 100/100, PASS, empty flags and high confidence;
- CARE-safe response returning CARE + 100/100 + PASS;
- forced camp/code-mixing regression returning 23/100 + MAJOR;
- semantic-drift regression returning 0/100 + CRITICAL;
- no rewrite leakage detected in calibration;
- private corpus excluded from the service;
- `GROQ_API_KEY` server-side only;
- rate and token-budget protection active;
- no permanent submitted-text storage by Flipgazine;
- quiet human-contact CTA with scope limitations;
- no SaaS-style commercial funnel.

The execution environment could not perform a visual headless-browser screenshot because its organization policy blocks browser navigation to the Pages domain. The public shell/network path, live Supabase source and browser-facing API/CORS contract were verified independently. Treat this as a QA-environment limitation, not a known production defect.

Book + Voice + Benchmark are now the completed public showroom.

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
- selected editor-grounded calibration evidence;
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
│   └── selected-editor-grounded-cases
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
- Batch 2 adds 1,000 independently reviewed records once that phase is complete;
- the planned combined suite reaches 1,948 normal records;
- the benchmark uses a six-dimension rubric;
- the automated judge was selected using a 36-case editor-grounded selective calibration set plus constructed rubric-edge/CARE cases;
- Qwen3.6-27B materially outperformed the compared GPT-OSS judges on the frozen calibration surface;
- the public benchmark evaluates alignment with the Book's editorial/pragmatic criteria;
- the corpus is no longer bulk-publicly exposed.

Do not say:

- every record is fully human-authored;
- all 36 calibration cases were a new blind multi-annotator human panel;
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

The final priority is now:

> **use the finished showroom → expand the corpus → talk to the right people in parallel → preserve provenance.**

---

# 20. Daily operating checklist

Each project check-in should answer:

```text
1. Has any verified Voice/benchmark regression appeared? (Otherwise keep the gate closed.)
2. Is OpenAI outreach active?
3. Is Thai/SEA developer outreach active?
4. How many Batch 2 source questions are frozen?
5. How many Batch 2 rows are generated/reviewed?
6. Is the English sibling layer progressing in parallel?
7. What is blocked?
8. Is any shortcut weakening provenance or human-review quality?
9. Is public benchmark usage/abuse still within the conservative limits?
10. What is the smallest action that advances the next milestone today?
```

---

# 21. Current next action

> **Begin OpenAI corpus/evaluation outreach and Thai/SEA benchmark/rubric outreach while freezing the 1,000 Batch 2 source scenarios. Then generate and preserve Batch 2 raw drafts and start the documented native-editor review workflow. Do not reopen the completed Voice benchmark unless a verified regression appears.**
