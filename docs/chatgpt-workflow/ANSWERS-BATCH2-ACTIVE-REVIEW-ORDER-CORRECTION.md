# The Book of Answers — Batch 2 Active Review Order Correction

**Status:** CURRENT OPERATIONAL ORDER  
**Date:** 18 August 2026

This note corrects the checkpoint wording that previously jumped directly to B2-0021–B2-0040.

## Current active review

The native-human reviewer must finish **B2-0001–B2-0020 first** in `/answers-thai-review-batch2.html`.

These 20 rows remain the original technical pilot. They are intentionally **non-metric-eligible** and **not promotion-eligible** because their original frozen raw drafts stored designed line breaks as escaped transport text rather than literal LF bytes. That provenance problem is preserved; it is not silently rewritten.

However, the 20 rows are **not considered human-reviewed until Decha commits ACCEPT / EDIT / REWRITE for each row**. They must therefore remain in Thai Audit until all 20 human decisions are complete.

The live Thai Audit path has been restored to the technical review service `batch2-review-service` v4 for B2-0001–B2-0020. Machine judgments remain sealed until the human decision for each row is saved.

At the time of this correction, technical human reviews for B2-0001–B2-0020 = **0 / 20**.

## Prepared next unit

B2-0021–B2-0040 remains prepared as the first **clean metric-eligible** production unit:

- literal LF integrity verified;
- 20 frozen raw drafts;
- 20 sealed ChatGPT pre-human audits;
- required Qwen audits prepared through the production reviewer workflow;
- no official human decisions yet.

Do **not** discard or regenerate B2-0021–B2-0040. Keep it prepared but inactive until B2-0001–B2-0020 human review is finished.

## Required order from here

```text
1. Finish human review B2-0001–B2-0020 in the technical Thai Audit lane.
2. Preserve those decisions as technical-pilot evidence only; do not include them in official Batch 2 metrics or corpus promotion.
3. Switch Thai Audit to the production reviewer.
4. Review B2-0021–B2-0040 as the first metric-eligible unit.
5. After all 20 official decisions: English adaptation → semantic staging → alias/typo enrichment → reachability/regression validation → atomic promotion.
6. Only then prepare B2-0041–B2-0060.
```

This active-order correction supersedes any older checkpoint sentence stating that the immediate next human action is B2-0021–B2-0040.