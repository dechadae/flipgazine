create table if not exists private.tcj_qualification_exposure_events (
  id bigint generated always as identity primary key,
  run_id bigint not null unique references private.tcj_qualification_runs(id),
  evidence_set_id bigint not null references private.tcj_evidence_sets(id),
  item_count integer not null check (item_count=48),
  from_state text not null check (from_state='private'),
  to_state text not null check (to_state='qualification_exposed'),
  config_sha256 text not null check (length(config_sha256)=64),
  threshold_sha256 text not null check (length(threshold_sha256)=64),
  human_manifest_sha256 text not null check (length(human_manifest_sha256)=64),
  evidence_manifest_sha256 text not null check (length(evidence_manifest_sha256)=64),
  event_sha256 text not null check (length(event_sha256)=64),
  exposed_at timestamptz not null default pg_catalog.now()
);

alter table private.tcj_qualification_exposure_events enable row level security;
revoke all on private.tcj_qualification_exposure_events from anon,authenticated;
revoke all on sequence private.tcj_qualification_exposure_events_id_seq from anon,authenticated;

create or replace function private.tcj_prevent_frozen_qualification_item_mutation()
returns trigger
language plpgsql
security definer
set search_path=pg_catalog,private
as $$
declare
  v_status text;
  v_key text;
  v_authorized text;
begin
  select s.status,s.set_key into v_status,v_key
  from private.tcj_evidence_sets s where s.id=old.evidence_set_id;

  if v_key='TCJ-JUDGE-QUALIFICATION-v1' and v_status in ('frozen','active','retired','compromised') then
    if tg_op='UPDATE' then
      v_authorized:=pg_catalog.current_setting('tcj.qualification_exposure_transition',true);
      if v_authorized='1'
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

create or replace function private.tcj_begin_qualification_exposure(p_run_key text)
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
  v_attempts integer;
  v_judgments integer;
  v_failures integer;
  v_changed integer;
  v_event_sha text;
  v_now timestamptz:=pg_catalog.now();
begin
  select * into r from private.tcj_qualification_runs where run_key=p_run_key for update;
  if not found then raise exception 'qualification_run_missing'; end if;
  select * into p from private.tcj_qualification_protocols where id=r.protocol_id for update;
  select * into s from private.tcj_evidence_sets where id=p.evidence_set_id for update;

  if r.config_sha256<>encode(extensions.digest(r.config::text,'sha256'),'hex') then
    raise exception 'qualification_config_hash_gate';
  end if;
  if r.threshold_sha256<>p.threshold_sha256
     or r.human_manifest_sha256<>p.human_manifest_sha256
     or r.evidence_manifest_sha256<>s.manifest_sha256 then
    raise exception 'qualification_source_manifest_gate';
  end if;

  select count(*)::int into v_attempts from private.tcj_qualification_attempts a where a.run_id=r.id;
  select count(*)::int into v_judgments from private.tcj_qualification_judgments j where j.run_id=r.id;
  select count(*)::int into v_failures from private.tcj_qualification_failures f where f.run_id=r.id;

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
  if v_attempts<>0 or v_judgments<>0 or v_failures<>0 then
    raise exception 'qualification_pre_exposure_evidence_gate:a%,j%,f%',v_attempts,v_judgments,v_failures;
  end if;

  select count(*)::int into v_private from private.tcj_evidence_items i where i.evidence_set_id=p.evidence_set_id and i.exposure_state='private';
  select count(*)::int into v_exposed from private.tcj_evidence_items i where i.evidence_set_id=p.evidence_set_id and i.exposure_state='qualification_exposed';
  if v_private<>48 or v_exposed<>0 then raise exception 'qualification_pre_exposure_count_gate:%/%',v_private,v_exposed; end if;

  perform pg_catalog.set_config('tcj.qualification_exposure_transition','1',true);
  update private.tcj_evidence_items
     set exposure_state='qualification_exposed'
   where evidence_set_id=p.evidence_set_id and exposure_state='private';
  get diagnostics v_changed = row_count;
  if v_changed<>48 then raise exception 'qualification_exposure_update_count_gate:%',v_changed; end if;

  v_event_sha:=encode(extensions.digest(jsonb_build_object(
    'run_id',r.id,
    'evidence_set_id',p.evidence_set_id,
    'item_count',48,
    'from_state','private',
    'to_state','qualification_exposed',
    'config_sha256',r.config_sha256,
    'threshold_sha256',r.threshold_sha256,
    'human_manifest_sha256',r.human_manifest_sha256,
    'evidence_manifest_sha256',r.evidence_manifest_sha256
  )::text,'sha256'),'hex');

  insert into private.tcj_qualification_exposure_events(
    run_id,evidence_set_id,item_count,from_state,to_state,config_sha256,threshold_sha256,human_manifest_sha256,evidence_manifest_sha256,event_sha256,exposed_at
  ) values(
    r.id,p.evidence_set_id,48,'private','qualification_exposed',r.config_sha256,r.threshold_sha256,r.human_manifest_sha256,r.evidence_manifest_sha256,v_event_sha,v_now
  );

  update private.tcj_qualification_runs
     set status='running',started_at=coalesce(started_at,v_now)
   where id=r.id and status='frozen';
  if not found then raise exception 'qualification_run_start_transition_gate'; end if;

  update private.tcj_qualification_protocols
     set status='running',run_started_at=coalesce(run_started_at,v_now)
   where id=p.id and status='bank_frozen';
  if not found then raise exception 'qualification_protocol_start_transition_gate'; end if;

  return jsonb_build_object(
    'status','running',
    'items',48,
    'event_sha256',v_event_sha,
    'config_sha256',r.config_sha256,
    'threshold_sha256',r.threshold_sha256,
    'human_manifest_sha256',r.human_manifest_sha256,
    'evidence_manifest_sha256',r.evidence_manifest_sha256
  );
end;
$$;
revoke all on function private.tcj_begin_qualification_exposure(text) from public,anon,authenticated;