# TCJ Answers Calibration Shadow v3 — 20 August 2026

> **Completed calibration checkpoint.** Preserve the failure analysis and stop-overfitting decision. The next clean experiment has since advanced into Judge Admission; use the measurement, Stage B and 21 August robustness records for current state.

**Status:** COMPLETE · VALIDITY GATE FAILED · INCUMBENT PROMPT TUNING STOPPED  
**Architecture authority:** `ANSWERS-TCJ-MULTI-JUDGE-CONSENSUS-ARCHITECTURE.md`  
**Baseline report:** `ANSWERS-TCJ-CALIBRATION-RERUN-20260820.md`  
**Profile tested:** `answers-bff-v3-shadow`  
**Model:** sealed incumbent research judge, temperature 0  
**Evidence class:** Calibration Bank only · methodology-exposed

---

## 1. Purpose

The v3 shadow was created only after the v2 baseline exposed a catastrophic editor-alignment failure on the frozen B2-0021–0040 pre-human drafts.

The v3 prompt attempted to correct four observed failure families:

```text
semantic defensibility being mistaken for editor-ready quality
invented stylistic/pun rationalization
false semantic-drift penalties on metaphor/personification
false penalties on natural Thai-English borrowing / compressed editorial delivery
```

The same frozen 20 human-reviewed drafts were rerun append-only. No human decision was changed or re-collected.

---

## 2. Frozen human decisions

```text
ACCEPT       9
EDIT         8
REWRITE      3
-------------
total       20
```

For Answers Voice, ACCEPT means the exact draft was accepted unchanged by the designated editorial authority. EDIT/REWRITE means the exact draft was not editor-ready unchanged, but the action is not automatically equivalent to a TCJ severity class.

---

## 3. v2 vs v3 coarse editor-alignment comparison

```text
                                      v2          v3
human EDIT/REWRITE cases              11          11
called fluent                          11           8
false-fluent intervention signal     100%        72.7%

human ACCEPT cases                      9           9
called non-fluent                       4           5
false-rejection signal               44.4%       55.6%

coarse correct separation              5/20        7/20
                                      25%         35%
```

v3 therefore improved one narrow failure mode but remained far below a credible editor-alignment gate and worsened false rejection of accepted Thai.

---

## 4. Score direction remains invalid

Average audit index by frozen human action:

```text
                 v2       v3
ACCEPT          73.15    62.04
EDIT           100.00    95.63
REWRITE        100.00    88.89
```

The desired direction is not an arbitrary numeric separation, but an evaluator intended to measure editor-readiness should not systematically score intervention-required drafts above unchanged accepted drafts.

The v3 sample remains directionally inverted.

---

## 5. What v3 improved

The stricter prompt correctly stopped calling several intervention-required drafts fully fluent, including examples where the human had identified generic/awkward composition or a weak landing.

It also corrected the CARE over-penalty observed in the baseline on B2-0040, returning the accepted concise safety-aware answer to fluent.

This shows prompt wording can alter some surface calibration behavior.

---

## 6. What v3 did not solve

### 6.1 Invented rationalization persisted

Despite an explicit anti-rationalization rule, the judge still invented unsupported stylistic explanations in some cases, including claiming a pun or idiomatic effect that was not actually present in the Thai.

This means the failure is not safely removable by simply adding another instruction telling the same judge not to do it.

### 6.2 Metaphor/personification false rejection persisted

Human-accepted compressed/editorial lines were still read literally and treated as semantic incoherence or broken translation.

The most important false-negative families remained:

```text
metaphor / personification
compressed editorial causality
writerly landing
Thai-English phrase functioning socially rather than literally
non-literal subject/action relations
```

### 6.3 BFF/editorial target conflation persisted

The judge sometimes treated an editorial or stylized answer as weak because it was not conversationally warm/direct enough, even though Answers Voice explicitly permits deadpan, writerly, mock-polite, compressed or figurative delivery.

This indicates the judge still conflates:

```text
close-friend conversational naturalness
with
one preferred conversational surface style
```

### 6.4 Generic-but-correct drafts still over-scored

Several EDIT/REWRITE drafts remained 4/4 across all dimensions because the judge could explain why their meaning was sensible.

The key distinction remains unresolved:

```text
meaning is defensible
!=
exact wording is native-editor-ready for Answers
```

---

## 7. Methodological decision — stop prompt-overfitting this incumbent

The same 20 rows are now highly methodology-exposed.

A fourth, fifth or sixth prompt revision could continue fitting known failures without demonstrating that the underlying judge generalizes.

Therefore:

> **The v3 failure triggers Judge Admission. It does not justify endless prompt tuning of the incumbent on the same exposed calibration rows.**

The incumbent remains useful as research evidence and may still compete as a candidate judge, but it is not granted production authority merely because it is the current live semantic model.

This corrects an earlier overly strict interpretation that the incumbent had to pass editor alignment before Judge Admission could begin. Judge Admission exists precisely to discover whether a better judge or set of judges is available.

---

## 8. Architecture consequence

The measurement system must distinguish:

```text
CALIBRATION FAILURE OF CURRENT JUDGE
        ↓
TRIGGERS CANDIDATE SEARCH / JUDGE ADMISSION

not

CALIBRATION FAILURE OF CURRENT JUDGE
        ↓
BLOCKS ADMISSION UNTIL CURRENT JUDGE IS PROMPT-TUNED TO PASS
```

A judge may not become qualified by overfitting to exposed Calibration Bank cases.

Fresh blind Stage A production evidence, Stage B judging evidence, robustness testing and later hidden Qualification Bank evidence determine qualification.

---

## 9. Next clean experiment

Campaign:

```text
TCJ-JUDGE-ADMISSION-2026Q3-v1
```

Current prepared state:

```text
10 fresh Stage A scenarios frozen
candidate identities sealed
candidate set frozen privately
blind review backend hardened
review locked until full generation matrix exists
full pool globally randomized before first human review
```

The native reviewer will see only:

```text
scenario
opaque response ID
Thai candidate response
ACCEPT / EDIT / REWRITE
optional reason tags / note
```

No provider/model/family identity or candidate-level aggregate performance is exposed during Stage A.

---

## 10. Governing conclusion

> **v3 was useful because it proved the problem is not just a missing sentence in the prompt. TCJ now moves from tuning one judge to measuring which judges deserve authority.**
