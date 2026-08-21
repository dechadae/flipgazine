# The Book of Answers — Batch 2 Self-Audit & Blind-Control Protocol

**Status:** FROZEN HISTORICAL PROTOCOL — IMPLEMENTED, THEN PARTLY SUPERSEDED
**Created:** 18 August 2026  
**Project:** Flipgazine / The Book of Answers  
**Batch:** Batch 2 — 1,000 new records  
**Drafting model:** ChatGPT / OpenAI  

Implementation is recorded in `ANSWERS-BATCH2-SELF-AUDIT-IMPLEMENTATION-REPORT.md`. The 900-assisted/100-blind reviewer-visibility design and Qwen-v1 operational path are superseded by the human-first correction and shared TCJ architecture. Preserve the one-draft, freeze-before-audit, immutability and claims-discipline rules.
**Human editorial authority:** Decha  
**External machine judge:** `qwen/qwen3.6-27b` via server-side Groq inference  
**Editorial authority:** `ANSWERS-VOICE-TONE.md`  
**Public benchmark authority:** `ANSWERS-VOICE-BENCHMARK-PLAN.md`

---

# 1. Purpose

Batch 2 must preserve the established provenance story while adding a useful machine-audit layer without allowing the machine audit to contaminate the human review evidence.

The governing sequence is:

```text
source scenario
→ ChatGPT creates one raw Thai draft
→ raw draft is frozen and hashed
→ ChatGPT performs diagnosis-only self-audit on that exact frozen draft
→ qualifying rows are automatically escalated to Qwen for a second machine opinion
→ Decha records ACCEPT / EDIT / REWRITE
→ final Thai is preserved separately
→ optional post-human audits are stored as analytical overlays
```

The machine audit is metadata. It does not determine acceptance, does not select among multiple hidden drafts, and does not rewrite the raw answer before the human sees it.

---

# 2. Editorial precedence

The authority order remains:

```text
Decha direct judgment
→ ANSWERS-VOICE-TONE.md
→ established human-reviewed corpus evidence
→ ChatGPT self-audit
→ external Qwen audit
```

Machine-machine agreement does not overrule the native editor.

A machine-human disagreement is evidence to preserve, not noise to smooth away.

---

# 3. One-draft rule

For each Batch 2 source scenario, ChatGPT creates exactly one raw Thai answer for the recorded generation event.

Do not:

- generate multiple hidden candidates and select the best;
- regenerate after seeing the self-audit;
- silently improve wording before presentation;
- alter particles, punctuation or line breaks after the freeze;
- discard weak generations before human review.

Weak outputs are part of the evidence.

---

# 4. Freeze-before-audit rule

The raw answer is frozen before any audit begins.

Minimum immutable generation record:

```text
source_id
question_or_scenario
provider
model/model snapshot where available
generation_timestamp
generation_protocol_version
raw_thai
raw_thai_sha256
```

After the hash is created, `raw_thai` is historical evidence and must never be overwritten.

Any later human-approved version is stored separately as `final_thai` with its own hash.

---

# 5. ChatGPT self-audit

After the raw draft is frozen, ChatGPT performs a separate diagnosis-only pass on that exact text.

The audit instruction must explicitly prohibit:

```text
rewriting
correcting
regenerating
selecting an alternative
changing line breaks
suggesting replacement wording
```

The audit evaluates the same six frozen Voice dimensions:

| Dimension | Weight |
|---|---:|
| Intent / Cause | 20% |
| Thai Pragmatic Naturalness | 25% |
| BFF Conversational Voice | 20% |
| Lexical / Social Fit | 15% |
| Stance / Decision Strength | 10% |
| Composition / Delivery | 10% |

Ratings remain integers 1–4.

---

# 6. Internal Audit Index

Batch 2 may retain a deterministic weighted numeric index for internal analysis only.

Use the frozen mapping:

```text
1 → 0
2 → 33.33
3 → 66.67
4 → 100
```

Then apply the six frozen weights.

Call the result **Audit Index**, not “Thai score,” “accuracy,” or “native score.”

Interpretation:

> Audit Index means only how strongly the automated rubric aligned with the frozen criteria. It does not certify native Thai quality.

The public `/voice.html` remains qualitative and must not regain a public overall numeric score.

---

# 7. Qualitative verdict

Each self-audit also records:

```text
Fluent
Minor problem
Major problem
Not acceptable
```

Use the same qualitative logic as the accepted public benchmark:

- **Not acceptable** — fundamental semantic misunderstanding, CRITICAL safety failure, failed intent, or semantic drift;
- **Major problem** — material weakness including any dimension at 1–2 or MAJOR severity;
- **Minor problem** — at least one meaningful 3 with no major failure;
- **Fluent** — no material issue detected and all six dimensions at 4.

---

# 8. Diagnostic flags

Use the existing controlled diagnostic vocabulary where applicable:

```text
over_explained
too_complete
advisor_like
translation_shaped
weak_stance
excessive_hedging
semantic_drift
unnatural_lexical_choice
inappropriate_code_mixing
particle_stance_problem
register_mismatch
generic_cliche
culturally_implausible
forced_humor
forced_camp
overly_slangy
weak_social_grounding
weak_composition
grammatical_not_designed_breaks
weak_final_landing
```

Use flags sparingly. A flag should represent a material diagnosis, not every possible criticism.

---

# 9. Thai Pragmatics 4/4 escalation rule

Self-assessment is weakest exactly where the writer confidently judges its own Thai as fully natural.

Therefore **Thai Pragmatic Naturalness = 4/4 automatically triggers an external Qwen audit.**

A self-audit verdict of **Fluent** also automatically triggers Qwen, even if future rubric changes would otherwise make the Thai-dimension trigger redundant.

This turns confident self-agreement into a reason for a second opinion rather than a reason to stop checking.

The Qwen audit is still a second machine opinion, not human validation.

Important evidence pattern to preserve:

```text
ChatGPT Thai Pragmatics = 4
Qwen Thai Pragmatics = 4
Decha = EDIT / REWRITE for Thai naturalness
```

That is a shared machine blind spot, not a human error.

---

# 10. Additional automatic Qwen triggers

Besides Thai Pragmatics 4/4 or Fluent, Qwen may also be triggered automatically for:

- self-audit confidence = low;
- semantic-drift uncertainty;
- CARE cases;
- malformed/ambiguous self-audit state;
- human-machine disagreement identified after review;
- predetermined random calibration sampling.

Do not use Qwen to select or repair the draft before human review.

---

# 11. Outbound inference security posture

The external Qwen audit necessarily creates outbound model inference risk because the selected frozen scenario + answer are sent to Groq.

Do not claim this risk is eliminated.

The correct posture is:

> **same class of outbound inference risk, narrowed and access-controlled.**

Required implementation constraints when the protocol is built:

- no general-purpose database `SECURITY DEFINER` HTTP executor;
- no anonymous internal audit endpoint;
- provider secret remains server-side only;
- explicit per-call and aggregate token/call ceilings;
- no bulk private corpus access from the audit path;
- each audit sends only the scenario + exact frozen draft required for that row;
- private endpoint must be authenticated/server-only;
- audit provenance must distinguish `chatgpt_self` from `qwen_external`;
- provider-side Groq spend/data-control settings remain a separate operational control.

---

# 12. Blind human-control lane

Showing a confident-looking machine score before human review can anchor the human decision.

To measure and constrain that effect, **10% of Batch 2 (100 of 1,000 rows)** will be assigned to a blind-control lane.

Blind-control IDs must be selected before generation quality or audit results are known.

Recommended method:

```text
freeze source set
→ deterministic random selection using documented seed
→ mark exactly 100 source IDs blind_control=true
→ only then begin generation
```

For blind-control rows, the machine audits may still run and be stored server-side, but the human review presentation hides:

- Audit Index;
- verdict;
- six machine ratings;
- flags;
- rationale;
- Qwen result.

The reviewer sees only:

```text
source ID
scenario
raw frozen ChatGPT draft
ACCEPT / EDIT / REWRITE prompt
```

After the human decision is recorded, the previously hidden machine audits may be revealed for comparison.

Once a row is assigned blind-control status, it remains blind until the first human decision is committed.

---

# 13. Assisted-review lane

The remaining 900 rows use the normal assisted-review presentation.

Compact review format:

```text
B2-### · Audit Index ## · verdict
Thai # · BFF # · Lexical # · Stance # · Composition #
flags
short diagnostic note

raw frozen Thai answer

Human: ACCEPT / EDIT / REWRITE
```

The interface should remain compact enough for 60–100 rows/day.

Do not turn this into a SaaS review dashboard unless the chat-based workflow becomes a genuine bottleneck.

---

# 14. Human review

Every row receives exactly one human decision:

- **ACCEPT** — raw Thai becomes final Thai unchanged;
- **EDIT** — raw and final Thai both retained;
- **REWRITE** — raw and substantially replaced final Thai both retained.

Use lightweight reason tags only for all 1,000 rows.

Suggested reason vocabulary:

```text
thai_naturalness
translation_shape
stance
register
lexical_choice
particle
humor
social_specificity
code_mixing
composition
line_break
semantic_drift
too_complete
too_generic
other
```

Do not require full six-dimension human commentary for every Batch 2 row.

---

# 15. Post-human audit

EDIT and REWRITE rows may receive a second ChatGPT self-audit on the final human-approved Thai.

Selected rows may also receive a post-human Qwen audit.

Store these as new audit records with stage markers such as:

```text
pre_human
post_human
```

Never overwrite the pre-human audit.

If an automated post-human audit rates the human final worse, the human final remains authoritative and the disagreement is preserved.

---

# 16. Recommended private data model

Planning structure only; no schema has been created yet.

## `batch2_sources`

```text
id
question_or_scenario
domain
intended_focus
source_set_version
blind_control
blind_seed_version
created_at
```

## `batch2_raw_drafts`

```text
source_id
provider
model
generation_protocol_version
generation_timestamp
raw_thai
raw_sha256
```

## `batch2_ai_audits`

```text
source_id
draft_sha256
stage
  pre_human | post_human
auditor
  chatgpt_self | qwen_external
audit_protocol_version

intent
thai_pragmatics
bff_voice
lexical_social_fit
stance
composition

audit_index
verdict
severity
flags
rationale
confidence
created_at
```

## `batch2_human_reviews`

```text
source_id
decision
reason_tags
final_thai
final_sha256
reviewed_at
```

The exact implementation may use equivalent names, but the provenance boundaries must remain distinct.

---

# 17. Immutability rules

The implementation must make it difficult to accidentally destroy evidence.

Required invariants:

1. raw draft is preserved before any audit;
2. raw draft is never overwritten by final Thai;
3. pre-human audits are never overwritten by post-human audits;
4. auditor identity is explicit on every audit row;
5. protocol versions are explicit;
6. blind-control assignment is immutable after generation begins;
7. hidden machine judgments are not revealed before the blind human decision;
8. a human final is never automatically altered to satisfy an evaluator.

---

# 18. Protocol versioning

Start with explicit identifiers:

```text
B2-GEN-v1
B2-SELF-AUDIT-v1
B2-BLIND-v1
B2-QWEN-AUDIT-v1
```

Increment only when a material instruction, rubric or selection rule changes.

Do not silently retune the self-audit halfway through the 1,000 rows merely to improve agreement with the human editor.

If a change is necessary, document the breakpoint and preserve both protocol versions.

---

# 19. Twenty-row pilot gate

Do not scale immediately to all 1,000 rows.

First run a real **20-row pilot** under the full protocol.

The pilot must test:

- generation freeze and hash;
- diagnosis-only self-audit;
- Thai=4 / Fluent Qwen escalation;
- at least two blind-control rows if the 10% assignment naturally selects them;
- assisted presentation readability;
- blind presentation behavior;
- ACCEPT / EDIT / REWRITE persistence;
- raw/final separation;
- optional post-human audit;
- auditor provenance;
- no audit-driven draft mutation.

Pilot review questions:

```text
Did the audit help without slowing review too much?
Did visible scores appear to anchor decisions?
Did the blind rows feel materially different to review?
How often did self-audit predict the human intervention?
How often did Qwen catch something ChatGPT self-audit missed?
How often did both machine judges miss a human Thai-naturalness issue?
Were the flags/rationale compact enough to be useful?
```

After the pilot, adjust presentation ergonomics if needed.

Do not tune the rubric to force agreement with the human editor.

Then freeze v1 and scale.

---

# 20. Production review cadence

Recommended presentation unit: **20 rows per review block**.

Operational cadence:

```text
generate 20
→ freeze all 20
→ self-audit all 20
→ run automatic Qwen escalations
→ present assisted/blind rows according to assignment
→ record human decisions
→ preserve finals
→ optional post-human audits
→ next 20
```

Five blocks complete 100 rows.

Ten groups of 100 complete Batch 2.

Suggested human review target remains approximately 70–100 rows/day, subject to quality and fatigue.

---

# 21. Analytical outputs enabled by the protocol

Batch 2 can now support analysis beyond intervention rate.

## ChatGPT self-awareness

Measure:

```text
self-audit Fluent + human ACCEPT
self-audit Fluent + human EDIT
self-audit Fluent + human REWRITE
self-audit Major + human ACCEPT
```

## Thai-naturalness blind spots

Measure cases such as:

```text
ChatGPT Thai Pragmatics = 4
human reason tag = thai_naturalness or translation_shape
```

## Qwen marginal value

Among automatically escalated rows:

```text
Qwen catches human issue that ChatGPT missed
both machines agree with human
both machines disagree with human
ChatGPT catches issue Qwen misses
```

## Anchoring / assisted-review effect

Compare the 900 assisted rows with the 100 predetermined blind-control rows, especially:

```text
ACCEPT / EDIT / REWRITE rates
high-machine-score intervention rate
Thai-naturalness intervention rate
composition-only intervention rate
```

Treat this as observational evidence within the Batch 2 workflow, not a randomized causal experiment unless the final methodology genuinely supports that stronger claim.

---

# 22. End-of-batch exports

Recommended frozen outputs:

```text
source-prompts.jsonl
raw-chatgpt-drafts.jsonl
chatgpt-self-audits-pre.jsonl
qwen-external-audits.jsonl
human-reviews.jsonl
final-reviewed-thai.jsonl
chatgpt-self-audits-post.jsonl
english-siblings.jsonl
review-summary.csv
audit-agreement-summary.csv
blind-control-summary.csv
batch2-manifest.json
SHA256SUMS.txt
```

Machine audits must remain explicitly labeled machine-generated metadata.

---

# 23. Success metrics

The protocol passes only if all of the following are true:

1. 100% of recorded raw drafts are preserved before audit.
2. No audit can mutate a raw draft.
3. 100% of Batch 2 rows receive ChatGPT self-audit before assisted presentation or hidden blind storage.
4. Every Thai Pragmatics 4/4 or Fluent self-audit automatically receives Qwen audit.
5. Exactly 100 predetermined blind-control rows hide all machine judgments until the first human decision.
6. 100% of rows receive human ACCEPT / EDIT / REWRITE.
7. All EDIT/REWRITE rows retain raw + final versions.
8. Auditor provenance distinguishes `chatgpt_self` and `qwen_external` in actual stored data.
9. Machine-human disagreement remains visible.
10. CARE remains separate.
11. No hidden multi-generation winner selection occurs.
12. No public benchmark behavior is changed by this Batch 2 protocol.

---

# 24. Claims discipline

The project may say, once implemented and completed:

- Batch 2 raw drafts were frozen before automated review;
- ChatGPT self-audited its own frozen outputs under the same six-dimension Voice rubric;
- high-confidence Thai/Fluent self-ratings were automatically escalated to a second machine judge;
- a predetermined 10% blind-control subset withheld machine judgments until after native-editor review;
- machine-human disagreements were preserved;
- Decha remained the final human editorial authority.

Do not say:

- ChatGPT self-audit is independent evaluation;
- Qwen independently validates native Thai correctness;
- machine-machine agreement proves native fluency;
- the 10% control automatically makes Batch 2 a causal experiment;
- the machine score determines acceptance;
- outbound inference risk was eliminated.

---

# 25. Build gate

This document is a protocol update only.

**No Supabase schema, private endpoint, or Batch 2 audit implementation should be created until the user explicitly says to build/implement it.**

When approved for implementation, build in this order:

```text
A. freeze protocol version and blind-selection seed method
B. create private append-only storage/provenance structure
C. implement ChatGPT workflow contract and audit recording
D. implement authenticated/server-only Qwen audit path with explicit budgets
E. independently verify grants, immutability and auditor provenance
F. run 20-row pilot
G. review pilot evidence
H. freeze v1
I. scale Batch 2
```

---

# 26. Core principle

> **The machine is allowed to be wrong, and its disagreement with the native editor is part of the dataset.**

The protocol exists to make that disagreement observable without allowing the audit to rewrite history or steer the human label invisibly.
