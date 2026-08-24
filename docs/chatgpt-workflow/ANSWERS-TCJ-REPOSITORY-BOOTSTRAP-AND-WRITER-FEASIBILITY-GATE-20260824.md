# TCJ Repository Bootstrap & Writer-Feasibility Gate — Checkpoint

**Date:** 24 August 2026  
**Status:** ACTIVE NATIVE-HUMAN GATE  
**Canonical Supabase project:** `sjpvhgxacsiorrtijqua`  
**Reference architecture:** repository-connected semantic editor + bounded focus/reachability private evidence

## 1. What changed

The repository-connected reference architecture is now implemented far enough to enter its first native-human writer-feasibility gate.

The current development split is:

```text
capable writer + compact role + exact task/source
→ finished Thai copy

finished copy
→ repository-connected TCJ semantic editor
→ bounded focus/reachability private evidence
→ SHIP or REVISE + one problem + one smallest instruction
```

TCJ does not write the initial copy and the writer does not receive TCJ methodology, TCJ private evidence or a large editorial brief by default.

## 2. Frozen repository bootstrap snapshot

Reference source commit:

`47349851f4d2655bcb6d831538b4ddc5645a815e`

Commit message:

`docs(tcj): make repository-connected runtime current authority`

Private mirror snapshot:

`TCJ-REPO-REFERENCE-BOOTSTRAP-20260824-47349851`

Snapshot manifest SHA-256:

`0cf0973ffa6df63b40305c87645c106a072ec6bffa90174f5acb0ed2cab1c09e`

Frozen bootstrap contents are an explicit allowlist, not a whole-directory copy:

1. `docs/chatgpt-workflow/CURRENT-STATE.json`
2. `docs/chatgpt-workflow/DOCUMENT-AUTHORITY-MAP.md`
3. `docs/chatgpt-workflow/ANSWERS-TCJ-REPOSITORY-CONNECTED-REFERENCE-RUNTIME-AND-SESSION-CONTINUITY-PLAN-20260824.md`

File count: `3`  
Total bytes: `31,007`

The source policy explicitly excludes hidden qualification material, raw corpus rows and secrets. There is no GitHub credential stored in Supabase for this runtime.

Private database support added:

- `private.tcj_repo_snapshots`
- `private.tcj_repo_snapshot_files`
- `private.tcj_repo_snapshot_manifest_v1(...)`
- `private.tcj_repo_read_v1(...)`
- `private.tcj_repo_search_v1(...)`
- `private.tcj_repo_bootstrap_v1(...)`

Direct `public` / `anon` / `authenticated` access is revoked.

The deterministic bootstrap smoke test resolved the pinned commit, current state, authority map and active checkpoint successfully and returned `raw_private_evidence_exported = false`.

This three-file snapshot is the **bootstrap authority bundle**, not yet the final complete safe conceptual allowlist. The safe conceptual mirror may be expanded before the later A/B/C evaluator experiment, but hidden qualification and raw protected evidence remain excluded.

## 3. Repository-connected reference judge

A versioned historical research slot was reused so no old Edge Function version had to be deleted:

`tcj-gemini-focus-exception-pee9-worker-v2`

Active repository-connected version: `2`  
SHA-256: `750b995d303aed39fe07fa806467e5f3cb4fae4ae0693e1219630bc921b3b62c`

Historical version `1` remains preserved.

Current reference-judge properties:

- model: `gemini-3.5-flash-lite`;
- frozen repository bootstrap above;
- bounded `repo_search` / `repo_read` access;
- maximum four repository tool calls per evaluation;
- protected evidence: `TCJ-MANDATORY-PROTECTED-EVIDENCE-v11-NEGATIVE-FIRST-RESEARCH`;
- raw private evidence is never exported;
- final public decision schema is only `SHIP` or `REVISE + problem + instruction`;
- `SHIP` requires an explicit release-blocker audit rather than a broad positive impression;
- TCJ never rewrites the answer itself.

Private immutable-style evaluation ledger:

`private.tcj_repo_reference_evaluations`

The live status smoke test returned HTTP 200 and confirmed the exact snapshot commit/manifest, model and evidence contract.

**Important:** the 8 writer-feasibility cases below have not been submitted to this TCJ judge and are contractually excluded from later TCJ scoring.

## 4. Fresh writer-only feasibility bank

Evidence set id: `19`

Set key:

`TCJ-ROLE-WRITER-FEASIBILITY-SOURCE-BANK-2026Q3-v1`

Cases: `8`  
Distinct item keys: `8`  
Distinct phenomena: `8`  
Exact scenario/source hash overlap with prior evidence: `0`

Frozen source-bank manifest SHA-256:

`42fe22fa2c0c7b4be43d45fba087c629627e1ff78fce928156abb59643db7e07`

The cases are deliberately **writer feasibility only**. Their evidence metadata records `tcj_exposure_prohibited = true`.

The writer is `gemini-3.5-flash-lite` using the historical v1 role prompt exactly:

> You are an expert Thai conversational copywriter for a modern close-friend/BFF magazine voice. Rewrite the supplied SOURCE DRAFT so it answers the SCENARIO naturally as something a real Thai close friend would say. Preserve any useful intent, fix tone/wording/composition, and keep it concise. Thai-English mixing, slang, mock politeness, sarcasm, hyperbole and line breaks are allowed only when they feel natural. Do not explain your choices. Output only the rewritten response.

Writer prompt SHA-256:

`fa1d708093e2903fb42fb932a808543d342c76120964891b8fa758523a11aa56`

The writer receives:

- scenario;
- source draft;
- compact role prompt.

It does **not** receive:

- TCJ methodology;
- TCJ private evidence;
- TCJ judgment;
- TCJ editorial brief;
- hidden qualification material.

## 5. Writer generation

Generation worker slot:

`tcj-rewrite-lift-neutral-gemini35-worker-v3`

Active writer-feasibility version: `6`  
SHA-256: `6a252a72a6fbb1e0ad5c3c958ac1658fcb4577f462842f8ebf07c0473bdf821e`

Historical versions remain preserved.

Generation result:

```text
cases              8 / 8 complete
terminal failures  0
provider errors    0
HTTP 429            0
transport errors   0
output hash mismatch 0
average characters 197.9
minimum characters 112
maximum characters 349
TCJ exposure       false
```

Generation was dispatched sequentially to avoid manufacturing provider-throttle failures through unnecessary concurrency.

Provider attempts and raw responses are preserved in:

- `private.tcj_writer_pilot_trials`
- `private.tcj_writer_pilot_attempts`

No native quality judgment has been inferred from character length. The outputs are intentionally left for the native-human gate.

## 6. Native-human writer gate

Protocol id: `1`

Protocol:

`TCJ-ROLE-WRITER-FEASIBILITY-HUMAN-REVIEW-2026Q3-v1`

Current state at checkpoint creation:

```text
reviewed  0 / 8
status    reviewing
manifest  not yet frozen
```

Review question:

> Would you publish this exact finished response unchanged?

Definitions:

- `SHIP` = publish exact copy unchanged.
- `REVISE` = any meaningful edit is needed before publication, including shortening/compression, removing over-explanation, wording/rhythm changes, restructuring, house-voice correction, stance/certainty correction, semantic correction or factual correction.

Do **not** balance labels. A mostly- or entirely-REVISE result is valid evidence that the writer configuration is not viable.

Private review API:

`tcj-rewrite-lift-hard-review-v2`

Active writer-review API version: `6`  
SHA-256: `6259df72a7ba8d7dd0e78b1e7ef163744d45603315a506a3f874240a99bd3107`

The API requires an authenticated Flipgazine admin session and exposes only scenario, source draft, raw writer output, output hash and the human's own decision/note.

Review page:

`https://flipgazine.pages.dev/tcj-writer-feasibility-review-v1.html`

Page SHA-256:

`70704c22072e0574a489582485270beba5ac33a44bb2344cf17de122411daee4`

Controller:

`/fg-page-tcj-writer-feasibility-review-v1.js`

Controller SHA-256:

`525dca9a94f6757af4e73b8fb0ee344d3b697c897f36296dc765ee788317c52b`

Canonical `public.site_files` contains both assets. External web indexing could not independently open the brand-new private review route, so no stronger public-HTTP claim is made here.

## 7. Writer-pilot isolation rule

These eight cases are a **writer validation instrument only**.

After the human finishes all eight:

1. freeze and hash the human writer manifest;
2. inspect the human SHIP/REVISE distribution;
3. **do not expose these 8 cases to TCJ, regardless of the result**;
4. if the writer is systematically bad, preserve the failure and design a new fresh writer pilot;
5. if the writer is viable, create a completely separate fresh bank for the A/B/C evaluator experiment.

The later A/B/C experiment remains:

```text
A = strong semantic model alone
B = repository-connected TCJ
C = repository-connected TCJ + bounded private evidence
```

Thus the writer pilot cannot become contaminated evaluator-development evidence.

## 8. Protected authority and spend state

Qualification 2.0 was reverified immediately before this checkpoint:

```text
protocol             TCJ-QUALIFICATION-2.0-2026Q3-v1
status               human_frozen
unique pairs         24
review clicks         28
hidden repeats         4
bank manifest        8e3d6c5fff4860f97bfbfcd8d69c46e5484da0d5c315ed6f4888d0061d09b7c8
human manifest       07a25c08b331c215bf6a7378665726c376045bcb9d547d3cd21eaca22b51428d
machine_exposed_at   null
```

Q2 remains untouched.

No paid OpenAI/xAI development inference was used. Paid frontier development remains prohibited without explicit user approval immediately before dispatch.

## 9. Immediate next action

**Native-human gate:** review the 8 raw Gemini writer outputs at:

`https://flipgazine.pages.dev/tcj-writer-feasibility-review-v1.html`

Judge naturally. Do not try to produce a balanced distribution.

When all 8 are complete, freeze/hash the human manifest **before any further model exposure or interpretation**. These cases must never be used to score TCJ.
