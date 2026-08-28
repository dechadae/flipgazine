# TCJ Answers Calibration Rerun — 20 August 2026

> **Completed calibration evidence.** This record supersedes earlier statements that no TCJ calibration rerun or research links existed. Its v3-shadow next gate is historical; later Judge Admission and robustness records govern current execution.

**Status:** BASELINE COMPLETE · VALIDITY GATE FAILED · SHADOW RECALIBRATION PREPARED  
**Architecture authority:** `ANSWERS-TCJ-MULTI-JUDGE-CONSENSUS-ARCHITECTURE.md`  
**Implementation checkpoint:** `ANSWERS-TCJ-MEASUREMENT-IMPLEMENTATION-20260820.md`  
**Profile tested:** `answers-bff-v2`  
**Model:** Qwen 3.6-27B via Groq · temperature 0  
**Evidence class:** Calibration Bank only · methodology-exposed after this analysis

---

## 1. Experiment

The first clean Batch 2 unit was rerun through the canonical TCJ path:

```text
B2-0021–B2-0040
stage = pre_human
purpose = calibration_rerun
profile = answers-bff-v2
```

The evaluated Thai is the exact frozen draft that received the native-human ACCEPT / EDIT / REWRITE decision. Final corrected Thai was not substituted.

The human decisions were already frozen before this TCJ rerun and therefore were not influenced by the new machine evidence.

---

## 2. Persistence result

```text
TCJ runs stored           20 / 20
Batch2 TCJ links          20 / 20
source range              B2-0021–B2-0040
stage                     pre_human
purpose                   calibration_rerun
```

The research route therefore succeeded as an end-to-end persistence test.

---

## 3. Human decisions

```text
ACCEPT       9
EDIT         8
REWRITE      3
-------------
total       20
```

These actions must not be naively mapped to TCJ severity classes. In particular, EDIT does not automatically mean `minor_problem` and REWRITE does not automatically mean `major_problem`.

However, for the authored Answers profile, EDIT or REWRITE is direct evidence that the **exact frozen draft was not native-editor-ready unchanged**.

That matters because TCJ's rating anchor defines 4 as native-editor-ready with no meaningful intervention.

---

## 4. `answers-bff-v2` result

```text
TCJ fluent               16
TCJ minor_problem         1
TCJ major_problem         1
TCJ not_acceptable        2
```

The critical mismatch is:

```text
human EDIT/REWRITE cases             11
called fluent by TCJ                 11
false-fluent intervention signal    100%

human ACCEPT cases                    9
called non-fluent by TCJ              4
false-rejection signal              44.4%
```

Using only the coarse question **“did the native editor leave the exact draft unchanged?”**, TCJ v2 correctly separated only 5 of 20 cases.

This coarse statistic is a calibration diagnostic, not a general benchmark metric.

---

## 5. Score direction was inverted

Average TCJ audit index by human action:

```text
ACCEPT        73.15
EDIT         100.00
REWRITE      100.00
```

The sample therefore exhibited the wrong direction: drafts that required native intervention received higher TCJ scores than drafts the native editor accepted unchanged.

This is sufficient to fail the current editor-alignment validity gate.

---

## 6. Calibration guards did not solve the mismatch

Only two of the 20 runs changed between raw and calibrated diagnosis:

```text
B2-0029
B2-0034
```

For both, `TH-BFF-001` detected possible metaphor/personification misreading and changed confidence from high to medium.

It did **not** change:

```text
ratings
severity
flags
verdict
```

Both rows were human ACCEPT cases that TCJ still labelled `not_acceptable`.

Interpretation:

> The existing guard successfully noticed uncertainty in exactly two important false-negative cases, but its current annotate-only action is insufficient as a correction mechanism.

No evidence from this run supports claiming that deterministic calibration materially improved v2 human alignment.

---

## 7. Main failure families observed

### 7.1 Over-defending semantically valid drafts

Several EDIT/REWRITE drafts were understandable and relevant but were not the final editorial standard. TCJ repeatedly converted “I can explain why this works” into six 4/4 ratings.

Examples of the underlying human intervention included:

```text
awkward lexical choice
tautological phrasing
flat or generic landing
more generic advice than authored Answers voice
rhythm/composition tightening
stronger cultural/editorial transformation
```

### 7.2 Invented stylistic justification

The judge sometimes invented a pun, idiom, or stylistic rationale that was not actually present in the Thai text.

This is a serious evaluator failure because it rewards the judge's own interpretation rather than measuring the candidate.

### 7.3 Generic correctness mistaken for house-voice excellence

A response can be:

```text
semantically correct
socially safe
natural enough
```

while still being weak as an authored Answers response.

`answers-bff-v2` did not distinguish this reliably.

### 7.4 False semantic-drift / translation-shape penalties

Human-accepted rows showed failures around:

```text
Thai metaphor/personification
elliptical/compressed landing
Thai-English borrowing
writerly but socially legible phrasing
```

The strongest examples were B2-0029, B2-0034 and B2-0039.

### 7.5 CARE over-penalty

B2-0040 was human ACCEPT but received `minor_problem` because its concise composition was treated as slightly too abrupt.

CARE should prioritize safety and clarity without automatically requiring fuller assistant-like prose.

---

## 8. Normative methodological correction — editor-intervention consistency

For **Answers Voice only**, TCJ must distinguish three different concepts:

```text
semantic validity
Thai pragmatic naturalness
native-editor-ready authored Answers quality
```

They are not interchangeable.

### Human action interpretation

```text
ACCEPT
= exact frozen draft was accepted unchanged by the designated editorial authority

EDIT
= exact draft was not editor-ready unchanged; meaningful intervention was required

REWRITE
= exact draft was not editor-ready unchanged; substantial editorial replacement was preferred
```

This does **not** mean:

```text
EDIT    = automatically minor_problem
REWRITE = automatically major_problem
```

The action measures intervention, not universal severity.

### Required TCJ diagnostic metrics

For Answers calibration and Judge Passport research, track at minimum:

```text
false-fluent rate among EDIT/REWRITE cases
false-rejection rate among ACCEPT cases
score direction by human intervention class
per-dimension error associated with intervention
semantic-drift false positives on ACCEPT cases
generic/flat-response false negatives on EDIT/REWRITE cases
```

### Gate rule

A candidate Answers evaluator must not be promoted merely because its outputs are semantically defensible.

Before TCJ Panel Judge Admission proceeds, the active/shadow evaluator must demonstrate that it can separate **editor-ready unchanged** drafts from **native intervention required** drafts well enough to remove the catastrophic inverse pattern observed in this baseline.

No production threshold is inferred from these 20 exposed cases. Final qualification thresholds must be supported by fresh hidden human evidence.

---

## 9. Persistence-format defect discovered

The 20 TCJ rows were successfully written, but `raw_diagnosis` and `calibrated_diagnosis` were stored in JSONB columns as JSON **string scalars** rather than JSON objects.

The historical rows remain immutable evidence and are not rewritten.

Live migration:

```text
20260819233916  tcj_jsonb_persistence_boundary
```

The database now:

```text
normalizes future JSON-string payloads into JSON objects before INSERT
applies the same boundary to TCJ guard traces
applies the same boundary to Batch2 AI-audit raw_output
checks that future stored structures are JSON objects
keeps existing historical rows untouched through NOT VALID constraints
```

The normalization helper was verified to convert a JSON string scalar into a JSON object, and all three BEFORE INSERT triggers are live.

---

## 10. Shadow recalibration prepared

A research-only shadow evaluator is now deployed:

```text
tcj-calibration-shadow v1
profile  answers-bff-v3-shadow
purpose  calibration_shadow_v3
```

It does **not** modify TCJ Standard.

Its prompt adds four explicit corrections:

```text
1. editor-ready threshold
   4 means the exact Thai is publish-ready unchanged

2. anti-rationalization
   do not invent puns, idioms, humor or intentionality to defend weak text

3. authored-house-voice distinction
   generic but correct advice may still be weak on BFF voice/composition

4. figurative/code-switch second reading
   test Thai ellipsis, metaphor, personification and natural English borrowing before semantic-drift penalties
```

CARE receives a separate shadow instruction so concise safe Thai is not penalized merely for brevity.

The live research page now contains a separate v3-shadow block:

```text
/tcj-research.html
```

The original 20 v2 runs remain frozen and cannot be overwritten by the shadow run.

---

## 11. Next gate

Run all 20 `answers-bff-v3-shadow` cases.

Then compare:

```text
v2 baseline
vs
v3 shadow
vs
frozen human ACCEPT / EDIT / REWRITE
```

The immediate questions are:

1. Does v3 materially reduce false-fluent EDIT/REWRITE cases?
2. Does it stop falsely rejecting human-accepted metaphor/code-switch cases?
3. Does ACCEPT regain a higher score distribution than EDIT/REWRITE?
4. Which dimensions become discriminative?
5. Does stricter editor-ready judgment create new over-penalization?

If v3 does not materially improve these failure families, do **not** proceed to Judge Admission. Iterate calibration again while these 20 remain legitimate Calibration Bank material.

If v3 materially improves the exposed calibration set, that improvement is still not qualification proof. The corrected method must then survive fresh hidden Qualification Bank evidence before production authority is granted.

---

## 12. Governing conclusion

> **Phase 1 succeeded as a persistence experiment and failed as a validity experiment. That is a productive result: TCJ exposed a specific measurable weakness before multi-judge complexity was allowed to hide it.**
