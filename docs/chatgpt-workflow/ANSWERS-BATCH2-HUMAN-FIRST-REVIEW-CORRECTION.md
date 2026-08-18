# The Book of Answers — Batch 2 Human-First Review Correction

**Effective:** 18 August 2026  
**Status:** Governing operational correction before any metric-eligible Batch 2 human review

## Decision

The reviewer must not see ChatGPT self-audit or Qwen independent-audit judgments before making the first human decision.

For every Batch 2 row, the operational order is now:

```text
source scenario
→ one frozen ChatGPT raw draft
→ ChatGPT diagnosis-only audit
→ required/selected Qwen diagnosis-only audit
→ machine evidence sealed from reviewer
→ native-human ACCEPT / EDIT / REWRITE
→ first human decision committed
→ machine judgments revealed for comparison
```

The purpose of the machine audits is evidence, not reviewer assistance. They exist to measure where AI judgment agrees or disagrees with native-human editorial judgment and to support buyer diligence. They must not coach or bias the human reviewer.

## What this supersedes

The earlier 900-assisted / 100-blind visibility design is superseded for human-review exposure before the first metric-eligible Batch 2 review.

The already-frozen `B2-BLIND-v1` assignment remains historical provenance for the source-set experiment and must not be mutated. However, reviewer visibility no longer varies by that lane: **all 1,000 rows are human-first blind to machine judgments.**

This correction does not change:

- the frozen source set;
- one-draft generation provenance;
- ChatGPT self-audit dimensions or weights;
- Qwen escalation logic;
- diagnosis-only restrictions;
- ACCEPT / EDIT / REWRITE semantics;
- raw/final hashing and append-only provenance requirements.

## Live implementation

The private Batch 2 reviewer service now returns machine audits as `null` for every unreviewed pilot row, regardless of the historical blind-control flag. Qwen may still be executed before human review so its timestamp and judgment remain genuinely pre-human, but its output is sealed from the browser until the first human decision exists.

Live reviewer behavior:

- `/answers-thai-review-batch2.html`
- pre-decision label: `Human first`
- pre-decision audit area: sealed / hidden
- no `Assisted` or `Blind control` exposure label
- after first human decision: stored ChatGPT/Qwen diagnoses may be shown for comparison

The public Voice methodology page was updated to describe **100% human-first review** rather than a 10% blind-control exposure model.

## Current technical pilot caveat

The first 20 rows generated on 18 August 2026 remain a **technical, non-metric-eligible pilot** because their frozen draft line breaks were stored as escaped transport text rather than LF bytes. They are useful for reviewer ergonomics and workflow testing, but their ACCEPT / EDIT / REWRITE outcomes must not be included in official Batch 2 edit-rate or disagreement metrics.

A clean metric-eligible 20-row pilot should begin only after the line-break write path is corrected and verified.
