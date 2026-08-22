# TCJ Constructed Perturbation v1 — Freeze pgcrypto Schema Fix

**Status:** FREEZE IMPLEMENTATION FIXED · PACK REMAINS DRAFT · 33/33 REVIEWED · IDENTITIES SEALED  
**Date:** 22 August 2026 (Thailand)  
**Campaign:** `TCJ-JUDGE-ADMISSION-2026Q3-v1.2`  
**Pack:** `TCJ-JUDGE-ROBUSTNESS-PERTURB-2026Q3-v1`

## Incident

After native review reached 33/33, the operator pressed **Freeze perturbation v1**. The freeze transaction stopped with:

```text
function digest(text, unknown) does not exist
```

The failure occurred before any freeze state was committed. The pack remained `draft`; no case obtained a freeze timestamp from this attempt; no perturbation judge model was run.

## Root cause

The project installs pgcrypto functions in the `extensions` schema.

Two freeze paths used unqualified `digest(...)` calls:

1. `tcj-admission-perturbation-review` Edge Function case-hash refresh.
2. `private.tcj_robustness_pack_manifest_guard()` database trigger.

The trigger search path intentionally excludes `extensions`, so unqualified lookup was invalid. Existing project code correctly uses `extensions.digest(...)` elsewhere.

## Fix

Both paths now use schema-qualified:

```text
extensions.digest(...)
```

Production migration:

```text
20260822001054_tcj_perturbation_freeze_pgcrypto_schema_fix
```

Live Edge Function:

```text
tcj-admission-perturbation-review v3
verify_jwt = true
```

Repository mirrors:

```text
supabase/migrations/20260822001054_tcj_perturbation_freeze_pgcrypto_schema_fix.sql
supabase/functions/tcj-admission-perturbation-review/index.ts
```

## Independent pre-freeze verification after the fix

```text
approved cases                 33 / 33
survival pass                  33 / 33
survival fail                   0
scenario SHA-256 matches       33 / 33
candidate SHA-256 matches      33 / 33
pack status                    draft
pack manifest                  null
identity reveal                null
candidate identities           3 sealed
perturbation judge attempts     0
perturbation judgments          0
```

Canonical PostgreSQL manifest computed independently from the reviewed draft:

```text
5628e726ed31fff979fd92ef55ad43da3b7c2ee86f8d798c5490f150469a39d5
```

The database manifest trigger remains authoritative at the actual `draft -> frozen` transition.

## Next valid action

The authenticated domain-expert operator may press **Freeze perturbation v1** again. After the transition, independently verify:

1. pack state is `frozen`;
2. exactly 33 cases are frozen;
3. stored manifest equals the independently computed canonical manifest above;
4. all 3 candidate identities remain sealed;
5. no 99-cell perturbation model execution occurs until this verification passes.
