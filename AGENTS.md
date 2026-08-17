# AGENTS.md — Flipgazine / The Book of Answers

> **Read this file before changing Flipgazine.**
>
> This is the operational architecture guide for coding agents. It records ownership boundaries, source-of-truth discipline, current Answers architecture, routing invariants, editorial authority, QA expectations and failure modes.
>
> **Core rule:** find the real owner of a behavior before patching it. Do not solve a local symptom by stacking CSS, duplicating routing logic, inventing a second source of truth or changing several systems at once.

---

## 1. Product context

Flipgazine is an intentionally niche design/editorial platform. It is not being built as a generic SaaS product.

Product principles:

- remove friction;
- hide operational complexity;
- keep the public experience calm and obvious;
- preserve visual continuity;
- prefer an existing platform primitive over a feature-specific duplicate;
- make outputs feel designed by default;
- keep sophistication backstage.

The owner is both product/creative director and primary tester. Changes are commonly made in small increments and tested immediately on a real mobile device. A theoretically elegant refactor that destabilizes a working page is worse than a small, well-understood fix.

---

## 2. Repository and live sources of truth

Repository:

`dechadae/flipgazine`

Cloudflare Pages shell:

`flipgazine-root-3/`

Supabase project:

`sjpvhgxacsiorrtijqua`

Most Flipgazine pages/controllers are stored in Supabase `public.site_files`, not as page files in GitHub.

### Answers post-migration checkpoint — 17 August 2026

The private-server security migration is **COMPLETE**.

Current frozen production proof is recorded in:

- `ANSWERS-PRIVATE-SERVER-PHASE-J-CUTOVER-REPORT.md`;
- `ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md`.

Verified cutover state:

```text
/answers.html
  version 99
  MD5 ec265ada07b882356699ef6b118b0167

/fg-page-answers.js
  version 125
  25,213 bytes
  MD5 4693d0cdb12c395ec95a4d4112b0067d

canonical corpus owner
  private_db

canonical corpus revision
  124

active normal answers
  948
```

The old v124 controller remains frozen only as private provenance/rollback evidence. It is **not** a public source of truth.

Always re-query live Supabase state before a production write. Version/hash values in documentation are verified checkpoints, not permission to overwrite a newer live row.

### Deployment rule

If a change is owned by `site_files`, do **not** redeploy Cloudflare Pages.

Redeploy the shell only when the real owner is shell-level infrastructure such as:

- `_worker.js`;
- `_headers`;
- `_redirects`;
- `index.html`;
- `sw.js`;
- manifests/icons/edge assets.

Do not copy a database-served page into the static bundle as a shortcut. That creates two sources of truth.

---

## 3. Documentation authority

For current Answers work, use this order:

1. **Current live Supabase state** — operational truth before any write.
2. `AGENTS.md` — architecture, ownership, invariants and QA.
3. `ANSWERS-VOICE-TONE.md` — canonical Thai/English editorial authority.
4. `ANSWERS-HUMAN-REVIEW.md` — immutable Batch-1 human-review/provenance record.
5. `ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md` — completed migration proof/current secure architecture checkpoint.
6. `ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md` — commercial positioning, methodology, licensing and claim boundaries.
7. `ANSWERS-COMMERCIAL-EXECUTION-TIMELINE.md` — active dated commercialization schedule.

`ANSWERS-PRIVATE-SERVER-MIGRATION-PLAN.md` is now a **historical implementation specification**. The migration is complete; do not read its future-tense execution instructions as unfinished work.

Phase A–K migration reports are audit/provenance evidence, not competing current architecture documents.

Editorial precedence:

> **direct user-approved wording → `ANSWERS-VOICE-TONE.md` → established human-reviewed corpus voice → generic convention**

Architecture precedence:

> **current live Supabase state → this file → Phase K proof → historical plans/snapshots**

---

## 4. Ownership map

### Main Flipgazine Admin

- `/admin.html`
- `/fg-page-admin.js`

Owns Books, New, Palette, Media, Links, Team, Settings, etc.

It is **not** the Answers Library.

### Answers Library / Admin

The Answers Admin is now DB-native and works through authenticated private-corpus services.

It owns:

- authored Thai/English answer editing;
- Focus;
- Support;
- Topics;
- Helpers;
- Universal membership;
- deterministic index regeneration;
- corpus revision concurrency control;
- admin-only routing diagnostics through the canonical router.

Do not restore the retired workflow that parsed and rewrote the public JS controller as the corpus database.

### Private Answers corpus

Canonical corpus data lives in the private database, not in public JavaScript.

Public/ordinary authenticated clients must not receive bulk access to:

- all 948 answers;
- CARE corpus as a downloadable asset;
- Focus dictionary/index;
- Support pools;
- Universal membership in bulk;
- eligible answer pools;
- routing diagnostics.

### Public Answers

- `/answers.html`
- `/fg-page-answers.js`

The public controller owns the visible ritual and API interaction only. It is deliberately corpus-free.

Public flow:

```text
question
→ ถามดิ
→ same-origin prepare request
→ opaque short-lived token
→ user drags physical paper edge
→ release
→ reveal request
→ ONE bilingual answer
```

The browser must not reintroduce a hidden local fallback corpus.

### Canonical server routing core

There is exactly one canonical routing implementation serving:

- public prepare/reveal;
- admin dry audit;
- deterministic parity/regression tests.

Do not create a second admin router or an approximate scoring implementation.

### Thai human-review evidence

Review round `thai-human-v1` is complete and immutable.

Canonical record:

`ANSWERS-HUMAN-REVIEW.md`

The historical review table/exports are evidence, not a moving production editor.

### Voice reference

Canonical editorial authority:

`ANSWERS-VOICE-TONE.md`

### Social previews

Owned at the edge by:

`flipgazine-root-3/_worker.js`

Social crawlers do not execute page JavaScript. Do not fix LINE/Facebook previews only by editing client HTML when the Worker owns crawler output.

### Short links / QR

Use the existing Links system (`fg_shortlinks` / `fg_shares`). Do not build an Answers-specific shortener or QR system.

---

## 5. What The Book of Answers is

It is deliberately **not a chatbot**.

Ritual:

1. user types a real question;
2. presses **ถามดิ**;
3. question is committed and prepare begins;
4. user drags across the physical paper/book edge;
5. releases at a page depth;
6. reveal returns one bilingual answer;
7. book opens;
8. **ถามอีกดิ** resets.

The physical step is intentionally theatrical.

> **Physical page depth is not answer ID and does not affect probability.**

Do not collapse this into “button → answer” unless the user explicitly changes product direction.

Public Answers remains intentionally headerless unless explicitly requested otherwise.

---

## 6. Corpus and copy provenance

Current normal corpus:

- **948 answers**;
- **75 Universal answers**;
- **42 Support answers**;
- **183 canonical Focus concepts**;
- **3 CARE responses** checked before ordinary routing.

All normal answer IDs remain stable **1–948**.

Canonical editorial lineage:

```text
v119 — frozen pre-human-review source
      ↓
v120 — reviewed Thai only
      ↓
v121 — English adaptation
      ↓
v122 — bilingual copy freeze
      ↓
v123 — same copy + beach alias routing fix
      ↓
v124 — same copy + final semantic/reachability freeze
      ↓
private-server migration
      ↓
public controller v125 + private corpus revision 124
```

Important distinction:

- **v122** remains the canonical bilingual copy freeze;
- v123/v124 made routing/semantic changes only;
- private corpus revision 124 preserves the frozen v124 semantic state;
- public controller v125 is the secure client controller and does not contain the corpus.

Do not overwrite historical stages in place.

---

## 7. Thai human-review evidence

Final Batch-1 Thai review:

```text
948 / 948 reviewed
564 accepted unchanged
384 human edited
40.5% intervention
0 drafts
0 missing IDs
```

The evidence source remains immutable.

Do not:

- normalize reviewed Thai;
- rewrite historical line breaks;
- change review statuses;
- delete original Thai;
- retroactively relabel the frozen source as pure untouched AI output;
- use the historical review table as a future production editor.

See `ANSWERS-HUMAN-REVIEW.md` for full provenance rules.

---

## 8. Thai copy is layout-sensitive language data

Thai line breaks are authored editorial composition, not incidental whitespace.

Never globally wrap/normalize by character count.

Priority:

> **visual width → spoken rhythm → pragmatic meaning → grammar**

Useful principles:

- one visual phrase per line is often useful;
- mixed Thai/English needs visual room because Latin text is wider;
- fragments may stand alone when the pause is the performance;
- protect a short final punchline/landing;
- do not make a grammatically neat line if spoken timing is worse.

Canonical editorial guide: `ANSWERS-VOICE-TONE.md`.

---

## 9. CARE is always first

CARE handles safety-critical situations before normal routing.

Preserve precedence:

```text
CARE match
→ return CARE response
→ do not enter normal Focus/Support/Universal routing
```

CARE must never be randomized with ordinary funny answers.

Outside CARE, the house voice may be playful; CARE remains clear, direct and grounded.

---

## 10. Routing invariants — do not casually change

Core principle:

> **Precision chooses the pool. Chance chooses the answer.**

Locked constants:

```text
MIN_POOL = 2
MAX_BROAD_WIDEN = 12
RECENT_LIMIT = 6
```

Preserve exactly:

- current normalization behavior;
- current alias/typo matching;
- Focus / Slang / Bridge / Support / Topic / Helper distinctions;
- separate Support overlap lane;
- collision repairs;
- tier order;
- widening semantics;
- Support join semantics;
- recent-six behavior;
- exactly two distinct Universal additions on matched non-generic routes;
- uniform final choice across every eligible ID;
- generic route = full Universal pool;
- final fallback order;
- physical depth non-semantic behavior.

The migration parity proof covered **64,626 route cases with 0 differences**. Treat parity regression as a hard requirement for routing changes.

---

## 11. Semantic hierarchy: Focus → Support → Universal

### Focus

Focus owns the concrete subject.

### Support

Support is a broad secondary advice/action pattern that supplements a subject without competing with Focus ownership.

Support matching uses a separate overlap lane so a longer Support phrase cannot suppress a shorter concrete Focus phrase inside it.

### Universal

Universal answers are genuinely subject-neutral.

Current count: **75**.

Universal is explicit. “No Focus + no Topic” does not automatically make an answer Universal.

Universal rows may not simultaneously carry Focus, Support or Topic ownership.

### Universal mix-in

For every matched non-generic route:

1. select semantic owner pool;
2. append relevant Support additions;
3. apply recent-answer handling;
4. sample exactly **2 distinct Universal IDs** where possible;
5. append them to eligible;
6. choose uniformly across the full eligible list.

If nothing is understood, use the full Universal pool; do not merely sample two Universals.

---

## 12. Parser collision discipline

Thai substring collisions remain a major risk.

Historical traps include:

- `หน้า` vs `หัวหน้า`;
- `รัก` vs `น่ารัก`;
- `ไลน์` vs `เดดไลน์`;
- `ตอบ` vs `คำตอบ`;
- `เพื่อน` vs `เพื่อนร่วมงาน`;
- `พัก` vs `พักเที่ยง`;
- `ทะเล` vs `ทะเลาะ`;
- `ถูก` vs `ถูกใจ`;
- `ย่าง` vs `อย่าง`;
- English `date` vs `due date`.

Never add a short Thai alias without collision tests.

---

## 13. Server-owned recent history and reveal state

The browser does not own authoritative recent-answer history.

Server behavior:

```text
remove last 6 revealed normal-answer IDs from current pool
IF something remains:
    use filtered pool
ELSE:
    restore original pool
```

Recent history updates only after a successful reveal.

Prepared but abandoned answers must not enter recent history.

Do not accept a client-supplied recent list as authority.

---

## 14. Prepare/reveal security contract

Prepare returns only an opaque short-lived token.

Prepare must not expose:

- answer ID;
- Thai;
- English;
- selected tier;
- pool IDs;
- Focus concepts;
- probability;
- diagnostics.

Reveal is:

- session-bound;
- short-lived;
- atomic single-use;
- no-store/private cache policy;
- one-answer only.

If secure reveal fails, keep the Book closed/retry. Do not fall back to a public local answer array.

---

## 15. Answers Admin semantics

Answer rows are canonical; indexes are derived.

Admin validation should protect:

- Thai required;
- English required;
- duplicate Thai forbidden;
- Focus IDs valid;
- Support IDs valid;
- Topics canonical;
- Helpers canonical;
- Universal cannot also carry Focus/Support/Topic ownership;
- `support` preserved;
- deterministic index regeneration;
- answer changes + index regeneration + revision increment transactionally;
- optimistic corpus revision gate;
- authenticated non-admin access rejected.

Admin routing test must call the same canonical router in dry-audit mode, not public prepare and not duplicated JS logic.

---

## 16. Public interaction invariants

### Placeholder submission

Example questions are placeholders only.

- examples live in `.placeholder`, not `.value`;
- submission uses real trimmed user input;
- blank/unedited/placeholder-equal submits are rejected;
- Enter and **ถามดิ** use the same guarded path;
- **ถามอีกดิ** resets the state.

### UX timing

Prepare should begin when the user genuinely submits the question so the physical drag time hides normal network latency.

Release/reveal should preserve the existing physical seam/opening beat.

Do not change routing to use drag depth.

---

## 17. Public visual system

Answers remains intentionally standalone/headerless.

Visual language:

- dark restrained background;
- one dominant physical book;
- generous negative space;
- Noto Sans Thai for Thai;
- light typography;
- bilingual spread;
- tactile page drag/opening;
- minimal controls;
- editorial rather than mystical/tarot styling.

Avoid:

- excessive glassmorphism;
- decorative effects that compete with the book;
- chatbot bubbles;
- extra navigation chrome;
- UI added merely because space exists.

Flipgazine CI remains the broader design authority.

---

## 18. Share / preview behavior

Public share identity is managed through the existing Links/edge system.

Desired chat preview for Answers is text-first/text-only.

Social crawler behavior may be rewritten by `_worker.js`; do not assume deleting client-side `og:image` is sufficient.

Keep share/QR ownership centralized.

---

## 19. Evidence and rollback

The Phase A–K reports and `answers-private-server/` proof files are migration evidence.

The exact old v124 public-controller bytes are preserved privately for provenance/rollback evidence.

Preferred rollback:

- revert secure server/API implementation to last-known-good secure version;
- keep private corpus private;
- keep public controller corpus-free.

Do **not** make “restore corpus-bearing v124 JS publicly” the normal rollback path.

If secure service cannot be restored promptly, temporarily gate/disable Answers rather than re-exposing the corpus.

---

## 20. Change discipline

For any live Answers change:

1. identify the real owner;
2. query current live version/hash/revision;
3. inspect enough surrounding code/data to understand behavior;
4. back up risky state when appropriate;
5. make the smallest coherent change;
6. use optimistic revision/version checks;
7. verify removed/replaced code paths are actually gone;
8. verify copy unchanged when task is semantic/runtime only;
9. verify semantics unchanged when task is copy-only;
10. test user behavior and routing invariants, not merely string presence;
11. run security checks when touching auth/private data/API boundaries;
12. run deterministic routing regression when touching router semantics.

Do not reintroduce browser corpus ownership for convenience.

---

## 21. CSS discipline

Do not solve design bugs by stacking override after override.

Preferred order:

1. identify canonical owner/rule;
2. inspect inheritance/parent ownership;
3. fix the correct layer;
4. remove obsolete/conflicting override if safe;
5. verify mobile and desktop.

Do not create `.fix`, `.fix2`, `.fix-the-fix` cascades without a real responsive reason.

---

## 22. Architectural discipline

Before creating a new system, search for an existing owner.

Past lessons:

- Links owns short links/QR;
- Media owns general uploads;
- `_worker.js` owns crawler metadata;
- Router v4 is retired;
- broad accidental “generic” semantics were replaced by explicit Universal + Support layers;
- Voice is centralized in one editorial guide;
- corpus ownership moved from public JS to the private database;
- one canonical server router replaced duplicated/evaluated client routing paths.

Recurring rule:

> **Prefer the correct owner/abstraction over another layer of special-case code.**

---

## 23. Routing test checklist

When changing routing, test at least:

- exact target phrase;
- nearby synonym;
- Thai substring collision;
- mixed Thai/English;
- compound question with multiple Focus concepts;
- Focus + Support;
- Support-only;
- no-focus/no-support Universal fallback;
- recent-answer exclusion;
- CARE query;
- singleton/thin Focus;
- singleton/thin Support;
- no Support leakage through Helper/Topic tiers;
- no Support phrase suppressing overlapping Focus;
- two Universal additions distinct where possible;
- final eligible answers equal probability;
- deterministic parity/regression against the canonical core.

Include beach collision regression:

- `ทะเล` → beach;
- `ไปทะเล` → beach;
- `ทะเลไหม/ทะเลมั้ย` → beach;
- `ทะเลาะ` must **not** become beach.

---

## 24. Corpus/editor test checklist

When changing answer content or semantics, verify:

- total answer count;
- stable IDs/order;
- Thai/English pairing;
- Thai line breaks;
- duplicate Thai;
- Focus validity;
- Support validity;
- Topic/Helper validity;
- Universal exclusivity;
- generated Focus/Support/Universal indexes;
- reachability;
- Admin save round-trip;
- corpus revision increment/concurrency behavior;
- no accidental changes to historical review evidence;
- if copy-only, routing semantics remain unchanged;
- if routing-only, Thai/English copy remains unchanged.

---

## 25. Debugging philosophy

When a bug appears:

1. reproduce the exact user state;
2. identify owner/layer;
3. inspect the whole relevant block;
4. inspect data invariants;
5. inspect server/session/token/cache state;
6. only then modify.

Do not patch the screenshot. Fix the ownership/invariant that explains the screenshot.

A client parse failure can masquerade as UI logic failure. A stale runtime can masquerade as bad semantics. A broad alias can masquerade as a bad answer pool. A token/session failure can masquerade as an animation bug. Diagnose before retagging or styling.

---

## 26. Product-quality bar

The owner notices and cares about:

- alignment drift;
- wrong Thai font/weight;
- centering;
- line breaks;
- UI state changing after button press;
- unnecessary headers;
- mobile regressions;
- preview images appearing when they should not;
- semantic mismatches;
- architectural duplication;
- interactions that do not match the existing Flipgazine backbone.

These are product correctness, not “mere cosmetics.”

---

## 27. Short mental model

```text
GITHUB / CLOUDFLARE SHELL
  static infrastructure + edge boundary

SUPABASE site_files
  live page/controller shells

PRIVATE ANSWERS DATABASE
  Thai + English + Focus + Support + Topics + Helpers
          ↓
  canonical routing assets/indexes
          ↓
CANONICAL SERVER ROUTER
          ↓
  CARE first
          ↓
  Focus owns subject
          ↓
  relevant Support joins
          ↓
  recent-six handling
          ↓
  exactly 2 random Universal answers join matched pools
          ↓
  uniform random pick
          ↓
  opaque prepare token
          ↓
USER DRAGS PHYSICAL BOOK
          ↓
  single-use reveal
          ↓
ONE BILINGUAL ANSWER

COPY PROVENANCE
  v119 source
      ↓
  thai-human-v1
      ↓
  v120 reviewed Thai
      ↓
  v121 English adaptation
      ↓
  v122 bilingual copy freeze
      ↓
  v124 semantic freeze
      ↓
  private DB revision 124
```

The sophistication belongs backstage. The front stage should continue to feel like a very simple little book.

---

## 28. Final principle

The Book of Answers reached its quality by repeatedly replacing accidental complexity with the correct owner or abstraction.

When something breaks, the best fix is usually not “more code.”

> **Find the real owner, preserve the product invariant, and change the smallest correct layer.**