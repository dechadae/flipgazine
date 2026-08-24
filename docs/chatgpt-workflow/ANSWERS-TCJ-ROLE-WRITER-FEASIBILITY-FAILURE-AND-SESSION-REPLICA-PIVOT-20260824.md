# TCJ Role-Writer Feasibility Failure & Session-Replica Pivot

**Date:** 24 August 2026  
**Status:** CURRENT DEVELOPMENT CHECKPOINT  
**Canonical Supabase project:** `sjpvhgxacsiorrtijqua`

## 1. Frozen result

The first fresh role-only writer feasibility gate is complete and failed.

```text
source bank       TCJ-ROLE-WRITER-FEASIBILITY-SOURCE-BANK-2026Q3-v1
source manifest   42fe22fa2c0c7b4be43d45fba087c629627e1ff78fce928156abb59643db7e07
cases             8
human manifest    97c372791de1f4af77950f5b100efa8c8b0956efa5bced19f4de5cd48a4270e1
human SHIP        0
human REVISE      8
output mismatch   0
TCJ exposed       false
```

The human manifest was computed and frozen before the SHIP/REVISE distribution was inspected.

These eight cases remain writer-feasibility diagnostic evidence only. They must never be exposed to TCJ, rerun to improve the result, relabeled, or reused in evaluator scoring.

## 2. Generation integrity

Writer:

```text
model             gemini-3.5-flash-lite
prompt SHA        fa1d708093e2903fb42fb932a808543d342c76120964891b8fa758523a11aa56
worker slot       tcj-rewrite-lift-neutral-gemini35-worker-v3
worker version    6
worker SHA        6a252a72a6fbb1e0ad5c3c958ac1658fcb4577f462842f8ebf07c0473bdf821e
complete          8 / 8
provider errors   0
HTTP 429           0
transport errors  0
hash mismatch     0
```

The writer received no TCJ methodology, no private evidence and no TCJ editorial brief. It received the simple historical role-conditioned writer prompt.

## 3. Diagnostic failure pattern

After the human manifest was frozen, the failed outputs were inspected for mechanism diagnosis.

The dominant pattern is **performed BFF-ness rather than naturally situated Thai writing**.

Observed symptoms include:

- forced `แก` / `มึง` intimacy regardless of whether the situation licenses it;
- stretched vowels and exaggerated chat performance;
- gratuitous emojis;
- repeated camp / `ตัวแม่` signaling;
- generic reassurance and motivational filler;
- jokes added after the useful point has already landed;
- multi-paragraph advisor scaffolding;
- unsupported factual or situational assumptions;
- over-explicit explanation where native conversational Thai would normally omit or stop.

One case invented a pet-hotel capability rather than staying within supplied facts. Several outputs sounded like a model performing a stereotype of a close Thai friend rather than an actual context-sensitive friend response.

Therefore the failure cannot be repaired merely by a shorter length limit or by making the BFF role prompt more emphatic.

## 4. Architectural inference

The historical v1 result had suggested that a compact specialist role was sufficient for much of the writing work. This fresh 0/8 gate shows that the earlier result did **not** establish role prompting as a portable writing solution.

The current stronger hypothesis is:

> This ChatGPT session performs well on Answers writing not because it receives the label “BFF,” but because it has access to a large accumulated project state: native-human corrections, voice history, failure history, current architecture, explicit do-not-do lessons, and the ability to retrieve relevant private evidence.

This is the same reason a new ChatGPT conversation can become productive quickly after booting from the canonical repository and live Supabase state.

The next writer experiment must therefore test **session-state reproduction**, not another persona prompt.

## 5. Session-replica writer hypothesis

A fresh writer model should receive:

```text
pinned safe canonical Git memory
+ exact scenario / source meaning
+ bounded focus/reachability native-human findings
+ a minimal task instruction
→ finished Thai response
```

The writer should **not** be instructed to perform slang, camp, warmth, mock intimacy or visible BFF markers.

The repository and private evidence should carry the actual voice knowledge.

Reference minimal instruction:

> You are the working writer for Answers. Use the connected canonical project repository and the bounded native-human evidence as your working context. Write the final Thai response that you would actually publish for the supplied scenario and source meaning. Do not perform stereotyped BFF slang or add warmth, jokes, certainty, facts or explanation merely to sound conversational. Output only the finished Thai response.

The exact prompt is a development artifact and must be frozen before the next fresh bank is generated.

## 6. Repository memory policy

The next writer uses an **expanded safe conceptual snapshot** from the then-current canonical Git commit.

Safe conceptual material should include, at minimum:

- `CURRENT-STATE.json`;
- `DOCUMENT-AUTHORITY-MAP.md`;
- this active checkpoint;
- repository-connected runtime/session-continuity plan;
- `ANSWERS-VOICE-TONE.md`;
- native-human review/evaluation principles;
- Voice benchmark acceptance/implementation lessons;
- TCJ/Thai conversation architecture;
- corpus routing/reachability implementation knowledge;
- mandatory protected-evidence boundary.

It must exclude:

- hidden qualification banks/cases;
- Qualification 2.0 item content;
- raw private corpus rows;
- raw nearest proprietary examples;
- secrets or provider credentials;
- any material whose presence would contaminate a later hidden authority test.

The snapshot is immutable once frozen. Future conceptual changes require a new snapshot/commit.

## 7. Private evidence policy for the writer experiment

This experiment deliberately tests the user's original hypothesis that session-level project knowledge plus **the existing focus/reachability mechanism** may reproduce the useful advantage of this ChatGPT session.

Private retrieval remains bounded and non-reconstructive.

```text
scenario + source meaning
→ normalize / focus / reachability
→ relevant private neighborhood
→ derived findings only
→ writer
```

Do not export raw rows, IDs, nearest complete examples, edit pairs or hidden qualification material.

If the current protected-evidence function is too evaluator-specific for pre-writing use, create a dedicated writer-context projection over the same deterministic focus/reachability substrate rather than exposing more raw data.

## 8. Next fresh writer gate

Create a completely fresh small bank, approximately 6–8 cases.

Rules:

1. zero reuse of the failed eight;
2. zero exact scenario/source hash overlap with existing evidence;
3. freeze bank before provider generation;
4. freeze repo snapshot and writer instruction before generation;
5. generate sequentially to avoid artificial rate-limit failures;
6. native human sees only scenario/source and finished writer output;
7. `SHIP` means publish exact copy unchanged; `REVISE` means any meaningful edit including shortening;
8. do not balance labels;
9. freeze/hash the complete human manifest before interpreting the distribution;
10. these feasibility cases are never later used to score TCJ.

If the session-replica writer remains systematically bad, stop again. Do not proceed to evaluator A/B/C testing.

If it produces a healthy non-degenerate set of publishable and imperfect outputs, create a **separate fresh evaluator bank** for A/B/C.

## 9. Evaluator experiment remains downstream

Only after writer viability:

```text
A = strong semantic model alone
B = repository-connected TCJ
C = repository-connected TCJ + bounded private evidence
```

The current failed role-writer cases and the future writer-feasibility cases are not part of that score.

## 10. Protected authority and paid resources

Qualification 2.0 remains historical protected authority and must stay machine-unexposed during development.

No paid OpenAI/xAI calls are authorized for development. Any later paid authority experiment still requires explicit user approval immediately before dispatch.

## 11. Current principle

```text
Do not teach the model to ACT like the voice.
Give the model access to the MEMORY that produced the voice.

Git = durable conceptual memory
private evidence = native-human empirical memory
focus/reachability = relevant-memory addressing
model = reasoning/writing engine
```

The next development question is now precise:

> Can a fresh capable model write materially more natural Thai when it is given a reproducible approximation of this session's external memory system, rather than a persona prompt?
