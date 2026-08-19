-- TCJ JSONB persistence boundary.
-- Preserve existing historical rows exactly; normalize and validate future inserts only.

create or replace function private.tcj_normalize_jsonb_object(v jsonb)
returns jsonb
language plpgsql
immutable
strict
set search_path = pg_catalog, private
as $$
begin
  if pg_catalog.jsonb_typeof(v) = 'string' then
    return ((v #>> '{}')::jsonb);
  end if;
  return v;
exception
  when others then
    raise exception 'tcj_jsonb_normalization_failed';
end;
$$;

revoke all on function private.tcj_normalize_jsonb_object(jsonb) from public, anon, authenticated;

create or replace function private.tcj_normalize_evaluation_run_jsonb()
returns trigger
language plpgsql
set search_path = pg_catalog, private
as $$
begin
  if new.raw_diagnosis is not null then
    new.raw_diagnosis := private.tcj_normalize_jsonb_object(new.raw_diagnosis);
  end if;
  if new.raw_output is not null then
    new.raw_output := private.tcj_normalize_jsonb_object(new.raw_output);
  end if;
  if new.calibrated_diagnosis is not null then
    new.calibrated_diagnosis := private.tcj_normalize_jsonb_object(new.calibrated_diagnosis);
  end if;
  return new;
end;
$$;

revoke all on function private.tcj_normalize_evaluation_run_jsonb() from public, anon, authenticated;

drop trigger if exists trg_tcj_normalize_evaluation_run_jsonb on private.tcj_evaluation_runs;
create trigger trg_tcj_normalize_evaluation_run_jsonb
before insert on private.tcj_evaluation_runs
for each row execute function private.tcj_normalize_evaluation_run_jsonb();

create or replace function private.tcj_normalize_guard_jsonb()
returns trigger
language plpgsql
set search_path = pg_catalog, private
as $$
begin
  if new.before_diagnosis is not null then
    new.before_diagnosis := private.tcj_normalize_jsonb_object(new.before_diagnosis);
  end if;
  if new.after_diagnosis is not null then
    new.after_diagnosis := private.tcj_normalize_jsonb_object(new.after_diagnosis);
  end if;
  return new;
end;
$$;

revoke all on function private.tcj_normalize_guard_jsonb() from public, anon, authenticated;

drop trigger if exists trg_tcj_normalize_guard_jsonb on private.tcj_guard_applications;
create trigger trg_tcj_normalize_guard_jsonb
before insert on private.tcj_guard_applications
for each row execute function private.tcj_normalize_guard_jsonb();

create or replace function private.tcj_normalize_ai_audit_jsonb()
returns trigger
language plpgsql
set search_path = pg_catalog, private
as $$
begin
  if new.raw_output is not null then
    new.raw_output := private.tcj_normalize_jsonb_object(new.raw_output);
  end if;
  return new;
end;
$$;

revoke all on function private.tcj_normalize_ai_audit_jsonb() from public, anon, authenticated;

drop trigger if exists trg_tcj_normalize_ai_audit_jsonb on private.batch2_ai_audits;
create trigger trg_tcj_normalize_ai_audit_jsonb
before insert on private.batch2_ai_audits
for each row execute function private.tcj_normalize_ai_audit_jsonb();

alter table private.tcj_evaluation_runs
  drop constraint if exists tcj_evaluation_runs_raw_diagnosis_object_ck,
  drop constraint if exists tcj_evaluation_runs_raw_output_object_ck,
  drop constraint if exists tcj_evaluation_runs_calibrated_diagnosis_object_ck;

alter table private.tcj_evaluation_runs
  add constraint tcj_evaluation_runs_raw_diagnosis_object_ck
    check (raw_diagnosis is null or pg_catalog.jsonb_typeof(raw_diagnosis) = 'object') not valid,
  add constraint tcj_evaluation_runs_raw_output_object_ck
    check (raw_output is null or pg_catalog.jsonb_typeof(raw_output) = 'object') not valid,
  add constraint tcj_evaluation_runs_calibrated_diagnosis_object_ck
    check (calibrated_diagnosis is null or pg_catalog.jsonb_typeof(calibrated_diagnosis) = 'object') not valid;

alter table private.tcj_guard_applications
  drop constraint if exists tcj_guard_before_object_ck,
  drop constraint if exists tcj_guard_after_object_ck;

alter table private.tcj_guard_applications
  add constraint tcj_guard_before_object_ck
    check (before_diagnosis is null or pg_catalog.jsonb_typeof(before_diagnosis) = 'object') not valid,
  add constraint tcj_guard_after_object_ck
    check (after_diagnosis is null or pg_catalog.jsonb_typeof(after_diagnosis) = 'object') not valid;

alter table private.batch2_ai_audits
  drop constraint if exists batch2_ai_audits_raw_output_object_ck;

alter table private.batch2_ai_audits
  add constraint batch2_ai_audits_raw_output_object_ck
    check (raw_output is null or pg_catalog.jsonb_typeof(raw_output) = 'object') not valid;