# The Book of Answers — Phase K Post-Cutover Migration Manifest

**Status:** PHASE K COMPLETE — MIGRATION COMPLETE  
**Generated:** 17 August 2026, 20:01:55 Bangkok time  
**Cutover:** 17 August 2026, 19:36:42 Bangkok time  
**Authoritative repo:** `dechadae/flipgazine` / `main`  
**Supabase project:** `sjpvhgxacsiorrtijqua` (`ap-southeast-1`)  
**Canonical corpus owner:** `private_db`  
**Public controller mode:** `private_server`

Phase K is the proof freeze required by `ANSWERS-PRIVATE-SERVER-MIGRATION-PLAN.md`. No production behavior was changed in this phase. The evidence below was re-queried from the live database/functions after Phase J and reconciled against the committed parity and cutover artifacts.

---

## 1. Frozen v124 provenance

The behavioral source remains:

```text
/fg-page-answers.js
version 124
342,604 bytes
MD5 c8a382f0562737422e891e3300bb08f6
```

The exact v124 controller is preserved privately at:

```text
/private/answers-phase-j-backup-20260817/fg-page-answers.js
version 124
342,604 bytes
MD5 c8a382f0562737422e891e3300bb08f6
```

A fresh `anon`-role visibility check returns **0 rows** for that private path. It is provenance/rollback evidence only, not a public rollback mechanism.

Rollback policy remains the migration-plan policy: revert the secure server/API implementation to a last-known-good version while keeping the corpus private. If secure service cannot be restored immediately, gate/disable public Answers rather than republishing v124 corpus-bearing JavaScript.

---

## 2. Private corpus and routing state

Final live corpus state:

```text
revision                 124
source                   frozen-v124
active answers           948
inactive answers         0
max answer ID            948
corpus MD5               46ef8b51cf90d847523b82d823c6e796
routing-index MD5        b837414f2930498fba61022dde0263c8
runtime sessions         0
runtime requests         0
runtime usage            0
```

The private routing asset record remains tied to corpus revision 124 and frozen v124 source provenance:

```text
router version           1.0.0-wip
source controller MD5    c8a382f0562737422e891e3300bb08f6
answers literal MD5      c8e159c6f32ce9513056fbbe4585830d
dictionary source MD5    c488cef1270aed127cfd0e6d86452bfd
index source MD5         0fca819ceb7bc2832d052e2e56b801f9
intents source MD5       895bdcb00bfeddb1fe0f33be0fe83bcb
CARE source MD5          406dd4fb9bd3278e5300a1b46d86fd8e
router constants MD5     fdda764fa67985aa66bd396630ec3cd6
router core MD5          0136cd0b127f4c6c30c8ec098d7ac2e8
final fallback MD5       76abfbf89bb565575a48f2bead0c6981
```

Frozen constants remain `MIN_POOL=2`, `MAX_BROAD_WIDEN=12`, `RECENT_LIMIT=6`.

---

## 3. Deterministic parity artifact

Authoritative parity artifact:

```text
answers-private-server/phase-h-parity-proof.json
bytes       1,422
MD5         6387c91b07a6014b367d55e61da1ac39
SHA-256     32c368d9f68c8d8c0409818c38f3f69f62216c6e06da33371cdbf159e156e2b0
Git blob    4c5d57c29ae106f370c44f2f24e683659519b56e
```

The hash was verified against the exact Git blob bytes.

Frozen parity result:

```text
workflow run             32020882761
job                      95360120852
tested commit            07f013dc6e26c4b84827aa9eb60ba823a87c6495
generated questions      5,386
seeds                    1, 42, 12648430
route cases              64,626
route differences        0
CARE cases               6
normal choose cases      15
final fallback cases     4
```

The permanent post-cutover guard also passed in run `32031693881`, including **11/11** canonical-router regression tests. The frozen exactly-two-Universal and uniform `1 / eligible.length` invariants remain part of the committed proof.

---

## 4. Production public controller

Live production page remained unchanged through the source-of-truth cutover:

```text
/answers.html
version 99
31,216 bytes
MD5 ec265ada07b882356699ef6b118b0167
```

Live public controller after cutover:

```text
/fg-page-answers.js
version 125
25,213 bytes
MD5 4693d0cdb12c395ec95a4d4112b0067d
```

It is the accepted secure-lab controller with only the self-registration path changed from the lab key to `/fg-page-answers.js`.

The controller contains no bulk corpus, Focus dictionary/index, local `chooseAnswer()`, eligible pool, or Universal diagnostic asset.

The former corpus-bearing longest-review surface is retired:

```text
/answers-longest-review.html
version 2
284 bytes
MD5 ce28521ba666f97cf587ddb94e3ce78b
```

`/fg-page-answers-three-lab.js` has no live public row.

---

## 5. API versions

Cloudflare same-origin boundary remains implemented in:

```text
flipgazine-root-3/_worker.js
Git blob bea294daf6362b7b5c15ea23a88c6152434ba573
```

It owns `/api/answers/prepare` and `/api/answers/reveal`, enforces same-origin request checks, constrains input size, sends the server-only upstream credential/IP HMAC to Supabase, and marks answer API responses `no-store`.

Deployed Supabase answer service:

```text
slug        answers-service
version     7
status      ACTIVE
SHA-256     72fea6c9a8d6b6365a83e41f52c8435c58784905cd6e6cc16ec839742d2b4998
```

`verify_jwt=false` is intentional for this service because direct access is rejected by its custom server-to-server credential boundary; Phase J re-proved direct unauthenticated and publishable-key calls return `401`.

---

## 6. Admin versions

DB-native Admin remains:

```text
/answers-admin.html
version 46
15,673 bytes
MD5 22f6083ec713bb9fda8a104c2f136a94

/fg-page-answers-admin.js
version 23
20,615 bytes
MD5 1934a265ab7d7b3212391db1df4a8790
```

The controller references the authenticated Admin service, does not reference the old production corpus controller as its data source, and does not embed the Focus index.

Deployed Admin service:

```text
slug        answers-admin-service
version     1
status      ACTIVE
verify JWT  true
SHA-256     b48fc7f702c78ab150d3df57c26dd0190827edb078d0dbe4cbc2b118ff90f4db
```

Fresh Phase J authorization probe run `32031376156` proved an authenticated non-admin receives `403` from Admin audit.

---

## 7. Final public-exposure proof

Fresh Phase K privilege checks:

```text
anon private-schema USAGE              false
authenticated private-schema USAGE     false
anon private.answers SELECT            false
authenticated private.answers SELECT   false
anon routing-assets SELECT             false
authenticated routing-assets SELECT    false
```

The public `site_files` policy explicitly excludes `/wip/%`, `/tmp/%`, and `/private/%`. A fresh `SET ROLE anon` check returned:

```text
production controller visible rows     1
private v124 backup visible rows       0
wip v119 review source visible rows    0
tmp visible rows                       0
```

A full answer-body signature scan across non-private/non-WIP/non-TMP public `site_files` found **no bulk corpus path**.

Two understood non-bulk findings remain:

1. `/voice.html` contains 16 Thai and 2 English answer examples used as small deliberate human-review/evidence samples. It contains no bulk answer array, Focus dictionary, or routing index.
2. `/fg-page-answers-thai-review.js` contains the literal parser marker `var answers=` and a legacy `new Function()` parser, but contains **zero answer bodies**. Its referenced source is `/wip/answers-human-review-source-v119-948.js`, which is invisible to `anon` by RLS. This legacy review parser is not the production router or DB-native Admin source of truth.

The Phase J hostile HTTP acceptance run `32031621194` remains green for direct endpoint denial, private REST denial, cross-origin denial, replay, wrong-session, expiry, CARE, invalid-token flooding, cache-busted production fetch, and latency.

**Exposure result: PASS — no public bulk corpus or routing asset path.**

---

## 8. Cutover and proof-chain references

Cutover timestamp:

```text
UTC       2026-08-17T12:36:42.515112Z
Bangkok   2026-08-17T19:36:42.515112+07:00
```

Phase J artifacts:

```text
ANSWERS-PRIVATE-SERVER-PHASE-J-CUTOVER-REPORT.md
Git blob 01cc91f5ca6794ae57ce37e47f29045374fdffdb

answers-private-server/phase-j-cutover-proof.json
Git blob ac3521ebb515b227f2081a913ec61c3c50a196dd
```

Machine-readable Phase K manifest:

```text
answers-private-server/phase-k-migration-manifest.json
```

---

# Phase K exit gate

**PASS.**

The migration definition of success is satisfied:

- **Behavior:** PASS — frozen v124 routing semantics remain proven by deterministic parity and the post-cutover guard.
- **Security:** PASS — the production browser no longer receives the bulk corpus/router; private corpus/routing tables and backup/WIP sources are inaccessible to public roles; prepare/reveal and Admin boundaries remain enforced.
- **Operations:** PASS — DB-native Admin is authoritative, corpus revision protection remains in place, proof artifacts are frozen, and rollback does not require re-exposing the dataset.

**The Answers private-server migration is complete through Phase K.**
