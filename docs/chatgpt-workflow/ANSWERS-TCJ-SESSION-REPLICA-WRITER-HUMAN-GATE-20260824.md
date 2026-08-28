# TCJ Session-Replica Writer — Native-Human Feasibility Gate

**Date:** 24 August 2026  
**Status:** ACTIVE NATIVE-HUMAN GATE  
**Canonical Supabase project:** `sjpvhgxacsiorrtijqua`

## 1. Why this gate exists

The immediately preceding fresh writer feasibility gate used a strong BFF role prompt and failed `0 SHIP / 8 REVISE` after a frozen native-human review.

The dominant failure was performed BFF caricature: forced intimacy/slang, stretched vowels, camp/emojis, generic reassurance, excess scaffolding and unsupported additions.

Those eight cases remain permanently closed diagnostic evidence and were not reused here.

This new gate tests a different hypothesis:

> A capable writer may perform more naturally when given a reproducible approximation of the project/session memory that makes the current ChatGPT workflow effective, rather than a stronger persona prompt.

## 2. Hosted repository memory

Private-server deployments may mount the full pinned Git checkout locally.

The current hosted Supabase research runtime does not store a GitHub credential. To preserve that security boundary and avoid hidden-qualification contamination, the hosted feasibility test uses a frozen safe Git-memory view.

Canonical Git memory file:

`docs/chatgpt-workflow/ANSWERS-TCJ-SESSION-REPLICA-WRITER-SAFE-MEMORY-V1.md`

Git commit containing that file:

`2b3ac6d2705c0706d7fdefdfeb31868570bbe2dc`

Private frozen snapshot:

```text
snapshot key     TCJ-REPO-SESSION-REPLICA-WRITER-20260824-757a0690
source commit    2b3ac6d2705c0706d7fdefdfeb31868570bbe2dc
files            2
total bytes      28,434
manifest         1c788bec1f3f18509aa652387043647749abbfd796915c360b3e089ad2309f35
```

The snapshot contains:

1. the full repository-connected reference runtime/session-continuity plan;
2. the hosted writer-safe Git memory view derived from canonical voice/human-review authorities and the frozen role-writer failure.

The snapshot key contains the earlier commit prefix because it was allocated before the writer-safe memory file was committed; the snapshot itself was still in `building` state at that point and was rebased before freeze. The authoritative source commit stored in the frozen snapshot is `2b3ac6d...`.

Hidden qualification items, raw corpus rows, raw nearest examples/edit pairs, secrets and provider credentials are excluded.

## 3. Bounded writer-context projection

New deterministic private function:

`private.tcj_writer_context_projection_v1(scenario, source_meaning)`

Contract:

`TCJ-WRITER-CONTEXT-PROJECTION-v1-research`

It uses the existing semantic focus/reachability substrate over the human-reviewed Answers anchor snapshot and returns only aggregate neighborhood evidence:

- semantic focus/topics;
- matched neighborhood size;
- native-human edit rate;
- aggregate shorten/lengthen/line-break-change rates;
- aggregate reviewed surface/register rates;
- reviewed shape medians.

It never returns raw text, answer IDs, nearest examples or edit pairs.

Every trial stores the exact projection JSON and its SHA-256 before generation. The worker recomputes the database-canonical projection hash immediately before provider dispatch and fails closed if it differs.

## 4. Fresh source bank

```text
set id              21
set key             TCJ-SESSION-REPLICA-WRITER-SOURCE-BANK-2026Q3-v1
cases               6
distinct phenomena  6
prior hash overlap  0
source manifest     c2516eb9b1214fc5175ff95e36811a92fcdd97a870d959c3f13fbcb4db01d3f0
```

The bank was frozen before provider generation.

These six cases are writer-feasibility cases only. They may never be exposed to TCJ or reused to score evaluator performance.

## 5. Frozen writer instruction

Writer model:

`gemini-3.5-flash-lite`

Exact writer instruction SHA-256:

`109edee6839af516ab1b24891fdc743dfe243d911b91834d2f492946563333b3`

Instruction meaning:

- act as the working Answers writer;
- use connected project memory and bounded native-human context;
- write the final Thai response actually worth publishing;
- do not perform stereotyped BFF slang;
- do not add warmth, jokes, certainty, facts or explanation merely to sound conversational;
- preserve useful meaning;
- output only the finished Thai response.

The provider generation settings remain the same as the failed role-only writer pilot:

```text
temperature       0.3
maxOutputTokens   180
```

This keeps the main experimental change in the conditioning architecture rather than model/settings.

## 6. Session-replica worker

Historical research slot reused:

`tcj-rewrite-lift-neutral-gemini35-worker-v3`

```text
failed role-only worker   version 6 · SHA 6a252a72a6fbb1e0ad5c3c958ac1658fcb4577f462842f8ebf07c0473bdf821e
first session worker      version 7 · SHA 8745789d1494acb19c031611cea01ba3a6bf1ef67a7248af33090bdc126d9024
active corrected worker   version 8 · SHA c3f7f272a759abb3808cc7562c1efa853f57d30b2f7e7a32df6bbc333aa04cd7
```

Version 7 failed closed before provider dispatch on the first case because it compared Postgres `jsonb::text` hashing to JavaScript `JSON.stringify` hashing. JSON key serialization order differs despite identical evidence.

The incident is preserved in `private.tcj_writer_pilot_incidents` as:

`writer_context_hash_serialization_mismatch_v7`

Provider request sent: `false`.

Version 8 corrects only the hash canonicalization check: both stored and live writer-context hashes now use Postgres canonical `jsonb::text`. No case, source, prompt, evidence projection or frozen hash was changed.

## 7. Generation integrity

All six session-replica drafts completed sequentially.

```text
complete                     6 / 6
terminal failures            0
TCJ exposed                  0
output hash mismatch         0
frozen context hash mismatch 0
provider attempts            6 complete
HTTP 429                     0
average chars                79.5
min / max chars              49 / 107
```

The pre-provider version-7 canonicalization incident is separate and does not count as a provider attempt.

The assistant has not inspected the six finished Thai outputs before native-human review; only aggregate length/integrity data were checked.

## 8. Native-human gate

Protocol:

`TCJ-SESSION-REPLICA-WRITER-HUMAN-REVIEW-2026Q3-v1`

Protocol id: `2`  
State at checkpoint: `reviewing · 0 / 6`

Review URL:

`https://flipgazine.pages.dev/tcj-session-replica-writer-review-v1.html`

Review API:

```text
slot      tcj-rewrite-lift-hard-review-v2
version   7
SHA       2a24bb02d36ffa450f57ebe540b28e2a7ddc679f44fbe2a8b44e719a172c0ea2
```

Review assets:

```text
HTML SHA  d5c5fdc8754d467b95f9fbef35fc4b6f73bf8ac2a575b654d5ad15ee7ee23d65
JS SHA    a07e09efd967288c84072ef19ea834bd5c073a5fb509c397e8bb899c23d71ce8
```

Human question:

> Would you publish this exact finished response unchanged?

- `SHIP` = exact copy publishable unchanged.
- `REVISE` = any meaningful edit, including shortening, wording/rhythm, composition, house voice, stance/certainty, semantic/factual correction.
- Do not balance labels.

After 6/6, freeze and hash the human manifest **before** inspecting the SHIP/REVISE distribution or reading the drafts diagnostically.

## 9. Decision rule after review

If the session-replica writer is still systematically bad, preserve this gate as failed diagnostic evidence and stop. Do not run TCJ evaluator A/B/C on these cases.

If the writer produces a meaningful amount of exact-copy publishable Thai, preserve this feasibility result and create a completely separate fresh evaluator bank for:

```text
A = strong model alone
B = repository-connected TCJ
C = repository-connected TCJ + bounded private evidence
```

No writer-feasibility case may be used in that evaluator score.

## 10. Protected authority

Qualification 2.0 was reverified immediately before this checkpoint:

```text
protocol            TCJ-QUALIFICATION-2.0-2026Q3-v1
status              human_frozen
bank manifest       8e3d6c5fff4860f97bfbfcd8d69c46e5484da0d5c315ed6f4888d0061d09b7c8
human manifest      07a25c08b331c215bf6a7378665726c376045bcb9d547d3cd21eaca22b51428d
machine_exposed_at  null
```

No paid OpenAI/xAI calls were used.

## 11. Current next action

Native human reviews the six raw session-replica writer outputs. Then the assistant freezes/hashes the complete human manifest before interpreting any result.
