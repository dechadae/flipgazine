# The Book of Answers — Batch 2 Corpus, Routing & Reachability Implementation Report

**Status:** READY FOR METRIC-ELIGIBLE HUMAN REVIEW  
**Implemented:** 18 August 2026  
**Supabase project:** `sjpvhgxacsiorrtijqua`  
**Governing plan:** `ANSWERS-BATCH2-CORPUS-ROUTING-REACHABILITY-PLAN.md`  
**Human-review exposure authority:** `ANSWERS-BATCH2-HUMAN-FIRST-REVIEW-CORRECTION.md`  
**Machine proof:** `../../answers-private-server/batch2-routing-implementation-proof.json`

---

## 1. Implementation verdict

The Batch 2 corpus/routing plan is now implemented far enough for the first clean production review unit to begin.

Batch 2 does **not** have a parallel runtime. A promoted Batch 2 answer becomes an ordinary canonical `private.answers` row and enters the same Batch 1 routing graph, dictionary, index builder, focus/topic/support/helper pools, universal mixing, recent-answer exclusion and private reveal service.

The production sequence is now:

```text
frozen Batch 2 scenario
→ one frozen ChatGPT Thai draft
→ LF byte validation
→ sealed ChatGPT diagnosis
→ required/selected sealed Qwen diagnosis
→ native-human ACCEPT / EDIT / REWRITE
→ immutable final Thai
→ machine comparison revealed
→ English adaptation
→ semantic staging using Batch 1 fields
→ alias/typo/concept delta
→ deterministic reachability + regression validation
→ atomic 20-row corpus + dictionary + index promotion
→ new canonical corpus revision
```

The first clean metric-eligible review unit is **B2-0021 through B2-0040**.

---

## 2. Batch 1 parity baseline

The live canonical baseline used by the implementation is corpus revision **125** with:

```text
active answers                         948
universal answers                       75
answers with focus                     795
answers with topics                    821
answers with support                    44
answers with helpers                   302
answers with zero semantic ownership     0
active answers unreachable from index    0
```

Dictionary baseline:

```text
concepts                               268
focus concepts                         182
slang concepts                          38
support concepts                        24
topic concepts                           9
bridge concepts                         15
aliases                               1,139
typos                                   146
normalized cross-concept collisions       0
```

The implementation preserves the existing router constants and semantics:

```text
MIN_POOL             2
MAX_BROAD_WIDEN     12
RECENT_LIMIT         6
two universals added to non-generic routes
focus-first tier selection
support enrichment
same topic/helper fallback behavior
same private answer reveal path
```

No Batch 2-specific route is introduced.

---

## 3. New private routing/provenance layer

Five private tables were added:

```text
private.batch2_focus_reconciliation
private.batch2_semantic_staging
private.batch2_routing_checks
private.batch2_promotions
private.batch2_answer_map
```

### `batch2_focus_reconciliation`

Freezes the mapping between the 129 Batch 2 source-set `intended_focus` labels and the canonical routing taxonomy.

### `batch2_semantic_staging`

Stores deployable metadata derived only after the human Thai decision:

```text
final human SHA-256
English adaptation
topics[]
focus[]
support[]
helpers[]
is_universal
dictionary delta
reachability probe questions
semantic SHA-256
staging / validated / promoted state
```

Promoted rows are immutable.

### `batch2_routing_checks`

Append-only pre-promotion proof for each 20-row unit. A persisted check contains candidate dictionary/index hashes, the semantic manifest hash, reachability evidence and all zero-failure counters.

### `batch2_promotions`

Append-only record of each successful 20-row atomic promotion, including old/new corpus revision, source IDs, permanent answer IDs and integrity hashes.

### `batch2_answer_map`

Immutable mapping:

```text
B2 source ID → canonical private.answers answer_id → promotion → corpus revision
```

This makes the research/evaluation record and the deployable Book record permanently traceable without making them the same object.

---

## 4. Security model

All five new private tables:

- have RLS enabled as defense in depth;
- have no direct `SELECT`, `INSERT`, `UPDATE` or `DELETE` privilege for `anon`, `authenticated` or `service_role`;
- are reached operationally only from narrowly scoped server-side services.

The new/hardened private functions are all **SECURITY INVOKER**:

```text
private.batch2_record_raw_draft
private.batch2_record_human_review
private.batch2_review_payload
private.batch2_stage_semantics
private.batch2_promote_unit
private.batch2_semantic_prepare
private.batch2_semantic_lock_promoted
private.batch2_reject_append_only
```

`anon`, `authenticated` and `service_role` have no direct EXECUTE privilege on any of the above, including trigger-only helpers.

No general-purpose SQL/HTTP executor was introduced.

Supabase security advisors were rerun after DDL. There are **no new Batch 2 SECURITY DEFINER or mutable-search-path findings**. The advisor still reports project-wide pre-existing findings plus informational `private`-table RLS/no-policy notices; those are outside this Batch 2 change and the private tables have direct grants revoked.

---

## 5. Raw/final LF integrity gate

The original technical pilot exposed an ingestion bug: intended line breaks were stored as literal backslash-`n` transport text.

The official raw-draft helper is now hardened:

```text
private.batch2_record_raw_draft(...)
```

It rejects any raw Thai containing literal `\\n` transport escapes. Real LF bytes are required.

The human-review helper has the same final-copy protection:

```text
private.batch2_record_human_review(...)
```

A destructive probe attempted to write a literal escaped line break to B2-0041; the helper rejected it and no B2-0041 raw row persisted.

The clean unit B2-0021–B2-0040 was verified after insertion:

```text
rows                         20
literal backslash-n rows      0
minimum real LF count         3
maximum real LF count         3
```

Each current draft is therefore four authored lines separated by three real LF bytes.

The old B2-0001–B2-0020 technical unit remains preserved for workflow evidence but is **non-metric and excluded from corpus promotion**.

---

## 6. 129-focus reconciliation

All 129 frozen Batch 2 `intended_focus` labels have been reconciled before scale.

Result:

```text
reuse existing canonical concept      121
new focus concept candidate              7
derive from reviewed scenario            1
total                                    129
```

Seven justified new focus candidates:

```text
bar
cleaning
consistency
errand
help
home
stress
```

Important non-duplication decisions include:

```text
eat       → existing topic `food`
repair    → existing support `fix-repair`
hotel     → existing bridge `hotel` → travel context
plan-b    → existing support concept
risk      → existing support concept
take-action → existing support concept
wait-decision → existing support concept
care      → derive from scenario; it is an audit/safety label, not a live focus
```

This reconciliation is staging authority only. Final answer semantics are still based on the human-approved final Thai and the actual applicability of the answer.

---

## 7. Human-first production reviewer

New server-side function:

```text
batch2-production-review-service
```

Live deployment:

```text
id           40dcfa28-ae5b-4399-9ddc-e1136dd4470b
version      1
status       ACTIVE
verify_jwt   true
SHA-256      217cbce93a35c5fa1b11dae5368b0b77373f70f3cff2a4eb5db0a3fa04e4c15e
```

It requires:

- Supabase JWT;
- active `auth.sessions` membership;
- `public.is_fg_admin()`;
- Flipgazine production origin for browser access.

Actions:

```text
load_unit
run_qwen
save_review
```

Reviewer exposure is 100% human-first. Before the human decision, the service does not return machine-audit content. The row becomes reviewable only when:

```text
raw LF gate passes
ChatGPT pre-human audit exists
required Qwen pre-human audit exists, when required
human review does not already exist
```

`save_review` writes the official append-only `private.batch2_human_reviews` record, not the old public technical-review table.

---

## 8. Live Thai Audit UI

Canonical reviewer page:

```text
/answers-thai-review-batch2.html
site_files version 7
```

The previous technical UI was preserved at:

```text
/wip/answers-thai-review-batch2-tech-pilot-20260818.html
```

The production page now points to `batch2-production-review-service` and starts with B2-0021–B2-0040.

Pre-decision UI shows only:

```text
source ID
question/scenario
frozen Thai draft
HUMAN FIRST
AI comparison sealed
ACCEPT / EDIT / REWRITE
```

`EDIT` and `REWRITE` explicitly enter editable mode; the textarea is read-only before that. `ACCEPT` is one tap and must preserve the raw draft exactly.

After the human decision is committed, stored machine diagnoses can be revealed for comparison.

---

## 9. First clean production unit

The first metric-eligible unit is:

```text
B2-0021 → B2-0040
```

Current frozen state immediately before human review:

```text
raw drafts                              20
raw rows with literal transport escapes  0
ChatGPT pre-human self audits           20
rows requiring Qwen                     17
Qwen audits completed at handoff         0
official human reviews                   0
semantic staging rows                    0
routing checks                           0
promotions                               0
promoted Batch 2 answers                 0
```

The page prepares the 17 required Qwen audits in the background. Their results remain sealed. Buttons enable only after the machine-evidence gate for a row is complete.

The 20 ChatGPT self-audits were deliberately not all marked perfect. The diagnosis layer contains some minor-problem cases, but those judgments are hidden from the human reviewer until after the decision.

---

## 10. Semantic staging after each human-reviewed unit

A new owner-only helper exists:

```text
private.batch2_stage_semantics(...)
```

It can only stage a source after an official human review exists and its `final_sha256` must match the human-review record.

For each reviewed row ChatGPT prepares:

```text
English adaptation from final Thai
existing Batch 1 topics[]
existing/new-approved focus[]
existing support[]
existing helpers[]
is_universal (normally false)
dictionary_delta
probe_questions[]
```

Dictionary delta has exactly three lanes:

```json
{
  "concepts": [],
  "aliases": [],
  "typos": []
}
```

Aliases and typos modify canonical dictionary concepts, never individual answer rows.

The same Batch 1 array normalizer is reused for answer-level semantics.

---

## 11. Routing validation service

New server-side function:

```text
batch2-routing-service
```

Live deployment:

```text
id           443448b4-0ac9-4f58-af1f-0e5756cf68ae
version      1
status       ACTIVE
verify_jwt   true
SHA-256      9bc96973c4fed8bc5c200a1bf46591ed26f6c1a10a6afe9acf8a385f7ffd5c15
```

Actions:

```text
get_reconciliation
validate_unit
promote_unit
```

A unit must contain exactly 20 unique contiguous sources.

`validate_unit` builds a candidate dictionary + corpus index without publishing. It preserves all old concept IDs, kinds, aliases and typos, then applies only staged deltas.

It checks:

```text
normalized alias/typo ownership collisions
invalid/empty surface forms
semantic-zero new answers
index-unreachable active answers
parser-to-eligible reachability for new answers
Batch 1 dictionary regressions
```

Per-answer reachability probes include the exact source where not intercepted by runtime CARE, explicit staged probes, primary focus aliases and support aliases.

The required persisted zero-failure counters are:

```text
alias_collisions       = 0
semantic_zero          = 0
unreachable_index      = 0
unreachable_probe      = 0
batch1_regressions     = 0
```

Only a passing check changes semantic rows from `staged` to `validated`.

---

## 12. Atomic 20-row promotion

The database now exposes the owner-only SECURITY INVOKER function:

```text
private.batch2_promote_unit(...)
```

It refuses to promote unless:

- exactly 20 contiguous unique sources are supplied;
- all 20 have official human reviews;
- all 20 semantic rows are `validated`;
- final human hashes and semantic hashes match;
- a persisted passing routing check exists for the exact same current corpus revision and source IDs;
- all zero-failure counters are zero;
- candidate dictionary and semantic manifest hashes match the check;
- all tags are legal under the candidate dictionary and existing allowed topic/helper taxonomy;
- no duplicate normalized Thai exists;
- no unrevealed live answer request is in flight.

Inside one transaction it:

```text
assigns 20 permanent canonical answer IDs
inserts the final Thai + English + semantics into private.answers
rebuilds the index with private.answer_build_index()
verifies the rebuilt index hash equals the preflight candidate
verifies zero active answers are unreachable from the index
writes new dictionary + index to answer_routing_assets
creates the next answer_corpus_revisions row
writes immutable promotion provenance
writes B2 source → answer_id mappings
locks the semantic rows as promoted
```

Therefore the system cannot enter a state where a Batch 2 answer is live but its required dictionary change is not.

---

## 13. Same Batch 1 runtime after promotion

After promotion, the Book does not know or care that a row came from Batch 2.

It uses the same runtime sequence:

```text
question normalization
→ alias / typo recognition
→ focus / slang / support / topic / helper parse
→ focus-first tier selection
→ support enrichment
→ two universal additions on non-generic route
→ recent-answer exclusion
→ uniform random eligible pick
→ private reveal
```

The promotion bridge deliberately uses the existing `private.answer_build_index()` instead of creating a second index format.

Reachability parity is checked after every 20-row promotion, not only at the end of the 1,000 rows.

---

## 14. CARE boundary

`care_case` in the Batch 2 source set remains an **audit flag**, not automatic runtime CARE ownership.

The hard existing CARE interceptor still has precedence. A source caught by that interceptor is recorded as CARE-intercepted during reachability validation; the normal answer corpus is not allowed to bypass CARE simply to satisfy a reachability metric.

`care` is therefore the one `intended_focus` value classified as `derive_from_scenario` instead of a routing concept.

---

## 15. Advisor follow-up

After the new tables/functions were created, Supabase performance advisors identified five new Batch 2 foreign keys without covering indexes. The following indexes were added:

```text
batch2_answer_map_promotion_idx
batch2_answer_map_revision_idx
batch2_promotions_base_revision_idx
batch2_promotions_promoted_by_idx
batch2_routing_checks_base_revision_idx
```

Other advisor results are pre-existing project-wide objects or expected informational notices on private tables with RLS enabled and no client policies.

---

## 16. Repository implementation artifacts

Committed to `main`:

```text
supabase/functions/batch2-production-review-service/index.ts
supabase/functions/batch2-routing-service/router.ts
supabase/functions/batch2-routing-service/index.ts
answers-private-server/batch2-routing-implementation-proof.json
```

Commits:

```text
7842600b30b5be062da73cdb196fd594099061ea  production review service
9d83a19d8680c5aca4b9c20faa4942b8fff0a135  routing parity core
38248dcbe090bb6e56fa5cb988366b69dcc6d66b  routing validation/promotion service
d6c987edca82e6dfc4abf0101a0ef54f0ddf099a  implementation proof
```

---

## 17. What happens after Decha finishes B2-0021–B2-0040

Do **not** manually copy the answers into the old 948-row corpus editor.

The correct next transaction is:

```text
20 official human decisions complete
→ read exact final Thai from private.batch2_human_reviews
→ create English adaptations
→ stage Batch 1-compatible topics/focus/support/helpers
→ propose only useful alias/typo additions
→ add any approved new focus concept(s) required by this unit
→ create realistic reachability probes
→ batch2-routing-service validate_unit
→ inspect zero-failure report
→ if passing: promote_unit
→ canonical corpus revision increments by exactly 1
→ active answer count increments by exactly 20
→ verify live route/index/reveal
→ only then generate the next 20 raw drafts
```

The production rhythm is therefore:

```text
review 20
→ enrich 20
→ validate 20
→ promote 20
→ verify 20
→ next 20
```

This prevents 1,000 unchecked drafts from accumulating ahead of the human/routing gate and keeps every published unit reversible and auditable by revision.

---

## 18. Current handoff

**Infrastructure:** complete for production review, semantic enrichment, reachability validation and atomic promotion.  
**Source set:** frozen 1,000.  
**Canonical live corpus:** revision 125 / 948 active answers.  
**Technical unit B2-0001–B2-0020:** preserved, non-metric, not promotion eligible.  
**Clean unit B2-0021–B2-0040:** frozen, LF-correct, ChatGPT-audited, ready for sealed Qwen preparation and native-human review.  
**Official human decisions:** 0 at this handoff.  
**Live Batch 2 promotions:** 0 at this handoff.

The next action belongs to the human reviewer: open `/answers-thai-review-batch2.html`, let the sealed evidence finish preparing, and review B2-0021–B2-0040 without seeing the machine judgments first.
