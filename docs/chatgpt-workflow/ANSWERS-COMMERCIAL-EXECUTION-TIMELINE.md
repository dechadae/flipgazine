# The Book of Answers — Commercial Execution Timeline

**Status:** ACTIVE MASTER EXECUTION PLAN — VOICE/BENCHMARK GATE COMPLETE; BATCH 2 AUDIT PROTOCOL PLANNED  
**Created:** 17 August 2026  
**Updated:** 18 August 2026  
**Project:** Flipgazine / The Book of Answers  
**Repository:** `dechadae/flipgazine`  
**Supabase:** `sjpvhgxacsiorrtijqua`  
**Commercial authority:** `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md`  
**Public benchmark authority:** `ANSWERS-VOICE-BENCHMARK-PLAN.md`  
**Human evaluation authority:** `ANSWERS-HUMAN-EVALUATION-SCHEME.md`  
**Batch 2 audit protocol:** `ANSWERS-BATCH2-SELF-AUDIT-PROTOCOL.md`  
**Benchmark implementation record:** `ANSWERS-VOICE-BENCHMARK-IMPLEMENTATION-REPORT.md`  
**Benchmark acceptance record:** `ANSWERS-VOICE-BENCHMARK-ACCEPTANCE-2026-08-18.md`  
**Security gate:** COMPLETE — 17 August 2026  
**Voice/public-benchmark gate:** COMPLETE — 18 August 2026  
**Batch 2 audit implementation gate:** NOT YET BUILT — requires explicit implementation instruction

---

# 1. Executive direction

The security migration, Book showcase, Voice methodology page, public Voice benchmark and evaluator selection are complete. Do not reopen them as dependencies unless a verified production regression appears.

The project now moves into three parallel tracks:

```text
TRACK A — OpenAI corpus/evaluation pitch
TRACK B — Thai + SEA LLM developer benchmark/rubric outreach
TRACK C — build and review Batch 2 (1,000 new records)
```

Track C now has an approved planning protocol for preserving one raw ChatGPT draft, auditing it without rewrite, automatically escalating confident Thai/Fluent self-ratings to Qwen, and withholding machine judgments from a predetermined 10% blind-control subset until after human review.

The key operating principle remains:

> **The demonstrator is finished. Let outreach and dataset expansion happen at the same time.**

Do not wait for Batch 2 before making contact, and do not wait for OpenAI before speaking with Thai/SEA LLM teams.

The Batch 2 audit layer must improve evidence quality without changing the central provenance story:

```text
ChatGPT raw draft
→ frozen before audit
→ machine audit metadata
→ native Thai editor ACCEPT / EDIT / REWRITE
→ final Thai
```

The machine is allowed to be wrong. Human-machine disagreement is evidence.

---

# 2. Final milestone calendar

| Date | Milestone |
|---|---|
| **17 Aug 2026** | ✅ Security migration complete; final commercial/benchmark strategy locked |
| **18 Aug 2026** | ✅ Voice benchmark UI/backend shipped; 36-case editor-grounded selective calibration completed; Groq judge selected |
| **18 Aug 2026** | ✅ `qwen/qwen3.6-27b` selected; production acceptance tests passed; public benchmark gate complete |
| **18 Aug 2026** | ✅ Batch 2 self-audit + blind-control methodology added to the master plan; implementation remains gated |
| **19–20 Aug** | Launch OpenAI outreach and Thai/SEA LLM developer outreach in parallel |
| **18–20 Aug** | Freeze 1,000 Batch 2 source questions/scenarios and predetermined 10% blind-control assignment |
| **Before scale** | Implement protocol only after explicit approval; independently verify security/provenance; run 20-row pilot |
| **20–21 Aug working target** | Generate and preserve Batch 2 raw drafts once pilot gate passes |
| **21 Aug–3 Sep** | Human review all 1,000 Batch 2 records |
| **21 Aug–4 Sep** | English sibling/adaptation layer in parallel |
| **4–6 Sep** | Batch 2 QA and immutable freeze |
| **6–8 Sep** | Cross-batch + evaluator-agreement + blind-control analysis |
| **8–10 Sep** | Assemble complete 1,948-record suite |
| **9–10 Sep** | Send substantive completion update to active OpenAI and Thai/SEA conversations |
| **Sep onward** | Continue substantive technical/commercial discussions; benchmark/rubric opportunities may proceed independently of corpus discussions |

Dates are working targets. Evidence quality, protocol integrity and explicit human review take precedence over cosmetic schedule perfection.

---

# 3. Phase 0 — completed security baseline

## Status

**COMPLETE — 17 August 2026.**

The production corpus is private-server owned and no longer bulk-accessible through the public controller.

Preserve the completed security/parity artifacts. Do not retune the router during commercial or benchmark work.

The live Book remains a product demonstration, not a public bulk-data endpoint.

The later Voice security follow-up also removed the obsolete privileged calibration executor and hardened temporary probe routes. Do not recreate a general-purpose database outbound-execution path for Batch 2.

---

# 4. Phase 1 — Voice benchmark implementation

## Status

**COMPLETE — 18 August 2026.**

Live `/voice.html` contains the approved public benchmark after the AI-probe material and before the final Mental Model section.

The visitor flow is:

```text
Question / scenario
+ AI response
→ Evaluate
→ qualitative verdict
→ View details
→ six-dimension rubric lightbox
→ Test another
```

Production behavior:

- evaluates the six frozen rubric dimensions;
- returns 1–4 ratings;
- returns severity, flags, rationale and confidence;
- returns a qualitative verdict rather than a public overall 0–100 score;
- never rewrites;
- never suggests corrections;
- keeps CARE separate;
- never exposes or sends the private 948-row corpus to the judge.

The frozen internal weights remain useful for audit/analysis, but the public API/UI does not present an overall numeric score as authority on Thai naturalness.

Live implementation evidence is frozen in:

```text
ANSWERS-VOICE-BENCHMARK-IMPLEMENTATION-REPORT.md
ANSWERS-VOICE-BENCHMARK-ACCEPTANCE-2026-08-18.md
ANSWERS-VOICE-PUBLIC-OPERATIONS-AUDIT-2026-08-18.md
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

The judge is useful for diagnosis but is explicitly not final authority on genuinely native spoken Thai.

---

# 7. Phase 4 — Voice + benchmark launch

## Status

**COMPLETE — 18 August 2026.**

Acceptance evidence includes:

- two-input workflow present in live `/voice.html`;
- qualitative result (`Fluent`, `Minor problem`, `Major problem`, `Not acceptable`);
- complete six-dimension details lightbox;
- malformed/missing input rejection;
- strict judge-output validation;
- CARE remains separate;
- no rewrite leakage detected in calibration;
- private corpus excluded from the service;
- `GROQ_API_KEY` server-side only;
- rate and token-budget protection active;
- no permanent submitted-text storage by Flipgazine;
- explicit public caveat that AI Thai-naturalness judgment is a signal, not final authority;
- quiet human-contact CTA with scope limitations;
- no SaaS-style commercial funnel.

A known native-Thai false-positive pattern was converted into a deliberately narrow regression guard rather than a broad claim that regex rules can encode Thai naturalness.

The public benchmark is therefore a working showroom for the rubric, not a replacement for the native editor.

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

Batch 2 may add machine-audit metadata around that workflow, but **ChatGPT remains the drafter and Decha remains the human editorial authority**.

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

### Blind-control assignment

Before generation quality or audit results are known, assign exactly **100 of the 1,000 source IDs (10%)** to the blind human-control lane using a documented deterministic random method/seed.

Record at minimum:

```text
blind_control = true / false
blind_seed_version
```

The blind assignment becomes immutable once generation begins.

This is an anchoring-control device inside the review workflow. Do not overclaim it as a randomized causal experiment without stronger design/analysis support.

---

# 11. Phase 5D — Batch 2 audit implementation + pilot gate

## Status

**PLANNED — NOT YET IMPLEMENTED.**

Authority:

`ANSWERS-BATCH2-SELF-AUDIT-PROTOCOL.md`

No Supabase schema, private audit endpoint or Batch 2 audit storage should be created until explicit implementation approval is given.

When approved, implementation order is:

```text
A. freeze B2 protocol versions + blind-selection seed method
B. create private append-only provenance/audit storage
C. implement ChatGPT workflow contract and audit recording
D. implement authenticated/server-only Qwen audit path
E. enforce explicit request/token budgets
F. independently verify grants, immutability and auditor provenance
G. run real 20-row pilot
H. review pilot evidence and ergonomics
I. freeze v1
J. scale Batch 2
```

### Security requirement

The Qwen path necessarily sends the selected scenario + frozen draft to Groq.

The correct claim is:

> **Outbound inference risk is not eliminated; it is narrowed and access-controlled.**

Do not recreate a general-purpose `SECURITY DEFINER` HTTP executor.

Required controls include:

- authenticated/server-only internal audit path;
- server-side provider secret;
- no anonymous internal endpoint;
- no bulk private-corpus access;
- only the exact scenario + frozen draft required for that row leaves the server;
- explicit per-call/global spend and token limits;
- stored auditor provenance distinguishing `chatgpt_self` and `qwen_external`.

### Twenty-row pilot

Before scale, run 20 real Batch 2 rows through the full workflow and verify:

- freeze + SHA-256 before audit;
- self-audit does not mutate raw Thai;
- automatic Qwen escalation works;
- blind rows hide all machine judgments until human decision;
- assisted rows remain fast to review;
- ACCEPT / EDIT / REWRITE persist correctly;
- raw and final Thai remain separate;
- machine/human disagreement remains visible.

Adjust presentation ergonomics if needed. Do not retune the rubric merely to improve human-machine agreement.

---

# 12. Phase 6 — generate Batch 2 raw drafts + pre-human audits

## Target

**20–21 August 2026 working target, after pilot gate passes.**

### Drafting authority

ChatGPT remains the Batch 2 drafting model.

For each recorded generation event, generate **one raw Thai draft only**.

Do not generate multiple hidden candidates and select a winner.

For each row preserve:

```text
source_id
question_or_scenario
provider
model/model snapshot where available
generation_timestamp
generation_protocol_version
raw_thai
raw_thai_sha256
```

Use a stable generation instruction. If it changes materially, increment the protocol version.

### Freeze before audit

Immediately freeze and hash the exact raw answer before any self-evaluation.

After freeze:

- no word changes;
- no particle changes;
- no punctuation changes;
- no line-break changes;
- no silent cleanup;
- no regeneration based on the audit.

Weak outputs are evidence.

### ChatGPT diagnosis-only self-audit

Every row receives a self-audit against the frozen six dimensions:

```text
Intent / Cause                 20%
Thai Pragmatic Naturalness     25%
BFF Conversational Voice       20%
Lexical / Social Fit           15%
Stance / Decision Strength     10%
Composition / Delivery         10%
```

Record:

```text
six ratings (1–4)
Audit Index (internal only)
qualitative verdict
severity
flags
short rationale
confidence
auditor = chatgpt_self
audit protocol version
```

The Audit Index is analytical metadata, not a “Thai correctness” score.

### Automatic Qwen escalation

Automatically submit the frozen scenario + raw draft to the server-side Qwen audit when:

```text
ChatGPT Thai Pragmatics = 4/4
OR
ChatGPT verdict = Fluent
```

Additional triggers may include:

- low self-audit confidence;
- CARE;
- semantic-drift uncertainty;
- predetermined random calibration sample;
- later human-machine disagreement.

Qwen remains a second machine opinion, not validation.

### Blind vs assisted presentation

For the 100 predetermined blind-control rows:

- run/store machine audits normally;
- hide Audit Index, verdict, ratings, flags, rationale and Qwen result from Decha;
- reveal machine results only after the first human decision is committed.

For the remaining 900 assisted rows, show a compact audit alongside the raw draft.

Recommended presentation unit: **20 rows per review block**.

---

# 13. Phase 7 — human review all 1,000 Batch 2 rows

## Target

**21 August – 3 September 2026**

Use ten review groups of 100 for restartability and QA, presented operationally in blocks of 20.

Every row receives exactly one decision:

- **ACCEPT**
- **EDIT**
- **REWRITE**

For EDIT/REWRITE retain both raw and final versions.

### Human authority

Machine audits never determine acceptance.

The authority order remains:

```text
Decha direct judgment
→ ANSWERS-VOICE-TONE.md
→ human-reviewed corpus evidence
→ ChatGPT self-audit
→ Qwen external audit
```

If both machines say Fluent and Decha edits the Thai for naturalness, preserve the disagreement.

### Reason tags

Use lightweight reason tags only. Suggested vocabulary:

```text
thai_naturalness
translation_shape
stance
register
lexical_choice
particle
humor
social_specificity
code_mixing
composition
line_break
semantic_drift
too_complete
too_generic
other
```

Do **not** add the full six-point human commentary scheme to all 1,000 rows.

Suggested daily target:

```text
70–100 rows/day
```

Do not target a preferred intervention rate. The observed rate is evidence.

### Optional post-human audit

EDIT and REWRITE rows may receive a second ChatGPT self-audit on the final human Thai.

Selected rows may receive a post-human Qwen audit.

Store post-human audits as new records. Never overwrite the pre-human audit.

If a machine rates the human final worse, the human final remains authoritative.

---

# 14. Phase 8 — English sibling/adaptation

## Target

**21 August – 4 September 2026**, continuously in parallel with Thai review.

Thai is authoritative.

English should preserve:

- recommendation direction;
- certainty;
- humor/social intent;
- emotional temperature.

Do not mechanically translate Thai syntax.

English adaptation begins from the settled human-final Thai, not from the self-audit or Qwen opinion.

---

# 15. Phase 9 — Batch 2 QA and immutable freeze

## Target

**4–6 September 2026**

Required checks:

- exactly 1,000 source IDs;
- exactly 100 immutable blind-control IDs;
- exactly 1,000 recorded raw ChatGPT drafts;
- raw draft hash present before audit;
- exactly 1,000 ChatGPT pre-human self-audits;
- every self-audit Thai=4 or Fluent has a corresponding Qwen audit unless a documented infrastructure failure exists;
- auditor identity distinguishes `chatgpt_self` and `qwen_external`;
- blind machine results were not revealed before first human decision;
- exactly 1,000 human review decisions;
- no duplicate IDs;
- no empty required fields;
- all raw outputs preserved;
- all final Thai present;
- EDIT/REWRITE retain raw + final;
- reason tags validate;
- bilingual IDs match;
- Thai line breaks preserved;
- JSONL/CSV parse and row counts match;
- immutable hashes generated;
- no audit result overwrote historical evidence.

Frozen outputs should include:

```text
source-prompts.jsonl
raw-chatgpt-drafts.jsonl
chatgpt-self-audits-pre.jsonl
qwen-external-audits.jsonl
human-reviews.jsonl
final-reviewed-thai.jsonl
chatgpt-self-audits-post.jsonl
english-siblings.jsonl
batch2_review_summary.csv
audit-agreement-summary.csv
blind-control-summary.csv
batch2_manifest.json
SHA256SUMS.txt
```

Do not overwrite frozen evidence afterward.

---

# 16. Phase 10 — cross-batch + evaluator analysis

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

Batch 2 additionally enables:

```text
ChatGPT self-awareness rate
self-audit Fluent + human EDIT/REWRITE rate
self-audit Major + human ACCEPT rate
Thai Pragmatics 4 + human thai_naturalness edit rate
Qwen catches issue ChatGPT missed
ChatGPT catches issue Qwen missed
both machine judges miss human issue
both machine judges agree with human
assisted vs blind-control intervention rates
assisted vs blind Thai-naturalness intervention rates
composition-only differences between assisted and blind review
```

The 10% blind lane is primarily an anchoring/control check. Do not claim causal effects merely because review behavior differs between assisted and blind rows.

Do not invent false symmetry where Batch 1 historical labels differ from Batch 2 taxonomy.

The commercial value of Batch 2 is process repeatability and evaluator evidence, not simply twice as many rows.

---

# 17. Phase 11 — assemble the full suite

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
│   ├── raw-chatgpt-drafts.jsonl
│   ├── chatgpt-self-audits-pre.jsonl
│   ├── qwen-external-audits.jsonl
│   ├── human-reviews.jsonl
│   ├── final-reviewed-thai.jsonl
│   ├── chatgpt-self-audits-post.jsonl
│   ├── english-siblings.jsonl
│   ├── review-summary.csv
│   ├── audit-agreement-summary.csv
│   ├── blind-control-summary.csv
│   └── provenance/
│
├── ANALYSIS/
│   ├── cross-batch-summary.csv
│   ├── intervention-rates.csv
│   ├── evaluator-agreement.csv
│   ├── self-awareness-summary.csv
│   ├── blind-control-summary.csv
│   └── failure-mode-summary.csv
│
└── SHA256SUMS.txt
```

Keep the two batches separately traceable.

Machine-generated audits must be clearly labeled machine-generated metadata and must not be described as additional human annotation.

---

# 18. Phase 12 — substantive completion update

## Target

**9–10 September 2026**

Send an update to every conversation that has become substantive.

Useful update:

> The second independent native-editor review batch is complete; the suite now contains 1,948 reviewed records with separately frozen provenance. Batch 2 also preserves pre-human automated audit metadata and machine-human disagreement evidence, while the public Thai pragmatic benchmark remains live.

Do not send repetitive generic follow-ups where active human discussion is already underway.

---

# 19. Claims discipline

The project may honestly say, once the corresponding work is complete:

- Batch 1 contains 948 reviewed records;
- Batch 2 adds 1,000 native-editor-reviewed records;
- the planned combined suite reaches 1,948 normal records;
- Batch 2 raw ChatGPT drafts are frozen before automated audit;
- ChatGPT self-audits the frozen draft without rewriting it;
- confident Thai=4/Fluent self-audits are automatically escalated to Qwen;
- a predetermined 10% blind-control subset withholds machine judgments until after the human decision;
- machine-human disagreement is retained as evidence;
- the benchmark uses a six-dimension rubric;
- the automated Qwen judge was selected using a 36-case editor-grounded selective calibration set plus constructed rubric-edge/CARE cases;
- Qwen3.6-27B materially outperformed the compared GPT-OSS judges on the frozen calibration surface;
- the public benchmark evaluates alignment with the Book's editorial/pragmatic criteria;
- the corpus is no longer bulk-publicly exposed.

Do not say:

- every record is fully human-authored;
- ChatGPT self-audit is independent evaluation;
- Qwen validates universal/native Thai correctness;
- machine-machine agreement proves fluency;
- all 36 calibration cases were a new blind multi-annotator human panel;
- the corpus is unrestricted third-party training data;
- Batch 2 is automatically a randomized causal experiment;
- the machine score determines acceptance;
- outbound inference risk was eliminated.

---

# 20. Explicitly not required

Do not spend time on:

- six-point human evaluation of all 948 Batch 1 records;
- deep human commentary on all 1,000 Batch 2 rows;
- making all 1,000 rows blind;
- sealed holdouts unless a later research goal specifically requires them;
- rigid fixed matrices;
- public leaderboards;
- user accounts for the benchmark;
- automated public rewrites;
- SaaS-style funnel mechanics;
- changing human-final Thai merely to improve a machine audit score.

The final priority is now:

> **use the finished showroom → expand the corpus under frozen provenance → measure machine/human disagreement without letting the machine rewrite history → talk to the right people in parallel.**

---

# 21. Daily operating checklist

Each project check-in should answer:

```text
1. Has any verified Voice/benchmark regression appeared? (Otherwise keep the gate closed.)
2. Is OpenAI outreach active?
3. Is Thai/SEA developer outreach active?
4. How many Batch 2 source questions are frozen?
5. Has the 10% blind-control assignment been frozen before generation?
6. Has the Batch 2 audit implementation/pilot been explicitly approved and, if so, passed its 20-row gate?
7. How many raw Batch 2 drafts are frozen + hashed?
8. How many ChatGPT self-audits are recorded?
9. Are all Thai=4 / Fluent rows receiving required Qwen escalation?
10. How many human ACCEPT / EDIT / REWRITE decisions are complete?
11. Are blind rows still withholding machine judgments until first human decision?
12. Is the English sibling layer progressing in parallel?
13. Is any shortcut weakening provenance, human authority or security?
14. Is public benchmark usage/abuse still within conservative limits?
15. What is the smallest action that advances the next milestone today?
```

---

# 22. Current next action

> **Continue OpenAI corpus/evaluation outreach and Thai/SEA benchmark/rubric outreach while freezing the 1,000 Batch 2 source scenarios and the predetermined 10% blind-control assignment. The revised Batch 2 self-audit/Qwen protocol is now documented, but no Supabase audit schema or private endpoint should be built until explicit implementation approval. Once approved, implement and independently verify the provenance/security controls, run the 20-row pilot, freeze v1, then scale generation and native-editor review. Do not reopen the completed public Voice benchmark unless a verified regression appears.**