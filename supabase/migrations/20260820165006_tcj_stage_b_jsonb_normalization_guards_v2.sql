update private.tcj_admission_stage_b_failures set error_meta=(error_meta #>> '{}')::jsonb where jsonb_typeof(error_meta)='string';
update private.tcj_admission_stage_b_judgments set diagnosis=(diagnosis #>> '{}')::jsonb where jsonb_typeof(diagnosis)='string';
update private.tcj_admission_stage_b_judgments set raw_output=(raw_output #>> '{}')::jsonb where jsonb_typeof(raw_output)='string';
update private.tcj_admission_stage_b_judgments set generation_settings=(generation_settings #>> '{}')::jsonb where jsonb_typeof(generation_settings)='string';
update private.tcj_admission_stage_b_judgments set usage=(usage #>> '{}')::jsonb where usage is not null and jsonb_typeof(usage)='string';
update private.tcj_admission_stage_b_summaries set dimension_metrics=(dimension_metrics #>> '{}')::jsonb where jsonb_typeof(dimension_metrics)='string';
update private.tcj_admission_stage_b_summaries set error_metrics=(error_metrics #>> '{}')::jsonb where jsonb_typeof(error_metrics)='string';

create or replace function private.tcj_stage_b_attempts_jsonb_guard() returns trigger language plpgsql set search_path=pg_catalog,private as $$ begin if new.parsed_output is not null and jsonb_typeof(new.parsed_output)='string' then new.parsed_output := (new.parsed_output #>> '{}')::jsonb; end if; if new.generation_settings is not null and jsonb_typeof(new.generation_settings)='string' then new.generation_settings := (new.generation_settings #>> '{}')::jsonb; end if; if new.usage is not null and jsonb_typeof(new.usage)='string' then new.usage := (new.usage #>> '{}')::jsonb; end if; return new; end $$;
drop trigger if exists tcj_stage_b_attempts_jsonb_guard on private.tcj_admission_stage_b_attempts;
create trigger tcj_stage_b_attempts_jsonb_guard before insert or update on private.tcj_admission_stage_b_attempts for each row execute function private.tcj_stage_b_attempts_jsonb_guard();

create or replace function private.tcj_stage_b_judgments_jsonb_guard() returns trigger language plpgsql set search_path=pg_catalog,private as $$ begin if jsonb_typeof(new.diagnosis)='string' then new.diagnosis := (new.diagnosis #>> '{}')::jsonb; end if; if jsonb_typeof(new.raw_output)='string' then new.raw_output := (new.raw_output #>> '{}')::jsonb; end if; if jsonb_typeof(new.generation_settings)='string' then new.generation_settings := (new.generation_settings #>> '{}')::jsonb; end if; if new.usage is not null and jsonb_typeof(new.usage)='string' then new.usage := (new.usage #>> '{}')::jsonb; end if; return new; end $$;
drop trigger if exists tcj_stage_b_judgments_jsonb_guard on private.tcj_admission_stage_b_judgments;
create trigger tcj_stage_b_judgments_jsonb_guard before insert or update on private.tcj_admission_stage_b_judgments for each row execute function private.tcj_stage_b_judgments_jsonb_guard();

create or replace function private.tcj_stage_b_failures_jsonb_guard() returns trigger language plpgsql set search_path=pg_catalog,private as $$ begin if jsonb_typeof(new.error_meta)='string' then new.error_meta := (new.error_meta #>> '{}')::jsonb; end if; return new; end $$;
drop trigger if exists tcj_stage_b_failures_jsonb_guard on private.tcj_admission_stage_b_failures;
create trigger tcj_stage_b_failures_jsonb_guard before insert or update on private.tcj_admission_stage_b_failures for each row execute function private.tcj_stage_b_failures_jsonb_guard();

create or replace function private.tcj_stage_b_summaries_jsonb_guard() returns trigger language plpgsql set search_path=pg_catalog,private as $$ begin if jsonb_typeof(new.dimension_metrics)='string' then new.dimension_metrics := (new.dimension_metrics #>> '{}')::jsonb; end if; if jsonb_typeof(new.error_metrics)='string' then new.error_metrics := (new.error_metrics #>> '{}')::jsonb; end if; return new; end $$;
drop trigger if exists tcj_stage_b_summaries_jsonb_guard on private.tcj_admission_stage_b_summaries;
create trigger tcj_stage_b_summaries_jsonb_guard before insert or update on private.tcj_admission_stage_b_summaries for each row execute function private.tcj_stage_b_summaries_jsonb_guard();

alter table private.tcj_admission_stage_b_judgments drop constraint if exists tcj_stage_b_judgments_jsonb_object_check;
alter table private.tcj_admission_stage_b_judgments add constraint tcj_stage_b_judgments_jsonb_object_check check (jsonb_typeof(diagnosis)='object' and jsonb_typeof(raw_output)='object' and jsonb_typeof(generation_settings)='object' and (usage is null or jsonb_typeof(usage)='object'));
alter table private.tcj_admission_stage_b_failures drop constraint if exists tcj_stage_b_failures_error_meta_object_check;
alter table private.tcj_admission_stage_b_failures add constraint tcj_stage_b_failures_error_meta_object_check check (jsonb_typeof(error_meta)='object');
alter table private.tcj_admission_stage_b_summaries drop constraint if exists tcj_stage_b_summaries_jsonb_object_check;
alter table private.tcj_admission_stage_b_summaries add constraint tcj_stage_b_summaries_jsonb_object_check check (jsonb_typeof(dimension_metrics)='object' and jsonb_typeof(error_metrics)='object');
