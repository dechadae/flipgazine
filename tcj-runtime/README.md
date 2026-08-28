# TCJ Runtime — Architecture v2 private-server shell

**Status:** research package. Not production-authorized until the exact frozen evaluator passes Qualification 2.0 and remaining security/release gates.

This package is the provider-neutral shell for the current TCJ commercial architecture:

```text
buyer writer
→ TCJ gateway
→ Voice Profile
→ local Context Retriever
→ relevant signed Methodology Pack modules
→ selected judge (Local or buyer-owned BYOK)
↔ optional bounded Private Evidence service
→ six-dimension diagnosis
→ TCJ Release Policy
→ ACCEPT / REVISE / ESCALATE
```

## Important boundaries

- GitHub is not a production methodology store. The compiled Methodology Pack is mounted as a signed release artifact.
- Raw TCJ corpus rows, human edit pairs, private anchors and hidden Qualification/Assurance evidence are not part of this repository package.
- Buyer API credentials remain buyer-controlled.
- External judge dispatch is **off by default** and requires `TCJ_ALLOW_EXTERNAL_JUDGE=true` plus a non-mock judge mode.
- The development package must never depend on the developer's OpenAI key.

## Judge modes

`mock` — no external inference. Used for orchestration/release-policy tests.

`local` — OpenAI-compatible endpoint inside the buyer/private environment.

`byok` — external OpenAI-compatible provider using the buyer's own credential.

Connected does not mean Qualified. Production authority is tied to the exact frozen configuration hash, including model/settings, Methodology Pack, retriever, Voice Profile, evidence-tool contract and Release Policy.

## Required mounted artifacts

The release package expects:

- `/opt/tcj/methodology-pack.json`
- `/opt/tcj/voice-profile.json`
- optional `/opt/tcj/passport.json`

These are generated/signed by the TCJ release process and are intentionally not committed here.

## API

- `GET /v1/health`
- `GET /v1/configuration`
- `GET /v1/passport`
- `POST /v1/evaluate`
- `POST /v1/refine` (contract placeholder until writer integration is frozen)

Example request:

```json
{
  "profile": "answers-bff-v1",
  "scenario": "เพื่อนถามว่า ...",
  "candidate": "...",
  "mode": "quality_gate"
}
```

The runtime returns diagnosis and the TCJ release decision. In `REVISE`, only targeted revision guidance should be sent to the buyer writer; protected evidence never enters writer context.

## Current reference component set

The live research implementation currently uses:

- Methodology Pack `TCJ-METHODOLOGY-BFF-v1.1`
- Context Retriever `TCJ-CONTEXT-RETRIEVER-v1.4`
- Voice Profile `TCJ-VOICE-ANSWERS-BFF-v1`
- bounded Private Evidence assessment `TCJ-PRIVATE-EVIDENCE-ASSESS-v1.1`
- Release Policy `TCJ-RELEASE-POLICY-v1.1`
- Judge Adapter `TCJ-JUDGE-ADAPTER-v2`

These remain research-only until final freeze and Qualification.
