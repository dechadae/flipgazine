# AGENTS.md — Flipgazine / The Book of Answers

> **Read this file before changing Flipgazine.**
>
> This is the operational architecture guide for coding agents, with detailed coverage of **The Book of Answers**. It records ownership boundaries, live-source discipline, product invariants, routing semantics, bilingual corpus provenance, QA expectations and failure modes learned during the August 2026 build.
>
> **Core rule:** understand who owns a behavior before patching it. Do not solve a local symptom by stacking CSS, duplicating routing logic, inventing a second source of truth or changing several systems at once.

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

## 2. Repository vs live source of truth

Repository:

`dechadae/flipgazine`

Cloudflare Pages shell:

`flipgazine-root-3/`

Supabase project:

`sjpvhgxacsiorrtijqua`

Most Flipgazine pages/controllers are stored in Supabase `public.site_files`, not as page files in GitHub.

### Current Answers checkpoint — 16 August 2026

| path | version | MD5 |
|---|---:|---|
| `/answers.html` | 99 | `ec265ada07b882356699ef6b118b0167` |
| `/fg-page-answers.js` | **123** | **`4f4cebce4460cec5d826796cb119a5f3`** |
| `/answers-admin.html` | 45 | `0c8ebc38dfbe6e00414457d9195854174` |
| `/fg-page-answers-admin.js` | 22 | `35153068bc4ade1e97ae9b0490bf2f65` |
| `/answers.webmanifest` | 3 | `b678d8ca258e19eefeff2119d6cfafac` |
| `/voice.html` | 11 | `88d8f317d90dbe609c6697010dd456ca` |

These are snapshots, not eternal constants. **Always re-query Supabase before a live write.**

### Deployment rule

If a change is owned by `site_files`, do **not** redeploy Cloudflare Pages.

Only redeploy the shell when the real owner is shell-level infrastructure such as:

- `_worker.js`;
- `_headers`;
- `_redirects`;
- `index.html`;
- `sw.js`;
- manifests/icons/edge assets.

Do not copy a database-served page into the static bundle as a shortcut. That creates two sources of truth.

---

## 3. Documentation authority

For Answers work, read:

1. `BOOK-OF-ANSWERS-HANDOFF.md` — current state and next mission.
2. `ANSWERS-VOICE-TONE.md` — Thai/English editorial authority.
3. `ANSWERS-HUMAN-REVIEW.md` — completed review/provenance record.
4. this file — architecture/ownership/QA.

Editorial precedence:

> **direct user-approved wording → Voice/Tone guide → established human-reviewed corpus voice → generic convention**

Architecture precedence:

> **current live Supabase state → current handoff → historical snapshots**

---

## 4. Ownership map

### Main Flipgazine Admin

- `/admin.html`
- `/fg-page-admin.js`

Owns Books, New, Palette, Media, Links, Team, Settings, etc.

It is **not** the Answers Library.

Do not touch Main Admin for an Answers-only task unless the user explicitly asks.

### Answers Library

- `/answers-admin.html`
- `/fg-page-answers-admin.js`

Owns authored answer editing and canonical semantic metadata.

The Library serializer must preserve:

- Thai;
- English;
- Topics;
- Focus;
- Support;
- Helpers.

### Public Answers

- `/answers.html`
- `/fg-page-answers.js`

Owns:

- public ritual;
- CARE routing;
- Focus/Support/Universal runtime;
- corpus data;
- book interaction;
- answer rendering;
- review mode;
- sharing;
- placeholder guard;
- ask-again state.

### Thai human-review evidence

- `/answers-thai-review.html`
- `/fg-page-answers-thai-review.js`
- `public.answers_thai_reviews`

The `thai-human-v1` round is complete. This system is now evidence/audit infrastructure, not a moving production-copy source.

### Voice reference

- `/voice.html`
- linked centrally through `/fg-devnav.js`

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
3. question is committed;
4. user drags across the physical paper/book edge;
5. releases at a page depth;
6. book opens;
7. bilingual Thai/English answer appears;
8. **ถามอีกดิ** resets.

The physical step is intentionally theatrical.

> **Physical page depth is not answer ID.**

Semantic routing chooses an eligible answer. The physical book makes the result feel discovered.

Do not collapse this into “button → answer” unless the user explicitly changes the product direction.

Public Answers remains intentionally headerless unless explicitly requested otherwise.

---

## 6. Current corpus

Current normal authored corpus:

- **948 answers**;
- **75 Universal answers**;
- **42 Support answers**;
- **183 canonical Focus concepts**;
- **3 CARE responses** handled separately before normal routing.

Conceptual answer row:

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

`support` is first-class data. Do not erase it during serialization/refactoring.

All normal answer IDs remain stable 1–948.

---

## 7. Canonical bilingual corpus lineage

Do not flatten these stages into one undifferentiated “latest file.” The lineage is useful evidence.

### v119 — frozen pre-human-review source

- `/wip/answers-human-review-source-v119-948.js`
- MD5 `6dc18662953f897a390eea0a038f0edf`

### v120 — reviewed Thai only

- `/wip/fg-page-answers-v120-thai-human-v1-preview.js`
- MD5 `7773badc93f5d8887945729c2ea1703f`
- exactly 384 Thai fields changed from v119
- English/non-Thai structure preserved

### v121 — English adaptation

- `/wip/answers-human-thai-english-v121-preview.js`
- MD5 `235e80362da4bf4a3543692311140a0f`
- 140 English siblings changed in the first dedicated pass

### v122 — bilingual QA / copy freeze

- `/wip/answers-bilingual-canonical-v122-948.js`
- MD5 `d12ef72740edd955ddc11aedfe232c2c`
- 149 unique final English changes vs v120
- final Thai/English copy stage

### v123 — current live controller

- live `/fg-page-answers.js`
- `/wip/answers-bilingual-canonical-v123-948.js`
- MD5 `4f4cebce4460cec5d826796cb119a5f3`

v123 changes exactly one routing dictionary item from v122:

```text
beach aliases += ทะเล
```

Removing only that alias reconstructs v122 exactly.

Therefore:

- v122 remains canonical bilingual **copy** freeze;
- v123 is canonical current **runtime/controller** state;
- Thai and English answer fields are identical between v122 and v123.

Do not overwrite historical stages in place.

---

## 8. Thai human-review evidence

Review round:

`thai-human-v1`

Frozen source:

- v119;
- MD5 `6dc18662953f897a390eea0a038f0edf`;
- IDs 1–948.

Final result:

- **948 / 948 reviewed**;
- **564 approved unchanged**;
- **384 human edited**;
- **0 drafts**;
- **0 missing IDs**;
- **0 source mismatches**.

Review exports:

- `/wip/answers-thai-human-v1-complete-948.jsonl`
- `/wip/answers-thai-human-v1-complete-948.csv`
- `/wip/answers-thai-human-v1-manifest.md`

The review table is immutable evidence.

Do not:

- normalize reviewed Thai;
- rewrite line breaks;
- change statuses;
- repoint source hash/version to v122/v123;
- delete original Thai;
- use the table as a future production editor.

See `ANSWERS-HUMAN-REVIEW.md` for full provenance rules.

---

## 9. Thai copy is layout-sensitive language data

Thai line breaks are authored editorial composition, not incidental whitespace.

Never wrap/normalize globally by character count.

Priority:

> **visual width → spoken rhythm → pragmatic meaning → grammar**

Useful principles:

- medium/long answers often land naturally in 3–4 short lines, but there is no fixed quota;
- one visual phrase per line is often useful;
- mixed Thai/English needs visual room because Latin text is wider;
- fragments may stand alone when the pause is the performance;
- protect a short final punchline/landing;
- do not make a grammatically neat line if the spoken timing is worse.

The completed human review contains **36 composition-only edits** under a non-whitespace comparison, direct evidence that line breaks are part of language delivery.

Correct inside a JavaScript string:

```js
{thai:"บรรทัดหนึ่ง\nบรรทัดสอง"}
```

Invalid between JavaScript statements:

```js
var a=1;\nvar b=2;
```

After SQL/text surgery on JS, inspect actual newline/escape boundaries. Literal slash-n text between statements has broken controllers before.

---

## 10. Thai voice — project authority

Canonical guide:

`ANSWERS-VOICE-TONE.md`

Central principle:

> **Contemporary natural Thai is defined by choosing what a Thai speaker would naturally say in that exact social situation — including what they would leave unsaid.**

Hard rules:

- Thai thought first, not English proposition → translation;
- natural Thai may intentionally be incomplete;
- omit subjects/pronouns when context carries them;
- particles are stance/performance choices;
- social specificity often beats generic abstraction;
- humor should be recognizable social performance rather than ornamental cleverness;
- borrowed English is not automatically code-switching;
- use Thai or English-origin vocabulary according to the actual register;
- line breaks are authored breath/timing/body-language cues;
- CARE remains clear/direct outside the playful voice.

Guardrail:

> **Do not imitate surface features. Learn the decision behind them.**

---

## 11. English adaptation rules

English is written from canonical reviewed Thai, not used as the Thai source.

Preserve:

- recommendation direction;
- certainty;
- emotional temperature;
- social intent;
- joke/camp weight where possible.

Do not preserve:

- Thai word order mechanically;
- every particle;
- every omission;
- a stale English metaphor after Thai review changed the joke.

The v121/v122 passes are complete. Do not describe English adaptation as pending.

Evidence:

- `/wip/answers-english-v121-audit.jsonl`
- `/wip/answers-bilingual-v122-qa.jsonl`
- `/wip/answers-bilingual-v122-final-changes.jsonl`

v123 changes no English copy.

---

## 12. CARE is always first

CARE handles at least:

1. suicide/self-harm;
2. medical emergency/medicine-related emergency;
3. unsafe/abuse/violence scenarios.

CARE must never be randomized with ordinary funny answers.

Preserve order:

```text
CARE
→ semantic routing
→ precise/support pool
→ Universal additions where applicable
→ anti-repeat / eligible pool
→ uniform random answer
```

Do not weaken CARE while refactoring routing or corpus data.

---

## 13. Routing philosophy

The active architecture is the inverted-index Focus system, not Router v4.

Mental model:

> **Focus thinks like a librarian.**

Core principle:

> **Precision chooses the pool. Chance chooses the answer.**

Uniform randomness inside the final eligible pool is intentional.

Do not add score weighting to a correctly selected pool unless product direction explicitly changes.

---

## 14. Semantic hierarchy: Focus → Support → Universal

### Focus — subject owner

Focus identifies the concrete subject:

- dessert;
- salary;
- ex;
- handsome;
- barista;
- coffee;
- moo-kratha;
- trip;
- ghosting;
- beach;
- etc.

Focus should remain precise.

### Support — secondary advice/action pattern

Support is broad enough to supplement multiple subjects but not broad enough to answer anything.

Examples:

- retry;
- continue;
- regret;
- take-action;
- risk;
- stop;
- trust;
- readiness;
- fine-print;
- plan-b;
- honesty;
- overexplain.

Support must supplement the subject without competing with Focus ownership.

### Universal — genuinely subject-neutral

Universal answers plausibly answer almost any ordinary question without inventing context.

Current count: **75**.

Universal is explicit through helper/index semantics. **No Focus + no Topic is not automatically Universal.**

Universal rows may not simultaneously carry Focus, Support or Topic semantics.

### Topics / Helpers

Topics are broader editorial groupings.

Helpers include broad utility dimensions such as:

- `general`;
- `decision`;
- `timing`;
- `universal`.

`universal` is special and explicit.

---

## 15. Support parser lane

Support matching uses a separate overlap lane from ordinary Focus/Slang/Topic matching.

Why:

A longer support phrase must never suppress a shorter concrete subject phrase contained inside it.

Example:

```text
go back to my ex
```

should preserve:

- Focus: `ex`;
- Support: `go-back`.

Do not collapse Support into the same occupied-span lane as Focus.

Support answers must not leak into ordinary Focus/Topic/Helper tiers through historical metadata.

---

## 16. Universal mix-in behavior

For a matched non-generic pool:

1. select precise Focus/Topic/Helper owner pool;
2. merge relevant Support answers;
3. apply recent-answer handling to subject/support base;
4. sample **2 distinct Universal answers** from the 75 Universal pool;
5. merge those 2 into the eligible pool;
6. choose uniformly across the whole final eligible pool.

If the router understands nothing, do **not** sample only two Universals. Fall back to the full **75-answer Universal pool**.

Universal mix-ins are randomly sampled per draw, not a fixed pair.

---

## 17. Parser collision discipline

Thai does not provide reliable word spaces. Short aliases can collide inside unrelated words.

Historical traps include:

- `หน้า` ≠ `หัวหน้า`;
- `รัก` ≠ `น่ารัก`;
- `ไลน์` ≠ `เดดไลน์`;
- `ตอบ` ≠ `คำตอบ`;
- `เพื่อน` ≠ `เพื่อนร่วมงาน`;
- `พัก` ≠ `พักเที่ยง`;
- `ทะเล` ≠ `ทะเลาะ`;
- `ถูก` ≠ `ถูกใจ`;
- `ย่าง` ≠ `อย่าง`;
- English `date` ≠ `due date`.

The v123 `ทะเล` → `beach` alias was added intentionally after testing a routing gap. Because `ทะเล` is a known substring-risk token, future edits around beach/conflict vocabulary must re-test `ทะเลาะ` false positives.

Never add a short Thai alias without collision testing.

---

## 18. Widening behavior

Base semantic widening remains conceptually:

```text
all focus
→ near / N−1 focus
→ any focus
→ topics
→ helpers
→ generic/universal
```

Known runtime constraints include:

- `MIN_POOL = 2`;
- `MAX_BROAD_WIDEN = 12`;
- recent-answer memory limit = 6.

When a Focus seed exists, widening should remain a superset of that seed rather than jumping to unrelated content solely to increase pool size.

A singleton may remain intentionally precise.

Support is supplemental, not another subject classifier.

---

## 19. Answer ID convention

Generated semantic indexes use **1-based answer IDs**.

JavaScript arrays use zero-based indices.

```js
var id = route.pick; // 1-based
var index = id - 1;
var answer = answers[index];
```

Do not mix the conventions.

---

## 20. Answers Library canonical semantics

Answer rows are canonical. Derived indexes are generated from rows.

Generated structures include at least:

- Focus;
- Support;
- Topics;
- Helpers;
- Generic/Universal ID list.

Do not reintroduce a second semantic truth such as legacy Router weights, static parallel tags or a separate matrix that can drift from the rows.

Library save validation must continue to protect:

- Thai required;
- English required;
- duplicate Thai forbidden;
- Focus IDs valid;
- Support IDs valid;
- Topics canonical;
- Helpers canonical;
- Universal cannot also have Focus/Support/Topic;
- serializer preserves `support`;
- index builder regenerates support automatically.

---

## 21. Placeholder submission invariant

Rotating example questions are HTML placeholders only.

They must never become routable user questions.

Invariant:

- examples live in `.placeholder`, never `.value`;
- real input marks the question as user-edited;
- submitted question comes from real trimmed `.value`;
- blank/unedited/placeholder-equal submits are rejected;
- Enter and **ถามดิ** use the same guarded path;
- **ถามอีกดิ** resets the guard.

If an empty submit unexpectedly reloads the page, first suspect controller parse/mount failure before redesigning form behavior.

---

## 22. Review mode

Hidden QA review mode remains useful:

```text
/answers.html?review=363
/answers.html?review=351
/answers.html?review=119
/answers.html?review=longest
```

Numeric review opens an exact authored answer and bypasses question/random routing.

Do not mistake review-mode screenshots for routing results.

---

## 23. Public visual system

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

Flipgazine CI is the broader design authority.

The Three.js mechanism experiment is a separate thread. Do not merge it into production unless the user explicitly approves integration.

---

## 24. Share / preview behavior

Public share identity is managed through the existing Links/edge system.

Desired chat preview is text-first/text-only for Answers.

Social crawler behavior may be rewritten by `_worker.js`; do not assume deleting a client-side `og:image` is enough.

Keep share/QR ownership centralized rather than adding Answers-specific infrastructure.

---

## 25. Canonical backups / evidence

Important current artifacts include:

### Review / copy lineage

- `/wip/answers-human-review-source-v119-948.js`
- `/wip/fg-page-answers-v120-thai-human-v1-preview.js`
- `/wip/answers-human-thai-english-v121-preview.js`
- `/wip/answers-bilingual-canonical-v122-948.js`
- `/wip/answers-bilingual-canonical-v123-948.js`

### Review exports

- `/wip/answers-thai-human-v1-complete-948.jsonl`
- `/wip/answers-thai-human-v1-complete-948.csv`
- `/wip/answers-thai-human-v1-manifest.md`

### English/bilingual QA

- `/wip/answers-english-v121-audit.jsonl`
- `/wip/answers-bilingual-v122-qa.jsonl`
- `/wip/answers-bilingual-v122-final-changes.jsonl`
- `/wip/answers-bilingual-v122-production-manifest.md`
- `/wip/answers-bilingual-v123-production-manifest.md`

Historical `/wip/` files are comparison/recovery evidence, not live dependencies.

Always create a new timestamped snapshot before a risky controller rewrite.

---

## 26. Current QA baseline

Current corpus-level invariants:

- 948 normal answers;
- 3 CARE responses;
- 75 Universal;
- 42 Support;
- 183 Focus concepts;
- all normal answer IDs stable 1–948;
- Thai human review complete 948/948;
- 564 accepted / 384 edited;
- v120 changed only the expected 384 Thai fields from v119;
- v122 final English change set = 149 unique normal-answer IDs vs v120;
- v123 answer Thai/English fields = v122;
- v123 differs from v122 only by `ทะเล` added to `beach` aliases.

Historical routing test counts from earlier migration phases remain useful as regression inspiration, but do not treat old 717-answer pool counts as current truth.

When making a substantial routing change, run fresh reachability/pool/collision QA.

---

## 27. Change discipline

For any live Answers change:

1. identify the real owner;
2. query current live version/hash;
3. inspect enough surrounding code/data to understand behavior;
4. back up risky rows under `/wip/`;
5. make the smallest coherent change;
6. use optimistic version checks where possible;
7. prove anchors/markers are unique before text replacement;
8. verify removed/replaced code paths are actually gone;
9. verify copy unchanged when task is semantic/runtime only;
10. verify semantics unchanged when task is copy-only;
11. inspect newline/escape boundaries after SQL text surgery;
12. test user behavior and routing invariants, not merely string presence.

Avoid blind global replacement on the ~270k controller.

---

## 28. CSS discipline

Do not solve design bugs by stacking override after override.

Preferred order:

1. identify canonical owner/rule;
2. inspect inheritance/parent ownership;
3. fix the correct layer;
4. remove obsolete/conflicting override if safe;
5. verify mobile and desktop.

Do not create `.fix`, `.fix2`, `.fix-the-fix` cascades without a real responsive reason.

---

## 29. Architectural discipline

Before creating a new system, search for an existing owner.

Past lessons:

- Links already owns short links/QR;
- Media owns general uploads;
- `_worker.js` owns crawler metadata;
- Router v4 was inferior to inverted Focus ownership;
- broad accidental “generic” semantics were replaced by explicit Universal + Support layers;
- Voice is centralized as an editorial reference rather than duplicated prompts in each tool.

Recurring rule:

> **Prefer the correct owner/abstraction over another layer of special-case code.**

---

## 30. Do not casually change these decisions

Unless explicitly requested, preserve:

- public Answers headerless design;
- tactile drag/open ritual;
- CARE first;
- Focus as subject owner;
- Support as supplemental;
- separate Support parser overlap lane;
- explicit Universal semantics;
- 2 random Universals added to matched non-generic pools;
- full 75 Universal fallback when nothing is understood;
- uniform randomness across final eligible pool;
- Router v4 retired;
- physical page depth not mapped to answer ID;
- Thai line breaks as authored language;
- reviewed Thai as canonical copy;
- final English v122 copy unless a new explicit editorial change is approved;
- v119 review evidence immutable;
- Noto Sans Thai for Thai UI/answers;
- Main Admin separate from Answers Library;
- Links as shortlink/QR owner;
- Worker as social metadata owner;
- `site_files` as live content source;
- no unnecessary Cloudflare redeploy for content changes.

---

## 31. Routing test checklist

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
- final eligible answers equal probability.

For v123 specifically, include:

- `ทะเล` → beach;
- `ไปทะเล` → beach;
- `ทะเลไหม/ทะเลมั้ย` → beach;
- `ทะเลาะ` must **not** become beach.

Inspect parsed Focus, parsed Support, alias hits, base tier, Support additions, Universal additions, final eligible IDs and chosen ID.

---

## 32. Corpus/editor test checklist

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
- Library save round-trip;
- no accidental changes to historical review evidence;
- if copy-only, routing/runtime reconstructs previous stage;
- if routing-only, Thai/English copy reconstructs previous stage.

---

## 33. Debugging philosophy

When a bug appears:

1. reproduce the exact user state;
2. identify owner/layer;
3. inspect the whole relevant block;
4. inspect data invariants;
5. inspect runtime/session/cache possibility;
6. only then modify.

Do not patch the screenshot. Fix the ownership/invariant that explains the screenshot.

A controller parse failure can masquerade as UI logic failure. A stale runtime can masquerade as bad semantics. A broad alias can masquerade as a bad answer pool. Diagnose before retagging or styling.

---

## 34. Product-quality bar

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

## 35. Short mental model

```text
GITHUB / CLOUDFLARE SHELL
  static infrastructure + edge metadata

SUPABASE site_files
  live pages/controllers

ANSWERS ROWS
  Thai + English + Focus + Support + Topics + Helpers
          ↓
  generated Focus / Support / Universal indexes
          ↓
PUBLIC QUESTION
          ↓
CARE
          ↓
subject parser + separate Support lane
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
  v123 same copy + beach alias runtime fix
```

The sophistication belongs backstage. The front stage should continue to feel like a very simple little book.

---

## 36. Final principle

The Book of Answers reached its current quality by repeatedly replacing accidental complexity with the correct owner or abstraction.

When something breaks, the best fix is usually not “more code.”

It is usually:

> **Find the real owner, preserve the product invariant, and change the smallest correct layer.**
