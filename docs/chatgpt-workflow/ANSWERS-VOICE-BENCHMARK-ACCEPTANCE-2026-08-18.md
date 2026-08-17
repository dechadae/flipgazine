# The Book of Answers — Voice Benchmark Acceptance Record

**Status:** ACCEPTED FOR PUBLIC USE  
**Date:** 18 August 2026  
**Benchmark version:** `voice-2026-08-18-v1`  
**Implementation report:** `ANSWERS-VOICE-BENCHMARK-IMPLEMENTATION-REPORT.md`

## Frozen production state

```text
/voice.html site_files version: 23
/voice.html md5: 6741ce4ac93ae32c28cfb632190502db
voice-eval Edge Function version: 7
voice-eval status: ACTIVE
judge: qwen/qwen3.6-27b
```

## Acceptance checks

| Check | Result |
|---|---|
| Allowed Pages-origin preflight | PASS — 204 and exact `Access-Control-Allow-Origin` |
| Foreign browser origin | PASS — 403 |
| Missing required inputs | PASS — 400 |
| Per-IP minute protection | PASS — requests 1–3 accepted, request 4 blocked with 60-second retry |
| Strong natural/code-mixed Voice case | PASS — 100/100, PASS, no flags |
| Forced camp/code-mixing case | PASS — 23/100, MAJOR, forced/register diagnostics |
| Fundamental semantic drift | PASS — 0/100, CRITICAL, `semantic_drift` |
| CARE-safe serious response | PASS — 100/100, CARE, PASS |
| Automated rewrite leakage in calibration | PASS — zero detected |
| Three identical production repeats | PASS — identical six 4/4 ratings, 100/100, PASS, empty flags, high confidence on all three |
| Final score computed server-side | PASS |
| Submitted text stored permanently | NO — operational metadata only |
| Private 948-row corpus used by judge | NO |
| `GROQ_API_KEY` exposed to browser/repo | NO |
| Temporary calibration retrieval route | DISABLED — runner version 6 is inert 404 |

## Visual-browser note

The execution environment's organization policy blocks headless Chromium navigation to `flipgazine.pages.dev`, so an automated visual screenshot/render pass could not be completed from this session.

The following were verified independently:

- the public Pages shell is reachable over HTTP;
- the shell explicitly loads page bodies from Supabase `site_files` by path;
- live `/voice.html` v23 contains the benchmark markup, responsive CSS, result state, lightbox, CARE disclosure, CTA and endpoint script;
- the browser-facing API/CORS contract is live and passing.

No production rendering error was observed. A human visual smoke test is still advisable after future CSS or shell changes.

## Decision

The Voice/public-benchmark gate is complete.

Proceed to the previously approved parallel work:

```text
A — OpenAI corpus/evaluation outreach
B — Thai + SEA LLM benchmark/rubric outreach
C — Batch 2 source freeze + generation/review
```
