create table if not exists private.tcj_qualification_runs (
  id bigint generated always as identity primary key,
  run_key text not null unique,
  protocol_id bigint not null unique references private.tcj_qualification_protocols(id),
  campaign_id bigint not null references private.tcj_admission_campaigns(id),
  status text not null check (status in ('frozen','running','complete','blocked')),
  run_protocol_version text not null,
  prompt_version text not null,
  config jsonb not null check (jsonb_typeof(config)='object'),
  config_sha256 text not null check (length(config_sha256)=64),
  threshold_sha256 text not null check (length(threshold_sha256)=64),
  human_manifest_sha256 text not null check (length(human_manifest_sha256)=64),
  evidence_manifest_sha256 text not null check (length(evidence_manifest_sha256)=64),
  expected_cells integer not null check (expected_cells>0),
  started_at timestamptz,
  completed_at timestamptz,
  run_manifest_sha256 text check (run_manifest_sha256 is null or length(run_manifest_sha256)=64),
  created_at timestamptz not null default pg_catalog.now()
);

create table if not exists private.tcj_qualification_attempts (
  id bigint generated always as identity primary key,
  run_id bigint not null references private.tcj_qualification_runs(id),
  evidence_item_id bigint not null references private.tcj_evidence_items(id),
  judge_candidate_id bigint not null references private.tcj_judge_candidates(id),
  attempt_index integer not null check (attempt_index in (1,2)),
  attempt_role text not null check (attempt_role in ('primary','repair')),
  protocol_version text not null,
  prompt_version text not null,
  request_payload jsonb not null check (jsonb_typeof(request_payload)='object'),
  request_sha256 text not null check (length(request_sha256)=64),
  system_prompt_sha256 text not null check (length(system_prompt_sha256)=64),
  user_payload_sha256 text not null check (length(user_payload_sha256)=64),
  http_status integer,
  finish_reason text,
  outcome_class text not null check (outcome_class in ('valid','invalid_schema','length','empty','provider_failure')),
  error_code text,
  raw_output_text text,
  raw_output_sha256 text check (raw_output_sha256 is null or length(raw_output_sha256)=64),
  parsed_output jsonb,
  generation_settings jsonb not null default '{}'::jsonb check (jsonb_typeof(generation_settings)='object'),
  usage jsonb not null default '{}'::jsonb check (jsonb_typeof(usage)='object'),
  latency_ms integer,
  evidence_eligible boolean not null default true,
  created_at timestamptz not null default pg_catalog.now(),
  unique(run_id,evidence_item_id,judge_candidate_id,attempt_index)
);

create table if not exists private.tcj_qualification_judgments (
  id bigint generated always as identity primary key,
  run_id bigint not null references private.tcj_qualification_runs(id),
  evidence_item_id bigint not null references private.tcj_evidence_items(id),
  judge_candidate_id bigint not null references private.tcj_judge_candidates(id),
  source_attempt_id bigint not null references private.tcj_qualification_attempts(id),
  opaque_judgment_id text not null unique,
  protocol_version text not null,
  prompt_version text not null,
  methodology_sha256 text not null check (length(methodology_sha256)=64),
  request_sha256 text not null check (length(request_sha256)=64),
  diagnosis jsonb not null check (jsonb_typeof(diagnosis)='object'),
  diagnosis_sha256 text not null check (length(diagnosis_sha256)=64),
  predicted_verdict text not null check (predicted_verdict in ('fluent','minor_problem','major_problem','not_acceptable')),
  generation_settings jsonb not null check (jsonb_typeof(generation_settings)='object'),
  usage jsonb not null default '{}'::jsonb check (jsonb_typeof(usage)='object'),
  latency_ms integer,
  created_at timestamptz not null default pg_catalog.now(),
  unique(run_id,evidence_item_id,judge_candidate_id)
);

create table if not exists private.tcj_qualification_failures (
  id bigint generated always as identity primary key,
  run_id bigint not null references private.tcj_qualification_runs(id),
  evidence_item_id bigint not null references private.tcj_evidence_items(id),
  judge_candidate_id bigint not null references private.tcj_judge_candidates(id),
  attempt_count integer not null default 0 check (attempt_count>=0),
  last_http_status integer,
  last_error_code text,
  failure_class text not null check (failure_class in ('transient_provider','generation_contract','infrastructure')),
  evidence_state text not null check (evidence_state in ('active','resolved','terminal')),
  first_failed_at timestamptz not null default pg_catalog.now(),
  last_failed_at timestamptz not null default pg_catalog.now(),
  next_retry_at timestamptz,
  resolved_at timestamptz,
  error_meta jsonb not null default '{}'::jsonb check (jsonb_typeof(error_meta)='object'),
  unique(run_id,evidence_item_id,judge_candidate_id)
);

create table if not exists private.tcj_qualification_summaries (
  id bigint generated always as identity primary key,
  run_id bigint not null references private.tcj_qualification_runs(id),
  judge_candidate_id bigint not null references private.tcj_judge_candidates(id),
  summary_version text not null,
  case_count integer not null check (case_count>0),
  valid_count integer not null check (valid_count>=0),
  terminal_count integer not null check (terminal_count>=0),
  dimension_metrics jsonb not null check (jsonb_typeof(dimension_metrics)='object'),
  global_metrics jsonb not null check (jsonb_typeof(global_metrics)='object'),
  dimension_decisions jsonb not null check (jsonb_typeof(dimension_decisions)='object'),
  global_gate_pass boolean not null,
  candidate_manifest_sha256 text not null check (length(candidate_manifest_sha256)=64),
  summary_sha256 text not null check (length(summary_sha256)=64),
  frozen_at timestamptz not null default pg_catalog.now(),
  unique(run_id,judge_candidate_id)
);

create index if not exists tcj_qualification_attempts_run_judge_idx on private.tcj_qualification_attempts(run_id,judge_candidate_id,evidence_item_id);
create index if not exists tcj_qualification_judgments_run_judge_idx on private.tcj_qualification_judgments(run_id,judge_candidate_id,evidence_item_id);
create index if not exists tcj_qualification_failures_run_state_idx on private.tcj_qualification_failures(run_id,evidence_state,next_retry_at);
create index if not exists tcj_qualification_summaries_run_idx on private.tcj_qualification_summaries(run_id);

create or replace function private.tcj_guard_qualification_run_immutable()
returns trigger language plpgsql set search_path='pg_catalog','private' as $$
begin
  if old.status in ('frozen','running','complete') and (
       new.run_key is distinct from old.run_key
    or new.protocol_id is distinct from old.protocol_id
    or new.campaign_id is distinct from old.campaign_id
    or new.run_protocol_version is distinct from old.run_protocol_version
    or new.prompt_version is distinct from old.prompt_version
    or new.config is distinct from old.config
    or new.config_sha256 is distinct from old.config_sha256
    or new.threshold_sha256 is distinct from old.threshold_sha256
    or new.human_manifest_sha256 is distinct from old.human_manifest_sha256
    or new.evidence_manifest_sha256 is distinct from old.evidence_manifest_sha256
    or new.expected_cells is distinct from old.expected_cells
  ) then
    raise exception 'qualification_run_config_immutable';
  end if;
  return new;
end $$;

drop trigger if exists tcj_qualification_run_immutable_trg on private.tcj_qualification_runs;
create trigger tcj_qualification_run_immutable_trg before update on private.tcj_qualification_runs for each row execute function private.tcj_guard_qualification_run_immutable();

create or replace function private.tcj_reject_qualification_evidence_mutation()
returns trigger language plpgsql set search_path='pg_catalog','private' as $$
begin
  raise exception 'qualification_evidence_append_only';
end $$;

drop trigger if exists tcj_qualification_attempts_append_only_trg on private.tcj_qualification_attempts;
create trigger tcj_qualification_attempts_append_only_trg before update or delete on private.tcj_qualification_attempts for each row execute function private.tcj_reject_qualification_evidence_mutation();
drop trigger if exists tcj_qualification_judgments_append_only_trg on private.tcj_qualification_judgments;
create trigger tcj_qualification_judgments_append_only_trg before update or delete on private.tcj_qualification_judgments for each row execute function private.tcj_reject_qualification_evidence_mutation();
drop trigger if exists tcj_qualification_summaries_append_only_trg on private.tcj_qualification_summaries;
create trigger tcj_qualification_summaries_append_only_trg before update or delete on private.tcj_qualification_summaries for each row execute function private.tcj_reject_qualification_evidence_mutation();

revoke execute on function private.tcj_guard_qualification_run_immutable() from public,anon,authenticated;
revoke execute on function private.tcj_reject_qualification_evidence_mutation() from public,anon,authenticated;

with src as (
  select p.id protocol_id,p.threshold_sha256,p.human_manifest_sha256,s.manifest_sha256 evidence_manifest_sha256,a.id campaign_id,
         jsonb_build_object(
           'run_protocol_version','TCJ-JUDGE-QUALIFICATION-RUN-v1',
           'prompt_version','TCJ-ANSWERS-BFF-v2@TCJ-CORE-v1',
           'canonical_core_version','TCJ-CORE-v1',
           'canonical_core_blob_sha','459d9831cf439696e0861f85c26839a43f6b6a64',
           'profile_id',p.profile_id,
           'temperature',0,
           'max_completion_tokens',500,
           'response_format','json_object',
           'repair_policy','one_schema_repair_then_terminal_no_semantic_resample',
           'user_payload_keys',jsonb_build_array('question_or_scenario','candidate_response'),
           'leakage_exclusions',jsonb_build_array('human_gold','human_severity','human_confidence','human_ambiguous','review_note','primary_dimension','design_class','construction_note','threshold_spec','admission_results','meta_reviews','passport_state'),
           'candidate_models',(select jsonb_agg(jsonb_build_object('judge_candidate_id',j.id,'model_name',j.model_name,'provider',j.provider,'reasoning_effort',case when j.model_name='qwen/qwen3.6-27b' then 'none' else 'low' end) order by j.id)
                              from private.tcj_admission_campaign_candidates cc join private.tcj_judge_candidates j on j.id=cc.judge_candidate_id where cc.campaign_id=a.id),
           'threshold_sha256',p.threshold_sha256,
           'human_manifest_sha256',p.human_manifest_sha256,
           'evidence_manifest_sha256',s.manifest_sha256
         ) cfg
  from private.tcj_qualification_protocols p
  join private.tcj_evidence_sets s on s.id=p.evidence_set_id
  join private.tcj_admission_campaigns a on a.campaign_key='TCJ-JUDGE-ADMISSION-2026Q3-v1.2'
  where p.protocol_key='TCJ-JUDGE-QUALIFICATION-2026Q3-v1' and p.status='bank_frozen' and s.status='frozen'
)
insert into private.tcj_qualification_runs(run_key,protocol_id,campaign_id,status,run_protocol_version,prompt_version,config,config_sha256,threshold_sha256,human_manifest_sha256,evidence_manifest_sha256,expected_cells)
select 'TCJ-JUDGE-QUALIFICATION-RUN-2026Q3-v1',protocol_id,campaign_id,'frozen','TCJ-JUDGE-QUALIFICATION-RUN-v1','TCJ-ANSWERS-BFF-v2@TCJ-CORE-v1',cfg,encode(extensions.digest(cfg::text,'sha256'),'hex'),threshold_sha256,human_manifest_sha256,evidence_manifest_sha256,144
from src
on conflict(run_key) do nothing;