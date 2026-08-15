# AGENTS.md — Flipgazine / The Book of Answers

> **Read this file before changing Flipgazine.**
>
> This is the operational handoff for coding agents working on Flipgazine, with detailed coverage of **The Book of Answers**. It records the live architecture, product invariants, routing semantics, source-of-truth boundaries, QA expectations, and failure modes learned during the August 2026 build.
>
> **Core rule:** understand who owns a behavior before patching it. Do not solve a local symptom by stacking CSS, duplicating routing logic, inventing parallel infrastructure, or changing multiple systems at once.

---

## 1. Product context

Flipgazine is an intentionally niche design/editorial platform. It is not being built as a generic SaaS product.

Product principles:

- remove friction;
- hide operational complexity;
- keep the public experience calm and obvious;
- preserve strong visual continuity;
- prefer an existing platform primitive over a parallel feature-specific system;
- make outputs feel designed by default;
- keep sophistication backstage.

The owner is both product/creative director and primary tester. Changes are commonly made in small increments and tested immediately on a real mobile device. Respect that workflow. A theoretically elegant refactor that destabilizes a working page is worse than a small, well-understood change.

The design philosophy is close to “no-makeup makeup”: the system may be complex, but the user should not feel the complexity.

---

## 2. Repository vs live source of truth

### GitHub

Repository:

`dechadae/flipgazine`

Cloudflare Pages shell:

`flipgazine-root-3/`

Important static owners include:

- `index.html`
- `_redirects`
- `_headers`
- `_worker.js`
- `sw.js`
- `manifest.webmanifest`
- shared flipbook/UI assets
- icons / OG assets

### Supabase live content

**Most Flipgazine pages are not source-controlled page files in GitHub.** They are stored in Supabase `public.site_files` and loaded through the shell.

Supabase project:

`sjpvhgxacsiorrtijqua`

Current Answers live source rows:

- `/answers.html`
- `/fg-page-answers.js`
- `/answers-admin.html`
- `/fg-page-answers-admin.js`
- `/answers.webmanifest`

Verified 16 August 2026 live snapshot after Universal + Support work:

| path | version | MD5 |
|---|---:|---|
| `/answers.html` | 98 | `e97e821b71c02e9d4831dcba1087c2a9` |
| `/fg-page-answers.js` | **115** | `65346c73cd146269192e6f3c7607ed88` |
| `/answers-admin.html` | 43 | `561009fdfbe6e00414457d9195854174` |
| `/fg-page-answers-admin.js` | **22** | `35153068bc4ade1e97ae9b0490bf2f65` |
| `/answers.webmanifest` | 3 | `b678d8ca258e19eefeff2119d6cfafac` |

These are snapshots, not eternal constants. **Always re-query Supabase before relying on a version/hash in a later session.**

### Deployment rule

If a change is owned by `site_files`, do **not** redeploy Cloudflare Pages.

Only change/redeploy the shell when behavior is genuinely owned by shell-level files such as `_worker.js`, `_headers`, `_redirects`, `index.html`, `sw.js`, manifests, icons, etc.

Do not copy a database-served page into the static bundle as a shortcut. That creates two sources of truth.

---

## 3. Ownership map

### Main Flipgazine Admin

- `/admin.html`
- `/fg-page-admin.js`

Owns Books, New, Palette, Media, Links, Team, Settings, etc.

It is **not** the Answers Library.

A previous accidental text patch inserted literal `\n` characters between JavaScript statements and broke Main Admin. It was restored to a known-good v4. Treat Main Admin as stable and do not touch it for an Answers-only task.

### Answers Library

- `/answers-admin.html`
- `/fg-page-answers-admin.js`

Owns the authored Answers corpus and canonical semantic metadata.

### Public Answers

- `/answers.html`
- `/fg-page-answers.js`

Owns the public ritual, CARE routing, Focus/Support runtime, Universal mix-in, answer rendering, book drag/open interaction, review mode, sharing, placeholder guard and ask-again state.

### Social previews

Owned at the edge by:

`flipgazine-root-3/_worker.js`

Social crawlers do not run the page JavaScript. Do not “fix” LINE/Facebook previews only by editing client-side page metadata when the Worker owns crawler output.

### Short links / QR

Owned by the existing Links system (`fg_shortlinks` / `fg_shares`). Do not build an Answers-specific shortener or QR system.

Current Answers share identity:

- share token: `answersbook`
- target: `/answers.html`
- title: `The Book of Answers — flipgazine`
- description: `A small book for big questions.`
- image: `null`
- short code: `answers`
- short target: `/answers.html?s=answersbook`

Canonical public share is effectively:

`https://flipgazine.pages.dev/answers`

---

## 4. What The Book of Answers is

It is deliberately **not a chatbot**.

Ritual:

1. user types a real question;
2. presses **ถามดิ**;
3. the question is committed;
4. user drags across the physical paper edge;
5. releases at a page depth;
6. the book opens;
7. bilingual Thai/English answer appears;
8. **ถามอีกดิ** resets for another question.

The drag/page-selection step is intentionally theatrical. Do not remove it merely because semantic routing can technically select an answer without it.

The semantics should remain invisible. The user should feel that the physical book answered them.

Physical depth is **not** an answer ID. The ritual and semantic selection are intentionally decoupled.

---

## 5. Current corpus

Current authored corpus:

**717 normal authored answers**

plus **3 CARE responses** handled separately before normal routing.

The 717 authored answers currently include:

- **75 Universal answers**
- **42 Support answers**
- the remaining authored answers are specific/broader semantic rows reached through Focus/Topic/Helper behavior

The 50 newest Universal answers were appended as IDs **668–717**, preserving all previous answer IDs.

Answer rows conceptually support:

```js
{
  thai: "...",
  english: "...",
  topics: [...],
  focus: [...],
  support: [...],
  helpers: [...]
}
```

`support` is now a first-class semantic field in the Answers Library serializer/index builder. Do not remove it during a future save/refactor.

---

## 6. Thai copy is layout-sensitive data

Thai line breaks are authored editorial composition, not incidental whitespace.

Preserve them exactly.

### Editorial line-break rule — approved 16 August 2026

Do **not** wrap Thai answers mechanically by character count. Line breaking is visual/editorial composition.

- Aim for **3–4 short lines** for medium/long answers; this is a target, not a hard quota.
- Prefer roughly **one visual phrase per line** and break at a natural reading breath.
- Use `จำชื่อเราได้ไหม` as the approximate pure-Thai comfort-width reference. Inspect anything that feels materially wider rather than treating the reference as a literal character limit.
- Mixed Thai/English needs extra space because Latin text is visually wider. Break at the language boundary when useful.
- A long English word may stand alone if it improves balance and timing, e.g. `surprise` or `philosophize`.
- Do not let the opening line carry the whole setup when two lighter beats read better, e.g. `วันนี้ยัง` / `ไม่ต้องสารภาพ`.
- Preserve the punchline. A shorter final line is welcome when it improves comedic/editorial timing.
- Decision priority is **visual width → reading rhythm → meaning → grammar**.
- Never “normalize” authored breaks later just because another wrapping pattern appears more grammatical.

Canonical approved references:

```text
ช่วยได้
แต่อย่ากลายเป็น
customer service
ประจำบ้าน

วันนี้ยัง
ไม่ต้องสารภาพ
ดูก่อนว่าเขา
จำชื่อเราได้ไหม

กอดได้
แต่ถามก่อน
consent น่ารักกว่า
surprise

กลับพร้อม
หนึ่ง connection ที่ดี
ดีกว่ายี่สิบชื่อ
ที่จำหน้าไม่ได้

ถ้าพัดลมดัง
เหมือนจะบิน
save งานก่อน
philosophize
```

In a review Markdown file, ` / ` may be used to display an authored line break compactly. When the answer is inserted into the live JavaScript data, each approved break must become an intentional `\n` inside the JavaScript string.

A prior migration accidentally converted authored breaks to double-escaped `\\n`. It was repaired. The same class of escaping bug has also broken controller parsing.

Correct inside a JavaScript string:

```js
{thai:"บรรทัดหนึ่ง\nบรรทัดสอง"}
```

Invalid between JavaScript statements:

```js
var a=1;\nvar b=2;
```

After any SQL/text surgery on JS:

- inspect source boundaries;
- verify actual source newlines are real `0a` bytes where required;
- verify `\n` escapes only occur where JavaScript strings intentionally contain them;
- verify controller markers/listeners still exist;
- do not assume a UI symptom is a UI logic bug if the controller may have failed to parse.

During the Support migration the dictionary/index rewrites briefly produced literal `\n\n` text between JS declarations. This was caught and fixed **before final versioning**. Current v115 has clean boundaries.

---

## 7. CARE is always first

CARE handles at least:

1. suicide / self-harm;
2. medical emergency / medicine-related emergency;
3. unsafe / abuse / violence scenarios.

CARE must never be randomized with normal funny answers.

Preserve this order:

```text
CARE
→ semantic routing
→ precise/supported pool
→ 2 Universal mix-ins where applicable
→ anti-repeat / eligible pool
→ uniform random answer
```

Do not weaken CARE while refactoring routing.

---

## 8. Routing philosophy

The active architecture is the inverted-index Focus system, not Router v4.

Router v4 was retired because it behaved like a classifier and produced broader/weaker answer reachability.

Mental model:

> **Focus thinks like a librarian.**

Core principle:

> **Precision chooses the pool. Chance chooses the answer.**

Uniform randomness inside the final eligible pool is intentional. Do not add score weighting to a correctly selected pool unless product direction explicitly changes.

---

## 9. Semantic hierarchy: Focus → Support → Universal

This distinction is critical.

### Focus — subject owner

Focus says what the question is concretely about.

Examples:

- `dessert`
- `salary`
- `ex`
- `handsome`
- `barista`
- `coffee`
- `moo-kratha`
- `trip`
- `ghosting`

Focus owns the subject and should remain precise.

### Support — secondary relevant advice

Support answers are broad enough to work across more than one subject, but **not** broad enough to answer anything.

Examples of Support meanings:

- retry
- continue
- regret
- take action
- risk
- stop
- trust
- readiness
- fine print
- plan B
- honesty
- over-explaining

Support exists specifically so these answers do **not** become fake Focus families or Universal fallback.

A Support signal can supplement a concrete subject without competing with it.

Example:

```text
“ควรยกเลิกทริปไหม”

Focus: trip
Support: cancel

base trip pool
+ relevant cancel support answer(s)
+ 2 randomly sampled Universal answers
→ uniform random pick
```

### Universal — truly subject-neutral

Universal answers must plausibly answer almost any ordinary question without inventing missing context.

Current Universal count: **75**.

Universal is explicit through helper `universal` and the generated generic/universal index. **No Focus + no Topic does not automatically mean Universal.**

Universal answers may not have Focus, Support or Topic semantics. Answers Library validation enforces this.

### Topics

Broader editorial grouping, currently including:

`beverage`, `cafe`, `confidence`, `conflict`, `family`, `food`, `friends`, `hangout`, `hobby`, `message`, `money`, `relationship`, `relax`, `rest`, `shopping`, `social`, `style`, `travel`, `work`, `workplace`.

### Helpers

Broad utility dimensions currently include:

- `general`
- `decision`
- `timing`
- `universal`

`universal` is special and explicit.

---

## 10. The 42 Support answers

The former accidental generic set was reviewed manually.

25 old answers were judged truly generic and remained Universal.

42 answers were judged **not truly generic**. They remain in the book but are now explicit Support answers only.

Exact Support answer IDs:

`[2, 14, 15, 18, 21, 22, 23, 28, 29, 74, 83, 87, 98, 109, 114, 117, 119, 130, 132, 141, 152, 153, 157, 165, 166, 170, 172, 174, 180, 205, 207, 212, 219, 221, 234, 235, 237, 239, 249, 272, 284, 288]`

Current Support architecture QA:

- **42** supported answers
- **57** answer→support links
- **36** support keys in the generated support index
- **24** new dictionary concepts with `kind: "support"`
- support pool minimum: 1
- support pool maximum: 5
- average support pool size: ~1.58
- largest support groups: `take-action` 5, `retry` 4, `continue` 3, `risk` 3, `stop` 3
- **0** Support/Universal overlap
- **0** support-index mismatches
- **0** unknown support keys

Some Support tags reuse an existing Focus concept as a trigger without making the answer itself a Focus answer. Examples:

- #74 supports `drink`
- #130 supports `direct-talk`
- #141 supports `ghosting`
- #170 supports `closure`
- #207 supports `attraction`, `pretty`, `handsome`
- #212 supports `direct-talk`, `overthinking`
- #221 supports `rest`

This is intentional.

---

## 11. Support dictionary kind and parser lanes

The dictionary now recognizes `kind: "support"` in addition to existing kinds such as:

- `focus`
- `slang`
- `bridge`
- `topic`
- `support`

A critical parser rule:

**Support uses a separate overlap lane from Focus/Slang/Topic.**

Why:

A long Support phrase must never suppress a shorter concrete Focus phrase contained inside it.

Example:

`go back to my ex`

should preserve:

- Focus: `ex`
- Support: `go-back`

not choose one and discard the other.

The runtime therefore keeps normal longest-match behavior for subject semantics while Support overlaps are resolved separately.

Do not collapse Support back into the same occupied-span lane as Focus.

---

## 12. Current Support concept vocabulary

New support-only dictionary concepts currently include:

- `retry`
- `continue`
- `regret`
- `take-action`
- `walk-away`
- `competition`
- `stop`
- `failure`
- `hurt`
- `risk`
- `fine-print`
- `go-back`
- `play-cool`
- `cancel`
- `fix-repair`
- `trust`
- `play-dumb`
- `plan-b`
- `secret`
- `low-friction-choice`
- `wait-decision`
- `readiness`
- `overexplain`
- `honesty`

Aliases are intentionally narrow. Do not casually add giant broad aliases like bare `เลือก`, bare `ทำ`, etc. A generic action word can contaminate many otherwise-specific questions.

As with Focus aliases, Thai substring collisions must be reviewed carefully.

---

## 13. Universal mix-in behavior

Universal handling changed in v113+ and remains in v115.

For a matched non-generic pool:

1. select the precise Focus/Topic/Helper owner pool;
2. merge any relevant Support answers;
3. apply recent-answer handling to the subject/support base;
4. randomly sample **2 distinct Universal answers** from the 75 Universal pool;
5. add those 2 to the eligible pool;
6. choose uniformly across the whole combined eligible pool.

Therefore every included answer has the same probability in that draw.

Example:

`dessert` currently has 5 Focus answers.

Normal dessert question with no Support signal:

```text
5 dessert Focus
+ 2 sampled Universal
= 7 eligible answers
= 1/7 probability each
```

If the router understands nothing, it does **not** sample only two Universal answers. It falls back to the full **75-answer Universal pool**.

Universal mix-ins are random per draw. They are not a fixed pair.

---

## 14. Support pool ownership rules

Support must not leak through broad helper/topic tiers merely because old Support rows still carry historical helper metadata.

Runtime builds an exclusion set containing:

- all Universal answer IDs;
- all Support answer IDs.

Those IDs are stripped from ordinary Focus/Topic/Helper tier construction.

They can re-enter only through:

- explicit Support matching; or
- Universal behavior if they are Universal (Support and Universal are currently disjoint and must remain so).

This is what prevents an answer like #272 from showing up for an unrelated dessert question merely because it once looked “generic.”

---

## 15. Example routing checks

### Dessert

Question:

`อยากกินขนมหวาน`

Expected semantic hit:

`ขนม → dessert`

Current dessert Focus pool remains 5 answers.

No Support phrase is present, so only the 2 Universal mix-ins supplement it.

### Retry only

Question:

`ควรลองใหม่ไหม`

Expected:

- Support: `retry`
- no concrete subject required

Current retry Support pool: 4 answers.

Support becomes the narrow owner instead of falling into a huge generic decision pool, then receives 2 Universal mix-ins.

### Trip + cancel

Question:

`ควรยกเลิกทริปไหม`

Expected:

- Focus: `trip`
- Support: `cancel`

Current trip Focus pool: 10.

Cancel Support currently contributes one relevant answer.

### Fine print

Question:

`สัญญานี้เซ็นดีไหม`

Expected:

- Support: `fine-print`

Current fine-print Support pool: 2.

### Readiness

Question:

`พร้อมหรือยัง`

Expected:

- Support: `readiness`

No concrete subject is required for Support to act as the narrow pool when it is the best semantic information available.

---

## 16. Focus parser collision rules

Existing longest-match protections still matter.

Examples:

- `แฟนเก่า` → `ex`, not `ex + partner`
- coworker beats bare friend when `เพื่อน` only exists inside coworker phrase
- hobby/craft/coworker do not imply generic work unless another work expression exists
- `คำตอบ` does not automatically imply reply action
- `social battery` does not accidentally become unrelated bare battery semantics
- `จริงหรือเค้ก` should not become literal cake merely because the string contains `เค้ก`

Historical false-positive traps include:

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

Thai does not provide reliable spaces as word boundaries. Never add a short Thai alias without testing substring collisions.

---

## 17. Widening behavior

Base semantic widening remains conceptually:

```text
all focus
→ near / N−1 focus
→ any focus
→ topics
→ helpers
→ generic/universal
```

Current constraints:

- `MIN_POOL = 2`
- `MAX_BROAD_WIDEN = 12`
- recent-answer memory limit = 6

When a Focus seed exists, widening should remain a superset of that seed. Do not widen to unrelated content just to satisfy a pool-size target.

A singleton may remain intentionally precise.

Support is supplemental to this hierarchy; it is not another competing subject classifier.

---

## 18. Answer ID conventions

Generated indexes use **1-based answer IDs**.

JavaScript array uses zero-based indices.

```js
var id = route.pick; // 1-based
var index = id - 1;
var answer = answers[index];
```

Do not mix these conventions.

The UI recent list stores array indices and maps them to IDs before calling the engine.

---

## 19. Answers Library canonical semantics

The answer rows are canonical.

Derived indexes are generated from the rows.

Current generated index contains at least:

- `focus`
- `support`
- `topics`
- `helpers`
- `generic` (the explicit Universal ID list)

Do not reintroduce a second semantic truth such as `ANSWER_LEGACY_TAGS`, Router v4 weights/specs, or a separate Focus Lab matrix.

The Library now reads/writes separately:

- Topics
- Focus concepts
- Support concepts
- Helpers

Search includes Support semantics.

Save validation includes:

- Thai required
- English required
- duplicate Thai forbidden
- Focus IDs must be valid focus/slang dictionary concepts
- Support IDs may be valid focus/slang/support dictionary concepts
- Topics must be canonical
- Helpers must be canonical
- Universal answers cannot also have Focus, Support or Topic tags

The editor serializer must preserve `support` on every save.

The index builder must regenerate `support` automatically.

---

## 20. Placeholder submission invariant

Rotating example questions are HTML placeholders only.

They must never be routable as user questions.

Current invariant:

- placeholder assigned to `.placeholder`, never `.value`;
- `userQuestionEdited` starts false;
- real input event makes it true;
- current submitted question comes from trimmed real `.value`;
- blank, unedited or placeholder-equal values are rejected;
- Enter and **ถามดิ** use the same guarded submit path;
- **ถามอีกดิ** resets the guard.

Invalid submit shows:

```text
ยังไม่ได้ถามจริงเลยค่ะ
พิมพ์ก่อน แล้วกด ถามดิ อีกที
```

Popup Thai typography intentionally matches the instruction line:

- Noto Sans Thai
- `max(16px, var(--ui-input))`
- weight 300
- line-height 1.65

If empty submit ever causes a full page reload again, first suspect controller parse/mount failure rather than changing form behavior.

---

## 21. Review mode

Hidden QA review mode remains useful:

- `/answers.html?review=363`
- `/answers.html?review=351`
- `/answers.html?review=119`
- `?review=longest`

Numeric review opens an exact authored answer directly and bypasses normal question/random routing.

Do not mistake a review-mode screenshot for a routing result.

---

## 22. Public visual system

Answers remains intentionally standalone/headerless.

Do not add the normal Flipgazine header unless explicitly requested.

Visual language:

- dark restrained background;
- one dominant physical book;
- generous negative space;
- Noto Sans Thai for Thai;
- light type weights;
- bilingual spread;
- tactile page drag/opening;
- minimal controls;
- small circular glass share control;
- editorial rather than tarot/mystical styling.

Avoid:

- excessive glassmorphism;
- decorative gradients that compete with the book;
- chatbot bubbles;
- extra navigation chrome;
- adding UI just because space exists.

Flipgazine’s existing CI is the design authority. Prefer design preservation over inventing a new local visual language.

---

## 23. Share / preview behavior

Public share content:

- title: `The Book of Answers — flipgazine`
- text: `A small book for big questions.`

Desired chat preview is text-only.

The permanent token mode `?s=answersbook` is what tells the Worker to remove image metadata / use text-only preview behavior.

Do not fix a LINE preview only by deleting `og:image` from Answers HTML; edge rewriting owns crawler output.

---

## 24. Main Admin Media vs retired WIP uploader

A separate WIP Upload page existed previously and was retired after Main Admin Media was expanded to support handoff MIME types such as JSON, JS, plain text, Markdown, HTML, CSS and ZIP.

Do not resurrect a separate uploader without a real requirement Media cannot satisfy.

A previous attempt to alter Main Admin Media upload logic broke `/fg-page-admin.js` and was reverted. Treat existing Main Admin behavior as known-good.

---

## 25. Backups for the current routing changes

Important current backups in Supabase `site_files` include:

- `/wip/fg-page-answers-pre-universal-v111-2026-08-16.js`
- `/wip/fg-page-answers-pre-support-v113-2026-08-16.js`
- `/wip/fg-page-answers-admin-pre-support-v21-2026-08-16.js`

Historical Focus Phase 5–19 artifacts also remain under `/wip/` and are useful for comparison, not live dependencies.

Always create a timestamped `/wip/` snapshot before a risky live controller rewrite.

---

## 26. QA baseline for Universal + Support migration

Verified after the migration:

- 717 authored answers
- 75 Universal
- 42 Support
- Support/Universal overlap = 0
- 57 support links
- 36 support keys
- 24 support-only dictionary concepts
- support index exactly matches row-owned support semantics
- no unknown support keys
- no Support alias exactly duplicates an existing non-Support alias
- original authored Thai/English copy unchanged by the Support reassignment
- 50 new Universal rows retain proper JS newline escapes
- no double-escaped new Universal Thai line breaks
- no literal `\n\n` structural boundary remains between Focus dictionary/index/router declarations
- dessert Focus count remains 5
- trip Focus count remains 10
- ex Focus count remains 1
- Universal fallback count remains 75

These are regression expectations for the current state, not eternal corpus counts.

---

## 27. Historical Focus QA baseline

Earlier Focus migration QA achieved, among other checks:

- 500/500 parser expected recall
- 500/500 non-empty pools
- 412/412 supported focus tests preserving expected answer family
- 562/562 specific answers reachable
- 0 orphaned specific answers
- 0 generic fallbacks in the final 500-question coverage suite
- all 50 realistic compound/mixed-language questions focus-based
- only 2 realistic singletons intentionally precise

When making a substantial routing or corpus change, run equivalent reachability/pool QA rather than assuming historical numbers still hold.

---

## 28. Change discipline

For any live Answers change:

1. identify the real owner;
2. query the current live `site_files` row/version;
3. inspect enough surrounding code to understand the whole behavior;
4. back up risky rows under `/wip/`;
5. make the smallest coherent change;
6. use optimistic version checks;
7. verify new markers occur exactly where expected;
8. verify replaced code paths are actually gone;
9. verify authored copy is unchanged when the task is semantic/runtime only;
10. verify Main Admin is untouched unless intentionally involved;
11. inspect JS newline/escape boundaries after SQL text surgery;
12. test user-facing behavior and routing invariants, not only string presence.

Avoid blind global replacement on the 200k+ controller.

Use distinctive anchors and pre/post counts.

---

## 29. CSS discipline

Do not solve design bugs by adding override after override.

Preferred order:

1. identify the canonical rule;
2. inspect inheritance/parent ownership;
3. fix the correct layer;
4. remove obsolete/conflicting override if safe;
5. verify mobile and desktop.

Avoid a spiral of `.rule`, `.rule fix`, `.rule fix-the-fix` unless a real responsive rule requires it.

---

## 30. Architectural discipline

Before creating a new system, search for an existing owner.

Historical examples:

- Answers custom share/QR was unnecessary because Links already owns short links and QR;
- separate WIP uploader became unnecessary because Media can own uploads;
- client page metadata alone could not fix social previews because `_worker.js` owns crawler output;
- continuing to tune Router v4 was inferior to changing to an inverted Focus architecture;
- broad “generic” metadata was insufficient, leading to explicit Universal and Support layers instead of more fallback heuristics.

Recurring rule:

> **Prefer the correct owner/abstraction over another layer of special-case code.**

---

## 31. Do not casually change these decisions

Unless explicitly requested, preserve:

- public Answers remains headerless;
- drag-to-select ritual remains;
- CARE runs first;
- Focus remains subject owner;
- Support remains supplemental and never competes with subject ownership;
- Support uses a separate parser overlap lane;
- Universal remains explicit;
- exactly 2 random Universals are mixed into matched non-generic pools;
- full Universal pool is used when nothing is understood;
- final selection remains uniform random across the final eligible pool;
- Router v4 remains retired;
- physical page depth does not map directly to answer ID;
- Thai line breaks remain authored data;
- Noto Sans Thai remains Thai UI/answer typography;
- Main Admin and Answers Library remain separate;
- Links remains canonical shortlink/QR owner;
- Worker remains social metadata owner;
- Media remains general upload owner;
- `site_files` remains live content source;
- no unnecessary Cloudflare redeploy for content changes.

---

## 32. Testing checklist — routing

When changing routing, test at least:

- exact target phrase;
- nearby synonym;
- Thai substring collision;
- mixed Thai/English;
- compound question with two Focus concepts;
- Focus + Support question;
- Support-only question;
- no-focus/no-support Universal fallback;
- recent-answer exclusion;
- CARE query;
- singleton/thin Focus pool;
- singleton/thin Support pool;
- no accidental Support leakage through Helper/Topic tiers;
- no Support phrase suppressing an overlapping Focus phrase;
- two Universal additions remain distinct where possible;
- all final eligible answers have equal probability.

Inspect:

- parsed Focus;
- parsed Support;
- alias hits;
- base selected tier;
- Support additions;
- Universal additions;
- final eligible IDs;
- chosen ID.

---

## 33. Testing checklist — corpus/editor

When changing answer content or semantics, verify:

- expected total count;
- Thai/English pairing;
- Thai line breaks;
- duplicate Thai;
- Focus values valid;
- Support values valid;
- Topic/Helper values valid;
- Universal row has no Focus/Support/Topic;
- generated Focus index;
- generated Support index;
- generated Universal/generic list;
- reachability;
- Answers Library can save without erasing `support`.

---

## 34. Debugging philosophy

When a bug appears:

1. reproduce exact user state;
2. identify owner/layer;
3. inspect the full relevant block;
4. inspect data invariants;
5. inspect runtime/session/cache possibility;
6. only then modify.

Example: when dessert once appeared to return #272, the correct response was not to randomly retag dessert. The investigation checked dictionary alias, index, eligible pool, generic status, runtime/controller state and placeholder behavior. That led to the later cleaner architecture: #272 is now explicit `readiness` / `take-action` Support and cannot leak through generic fallback.

Do not patch the screenshot. Fix the ownership/invariant that explains it.

---

## 35. Codex review role

A useful Codex pass should focus on:

- architectural duplication;
- dead code;
- unreachable branches;
- stale Router v4 remnants;
- repeated CSS rules;
- redundant aliases;
- parse hazards;
- performance hot spots;
- inconsistencies between live controller and documented invariants;
- simplification opportunities that preserve behavior.

Codex should **not** redesign the product, rewrite the routing model, normalize Thai line breaks, collapse Support into Focus, or “clean up” intentional editorial quirks without explicit instruction.

Review first; clean second.

---

## 36. Product-quality bar

The owner notices and cares about:

- alignment drift;
- wrong Thai font;
- wrong font weight;
- centering;
- line breaks;
- UI state changes after button press;
- unnecessary headers;
- mobile regressions;
- share-preview images appearing when they should not;
- semantic mismatches;
- architectural duplication;
- interactions that do not match the existing Flipgazine backbone.

Do not dismiss these as cosmetic. They are part of product correctness.

---

## 37. Short mental model

```text
GITHUB / CLOUDFLARE SHELL
  static infrastructure + edge metadata

SUPABASE site_files
  live pages/controllers

ANSWERS LIBRARY
  canonical rows:
  Thai + English + Focus + Support + Topics + Helpers
          ↓
  generated Focus / Support / Universal indexes
          ↓
PUBLIC QUESTION
          ↓
CARE
          ↓
longest-match subject parser
  + separate Support overlap lane
          ↓
Focus owns subject
          ↓
relevant Support joins
          ↓
2 random Universal answers join
          ↓
anti-repeat / final eligible pool
          ↓
uniform random answer

IF NOTHING IS UNDERSTOOD
          ↓
full 75-answer Universal pool

USER EXPERIENCE
  question → ถามดิ → drag physical page → open book → bilingual answer
```

The sophistication belongs backstage. The front stage should continue to feel like a very simple little book.

---

## 38. Final principle

The Book of Answers reached its current quality by repeatedly replacing accidental complexity with the correct owner/abstraction.

When something breaks, the best fix is usually not “more code.”

It is usually:

> **Find the real owner, preserve the product invariant, and change the smallest correct layer.**
