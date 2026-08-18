# The Book of Answers — Batch 2 Buyer Data Extraction & Export Specification

**Status:** GOVERNING BUYER EXPORT SPECIFICATION — v2  
**Updated:** 18 August 2026  
**Scope:** Buyer-facing extraction of generation, machine-audit, native-human review, semantic-routing, reachability and corpus-provenance evidence.  
**Related:** `ANSWERS-BATCH2-CORPUS-ROUTING-REACHABILITY-IMPLEMENTATION-REPORT.md`, `ANSWERS-BATCH2-TECH-PILOT-COMPLETION-REPORT.md`, `ANSWERS-BATCH2-HUMAN-FIRST-REVIEW-CORRECTION.md`, `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md`.

---

## 1. Governing principle

Buyer exports preserve the complete evidence chain rather than flattening the project into a simple question/answer spreadsheet.

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
→ alias / typo / concept delta
→ deterministic reachability evidence
→ corpus promotion provenance where applicable
```

A buyer must be able to distinguish:

1. what the generating model produced;
2. what machine judges concluded before the human decision;
3. what the native-human reviewer decided;
4. what the final deployable answer became;
5. whether it is part of the clean benchmark denominator;
6. whether it is linked to the live canonical Book corpus;
7. whether realistic user language can reach it through the routing system.

**Benchmark eligibility and corpus usability are separate fields.** A row may be useful and live in the Book while still being excluded from benchmark statistics because of a provenance defect.

---

## 2. Record classes

### 2.1 `technical_pilot` — B2-0001 through B2-0020

These 20 records are genuine reviewed language data and are included in buyer delivery.

Current state:

```text
human_reviewed                 true
buyer_export_included          true
corpus_promotion_eligible      true
corpus_linked                  true
benchmark_metric_eligible      false
record_class                   technical_pilot
```

They are live in the canonical Book as answer IDs **949–968** at corpus revision **126**.

They remain excluded from the clean benchmark denominator because:

- the original immutable raw-draft records stored intended line breaks as escaped transport text instead of literal LF bytes;
- B2-0001 additionally had machine judgments exposed before its human decision during early reviewer development.

The defect is retained in provenance. The raw artifact is never rewritten to pretend the transport issue did not occur.

Technical-pilot review result:

```text
rows reviewed      20
ACCEPT               4
EDIT                 9
REWRITE              7
ChatGPT audits       20
Qwen audits          18
```

These figures may be presented as **technical-pilot observations only**. They must not be added to official clean Batch 2 edit-rate or human/machine-disagreement percentages.

### 2.2 `clean_metric`

Clean production rows must satisfy all governing integrity conditions, including:

```text
literal-LF-correct frozen raw draft
required machine judgments completed before human decision
machine judgments hidden until human decision
official append-only human review
final Thai hash integrity
post-human semantic enrichment
passing routing/reachability regression check
```

These rows can be both:

```text
benchmark_metric_eligible = true
corpus_linked = true after promotion
```

B2-0021–B2-1000 supply **980** clean original-source records.

### 2.3 Clean benchmark replacement set

To retain a clean 1,000-record benchmark denominator without rewriting B2-0001–B2-0020, create a separately frozen supplemental set of 20 replacement scenarios.

Recommended namespace:

```text
B2R-0001 → B2R-0020
```

These must have their own source-set version and immutable provenance.

The clean benchmark is therefore:

```text
B2-0021–B2-1000         980 clean original-source records
B2R-0001–B2R-0020        20 clean supplemental records
------------------------------------------------------
clean Batch 2 benchmark 1,000 records
```

The B2R records are benchmark replacements, not replacements for the live technical-pilot Book answers. They must never overwrite B2-0001–B2-0020.

---

## 3. Count language for buyers

The project has three different counts and they must not be collapsed.

### Canonical Book corpus target

When all original B2-0001–B2-1000 answers are promoted:

```text
Batch 1 canonical reviewed answers        948
Original Batch 2 canonical answers      1,000
----------------------------------------------
canonical reviewed Book corpus          1,948
```

The original Batch 2 count includes the 20 technical-pilot answers because they are valid reviewed Book content.

### Clean Batch 2 benchmark target

```text
clean original B2 rows                    980
clean B2R supplemental rows                20
----------------------------------------------
clean benchmark denominator             1,000
```

### Unique reviewed evidence if B2R is delivered too

If the supplemental B2R records are also included in the buyer evidence package:

```text
canonical Book corpus records           1,948
additional clean benchmark-only B2R        20
----------------------------------------------
unique reviewed records available       1,968
```

Do not call all 1,968 “corpus rows” unless B2R is later deliberately promoted too.

Do not call the 20 technical rows “extra records” on top of the 1,948 canonical corpus; they are already part of the original 1,000 Batch 2 Book rows and are surfaced separately only as a provenance/evidence view.

---

## 4. Canonical buyer bundle

Recommended delivery layout:

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
│   ├── batch2_clean_benchmark.jsonl
│   ├── batch2_clean_benchmark.csv
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
└── technical_pilot/
    ├── B2-0001-B2-0020.jsonl
    └── TECHNICAL-PILOT-NOTE.md
```

JSONL is the canonical row-oriented buyer format. CSVs are convenience projections.

A technical-pilot row may appear both in `corpus/` and in `technical_pilot/`; that is two views of the same canonical record, not two separate records.

---

## 5. Server-side source-of-truth extraction

Buyer extraction is performed from private canonical data, never from browser state or manually copied review screens.

Primary sources:

```text
private.batch2_sources
  scenario, ordinal, domain, intended focus, CARE flag, source-set provenance

private.batch2_raw_drafts
  frozen raw Thai, model/provider/snapshot, generation timestamp, raw hash

private.batch2_ai_audits
  ChatGPT and Qwen diagnosis evidence

private.batch2_human_reviews
  clean metric-eligible native-human decisions

public.answers_thai_reviews
  original B2-0001–B2-0020 technical decisions only

private.batch2_deploy_reviews
  private deployment compatibility view across clean and technical reviewed rows

private.batch2_semantic_staging
  English, topics/focus/support/helpers, dictionary delta, probes, semantic hash

private.batch2_routing_checks
  deterministic pre-promotion routing and regression evidence

private.batch2_promotions
  atomic promotion provenance and promotion class

private.batch2_answer_map
  B2 source ID → canonical answer ID → corpus revision

private.answer_corpus_revisions
private.answer_routing_assets
  canonical corpus and routing revision evidence

private.batch2_buyer_export_snapshots
  immutable/internal export-QA snapshots
```

Internal secrets, service-role keys, JWTs, private admin URLs and user-account identifiers are never included in buyer exports.

---

## 6. Canonical JSONL record contract

Top-level structure:

```json
{
  "schema_version": "ANSWERS-B2-BUYER-v1",
  "record_id": "B2-0001",
  "record_class": "technical_pilot",
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

Required fields:

```text
buyer_export_included
benchmark_metric_eligible
corpus_promotion_eligible
corpus_linked
exclusion_reason
human_first_protocol_compliant
raw_transport_integrity
```

For current B2-0001–B2-0020:

```text
buyer_export_included       true
benchmark_metric_eligible   false
corpus_promotion_eligible   true
corpus_linked               true
raw_transport_integrity     escaped_linebreak_transport
```

B2-0001 has `human_first_protocol_compliant=false`; B2-0002–B2-0020 are true.

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

Historical blind assignment is provenance only and must not be interpreted as current reviewer visibility.

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

For technical-pilot rows, retain the actual escaped-linebreak raw value and optionally include:

```text
normalized_display_thai
```

The normalized display field is convenience text only and never replaces the immutable raw artifact or hash.

### `machine_judgments[]`

One object per audit:

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

Machine diagnosis is evidence, not ground truth.

### `human_review`

```text
decision         ACCEPT | EDIT | REWRITE
final_thai
final_sha256
reviewed_at
reviewer_class   native_thai_human
reviewer_id      buyer-safe pseudonymous identifier
```

Never export Supabase auth UUIDs.

### `sequence_proof`

```text
all_required_machine_audits_completed_before_human_review
machine_results_hidden_until_human_decision
human_first_protocol_compliant
last_machine_audit_at
human_reviewed_at
seconds_between_last_machine_audit_and_human_review
```

Timestamp order alone does not prove blindness. Visibility compliance comes from the recorded review protocol state.

### `deployment`

After promotion:

```json
{
  "english": "...",
  "semantics": {
    "topics": [],
    "focus": [],
    "support": [],
    "helpers": [],
    "is_universal": false
  },
  "dictionary_changes": {},
  "reachability": {
    "index_reachable": true,
    "parser_reachable": true,
    "source_scenario_reaches_answer": true,
    "probe_count": 0,
    "probe_failures": 0,
    "care_intercepted": false
  },
  "publication": {
    "canonical_answer_id": 949,
    "corpus_revision": 126,
    "promotion_class": "technical_pilot",
    "dictionary_sha256": "...",
    "routing_index_sha256": "...",
    "promotion_sha256": "..."
  }
}
```

For a clean row before promotion, `deployment.publication` remains null/pending even if the human review is complete.

---

## 7. CSV projections

At minimum provide:

```text
batch2_records.csv
raw_drafts.csv
machine_audits.csv
human_reviews.csv
routing_semantics.csv
dictionary_changes.csv
reachability_probes.csv
```

Arrays are encoded as stable JSON arrays in CSV cells rather than ad-hoc comma-joined strings.

Every flat record view includes both:

```text
benchmark_metric_eligible
corpus_linked
```

so a buyer cannot accidentally infer one from the other.

---

## 8. Official aggregate metrics

All official Batch 2 percentages use only:

```text
benchmark_metric_eligible = true
```

The clean report includes:

### Native-human decision distribution

```text
eligible records
ACCEPT count / rate
EDIT count / rate
REWRITE count / rate
```

### Machine audit distributions

For ChatGPT and Qwen separately:

```text
audited count
fluent
minor_problem
major_problem
not_acceptable
mean / median audit_index where useful
```

Qwen denominators are always explicit because Qwen is selected under a frozen escalation/calibration rule rather than necessarily applied to every row.

### Human ↔ machine matrices

For each machine judge independently:

```text
machine fluent       × human ACCEPT / EDIT / REWRITE
machine minor        × human ACCEPT / EDIT / REWRITE
machine major        × human ACCEPT / EDIT / REWRITE
machine unacceptable × human ACCEPT / EDIT / REWRITE
```

Do not merge ChatGPT and Qwen into a synthetic judge unless a separately versioned analysis explicitly defines that transformation.

Technical-pilot observations appear in a separately labeled table and never modify these denominators.

---

## 9. Routing / reachability evidence

A buyer-facing routing summary includes:

```text
canonical answers linked
index-reachable answers
parser-probe reachable answers
source-scenario reachability
semantic-zero count
alias/typo collision count
Batch 1 regression count
new concepts / aliases / typos by corpus revision
```

Row-level probe exports preserve the actual query, parsed semantic lanes, selected route tier and whether the target answer was present in the eligible pool.

“Reachable” means eligible-pool membership under the production router; it does not claim that random answer selection must choose that row on every invocation.

---

## 10. Internal export-preview checkpoint

After every successful 20-row promotion:

```text
VERIFY LIVE
→ generate/update private buyer-export snapshot
→ verify snapshot row count + hashes
→ only then prepare the next 20
```

The first completed preview is:

```text
snapshot_name      ANSWERS-B2-TECH-PILOT-v1-preview
schema_version     ANSWERS-B2-BUYER-v1
record_class       technical_pilot
row_count          20
corpus_revision    126
snapshot SHA-256   6a6e0ca0d51b3d342d0f4a14521df5466c6f8e0e8b9d3c94fe7bff4c4ee92a2d
```

It is stored privately in `private.batch2_buyer_export_snapshots` and is an internal QA artifact, not a public file.

The same schema is used for clean units so export defects are discovered during production rather than at final buyer delivery.

---

## 11. Hash and integrity rules

Exports record the hash algorithm explicitly.

Do not relabel stored MD5 values as SHA-256.

For Batch 2 promotion proof, candidate dictionary/index/semantic hashes use PostgreSQL canonical JSONB text SHA-256 so the validator and atomic promotion gate compare the same byte representation.

Buyer bundles include a top-level `SHA256SUMS` for delivered files in addition to row-level provenance hashes.

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

Use a buyer-safe reviewer identifier such as:

```text
native_reviewer_01
```

with reviewer qualification described in the methodology document.

---

## 13. Current extraction checkpoint

As of 18 August 2026:

```text
canonical corpus revision                126
canonical active answers                 968
technical-pilot corpus-linked rows        20
technical rows in clean benchmark          0
first20 canonical answer IDs         949–968
technical export preview rows             20
next clean review unit             B2-0021–B2-0040
```

The governing cycle is:

```text
REVIEW 20
→ ENGLISH
→ ENRICH
→ VALIDATE
→ PROMOTE
→ VERIFY
→ EXPORT PREVIEW
→ NEXT 20
```
