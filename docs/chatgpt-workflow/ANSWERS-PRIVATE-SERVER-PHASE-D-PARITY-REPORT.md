# The Book of Answers — Private Server Migration Phase D Parity Report

> **Archive note:** Historical Phase D parity evidence. Preserve the proof chain; current post-cutover regression authority is the GitHub parity workflow and Phase K manifest.

**Status:** PHASE D COMPLETE — HARD GATE PASS  
**Date:** 17 August 2026  
**Supabase project:** `sjpvhgxacsiorrtijqua`  
**Migration plan:** `ANSWERS-PRIVATE-SERVER-MIGRATION-PLAN.md`  
**Phase C core:** `answers-private-server/router-v124.mjs`  
**Parity harness:** `answers-private-server/parity-v124.mjs`  
**Reference runner:** `answers-private-server/parity-v124-runner.mjs`  
**CI workflow:** `.github/workflows/answers-v124-parity.yml`  
**Passing workflow run:** `32003607239`  
**Passing commit:** `d08259d8d31b662973871525a38fc37974a92f7f`  
**Public cutover:** **NOT PERFORMED**  
**New public/server API deployed:** **NO**

> Hard migration invariant proven: frozen live v124 Focus → selected pool → Support additions → recent-6 handling → exactly two distinct Universal additions on every matched non-generic route → one uniform final pick across the complete eligible list is deterministic-state-equivalent to the Phase C canonical server core.

---

## D1. Frozen reference gate

The harness reads the exact live controller row from the same Supabase `public.site_files` source used by the Flipgazine shell, using the existing public anon read path.

Before any reference code is evaluated, the runner requires:

```text
path     /fg-page-answers.js
version  124
bytes    342604
MD5      c8a382f0562737422e891e3300bb08f6
```

The passing run reported the same 342604-byte source and MD5.

The harness additionally verifies all migration-critical Phase A source slices before execution:

| Asset | Frozen MD5 |
|---|---|
| answers literal | `c8e159c6f32ce9513056fbbe4585830d` |
| CARE | `406dd4fb9bd3278e5300a1b46d86fd8e` |
| FOCUS_DICT | `c488cef1270aed127cfd0e6d86452bfd` |
| FOCUS_INDEX | `0fca819ceb7bc2832d052e2e56b801f9` |
| INTENTS | `895bdcb00bfeddb1fe0f33be0fe83bcb` |
| router constants | `fdda764fa67985aa66bd396630ec3cd6` |
| router core | `0136cd0b127f4c6c30c8ec098d7ac2e8` |
| chooseAnswer final fallback | `76abfbf89bb565575a48f2bead0c6981` |

If the source version, full MD5 or any critical slice changes, parity refuses to run against the changed source.

---

## D2. Reference execution model

The frozen v124 source is evaluated in an isolated Node VM as the old/reference router.

The server candidate is imported from:

```text
answers-private-server/router-v124.mjs
```

Both implementations receive:

- the same exact frozen `FOCUS_DICT`;
- the same exact frozen `FOCUS_INDEX`;
- the same question;
- the same explicit recent-ID history;
- independent instances of the same deterministic seeded PRNG;
- the same `MIN_POOL` and `MAX_BROAD_WIDEN` defaults.

The test therefore compares behavior under equal input and equal random-number streams rather than comparing approximate answer quality.

---

## D3. Real frozen asset counts exercised

The passing reference asserted:

```text
dictionary concepts   268
Focus index keys      220
Support index keys     36
Universal IDs          75
MIN_POOL                2
MAX_BROAD_WIDEN        12
RECENT_LIMIT             6
```

These are the exact current frozen-v124 values. As recorded in Phase A, they remain authoritative even where older plan prose used different Focus/Support counting definitions.

---

## D4. Question generation

The parity corpus contained **5,386 distinct questions**.

Coverage was generated from the real frozen dictionary, including:

- aliases;
- typo aliases;
- Thai `ควร … ไหม` wrappers;
- Thai timing wrappers;
- English `should I …?` wrappers for Latin terms;
- deterministic cross-concept combinations to exercise multi-Focus, near-Focus and widening behavior;
- hand-curated Thai/English regressions;
- colleague/friend collision cases;
- work/colleague/hobby collision cases;
- reply/คำตอบ cases;
- Focus + Support mixes;
- slang and bridge vocabulary;
- food/cafe/barista/bartender cases;
- no-semantic-match generic cases.

---

## D5. Recent-history matrix

For generated questions the harness derives multiple recent-ID conditions, including:

```text
no recent IDs
six Universal IDs recent
IDs from the selected/base pool recent
IDs from the resolved eligible pool recent
```

This exercises v124's rule:

```text
remove the last six recent IDs
if anything remains -> use filtered pool
if nothing remains -> restore the original pool
```

Recent history is supplied identically to old and new cores for this internal test only. The future public service remains responsible for server-owned recent state.

---

## D6. Deterministic seeds

Every route-state case was tested with three independent deterministic streams:

```text
1
42
0xC0FFEE  (12648430)
```

The same PRNG algorithm and seed are instantiated separately for frozen v124 and the server candidate, ensuring both consume the same random sequence if—and only if—their routing control flow remains equivalent.

---

## D7. Exact state compared

For every deterministic route case, parity compares the complete migration-contract state:

```text
parsed
tiers
selectedTier
basePool
supportKeys
supportAdds
pool
eligible
universalAdds
pick
widened
small
fallback
probability
minPool
maxBroadWiden
```

`parsed` includes the semantic arrays, intents and alias-hit structures produced by the frozen parser.

This is stricter than checking the final answer ID alone.

---

## D8. Hard parity result

Passing GitHub Actions output:

```text
status                    PASS
generatedQuestions         5386
routeCases                64626
routeDifferences              0
CARE cases                    6
normal chooseAnswer cases    15
final fallback cases          4
```

**64,626 / 64,626 deterministic route-state comparisons matched exactly.**

There are **zero unexplained parity differences**.

This satisfies the mandatory Phase D migration gate.

---

## D9. Sacred probability mechanics independently asserted

Beyond old-vs-new state equality, every passing route is checked for the migration invariants directly.

### Matched non-generic routes

Required and passed:

```text
universalAdds.length === 2
both Universal IDs are distinct
both IDs belong to index.generic
eligible = recent-filtered base/support pool + those 2 IDs
probability === 1 / eligible.length
```

There is no class weighting after eligibility.

Each Focus, Support and added Universal ID in `eligible` has the same final probability.

### Generic route

Required and passed:

```text
universalAdds.length === 0
```

The Universal pool itself remains the generic answer pool; another pair is not appended.

---

## D10. CARE parity

CARE is tested outside ordinary routing with six representative inputs covering:

```text
self-harm / want-to-die
medical / chest-pain / medication
unsafe / abuse / threat
Thai and English variants
```

Result:

```text
6 / 6 PASS
```

For each case both implementations entered CARE first and returned the same frozen CARE answer.

CARE did not enter ordinary Focus/Support/Universal selection.

---

## D11. Full chooseAnswer parity

Normal `chooseAnswer` was tested separately from `resolve()` so the wrapper behavior was not assumed from core parity.

Questions include matched Focus, mixed Thai/English and generic/no-match cases over three deterministic seeds.

Result:

```text
15 / 15 PASS
```

Final answer ID and selected tier matched frozen v124.

---

## D12. Defensive final fallback parity

The final fallback outside `resolve()` was forced explicitly by making the routed answer appear invalid.

All four fallback stages were exercised:

1. Universal/generic excluding recent;
2. full Universal/generic pool;
3. all answers excluding recent;
4. full all-answer pool.

Result:

```text
4 / 4 PASS
```

The server candidate consumed randomness and selected the same fallback IDs as frozen v124.

---

## D13. First two CI runs were reference-plumbing failures, not routing failures

For audit clarity, the first two workflow attempts failed before any parity cases executed.

### Run 1 — `32003336347`

The harness initially fetched:

```text
https://flipgazine.pages.dev/fg-page-answers.js
```

Cloudflare returned the static shell/fallback transport rather than the database controller. The full-response MD5 therefore did not equal the stored controller MD5. The harness stopped before evaluating either router.

### Run 2 — `32003436854`

The full-response MD5 assumption was relaxed to exact critical-source-slice checks, but the fetched shell contained no `var answers=` marker. Again, execution stopped before any parity comparison.

Inspection of `flipgazine-root-3/index.html` confirmed the real page loader fetches database-backed files via:

```text
/rest/v1/site_files?path=eq.<path>&select=content
```

The final runner was therefore changed to use the same public `site_files` source, while restoring a strict full source version/MD5 gate.

No router code was changed in response to either plumbing failure.

---

## D14. Production remained unchanged

After the passing parity run, Supabase was re-queried.

```text
/fg-page-answers.js
version 124
bytes   342604
MD5     c8a382f0562737422e891e3300bb08f6

/wip/provenance-final-2026-08-16/fg-page-answers-v124-final-production.js
version 124
bytes   342604
MD5     c8a382f0562737422e891e3300bb08f6
```

No public route, answer corpus row, routing dictionary/index, animation or probability mechanic was modified during Phase D.

No Answers Edge Function/public server API was deployed.

---

## D15. Reusable parity CI guard

The private repository now contains a reusable GitHub Actions workflow:

```text
.github/workflows/answers-v124-parity.yml
```

It reruns when the canonical router, parity harness, reference runner or workflow changes.

This gives later migration phases an automatic regression tripwire against frozen v124 while the migration is being completed.

---

# Phase D exit criteria

```text
[x] frozen reference source is fingerprint-gated
[x] real v124 dictionary/index used
[x] deterministic RNG identical on both sides
[x] dictionary-derived question matrix created
[x] Thai/English collision regressions included
[x] recent histories exercised
[x] complete route state compared
[x] exactly-two Universal rule asserted
[x] uniform final probability asserted
[x] CARE tested separately
[x] normal chooseAnswer tested separately
[x] final defensive fallback tested separately
[x] zero unexplained differences
[x] production v124 unchanged
```

**Phase D exit: PASS.**

The migration may now proceed to **Phase E — anonymous server session + prepare/reveal token service**, with frozen v124 parity remaining a hard regression gate.
