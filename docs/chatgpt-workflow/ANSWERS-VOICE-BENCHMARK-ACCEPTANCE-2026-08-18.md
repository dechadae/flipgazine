# The Book of Answers — Voice Benchmark Acceptance Record

**Status:** ACCEPTED FOR PUBLIC USE — QUALITATIVE VERDICT + SECURITY HARDENING  
**Date:** 18 August 2026  
**Benchmark version:** `voice-2026-08-18-v3`  
**Implementation report:** `ANSWERS-VOICE-BENCHMARK-IMPLEMENTATION-REPORT.md`

## Current production state

```text
/voice.html site_files version: 32
voice-eval Edge Function version: 9
voice-eval status: ACTIVE
judge: qwen/qwen3.6-27b
public overall numeric score: REMOVED
```

## Public result contract

The public benchmark no longer presents an overall `0–100` score or numeric alignment label.

The headline result is now one of four editorial verdicts:

```text
Fluent
Minor problem
Major problem
Not acceptable
```

The verdict is deterministic from the six frozen 1–4 dimensions, severity and fundamental-failure flags:

- `Not acceptable` — CRITICAL, semantic drift, or failed intent;
- `Major problem` — MAJOR or at least one materially weak dimension (`1–2`);
- `Minor problem` — MINOR or at least one dimension at `3` with no major failure;
- `Fluent` — no material issue detected and all six dimensions at `4`.

The public result also shows the judge's short diagnostic rationale. `View details` keeps the useful six 1–4 dimension ratings, confidence, mode, flags and CARE disclosure.

The frozen weights may still be calculated internally for continuity/audit, but the overall numeric score is not returned by the public API and is not displayed in `/voice.html`.

## AI-native-Thai limitation

Post-launch testing exposed a material model limitation: a semantically correct response can still be phrased in a way that is grammatical but not how contemporary Thai speakers naturally talk.

This is now stated explicitly in the public page:

> AI can spot drift, stance, advisor prose and composition more reliably than genuinely native spoken Thai; treat Thai naturalness as a signal, not final authority.

The detail lightbox likewise states that native spoken-Thai naturalness is the least reliable dimension for current general-purpose models and that human editorial judgement remains the authority.

The canonical editorial precedence remains:

```text
direct user-approved wording
→ ANSWERS-VOICE-TONE.md
→ established human-reviewed corpus voice
→ generic model judgement
```

## Native-Thai regression guard

A post-launch false positive was identified for this response:

```text
ถ้าเขาอยากคุย
สองวันก็นานพอให้พิมพ์ได้แล้ว
ไม่ต้องทักซ้ำหรอก
```

The meaning and stance are correct, but `สองวันก็นานพอให้พิมพ์ได้แล้ว` preserves an English-shaped “long enough to...” logical bridge and is not natural contemporary Thai for this social situation.

The native editorial correction supplied during acceptance testing was:

```text
สองวันก็ควรตอบได้แล้ว
```

A narrow human-authored regression guard now prevents the known social-messaging `นานพอ...พิมพ์/ตอบ/ทัก/ส่งข้อความ` pattern from receiving perfect Thai-pragmatics/composition treatment. It does not rewrite user text.

Regression results after the revision:

```text
awkward translated line   → Major problem
  Thai pragmatics         → 2/4
  BFF voice               → 3/4
  Lexical / social fit    → 3/4
  Composition             → 3/4
  flags                    translation_shaped, over_explained,
                           unnatural_lexical_choice

strong Book-style line    → Fluent
human-corrected Thai      → Fluent
```

The guard is deliberately narrow. The project should not attempt to encode all Thai naturalness as regex rules; future human-found false positives should become reviewed regression evidence, not broad speculative heuristics.

## Security hardening follow-up — 18 August 2026

A later security review flagged `voice_eval_*` / `capture_voice_eval_calibration` activity as potentially unexplained elevated-access third-party model execution.

The live audit established that the observed model activity was expected benchmark/calibration work from this implementation cycle, not unexplained corpus exfiltration or an unknown caller:

- production/test usage rows were all for `qwen/qwen3.6-27b` and correspond to the public evaluator/regression testing;
- `private.voice_eval_calibration_runs` contains the deliberate three-model calibration batches used to select the production judge;
- calibration evidence remains in the `private` schema for audit provenance;
- no submitted public question/response text is stored in `voice_eval_usage`.

The review did identify one unnecessary residual privileged execution object:

```text
private.capture_voice_eval_calibration(text, integer)
SECURITY DEFINER
owner: postgres
purpose: outbound HTTP call to the temporary calibration runner
```

Before removal, privilege verification showed:

```text
anon            schema USAGE: no   EXECUTE: no
authenticated   schema USAGE: no   EXECUTE: no
service_role    schema USAGE: no   EXECUTE: no
postgres        schema USAGE: yes  EXECUTE: yes
```

So the function was not publicly callable through normal Supabase roles. However it was no longer necessary after calibration and retained outbound-execution capability under `postgres`, so it was removed rather than merely left dormant.

Applied production migration:

```text
remove_voice_eval_calibration_executor
DROP FUNCTION private.capture_voice_eval_calibration(text, integer)
```

Post-migration verification:

```text
capture_voice_eval_calibration function count: 0
```

The production-only database functions remain because the public evaluator needs them:

```text
private.voice_eval_claim(...)
private.voice_eval_finish(...)
```

Both remain inaccessible to `anon`, `authenticated`, and `service_role`; only `postgres` can execute them through the server-side database connection.

Temporary Voice probe Edge Functions were also hardened. They contain only inert `404 not_found` handlers and now require JWT:

```text
voice-eval-calibration-runner-20260818   inert 404 + verify_jwt=true
voice-eval-regression-20260818           inert 404 + verify_jwt=true
voice-groq-models-20260818               inert 404 + verify_jwt=true
voice-thai-audit-probe-20260818          inert 404 + verify_jwt=true
```

The `http` extension was intentionally not removed because it is project-wide infrastructure and may be used by unrelated components. Removing the obsolete executor itself closes the Voice-specific outbound calibration path without damaging unrelated services.

**Security conclusion:** the flagged historical activity is accounted for, the unnecessary privileged executor is gone, temporary probe routes are inert and authenticated, and the remaining `voice_eval_*` functions are production-required private controls rather than public RPC surface.

## Existing acceptance checks retained

| Check | Result |
|---|---|
| Allowed Pages-origin preflight | PASS — 204 and exact `Access-Control-Allow-Origin` |
| Foreign browser origin | PASS — 403 |
| Missing required inputs | PASS — 400 |
| Per-IP minute protection | PASS |
| Six frozen 1–4 dimensions | PASS |
| CARE separate | PASS |
| Automated rewrite leakage | PASS — diagnosis only |
| Submitted text stored permanently | NO — operational metadata only |
| Private 948-row corpus used by judge | NO |
| `GROQ_API_KEY` exposed to browser/repo | NO |
| Public overall numeric score | REMOVED |
| Obsolete calibration executor | REMOVED |
| Temporary Voice probe routes | INERT 404 + JWT REQUIRED |

## Visual/browser state

Human mobile testing confirmed the evaluator is working on the live page after the Android submit/init fixes. The details lightbox is centered on mobile with an internal height cap, and the two input fields were subsequently compacted for better mobile use.

Current live `/voice.html` source contains no `/100`, `voiceEvalScore`, numeric overall-score rendering, or old alignment labels.

## Decision

The Voice benchmark remains accepted for public use, framed as an **AI-assisted editorial diagnostic**, not a numeric authority on Thai language quality.

The separate security finding is now resolved: historical calibration activity is accounted for, the obsolete outbound `SECURITY DEFINER` executor has been removed, and temporary probe routes are inert and JWT-protected.

Human review remains especially important for native spoken-Thai naturalness.
