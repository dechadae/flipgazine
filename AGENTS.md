# AGENTS.md — Flipgazine / The Book of Answers

> **Read this file before changing Flipgazine.**
>
> This is the operational handoff for coding agents working on this repository, with especially detailed coverage of **The Book of Answers**. It records product intent, architecture, source-of-truth rules, routing semantics, deployment boundaries, QA invariants, and failure modes learned during the August 2026 build.
>
> **Core rule:** understand who owns a behavior before patching it. Do not solve a local symptom by stacking CSS, duplicating routing logic, inventing parallel infrastructure, or changing multiple systems at once.

---

## 1. Product context

Flipgazine is a small, intentionally niche design/editorial platform. It is not being built as a generic SaaS product. The product philosophy is:

- remove friction;
- hide operational complexity;
- make the interface feel obvious and calm;
- prefer existing infrastructure over parallel systems;
- preserve strong visual continuity;
- keep public experiences simple even when the backstage architecture is sophisticated.

The owner is both the product/creative director and the primary tester. Changes are usually made in small increments and immediately tested on real mobile devices. Respect this workflow. A theoretically elegant refactor that destabilizes a working page is worse than a small, well-understood change.

The design principle is close to “no-makeup makeup”: the system may be complex, but the user should not feel that complexity.

---

## 2. Repository vs live source of truth

### GitHub repository

Repository:

`dechadae/flipgazine`

Cloudflare Pages shell lives under:

`flipgazine-root-3/`

Important static shell files include:

- `index.html`
- `_redirects`
- `_headers`
- `_worker.js`
- `sw.js`
- `manifest.webmanifest`
- shared shell assets such as flipbook core/UI files, icons, OG assets, etc.

### Live page source

**Most Flipgazine pages are NOT served from GitHub files.** They are stored as rows in Supabase `public.site_files` and loaded by the shell.

Supabase project:

`sjpvhgxacsiorrtijqua`

For The Book of Answers, the live source of truth is currently:

- `/answers.html`
- `/fg-page-answers.js`
- `/answers-admin.html`
- `/fg-page-answers-admin.js`
- `/answers.webmanifest`

These are rows in `public.site_files`.

As of 16 August 2026, verified live state:

| path | version | MD5 |
|---|---:|---|
| `/answers.html` | 98 | `e97e821b71c02e9d4831dcba1087c2a9` |
| `/fg-page-answers.js` | 111 | `6f5b93160240a48bbbc09bebb5cd30c7` |
| `/answers-admin.html` | 43 | `561009fdfbe6e00414457d9195854174` |
| `/fg-page-answers-admin.js` | 19 | `07cc21cbed8a027e8ee0735f37419fbc` |
| `/answers.webmanifest` | 3 | `b678d8ca258e19eefeff2119d6cfafac` |

These versions are informational snapshots, not eternal constants. Re-query Supabase before relying on them in a later session.

### Deployment rule

If the change is page content/UI/controller data stored in `site_files`, **do not redeploy Cloudflare Pages**.

Only change/redeploy the shell when the behavior is genuinely owned by shell-level files such as `_worker.js`, `_headers`, `_redirects`, `index.html`, `sw.js`, manifests, icons, etc.

Do not copy a database-served page into the static bundle as a shortcut. That creates two sources of truth and is historically a source of bugs.

---

## 3. Ownership map: know which system owns what

Before changing anything, identify the owner.

### Main Flipgazine Admin

Live files:

- `/admin.html`
- `/fg-page-admin.js`

This is the **main Flipgazine Admin** for Books, New, Palette, Media, Links, Team, Settings, etc.

It is **not** the Answers Library.

Do not conflate these systems.

A previous accidental patch to `/fg-page-admin.js` broke the main Admin because literal `\n` sequences were inserted into JavaScript source. The controller was restored to its known-good v4. Treat main Admin as stable and avoid touching it for Answers work unless the requirement is explicitly cross-product.

### Answers Library

Live files:

- `/answers-admin.html`
- `/fg-page-answers-admin.js`

This is the editor/admin specifically for the Book of Answers corpus and semantic metadata.

### Public Answers page

Live files:

- `/answers.html`
- `/fg-page-answers.js`

This owns the public ritual, Focus routing runtime, answer rendering, drag-to-open book behavior, answer selection, review mode, share button, placeholder handling, and popup guard.

### Social preview metadata

Crawler/social preview behavior is owned at the edge by:

`flipgazine-root-3/_worker.js`

Do not assume `<meta>` tags inside `/answers.html` are what LINE/Facebook/etc. actually see. Crawlers do not run the page JavaScript and the Worker rewrites metadata server-side.

### Short links and QR

Canonical short links are owned by the existing Flipgazine **Links** system and `fg_shortlinks`.

Do not invent an Answers-specific QR or URL-shortening system.

Current permanent Answers setup:

`fg_shares`:

- token: `answersbook`
- target path: `/answers.html`
- title: `The Book of Answers — flipgazine`
- description: `A small book for big questions.`
- image URL: `null`
- no expiry

`fg_shortlinks`:

- code: `answers`
- target: `/answers.html?s=answersbook`
- label: `The Book of Answers — flipgazine`
- active: `true`

Therefore the canonical share URL is effectively:

`https://flipgazine.pages.dev/answers`

The Answers controller looks up an active shortlink matching `/answers.html?s=answersbook`; if one exists it shares the short URL, otherwise it falls back to the long token URL.

Admin Links is the single source of truth. If the short code is deactivated/deleted/changed there, Answers should follow it rather than hardcoding a new path.

---

## 4. What The Book of Answers actually is

The Book of Answers is deliberately not a chatbot.

The user experience is a ritual:

1. user types a question;
2. user presses **ถามดิ**;
3. the interface commits the question;
4. the user drags across the visible paper edge and releases at a page depth;
5. the physical book opens;
6. a bilingual answer appears on the spread;
7. user can press **ถามอีกดิ** and repeat.

The page-selection gesture is intentionally tactile/theatrical. It makes the experience feel like opening a physical book.

**Do not remove the drag/page-selection ritual merely because the answer is already semantically routed before/at opening.** The “unnecessary” physical step is part of the product.

The semantic system should remain invisible. The user should feel that they physically chose a page and the book answered them.

---

## 5. Corpus

Current authored corpus:

**667 normal answers**

plus **3 CARE responses** handled separately before normal Focus routing.

Each authored normal answer conceptually owns:

```js
{
  thai: "...",
  english: "...",
  topics: [...],
  focus: [...],
  helpers: [...]
}
```

### Thai copy is layout-sensitive data

Thai line breaks are editorial composition, not incidental whitespace.

Preserve them exactly.

A prior migration accidentally double-escaped all authored breaks so strings stored `\\n` instead of normal JavaScript `\n` escapes. This affected 1,326 authored line breaks. It was repaired across all 667 answers.

**Never mass-rewrite answer strings without explicitly verifying newline encoding.**

Correct JavaScript source representation inside an answer string:

```js
{thai:"บรรทัดหนึ่ง\nบรรทัดสอง"}
```

That is a backslash-n escape *inside the string literal*.

Incorrect source between JavaScript statements:

```js
var a=1;\nvar b=2;
```

If literal backslash+n characters appear between statements, the controller can fail to parse.

This exact class of error has broken both Answers and Main Admin before.

### English copy

English is adapted for voice and rhythm. It is not required to be a literal translation. Preserve the conversational editorial character.

### Copy voice

The voice is:

- playful;
- contemporary;
- Thai/English code-switching where natural;
- lightly teasing;
- concise;
- culturally current;
- friend/bestie energy rather than mystical fortune teller;
- usually one sharp observation or instruction rather than explanation.

Avoid generic motivational language unless the answer is intentionally generic.

### New copy workflow

For significant new batches, draft/review first and publish after approval unless explicitly asked to publish directly.

---

## 6. CARE routing

CARE is evaluated before normal Focus routing.

It covers at least these high-risk families:

1. suicide / self-harm;
2. medical emergency / medicine-related emergency;
3. unsafe / abuse / violence scenarios.

CARE responses must never be randomized into normal pools and normal funny answers must never override CARE.

Order remains:

`CARE → Focus router → answer pool → anti-repeat → uniform random`

Do not weaken this ordering while refactoring.

---

## 7. Focus Router: the architectural core

The current router is intentionally **not Router v4**.

Router v4 was a classifier/weighting architecture. It was removed completely from the active runtime because it optimized classification instead of answer reachability and produced broad, semantically weaker pools.

The winning model is an inverted-index style Focus Router.

Think:

**Router v4 thought like a classifier. Focus thinks like a librarian.**

For a finite authored corpus, the librarian model is better.

### Core runtime flow

Conceptually:

```text
question
  ↓
normalize
  ↓
longest-match alias parser
  ↓
focus/slang/bridge/topic/helper signals
  ↓
Focus index lookup
  ↓
small precise eligible pool
  ↓
light anti-repeat
  ↓
uniform random answer
```

Primary principle:

> **Precision chooses the pool. Chance chooses the answer.**

Do not add score weighting inside a correctly selected pool unless the product direction explicitly changes.

Uniform randomness is intentional because the Book should retain chance/magic after semantic filtering.

---

## 8. Semantic layers

Each answer may have three semantic layers.

### Focus

Specific concepts that define what the answer is actually about.

Examples:

- `dessert`
- `cake`
- `handsome`
- `barista`
- `salary`
- `moo-kratha`
- `ex`
- `friend`
- `coffee`

Focus should be specific enough that matching the concept makes the answer genuinely plausible.

### Topics

Broader editorial grouping.

Canonical topic set currently includes:

- `beverage`
- `cafe`
- `confidence`
- `conflict`
- `family`
- `food`
- `friends`
- `hangout`
- `hobby`
- `message`
- `money`
- `relationship`
- `relax`
- `rest`
- `shopping`
- `social`
- `style`
- `travel`
- `work`
- `workplace`

Do not silently invent a new topic name during a one-off edit. Add a new canonical category deliberately.

### Helpers

Broad utility/intent dimensions:

- `general`
- `decision`
- `timing`

Helpers are fallback/widening signals, not the primary semantic identity of a specific answer.

---

## 9. Dictionary kinds

The Focus dictionary can contain concepts with kinds such as:

- `focus`
- `slang`
- `bridge`
- `topic`

### Bridge vocabulary

Bridge vocabulary means the question contains understood context that does not deserve a fake authored answer family.

Examples historically treated as bridge-type vocabulary include context like hotel, feedback, DM, LINE, single, etc., where applicable.

Do not create a new Focus family merely because a word appears in user questions. A Focus family should correspond to meaningful authored-answer reachability.

### Slang

Slang can be detected and displayed/understood, but it should not overpower a concrete subject.

If a question is about a specific subject and also contains slang, the subject should normally determine the answer family.

---

## 10. Parser rules and known substring traps

The parser normalizes punctuation, spacing, case, selected typos, and uses longest-match behavior.

Longest phrase wins on overlaps.

Examples:

- `แฟนเก่า` → `ex`, not `ex + partner`
- `close friends` should resolve as its intended concept rather than `close + friend` fragments
- `social battery` must not create unrelated generic battery matches
- `จริงหรือเค้ก` must not be interpreted as literal cake context merely because it contains the string `เค้ก`

Important historical false-positive traps that were deliberately cleaned up:

- `หน้า` ≠ `หัวหน้า`
- `รัก` ≠ `น่ารัก`
- `ไลน์` ≠ `เดดไลน์`
- `ตอบ` ≠ `คำตอบ`
- `เพื่อน` ≠ `เพื่อนร่วมงาน`
- `พัก` ≠ `พักเที่ยง`
- `ทะเล` ≠ `ทะเลาะ`
- `ถูก` ≠ `ถูกใจ`
- `ย่าง` ≠ `อย่าง`
- English `date` ≠ `due date`
- bare `จน` should not create accidental matches
- bare English `walk` was tightened to avoid accidental reachability

There are explicit conflict cleanups in the runtime, including coworker/friend, hobby/work, and `คำตอบ`/reply style collisions.

When adding aliases, test surrounding Thai substrings. Thai does not use spaces as reliable word boundaries, so naive substring matching is dangerous.

---

## 11. Current widening behavior

The intended widening order is:

```text
all focus
→ N−1 / near focus
→ any focus
→ topics
→ helpers
→ generic
```

Important constraints in the current implementation:

- `MIN_POOL = 2`
- `MAX_BROAD_WIDEN = 12`
- recent-answer memory limit is 6

Widening must remain a **superset of the precise seed** when a focus seed exists. Do not widen into an unrelated broad pool simply to satisfy a minimum size.

A singleton can intentionally remain a singleton rather than widening into a huge, semantically diluted pool.

This is a key design choice.

---

## 12. Answer IDs and index conventions

The Focus index stores **1-based answer IDs**.

The JavaScript `answers` array is zero-based.

Typical conversion:

```js
var id = route.pick;      // 1-based
var index = id - 1;       // array index
var answer = answers[index];
```

Do not accidentally mix these conventions while refactoring.

The anti-repeat list in the UI stores array indices, then maps them to 1-based IDs before sending them to the Focus engine.

---

## 13. Physical page depth does NOT select answer ID

The public book tracks a physical `depth`/position for the drag gesture and animation.

Do not infer that the page-depth number should map deterministically to an answer ID.

The ritual and the semantic selection are intentionally decoupled:

- user chooses a physical page depth;
- semantic Focus chooses the eligible answer universe;
- uniform random chance chooses an answer from that universe.

This preserves both relevance and the feeling of a magical physical book.

---

## 14. Example: dessert routing

Question:

`อยากกินขนมหวาน`

The parser should detect:

`ขนม → dessert`

The live `dessert` focus pool was verified during debugging as IDs:

`[32, 175, 341, 479, 516]`

A generic answer such as #272 (`พอซ้อมค่ะ / ไฟเวทีเปิดแล้ว`) is not semantically eligible for that pool.

This case was useful because it demonstrated how to debug routing:

1. inspect exact dictionary alias hit;
2. inspect derived focus index;
3. verify selected tier/pool;
4. verify runtime state/controller version;
5. do **not** immediately retag answers just because a screenshot looks wrong.

The semantic data was correct; the investigation then moved to runtime/session behavior.

Use this pattern for future routing bugs.

---

## 15. Placeholder submission invariant

The question textarea displays rotating example questions using the HTML `placeholder` attribute.

These examples are visual only.

**The router must never treat placeholder text as user input.**

Current behavior:

- only actual textarea `.value` produced by user typing/paste may submit;
- a `userQuestionEdited` guard tracks real input activity;
- strings equal to known placeholder examples are rejected;
- Enter and the **ถามดิ** button use the same guarded form submit path;
- after **ถามอีกดิ**, the real-input guard resets.

If submit does not contain a valid real user question, the page does not advance and shows a small Thai popup:

```text
ยังไม่ได้ถามจริงเลยค่ะ
พิมพ์ก่อน แล้วกด ถามดิ อีกที
```

Popup typography intentionally matches the normal instruction line:

- `Noto Sans Thai`
- size `max(16px, var(--ui-input))`
- weight `300`
- line-height `1.65`

Do not regress this to inherited Poppins.

---

## 16. Critical JavaScript escaping failure mode

This deserves its own section because it has happened repeatedly.

When editing `site_files.content` through SQL/string replacement, distinguish between:

### A. actual source newline between statements

Hex should include:

`0a`

Example source:

```js
var a = 1;
var b = 2;
```

### B. backslash+n escape INSIDE a JavaScript string

Hex contains:

`5c6e`

Example:

```js
textContent = "line one\nline two";
```

### C. INVALID: literal backslash+n between JavaScript statements

```js
var a = 1;\nvar b = 2;
```

This can make the whole controller fail to parse.

The symptom on Answers was particularly misleading: pressing **ถามดิ** caused a flicker and full page reload. The reason was not form behavior; the controller had failed to parse, so the submit listener was never attached and the browser performed a normal form submission.

When a page suddenly reloads or core listeners disappear after a patch, check JavaScript parse integrity before debugging interaction logic.

After any SQL text surgery on JS:

- inspect raw context;
- inspect hex around inserted boundaries if necessary;
- search for unintended `\\n` outside string literals;
- verify the controller still contains expected listener/function markers.

---

## 17. Review mode

The public Answers controller has a hidden QA review mode.

Examples:

- `/answers.html?review=363`
- `/answers.html?review=351`
- `/answers.html?review=119`
- `?review=longest`

Numeric review mode opens an exact authored answer directly for visual/editorial QA. It bypasses normal question/random routing.

Do not remove this casually; it is useful for verifying Thai line-break composition and exact answer rendering.

Do not confuse a screenshot taken in review mode with a routing result.

---

## 18. Public visual system

The Answers page is intentionally standalone/headerless.

Do not add the normal Flipgazine header unless explicitly requested.

The visual language is modern editorial rather than tarot/mystical UI.

Characteristics:

- dark restrained background;
- one dominant physical book object;
- generous negative space;
- Noto Sans Thai for Thai;
- light weights;
- bilingual spread;
- paper thickness/vertical page lines on the closed book;
- tactile page drag/opening animation;
- minimal controls;
- fixed lower information/footer treatment;
- small glass share control at bottom-right.

Avoid:

- excessive glassmorphism;
- decorative gradients that compete with the book;
- mystical/tarot clichés;
- chatbot bubbles;
- extra navigation chrome;
- adding UI merely because there is empty space.

The simplicity is intentional.

---

## 19. Typography

Thai typography should use **Noto Sans Thai** consistently.

A recurring QA issue has been Thai text accidentally inheriting Poppins or another Latin UI family.

Before styling a Thai element, inspect the existing `.instruction`, textarea, button, and `:lang(th)` rules rather than inventing a new stack.

Exact line-break composition in answer spreads is editorially significant.

---

## 20. Share button and preview behavior

The public Answers share button is a small circular glass control in the lower-right, consistent with other Flipgazine page controls.

Share content:

Title:

`The Book of Answers — flipgazine`

Text/description:

`A small book for big questions.`

The desired chat preview is **text-only**, no image.

The public HTML itself does not need an `og:image` for this share.

However, remember that the Cloudflare Worker may inject a fallback image for ordinary paths. The permanent `?s=answersbook` share mode is what intentionally removes image metadata and provides a text-only preview.

Do not “fix” a LINE preview by only deleting meta tags from `/answers.html`; that does not address edge rewriting.

---

## 21. Main Admin Media vs retired WIP uploader

There used to be a separate private WIP Upload page/controller.

It was removed after confirming that the main Admin **Media** system can support handoff formats.

The Supabase Storage `media` bucket MIME allowlist was expanded to include formats such as:

- JSON
- JavaScript
- plain text
- Markdown
- HTML
- CSS
- ZIP

alongside the existing image/audio/font/octet-stream formats.

Do not resurrect a separate WIP uploader unless there is a genuinely new requirement that Media cannot satisfy.

Also: a previous attempt to change Media upload behavior in `/fg-page-admin.js` broke Main Admin. The change was reverted. The existing Media uploader behavior should be treated as known-good unless deliberately redesigned and tested separately.

---

## 22. Answers Library admin behavior

The Answers Library exposes the semantic matrix directly.

It should show/edit separately:

- Topics
- Focus concepts
- Helpers

Search covers Thai, English, topics, focus, and helpers.

Useful QA filters include concepts like:

- broad-only
- focus-heavy
- topicless
- helper-only
- aggregate review

These are editorial QA queues, not automatic proof that an answer is wrong.

Generic answers are allowed to have no focus/topic.

### Save validation

At minimum preserve these rules:

- Thai required
- English required
- duplicate Thai forbidden
- focus values must exist in live dictionary and be valid focus/slang kinds
- topics should use canonical topic list
- helpers should use canonical helper list

A save serializes semantic answer rows and regenerates the derived Focus index in memory, then updates the public controller in an optimistic-version flow.

The main Admin must not be involved in this operation.

---

## 23. Derived Focus index

The Focus index is derived from answer-owned semantics.

This is important:

**the answer rows are canonical; the index is generated.**

Do not manually maintain a second competing tag/index source.

Old architecture such as `ANSWER_LEGACY_TAGS`, Router v4 weights/spec/analyzer, or similar parallel classification structures should not be reintroduced.

Historical Phase 19 explicitly made semantic rows canonical and retired Focus Lab into the main Answers Library.

---

## 24. Frozen QA artifacts in Supabase `/wip/`

There are useful historical snapshots and QA artifacts under `/wip/` in `site_files`.

Important Focus Router final artifacts include names like:

- `/wip/focus-router-phase5-17-dictionary-final-2026-08-15.json`
- `/wip/focus-router-phase5-17-index-final-2026-08-15.json`
- `/wip/focus-router-phase5-17-engine-final-2026-08-15.js`
- `/wip/focus-router-phase5-17-matrix-final-2026-08-15.json`
- `/wip/focus-router-phase5-17-coverage-500-final-2026-08-15.json`
- `/wip/focus-router-phase5-17-pool-audit-500-final-2026-08-15.json`
- `/wip/focus-router-phase5-17-qa-report-2026-08-15.md`

Phase 18/19 snapshots and pre-change backups also exist.

Use these as historical comparison/rollback references, not as live runtime dependencies.

The main Answers admin was specifically redesigned so it no longer depends on `/wip/focus-router-*` artifacts.

---

## 25. Historical QA baseline

At the end of the Focus migration, QA achieved results including:

- 500/500 parser expected recall
- 500/500 non-empty pools
- 412/412 supported focus tests preserving expected answer family
- 562/562 specific answers reachable
- 0 orphaned specific answers
- 0 generic fallbacks in the final 500-question coverage suite
- all 50 realistic compound/mixed-language questions focus-based
- only 2 realistic singletons intentionally precise
- average pool roughly 10 in one final audit

Treat these as regression expectations, not guarantees that the corpus will forever remain numerically identical after editorial expansion.

When adding a significant answer batch, re-run equivalent reachability/pool QA instead of relying on historical numbers.

---

## 26. Anti-repeat behavior

Recent-answer memory is intentionally light.

Current limit: 6.

The system removes recent IDs from an eligible pool if possible. If that would empty the pool, it can fall back to the original pool.

Do not make anti-repeat stronger than semantic precision. A repeated relevant answer is preferable to a fresh irrelevant answer.

---

## 27. Generic fallback

Generic fallback answers are intentional.

They provide book-like responses when a question has no strong semantic match.

Do not force every generic answer into a fake focus concept just to achieve total tagging coverage.

Likewise, do not automatically route a recognized specific question into generic simply because the specific pool is small.

The next editorial expansion direction is expected to include strengthening generic fallback and thin pools, but this is content expansion rather than unfinished engineering.

---

## 28. Product status

As of this handoff, The Book of Answers can be considered **feature-complete v1**.

The following are substantially finished:

- interaction model;
- visual system;
- book ritual/motion;
- Focus routing architecture;
- canonical semantic answer matrix;
- Answers Library/admin;
- safety/CARE routing;
- public sharing;
- shortlink/QR integration;
- PWA behavior;
- 667-answer initial corpus.

Future work is primarily editorial depth and targeted refinements discovered through real use.

Do not mistake “more answers can be added” for “the product architecture is unfinished.”

---

## 29. Change discipline

For any live change to Answers:

1. **Read the whole relevant ownership path**, not just the first matching snippet.
2. Query the live `site_files` row and current version.
3. Understand adjacent logic before editing.
4. Back up the exact live row under `/wip/` when the change is meaningful/risky.
5. Make the smallest coherent change.
6. Increment version via the normal `site_files` update behavior.
7. Verify the changed marker exists exactly once where appropriate.
8. Verify old code path is gone if replacing it.
9. Verify the 667-answer block is byte-identical if the change should not affect content.
10. Verify Main Admin is untouched unless intentionally involved.
11. Check newline escaping when any JS text was inserted/replaced through SQL.
12. Test the actual user-facing behavior, not only string presence.

### Strong preference

Do not perform blind global replacement on the 200k+ Answers controller unless the boundaries are extremely well-defined.

Use distinctive anchors and verify pre/post counts.

---

## 30. CSS discipline

Do not solve design bugs by adding override after override.

Preferred order:

1. identify the canonical rule;
2. inspect inherited/parent rules;
3. fix ownership at the correct layer;
4. remove obsolete/conflicting override if safe;
5. verify mobile and desktop.

Avoid creating:

```css
.rule { ... }
.rule { ...fix... }
.rule { ...fix-the-fix... }
@media (...) { .rule { ...another fix... } }
```

unless there is a real responsive reason.

Flipgazine now has a strong design backbone; preserve it rather than creating local styling dialects.

---

## 31. Architectural discipline

Before building any new system, search for an existing owner.

Important historical examples:

### Sharing

A custom Answers share/QR system was unnecessary because Flipgazine Links already provided short links and QR.

### Uploads

A separate WIP Upload utility became unnecessary because Main Admin Media could support the required MIME types.

### Social previews

Editing page meta alone was insufficient because `_worker.js` owned crawler output.

### Routing

Continuing to tune Router v4 was inferior to changing the architecture to an inverted Focus index.

The recurring lesson is:

> **Prefer deleting duplication and using the existing platform primitive over adding another feature-specific subsystem.**

---

## 32. Do not casually change these decisions

Unless the owner explicitly requests it, preserve:

- public Answers remains headerless;
- drag-to-select-page ritual remains;
- Focus Router remains the semantic engine;
- Router v4 remains retired;
- uniform random remains the final pick inside the precise pool;
- CARE runs first;
- Thai answer line breaks remain authored data;
- Noto Sans Thai remains the Thai font;
- main Admin and Answers Library remain separate;
- Links remains the canonical shortlink/QR system;
- Worker remains the social crawler metadata owner;
- Media remains the general file upload surface;
- `site_files` remains the live content source;
- no unnecessary Cloudflare redeploy for content;
- generic answers may remain untagged where semantically appropriate;
- physical page depth does not directly map to answer ID.

---

## 33. Testing checklist for common changes

### If changing routing

Test:

- exact target phrase;
- nearby synonym;
- Thai substring collision;
- mixed Thai/English question;
- compound question with 2 focuses;
- no-focus generic question;
- recent-answer exclusion;
- CARE query;
- singleton/thin pool;
- no accidental broad fallback.

Inspect:

- parsed focus;
- alias hits;
- tier list;
- selected tier;
- pool IDs;
- final eligible IDs;
- chosen ID.

### If changing answer content

Verify:

- total answer count expected;
- Thai/English pairing;
- Thai line breaks;
- duplicate Thai;
- focus values valid;
- topic/helper values valid;
- regenerated index;
- specific answer reachability.

### If changing form/question UX

Verify:

- placeholder never submits;
- empty **ถามดิ** does not reload;
- popup appears;
- popup Thai font is Noto;
- typed text submits;
- pasted text submits;
- Enter uses same path;
- **ถามอีกดิ** clears/reset state;
- question displayed on open spread is the actual submitted user question.

### If changing sharing

Verify:

- active `fg_shortlinks` lookup;
- short URL shared when available;
- long token fallback;
- native share on supported mobile;
- clipboard fallback;
- text-only crawler metadata for token mode;
- do not rely on stale LINE preview cache when testing.

### If changing book animation

Verify at least:

- Android/mobile portrait;
- desktop;
- closed book centered;
- drag cursor works;
- release opens book;
- answer text fits;
- Thai dynamic fitting does not destroy authored line breaks;
- ask-again closing/reset works;
- fixed footer/share control do not move unexpectedly.

---

## 34. Debugging philosophy

When a bug appears, do not immediately patch the visible symptom.

Use this order:

1. reproduce the exact user state;
2. identify owner/layer;
3. inspect the full relevant block;
4. inspect data invariants;
5. inspect runtime/session/cache possibility;
6. only then modify.

Example from the dessert routing screenshot:

The displayed answer looked semantically impossible. Instead of retagging #272, the investigation first verified:

- dictionary alias;
- live Focus index;
- eligible dessert pool;
- generic status of #272;
- number of parser/engine/index instances;
- controller runtime state.

That prevented a correct semantic system from being damaged in response to a runtime symptom.

---

## 35. Backups

For risky `site_files` changes, create a timestamped `/wip/` snapshot first.

Examples from this project include:

- `/wip/answers-pre-share-v95-2026-08-15.html`
- `/wip/fg-page-answers-pre-share-v101-2026-08-15.js`
- `/wip/fg-page-answers-pre-central-share-v104-2026-08-15.js`
- `/wip/answers-pre-placeholder-guard-v98-2026-08-16.html`
- `/wip/fg-page-answers-pre-placeholder-guard-v105-2026-08-16.js`

Prefer backups that can be restored exactly over trying to reconstruct a working state after a failed patch.

---

## 36. Current public submission guard details

As of controller v111:

- random placeholder is assigned to `questionInput.placeholder`, never `.value`;
- `userQuestionEdited` starts false;
- input event flips it true;
- `currentUserQuestion()` trims the real `.value`;
- blank, unedited, or placeholder-equal values return empty;
- invalid submit invokes `showSubmitNudge()` and focuses the field;
- valid submit stores `question`, sets the textarea read-only, disables the button, enters `pick` stage;
- **ถามอีกดิ** resets `userQuestionEdited=false`.

If form submission ever causes a full-page reload again, suspect controller parse/mount failure before changing form attributes.

---

## 37. Current share/controller boundary

The Answers controller contains public Supabase anon credentials for a REST read of `fg_shortlinks`.

The anon key is not a secret by itself; security depends on RLS/permissions.

Never put a service-role key in public page/controller code.

The controller’s share lookup is intentionally read-only.

---

## 38. PWA

Answers has its own manifest:

`/answers.webmanifest`

It is installable as an individual Answers PWA experience.

Do not accidentally force authentication onto `/answers.html`; it is intended to be public.

The page should remain usable without signing into Flipgazine.

---

## 39. Accessibility / interaction notes

The book edge uses a slider-like interaction with keyboard support.

Keep:

- focusability in pick stage;
- arrow-key depth adjustment;
- Home/End handling;
- Enter/Space opening;
- sensible `aria` labels;
- popup `role="alert"` / live announcement behavior;
- readable contrast.

Visual polish should not remove keyboard behavior.

---

## 40. Performance / maintainability

The Answers controller is large because it contains the authored corpus, dictionary, derived index, router and interaction runtime.

Do not split it merely because it is large unless there is a concrete operational benefit. Splitting live `site_files` pages into many pieces can create new cache/dependency/deployment complexity.

If proposing a refactor, demonstrate that it improves one or more of:

- testability;
- update safety;
- load performance;
- editor architecture;
- readability without creating more runtime coupling.

The current product already works; refactors must earn their risk.

---

## 41. Code-review role for Codex

A useful Codex pass should focus on:

- architectural duplication;
- dead code;
- unreachable branches;
- accidental repeated CSS rules;
- stale Router v4 remnants (there should be none active);
- redundant aliases;
- parse hazards;
- performance hot spots;
- regressions between live controller and documented invariants;
- opportunities to simplify without changing product behavior.

Codex should **not** redesign the product, rewrite the routing model, normalize authored Thai line breaks, or “clean up” intentional editorial quirks without explicit instruction.

Review first; clean second.

---

## 42. Design authority

Flipgazine’s existing CI is the design authority.

For a new page or feature:

1. inspect existing Flipgazine page patterns;
2. reuse established typography, spacing, controls, motion language and background systems;
3. avoid creating a new visual language from a loose prompt;
4. preserve the project’s restraint.

The goal is increasingly **design preservation rather than design invention**.

---

## 43. Product-quality bar

The owner notices:

- one-pixel-ish alignment drift;
- wrong Thai font;
- incorrect font weight;
- page centering;
- wrong line breaks;
- UI state changes after button press;
- unnecessary headers;
- mobile-only regressions;
- share-preview images appearing when they should not;
- architectural duplication;
- small interactions that do not match existing Flipgazine behavior.

Do not dismiss these as cosmetic. They are part of the product quality bar.

---

## 44. Working contract for future agents

When assigned a bug or feature:

### Do

- inspect enough surrounding code to understand the system;
- search for an existing platform primitive first;
- query live Supabase when the issue is live-page behavior;
- preserve current visual/product decisions;
- make controlled changes;
- back up risky rows;
- test invariants after writes;
- report exactly what changed and what was intentionally untouched.

### Do not

- patch the first snippet you find without checking ownership;
- stack CSS overrides indefinitely;
- recreate Router v4;
- add parallel share/upload/admin systems;
- touch Main Admin for an Answers-only task;
- redeploy the shell for a database content edit;
- mass-format the answer corpus;
- normalize/remove Thai authored line breaks;
- expose service-role credentials;
- assume social crawlers see client-side HTML;
- treat a broad QA flag as an automatic content error;
- change multiple unrelated systems “while you are there.”

---

## 45. Short mental model

If you remember nothing else, remember this:

```text
FLIPGAZINE SHELL
  Cloudflare/GitHub
  owns routing shell, edge metadata, static infrastructure

SITE_FILES
  Supabase
  owns live pages/controllers

ANSWERS LIBRARY
  canonical authored rows
  Thai + English + topics + focus + helpers
          ↓
  generated Focus index
          ↓
PUBLIC QUESTION
          ↓
CARE
          ↓
longest-match Focus parser
          ↓
precise pool
          ↓
anti-repeat
          ↓
uniform random answer

USER EXPERIENCE
  question → ถามดิ → drag physical page → open book → bilingual answer
```

The sophistication belongs backstage. The front stage should continue to feel like a very simple little book.

---

## 46. Final principle

The Book of Answers reached its current quality by repeatedly replacing unnecessary complexity with the correct owner/abstraction.

When something breaks, the best fix is usually not “more code.”

It is usually:

> **Find the real owner, preserve the product invariant, and change the smallest correct layer.**
