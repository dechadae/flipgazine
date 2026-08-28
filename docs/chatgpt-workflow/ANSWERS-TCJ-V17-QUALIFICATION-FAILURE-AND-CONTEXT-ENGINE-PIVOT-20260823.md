# TCJ — v1.7 Qualification Failure and Context-Engine Pivot

**Status:** VERIFIED EXECUTION CHECKPOINT / ARCHITECTURE PIVOT EVIDENCE  
**Date:** 23 August 2026  
**Project:** Flipgazine / The Book of Answers / Thai Conversation Judge (TCJ)  
**Authority:** historical execution evidence plus current R&D constraint; does not grant production authority

---

## 1. What happened

The frozen research evaluator:

`TCJ-EVAL-ANSWERS-BFF-SOL-v1.7-frozen-dev`

Configuration SHA-256:

`5eb3d2354717573e1d8f48a574a960d3bea63a855409ac23932530be7bc23d07`

was exposed once to the fresh native-human-frozen v3 Qualification bank:

`TCJ-EVALUATOR-QUALIFICATION-2026Q3-v3`

The provider run completed cleanly:

```text
48 / 48 primary cases
288 / 288 primary judgments
29 challenged cases
101 / 101 challenge judgments
389 committed dispatches
389 durable responses
288 / 288 deterministic resolution cells
48 / 48 case decisions
terminal generation failures = 0
blocking incidents = 0
credit incidents = 0
```

The Qualification nevertheless failed the preregistered gates.

Sealed summary SHA-256:

`52c507629205ddbb532faf57db2b9e8346ad82cfcf2e65d014231f80ddc70fd5`

Global result:

```text
overall MAE = 0.5729
false-fluent human MAJOR/CRITICAL ACCEPT cases = 3
Qualification state = failed
production authority = none
```

Per-dimension sealed metrics:

```text
intent              MAE .5000   within-one 41   extremes 3   target 5/8
thai_pragmatics     MAE .6458   within-one 42   extremes 4   target 7/8
bff_voice           MAE .5625   within-one 42   extremes 4   target 8/8
lexical_social_fit  MAE .6250   within-one 42   extremes 2   target 8/8
stance              MAE .5625   within-one 42   extremes 3   target 6/8
composition         MAE .5417   within-one 43   extremes 4   target 6/8
```

This failure is permanent historical evidence. Human gold and the original threshold contract are not changed or relabeled to make v1.7 pass.

---

## 2. What the failure proved

The failure was not caused by provider quota, malformed responses or terminal generation defects.

It exposed an architectural limitation:

> **A capable semantic model plus a narrow rubric plus compressed precomputed signals is not equivalent to the same capable model operating with the full TCJ conceptual context.**

Recurring failures included:

- factual-answer-required questions being mistaken for acceptable social redirection;
- disproportionate stance being treated as fluent advice;
- event-valence mismatch being misread as surface fluency;
- severe structural incompletion being rescued by over-broad native-compression heuristics;
- BFF/voice quality being conflated with semantic correctness;
- cross-dimension contamination;
- deterministic floors/caps sometimes overriding a better raw semantic judgment.

The v1.7 path had tried to reconstruct semantic understanding in SQL/feature logic that the foundation model can already perform when given sufficient methodology context.

---

## 3. Clean-account GitHub observation

A separate ChatGPT account with no prior TCJ conversation history, when connected to the repository and allowed to read the project documentation, reproduced much of the intended BFF writing/judgment behavior.

This is treated as qualitative architecture evidence, not a formal benchmark.

The observation implies:

```text
foundation-model Thai capability
+ coherent TCJ methodology context
≈ substantially better activation of intended TCJ behavior
```

It does **not** imply that production should reread GitHub on every request.

The production implication is to compile the useful project knowledge once into a versioned **TCJ Methodology Pack** and retrieve only relevant sections at runtime.

---

## 4. Development API-spend policy from this checkpoint

Effective immediately after this checkpoint:

```text
NO paid external-model/API calls for ordinary TCJ development.
```

Development shall use:

- the three exposed human-reviewed absolute-rating banks;
- all already-paid stored primary/challenge responses;
- deterministic replay;
- contrastive/minimal-pair evidence;
- local/static methodology compilation;
- ChatGPT reasoning in the current development environment;
- optional clean-account human-operated review where useful.

A paid external provider call is reserved for the **final frozen qualification/acceptance test only**, after:

1. final architecture implementation is complete;
2. the Methodology Pack and retrieval contract are frozen;
3. the Private Evidence Tool contract is frozen;
4. the release policy is frozen;
5. offline/exposed-bank development has converged;
6. contrastive development evidence is satisfactory;
7. a genuinely fresh final test instrument is preregistered;
8. the user explicitly approves the final paid run and current provider balance is checked.

No automatic worker or cron path may silently consume development credit.

---

## 5. Contrastive evidence pivot

The repeated 48-case × six absolute-rating mechanic is retired as the default development loop.

The existing v1.1/v2/v3 banks remain valuable absolute-score development evidence, but another mechanically identical bank is not considered sufficient methodological novelty.

A separate development instrument now exists:

`TCJ Contrastive Review v1`

Current shape:

```text
30 A/B/Tie comparisons
26 unique comparisons
4 hidden reversed consistency repeats
12 mechanism families
```

Review page:

`https://flipgazine.pages.dev/tcj-contrastive-review.html`

The pairwise mechanic is designed to isolate distinctions such as:

- factual answer vs fluent non-answer;
- proportional vs reckless stance;
- licensed vs unlicensed hierarchy/casualness;
- event-appropriate vs valence-mismatched language;
- deliberate composition vs broken structure;
- BFF voice vs advisor scaffolding;
- code-switch integration;
- dimension isolation;
- near-tie / ambiguity behavior.

A/B/Tie evidence is preferred for new human development review because it produces cleaner causal evidence per click and reduces dependence on subjective absolute score calibration.

---

## 6. First offline v1.8 research result

A parallel v1.8 research path was started using only stored judgments and deterministic logic.

The important first result is not numeric MAE. It is release safety:

```text
v2 exposed development evidence:
  human MAJOR/CRITICAL falsely ACCEPTed = 0

v3 exposed development evidence:
  human MAJOR/CRITICAL falsely ACCEPTed = 0
```

This was achieved without new provider calls by separating deterministic **release policy** from six-dimensional score calibration.

The first v1.8 release policy is intentionally conservative and still creates false blocks on some human-PASS cases. It is research-only and must be narrowed before final freeze.

---

## 7. Architectural pivot

The preferred product architecture now separates four kinds of intelligence:

```text
1. TCJ Methodology Pack
   portable conceptual knowledge that the judge may receive

2. TCJ Context Retriever
   locally selects the minimum relevant methodology modules per request

3. Private Evidence Engine / Data Vault
   proprietary raw evidence that remains private

4. Private Evidence Tool
   narrow judge-initiated derived analysis from the private engine
```

This replaces the assumption that precomputed scalar signals should carry most TCJ intelligence.

The Methodology Pack may contain principles, ontologies, decision boundaries and non-proprietary/constructed explanatory examples. It must not contain reconstructive raw corpus material by default.

The Private Evidence Tool may return richer bounded explanations than v1.7 scalar features, but still never raw rows or arbitrary corpus search.

---

## 8. Current authority conclusion

As of this checkpoint:

```text
v1.7 authority = NONE
v3 Qualification = FAILED and permanently exposed development evidence
external API development spending = STOPPED
next architecture = Context Pack + Context Retriever + Private Evidence Tool + thin deterministic Release Policy
final paid provider use = reserved for one final frozen test only
```

This checkpoint supersedes any older immediate-next-action text that calls for repeated paid development replays or another mechanically identical 48×6 Qualification bank.