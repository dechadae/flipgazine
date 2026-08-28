# TCJ Qualification v1.1 — Completion, Verified Passports & Research Gate

**Status:** COMPLETED EVIDENCE / CURRENT TCJ EXECUTION CHECKPOINT  
**Date:** 22 August 2026  
**Run:** `TCJ-JUDGE-QUALIFICATION-RUN-2026Q3-v1.1`  
**Protocol:** `TCJ-JUDGE-QUALIFICATION-2026Q3-v1.1`  
**Evidence set:** `TCJ-JUDGE-QUALIFICATION-v1.1`  
**Profile:** `answers-bff-v2`

---

## 1. Executive result

Hidden Qualification v1.1 completed with a valid evidence ledger:

```text
human gold cases                         48
candidate judges                          3
expected machine cells                  144
valid judgments                         144
terminal generation-contract failures    0
committed dispatches                    146
Durable provider responses              146
open dispatches                           0
blocking / compromising incidents         0
warning incidents                         1
Qualification summaries                   3
Qualification-era Passports               3
```

The run itself **passed integrity verification**.

The candidate judges did **not** pass the preregistered production-authority thresholds. All three final Qualification-era Passports are `research_only`, with zero production-qualified dimensions.

This is a **candidate-judge qualification failure, not an evidence/run failure**.

No threshold was loosened after results were observed.

---

## 2. Frozen inputs

```text
threshold SHA-256
b805b1f9484ea5ce576f09187c467b268c1f7c20263efa3889041680af426836

evidence manifest SHA-256
b4d45ad054fd96fbc4cde9dea3eca25f5afd367dd5f3515ee7537cd6ecc7c617

human manifest SHA-256
2e72ec6a0850e92fa74f7ee658ac091c34ee1fb40d4e1db30a400d9c350d5be0

run config SHA-256
71132feec222c5bc45c30bdc0882f498c1aab103e2f7920648ecd7c63f1b8ac7

TCJ core blob SHA
459d9831cf439696e0861f85c26839a43f6b6a64
```

Candidate models:

```text
qwen/qwen3.6-27b
openai/gpt-oss-120b
openai/gpt-oss-20b
```

Provider: Groq. Temperature 0. Maximum completion tokens 500. JSON-object response format. GPT-OSS reasoning effort `low`; Qwen no reasoning-effort override. One schema repair maximum. No semantic resampling.

---

## 3. Pre-registered thresholds

### Qualified dimension

```text
minimum valid cells                    47
maximum MAE                          0.50
minimum within-one cells              45
maximum extreme reversals              0
primary target cases                   8
minimum target within-one              7
```

### Partially qualified dimension

```text
minimum valid cells                    46
maximum MAE                          0.75
minimum within-one cells              43
maximum extreme reversals              1
primary target cases                   8
minimum target within-one              6
```

### Global authority gates

```text
false-fluent on human MAJOR/CRITICAL    0
terminal generation-contract failures   0
```

An extreme reversal is human `<=2` with judge `4`, or human `4` with judge `<=2`.

---

## 4. Canonical integrity verification

The verified finalizer rechecked the canonical database before writing any summary or Passport.

Passed gates included:

- 48 evidence items and 48 `qualification_exposed` items;
- exactly one intended exposure event;
- 144 unique candidate × evidence judgment cells;
- zero unresolved failures;
- zero terminal generation-contract failures;
- zero blocking or compromising incidents;
- exact dispatch request SHA, system-prompt SHA and user-payload SHA;
- `request_payload_text::jsonb = request_payload` for every dispatch;
- exact provider-response and assistant-output hashes;
- exactly one durable response per dispatch;
- every attempt linked to its durable dispatch and response;
- attempt projections match durable request/response ledgers;
- exactly one primary attempt per logical cell;
- at most one schema-repair attempt per cell;
- no semantic resampling;
- every judgment sourced from a valid, evidence-eligible attempt;
- provider/model/settings match the frozen run config;
- primary request payload contains only `question_or_scenario` and `candidate_response` and matches the frozen human-reviewed bytes/hashes;
- no configured hidden metadata leakage;
- two historical diagnosis-hash normalization mismatches are covered by two valid canonical hash attestations with preserved provenance.

The single warning incident remains preserved:

```text
TCJ-Q-RUN-2026Q3-v1.1-INC-HASH-001
class      infrastructure
severity   warning
```

It records the first two diagnosis hashes being computed before JSON transport normalization. Exact provider evidence was preserved; canonical attestations cover both records; no model rerun was required.

---

## 5. Rollback rehearsal

Before finalization, the exact finalizer was executed inside a transaction and rolled back:

```text
BEGIN
→ finalizer returned complete result
→ 3 summaries / 3 Passports / run manifest generated
ROLLBACK
```

Post-rollback verification confirmed:

```text
run status       running
summaries        0
new Passports    0
```

Only after that rehearsal passed was the finalizer executed for real.

Migration:

```text
20260822125533_tcj_qualification_v11_verified_finalizer
```

The migration creates:

- `private.tcj_qualification_passport_hash_v1(...)`
- `private.tcj_finalize_qualification_run_v1(text)`

---

## 6. Candidate results

### qwen/qwen3.6-27b

Overall six-dimension rating behavior:

```text
cases                         48
rating cells                 288
exact ratings                198
within-one ratings           242
overall rating MAE        0.5347
severity exact             28/48
false-fluent MAJOR/CRITICAL    2
provider attempts              48
schema repairs                  0
```

Dimension outcomes:

| Dimension | MAE | Within-one | Extreme reversals | Primary-target within-one | Authority |
|---|---:|---:|---:|---:|---|
| intent | 0.5000 | 40/48 | 7 | 5/8 | research_only |
| thai_pragmatics | 0.5208 | 41/48 | 5 | 7/8 | research_only |
| bff_voice | 0.4583 | 42/48 | 6 | 8/8 | research_only |
| lexical_social_fit | 0.5417 | 40/48 | 7 | 5/8 | research_only |
| stance | 0.5625 | 40/48 | 8 | 7/8 | research_only |
| composition | 0.6250 | 39/48 | 9 | 6/8 | research_only |

Qwen was the closest candidate on rating accuracy, but it failed the global false-fluent authority gate and the preregistered within-one/extreme-reversal dimension gates.

### openai/gpt-oss-120b

```text
cases                         48
rating cells                 288
exact ratings                102
within-one ratings           179
overall rating MAE        1.1667
severity exact             14/48
false-fluent MAJOR/CRITICAL    0
provider attempts              50
schema repairs                  2
```

All six dimensions are `research_only`.

### openai/gpt-oss-20b

```text
cases                         48
rating cells                 288
exact ratings                115
within-one ratings           186
overall rating MAE        1.0799
severity exact             17/48
false-fluent MAJOR/CRITICAL    0
provider attempts              48
schema repairs                  0
```

All six dimensions are `research_only`.

---

## 7. Frozen outputs

Run and protocol are now `complete`.

```text
run manifest SHA-256
98f905fb2ccf5d8175eb9c0bb8ad77d3ffb8138170df9ed159d4ff6ebb4ab2c1
```

### Qualification summary hashes

```text
qwen/qwen3.6-27b
72521fdd9a323f35ec7d0a158ac3f1018bff0f66fd292b2f6c3b0394e046a9f3

openai/gpt-oss-120b
8f3a5fa81279f932936bcfebc1310394aa81c7ee769bb9551fdc3b5c4a859428

openai/gpt-oss-20b
35e7a437dd4e8e357bc357c0bd6a5f6164f732d39a1ff1d7a75b4b9591b13dee
```

### Candidate manifest hashes

```text
qwen/qwen3.6-27b
ed32f93be9e1b2b1e69bb40bb08f87a510f7aa8aba996b95ab58dd55b122bb1c

openai/gpt-oss-120b
6f7939eb3730de280dad37f467843126784f0f01f808338c6eb8e9b2ad1b4106

openai/gpt-oss-20b
c10b1f178aa7e5b40012b80137aad3e7bfdd3b5d9dc68fe266ad35f3d4c81c24
```

### Qualification-era Passport hashes

Passport version: `qualification-v1.1`

```text
qwen/qwen3.6-27b
465e6c82d67179125f34cabfdd1f838178e5d0c153e670ee9b5ca88ed5976688

openai/gpt-oss-120b
94feed8819fff761970ca664e7ead5b86c286d4cb1f77f1619d7d0264df48bf8

openai/gpt-oss-20b
5f41d2355f62491e959acde123a65c86ae5cb62fd0bfee40bd702c3538aee400
```

All three Passport hashes and all three summary hashes were recomputed after the write and matched exactly.

All three Passports:

```text
qualification_state     research_only
qualified_dimensions    []
excluded_dimensions     all six TCJ dimensions
```

Preliminary admission/robustness evidence is explicitly not used to create production authority.

---

## 8. Research gate

A production Panel cannot be assembled from this candidate set because no candidate has a qualified or partially-qualified dimension under the frozen Qualification thresholds.

This does **not** justify weakening the thresholds.

This also does **not** justify tuning a changed judge prompt/configuration against Qualification v1.1 and then treating the same exposed bank as hidden evidence.

Qualification v1.1 is now historical evaluation evidence.

The valid continuation is:

```text
analyze failure clusters using the exposed v1.1 evidence
→ identify materially improved candidate models and/or judge configuration
→ freeze the new candidate/config contract
→ construct a fresh hidden Qualification bank
→ native-human blind review/freeze
→ only then execute the new machine Qualification
→ issue new Qualification Passports
→ assemble Panel only from dimensions that actually pass
```

The exposed v1.1 bank may be used for research diagnosis. It may not be reused as the independent hidden authority test for a configuration designed after seeing its outcomes.

---

## 9. Live status behavior

`tcj-live-status` was advanced to v2 after finalization.

The status page now distinguishes:

- successful Qualification ledger completion;
- frozen summaries/Passports;
- production-authority availability;
- the current **no-qualified-judges research gate**.

Stage 8 therefore must not imply routine Panel construction. It reports that zero qualified judges are available and that a new candidate/config set plus fresh hidden Qualification evidence are required.

No human judgment is required for the immediate technical diagnosis/candidate-research step. Native-human judgment will become necessary when the next fresh hidden Qualification bank is ready for blind review and freeze.

---

## 10. Current valid next action

Automate the technical research phase:

1. diagnose dimension-level failure clusters from v1.1;
2. separate model-capability failures from rubric/prompt-contract failures without changing the frozen historical result;
3. identify stronger candidate judges / configurations;
4. preregister the next candidate contract and thresholds before new hidden evidence is exposed;
5. prepare a fresh Qualification bank;
6. stop for native-human blind review only when that new bank is ready.

Do not proceed to production Panel assembly or Assurance with the current three research-only Passports.
