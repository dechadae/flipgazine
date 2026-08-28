# AGENTS.md — Flipgazine / The Book of Answers

> **Read this file before changing Flipgazine.**

This is the short operational entry point for coding agents. Detailed Answers documentation lives in `docs/chatgpt-workflow/`.

Core rule:

> **Find the real owner, preserve the product invariant, and change the smallest correct layer.**

Do not stack special-case fixes, duplicate routing logic, invent a second source of truth, or modify several systems at once without necessity.

---

## 1. Repository and platform

Repository:

`dechadae/flipgazine`

Cloudflare Pages shell:

`flipgazine-root-3/`

Supabase project:

`sjpvhgxacsiorrtijqua`

Most Flipgazine page/controller content is served from Supabase `public.site_files`. Shell infrastructure such as `_worker.js`, headers, redirects, service-worker behavior and static shell assets lives in GitHub/Cloudflare.

Always query current live state before a production write. Documentation hashes and versions are checkpoints, not permission to overwrite a newer row.

---

## 2. Answers current checkpoint

The Answers private-server security migration is **COMPLETE — 17 August 2026**.

Current frozen proof is documented in:

- `docs/chatgpt-workflow/ANSWERS-PRIVATE-SERVER-PHASE-J-CUTOVER-REPORT.md`
- `docs/chatgpt-workflow/ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md`

Post-cutover baseline:

```text
/answers.html
  version 99
  MD5 ec265ada07b882356699ef6b118b0167

/fg-page-answers.js
  version 125
  25,213 bytes
  MD5 4693d0cdb12c395ec95a4d4112b0067d

canonical corpus owner
  private_db

canonical corpus revision
  124

active normal answers
  948
```

The old corpus-bearing v124 controller is private provenance/rollback evidence only. Never republish it as a public rollback.

---

## 3. Documentation authority

Detailed Answers documentation is indexed at:

`docs/chatgpt-workflow/README.md`

Use these ownership boundaries:

1. `docs/chatgpt-workflow/ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-FREEZE-20260822.md` — frozen final commercial TCJ topology/trust-boundary authority. Architecture is frozen; production authority is not.
2. `docs/chatgpt-workflow/ANSWERS-TCJ-SOL-PRIVATE-EVIDENCE-TOOL-AND-COMMERCIAL-LICENSING-CLARIFICATION-20260822.md` — governing clarification for judge-initiated private evidence analysis, Sol/BYOK runtime and commercial licensing. A judge may call a narrow TCJ tool but never receives direct/raw vault access.
3. `docs/chatgpt-workflow/ANSWERS-TCJ-V3-ABLATION-COMPLETION-AND-PRIVATE-EVIDENCE-V4-DIRECTION-20260822.md` — current TCJ execution authority inside the frozen architecture.
4. `docs/chatgpt-workflow/ANSWERS-TCJ-PRIVATE-EVIDENCE-ENGINE-AND-BUYER-ISOLATION-POLICY-20260822.md` — proprietary evidence boundary.
5. `docs/chatgpt-workflow/ANSWERS-TCJ-BYOJ-JUDGE-RUNTIME-AND-API-KEY-POLICY-20260822.md` — BYOJ / Local Judge / BYOK Judge runtime authority.
6. `docs/chatgpt-workflow/ANSWERS-COMMERCIAL-EXECUTION-TIMELINE.md` — current dated work and milestones.
7. `docs/chatgpt-workflow/ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md` — commercial methodology, positioning, licensing and claim limits.
8. `docs/chatgpt-workflow/ANSWERS-VOICE-TONE.md` — canonical Thai/English editorial authority.
9. `docs/chatgpt-workflow/ANSWERS-HUMAN-REVIEW.md` — immutable Batch 1 review/provenance record.
10. `docs/chatgpt-workflow/ANSWERS-PRIVATE-SERVER-PHASE-K-MIGRATION-MANIFEST.md` — final migration proof/current security checkpoint.
11. `docs/chatgpt-workflow/ANSWERS-PRIVATE-SERVER-MIGRATION-PLAN.md` plus Phase A–K reports — historical implementation/audit trail.

Editorial precedence:

> **direct user-approved wording → Voice/Tone guide → established human-reviewed corpus voice → generic convention**

Architecture precedence:

> **current live state → frozen final commercial TCJ architecture + governing clarification → current operational authority → frozen historical evidence**

The frozen commercial architecture may be reopened only by an explicit superseding architecture decision. Do not redesign its trust boundaries merely because one model/provider cannot satisfy them.

---

## 4. Product invariants

The Book of Answers is deliberately not a chatbot.

Public ritual:

```text
question
→ ถามดิ
→ question commits
→ drag through physical paper
→ release
→ book opens
→ bilingual answer
→ ถามอีกดิ
```

The physical drag/opening is theatrical. Page depth must not affect semantic routing or answer probability.

Preserve the headerless, minimal, editorial public experience unless the user explicitly changes direction.

---

## 5. Canonical routing invariants

The server router must preserve the frozen v124 behavior proven by the migration parity suite:

```text
MIN_POOL = 2
MAX_BROAD_WIDEN = 12
RECENT_LIMIT = 6
```

Preserve:

- CARE first;
- current normalization and alias/collision behavior;
- Focus / Slang / Bridge / Support / Topic / Helper semantics;
- tier order and widening behavior;
- Focus as concrete subject owner;
- Support as supplemental advice/action semantics;
- explicit Universal semantics;
- exactly **2 distinct Universal answers** added to every matched non-generic route;
- uniform final probability across the complete eligible pool;
- generic routes using the Universal pool itself;
- recent-six exclusion/restore behavior;
- final defensive fallback order;
- stable normal answer IDs 1–948.

Core principle:

> **Precision chooses the pool. Chance chooses the answer.**

Do not add score weighting to a correctly selected pool unless product direction explicitly changes.

---

## 6. Private-server boundary

Public browser flow is now:

```text
browser
→ Cloudflare same-origin boundary
→ server-authenticated Answers service
→ canonical router + private corpus
→ short-lived opaque request token
→ reveal after physical release
→ one Thai/English answer
```

The browser must not receive bulk:

- answer corpus;
- CARE corpus;
- Focus dictionary/index;
- Support pools;
- Universal membership;
- eligible pool;
- routing diagnostics.

Server owns recent-answer state. Do not accept a client-supplied recent list.

Prepare must not reveal answer identity or routing diagnostics. Reveal must atomically consume a valid session-bound token. Abandoned prepares must not enter recent history.

Rollback must stay secure: revert server/API implementation or temporarily disable Answers rather than republishing the bulk corpus.

Executable router/parity code and machine proof artifacts live in `answers-private-server/` and should remain separate from human documentation.

---

## 7. Answers Admin

Answers Library/Admin is DB-native after the migration.

Browser clients must not receive service-role secrets. Server-side authorization must verify the authenticated Flipgazine admin before corpus CRUD or routing diagnostics.

Do not resurrect the old workflow that parsed the public controller, string-spliced embedded arrays, regenerated the controller in-browser, and wrote the whole JS file back.

Corpus edits must preserve stable IDs, Thai/English pairing and semantic fields and must use the canonical router/audit path rather than a second approximate router.

---

## 8. Editorial / corpus rules

Canonical guide:

`docs/chatgpt-workflow/ANSWERS-VOICE-TONE.md`

Central rule:

> **Thai is the original. English is the adaptation.**

Thai line breaks are authored language data, not incidental wrapping. Preserve them.

The completed Batch 1 review/provenance record is immutable:

`docs/chatgpt-workflow/ANSWERS-HUMAN-REVIEW.md`

Batch 1 facts:

```text
948 / 948 reviewed
564 accepted unchanged
384 human edited
40.5% intervention
canonical bilingual copy freeze = v122
frozen semantic/routing reference = v124
```

Do not normalize or rewrite historical evidence after the fact.

---

## 9. Commercial workflow

The security gate is complete and is not an outstanding commercial dependency.

Current commercial schedule:

`docs/chatgpt-workflow/ANSWERS-COMMERCIAL-EXECUTION-TIMELINE.md`

Commercial/methodology authority:

`docs/chatgpt-workflow/ANSWERS-COMMERCIAL-BENCHMARK-PLAN.md`

Batch 2 is the approved simple repeatability workflow, not the rejected heavy blind-X/Y protocol:

```text
new question/scenario
→ ChatGPT draft
→ single native Thai editor reviews every row
→ ACCEPT / EDIT / REWRITE
→ final approved Thai
→ English sibling/adaptation if required
→ lightweight reason tags
→ frozen provenance
```

Do not overclaim the corpus as unrestricted training data, universal Thai truth, causal model improvement or a randomized scientific benchmark.

---

## 10. Deployment / ownership discipline

If a change is owned by Supabase `site_files`, do not redeploy Cloudflare Pages merely to change content.

Redeploy the shell only when the owner is shell-level infrastructure such as:

- `flipgazine-root-3/_worker.js`;
- `_headers`;
- `_redirects`;
- shell `index.html`;
- service-worker/static edge assets.

Do not copy a database-served page into the static bundle as a shortcut. That creates two sources of truth.

For social crawler metadata, remember that `_worker.js` may own the result because crawlers do not execute the page JavaScript.

Use the existing Links system for short links/QR rather than building Answers-specific duplicates.

---

## 11. Change discipline

For a live Answers change:

1. identify the real owner;
2. query current live version/hash/state;
3. inspect the complete relevant block/data;
4. preserve or create recovery evidence for risky work;
5. make the smallest coherent change;
6. use optimistic/version-safe writes where applicable;
7. verify removed/replaced paths are actually gone;
8. prove copy unchanged for runtime-only work;
9. prove routing/runtime unchanged for copy-only work;
10. test real user behavior, mobile state and routing/security invariants.

Do not patch screenshots. Diagnose the ownership/invariant that explains them.

---

## 12. Short mental model

```text
GITHUB / CLOUDFLARE SHELL
  shell + edge infrastructure

SUPABASE site_files
  public pages + slim controllers

PRIVATE ANSWERS DATABASE
  canonical corpus + semantic assets + runtime state
          ↓
CANONICAL SERVER ROUTER
  CARE → precise semantic owner → Support → recent handling
          ↓
  exactly 2 Universals on matched non-generic route
          ↓
  uniform final pick
          ↓
opaque prepare token
          ↓
physical release
          ↓
one bilingual answer

DOCUMENTATION
  docs/chatgpt-workflow/
```

The sophistication belongs backstage. The public Book should continue to feel simple.

---

## 13. Frozen final TCJ commercial architecture

For TCJ commercial-product work, preserve this frozen topology:

```text
BUYER WRITER
→ TCJ GATEWAY
→ VOICE PROFILE
→ PRIVATE TCJ EVIDENCE ENGINE
→ DERIVED NON-RECONSTRUCTIVE SIGNALS
→ BYOJ SELECTED JUDGE
     ├─ LOCAL JUDGE = self-hosted/private inference
     └─ BYOK JUDGE = supported external provider + buyer credential
→ TCJ DETERMINISTIC GUARDS
→ RISK-TRIGGERED CHALLENGE
→ INDEPENDENT SIX-DIMENSION RESOLVER
→ ACCEPT / REVISE / ESCALATE
→ TARGETED WRITER REVISION IF REQUIRED
→ TCJ RECHECK
→ FINAL OUTPUT
```

The approved interactive evidence invocation for Sol or another BYOJ judge is:

```text
candidate
→ Voice Profile
→ SELECTED JUDGE
   ↕
   TCJ PRIVATE EVIDENCE TOOL
   ↓
   PRIVATE TCJ EVIDENCE ENGINE / DATA VAULT
   ↓
   derived non-reconstructive signals only
   ↑
→ SELECTED JUDGE
→ TCJ Guards / Challenge / Resolver
```

Hard rules:

- Voice Profile defines target quality; it does not expose the corpus.
- Private Evidence Engine is the only normal runtime component allowed to inspect raw proprietary TCJ evidence.
- The Private Evidence Tool must be a narrow allowlisted capability, preferably using an opaque evaluation ID. It must not expose SQL, generic search, service-role credentials, raw rows, nearest examples, raw anchors or reconstructive vectors.
- Prompt-injection resistance comes from the absence of exfiltration capabilities, not merely from prompt instructions.
- Local/BYOK judges receive the current candidate, Voice Profile contract and derived/non-reconstructive TCJ signals, not raw Batch rows/anchors.
- Evidence Tool schema/version, allowed analysis families, signal contract and call budget are authority-bearing evaluator components and must be frozen/qualified with the evaluator.
- Buyer writer receives only final decision/revision guidance.
- Default real-time `max_revision_cycles = 1`.
- Qualification authority attaches to the complete frozen evaluator configuration, not a naked model.
- OpenAI/Sol may be a reference/recommended BYOK judge but is not mandatory.
- For BYOK, buyer supplies/controls the provider account/API key and pays provider usage directly by default. TCJ does not sell/transfer the API key; TCJ license/Voice Profile/evidence-tool/support fees are separate.
- Current OpenAI business/API data and ZDR statements are a dated checkpoint, not a legal warranty; recheck terms and endpoint eligibility before material commercial launch.
- Architecture freeze does not mean production authority. Fresh Qualification, Panel/reliability validation, Assurance, security, tenant/evidence-isolation tests, reproducibility and release acceptance remain mandatory.

Primary authority:

`docs/chatgpt-workflow/ANSWERS-TCJ-FINAL-COMMERCIAL-PRODUCT-ARCHITECTURE-FREEZE-20260822.md`

Governing clarification:

`docs/chatgpt-workflow/ANSWERS-TCJ-SOL-PRIVATE-EVIDENCE-TOOL-AND-COMMERCIAL-LICENSING-CLARIFICATION-20260822.md`
