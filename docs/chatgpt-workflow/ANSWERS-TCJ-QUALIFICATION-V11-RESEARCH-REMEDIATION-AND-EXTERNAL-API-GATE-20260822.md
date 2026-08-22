# TCJ Qualification v1.1 — Research Remediation & External API Release Gate

**Status:** CURRENT TCJ RESEARCH EXECUTION AUTHORITY  
**Date:** 22 August 2026  
**Source run:** `TCJ-JUDGE-QUALIFICATION-RUN-2026Q3-v1.1`  
**Frozen source profile:** `TCJ-ANSWERS-BFF-v2@TCJ-CORE-v1`  
**Research profile:** `TCJ-ANSWERS-BFF-v3-research`

## 1. Governing interpretation

Qualification v1.1 remains a valid completed hidden Qualification run.

The native-human frozen ratings are the authoritative comparison gold. `constructed_likely_acceptable` and `constructed_likely_problematic` are case-design hypotheses only; they are never answer keys and must never override a blind native-human judgment.

The run result remains:

```text
144 / 144 valid judgments
146 committed dispatches
146 durable responses
0 open dispatches
0 terminal generation-contract failures
3 Qualification summaries
3 Qualification Passports
0 authority-bearing Passports
0 qualified dimensions
0 partially-qualified dimensions
```

All three candidate judges remain `research_only` under the preregistered thresholds. No threshold is changed to make a judge pass.

## 2. Audit correction

A post-run audit mistakenly inferred that several native-human ratings were invalid because they contradicted the case-design label. That inference was wrong.

The append-only incident `TCJ-Q-RUN-2026Q3-v1.1-INC-GOLD-001` is preserved for audit history but is formally superseded by:

```text
TCJ-Q-RUN-2026Q3-v1.1-SUPERSEDE-GOLD-001
```

The replacement interpretation is:

> Qualification v1.1 is valid. The candidate judges failed the test. The exposed run may be used as research/development evidence to improve judge behavior, but a changed judge/profile must face a fresh hidden Qualification bank before receiving production authority.

The design-label-based pre-freeze sanity gate introduced from the same mistaken inference was removed. Future human-gold freeze logic checks mechanical integrity only: review completeness, exact text/hash alignment, immutable provenance, and frozen manifest consistency. It does not second-guess the human rating because of design metadata.

## 3. Research use of the failed Qualification

Qualification v1.1 now becomes the development benchmark for correcting observed judge failure modes.

This is allowed methodologically because the run is no longer treated as unseen authority evidence for any configuration designed after seeing its results.

The correct cycle is:

```text
v1.1 hidden Qualification result
→ expose and analyze failures
→ improve judge contract / candidate configuration
→ regression-test on v1.1 as DEV evidence
→ freeze revised candidate contract
→ construct FRESH hidden Qualification bank
→ native-human blind review/freeze
→ execute revised judges
→ production authority only if preregistered gates pass
```

Never lower the historical v1.1 thresholds, relabel human gold to match a model, or rerun a tuned configuration on v1.1 and call the result hidden Qualification.

## 4. Research failure catalogue

Canonical Supabase now contains eight append-only research failure clusters derived from v1.1.

### 4.1 Literal task-completion bias

The judge confuses conventional assistant helpfulness with Answers/editorial intent and rejects socially coherent non-literal redirection.

Prevention:
- evaluate the implied desire, hesitation, tension, joke, or social function as well as the literal surface question;
- do not require factual task completion when an Answers-style authored response functions coherently in the conversation.

### 4.2 Persona ontology bias

The judge treats first-person `เรา` as literal AI agency rather than authored persona/rhetorical voice.

Prevention:
- interpret first-person within the authored voice first;
- reject only when the phrasing is socially incoherent, not merely because an AI agent would lack literal real-world agency.

### 4.3 Register-inversion blindness

The judge can treat concise mock-formal or mock-bureaucratic Thai as robotic instead of recognizing deliberate deadpan register clash.

Prevention:
- distinguish compressed comic register inversion from long assistant/customer-service scaffolding;
- allow intentional formal vocabulary to function as a punchline when the social landing is native and designed.

### 4.4 BFF decisiveness over-requirement

The judge assumes a close friend must always provide a direct recommendation, warmth, slang, or explicit support.

Prevention:
- neutrality, understatement, mock-politeness, or minimal stance may still be native-editor-ready;
- direct advice is not a prerequisite for BFF voice.

### 4.5 Surface code-switch over-reward

The judge may approve awkward Thai-English structure because visible English appears contemporary.

Prevention:
- score syntactic and social integration, not English visibility;
- penalize translation-shaped bilingual scaffolding and awkward English-slot insertion even when the individual English words are trendy.

### 4.6 Hierarchy / particle miscalibration

The judge may generalize peer-chat casualness to boss/senior relationships.

Prevention:
- evaluate particles and stance against explicit relationship hierarchy;
- do not assume a casual particle is safe upward merely because it is natural among peers.

### 4.7 Line-break surface over-reward

The judge may treat vertical fragmentation itself as authored composition.

Prevention:
- line breaks earn composition credit only when they create meaningful rhythm, grouping, hierarchy, or landing;
- word-by-word stacking does not earn quality by itself.

### 4.8 Cross-dimension error cascade

One perceived problem can collapse all six ratings even when some dimensions remain intact.

Prevention:
- rate the six dimensions independently before assigning severity;
- a serious problem in one dimension must not mechanically force all other dimensions to the same low score.

## 5. Research profile v3

Canonical research profile:

```text
TCJ-ANSWERS-BFF-v3-research
status: research_draft
base: TCJ-ANSWERS-BFF-v2
rule count: 10
profile SHA-256:
1538c9fd6b9487b5e8a3757ec69ba88a27efeb74b058c70a7875d17ce8e88fa1
```

The profile explicitly adds the eight failure-prevention areas above plus two methodology guards:

1. before declaring semantic drift, test intentional reframing into the implied desire/tension/punchline appropriate to Answers Voice;
2. never infer correctness from case-design metadata; frozen native-human judgment is the research comparison gold.

`v3-research` has **zero production authority**. It is a development artifact only.

## 6. Candidate strategy

Qwen 3.6 27B remains the closest of the three tested candidates and is useful as the primary development judge for profile-contract refinement.

GPT-OSS 120B and 20B showed a much larger systematic negative bias against native-human 4 ratings, particularly on intent and Thai pragmatics. They remain useful as adversarial/secondary research candidates, but there is no reason to weaken TCJ to accommodate them.

The purpose of the research phase is not to make every model pass. It is to make the TCJ contract robust enough that a capable model does not repeat known evaluator mistakes.

## 7. Release definition

"TCJ complete" does not mean mathematically flawless. For release it means **no known blocking methodology/integrity defect and all frozen release gates pass**:

```text
research remediation shows improvement without unacceptable regressions
→ revised judge/profile contract frozen
→ fresh hidden Qualification passed
→ authority-bearing Judge Passports issued
→ qualified Panel assembled and disagreement policy validated
→ independent Assurance holdout passed
→ reproducibility / fresh-install acceptance passed
→ final TCJ architecture/runtime freeze
```

Only after this sequence may TCJ be described as production-ready.

## 8. OpenAI + xAI API integration gate

OpenAI and xAI API credits are intentionally **not used during the current TCJ remediation phase**.

They are a post-TCJ-release integration step.

After final TCJ freeze:

```text
connect OpenAI adapter
connect xAI adapter
→ run model-compatibility preflight
→ select portable Voice Profile
→ test Judge Only / Buyer-model Rewrite / TCJ Writer modes as applicable
→ verify TCJ source-identity invariance and human-grounded discrimination
→ production integration
```

The purpose of delaying these connections is methodological cleanliness: TCJ should first prove its own judging architecture independently, then external frontier models can be plugged into the finished vendor-agnostic Gateway without changing the canonical Voice Profile contract to suit them.

No API-specific prompt tuning may silently modify the Voice Profile. Provider/model adapters may normalize transport and prompt formatting, but semantic Voice Profile rules remain canonical and versioned independently.

## 9. Immediate automatic work

Continue without native-human intervention for now:

1. implement/replay `TCJ-ANSWERS-BFF-v3-research` against exposed v1.1 as development evidence;
2. compare v2 → v3 by dimension, extreme reversals, false-fluent tail risk, and regression cases;
3. iterate only through new research-profile versions; never mutate v1.1 evidence;
4. when research convergence is good enough, freeze the next judge contract;
5. construct a fresh hidden bank;
6. stop for native-human blind review only then.

OpenAI and xAI integration remains explicitly gated until final TCJ release freeze.