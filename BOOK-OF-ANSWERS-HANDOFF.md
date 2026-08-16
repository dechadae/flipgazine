# The Book of Answers — Operational Handoff

**Updated:** 16 August 2026  
**Project:** Flipgazine / The Book of Answers  
**Repository:** `dechadae/flipgazine`  
**Supabase project:** `sjpvhgxacsiorrtijqua`

> **Read this file first when opening a new chat for The Book of Answers.**
>
> It records the current finished corpus state, the frozen human-review state, the production ownership boundaries, and the exact next mission: an isolated Three.js book-mechanism experiment.
>
> Do not assume older corpus/version numbers in `AGENTS.md` are current. Re-query Supabase before a live write. This handoff records the verified state at the time above.

---

## 1. Read these project authorities

Before changing anything substantial, read:

1. `AGENTS.md` — overall Flipgazine / Answers architecture, ownership and routing principles.
2. `ANSWERS-VOICE-TONE.md` — canonical Thai/English editorial voice, queerness, slang and line-break rules.
3. `ANSWERS-HUMAN-REVIEW.md` — human review protocol and provenance requirements.
4. This file — current operational state and next task.

For conflicts:

- live Supabase state beats stale snapshot numbers;
- direct user-approved wording beats generic style rules;
- `ANSWERS-VOICE-TONE.md` governs editorial Thai/English decisions;
- `AGENTS.md` governs architecture unless this handoff records a newer verified state.

---

## 2. Current verified live state

Verified immediately before this handoff:

| path | version | MD5 | chars |
|---|---:|---|---:|
| `/answers.html` | 98 | `e97e821b71c02e9d4831dcba1087c2a9` | 30670 |
| `/fg-page-answers.js` | **119** | `6dc18662953f897a390eea0a038f0edf` | 270553 |
| `/answers-thai-review.html` | **2** | `4d01e1355f5bbe4a369723c752b677b1` | 8067 |
| `/fg-page-answers-thai-review.js` | **3** | `49455a79f6eff499f4f732f57d3f7e07` | 13053 |
| `/wip/answers-human-review-source-v119-948.js` | 1 | `6dc18662953f897a390eea0a038f0edf` | 270553 |

The frozen human-review source is therefore byte-identical to the current v119 live controller.

Current human-review rows for review round `thai-human-v1`:

**0 / 948**

Nothing has been pre-approved on the user's behalf.

---

## 3. Corpus state — finished before human review

The corpus-expansion phase is finished.

Current authored corpus:

- **948 normal authored answers**
- **3 CARE responses** handled separately before normal routing
- **75 Universal answers**
- **42 Support answers**
- **183 Focus concepts** after vocabulary consolidation

IDs **904–948** are the final new-answer expansion.

The last production copy pass was v118 → v119. It changed only **13 English sibling adaptations** in IDs 904–948 so they better reflected the final Thai wording. The validation proved that reversing those 13 English changes reconstructed v118 exactly.

Therefore in v119:

- all Thai strings were unchanged from v118;
- all Thai line breaks were unchanged;
- all semantic metadata was unchanged;
- Focus dictionary/index/runtime was unchanged;
- routing was unchanged;
- all 948 answer IDs were preserved.

Do not add more answers or casually rewrite the corpus during the upcoming Three.js mechanism experiment.

The next corpus operation is the user's own human Thai review, not more AI bulk writing.

---

## 4. What The Book of Answers is

It is deliberately **not a chatbot**.

The public ritual is:

```text
question
→ ถามดิ
→ question committed
→ user physically drags across the paper/book edge
→ release at a depth
→ book opens
→ bilingual answer appears
→ ถามอีกดิ resets
```

Important product invariant:

**Physical page depth is theatrical interaction, not answer ID.**

Semantic routing chooses the eligible answer. The physical book makes the answer feel discovered.

Do not collapse this into a simple “press button → answer appears” interaction.

---

## 5. Current visual/product character

The Answers page is intentionally standalone and headerless.

Visual language:

- dark restrained background;
- one dominant physical book;
- generous negative space;
- Noto Sans Thai for Thai;
- light typography;
- right page Thai / left page English when open;
- vertical/standing physical book presence;
- visible page thickness / paper-edge cues;
- tactile opening ritual;
- minimal controls;
- editorial and contemporary, not mystical/tarot;
- no chatbot bubbles;
- no unnecessary navigation chrome.

The book should feel like a small designed object that happens to know the answer.

The existing product is already stable. A Three.js experiment must improve the physical mechanism without losing the calm editorial design.

---

## 6. Routing architecture — preserve, do not reinvent during visual experiment

The active routing model is the inverted-index Focus system.

Mental model:

> **Focus thinks like a librarian.**

Core principle:

> **Precision chooses the pool. Chance chooses the answer.**

Normal order:

```text
CARE
→ semantic parsing
→ Focus subject owner
→ relevant Support joins
→ recent-answer handling
→ 2 distinct random Universal answers join matched non-generic pools
→ uniform random final choice
```

If nothing is understood, use the full 75-answer Universal pool.

Important distinctions:

- **Focus** = concrete subject owner.
- **Support** = secondary advice/action pattern.
- **Universal** = explicitly subject-neutral.

Do not reintroduce Router v4, score weighting, legacy parallel truth, or direct physical-page-depth→answer mapping.

For the Three.js lab, the safest approach is to **leave the routing engine completely alone**. The lab may use a fixed/dummy answer until the visual mechanism is approved.

---

## 7. Thai editorial authority

`ANSWERS-VOICE-TONE.md` is now the canonical editorial guide.

Most important rule:

> **Thai is the original. English is the adaptation.**

Do not think in polished English first and then translate into Thai.

Thai naturalness may depend on:

- omission;
- implication;
- fragments;
- social context;
- particles;
- timing;
- pause;
- code-switching;
- queer/camp energy;
- modern slang;
- typography and line breaks acting like breath/body language.

Examples of approved native-style thinking include constructions such as:

```text
chemistry
มี
แต่ consistency
ยัง
```

and

```text
ความเป๊ะ
มี limit
กดปุ่มหยุด
แล้ว move on
```

Natural Thai beats textbook completeness.

Line breaks are authored language data, not formatting noise.

Do not normalize them mechanically.

---

## 8. Human Thai review — frozen but not started

The user intends to review **every one of the 948 Thai answers personally** after the Three.js mechanism experiment.

Private reviewer:

`https://flipgazine.pages.dev/answers-thai-review.html`

Source:

- review round: `thai-human-v1`
- source path: `/wip/answers-human-review-source-v119-948.js`
- source version: `119`
- source MD5: `6dc18662953f897a390eea0a038f0edf`
- source answer count: `948`

Database table:

`public.answers_thai_reviews`

Review workflow:

- page shows Thai only;
- existing line breaks are visible from the start;
- Enter inserts a real authored line break;
- unchanged good answer → tick Approve;
- edited answer autosaves as `draft`;
- after editing, reviewer must tick approval to make it `edited`;
- editing a previously approved item invalidates that approval and returns it to `draft` until re-approved;
- only `approved` and `edited` count as completed human review.

Current review count is **0 / 948**.

Do not create fake review rows, bulk-approve, infer approval from inactivity, or pre-populate records.

The provenance claim is only valid when all 948 are individually reviewed by the human user.

---

## 9. NEXT CHAT MISSION — Three.js book mechanism experiment

The user is leaving the Thai-review phase temporarily and opening a new chat specifically to experiment with the **book mechanism in Three.js**.

This is a visual/interaction R&D task, not a corpus/routing task.

### First action in the new chat

Read this handoff, then inspect the current live owners:

- `/answers.html`
- `/fg-page-answers.js`

Do not design from memory alone. Understand the current DOM/CSS book mechanism, interaction states and mobile behavior first.

### Experiment boundary

Build the Three.js mechanism on a **separate experimental page/controller**.

Do **not** replace `/answers.html` or `/fg-page-answers.js` until the user explicitly approves the Three.js experiment for integration.

Do not touch:

- answer copy;
- Focus/Support/Universal semantics;
- CARE;
- dictionary/index;
- Answers Library;
- human-review table or frozen review source;
- Main Admin.

### Goal of the experiment

Test whether Three.js can make the book feel substantially more physical and beautiful while preserving the simple ritual.

The experiment should explore:

- a vertical standing closed book;
- believable cover/page-block thickness;
- visible paper edge depth;
- touch/pointer drag directly on the paper edge;
- page-stack response to drag depth;
- tactile resistance/easing rather than a generic UI slider;
- release-to-open behavior;
- convincing transition from closed/edge-drag state into an open bilingual spread;
- page curvature/deformation if it materially improves realism;
- subtle lighting/shadow that makes the object physical without becoming glossy game-render art;
- stable centering and scale on mobile;
- good performance on the user's Android phone;
- graceful resize/orientation behavior;
- no accidental scroll/selection during the book gesture;
- no visible debug UI in the final experiment view.

### Important design constraint

The Three.js book must still feel **editorial**, not like a 3D tech demo.

Avoid:

- excessive orbit-camera movement;
- shiny/plastic materials;
- overdramatic lighting;
- particle effects;
- mystical visual language;
- complex controls;
- physics that feel impressive but slow down the ritual.

The sophistication belongs backstage.

### Text strategy in the lab

Do not compromise Thai typography just to force everything into a WebGL texture.

A hybrid approach is acceptable if it produces better typography and accessibility:

- Three.js owns physical book geometry/mechanism;
- DOM may own final Thai/English text overlay if necessary;
- the visual result should still feel like text printed on/in the book.

If rendering Thai into texture/canvas, use Noto Sans Thai and preserve authored line breaks exactly.

### Interaction states that must remain understandable

At minimum the experiment should have clear equivalents of:

1. closed / awaiting question;
2. question committed / `ถามดิ` disabled or visually committed;
3. user invited to drag the page edge;
4. active drag with depth feedback through the book itself;
5. release/open transition;
6. answer spread;
7. reset / `ถามอีกดิ`.

For early R&D it is acceptable to hard-code a sample answer and focus only on states 3–6.

### Acceptance test before production integration

Do not integrate just because it renders.

The user should approve that it is:

- more physical than the current mechanism;
- at least as fast/responsive;
- correctly centered on mobile;
- visually consistent with Answers;
- easy to understand without instructions becoming UI clutter;
- stable across repeated open/reset cycles;
- compatible with Thai/English spread layout;
- worth the added Three.js complexity.

If Three.js does not clearly improve the experience, keep the current production mechanism.

---

## 10. Safe experiment naming / ownership

Most live Flipgazine pages/controllers are served from Supabase `public.site_files`, not static GitHub page files.

A new lab should therefore normally live as a separate `site_files` page/controller, with names clearly indicating that it is experimental.

Do not create a duplicate production source in the Cloudflare static shell.

Potential lab naming can be decided in the new chat, but it should be unmistakably separate from production, e.g. an Answers book lab/experiment route.

If a change is only in `site_files`, **do not redeploy Cloudflare Pages**.

Only shell-owned assets such as `_worker.js`, `_headers`, `_redirects`, `sw.js`, manifests, icons etc. require GitHub/Cloudflare shell deployment.

---

## 11. Connected tools / practical capabilities

Useful connected apps available in ChatGPT:

- **GitHub** — connected and usable for repo read/write.
- **Supabase** — connected and usable for live `site_files` and database work.
- **Figma** — connected if design transfer/prototyping becomes useful.

Cloudflare and Sentry should not be treated as active account connectors for this project. The user previously said to forget both.

For ordinary Answers work, GitHub + Supabase are sufficient.

---

## 12. Source-of-truth discipline

Repository:

`dechadae/flipgazine`

Cloudflare shell folder:

`flipgazine-root-3/`

Supabase project:

`sjpvhgxacsiorrtijqua`

Main live Answers owners:

- `/answers.html`
- `/fg-page-answers.js`
- `/answers-admin.html`
- `/fg-page-answers-admin.js`
- `/answers.webmanifest`

Human reviewer owners:

- `/answers-thai-review.html`
- `/fg-page-answers-thai-review.js`
- `public.answers_thai_reviews`

Frozen final source for human review:

- `/wip/answers-human-review-source-v119-948.js`

Before a risky live controller change:

1. re-query current version/hash;
2. make a `/wip/` backup;
3. stage exact preview;
4. validate independently;
5. promote exact preview;
6. verify live hash equals staged hash.

Do not blind-replace large portions of the 270k controller.

---

## 13. Important recent backups / previews

Useful continuity artifacts in Supabase include:

- `/wip/answers-pre-final-new-copy-v118-2026-08-16.js`
- `/wip/answers-final-new-copy-v119-preview.js`
- `/wip/answers-human-review-source-v119-948.js`
- `/wip/answers-pre-thai-first-948-v117-2026-08-16.js`
- `/wip/answers-thai-first-948-v118-preview.js`
- `/wip/answers-pre-vocab-consolidation-v116-2026-08-16.js`
- `/wip/answers-vocab-consolidation-v117-preview.js`
- `/wip/fg-page-answers-thai-review-v1-2026-08-16.js`
- `/wip/fg-page-answers-thai-review-pre-v119-source-v2-2026-08-16.js`

These are for comparison/recovery. They are not parallel live truth.

---

## 14. Do not accidentally resume the wrong phase

### In the Three.js chat

Focus only on the book mechanism experiment.

Do not start human Thai review or rewrite corpus content just because the reviewer exists.

### When the user returns to the Thai review

Resume from:

`https://flipgazine.pages.dev/answers-thai-review.html`

Expected starting state is currently:

**0 / 948 reviewed**

The user will personally read every Thai answer, edit where needed, and approve each one.

After 948/948:

1. verify all rows belong to the frozen v119 source/hash;
2. export/apply only the final reviewed Thai strings back to canonical answer rows;
3. preserve answer IDs and semantics;
4. re-adapt English only where a human Thai edit changes the meaning/tone enough to require it;
5. run duplicate, line-break, semantic-index and routing QA;
6. freeze the human-reviewed corpus;
7. reevaluate the dataset as a commercial Thai-language AI asset.

---

## 15. Commercial/provenance intent

The corpus may later be evaluated/licensed as a contemporary Thai language asset.

The value proposition is not token volume. It is curated Thai pragmatics and preference-quality editorial data:

- native conversational Thai;
- modern Thai/English code-switching;
- implication and omission;
- slang/register;
- queer/camp social voice without caricature;
- line-break/breath composition;
- English sibling adaptations;
- semantic annotation via Focus/Support/Topic/Helper;
- future rejected→preferred revision pairs;
- explicit per-answer human review provenance.

Do not make the claim “every Thai answer was human reviewed” until review is truly 948/948.

---

## 16. User/product working style

The user is highly sensitive to:

- mobile alignment drift;
- book centering;
- typography and Thai font correctness;
- line breaks;
- interaction-state changes after button press;
- duplicated systems;
- override/fix-the-fix spirals;
- speculative architecture changes;
- accidental exposure of unfinished work.

Preferred engineering behavior:

> **Find the real owner, preserve the invariant, and make the smallest coherent change.**

Always inspect the current live source before claiming how it works.

---

## 17. Short handoff for the next agent

If you are the new agent/chat, start here:

```text
Read BOOK-OF-ANSWERS-HANDOFF.md, AGENTS.md, ANSWERS-VOICE-TONE.md,
and ANSWERS-HUMAN-REVIEW.md.

Then re-query live Supabase for /answers.html and /fg-page-answers.js.

The corpus is finished at v119 / 948 answers and must not be changed.
The human Thai review is frozen at 0/948 and must not be started or simulated.

Your task is an isolated Three.js experiment for the physical book mechanism.
Inspect the current mechanism first, build a separate lab, use dummy/fixed answer data if useful,
and do not touch production until the user explicitly approves integration.
```

That is the current project boundary.
