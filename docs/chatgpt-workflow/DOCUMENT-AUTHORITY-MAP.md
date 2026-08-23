# ChatGPT Workflow — Document Authority Map

**Checkpoint:** 24 August 2026, 06:48 Asia/Bangkok  
**Purpose:** prevent historical TCJ plans, stopped runs, exposed-bank refinement loops and superseded validation instructions from being mistaken for current authority.

## Read these first

1. `CURRENT-STATE.json` — compact machine-readable live checkpoint.
2. `ANSWERS-TCJ-REWRITE-LIFT-DEVELOPMENT-CHECKPOINT-20260824.md` — **active execution checkpoint and immediate human gate.**
3. `ANSWERS-TCJ-MANDATORY-PROTECTED-EVIDENCE-ARCHITECTURE-AMENDMENT-20260823.md` — highest topology amendment: protected private evidence is required and remains bounded/non-reconstructive.
4. `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-V2-20260823.md` — commercial product architecture where not superseded by later checkpoints.
5. `ANSWERS-TCJ-METHODOLOGY-PACK-AND-CONTEXT-RETRIEVER-SPEC-20260823.md` — methodology/context specification.
6. `ANSWERS-TCJ-ROADMAP-TO-FINAL-COMMERCIAL-PRODUCT-20260823.md` — roadmap to qualification and commercial release.

## Active product definition

TCJ is not merely an evaluator. Evaluation is the feedback engine.

Plain-language product loop:

```text
draft
→ TCJ understands what is wrong and why
→ TCJ privately checks relevant language/voice evidence
→ TCJ gives the model a short native-editor brief
→ the same/customer model rewrites
→ TCJ can check the rewrite again
```

The external writer/judge never needs raw private corpus rows, proprietary nearest examples, hidden qualification cases, row IDs or reconstructive evidence.

For Answers BFF, the professional role is a **senior Thai magazine/conversation editor**. A customer Voice Profile can instead define a bank QA editor, hospitality editor, legal QA role, etc.

## Current simplified architecture

```text
SCENARIO / DRAFT
→ canonical focus normalization / reachability
→ relevant private semantic neighborhood
→ relevant methodology + Voice Profile
→ negative-first bounded private evidence
→ candidate-specific licensed-weirdness rescue when relevant
→ professional native-editor reasoning
→ usable / failed decision and/or concise rewrite brief
→ customer/model rewrite
→ optional TCJ re-check
```

Design rules:

- reasoning first;
- sophisticated ≠ complicated;
- measurement verifies the reasoning rather than steering case-specific complexity;
- code-switching is neutral by itself and must be judged for integration quality;
- licensed weirdness only removes a false surface reason for rejection; it never proves the whole answer good;
- `PASS/MINOR = usable`, `MAJOR/CRITICAL = failed`; exact adjacent-label agreement is secondary.

## Development evidence already closed

### Exposed 48-case evaluator regression

Original Gemini development reference:

```text
39 / 48 band-correct = 81.25%
false usable  = 5
false failure = 4
```

Simplified focus-normalized/editor-role successor (`run 25`):

```text
44 / 48 band-correct = 91.67%
false usable  = 2
false failure = 2
```

Do **not** tune this exposed bank toward 48/48.

### Fresh 24-case evaluator comparison

Human-first bank was completed and frozen before Gemini exposure.

Result:

```text
Gemini editor baseline   21 / 24 = 87.5%
Full TCJ                 21 / 24 = 87.5%
```

TCJ fixed two baseline mistakes and introduced two different mistakes. This was correctly treated as **no net lift**, not as a win. The result motivated simpler negative-first evidence handling rather than another scoring layer.

## Rewrite-lift v1 — frozen, not a material-lift claim

Experiment: `TCJ-REWRITE-LIFT-GEMINI35-v1`

Blind result across 16 fresh cases:

```text
TCJ wins      2
baseline wins 1
ties         13
neither       0
```

Human review manifest:

`427a6e71042804d8ca987819edad7d555c673539c28f63a338ae12432c30e877`

Important limitation: both arms were already given a strong specialist BFF writer role and distilled voice rules. The baseline was therefore effectively **TCJ-lite**, so 2–1 must not be marketed as material rewrite uplift.

Useful diagnostic example: baseline `RW-014` wrote **“Green flag” with a 🚩 red-flag emoji**. TCJ-guided output did not.

## Rewrite-lift hard v2 — ACTIVE HUMAN GATE

This is the current execution state.

```text
Source bank       TCJ-REWRITE-LIFT-HARD-SOURCE-BANK-2026Q3-v2
Source manifest   fc76e21ad36a5d11685db3dd4aa16398bc817ba0882dd3a20a04a31e0ecd8d79
Experiment        TCJ-REWRITE-LIFT-HARD-GEMINI35-v2
Model             gemini-3.5-flash-lite
Cases             12
Generation        12 / 12 complete
Terminal failures 0
Obvious leakage   0
Identical pairs   1 (legitimate tie candidate)
Protocol          TCJ-REWRITE-LIFT-HARD-BLIND-REVIEW-2026Q3-v2
Protocol id       2
Review state      0 / 12
```

Private review page:

`https://flipgazine.pages.dev/tcj-rewrite-lift-hard-review.html`

### Why v2 is cleaner

Both arms use the **same ordinary rewrite instruction**.

Control:

```text
scenario + source draft → ordinary Gemini rewrite
```

TCJ:

```text
scenario + source draft
→ Voice Profile / methodology / reachability / bounded private evidence
→ short derived editorial brief
→ same ordinary Gemini rewrite instruction
```

The control does **not** receive the specialist BFF role capsule or distilled TCJ voice rules for free.

The 12 cases are deliberately subtle: valid weirdness that should survive, natural vs bad code-switching, pragmatic omission, stance, line-break delivery, register collision and social-concern reasoning.

### Immediate next action

1. User reviews all 12 A/B pairs blindly.
2. Freeze the preference manifest.
3. Unblind exactly once.
4. Report `TCJ wins / baseline wins / ties / neither`.
5. Inspect non-ties only for general product reasoning.
6. **Do not retune these same 12 cases to force a TCJ win.**
7. Decide whether rewrite lift is demonstrated strongly enough to freeze the candidate architecture, needs one principled correction, or remains a secondary capability claim.

## Protected historical authority — Qualification 2.0

```text
Protocol         TCJ-QUALIFICATION-2.0-2026Q3-v1
Unique pairs     24
Human clicks     28 / 28
Hidden repeats   4 / 4 consistent
Human manifest   07a25c08b331c215bf6a7378665726c376045bcb9d547d3cd21eaca22b51428d
Threshold SHA    c9bd44181023471a961ddcce698e6c4141961573d4eae359ea73529ee12026e5
Bank SHA         8e3d6c5fff4860f97bfbfcd8d69c46e5484da0d5c315ed6f4888d0061d09b7c8
```

**Do not expose Qualification 2.0 to development models.** It is historical authority for an older topology and cannot certify the current successor.

## Paid frontier budget — still locked

```text
OpenAI remaining USD 1.82
xAI remaining    USD 3.42
Total            USD 5.24
No top-up planned
```

Do not use paid OpenAI/xAI during development. Paid calls remain reserved for the post-freeze authority experiment and require an immediate live pricing/balance/request-count preflight plus explicit user approval.

## Historical/stopped documents and runs

The following remain evidence/history, not active next-action authority:

- `ANSWERS-TCJ-PHASE-B-FOCUS-PEE-EDITOR-ROLE-AND-FRESH-VALIDATION-20260823.md`
- `ANSWERS-TCJ-MANDATORY-PEE-FREE-MODEL-TREATMENT-CHECKPOINT-20260823.md`
- `ANSWERS-TCJ-FINAL-PRODUCT-IMPLEMENTATION-AND-QUALIFICATION-PLAN-V2-20260823.md`
- `ANSWERS-TCJ-ARCHV2-REFERENCE-FREEZE-AND-QUALIFICATION2-HUMAN-GATE-20260823.md`
- `ANSWERS-TCJ-LOW-TIER-JUDGE-TRANSFER-RESEARCH-CHECKPOINT-20260823.md`
- `ANSWERS-TCJ-V17-QUALIFICATION-FAILURE-AND-CONTEXT-ENGINE-PIVOT-20260823.md`

Stopped finalist runs remain stopped unless the user explicitly reopens them:

- Qwen 3.6 27B run 7
- GPT-OSS 20B run 9
- Ox Alpha

## Commercial sequence after the active gate

```text
hard rewrite-lift blind review ← CURRENT
→ decide/freeze candidate runtime
→ construct new hidden native-human authority instrument
→ final paid OpenAI/xAI causal frontier experiment
→ authority decision
→ plug-and-play API
→ private-server / BYOJ / BYOK edition
→ customer-specific Voice Profile + controlled improvement
→ operator/control plane
→ production/security hardening
→ commercial release
```
