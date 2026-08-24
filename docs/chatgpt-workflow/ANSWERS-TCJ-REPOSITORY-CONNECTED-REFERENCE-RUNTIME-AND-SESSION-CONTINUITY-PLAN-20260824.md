# TCJ Repository-Connected Reference Runtime & Session Continuity Plan

**Date:** 24 August 2026  
**Status:** CURRENT ARCHITECTURAL PLAN  
**Repository:** `dechadae/flipgazine`  
**Canonical Supabase project:** `sjpvhgxacsiorrtijqua`

## 1. Governing conclusion

TCJ development drifted too far toward compressing project knowledge into increasingly elaborate prompts, methodology snippets and rewrite briefs.

The strongest current architectural hypothesis is simpler:

```text
Git repository = durable conceptual/project memory
Private Supabase evidence = protected empirical/native-human memory
Focus/reachability = address system for private evidence
Capable LLM = semantic reasoning engine
Writer model = writes
TCJ = decides whether the finished copy ships
```

The reference TCJ should therefore be a **repository-connected semantic editor/judge**, not a prompt-only imitation of the repository and not a writing engine.

The Methodology Pack remains valuable as a portable/compiled deployment format, but it is no longer the primary reference brain for development or reference qualification.

## 2. Why this matters for natural Thai writing

Natural Thai conversational writing is difficult for language models because the target is not merely grammatical Thai.

High-quality conversational Thai depends on tacit judgments that are difficult to compress into a short rule list:

- what may be omitted because a Thai reader will recover it;
- when explanation becomes socially unnatural;
- how relationship, age, hierarchy and channel change acceptable wording;
- how particles, fragments and line breaks affect delivery;
- when English insertion feels native versus translated;
- how much certainty is socially appropriate;
- when warmth becomes assistantese;
- when a joke, tease, mock-formal phrase or hyperbole is licensed;
- when a response should stop immediately after the social point lands;
- what a native editor would actually cut even though the text is fluent and understandable.

This explains an important experimental pattern: a capable model with a strong, compact writer role can often produce better copy than the same model overloaded with detailed TCJ editorial instructions. The detailed instructions can pull the model toward explanation, scaffolding and explicitness—the exact behaviors native Answers copy often avoids.

This does **not** mean AI cannot write natural Thai. It means the quality depends heavily on the model's available cultural/project context and on whether prompting preserves or distorts its native-language priors.

## 3. Product split: writer vs TCJ

### Writer

The writer is a capable model such as Gemini, OpenAI, Claude or a customer model.

Default writer input:

```text
compact role / Voice Profile
+ exact task/source
→ finished Thai copy
```

The writer should **not** receive by default:

- raw private corpus rows;
- the full TCJ private evidence packet;
- a large TCJ methodology dump;
- nearest proprietary examples;
- hidden qualification material;
- a long editorial brief before it has written anything.

Reference Answers-BFF writer principle:

> Write as a senior Thai conversational copywriter for a modern close-friend/BFF magazine voice. Preserve useful meaning, sound like a real Thai close friend, and keep it concise. Do not explain your choices. Stop when the social point lands.

Exact wording remains a development artifact and should be validated on fresh writer-only pilots.

### TCJ

TCJ receives the **finished draft** and asks one practical release question:

> Would the native senior editor publish this exact copy unchanged?

Output contract:

```json
{
  "decision": "SHIP | REVISE",
  "problem": "",
  "instruction": ""
}
```

If `SHIP`, problem/instruction are empty.

If `REVISE`, TCJ names one primary publishability defect and one smallest useful correction. TCJ does not rewrite the answer itself.

If the customer wants an automatic revision, the **same writer** edits its current finished draft using TCJ's instruction under the same writer role.

## 4. Reference architecture

```text
                         PINNED CANONICAL TCJ GIT SNAPSHOT
                         ---------------------------------
                         CURRENT-STATE.json
                         DOCUMENT-AUTHORITY-MAP.md
                         active architecture docs
                         voice methodology
                         experiment/failure history
                         product decisions
                                   |
                                   v
SCENARIO + FINISHED DRAFT ----> CAPABLE SEMANTIC JUDGE
                                   ^
                                   |
                         PRIVATE EVIDENCE ENGINE
                         -----------------------
                         focus normalization
                         canonical focus mapping
                         reachability
                         relevant private neighborhood
                         bounded derived findings
                                   |
                                   v
                              SHIP / REVISE
                         + problem / instruction
```

The judge can read the repository as needed. The runtime must **not** concatenate the entire repository into every prompt.

"Repository-connected" means the judge has read access to a **version-pinned knowledge source** and can retrieve relevant canonical files during reasoning.

## 5. Canonical repository bootstrap

Every new reference TCJ session must begin with the same authority path:

1. `docs/chatgpt-workflow/CURRENT-STATE.json`
2. `docs/chatgpt-workflow/DOCUMENT-AUTHORITY-MAP.md`
3. the `active_phase_checkpoint` named in `CURRENT-STATE.json`
4. any governing architecture amendments named by the authority map
5. live Supabase state verification before consequential work

This prevents old experiments, stopped runs and obsolete next-actions from becoming accidental instructions.

The model may then retrieve other repository files only as relevant to the task.

## 6. Pinned Git commit as runtime version

Development may follow `main`, but any candidate/qualified TCJ runtime must bind to an exact repository commit.

Example:

```text
TCJ Reference Runtime 1.0
repo: dechadae/flipgazine
commit: <sha>
voice_profile: <version/hash>
focus_router: <version/hash>
private_evidence_contract: <version/hash>
judge_model/settings: <exact values>
release_contract: SHIP/REVISE
```

A later conceptual improvement becomes a new pinned version rather than silently changing the meaning of an existing TCJ release.

This gives:

- rich repository context;
- exact reproducibility;
- auditability;
- rollback;
- customer deployment pinning.

## 7. Private evidence stays bounded

The repository is conceptual memory. The private dataset is empirical memory.

The external semantic judge must **not** receive the private dataset wholesale.

Input:

```text
scenario
finished draft
```

Local TCJ logic determines:

```text
normalized intent/focus
→ canonical focus terms
→ focus index / reachability
→ relevant protected neighborhood
→ derived bounded findings
```

Example judge-visible packet:

```json
{
  "focus": ["relationship", "texting", "decision"],
  "findings": [
    "native-positive evidence favors compact decision-first replies in this situation type",
    "extended option scaffolding is weakly supported",
    "certainty should remain moderate"
  ],
  "raw_evidence_exported": false
}
```

The judge must never receive raw rows, raw IDs, nearest proprietary examples, hidden qualification cases or reconstructive edit pairs unless an explicitly separate internal research protocol authorizes them.

## 8. Focus/reachability remains core IP

The existing focus/reachability mechanism is retained because it solves the important private-memory problem without bloating the judge context.

Canonical mental model:

```text
Git tells TCJ HOW TO THINK.

Private evidence tells TCJ WHAT NATIVE HUMANS HAVE ACTUALLY SHOWN.

Focus/reachability decides WHICH PRIVATE EVIDENCE MATTERS.

The LLM performs semantic reasoning.

The writer writes.

TCJ decides whether it ships.
```

## 9. SHIP requires an explicit release audit

v7 demonstrated that a capable judge can know the vocabulary of assistantese/over-explanation yet still globally return SHIP too easily.

Therefore `SHIP` must be asymmetric.

### REVISE

Requires at least one concrete meaningful defect.

### SHIP

Requires the judge to verify there is no meaningful reason a native editor would touch the exact copy.

Internal release audit should separately consider, without forcing public scalar scores:

- semantic correctness / actual task answer;
- Thai pragmatics and relationship fit;
- unsupported additions or invented certainty;
- stance proportionality;
- assistant-style surplus / explanation after the point lands;
- BFF/house voice naturalness;
- Thai-English integration;
- composition / line breaks / landing;
- factual or safety problems.

The audit is a reasoning checklist, not a brittle character-count threshold.

## 10. Methodology Pack is reclassified

The Methodology Pack is **not deleted**.

New role:

```text
Git-connected reference runtime = canonical high-context reference
Methodology Pack = compiled portability/export runtime
```

Future research should measure how much performance is retained when replacing repository access with the compiled Methodology Pack.

If the pack preserves nearly all reference performance, it becomes a strong portable option.

If not, customers who can support repository-connected/local deployment should use the reference architecture.

The reference product must not be weakened merely to make the portable format easier to ship.

## 11. Fresh writer-first development sequence

Never again ask the native human to review a large TCJ experiment before verifying that the writer simulation is viable.

### Writer feasibility gate

Use approximately 8 fresh cases.

- simple strong role only;
- no TCJ methodology;
- no private evidence;
- no TCJ editorial brief;
- TCJ must not see these cases;
- native human reviews raw finished drafts as exact-copy `SHIP` / `REVISE`.

Purpose: verify the writer itself produces realistic, reasonably concise outputs and a non-degenerate quality distribution.

If nearly all drafts are bad, stop. Fix writer conditioning before any TCJ evaluation experiment.

### Fresh selective-editor experiment

Only after writer viability is demonstrated:

- use a separate fresh bank;
- freeze writer outputs;
- native human reviews first;
- freeze human manifest;
- TCJ evaluates exactly once;
- report confusion matrix honestly;
- never tune those cases to improve the score.

## 12. Clean causal architecture test

For the same frozen writer outputs, compare:

### A — strong semantic model alone

```text
scenario + draft → judgment
```

### B — repository-connected TCJ

```text
scenario + draft
+ pinned TCJ repository
→ judgment
```

### C — repository-connected TCJ + protected evidence

```text
scenario + draft
+ pinned TCJ repository
+ focus/reachability private evidence
→ judgment
```

Interpretation:

```text
A → B = value of TCJ conceptual/project memory
B → C = value of proprietary native-human evidence
A → C = total TCJ value
```

This should replace increasingly complicated prompt ablations as the main architectural decomposition.

## 13. Session continuity: reproduce the useful state of this ChatGPT project session

### Goal

A fresh TCJ development agent should be able to start a new chat with almost none of the original conversation history and reach the same **useful project state** reliably.

The goal is **not** to clone a hidden conversation transcript or model memory byte-for-byte.

The goal is to reproduce the information that materially affects competent work:

- current architecture;
- current live state;
- user-authoritative decisions;
- frozen evidence;
- experiment history and lessons;
- do-not-touch protections;
- next action;
- relevant code/data locations;
- live Supabase verification.

### Why this is feasible

This project already demonstrates it in practice: a short new-chat handoff can tell a capable agent which repository and Supabase project are canonical; the agent reads `CURRENT-STATE.json`, the authority map and active checkpoint, verifies live state, and is ready to continue without the user retelling project history.

The repository therefore acts as **externalized long-term project memory**.

### Deterministic session bootstrap protocol

A fresh agent should execute:

```text
BOOT
1. Open canonical Git repository.
2. Read CURRENT-STATE.json.
3. Read DOCUMENT-AUTHORITY-MAP.md.
4. Read active checkpoint and governing amendments.
5. Verify canonical live Supabase state.
6. Confirm protected/locked experiments remain untouched.
7. Load task-relevant repository material only.
8. Continue from CURRENT-STATE.next_action unless new user instruction supersedes it.
```

### Standard new-chat bootstrap prompt

A minimal human prompt can be:

> Continue the TCJ / Thai Conversation Judge project from the exact current live state. Do not ask me to repeat project history. Treat GitHub and live Supabase as canonical and verify both before consequential changes. Repository: `dechadae/flipgazine`. Supabase project: `sjpvhgxacsiorrtijqua`. Start with `docs/chatgpt-workflow/CURRENT-STATE.json`, then `DOCUMENT-AUTHORITY-MAP.md`, then the active checkpoint named there. Preserve immutable evidence and historical failures. My native-human judgments are authoritative. Do not touch protected Qualification evidence or use paid provider credits without explicit approval. Work autonomously until genuine native-human judgment is required.

This prompt should be enough for a capable repository-connected agent to reconstruct the project state.

### Session-state files should remain compact

`CURRENT-STATE.json` must remain a compact machine-readable bootstrap file, not a complete diary.

It should contain only state necessary to resume correctly:

- schema/version/time;
- active phase;
- active checkpoint;
- product definition;
- important frozen evidence/results;
- protected authority state;
- paid-resource constraints;
- exact next action.

Detailed reasoning/history belongs in checkpoint documents.

## 14. Could a deployed TCJ replicate this session's advantage?

Yes, **substantially**, if the runtime reproduces the externalized information sources that make this session effective.

Current ChatGPT project advantage can be approximated as:

```text
capable reasoning model
+ durable canonical repository
+ accumulated native-human decisions written into docs/evidence
+ live project state
+ bounded private corpus evidence
+ ability to retrieve the right material when needed
```

A commercial/private TCJ agent can be built with the same pattern:

```text
capable customer-selected model
+ pinned TCJ repository
+ customer Voice Profile repository
+ customer-private evidence vault
+ focus/reachability
+ current-case context
```

What cannot be guaranteed is exact behavioral identity with this specific ChatGPT session, because models, hidden product context and inference implementations differ.

What **can** be made reproducible is the project knowledge, evidence, operating rules and retrieval path that materially shape the reasoning.

That is the correct engineering target.

## 15. Private-server/customer version

For private customers:

```text
TCJ core Git mirror
+ customer-specific Voice/Profile Git repo
+ customer-private evidence vault
+ local focus/reachability index
+ customer-selected writer/judge
```

Everything may remain inside the customer's environment.

Customer human edits flow into two separate memory channels:

### Durable conceptual lesson

Promote a generalized principle into the customer repository after validation.

### Empirical evidence

Store examples/outcomes in the customer-private evidence vault and let focus/reachability retrieve them when relevant.

Do not convert every edit into a bigger prompt.

## 16. Controlled improvement loop

```text
human edit / disagreement
→ observe recurring failure
→ classify as conceptual lesson or empirical example
→ conceptual: proposed repo change
→ empirical: private evidence update
→ held-out validation
→ regression
→ versioned promotion
→ rollback available
```

No uncontrolled autonomous self-training and no continual prompt inflation.

## 17. Candidate runtime freeze

Before new hidden qualification, freeze/hash:

- Git repository commit;
- CURRENT-STATE authority files used by runtime;
- Voice Profile;
- writer role;
- focus dictionary/index;
- reachability implementation;
- protected evidence contract;
- semantic judge model/settings;
- judge release instruction;
- SHIP/REVISE schema;
- retry/fail-closed behavior;
- runtime code and database dependencies.

Only after this exact configuration is frozen may a new hidden authority instrument be constructed.

## 18. Hidden qualification and paid frontier sequence

After successful fresh writer and evaluator development evidence:

1. freeze candidate runtime;
2. build a new native-human-first hidden authority bank;
3. human reviews before machine exposure;
4. freeze human/bank manifests;
5. expose frozen TCJ exactly once;
6. decide Qualified / Qualified with limitations / Failed;
7. only then run the final paid OpenAI/xAI causal frontier experiment, after live pricing/balance/request-count preflight and explicit user approval.

Qualification 2.0 remains protected historical authority and must not be reused to certify the materially changed repository-connected successor.

## 19. Commercial deployment modes

### Reference service

Repository-connected TCJ service, pinned per release.

### Private/server/VPC

Local Git mirror + local PEE + customer BYOJ/BYOK.

### Portable lightweight edition

Compiled Methodology Pack substitutes for direct repository access where operational constraints require it.

All three should preserve the same public contract:

```text
finished draft
→ SHIP
or
→ REVISE + primary problem + smallest instruction
```

## 20. Immediate implementation plan

1. Promote this document as the active architectural plan.
2. Update `CURRENT-STATE.json` and `DOCUMENT-AUTHORITY-MAP.md` accordingly.
3. Keep v1–v7 immutable as development evidence.
4. Do not retune v7.
5. Build the repository-connected judge bootstrap against the canonical repo.
6. Keep private focus/reachability evidence bounded.
7. Restore the simple strong role-conditioned writer approach.
8. Run only a small fresh writer-feasibility pilot before another full native-human review.
9. Once writer quality is viable, run the clean A/B/C repository/evidence evaluator experiment on a separate fresh bank.
10. Freeze candidate runtime only after the evidence supports it.

## 21. Final principle

TCJ should not try to encode all native Thai intelligence into one prompt.

The project itself already contains accumulated intelligence in multiple durable forms.

The better architecture is to let a capable model reason with those forms directly:

```text
Git = durable conceptual memory
Private evidence = native-human empirical memory
Focus/reachability = relevant-memory retrieval
LLM = reasoner
Writer = writer
TCJ = release editor
```

That is the new reference direction.