# TCJ Footing Ablations v2/v3 and Speech-Event/Omission Gate

**Date:** 26 August 2026  
**Status:** CURRENT EXECUTION CHECKPOINT  
**Project:** TCJ / Thai Conversation Judge  
**Production authority:** NONE — development only

## 1. Why this checkpoint exists

The first native-human footing bank was completed, frozen and then used for three controlled Gemini 3.5 Flash-Lite reconstruction runs.

The purpose was not to score Gemini as a commercial judge. The purpose was to discover whether TCJ's discourse representation is precise enough to support later judging and rewriting.

The result is now clear enough to stop same-case prompt tuning.

```text
outer turn anchoring improved
+ local hierarchy/closeness improved
but
reported content vs projected voice remains unstable
+ pragmatic omission remains weak
```

Therefore TCJ moves to a fresh native-human gate focused on **speech-event roles** and **omission license**.

## 2. Frozen human footing v1 authority

```text
set id                  1
set key                 TCJ-FOOTING-NATIVE-HUMAN-ANALYSIS-2026Q3-v1
status                  frozen
cases                   8
tracks                  5 Answers BFF / 3 formal enterprise
source manifest         060fc4ffcf3b4c53034b40cba65bc1a63ce98627157fe0ba0095cc399047d75e
human manifest          cf3075977ed229adfeb4e640e7fe44b5fc9e747100fbd43c6172f989f1772095
human protocol          frozen
```

Database-level triggers lock the human review text and frozen source content.

## 3. Completed reconstruction runs

### v1 — blind reconstruction

```text
run key                 TCJ-FOOTING-BLIND-RECONSTRUCTION-2026Q3-v1
model                   gemini-3.5-flash-lite
prompt SHA-256          ed86e32d826eddb9d0657fc57d3fa31bba9f1e895a0d8cd3a98529b1501a1902
request manifest        baf1c091116271431909f068409170047ee2ba25cbfaa516db453b27e2527452
response manifest       c1a6464481c4afa6d6a456ffdabf72bed97ee44fb8fb26ff7b17de3d9ba0f2bb
valid                   8 / 8
gold exposed            false
```

Primary discovery: surface Thai pragmatics can be plausible while the outer participation frame is wrong.

### v2 — discourse-anchor ablation

```text
run key                 TCJ-FOOTING-DISCOURSE-ANCHOR-ABLATION-2026Q3-v2
model                   gemini-3.5-flash-lite
prompt SHA-256          fc245535948ff6ea4610676ca44c1e657204fccd67d8d63f9ed1801b69d44863
request manifest        3693f70ac64d3c0e63be0126b56475403e39d88b4cd6d968d103e218a1f12724
response manifest       703d2e0e9d33d74a9328ebf3fbdbb83af73a9daca35da87ab742321a93f6fc8e
worker                  v7 / 3f671c50ec60a0203eeb2a58ff1ad8eb8a7d717a1fd64f9b622981adaed65326
valid                   8 / 8
gold exposed            false
```

The v2 contract explicitly anchored scenario → response turn structure, separated voice resumption from stance, and separated service role from hierarchy.

Observed lift:

- outer BFF speaker/addressee reconstruction improved materially;
- formal customer-service role no longer automatically implied interpersonal hierarchy;
- quoted/proposed segments were easier to locate;
- outer voice resumption became clearer on several BFF cases.

Residual problems:

- relationship distance still blurred across outer vs embedded relations;
- quoted/proposed authorship was still conflated with projected speaker identity;
- `implicitness` answers often merely listed scenario facts that were not repeated.

### v3 — local voice + omission ablation

```text
run key                 TCJ-FOOTING-LOCAL-VOICE-IMPLICITNESS-ABLATION-2026Q3-v3
model                   gemini-3.5-flash-lite
prompt SHA-256          e340dfe9b7ee471e6fe27f7c4809460172684a2925c70a72eb17fed22a0f139c
request manifest        acacfc5f24e6318a2fc2941cf0e859c60902a593cbe7de0c0ddec9c0abf93f77
response manifest       1c7ee41f6fcc27043c0a1f0593a1140bee60fa1c3840110080ad82077ccb5379
worker                  v8 / 26a1997e0cb0a95a8ec39611e066e1973665e198a53110362d7b94914ee4c44d
valid                   8 / 8
gold exposed            false
```

v3 explicitly distinguished:

- author vs projected local speaker;
- segment-local relationship distance;
- segment-local hierarchy;
- pragmatic omission vs simply omitted scenario background;
- continuous stance vs temporary projected voice.

Observed result:

- local hierarchy and relation differences improved on some cases;
- simple no-quote cases remained stable;
- the model still over-forced a local voice shift in a reported-speech case;
- the model still failed to treat a formal quoted replacement as the junior employee's projected customer-facing voice;
- omission answers still often described omitted background rather than what a Thai speaker can naturally leave unexplained.

## 4. Stop rule: no more same-case prompt tuning

The same eight cases have now been used for three mechanism runs on the same provider/model.

Continuing to tune against them would overfit the source bank and make the experiment less informative.

Decision:

> **Stop same-case prompt refinement after v3.**

The next evidence must be fresh native-human interpretation.

## 5. Speech-event frame — current linguistic refinement

The old question `Whose words am I voicing?` is too compressed.

A useful interpretation may need to distinguish:

```text
OUTER SPEAKER
who is producing the current response turn?

OUTER ADDRESSEE
who is that response addressed to?

EMBEDDED / SPEECH EVENT
source/origin       who previously said or owns the reported content?
current author      who is composing these words now?
projected speaker   who is being positioned to say/animate these words?
projected addressee who would those words address?
stance              endorse / propose / report / mock / imitate / reject / distance
```

These roles may collapse to the same person, or some may not apply.

This is an interpretive frame, not a mandatory finite-state ontology.

> Do not force a projected voice merely because another person's words are mentioned.

> Do not assume the current author is also the person projected to speak the quoted words.

## 6. Relationship and hierarchy remain segment-local

```text
relationship distance
≠
institutional role
≠
hierarchy / authority
```

A BFF may advise the user on wording to use with a merely friendly peer. Those two relations have different intimacy even if both are equal-status.

A customer-service agent may speak formally to a customer without being socially subordinate or superior.

A manager → junior relation may contain real institutional authority even when both use polite particles.

## 7. Omission license — separate representation

The old open question `How much can remain implicit?` was too easy to answer as:

> the scenario already told us X, so X is omitted.

That is not the capability TCJ needs.

The target concept is:

> **What can a natural Thai speaker leave unexplained or unstated because common sense, relationship knowledge, conversational context or social convention already carries it?**

This matters directly to assistantese and over-explanation.

Examples of the distinction:

```text
NOT ENOUGH
"the scenario already says the professor is strict, so that fact is omitted"

TARGET
"no need to explain why taking responsibility matters; the listener already understands that social norm"
```

Omission license must eventually constrain rewriting:

```text
understand what may stay implicit
→ avoid adding explanatory scaffolding
→ preserve natural Thai conversational economy
```

## 8. CURRENT fresh native-human gate

Private set:

```text
set id                  2
set key                 TCJ-FOOTING-SPEECH-EVENT-OMISSION-HUMAN-2026Q3-v2
status                  reviewing
cases                   6
tracks                  4 Answers BFF / 2 formal enterprise
exact footing overlap   0
exact qualification overlap 0
source manifest         ac6229a9d82abf696c2a602b5832a7375b17a8ddbc62e9b2c35faa77118d3c95
exposure state          6 human_only / 0 model_exposed
```

Target phenomena:

- reported content vs projected voice;
- proposed exact speech: current author vs projected speaker;
- mock imitation and stance;
- BFF outer relation vs embedded peer relation;
- supervisor-authored wording projected as junior → customer speech;
- service role without hierarchy;
- common-sense omission with no embedded speech.

Human review protocol:

```text
protocol id             2
protocol key            TCJ-FOOTING-SPEECH-EVENT-OMISSION-REVIEW-2026Q3-v2
status                  reviewing
target                  6
reviewed                0
```

Review URL:

`https://flipgazine.pages.dev/tcj-footing-speech-event-review-v2.html`

Live assets:

```text
/tcj-footing-speech-event-review-v2.html
version 1
SHA-256 3dfb1fea12b3da842fb71ab99d5437e3d16a29d839db3d61087863005fcdcfef

/fg-page-tcj-footing-speech-event-review-v2.js
version 1
SHA-256 52475e696662f056d1ac1ba1706bbe4dc8fa2083708da3f5394be816fe3b1d5a
```

Review API:

```text
slug                    tcj-rewrite-lift-hard-review-v2
version                 9
verify_jwt              true
SHA-256                 d205c13b9e53b64bc0af445cad764a26302c1184b2c0079f41ac29a27b2461e4
```

API v9 is protocol-aware:

- omitted protocol key defaults to frozen v1 so the old review page remains readable;
- v2 controller supplies the v2 protocol explicitly;
- frozen v1 cannot be edited;
- only `reviewing` + `human_only` cases can be saved.

The v2 UI deliberately removes Social Scene Summary. The database receives the neutral placeholder `[omitted_as_redundant]`; the reviewer is not asked to repeat the scenario.

## 9. Human task for v2

For each case, native human answers in natural Thai / Thai-English mix where useful:

1. outer speaker;
2. outer addressee;
3. speech-event roles: source, current author, projected speaker, projected addressee where applicable;
4. outer stance toward embedded words;
5. relationship distance per relevant segment;
6. hierarchy/authority per relevant segment;
7. omission license: what does not need explaining;
8. where outer voice resumes;
9. important pronoun/particle/politeness ownership;
10. free-form segment map;
11. optional ambiguity/discomfort.

Do not use academic terminology unless it is genuinely the easiest way to express the intuition.

## 10. Freeze rule

Before any reconstruction model sees these six cases as a test bank:

1. native human completes 6 / 6;
2. verify every stored review still references the original case manifest;
3. compute deterministic human manifest over ordered case + all stored interpretation fields;
4. freeze set and protocol;
5. enforce database immutability;
6. only then create a new model reconstruction run;
7. do not tune the reconstruction prompt after seeing the fresh-bank result and still call it independent evidence.

## 11. Protected Qualification 2.0

Reverified from the dedicated `tcj_q2_*` authority tables on 26 August 2026:

```text
protocol             TCJ-QUALIFICATION-2.0-2026Q3-v1
status               human_frozen
bank manifest        8e3d6c5fff4860f97bfbfcd8d69c46e5484da0d5c315ed6f4888d0061d09b7c8
human manifest       07a25c08b331c215bf6a7378665726c376045bcb9d547d3cd21eaca22b51428d
machine_exposed_at   null
machine run          stopped_incident / started_at null
```

Never expose Q2 to development models.

## 12. Current next action

```text
NATIVE HUMAN SPEECH-EVENT / OMISSION GATE ← CURRENT
review 6 fresh cases
→ say "done"
→ freeze/hash human manifest
→ run one fresh reconstruction test with the representation frozen in advance
→ analyze residual disagreement
→ only after footing/omission stabilizes return to judge + rewrite qualification
```

No paid OpenAI/xAI development call is authorized or required for this gate.
