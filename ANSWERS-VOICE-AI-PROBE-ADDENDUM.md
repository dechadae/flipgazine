# The Book of Answers — Voice AI Probe Addendum

**Current companion to `ANSWERS-VOICE-TONE.md` · 17 August 2026**

This addendum records the AI-transfer findings added to `/voice.html` after the frozen 16 August provenance package. It does not rewrite or invalidate the human-review evidence. It extends the editorial guide with an evidence boundary for model transfer and corrects the current production checkpoint.

## 1. Current production checkpoint

Canonical bilingual copy remains frozen at **v122**.

The subsequent runtime lineage is:

- **v123** — routing hotfix only; adds `ทะเล → beach`; no Thai or English copy changes.
- **v124** — final production + semantic/reachability freeze; no Thai or English copy changes; semantic metadata/dictionary/index repair only.

Current live controller:

- `/fg-page-answers.js`
- **v124**
- MD5 `c8a382f0562737422e891e3300bb08f6`
- 948 normal answers + 3 CARE responses
- Thai/English answer strings byte-identical to the v122 bilingual copy freeze.

The original guide's references to v123 as the current live runtime should therefore be read as historical. v123 remains a valid lineage stage; **v124 is the final live production checkpoint**.

## 2. AI probe I — editorial evidence to model behavior

The human-review corpus supports generation hypotheses such as:

- pragmatic omission;
- stance calibration;
- culturally grounded specificity;
- BFF intimacy;
- humor-first delivery;
- authored line composition;
- finality/punchline protection.

Illustrative baseline → guided rewrites are useful for explaining those mechanisms, but they are **not by themselves a controlled benchmark**.

## 3. AI probe II — Kimi external-model rewrite transfer

A 25-answer Kimi experiment tested whether an external model could use the 948-answer review package to rewrite its own previously generated Thai answers.

Observed transfer was strongest in:

- pragmatic compression/omission;
- shorter chat/DM cadence;
- vertical line composition;
- punchline/finality protection;
- moving away from explanatory advisor prose toward direct social performance.

Because the guided condition saw and rewrote the baseline answers, this is evidence of **external-model rewrite transfer**, not independent generation improvement, fine-tuning, or a change in model weights.

## 4. AI probe III — style transfers faster than judgement

The same Kimi rewrites show a critical failure mode: visible style signals can transfer before the editorial reasoning that justified them.

Observed errors included:

- **over-compression** — deleting culturally/socially meaningful joke material because shorter looked more 'on style';
- **semantic drift** — improving rhythm while changing what the answer actually means;
- **over-omission** — removing connective language until the Thai becomes less natural;
- **orphaned metaphor logic** — keeping an image after deleting the language that made the image intelligible;
- **weak sound transfer** — internal/end rhyme and sound echo transferred less reliably than shortening and line breaks;
- **weak queer-timing transfer** — camp/queer social timing was less consistent than surface cadence;
- **weak semantic-preserving judgement** — the hardest skill was deciding what must survive an edit.

The editorial rule is therefore:

> **Do not imitate surface features. Learn the decision behind them.**

Compression is not the goal. Line breaks are not the goal. Slang is not the goal. The goal is the natural social decision that makes those devices appropriate in a specific situation.

## 5. Controlled benchmark protocol

Any stronger claim about independent generation should use a fresh benchmark with:

1. fresh unseen prompts;
2. the same model, version and fixed settings across conditions;
3. separate fresh contexts for baseline and guided runs;
4. no preferred/reference answer shown to the guided model;
5. the guided condition receiving only the Voice/corpus rules or training material under test;
6. blind native-Thai judging.

Recommended judging dimensions:

- naturalness;
- semantic fidelity;
- BFF authenticity;
- humor;
- cultural fit;
- sound/rhyme/mouthfeel;
- line composition;
- translation-smell.

Keep rewrite-transfer evidence and independent-generation evidence labelled separately.

## 6. Mental model

The strongest transferable object in the corpus is not slang, particles, line count, Latin script or compression.

It is the editorial judgement behind them:

> **What would this Thai speaker naturally choose to say in this exact social situation — including what they would leave unsaid, what they would protect, and where they would stop?**

This addendum should be read together with `ANSWERS-VOICE-TONE.md` and the current `/voice.html` page.