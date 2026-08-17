# The Book of Answers — Private Server Migration Phase C Report

**Status:** PHASE C COMPLETE  
**Date:** 17 August 2026  
**Supabase project:** `sjpvhgxacsiorrtijqua`  
**Migration plan:** `ANSWERS-PRIVATE-SERVER-MIGRATION-PLAN.md`  
**Phase A baseline:** `ANSWERS-PRIVATE-SERVER-PHASE-A-INVENTORY.md`  
**Phase B mirror:** `ANSWERS-PRIVATE-SERVER-PHASE-B-REPORT.md`  
**Public cutover:** **NOT PERFORMED**  
**New Edge Function/API deployed:** **NO**

> Migration invariant remains frozen: Focus → selected pool → Support additions → recent-6 handling → exactly two distinct Universal additions on every matched non-generic route → one uniform final pick across the complete eligible list. Phase C ports the routing implementation only; it does not redesign semantics or probability.

---

## C1. Canonical server core

Created:

```text
answers-private-server/router-v124.mjs
```

Git blob SHA:

```text
28b2a8e3859939764fc29adfce75d3833574fa06
```

The module is a minimal ECMAScript-module adaptation of frozen live v124. It records the frozen provenance fingerprints directly in the source:

```text
source controller MD5  c8a382f0562737422e891e3300bb08f6
router core MD5        0136cd0b127f4c6c30c8ec098d7ac2e8
CARE source MD5        406dd4fb9bd3278e5300a1b46d86fd8e
INTENTS source MD5     895bdcb00bfeddb1fe0f33be0fe83bcb
router constants MD5   fdda764fa67985aa66bd396630ec3cd6
final fallback MD5     76abfbf89bb565575a48f2bead0c6981
```

Frozen constants remain:

```text
MIN_POOL = 2
MAX_BROAD_WIDEN = 12
RECENT_LIMIT = 6
ROUTER_VERSION = 1.0.0-wip
```

---

## C2. Preserved core behavior

The following v124 functions/semantics were ported with minimal syntax adaptation:

```text
normalize
alias matching
parseQuestion
buildTiers
selectTier
removeRecent
uniformPick
resolve
```

The port preserves:

- NFKC normalization;
- exact quote/dash/zero-width/punctuation handling;
- longest-alias-first matching;
- Latin boundary handling;
- separate semantic/support overlap lanes;
- Focus/Slang/Bridge/Support/Topic/Helper distinctions;
- current special collision-repair code;
- exact intent helper derivation;
- exact tier order;
- Generic/Universal and Support exclusion from ordinary semantic tiers;
- precise Focus seed protection during widening;
- Support owner/addition behavior;
- recent filtering with original-pool restoration when filtering would empty the pool;
- exactly two distinct Universal samples for matched non-generic routes when available under the same candidate rules;
- no extra two-Universal mix for generic routes;
- one uniform final draw across `eligible`;
- reported probability `1 / eligible.length`;
- defensive final fallback order.

No weighting, scoring, embedding, vector search, or semantic rewrite was introduced.

---

## C3. CARE and final `chooseAnswer` wrapper

The canonical module adds a pure server wrapper around the exact v124 selection sequence:

```text
CARE first
→ normal resolve
→ validate picked answer ID
→ generic excluding recent
→ full generic
→ all answer IDs excluding recent
→ all answer IDs
→ ID 1 if required
```

CARE still tests the raw question before normal routing.

The wrapper intentionally does **not** mutate recent history. That is necessary for the new server architecture because an answer must enter recent history only after a successful reveal, not when an answer is merely prepared.

The physical book depth/position is not accepted by the routing core because frozen v124 does not use it semantically.

---

## C4. Injectable deterministic RNG

`resolve()` keeps the v124 injectable `options.rng` behavior.

The server `chooseAnswer()` wrapper also accepts the same injected RNG for its defensive final fallback. With no injected RNG it defaults to `Math.random`, so ordinary runtime behavior remains equivalent while Phase D can deterministically compare fallback behavior too.

The core is therefore pure/deterministic given:

```text
question
frozen dictionary
frozen index
recent IDs
RNG sequence
```

plus corpus-validity input for the final fallback guard.

---

## C5. Phase C smoke tests

Created:

```text
answers-private-server/router-v124.test.mjs
```

Git blob SHA:

```text
23de0c54b76a9bcefeaa296f65030be5d933c036
```

Executed locally with Node 22.16.0:

```text
11 tests
11 passed
0 failed
```

Covered in this Phase C smoke suite:

1. frozen constants;
2. normalization behavior;
3. Thai colleague/friend/work collision behavior;
4. NFKC-sensitive `คำตอบ` behavior as frozen in v124;
5. recent-6 removal and empty-filter restoration;
6. generic route uses the Universal pool without adding two more Universals;
7. Focus owner + Support additions + exactly two distinct Universals;
8. Universal candidate fallback when fewer than two non-recent Universals remain;
9. CARE precedence and routing bypass;
10. final defensive fallback order using injected RNG;
11. pure/no-mutation recent-history behavior.

These are **Phase C smoke tests only**. They are not being represented as the full deterministic v124 parity proof. Phase D will execute the frozen reference and canonical server module with the same real v124 assets, recent histories and deterministic RNG sequences, then compare complete routing state.

---

## C6. Frozen-source nuance discovered and preserved

A smoke test surfaced a runtime nuance that must not be silently "fixed" during the migration:

```text
normalize('คำตอบ') under NFKC → 'คําตอบ'
```

The frozen v124 special repair checks a composed literal `คำตอบ` after normalization. Under the tested ECMAScript runtime, that literal no longer matches the decomposed normalized text, so the repair branch does not remove the matched `reply` concept for that exact spelling.

Phase C preserves the source behavior as-is. This is precisely why Phase D must compare behavior rather than inferred intent.

No semantic correction was made.

---

## C7. No new exposure

Phase C did **not** deploy a Supabase Edge Function and did not add any public endpoint.

The private Phase B corpus remains sealed in the unexposed `private` schema.

No browser controller, Cloudflare Worker, public HTML, Answers Admin, or Supabase public table was changed.

---

## C8. Live production re-check

After the Phase C repository commits, production remained:

| Path | Version | Bytes | MD5 |
|---|---:|---:|---|
| `/fg-page-answers.js` | 124 | 342604 | `c8a382f0562737422e891e3300bb08f6` |
| `/wip/provenance-final-2026-08-16/fg-page-answers-v124-final-production.js` | 124 | 342604 | `c8a382f0562737422e891e3300bb08f6` |

The live and frozen v124 controller fingerprints remain identical.

---

## C9. Phase C exit gate

```text
[x] v124 router functions ported with minimal syntax adaptation
[x] constants and ordering preserved
[x] exact Universal sampling mechanics preserved
[x] uniform final pick preserved
[x] final fallback preserved
[x] CARE precedence preserved
[x] RNG injectable
[x] core pure/deterministic given explicit inputs + RNG
[x] no public API required to run core
[x] live v124 unchanged
```

**Phase C exit:** PASS.

Next phase: **Phase D — deterministic parity harness against the frozen v124 reference using the real private v124 dictionary/index assets.**
