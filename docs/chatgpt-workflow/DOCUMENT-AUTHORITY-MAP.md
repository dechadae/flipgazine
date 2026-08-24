# ChatGPT Workflow — Document Authority Map

**Checkpoint:** 24 August 2026, 18:09 Asia/Bangkok  
**Purpose:** prevent stopped TCJ experiments, superseded prompt architectures, contaminated writer/evaluator evidence and stale next-actions from being mistaken for current authority.

## Read these first

1. `CURRENT-STATE.json` — canonical machine-readable state.
2. `ANSWERS-TCJ-REPOSITORY-BOOTSTRAP-AND-WRITER-FEASIBILITY-GATE-20260824.md` — **current execution checkpoint and native-human gate.**
3. `ANSWERS-TCJ-REPOSITORY-CONNECTED-REFERENCE-RUNTIME-AND-SESSION-CONTINUITY-PLAN-20260824.md` — governing repository-connected architecture and session-continuity plan.
4. `ANSWERS-TCJ-V7-COMMERCIAL-SIM-SELECTIVE-GATE-20260824.md` — frozen failed diagnostic that motivated the pivot; never retune.
5. `ANSWERS-TCJ-MANDATORY-PROTECTED-EVIDENCE-ARCHITECTURE-AMENDMENT-20260823.md` — protected evidence remains bounded/non-reconstructive on the TCJ editor side.
6. `ANSWERS-TCJ-METHODOLOGY-PACK-AND-CONTEXT-RETRIEVER-SPEC-20260823.md` — historical/governing concepts where compatible, but Methodology Pack is now the portable compiled fallback rather than the reference brain.
7. `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-V2-20260823.md` and roadmap docs — broad commercial direction where not superseded above.

## Current reference architecture

```text
Git repository = durable conceptual/project memory
Private Supabase evidence = protected native-human empirical memory
Focus/reachability = address system for relevant private evidence
Capable LLM = semantic reasoning engine
Capable writer = writes
TCJ = native senior release editor
```

The writer receives only a compact role/voice capsule plus the exact task/source by default. TCJ does not write the initial copy. The repository-connected editor reasons from a pinned safe Git snapshot plus bounded focus/reachability private evidence and returns only:

```text
SHIP
or
REVISE + one primary problem + one smallest useful instruction
```

## Repository-connected bootstrap — implemented

The first private frozen authority mirror is:

```text
snapshot       TCJ-REPO-REFERENCE-BOOTSTRAP-20260824-47349851
repo           dechadae/flipgazine
pinned commit  47349851f4d2655bcb6d831538b4ddc5645a815e
files          3
bytes          31,007
manifest       0cf0973ffa6df63b40305c87645c106a072ec6bffa90174f5acb0ed2cab1c09e
```

It contains only the bootstrap authority chain: `CURRENT-STATE.json`, this authority-map generation's predecessor, and the repository-connected architecture plan. Hidden qualification material, raw corpus rows and secrets are excluded by policy.

The active repository-connected reference-judge research worker is:

```text
slot       tcj-gemini-focus-exception-pee9-worker-v2
version    2
SHA-256    750b995d303aed39fe07fa806467e5f3cb4fae4ae0693e1219630bc921b3b62c
model      gemini-3.5-flash-lite
evidence   TCJ-MANDATORY-PROTECTED-EVIDENCE-v11-NEGATIVE-FIRST-RESEARCH
```

Bootstrap/status smoke test passed. Raw private evidence is not exported. Repository search/read is bounded to four tool calls.

This first bootstrap snapshot remains immutable history. Before the later A/B/C evaluator experiment, create an **expanded fresh frozen safe conceptual snapshot** from the then-current canonical Git state rather than mutating this one.

## CURRENT — writer-only feasibility gate

The current human task is **not yet a TCJ evaluation test**.

Fresh writer bank:

```text
set id           19
set key          TCJ-ROLE-WRITER-FEASIBILITY-SOURCE-BANK-2026Q3-v1
cases            8
prior hash overlap 0
source manifest  42fe22fa2c0c7b4be43d45fba087c629627e1ff78fce928156abb59643db7e07
TCJ exposed      false
```

Writer:

```text
model             gemini-3.5-flash-lite
prompt SHA        fa1d708093e2903fb42fb932a808543d342c76120964891b8fa758523a11aa56
worker slot       tcj-rewrite-lift-neutral-gemini35-worker-v3
worker version    6
worker SHA        6a252a72a6fbb1e0ad5c3c958ac1658fcb4577f462842f8ebf07c0473bdf821e
generation        8 / 8 complete
terminal/errors   0
HTTP 429           0
output mismatch    0
```

Writer receives no TCJ methodology, private evidence or editorial brief.

Native-human review:

```text
protocol   TCJ-ROLE-WRITER-FEASIBILITY-HUMAN-REVIEW-2026Q3-v1
state      0 / 8 at checkpoint
URL        https://flipgazine.pages.dev/tcj-writer-feasibility-review-v1.html
API        tcj-rewrite-lift-hard-review-v2 v6
API SHA    6259df72a7ba8d7dd0e78b1e7ef163744d45603315a506a3f874240a99bd3107
page SHA   70704c22072e0574a489582485270beba5ac33a44bb2344cf17de122411daee4
JS SHA     525dca9a94f6757af4e73b8fb0ee344d3b697c897f36296dc765ee788317c52b
```

### Human rule

`SHIP` only if the exact draft is publishable unchanged. `REVISE` if any meaningful edit is needed, including shortening. Do not balance labels.

### Isolation rule

These eight cases are permanently **writer-feasibility only**. After 8/8:

1. freeze/hash the human manifest before interpretation;
2. do not expose these cases to TCJ;
3. do not use them in the later evaluator score;
4. if writer quality is bad, preserve the failure and build another fresh writer pilot;
5. if writer quality is viable, create a separate fresh A/B/C evaluator bank.

## Next evaluator experiment — only after writer viability

Use a separate fresh bank and the same frozen writer outputs within that experiment to compare:

```text
A = strong semantic model alone
B = repository-connected TCJ
C = repository-connected TCJ + bounded focus/reachability private evidence
```

Interpretation:

```text
A → B = value of TCJ conceptual/project memory
B → C = incremental value of proprietary native-human evidence
A → C = total TCJ value
```

Freeze human gold before unblinding model judgments. Never tune reviewed cases to improve scores.

## Closed negative evidence

### v7

```text
Human SHIP         1
Human REVISE      23
TCJ SHIP          16
TCJ REVISE         8
Missed revisions 15
Agreement          9 / 24 = 37.5%
```

v7 is frozen failed diagnostic evidence. Do not rerun, rewrite, relabel or retune it.

### v1 role-conditioned writer

Historical blind result:

```text
TCJ wins       2
Baseline wins  1
Ties          13
Neither        0
```

This motivated returning writing to the capable role-conditioned model rather than injecting more TCJ guidance into the writer.

## Protected historical authority — Qualification 2.0

Reverified live at this checkpoint:

```text
Protocol            TCJ-QUALIFICATION-2.0-2026Q3-v1
Status              human_frozen
Unique pairs        24
Review clicks       28
Hidden repeats       4
Human manifest      07a25c08b331c215bf6a7378665726c376045bcb9d547d3cd21eaca22b51428d
Bank manifest       8e3d6c5fff4860f97bfbfcd8d69c46e5484da0d5c315ed6f4888d0061d09b7c8
machine_exposed_at  null
```

Do not expose Q2 to development models. It cannot certify the materially changed repository-connected successor.

## Paid frontier resources

No paid OpenAI/xAI development calls. Any later paid authority experiment requires an immediate live preflight plus explicit user approval.

## Immediate next action

```text
native human reviews 8 writer-only drafts ← CURRENT
→ freeze/hash writer-human manifest
→ decide writer viability
→ if viable, create a separate fresh A/B/C evaluator bank + expanded safe repo snapshot
→ freeze candidate runtime only if fresh evidence supports it
→ new hidden native-human authority instrument
→ final paid frontier experiment with explicit approval
→ commercial release path
```
