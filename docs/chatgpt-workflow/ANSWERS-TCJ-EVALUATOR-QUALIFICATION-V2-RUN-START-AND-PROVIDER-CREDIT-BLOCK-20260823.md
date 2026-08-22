# TCJ Evaluator Qualification v2 — Human-Gold Freeze, Run Start & Provider-Credit Block

**Checkpoint:** 23 August 2026  
**Status:** CURRENT QUALIFICATION EXECUTION CHECKPOINT  
**Production authority:** NONE  
**Protocol:** `TCJ-EVALUATOR-QUALIFICATION-2026Q3-v2`  
**Run:** `TCJ-EVALUATOR-QUALIFICATION-RUN-2026Q3-v2-SOL-v1.5`  
**Evaluator:** `TCJ-EVAL-ANSWERS-BFF-SOL-v1.5-frozen-dev`  

## 1. Human gate completed and frozen

The fresh hidden Qualification v2 bank completed native-human blind review and was frozen before machine exposure.

Canonical frozen evidence:

- cases: 48
- human review frozen at: `2026-08-22 17:20:51.222574+00`
- bank frozen at: `2026-08-22 17:20:51.222574+00`
- human manifest SHA-256: `4fb980f8626185b6ef43747931b37548d5e5b9ecbc3e2deb7c3d8cdc29d3b5ff`
- threshold SHA-256: `b805b1f9484ea5ce576f09187c467b268c1f7c20263efa3889041680af426836`
- evaluator configuration SHA-256: `2894444317a07cccc89bef3a80d6d3851740c726f61863109afad487978f3191`

No post-freeze human-gold edits are authorized. Case-design labels remain hypotheses only; frozen native-human ratings are authoritative gold.

## 2. Machine execution began only after freeze

The candidate evaluator first saw the bank at:

`2026-08-22 17:29:30.505+00`

This is after the human/bank freeze above, preserving the blind-order invariant.

The Qualification scope is exactly:

`eager_precomputed_derived_signals`

The interactive `tcj_evidence_assess` Private Evidence Tool is not in scope for this run and cannot inherit authority from a pass here.

## 3. Current machine progress

At this checkpoint:

- expected cases: 48
- expected primary cells: 288
- complete primary cases: 17
- pending primary cases: 31
- persisted valid primary judgments: 107
- challenge state: not yet planned for all cases
- run status: `blocked`

No Qualification summary or authority-bearing Passport exists yet.

## 4. Blocking incident — OpenAI provider credit exhaustion

The run is blocked by provider account quota/credit exhaustion, not by a semantic or evidence-integrity failure.

Preserved incidents:

### `EVALQ-V2-OPENAI-429-BURST-001`

- class: `provider_rate_limit_burst`
- severity: warning
- action: concurrency reduced to one case
- retry policy: transport retry only; no semantic resample

### `EVALQ-V2-OPENAI-CREDIT-EXHAUSTED-001`

- class: `provider_credit_exhausted`
- severity: blocking
- provider: OpenAI
- HTTP status: 429
- error type: `insufficient_quota`
- error code: `credit_balance_exhausted`
- completed primary cases at block: 17
- valid primary judgments preserved: 107
- policy: block until funded account is available; do not semantically resample completed valid judgments

### `EVALQ-V2-OPENAI-CREDIT-EXHAUSTED-RESUME-PROBE-002`

- class: `provider_credit_exhausted`
- severity: blocking
- resume probe confirmed credits remained exhausted
- new quota-failure responses preserved: 5
- action: re-block with no further retry until credits are available

## 5. Integrity interpretation

This provider-credit incident does **not** compromise the hidden bank or frozen human gold.

At this checkpoint there is no recorded:

- human-gold leak;
- raw private-evidence leak;
- Qualification-label leak;
- post-freeze human edit;
- threshold change;
- evaluator-configuration change;
- semantic resampling of valid completed judgments.

The 107 valid primary judgments remain durable historical evidence and must be reused when execution resumes under the same frozen evaluator/run rather than regenerated for convenience.

## 6. Correct resume policy

When OpenAI credit becomes available again:

1. reverify run/evaluator/human/threshold hashes;
2. leave the 17 complete primary cases and 107 valid judgments untouched;
3. resume only pending transport work;
4. preserve all quota/rate-limit responses and incidents;
5. complete remaining primary cells;
6. deterministically materialize challenge plans under the already-frozen policy;
7. execute challenge cells without semantic resampling of prior valid cells;
8. resolve six dimensions independently;
9. apply unchanged Qualification thresholds;
10. preserve PASS or FAIL exactly as produced.

If the evaluator passes, any Passport is scoped to the eager/precomputed derived-signal evaluator only. The preferred interactive Private Evidence Tool successor still requires a new exact configuration freeze and another fresh hidden Qualification bank.

## 7. Current automatic-work boundary

No native-human judgment is currently required. No new research-policy decision is required. The deterministic Qualification run is temporarily transport-blocked solely by unavailable OpenAI provider credit.

Do not weaken thresholds, alter human gold, substitute a different judge/model, or create a new run merely to bypass this provider-credit block.
