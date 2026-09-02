# The Book of Answers — Commercial Execution Timeline

**Status:** ACTIVE MASTER EXECUTION PLAN — OUTREACH ACTIVE · B2-0041–0060 CORPUS CRITICAL PATH · TCJ SPEECH-EVENT / OMISSION HUMAN GATE 2/6  
**Created:** 17 August 2026  
**Reconciled:** 2 September 2026 · 20:05 ICT  
**Project:** Flipgazine / The Book of Answers  
**Repository:** `dechadae/flipgazine`  
**Supabase:** `sjpvhgxacsiorrtijqua`

## Governing authorities

- `CURRENT-STATE.json`
- `DOCUMENT-AUTHORITY-MAP.md`
- `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md`
- `ANSWERS-BATCH2-CORPUS-ROUTING-REACHABILITY-IMPLEMENTATION-REPORT.md`
- `ANSWERS-BATCH2-HUMAN-FIRST-REVIEW-CORRECTION.md`
- `ANSWERS-BATCH2-BUYER-DATA-EXTRACTION-SPEC.md`
- `ANSWERS-TCJ-FOOTING-ABLATIONS-V2-V3-AND-SPEECH-EVENT-OMISSION-GATE-20260826.md`
- `ANSWERS-TCJ-CONVERSATIONAL-FOOTING-STANCE-AND-DISCOURSE-ARCHITECTURE-20260824.md`
- `ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-V3-FOOTING-FIRST-REWRITE-CAPABLE-20260824.md`
- `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md`

Newest owning authority wins on conflict. Integrity gates and frozen native-human judgments outrank calendar targets.

---

# 1. Executive status

The corpus track has **not advanced**. Live Supabase on 2 September verifies **988 active answers, 40 Batch 2 mappings, 2 promotions and 2 buyer-export snapshots**, consistent with canonical revision **127**. B2-0041–0060 remains the corpus critical path.

TCJ has advanced inside the existing human gate: the fresh six-case speech-event / omission bank now has **2/6 native-human reviews complete**, up from 0/6 at the 27 August reconciliation. The set remains `reviewing`; it is not frozen and no model reconstruction is authorized yet. Four native-human reviews remain before deterministic human-manifest freeze and database immutability.

No repository evidence since the prior reconciliation supersedes the governing footing/omission architecture. The 29 August temporary TCJ Edge Function cleanup page is operational maintenance, not commercialization-stage completion, and does not alter this timeline's dependency graph.

Production authority remains **NONE**. The complete-loop requirement remains **understand → judge → diagnose → rewrite → recheck → release**.

---

# 2. Planned versus actual

| Workstream | Verified state | Action |
|---|---|---|
| Private-server security | Complete | DONE |
| Voice benchmark + calibration | Complete | DONE |
| Batch 2 source freeze | 1,000 frozen | DONE |
| B2-0001–0020 technical pilot | Full cycle; IDs 949–968 | DONE · NON-METRIC |
| B2-0021–0040 clean unit | Full cycle; IDs 969–988 | DONE |
| Canonical corpus | revision 127 / 988 | CURRENT |
| Buyer export | snapshots 1–2 complete | CONTINUE PER PROMOTION |
| OpenAI + Thai/SEA outreach | first contact sent | ACTIVE |
| B2-0041–0060 | active clean unit | CORPUS CRITICAL PATH |
| Qualification v1.1 | 3 research-only Passports | DONE · HISTORICAL |
| Qualification 2.0 | human-frozen; machine exposure null | PROTECTED · NO TUNING |
| Footing-first architecture | adopted | DONE |
| Rewrite-capable qualification contract | complete loop required | DONE |
| Native-human footing analysis v1 | 8/8 frozen | DONE · AUTHORITY |
| Blind footing reconstruction v1 | 8/8 valid | DONE · R&D |
| Discourse-anchor ablation v2 | 8/8 valid | DONE · R&D |
| Local-voice/implicitness ablation v3 | 8/8 valid | DONE · R&D |
| Same-case tuning after v3 | stopped to avoid overfit | DONE · STOP RULE |
| Fresh speech-event/omission bank v2 | 6 human-only cases | ACTIVE · TCJ CRITICAL PATH |
| Native-human v2 review | **2/6 complete; 4 remain** | ACTIVE HUMAN GATE |
| Fresh v2 reconstruction | blocked until 6/6 + human freeze | DEPENDENT |
| Fresh judge/rewrite authority work | after footing/omission stability | DEPENDENT |
| Productization | after scoped authority | DEPENDENT |
| B2R clean supplemental 20 | still required | KEEP |
| Final clean corpus package | after clean 1,000 freeze | DEPENDENT |

---

# 3. Corpus checkpoint

```text
canonical revision            127
active answers                988
Batch 1                       948
Batch 2 corpus-linked          40
promotions                      2
answer mappings                40
buyer-export snapshots          2
```

B2-0001–0020 remain canonical but non-metric. B2-0021–0040 are the first completed clean unit. **Do not prepare B2-0061–0080 until B2-0041–0060 completes the full governing cycle.**

---

# 4. Governing Batch 2 production order — unchanged

```text
GENERATE / FREEZE NEXT 20
→ seal required machine evidence
→ HUMAN REVIEW 20
→ freeze final Thai
→ reveal machine comparison
→ English adaptation
→ Batch 1-compatible semantic enrichment
→ justified dictionary changes only
→ realistic route probes
→ deterministic routing + Batch 1 regression validation
→ atomic 20-row promotion
→ verify live revision + mappings + reachability
→ buyer-export preview
→ only then prepare next 20
```

Short form: **REVIEW 20 → ENGLISH → ENRICH → VALIDATE → PROMOTE → VERIFY → EXPORT PREVIEW → NEXT 20**.

If machine evidence is exposed before first human decision, retire that exposed version from active production, preserve provenance, create a genuinely new scenario and regenerate sealed evidence. Never relabel an exposed row as clean.

---

# 5. Commercial count model — unchanged

```text
CANONICAL BOOK
Batch 1                    948
Original Batch 2         1,000
Target                    1,948

CLEAN BATCH 2 BENCHMARK
B2-0021–B2-1000            980
B2R-0001–B2R-0020           20
Target                    1,000
```

The technical first 20 are never converted into clean metric rows. B2R never overwrites them.

---

# 6. TCJ current gate

The first native-human footing bank contains **8 frozen cases** (5 Answers BFF / 3 formal enterprise). Three Gemini mechanism runs completed without exposing human gold. v2 improved outer-turn anchoring and local relationship/hierarchy handling; v3 still showed author/projected-speaker confusion and weak pragmatic omission. Further tuning on those same eight cases is prohibited as independent evidence.

The fresh bank is:

```text
set key                     TCJ-FOOTING-SPEECH-EVENT-OMISSION-HUMAN-2026Q3-v2
cases                       6
tracks                      4 Answers BFF / 2 formal enterprise
prior footing overlap       0
prior qualification overlap 0
set status                  reviewing
human review                2/6
remaining human reviews     4
model reconstruction        BLOCKED
```

The representation separates outer speaker/addressee from embedded source/origin, current author, projected speaker, projected addressee and stance. Relationship distance and hierarchy remain segment-local. `omission_license` records what natural Thai can leave unexplained because common sense, relationship knowledge, context or social convention already carries it.

Mandatory freeze order remains unchanged:

```text
native-human review 6/6
→ verify source-manifest linkage
→ deterministic human manifest
→ freeze set + protocol
→ database immutability
→ one fresh reconstruction using the representation frozen in advance
→ analyze residual disagreement
→ only after footing/omission stabilizes return to judge + rewrite qualification
```

Qualification 2.0 remains protected historical human authority and must not be used for development tuning.

---

# 7. Working milestones

| Date | Milestone |
|---|---|
| **17 Aug** | ✅ private-server migration/security acceptance |
| **18 Aug** | ✅ Voice benchmark/calibration; B2 infrastructure; technical first20 |
| **19 Aug** | ✅ first-contact outreach; clean B2-0021–0040; revision 127 / buyer snapshot 2 |
| **20–22 Aug** | ✅ TCJ multi-judge/control-plane research; Qualification v1.1 |
| **23–24 Aug** | ✅ footing-first reset; rewrite competence mandatory; prior failed/invalidated writer work frozen |
| **25–26 Aug** | ✅ footing v1 human bank 8/8 frozen; reconstruction v1 + ablations v2/v3 complete; same-case tuning stopped; fresh six-case bank established |
| **27 Aug–2 Sep** | TCJ fresh human gate advanced from 0/6 to **2/6**; corpus remained revision 127 / 988 |
| **Now — corpus** | B2-0041–0060 through unchanged human-first promotion/export cycle |
| **Now — TCJ** | complete remaining **4** native-human speech-event/omission reviews |
| **Next TCJ gate** | verify source linkage → deterministic manifest → freeze/DB lock → one fresh reconstruction |
| **After footing/omission stability** | fresh judge + rewrite experiments with clean authority separation |
| **After scoped candidate freeze** | fresh hidden authority instrument → blind human freeze → complete-loop qualification |
| **After clean 1,000 freeze** | package-integrity verification + final analysis |
| **After substantive completion** | data-room refresh + substantive buyer updates |

There is **no TCJ release-date commitment**. Human throughput and integrity gates govern completion. No unsupported September completion date is introduced while the corpus remains at revision 127.

---

# 8. Critical paths

## Corpus / commercial suite

```text
B2-0041–0060 sealed evidence
→ native-human review 20/20
→ final Thai freeze
→ English + semantics
→ deterministic routing / Batch 1 regression validation
→ atomic promotion + live verification
→ buyer checkpoint
→ repeat through B2-1000
→ B2R clean supplemental 20
→ clean 1,000 freeze
→ final analysis
→ buyer package
```

## TCJ

```text
fresh speech-event / omission bank v2 — 2/6 human-reviewed
→ remaining native-human interpretation 4/6
→ source-hash verification + deterministic human manifest
→ freeze + DB lock before model exposure
→ one fresh reconstruction with frozen representation
→ residual speech-event / omission analysis
→ fresh judge/evaluator/rewrite experiments
→ scoped runtime freeze
→ fresh hidden native-human authority bank
→ complete-loop qualification
→ scoped authority decision
→ productization
```

No production-authority or universal-Thai claim is permitted unless future authority gates pass.

---

# 9. Outreach and licensing rules

OpenAI and Thai/SEA conversations remain active in parallel. Do not send generic chase messages; proactive follow-up should carry substantive new evidence or respond to buyer activity.

Default TCJ commercial rights remain **Benchmark Use**, not unrestricted Model-Development Use. API, source or private-deployment access does not imply rights to use TCJ outputs as model-development signals. Keep bulk corpus and private evidence controlled and preserve buyer-specific export provenance.

---

# 10. Schedule-risk rule

The dominant corpus risk remains native-human review throughput. The dominant TCJ risk remains whether fresh, independently frozen native-human evidence can stabilize speech-event role reconstruction and pragmatic omission before judge/rewrite qualification resumes. The 2/6 progress reduces the immediate human-gate remainder to four cases but does not change the downstream integrity gates.

Do not trade either integrity gate for a calendar date. The TCJ release question remains: **does this behave like a genuinely useful native senior editor within its declared scope?** If not, continue research.
