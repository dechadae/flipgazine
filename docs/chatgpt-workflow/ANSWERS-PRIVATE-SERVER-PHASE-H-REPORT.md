# The Book of Answers — Private Server Migration Phase H Report

> **Archive note:** Historical Phase H evidence. Production cutover later completed in Phase J; preserve this only as DB-native Admin proof.

**Status:** PHASE H COMPLETE — DB-NATIVE ADMIN PASS  
**Date:** 17 August 2026  
**Supabase project:** `sjpvhgxacsiorrtijqua` (`ap-southeast-1`)  
**Frozen behavioral source:** `/fg-page-answers.js` v124  
**Source MD5:** `c8a382f0562737422e891e3300bb08f6`  
**Public Book cutover:** **NOT PERFORMED**

> Phase H makes the private database the operational source of truth for Answers administration. The public Book remains on the old v124 client controller until Phase J. Routing semantics remain frozen.

---

## H1. Closeout reconstruction

The implementation work for Phase H had completed, but the automated closeout did not.

The intended final parity-recording workflow run `32021623353` executed the full deterministic harness and printed PASS, but its final `git push` was rejected because `main` advanced concurrently. The following gated report workflow `32021885839` therefore never obtained the expected proof file and failed before a job was scheduled.

The exact successful parity result was recovered from the workflow log and is retained at:

`answers-private-server/phase-h-parity-proof.json`

During this closeout, live deployed state was re-queried rather than inferred from the intended report.

---

## H2. Deterministic v124 parity — final result

Authoritative successful post-revert workflow:

- workflow: `Answers v124 deterministic parity`
- run ID: **`32020882761`**
- job ID: **`95360120852`**
- tested commit: `07f013dc6e26c4b84827aa9eb60ba823a87c6495`
- conclusion: **PASS**

Exact result:

```json
{
  "status": "PASS",
  "storedSourceControllerMd5": "c8a382f0562737422e891e3300bb08f6",
  "transportControllerMd5": "c8a382f0562737422e891e3300bb08f6",
  "transportBytes": 342604,
  "frozenCriticalSlicesVerified": true,
  "dictionaryConcepts": 268,
  "focusIndexKeys": 220,
  "supportIndexKeys": 36,
  "universalIds": 75,
  "generatedQuestions": 5386,
  "deterministicSeeds": [1, 42, 12648430],
  "routeCases": 64626,
  "routeDifferences": 0,
  "careCases": 6,
  "normalChooseAnswerCases": 15,
  "finalFallbackCases": 4,
  "invariants": {
    "minPool": 2,
    "maxBroadWiden": 12,
    "recentLimit": 6,
    "exactlyTwoUniversalOnMatchedNonGeneric": true,
    "uniformProbabilityOneOverEligible": true
  }
}
```

The failed proof-recording run itself printed the same 64,626/64,626 zero-difference result before its unrelated non-fast-forward push failure.

---

## H3. Rejected fallback drift caught and corrected

Phase H briefly introduced an emergency-fallback compatibility change that filtered fallback IDs through `answerExists()`. The deterministic harness correctly rejected that semantic drift.

Repository `main` was restored to exact v124 final fallback semantics before the passing run above.

The live Supabase deployment was re-queried during closeout and revealed that `answers-service` v6 still packaged the rejected fallback variant even though `main` was correct. This was a real deployment mismatch.

The service was redeployed from the restored behavior as:

- function: `answers-service`
- function ID: `97eff1fe-ac32-42b9-a6dd-afa6ef7d0282`
- version: **7**
- status: **ACTIVE**
- deployment SHA-256: **`72fea6c9a8d6b6365a83e41f52c8435c58784905cd6e6cc16ec839742d2b4998`**
- `verify_jwt`: false, intentionally, because the function enforces the dedicated Cloudflare/internal credential itself.

The deployed router now preserves the v124 emergency fallback order without the rejected `answerExists()` filtering in the fallback population loops.

---

## H4. Current private corpus revision

Live database state at closeout:

```text
revision             124
parent_revision      null
source               frozen-v124
active answers       948
max answer ID        948
inactive answers     0
corpus MD5           46ef8b51cf90d847523b82d823c6e796
routing index MD5    b837414f2930498fba61022dde0263c8
```

Only revision 124 is persisted. No revision 125 test edit remains.

The private routing asset for revision 124 still records:

```text
source controller version  124
source controller bytes    342604
source controller MD5      c8a382f0562737422e891e3300bb08f6
answers literal MD5        c8e159c6f32ce9513056fbbe4585830d
CARE MD5                   406dd4fb9bd3278e5300a1b46d86fd8e
dictionary MD5             c488cef1270aed127cfd0e6d86452bfd
index MD5                  0fca819ceb7bc2832d052e2e56b801f9
INTENTS MD5                895bdcb00bfeddb1fe0f33be0fe83bcb
constants MD5              fdda764fa67985aa66bd396630ec3cd6
router core MD5            0136cd0b127f4c6c30c8ec098d7ac2e8
final fallback MD5         76abfbf89bb565575a48f2bead0c6981
```

---

## H5. DB-native Admin state

Current Admin artifacts were re-queried from live `public.site_files`:

| Path | Version | Bytes | MD5 |
|---|---:|---:|---|
| `/answers-admin.html` | 46 | 15,673 | `22f6083ec713bb9fda8a104c2f136a94` |
| `/fg-page-answers-admin.js` | 23 | 20,615 | `1934a265ab7d7b3212391db1df4a8790` |

The live Admin controller scan confirms:

```text
reference to /fg-page-answers.js  false
FOCUS_INDEX embedded/reference    false
new Function/eval parser          false
answers-admin-service             true
```

The Admin therefore no longer parses or regenerates the public corpus-bearing controller.

`answers-admin-service` live deployment:

- function ID: `e60677af-dab1-4412-8e18-87e7b0718d1f`
- version: **1**
- status: **ACTIVE**
- `verify_jwt`: **true**
- deployment SHA-256: **`b48fc7f702c78ab150d3df57c26dd0190827edb078d0dbe4cbc2b118ff90f4db`**

Its authenticated operations remain `load`, `save`, and `audit`, backed by the private revision/save helpers and shared v124 routing logic. Stable DB answer IDs and optimistic `expected_revision` concurrency remain the persistence model.

Earlier Phase H HTTP authorization evidence remains valid for the unchanged Admin deployment: non-admin 403, Admin load 948 rows, stale revision 409, invalid Universal floor 422, and shared-core audit behavior.

---

## H6. Private boundary remains sealed

Live privileges were rechecked:

```text
anon private schema USAGE          false
authenticated private schema USAGE false
service_role private schema USAGE  false

anon private.answers SELECT          false
authenticated private.answers SELECT false
service_role private.answers SELECT  false
```

The corpus and routing assets therefore remain unavailable through ordinary client roles.

---

## H7. Test-artifact cleanup

At closeout, runtime state was checked directly.

Before final cleanup:

```text
sessions  0
requests  0
usage     3
```

The three residual usage rows were the known final Phase H Cloudflare runtime smoke sequence at `2026-08-17 10:41:36–10:41:38 UTC`:

```text
prepare  answer 696
reveal   answer 696
reject   replay reveal_unavailable
```

Only those exact usage IDs (`1358`, `1359`, `1360`) were deleted. No corpus/config/advisor data was changed.

The temporary `answers-phase-h-admin-smoke` Edge Function is inert version 3 and returns HTTP 410 only. Historical Phase E/F/G smoke functions remain inert tombstones as previously documented.

The temporary Phase H GitHub workflows are removed as part of this closeout. The reusable `answers-v124-parity.yml` guard remains.

---

## H8. Production Book integrity

The production public Book remains intentionally uncut-over:

| Path | Version | Bytes | MD5 |
|---|---:|---:|---|
| `/answers.html` | 99 | 31,216 | `ec265ada07b882356699ef6b118b0167` |
| `/fg-page-answers.js` | 124 | 342,604 | `c8a382f0562737422e891e3300bb08f6` |

The secure lab also remains separate:

| Path | Version | Bytes | MD5 |
|---|---:|---:|---|
| `/answers-server-lab.html` | 1 | 31,258 | `35401fa37741fa7fdb707c9c3d851ec7` |
| `/fg-page-answers-server-lab.js` | 1 | 25,224 | `355cf2a1f7285d8598952096828ac878` |

No Phase H corpus edit, public Book cutover, or old-public-corpus removal was performed.

---

# Phase H exit decision

**PASS.**

The closeout found and fixed one real live deployment mismatch, restored the missing parity proof artifact, cleaned residual Phase H test usage, confirmed revision 124 / 948 active answers, confirmed DB-native authenticated Admin, and left production `/answers.html` on the frozen v124 client implementation as required.

**Next allowed phase: Phase I — pre-cutover full acceptance.**
