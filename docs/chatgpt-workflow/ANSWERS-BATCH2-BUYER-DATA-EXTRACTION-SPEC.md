# The Book of Answers — Batch 2 Buyer Data Extraction & Export Specification

**Status:** GOVERNING BUYER EXPORT SPECIFICATION — v3  
**Updated:** 19 August 2026  
**Scope:** Buyer-facing extraction of generation, machine-audit, native-human review, semantic-routing, reachability, benchmark eligibility and corpus-provenance evidence.  
**Related:** `ANSWERS-BATCH2-CORPUS-ROUTING-REACHABILITY-IMPLEMENTATION-REPORT.md`, `ANSWERS-BATCH2-TECH-PILOT-COMPLETION-REPORT.md`, `ANSWERS-BATCH2-HUMAN-FIRST-REVIEW-CORRECTION.md`, `ANSWERS-COMMERCIAL-EXECUTION-TIMELINE.md`.

---

## 1. Governing principle

Buyer exports preserve the complete evidence chain rather than flattening the project into a question/answer spreadsheet.

Canonical lineage:

```text
frozen source scenario
→ frozen AI draft
→ pre-human ChatGPT diagnosis
→ required/selected pre-human Qwen diagnosis
→ native-human ACCEPT / EDIT / REWRITE
→ final Thai
→ English adaptation
→ semantic routing tags
→ dictionary delta where justified
→ deterministic reachability evidence
→ corpus promotion provenance
→ buyer-export checkpoint
```

A buyer must be able to distinguish:

1. generating-model output;
2. machine judgments made before human review;
3. what the native-human reviewer decided;
4. final deployable Thai and English;
5. whether machine judgments were actually hidden before the human decision;
6. whether the row is eligible for strict benchmark metrics;
7. whether it is linked to the canonical Book corpus;
8. whether it is reachable under the production router.

**Benchmark eligibility and corpus usability are separate fields.** A reviewed row may be valid Book content while excluded from strict benchmark percentages because of provenance or visibility defects.

Never repair provenance cosmetically to recover eligibility.

---

## 2. Record classes and eligibility

### 2.1 Technical pilot — B2-0001 through B2-0020

These 20 records remain genuine reviewed language data and canonical Book content.

```text
record_class                   technical_pilot
buyer_export_included          true
corpus_promotion_eligible      true
corpus_linked                  true
benchmark_metric_eligible      false
```

They are excluded from strict benchmark metrics because their immutable raw drafts preserve escaped-linebreak transport text rather than literal LF bytes. B2-0001 additionally preserves an early machine-visibility exception.

The historical review UI normalized the escaped transport markers into real visual line breaks before human review, so the editorial decisions were not made against visibly garbled Thai. The raw provenance defect nevertheless remains disclosed.

Technical-pilot result:

```text
rows reviewed      20
ACCEPT               4
EDIT                 9
REWRITE              7
```

These are technical-pilot observations only.

### 2.2 Ordinary clean-production rows

A strict-clean row must satisfy:

```text
literal-LF-correct frozen raw draft
required machine judgments completed before human decision
machine judgments hidden until human decision
append-only native-human review
final Thai hash integrity
post-human English/semantic enrichment
passing routing/reachability regression check
accurate row-level eligibility export
```

When all conditions hold:

```text
record_class                     clean_metric
buyer_export_included            true
benchmark_metric_eligible        true
human_first_protocol_compliant   true
corpus_linked                    true after promotion
```

### 2.3 Protocol-exception rows

A row produced in the clean production lane may lose strict benchmark eligibility if a machine judgment, verdict, score, flag or materially equivalent audit conclusion becomes visible before the native-human decision.

Current recorded pre-human visibility exceptions:

```text
B2-0048
B2-0059
```

For these rows:

```text
record_class                     clean_metric production lane
buyer_export_included            true
benchmark_metric_eligible        false
human_first_protocol_compliant   false
corpus_promotion_eligible        true after normal human/product QA
```

The exception is stored in `private.batch2_protocol_exceptions` and surfaced through `private.batch2_deploy_reviews` after human review.

Do not delete, regenerate, relabel or hide a row to make it strict-clean again.

---

## 3. Count language

### 3.1 Canonical Book target — unchanged

```text
Batch 1 canonical reviewed answers          948
Original Batch 2 B2-0001–B2-1000          1,000
------------------------------------------------
canonical reviewed Book corpus             1,948
```

Technical/protocol exclusions do not automatically invalidate final human-reviewed Book content.

### 3.2 Strict-clean benchmark target

The original plan expected:

```text
B2-0021–B2-1000                              980
supplemental replacements                     20
------------------------------------------------
strict clean benchmark                     1,000
```

After the current two pre-human visibility exceptions, if no further exclusions occur:

```text
original B2-0021–B2-1000 rows               980
less current visibility exceptions            2
------------------------------------------------
strict-clean original rows                   978

supplemental clean records needed             22
------------------------------------------------
strict clean target                         1,000
```

The supplemental source set must be frozen before generation and must never overwrite excluded original records.

If the project chooses not to create the additional replacement evidence, report the actual strict denominator instead of calling it 1,000.

### 3.3 Unique reviewed evidence

If 22 benchmark-only supplemental records are ultimately delivered:

```text
canonical Book corpus                      1,948
additional supplemental benchmark records     22
------------------------------------------------
unique reviewed evidence                   1,970
```

Do not use 1,970 as a buyer claim until the supplemental records actually exist and are reviewed.

---

## 4. Canonical buyer bundle

Recommended eventual structure:

```text
answers-buyer-bundle/
│
├── README.md
├── METHODOLOGY.pdf
├── LICENSE.txt
├── SHA256SUMS
│
├── corpus/
│   ├── answers_canonical.jsonl
│   └── answers_canonical.csv
│
├── benchmark/
│   ├── batch2_strict_clean.jsonl
│   ├── batch2_strict_clean.csv
│   └── benchmark_summary.json
│
├── evidence/
│   ├── raw_drafts.csv
│   ├── machine_audits.csv
│   ├── human_reviews.csv
│   ├── routing_semantics.csv
│   ├── dictionary_changes.csv
│   ├── reachability_probes.csv
│   ├── human_machine_comparison.json
│   ├── routing_summary.json
│   ├── corpus_manifest.json
│   └── export_manifest.json
│
├── technical_pilot/
│   ├── B2-0001-B2-0020.jsonl
│   └── TECHNICAL-PILOT-NOTE.md
│
└── protocol_exceptions/
    ├── protocol_exception_rows.jsonl
    └── PROTOCOL-EXCEPTIONS-NOTE.md
```

JSONL remains the canonical row-oriented buyer format. CSVs are convenience projections.

A row may appear in both canonical corpus and an exception appendix. Those are multiple evidence views of one record, not duplicate corpus records.

---

## 5. Server-side source of truth

Buyer extraction is performed from private canonical data, never browser state or manually copied review screens.

Primary sources:

```text
private.batch2_sources
private.batch2_raw_drafts
private.batch2_ai_audits
private.batch2_human_reviews
private.batch2_posthuman_mechanical_qa
private.batch2_protocol_exceptions
private.batch2_deploy_reviews
private.batch2_semantic_staging
private.batch2_routing_checks
private.batch2_promotions
private.batch2_answer_map
private.answer_corpus_revisions
private.answer_routing_assets
private.batch2_buyer_export_snapshots
public.answers_thai_reviews        technical pilot only
```

Never export service credentials, private database URLs, JWTs, session IDs, unrestricted infrastructure configuration or Supabase auth UUIDs.

---

## 6. Canonical JSONL record contract

Top-level structure:

```json
{
  "schema_version": "ANSWERS-B2-BUYER-v1",
  "record_id": "B2-0021",
  "record_class": "clean_metric",
  "eligibility": {},
  "source": {},
  "generation": {},
  "machine_judgments": [],
  "human_review": {},
  "sequence_proof": {},
  "deployment": {},
  "provenance": {}
}
```

### `eligibility`

Required:

```text
buyer_export_included
benchmark_metric_eligible
corpus_promotion_eligible
corpus_linked
exclusion_reason
human_first_protocol_compliant
raw_transport_integrity
```

Example strict-clean values:

```text
buyer_export_included          true
benchmark_metric_eligible      true
corpus_promotion_eligible      true
corpus_linked                  true after promotion
exclusion_reason               null
human_first_protocol_compliant true
raw_transport_integrity        literal_lf_clean
```

Example visibility-exception values:

```text
buyer_export_included          true
benchmark_metric_eligible      false
corpus_promotion_eligible      true
human_first_protocol_compliant false
exclusion_reason               pre_human_machine_visibility
```

### `source`

```text
source_set_id
source_id
source_ordinal
domain
intended_focus
question_or_scenario
care_case
historical_blind_assignment
scenario_sha256
```

Historical blind assignment is provenance only and is not current reviewer visibility.

### `generation`

```text
provider
model
model_snapshot
generation_protocol_version
generated_at
raw_thai
raw_sha256
```

Technical-pilot rows retain the actual escaped transport artifact. A convenience normalized display may be added but never replaces raw data/hash.

### `machine_judgments[]`

```text
judge
provider
model
stage
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
flags[]
rationale
confidence
created_at
```

Machine judgments are evidence, not ground truth.

### `human_review`

```text
decision       ACCEPT | EDIT | REWRITE
final_thai
final_sha256
reviewed_at
reviewer_class native_thai_human
reviewer_id    buyer-safe pseudonymous identifier
```

Use `native_reviewer_01` or an equivalent buyer-safe identifier; never export an auth UUID.

### `sequence_proof`

```text
all_required_machine_audits_completed_before_human_review
machine_results_hidden_until_human_decision
human_first_protocol_compliant
last_machine_audit_at
human_reviewed_at
seconds_between_last_machine_audit_and_human_review
```

Timestamp order alone does not prove blindness. Visibility compliance comes from the recorded review protocol and exception state.

### `deployment`

After promotion:

```text
english
semantics.topics[]
semantics.focus[]
semantics.support[]
semantics.helpers[]
semantics.is_universal
dictionary_changes
reachability.index_reachable
reachability.parser_reachable
reachability.source_scenario_reaches_answer
reachability.probe_count
reachability.probe_failures
publication.canonical_answer_id
publication.corpus_revision
publication.promotion_class
publication.dictionary_sha256
publication.routing_index_sha256
publication.promotion_sha256
```

Reachability means target membership in the eligible pool under the production router, not guaranteed random selection.

---

## 7. CSV projections

At minimum:

```text
batch2_records.csv
raw_drafts.csv
machine_audits.csv
human_reviews.csv
routing_semantics.csv
dictionary_changes.csv
reachability_probes.csv
protocol_exceptions.csv
```

Arrays are encoded as stable JSON arrays in CSV cells.

Every flat record view must include:

```text
benchmark_metric_eligible
human_first_protocol_compliant
corpus_linked
```

so downstream users cannot infer one from another.

---

## 8. Official aggregate metrics

All official strict-clean percentages use only:

```text
benchmark_metric_eligible = true
and human_first_protocol_compliant = true
```

Report:

### Native-human decisions

```text
eligible record count
ACCEPT count / rate
EDIT count / rate
REWRITE count / rate
```

### Machine audits

For ChatGPT and Qwen separately:

```text
audited count
fluent
minor_problem
major_problem
not_acceptable
mean / median audit_index where useful
```

Qwen denominators remain explicit.

### Human ↔ machine matrices

For each judge independently:

```text
machine fluent × human ACCEPT / EDIT / REWRITE
machine minor × human ACCEPT / EDIT / REWRITE
machine major × human ACCEPT / EDIT / REWRITE
machine unacceptable × human ACCEPT / EDIT / REWRITE
```

Do not merge judges into a synthetic score unless a separately versioned analysis defines that transformation.

Technical-pilot and protocol-exception rows appear in separately labeled appendices and never modify strict-clean percentages.

---

## 9. Routing / reachability evidence

Buyer-facing routing summary includes:

```text
canonical answers linked
index-reachable answers
parser/probe reachable answers
source-scenario reachability
semantic-zero count
alias/typo collision count
Batch 1 regression count
new concepts / aliases / typos by revision
```

Row-level probes preserve query and evidence sufficient to establish target eligibility under the production router.

Do not claim that routing deterministically selects the target answer; the public Book intentionally randomizes within eligible pools.

---

## 10. Internal buyer-export checkpoint

After every successful 20-row promotion:

```text
VERIFY LIVE
→ generate private buyer-export snapshot
→ verify snapshot row count + SHA-256
→ only then prepare the next 20
```

Current checkpoints:

```text
1. ANSWERS-B2-TECH-PILOT-v1-preview
   record_class        technical_pilot
   rows                20
   revision            126
   SHA-256             6a6e0ca0d51b3d342d0f4a14521df5466c6f8e0e8b9d3c94fe7bff4c4ee92a2d

2. ANSWERS-B2-CLEAN-0021-0040-v1-preview
   record_class        clean_metric
   rows                20
   revision            127
   SHA-256             dc5bef48ccc93032eacbbb69d58b300ea9664654d5b7d15cf3a0970ab190f8df
```

The second snapshot contains 9 ACCEPT / 8 EDIT / 3 REWRITE, 20 ChatGPT audits, 17 Qwen audits, zero dictionary delta and zero routing/regression failures.

Snapshots are internal QA artifacts, not public downloads.

---

## 11. Hash and integrity rules

- use SHA-256 for buyer-integrity hashes;
- never relabel MD5 as SHA-256;
- promotion candidate dictionary/index/semantic hashes use PostgreSQL canonical `jsonb::text` SHA-256;
- buyer bundles include top-level `SHA256SUMS` in addition to row-level hashes;
- immutable source/draft/audit/human provenance is never rewritten merely to simplify a buyer narrative.

---

## 12. Privacy / security redaction

Never export:

- Supabase auth UUIDs;
- JWTs or API keys;
- service-role credentials;
- private database URLs;
- private admin URLs;
- internal session IDs;
- unrestricted infrastructure configuration.

Use buyer-safe reviewer identifiers and describe qualifications in methodology.

---

## 13. Current extraction checkpoint

As of 19 August 2026:

```text
canonical corpus revision                    127
canonical active answers                     988
technical-pilot corpus-linked rows            20
strict-clean promoted B2 rows                 20
clean promoted answer IDs                969–988
buyer-export snapshots                         2
next original unit                    B2-0041–0060
current recorded visibility exceptions          2
```

The next unit's machine judgments remain sealed for all rows except the two already recorded visibility exceptions. Those exceptions must remain explicit in all future buyer extraction.

---

## 14. Release rule

No buyer bundle is released merely because a file can be generated.

Before delivery verify:

```text
record counts
eligibility counts
source/draft/final hashes
sequence proof
exception flags
routing proof
corpus mapping
snapshot/file SHA-256
license scope
security redaction
```

If counts or protocol claims disagree with the live private source of truth, the export fails closed until corrected.
