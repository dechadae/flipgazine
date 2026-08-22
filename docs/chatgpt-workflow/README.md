# ChatGPT Workflow — Flipgazine / The Book of Answers

**Purpose:** canonical human-readable documentation for continuing the Answers project across ChatGPT sessions.

This folder contains current operational authority, editorial methodology, Batch 2 provenance, buyer-export rules, commercialization planning and the completed private-server migration record.

`CURRENT-STATE.json` is the compact machine-readable routing manifest for the checkpoint summarized here. Query canonical live state before consequential operations whenever the manifest says a section is only a repository snapshot.

`DOCUMENT-AUTHORITY-MAP.md` classifies every document as current authority, completed evidence or historical record. Consult it before acting on any document-level “next step.”

**Current TCJ execution authority:** `ANSWERS-TCJ-QUALIFICATION-V11-RESEARCH-REMEDIATION-AND-EXTERNAL-API-GATE-20260822.md`. Hidden Qualification v1.1 remains a valid completed run whose three candidate judges failed the preregistered production-authority thresholds. The exposed run is now development evidence for `TCJ-ANSWERS-BFF-v3-research`; native-human frozen ratings remain authoritative and case-design labels are hypotheses only.

**Final-product deployment authority:** `ANSWERS-TCJ-PLUG-AND-PLAY-DEPLOYMENT-AND-VOICE-PROFILE-POLICY-20260822.md` governs TCJ Gateway packaging, managed/VPC/on-prem deployment, local-runtime independence, Voice Profile classification and opt-in customer improvement. `ANSWERS-TCJ-VOICE-PROFILE-LICENSING-EXTENSION-20260822.md` formalizes technical-substance-over-label classification and the recurring Voice Profile Improvement Service.

---

## Read first

For current Answers work, use this order:

1. `ANSWERS-BATCH2-CORPUS-ROUTING-REACHABILITY-IMPLEMENTATION-REPORT.md` — corpus-production architecture. Reverify current live Batch 2 counts before acting on older snapshots.
2. `ANSWERS-THAI-CONVERSATION-JUDGE-ARCHITECTURE.md` — TCJ core/profile architecture.
3. `ANSWERS-TCJ-MULTI-JUDGE-CONSENSUS-ARCHITECTURE.md` — approved Panel methodology. Panel assembly remains competence-gated and cannot proceed without qualified dimensions.
4. `ANSWERS-TCJ-QUALIFICATION-V11-RESEARCH-REMEDIATION-AND-EXTERNAL-API-GATE-20260822.md` — **latest TCJ execution checkpoint and valid next action**: use exposed v1.1 to correct judge failure modes through research-only profile versions; preserve native-human gold and thresholds; then build a fresh hidden Qualification bank. OpenAI/xAI adapters are post-final-freeze integrations.
5. `ANSWERS-TCJ-QUALIFICATION-V11-COMPLETION-AND-RESEARCH-GATE-20260822.md` — verified v1.1 completion evidence and frozen metrics/hashes/Passports; its immediate next-action text is superseded by item 4.
6. `ANSWERS-TCJ-ROBUSTNESS-V1-COMPLETION-AND-PERTURBATION-DRAFT-20260821.md` — completed robustness/perturbation checkpoint; later Qualification/remediation authorities govern current work.
7. `ANSWERS-TCJ-MEASUREMENT-IMPLEMENTATION-20260820.md` — measurement persistence and earlier qualification/control-plane foundation.
8. `ANSWERS-TCJ-LIVE-DEPLOYMENT-20260819.md` — historical TCJ Standard deployment provenance.
9. `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md` — governing commercial-use / model-development / provenance boundary.
10. `ANSWERS-TCJ-PLUG-AND-PLAY-DEPLOYMENT-AND-VOICE-PROFILE-POLICY-20260822.md` — governing final-product deployment policy.
11. `ANSWERS-TCJ-VOICE-PROFILE-LICENSING-EXTENSION-20260822.md` — governing portable Voice Profile / recurring improvement commercial extension.
12. `ANSWERS-BATCH2-TECH-PILOT-COMPLETION-REPORT.md` — B2-0001–B2-0020 technical-pilot record.
13. `ANSWERS-BATCH2-BUYER-DATA-EXTRACTION-SPEC.md` — governing buyer export contract.
14. `ANSWERS-BATCH2-HUMAN-FIRST-REVIEW-CORRECTION.md` — human-first review visibility authority.
15. `ANSWERS-BATCH2-SOURCESET-V1-1-REPLACEMENT-PATCH.md` — applied clean source replacements.
16. `ANSWERS-BATCH2-CORPUS-ROUTING-REACHABILITY-PLAN.md` — routing/promotion architecture.
17. `ANSWERS-BATCH2-SELF-AUDIT-PROTOCOL.md` — frozen generation/audit history; newer TCJ controls supersede its old Qwen execution path.
18. `ANSWERS-COMMERCIAL-EXECUTION-TIMELINE.md` — commercialization schedule.
19. `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md` — commercial positioning and claim boundaries.
20. `ANSWERS-VOICE-TONE.md` — Thai/English editorial authority.
21. `ANSWERS-HUMAN-EVALUATION-SCHEME.md` — human-evaluation deliverable.
22. `ANSWERS-HUMAN-REVIEW.md` — immutable Batch 1 provenance.
23. `ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md` — final completed private-server migration proof.

Repository-root `AGENTS.md` remains the short operational entry point.

---

## Current authority boundaries

- **Latest TCJ research execution state / valid next action:** `ANSWERS-TCJ-QUALIFICATION-V11-RESEARCH-REMEDIATION-AND-EXTERNAL-API-GATE-20260822.md`.
- **Frozen v1.1 completion evidence:** `ANSWERS-TCJ-QUALIFICATION-V11-COMPLETION-AND-RESEARCH-GATE-20260822.md`.
- **Machine-evaluation architecture:** `ANSWERS-THAI-CONVERSATION-JUDGE-ARCHITECTURE.md`.
- **Panel methodology:** `ANSWERS-TCJ-MULTI-JUDGE-CONSENSUS-ARCHITECTURE.md`; method approved, production Panel unavailable until Qualification produces eligible dimensions.
- **TCJ commercial-use / provenance:** `ANSWERS-TCJ-COMMERCIAL-USE-AND-PROVENANCE-BOUNDARY.md`.
- **TCJ final product / plug-and-play deployment:** `ANSWERS-TCJ-PLUG-AND-PLAY-DEPLOYMENT-AND-VOICE-PROFILE-POLICY-20260822.md`.
- **Voice Profile classification / licensing / improvement service:** `ANSWERS-TCJ-VOICE-PROFILE-LICENSING-EXTENSION-20260822.md`.
- **Current production cycle:** `ANSWERS-COMMERCIAL-EXECUTION-TIMELINE.md` together with the Batch 2 routing implementation report; reverify live counts before acting.
- **Buyer extraction:** `ANSWERS-BATCH2-BUYER-DATA-EXTRACTION-SPEC.md`.
- **Human-review visibility:** `ANSWERS-BATCH2-HUMAN-FIRST-REVIEW-CORRECTION.md`.
- **Thai / English editorial decisions:** `ANSWERS-VOICE-TONE.md`.
- **Completed private-server security migration:** `ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md`.

When older wording conflicts with a newer authority, follow the newer document that owns that decision. In particular:

- Preliminary Admission/Robustness evidence does **not** establish production judge authority.
- Hidden Qualification v1.1 is complete, verified and now exposed development/research evidence.
- The frozen native-human ratings are the authoritative comparison gold. Case-design labels such as `constructed_likely_problematic` are hypotheses only and must never override the blind human rating.
- The mistakenly created post-run human-gold compromise interpretation is superseded append-only; it does not invalidate v1.1.
- All three v1.1 Qualification-era Passports are `research_only`; no candidate passed or partially passed any of the six dimensions.
- Do **not** loosen the preregistered thresholds because the candidate set failed.
- `TCJ-ANSWERS-BFF-v3-research` may be iterated against exposed v1.1 as development evidence, but v1.1 may not then be reused as the independent hidden authority bank for that revised configuration.
- A revised candidate/configuration contract requires a **fresh hidden Qualification bank** before production authority can be established.
- The production Panel must be built only from dimensions that actually earn Qualification authority; therefore the current candidate set cannot populate it.
- TCJ Core and TCJ Voice Profiles are non-model software/configuration layers in the final-product architecture; learned neural artifacts must be classified separately by technical substance.
- With explicit buyer opt-in and rights/provenance review, eligible production evidence may improve non-model TCJ / Voice Profile configuration without automatically becoming competing-model training data.
- OpenAI and xAI production adapters remain intentionally disconnected during research remediation. Connect them only after fresh Qualification, qualified Panel, independent Assurance, reproducibility acceptance, and final TCJ architecture/runtime freeze all pass.

---

## TCJ Qualification v1.1 — verified current checkpoint

Canonical final state verified on 22 August 2026:

```text
run                          TCJ-JUDGE-QUALIFICATION-RUN-2026Q3-v1.1
run status                   complete
protocol status              complete
human gold cases             48
machine judgment cells       144 / 144
valid judgments              144
committed dispatches         146
Durable responses            146
open dispatches              0
terminal contract failures   0
effective blocking/compromising 0
warning incidents            1
superseded audit incidents   1
frozen summaries             3
Qualification Passports      3
authority Passports          0
qualified dimensions         0
partially-qualified dims     0
```

Run manifest:

```text
98f905fb2ccf5d8175eb9c0bb8ad77d3ffb8138170df9ed159d4ff6ebb4ab2c1
```

The one effective warning is the preserved diagnosis-hash JSON-normalization incident. Exact provider evidence was retained; two canonical attestations cover the two affected rows; it is not blocking or compromising.

The later `INC-GOLD-001` audit record is preserved but formally superseded because its inference incorrectly treated case-design metadata as ground truth.

Final Qualification Passport states:

```text
qwen/qwen3.6-27b       research_only · 0 qualified dimensions
openai/gpt-oss-120b    research_only · 0 qualified dimensions
openai/gpt-oss-20b     research_only · 0 qualified dimensions
```

Qwen was materially closer than the GPT-OSS candidates on rating accuracy, but it still failed the preregistered dimension gates and produced 2 false-fluent judgments on human MAJOR/CRITICAL cases, failing the global authority gate. The GPT-OSS candidates passed that global false-fluent gate but failed every dimension threshold by large margins.

The finalizer was first run in a rollback rehearsal, then executed for real only after rollback state was confirmed clean. All summary and Passport hashes re-verify exactly.

Research remediation state:

```text
profile                       TCJ-ANSWERS-BFF-v3-research
status                        research_draft
base profile                  TCJ-ANSWERS-BFF-v2
prevention rules              10
failure clusters              8
profile SHA-256               1538c9fd6b9487b5e8a3757ec69ba88a27efeb74b058c70a7875d17ce8e88fa1
```

Live status function:

```text
tcj-live-status v4
```

The status page now reports v1.1 as valid completed Qualification evidence and Stage 8 as a research-remediation gate with zero qualified judges. No native-human action is required until a fresh hidden bank is ready.

---

## Definitive Batch 2 production rhythm

For every clean 20-row unit:

```text
frozen scenarios / drafts / sealed audits
→ native-human REVIEW 20
→ reveal machine comparison
→ ENGLISH from final Thai
→ semantic + dictionary ENRICHMENT
→ reachability + Batch 1 regression VALIDATION
→ atomic PROMOTION
→ live VERIFY
→ buyer EXPORT PREVIEW
→ NEXT 20
```

Do not generate later units before the preceding unit has passed its full promotion + verification + export checkpoint unless a governing document explicitly changes this cadence.

The repository still contains older Batch 2 count snapshots. Reverify the canonical database before resuming that track.

---

## Current TCJ architecture state

```text
TCJ core                         TCJ-CORE-v1
General profile                  TCJ-GENERAL-v1
Frozen Answers profile           TCJ-ANSWERS-BFF-v2
Research Answers profile         TCJ-ANSWERS-BFF-v3-research
Guard set                        TCJ-GUARDS-v1
Admission campaign               TCJ-JUDGE-ADMISSION-2026Q3-v1.2 complete
Qualification v1.1               complete / integrity PASS
Qualification production auth    none established
TCJ Panel                         approved methodology · 0 eligible members from current set
Research remediation              active / v1.1 used as DEV evidence
Assurance                         separate / untouched for production validation
Final architecture freeze         pending
OpenAI adapter                    gated until final freeze
xAI adapter                       gated until final freeze
```

The hidden Qualification layer did its job: preliminary/research evidence was not promoted into production authority when the actual native-human-grounded thresholds were not met. The failed run is now useful development evidence for strengthening the judge contract.

---

## TCJ commercial-use and product boundary

The commercial-use/provenance policy governs provider-output restrictions; the plug-and-play policy governs runtime packaging; the Voice Profile licensing extension governs portable profile classification and recurring improvement services.

```text
TCJ Runtime / evaluation can include
✓ independent Thai QA / benchmarking
✓ runtime quality gate
✓ ACCEPT / REVISE / ESCALATE
✓ buyer-model final rewrite at inference time
✓ managed / VPC / on-prem operation
✓ local qualified judge models when available
✓ opt-in non-model TCJ / Voice Profile improvement
✓ separately licensed Voice Profile Improvement Service

not granted automatically
✗ restricted-provider output used as competing-model SFT targets
✗ restricted-provider output used as reward/preference/distillation supervision
✗ synthetic-training/checkpoint optimization where upstream rights do not permit
```

Key product decomposition:

```text
TCJ Core            = non-model software / methodology
TCJ Voice Profile   = non-model versioned configuration
Judge models        = separately sourced / qualified runtime models
```

Voice Profile classification follows technical substance over labels. A neural adapter or learned parameter artifact does not become non-model merely because it is called a Voice Profile.

---

## Final TCJ product direction

Commercial target:

```text
buyer application
→ buyer model
→ TCJ Gateway
→ ACCEPT / REVISE / ESCALATE
→ optional buyer-model final inference rewrite
→ customer
```

Deployment forms:

```text
managed TCJ
customer VPC
fully private / on-prem TCJ Local
```

Product requirements include no browser/manual-run dependency, no manual database setup, no customer training corpus required for first use, signed Docker/Compose and enterprise Helm packaging, portable Voice Profiles, provenance-controlled opt-in improvement, automatic observe → propose → validate → promote workflows, and reproducibility from a fresh environment using only packaged TCJ assets.

The installation target remains <30 minutes from fresh environment to first evaluated response, with <10 minutes as the compatible-default stretch target. Do not market either target as achieved until preserved acceptance evidence exists.

---

## Security migration archive

The private-server migration completed on 17 August 2026. Historical phase reports remain diligence evidence; do not reopen the migration as a planning dependency unless a verified regression appears.

Final migration authority:

```text
ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md
```

The newer plug-and-play deployment policy defines the commercial product shape built on top of that migration.

---

## Immediate next action

Do **not** proceed to production Panel assembly or Assurance using the current three research-only Passports.

Continue autonomously with the technical research phase:

```text
replay TCJ-ANSWERS-BFF-v3-research on exposed v1.1 DEV evidence
→ compare v2 → v3 by dimension / extreme reversal / false-fluent tail risk
→ iterate research profile versions without changing human gold or historical thresholds
→ freeze the revised judge/candidate contract only after research convergence
→ construct a fresh hidden Qualification bank
→ stop for native-human blind review/freeze
→ execute the next Qualification only after that human gate
```

Qualification v1.1 may be used for diagnosis and development because it is now exposed research evidence. It may not be reused as the independent hidden authority test for a configuration designed after seeing its outcomes.

For commercial productization after the core research architecture earns production authority:

```text
fresh Qualification PASS
→ qualified Panel
→ independent Assurance
→ reproducibility / fresh-install acceptance
→ final architecture/runtime freeze
→ connect OpenAI adapter
→ connect xAI adapter
→ model compatibility probes against the same portable Voice Profile
→ plug-and-play Gateway packaging
→ local/private deployment acceptance
→ Voice Profile import/export + improvement proof
→ buyer-ready licensing / diligence package
```
