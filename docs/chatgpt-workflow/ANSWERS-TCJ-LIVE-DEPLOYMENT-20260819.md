# Thai Conversation Judge — Live Deployment Record · 19 August 2026

**Status:** COMPLETE  
**Architecture authority:** `ANSWERS-THAI-CONVERSATION-JUDGE-ARCHITECTURE.md`  
**This document supersedes only the live component-version snapshot in Section 17 of that architecture document.** The methodology versions remain `TCJ-CORE-v1`, `TCJ-GENERAL-v1`, `TCJ-ANSWERS-BFF-v2` and `TCJ-GUARDS-v1`.

## Final live component versions

```text
tcj-engine                  v2 ACTIVE
voice-eval                  v10 ACTIVE
batch2-qwen-audit           v3 ACTIVE
voice.html                  v63
fg-page-voice-v9.js         site_files version 8
```

The second `tcj-engine` deployment did not change the linguistic methodology. It hardened the internal Batch 2 boundary after the initial v1 deployment.

The third `batch2-qwen-audit` deployment similarly preserves the same `TCJ-ANSWERS-BFF-v2` methodology and adds the corresponding server-to-server credential.

## Internal boundary hardening

`tcj-engine` must remain public enough to serve the public Voice benchmark, so the Edge Function itself is deployed with `verify_jwt=false`.

Public requests are still limited to the Flipgazine public origin and the existing evaluator rate/budget path.

Internal Batch 2 evaluation now requires **both**:

1. the existing authenticated admin JWT/session checks; and
2. a server-to-server `x-tcj-internal-key` equal to the Edge runtime's `SUPABASE_SERVICE_ROLE_KEY` environment value.

The key is added only by the authenticated `batch2-qwen-audit` proxy. It is never sent to the browser and is not stored in repository code.

Therefore a direct originless request to `tcj-engine` cannot enter the Batch 2 path merely by presenting an unverified claims-shaped token.

## Public compatibility route

```text
/voice.html
    ↓
voice-eval v10
    ↓
tcj-engine v2
    ↓
TCJ profile + Qwen semantic judge
```

`voice-eval` is now a thin compatibility proxy. It defaults legacy clients to `general-v1` if no profile is supplied.

## Batch 2 compatibility route

```text
batch2-production-review-service
    ↓
batch2-qwen-audit v3
  [JWT verified]
  [internal server key attached]
    ↓
tcj-engine v2
  [internal key verified]
  [active session verified]
  [FG admin verified]
    ↓
answers-bff-v2
```

This preserves the existing Batch 2 reviewer call path while removing the duplicated Qwen judging prompt from `batch2-qwen-audit`.

## Live Voice UI

`/voice.html` v63 now exposes:

```text
General Thai      default · general-v1
Answers Voice     optional · answers-bff-v2
```

The controller was moved to a new path, `/fg-page-voice-v9.js`, because the persistent Flipgazine module loader caches controllers by path.

The controller sends the selected profile to the existing `/functions/v1/voice-eval` endpoint and renders the dimension labels returned by TCJ dynamically. This is required because General Thai uses `register_relationship_fit` and `discourse_delivery`, while Answers Voice uses `bff_voice` and `composition`.

## Verification

### General Thai smoke

The production `voice-eval` → `tcj-engine` route was called with a hospitality/service scenario.

Result:

```text
HTTP                 200
engine_version       TCJ-CORE-v1
profile              general-v1
protocol             TCJ-GENERAL-v1
```

The returned dimensions included `Register / Relationship Fit` and `Discourse / Delivery`, confirming that the request was not silently evaluated with the old Answers rubric.

### Answers Voice smoke

The route was called with the Batch 2-style personification example:

```text
เปลี่ยนแบตก่อนค่ะ
เครื่องยังโอ
อย่าให้แบต
ขายมือถือใหม่ให้เรา
```

Result:

```text
HTTP                 200
profile              answers-bff-v2
protocol             TCJ-ANSWERS-BFF-v2
verdict              fluent
```

The rationale interpreted the final line as personification rather than unrelated semantic drift. This is a smoke verification of the new profile instruction, not an accuracy benchmark claim.

### Deterministic guard smoke

A known English-shaped social-messaging construction triggered:

```text
TH-GEN-001
calibration_status = calibrated
```

This confirms that calibration is executing after model diagnosis in the shared runtime.

### Public privacy verification

After the public smoke calls:

```text
private.tcj_evaluation_runs       0
private.tcj_guard_applications    0
private.batch2_tcj_links          0
```

Public prompt/response text therefore did not enter the private TCJ research store.

### Internal boundary verification

A direct originless POST to `tcj-engine` without the private server credential returned:

```text
HTTP 403
{"error":"forbidden"}
```

An unauthenticated call to the JWT-protected `batch2-qwen-audit` endpoint is also rejected by the Supabase gateway.

## Research rerun status

No `calibration_rerun` was executed during this deployment.

The TCJ research tables remain empty at this checkpoint. This is intentional: B2-0021–B2-0040 already have frozen human decisions, but rerunning them through `answers-bff-v2` is a distinct calibration experiment and must not be conflated with the engine deployment itself.

When run, the rerun must append new TCJ evidence only. It must not replace `B2-QWEN-AUDIT-v1` rows or modify native-human decisions.

## Repository mirrors

The live architecture is mirrored in:

```text
supabase/functions/tcj-engine/index.ts
supabase/functions/tcj-engine/tcj-core.ts
supabase/functions/tcj-engine/schema.sql
supabase/functions/voice-eval/index.ts
supabase/functions/batch2-qwen-audit/index.ts
```

The governing architecture and this live deployment record are indexed from `docs/chatgpt-workflow/README.md`.
