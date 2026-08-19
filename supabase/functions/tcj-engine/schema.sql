-- Thai Conversation Judge v1 storage architecture
-- Applied live as Supabase migration: tcj_engine_v1_architecture

create table if not exists private.tcj_guard_definitions (
  guard_id text not null,
  guard_version integer not null check (guard_version > 0),
  tier text not null check (tier in ('profile_knowledge','deterministic','escalation')),
  status text not null check (status in ('experimental','active','retired')),
  profiles text[] not null,
  priority integer not null check (priority between 1 and 10000),
  definition jsonb not null,
  introduced_in text not null,
  created_at timestamptz not null default clock_timestamp(),
  primary key (guard_id, guard_version)
);

create table if not exists private.tcj_evaluation_runs (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default clock_timestamp(),
  context_type text not null check (context_type in ('batch2','public_voice')),
  context_id text,
  stage text check (stage is null or stage in ('pre_human','post_human')),
  core_version text not null,
  profile_id text not null,
  profile_version text not null,
  care_mode boolean not null default false,
  model_provider text not null,
  model_name text not null,
  model_snapshot text,
  temperature numeric not null,
  scenario_sha256 text check (scenario_sha256 is null or scenario_sha256 ~ '^[a-f0-9]{64}$'),
  candidate_sha256 text check (candidate_sha256 is null or candidate_sha256 ~ '^[a-f0-9]{64}$'),
  methodology_sha256 text not null check (methodology_sha256 ~ '^[a-f0-9]{64}$'),
  raw_diagnosis jsonb not null,
  raw_output jsonb not null,
  raw_diagnosis_sha256 text not null check (raw_diagnosis_sha256 ~ '^[a-f0-9]{64}$'),
  calibrated_diagnosis jsonb not null,
  calibrated_diagnosis_sha256 text not null check (calibrated_diagnosis_sha256 ~ '^[a-f0-9]{64}$'),
  calibration_status text not null check (calibration_status in ('none','calibrated','uncertain')),
  audit_index numeric(6,2) not null check (audit_index between 0 and 100),
  verdict text not null check (verdict in ('fluent','minor_problem','major_problem','not_acceptable')),
  guard_set_version text not null,
  prompt_tokens integer,
  completion_tokens integer,
  latency_ms integer,
  external_usage_id bigint references private.batch2_qwen_usage(id),
  purpose text not null check (purpose in ('production_qwen','calibration_rerun','public_transient_record')),
  check ((context_type='batch2' and context_id is not null and stage is not null and scenario_sha256 is not null and candidate_sha256 is not null) or context_type='public_voice')
);

create table if not exists private.tcj_guard_applications (
  id bigint generated always as identity primary key,
  evaluation_run_id bigint not null references private.tcj_evaluation_runs(id) on delete restrict,
  guard_id text not null,
  guard_version integer not null,
  tier text not null check (tier in ('deterministic','escalation')),
  guard_status text not null check (guard_status in ('experimental','active','retired')),
  action text not null check (action in ('annotate','calibrate','escalate')),
  reason text not null,
  before_diagnosis jsonb not null,
  after_diagnosis jsonb not null,
  created_at timestamptz not null default clock_timestamp(),
  foreign key (guard_id,guard_version) references private.tcj_guard_definitions(guard_id,guard_version)
);

create table if not exists private.batch2_tcj_links (
  source_id text not null references private.batch2_sources(id),
  stage text not null check (stage in ('pre_human','post_human')),
  tcj_run_id bigint not null references private.tcj_evaluation_runs(id),
  purpose text not null check (purpose in ('production_qwen','calibration_rerun')),
  legacy_audit_id bigint references private.batch2_ai_audits(id),
  created_at timestamptz not null default clock_timestamp(),
  primary key (source_id,stage,purpose,tcj_run_id),
  unique (tcj_run_id)
);

create index if not exists tcj_runs_context_idx on private.tcj_evaluation_runs(context_type,context_id,stage,created_at desc);
create index if not exists tcj_runs_profile_idx on private.tcj_evaluation_runs(profile_id,profile_version,purpose,created_at desc);
create index if not exists tcj_guard_apps_run_idx on private.tcj_guard_applications(evaluation_run_id);
create index if not exists batch2_tcj_links_source_idx on private.batch2_tcj_links(source_id,stage,purpose);

alter table private.tcj_guard_definitions enable row level security;
alter table private.tcj_evaluation_runs enable row level security;
alter table private.tcj_guard_applications enable row level security;
alter table private.batch2_tcj_links enable row level security;

revoke all on private.tcj_guard_definitions from anon, authenticated;
revoke all on private.tcj_evaluation_runs from anon, authenticated;
revoke all on private.tcj_guard_applications from anon, authenticated;
revoke all on private.batch2_tcj_links from anon, authenticated;

create or replace function private.tcj_prevent_mutation()
returns trigger
language plpgsql
set search_path to 'private','pg_catalog','pg_temp'
as $$
begin
  raise exception 'TCJ evidence is append-only';
end;
$$;

drop trigger if exists tcj_guard_definitions_immutable on private.tcj_guard_definitions;
create trigger tcj_guard_definitions_immutable before update or delete on private.tcj_guard_definitions for each row execute function private.tcj_prevent_mutation();
drop trigger if exists tcj_evaluation_runs_immutable on private.tcj_evaluation_runs;
create trigger tcj_evaluation_runs_immutable before update or delete on private.tcj_evaluation_runs for each row execute function private.tcj_prevent_mutation();
drop trigger if exists tcj_guard_applications_immutable on private.tcj_guard_applications;
create trigger tcj_guard_applications_immutable before update or delete on private.tcj_guard_applications for each row execute function private.tcj_prevent_mutation();
drop trigger if exists batch2_tcj_links_immutable on private.batch2_tcj_links;
create trigger batch2_tcj_links_immutable before update or delete on private.batch2_tcj_links for each row execute function private.tcj_prevent_mutation();

insert into private.tcj_guard_definitions(guard_id,guard_version,tier,status,profiles,priority,definition,introduced_in)
values
('TH-GEN-001',1,'deterministic','active',array['general-v1','answers-bff-v2'],100,
 jsonb_build_object(
   'trigger',jsonb_build_object('kind','compound','question_domain','social_messaging','candidate_pattern','english_shaped_long_enough_bridge'),
   'effect',jsonb_build_object('mode','calibrate','thai_pragmatics_cap',2,'third_dimension_cap',3,'lexical_social_fit_cap',3,'sixth_dimension_cap',3,'severity_floor','MINOR'),
   'evidence',jsonb_build_object('origin','voice-eval-v9 human calibration','notes','Migrated from applyHumanThaiGuards; narrow deterministic translation-shape correction.')
 ),'TCJ-GUARDS-v1'),
('TH-BFF-001',1,'escalation','experimental',array['answers-bff-v2'],400,
 jsonb_build_object(
   'trigger',jsonb_build_object('kind','diagnosis_condition','required_flag','semantic_drift','intent_lte',2),
   'effect',jsonb_build_object('mode','annotate','confidence_cap','medium','escalation_reason','possible_metaphor_or_personification_misread'),
   'evidence',jsonb_build_object('derived_from',jsonb_build_array('B2-0034','B2-0035'),'notes','Experimental only: records uncertainty; does not change ratings or verdict.')
 ),'TCJ-GUARDS-v1')
on conflict do nothing;

-- Preserve historical protocols while allowing new TCJ-backed Qwen rows.
alter table private.batch2_ai_audits drop constraint if exists batch2_ai_audits_check;
alter table private.batch2_ai_audits add constraint batch2_ai_audits_check check (
  (auditor='chatgpt_self' and auditor_provider='openai' and audit_protocol_version='B2-SELF-AUDIT-v1' and external_usage_id is null)
  or
  (auditor='qwen_external' and auditor_provider='groq' and audit_protocol_version in ('B2-QWEN-AUDIT-v1','TCJ-ANSWERS-BFF-v2') and external_usage_id is not null)
);
