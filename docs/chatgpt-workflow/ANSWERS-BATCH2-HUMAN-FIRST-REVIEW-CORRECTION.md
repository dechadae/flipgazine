# The Book of Answers — Batch 2 Human-First Review Correction

**Effective:** 18 August 2026  
**Updated:** 18 August 2026  
**Status:** GOVERNING — applies to every metric-eligible Batch 2 human review

## Decision

Batch 2 human review is **fully blind to machine judgment**.

Before the native-human reviewer commits the first decision, the reviewer must not see any ChatGPT or Qwen:

- score or Audit Index;
- qualitative verdict;
- dimension rating;
- confidence;
- diagnostic flag;
- rationale or comment;
- correction suggestion;
- preferred wording.

The human sees the source scenario and the frozen raw Thai draft only.

For every clean Batch 2 row, the operational order is:

```text
source scenario
→ one frozen ChatGPT raw draft
→ ChatGPT diagnosis-only audit
→ required/selected Qwen diagnosis-only audit
→ ALL machine evidence sealed from reviewer
→ native-human ACCEPT / EDIT / REWRITE
→ first human decision committed
→ machine judgments revealed for comparison
→ post-human mechanical QA may flag possible typo / accidental double space / mechanical formatting issue
→ HUMAN decides whether any mechanical correction is actually required
```

The purpose of the machine audits is evidence, not reviewer assistance. They exist to measure where AI judgment agrees or disagrees with native-human editorial judgment and to support buyer diligence. They must not coach, anchor or bias the human reviewer.

## Human authority is final

The native-human reviewer is the editorial judge.

The first blind `ACCEPT`, `EDIT` or `REWRITE` decision is the authoritative human judgment for benchmark analysis. A machine score cannot overturn it, and disagreement with ChatGPT or Qwen is evidence rather than an error to be corrected toward the machine.

The human-authored final may deliberately contain conversational spelling, fragments, unusual spacing for delivery, punctuation, ellipses, code-mixing or other authored surface choices. AI must not normalize those choices merely because they look nonstandard.

## Post-human mechanical QA rule

After the blind human decision is committed, AI may perform a **narrow mechanical QA pass**.

Its permitted role is to flag things that plausibly look accidental, for example:

```text
possible typo
accidental double space
stray transport character
unintended duplicate punctuation
obvious accidental formatting artifact
```

The AI may ask the human reviewer to check the flagged location. It must not silently alter the text and must not broaden this pass into stylistic editing, grammar correction, tone correction, line-break optimization or a second editorial judgment.

A flag is not proof of an error. Thai chat spelling, deliberate ellipses, repeated punctuation, spacing, fragments and other authored choices may be intentional.

If the human confirms that the issue is accidental, the human supplies or approves the corrected text. The project must preserve:

1. the original frozen raw AI draft;
2. the first blind human decision and the exact text committed at that moment;
3. the post-human mechanical flag;
4. the human-confirmed correction, if any;
5. hashes/timestamps sufficient to reconstruct the sequence.

Therefore:

> **AI may notice. Human decides. Human corrects. Human remains final.**

Mechanical QA must never be counted as evidence that AI improved the human editorial judgment.

## What this supersedes

The earlier 900-assisted / 100-blind visibility design is superseded for human-review exposure before the first metric-eligible Batch 2 review.

The already-frozen `B2-BLIND-v1` assignment remains historical provenance for the source-set experiment and must not be mutated. Reviewer visibility no longer varies by that lane: **all metric-eligible Batch 2 rows are human-first blind to all machine judgment.**

This correction does not change:

- the frozen source set;
- one-draft generation provenance;
- ChatGPT self-audit dimensions or weights;
- Qwen escalation logic;
- diagnosis-only restrictions;
- ACCEPT / EDIT / REWRITE semantics;
- raw/final provenance requirements;
- the rule that machine judgments are evidence rather than authority.

## Live reviewer behavior

The production Batch 2 reviewer must enforce:

- `/answers-thai-review-batch2.html`;
- pre-decision label: `Human first`;
- pre-decision audit area: sealed / hidden;
- no AI score, verdict, rationale, flags or comments visible before the decision;
- no `Assisted` or `Blind control` exposure label;
- after the first human decision: stored ChatGPT/Qwen diagnoses may be revealed for comparison;
- any later mechanical QA is clearly separated from the machine-audit verdicts and requires explicit human confirmation before changing deployable text.

The public Voice methodology page describes this as **100% human-first review with post-human mechanical lint only**.

## Live post-human mechanical-QA provenance

The database now preserves this distinction directly.

```text
private.batch2_human_reviews
  = immutable first blind human ACCEPT / EDIT / REWRITE and exact committed Thai

private.batch2_posthuman_mechanical_qa
  = optional post-decision AI mechanical flag + explicit human KEEP / CORRECT response

private.batch2_deploy_reviews
  = deployment view; uses the original blind human final unless the human explicitly confirms CORRECT
```

The post-human table is RLS-protected and append-only. Direct `anon`, `authenticated` and `service_role` table access is removed. Its recording/preparation functions are `SECURITY INVOKER` and are not executable by those roles.

Mechanical QA must be resolved **before English adaptation or semantic staging**. This prevents a late typo correction from silently making the English or routing evidence stale.

Allowed mechanical tags are deliberately narrow:

```text
possible_typo
accidental_double_space
stray_transport_character
duplicate_punctuation
formatting_artifact
```

For `KEEP`, the deployable Thai remains the exact first blind human final.

For `CORRECT`, the first blind final and its hash remain immutable evidence, while the separately human-confirmed corrected Thai receives its own hash and becomes the deployable text used by English/semantic staging and corpus promotion.

No mechanical-QA row exists unless there is something to ask the human about. A clean final with no plausible mechanical issue proceeds directly to English adaptation.

## Technical pilot caveat

B2-0001–B2-0020 remain a **technical, non-metric-eligible pilot** because their frozen raw-draft line breaks were stored as escaped transport text rather than literal LF bytes. B2-0001 also retains its early machine-visibility exception.

Those 20 have nevertheless completed human review, enrichment, routing validation and canonical Book promotion. They remain useful buyer evidence and live Book content but never enter the clean Batch 2 benchmark denominator.

The first clean metric-eligible production unit is B2-0021–B2-0040, and the fully blind rule above governs it before any native-human decision.
