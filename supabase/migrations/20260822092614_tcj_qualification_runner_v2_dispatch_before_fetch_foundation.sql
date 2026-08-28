-- Qualification v1.1 runner-v2 evidence foundation.
-- Exact serialized requests are committed before provider transmission.

create table if not exists private.tcj_qualification_dispatches (
  id bigint generated always as identity primary key,
  run_id bigint not null references private.tcj_qualification_runs(id),
  evidence_item_id bigint not null references private.tcj_evidence_items(id),
  judge_candidate_id bigint not null references private.tcj_judge_candidates(id),
  dispatch_index integer not null check (dispatch_index>0),
  attempt_role text not null check (attempt_role in ('primary','repair')),
  protocol_version text not null,
  prompt_version text not null,
  provider text not null,
  model_name text not null,
  provider_endpoint text not null,
  request_payload jsonb not null check (jsonb_typeof(request_payload)='object'),
  request_payload_text text not null,
  request_sha256 text not null check (length(request_sha256)=64),
  system_prompt_text text not null,
  system_prompt_sha256 text not null check (length(system_prompt_sha256)=64),
  user_payload_text text not null,
  user_payload_sha256 text not null check (length(user_payload_sha256)=64),
  generation_settings jsonb not null check (jsonb_typeof(generation_settings)='object'),
  dispatch_token uuid not null default gen_random_uuid() unique,
  created_at timestamptz not null default pg_catalog.now(),
  unique(run_id,evidence_item_id,judge_candidate_id,dispatch_index),
  check (request_sha256=encode(extensions.digest(request_payload_text,'sha256'),'hex')),
  check (system_prompt_sha256=encode(extensions.digest(system_prompt_text,'sha256'),'hex')),
  check (user_payload_sha256=encode(extensions.digest(user_payload_text,'sha256'),'hex'))
);

create table if not exists private.tcj_qualification_responses (
  id bigint generated always as identity primary key,
  dispatch_id bigint not null unique references private.tcj_qualification_dispatches(id),
  http_status integer,
  provider_response_text text not null,
  provider_response_sha256 text not null check (length(provider_response_sha256)=64),
  finish_reason text,
  assistant_output_text text,
  assistant_output_sha256 text check (assistant_output_sha256 is null or length(assistant_output_sha256)=64),
  parsed_output jsonb,
  outcome_class text not null check (outcome_class in ('valid','invalid_schema','length','empty','provider_failure')),
  error_code text,
  usage jsonb not null default '{}'::jsonb check (jsonb_typeof(usage)='object'),
  latency_ms integer,
  created_at timestamptz not null default pg_catalog.now(),
  check (provider_response_sha256=encode(extensions.digest(provider_response_text,'sha256'),'hex')),
  check ((assistant_output_text is null and assistant_output_sha256 is null) or assistant_output_sha256=encode(extensions.digest(assistant_output_text,'sha256'),'hex'))
);

create index if not exists tcj_qualification_dispatches_run_cell_idx
  on private.tcj_qualification_dispatches(run_id,evidence_item_id,judge_candidate_id,dispatch_index);
create index if not exists tcj_qualification_responses_dispatch_idx
  on private.tcj_qualification_responses(dispatch_id);

alter table private.tcj_qualification_dispatches enable row level security;
alter table private.tcj_qualification_responses enable row level security;
revoke all on private.tcj_qualification_dispatches from anon,authenticated;
revoke all on private.tcj_qualification_responses from anon,authenticated;
revoke all on sequence private.tcj_qualification_dispatches_id_seq from anon,authenticated;
revoke all on sequence private.tcj_qualification_responses_id_seq from anon,authenticated;

create or replace function private.tcj_reject_qualification_v2_evidence_mutation()
returns trigger language plpgsql set search_path='pg_catalog','private' as $$
begin
  raise exception 'qualification_v2_evidence_append_only';
end $$;
revoke execute on function private.tcj_reject_qualification_v2_evidence_mutation() from public,anon,authenticated;

drop trigger if exists tcj_qualification_dispatches_append_only_trg on private.tcj_qualification_dispatches;
create trigger tcj_qualification_dispatches_append_only_trg
before update or delete on private.tcj_qualification_dispatches
for each row execute function private.tcj_reject_qualification_v2_evidence_mutation();

drop trigger if exists tcj_qualification_responses_append_only_trg on private.tcj_qualification_responses;
create trigger tcj_qualification_responses_append_only_trg
before update or delete on private.tcj_qualification_responses
for each row execute function private.tcj_reject_qualification_v2_evidence_mutation();

alter table private.tcj_qualification_run_incidents
  add column if not exists dispatch_id bigint references private.tcj_qualification_dispatches(id),
  add column if not exists artifact_text text,
  add column if not exists artifact_sha256 text;

do $$ begin
  if not exists (
    select 1 from pg_constraint where conname='tcj_qualification_run_incidents_artifact_hash_check'
      and conrelid='private.tcj_qualification_run_incidents'::regclass
  ) then
    alter table private.tcj_qualification_run_incidents
      add constraint tcj_qualification_run_incidents_artifact_hash_check
      check (
        (artifact_text is null and artifact_sha256 is null)
        or (artifact_text is not null and artifact_sha256=encode(extensions.digest(artifact_text,'sha256'),'hex'))
      );
  end if;
end $$;

create or replace function private.tcj_fill_qualification_exact_request_text()
returns trigger
language plpgsql
set search_path='pg_catalog','private'
as $$
begin
  if new.request_payload_text is null then
    new.request_payload_text := private.tcj_qualification_request_text(new.request_payload);
  end if;
  if new.system_prompt_text is null then
    new.system_prompt_text := new.request_payload #>> '{messages,0,content}';
  end if;
  if new.user_payload_text is null then
    new.user_payload_text := new.request_payload #>> '{messages,1,content}';
  end if;
  return new;
end $$;
revoke execute on function private.tcj_fill_qualification_exact_request_text() from public,anon,authenticated;

with src as (
  select p.id protocol_id,p.threshold_sha256,p.human_manifest_sha256,s.manifest_sha256 evidence_manifest_sha256,a.id campaign_id,
         jsonb_build_object(
           'run_protocol_version','TCJ-JUDGE-QUALIFICATION-RUN-v2',
           'prompt_version','TCJ-ANSWERS-BFF-v2@TCJ-CORE-v1',
           'canonical_core_version','TCJ-CORE-v1',
           'canonical_core_blob_sha','459d9831cf439696e0861f85c26839a43f6b6a64',
           'profile_id',p.profile_id,
           'temperature',0,
           'max_completion_tokens',500,
           'response_format','json_object',
           'dispatch_policy','commit_exact_serialized_request_before_provider_fetch',
           'fetch_exception_policy','ambiguous_dispatch_block_no_resend',
           'http_transport_retry_policy','retry_only_after_durable_http_response_with_new_dispatch',
           'repair_policy','one_schema_repair_then_terminal_no_semantic_resample',
           'attempt_ledger_role','secondary_projection_of_durable_dispatch_and_response',
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
  where p.protocol_key='TCJ-JUDGE-QUALIFICATION-2026Q3-v1.1'
    and p.status='bank_frozen' and s.status='frozen'
)
insert into private.tcj_qualification_runs(
  run_key,protocol_id,campaign_id,status,run_protocol_version,prompt_version,config,config_sha256,
  threshold_sha256,human_manifest_sha256,evidence_manifest_sha256,expected_cells
)
select 'TCJ-JUDGE-QUALIFICATION-RUN-2026Q3-v1.1',protocol_id,campaign_id,'frozen',
       'TCJ-JUDGE-QUALIFICATION-RUN-v2','TCJ-ANSWERS-BFF-v2@TCJ-CORE-v1',cfg,
       encode(extensions.digest(cfg::text,'sha256'),'hex'),threshold_sha256,human_manifest_sha256,evidence_manifest_sha256,144
from src
on conflict(run_key) do nothing;

create or replace function private.tcj_authorize_qualification_exposure_statement()
returns trigger
language plpgsql
security definer
set search_path=pg_catalog,private
as $$
declare
  v_run_key text;
  v_set_id bigint;
  v_ok boolean;
begin
  v_run_key:=pg_catalog.current_setting('tcj.qualification_target_run',true);
  if v_run_key is null or v_run_key='' then
    perform pg_catalog.set_config('tcj.qualification_exposure_transition','',true);
    return null;
  end if;

  select p.evidence_set_id, exists(
    select 1
    from private.tcj_qualification_runs r
    join private.tcj_qualification_protocols p2 on p2.id=r.protocol_id
    join private.tcj_evidence_sets s on s.id=p2.evidence_set_id
    where r.run_key=v_run_key
      and r.status='frozen'
      and p2.status='bank_frozen'
      and s.status='frozen'
      and r.config_sha256=encode(extensions.digest(r.config::text,'sha256'),'hex')
      and r.threshold_sha256=p2.threshold_sha256
      and r.human_manifest_sha256=p2.human_manifest_sha256
      and r.evidence_manifest_sha256=s.manifest_sha256
      and (select count(*) from private.tcj_evidence_items i where i.evidence_set_id=p2.evidence_set_id and i.exposure_state='private')=48
      and (select count(*) from private.tcj_evidence_items i where i.evidence_set_id=p2.evidence_set_id and i.exposure_state='qualification_exposed')=0
      and not exists(select 1 from private.tcj_qualification_dispatches d where d.run_id=r.id)
      and not exists(select 1 from private.tcj_qualification_responses x join private.tcj_qualification_dispatches d on d.id=x.dispatch_id where d.run_id=r.id)
      and not exists(select 1 from private.tcj_qualification_attempts a where a.run_id=r.id)
      and not exists(select 1 from private.tcj_qualification_judgments j where j.run_id=r.id)
      and not exists(select 1 from private.tcj_qualification_failures f where f.run_id=r.id)
  )
  into v_set_id,v_ok
  from private.tcj_qualification_runs r0
  join private.tcj_qualification_protocols p on p.id=r0.protocol_id
  where r0.run_key=v_run_key;

  perform pg_catalog.set_config('tcj.qualification_exposure_transition',case when v_ok then coalesce(v_set_id::text,'') else '' end,true);
  return null;
end;
$$;
revoke all on function private.tcj_authorize_qualification_exposure_statement() from public,anon,authenticated;

drop trigger if exists tcj_qualification_exposure_statement_gate_trg on private.tcj_evidence_items;
create trigger tcj_qualification_exposure_statement_gate_trg
before update on private.tcj_evidence_items
for each statement execute function private.tcj_authorize_qualification_exposure_statement();

create or replace function private.tcj_prevent_frozen_qualification_item_mutation()
returns trigger
language plpgsql
security definer
set search_path=pg_catalog,private
as $$
declare
  v_status text;
  v_bank text;
  v_authorized text;
begin
  select s.status,s.bank into v_status,v_bank from private.tcj_evidence_sets s where s.id=old.evidence_set_id;
  if v_bank='qualification' and v_status in ('frozen','active','retired','compromised') then
    if tg_op='UPDATE' then
      v_authorized:=pg_catalog.current_setting('tcj.qualification_exposure_transition',true);
      if v_authorized=old.evidence_set_id::text
         and old.exposure_state='private'
         and new.exposure_state='qualification_exposed'
         and new.id is not distinct from old.id
         and new.evidence_set_id is not distinct from old.evidence_set_id
         and new.item_key is not distinct from old.item_key
         and new.phenomenon is not distinct from old.phenomenon
         and new.scenario_text is not distinct from old.scenario_text
         and new.candidate_text is not distinct from old.candidate_text
         and new.scenario_sha256 is not distinct from old.scenario_sha256
         and new.candidate_sha256 is not distinct from old.candidate_sha256
         and new.gold is not distinct from old.gold
         and new.provenance is not distinct from old.provenance
         and new.source_table is not distinct from old.source_table
         and new.source_id is not distinct from old.source_id
         and new.exposure_note is not distinct from old.exposure_note
         and new.created_at is not distinct from old.created_at
      then
        return new;
      end if;
    end if;
    raise exception 'frozen_qualification_item_immutable';
  end if;
  return case when tg_op='DELETE' then old else new end;
end;
$$;
revoke all on function private.tcj_prevent_frozen_qualification_item_mutation() from public,anon,authenticated;

create or replace function private.tcj_record_qualification_exposure_statement()
returns trigger
language plpgsql
security definer
set search_path=pg_catalog,private,extensions
as $$
declare
  v_run_key text;
  r private.tcj_qualification_runs%rowtype;
  p private.tcj_qualification_protocols%rowtype;
  v_changed integer;
  v_event_sha text;
begin
  v_run_key:=pg_catalog.current_setting('tcj.qualification_target_run',true);
  if v_run_key is null or v_run_key='' then return null; end if;
  select qr.* into r from private.tcj_qualification_runs qr where qr.run_key=v_run_key;
  if not found then return null; end if;
  select qp.* into p from private.tcj_qualification_protocols qp where qp.id=r.protocol_id;

  select count(*)::int into v_changed
  from old_rows o join new_rows n on n.id=o.id
  where o.evidence_set_id=p.evidence_set_id
    and o.exposure_state='private' and n.exposure_state='qualification_exposed';
  if v_changed=0 then return null; end if;
  if v_changed<>48 then raise exception 'qualification_exposure_atomic_count_gate:%',v_changed; end if;

  if exists(
    select 1 from old_rows o join new_rows n on n.id=o.id
    where o.evidence_set_id=p.evidence_set_id and (
      n.evidence_set_id is distinct from o.evidence_set_id or n.item_key is distinct from o.item_key or
      n.phenomenon is distinct from o.phenomenon or n.scenario_text is distinct from o.scenario_text or
      n.candidate_text is distinct from o.candidate_text or n.scenario_sha256 is distinct from o.scenario_sha256 or
      n.candidate_sha256 is distinct from o.candidate_sha256 or n.gold is distinct from o.gold or
      n.provenance is distinct from o.provenance or n.source_table is distinct from o.source_table or
      n.source_id is distinct from o.source_id or n.exposure_note is distinct from o.exposure_note or
      n.created_at is distinct from o.created_at
    )
  ) then raise exception 'qualification_exposure_content_mutation_gate'; end if;

  v_event_sha:=encode(extensions.digest(jsonb_build_object(
    'run_id',r.id,'evidence_set_id',p.evidence_set_id,'item_count',48,
    'from_state','private','to_state','qualification_exposed',
    'config_sha256',r.config_sha256,'threshold_sha256',r.threshold_sha256,
    'human_manifest_sha256',r.human_manifest_sha256,'evidence_manifest_sha256',r.evidence_manifest_sha256
  )::text,'sha256'),'hex');

  insert into private.tcj_qualification_exposure_events(
    run_id,evidence_set_id,item_count,from_state,to_state,config_sha256,threshold_sha256,
    human_manifest_sha256,evidence_manifest_sha256,event_sha256
  ) values(
    r.id,p.evidence_set_id,48,'private','qualification_exposed',r.config_sha256,r.threshold_sha256,
    r.human_manifest_sha256,r.evidence_manifest_sha256,v_event_sha
  ) on conflict(run_id) do nothing;

  if exists(select 1 from private.tcj_qualification_exposure_events e where e.run_id=r.id and e.event_sha256<>v_event_sha) then
    raise exception 'qualification_exposure_event_hash_gate';
  end if;
  return null;
end;
$$;
revoke all on function private.tcj_record_qualification_exposure_statement() from public,anon,authenticated;

drop trigger if exists tcj_qualification_exposure_event_trg on private.tcj_evidence_items;
create trigger tcj_qualification_exposure_event_trg
after update on private.tcj_evidence_items
referencing old table as old_rows new table as new_rows
for each statement execute function private.tcj_record_qualification_exposure_statement();

create or replace function private.tcj_begin_qualification_exposure_v2(p_run_key text)
returns jsonb
language plpgsql
security definer
set search_path=pg_catalog,private,extensions
as $$
declare
  r private.tcj_qualification_runs%rowtype;
  p private.tcj_qualification_protocols%rowtype;
  s private.tcj_evidence_sets%rowtype;
  v_private integer;
  v_exposed integer;
  v_changed integer;
  v_now timestamptz:=pg_catalog.now();
begin
  select * into r from private.tcj_qualification_runs where run_key=p_run_key for update;
  if not found then raise exception 'qualification_run_missing'; end if;
  select * into p from private.tcj_qualification_protocols where id=r.protocol_id for update;
  select * into s from private.tcj_evidence_sets where id=p.evidence_set_id for update;

  if r.config_sha256<>encode(extensions.digest(r.config::text,'sha256'),'hex') then raise exception 'qualification_config_hash_gate'; end if;
  if r.threshold_sha256<>p.threshold_sha256 or r.human_manifest_sha256<>p.human_manifest_sha256 or r.evidence_manifest_sha256<>s.manifest_sha256 then
    raise exception 'qualification_source_manifest_gate';
  end if;

  if r.status='running' and p.status='running' then
    select count(*)::int into v_exposed from private.tcj_evidence_items i where i.evidence_set_id=p.evidence_set_id and i.exposure_state='qualification_exposed';
    if v_exposed=48 and exists(select 1 from private.tcj_qualification_exposure_events e where e.run_id=r.id) then
      return jsonb_build_object('status','running','items',48,'already_exposed',true);
    end if;
    raise exception 'qualification_running_state_inconsistent';
  end if;

  if r.status<>'frozen' or p.status<>'bank_frozen' or s.status<>'frozen' then
    raise exception 'qualification_exposure_state_gate:%/%/%',r.status,p.status,s.status;
  end if;
  if exists(select 1 from private.tcj_qualification_dispatches d where d.run_id=r.id)
     or exists(select 1 from private.tcj_qualification_attempts a where a.run_id=r.id)
     or exists(select 1 from private.tcj_qualification_judgments j where j.run_id=r.id)
     or exists(select 1 from private.tcj_qualification_failures f where f.run_id=r.id)
  then raise exception 'qualification_pre_exposure_evidence_gate'; end if;

  select count(*)::int into v_private from private.tcj_evidence_items i where i.evidence_set_id=p.evidence_set_id and i.exposure_state='private';
  select count(*)::int into v_exposed from private.tcj_evidence_items i where i.evidence_set_id=p.evidence_set_id and i.exposure_state='qualification_exposed';
  if v_private<>48 or v_exposed<>0 then raise exception 'qualification_pre_exposure_count_gate:%/%',v_private,v_exposed; end if;

  perform pg_catalog.set_config('tcj.qualification_target_run',p_run_key,true);
  update private.tcj_evidence_items set exposure_state='qualification_exposed'
   where evidence_set_id=p.evidence_set_id and exposure_state='private';
  get diagnostics v_changed=row_count;
  if v_changed<>48 then raise exception 'qualification_exposure_update_count_gate:%',v_changed; end if;

  if not exists(select 1 from private.tcj_qualification_exposure_events e where e.run_id=r.id) then
    raise exception 'qualification_exposure_event_missing';
  end if;

  update private.tcj_qualification_runs set status='running',started_at=coalesce(started_at,v_now)
   where id=r.id and status='frozen';
  if not found then raise exception 'qualification_run_start_transition_gate'; end if;
  update private.tcj_qualification_protocols set status='running',run_started_at=coalesce(run_started_at,v_now)
   where id=p.id and status='bank_frozen';
  if not found then raise exception 'qualification_protocol_start_transition_gate'; end if;

  return jsonb_build_object('status','running','items',48,'run_key',p_run_key);
end;
$$;
revoke all on function private.tcj_begin_qualification_exposure_v2(text) from public,anon,authenticated;
