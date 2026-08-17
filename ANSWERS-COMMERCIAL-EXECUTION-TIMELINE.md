# The Book of Answers — Commercial Execution Timeline

**Status:** ACTIVE MASTER EXECUTION PLAN  
**Created:** 17 August 2026  
**Project:** Flipgazine / The Book of Answers  
**Repository:** `dechadae/flipgazine`  
**Supabase:** `sjpvhgxacsiorrtijqua`  
**Technical authority:** `ANSWERS-PRIVATE-SERVER-MIGRATION-PLAN.md`  
**Commercial authority:** `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md`  
**Operational assumption:** security gate completes on 17 August 2026; migration work is already approximately halfway complete.

> Read this file together with `ANSWERS-PRIVATE-SERVER-MIGRATION-PLAN.md` and `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md` before continuing the Answers project in a new chat.
>
> This file is the operational timeline. It does not replace either source plan. The security plan remains authoritative for architecture and parity. The commercial plan remains authoritative for positioning, provenance, licensing and claims.

---

# 1. Executive direction

Run the remaining work as three overlapping tracks rather than one sequential pipeline:

```text
TRACK A — secure + freeze Batch 1
TRACK B — OpenAI first-look outreach
TRACK C — build Batch 2 during the OpenAI first-look window
```

The key scheduling principle is:

> Do not wait for Batch 2 before approaching OpenAI, and do not waste the OpenAI 4–6 week first-look window waiting for a response.

By early September the target state is:

- public Answers architecture secured;
- 948-row historical corpus frozen as Batch 1;
- buyer-safe security/provenance checkpoint complete;
- OpenAI first-look submission already active;
- Batch 2 of 1,000 new records fully reviewed;
- combined 1,948-row Thai pragmatic evaluation suite assembled;
- cross-batch analysis complete;
- external licensing package ready before the OpenAI first-look window expires.

---

# 2. Locked technical invariants

Nothing in this commercial timeline may modify the routing contract frozen in `ANSWERS-PRIVATE-SERVER-MIGRATION-PLAN.md`.

The production Book must retain:

```text
MIN_POOL = 2
MAX_BROAD_WIDEN = 12
RECENT_LIMIT = 6
```

And preserve exactly:

- CARE precedence;
- current question normalization;
- current alias/typo matching;
- Focus / Slang / Bridge / Support / Topic / Helper semantics;
- tier order and widening rules;
- Support joins;
- exactly two distinct Universal additions on every matched non-generic route;
- uniform final probability across every eligible answer;
- generic routes using the Universal pool itself;
- recent-six semantics;
- final fallback order;
- physical book depth as theatrical only, never semantic.

Commercial work must never become an excuse to redesign or retune the router.

---

# 3. Master milestone calendar

| Date | Milestone |
|---|---|
| **17 Aug 2026** | Security gate complete; migration checkpoint frozen |
| **18 Aug** | Batch 1 secure commercial checkpoint complete |
| **18–19 Aug** | OpenAI first-look package prepared |
| **18–20 Aug** | 1,000 Batch 2 source questions/scenarios frozen |
| **20 Aug** | Target OpenAI first-look submission |
| **20–21 Aug** | Batch 2 raw drafts generated and preserved |
| **21 Aug–3 Sep** | Human review of all 1,000 Batch 2 records |
| **21 Aug–4 Sep** | English sibling/adaptation layer produced in parallel |
| **4–6 Sep** | Batch 2 QA and immutable freeze |
| **6–8 Sep** | Cross-batch analysis |
| **8–10 Sep** | Full 1,948-row commercial suite assembled |
| **9–10 Sep** | One concise OpenAI follow-up |
| **17 Sep** | Earliest 4-week first-look decision point |
| **1 Oct** | Six-week first-look deadline; move external if no substantive engagement |
| **Oct onward** | External non-exclusive licensing cycle if required |

---

# 4. Phase 0 — finish the security gate

## Date

**Monday, 17 August 2026**

## Status

Already approximately halfway complete when this execution timeline was created.

## Objective

Finish the private-server/security migration completely before commercial submission.

This remains a security/source-of-truth migration, not a routing redesign.

## Required technical completion

Before the gate can be declared closed:

### Private corpus and assets

- private corpus contains normal answer IDs 1–948 exactly;
- Thai/English copy matches frozen production source;
- semantic arrays match production;
- exact v124 dictionary/index/intent/CARE assets imported;
- corpus and router revisions recorded.

### Canonical server router

- one canonical routing core exists;
- public prepare uses it;
- admin audit uses it;
- parity harness uses it;
- no duplicate approximate router exists.

### Deterministic parity

Required tests include:

- every Focus alias;
- every typo alias;
- Support aliases;
- Topic aliases;
- Slang and Bridge aliases;
- all CARE triggers;
- Thai/English mixed questions;
- overlapping alias collision cases;
- colleague/friend repairs;
- work/hobby/colleague repairs;
- reply/คำตอบ cases;
- single, double and 3+ Focus cases;
- Support-only;
- Topic-only;
- Helper-only;
- generic questions;
- small pools;
- widened pools;
- final fallback;
- recent histories of 0, 1 and 6;
- recent removal that leaves a pool;
- recent removal that empties a pool and causes restore;
- multiple deterministic RNG seeds.

**Gate condition:** zero unexplained differences.

### Prepare/reveal security

- same-origin `/api/answers/prepare` equivalent works;
- prepare returns only opaque token/capability;
- answer ID, copy, pool, routing metadata and probability are not exposed on prepare;
- reveal returns only one legitimate answer;
- token is short-lived;
- token is session-bound;
- token is atomic single-use;
- abandoned prepared answer does not enter recent history;
- recent history updates only after reveal;
- no-store cache behavior is active.

### Abuse boundary

- Cloudflare sits in front of the answer service;
- server-only Cloudflare→Supabase credential exists;
- direct underlying service bypass is rejected;
- prepare and reveal are independently controlled;
- token stockpiling is limited;
- high-rate enumeration is throttled/challenged/rejected rather than silently corrupting answer quality.

### Public exposure cleanup

The following known corpus-bearing public routes must be secured in the same cutover:

```text
/fg-page-answers.js
/fg-page-answers-three-lab.js
/answers-longest-review.html
```

Also:

- scan every public `site_files` row for answer signatures;
- verify `/wip/`, `/private/` and `/tmp/` boundaries;
- purge relevant Cloudflare cache entries;
- verify PWA/service-worker caches cannot serve the old corpus;
- test fresh incognito retrieval;
- test old query-string/cache variants where controllable.

### Admin cutover

- DB-native Admin works;
- canonical DB-backed admin authorization enforced;
- authenticated non-admin gets 403;
- validation rules retained;
- explicit corpus revision gate replaces JS-controller version gate;
- answer edits + index rebuild + revision increment are transactional;
- Admin Test Routing calls canonical audit core;
- old raw-JS Admin write path retired.

## End-of-day security artifact

Freeze a migration checkpoint such as:

```text
security-cutover-2026-08-17/
```

Record at minimum:

- old v124 controller hash;
- private corpus row count;
- corpus hash summary;
- router version/hash;
- deterministic parity report and hash;
- new public-controller hash;
- API/function versions;
- Admin versions;
- public exposure audit result;
- hostile retrieval audit result;
- exact cutover timestamp;
- secure rollback reference.

Once this checkpoint is frozen, Phase 0 is closed.

---

# 5. Phase 1 — freeze Batch 1 commercially

## Date

**Tuesday, 18 August 2026**

## Objective

Create a clean buyer-facing checkpoint from the already-completed historical corpus without altering its historical evidence.

## Locked Batch 1 facts

```text
Normal records: 948
Accepted unchanged: 564
Human edited: 384
Human intervention rate: 40.5%
Canonical bilingual copy freeze: v122
Semantic/routing production state: v124
```

AI/ChatGPT involvement is disclosed honestly.

Do not describe all 948 records as fully human-authored.

## Required Batch 1 delivery structure

```text
BATCH-1-948/
    final-reviewed.jsonl
    edited-384.jsonl
    accepted-564.jsonl
    review-summary.csv
    provenance/
    manifest.json
    SHA256SUMS.txt
```

## Evidence rule

Historical provenance remains immutable.

Buyer-friendly reorganizations may be derived from it, but do not overwrite or rewrite the historical evidence to make it cleaner or more symmetrical with Batch 2.

## Security wording

Use the narrower factual statement:

> The production corpus is no longer bulk-accessible publicly. The live Book exposes individual outputs through normal product interaction only.

Do not claim the corpus was never publicly accessible.

---

# 6. Phase 2 — OpenAI first-look package

## Dates

**18–19 August 2026**

## Objective

Prepare a compact disclosure-forward diligence package immediately after the security gate closes.

OpenAI does not need to wait for Batch 2 to finish.

## Package structure

```text
OPENAI-FIRST-LOOK/
    README.md
    DATA-CARD.md
    METHODOLOGY.md
    50-row-sample.jsonl
    50-row-sample.csv
    BATCH-1-SUMMARY.md
    PROVENANCE-SUMMARY.md
    SECURITY-CHECKPOINT.md
```

## Core narrative

```text
ChatGPT draft
→ native Thai editor review
→ ACCEPT / EDIT / REWRITE
→ final conversational Thai
→ documented raw-to-final differences
```

Strongest allowed positioning:

> Single-editor Thai pragmatic evaluation corpus documenting where model-generated conversational Thai is accepted, edited or rewritten by a native Thai editor.

## 50-row sample design

The sample should be representative rather than cherry-picked.

Include a useful spread of:

- accepted-as-is outputs;
- light edits;
- substantial edits;
- translation-shaped Thai;
- lexical unnaturalness;
- pronoun/subject issues;
- particle/stance issues;
- register mismatch;
- semantic drift;
- Thai-English code-mixing;
- humor/timing;
- generic/cliché output;
- line-composition issues;
- over-explanation;
- formality/verbosity problems.

The sample demonstrates the correction signal, not model perfection.

---

# 7. Phase 3 — OpenAI first look

## Target submission

**20 August 2026 at the latest**

## Offer

Present:

- Batch 1 as complete and secured;
- Batch 2 as actively being built;
- 50-row sample;
- Batch 1 provenance;
- methodology;
- failure taxonomy;
- live Book as product demonstration;
- future combined 1,948-row suite.

## Preferred consideration

Preferred first ask:

> OpenAI API credits rather than cash.

Before outreach, privately decide:

```text
ideal credit-equivalent value
comfortable acceptance value
minimum value worth changing the external commercial plan for
```

Do not publish the private floor in the initial approach.

## First-look clock

Start the 4–6 week first-look window on submission.

Real engagement includes:

- human sample request;
- technical questions;
- methodology discussion;
- call/meeting;
- NDA discussion;
- procurement discussion;
- active human negotiation.

An automated receipt does not count as substantive engagement.

---

# 8. Phase 4 — freeze 1,000 Batch 2 source questions/scenarios

## Dates

**18–20 August 2026**

## Objective

Create the source evaluation surface before generating model answers.

Do not generate answers first and invent the source set afterward.

## Required source fields

```text
id
question_or_scenario
domain
intended_focus
created_at
source_set_version
```

## Coverage guidance

Use real social territory relevant to the Book, including:

- dating;
- relationships;
- breakup;
- crush;
- situationships;
- work;
- bosses;
- colleagues;
- career;
- money;
- decisions;
- social life;
- friends;
- family;
- plans;
- travel;
- food;
- coffee;
- restaurants;
- appearance;
- attraction;
- confidence;
- timing;
- humor;
- shade;
- casual Thai;
- particles;
- ellipsis;
- slang;
- Thai-English lexical mixing;
- indirectness;
- social hierarchy;
- ambiguous everyday conversational situations.

No fixed 5×5 experimental matrix is required.

## Freeze rule

Once the 1,000 source IDs/questions are approved, freeze them before looking at model quality.

Do not change difficult questions after seeing weak outputs simply to improve the resulting dataset.

---

# 9. Phase 5 — generate Batch 2 raw drafts

## Dates

**20–21 August 2026**

## Objective

Generate and preserve the raw-model side of Batch 2 under a stable protocol.

## Required provenance per row

```text
source_id
question_or_scenario
provider
model/model snapshot where available
generation_timestamp
generation_instruction_version
raw_model_output
```

## Protocol rule

Use one stable generation instruction for the batch where practical.

If the instruction changes materially, increment the protocol version and preserve that fact.

## Evidence rule

Do not clean obvious model mistakes before review.

Weak model output is part of the evaluation evidence.

---

# 10. Phase 6 — human review of all 1,000 Batch 2 rows

## Dates

**21 August – 3 September 2026**

## Objective

Give every row one explicit native-Thai editorial judgment.

## Recommended operational structure

Use ten immutable review blocks of 100 rows each.

```text
Batch2 Review Block 01: 001–100
Batch2 Review Block 02: 101–200
...
Batch2 Review Block 10: 901–1000
```

This improves restartability, QA and provenance without turning the work into a heavy scientific protocol.

## Daily throughput target

Recommended range:

```text
70–100 rows/day
```

Approximate implications:

- 100/day = 10 review days;
- 80/day = 12–13 review days;
- 70/day = 14–15 review days.

The schedule therefore targets 3 September with useful buffer.

## Decision labels

Every row receives exactly one:

### ACCEPT

Publishable/natural enough unchanged.

### EDIT

Meaningful source structure remains, but the human editor changes language/composition.

### REWRITE

Substantially re-expressed by the human editor.

These are editorial/provenance labels, not copyright conclusions.

## Raw/final rule

For every EDIT or REWRITE preserve both:

```text
raw_model_output
final_human_approved
```

Never overwrite the source model output.

## Lightweight reason tags

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

Keep tagging useful but lightweight enough that 1,000 rows remain practical.

## Quality rule

Do not target a desired intervention percentage.

The intervention rate is an observed result, not a success metric.

---

# 11. Phase 7 — English sibling/adaptation layer

## Dates

**21 August – 4 September 2026**

## Scheduling

Run continuously in parallel with Thai review.

Do not wait until all 1,000 Thai rows are finished before starting English.

## Authority rule

Thai is authoritative.

English is a sibling/adaptation, not the source language.

Preserve:

- recommendation direction;
- certainty;
- humor;
- social intent;
- emotional temperature.

Do not mechanically preserve Thai word order.

---

# 12. Phase 8 — Batch 2 QA and immutable freeze

## Dates

**4–6 September 2026**

## Objective

Mechanical integrity and provenance QA only.

Do not use QA as another open-ended editorial expansion phase.

## Required checks

- exactly 1,000 source IDs;
- exactly 1,000 explicit review decisions;
- no duplicate IDs;
- no empty required fields;
- no missing raw model outputs;
- no missing final Thai;
- every EDIT/REWRITE retains raw + final;
- reason tags validate against allowed vocabulary;
- bilingual IDs match;
- no accidental source duplication where avoidable;
- Thai line breaks preserved;
- encoding valid;
- JSONL parses cleanly;
- CSV row count matches JSONL;
- immutable hashes generated.

## Frozen outputs

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

Once released/frozen, do not overwrite these evidence files.

---

# 13. Phase 9 — cross-batch analysis

## Dates

**6–8 September 2026**

## Objective

Show process repeatability and recurring pragmatic failure patterns across two independent review rounds.

## Required analysis

At minimum calculate:

```text
Batch 1 intervention rate
Batch 2 intervention rate
Batch 1 accepted-as-is rate
Batch 2 ACCEPT rate
Batch 2 EDIT rate
Batch 2 REWRITE rate
reason-tag frequencies
recurring failure modes
new Batch 2 failure modes
domain-level patterns
Thai pragmatic patterns
code-mixing patterns
register failures
humor/timing failures
```

Where Batch 1 historical labels do not map perfectly onto the newer Batch 2 taxonomy, state the limitation rather than inventing false symmetry.

## Interpretation rule

The value of Batch 2 is repeatability and a second independently reviewed evaluation surface.

Do not claim that doubling rows automatically doubles commercial value.

Do not target a desired intervention rate.

---

# 14. Phase 10 — assemble the full commercial suite

## Dates

**8–10 September 2026**

## Target package

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

A joined convenience file may be added, but do not erase separate batch provenance by presenting the asset only as an anonymous `1948.jsonl`.

---

# 15. Phase 11 — OpenAI follow-up

## Target date

**9–10 September 2026**

Assumes first-look submission around 20 August.

## Rule

Send one concise follow-up.

By this point Batch 2 should be substantially or completely finished, giving the follow-up a real update rather than a generic reminder.

Useful update:

> The second independent review batch is now complete; the suite contains 1,948 reviewed records with separately frozen provenance.

If OpenAI has already entered substantive human engagement, continue naturally rather than sending a redundant canned follow-up.

---

# 16. Phase 12 — OpenAI decision window

## Earliest decision point

Approximately **17 September 2026** — four weeks after a 20 August submission.

## Six-week endpoint

Approximately **1 October 2026**.

## Scenario A — substantive engagement

Continue the OpenAI discussion if there is real technical/commercial engagement.

Do not create unnecessary artificial deadlines during active human diligence.

## Scenario B — interest but weak consideration

Compare any API-credit/cash offer with the private minimum-equivalent floor.

Do not accept a token amount merely for the OpenAI name if it meaningfully harms the external option.

## Scenario C — no substantive engagement

At roughly the six-week mark, end the first-look waiting period and move to external licensing.

No additional build period should be required because the full 1,948-row suite is already complete by then.

---

# 17. Phase 13 — external non-exclusive benchmark licensing

## Start

**1–5 October 2026 if required**

## Commercial positioning

Default external use is evaluation/benchmark-focused.

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
redistribution
sublicensing
```

Final legal language must be reviewed before a signed sale.

## Pricing anchors

Working range:

```text
US$5,000–US$12,000 per non-exclusive buyer
```

Recommended opening anchor:

```text
US$8,000–US$9,000
```

Keep the true minimum acceptable number private.

## External target order

1. KBTG / Thai-language AI research teams.
2. SCB 10X / Typhoon.
3. Sea AI Lab / Southeast Asian language teams.
4. Other Thai/SEA model-evaluation groups.
5. Defined.ai / dataset-marketplace or partnership route as secondary channel.

## Rights rule

Prefer preserving:

- non-exclusive rights;
- no redistribution;
- no sublicensing;
- no training rights under the benchmark license;
- confidentiality of the bulk corpus;
- ability to license the same suite to additional buyers.

Charge materially more before considering exclusivity, redistribution or broader downstream rights.

---

# 18. Phase 14 — multi-buyer commercial period

## Planning horizon

**October 2026 onward, approximately 6–12 months**

Internal scenario only:

```text
2–3 non-exclusive licenses
≈ US$12,000–US$25,000 cumulative
```

This is a planning scenario, not a forecast or market guarantee.

The strategic advantage of non-exclusive licensing is preserving the ability to monetize the same evaluation asset more than once.

---

# 19. Explicitly out of scope

Do not revive the earlier heavy ThaiPrag-1K experimental protocol unless explicitly requested.

Not required:

- baseline vs guided A/B generation;
- blind X/Y review;
- randomized condition reveal;
- 800/200 sealed holdout;
- 100-row repeat-review reliability study;
- fixed 5×5 experimental matrix;
- causal treatment claims;
- OpenAI Evals packaging as a prerequisite.

The final priority is:

> speed + repeatability + 100% explicit human review + honest provenance.

---

# 20. Claims discipline

The final package may honestly claim:

- two independently traceable review batches;
- 1,948 total normal reviewed records after Batch 2 completion;
- explicit human judgment on every Batch 2 row;
- documented model-output → editor-final deltas;
- recurring Thai pragmatic failure categories;
- repeatability of the same general single-editor review workflow;
- frozen provenance suitable for diligence;
- a live Book product using the asset without bulk-public distribution after security migration.

Do not claim:

- 1,948 rows are large-scale foundation-model training data;
- every Batch 1 row is fully human-authored;
- Batch 2 is a randomized scientific benchmark;
- the two batches prove causal model improvement;
- the dataset mathematically removes translation smell;
- all records are DPO preference pairs;
- unrestricted training rights are included.

---

# 21. Public-release policy

Keep the full bulk corpus private while private monetization remains realistic.

The live Book may remain public because it exposes only individual outputs through normal interaction after the security migration.

Public bulk release is a separate irreversible decision.

Default rule:

> Keep the corpus private. Treat public release as irreversible.

---

# 22. Schedule recovery rules

If any milestone slips, recover using the smallest intervention that preserves evidence quality.

Priority order:

1. never compromise the security/parity gate;
2. never compromise 100% explicit Batch 2 human review;
3. never overwrite raw provenance;
4. never fabricate QA symmetry between batches;
5. overlap workstreams before extending the overall timeline;
6. reduce presentation polish before reducing evidence quality;
7. let the external-sales start date move before weakening the corpus/provenance.

Examples:

- If OpenAI package polish slips, submit a smaller clean first-look package rather than delaying weeks.
- If English siblings lag, continue them in parallel after Thai review; Thai remains authoritative.
- If review throughput drops, extend Batch 2 freeze a few days rather than rubber-stamping ACCEPT decisions.
- If cross-batch analysis takes longer, keep analysis concise; the frozen reviewed data is more important than elaborate charts.

---

# 23. Daily operating checklist

The scheduled Answers commercialization check-in should answer:

```text
1. What is today's milestone?
2. What is today's required output?
3. What is overdue?
4. What is blocked?
5. Is the next milestone still achievable?
6. What is the smallest corrective action if schedule has slipped?
7. Has any action threatened security, provenance or claims discipline?
```

---

# 24. Definition of complete

The operational plan is complete when:

### Security

- live Book remains visually/behaviorally intact;
- v124 routing mechanics remain exact;
- deterministic parity is proven;
- corpus is no longer a one-request public download;
- all known corpus-bearing public mirrors are secured;
- public client receives one answer only;
- DB-native Admin is authoritative;
- secure rollback does not require republishing the corpus.

### Batch 1

- 948-row historical package remains immutable and traceable;
- security/commercial checkpoint is frozen;
- AI involvement is disclosed accurately.

### Batch 2

- exactly 1,000 source questions/scenarios frozen;
- exactly 1,000 model drafts preserved;
- exactly 1,000 explicit native-editor decisions completed;
- raw/final pairs preserved;
- lightweight reason tags captured;
- bilingual layer completed where required;
- QA passes;
- immutable exports/hashes frozen.

### Combined package

- Batch 1 and Batch 2 remain separately traceable;
- combined 1,948-row suite exists;
- cross-batch summary exists;
- methodology/data card/license scope are buyer-ready;
- bulk corpus remains private.

### Commercial

- OpenAI receives first disclosure-forward opportunity;
- first-look window is observed without pausing Batch 2 production;
- API credits are preferred consideration for OpenAI unless another form is materially better;
- external non-exclusive benchmark licensing is ready immediately after first-look resolution;
- default external opening anchor remains approximately US$8k–US$9k;
- training/exclusive/redistribution rights are not casually bundled into the default license.

---

# 25. Instruction for the next chat

Start with:

> **Read `ANSWERS-PRIVATE-SERVER-MIGRATION-PLAN.md`, `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md`, and `ANSWERS-COMMERCIAL-EXECUTION-TIMELINE.md`. Treat the execution timeline as the operational schedule, the private-server plan as technical authority, and the commercial benchmark plan as commercial/provenance authority. Preserve v124 routing exactly. Security gate is targeted to close on 17 August 2026. Then execute the overlapping OpenAI-first-look + Batch-2 plan without reviving the blind-X/Y ThaiPrag protocol unless explicitly requested.**
