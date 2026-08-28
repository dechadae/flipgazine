# The Book of Answers — Batch 2 Active Review Order Correction

> **Historical correction.** Its ordering decision remains provenance, but B2-0021–B2-0040 has since completed the full cycle and B2-0041–B2-0060 is active. Do not execute this document's old current-review or next-unit instructions.

**Status:** COMPLETED CORRECTION / CURRENT ORDER ADVANCED  
**Date:** 18 August 2026

This note originally corrected the workflow when the project jumped to B2-0021–B2-0040 before the native-human reviewer had finished B2-0001–B2-0020.

## B2-0001–B2-0020 — completed

The technical pilot is now fully human-reviewed:

```text
reviewed     20 / 20
ACCEPT        4
EDIT          9
REWRITE       7
```

These rows remain deliberately **non-metric-eligible** and **not promotion-eligible** because their frozen raw drafts contain the original escaped-line-break transport defect and because some machine judgments were exposed during early reviewer development before the final 100% human-first rule was in place.

Their decisions remain preserved in the technical staging lane only. See:

`ANSWERS-BATCH2-TECH-PILOT-COMPLETION-REPORT.md`

Do not copy these 20 decisions into `private.batch2_human_reviews`, do not include them in official human-vs-machine metrics, and do not promote them into the canonical corpus.

## Current active review — B2-0021–B2-0040

The live Thai Audit has now switched back to the production reviewer:

```text
/answers-thai-review-batch2.html
site_files version 9
service: batch2-production-review-service
active source range: B2-0021–B2-0040
```

This is the first clean **metric-eligible** Batch 2 unit.

It has:

- literal LF integrity verified;
- 20 frozen raw drafts;
- 20 sealed ChatGPT pre-human audits;
- required Qwen audits prepared through the production reviewer workflow;
- no official human decisions at the moment this order advanced.

Machine judgments remain sealed from the native-human reviewer until the first ACCEPT / EDIT / REWRITE decision for each row is committed.

## Required order from here

```text
1. Review B2-0021–B2-0040 in the production Thai Audit lane.
2. Store all 20 decisions in private.batch2_human_reviews.
3. Create English adaptations from the final human Thai.
4. Stage Batch 1-compatible topics / focus / support / helpers.
5. Enrich aliases / typos / genuinely necessary concepts.
6. Run deterministic reachability and full Batch 1 routing regression.
7. Require zero alias collisions, semantic-zero rows, index-unreachable rows, parser-probe-unreachable rows and Batch 1 dictionary regressions.
8. Atomically promote all 20 answers + dictionary delta + regenerated index.
9. Verify the new canonical corpus revision.
10. Only then prepare B2-0041–B2-0060.
```

Any older checkpoint saying B2-0001–B2-0020 are still pending is superseded by this completed correction.
