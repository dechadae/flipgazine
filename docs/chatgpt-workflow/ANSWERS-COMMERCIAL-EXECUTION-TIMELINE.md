# The Book of Answers — Commercial Execution Timeline

**Status:** ACTIVE MASTER EXECUTION PLAN — PUBLIC DEMONSTRATOR COMPLETE · BATCH 2 PRODUCTION ACTIVE · OUTREACH READY  
**Created:** 17 August 2026  
**Reconciled:** 18 August 2026 · 19:56 ICT  
**Project:** Flipgazine / The Book of Answers  
**Repository:** `dechadae/flipgazine`  
**Supabase:** `sjpvhgxacsiorrtijqua`  
**Commercial strategy authority:** `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md`  
**Current Batch 2 implementation authority:** `ANSWERS-BATCH2-CORPUS-ROUTING-REACHABILITY-IMPLEMENTATION-REPORT.md`  
**Human-first authority:** `ANSWERS-BATCH2-HUMAN-FIRST-REVIEW-CORRECTION.md`  
**Buyer export authority:** `ANSWERS-BATCH2-BUYER-DATA-EXTRACTION-SPEC.md`  
**Technical pilot record:** `ANSWERS-BATCH2-TECH-PILOT-COMPLETION-REPORT.md`  
**Public benchmark acceptance:** `ANSWERS-VOICE-BENCHMARK-ACCEPTANCE-2026-08-18.md`  
**Security migration acceptance:** `ANSWERS-PRIVATE-SERVER-PHASE-I-ACCEPTANCE-REPORT.md` + Phase J/K cutover records

---

# 1. Executive status

The project is materially ahead of the previous 18 August schedule.

The old master timeline still described the Batch 2 audit layer as planning-only and expected source freeze, audit implementation and the first real pilot to occupy 18–21 August. Those gates are now complete.

Completed before the end of 18 August:

```text
private-server security migration
Voice methodology/public benchmark
36-case editor-grounded evaluator calibration
Qwen3.6-27B production judge selection
1,000-row Batch 2 source-set freeze
Batch 2 audit/provenance/Qwen infrastructure
100% human-first reviewer correction
routing / reachability / atomic-promotion infrastructure
buyer-export checkpoint infrastructure
B2-0001–B2-0020 native-human technical review
B2-0001–B2-0020 English + semantic enrichment
B2-0001–B2-0020 deterministic routing validation
B2-0001–B2-0020 canonical corpus promotion
first internal buyer-export preview
first clean production unit B2-0021–B2-0040 generated + self-audited
```

The project therefore has three active tracks from this point:

```text
TRACK A — OpenAI corpus/evaluation outreach
TRACK B — Thai + SEA LLM benchmark/rubric outreach
TRACK C — complete the clean Batch 2 production corpus
```

The main schedule risk is no longer infrastructure. It is the throughput of the single native-human review authority across the remaining clean records.

---

# 2. Planned vs actual reconciliation

| Workstream | Previous plan | Actual by 18 Aug 19:56 ICT | Timeline action |
|---|---|---|---|
| Private-server security gate | Complete before commercialization | ✅ Complete 17 Aug | **DONE — remove as dependency** |
| Voice benchmark | Complete before outreach | ✅ Complete 18 Aug | **DONE** |
| 36-case calibration | Complete before judge choice | ✅ Complete 18 Aug | **DONE** |
| Evaluator selection | Choose sufficiently reliable judge | ✅ Qwen3.6-27B selected and accepted | **DONE** |
| Batch 2 audit implementation | Previously “not yet built” | ✅ Implemented 18 Aug | **DONE — old planning status superseded** |
| Freeze 1,000 Batch 2 sources | 18–20 Aug | ✅ 1,000 frozen 18 Aug | **DONE ~2 days early** |
| Historical blind-control lane | 10% reviewer-visibility control | Superseded by 100% human-first visibility; historical assignment retained only as provenance | **REMOVE from active review dependency/analysis** |
| 20-row pilot | Before scale | ✅ Technical B2-0001–0020 completed full cycle 18 Aug | **DONE, non-metric** |
| Pilot corpus promotion | Not originally scheduled as pilot requirement | ✅ IDs 949–968 live at revision 126 | **DONE** |
| Buyer export QA | Previously mostly final-package work | ✅ First 20-row preview frozen | **MOVE into every 20-row cycle** |
| Raw Batch 2 generation | 20–21 Aug after pilot | ✅ 40 raw drafts exist: 20 technical + 20 clean | **AHEAD; continue only one clean unit at a time** |
| Clean human review | 21 Aug–3 Sep | First clean unit B2-0021–0040 active; 0/20 human decisions at live check | **Start immediately; target completion 4 Sep** |
| English adaptation | 21 Aug–4 Sep as parallel phase | Technical 20 already completed; production design now requires English immediately after each settled 20 | **ABSORB INTO UNIT CYCLE** |
| Batch 2 QA | 4–6 Sep end-of-batch | Routing/regression/export QA now happens after every 20 | **CONTINUOUS; retain one final package-integrity pass** |
| Blind-control analysis | 6–8 Sep | Reviewer-visibility experiment superseded | **REPLACE with clean human↔machine + cross-batch analysis** |
| Full suite assembly | 8–10 Sep | No change in final objective; less QA tail now | **Working target 7–9 Sep** |
| Completion update | 9–10 Sep | Still valid | **KEEP 9–10 Sep** |
| Initial outreach | 19–20 Aug | Demonstrator and evidence gates are already clear | **KEEP / BEGIN 19 Aug** |

---

# 3. Current live checkpoint

Live Supabase state checked during this reconciliation:

```text
canonical corpus revision              126
active canonical answers               968
Batch 1 canonical answers              948
technical B2 answers corpus-linked       20
B2-0001 → B2-0020 answer IDs        949–968
frozen Batch 2 source scenarios       1,000
raw Batch 2 drafts                       40
internal buyer-export snapshots           1
```

Technical pilot B2-0001–B2-0020:

```text
human reviewed                         20 / 20
ACCEPT                                      4
EDIT                                        9
REWRITE                                     7
benchmark_metric_eligible                   0
corpus linked                              20
routing/index unreachable                   0
surface collisions                          0
buyer preview                              yes
```

Current clean production unit B2-0021–B2-0040:

```text
frozen raw drafts                         20 / 20
ChatGPT pre-human self-audits             20 / 20
Qwen external audits currently recorded      12
human reviews                              0 / 20
semantic staging                           0 / 20
corpus mappings                            0 / 20
```

Any Qwen escalations still required by the frozen rule must finish and remain sealed before the corresponding first human decision. The reviewer service, not the human reviewer, owns that prerequisite.

---

# 4. Governing production order from now on

The previous timeline treated human review, English, QA and freeze as mostly separate broad phases. The implemented system has a safer and more useful dependency chain.

Every production unit is exactly 20 records:

```text
GENERATE / FREEZE NEXT 20
→ ChatGPT diagnosis sealed
→ required/selected Qwen diagnosis sealed
→ HUMAN REVIEW 20
→ final Thai frozen
→ reveal machine comparison
→ English adaptation from final Thai
→ Batch 1-compatible semantic enrichment
→ dictionary alias / typo / concept changes only where justified
→ realistic route probes
→ deterministic routing + Batch 1 regression validation
→ atomic 20-row corpus/dictionary/index promotion
→ verify live revision + mappings + reachability
→ update internal buyer-export preview
→ only then prepare the next 20
```

Short form:

> **REVIEW 20 → ENGLISH → ENRICH → VALIDATE → PROMOTE → VERIFY → EXPORT PREVIEW → NEXT 20**

Do not pre-generate the remaining corpus in bulk. This keeps errors, routing drift and export defects bounded to one 20-row unit.

---

# 5. Count model that governs commercialization

The timeline now distinguishes three legitimate final counts.

## Canonical Book corpus

```text
Batch 1 canonical answers                   948
Original Batch 2 B2-0001–B2-1000          1,000
------------------------------------------------
canonical reviewed Book corpus             1,948
```

The 20 technical-pilot answers are already part of this original 1,000 and are valid Book content even though they are excluded from clean benchmark metrics.

## Clean Batch 2 benchmark

```text
B2-0021–B2-1000                              980
B2R-0001–B2R-0020 supplemental               20
------------------------------------------------
clean Batch 2 benchmark                    1,000
```

## Unique reviewed evidence if B2R is delivered

```text
canonical corpus records                   1,948
additional benchmark-only B2R                 20
------------------------------------------------
unique reviewed evidence                   1,968
```

Do not describe 1,968 as the canonical Book corpus unless B2R is later deliberately promoted.

---

# 6. Revised milestone calendar

| Date | Milestone / status |
|---|---|
| **17 Aug** | ✅ Private-server migration/security acceptance complete |
| **18 Aug** | ✅ Voice benchmark, calibration, evaluator selection and public acceptance complete |
| **18 Aug** | ✅ 1,000 Batch 2 source set frozen; audit/Qwen/provenance infrastructure complete |
| **18 Aug** | ✅ Human-first review correction live; historical blind assignment retained only as provenance |
| **18 Aug** | ✅ Routing/reachability/atomic-promotion + buyer-export checkpoint infrastructure complete |
| **18 Aug** | ✅ B2-0001–0020 technical pilot fully reviewed, enriched, validated, promoted; corpus revision 126 / 968 active |
| **18 Aug** | ✅ First buyer preview frozen; B2-0021–0040 raw + ChatGPT audit stage complete; clean human review is next |
| **19 Aug** | **Begin OpenAI and Thai/SEA outreach in parallel**; do not wait for Batch 2 completion |
| **19 Aug–4 Sep** | Complete the 50 clean metric units: 49 original clean 20-row units + 1 B2R supplemental unit |
| **By 1 Sep** | Freeze the separate 20-row B2R source set before its generation; do not overwrite technical IDs |
| **5 Sep** | Final clean-benchmark/package-integrity verification after all unit-level QA is already complete |
| **5–7 Sep** | Cross-batch analysis + human↔machine analysis + technical-pilot appendix |
| **7–9 Sep** | Assemble complete commercial suite and buyer-ready manifests/data card/methodology |
| **9–10 Sep** | Send substantive Batch 2 completion update to active OpenAI + Thai/SEA conversations |
| **Sep onward** | Technical/commercial follow-up; benchmark/rubric work may proceed independently of corpus licensing |

Dates remain working targets. Integrity gates outrank calendar cosmetics.

---

# 7. Clean Batch 2 throughput plan

There are **50 clean metric units** of 20 rows:

```text
49 units = B2-0021–B2-1000 = 980 rows
 1 unit  = B2R-0001–B2R-0020 = 20 rows
----------------------------------------
50 units = clean benchmark = 1,000 rows
```

A 19 August–4 September production window requires approximately **3 complete 20-row cycles per active review day** on average.

This is a capacity target, not a quota. If human review needs more time, move the analysis/package dates rather than weaken review quality or skip the per-unit gates.

Suggested capacity bands:

| Working window | Clean production target | Approximate source range |
|---|---:|---|
| **19–23 Aug** | ~15 units / 300 rows | B2-0021 through about B2-0320 |
| **24–28 Aug** | ~15 units / 300 rows | about B2-0321 through B2-0620 |
| **29 Aug–2 Sep** | ~15 units / 300 rows | about B2-0621 through B2-0920 |
| **3–4 Sep** | remaining 4 original units + B2R unit / ~100 rows | B2-0921–1000 + B2R-0001–0020 |

Do not force source ranges to these dates if review judgment requires slower work. The authoritative progress measure is **fully completed/promoted 20-row cycles**, not drafts generated.

---

# 8. Track A — OpenAI outreach

## Start

**19 August 2026.**

This is no longer dependent on any unfinished technical gate.

Present the strongest current evidence:

- live Book with private server-owned corpus;
- Voice methodology;
- working public benchmark;
- 36-case editor-grounded calibration;
- Qwen judge selection evidence;
- immutable Batch 1 provenance;
- active Batch 2 human-first methodology;
- complete technical first-20 evidence chain;
- canonical source→answer routing proof;
- first buyer-format export preview;
- clean B2-0021 onward production as work in progress.

Position Batch 2 correctly:

```text
one frozen ChatGPT draft
→ sealed machine diagnosis
→ native Thai ACCEPT / EDIT / REWRITE
→ final Thai
→ deployable bilingual/routing layer
→ buyer-verifiable provenance
```

Do not wait for the clean 1,000 before first contact. The completed clean Batch 2 becomes a substantive follow-up event.

---

# 9. Track B — Thai + Southeast Asian LLM outreach

## Start

**19 August 2026**, in parallel with OpenAI.

Lead with the public/evaluation asset rather than assuming corpus licensing:

```text
Book = language behavior in use
Voice = editorial methodology
Benchmark = test model output
Human layer = native pragmatic judgment and failure analysis
```

Primary discussion areas:

- Thai pragmatic evaluation;
- benchmark/rubric adaptation;
- organization-specific test sets;
- model-response failure analysis;
- native-human evaluation;
- contemporary Thai conversational/register work.

Do not default to offering the historical OpenAI-assisted corpus as unrestricted third-party training data for competing models.

No OpenAI exclusivity dependency exists.

---

# 10. Track C — clean Batch 2 production

## Immediate active gate

**B2-0021–B2-0040.**

Required next sequence:

```text
finish any still-required sealed Qwen evidence
→ native-human review 20/20
→ English + semantics
→ reachability/regression validation
→ atomic promotion
→ verify corpus revision 127 and 20 new mappings if the unit passes unchanged
→ buyer-export preview checkpoint
→ prepare B2-0041–B2-0060
```

The expected revision/count increments are planning arithmetic only; live verification after every promotion remains authoritative.

## Continuous unit QA

For every 20-row unit require:

```text
20 human decisions
20 final Thai hashes
20 English adaptations
0 semantic-zero rows
0 literal escaped-linebreak defects
0 unknown semantic keys
0 normalized alias/typo ownership collisions
0 active index-unreachable answers
0 new-answer parser-probe failures
0 Batch 1 dictionary/routing regressions
passing canonical dictionary/index/semantic hashes
20 source→answer mappings after promotion
buyer snapshot/checkpoint updated
```

A failed unit does not advance to the next 20 until corrected and revalidated.

---

# 11. B2R supplemental clean unit

The technical first 20 stay permanently preserved as B2-0001–B2-0020 and remain in the canonical Book.

To create the official clean 1,000-record benchmark denominator, add one separately frozen replacement unit:

```text
B2R-0001–B2R-0020
```

Dependency order:

```text
create separate 20-scenario B2R source set
→ freeze its own source-set version + hashes
→ use the same clean human-first generation/audit/review protocol
→ complete the same 20-row enrichment/validation/export cycle
→ count in clean benchmark metrics
```

B2R must never overwrite, renumber or cosmetically repair the technical-pilot provenance.

Unless later deliberately promoted, treat B2R as benchmark-only evidence rather than part of the 1,948 canonical Book count.

---

# 12. Final analysis — revised dependency

## Target

**5–7 September 2026**, only after the full clean 1,000 denominator is complete and frozen.

The old timeline mentioned blind-control analysis. That is no longer an active outcome because the governing human-first correction made all reviewer decisions blind to machine judgments.

Analyze instead:

### Batch 1 ↔ clean Batch 2

```text
Batch 1 intervention rate
clean Batch 2 ACCEPT / EDIT / REWRITE rates
recurring failure categories
new failure categories
register patterns
code-mixing patterns
humor/timing patterns
line-composition patterns
```

### Human ↔ machine evidence

For ChatGPT and Qwen separately:

```text
machine verdict × human decision matrices
machine score distributions
human intervention after machine “fluent” judgments
human ACCEPT after machine problem judgments
selected disagreement examples
Qwen denominator / escalation coverage
```

### Technical pilot

Report B2-0001–B2-0020 in a separately labeled appendix only.

Do not mix its 4 ACCEPT / 9 EDIT / 7 REWRITE distribution into clean benchmark percentages.

Historical blind assignment may remain in provenance exports but is not a reviewer-visibility treatment variable for current analysis.

---

# 13. Final commercial suite assembly

## Target

**7–9 September 2026.**

Assemble:

```text
README
DATA-CARD
METHODOLOGY
RUBRIC
LICENSE / commercial terms placeholder
SHA256SUMS

BATCH-1-948/
BATCH-2-ORIGINAL-1000/
BATCH-2-CLEAN-BENCHMARK-1000/
TECHNICAL-PILOT/
BENCHMARK-CALIBRATION/
ANALYSIS/
EVIDENCE/
```

Buyer-facing outputs should expose the evidence chain without exposing infrastructure secrets.

Canonical row-oriented format remains JSONL with CSV convenience projections.

Final extraction must come from private server-side source-of-truth tables, never browser copies.

---

# 14. Substantive completion update

## Target

**9–10 September 2026.**

Send active contacts a real project update, not a generic follow-up.

The update can then credibly say:

- canonical Book corpus reached 1,948 reviewed answers;
- clean Batch 2 benchmark reached 1,000 metric-eligible rows;
- every clean row received a native-human decision before machine judgment reveal;
- every promoted original Batch 2 row is linked to live routing semantics and deterministic reachability evidence;
- clean human↔machine disagreement analysis is complete;
- buyer bundle/manifests/hashes are ready for diligence;
- the technical first 20 remain transparently disclosed rather than hidden.

If B2R remains benchmark-only, state the 1,968 unique reviewed-evidence count separately from the 1,948 canonical corpus.

---

# 15. Critical dependencies

The active dependency graph is now:

```text
PUBLIC DEMONSTRATOR ─────────────── DONE
SECURITY MIGRATION ──────────────── DONE
BATCH 2 INFRASTRUCTURE ──────────── DONE
SOURCE FREEZE ───────────────────── DONE
TECHNICAL PILOT ─────────────────── DONE

OUTREACH ────────────────────────── READY NOW

clean unit machine evidence sealed
        ↓
native-human review 20
        ↓
post-human enrichment
        ↓
routing/regression validation
        ↓
atomic promotion + verification
        ↓
buyer preview
        ↓
next 20
        ↓
all 980 original clean rows
        ↓
B2R 20 clean supplemental rows
        ↓
final analysis + package
        ↓
completion update
```

There is no dependency from outreach to Batch 2 completion.

There is no longer a dependency from production scale to unbuilt infrastructure.

There is no legitimate shortcut around the native-human review gate.

---

# 16. Schedule risks and response rules

## Primary risk — native-human throughput

The remaining dataset is deliberately single-editor. This is the central evidence claim and therefore cannot be parallelized across substitute reviewers merely to hit a date.

Response:

- work in 20-row blocks;
- stop when editorial judgment degrades;
- allow schedule slip rather than dilute reviewer identity;
- measure completed promoted units, not hours spent.

## Secondary risk — Qwen/provider availability

Qwen is evidence, not editorial authority, but required pre-human escalations must exist before the affected human decision.

Response:

- retry only under frozen budgets/rules;
- never reveal missing/late machine conclusions before the human decision;
- delay that row/unit if required rather than fabricate provenance.

## Routing/dictionary regression

Response:

- fail the unit;
- repair semantics/dictionary proposal;
- rerun deterministic validation;
- never bypass the atomic promotion gate.

## Commercial schedule pressure

Response:

- outreach continues with the evidence already complete;
- never weaken data integrity to create a premature “finished” claim;
- use progress updates only when substantive.

---

# 17. Definition of done

## Already done

- [x] private-server corpus/security migration
- [x] Voice methodology page
- [x] public benchmark
- [x] 36-case selective calibration
- [x] Qwen production evaluator selection
- [x] Batch 2 protocol/audit infrastructure
- [x] frozen 1,000-row Batch 2 source set
- [x] 100% human-first reviewer correction
- [x] routing/reachability/promotion infrastructure
- [x] technical 20-row human review
- [x] technical 20-row English/semantics
- [x] technical 20-row routing validation
- [x] technical 20-row canonical promotion
- [x] corpus revision 126 / 968 active answers
- [x] first internal buyer-export preview

## Remaining production

- [ ] B2-0021–B2-1000: 980 clean metric-eligible human reviews
- [ ] per-unit English/semantic/routing/promotion/export cycle for all 49 original clean units
- [ ] freeze + complete B2R-0001–B2R-0020 clean supplemental unit
- [ ] clean 1,000-row benchmark freeze
- [ ] canonical original B2 corpus reaches 1,000/1,000 linked answers

## Remaining commercialization

- [ ] initial OpenAI outreach
- [ ] initial Thai/SEA LLM outreach
- [ ] cross-batch analysis
- [ ] human↔machine disagreement analysis
- [ ] final buyer bundle + hashes/data card/methodology
- [ ] substantive completion update

---

# 18. Immediate next actions

## Tonight / next review session

```text
1. complete any remaining required sealed Qwen evidence for B2-0021–B2-0040
2. native-human review B2-0021–B2-0040
3. run its full post-human cycle before generating B2-0041–B2-0060
```

## 19 August

```text
1. begin OpenAI outreach
2. begin Thai/SEA benchmark/rubric outreach in parallel
3. continue clean 20-row production cycles
```

The operative rule is now simple:

> **Commercial outreach runs in parallel. Clean Batch 2 advances only in verified 20-row cycles.**
