# The Book of Answers — Private Server Migration Plan

**Status:** READY TO BUILD  
**Created:** 17 August 2026  
**Project:** Flipgazine / The Book of Answers  
**Supabase:** `sjpvhgxacsiorrtijqua`  
**Primary production reference:** `/fg-page-answers.js` **v124** · MD5 `c8a382f0562737422e891e3300bb08f6`  
**Canonical bilingual copy freeze:** v122 · MD5 `d12ef72740edd955ddc11aedfe232c2c`

> **Read this file first in the next chat before changing Answers architecture.**
>
> This migration is a **security/source-of-truth migration, not a routing redesign**. The Focus → pool → probability → uniform random answer mechanics of live v124 must remain intact. The public Book must feel and answer the same; the difference is that the 948-row corpus and routing assets no longer ship to the browser.

---

## 0. Non-negotiable objective

Today, public `/fg-page-answers.js` ships the corpus directly in JavaScript as `var answers=[...]`. A visitor can fetch one public controller and obtain the entire answer asset plus semantic metadata.

The target architecture is:

```text
public browser
   ↓ question
Cloudflare boundary
   ↓ server-authenticated request
Supabase answer service
   ↓
ONE canonical routing core
   ↓
private corpus + private routing assets
   ↓
relevant pool calculated on server
   ↓
uniform random pick using SAME live mechanics
   ↓
short-lived single-use opaque reveal token
   ↓ user physically opens book
ONE Thai/English answer returned
```

The public browser must never receive:

- all 948 normal answers;
- all 3 CARE responses as a downloadable corpus;
- Focus dictionary;
- Focus inverted index;
- Support pools;
- Universal pool membership as a bulk asset;
- eligible answer pool contents;
- routing diagnostics.

A public user receives only what one legitimate Book interaction needs.

---

# 1. The live v124 answer mechanic that MUST survive unchanged

This section is the migration contract. Do not “improve,” simplify, score-weight, vectorize, reinterpret, or redesign it during the security move.

## 1.1 Corpus/routing constants

Live v124 uses:

```js
MIN_POOL = 2
MAX_BROAD_WIDEN = 12
RECENT_LIMIT = 6
```

Known production corpus structure:

- 948 normal answers;
- 75 Universal answers;
- 42 Support answers;
- 183 canonical Focus concepts;
- 3 CARE responses checked before normal routing.

Core principle:

> **Precision chooses the pool. Chance chooses the answer.**

## 1.2 CARE remains first

Current `chooseAnswer()` first checks CARE regexes before normal Focus routing.

This precedence must remain:

```text
CARE match
→ return CARE answer
→ do NOT enter normal Focus/Support/Universal routing
```

CARE behavior must be parity-tested separately.

## 1.3 Question normalization must remain identical

The server port must preserve live v124 `normalize()` behavior:

- NFKC normalization when available;
- lowercase;
- quote normalization;
- dash normalization;
- zero-width character removal;
- punctuation-to-space handling;
- repeated-period handling;
- whitespace collapse and trim.

Do not substitute a “better” tokenizer during this migration.

## 1.4 Alias matching must remain identical

Live `parseQuestion()`:

- builds aliases and typo aliases from the dictionary;
- sorts longest alias first;
- uses word boundaries for Latin aliases;
- uses substring spans for non-Latin aliases;
- prevents overlapping hits within semantic/support lanes;
- keeps Focus, Slang, Bridge, Support, Topic and Helper semantics distinct;
- carries concept-provided topics/helpers into parsed metadata;
- preserves the special collision repairs for:
  - `colleague` vs `friend`;
  - `work` inside colleague/hobby phrases;
  - `reply` vs `คำตอบ`;
- derives intent helpers exactly as live v124 does.

All of this moves server-side without semantic edits.

## 1.5 Tier construction must remain identical

Current tier order is:

```text
all-focus
near-focus
any-focus
all-topics
any-topic
all-helpers
any-helper
generic
```

Important details:

- If parsed Focus exists, Focus owns semantic routing; otherwise Slang may act as semantic owner.
- Generic/Universal IDs and Support IDs are excluded from ordinary Focus/Topic/Helper tier lists.
- `all-focus` = intersection of all matched Focus lists.
- for 2+ Focus concepts, `near-focus` requires at least `focusCount - 1` matched Focus concepts;
- `any-focus` = union of Focus lists;
- topics/helpers follow all/any tiers;
- generic is the Universal pool.

Tier de-duplication and numeric ID sorting must match current behavior.

## 1.6 Tier selection/widening must remain identical

Live `selectTier()` behavior must be ported exactly:

- minimum acceptable pool defaults to 2;
- broad widening maximum defaults to 12;
- a precise Focus seed is protected when widening;
- broad tiers that no longer contain the seed Focus pool are rejected;
- acceptable Focus tiers win immediately;
- a non-Focus broader tier can win only under the existing size/containment rules;
- if a Focus seed exists but remains smaller than minimum pool, keep it as a `small` pool rather than abandoning it;
- if no Focus tier exists, retain first meaningful non-generic small tier;
- only then fall back to generic.

Do not replace this with weighted scoring.

## 1.7 Support mechanics must remain identical

Server routing must preserve the current Support logic:

```text
supportKeys = unique(
  parsed.focus
  + parsed.slang
  + parsed.support
)
```

Then:

- construct `supportPool` from `index.support[supportKeys]`;
- if Support exists and the selected owner is generic OR there is no actual subject, Support itself may become the selected tier;
- otherwise Support IDs not already in the chosen tier are appended as `supportAdds`;
- non-generic `mixedPool` = chosen owner pool + relevant support additions;
- generic does not receive separate Support concatenation in the normal path.

This is a critical part of the current quality and must not drift.

## 1.8 Recent-answer behavior must remain the same from the user's point of view

Live client keeps six recently seen normal-answer IDs.

Current behavior:

```text
remove last 6 recent IDs from current pool
IF removal leaves something:
    use filtered pool
ELSE:
    restore original pool
```

The new architecture moves this state to the server.

**Do not accept a client-supplied `recent` list.**

The server owns recent history and updates it only after an answer has actually been revealed to the user.

Abandoned prepared answers must NOT enter recent history.

## 1.9 Universal mixing and probability are sacred

For every matched **non-generic** route, live v124 does this:

1. derive `baseEligible` after recent removal;
2. choose exactly **2 distinct random Universal answers** from `index.generic` that are not recent and not already in base eligible when possible;
3. if fewer than two non-recent candidates remain, retry from Universal excluding only base eligible;
4. append those two Universal IDs to eligible;
5. pick uniformly from the final eligible list.

Therefore:

```text
eligible = relevant owner/support pool after recent handling
         + exactly 2 distinct Universal additions
```

The final answer is **uniform random across every ID in `eligible`**.

There is no weighting between Focus, Support and the two Universal additions once they are eligible.

Current reported probability is:

```text
1 / eligible.length
```

This exact probability mechanic must remain.

This specifically preserves the approved product rule:

> **Two Universal answers join every matched non-generic pool with the same final probability as every other eligible answer.**

For a generic route, the Universal pool itself is the answer pool; do not add another two Universals.

## 1.10 Final fallback must remain identical

If `resolve()` somehow returns an invalid/missing answer ID, live `chooseAnswer()` falls back in this order:

1. generic/Universal IDs excluding recent;
2. full generic/Universal pool;
3. all answer IDs excluding recent;
4. all answer IDs;
5. default ID 1 if required.

The server port must preserve this defensive fallback.

## 1.11 Depth remains theatrical, not semantic

Live `chooseAnswer(q, pos)` receives physical book position, but `pos` is not used for routing or answer selection.

Therefore the migration must preserve:

> **Physical depth is part of the ritual, not an answer ID or probability input.**

Do not map drag depth to array index.

Do not change answer probability based on where the user opens the paper block.

---

# 2. Source-of-truth architecture

## 2.1 Private schema

Prefer an unexposed Postgres schema such as:

```text
private.answers
private.answer_routing_assets
private.answer_sessions
private.answer_requests
private.answer_usage
private.answer_settings
```

The corpus should not be directly reachable through the public Data API at all.

RLS/grants still apply as defense in depth, but the primary boundary is that `private` is not an exposed API schema.

## 2.2 `private.answers`

Initial import must preserve answer IDs **1–948 exactly**.

Suggested fields:

```text
answer_id integer primary key
thai text not null
english text not null
topics text[] not null default '{}'
focus text[] not null default '{}'
support text[] not null default '{}'
helpers text[] not null default '{}'
is_universal boolean not null
active boolean not null default true
created_at timestamptz
updated_at timestamptz
revision bigint
```

Do not normalize or rewrite Thai/English during import.

Initial copy must be byte-for-byte equivalent to live v124 answer fields, which are already proven identical in Thai/English to the v122 bilingual copy freeze.

## 2.3 Routing assets

During migration, preserve the exact v124:

- `FOCUS_DICT`;
- `FOCUS_INDEX`;
- INTENT rules;
- CARE rules;
- router constants/version.

Suggested private config record:

```text
corpus_revision
router_version
dictionary_json
index_json
source_controller_md5
created_at
```

Do not regenerate and silently substitute a semantically different index during the initial port.

First establish exact parity using the live v124 assets.

After DB-native Admin is proven, deterministic index regeneration can become the normal save path.

---

# 3. One canonical routing core, three consumers

There must be exactly **one** server routing implementation.

```text
                    CANONICAL ROUTING CORE
                             │
             ┌───────────────┼────────────────┐
             │               │                │
        public prepare    admin audit      parity harness
             │               │                │
       safe capability    diagnostics      deterministic proof
```

No second admin router.

No copied scoring approximation.

No old `new Function()` evaluation after cutover.

## 3.1 Public prepare consumer

Input:

```json
{
  "question": "..."
}
```

Server:

1. resolve/verify anonymous server session;
2. apply prepare abuse limits;
3. CARE check or normal routing;
4. use server-owned recent history;
5. calculate full matching pool internally using exact v124 mechanics;
6. pick one answer internally;
7. create a short-lived request record;
8. return only an opaque reveal token.

Public response example:

```json
{
  "request_token": "opaque-random-value",
  "expires_in": 120
}
```

It must NOT expose:

- answer ID;
- Thai;
- English;
- tier;
- pool;
- focus concepts;
- probabilities;
- diagnostic metadata.

## 3.2 Public reveal consumer

Input:

```json
{
  "request_token": "opaque-random-value"
}
```

Server validates:

- correct server-owned session;
- token exists;
- token is unexpired;
- token has not already been consumed;
- reveal quotas/abuse rules permit it.

Then atomically consumes the token and returns one answer.

Public response:

```json
{
  "id": 441,
  "thai": "...",
  "english": "..."
}
```

No pool or semantic metadata leaves the server.

## 3.3 Admin audit consumer

Admin-only, dry diagnostic call using the **same routing core**.

It may return:

```text
parsed
selectedTier
basePool IDs
supportKeys
supportAdds
pool IDs
eligible IDs
universalAdds
pick
widened
small
fallback
probability
```

It should not create a public reveal token, mutate recent history, or consume public quotas.

The admin UI already has authorized access to corpus rows, so audit diagnostics can use IDs rather than redundantly returning every answer body.

## 3.4 Parity consumer

Internal/test-only deterministic execution of the exact same core.

It receives explicit:

- question;
- dictionary/index revision;
- recent IDs;
- deterministic RNG function/seed.

It returns the complete route state for exact comparison with frozen v124 reference behavior.

---

# 4. Anonymous session design

## 4.1 Server-owned session

The public visitor does not need to log in.

Use an opaque random anonymous session identifier, ideally in a same-origin cookie such as:

```text
fg_ans_sid
HttpOnly
Secure
SameSite=Lax
```

Do not let JavaScript invent or rewrite the authoritative recent-history state.

## 4.2 What the session owns

Server-side session state should include at minimum:

```text
session_id / session_hash
created_at
last_seen_at
recent_revealed_answer_ids (max 6 for routing semantics)
usage counters / linkage
```

Recent answers are appended only after successful reveal.

## 4.3 Privacy

Do not persist raw user questions longer than necessary unless there is an explicit product reason.

For ordinary routing, the question can be processed in-memory and discarded.

If abuse/analytics need identifiers, prefer keyed hashes and coarse metrics rather than unnecessary content logging.

---

# 5. Prepare/reveal token contract

## 5.1 Token requirements

Each prepared answer record should contain server-side information such as:

```text
token_hash
session_id
answer_id
created_at
expires_at
revealed_at
corpus_revision
router_version
```

The raw token is shown once to the browser; store only a secure hash where practical.

Use high-entropy cryptographically random tokens.

## 5.2 Short TTL

Starting TTL:

```text
120 seconds
```

90–120 seconds is acceptable. Make it configuration, not a buried magic number.

It is long enough for the tactile gesture and short enough to prevent token stockpiling.

## 5.3 Session binding

A token must be valid only for the anonymous session that created it.

Do not bind correctness strictly to IP because legitimate mobile IP changes can happen mid-interaction. IP is an abuse signal, not the identity authority.

## 5.4 Single-use atomic consume

This is a hard implementation invariant.

Do NOT implement:

```text
SELECT token
check revealed_at
UPDATE token
```

That is race-prone.

Use one atomic compare-and-set equivalent to:

```sql
UPDATE private.answer_requests
SET revealed_at = now()
WHERE token_hash = $1
  AND session_id = $2
  AND revealed_at IS NULL
  AND expires_at > now()
RETURNING answer_id;
```

Only the request that successfully changes the row gets the answer.

No returned row means invalid, expired, wrong-session or already consumed.

## 5.5 Abandoned prepare behavior

If a user presses `ถามดิ` but never opens the book:

- token expires;
- answer is never revealed;
- answer is NOT added to recent history;
- no corpus text left the server.

## 5.6 Cache behavior

Prepare and reveal responses:

```http
Cache-Control: no-store, private, max-age=0
```

Also use defensive legacy no-cache headers where useful.

No question→answer response should be stored in shared CDN/browser API caches.

---

# 6. Abuse protection

Security objective is not “public outputs are impossible to collect.” That is impossible for a public answer product.

Objective:

> Turn one-request bulk extraction into costly, rate-limited, observable one-answer interactions.

## 6.1 Cloudflare outer boundary

Prefer same-origin public endpoints under Flipgazine, for example:

```text
/api/answers/prepare
/api/answers/reveal
```

Cloudflare handles:

- request burst limits;
- bot/challenge rules where available;
- same-origin request boundary;
- input-size controls;
- outer IP-based abuse signals.

The Cloudflare Worker then calls the Supabase answer service using a **server-only shared secret/header** stored as a Worker secret.

The Supabase function rejects direct requests that do not contain a valid server-to-server credential.

This prevents attackers from simply discovering and bypassing Cloudflare via the underlying Supabase Function URL.

## 6.2 Prepare must be independently rate-limited

Do not only rate-limit reveal.

`/prepare` performs real routing work and can otherwise become an amplification/DoS endpoint.

Initial reasonable configuration target (tunable after observing real use):

```text
prepare burst/session: ~10 per minute
prepare hourly/session: ~40 per hour
prepare burst/IP: ~20 per minute
prepare hourly/IP: ~100 per hour
```

Treat these as initial operational settings, not sacred product mechanics.

## 6.3 Reveal/distinct-answer limits

Initial UX-friendly starting point:

```text
0–30 revealed answers/session/hour:
    normal

>30:
    introduce Cloudflare friction/challenge where practical

50 distinct reveals/session/hour:
    hard ceiling / 429

~80–100 distinct reveals/IP cluster/hour:
    strong challenge or hard ceiling
```

Make these values configuration.

Do not silently serve irrelevant answers as punishment; that corrupts product quality invisibly.

At an abuse ceiling prefer:

1. throttle;
2. challenge/friction;
3. explicit 429 when necessary.

## 6.4 Outstanding token limit

A session should not accumulate unlimited prepared tokens.

Reasonable starting rule:

- maximum 2–3 live unconsumed tokens per session;
- preparing another can expire the oldest or be rejected.

## 6.5 IP handling

If server-side IP reputation is needed:

- trust only the Cloudflare-added request path/header;
- prefer keyed/HMAC IP hashes in persistent logs rather than storing raw IP indefinitely;
- use raw IP only transiently where infrastructure rate limiting needs it.

---

# 7. Public Book UX integration

The visible ritual must remain:

```text
question
→ ถามดิ
→ question commits
→ drag through paper
→ release
→ book opens
→ bilingual answer
→ ถามอีกดิ
```

## 7.1 When prepare fires

On genuine `ถามดิ` submit:

- keep current UI transition into `pick`;
- fire `/prepare` immediately in the background;
- do not reveal any answer yet.

This uses the user's drag/select time to hide normal server latency.

## 7.2 On release

Current 220 ms seam/release beat must remain visually intact.

On release:

1. finish/capture the physical gesture;
2. wait for prepare token if still pending;
3. call reveal;
4. render one returned answer;
5. continue the existing opening animation.

If network is fast, the user should perceive no difference from live v124.

If network is slower than the existing release beat, keep a subtle physical “chosen seam” state rather than opening an empty book.

Do not change routing to use drag depth.

## 7.3 Failure handling

Network/API failure must not expose fallback corpus in the client.

Never reintroduce a hidden local answer array “just in case.”

Instead:

- show a product-consistent retry state;
- allow another prepare/reveal attempt;
- keep the Book closed if no answer was securely obtained.

---

# 8. Deterministic parity suite — mandatory cutover gate

This is not optional QA.

The server migration must NOT replace production routing until the parity suite passes.

## 8.1 Frozen reference

Reference source:

```text
/wip/provenance-final-2026-08-16/fg-page-answers-v124-final-production.js
MD5 c8a382f0562737422e891e3300bb08f6
```

The live router's `resolve()` already accepts `options.rng`, making deterministic equivalence testing possible.

## 8.2 Deterministic RNG

Use the same seeded PRNG function for both:

- frozen v124 reference router;
- new canonical server router.

For each case, both receive exactly the same RNG sequence.

## 8.3 Exact fields to compare

For every parity case, require exact equality of:

```text
parsed semantic state
all tier names + IDs
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

Where alias-hit object serialization differs only for runtime representation, compare semantically equivalent fields deterministically.

## 8.4 Special final fallback parity

`chooseAnswer()` contains a defensive fallback outside `resolve()` that uses generic → all-answer fallback order.

Move that fallback into the canonical server answer service and test it explicitly with deterministic RNG/mocked randomness.

Do not test only `resolve()` and forget final answer fallback.

## 8.5 CARE parity

All CARE patterns must be explicitly tested for:

- trigger equivalence;
- normal-routing bypass;
- correct returned response.

## 8.6 Test corpus

Minimum parity corpus should include:

- every Focus alias;
- every typo alias;
- every Support alias;
- every Topic alias;
- every Slang/Bridge alias;
- all CARE triggers;
- representative mixed Thai/English questions;
- known overlapping-alias traps;
- colleague/friend collision cases;
- work/hobby/colleague collision cases;
- reply/คำตอบ cases;
- single Focus;
- two Focus;
- 3+ Focus;
- Support-only questions;
- Topic-only questions;
- Helper/intent-only questions;
- generic/unrecognized questions;
- small pools;
- widened pools;
- fallback cases;
- recent histories of length 0, 1 and 6;
- recent history that removes part of a pool;
- recent history that would remove an entire pool and therefore triggers restore;
- multiple RNG seeds per question so Universal sampling and final picks are exercised.

Automatically derive many cases from the dictionary rather than relying only on hand-picked tests.

## 8.7 Acceptance condition

Cutover gate:

> **ZERO unexplained parity differences.**

Not “close.”

Not “similar answer quality.”

Exact routing state under the same inputs and deterministic RNG.

Generate and freeze a parity report as a migration artifact.

---

# 9. Admin migration

Current `/fg-page-answers-admin.js` v22 is not DB-native.

It currently:

1. fetches raw `/fg-page-answers.js` text from `site_files`;
2. parses embedded answer literals;
3. edits items in memory;
4. regenerates Focus index;
5. string-splices the entire JS controller;
6. uses controller version as a concurrency gate;
7. writes the full controller back.

This workflow must be replaced when corpus data leaves the public JS.

## 9.1 Admin authorization

Admin capability is the most privileged part of the new system.

Use Supabase authentication plus the existing **database-side Flipgazine admin authority**, e.g. `is_fg_admin()` / canonical admin membership.

Do not rely only on “the page is hidden” or a client-side boolean.

Required chain:

```text
valid Supabase user JWT
→ server verifies user
→ DB verifies canonical Flipgazine admin authorization
→ only then allow corpus CRUD/audit
```

Authenticated non-admin:

```text
403
zero corpus data
zero routing diagnostics
```

Never expose service-role/secret keys in browser code.

## 9.2 Admin data access

Admin may load the private corpus through an authenticated admin API/service.

Public users may not.

## 9.3 Preserve current validation rules

The DB-native Admin should preserve useful current safeguards:

- Thai required;
- English required;
- duplicate Thai detection;
- Focus concept validation;
- Support concept validation;
- Topic validation;
- Helper validation;
- Universal cannot simultaneously carry Focus/Support/Topic ownership;
- deterministic index regeneration;
- dirty-state UX;
- delete/undo behavior as appropriate;
- routing audit/test capability.

## 9.4 Preserve optimistic concurrency/version gate

Current Admin correctly refuses to overwrite a newer controller version.

Replace that with an explicit corpus revision.

Example:

```text
Admin loads corpus_revision 124
Another writer produces 125
Original admin tries to save expected_revision 124
→ server rejects
→ reload required
```

Apply answer changes + index regeneration + revision increment in one transaction.

No half-updated corpus/index state.

## 9.5 Admin routing test

Current Admin uses extracted/evaluated router code.

After migration, Test Routing calls an **admin-only dry audit consumer of the same canonical routing core**.

It must not duplicate the router implementation.

It must not call public `/prepare` because public prepare has side effects and deliberately hides diagnostics.

## 9.6 Initial migration discipline

During the security migration, freeze production answer editing while data is being imported/parity-tested.

Do not allow simultaneous edits in old JS source and new DB source.

At cutover:

- DB becomes the sole corpus source of truth;
- old raw-JS Admin becomes disabled/retired;
- DB-native Admin becomes authoritative.

---

# 10. Public exposure audit — stripping production alone is NOT enough

A scan on 17 August 2026 found three non-`/wip` public paths that contain actual corpus answer text:

```text
/fg-page-answers.js
  v124
  full 951 Thai-bearing records (948 normal + CARE structures)

/fg-page-answers-three-lab.js
  v37
  full 951 Thai-bearing records

/answers-longest-review.html
  v1
  contains a large embedded review subset (~576 Thai fields)
```

`/fg-page-answers-admin.js` and `/fg-page-answers-thai-review.js` contain parser/marker strings but the first answer text itself is not embedded there.

Therefore cutover must secure **all corpus-bearing public routes**, not only production.

## 10.1 Required public cleanup

At cutover:

- replace `/fg-page-answers.js` with slim public interaction/API controller;
- retire, gate, or strip `/fg-page-answers-three-lab.js`;
- retire, gate, or rebuild `/answers-longest-review.html` so it does not ship the corpus publicly;
- re-scan every public `site_files` row for known answer signatures and embedded answer arrays;
- ensure `/wip/`, `/private/`, `/tmp/` policy boundaries remain inaccessible to public users.

## 10.2 Cache cleanup

After corpus-bearing public bytes are removed:

- purge relevant Cloudflare cache entries if caching is possible;
- verify service worker/PWA caches cannot continue serving the old 272 KB corpus controller to fresh sessions;
- ensure a fresh incognito/uncached request gets the slim controller;
- verify old query-string/cache variants do not expose prior bytes where controllable.

Do not leave an old lab URL as an accidental public dataset mirror.

## 10.3 Hostile retrieval audit

After cutover, as an unauthenticated user test:

- direct public controller fetch;
- lab URLs;
- longest-review URL;
- Supabase Data API attempts against corpus tables;
- guessed private schema endpoints;
- direct Supabase Edge Function calls bypassing Cloudflare;
- admin audit endpoint with no auth;
- admin audit with authenticated non-admin;
- expired token reveal;
- token replay;
- token reveal from wrong session;
- high-rate prepare;
- high-rate reveal.

Expected result: no bulk corpus path.

---

# 11. Detailed implementation sequence

This is the recommended order. Do not skip parity or leave the public corpus exposed after cutover.

## Phase A — freeze and inventory

1. Re-query current live owners/version/hash.
2. Freeze exact v124 controller reference if not already frozen.
3. Confirm v124 Thai/English identity vs v122 remains 0 differences.
4. Extract exact:
   - answers;
   - CARE;
   - dictionary;
   - index;
   - intents;
   - router code/constants.
5. Inventory every public route containing corpus text.
6. Temporarily freeze answer editing during import/parity work.

**Exit:** immutable migration source recorded.

## Phase B — create private database model

1. Create `private` schema if required.
2. Create private answer/config/session/request/usage/settings tables.
3. Add least-privilege grants.
4. Add RLS/authorization defense where applicable.
5. Ensure anon/authenticated public clients cannot select corpus rows.
6. Import IDs 1–948 exactly.
7. Import exact routing assets.
8. Verify row count, per-field hashes and semantic arrays.

**Exit:** private DB is exact data mirror; public live site still unchanged.

## Phase C — canonical server routing core

1. Port v124 router functions with minimal syntax adaptation.
2. Preserve constants and ordering.
3. Preserve exact Universal sampling and uniform final pick.
4. Preserve final fallback.
5. Preserve CARE precedence.
6. Make RNG injectable.
7. Keep the core pure/deterministic given inputs + RNG.

**Exit:** server core can run without public API yet.

## Phase D — deterministic parity harness

1. Execute frozen v124 reference router in test harness.
2. Execute server core with identical inputs/assets/recent/RNG.
3. Build automatic dictionary-derived test cases.
4. Add hand-curated regression questions.
5. Run many seeds.
6. Diff every contract field.
7. Fix until zero unexplained differences.
8. Freeze parity report.

**HARD GATE:** Do not proceed to production cutover if this phase does not pass.

## Phase E — anonymous session + token service

1. Implement server-owned anonymous session.
2. Implement prepare request.
3. Implement 120s opaque token.
4. Store token hash + answer ID + session + revision.
5. Implement atomic single-use reveal.
6. Update recent history only after reveal.
7. Add no-store headers.
8. Add outstanding-token cleanup/TTL cleanup.

**Exit:** one-question → one-token → one-reveal flow works privately.

## Phase F — abuse controls

1. Put Cloudflare same-origin API route in front.
2. Add Worker→Supabase server-only credential.
3. Reject direct underlying function calls.
4. Rate-limit prepare independently.
5. Rate-limit reveal.
6. Add distinct-answer/session/IP ceilings.
7. Add token/session replay protections.
8. Add structured security/usage logs without unnecessary question retention.

**Exit:** scripted enumeration is materially more expensive and observable.

## Phase G — public lab integration

1. Duplicate current UI/interaction behavior into a secure lab route.
2. Remove local corpus from lab controller.
3. Submit triggers background prepare.
4. Drag remains local and immediate.
5. Release waits for prepare if needed then reveal.
6. Preserve 220ms seam beat.
7. Preserve book motion/typography/autofit/share behavior.
8. Verify depth does not affect answer selection.
9. Compare UX latency on Android baseline.
10. Test network failure/retry.

**Exit:** lab feels like live v124 but contains no bulk corpus.

## Phase H — DB-native Admin

1. Replace raw controller parsing with authenticated private-corpus API.
2. Preserve validation rules.
3. Add corpus revision concurrency gate.
4. Regenerate routing index transactionally.
5. Wire Test Routing to shared admin audit core.
6. Verify non-admin gets 403.
7. Verify admin can edit/save/reload without public JS regeneration.
8. Freeze old Admin as rollback reference only.

**Exit:** DB is operable as sole source of truth.

## Phase I — pre-cutover full acceptance

Required green checks:

```text
[ ] deterministic routing parity = PASS
[ ] 948 imported rows exact
[ ] Focus/Support/Universal mechanics exact
[ ] exactly 2 Universal additions on matched non-generic routes
[ ] uniform final probability exact
[ ] recent-6 semantics exact
[ ] CARE exact
[ ] generic fallback exact
[ ] public UX/animation parity acceptable
[ ] prepare/reveal token security tests pass
[ ] abuse/rate controls active
[ ] Admin CRUD works
[ ] Admin auth enforced at DB/server boundary
[ ] non-admin audit = 403
[ ] public client never receives pool/dictionary/index
```

## Phase J — cutover

Perform as one controlled change window:

1. Backup current live paths.
2. Promote secure public controller.
3. Promote Cloudflare/API route.
4. Switch DB to canonical corpus owner.
5. Promote DB-native Admin.
6. Retire old raw-JS Admin write path.
7. Retire/gate corpus-bearing Three lab.
8. Retire/gate corpus-bearing longest-review page.
9. Purge relevant caches.
10. Re-scan public files.
11. Run hostile retrieval audit.
12. Verify live Book questions still match expected routing behavior.

**Important:** removing public corpus bytes is part of the same cutover, not a later cleanup task.

## Phase K — post-cutover proof

Create a migration manifest recording:

- old v124 controller MD5;
- private corpus row count/hash summary;
- router version/hash;
- parity report hash;
- new slim public controller hash;
- API function versions;
- Admin versions;
- public exposure scan result;
- date/time of cutover.

Keep v124 frozen privately as provenance/rollback evidence.

---

# 12. Rollback strategy

Rollback must not casually re-expose the corpus.

If server routing fails after cutover:

**Preferred rollback:**

- revert server/API implementation to last-known-good secure version;
- keep private corpus private;
- keep public controller corpus-free.

Do NOT make the normal rollback “restore v124 public JS,” because that restores the exact data leak this migration is intended to close.

If absolutely necessary for emergency product availability, temporarily gate/disable public Answers rather than republishing the full corpus.

---

# 13. What must NOT change during this migration

Do not change:

- Thai answer copy;
- English answer copy;
- Focus tags;
- Support tags;
- Topics;
- Helpers;
- Universal membership;
- dictionary vocabulary;
- alias logic;
- CARE behavior;
- `MIN_POOL=2`;
- `MAX_BROAD_WIDEN=12`;
- `RECENT_LIMIT=6`;
- tier order;
- widening semantics;
- Support join semantics;
- exactly two Universal additions to matched non-generic pools;
- uniform final choice across eligible answers;
- final fallback order;
- physical-depth non-semantic behavior;
- Book visual ritual unless a security/network state requires a minimal retry state.

Do not use this migration as an excuse to clean the corpus, retag answers, retune probabilities or redesign the router.

---

# 14. Definition of success

The migration is complete only when all of these are true:

### Behavior

- same question semantics produce the same pool mechanics as frozen live v124;
- exact deterministic parity passes;
- Focus/Support/Universal ownership remains intact;
- final answer remains uniform across the eligible pool;
- the two Universal additions have the same probability as every other eligible answer;
- recent six behavior remains user-equivalent;
- CARE remains first;
- book depth remains theatrical only.

### Security

- public JS contains no corpus array;
- public JS contains no routing dictionary/index asset;
- public lab/review pages do not mirror the corpus;
- anon/authenticated non-admin cannot query private answers;
- public prepare reveals no answer/pool;
- reveal returns one answer only;
- reveal token is short-lived, session-bound, atomic single-use;
- prepare and reveal are separately rate-limited;
- direct Supabase service bypass is blocked;
- admin audit is admin-only with database-backed authorization;
- caches no longer serve the old corpus-bearing controller to fresh users.

### Operations

- DB-native Admin is usable;
- corpus revision/version protection survives;
- routing index regeneration is deterministic and transactional;
- parity artifact and cutover manifest are frozen;
- rollback path does not require re-exposing the dataset.

---

# 15. First instruction for the next chat

Start with:

> **Read `ANSWERS-PRIVATE-SERVER-MIGRATION-PLAN.md`, then query current Supabase live state before touching production. Implement Phase A first. Preserve live v124 Focus → pool → exactly-two-Universal → uniform-probability mechanics exactly. Do not modify production until deterministic parity is proven in isolation.**

That is the authoritative next step.
