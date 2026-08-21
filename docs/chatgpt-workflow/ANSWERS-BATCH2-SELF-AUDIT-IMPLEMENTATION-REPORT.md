# The Book of Answers — Batch 2 Self-Audit Implementation Report

> **Historical implementation checkpoint.** The infrastructure and security evidence remain useful, but zero-row state and source-set next steps are superseded by later production records. New selected machine audits use the shared TCJ architecture.

**Status:** PRE-PILOT IMPLEMENTATION COMPLETE  
**Implemented:** 18 August 2026  
**Supabase project:** `sjpvhgxacsiorrtijqua`  
**Governing protocol:** `ANSWERS-BATCH2-SELF-AUDIT-PROTOCOL.md`  
**Proof artifact:** `answers-private-server/batch2-implementation-proof.json`

---

## 1. What is now implemented

The Batch 2 self-audit protocol is no longer planning-only. The complete pre-pilot implementation is live.

Implemented layers:

1. frozen protocol identifiers and SHA-256 protocol records;
2. deterministic 100-of-1,000 blind-control assignment;
3. immutable source-set freeze and manifest validation;
4. one-draft raw ChatGPT generation storage with freeze-before-audit enforcement;
5. diagnosis-only ChatGPT self-audit storage using the six frozen Voice dimensions;
6. deterministic weighted Audit Index and qualitative verdict calculation in the database;
7. controlled diagnostic flags and escalation provenance;
8. blind-review masking that hides all machine judgments until the first human decision is committed;
9. ACCEPT / EDIT / REWRITE persistence with separate raw and final hashes;
10. automatic Qwen trigger derivation;
11. private JWT-protected Qwen audit Edge Function using `qwen/qwen3.6-27b` through Groq;
12. explicit per-source, per-minute, per-day and rolling-30-day Qwen call/token budgets;
13. append-only database guards, RLS, revoked client/service-role database privileges and explicit auditor provenance;
14. deterministic source-set preparation CLI and protocol tests in the repository.

No Batch 2 production source rows or drafts were created during implementation.

---

## 2. Frozen protocol records

The private database now contains four immutable protocol freezes:

| Protocol | SHA-256 |
|---|---|
| `B2-GEN-v1` | `800291b0d919b814278670351265de9aee2679f28fa5dd98b18fac5bde350678` |
| `B2-SELF-AUDIT-v1` | `039d395ffb033f4e13b5bdd22b4257a8d0da0f98fce44e007a9da72bd354d60a` |
| `B2-BLIND-v1` | `907572798a46f8259322bd3c7ca797356898baea581ef61ccded854c896cb2cd` |
| `B2-QWEN-AUDIT-v1` | `5fd0e73cb150a0e3557628f286cea04bdccf37fccb912a552fb6ac83ee41f129` |

The frozen blind method is:

```text
seed = flipgazine-batch2-blind-control-2026-08-18-v1
key  = sha256(seed + "\n" + source_id)
rank = ascending key
blind_control = rank <= 100
```

This is independent of input ordering and is computed before generation quality or audit output exists.

---

## 3. Private database model

Live private tables:

```text
private.batch2_protocol_freezes
private.batch2_sources
private.batch2_source_set_freezes
private.batch2_raw_drafts
private.batch2_qwen_usage
private.batch2_ai_audits
private.batch2_human_reviews
```

Key invariants are enforced by database triggers rather than convention alone:

- the real source set cannot freeze unless there are exactly 1,000 unique ranked rows and exactly 100 blind rows;
- after source-set freeze, source assignment cannot be changed or deleted;
- a raw draft cannot be recorded until its source set is frozen;
- raw drafts cannot be updated, deleted or truncated;
- audit hashes must match the exact frozen raw or final draft for the declared stage;
- ChatGPT and Qwen auditor/provider/protocol identities cannot be conflated;
- Audit Index and qualitative verdict are recomputed by the database from the six stored ratings;
- Qwen audit rows must point to a matching reserved usage record with a preserved escalation reason;
- ACCEPT must preserve raw Thai exactly;
- EDIT and REWRITE must produce a distinct final hash;
- machine audit and human-review evidence are append-only.

A destructive test against a frozen protocol row was correctly rejected with `Batch 2 provenance rows are append-only`.

---

## 4. Blind-control behavior

`private.batch2_review_payload(source_id)` is the canonical review-read contract.

For an unreviewed blind row it returns the source, scenario and frozen raw draft but sets machine-audit material to `null`.

Only after the first human ACCEPT / EDIT / REWRITE record exists can the stored pre-human machine audits be returned for that row.

A synthetic 1,000-row database contract test was run inside a rollback-only subtransaction. It proved:

```text
source count                       1000
blind count                         100
row under test blind_control       true
machine audits before decision     hidden / null
human decision                     committed inside test transaction
machine audits after decision      visible
Qwen reasons                       fluent, thai_pragmatics_4
persistent test production rows    0
```

The test transaction was rolled back completely; no fake Batch 2 source or audit data remains in the live tables.

---

## 5. ChatGPT self-audit recording

The database exposes an owner-only workflow function:

```text
private.batch2_record_self_audit(...)
```

It records diagnosis-only metadata against an exact frozen hash and returns:

```text
audit_id
source_id
stage
draft_sha256
audit_index
verdict
qwen_required
qwen_reasons
created_at
```

The six ratings remain integer 1–4 values using the frozen weights:

```text
Intent / Cause                    20%
Thai Pragmatic Naturalness        25%
BFF Conversational Voice          20%
Lexical / Social Fit              15%
Stance / Decision Strength        10%
Composition / Delivery            10%
```

The database maps them to the internal Audit Index and independently derives the qualitative verdict.

---

## 6. Qwen external audit path

A dedicated function is deployed:

```text
batch2-qwen-audit
```

Deployment state:

```text
status       ACTIVE
verify_jwt   true
model        qwen/qwen3.6-27b
provider     Groq
```

This is deliberately separate from the public `/voice.html` evaluator.

Security properties:

- browser requests carrying an `Origin` header are rejected;
- request body accepts only the internal `source_id`, audit stage and an optional controlled escalation reason;
- the scenario and exact frozen draft are loaded server-side from the private tables;
- the caller cannot submit arbitrary text for Groq evaluation through this path;
- the gateway verifies JWT and the function rechecks the active Supabase auth session;
- the function additionally requires `public.is_fg_admin()`;
- Groq credentials stay in server-side environment secrets;
- only the one selected scenario + exact frozen draft are sent outbound;
- returned Qwen JSON is schema-validated and rewrite/suggestion-shaped rationale is rejected;
- at most one constrained JSON repair retry is allowed;
- the external usage record and audit row remain linked by provenance.

The path intentionally remains an outbound inference path. It narrows and controls that risk; it does not pretend to eliminate it.

---

## 7. Qwen budgets

The database claim step is serialized with advisory locks and enforces:

```text
per source/stage       max 4 attempts / 24 h
per minute             max 20 calls
per minute             max 60,000 reserved tokens
per 24 h               max 200 calls
per 24 h               max 650,000 reserved tokens
rolling 30 days        max 1,500 calls
rolling 30 days        max 4,500,000 reserved tokens
per request body       max 1,800 bytes
Qwen completion        max 450 tokens
```

Two simultaneous reserved Qwen jobs for the same source/stage are prevented by a partial unique index.

Automatic reasons currently include:

```text
thai_pragmatics_4
fluent
low_confidence
care_case
```

Controlled explicit reasons cover:

```text
semantic_drift_uncertainty
malformed_self_audit
random_calibration
human_machine_disagreement
post_human_selected
```

---

## 8. Access-control verification

Verified live after deployment:

- all `private.batch2_*` table grants belong only to `postgres`;
- `anon`, `authenticated` and `service_role` have no EXECUTE privilege on the private Batch 2 helper functions;
- every private Batch 2 database function is `SECURITY INVOKER` (`prosecdef=false`);
- RLS is enabled on all Batch 2 tables as defense in depth;
- no general-purpose Batch 2 database HTTP executor was introduced.

Supabase advisors were run after DDL. The only Batch 2 performance finding was the external-Qwen-usage foreign-key index; that index was then added. Other advisor findings belong to pre-existing non-Batch-2 project objects and are outside this implementation scope.

---

## 9. Repository implementation artifacts

Added to `main`:

```text
answers-private-server/batch2-protocol.mjs
answers-private-server/batch2-protocol.test.mjs
answers-private-server/batch2-prepare-source-set.mjs
answers-private-server/batch2-implementation-proof.json
supabase/functions/batch2-qwen-audit/index.ts
```

`batch2-protocol.test.mjs` passes locally and verifies:

- deterministic blind selection;
- input-order independence;
- exactly 100 blind rows out of 1,000;
- Audit Index boundary calculations;
- qualitative verdict behavior;
- Thai=4 / Fluent / low-confidence / CARE escalation derivation.

`batch2-prepare-source-set.mjs` accepts exactly 1,000 JSONL source scenarios and emits the ranked blind assignment plus a deterministic source-manifest SHA-256 for freeze comparison.

---

## 10. Live state at handoff

Production Batch 2 data tables intentionally remain empty:

```text
sources              0
source_set_freezes   0
raw_drafts           0
ai_audits            0
human_reviews        0
qwen_usage           0
```

Only the four immutable protocol-freeze records exist.

Therefore the implementation is ready, but Batch 2 itself has not started generating evidence yet.

---

## 11. Next gate

The next valid sequence is now:

```text
finalize the real 1,000-row Batch 2 source set
→ run batch2-prepare-source-set.mjs
→ verify exactly 100 blind rows + manifest hash
→ insert all 1,000 source records
→ freeze the source set in private.batch2_source_set_freezes
→ choose the real first 20 pilot rows without seeing generation quality
→ generate one raw ChatGPT draft per pilot row
→ freeze each raw draft
→ record ChatGPT diagnosis-only self-audit
→ run required Qwen escalations
→ present assisted/blind rows under the stored lane assignment
→ record human ACCEPT / EDIT / REWRITE
→ verify pilot evidence and review ergonomics
→ freeze v1 operationally
→ scale only after the pilot passes
```

Do **not** start the 1,000-row production run before the real 20-row pilot has passed.

---

## 12. Current implementation verdict

**Phase 5D A–F: complete.**

The remaining Phase 5D work is evidence-producing rather than infrastructure-building:

```text
G — real 20-row pilot
H — review pilot evidence + ergonomics
I — freeze v1 after pilot
J — scale to Batch 2 production
```

The implementation gate that previously blocked the pilot is cleared. The next dependency is the real frozen 1,000-row source set.
