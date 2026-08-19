# The Book of Answers — Batch 2 Source-Set v1.1 Replacement Patch

**Status:** APPLIED · VERIFIED  
**Date:** 19 August 2026  
**Scope:** B2-0048 and B2-0059 only  
**Base source set:** `B2-SOURCESET-v1`  
**Replacement patch:** `B2-SOURCESET-v1.1`

## Reason

Before native-human review of B2-0041–B2-0060, an assistant progress message exposed machine-assessment information for the then-active B2-0048 and B2-0059 rows.

The user instructed that the exposed row content be deleted from the active production dataset and replaced with new rows.

The exposed versions were therefore retired **before any human decision**. They are not active source rows, raw drafts, AI audits, or protocol-exception rows anymore.

Their prior state is retained only inside the private append-only source-set patch tombstone so history is not falsified.

## Replacement rule

The two active IDs remain:

```text
B2-0048
B2-0059
```

but now point to newly frozen source scenarios and newly generated raw drafts that were never shown to the human reviewer before the normal review step.

Replacement text is intentionally omitted from this document so this record cannot itself break the human-first review protocol.

## Frozen patch proof

```text
base source manifest SHA-256
f1d184b78e21f654049f952c9fc3083b0f082f083f4934f4dc7b9d524c6d1ff8

effective source manifest SHA-256
 a21546c6206a20300a93700ef87a439311a011f3fa1b4f0e178395a07bd3908b

replacement patch SHA-256
ba5a6c5ed66cd6799559e654897ac279afcabd8f28e2055796961805c1e00372
```

The effective manifest was recomputed after replacement and matched the stored `B2-SOURCESET-v1.1` manifest exactly.

## Active replacement row hashes

```text
B2-0048
scenario SHA-256  3d982c4d1cad23f3efa368301f7c44e516e7942c687764a9eff1de0ea851fb41
raw draft SHA-256 ec08a96f5e01cb690c0410b7384ff2fca0189e7abe9406d91feb4afbf0342a71

B2-0059
scenario SHA-256  acfc1d7273a4dae48b88e05c27bee6fb6b1bd900c99c6ae461192889b85f3eaf
raw draft SHA-256 59b2086f2897400dcb805aeffdbc3c4ea4b30fe320f99b0e78c95130bd1775a0
```

Both raw drafts use literal LF line breaks and contain no escaped `\\n` transport defect.

## Production-state verification

After replacement, B2-0041–B2-0060 verified as:

```text
active rows                         20 / 20
real-LF raw drafts                  20 / 20
literal escaped-linebreak defects        0
sealed ChatGPT self-audits          20 / 20
rows requiring Qwen                 20 / 20
Qwen audits at replacement check     0 / 20
human reviews                        0 / 20
active protocol exceptions                0
```

The reviewer therefore starts from a fresh human-first state for all 20 active rows.

Required Qwen evidence remains sealed and must complete before each corresponding human decision is enabled.

## Benchmark-count consequence

Because the exposed versions were retired before human review and replaced with newly frozen unexposed rows, the two active replacements can remain eligible for the clean human-first benchmark if the rest of their protocol completes without another exception.

The governing clean-count model therefore returns to:

```text
B2-0021–B2-1000                 980 clean original-namespace production rows
B2R-0001–B2R-0020               20 clean supplemental technical-pilot replacements
--------------------------------------------------------------------------
clean Batch 2 benchmark       1,000
```

No additional two-row supplemental requirement is created by the retired exposed versions.

## Infrastructure change

A private append-only table now records source-set replacement patches:

```text
private.batch2_source_set_patches
```

The raw-draft guard also verifies that any source ID present in a replacement patch matches the patch-frozen replacement scenario hash before accepting a new raw draft.

The table is in the private schema, has RLS enabled, grants no `anon` or `authenticated` access, and uses the existing append-only mutation-rejection trigger.

## Governance

Do not surface the replacement scenario text, raw Thai draft, ChatGPT verdict, Qwen verdict, score, flags, or rationale before the native-human decision.

The retired exposed versions must never re-enter active production or clean benchmark exports.
