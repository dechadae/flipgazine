# The Book of Answers — Thai Voice, Tone & Bilingual Adaptation Guide

**Canonical editorial authority · consolidated 17 August 2026**

This is the single canonical editorial guide for Thai and English copy in **The Book of Answers**.

It governs:

- Thai voice and naturalness;
- contemporary register;
- BFF / chat / DM register;
- queer/camp energy;
- humor-first editorial judgement;
- implication and omission;
- particles and conversational timing;
- sound, internal rhyme and end/external rhyme;
- borrowed/embedded English inside Thai;
- true code-switching;
- social specificity;
- Thai line composition;
- English sibling adaptation;
- editorial QA;
- interpretation of the human-review evidence;
- lessons from external-model transfer probes.

It does **not** replace `AGENTS.md` for routing, CARE, private-server architecture, deployment or ownership.

Editorial precedence:

> **direct user-approved wording → this guide → established human-reviewed corpus voice → generic grammar/style convention**

If a technically less-complete Thai line is more natural, funnier and more socially alive in the situation, that version wins as long as the intended meaning remains clear.

---

## 1. Evidence checkpoint

The first Thai human-review round is complete.

Frozen review source:

- v119;
- MD5 `6dc18662953f897a390eea0a038f0edf`;
- 948 normal authored answers;
- review round `thai-human-v1`.

Final Thai outcomes:

```text
948 / 948 individually reviewed
564 accepted unchanged = 59.5%
384 human edited = 40.5%
0 drafts
107 answers changed line count
55 gained lines / 52 lost lines
36 composition-only edits when whitespace is ignored
27 strict newline-only edits
+436 net characters across all 948 rows
```

The important finding is not simply the 40.5% intervention rate.

> **Large editorial impact. Almost no increase in information volume.**

The review changed **how Thai was expressed** much more than **how much information was present**.

Do not invent category-level percentages unless the edits are formally exhaustively coded.

Canonical provenance authority: `ANSWERS-HUMAN-REVIEW.md`.

---

## 2. Bilingual lineage and current production distinction

```text
v119 — frozen pre-human-review source
v120 — reviewed Thai only
v121 — dedicated English adaptation
v122 — bilingual editorial QA / canonical copy freeze
v123 — same copy + ทะเล → beach routing alias
v124 — same copy + final semantic/reachability freeze
v125 — secure public client after private-server migration
```

Key rule:

> **v122 is the canonical bilingual copy freeze.**

v123 and v124 changed routing/semantic state, not Thai or English answer strings.

After the 17 August private-server migration:

- canonical corpus owner = private DB;
- corpus revision = 124;
- public `/fg-page-answers.js` = v125, corpus-free client;
- the public controller no longer contains the 948-row corpus or routing assets.

See `ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md` for the authoritative secure-production proof.

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
→ Thai spoken rhythm
→ implication / omission / particles
→ lexical choice natural to this register
→ humor + mouthfeel
→ editorial line composition
→ English sibling adaptation
```

Write Thai as if no English version will ever exist.

Only when the Thai thought, stance, joke and line composition are settled should the English sibling be written.

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

Do not expand them merely to satisfy English-style completeness.

Canonical example:

```text
chemistry
มี
แต่ consistency
ยัง
```

The final `ยัง` already communicates hesitation, incomplete evidence and a warning not to overread the situation.

> **Implication is meaning.**

---

## 5. Context is part of the sentence

Thai conversational meaning can depend on:

- relationship between speakers;
- previous turn;
- confidence/hesitation;
- pause length;
- particles;
- what the speaker declines to explain;
- imagined facial/body performance.

The page uses language and typography to carry that performance:

- fragments;
- omission;
- particles;
- ellipses only when genuinely useful;
- repetition;
- line breaks;
- short final landings;
- naturally embedded borrowed words;
- sound echo/rhyme when natural.

Think of typography as partly **breath** and partly **body language**.

---

## 6. House voice

The book should sound like a smart Thai friend who is:

- contemporary;
- socially fluent;
- warm without becoming sentimental;
- observant;
- lightly chaotic;
- funny without showing off;
- concise when the moment wants concision;
- capable of affectionate shade;
- internet-literate;
- recognizably Thai rather than translated global copy.

It should not sound like:

- a chatbot;
- a textbook;
- an ad agency trying to sound young;
- a therapist unless CARE requires seriousness;
- a literal localization;
- someone sprinkling slang/English everywhere to simulate modernity.

Useful test:

> **Would your BFF actually send this in chat or DM in this exact situation?**

If not, rewrite the thought, not merely the vocabulary.

### BFF mode

Default outside CARE:

> **BFF in the DMs. Casual, intimate, funny, queer-aware, quick, socially fluent.**

Priorities:

- humor before textbook grammar when meaning remains clear;
- casual spoken/chat Thai over polished written Thai;
- BFF intimacy rather than advisor/brand/narrator voice;
- fragments, omission, reaction phrasing and abrupt endings when natural;
- queer/camp energy through timing and attitude, not caricature;
- better mouthfeel when two versions are equally natural;
- rhyme/sound echo preferred when effortless, never compulsory.

Tie-breaker:

> **If both versions mean the same thing and both sound natural, choose the one that is funnier to say and better to hear.**

---

## 7. Queer-aware voice: timing, not costume

The house voice can carry lightly camp, queer-aware Thai energy through:

- timing;
- dramatic understatement;
- playful certainty;
- affectionate shade;
- selective feminine/camp particles;
- fashion/social vocabulary;
- self-aware exaggeration;
- turning a mundane situation into a tiny performance.

Do not turn this into:

- caricature;
- constant diva phrasing;
- slurs/identity jokes;
- assumptions about the reader's identity;
- every answer ending in `ค่ะ`;
- camp inserted merely because the project is queer-aware.

> **Queer energy is timing and taste, not costume.**

If the reader notices the writer trying to sound queer, pull it back.

---

## 8. Slang and chat spelling

Slang is allowed, but contemporary voice is not produced by maximizing slang density.

Natural forms may include:

```text
ไม่โอ
พอละ
มีซีน
ทำถึง
จึ้ง
บ้ง
```

Plain Thai can be more contemporary than five trend words in one answer.

Do not mechanically normalize `เขา / เค้า`, `ไหม / มั้ย`, `ปะ / ป่ะ`, `แล้ว / ละ`. These are contextual voice decisions.

Trend-sensitive language should be used more cautiously than durable conversational forms.

---

## 9. Borrowed English is not automatically code-switching

A Thai speaker can remain fully in Thai discourse while using an English-origin lexical item because it is simply the natural word in that environment.

Examples:

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

Thai grammar, social framing and rhythm can remain Thai.

Examples:

```text
chemistry
มี
แต่ consistency
ยัง
```

```text
ความเป๊ะ
มี limit
กดปุ่มหยุด
แล้ว move on
```

Reserve **true code-switching** for a discourse-level language change driven by audience/context.

Do not use “more English” or “more Thai” as a quality rule.

> **Choose the lexical item the situation actually wants.**

---

## 10. Pronouns, subjects and particles

Do not add `คุณ`, `เรา`, `เขา` or repeated nouns merely because English requires explicit subjects.

Context can carry ownership and reference.

Particles such as:

`ค่ะ`, `นะ`, `สิ`, `ดิ`, `อะ`, `มั้ง`, `ปะ`, `ป่ะ`, `เหรอ`, `มั้ย`, `เถอะ`

can change:

- confidence;
- softness;
- intimacy;
- irony;
- challenge;
- annoyance;
- camp;
- affection;
- social distance.

Do not normalize particles globally.

A particle must earn its place by changing stance/performance.

---

## 11. Humor: recognition before cleverness

Good Answers humor usually comes from:

- social recognition;
- practical absurdity;
- affectionate shade;
- escalation;
- understatement;
- final-line reversal;
- treating a small problem with ceremonial seriousness;
- treating a dramatic problem with calm practicality;
- sound play that improves delivery without advertising the writing.

Avoid:

- explaining the joke;
- ornamental metaphors written to show skill;
- generic motivation;
- cruelty disguised as sass;
- humiliation/body shaming/punching down;
- comedy in serious CARE situations;
- engineered rhyme.

The book can be bitchy. It should not be mean.

Human-review example #517 deliberately turns sensible board-game advice into socially legible family absurdity. The proposition becomes worse advice and better humor because the performance is obvious.

---

## 12. Social specificity beats abstract cleverness

The review repeatedly improved generic abstractions by replacing them with recognizable social objects, relationships or actions.

Examples across the corpus include:

- LINE;
- แม่;
- หมูกระทะ;
- GPS;
- OT;
- PowerPoint;
- TikTok;
- Grab;
- กะเพราไข่ดาว;
- jobsdb.

This is not permission to insert brand names mechanically.

> Prefer the **actual social reality** when abstraction feels generic.

---

## 13. Line breaks are authored language

Thai line breaks are semantic/editorial data.

Never globally normalize them.

Priority:

> **visual width → spoken rhythm → pragmatic meaning → grammar**

A fragment may stand alone when the pause is the point:

```text
ยัง
พอ
ก่อน
จบ
```

Latin text is visually wider and may need more room.

Protect short final landings when they carry the look/punchline.

Sound can inform composition if a break exposes a natural echo or call-and-response rhythm.

The first review contained **36 composition-only edits** under a non-whitespace comparison.

> **The line break is part of the voice.**

---

## 14. CARE is a separate register

CARE overrides house comedy.

For self-harm/suicide, medical emergency, violence, abuse or immediate danger:

- safety first;
- clarity first;
- direct grounded language;
- no camp performance;
- no random funny answer;
- no joke that minimizes danger.

Do not use ordinary house-style evidence to weaken CARE.

---

## 15. Thai-first editing workflow

For every new/revised answer:

1. Identify the actual Thai social thought.
2. Enter BFF mode: how would a close friend actually send this?
3. Remove unnecessary completeness.
4. Decide the performance: dry, warm, resigned, camp, practical, flirty, annoyed, absurd?
5. Choose vocabulary situationally: Thai, borrowed English, shorthand, brand, slang or plain word.
6. Find the joke before polishing grammar.
7. Listen for mouthfeel, rhythm, repetition or effortless rhyme.
8. Compose the Thai page by width, breath, timing and landing.
9. Read it mentally aloud.
10. Only then adapt English.
11. Confirm semantic ownership afterward.

Do not start from the English sibling when revising Thai.

---

## 16. English adaptation: preserve stance, not word order

English does not need to reproduce:

- Thai word order;
- every particle;
- every omission;
- every borrowed English item visible in Thai;
- identical joke mechanics.

It **does** need to preserve:

- recommendation direction;
- certainty;
- emotional temperature;
- social intent;
- joke/camp weight where possible;
- practical meaning.

If reviewed Thai changes the joke or social frame, re-author English from the Thai rather than patching an obsolete translation.

Example #552:

```text
เงินเดือนเพิ่งออก
แล้วมันหาย
ไปไหนวะ
```

Final English:

`Payday just happened. Where did the money go?`

The English follows the social reaction, not the old metaphor.

---

## 17. Translation-smell detector

Thai may have been conceived in English if several of these appear:

- unusually complete SVO structure;
- too many causal connectors;
- unnecessary pronouns;
- explanatory final clause;
- globally generic translated metaphor;
- slang/English inserted after the sentence was already formed;
- every inference spelled out;
- back-translation produces one clean polished English proposition.

When this happens, do not merely swap words. Reconstruct the Thai social intent.

English may smell translated if it:

- preserves Thai syntax over natural English rhythm;
- explains a particle rather than reproducing stance;
- keeps an old metaphor after Thai review changed the joke;
- sounds like a bilingual glossary rather than an answer.

---

## 18. Do not fake the house voice

Common imitation failures:

- adding `ค่ะ` everywhere;
- random English because “Thai people code-switch”;
- changing every spelling to chat spelling;
- forcing every answer to three lines;
- multiple trend terms per sentence;
- adding brands to manufacture specificity;
- making every answer sarcastic/queer-coded;
- shortening everything regardless of natural rhythm;
- decorative ellipses;
- forced rhyme;
- copying surface corporate-life jokes.

> **Do not imitate surface features. Learn the decision behind them.**

---

## 19. Hard rules vs observed tendencies

### Hard rules

- Thai thought first.
- BFF chat/DM is the default outside CARE.
- Naturalness beats grammatical completeness.
- Humor may outrank textbook grammar when meaning remains clear.
- Context/omission can carry meaning.
- Particles are semantic/performance choices.
- Queer energy shapes timing and attitude, not caricature.
- Borrowed English is not automatically code-switching.
- Do not insert English merely to look modern.
- Do not translate natural borrowed vocabulary into stiff Thai merely for purity.
- Line breaks are authored language.
- Humor should arise from recognizable social logic.
- Better mouthfeel wins between equally natural options.
- Rhyme is preferred only when natural, never forced.
- CARE remains outside the playful register.
- Direct human-approved wording outranks generic convention.
- English is adapted from canonical Thai.

### Observed tendencies, not templates

The reviewed corpus often:

- removes explanatory tails;
- leaves subjects/pronouns implicit;
- chooses specific social apps/foods/relationships/behaviors;
- replaces abstract metaphors with recognizable Thai situations;
- uses particles selectively;
- uses ellipses as actual timing;
- preserves English-origin words when natural;
- removes English when Thai fits better;
- recomposes line breaks without changing wording;
- replaces generic self-help cleverness with social recognition.

Do not turn these observations into mechanical generation rules.

---

## 20. External-model transfer findings

These findings were originally recorded separately in `ANSWERS-VOICE-AI-PROBE-ADDENDUM.md` and are now consolidated here.

### 20.1 Rewrite-transfer probe

A 25-answer Kimi experiment tested whether an external model could use the 948-answer review package to rewrite its own previously generated Thai answers.

Observed transfer was strongest in:

- pragmatic compression/omission;
- shorter chat/DM cadence;
- vertical line composition;
- punchline/finality protection;
- moving away from explanatory advisor prose toward direct social performance.

Because the guided condition saw and rewrote the baseline answers, this is evidence of **external-model rewrite transfer**, not independent generation improvement, fine-tuning or a change in model weights.

### 20.2 Style transfers faster than judgement

The same rewrites exposed a critical failure mode: visible style signals can transfer before the editorial reasoning that justified them.

Observed errors included:

- **over-compression** — deleting socially meaningful material because shorter looked more on-style;
- **semantic drift** — improving rhythm while changing the answer's meaning;
- **over-omission** — removing connective language until Thai became less natural;
- **orphaned metaphor logic** — retaining an image after deleting the language that made it intelligible;
- **weak sound transfer** — rhyme/echo transferred less reliably than shortening and line breaks;
- **weak queer-timing transfer** — camp/queer social timing was less consistent than surface cadence;
- **weak semantic-preserving judgement** — the hardest skill was knowing what must survive an edit.

Editorial rule:

> **Do not imitate surface features. Learn the decision behind them.**

Compression is not the goal. Line breaks are not the goal. Slang is not the goal. The goal is the natural social decision that makes those devices appropriate here.

### 20.3 Optional stronger research protocol

If a future research project wants to make stronger claims about independent model generation, use fresh unseen prompts, matched model/settings, separate contexts, no preferred answer shown to the guided condition and blind native-Thai judging.

Useful judging dimensions include:

- naturalness;
- semantic fidelity;
- BFF authenticity;
- humor;
- cultural fit;
- sound/mouthfeel;
- line composition;
- translation smell.

This is an **optional research enhancement**, not a requirement for the current Batch-2 commercial workflow. The active commercial plan intentionally uses the simpler ChatGPT draft → single-native-editor ACCEPT/EDIT/REWRITE process.

---

## 21. Full-corpus case-study interpretation

The 948-row first review is an editorial corpus study, not a claim that every Thai speaker would make the same choices.

Its strongest recurring lesson is:

> **The hardest gap is often not Thai grammar or missing information. It is pragmatic alignment — knowing what this speaker would naturally say here, what they would leave unsaid, which lexical item belongs to the register, and how the line should land.**

Use examples as illustrations of decisions, not as rigid templates.

---

## 22. Editorial QA checklist

### Thai / BFF mode

- Does it feel conceived in Thai?
- Would a BFF plausibly send it in this situation?
- Is it casual enough outside CARE?
- Is it more complete than necessary?
- Can context carry part of the meaning?
- Are subjects/pronouns necessary?
- Are particles doing real stance work?

### Vocabulary/register

- Is slang natural rather than decorative?
- Is borrowed English genuinely the natural lexical item?
- Is Thai better here?
- Is a brand/object named because it is socially specific rather than fashionable?
- Is true code-switching contextually justified?

### Humor / sound

- Is it recognizable without explanation?
- Does the punchline land?
- If grammar and comic timing compete, is the chosen line still clear and more alive?
- Is natural echo/repetition/rhyme improving mouthfeel?
- Is humor affectionate rather than cruel?

### Line composition

- Is each line visually comfortable?
- Does the break follow breath/timing?
- Is the opening overloaded?
- Is the final landing protected?
- Is Latin text visually too wide?

### English

- Is this an adaptation rather than literal translation?
- Does it preserve stance/recommendation?
- Does it sound like natural English?
- Is it carrying an old joke Thai review removed?

### Semantics

- Does it still plausibly answer its Focus?
- Is Support appropriate?
- Are Topic/Helper tags accurate?
- Is a Universal genuinely universal?

---

## 23. Evidence/provenance discipline

Preferred terminology:

> **pre-human-review source → human-reviewed final Thai**

Do not describe every v119 source line as pure untouched AI output. The frozen source already contained earlier human influence.

The first review preserves:

- **564 human-accepted examples**;
- **384 human-edited correction pairs**.

The English layer is a later editorial adaptation from reviewed Thai.

Appropriate descriptions include:

- human-reviewed correction corpus;
- acceptance/correction dataset;
- preference/evaluation corpus;
- production-derived Thai pragmatics dataset.

Do not automatically call it “RLHF data.”

---

## 24. Limitations

- One reviewer does not represent all Thai speakers.
- This is one deliberate house voice/product context.
- Slang/register preferences can age.
- BFF, queer-aware, humor-first and rhyme preferences are house editorial choices, not universal Thai claims.
- Case-study categories are qualitative unless formally coded.
- English was editorially adapted/QA'd but did not undergo the same 948-item independent approval protocol as Thai.
- External-model rewrite transfer is not proof of independent-generation improvement or weight-level learning.

The evidence is strongest when studying **decisions**, not claiming universal correctness.

---

## 25. Short mental model

```text
NOT:
English thought
→ Thai translation
→ slang / English decoration

BUT:
Thai social intent
→ BFF chat/DM mode
→ Thai voice
→ humor + implication / omission / particles
→ natural lexical choice
→ sound / rhyme / mouthfeel when natural
→ breath + body-language line composition
→ English sibling adaptation
```

And always:

> **Humor before textbook grammar — when meaning remains clear.**

> **BFF in the DMs. Casual by default outside CARE.**

> **Naturalness beats completeness.**

> **Implication is meaning.**

> **Borrowed English can remain Thai discourse without being code-switching.**

> **Queer energy is timing and taste, not costume.**

> **If two versions are equally natural, better mouthfeel wins.**

> **Rhyme is preferred, never forced.**

> **The line break is part of the voice.**

> **Do not imitate surface features. Learn the decision behind them.**