# TCJ Expert-Operable Control Plane — Implementation Specification

**Status:** ACTIVE IMPLEMENTATION SPEC  
**Created:** 20 August 2026  
**Architecture authority:** `ANSWERS-TCJ-MULTI-JUDGE-CONSENSUS-ARCHITECTURE.md`

---

## 1. Purpose

TCJ should be operable directly by a native-language expert, editor, evaluator or research lead without requiring SQL, CLI, notebooks or custom scripts for routine methodological work.

The frontend is not the authority. It is a **methodology-aware control plane** over a server-enforced research system.

The target is:

> **A non-coder domain expert can run a rigorous evaluation workflow correctly because the interface exposes only valid methodological actions, while the backend enforces blindness, evidence integrity, versioning and provenance.**

---

## 2. Current proof of concept

Two live TCJ surfaces already demonstrate the pattern.

### `/tcj-research.html`

Purpose:

- run approved research experiments;
- show aggregate progress;
- keep candidate identity sealed;
- transition safely into blind review;
- avoid direct SQL/API operation by the human operator.

Current backend pattern:

```text
browser
  ↓ authenticated command
TCJ research / admission Edge Function
  ↓
server-side state + auth checks
  ↓
small resumable operation
  ↓
private evidence tables
  ↓
aggregate status returned to browser
```

### `/tcj-admission-review.html`

Purpose:

- present one globally randomized blind response at a time;
- hide provider/model/family/candidate grouping;
- collect ACCEPT / EDIT / REWRITE;
- preserve human-final Thai;
- freeze evidence server-side.

Current human-review contract:

```text
ACCEPT
→ candidate text becomes human_final_text
→ hash + freeze

EDIT
→ candidate Thai opens editable
→ explicit Save Edit
→ changed human_final_text + hash + freeze

REWRITE
→ blank rewrite field
→ explicit Save Rewrite
→ human_final_text + hash + freeze
```

A previously frozen EDIT/REWRITE without human-final text is invalid evidence and must be voided/versioned, not deleted silently.

---

## 3. Core implementation rule

Every significant frontend action must map to a **server command with protocol semantics**.

Preferred commands:

```text
status
run_next
next_review
save_review
freeze
review_summary
reveal_when_allowed
```

Avoid generic browser CRUD against private TCJ tables.

The server command must decide whether the action is legal in the current methodological state.

---

## 4. State-machine architecture

Each workflow should have a server-owned state machine.

Judge Admission example:

```text
draft
  ↓
candidate_set_frozen
  ↓
stage_a_generation
  ↓
pool_complete
  ↓
globally_randomized
  ↓
blind_human_review
  ↓
human_review_frozen
  ↓
stage_b
  ↓
meta_review_frozen
  ↓
identity_reveal
  ↓
passport_assigned
```

The browser renders the state; it does not create the state.

If the browser requests an invalid transition, the backend refuses it.

---

## 5. Progressive-disclosure rules

### Before blind-review freeze

Browser may receive:

```text
opaque response ID
scenario
candidate response
review order
phenomenon label if approved
aggregate progress
```

Browser must not receive:

```text
model
provider
model family
candidate grouping
per-candidate generation counts
machine score
machine rationale
other judge output
candidate aggregate performance
```

Hidden methodological data must be absent from the payload, not merely hidden with CSS.

### After the approved reveal point

Additional information may be exposed according to the campaign protocol.

---

## 6. Server-side action contract

Every consequential request should perform, in order:

1. authenticate the session;
2. verify the active server-side session;
3. authorize the operator;
4. load authoritative workflow state;
5. validate the requested transition/action;
6. validate evidence prerequisites;
7. execute the smallest atomic mutation or run step;
8. append provenance;
9. return only the minimum UI payload;
10. remain idempotent or safely resumable.

No action should trust a client-provided score, qualification status, evidence-bank classification, hidden identity or freeze timestamp.

---

## 7. Data responsibilities

### Browser owns

Temporary UI state only:

```text
currently selected button
unsaved textarea text
expanded/collapsed detail
scroll position
```

### Server owns

```text
campaign state
candidate identity map
scenario freeze
randomization
human review record
human final text/hash
void/invalidation history
judge qualification
Evidence Bank membership
Assurance exposure state
Panel consensus
uncertainty/escalation rules
provenance
```

---

## 8. Human-review schema

Stage A human review should preserve at minimum:

```text
generation_id
reviewer_key
decision
reason_tags
review_note
human_final_text
human_final_sha256
blind_review
frozen_at
voided_at
void_reason
created_at
```

Rules:

- ACCEPT may use candidate text directly as human-final text.
- EDIT requires changed final text.
- REWRITE requires final text.
- An active review is immutable after freeze.
- An invalid review is voided with a reason; history remains.
- Metrics ignore voided rows but provenance retains them.

---

## 9. Resumable research jobs

Do not run long multi-model experiments as one fragile browser request.

Preferred pattern:

```text
operator presses Run remaining N
        ↓
call run_next
        ↓
server selects one eligible unit
        ↓
provider call
        ↓
validate result
        ↓
persist evidence
        ↓
return aggregate progress
        ↓
repeat
```

Advantages:

- network interruption is harmless;
- completed cells are not regenerated;
- progress is server-derived;
- failures are attributable to one cell;
- provenance remains inspectable;
- user can refresh and continue.

---

## 10. Failure taxonomy and UI behavior

### Retryable transport failure

Examples:

```text
429
provider 5xx
connection timeout
```

Behavior:

- record failure;
- bounded backoff;
- show temporary retry state;
- continue other eligible work if methodology allows.

### Generation-contract failure

Examples:

```text
finish_reason = length
empty final answer
invalid output schema
unsupported reasoning adapter
```

Behavior:

- record failure;
- stop or block affected protocol according to frozen rules;
- do not repeatedly resample until a favorable output appears.

### Methodology block

Examples:

```text
campaign not frozen
review not open
identity reveal too early
holdout exposed
judge not qualified
```

Behavior:

- return `blocked` / explicit reason;
- no mutation.

### Unexpected infrastructure error

Behavior:

- show explicit error state;
- do not claim “safe to resume” unless server evidence proves retryability.

---

## 11. Mobile-first review requirements

The primary language-review path should work on a phone.

Required:

- one judgment at a time;
- readable Noto Sans Thai;
- preserved line breaks;
- large tap targets;
- no horizontal primary-review grids;
- visible reviewed/remaining count;
- explicit save for EDIT/REWRITE;
- no accidental Android/WebView rectangular tap overlay;
- Thai keyboard-friendly text area;
- low visual noise during blind review;
- state survives refresh because server owns progress.

Desktop can provide richer research summaries, but desktop is not required for core native-human judgment.

---

## 12. Frontend isolation

TCJ workflow pages should remain isolated from the centralized shell where possible.

Centralized shell/auth/menu code should not be changed to solve a local TCJ workflow defect.

Recommended pattern:

```text
page HTML
+ isolated page controller
+ authenticated Edge Function
+ private TCJ tables
```

Before material page/controller changes:

- preserve a `/wip/` backup where appropriate;
- increment page/controller version;
- verify live content after write.

A frontend change that changes what the human sees or how a decision is saved is methodologically relevant and must be versioned.

---

## 13. Control-plane surfaces to build

### 13.1 Research Control — implemented

Responsibilities:

- approved calibration experiments;
- Stage A generation;
- aggregate progress;
- transition to blind review.

### 13.2 Blind Admission Review — implemented / active

Responsibilities:

- randomized opaque responses;
- A/E/R;
- human-final Thai;
- reason tags / notes;
- frozen progress.

### 13.3 Judge Passport Inspector — next

Should show after methodological reveal permits it:

```text
candidate/model identity
qualification state
qualified dimensions
excluded dimensions
Stage A performance
Stage B error
false-fluent risk
robustness failures
repeat stability
known failure clusters
human evidence size
uncertainty
requalification trigger
```

Primary operator decisions:

```text
inspect evidence
freeze qualification outcome
request more evidence
mark research_only / partially_qualified / qualified / rejected
```

Server owns final allowed state transition.

### 13.4 Panel Shadow Control

Responsibilities:

```text
select approved model/candidate to evaluate
select TCJ profile
run qualified judges in parallel
show per-judge completion
show consensus after all required evidence exists
show disagreement / uncertainty
route cases to human escalation
```

Must preserve every member run separately.

### 13.5 Human Escalation Review

Blind-first workflow:

```text
scenario + response
→ human judgment
→ freeze
→ reveal Panel evidence
→ capture human↔Panel delta
```

Must support both triggered cases and random high-confidence audits.

### 13.6 Pragmatic Contrast Bank Author / Validator

Do not expose raw database CRUD.

Use guided workflow:

```text
define phenomenon
choose changed variable
write A/B contexts
write/attach candidate responses
freeze draft family
blind human validation
record expected direction
promote / revise / retire
```

### 13.7 Assurance Control

Guided flow:

```text
select eligible frozen pack
validate target model/settings
validate Panel passports
run hidden pack
perform required blind human audit
freeze run
produce reproducible report
```

Operator must not be able to convert an exposed/compromised pack back into clean Assurance status.

---

## 14. UI language principles

Prefer domain workflow language:

```text
Generate sealed pool
Globally randomized
Open blind review
Decision frozen
Human final Thai saved
Stage B ready
Panel disagreement
Human review required
Assurance pack frozen
```

Avoid infrastructure-first wording unless in a diagnostic section:

```text
invoke edge function
insert JSONB
run SQL
update row
```

The system can remain technically sophisticated while the operator experience remains legible.

---

## 15. Security boundary

Private TCJ evidence tables remain server-mediated.

Frontend operation must not require direct browser SELECT/UPDATE permissions on private research tables.

Controls must verify:

```text
valid authenticated session
active auth session
authorized FG admin/reviewer role
correct origin where relevant
allowed methodology state
```

For blinded workflows, candidate identity maps stay private even for an authorized reviewer until the reveal point.

---

## 16. Version/provenance matrix

Record or link where relevant:

```text
methodology_version
profile_version
campaign_version
scenario_set_version
judge_adapter_version
provider/model snapshot
generation settings
function version
page/controller version
schema migration
response hash
human-final hash
report version
```

This lets TCJ distinguish:

> the model changed

from:

> the methodology changed

from:

> the frontend changed the human decision process.

---

## 17. Testing checklist

### Blindness

- response payload contains no provider/model/family;
- global randomization complete before review opens;
- aggregate progress cannot reveal candidate grouping.

### Human evidence

- ACCEPT saves candidate as final text;
- EDIT cannot freeze before edited text is saved;
- REWRITE cannot freeze without final text;
- final text hash is 64-char SHA-256;
- voided rows do not count toward active review progress.

### Resumability

- refresh during generation resumes from server count;
- refresh during review loads next unresolved item;
- completed cells are not regenerated;
- randomization order does not change after completion.

### Failure handling

- transport error may retry;
- contract error blocks without retry-until-success;
- unexpected backend error is not mislabeled safe-to-resume.

### Security

- unauthenticated request rejected;
- inactive session rejected;
- non-admin/non-reviewer rejected;
- origin restrictions preserved where required;
- direct browser access to private evidence remains unavailable.

---

## 18. Product advantage

The expert-operable layer is not a visual moat by itself.

Its value is that it lets the person with the rare domain expertise operate the evidence system directly.

That creates a faster evidence flywheel:

```text
expert judgment
→ structured frozen evidence
→ evaluator failure discovery
→ controlled new experiment
→ validation
→ stronger private evidence base
```

A competitor can copy the screen layout. They cannot instantly copy the accumulated human-final edits, void history, Judge Passport failures, hidden contrasts, Assurance exposure history and longitudinal human↔model deltas produced through the system.

> **The control plane makes the moat easier to operate and compound.**

---

## 19. Next implementation order

1. Finish current Stage A blind human review.
2. Build anonymous Stage A summary and Stage B runner.
3. Build Judge Passport Inspector.
4. Build robustness-battery control/report surface.
5. Build `tcj-panel-shadow` control plane.
6. Build Human Escalation Review.
7. Build Contrast Bank author/validation workflow.
8. Build Assurance Control + report viewer.
9. Add reviewer-role support for future General-v2 multi-rater work.

Do not pause evidence collection to build a generic admin platform.

---

## 20. Governing implementation statement

> **TCJ's frontend should hide infrastructure complexity, not methodological complexity. The operator should understand what judgment or research decision they are making, while authentication, blindness, state validity, immutability, retry rules, evidence eligibility, hashes and provenance are enforced automatically underneath.**
