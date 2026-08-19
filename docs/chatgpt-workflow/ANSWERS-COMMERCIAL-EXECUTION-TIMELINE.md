# The Book of Answers — Commercial Execution Timeline

**Status:** ACTIVE MASTER EXECUTION PLAN — OUTREACH ACTIVE · FIRST CLEAN UNIT PROMOTED · SECOND CLEAN UNIT READY FOR HUMAN REVIEW  
**Created:** 17 August 2026  
**Reconciled:** 19 August 2026 · 20:05 ICT  
**Project:** Flipgazine / The Book of Answers  
**Repository:** `dechadae/flipgazine`  
**Supabase:** `sjpvhgxacsiorrtijqua`  
**Commercial strategy authority:** `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md`  
**Current Batch 2 implementation authority:** `ANSWERS-BATCH2-CORPUS-ROUTING-REACHABILITY-IMPLEMENTATION-REPORT.md`  
**Human-first authority:** `ANSWERS-BATCH2-HUMAN-FIRST-REVIEW-CORRECTION.md`  
**Buyer export authority:** `ANSWERS-BATCH2-BUYER-DATA-EXTRACTION-SPEC.md`  
**Source replacement record:** `ANSWERS-BATCH2-SOURCESET-V1-1-REPLACEMENT-PATCH.md`  
**Technical pilot record:** `ANSWERS-BATCH2-TECH-PILOT-COMPLETION-REPORT.md`  
**Public benchmark acceptance:** `ANSWERS-VOICE-BENCHMARK-ACCEPTANCE-2026-08-18.md`  
**Security migration acceptance:** `ANSWERS-PRIVATE-SERVER-PHASE-I-ACCEPTANCE-REPORT.md` + Phase J/K cutover records

---

# 1. Executive status

Commercial outreach is live and clean Batch 2 production is now the main active workstream.

Completed by 19 August:

```text
private-server security migration
Voice methodology/public benchmark
36-case editor-grounded evaluator calibration
Qwen3.6-27B production judge selection
1,000-row Batch 2 source-set freeze
Batch 2 audit/provenance/Qwen infrastructure
100% human-first reviewer implementation
routing / reachability / atomic-promotion infrastructure
buyer-export checkpoint infrastructure
B2-0001–B2-0020 technical pilot full cycle
B2-0021–B2-0040 clean human review
B2-0021–B2-0040 English + semantic enrichment
B2-0021–B2-0040 deterministic routing validation
B2-0021–B2-0040 canonical promotion
second internal buyer-export checkpoint
Thai / SEA first-contact outreach sent
OpenAI Data Partnerships expression of interest submitted
B2-0041–B2-0060 generated + sealed ChatGPT self-audit
B2-0048 / B2-0059 exposed preparation versions retired before human review
B2-SOURCESET-v1.1 replacement patch frozen and verified
B2-0048 / B2-0059 fresh clean replacements generated + sealed
```

Three tracks remain active:

```text
TRACK A — OpenAI corpus/evaluation conversation
TRACK B — Thai + SEA LLM benchmark/rubric conversations
TRACK C — clean Batch 2 production
```

The main schedule risk remains the throughput and judgment quality of the single native-human reviewer. Infrastructure is not the bottleneck.

---

# 2. Planned vs actual reconciliation

| Workstream | Planned state | Actual by 19 Aug 20:05 ICT | Timeline action |
|---|---|---|---|
| Private-server security | Required before commercialization | ✅ Complete 17 Aug | DONE |
| Voice benchmark | Required before outreach | ✅ Complete 18 Aug | DONE |
| 36-case calibration | Required before judge choice | ✅ Complete 18 Aug | DONE |
| Evaluator selection | Select production second judge | ✅ Qwen3.6-27B | DONE |
| Freeze 1,000 B2 sources | 18–20 Aug | ✅ Base source set frozen 18 Aug | DONE |
| Technical 20 | Pilot before scale | ✅ Full cycle; IDs 949–968 | DONE, non-metric |
| First clean 20 | Begin 19–21 Aug | ✅ B2-0021–0040 full cycle complete | DONE |
| Canonical corpus | Revision 126 / 968 | ✅ Revision 127 / 988 | ADVANCED |
| Buyer export checkpoints | Every promoted unit | ✅ snapshots 1 and 2 | CONTINUE |
| Initial OpenAI outreach | 19–20 Aug | ✅ Data Partnerships submitted 19 Aug | ACTIVE |
| Initial Thai/SEA outreach | 19–20 Aug | ✅ first-contact emails sent 19 Aug | ACTIVE |
| Second clean 20 | B2-0041–0060 | ✅ 20 fresh active rows; ChatGPT sealed; Qwen/human next | ACTIVE |
| Preparation leak handling | Not previously formalized | ✅ automatic retire → replace → refreeze rule now governing | DONE / STANDING RULE |
| B2R supplemental set | 20 rows | ✅ still exactly 20 required | KEEP |
| Final analysis | 5–7 Sep | No change | KEEP |
| Commercial suite | 7–9 Sep | No change | KEEP |
| Completion update | 9–10 Sep | No change | KEEP |

---

# 3. Current live checkpoint

Verified live after B2-0021–B2-0040 promotion and the B2-SOURCESET-v1.1 replacement patch:

```text
canonical corpus revision                     127
active canonical answers                      988
Batch 1 canonical answers                     948
original Batch 2 answers corpus-linked         40
  technical B2-0001–0020                      20
  clean B2-0021–0040                          20
B2-0001 → B2-0020 answer IDs             949–968
B2-0021 → B2-0040 answer IDs             969–988
effective Batch 2 source scenarios          1,000
active Batch 2 raw drafts                      60
internal buyer-export snapshots                  2
```

## Technical pilot B2-0001–B2-0020

```text
human reviewed                 20 / 20
ACCEPT                              4
EDIT                                9
REWRITE                             7
benchmark_metric_eligible           0
corpus linked                      20
routing/index unreachable           0
surface collisions                  0
buyer preview                      yes
```

These remain valid Book content and qualitative evidence, but not clean benchmark rows.

## First clean promoted unit B2-0021–B2-0040

```text
human reviewed                 20 / 20
ACCEPT                              9
EDIT                                8
REWRITE                             3
ChatGPT audits                  20 / 20
English adaptations             20 / 20
semantic staging                20 / 20
new dictionary concepts              0
alias collisions                     0
semantic-zero rows                   0
index-unreachable rows               0
parser/probe failures                0
Batch 1 regressions                  0
corpus mappings                  20 / 20
promotion id                          2
routing check id                      3
corpus revision                     127
answer IDs                      969–988
buyer snapshot id                     2
```

Promotion proof:

```text
promotion SHA-256
13ec14e297996d3ebceddf3804e978eb885e12dde3d21333fcf8cdc085cc46cb

dictionary SHA-256
453996612271cd15bf942ca764d6e63fb32e50a6c3ec884ab477fb4a255f2438

routing index SHA-256
9330ae6ac75142a80d9c49102f37bd5acfa81a21c0201bd9a6802a32a31aadf0
```

Buyer-export checkpoint:

```text
snapshot name
ANSWERS-B2-CLEAN-0021-0040-v1-preview

row count              20
corpus revision        127
snapshot SHA-256
dc5bef48ccc93032eacbbb69d58b300ea9664654d5b7d15cf3a0970ab190f8df
```

The stored snapshot hash was recomputed from stored JSON and matches exactly.

## Current clean unit B2-0041–B2-0060

```text
active rows                             20 / 20
raw drafts with real LF                 20 / 20
literal escaped-linebreak defects         0
sealed ChatGPT self-audits              20 / 20
rows requiring Qwen                     20 / 20
Qwen audits at replacement checkpoint    0 / 20
human reviews                            0 / 20
active protocol exceptions                   0
```

The reviewer service owns Qwen completion. Review controls remain unavailable until the required pre-human machine evidence for that row is sealed.

---

# 4. Source-set replacement event — resolved cleanly

During preparation of B2-0041–B2-0060, machine-assessment information for the then-active B2-0048 and B2-0059 versions was accidentally exposed before human review.

Those versions were retired **before any human decision** and removed from active production. They are retained only in private append-only tombstone provenance.

Fresh replacements were then:

```text
newly authored as source scenarios
→ frozen under B2-SOURCESET-v1.1
→ given new source hashes
→ given new raw drafts
→ given new sealed ChatGPT audits
→ returned to the normal Qwen-before-human gate
```

Effective replacement proof:

```text
base source manifest SHA-256
f1d184b78e21f654049f952c9fc3083b0f082f083f4934f4dc7b9d524c6d1ff8

effective source manifest SHA-256
a21546c6206a20300a93700ef87a439311a011f3fa1b4f0e178395a07bd3908b

replacement patch SHA-256
ba5a6c5ed66cd6799559e654897ac279afcabd8f28e2055796961805c1e00372
```

The effective manifest was independently recomputed and matched the stored v1.1 manifest.

The retired versions never enter the clean benchmark denominator. The fresh replacement rows may remain clean metric-eligible if the rest of their human-first protocol completes normally.

---

# 5. Governing production order

Every ordinary production unit is exactly 20 active rows:

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

Do not bulk pre-generate future units.

## Standing preparation-leak rule

If any active row's machine evidence is exposed to the human reviewer before the first human decision:

```text
STOP that row
→ retire the exposed version from active production
→ preserve it only as private append-only provenance
→ create a genuinely new scenario
→ freeze the replacement before generation
→ generate a new raw draft
→ run new sealed ChatGPT / required Qwen evidence
→ verify zero human decisions and zero active exposure exception
→ return only the clean replacement to the review queue
```

Do this automatically during preparation. Do not burden the reviewer with the cleanup unless replacement is technically impossible or the human has already made a decision.

Never silently relabel an exposed version as clean.

---

# 6. Count model governing commercialization

## Canonical Book corpus

```text
Batch 1 canonical answers                   948
Original Batch 2 namespace                  1,000
------------------------------------------------
canonical reviewed Book corpus target      1,948
```

The two retired preparation versions do not add to this count; their active IDs now point to fresh replacement evidence.

## Clean Batch 2 benchmark

The original clean-count model is restored:

```text
B2-0021–B2-1000                              980
B2R-0001–B2R-0020                             20
------------------------------------------------
clean Batch 2 benchmark                    1,000
```

The B2R unit exists only to replace the 20-row technical pilot in the clean metric denominator.

## Unique reviewed evidence if B2R is delivered

```text
canonical Book corpus records              1,948
additional benchmark-only B2R                 20
------------------------------------------------
unique reviewed evidence                   1,968
```

Do not describe 1,968 as the canonical Book corpus unless B2R is later deliberately promoted.

---

# 7. Milestone calendar

| Date | Milestone / status |
|---|---|
| **17 Aug** | ✅ Private-server migration/security acceptance complete |
| **18 Aug** | ✅ Voice benchmark, calibration, evaluator selection and public acceptance |
| **18 Aug** | ✅ 1,000-row Batch 2 base source freeze + audit/Qwen/provenance infrastructure |
| **18 Aug** | ✅ Human-first reviewer + routing/promotion/export infrastructure |
| **18 Aug** | ✅ Technical B2-0001–0020 full cycle; revision 126 / 968 |
| **19 Aug** | ✅ OpenAI Data Partnerships submission + Thai/SEA first-contact emails sent |
| **19 Aug** | ✅ Clean B2-0021–0040 full cycle; revision 127 / 988; buyer snapshot 2 |
| **19 Aug** | ✅ B2-0041–0060 generated + self-audited |
| **19 Aug** | ✅ B2-SOURCESET-v1.1 replacement patch for pre-review exposed versions; clean 20-row unit restored |
| **19 Aug–4 Sep** | Complete remaining original clean B2 production in verified 20-row cycles |
| **By 1 Sep** | Freeze separate B2R-0001–B2R-0020 source set before generation |
| **5 Sep** | Final clean-benchmark/package-integrity verification |
| **5–7 Sep** | Cross-batch + human↔machine analysis + technical-pilot appendix |
| **7–9 Sep** | Assemble commercial suite, manifests, data card, methodology |
| **9–10 Sep** | Send substantive Batch 2 completion update to active OpenAI + Thai/SEA conversations |
| **Sep onward** | Technical/commercial follow-up |

Dates are working targets. Integrity gates outrank calendar cosmetics.

---

# 8. Clean Batch 2 throughput plan

There are 50 clean metric units of 20 rows:

```text
49 units = B2-0021–B2-1000 = 980 rows
 1 unit  = B2R-0001–B2R-0020 = 20 rows
----------------------------------------
50 units = clean benchmark = 1,000 rows
```

Completed clean production units:

```text
B2-0021–0040   20 / 20 complete and promoted
```

Current:

```text
B2-0041–0060   20 / 20 clean active rows
               ChatGPT sealed 20 / 20
               Qwen/human review next
```

A 19 August–4 September window still requires roughly three completed 20-row cycles per active review day on average. This is a capacity target, not a quota.

If native-human judgment needs more time, move later analysis/package dates rather than weaken the human gate.

Authoritative progress is **fully completed and promoted 20-row cycles**, not raw drafts generated.

---

# 9. Track A — OpenAI

**Status: ACTIVE.**

19 August initial action is complete:

```text
OpenAI Data Partnerships expression of interest submitted
```

Current evidence available if OpenAI responds:

- live Book with private server-owned corpus;
- Voice methodology;
- public Voice Benchmark;
- 36-case editor-grounded calibration;
- immutable Batch 1 provenance;
- technical first-20 provenance chain;
- first clean promoted 20-row production unit;
- clean buyer-export checkpoint;
- active human-first Batch 2 production.

First-contact delivery policy remains:

```text
email/form body + ordinary HTTPS links only
no ZIP attachment
no HTML attachment
no unsolicited private sample
no pricing in first contact
private evidence only through an accepted transfer method
```

Do not send a generic chase message now. The next proactive event should be substantive progress/completion or a response to an actual OpenAI contact.

---

# 10. Track B — Thai + Southeast Asian LLM buyers

**Status: ACTIVE.**

19 August first-contact emails have been sent to the selected Thai/SEA targets.

Lead with:

```text
Book = language behavior in use
Voice = editorial methodology
Benchmark = public diagnostic
Human layer = native pragmatic judgment and failure analysis
```

Primary discussion areas:

- Thai pragmatic evaluation;
- benchmark/rubric adaptation;
- organization-specific test sets;
- model-response failure analysis;
- native-human evaluation;
- contemporary Thai conversational/register work.

Do not send pricing, unrestricted corpus claims, ZIP/HTML packages or private machine evidence unless a buyer asks and confirms an accepted transfer method.

No OpenAI exclusivity dependency exists.

---

# 11. Track C — immediate production gate

## B2-0041–B2-0060

Required next sequence:

```text
required Qwen evidence seals
→ native-human review 20 / 20
→ final Thai freeze
→ post-human mechanical QA only where genuinely required
→ English adaptation 20 / 20
→ semantic enrichment 20 / 20
→ realistic route probes
→ deterministic routing + Batch 1 regression validation
→ atomic promotion
→ verify live corpus revision + 20 mappings
→ freeze buyer-export checkpoint
→ only then prepare B2-0061–B2-0080
```

The current Thai reviewer points to B2-0041–B2-0060. Its controller starts at 41.

All active rows are currently eligible for strict human-first metrics. No machine verdict, score, flag, rationale or row-specific conclusion should be surfaced before the corresponding human decision.

## Continuous unit QA

For every 20-row unit require:

```text
20 human decisions
20 final Thai hashes
20 English adaptations
0 literal escaped-linebreak defects
0 unknown semantic keys
0 normalized alias/typo ownership collisions
0 active index-unreachable answers
0 new-answer parser-probe failures
0 Batch 1 routing regressions
passing canonical dictionary/index/semantic hashes
20 source→answer mappings after promotion
buyer snapshot/checkpoint updated
row-level benchmark eligibility accurately exported
```

A failed technical gate does not advance to the next unit.

---

# 12. B2R supplemental clean unit

The technical first 20 stay permanently preserved as B2-0001–B2-0020 and remain valid canonical Book content but non-metric.

To create the clean 1,000-row Batch 2 denominator, add exactly one separate clean replacement unit:

```text
B2R-0001–B2R-0020
```

Dependency order:

```text
freeze 20 new source scenarios
→ freeze source-set version + manifest hash
→ generate one frozen draft per source
→ sealed ChatGPT / required Qwen evidence
→ native-human review
→ English + semantics
→ validation / export cycle
→ count only in clean benchmark unless separately promoted
```

B2R must never overwrite or renumber B2-0001–B2-0020.

---

# 13. Final analysis

**Target: 5–7 September 2026**, after the full clean 1,000 denominator is frozen.

## Batch 1 ↔ clean Batch 2

Analyze:

```text
Batch 1 intervention rate
clean Batch 2 ACCEPT / EDIT / REWRITE distribution
recurring failure categories
new failure categories
register patterns
code-mixing patterns
humor / timing patterns
line-composition patterns
```

## Human ↔ machine

For ChatGPT and Qwen separately:

```text
machine verdict × human decision matrices
machine score distributions
human intervention after machine fluent judgments
human ACCEPT after machine problem judgments
selected disagreement examples
Qwen denominator / escalation coverage
```

## Technical pilot

Keep B2-0001–B2-0020 in a separately labeled appendix only. Do not mix its 4 ACCEPT / 9 EDIT / 7 REWRITE distribution into clean benchmark percentages.

## Retired preparation versions

The retired pre-review B2-0048/B2-0059 versions are operational provenance only. They are not active rows and do not enter corpus or benchmark statistics.

---

# 14. Final commercial suite

**Target: 7–9 September 2026.**

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

Include source-set patch history where diligence requires it, without surfacing retired preparation content as active corpus data.

Canonical row-oriented delivery format remains JSONL with CSV convenience projections.

Final extraction must come from private server-side source-of-truth tables, never browser copies.

---

# 15. Substantive completion update

**Target: 9–10 September 2026.**

Send active contacts a real project update, not a generic follow-up.

If final targets are achieved, it can credibly say:

- canonical Book corpus reached 1,948 reviewed answers;
- clean Batch 2 benchmark reached 1,000 metric-eligible rows;
- every clean row received its native-human decision before machine judgment reveal;
- promoted original Batch 2 rows are linked to routing semantics and deterministic reachability evidence;
- clean human↔machine disagreement analysis is complete;
- buyer manifests/hashes are ready for diligence;
- the technical first 20 remain transparently disclosed rather than hidden.

If B2R remains benchmark-only, state 1,968 unique reviewed evidence separately from the 1,948 canonical corpus.

---

# 16. Active dependency graph

```text
PUBLIC DEMONSTRATOR ─────────────── DONE
SECURITY MIGRATION ──────────────── DONE
BATCH 2 INFRASTRUCTURE ──────────── DONE
BASE SOURCE FREEZE ──────────────── DONE
TECHNICAL PILOT ─────────────────── DONE
INITIAL OUTREACH ────────────────── DONE / ACTIVE CONVERSATIONS
FIRST CLEAN UNIT ────────────────── DONE
SOURCESET v1.1 REPLACEMENT ──────── DONE

current unit required Qwen evidence
        ↓
native-human review 20
        ↓
post-human enrichment
        ↓
routing/regression validation
        ↓
atomic promotion + verification
        ↓
buyer checkpoint
        ↓
next 20
        ↓
all original B2 rows
        ↓
B2R clean supplemental 20
        ↓
final analysis + package
        ↓
completion update
```

There is no dependency from outreach to Batch 2 completion.

There is no legitimate shortcut around the native-human review gate.

---

# 17. Schedule risks and response rules

## Primary risk — native-human throughput

Response:

- work in 20-row blocks;
- stop when editorial judgment degrades;
- allow schedule slip rather than dilute reviewer identity;
- measure completed promoted units, not hours spent.

## Qwen/provider availability

Required pre-human evidence must exist before the corresponding human decision.

Response:

- retry only under frozen budgets/rules;
- never reveal missing/late machine conclusions;
- delay the row if necessary rather than fabricate provenance.

## Preparation-time machine-judgment leak

This now has a fixed operational response.

Before first human decision:

```text
leak detected
→ retire exposed active version
→ preserve private tombstone
→ generate/freeze genuinely new replacement
→ rerun sealed machine evidence
→ verify clean state
→ return replacement to reviewer
```

Do not surface the cleanup process to the reviewer unless replacement is impossible.

After a human decision has already been made, do not rewrite history; preserve the exception and classify eligibility honestly.

## Routing/dictionary regression

Response:

- fail the unit;
- repair semantics/dictionary proposal;
- rerun deterministic validation;
- never bypass atomic promotion.

## Commercial schedule pressure

Response:

- outreach continues with existing evidence;
- never weaken integrity for a premature finished claim;
- use progress updates only when substantive.

---

# 18. Definition of done

## Completed

- [x] private-server corpus/security migration
- [x] Voice methodology page
- [x] public benchmark
- [x] 36-case selective calibration
- [x] Qwen production evaluator selection
- [x] Batch 2 protocol/audit infrastructure
- [x] frozen 1,000-row Batch 2 base source set
- [x] human-first reviewer implementation
- [x] routing/reachability/promotion infrastructure
- [x] technical B2-0001–0020 full cycle
- [x] corpus revision 126 / 968
- [x] first buyer-export preview
- [x] B2-0021–0040 human review 20/20
- [x] B2-0021–0040 English/semantics
- [x] B2-0021–0040 routing validation
- [x] B2-0021–0040 atomic promotion
- [x] corpus revision 127 / 988
- [x] clean buyer-export preview id 2
- [x] OpenAI Data Partnerships submission
- [x] Thai/SEA first-contact emails
- [x] B2-0041–0060 initial generation + ChatGPT sealing
- [x] B2-SOURCESET-v1.1 replacement patch
- [x] fresh B2-0048/B2-0059 replacements
- [x] standing automatic preparation-leak replacement rule

## Remaining production

- [ ] Qwen seal + human review B2-0041–0060
- [ ] English / semantics / validation / promotion / buyer checkpoint for B2-0041–0060
- [ ] remaining B2-0061–B2-1000 original cycles
- [ ] freeze + complete B2R-0001–B2R-0020 clean supplemental unit
- [ ] clean 1,000-row benchmark freeze
- [ ] canonical original Batch 2 reaches 1,000/1,000 linked answers

## Remaining commercialization

- [ ] respond to OpenAI / buyer replies
- [ ] cross-batch analysis
- [ ] human↔machine disagreement analysis
- [ ] final buyer bundle + hashes/data card/methodology
- [ ] substantive completion update

---

# 19. Immediate next actions

```text
1. open B2-0041–B2-0060 reviewer
2. allow required Qwen evidence to seal before each decision is enabled
3. native-human review all 20 active clean rows
4. do not inspect machine verdicts before the corresponding decision
5. after 20/20, run full English → enrich → validate → promote → verify → export cycle
6. prepare B2-0061–B2-0080 only after that buyer checkpoint
```

Commercially:

```text
monitor replies
answer substantive buyer questions when they arrive
send no generic chase email yet
send no unsolicited attachment/package
```

The operative rule remains:

> **Outreach runs in parallel. Batch 2 advances only through evidence-preserving verified 20-row cycles.**