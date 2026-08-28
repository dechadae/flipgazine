# TCJ — Architecture v2 Offline Components and Contrastive Human Gate

**Status:** VERIFIED OFFLINE IMPLEMENTATION CHECKPOINT / NATIVE-HUMAN DEVELOPMENT GATE  
**Date:** 23 August 2026  
**Production authority:** NONE  
**Paid external-model calls for this implementation:** 0

This checkpoint records the first integrated Architecture-v2 development stack built entirely from canonical documentation, frozen human evidence, stored provider traces and deterministic/local logic. It does not claim semantic Qualification of the new context-aware judge because no fresh provider call has been made under this architecture.

## 1. Components now implemented

### Methodology Pack

```text
TCJ-METHODOLOGY-BFF-v1
status       research_compiled
modules      13 (M00–M12)
pack SHA     22ab0440b41708f41d8abe3a546b7c6197220a1824c59de56a6e86a4b7761f0a
```

The pack is judge-visible conceptual knowledge. It excludes raw Batch rows, hidden Qualification cases, buyer-private evidence, raw human edit pairs, row IDs and secrets.

Canonical compiled artifact:

`ANSWERS-TCJ-METHODOLOGY-BFF-V1-COMPILED-20260823.md`

### Context Retriever

```text
active       TCJ-CONTEXT-RETRIEVER-v1.1
status       research_active
definition   ce572d4ad361d563229c27da9c111647c4571af7ceab02b6940dd2eca6d693a2
module cap   8
external LLM required  false
```

Retriever v1 is preserved as retired research evidence:

`f9c948e0a154a697ec92018ccf3e536b3e5238f89984022d70a839590e324541`

v1.1 adds Stance methodology to advice/judgment requests and adds explicit uncertain-social-inference routing. The retriever selects conceptual context only; it does not decide whether the candidate is good or bad.

### Private Evidence Assessment

```text
TCJ-PRIVATE-EVIDENCE-ASSESS-v1
status       research_active
engine       TCJ-PRIVATE-EVIDENCE-v3
definition   9f6a93d92e79651b095803cd064d0d9c9e1414ef2db9b6c2314d1196e19a67cf
max families per call  4
```

Allowlisted families:

- factual_vs_social_intent
- unconventional_but_native
- register_inversion
- hierarchy_and_relationship_license
- code_switch_integration
- linebreak_and_structural_completeness
- stance_proportionality
- event_valence
- known_failure_cluster
- dimension_isolation_support

Capability boundary:

```text
raw rows                  no
arbitrary corpus search   no
nearest examples          no
row IDs                   no
hidden-bank retrieval     no
bounded explanation       yes
```

### Release Policy

```text
active       TCJ-RELEASE-POLICY-v1.1
status       research_active
definition   c237fcf664ee67083bc4c7c3a46645a12fbad929cf2a93c363818d9b95a75e23
release evidence  TCJ-RELEASE-EVIDENCE-v1.1
```

Release Policy v1 is preserved retired research evidence:

`a292e06aeeb38b552624bbc7af03ea51c236b4a891a265f072048dcdcda415b0`

## 2. Human-gold corrections that changed Release Policy

Frozen v2/v3 human evidence invalidated several deterministic assumptions:

- a generic `ใช่ไหม` confirmation shape cannot be treated as a hard factual-answer blocker;
- a low individual dimension score does not automatically mean the whole BFF response must be blocked;
- exaggerated stance can be deliberate close-friend hyperbole;
- apparently positive language after bad news can be acceptable BFF sarcasm;
- acute cutesy/minimizing treatment of hospitalization/death is materially different from dry sarcastic inversion.

Therefore v1.1 keeps only narrow high-confidence hard blockers and sends nuanced stance/valence questions back to semantic judgment.

Current hard evidence families include:

- explicit time/open/payment/delivery factual non-completion;
- severe structural incompletion;
- low-information repetition;
- severe unlicensed upward casualness;
- narrow acute-event cutesy mismatch.

Warnings rather than automatic blockers include:

- stance proportionality / exaggerated advice;
- minor-issue hyperbole;
- generic event-valence inversion;
- moderate upward casualness;
- possible dangling final line.

## 3. Exposed-human replay result

Hard-release evidence was replayed across frozen v2 + v3 native-human PASS cases.

```text
human PASS cases checked             49
high-confidence deterministic blocks  0
false hard-block rate                  0 / 49
```

This does **not** mean the deterministic layer catches every serious defect. It intentionally does not. Nuanced conversational quality remains the semantic judge's responsibility.

## 4. Known semantic mechanisms covered by the current stack

The pack/retriever/PEE now have explicit representation for:

- factual answer vs advisory/judgment speech acts;
- confirmation vs social inference;
- hierarchy direction and relationship license;
- service sequencing;
- BFF vs assistantese;
- ordinary formal / bureaucratic / archaic / mock-formal distinctions;
- Thai-clause-spine code-switch integration;
- lexical-vs-BFF dimension isolation;
- stance proportionality and principled uncertainty;
- deliberate fragments vs structural incompletion;
- rhetorical vs empty repetition;
- event valence / CARE;
- false fluency;
- cross-dimension cascade;
- line-break surface bias;
- overaggressive rescue floors;
- correlated same-model second passes.

## 5. Current native-human gate

The next required development evidence is:

`TCJ-CONTRASTIVE-DEVELOPMENT-v1`

Review URL:

`https://flipgazine.pages.dev/tcj-contrastive-review.html`

Instrument:

```text
30 A/B/Tie screens
26 unique comparisons
4 hidden reversed consistency repeats
12 mechanism families
current reviewed 0 / 30
```

This is development evidence, not final Qualification 2.0 evidence.

The reviewer sees the scenario, two responses and the specific comparison question. Hidden mechanism labels, intended relation and pair provenance remain outside the review surface.

## 6. What happens after the 30 human choices

No external provider call is required.

Execution order:

1. measure reversed-pair consistency;
2. compare human preference to each hidden mechanism hypothesis;
3. identify hypotheses invalidated by human judgment;
4. correct Methodology Pack / Context Retriever / PEE / Release Policy only where the evidence supports a general mechanism;
5. freeze a development checkpoint;
6. build BYOJ/BYOK and Local Judge adapters against mocks/stored fixtures;
7. integrate the complete Architecture-v2 request path;
8. run offline/exposed-bank orchestration and security tests;
9. complete packaging, tenant isolation, evidence-exfiltration and secret-rotation gates;
10. freeze the exact final evaluator;
11. only then construct fresh Qualification 2.0 human evidence;
12. reserve the first new paid provider calls for the final frozen authority run after explicit user approval.

## 7. Spend invariant

```text
ordinary development paid external-model calls = 0
```

No autonomous worker/cron may consume external judge credit.

Before the final authority run, the user must be shown the exact provider/model/settings, call count, expected cost and available credit and must explicitly approve the spend.

## 8. Live status

`https://flipgazine.pages.dev/tcj-status.html`

The live status endpoint is now Architecture-v2 aware and reports this contrastive review as the current human gate.