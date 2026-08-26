# TCJ Footing Blind Reconstruction v1 — Results and Architecture Refinement

**Date:** 26 August 2026  
**Status:** COMPLETED R&D CHECKPOINT  
**Project:** TCJ / Thai Conversation Judge  
**Production authority:** NONE — development only

## 1. What completed

The native-human footing gate completed before any model exposure.

Canonical private evidence:

```text
source set
TCJ-FOOTING-NATIVE-HUMAN-ANALYSIS-2026Q3-v1
cases                    8
tracks                   5 Answers BFF / 3 formal enterprise
source manifest          060fc4ffcf3b4c53034b40cba65bc1a63ce98627157fe0ba0095cc399047d75e
human manifest           cf3075977ed229adfeb4e640e7fe44b5fc9e747100fbd43c6172f989f1772095
human protocol status    frozen
human set status         frozen
```

Database-level immutability protects the frozen human reviews and frozen case content. Case exposure/provenance metadata remains separately mutable so later model-exposure records do not require rewriting linguistic evidence.

No protected Qualification 2.0 content was used or exposed.

## 2. Blind model reconstruction run

A separate model-facing ledger was created. The model received only:

```text
frozen reconstruction instruction
+
scenario
+
Thai utterance
```

The model did **not** receive native-human interpretations.

Run:

```text
run key
TCJ-FOOTING-BLIND-RECONSTRUCTION-2026Q3-v1

provider                 Google
model                    gemini-3.5-flash-lite
prompt SHA-256            ed86e32d826eddb9d0657fc57d3fa31bba9f1e895a0d8cd3a98529b1501a1902
gold_exposed_to_model    false
request manifest         baf1c091116271431909f068409170047ee2ba25cbfaa516db453b27e2527452
response manifest        c1a6464481c4afa6d6a456ffdabf72bed97ee44fb8fb26ff7b17de3d9ba0f2bb
```

Provider outcome:

```text
8 / 8 valid HTTP 200
0 rate limits
0 provider errors
0 transport errors
0 parse errors
0 source-case hash mismatches
1 resolved model id
```

Observed provider usage across the eight calls:

```text
prompt tokens    4,227
output tokens    2,981
total tokens     7,208
mean dispatch    ~30.14 s
max dispatch     ~114.53 s
```

This confirms Gemini 3.5 Flash-Lite is operationally useful as a low-cost development probe, but this run is not commercial qualification evidence.

## 3. Preserved worker evidence

Historical worker slot reused:

```text
slug
 tcj-gemini35-flashlite-stress-worker-v2
```

Provider-producing versions:

```text
FHA-001
worker v5
SHA-256 39ce0baafed7efc79e28630f44b220c8beca83fad8b8452bc291dad0a870d237

FHA-002 .. FHA-008
worker v6
SHA-256 78e3a4fee65092876c3860d4db98fc4056fe0e9114c6a85bc61475e8ef884cd6
```

A pre-provider v4 failure is preserved in the private incident ledger:

```text
worker v4
SHA-256 2a454e094a28bab85465c9fc22f76337e948041a0dc117ae5068375a07c4c5fb
failure: PostgreSQL bound-parameter type ambiguity inside jsonb_build_object
DB transaction committed: no
provider request sent: no
```

The first valid request also exposed a storage-representation issue: `request_payload` was initially stored as a JSONB string scalar even though the actual provider request and request hash were correct. The stored payload was normalized to a JSONB object without changing the request hash, and worker v6 switched to the database driver's native JSON serializer.

The provider `usage` subdocument in the completed v1 dispatch rows remains a JSONB scalar string. The raw provider response is fully preserved and hashed, so no evidence is lost. The completed run was not unlocked merely to normalize this cosmetic representation.

## 4. Why this should not be reduced to a pass rate

The comparison exposed both **model errors** and **test-contract ambiguity**.

A single numerical score would hide the more useful result: TCJ's footing representation itself needs one refinement pass before a fresh validation bank is justified.

### 4.1 Outer participation-frame anchoring is a real BFF failure mode

On some BFF responses without a strongly explicit outer `I → you` frame, the model reconstructed the response speaker as the scenario experiencer talking to a friend instead of reconstructing the scenario as the prior turn and the target utterance as the BFF response turn.

This is a substantive discourse failure even when the Thai sentence-level interpretation is otherwise plausible.

The correction is **not** to hard-code a `BFF` enum.

TCJ needs to reconstruct the conversation frame first:

```text
prior turn / scenario
→ response turn
→ response speaker + response addressee
→ locally voiced / quoted / reported segments inside the response
```

### 4.2 Surface pragmatics can be right while the participation frame is wrong

The model correctly recognized mock-formal sarcasm and playful politeness in a BFF case even while misidentifying the outer speaker/addressee frame.

This is important:

> lexical/register competence is not proof of correct conversational footing.

### 4.3 Explicit BFF framing and simple no-quote turns were substantially easier

Where the outer response frame was linguistically explicit, or where there was no embedded voice, model reconstruction aligned much more closely with frozen native-human interpretation.

This supports using BFF as a high-variance stress test rather than assuming every BFF case is equally difficult.

### 4.4 Formal enterprise outer roles were easier in this tiny set

Across the three formal-enterprise cases, the model identified the outer institutional participants correctly.

This is consistent with the existing hypothesis:

```text
formal enterprise Thai
= lower conversational entropy

Answers BFF
= higher conversational entropy
```

But `n=3` formal cases is far too small for a performance claim. Treat this only as a research pattern worth testing again.

### 4.5 Q8 currently conflates voice/footing with stance

The current question says:

```text
Where does my own stance resume after any shift?
```

This is linguistically underspecified.

A speaker can endorse proposed quoted wording continuously while still temporarily voicing another person's future words. In that situation:

```text
stance may remain continuous
while
voice / footing shifts locally
```

A model can therefore reasonably answer `no stance shift` while still missing the end of a locally voiced segment.

TCJ should separate these concepts.

Proposed refinement:

```text
Whose voice/footing is active in this segment?
Where does the outer speaker's own voice/footing resume?

separate from

What stance does the outer speaker take toward the voiced words?
```

### 4.6 Relationship distance and hierarchy also need cleaner separation

A service interaction can be socially distant and institutionally role-bound without necessarily implying interpersonal superiority.

The current open questions allow:

```text
closeness
institutional role
politeness obligation
hierarchical authority
```

to blur together.

Refinement:

```text
relationship / social distance
≠
institutional role
≠
local authority / power hierarchy
```

Do not infer hierarchy merely because one participant is serving a customer.

### 4.7 Human open text remains authoritative but is not mechanically perfect

One frozen formal-enterprise answer contains a likely role-label carryover from BFF terminology while the surrounding semantic interpretation is clear.

It remains frozen exactly as reviewed.

Do not silently clean native-human evidence after freeze. Comparison logic should tolerate clerical label noise and prioritize the recoverable social interpretation.

## 5. Refined footing order

The v1 result suggests this order:

```text
A. reconstruct the turn frame
   prior turn / response turn
   outer response speaker
   outer response addressee

B. reconstruct locally voiced segments
   whose words are active here?
   who would those words address?

C. reconstruct stance separately
   endorse / propose / report / mock / distance / reject / imagine

D. reconstruct relational context
   closeness / relationship license
   institutional role
   local authority or hierarchy

E. reconstruct implication
   what can remain unsaid?

F. reconstruct local language ownership
   pronoun / particle / politeness / register belongs to which voice-relation?

G. identify return to outer voice/footing
```

This remains an interpretive linguistic model, not a finite-state ontology.

> Do not let the state machine become the linguistic theory.

## 6. Next experiment: minimal discourse-anchor ablation

Before asking the native human for another bank, run one **non-independent mechanism ablation** on the same eight already-exposed cases with the same Gemini 3.5 Flash-Lite model.

Change only three parts of the reconstruction contract:

1. Explicitly state that `SCENARIO` is the prior interlocutor turn and `THAI UTTERANCE` is the response turn to analyze.
2. Replace `stance resume` with `outer voice/footing resume`; keep stance toward voiced words as a separate field.
3. Separate relationship/social distance from local authority/hierarchy, and prohibit inferring hierarchy from service role alone.

Everything else should remain as close as possible to v1.

This ablation is **not fresh evaluation evidence** because the same source cases have already been exposed to the same provider/model. Its purpose is only to test whether the observed disagreements are caused by the representation/prompt contract.

Decision rule:

```text
if the minimal ablation repairs the targeted failure patterns
→ keep the architecture refinement
→ create a fresh human-only footing v2 bank to validate it

if the same failures persist
→ the problem is deeper than prompt framing
→ investigate model capability / retrieval / discourse representation
```

## 7. Protected evidence and paid-resource status

Qualification 2.0 remains sealed and machine-unexposed.

No paid OpenAI/xAI development call was used or authorized for this experiment.

## 8. Current conclusion

The v1 experiment succeeded at its real purpose.

It did **not** establish that Gemini is or is not a qualified Thai judge.

It established that TCJ needs to distinguish:

```text
conversation turn frame
voice / footing
stance
relationship distance
institutional role
hierarchy
```

before returning to writer/judge/rewrite qualification.
