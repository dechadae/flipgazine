# The Book of Answers — Batch 2 Corpus, Routing & Reachability Plan

> **Governing architecture; historical baseline numbers.** Preserve the routing, reachability and atomic-promotion rules. Its revision 125 / 948 baseline and staged next actions are historical; use README and the commercial timeline for current counts and active-unit state.

**Status:** GOVERNING IMPLEMENTATION PLAN  
**Created:** 18 August 2026  
**Scope:** Batch 2 promotion into the live private Answers corpus while preserving Batch 1 routing behavior and reachability guarantees.  
**Related:** `ANSWERS-BATCH2-HUMAN-FIRST-REVIEW-CORRECTION.md`, `ANSWERS-BATCH2-SELF-AUDIT-PROTOCOL.md`, `ANSWERS-BATCH2-SELF-AUDIT-IMPLEMENTATION-REPORT.md`, `ANSWERS-VOICE-TONE.md`

---

## 1. Objective

Batch 2 must not become a parallel answer system. After human review and promotion, every Batch 2 answer must behave exactly like a Batch 1 answer in the live Book:

```text
user question
→ normalize / parse
→ aliases + typos resolve to dictionary concepts
→ focus / slang / support / topic / helper signals
→ focus-first pool selection
→ support enrichment
→ two universal additions on non-generic routes
→ recent-answer exclusion
→ uniform random pick from eligible pool
→ private corpus reveal
```

Batch 2 therefore has two separate products:

1. **evaluation provenance** — source, raw ChatGPT draft, ChatGPT diagnosis, Qwen diagnosis, human ACCEPT / EDIT / REWRITE and final Thai;
2. **deployable Book answer** — final Thai, English adaptation, semantic tags, dictionary support and a permanent canonical `answer_id` in `private.answers`.

The first must never be mutated to make the second easier. Promotion derives a deployable record from frozen evidence.

---

## 2. Live Batch 1 baseline that Batch 2 must preserve

Verified against the live private corpus on 18 August 2026:

```text
corpus revision                    125
active answers                     948
universal answers                   75
answers carrying focus tags        795
answers carrying topic tags        821
answers carrying support tags       44
answers carrying helper tags       302
answers with no semantic tags        0
answers unreachable from index       0
```

Current dictionary / parser baseline:

```text
dictionary concepts                268
focus concepts                     182
slang concepts                      38
support concepts                    24
topic concepts                       9
bridge concepts                     15
aliases                           1,139
typos                               146
normalized alias/typo collisions      0
```

The live focus lane contains **220 routable keys**, matching focus + slang concepts. Current pool behavior:

```text
focus pools        220 | median 5 | avg 6.3 | min 1 | max 37
support pools       36 | median 1 | avg 1.6 | min 1 | max 5
topic pools         20 | median 55.5 | avg 66.6 | min 30 | max 180
helper pools         4 | median 99 | avg 101 | min 64 | max 142
```

Current router constants that Batch 2 must not silently change:

```text
MIN_POOL           2
MAX_BROAD_WIDEN   12
RECENT_LIMIT       6
universal additions on non-generic route = 2
```

Current allowed answer-level topics:

```text
beverage
cafe
confidence
conflict
family
food
friends
hangout
hobby
message
money
relationship
relax
rest
shopping
social
style
travel
work
workplace
```

Current allowed helpers:

```text
general
decision
timing
universal
```

**Definition of parity:** after every Batch 2 promotion, all pre-existing Batch 1 answers remain reachable, every promoted Batch 2 answer is reachable under the same router contract, and the routing/index generator remains the same unless a separately approved router change is made.

---

## 3. Batch 2 source-set facts

The frozen Batch 2 source set contains:

```text
1,000 scenarios
20 source domains × 50 scenarios each
129 distinct intended_focus labels
50 audit care_case rows
```

Source domains are editorial generation categories, **not automatically live routing topics**. Examples such as `career`, `dating`, `digital`, `decision`, `life-admin`, and `wellbeing` must be mapped into the existing routing taxonomy where possible rather than blindly creating new top-level topics.

Examples:

```text
career       → work / workplace + concrete focus
 dating      → relationship + concrete focus
 digital     → message / social + concrete focus
 decision    → helper:decision + real subject topic/focus
 life-admin  → concrete focus + general/decision/timing where appropriate
 wellbeing   → rest / confidence / social etc.; CARE handled separately when applicable
```

`intended_focus` is staging metadata. It may suggest a live focus concept, but it is never authoritative over the final human-approved answer or the existing dictionary.

---

## 4. Governing Batch 2 workflow

Every production review unit contains 20 source rows.

The operational sequence is:

```text
frozen source
→ exactly one ChatGPT raw Thai draft
→ raw draft frozen
→ ChatGPT diagnosis-only self-audit
→ required/selected Qwen diagnosis-only audit
→ all machine evidence sealed from reviewer
→ native-human ACCEPT / EDIT / REWRITE
→ final Thai frozen
→ machine evidence revealed for comparison
→ English adaptation created from final Thai
→ semantic enrichment
→ alias/typo dictionary enrichment
→ reachability test suite
→ routing regression
→ promotion-ready unit
→ atomic corpus + dictionary + index promotion
→ post-promotion verification
```

The machine audits are evidence only. They must not determine tags, rewrite the answer, or influence the first human decision.

---

## 5. Human review and final-copy gate

Before any row enters semantic work, it must have one committed human decision:

- **ACCEPT** — final Thai equals the raw Thai exactly;
- **EDIT** — human made a bounded edit;
- **REWRITE** — human replaced the draft materially.

The final Thai becomes the only Thai copy eligible for the live corpus.

Required copy checks before semantic enrichment:

```text
real LF line breaks; no literal transport "\n" sequences
non-empty Thai
no duplicate normalized Thai against active corpus or same review unit
line grouping preserved as authored, not auto-wrapped
no machine rewrite substituted after the human decision
final SHA-256 stored and matched to the review record
```

The first technical 20-row pilot created on 18 August remains non-metric-eligible because of the escaped-line-break ingestion bug. Those rows can test interface ergonomics, but they must not enter official disagreement/edit-rate metrics. A clean metric-eligible unit must use the corrected write path.

---

## 6. English adaptation gate

`private.answers` requires both Thai and English. Therefore Batch 2 cannot be promoted using Thai alone.

English is created **after** final Thai is frozen so the adaptation cannot influence Thai review.

Rules:

```text
preserve the final Thai stance and implication
preserve designed line grouping when practical
adapt culturally rather than translate mechanically
never make the English more explanatory than the Thai
never introduce a different recommendation or safety stance
store English separately from Thai provenance
```

English is deployable Book copy, not part of the native-Thai human evaluation metric unless a separate English review is explicitly added later.

---

## 7. Semantic enrichment: same model as Batch 1

Every promoted normal answer must use the existing Batch 1 semantic fields:

```text
topics[]
focus[]
support[]
helpers[]
is_universal
```

No Batch 2-only runtime tag system is allowed.

### 7.1 Focus

Focus is the primary reachability layer. Use an existing focus/slang concept whenever the final answer clearly belongs to it.

A row may carry multiple focus keys when genuinely useful, but tags must describe situations where the **answer itself is appropriate**, not merely words that appeared in the source question.

Example:

```text
source: เขาอ่านแล้วไม่ตอบตั้งแต่เมื่อคืน เราควรทักซ้ำไหม
final:  ยังค่ะ / seen คืนเดียว / ยังไม่ใช่ / หมายจับ

possible live focus:
seen
reply
message
```

The exact approved set must be checked against the existing dictionary; concept IDs must never be invented ad hoc in the answer row.

### 7.2 Topics

Topics are broad fallback/context lanes and must come from the existing 20 allowed topic values unless a deliberate taxonomy expansion is approved.

Source domain names are not copied automatically into topics.

### 7.3 Support

Support is used for answers that are helpful alongside a matched subject and for support-specific routing. Support keys may use valid focus/slang/support concepts under the existing Batch 1 contract.

Support should remain sparse and purposeful; the current Batch 1 support pools are intentionally small.

### 7.4 Helpers

Only the existing helpers are used by default:

```text
general
decision
timing
universal
```

`decision` and `timing` are functional routing signals, not replacements for subject focus.

### 7.5 Universal

New Batch 2 answers default to **not universal**.

A row becomes universal only through explicit editorial approval. Under the current corpus invariant a universal answer must not also own focus, support or topic tags. It enters the `generic` index and may be mixed into non-generic routes through the existing two-universal mechanic.

The current 75 Batch 1 universals remain untouched unless deliberately edited through the normal corpus workflow.

---

## 8. Reconcile all 129 Batch 2 intended-focus labels before scale

Create a frozen reconciliation matrix for all 129 `intended_focus` values with exactly one classification:

```text
A — exact existing concept
B — synonym / phrasing of existing concept; add alias if useful
C — maps to existing broader/narrower concept; no new concept needed
D — genuinely new focus/slang/support concept required
E — not a focus at all; route by topic/helper/other existing concept
```

For every D item, record:

```text
proposed concept id
kind
human-readable meaning
initial aliases
possible typos
linked topics/helpers
Batch 2 source IDs using it
expected initial pool size
reason an existing concept is insufficient
```

Do not activate a new concept just because the source-set label is novel. The concept must improve user-question recognition or answer-pool precision.

---

## 9. Alias and typo enrichment

Aliases and typos belong to the **dictionary concept**, not to individual answers.

Batch 2 source questions are valuable because they provide natural surface forms for concepts. After each human-approved answer, inspect the source scenario for phrasing that the current parser does not recognize.

### 9.1 Alias rules

Use aliases for legitimate alternative phrasings:

```text
Thai synonyms
Thai chat phrasing
common Thai transliteration
English borrowing used naturally in Thai chat
spacing variants that represent ordinary usage rather than a mistake
short user-style expressions that clearly imply the concept
```

Example concept `seen` may recognize forms such as `อ่านไม่ตอบ`, `อ่านแล้วไม่ตอบ`, `seen แล้ว`.

### 9.2 Typo rules

Use `typos[]` only for plausible mistakes or malformed forms:

```text
common English misspellings
missing/extra character variants with realistic likelihood
common spacing mistakes when they are actually erroneous
frequent transliteration mistakes
```

Do not auto-generate keyboard-neighbor noise or hundreds of speculative typo forms.

### 9.3 Collision invariant

Batch 1 currently has **zero normalized aliases/typos shared by multiple concepts**. Preserve that invariant.

Before accepting a new alias/typo:

```text
normalize it exactly as the router does
confirm it has one concept owner
check overlap with longer aliases
check Thai substring behavior
check Latin token-boundary behavior
reject ambiguous ownership unless the dictionary design is intentionally changed
```

The router's longest-match logic is not permission to create ambiguous concept ownership.

### 9.4 Dictionary proposal review

Routine aliases may be auto-proposed and machine-validated. Surface for human approval only when:

```text
new concept required
alias could plausibly map to multiple concepts
alias materially broadens a concept
new slang/register judgment is involved
new topic/helper implication is proposed
potential collision exists
```

This keeps 1,000-row routing work manageable without surrendering taxonomy control.

---

## 10. Reachability definition

A row is **reachable** when the router can place its permanent answer ID into an eligible pool for an appropriate user question under the live Batch 1 routing algorithm.

Reachability is about **eligibility**, not forcing the random picker to return that answer on one seed.

A passing normal answer needs both:

1. **index reachability** — its permanent answer ID exists in at least one intended index lane (`focus`, `support`, `topics`, `helpers`, or `generic` for universal);
2. **parser-to-pool reachability** — at least one realistic user query parses into a route whose `eligible` set contains that answer ID.

Index membership alone is not enough if no user surface form can reach the concept.

---

## 11. Per-answer reachability probes

For every promoted normal Batch 2 answer, build deterministic probes from the final semantic record.

Required probes:

```text
A. exact frozen source scenario
B. normalized/minimal version of the source scenario
C. at least one query for each primary focus concept using an existing or newly approved alias
D. each newly added alias in a natural query frame
E. each newly added typo in a natural query frame
F. multi-focus query when the row intentionally depends on combined concepts
G. topic/helper fallback probe when the row is deliberately broad
```

A normal answer passes when an appropriate probe produces an eligible pool containing the answer ID.

The exact source scenario should normally reach the answer. If it does not, the tagging/dictionary proposal must be reviewed rather than rationalized away.

### Runtime CARE exception

`care_case` in Batch 2 is an audit label, not automatically the live CARE router. Of 50 audit-care sources, only 7 currently match the hard runtime CARE interceptor.

For any source intercepted by the existing CARE layer:

```text
record CARE interception explicitly
normal-corpus exact-source reachability is not claimed
choose one of:
  - keep as benchmark/evaluation evidence only;
  - adapt it for an adjacent non-CARE normal route if editorially legitimate;
  - deliberately expand the CARE system under a separate approved change.
```

Do not weaken or bypass CARE simply to make a normal answer appear reachable.

---

## 12. Pool-health rules

The goal is parity with Batch 1, not artificial uniformity.

Batch 1 intentionally contains narrow focus pools, including singleton focus pools. Therefore Batch 2 does **not** require every focus pool to contain two answers.

However:

```text
existing narrow concepts may remain narrow
new concepts should preferably launch with >=2 useful answers when possible
if a proposed new concept has only one weak example, prefer mapping to an existing concept or defer activation
support pools may legitimately remain size 1
broad topic/helper pools should not be fragmented into unnecessary new categories
```

After each promotion unit, produce a pool delta report:

```text
focus pool sizes before / after
new focus keys
focus pools strengthened from 1 → 2+
new singleton focus pools
support pool deltas
topic/helper deltas
universal count delta
```

Pool size is a diagnostic, not a quality score.

---

## 13. Existing-Batch-1 regression protection

Every 20-row promotion must run the same regression suite against **all existing active answers**, not only the new 20.

Required invariants after candidate index build:

```text
active old answers lost from index                 0
active new answers lost from index                 0
answers with zero semantic ownership               0
unknown focus/slang keys                            0
unknown support keys                                0
unknown topic values                                0
unknown helper values                               0
normalized alias/typo cross-concept collisions      0
invalid universal ownership                         0
duplicate normalized Thai                           0
```

Existing route probes should also be replayed. Pool expansion is expected; a previously valid route becoming generic-only, empty, or semantically unrelated is a failure.

---

## 14. Candidate route simulation before publishing

Do not publish semantic changes and then discover they are wrong on the live Book.

For each 20-row unit, build a candidate routing asset in a staging transaction using:

```text
current active corpus
+ all previously promoted Batch 2 rows
+ the new 20 final rows
+ candidate dictionary alias/typo/concept patch
```

Then run:

```text
20 exact source probes
all new alias probes
all new typo probes
all new multi-focus probes
existing deterministic routing regression set
index orphan scan
pool delta scan
duplicate/collision scan
```

Only a zero-failure candidate becomes promotion-ready.

---

## 15. Atomic promotion bridge

The current Batch 1 `answer_admin_save` transaction already:

```text
validates full answer payload
validates semantic keys
rejects duplicate Thai
writes active private.answers rows
builds private.answer_build_index()
computes corpus/index hashes
writes private.answer_routing_assets
writes private.answer_corpus_revisions
```

However, it intentionally copies the **previous dictionary unchanged**. Batch 2 may add aliases, typos or concepts, so direct use of the old save path is insufficient for a fully atomic Batch 2 promotion.

Implement a guarded Batch 2 promotion transaction that accepts both:

```text
candidate answer corpus
candidate dictionary patch / dictionary JSON
```

and commits them in the **same corpus revision**.

Recommended owner-only server action:

```text
promote_batch2_unit
```

Recommended database contract:

```text
expected current corpus revision
review unit id
20 source IDs
20 final hashes
20 deployable answer records
candidate dictionary
semantic-enrichment hashes
actor/admin id
```

The transaction must validate the entire candidate first, then atomically:

```text
assign permanent answer IDs
write/update private.answers
build index from final tags
write candidate dictionary_json + index_json into routing assets
compute corpus_md5 + index_md5
audit answer/dictionary counts
write new answer_corpus_revisions row
write Batch 2 source_id → answer_id promotion mapping
commit
```

No state where the answers are live but their aliases are not, or vice versa, is allowed.

---

## 16. Permanent Batch 2 provenance-to-corpus mapping

Do not use temporary technical-review IDs as live corpus IDs.

Add an append-only promotion mapping such as:

```text
source_id
answer_id
review_unit
human_review_id / final_sha256
semantic_record_sha256
dictionary_delta_sha256
corpus_revision
promoted_by
promoted_at
```

This lets buyer diligence trace:

```text
B2-0374 source
→ raw ChatGPT draft
→ machine diagnoses
→ human final
→ final routing semantics
→ live answer #XXXX
→ corpus revision R
```

without exposing the private corpus publicly.

---

## 17. Recommended semantic staging record

Create a private append-only semantic record for each finalized Batch 2 source before promotion.

Suggested fields:

```text
source_id
final_sha256
proposed_topics[]
proposed_focus[]
proposed_support[]
proposed_helpers[]
proposed_is_universal
approved_topics[]
approved_focus[]
approved_support[]
approved_helpers[]
approved_is_universal
new_alias_proposals jsonb
new_typo_proposals jsonb
new_concept_proposals jsonb
reachability_status
reachability_evidence jsonb
approved_by
approved_at
```

Routine rows can auto-pass semantic approval when they use only existing concepts and all deterministic probes pass. New concepts/collisions remain human-gated.

---

## 18. Thai Audit / reviewer UX after human decision

The human-first language decision screen should remain uncluttered before ACCEPT / EDIT / REWRITE.

After the human decision is committed and AI evidence is revealed, add a separate **Routing readiness** state rather than mixing routing suggestions into language judgment.

Recommended states:

```text
HUMAN PENDING
→ HUMAN FINAL
→ ROUTING PROPOSED
→ ROUTING VERIFIED
→ READY TO PROMOTE
→ LIVE r### / answer #xxxx
```

Routine semantic proposals can happen automatically in the background. The reviewer should be interrupted only for:

```text
new concept approval
ambiguous alias
questionable support ownership
universal proposal
topic taxonomy expansion
reachability failure
CARE interception requiring a decision
```

This preserves native-human language independence while keeping 1,000-row production practical.

---

## 19. Review-unit promotion gate

A 20-row unit is `READY TO PROMOTE` only when all required rows satisfy:

```text
20/20 human decisions committed
20/20 final Thai hashes present
0 literal escaped-linebreak storage defects
20/20 English adaptations present
20/20 semantic records complete
all semantic keys valid
all dictionary proposals resolved
0 alias/typo collisions
0 duplicate Thai
all normal rows have parser-to-pool reachability evidence
all runtime-CARE exceptions explicitly classified
candidate index has 0 unreachable active answers
existing routing regression passes
candidate corpus/index/dictionary hashes generated
```

Promotion is a single transaction. If one validation fails, **none of the 20 becomes live**.

---

## 20. Post-promotion verification

Immediately after each committed unit:

```text
new revision = previous revision + 1
active answer count matches expected promotion count
max answer id is consistent
corpus_md5 matches recomputation
index_md5 matches recomputation
routing asset dictionary hash/delta matches candidate
0 active answer missing from index
20 source→answer mappings present
exact-source reachability probes replay successfully
existing regression suite still passes
public Book can prepare/reveal at least one seeded route reaching the new unit through the private service
```

Do not continue to the next review unit until this check passes.

---

## 21. Scaling sequence

### Stage A — repair the pilot path

Before metric-eligible production:

```text
fix and byte-verify LF line-break writes
verify reviewer save path
verify 100% human-first AI sealing
verify Qwen timestamps are pre-human
verify human decision persistence
```

### Stage B — build the routing bridge

Before reviewing hundreds of rows:

```text
reconcile the 129 intended_focus labels
implement semantic staging
implement alias/typo proposal + collision validation
implement route-probe generator
implement candidate corpus/index simulator
implement atomic answers + dictionary promotion
implement source_id → answer_id promotion mapping
```

### Stage C — clean metric pilot

Use a fresh 20-row unit whose raw drafts are stored correctly.

Run the complete path:

```text
generate
→ audit sealed
→ human review
→ English
→ semantic enrichment
→ dictionary enrichment
→ reachability
→ candidate regression
→ promotion
→ post-promotion verification
```

Do not scale until this entire cycle passes.

### Stage D — production rhythm

Repeat in 20-row units:

```text
20 human finals
→ 20 routing-ready
→ one atomic corpus revision
→ verify
→ next 20
```

The final live active-answer count should reach approximately **1,948** if all 1,000 Batch 2 records are legitimately promotable. Any hard runtime-CARE exceptions that are intentionally benchmark-only must be reported transparently rather than forcing them into normal routing to hit a cosmetic count.

---

## 22. Reachability dashboard / evidence to retain

For each corpus revision produced by Batch 2, store a compact machine-readable report with:

```text
revision
old active count
new active count
promoted source IDs / answer IDs
unreachable old answers
unreachable new answers
semantic-zero answers
new concepts
new aliases
new typos
alias collisions
focus-pool delta
support-pool delta
topic/helper delta
universal delta
source-probe pass rate
new-alias probe pass rate
new-typo probe pass rate
regression pass/fail
corpus_md5
index_md5
```

This is both engineering evidence and buyer-diligence evidence.

---

## 23. Final acceptance criteria for Batch 2

Batch 2 is complete only when all of the following are true:

```text
all intended production rows have a frozen human final
all production rows have deployable English
all promoted rows use the same private.answers schema as Batch 1
all promoted rows use the same focus/topic/support/helper semantics
all parser expansion lives in the same canonical dictionary
0 normalized alias/typo cross-concept collisions
0 active answers with no semantic ownership
0 active answers unreachable from the routing index
all normal promoted answers have parser-to-pool reachability evidence
all CARE exceptions are explicit and correctly handled
all existing Batch 1 routing regression tests still pass
all promotions are revisioned, hashed and reversible
all source→live-answer mappings are preserved
public client remains corpus-free
private answer service remains the only runtime corpus path
```

The quality bar is not merely “1,000 more reviewed Thai strings.”

The target is:

> **1,000 new reviewed records that strengthen the same semantic graph, parser vocabulary, routing pools and reachability system that made Batch 1 useful.**

That is the Batch 2 definition of parity with Batch 1.
