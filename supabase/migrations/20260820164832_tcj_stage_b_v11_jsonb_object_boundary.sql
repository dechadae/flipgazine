update private.tcj_admission_stage_b_attempts
set parsed_output = case when parsed_output is not null and jsonb_typeof(parsed_output)='string' then (parsed_output #>> '{}')::jsonb else parsed_output end,
    generation_settings = case when generation_settings is not null and jsonb_typeof(generation_settings)='string' then (generation_settings #>> '{}')::jsonb else generation_settings end,
    usage = case when usage is not null and jsonb_typeof(usage)='string' then (usage #>> '{}')::jsonb else usage end
where protocol_version='TCJ-JUDGE-ADMISSION-STAGE-B-v1.1';

alter table private.tcj_admission_stage_b_attempts drop constraint if exists tcj_stage_b_attempts_parsed_output_object_check;
alter table private.tcj_admission_stage_b_attempts add constraint tcj_stage_b_attempts_parsed_output_object_check check (parsed_output is null or jsonb_typeof(parsed_output)='object');
alter table private.tcj_admission_stage_b_attempts drop constraint if exists tcj_stage_b_attempts_generation_settings_object_check;
alter table private.tcj_admission_stage_b_attempts add constraint tcj_stage_b_attempts_generation_settings_object_check check (jsonb_typeof(generation_settings)='object');
alter table private.tcj_admission_stage_b_attempts drop constraint if exists tcj_stage_b_attempts_usage_object_check;
alter table private.tcj_admission_stage_b_attempts add constraint tcj_stage_b_attempts_usage_object_check check (usage is null or jsonb_typeof(usage)='object');
