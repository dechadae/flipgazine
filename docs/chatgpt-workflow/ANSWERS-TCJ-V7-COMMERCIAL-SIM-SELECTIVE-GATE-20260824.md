# TCJ v7 Commercial-Simulation Selective Editor Gate

**Date:** 24 August 2026  
**Canonical Supabase project:** `sjpvhgxacsiorrtijqua`  
**Final status:** frozen failed diagnostic; not qualification evidence.

## Frozen source and generation

- Evidence set: `TCJ-SELECTIVE-EDITOR-SOURCE-BANK-2026Q3-v7`
- Evidence-set id: `18`
- Cases: `24`
- Bank manifest SHA-256: `b487efa82f88f295d825d2b12e300b43ab25075423a494b048ca275aee0208ba`
- Experiment: `TCJ-SELECTIVE-EDITOR-COMMERCIAL-SIM-GEMINI35-v7`
- Model: `gemini-3.5-flash-lite`
- Generation: `24 / 24 complete`
- Terminal generation failures: `0`
- Gemini HTTP 429 events: `0`
- v7 worker: `tcj-rewrite-lift-neutral-gemini35-worker-v3` version `5`
- v7 worker SHA-256: `e52ca158c9c51a28bbedf8ca34320ef32ffdce21831e504b57cf994c611334bf`
- v7 review API: `tcj-rewrite-lift-hard-review-v2` version `5`
- review API SHA-256: `5ef49e8328cbbf58e83cc3d7b31e00e789b0758419fd70d6ace39d0623f883aa`

One engineering failure occurred before any provider request because an initial prospective attempt logger used a temporary outcome value incompatible with the inherited provider-ledger constraint. The failure was preserved and the constraint was not weakened.

## Integrity before human review

All 24 cases passed the frozen integrity audit: bank/hash integrity, baseline/final output hashes, mandatory protected evidence, attempt links, SHIP byte identity, targeted-revision request shape and private-evidence containment all had zero violations. Qualification 2.0 remained unexposed.

## Frozen native-human gold

Protocol: `TCJ-SELECTIVE-EDITOR-HUMAN-REVIEW-2026Q3-v7`

- Reviews: `24 / 24`
- Human SHIP: `1`
- Human REVISE: `23`
- Displayed-draft hash mismatches: `0`
- Human manifest SHA-256: `b2c32f637afd14fdefea89f7f293bfe48b39f25edc879bc88b43c87ebb930f76`
- Frozen at: `2026-08-24T17:16:52+07:00`

Native-human qualitative finding: the generated responses were generally poor and frequently severely overlong; some were three paragraphs.

## One-time TCJ unblind

The human manifest was frozen and canonical GitHub state synchronized before TCJ was unblinded.

Result:

```text
Human SHIP                 1
Human REVISE              23
TCJ SHIP                  16
TCJ REVISE                 8
Correct SHIP               1
Correct REVISE             8
Missed revisions          15
Unnecessary revisions      0
Agreement                   9 / 24 = 37.5%
```

TCJ correctly preserved the only draft the native editor accepted, but falsely SHIPPED 15 of the 23 drafts the native editor would revise. This is a major false-SHIP failure and v7 does not support a selective-editor claim.

## Failure diagnosis

The length problem is real but is not sufficient to explain the failure.

- v7 baseline average length: `224.5` characters
- maximum: `454`
- false-SHIP average length: `208`
- false-SHIP cases with multiple line breaks: `5 / 15`

TCJ did correctly identify advisor/consultant scaffolding, over-explanation and generic reassurance in the eight true-REVISE cases. However, in the 15 missed revisions it returned `SHIP` with an empty problem even when similar defects were present. Therefore the conceptual failure is inconsistent application of the publishability test, not merely lack of vocabulary for verbosity.

Do not patch v7 with a hard character threshold and do not rerun/re-score v7 as improved evidence.

## Important historical contradiction: role-only writer was stronger

The earlier `TCJ-REWRITE-LIFT-GEMINI35-v1` baseline gave Gemini a strong specialist role:

> expert Thai conversational copywriter for a modern close-friend/BFF magazine voice

plus simple instructions to preserve useful intent, sound like a real Thai close friend and keep the response concise. The TCJ arm received the same writer role plus an additional editorial brief.

Frozen blind result:

```text
TCJ wins      2
Baseline wins 1
Ties         13
Neither       0
```

This is not proof that the role alone was the sole causal factor because v1 also asked Gemini to rewrite an existing source draft, whereas v7 composed more freely from a semantic source. But it is strong evidence against the assumption that heavier TCJ guidance should be injected into the writer.

Observed baseline length comparison:

```text
v1 role-conditioned writer average   157.6 chars
v7 commercial-sim writer average      224.5 chars
```

## Architectural correction

The simplest evidence-consistent product loop is now:

```text
customer/source task
→ capable writer receives a compact role/voice capsule only
→ writer produces finished copy
→ TCJ inspects the exact finished copy
→ SHIP or REVISE
→ if REVISE, TCJ returns one smallest useful editorial instruction
→ same writer edits its CURRENT finished draft under the same role capsule
→ optional TCJ re-check
```

Raw private evidence, methodology packs and detailed TCJ reasoning do **not** go into the writer prompt. They remain on the TCJ/editor side.

## Next development gate

Before another full selective-editor bank, run a small fresh **role-writer feasibility pilot** using the simple v1-style writer role and fresh cases. TCJ must not see these cases yet.

Human reviews only the raw writer drafts for exact-copy publishability. The purpose is not to score TCJ; it is to verify that the writer simulation itself produces a meaningful mix of publishable and editable outputs and does not systematically regress into verbose assistant copy.

Only if the writer pilot is viable should a new fresh selective-editor bank be frozen and TCJ tested. Do not retune or reuse v7 for scoring.

Qualification 2.0 remains protected. Paid OpenAI/xAI development credits remain locked.
