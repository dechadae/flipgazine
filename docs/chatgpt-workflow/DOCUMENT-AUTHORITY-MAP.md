# ChatGPT Workflow — Document Authority Map

**Checkpoint:** 24 August 2026, 17:39 Asia/Bangkok  
**Purpose:** prevent stopped TCJ experiments, superseded prompt architectures and stale next-actions from being mistaken for current authority.

## Read these first

1. `CURRENT-STATE.json` — canonical machine-readable state.
2. `ANSWERS-TCJ-REPOSITORY-CONNECTED-REFERENCE-RUNTIME-AND-SESSION-CONTINUITY-PLAN-20260824.md` — **current architectural plan and execution authority.**
3. `ANSWERS-TCJ-V7-COMMERCIAL-SIM-SELECTIVE-GATE-20260824.md` — frozen failed diagnostic that motivated the current pivot.
4. `ANSWERS-TCJ-MANDATORY-PROTECTED-EVIDENCE-ARCHITECTURE-AMENDMENT-20260823.md` — protected private evidence remains mandatory/bounded on the TCJ editor side.
5. `ANSWERS-TCJ-METHODOLOGY-PACK-AND-CONTEXT-RETRIEVER-SPEC-20260823.md` — still relevant, but the Methodology Pack is now a portable compiled fallback rather than the reference brain.
6. `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-V2-20260823.md` — commercial architecture where not superseded by newer authority.
7. `ANSWERS-TCJ-ROADMAP-TO-FINAL-COMMERCIAL-PRODUCT-20260823.md` — broad commercial roadmap where not superseded.

## Current reference architecture

```text
Git repository = durable conceptual/project memory
Private Supabase evidence = protected native-human empirical memory
Focus/reachability = address system for relevant private evidence
Capable LLM = semantic reasoning engine
Capable writer = writes
TCJ = native senior release editor
```

Reference flow:

```text
compact writer role + exact task/source
→ capable model writes finished Thai copy
→ repository-connected TCJ reads exact scenario + finished copy
→ TCJ may retrieve relevant canonical repository material
→ focus/reachability selects bounded private evidence
→ semantic judge decides SHIP or REVISE
→ if REVISE, same writer edits its CURRENT finished draft using one smallest useful instruction
→ optional TCJ re-check
```

TCJ itself does not become the writer.

Do not inject raw private evidence, large TCJ methodology dumps or long TCJ editorial briefs into the writer by default.

## Repository connection means retrieval, not prompt concatenation

The reference judge has read access to an exact pinned Git snapshot. It does **not** receive the whole repository pasted into every request.

Every new TCJ session begins:

```text
CURRENT-STATE.json
→ DOCUMENT-AUTHORITY-MAP.md
→ active checkpoint
→ governing amendments
→ live Supabase verification
```

Then the judge retrieves only repository files relevant to the current reasoning task.

Development may follow `main`; any candidate/qualified release must pin an exact commit SHA.

## Session continuity is now part of the architecture

A fresh development agent does not need the original chat transcript to resume competently.

The repository externalizes the durable project memory and Supabase externalizes live/private state.

Standard boot procedure:

```text
1. open canonical Git repo
2. read CURRENT-STATE.json
3. read DOCUMENT-AUTHORITY-MAP.md
4. read active checkpoint and amendments
5. verify live Supabase
6. confirm protected experiments remain untouched
7. retrieve task-relevant docs
8. continue from next_action unless the user supersedes it
```

A minimal new-chat prompt is documented in the active plan.

Exact behavioral identity with one historical ChatGPT session is not guaranteed, but the project knowledge, operating rules, evidence and retrieval path that materially shape competent work can be reproduced.

## Why this pivot happened

### v1 role-conditioned writer

`TCJ-REWRITE-LIFT-GEMINI35-v1` used a strong specialist BFF writer role and concise instruction.

Frozen blind result:

```text
TCJ wins       2
Baseline wins  1
Ties          13
Neither        0
```

Interpretation: the strong simple role already did most of the useful writing work; heavier TCJ rewrite guidance added little. The role is not proven as the only causal factor because input shape also differed.

### v7 failed diagnostic

```text
Cases            24
Human SHIP        1
Human REVISE     23
TCJ SHIP         16
TCJ REVISE        8
Correct SHIP      1
Correct REVISE    8
Missed revisions 15
Agreement         9 / 24 = 37.5%
```

v7 showed two things:

1. the writer simulation itself was poor and often severely overlong;
2. TCJ still falsely SHIPPED most copy the native editor would revise.

Do not rerun, relabel, rewrite or tune v7 to improve this score.

## Methodology Pack status

The Methodology Pack is preserved.

Current role:

```text
repository-connected runtime = reference/high-context architecture
compiled Methodology Pack = portability/export fallback
```

Future research may compare the portable pack against the repository-connected reference. The reference runtime must not be weakened merely to make portability easier.

## Private evidence invariant

Protected evidence remains bounded and non-reconstructive.

```text
scenario + candidate
→ focus normalization
→ canonical focus mapping
→ reachability
→ relevant private neighborhood
→ derived findings only
→ semantic judge
```

Raw private rows, row IDs, nearest proprietary examples, hidden qualification cases and reconstructive edit pairs remain inside the trust boundary.

## Immediate next action

1. Implement the repository-connected reference judge bootstrap against a canonical Git snapshot.
2. Retain the existing focus/reachability private evidence mechanism.
3. Restore the simple strong role-conditioned writer approach.
4. Run only a small fresh writer-feasibility pilot before another large human gate.
5. If writer viability is demonstrated, create a separate fresh evaluation bank.
6. Compare:
   - A: strong model alone;
   - B: repository-connected TCJ;
   - C: repository-connected TCJ + bounded private evidence.
7. Freeze a candidate runtime only if fresh native-human evidence supports it.
8. Do not reuse v7 for scoring.

## Protected historical authority — Qualification 2.0

`TCJ-QUALIFICATION-2.0-2026Q3-v1` remains `human_frozen`, with `machine_exposed_at = null` according to the canonical checkpoint. It must not be exposed to development models and cannot certify the materially changed repository-connected successor.

## Paid frontier resources

No paid OpenAI/xAI development calls. Any later paid authority experiment requires a live pricing/balance/request-count preflight and explicit user approval immediately before dispatch.

## Commercial sequence

```text
repository-connected reference bootstrap ← CURRENT
→ tiny role-writer feasibility pilot
→ fresh A/B/C evaluator experiment
→ candidate runtime freeze if supported
→ new hidden native-human authority instrument
→ final paid OpenAI/xAI causal frontier experiment (explicit approval)
→ authority decision
→ plug-and-play API
→ private-server / BYOJ / BYOK
→ customer-specific Git + private evidence adaptation
→ control plane / audit / rollback
→ production/security hardening
→ commercial release
```
