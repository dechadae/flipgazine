# The Book of Answers — Thai Voice, Tone & Bilingual Adaptation Guide

**Canonical editorial authority · revised 17 August 2026**

This is the single canonical editorial guide for Thai and English copy in **The Book of Answers**.

It governs:

- Thai voice and naturalness;
- BFF / chat / DM register;
- implication, omission and particles;
- humor, queer/camp timing and social specificity;
- borrowed English and real code-switching;
- sound, rhyme and mouthfeel;
- **designer-authored line composition, typographic hierarchy and bold Focus treatment**;
- English sibling adaptation;
- editorial QA and interpretation of the human-review evidence;
- lessons from external-model transfer probes.

It does **not** replace root `AGENTS.md` for routing, CARE, private-server architecture, deployment or ownership.

Editorial precedence:

> **direct user-approved wording → this guide → established human-reviewed corpus voice → generic grammar/style convention**

The central rule is simple:

> **Do not imitate the surface features. Learn the decision behind them.**

---

## 1. Evidence checkpoint

The first formal Thai human-review round is complete.

```text
Frozen source             v119
Normal answer rows        948
Reviewed                  948 / 948
Accepted unchanged        564 = 59.5%
Human edited              384 = 40.5%
Drafts                    0
Line-count changes        107
Gained / lost lines       55 / 52
Composition-only edits    36
Strict newline-only edits 27
Net character change      +436
```

The important result is not simply the 40.5% intervention rate.

> **Large editorial impact. Almost no increase in information volume.**

The review changed **how Thai was expressed** far more than **how much information was present**.

The 36 composition-only edits are especially important: line composition can be an editorial decision even when the words themselves do not change.

Canonical provenance authority: `ANSWERS-HUMAN-REVIEW.md`.

---

## 2. Bilingual lineage and secure production distinction

```text
v119 — frozen pre-human-review source
v120 — reviewed Thai only
v121 — dedicated English adaptation
v122 — bilingual editorial QA / canonical copy freeze
v123 — same copy + ทะเล → beach routing alias
v124 — same copy + final semantic/reachability freeze
v125 — secure public client after private-server migration
```

**v122 remains the canonical bilingual copy freeze.** v123 and v124 changed routing/semantic state, not Thai or English answer strings.

After the 17 August private-server migration:

- canonical corpus owner = private DB;
- canonical corpus revision = 124;
- public `/fg-page-answers.js` = v125 corpus-free client;
- the public client no longer contains the complete corpus or routing assets.

See `ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md` for the final migration proof.

---

## 3. Core principle: Thai is the original

The Thai answer is **not a translation of an English thought**.

Wrong workflow:

```text
English proposition
→ translate into correct Thai
→ add slang / English words
→ break into lines
```

Correct workflow:

```text
Thai social intent
→ Thai spoken/social rhythm
→ implication / omission / particles
→ lexical choice natural to the situation
→ humor + mouthfeel
→ designer-authored page composition
→ English sibling adaptation
```

Write Thai as if no English sibling will ever exist.

Only when the Thai thought, stance, joke, hierarchy and page composition are settled should the English sibling be written.

---

## 4. Natural Thai is not grammatical maximalism

Thai frequently communicates through what is left unsaid.

Forms such as:

```text
ยัง
พอ
ก่อน
ได้อยู่
ไม่อะ
ไม่โอ
พอละ
```

may carry an entire proposition through context.

Do not expand them merely because English would require a complete subject, object or final verb.

Canonical example:

```text
chemistry
มี
แต่ consistency
ยัง
```

The final `ยัง` already carries hesitation, incomplete evidence and a warning not to overread the situation.

> **Implication is meaning.**

---

## 5. Context is part of the sentence

Thai conversational meaning can depend on:

- the relationship between speakers;
- the previous turn;
- confidence or hesitation;
- particles;
- what the speaker declines to explain;
- imagined facial/body performance;
- rhythm and timing;
- the way the words are composed on the page.

The Book can carry that performance through fragments, omission, particles, repetition, line breaks, short landings, borrowed words, sound echo and visual hierarchy.

Typography is therefore not merely a container for the sentence. It participates in meaning.

---

## 6. House voice

Default outside CARE:

> **BFF in the DMs. Casual, intimate, funny, queer-aware, quick and socially fluent.**

The Book should sound like a smart Thai friend who is contemporary, observant and recognizably Thai rather than translated global copy.

It should not sound like:

- a chatbot;
- a textbook;
- an advisor or therapist outside CARE;
- an ad agency trying to sound young;
- a literal localization;
- somebody sprinkling slang and English everywhere to simulate modernity.

Useful test:

> **Would your BFF actually send this in chat or DM in this exact situation?**

If not, rewrite the thought rather than merely swapping vocabulary.

House priorities:

- naturalness over grammatical completeness;
- humor before textbook neatness when meaning remains clear;
- intimacy over explanatory advisor prose;
- implication over spelling everything out;
- sound and mouthfeel as tie-breakers between equally natural versions;
- rhyme and echo when effortless, never when manufactured.

---

## 7. Queer-aware voice: timing, not costume

Queer/camp energy may appear through timing, affectionate shade, softness, drama, playful certainty, selective particles and tiny performance beats.

It must not become caricature, constant diva phrasing, identity jokes or a compulsory `ค่ะ` ending.

> **Queer energy is timing and taste, not costume.**

If the reader can see the writer trying to sound queer, pull it back.

---

## 8. Slang, particles and chat spelling

Slang is allowed, but contemporary Thai is not produced by maximizing slang density.

Do not mechanically normalize:

```text
เขา / เค้า
ไหม / มั้ย
ปะ / ป่ะ
แล้ว / ละ
```

These are contextual voice decisions.

Particles such as `ค่ะ`, `นะ`, `สิ`, `ดิ`, `อะ`, `มั้ง`, `ป่ะ`, `มั้ย`, `เถอะ` can change confidence, softness, intimacy, irony, challenge, annoyance, camp and social distance.

A particle must earn its place by changing the speaker's stance.

---

## 9. Borrowed English is not automatically code-switching

A Thai speaker can remain entirely in Thai discourse while using an English-origin lexical item because it is simply the natural word in that environment.

Examples include:

```text
meeting
deadline
brief
timeline
OT
mute
block
chemistry
consistency
jobsdb
```

Reserve **true code-switching** for a discourse-level language change driven by audience or context.

There is no “prefer Thai” rule and no “prefer English” rule.

> **Choose the lexical item the situation actually wants.**

Modernity is not measured by Latin characters.

---

## 10. Humor: recognition before cleverness

Good Answers humor usually comes from social recognition, practical absurdity, affectionate shade, understatement, escalation or a final-line reversal.

Avoid ornamental metaphors that mainly demonstrate writing skill. If the joke needs explanation, it is usually trying too hard.

The Book can be bitchy. It should not be mean.

Outside CARE, a natural funny spoken line may beat a technically tidier grammatical version when the meaning remains clear.

---

## 11. Social specificity beats abstract cleverness

The review repeatedly became stronger when generic abstractions were replaced by the actual social reality of the scene: a relationship, food, app, object, habit or workplace behavior.

Examples across the corpus include LINE, แม่, หมูกระทะ, GPS, OT, PowerPoint, TikTok, Grab, กะเพราไข่ดาว and jobsdb.

This is not a rule to insert brands mechanically.

> Prefer the **actual social reality** when abstraction feels generic.

---

## 12. Line composition is language **and** book design

This section contains **direct designer/editor authority**, not merely a statistical inference from the review corpus.

The line breaks in The Book of Answers are intentional graphic-design decisions. They are not post-processing, automatic wrapping, or simply a way to show pauses.

They operate on several levels at once:

1. **Speech and performance** — pausing, breathing, hesitation, emphasis, timing, punchline delivery and implied body language.
2. **Semantic grouping** — showing which words belong together and which thought should stand alone.
3. **Typographic hierarchy** — deciding what the eye meets first, second and last.
4. **Page shape** — controlling the silhouette, width and proportion of the text block.
5. **Negative space** — allowing the answer to breathe visually inside the spread.
6. **Balance and aesthetic finish** — making each answer feel intentionally composed as a tiny editorial page rather than dumped into a text box.

> **Compose, do not wrap.**

Grammar does not dictate where the line must break. Consider semantic grouping, visual hierarchy, width, negative space, spoken rhythm, pragmatic meaning and page balance together.

### Bold Focus words are part of the same system

The intentional bolding of Focus words in the Book is not decoration.

A bold Focus word acts as a **visual-semantic anchor**: it tells the eye where the subject or key idea sits, then the surrounding lines are composed around that anchor.

Line breaks and bold Focus treatment therefore work together:

```text
language meaning
      +
semantic Focus
      +
typographic hierarchy
      +
page composition
      =
the authored answer
```

A short word or phrase may receive its own line not because the speaker necessarily pauses there, but because isolating it creates hierarchy. It can become a headline-like beat, counterpoint, pivot or final landing.

Likewise, two versions containing exactly the same words can feel materially different when one has better proportion, hierarchy and negative space.

The first human-review round contains **36 composition-only edits** and **27 strict newline-only edits**. Those are evidence that composition mattered in practice. But the broader reason is simpler: the Book is designed, and the text is part of that design.

Latin text is visually wider and may need more room. Short final lines should be protected when they carry the punchline, the look **or simply the visual finish of the page**.

> **The line break is where language editing and book design meet.**

---

## 13. English sibling: adapt stance, not word order

English is written from the settled Thai, never used as the Thai source.

Preserve:

- recommendation direction;
- certainty;
- emotional temperature;
- social intent;
- practical meaning;
- joke/camp weight where possible.

Do not mechanically preserve Thai word order, every particle, every omission or every borrowed English token.

If the Thai review changes the joke or social frame, re-author the English from the Thai rather than patching the old translation.

---

## 14. CARE is a separate register

CARE overrides the playful house voice.

For self-harm/suicide, medical emergency, violence, abuse or immediate danger:

- safety first;
- clarity first;
- direct grounded language;
- no camp performance;
- no randomized funny answer;
- no joke that minimizes danger.

Do not use ordinary house-style evidence to weaken CARE.

---

## 15. Thai-first editing workflow

For every new or revised answer:

1. Identify the actual Thai social thought.
2. Enter BFF mode: what would a close friend naturally say here?
3. Remove unnecessary completeness.
4. Decide the performance: dry, warm, resigned, camp, practical, flirty, annoyed, absurd?
5. Choose vocabulary situationally: Thai, borrowed English, shorthand, brand, slang or plain word.
6. Find the joke before polishing grammar.
7. Listen for rhythm, mouthfeel, repetition or effortless sound echo.
8. **Compose the page**: decide semantic grouping, line hierarchy, visual shape, negative space and landing.
9. Check whether the Focus word deserves its bold visual anchor and whether the surrounding composition supports it.
10. Read the Thai mentally aloud and look at it as a designer would look at the spread.
11. Only then adapt English.
12. Confirm semantic ownership afterward.

Do not start from the English sibling when revising Thai.

---

## 16. Translation-smell detector

Thai may have been conceived in English when several of these appear:

- unusually complete subject–verb–object structure;
- too many causal connectors;
- unnecessary pronouns;
- explanatory final clause;
- globally generic translated metaphor;
- slang or English added after the sentence is already formed;
- every inference spelled out;
- back-translation produces one polished English proposition.

When this happens, do not merely swap words. Reconstruct the Thai social intent.

---

## 17. Do not fake the house voice

Common imitation failures:

- adding `ค่ะ` everywhere;
- random English because “Thai people code-switch”;
- changing every spelling to chat spelling;
- forcing every answer to three lines;
- shortening everything because the corpus often looks concise;
- using vertical line breaks merely because they look like the Book;
- bolding arbitrary words instead of genuine semantic anchors;
- adding brands to manufacture specificity;
- making every answer sarcastic or queer-coded;
- decorative ellipses;
- forced rhyme.

A model can copy the visible style faster than it learns the editorial judgement underneath it.

> **Do not imitate surface features. Learn the decision behind them.**

---

## 18. AI-transfer findings

The external-model rewrite probe showed useful transfer in pragmatic omission, shorter chat cadence, vertical composition and punchline protection.

It also showed the main failure mode: **style transfers faster than judgement**.

Observed problems included:

- over-compression that deleted culturally meaningful joke material;
- semantic drift despite better rhythm;
- over-omission;
- orphaned metaphors;
- weaker transfer of sound/rhyme and queer timing;
- weak semantic-preserving judgement.

The design rule above therefore must not be taught as “make more line breaks” or “bold more words.” The transferable skill is deciding **why** a particular phrase deserves that hierarchy on that particular page.

---

## 19. Hard rules vs observed tendencies

### Hard rules

- Thai thought first.
- BFF chat/DM is the default outside CARE.
- Naturalness beats grammatical completeness.
- Humor may outrank textbook grammar when meaning remains clear.
- Context and omission can carry meaning.
- Particles are stance/performance choices.
- Queer energy shapes timing and attitude, not caricature.
- Borrowed English is not automatically code-switching.
- Line breaks are authored language **and design**.
- Bold Focus words are intentional visual-semantic hierarchy, not decoration.
- Better mouthfeel wins between equally natural versions.
- Rhyme is preferred only when natural, never forced.
- CARE remains outside the playful register.
- Direct human-approved wording outranks generic convention.
- English is adapted from canonical Thai.

### Observed tendencies, not templates

The reviewed corpus often removes explanatory tails, leaves subjects implicit, chooses socially specific vocabulary, uses particles selectively, recomposes line breaks and replaces generic self-help cleverness with recognizable social behavior.

Do not convert those observations into mechanical generation recipes.

---

## 20. Editorial QA checklist

### Thai thought

- Does it feel conceived in Thai?
- Would a real Thai friend plausibly say it here?
- Is it more complete than necessary?
- Can context carry part of the meaning?
- Are particles doing real stance work?

### Humor / register

- Is the joke socially recognizable without explanation?
- Is slang natural rather than decorative?
- Is borrowed English genuinely the natural lexical item?
- Is the humor affectionate rather than cruel?

### Page composition

- Is this intentionally composed rather than automatically wrapped?
- Does each line have a clear role in the hierarchy?
- Is the visual width comfortable?
- Is there enough negative space?
- Does the shape of the text block feel balanced on the spread?
- Are short isolated lines meaningful as hierarchy, performance or visual structure?
- Is the last landing protected?
- Is the bold Focus treatment attached to a genuine semantic anchor?
- Do the line breaks and bold anchor work together rather than compete?

### English

- Is it an adaptation rather than a literal translation?
- Does it preserve stance and recommendation direction?
- Does it sound natural in English?

### Semantics

- Does the answer still plausibly belong to its Focus/Support context?
- Is a Universal genuinely universal?

---

## 21. Provenance and limitations

Preferred terminology:

> **pre-human-review source → human-reviewed final Thai**

Do not describe every v119 source line as pure untouched AI output. The frozen source already contained earlier human influence from development.

The first review preserves:

- 564 explicitly human-accepted examples;
- 384 human-edited correction pairs.

Limitations:

- one editor does not represent all Thai speakers;
- this is one deliberate house voice and one deliberate graphic-design system;
- slang/register preferences can age;
- BFF, queer-aware, humor-first and typographic preferences are house editorial choices, not universal claims about Thai;
- qualitative examples are not exhaustively coded category labels.

The evidence is strongest when studying **editorial decisions**, not claiming universal correctness.

---

## 22. Short mental model

```text
NOT:
English thought
→ Thai translation
→ slang decoration
→ automatic wrapping

BUT:
Thai social intent
→ BFF social decision
→ implication / omission / particles
→ natural lexical choice
→ humor + mouthfeel
→ semantic Focus
→ designer-authored hierarchy
→ line composition + negative space
→ bold visual anchor where appropriate
→ English sibling adaptation
```

And always:

> **Naturalness beats completeness.**

> **Implication is meaning.**

> **The line break is where language editing and book design meet.**

> **Bold Focus words are semantic anchors, not decoration.**

> **Do not imitate surface features. Learn the decision behind them.**
