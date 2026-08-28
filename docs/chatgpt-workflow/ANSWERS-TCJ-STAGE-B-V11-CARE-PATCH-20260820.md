# TCJ Stage B v1.1 — CARE-Mode Parity Patch

> **Historical applied patch.** Preserve this as Stage B methodology provenance. Stage B and frozen-input Robustness v1 have since completed; use the 21 August robustness-completion record for current execution state.

**Status:** LIVE · PRE-RUN VALIDITY PATCH · NO v1.1 EVIDENCE GENERATED BEFORE PATCH  
**Date:** 20 August 2026

During final pre-run verification, 6 of the 36 historical Calibration scenarios matched the canonical TCJ CARE-mode detector. The initial Stage B v1.1 deployment had restored the canonical `answers-bff-v2` ordinary prompt but had not yet preserved the canonical CARE branch.

Because Stage B v1.1 still had **0 judgments, 0 eligible attempts and 0 v1.1 failures**, the runner was corrected before any v1.1 evidence existed. No v1.1 evidence required invalidation.

Live runner after the patch:

```text
tcj-admission-stage-b v3
protocol = TCJ-JUDGE-ADMISSION-STAGE-B-v1.1
verify_jwt = true
```

The runner now uses the same canonical TCJ CARE detector and branches the system prompt per evidence item:

```text
30 ordinary historical cases → canonical answers-bff-v2 prompt
 6 CARE-like historical cases → canonical TCJ CARE prompt
```

`care_mode` is persisted in attempt/judgment generation settings and included in the methodology hash. The predefined one-repair structured-output policy remains unchanged.

Canonical source provenance remains pinned to TCJ core blob:

```text
459d9831cf439696e0861f85c26839a43f6b6a64
```

This patch was made before the operator was authorized to restart Stage B v1.1. Candidate identities remain sealed and Stage A evidence remains unchanged.
