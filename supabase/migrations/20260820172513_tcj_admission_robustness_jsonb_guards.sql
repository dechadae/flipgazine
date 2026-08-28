create or replace function private.tcj_robustness_attempts_jsonb_guard()
returns trigger language plpgsql set search_path to 'pg_catalog','private' as $$
begin
  if new.parsed_output is not null then new.parsed_output:=private.tcj_normalize_jsonb_object(new.parsed_output); end if;
  new.generation_settings:=private.tcj_normalize_jsonb_object(new.generation_settings);
  new.usage:=private.tcj_normalize_jsonb_object(new.usage);
  return new;
end $$;

create or replace function private.tcj_robustness_judgments_jsonb_guard()
returns trigger language plpgsql set search_path to 'pg_catalog','private' as $$
begin
  new.diagnosis:=private.tcj_normalize_jsonb_object(new.diagnosis);
  new.raw_output:=private.tcj_normalize_jsonb_object(new.raw_output);
  new.generation_settings:=private.tcj_normalize_jsonb_object(new.generation_settings);
  new.usage:=private.tcj_normalize_jsonb_object(new.usage);
  return new;
end $$;

create or replace function private.tcj_robustness_failures_jsonb_guard()
returns trigger language plpgsql set search_path to 'pg_catalog','private' as $$
begin new.error_meta:=private.tcj_normalize_jsonb_object(new.error_meta); return new; end $$;

create or replace function private.tcj_robustness_summaries_jsonb_guard()
returns trigger language plpgsql set search_path to 'pg_catalog','private' as $$
begin
  new.repeat_metrics:=private.tcj_normalize_jsonb_object(new.repeat_metrics);
  new.self_preference_metrics:=private.tcj_normalize_jsonb_object(new.self_preference_metrics);
  new.reliability_metrics:=private.tcj_normalize_jsonb_object(new.reliability_metrics);
  return new;
end $$;

create trigger tcj_robustness_attempts_jsonb_guard before insert or update on private.tcj_admission_robustness_attempts for each row execute function private.tcj_robustness_attempts_jsonb_guard();
create trigger tcj_robustness_judgments_jsonb_guard before insert or update on private.tcj_admission_robustness_judgments for each row execute function private.tcj_robustness_judgments_jsonb_guard();
create trigger tcj_robustness_failures_jsonb_guard before insert or update on private.tcj_admission_robustness_failures for each row execute function private.tcj_robustness_failures_jsonb_guard();
create trigger tcj_robustness_summaries_jsonb_guard before insert or update on private.tcj_admission_robustness_summaries for each row execute function private.tcj_robustness_summaries_jsonb_guard();