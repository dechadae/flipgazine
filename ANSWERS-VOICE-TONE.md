# The Book of Answers — Thai Voice, Tone & Bilingual Adaptation Guide

**Editorial authority · full-corpus + bilingual production revision · 16 August 2026**

This is the canonical editorial guide for Thai and English copy in **The Book of Answers**.

It governs:

- Thai voice and naturalness;
- contemporary register;
- queer/camp energy;
- implication and omission;
- particles and conversational timing;
- borrowed/embedded English inside Thai;
- true code-switching when context genuinely changes the discourse language;
- humor and social specificity;
- Thai line composition;
- English sibling adaptation;
- editorial QA and evidence interpretation.

It does **not** replace `AGENTS.md` for routing, CARE, Focus/Support/Universal semantics, deployment or ownership.

Editorial precedence:

> **direct user-approved wording → this guide → established human-reviewed corpus voice → generic grammar/style convention**

If a technically less-complete Thai line is more natural in the social situation, natural Thai wins.

---

## 1. Final evidence checkpoint

The Thai human-review phase is complete.

Frozen review source:

- v119;
- MD5 `6dc18662953f897a390eea0a038f0edf`;
- 948 normal authored answers;
- review round `thai-human-v1`.

Final Thai outcomes:

- **948 / 948 individually reviewed**;
- **564 accepted unchanged = 59.5%**;
- **384 human edited = 40.5%**;
- **0 drafts**;
- **107 answers changed line count**;
- **55 answers gained lines / 52 answers lost lines**;
- **36 composition-only edits** when all whitespace is ignored;
- **27 strict newline-only edits** with otherwise byte-identical text;
- **+436 net characters** across the complete 948-answer review.

The central quantitative finding is not simply the 40.5% edit rate.

More than two in five answers needed intervention, yet the entire corpus gained only 436 net characters.

> **Large editorial impact. Almost no increase in information volume.**

The review changed **how Thai is expressed** far more than **how much information it contains**.

Do not invent category-level percentages from these edits unless a future project formally labels all 384 edits with an explicit taxonomy.

---

## 2. Completed bilingual lineage

Thai and English were deliberately separated so the editorial provenance remains readable.

### v119 — frozen pre-human-review source

`6dc18662953f897a390eea0a038f0edf`

### v120 — reviewed Thai only

`7773badc93f5d8887945729c2ea1703f`

Exactly the 384 human-edited Thai fields changed from v119. English and non-Thai structure remained unchanged.

### v121 — dedicated English adaptation

`235e80362da4bf4a3543692311140a0f`

The v121 pass changed **140 English siblings**.

### v122 — bilingual editorial QA / copy freeze

`d12ef72740edd955ddc11aedfe232c2c`

A separate QA pass inspected 11 problem rows:

- 2 refined IDs already changed in v121;
- 9 newly identified English mismatches.

Final unique English changes vs v120:

- **149 total**;
- **145** on human-edited Thai rows;
- **4** on Thai rows accepted unchanged.

v122 is the canonical **bilingual copy freeze**.

### v123 — current live runtime/controller

`4f4cebce4460cec5d826796cb119a5f3`

v123 changes no Thai or English answer copy from v122.

It adds exactly one routing dictionary alias:

```text
ทะเล → beach
```

Removing that alias reconstructs the v122 MD5 exactly.

Therefore:

> **v122 = final bilingual copy stage. v123 = current live controller with the same copy plus one routing alias.**

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
→ editorial line composition
→ English sibling adaptation
```

Write Thai as if no English version will ever exist.

Only when the Thai thought, stance, joke and line composition are settled should the English sibling be written.

---

## 4. Natural Thai is not grammatical maximalism

Thai frequently communicates through what is left unsaid.

A short form such as:

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

Do not expand these merely to satisfy English-style completeness.

Canonical example:

```text
chemistry
มี
แต่ consistency
ยัง
```

The final `ยัง` already means: evidence is incomplete, do not get carried away, this is not rejection but it is not approval yet.

A translated-feeling expansion would weaken it.

> **Implication is meaning.**

---

## 5. Context is part of the sentence

Thai conversational meaning can depend on:

- the relationship between speakers;
- the previous turn;
- confidence/hesitation;
- pause length;
- particles;
- what the speaker declines to explain;
- imagined facial/body performance.

A text-only book cannot literally raise an eyebrow or pause, so the page uses:

- fragments;
- omission;
- particles;
- ellipses when genuinely needed;
- repetition;
- line breaks;
- short final landings;
- naturally embedded borrowed words.

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
- someone collecting slang/English words and sprinkling them everywhere.

Useful test:

> **Would a funny Thai friend actually say or type this in this exact situation?**

If not, rewrite the thought, not just the vocabulary.

---

## 7. Queer-aware voice: timing, not costume

The house voice can carry lightly camp, queer-aware Thai social energy through:

- timing;
- dramatic understatement;
- playful certainty;
- affectionate shade;
- selective feminine/camp particles;
- fashion/social vocabulary;
- self-aware exaggeration;
- making a mundane situation into a tiny performance.

It must not become:

- caricature;
- constant diva phrasing;
- slurs or identity jokes;
- assumptions about the reader's gender or sexuality;
- every answer ending in `ค่ะ`;
- camp inserted simply because the project has a queer-aware voice.

> **Queer energy is timing and taste, not costume.**

If the reader notices that the writer is trying to sound queer, pull it back.

---

## 8. Slang: use it because it is the word

Slang is allowed, but contemporary voice is not produced by maximizing slang density.

Natural examples may include:

```text
ไม่โอ
พอละ
มีซีน
ทำถึง
จึ้ง
บ้ง
```

But plain Thai can be more contemporary than five trend words in one answer.

Do not mechanically convert spelling to chat spelling. `เขา / เค้า`, `ไหม / มั้ย`, `ปะ / ป่ะ`, `แล้ว / ละ` are contextual voice decisions.

Trend-sensitive language should be used more cautiously than durable conversational forms.

---

## 9. Borrowed English is not automatically code-switching

This distinction is a project rule.

### Borrowed / embedded English

A Thai speaker can remain entirely in Thai discourse while using an English-origin lexical item because it is the natural word in that environment.

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

Thai grammar, social framing and rhythm remain Thai.

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

Do not label these “code-switching errors” merely because Latin script appears.

### True code-switching

Reserve this term for a genuine discourse-level language change, such as:

- switching language to address a foreign participant;
- changing audience mid-turn;
- deliberately moving a full clause/turn into another language because context requires it.

True code-switching is contextual, not a house-style trick.

---

## 10. No “prefer English” or “prefer Thai” rule

The review gives direct evidence in both directions.

### English removed because Thai fits better

#778:

```text
client บอก
...
```

became:

```text
ลูกค้าบอก
แก้นิดเดียว
แปลว่า...
แก้ทั้งหมด
```

#794:

```text
resignation draft
```

became:

```text
ใบลาออก
```

### English retained or normalized because it is the natural Thai lexical choice

#783:

```text
overtime
```

became:

```text
OT
```

Elsewhere `brief`, `timeline`, `deadline`, `jobsdb`, `mute`, etc. remain or appear because the register wants them.

Modernity is not measured by Latin characters.

> **Choose the lexical item the situation actually wants.**

---

## 11. Pronouns and subjects are optional

Do not add `คุณ`, `เรา`, `เขา` or repeated nouns merely because English requires explicit subjects.

Compare:

```text
ของเดิมยังใช้ได้
แต่หงุดหงิด
ทุกวัน
ก็ไม่โอ
```

with an over-complete version that restates the owner, cause and recommendation.

The shorter version is not “missing grammar.” Context already carries it.

---

## 12. Particles are performance

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

Do not normalize them globally.

A particle must earn its place by changing the speaker's stance.

---

## 13. Humor: recognition before cleverness

Good Answers humor usually comes from:

- social recognition;
- practical absurdity;
- affectionate shade;
- escalation;
- understatement;
- final-line reversal;
- treating a small problem with ceremonial seriousness;
- treating a dramatic problem with calm practicality.

Avoid:

- explaining the joke;
- ornamental metaphors that exist to show writing skill;
- generic motivational language;
- cruelty disguised as sass;
- humiliation, body shaming or punching down;
- forced comedy in serious safety situations.

The book can be bitchy. It should not be mean.

### Human-review evidence

#517:

```text
Pre-review:
เล่นบอร์ดเกม
กับที่บ้าน
แพ้ได้
อย่าตัดญาติ

Human-reviewed:
เล่นบอร์ดเกม
กับที่บ้าน
แพ้ไม่ได้
ตัดญาติได้
```

The reviewed proposition is literally worse advice and better humor because the reversal is socially legible.

---

## 14. Social specificity beats abstract cleverness

The review repeatedly replaced generic abstractions with socially recognizable objects, relationships or behaviors.

#774:

```text
เปิด tab แล้ว
กดจริงด้วย
```

became:

```text
เปิด jobsdb
แล้วกดสมัครด้วย
```

Other reviewed answers naturally invoke things such as:

- LINE;
- แม่;
- หมูกระทะ;
- GPS;
- OT;
- PowerPoint;
- TikTok;
- Grab;
- กะเพราไข่ดาว.

This is not a rule to insert brand names. The rule is to prefer the **actual social reality** when abstraction feels generic.

---

## 15. Line breaks are authored language

Thai line breaks are semantic/editorial data.

Never globally normalize them.

Priority:

> **visual width → spoken rhythm → pragmatic meaning → grammar**

Most medium answers often land naturally in 3–4 short lines, but there is no required count.

A fragment may stand alone when the pause is the point:

```text
ยัง
พอ
ก่อน
จบ
```

Latin text is visually wider and may need more room.

Protect the final landing when a short last line carries the look/punchline.

### Direct evidence

#405:

```text
Pre-review:
วาดต่อ
เส้นเบี้ยวคือสไตล์

Human-reviewed:
วาดต่อ
เส้นเบี้ยว
คือสไตล์
```

No lexical content changed. Delivery changed.

The complete review contains **36 composition-only edits** under a non-whitespace comparison.

> **The line break is part of the voice.**

---

## 16. CARE is a separate register

CARE overrides house comedy.

For self-harm/suicide, medical emergency, violence, abuse or immediate danger:

- safety first;
- clarity first;
- direct grounded language;
- no camp performance;
- no random funny answer;
- no joke that could minimize danger.

Do not use ordinary house-style evidence to weaken CARE.

---

## 17. Thai-first editing workflow

For every new/revised answer:

1. **Identify the actual Thai social thought.** What would a Thai person naturally say here?
2. **Remove unnecessary completeness.** What can context carry?
3. **Choose the performance.** Dry, warm, resigned, camp, practical, flirty, annoyed, absurd?
4. **Choose vocabulary situationally.** Thai, borrowed English, shorthand, brand, slang or plain word?
5. **Compose the Thai page.** Width, breath, timing and landing.
6. **Read it mentally aloud.** Does it sound spoken/social or written/localized?
7. **Only then adapt English.** Preserve the decision, not the syntax.
8. **Confirm semantics afterward.** Focus/Support/Topic/Helper ownership must still fit.

Do not start from the English sibling when revising Thai.

---

## 18. English adaptation: preserve stance, not word order

The completed v121/v122 passes validate this rule operationally.

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

If the reviewed Thai changes the joke or social frame, re-author the English from the Thai rather than patching the old translation.

### #552

Reviewed Thai:

```text
เงินเดือนเพิ่งออก
แล้วมันหาย
ไปไหนวะ
```

Old English:

`Salary just arrived. Do not let every dream invoice you at once.`

Final v122 English:

`Payday just happened. Where did the money go?`

The English follows the new social reaction, not the old metaphor.

### #794

Reviewed Thai:

```text
ถ้าเริ่มเขียน
ใบลาออก
นอนสักคืน
แล้วคิดดูอีกที
```

Old:

`Draft the resignation. Sleep once. Read it again.`

Final:

`Start the resignation letter. Sleep on it. Then think again.`

The final English is idiomatic rather than translation-shaped.

### #863

Reviewed Thai:

```text
ถ้าฝนมา
พี่ grab จ๋า
นู๋ลาก่อน
```

Old:

`When the rain arrives, loyalty to public transport may take the night off.`

Final:

`If it rains: Grab, come get me. I'm out.`

The adaptation preserves the direct comic performance.

---

## 19. Translation-smell detector

A Thai answer may have been conceived in English if several of these appear:

- unusually complete subject–verb–object structure;
- too many causal connectors;
- unnecessary pronouns;
- explanatory final clause;
- translated metaphor that feels globally generic;
- slang/English inserted after the sentence is already formed;
- every inference spelled out;
- back-translation produces one clean polished English proposition.

When this happens, do not merely swap words. Throw away the English logic and reconstruct the Thai social intent.

An English sibling may smell translated if it:

- preserves Thai syntax rather than natural English rhythm;
- explains a particle rather than reproducing its stance;
- keeps an obsolete metaphor after Thai review changed the joke;
- sounds like a bilingual glossary instead of an answer.

---

## 20. Do not fake the house voice

Common imitation failures:

- adding `ค่ะ` everywhere;
- random English because “Thai people code-switch”;
- changing every spelling to chat spelling;
- forcing every answer to three lines;
- using multiple trend terms per sentence;
- adding brand names to manufacture specificity;
- making every answer sarcastic or queer-coded;
- shortening every answer regardless of natural rhythm;
- using ellipses decoratively;
- copying corporate-life jokes because some corpus examples contain them.

> **Do not imitate surface features. Learn the decision behind them.**

---

## 21. Hard rules vs observed tendencies

### Hard rules

- Thai thought first.
- Naturalness beats grammatical completeness.
- Context/omission can carry meaning.
- Particles are semantic/performance choices.
- Borrowed English is not automatically code-switching.
- Do not insert English only to look modern.
- Do not translate natural borrowed vocabulary into stiff Thai merely for purity.
- Line breaks are authored language.
- Humor should arise from recognizable social logic.
- CARE remains outside the playful register.
- Direct human-approved wording outranks generic style convention.
- English is adapted from canonical Thai, not used as the Thai source.

### Observed tendencies, not templates

The reviewed corpus often:

- removes explanatory tails;
- lets subjects/pronouns remain implicit;
- chooses specific social apps/foods/relationships/behaviors;
- replaces abstract metaphors with recognizable Thai situations;
- uses particles selectively;
- uses ellipses as actual timing;
- preserves English-origin words when natural;
- removes English when Thai fits better;
- recomposes line breaks without changing wording;
- replaces generic self-help cleverness with cultural/social recognition.

Do not turn these observations into mechanical generation rules.

---

## 22. Full-corpus case study

### Method

One frozen source of 948 authored Thai answers was reviewed item-by-item by one human reviewer.

Each answer became:

- accepted unchanged; or
- explicitly edited and re-approved.

Original and reviewed Thai were retained as paired evidence. IDs and source provenance remained fixed.

This is an editorial corpus study, not a claim that every Thai speaker would make the same choices.

### Case A — pragmatic omission

#386:

```text
Pre-review:
โต๊ะริมหน้าต่าง
เหมาะกับคิดเรื่อง
ที่ไม่ควรคิด

Human-reviewed:
โต๊ะริมหน้าต่าง
เหมาะกับคิดเรื่อง
ที่ไม่ควร
```

The listener already completes the missing verb.

### Case B — polished but socially wrong

#552:

```text
Pre-review:
เงินเดือนเพิ่งเข้า
อย่าเพิ่งให้
ความฝัน
เข้าพร้อมกัน

Human-reviewed:
เงินเดือนเพิ่งออก
แล้วมันหาย
ไปไหนวะ
```

The source is grammatical. The reviewed form is stronger because it behaves like a familiar reaction.

### Case C — language choice is situational

#778 chooses `ลูกค้า` over `client`.

#783 chooses `OT` over `overtime`.

#794 chooses `ใบลาออก` over `resignation draft`.

No language-purity or English-maximization rule explains all three. Register does.

### Case D — social specificity

#774:

```text
เปิด tab
```

becomes:

```text
เปิด jobsdb
```

The actual action is more natural than the abstract interface metaphor.

### Case E — humor as performance

#517 reverses sensible board-game advice into socially legible family absurdity.

### Case F — line composition

#405 changes only the break around `เส้นเบี้ยว / คือสไตล์`.

This is direct evidence that layout can be linguistic delivery.

### Case G — contemporary Thai shorthand

#868:

```text
ส่ง pin ค่ะ
```

becomes:

```text
ส่งโลค่ะ
```

Modernity is not Latin-script preservation.

### Case H — cultural framing

#935:

```text
default
ที่ไม่เคย betray
```

becomes:

```text
เมนูสิ้นคิด
ที่ไม่เคยทรยศ
```

The same idea lands through a culturally recognizable Thai frame.

### Case-study conclusion

> **The hardest gap is often not Thai grammar or missing information. It is pragmatic alignment — knowing what this speaker would naturally say here, what they would leave unsaid, which lexical item belongs to the register, and how the line should land.**

---

## 23. Editorial QA checklist

### Thai

- Does it feel conceived in Thai?
- Would someone plausibly say/type it in this situation?
- Is it more complete than necessary?
- Can context carry part of the meaning?
- Are subjects/pronouns necessary?
- Are particles doing real stance work?

### Vocabulary/register

- Is slang natural rather than decorative?
- Is borrowed English genuinely the natural lexical item?
- Is Thai better here?
- Is a brand/object named because it is socially specific, not because specificity is fashionable?
- Is true code-switching actually contextually justified?

### Humor

- Is it recognizable without explanation?
- Does the punchline land?
- Is it affectionate rather than cruel?

### Line composition

- Is each line visually comfortable?
- Does the break follow breath/timing?
- Is the opening overloaded?
- Is the final landing protected?
- Is a Latin token visually too wide?

### English

- Is this an adaptation, not a literal translation?
- Does it preserve stance/recommendation?
- Does it sound like natural English?
- Is it still carrying an old joke that Thai review removed?

### Semantics

- Does it still plausibly answer its Focus?
- Is Support appropriate?
- Are Topic/Helper tags still accurate?
- Is a Universal genuinely universal?

---

## 24. Evidence/provenance discipline

Preferred terminology:

> **pre-human-review source → human-reviewed final Thai**

Do not describe every v119 source line as pure AI output. The frozen source already included earlier human influence.

The review table preserves both:

- **564 human-accepted examples**;
- **384 human-edited correction pairs**.

The English layer is a later editorial adaptation from the reviewed Thai.

Appropriate research uses may include:

- Thai naturalness evaluation;
- pragmatic-alignment evaluation;
- supervised correction;
- preference-pair construction;
- editorial benchmarking;
- bilingual adaptation analysis.

Do not automatically call it “RLHF data.” The raw asset is more accurately a human-reviewed acceptance/correction/evaluation corpus.

---

## 25. Limitations

- One reviewer does not represent all Thai speakers.
- This is one deliberate house voice/product context.
- Slang/register preferences can age.
- Case-study categories are qualitative examples, not exhaustively coded labels.
- The English corpus was editorially adapted and QA'd, but it did not undergo the same 948-item independent human approval protocol as Thai.

The evidence is strongest when studying **decisions**, not claiming universal correctness.

---

## 26. Current production checkpoint

Current live controller:

`/fg-page-answers.js`

Verified state:

- **v123**;
- MD5 `4f4cebce4460cec5d826796cb119a5f3`;
- 948 normal answers;
- 3 CARE responses;
- Thai/English copy identical to v122;
- one post-freeze routing alias: `ทะเล` → `beach`.

Canonical snapshots:

- v119 review source: `/wip/answers-human-review-source-v119-948.js`
- v120 reviewed Thai: `/wip/fg-page-answers-v120-thai-human-v1-preview.js`
- v121 English adaptation: `/wip/answers-human-thai-english-v121-preview.js`
- v122 bilingual copy freeze: `/wip/answers-bilingual-canonical-v122-948.js`
- v123 current live snapshot: `/wip/answers-bilingual-canonical-v123-948.js`

Live visual reference:

`/voice.html` v11 — MD5 `88d8f317d90dbe609c6697010dd456ca`

Always re-query Supabase before a future production write.

---

## 27. Short mental model

```text
NOT:
English thought
→ Thai translation
→ slang / English decoration

BUT:
Thai social intent
→ Thai voice
→ implication / omission / particles
→ natural lexical choice for this register
→ breath + body-language line composition
→ English sibling adaptation
```

And always:

> **Naturalness beats completeness.**

> **Implication is meaning.**

> **Borrowed English can remain Thai discourse without being code-switching.**

> **Queer energy is timing and taste, not costume.**

> **The line break is part of the voice.**

> **Do not imitate surface features. Learn the decision behind them.**
