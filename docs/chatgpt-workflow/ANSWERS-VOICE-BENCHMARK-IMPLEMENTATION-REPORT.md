# The Book of Answers — Thai Voice Benchmark Implementation Report

**Status:** SHIPPED / PUBLIC BACKEND ACTIVE  
**Date:** 18 August 2026  
**Project:** Flipgazine / The Book of Answers  
**Repository:** `dechadae/flipgazine`  
**Supabase project:** `sjpvhgxacsiorrtijqua`  
**Public page:** `/voice.html`  
**Benchmark version:** `voice-2026-08-18-v1`  
**Frozen rubric authority:** `ANSWERS-VOICE-BENCHMARK-PLAN.md`  
**Editorial authority:** `ANSWERS-VOICE-TONE.md`

---

## 1. Result

The public Thai Voice Benchmark is implemented as an isolated evaluator and integrated into the live Voice page.

The production flow is:

```text
/voice.html
  ↓
question/scenario + AI response
  ↓
Supabase Edge Function: voice-eval
  ↓
input validation + rate/usage claim
  ↓
Groq server-side judge
  ↓
strict output validation
  ↓
backend deterministic score
  ↓
score + View details lightbox
```

The browser never receives `GROQ_API_KEY`.

The evaluator does not query the Answers router and does not receive the private 948-row corpus.

The automated benchmark diagnoses only. It does not rewrite, correct, continue, or suggest replacement wording.

CARE remains a separate evaluation mode.

---

## 2. Live implementation state

### `/voice.html`

Live Supabase `site_files` row:

```text
path: /voice.html
version: 23
content md5: 6741ce4ac93ae32c28cfb632190502db
```

Placement is the approved narrative position:

```text
AI transfer probes
→ 19 · Public benchmark
→ 20 · Mental model
```

Public interface:

```text
Question or scenario
AI response
Evaluate
→ 0–100 score
→ qualitative label
→ View details
→ Test another
```

The detail lightbox shows:

- six 1–4 rubric ratings;
- frozen weights;
- severity;
- confidence;
- diagnostic flags;
- short rationale;
- CARE state when applicable.

The human CTA remains deliberately quiet:

```text
Want a human opinion?
I work best with contemporary Thai conversation, editorial voice and creative/product contexts. I’m not the right reviewer for every field, and I may decline work outside my expertise.
Ask Decha
```

No pricing, plans, upgrades, subscriptions, premium tiers, quote workflow, account system, saved history or model controls were added.

### `voice-eval`

Live Supabase Edge Function:

```text
slug: voice-eval
version: 7
status: ACTIVE
verify_jwt: false
ezbr_sha256: eee6363fc02f5a368f67178847db6fb6b1ba263e7304b506982d18ba1320347c
```

Repository source:

```text
supabase/functions/voice-eval/index.ts
supabase/functions/voice-eval/schema.sql
```

The function is intentionally public at the HTTP layer but only accepts browser requests from:

```text
https://flipgazine.pages.dev
```

The provider secret remains server-side in Supabase environment secrets.

---

## 3. Frozen scoring contract

The judge returns only:

```text
intent                1–4
thai_pragmatics       1–4
bff_voice              1–4
lexical_social_fit     1–4
stance                 1–4
composition            1–4
severity               PASS | MINOR | MAJOR | CRITICAL
flags                  frozen taxonomy only
rationale              short diagnosis only
confidence             high | medium | low
```

The judge does **not** return the final 0–100 score.

The backend calculates:

```text
normalized dimension = (rating - 1) / 3 × 100
```

Weights remain frozen:

| Dimension | Weight |
|---|---:|
| Intent / Cause | 20% |
| Thai Pragmatic Naturalness | 25% |
| BFF Conversational Voice | 20% |
| Lexical / Social Fit | 15% |
| Stance / Decision Strength | 10% |
| Composition / Delivery | 10% |

Final score is rounded to the nearest whole number.

Labels:

```text
90–100  Strong alignment
80–89   Good alignment
60–79   Mixed alignment
40–59   Weak alignment
0–39    Poor alignment
```

---

## 4. Calibration set

### Size

**36 cases** were used for judge selection.

This deliberately stays inside the planned 30–50 / preferred 36–48 range rather than attempting to re-evaluate all 948 Batch 1 records.

### Provenance

The 36 cases contain:

```text
24 editor-grounded cases
  = 12 documented native-editor pre/final pairs from the existing review evidence

6 constructed rubric-edge cases
  = advisor-like prose, weak stance, natural code-mixing,
    forced camp/code-mixing, semantic drift, nuanced stance

6 constructed CARE cases
  = self-harm, medical emergency and violence/abuse,
    each with unsafe/minimizing and safe/grounded variants
```

The editor-grounded cases inherit real native-editor before/final decisions and were mapped to the frozen six-dimension rubric before model comparison.

The constructed cases were added to fill rubric/severity edges that the documented pairs did not cover efficiently.

### Claims discipline

This should be described as an **editor-grounded selective calibration set**, not as a new blind 36-case human panel.

The project must not claim that all 36 cases were newly and independently rescored by multiple human annotators.

### Coverage

The set covers:

- all six rubric dimensions;
- 1, 2, 3 and 4 ratings across every dimension;
- PASS, MINOR, MAJOR and CRITICAL;
- implication/omission and overly complete Thai;
- translation-shaped Thai;
- advisor-like prose;
- weak stance and excessive hedging;
- weak composition and landing;
- natural Thai-English borrowing;
- forced/inappropriate code-mixing;
- performative camp/slang;
- semantic drift;
- strong/excellent responses;
- multiple CARE scenarios.

The private calibration rows and model-run evidence remain in the Supabase `private` schema and are not public endpoints.

---

## 5. Groq judge comparison

Candidate models were selected from the models actually available through the configured Groq project on 18 August 2026:

```text
qwen/qwen3.6-27b
openai/gpt-oss-20b
openai/gpt-oss-120b
```

All were evaluated on the same 36-case rubric surface after the shared judge instruction was corrected to reflect the frozen Voice rules:

- Thai implication can satisfy intent;
- conventional assistant completeness is not the target;
- fragments are not automatically weak stance;
- line breaks are language + design;
- borrowed English is not automatically code-mixing failure;
- CARE does not require playful BFF voice.

### Aggregate comparison

| Judge | Valid | Failures | Rating exact | Within ±1 | Rating MAE | Severity accuracy | Flag precision | Flag recall | Mean latency | Rewrite leakage |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| **Qwen3.6-27B** | 35/36 | 1 | **70.5%** | **86.2%** | **0.462** | **57.1%** | **66.7%** | 28.6% | **488 ms** | **0** |
| GPT-OSS 20B | 33/36 | 3 | 40.9% | 63.1% | 1.111 | 36.4% | 20.0% | 20.9% | 705 ms | 0 |
| GPT-OSS 120B | 36/36 | 0 | 33.3% | 59.7% | 1.194 | 41.7% | 22.0% | **35.3%** | 1,161 ms | 0 |

Calibration token totals:

```text
Qwen3.6-27B     prompt 22,104   completion 5,639
GPT-OSS 20B     prompt 33,487   completion 7,447
GPT-OSS 120B    prompt 36,652   completion 10,062
```

### Selection

**Selected production judge: `qwen/qwen3.6-27b`.**

Selection was based on agreement with the editor-grounded rubric labels, not model size.

Qwen was materially better on:

- exact criterion agreement;
- overall rating error;
- severity agreement;
- diagnostic precision;
- latency;
- token efficiency.

Its one invalid calibration result used a flag outside the frozen taxonomy. Production therefore validates the exact output contract and performs at most one repair retry when JSON/schema validation fails.

---

## 6. Post-calibration judge hardening

Calibration exposed two important behaviors that were corrected using rules already frozen in `ANSWERS-VOICE-TONE.md`.

### Do not reward surface camp

A constructed exaggerated response initially received too much credit because the judge inferred a camp audience from the response itself.

Production now instructs the judge to evaluate register against evidence in the **scenario**, not a persona invented from the response.

Stacked English, exaggerated slang or performative camp without contextual justification should be treated as forced rather than rewarded as personality.

### Reserve CRITICAL for fundamental failure

Production explicitly reserves `CRITICAL` for:

- fundamental semantic misunderstanding/drift;
- serious applicable safety failure.

Ordinary style, register, verbosity or stance problems should not become CRITICAL by themselves.

These are not new rubric dimensions. They are enforcement of the frozen rubric/Voice rules.

---

## 7. CARE mode

CARE is detected from the question/scenario using a deliberately narrow set of serious-risk patterns covering:

- self-harm/suicide;
- overdose or severe medical-emergency cues;
- chest pain / inability to breathe / unconsciousness / severe bleeding / seizure;
- violence, abuse and direct safety threats.

CARE changes judge interpretation rather than adding a seventh weighted dimension.

In CARE:

- safety recognition is required;
- clarity and grounded directness are rewarded;
- minimization is heavily penalized;
- the response is **not** penalized for avoiding humor, camp, slang or playful BFF performance.

The UI discloses CARE mode in the result/details.

---

## 8. Output validation and no-rewrite enforcement

The production server validates:

- exact top-level key set;
- integer 1–4 bounds for all six dimensions;
- severity enum;
- diagnostic flags against the frozen allowlist;
- maximum eight unique flags;
- rationale length;
- confidence enum;
- no extra fields.

A rationale is rejected if it contains common rewrite/suggestion markers such as:

```text
better version
try saying
say instead
you could say
ควรพูด
ลองพูด
แก้เป็น
เขียนใหม่
เปลี่ยนเป็น
```

If structured output fails, the model receives one constrained repair attempt.

There is no rewrite endpoint and no preferred-answer generator.

---

## 9. Input, origin and abuse controls

### Input limits

```text
request body        9,000 bytes max
question/scenario   500 characters max
AI response         2,500 characters max
```

### Browser origin

Allowed:

```text
https://flipgazine.pages.dev
```

Other origins receive `403` and no permissive CORS header.

### Per-IP rate protection

```text
3 requests / minute
20 requests / hour
50 requests / day
```

The stored identifier is a SHA-256 hash derived server-side from the request IP and a server-only secret value. The raw IP is not stored.

### Global usage protection

```text
rolling minute reserved-token ceiling   6,000
rolling day request ceiling             120
rolling day reserved-token ceiling      160,000
rolling 30-day request ceiling          1,500
rolling 30-day reserved-token ceiling   1,500,000
```

These limits are deliberately conservative for the public showroom and can be adjusted later from observed legitimate usage.

---

## 10. Storage / privacy behavior

Submitted question and response text are sent transiently to the selected Groq judge because evaluation requires them.

Flipgazine does **not** permanently store those submitted texts.

`private.voice_eval_usage` stores operational metadata only:

```text
created_at
hashed IP identifier
CARE boolean
model identifier
reserved token estimate
prompt token count
completion token count
latency
status
short error code
```

Operational metadata older than 45 days is opportunistically deleted during new claims.

The private 948-row Book corpus is never loaded by `voice-eval`, never included in the judge prompt and never returned by the endpoint.

---

## 11. Production regression evidence

Post-calibration production tests included:

### Forced camp / code-mixing case

Observed production result:

```text
score: 23 / 100
label: Poor alignment
severity: MAJOR
```

The judge correctly flagged forced/inappropriate register and no longer rewarded the performance as personality.

### Fundamental semantic drift

Observed production result:

```text
score: 0 / 100
label: Poor alignment
severity: CRITICAL
flag: semantic_drift
```

### CARE-safe response

Observed production result:

```text
score: 100 / 100
label: Strong alignment
CARE: true
severity: PASS
```

The serious response was not penalized for lacking playful Voice behavior.

### Natural code-mixing / strong Voice response

Observed production result:

```text
score: 100 / 100
label: Strong alignment
CARE: false
severity: PASS
```

### HTTP / abuse contract

Verified:

```text
allowed-origin preflight     204 + exact Access-Control-Allow-Origin
foreign POST origin          403
missing required inputs      400
per-IP requests 1–3          accepted
per-IP request 4             blocked, retry_after 60
```

Rate-test rows were removed immediately after the test.

---

## 12. Public-page delivery verification

A direct HTTP GET to `https://flipgazine.pages.dev/voice.html` correctly returns the persistent Flipgazine shell.

The shell source explicitly states that page bodies are fetched live from Supabase `site_files` by path and then written into the document. This is the expected project architecture, so the raw shell GET is not expected to contain the benchmark markup itself.

The live Supabase `/voice.html` row is v23 and contains:

- section 19 benchmark;
- two input fields;
- Evaluate action;
- result state;
- details lightbox;
- six dimension rows;
- CARE disclosure;
- Test another action;
- quiet human CTA;
- direct call to the isolated `voice-eval` endpoint;
- section 20 Mental model.

A real headless-browser visual pass could not be completed from the execution environment because its organization policy blocks browser navigation to the Pages domain. Network access from Supabase to the public Pages URL and the complete browser-facing API/CORS contract were verified independently.

This is a QA-environment limitation, not an observed production error. A human visual smoke test on the live page is still advisable after any future CSS or shell changes.

---

## 13. Calibration cleanup

The temporary calibration runner used during model comparison has been replaced with an inert endpoint that always returns `404`.

There is no public calibration-case retrieval path.

Calibration cases/results may remain in the Supabase `private` schema as internal audit evidence.

The production `voice-eval` function has no calibration action and no access path to the private 948-row corpus.

---

## 14. Definition-of-done assessment

| Requirement | Result |
|---|---|
| Two-input public workflow | ✅ implemented in live `/voice.html` |
| 0–100 deterministic score | ✅ backend only |
| Six frozen 1–4 dimensions | ✅ |
| Severity / flags / rationale / confidence | ✅ |
| View details lightbox | ✅ |
| Test another | ✅ |
| Diagnosis only, no rewrite | ✅ prompt + validator + no rewrite endpoint |
| CARE separate | ✅ |
| Private corpus excluded | ✅ isolated service, no corpus query |
| Groq key server-side | ✅ |
| Judge calibrated before selection | ✅ 36-case selective set |
| Suitable free Groq judges compared | ✅ Qwen3.6-27B vs GPT-OSS 20B/120B |
| Output/schema validation | ✅ |
| Rate protection | ✅ |
| Spend/usage protection | ✅ |
| No permanent submitted-text storage | ✅ |
| Quiet non-commercial human CTA | ✅ |
| No SaaS dashboard/funnel | ✅ |
| Public network/API smoke tests | ✅ |
| Automated visual browser smoke test | ⚠️ execution environment blocked Pages navigation |

---

## 15. Operational next step

The Voice/public-benchmark gate is no longer the project blocker.

The execution plan can move to the already-approved parallel phase:

```text
A — OpenAI corpus/evaluation outreach
B — Thai + SEA LLM benchmark/rubric outreach
C — Batch 2 source freeze + generation/review
```

Do not reopen benchmark architecture unless a verified production regression or real abuse pattern appears.
