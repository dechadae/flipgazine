# The Book of Answers — Batch 2 Buyer Data Extraction & Export Specification

**Status:** GOVERNING BUYER EXPORT SPECIFICATION  
**Date:** 18 August 2026  
**Scope:** Buyer-facing extraction of Batch 2 generation, machine-audit, native-human review, semantic-routing and corpus-reachability evidence.  
**Related:** `ANSWERS-BATCH2-TECH-PILOT-COMPLETION-REPORT.md`, `ANSWERS-BATCH2-HUMAN-FIRST-REVIEW-CORRECTION.md`, `ANSWERS-BATCH2-CORPUS-ROUTING-REACHABILITY-IMPLEMENTATION-REPORT.md`, `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md`.

---

## 1. Governing principle

Buyer exports must preserve the complete evidence chain rather than flattening Batch 2 into a simple question/answer spreadsheet.

The canonical row lineage is:

```text
frozen scenario
→ frozen AI draft
→ pre-human ChatGPT diagnosis
→ required/selected pre-human Qwen diagnosis
→ native-human ACCEPT / EDIT / REWRITE
→ final Thai
→ English adaptation
→ semantic routing tags
→ alias / typo / concept delta
→ deterministic reachability evidence
→ corpus promotion provenance
```

The export must let a buyer distinguish:

1. what the generating model originally produced;
2. what machine judges thought before the native-human decision;
3. what the native-human reviewer independently decided;
4. what the final deployable answer became;
5. whether that final answer is actually reachable through the live Batch 1 routing system.

No buyer file may imply that machine judgments were human labels or that technical-pilot rows are part of the clean benchmark denominator.

---

## 2. Record classes and denominator policy

Batch 2 buyer delivery has two explicit record classes.

### 2.1 Technical-pilot evidence — B2-0001 through B2-0020

These 20 rows **are included in the buyer package** because they contain genuine generation, machine-audit and native-human review evidence.

They are marked:

```text
record_class                 technical_pilot
human_reviewed               true
buyer_export_included        true
benchmark_metric_eligible    false
corpus_promotion_eligible    false
```

Reason for benchmark exclusion:

- the original frozen raw write stored intended line breaks as escaped transport text rather than literal LF bytes;
- B2-0001 additionally had machine judgments exposed to the reviewer before the human-first visibility correction, so that row cannot support the independent-human-judgment claim;
- the provenance defect is preserved, never silently rewritten.

Technical-pilot completion state:

```text
rows reviewed     20 / 20
ACCEPT              4
EDIT                9
REWRITE             7
ChatGPT audits      20
Qwen audits         18
```

These figures may be shown descriptively as **technical-pilot observations**, but must not be mixed into official Batch 2 benchmark percentages.

### 2.2 Clean metric-eligible Batch 2

The commercial benchmark target remains **1,000 clean metric-eligible Batch 2 records**.

The original frozen `B2-SOURCESET-v1` still contains exactly 1,000 scenarios. B2-0001–B2-0020 are not deleted or rewritten. Therefore the clean 1,000-record buyer benchmark is built as:

```text
B2-0021 through B2-1000       980 clean original-source records
+ supplemental replacement     20 separately frozen clean records
=                              1,000 clean benchmark records
```

The replacement 20 must be created under a separate frozen supplemental source-set/version and a separate ID namespace; they must **not** overwrite B2-0001–B2-0020 or mutate `B2-SOURCESET-v1`. Recommended namespace: `B2R-0001` through `B2R-0020`.

Until that supplemental set is actually generated and frozen, exports must state the real current counts rather than presenting the future target as complete.

### 2.3 Final package count if Batch 1 is licensed together

When the clean Batch 2 target is complete, the combined commercial package can contain:

```text
Batch 1 canonical reviewed records       948
Batch 2 clean benchmark records        1,000
---------------------------------------------
commercially usable reviewed corpus    1,948

additional Batch 2 technical-pilot        20
---------------------------------------------
total reviewed records delivered       1,968
```

The extra 20 are evidence sidecar records and do not change the `1,948` usable-corpus headline.

---

## 3. Canonical buyer bundle

The recommended delivery layout is:

```text
answers-buyer-bundle/
│
├── README.md
├── METHODOLOGY.pdf
├── LICENSE.txt
├── SHA256SUMS
│
├── data/
│   ├── batch2_records.jsonl
│   ├── batch2_records.csv
│   ├── raw_drafts.csv
│   ├── machine_audits.csv
│   ├── human_reviews.csv
│   ├── routing_semantics.csv
│   ├── dictionary_changes.csv
│   └── reachability_probes.csv
│
├── evidence/
│   ├── benchmark_summary.json
│   ├── human_machine_comparison.json
│   ├── routing_summary.json
│   ├── corpus_manifest.json
│   └── export_manifest.json
│
└── technical_pilot/
    ├── B2-0001-B2-0020.jsonl
    └── TECHNICAL-PILOT-NOTE.md
```

`data/batch2_records.jsonl` is the canonical row-oriented buyer dataset. CSV files are convenience projections. The JSONL and manifest hashes are authoritative if a CSV projection differs because of formatting/escaping.

---

## 4. Source-of-truth extraction map

Buyer extraction must be performed server-side from private canonical data, never from browser state or manually copied review screens.

Primary sources:

```text
private.batch2_sources
  source scenario, ordinal, domain, intended_focus, care_case, source-set provenance

private.batch2_raw_drafts
  frozen raw Thai, provider/model/snapshot, generation timestamp, generation protocol, raw hash

private.batch2_ai_audits
  ChatGPT and Qwen pre-human diagnosis records, six scores, verdict, flags, rationale, confidence, timestamp

private.batch2_human_reviews
  official clean human decision, final Thai, final hash, reviewer timestamp

public.answers_thai_reviews
  B2-0001–B2-0020 technical-pilot human decisions only, review_round=batch2-tech-pilot-v1

private.batch2_semantic_staging
  English adaptation, topics/focus/support/helpers, universal flag, dictionary delta, probe questions, semantic hash

private.batch2_routing_checks
  candidate revision, source set, candidate dictionary/hash, candidate index/hash, zero-failure counters, probe results

private.batch2_promotions
  atomic promotion event and resulting corpus revision

private.batch2_answer_map
  Batch 2 source ID → canonical private.answers answer_id mapping

private.answer_corpus_revisions
  canonical corpus revision, corpus/index hashes and active answer count

private.answer_routing_assets
  canonical dictionary and routing index for the promoted revision
```

If future table names change, the export implementation may change internally, but the buyer schema in this document remains the compatibility contract unless explicitly versioned.

---

## 5. Canonical JSONL record schema

Each buyer record contains the following top-level objects.

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
  "deployment": null,
  "provenance": {}
}
```

### 5.1 `eligibility`

Required fields:

```text
buyer_export_included
benchmark_metric_eligible
corpus_promotion_eligible
exclusion_reason
human_first_protocol_compliant
raw_transport_integrity
```

Examples:

```json
{
  "buyer_export_included": true,
  "benchmark_metric_eligible": false,
  "corpus_promotion_eligible": false,
  "exclusion_reason": "technical_pilot_linebreak_transport_defect",
  "human_first_protocol_compliant": true,
  "raw_transport_integrity": "escaped_linebreak_transport"
}
```

For B2-0001 specifically, `human_first_protocol_compliant` must be `false` because machine judgments were exposed before the reviewer committed the decision.

### 5.2 `source`

Required fields:

```text
source_set_id
source_id
source_ordinal
domain
intended_focus
question_or_scenario
care_case
historical_blind_assignment
```

The historical blind assignment is provenance only. It must not imply current reviewer visibility because the governing human-first correction superseded the old assisted/blind UI design.

### 5.3 `generation`

Required fields:

```text
provider
model
model_snapshot
generation_protocol_version
generated_at
raw_thai
raw_sha256
```

For clean rows, `raw_thai` must contain literal LF line breaks and the exported hash must match the frozen canonical draft.

For technical-pilot rows, preserve the actual raw-storage defect in provenance. Buyer-facing convenience text may additionally include `normalized_display_thai`, but it must never replace `raw_thai` or its hash.

### 5.4 `machine_judgments[]`

One object per pre-human machine audit.

Required fields:

```text
judge
provider
model
stage
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

Machine judgments remain diagnosis-only evidence. They must not be exported as ground truth.

### 5.5 `human_review`

Required fields:

```text
decision                  ACCEPT | EDIT | REWRITE
final_thai
final_sha256
reviewed_at
reviewer_class             native_thai_human
```

Do not export the Supabase `auth.users` UUID or private account identifiers to buyers. If a stable reviewer identifier is needed, use a buyer-safe pseudonymous ID such as `native_reviewer_01` plus the methodology document that defines reviewer qualification.

For `ACCEPT`, clean official rows must satisfy:

```text
final_thai == raw_thai
final_sha256 == raw_sha256
```

For technical-pilot rows, comparison uses the documented normalized-display copy because the original transport defect is the reason those rows are excluded from the clean denominator.

### 5.6 `sequence_proof`

Required fields:

```text
generation_completed_before_machine_audit
all_required_machine_audits_completed_before_human_review
machine_results_hidden_until_human_decision
human_first_protocol_compliant
last_machine_audit_at
human_reviewed_at
seconds_between_last_machine_audit_and_human_review
```

The timestamp relation alone does **not** prove blindness. `machine_results_hidden_until_human_decision` comes from the governing review-lane/protocol state.

For B2-0001 the value is false. For clean Batch 2 rows it must be true to remain metric eligible.

### 5.7 `deployment`

`deployment` is `null` until a clean row has passed post-human enrichment and corpus promotion.

After promotion it contains:

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
  "dictionary_changes": {
    "concepts": [],
    "aliases": [],
    "typos": []
  },
  "reachability": {
    "index_reachable": true,
    "parser_reachable": true,
    "source_scenario_probe_applicable": true,
    "source_scenario_reaches_answer": true,
    "probe_count": 0,
    "probe_failures": 0,
    "care_intercepted": false
  },
  "publication": {
    "canonical_answer_id": 0,
    "corpus_revision": 0,
    "corpus_md5": "...",
    "routing_index_md5": "..."
  }
}
```

The buyer-facing field names may use SHA-256 in a future export version, but they must accurately reflect the actual canonical hash algorithm stored for the corpus/index revision. Do not relabel an MD5 as SHA-256.

### 5.8 `provenance`

Required fields should include protocol IDs and immutable lineage references without exposing internal secrets:

```text
generation_protocol
self_audit_protocol
qwen_audit_protocol
human_first_correction_version
source_set_version
review_lane
semantic_export_version
buyer_schema_version
```

Internal database URLs, service-role keys, JWTs, private admin URLs and reviewer auth identifiers are never exported.

---

## 6. CSV projections

### 6.1 `batch2_records.csv`

One row per buyer record with flattened high-value fields:

```text
record_id
record_class
benchmark_metric_eligible
corpus_promotion_eligible
exclusion_reason
domain
intended_focus
scenario
care_case
provider
model
model_snapshot
raw_thai
raw_sha256
human_decision
final_thai
final_sha256
human_reviewed_at
human_first_protocol_compliant
canonical_answer_id
corpus_revision
```

### 6.2 `raw_drafts.csv`

```text
record_id
provider
model
model_snapshot
generation_protocol
generated_at
raw_thai
raw_sha256
raw_transport_integrity
```

### 6.3 `machine_audits.csv`

One row per audit, not one row per record:

```text
record_id
judge
model
stage
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

### 6.4 `human_reviews.csv`

```text
record_id
record_class
decision
final_thai
final_sha256
reviewed_at
reviewer_class
human_first_protocol_compliant
benchmark_metric_eligible
```

### 6.5 `routing_semantics.csv`

One row per promoted clean record:

```text
record_id
canonical_answer_id
english
topics
focus
support
helpers
is_universal
corpus_revision
```

Arrays should be encoded as stable JSON arrays inside CSV cells rather than ad-hoc comma joining.

### 6.6 `dictionary_changes.csv`

One row per approved concept/alias/typo delta:

```text
record_id_or_unit
change_type                concept | alias | typo
concept_id
surface_form
concept_kind
source_question_evidence
corpus_revision
```

### 6.7 `reachability_probes.csv`

One row per deterministic probe:

```text
record_id
probe_type
probe_question
parsed_focus
parsed_support
parsed_topics
parsed_helpers
route_tier
eligible_contains_answer
care_intercepted
corpus_revision
```

---

## 7. Buyer aggregate evidence

The export must calculate official aggregates using **only `benchmark_metric_eligible=true` clean rows**.

### 7.1 Native-human decision distribution

```text
eligible records
ACCEPT count / rate
EDIT count / rate
REWRITE count / rate
```

### 7.2 Machine audit distribution

For ChatGPT and Qwen separately:

```text
audited count
fluent
minor_problem
major_problem
not_acceptable
mean / median audit_index where appropriate
```

Qwen denominators must be explicit because not every row is necessarily selected under the frozen escalation rule.

### 7.3 Human ↔ machine comparison matrix

At minimum:

```text
machine fluent      × human ACCEPT / EDIT / REWRITE
machine minor       × human ACCEPT / EDIT / REWRITE
machine major       × human ACCEPT / EDIT / REWRITE
machine unacceptable× human ACCEPT / EDIT / REWRITE
```

Run separately for ChatGPT self-audit and Qwen external audit.

Do not collapse the two machine judges into one synthetic score unless a separately versioned analysis explicitly defines that operation.

### 7.4 Six-dimension disagreement analysis

Buyer analysis should preserve the six frozen dimensions:

```text
Intent                  20%
Thai pragmatics         25%
BFF voice               20%
Lexical / social fit    15%
Stance                  10%
Composition             10%
```

The most commercially useful analysis is not simply “AI accuracy”; it is where machine high-confidence judgments still required native-human EDIT or REWRITE, and where a machine flagged a problem but the native human ACCEPTED the draft.

### 7.5 Technical-pilot observations

B2-0001–B2-0020 may have their own clearly labeled table such as:

```text
TECHNICAL PILOT — EXCLUDED FROM OFFICIAL BENCHMARK METRICS
rows 20 | ACCEPT 4 | EDIT 9 | REWRITE 7
```

Any further percentages must carry the same exclusion label.

---

## 8. Routing and reachability aggregate export

For the clean promoted corpus, buyer evidence should include:

```text
promoted clean Batch 2 answers
index-reachable count
parser-to-pool reachable count
unreachable count
source-scenario probe pass count / applicable count
new concepts
new aliases
new typos
normalized alias/typo collisions
Batch 1 routing regressions
```

Target invariants after every 20-row promotion and therefore in the final export:

```text
index-unreachable active answers          0
parser-probe-unreachable promoted rows    0
normalized alias/typo collisions          0
Batch 1 dictionary regressions            0
semantic-zero promoted rows               0
```

Runtime CARE interceptions are reported separately rather than treated as routing failures.

---

## 9. Export manifest and hashing

Every delivered bundle must include `export_manifest.json` and `SHA256SUMS`.

`export_manifest.json` should include:

```text
buyer_schema_version
export_created_at
source corpus revision(s)
Batch 1 included count
Batch 2 clean metric-eligible included count
technical-pilot included count
excluded count and reasons
file list
per-file byte size
per-file SHA-256
JSONL record count
CSV row counts
protocol document versions / hashes where available
```

The manifest itself should also be hashed and included in `SHA256SUMS`.

If a buyer receives an updated export, create a new immutable export version rather than overwriting the old manifest.

---

## 10. Privacy and security redaction

Buyer extraction must never expose operational credentials or unnecessary personal identifiers.

Do not export:

```text
Supabase service-role / secret keys
JWTs
session IDs
reviewer auth.users UUID
private database connection strings
internal Edge Function secrets
private admin URLs that grant operational access
Groq/OpenAI credentials
```

Reviewer identity should be represented only to the level required by the commercial methodology/license. Default buyer-safe representation:

```text
reviewer_class = native_thai_human
reviewer_id    = native_reviewer_01
```

If a buyer contract requires named reviewer attribution, provide it through the commercial agreement/methodology rather than leaking internal account identifiers into the dataset.

---

## 11. Example — technical pilot record

Conceptual B2-0001 export:

```json
{
  "schema_version": "ANSWERS-B2-BUYER-v1",
  "record_id": "B2-0001",
  "record_class": "technical_pilot",
  "eligibility": {
    "buyer_export_included": true,
    "benchmark_metric_eligible": false,
    "corpus_promotion_eligible": false,
    "exclusion_reason": "technical_pilot_linebreak_transport_defect; machine_visibility_exception",
    "human_first_protocol_compliant": false,
    "raw_transport_integrity": "escaped_linebreak_transport"
  },
  "source": {
    "domain": "relationship",
    "intended_focus": "situationship",
    "question_or_scenario": "คุยกับเขามาสองเดือนแล้ว แต่เขายังไม่เคยชวนเจอ เราควรถามตรง ๆ ไหม",
    "care_case": false
  },
  "generation": {
    "provider": "OpenAI",
    "model": "GPT-5.6 Sol",
    "generation_protocol_version": "B2-GEN-v1",
    "raw_thai": "สองเดือนแล้ว\\nยังไม่ชวนเจอ\\nถามค่ะ\\nจะได้เลิกคุยกับความหวัง",
    "raw_sha256": "609f44e8298600ce91081e527112a6335f9e326eb244de1cd833dac521a3a034"
  },
  "human_review": {
    "decision": "EDIT",
    "final_thai": "คุยมาสองเดือนละ\nยังไม่ชวนเจอ\nถามค่ะ\nจะได้เลิกคุยกับความหวัง",
    "reviewer_class": "native_thai_human"
  },
  "deployment": null
}
```

The raw escaped transport form is preserved because it is the evidence defect. The human-reviewed display/final form uses real line breaks. The row remains useful to buyers without being misrepresented as clean benchmark evidence.

---

## 12. Example — clean promoted record

A clean official row after human review and promotion should conceptually look like:

```json
{
  "schema_version": "ANSWERS-B2-BUYER-v1",
  "record_id": "B2-0021",
  "record_class": "clean_benchmark",
  "eligibility": {
    "buyer_export_included": true,
    "benchmark_metric_eligible": true,
    "corpus_promotion_eligible": true,
    "exclusion_reason": null,
    "human_first_protocol_compliant": true,
    "raw_transport_integrity": "literal_lf_verified"
  },
  "generation": {
    "raw_thai": "...",
    "raw_sha256": "..."
  },
  "machine_judgments": [
    {"judge": "chatgpt_self", "stage": "pre_human"},
    {"judge": "qwen_external", "stage": "pre_human"}
  ],
  "human_review": {
    "decision": "EDIT",
    "final_thai": "...",
    "final_sha256": "..."
  },
  "sequence_proof": {
    "all_required_machine_audits_completed_before_human_review": true,
    "machine_results_hidden_until_human_decision": true,
    "human_first_protocol_compliant": true
  },
  "deployment": {
    "english": "...",
    "semantics": {
      "topics": ["relationship"],
      "focus": ["situationship"],
      "support": [],
      "helpers": ["decision"],
      "is_universal": false
    },
    "dictionary_changes": {
      "concepts": [],
      "aliases": [],
      "typos": []
    },
    "reachability": {
      "index_reachable": true,
      "parser_reachable": true,
      "probe_failures": 0
    },
    "publication": {
      "canonical_answer_id": 0,
      "corpus_revision": 0
    }
  }
}
```

The example values for semantic tags and answer IDs are illustrative until the row is actually reviewed, enriched and promoted. Buyer exports must use only persisted canonical values.

---

## 13. Extraction timing

Do not wait until all 1,000 clean records are finished to test extraction.

After each promoted 20-row clean unit:

```text
review 20
→ enrich 20
→ validate 20
→ promote 20
→ verify 20
→ generate/update an internal export preview
```

Internal preview exports are QA artifacts, not buyer deliveries. They should use the same schema as the eventual buyer bundle so export bugs are detected early.

The first official preview should be generated after B2-0021–B2-0040 passes semantic enrichment, routing validation and promotion.

---

## 14. Commercial claim boundary

Approved claim form once the target is complete:

> 1,000 clean Batch 2 Thai records generated under a frozen protocol, machine-audited before review, independently judged by a native Thai human under a human-first sealed-review workflow, and validated for semantic reachability in the production routing system. An additional 20 reviewed technical-pilot records are supplied as excluded methodological evidence.

Do not claim:

- that the technical pilot is part of the clean 1,000 denominator;
- that Qwen audited every row unless the actual selection count is 1,000;
- that machine verdicts are ground truth;
- that a timestamp alone proves blind review;
- that a technical-pilot row passed production reachability when it was never promoted;
- that the original frozen 1,000-source set was silently repaired or replaced.

---

## 15. Current checkpoint

As of 18 August 2026:

```text
B2-0001–B2-0020
  human review complete        20 / 20
  ACCEPT                        4
  EDIT                          9
  REWRITE                       7
  buyer export included        yes
  benchmark denominator        no
  corpus promotion             no

B2-0021–B2-0040
  first clean metric unit      active
  official human review        in progress / not yet complete at this checkpoint
```

This specification governs how those records and all later Batch 2 rows are extracted for buyers.