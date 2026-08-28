create or replace function private.tcj_authorize_qualification_exposure_statement()
returns trigger
language plpgsql
security definer
set search_path=pg_catalog,private
as $$
declare
  v_ok boolean;
begin
  select exists(
    select 1
    from private.tcj_qualification_runs r
    join private.tcj_qualification_protocols p on p.id=r.protocol_id
    join private.tcj_evidence_sets s on s.id=p.evidence_set_id
    where r.run_key='TCJ-JUDGE-QUALIFICATION-RUN-2026Q3-v1'
      and r.status='frozen'
      and p.status='bank_frozen'
      and s.status='frozen'
      and r.config_sha256=encode(extensions.digest(r.config::text,'sha256'),'hex')
      and r.threshold_sha256=p.threshold_sha256
      and r.human_manifest_sha256=p.human_manifest_sha256
      and r.evidence_manifest_sha256=s.manifest_sha256
      and (select count(*) from private.tcj_evidence_items i where i.evidence_set_id=p.evidence_set_id and i.exposure_state='private')=48
      and (select count(*) from private.tcj_evidence_items i where i.evidence_set_id=p.evidence_set_id and i.exposure_state='qualification_exposed')=0
      and not exists(select 1 from private.tcj_qualification_attempts a where a.run_id=r.id)
      and not exists(select 1 from private.tcj_qualification_judgments j where j.run_id=r.id)
      and not exists(select 1 from private.tcj_qualification_failures f where f.run_id=r.id)
  ) into v_ok;

  perform pg_catalog.set_config('tcj.qualification_exposure_transition',case when v_ok then '1' else '0' end,true);
  return null;
end;
$$;
revoke all on function private.tcj_authorize_qualification_exposure_statement() from public,anon,authenticated;

drop trigger if exists tcj_qualification_exposure_statement_gate_trg on private.tcj_evidence_items;
create trigger tcj_qualification_exposure_statement_gate_trg
before update on private.tcj_evidence_items
for each statement execute function private.tcj_authorize_qualification_exposure_statement();

create or replace function private.tcj_record_qualification_exposure_statement()
returns trigger
language plpgsql
security definer
set search_path=pg_catalog,private,extensions
as $$
declare
  r private.tcj_qualification_runs%rowtype;
  p private.tcj_qualification_protocols%rowtype;
  v_changed integer;
  v_event_sha text;
begin
  select qr.* into r
  from private.tcj_qualification_runs qr
  where qr.run_key='TCJ-JUDGE-QUALIFICATION-RUN-2026Q3-v1';
  if not found then return null; end if;
  select qp.* into p from private.tcj_qualification_protocols qp where qp.id=r.protocol_id;

  select count(*)::int into v_changed
  from old_rows o
  join new_rows n on n.id=o.id
  where o.evidence_set_id=p.evidence_set_id
    and o.exposure_state='private'
    and n.exposure_state='qualification_exposed';

  if v_changed=0 then return null; end if;
  if v_changed<>48 then raise exception 'qualification_exposure_atomic_count_gate:%',v_changed; end if;

  if exists(
    select 1 from old_rows o join new_rows n on n.id=o.id
    where o.evidence_set_id=p.evidence_set_id
      and (
        n.evidence_set_id is distinct from o.evidence_set_id or
        n.item_key is distinct from o.item_key or
        n.phenomenon is distinct from o.phenomenon or
        n.scenario_text is distinct from o.scenario_text or
        n.candidate_text is distinct from o.candidate_text or
        n.scenario_sha256 is distinct from o.scenario_sha256 or
        n.candidate_sha256 is distinct from o.candidate_sha256 or
        n.gold is distinct from o.gold or
        n.provenance is distinct from o.provenance or
        n.source_table is distinct from o.source_table or
        n.source_id is distinct from o.source_id or
        n.exposure_note is distinct from o.exposure_note or
        n.created_at is distinct from o.created_at
      )
  ) then raise exception 'qualification_exposure_content_mutation_gate'; end if;

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
    run_id,evidence_set_id,item_count,from_state,to_state,config_sha256,threshold_sha256,human_manifest_sha256,evidence_manifest_sha256,event_sha256
  ) values(
    r.id,p.evidence_set_id,48,'private','qualification_exposed',r.config_sha256,r.threshold_sha256,r.human_manifest_sha256,r.evidence_manifest_sha256,v_event_sha
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