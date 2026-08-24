# TCJ v7 Commercial-Simulation Selective Editor Gate

**Date:** 24 August 2026  
**Canonical Supabase project:** `sjpvhgxacsiorrtijqua`  
**State at this checkpoint:** native-human manifest frozen; TCJ decision distribution still sealed.

## Why v7 exists

v6 was retired before native-human review because the instrument was not a good test of selective editing. The source/task framing itself strongly biased the generated drafts toward advice-like, over-explained responses, making an all-or-nearly-all REVISE outcome structurally likely. v6 remains immutable diagnostic history; it was not deleted or relabeled as successful evidence.

v7 was built as a fresh replacement with a broader commercial-writer simulation and more varied response shapes. Its purpose is to test whether TCJ can correctly decide whether a competent customer-model draft is publishable unchanged (`SHIP`) or needs a meaningful edit (`REVISE`).

## Frozen v7 source bank

- Evidence set: `TCJ-SELECTIVE-EDITOR-SOURCE-BANK-2026Q3-v7`
- Evidence-set id: `18`
- Cases: `24`
- Distinct response phenomena: `24`
- Scenario/source hash overlap with prior TCJ evidence: `0`
- Bank manifest SHA-256: `b487efa82f88f295d825d2b12e300b43ab25075423a494b048ca275aee0208ba`
- Frozen before generation: yes
- Qualification 2.0 reused: no

## Generation/runtime

- Experiment: `TCJ-SELECTIVE-EDITOR-COMMERCIAL-SIM-GEMINI35-v7`
- Model: `gemini-3.5-flash-lite`
- Generation: `24 / 24 complete`
- Terminal generation failures: `0`
- Gemini HTTP 429 events: `0`
- Worker slot: `tcj-rewrite-lift-neutral-gemini35-worker-v3`
- Active v7 worker version: `5`
- Active v7 worker SHA-256: `e52ca158c9c51a28bbedf8ca34320ef32ffdce21831e504b57cf994c611334bf`
- Review API slot: `tcj-rewrite-lift-hard-review-v2`
- v7 review API version: `5`
- v7 review API SHA-256: `5ef49e8328cbbf58e83cc3d7b31e00e789b0758419fd70d6ace39d0623f883aa`

Historical worker versions remain preserved. One v7 engineering failure occurred before any provider request because the first prospective attempt logger used a temporary `started` outcome incompatible with the inherited provider-ledger constraint. That failure is preserved as transport/infrastructure history; the constraint was not weakened. Worker version 5 corrected the logger and completed the experiment.

## Integrity audit before human review

All 24 cases passed the sealed integrity audit:

- bank manifest matches: yes
- final-output hash mismatch: `0`
- baseline-output hash mismatch: `0`
- mandatory protected evidence missing: `0`
- baseline/editor/revision attempt-link mismatch: `0`
- SHIP byte-identity violations: `0`
- targeted-revision integrity violations: `0`
- obvious private-evidence leakage flags in writer requests: `0`
- Qualification 2.0 `machine_exposed_at`: `null`

The hidden TCJ SHIP/REVISE distribution was not inspected during these checks.

## Native-human gate

Protocol: `TCJ-SELECTIVE-EDITOR-HUMAN-REVIEW-2026Q3-v7`

Human question:

> Would you publish this exact finished response unchanged?

Definitions:

- `SHIP` = exact copy is publishable unchanged.
- `REVISE` = any meaningful edit is needed before publication, including shortening/compression, restructuring, voice correction, removal of generic/model-like elaboration, stance/certainty correction, semantic/pragmatic correction or composition correction.

Native-human review completed `24 / 24` with zero displayed-draft hash mismatches.

Frozen native-human result:

- SHIP: `1`
- REVISE: `23`
- Human manifest SHA-256: `b2c32f637afd14fdefea89f7f293bfe48b39f25edc879bc88b43c87ebb930f76`
- Frozen at: `2026-08-24T17:16:52+07:00`

Native-human qualitative note after completing review: the generated responses were generally very poor and many were severely overlong; some were three paragraphs. This note is diagnostic evidence about the writer simulation/instrument. It must not be used to change any reviewed case or label.

## Interpretation before unblind

The 1/23 human distribution means the v7 writer simulator still produced overwhelmingly non-publishable copy. Therefore, even if TCJ agrees perfectly, v7 may be weak evidence for **selectivity** because the negative class dominates almost completely. It can still reveal false-SHIP failures and whether TCJ detects obvious overlong/model-like copy, but it cannot by itself establish that TCJ knows when to leave genuinely good customer copy untouched.

Do not force a balanced result by relabeling or regenerating v7. Any successor instrument must be fresh and should deliberately validate the writer baseline before the TCJ gate is applied.

## Mandatory next action

1. Keep this human manifest frozen.
2. Synchronize `CURRENT-STATE.json` and `DOCUMENT-AUTHORITY-MAP.md` to this checkpoint.
3. Only then unblind TCJ exactly once.
4. Report agreement/confusion matrix honestly.
5. Treat v7 as a diagnostic if the class imbalance makes selective-editor claims weak.
6. Do not touch Qualification 2.0.
7. Do not spend paid OpenAI/xAI credits during development.
