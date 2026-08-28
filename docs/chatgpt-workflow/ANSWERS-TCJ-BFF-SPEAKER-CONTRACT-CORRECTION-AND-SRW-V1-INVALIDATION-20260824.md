# TCJ BFF Speaker-Contract Correction & Session-Replica Writer v1 Invalidation

**Date:** 24 August 2026  
**Status:** CURRENT DEVELOPMENT CHECKPOINT

## 1. Native-human clarification

The outer Answers voice is always **BFF speaking directly to the user**.

If the user asks for wording to communicate to another person, Answers BFF should remain visible outside the quote and place the proposed third-party wording inside quotation marks.

Example:

```text
ชั้นว่าแกไปบอกหัวหน้าว่า
"หนูขอโทษที่ส่งงานล่าช้านะคะ"
ดีกว่าป่ะ ทำผิดก็ควรขอโทษมั้ย
```

Outside quote = Answers BFF speaking to user.
Inside quote = user-to-third-party wording whose register follows the actual recipient/context.

Canonical authority: `ANSWERS-TCJ-BFF-SPEAKER-AND-QUOTED-SPEECH-CONTRACT-20260824.md`.

## 2. Why session-replica writer v1 is invalid

The six-case bank `TCJ-SESSION-REPLICA-WRITER-SOURCE-BANK-2026Q3-v1` was generated cleanly, but the scenario/task construction did not explicitly declare speaker/addressee roles.

At least two cases could reasonably be interpreted as:

1. Answers BFF speaks to the user about another person;
2. Answers speaks as if directly to that other person; or
3. Answers drafts wording for the user to send to the other person.

Those are different writing tasks.

Therefore the bank cannot validly answer the writer-quality question.

## 3. Live invalidation state

```text
source bank id          21
source bank key         TCJ-SESSION-REPLICA-WRITER-SOURCE-BANK-2026Q3-v1
source manifest         c2516eb9b1214fc5175ff95e36811a92fcdd97a870d959c3f13fbcb4db01d3f0
review protocol         TCJ-SESSION-REPLICA-WRITER-HUMAN-REVIEW-2026Q3-v1
review status           invalidated
evidence-set status     retired
saved human reviews     1
formal scoring allowed  false
TCJ exposed             false
```

The one saved human review remains immutable audit history. Do not delete it, interpret it as a writer score, or complete the remaining five reviews.

The generated six outputs also remain historical artifacts. Do not modify or rerun them.

## 4. Correct task contract for v2

Every fresh case must freeze a structured writer contract before generation.

### DIRECT_BFF_RESPONSE

```text
task_mode               DIRECT_BFF_RESPONSE
outer_speaker           ANSWERS_BFF
outer_addressee         USER
quote_required          false
quoted_speaker          null
quoted_addressee        null
quoted_register_target  null
```

### BFF_WITH_QUOTED_SCRIPT

```text
task_mode               BFF_WITH_QUOTED_SCRIPT
outer_speaker           ANSWERS_BFF
outer_addressee         USER
quote_required          true
quoted_speaker          USER
quoted_addressee        explicit third party
quoted_register_target  explicit/context-derived register
```

The writer must receive the structured contract separately from the scenario/source meaning.

## 5. Native-human review contract for v2

The review UI must show the task mode clearly.

For quoted-script cases it must state:

```text
Outside quotes: review as Answers BFF speaking to you.
Inside quotes: review as wording you would actually say/write to the named recipient.
```

`SHIP` still applies to the whole finished answer unchanged.

A formal/polite quote is not a BFF failure merely because it is formal. A bad outer BFF frame or a bad recipient-specific quote both require `REVISE`, but they are different failure layers.

## 6. Experimental rule

Do not repair v1 scenarios after seeing their outputs.

Create a fresh v2 bank with zero scenario/source hash overlap. Freeze:

1. speaker/addressee contract;
2. scenario;
3. source meaning;
4. safe Git memory snapshot;
5. bounded writer-context projection;
6. writer prompt;

before provider generation.

Session-replica v2 remains a writer-feasibility test only and must never score TCJ itself.

## 7. Next action

```text
promote speaker contract to current authority
→ build fresh six-case session-replica writer v2
→ include both DIRECT_BFF_RESPONSE and BFF_WITH_QUOTED_SCRIPT cases
→ freeze all role/task metadata before generation
→ generate sequentially
→ native-human whole-answer SHIP/REVISE review with quote-layer guidance
→ freeze manifest before interpreting writer viability
```
