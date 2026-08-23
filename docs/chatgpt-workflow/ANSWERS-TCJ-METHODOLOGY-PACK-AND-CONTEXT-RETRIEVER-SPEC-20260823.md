# TCJ — Methodology Pack & Context Retriever Specification

**Status:** GOVERNING IMPLEMENTATION SPEC FOR ARCHITECTURE v2  
**Date:** 23 August 2026  
**Architecture authority:** `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-V2-20260823.md`

---

## 1. Purpose

The TCJ Methodology Pack exists to reproduce, in a portable runtime artifact, the kind of TCJ conceptual understanding that a capable clean ChatGPT account can acquire by reading the repository documentation.

It solves two problems simultaneously:

1. the judge should not need to reread the whole Git repository on every request;
2. the judge should receive substantially richer TCJ conceptual context than the compressed scalar signal bundle used by v1.7.

The Methodology Pack is not a raw-data retrieval system and is not a substitute for the Private Evidence Engine.

---

## 2. Three knowledge tiers

### Tier A — Methodology Pack: judge-visible

Portable conceptual knowledge safe to include in judge context.

Examples:

- speech-act ontology;
- BFF voice principles;
- Thai pragmatics and hierarchy;
- factual-vs-advisory request distinctions;
- stance proportionality;
- event valence;
- code-switch integration principles;
- composition/line-break principles;
- dimension-isolation rules;
- false-fluency patterns;
- constructed explanatory examples/counterexamples.

### Tier B — Private Evidence Tool: judge-queryable but bounded

Derived analysis generated inside the TCJ trust boundary.

Examples:

- whether evidence supports a Thai-clause-spine code-switch pattern;
- whether a hierarchy form is licensed by relationship/channel context;
- whether an unconventional form has native-positive support;
- whether a known failure family is strongly supported;
- which dimensions should be protected from cross-dimension collapse.

The judge receives the assessment, not the raw evidence.

### Tier C — Data Vault: never judge-visible by default

Protected raw/internal evidence:

- Batch rows;
- human edits;
- raw anchor library;
- private review notes;
- hidden Qualification/Assurance cases;
- buyer-private evidence;
- research ledgers.

---

## 3. Build-time compilation

Source materials may include the current canonical TCJ documentation, especially:

```text
ANSWERS-THAI-CONVERSATION-JUDGE-ARCHITECTURE.md
ANSWERS-VOICE-TONE.md
ANSWERS-TCJ-MULTI-JUDGE-CONSENSUS-ARCHITECTURE.md
ANSWERS-TCJ-PRIVATE-EVIDENCE-ENGINE-AND-BUYER-ISOLATION-POLICY-20260822.md
ANSWERS-TCJ-SOL-PRIVATE-EVIDENCE-TOOL-AND-COMMERCIAL-LICENSING-CLARIFICATION-20260822.md
ANSWERS-TCJ-BYOJ-JUDGE-RUNTIME-AND-API-KEY-POLICY-20260822.md
v1.1/v2/v3 failure analyses and approved architecture lessons
```

Compilation must **not** mechanically concatenate every document.

Build process:

```text
canonical docs
→ extract durable principles
→ remove stale next-action/history noise
→ separate general TCJ knowledge from project operations
→ remove/replace reconstructive proprietary examples
→ deduplicate concepts
→ organize into modules
→ adversarially inspect for contradictions
→ hash modules
→ build retrieval metadata
→ sign/freeze Methodology Pack version
```

A pack change that can materially alter judge behavior is authority-bearing.

---

## 4. Initial module map

Target `TCJ-METHODOLOGY-BFF-v1` module families:

### M00 — Core TCJ judgment contract

- judge the exact scenario/candidate;
- separate surface fluency from conversational success;
- preserve dimension independence;
- do not reward grammar/slang/brevity/camp/code-switch by themselves;
- prefer recoverable pragmatic meaning over literal-English structure where appropriate.

### M01 — Intent & speech acts

- factual information requests;
- confirmation questions;
- advice/judgment questions;
- copy-ready social replies;
- emotional support;
- refusal/boundary setting;
- planning/coordination;
- redirection and omission.

Critical distinction:

```text
factual-answer-required
≠
advice/judgment request
```

### M02 — Thai pragmatics

- relationship hierarchy;
- age/status;
- service/customer context;
- particles;
- reciprocity;
- public/group/private channel;
- relationship license;
- indirectness/omission.

### M03 — BFF / profile voice

- friend-like timing;
- compactness;
- warmth without assistantese;
- confidence without reckless certainty;
- playful/mock-formal use;
- tolerance for unusual but native expression.

### M04 — Lexical & social fit

- lexical naturalness;
- register;
- Thai-English integration;
- translation-shaped phrasing;
- slang density;
- bureaucratic/archaic markers.

### M05 — Stance proportionality

- risk magnitude;
- evidence strength;
- relationship stakes;
- uncertainty proportionality;
- boundaries;
- reckless escalation;
- hedge accumulation.

### M06 — Composition

- line breaks as delivery;
- landing;
- progression;
- rhetorical repetition;
- empty repetition;
- fragments;
- incomplete conditional frames;
- run-on advice.

### M07 — Event valence & care context

- bereavement;
- job loss;
- hospitalization;
- rejection/failure;
- good news;
- tone congruence;
- over-cheerful or minimizing responses.

### M08 — Code-switch

- Thai clause spine;
- insertion vs English-shaped frame;
- lexical fit separated from BFF surface;
- code-switching is not intrinsically good/bad.

### M09 — Formality ontology

- ordinary formal;
- bureaucratic;
- archaic;
- mock-formal/playful;
- hierarchy-driven formal;
- assistantese.

### M10 — Dimension isolation

Explicit examples of defects that should remain localized, e.g.:

```text
wrong factual answer + natural Thai
→ Intent can fail while Lexical/Composition remain good

awkward code-switch + friendly voice
→ Lexical can fail without automatically failing BFF

hierarchy misfit
→ Thai Pragmatics may fail while literal task Intent remains satisfied
```

### M11 — Release safety

- dimension diagnosis is not identical to release decision;
- catastrophic/policy families;
- REVISE/ESCALATE semantics;
- preserve acceptable unconventional Thai.

### M12 — Known semantic judge traps

- smooth non-answer;
- fluent but socially reckless advice;
- overrating long structured advisor output;
- underrating compact nonliteral Thai;
- cross-dimension cascade;
- line-break surface bias;
- excessive rescue floors.

---

## 5. Context Retriever contract

Input:

```json
{
  "evaluation_id": "opaque",
  "voice_profile_id": "...",
  "scenario": "...",
  "candidate": "...",
  "requested_dimensions": ["..."]
}
```

Output:

```json
{
  "methodology_pack_version": "TCJ-METHODOLOGY-BFF-v1",
  "methodology_pack_sha256": "...",
  "selected_modules": ["M00", "M01", "M10"],
  "retriever_version": "...",
  "retrieval_reason_codes": ["factual_information_request", "dimension_isolation"],
  "context_text": "bounded compiled context",
  "context_sha256": "..."
}
```

The buyer/provider normally does not need internal retrieval scores.

---

## 6. Retrieval principles

1. **M00 core contract is stable and nearly always included.**
2. Retrieve only modules relevant to the situation/dimensions.
3. Prefer conceptual modules over raw examples.
4. Avoid context bloat: more prompt text is not inherently better.
5. If uncertain between adjacent modules, include both only within a bounded budget.
6. Retrieval is reproducible: same frozen input/config should produce the same module set unless the retriever explicitly uses a frozen stochastic contract.
7. Retrieval must be locally executable for private/on-prem mode.
8. No external LLM call is required merely to select methodology modules.

---

## 7. Context budgets

Exact budgets remain measurement-dependent, but implementation should target:

```text
stable core methodology prefix: compact
retrieved modules: only situation-relevant sections
scenario + candidate: exact current input
PEE response: only if requested/triggered
```

Do not adopt “always send the entire pack” as the default merely because a provider supports a large context window.

A full-pack diagnostic mode may exist for research or low-volume high-assurance use and must be separately measured.

---

## 8. Provider/API portability

The pack and retriever are provider-neutral artifacts.

Supported integration patterns may include:

### Local injection

TCJ retrieves modules locally and sends resulting context in the request.

Preferred portable default.

### Stable-prefix / prompt-cache-friendly injection

A stable core pack prefix plus small dynamic module selection.

Useful where a provider offers prompt caching, but TCJ correctness must not depend on caching.

### Buyer-controlled provider file/vector store

Optional. The buyer may choose to upload the Methodology Pack to its own provider account and let the provider's retrieval system select modules.

This is **not** the portable default because:

- retrieval behavior becomes provider-specific;
- exact reproducibility can be harder;
- pack exposure shifts to the buyer's provider account;
- qualification must bind the provider retrieval configuration.

---

## 9. BYOK eligibility

The Methodology Pack is compatible with buyer-owned API credentials.

Default enterprise flow:

```text
TCJ retrieves methodology locally
→ TCJ sends permitted context to provider
→ request authenticated with buyer-owned API key
→ provider returns semantic judgment
→ TCJ Core applies release policy
```

The buyer pays provider usage directly.

TCJ need not host or pay for inference.

A key change alone does not require model requalification if it does not alter semantic/runtime configuration, but provider/model/settings/adapter/context changes remain authority-bearing.

---

## 10. Private Evidence Tool relationship

The Methodology Pack should answer:

> “How should I reason about this class of Thai conversational problem?”

The Private Evidence Tool should answer:

> “What does TCJ's protected evidence say about this specific uncertainty?”

Example:

```text
Methodology module:
  Code-switch defects should be localized; friendly surface voice can remain BFF-like even when lexical integration is weak.

Judge uncertainty:
  Is this specific English insertion actually integrated?

PEE response:
  Thai clause spine preserved; lexical insertion pattern has strong positive support; do not penalize BFF solely for the English token.
```

That division is a core architecture-v2 invariant.

---

## 11. Security/IP requirements

Before a Methodology Pack may ship:

- scan for raw/protected corpus leakage;
- scan for reconstructive edit pairs;
- remove hidden test cases;
- remove buyer-private material;
- verify no secrets/configuration credentials;
- record source-document provenance;
- hash every module;
- publish a pack manifest;
- test prompt extraction risk appropriate to the deployment contract;
- define whether the buyer is licensed to inspect the pack directly or only execute it as part of TCJ runtime.

Commercial packaging may choose readable, encrypted/signed, or service-encapsulated forms depending on licensing/deployment.

---

## 12. Development strategy without paid model calls

The initial pack can be developed entirely offline using:

- existing canonical docs;
- 144 human-reviewed absolute-rating cases;
- stored provider judgments;
- v1.7 failure families;
- contrastive A/B evidence;
- deterministic retrieval tests;
- current ChatGPT reasoning.

Before the final paid provider test, prove locally that:

- the module map covers all known exposed failure families;
- contradictory modules are eliminated;
- retrieval selects correct modules for exposed cases/minimal pairs;
- irrelevant modules stay out;
- pack content does not contain prohibited raw evidence;
- release policy and context selection are versioned and reproducible.

---

## 13. Freeze requirements

The final reference configuration must bind:

```text
Methodology Pack version/hash
module manifest/hash set
Context Retriever version/hash
retriever routing/configuration
retrieval budget
Voice Profile version/hash
judge adapter/model/settings
Private Evidence Tool contract where enabled
Release Policy version/hash
```

Only after these freeze may a fresh final authority test be constructed.

---

## 14. Final principle

The goal is not to make the API imitate GitHub browsing mechanically.

The goal is to capture the durable knowledge that made GitHub browsing useful, compile it into a controlled product artifact, and supply only the relevant portion at runtime.

```text
GitHub = development source
Methodology Pack = compiled TCJ mental model
Context Retriever = runtime selector
Private Evidence Engine = protected empirical memory
Judge = semantic reasoner
Release Policy = production authority
```