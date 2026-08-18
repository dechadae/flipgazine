# The Book of Answers — Batch 2 Technical Pilot Completion Report

**Status:** COMPLETE — TECHNICAL / NON-METRIC  
**Completed:** 18 August 2026  
**Rows:** B2-0001–B2-0020

## Completion

The native-human review of the original 20-row Batch 2 technical pilot is complete.

```text
reviewed     20 / 20
ACCEPT        4
EDIT          9
REWRITE       7
```

The decisions are stored in the technical staging lane:

```text
public.answers_thai_reviews
review_round = batch2-tech-pilot-v1
answer_id = 2000001 … 2000020
```

These records are preserved as technical-review evidence. They are not copied into `private.batch2_human_reviews` and are not eligible for corpus promotion.

## Machine evidence present

ChatGPT pre-human self-audits exist for all 20 rows.

ChatGPT verdict distribution:

```text
fluent          14
minor_problem    5
major_problem    1
not_acceptable   0
```

Qwen diagnosis exists for 18 rows; the remaining two did not require Qwen under the frozen escalation rules.

Qwen verdict distribution among the 18 audited rows:

```text
fluent          15
minor_problem    0
major_problem    3
not_acceptable   0
```

Descriptively, 11 of the 14 drafts ChatGPT labelled `fluent` were still EDITed or REWRITTEN by the human reviewer; 12 of the 15 Qwen-labelled `fluent` drafts were still EDITed or REWRITTEN.

**Do not use those ratios as official buyer metrics.** They are directional technical-pilot observations only.

## Why this pilot is excluded from official Batch 2 metrics

Two provenance/experimental issues make B2-0001–B2-0020 intentionally non-metric:

1. The original raw-draft write stored designed line breaks as escaped transport text (`\\n`) instead of literal LF bytes. The raw artifacts remain immutable and were not silently corrected.
2. B2-0001 had machine judgments exposed before the 100% human-first visibility correction was established. That specific row cannot support the independent-human-judgment claim. B2-0002–B2-0020 were subsequently reviewed under the corrected sealed human-first interface, but the entire 20-row pilot remains outside the clean denominator because the raw transport defect affects all 20.

The technical decisions remain valuable for qualitative evidence, UI/workflow validation and buyer diligence, but they must not be mixed into official edit-rate, disagreement-rate or clean human-first benchmark percentages.

## Buyer export treatment

B2-0001–B2-0020 **must be included in the buyer evidence bundle**, not discarded.

Buyer classification:

```text
record_class                 technical_pilot
human_reviewed               true
buyer_export_included        true
benchmark_metric_eligible    false
corpus_promotion_eligible    false
```

The buyer receives the source scenario, actual frozen raw artifact and hash, machine diagnoses, native-human ACCEPT / EDIT / REWRITE decision, final Thai, timestamps and explicit exclusion reason.

These 20 are delivered as an evidence sidecar and do not change the headline clean-corpus denominator.

The governing extraction/export contract is:

`ANSWERS-BATCH2-BUYER-DATA-EXTRACTION-SPEC.md`

The commercial target is **1,000 clean Batch 2 benchmark records plus these 20 technical-pilot evidence records**. Because B2-0001–B2-0020 remain immutable, the clean 1,000 target consists of B2-0021–B2-1000 plus a separately frozen 20-row supplemental replacement set under a separate ID namespace/source-set version. The original `B2-SOURCESET-v1` is never rewritten.

When combined with Batch 1 under the planned commercial bundle:

```text
Batch 1 usable reviewed records          948
Batch 2 clean benchmark records        1,000
---------------------------------------------
usable reviewed corpus                 1,948

technical-pilot evidence sidecar          20
---------------------------------------------
total reviewed records delivered       1,968
```

## Operational result

The technical pilot accomplished its purpose:

- all 20 rows can be reviewed and saved;
- ACCEPT / EDIT / REWRITE distinction is usable;
- machine evidence can be sealed/revealed;
- the earlier API-key/save-path defects were resolved;
- the LF transport defect was identified and blocked from future metric-eligible writes;
- the production reviewer and corpus/routing promotion path were built separately;
- the pilot now also serves as a real test case for buyer export structure without contaminating the clean benchmark denominator.

After this completion, `/answers-thai-review-batch2.html` was switched back to the production reviewer and now serves **B2-0021–B2-0040**, the first clean metric-eligible unit.

## Next active unit

```text
B2-0021 → B2-0040
```

This unit has literal-LF-correct frozen drafts and sealed ChatGPT pre-human audits. Required Qwen audits are prepared through the production reviewer while remaining hidden from the native-human reviewer. Official decisions go to `private.batch2_human_reviews`.

After all 20 official decisions are committed, the required sequence is:

```text
English adaptation
→ semantic staging
→ focus/topic/support/helper assignment
→ alias/typo/concept enrichment
→ deterministic reachability + Batch 1 regression validation
→ atomic 20-row corpus/dictionary/index promotion
→ post-promotion verification
→ generate an internal buyer-export preview using ANSWERS-B2-BUYER-v1
→ prepare B2-0041–B2-0060
```
