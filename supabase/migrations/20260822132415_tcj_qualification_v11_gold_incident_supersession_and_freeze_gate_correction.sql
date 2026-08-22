create table if not exists private.tcj_qualification_incident_supersessions (
  id bigint generated always as identity primary key,
  run_id bigint not null references private.tcj_qualification_runs(id),
  incident_id bigint not null unique references private.tcj_qualification_run_incidents(id),
  supersession_key text not null unique,
  reason text not null,
  replacement_interpretation text not null,
  record_sha256 text not null check (length(record_sha256)=64),
  created_at timestamptz not null default now()
);

create or replace function private.tcj_reject_incident_supersession_mutation()
returns trigger language plpgsql set search_path to 'pg_catalog','private' as $$
begin
  raise exception 'qualification_incident_supersession_append_only';
end $$;

drop trigger if exists tcj_qualification_incident_supersessions_append_only_trg on private.tcj_qualification_incident_supersessions;
create trigger tcj_qualification_incident_supersessions_append_only_trg
before update or delete on private.tcj_qualification_incident_supersessions
for each row execute function private.tcj_reject_incident_supersession_mutation();

insert into private.tcj_qualification_incident_supersessions(run_id,incident_id,supersession_key,reason,replacement_interpretation,record_sha256)
select i.run_id,i.id,
       'TCJ-Q-RUN-2026Q3-v1.1-SUPERSEDE-GOLD-001',
       'The incident was created from an invalid audit inference: constructed_likely_problematic is design metadata, not ground truth. The native-human frozen review remains authoritative unless a mechanical integrity defect is demonstrated.',
       'Qualification v1.1 remains a valid completed Qualification run. Its result is that the tested candidate judges did not meet preregistered production-authority thresholds. The exposed run may now be used as research/development evidence for judge improvement, but any modified judge configuration requires a fresh hidden Qualification bank for authority.',
       encode(extensions.digest(
         i.run_id::text||':'||i.id::text||':TCJ-Q-RUN-2026Q3-v1.1-SUPERSEDE-GOLD-001:'||
         'The incident was created from an invalid audit inference: constructed_likely_problematic is design metadata, not ground truth. The native-human frozen review remains authoritative unless a mechanical integrity defect is demonstrated.'||':'||
         'Qualification v1.1 remains a valid completed Qualification run. Its result is that the tested candidate judges did not meet preregistered production-authority thresholds. The exposed run may now be used as research/development evidence for judge improvement, but any modified judge configuration requires a fresh hidden Qualification bank for authority.',
         'sha256'),'hex')
from private.tcj_qualification_run_incidents i
where i.incident_key='TCJ-Q-RUN-2026Q3-v1.1-INC-GOLD-001'
on conflict (incident_id) do nothing;

create or replace function private.tcj_freeze_qualification_bank(p_protocol_key text, p_actor_user_id uuid default null)
returns jsonb
language plpgsql
security definer
set search_path to 'pg_catalog','private','extensions'
as $$
declare
  p private.tcj_qualification_protocols%rowtype;
  s private.tcj_evidence_sets%rowtype;
  v_items integer;
  v_reviews integer;
  v_bad integer;
  v_evidence_manifest text;
  v_human_manifest text;
begin
  select * into p from private.tcj_qualification_protocols where protocol_key=p_protocol_key for update;
  if not found then raise exception 'qualification_protocol_missing'; end if;
  select * into s from private.tcj_evidence_sets where id=p.evidence_set_id for update;
  if p.status='bank_frozen' and s.status='frozen' then
    return jsonb_build_object('status','bank_frozen','items',p.item_target,'human_manifest_sha256',p.human_manifest_sha256,'evidence_manifest_sha256',s.manifest_sha256,'threshold_sha256',p.threshold_sha256);
  end if;
  if p.status<>'draft_review' or s.status<>'draft' then raise exception 'qualification_freeze_state_gate:%/%',p.status,s.status; end if;

  select count(*)::int into v_items from private.tcj_evidence_items i where i.evidence_set_id=p.evidence_set_id;
  if v_items<>p.item_target then raise exception 'qualification_item_count_gate:%',v_items; end if;
  select count(*)::int into v_reviews from private.tcj_qualification_human_reviews r where r.protocol_id=p.id and r.review_state='draft';
  if v_reviews<>p.item_target then raise exception 'qualification_human_review_count_gate:%',v_reviews; end if;

  select count(*)::int into v_bad
  from private.tcj_evidence_items i
  join private.tcj_qualification_human_reviews r on r.evidence_item_id=i.id and r.protocol_id=p.id
  where i.evidence_set_id=p.evidence_set_id and (
       i.exposure_state<>'private'
    or i.scenario_sha256<>encode(extensions.digest(i.scenario_text,'sha256'),'hex')
    or i.candidate_sha256<>encode(extensions.digest(i.candidate_text,'sha256'),'hex')
    or r.scenario_sha256<>i.scenario_sha256
    or r.candidate_sha256<>i.candidate_sha256
    or r.review_sha256<>private.tcj_qualification_review_hash(r.final_scenario_text,r.final_candidate_text,r.ratings,r.severity,r.flags,r.confidence,r.human_ambiguous,r.review_note)
    or i.gold<>jsonb_build_object(
      'intent',(r.ratings->>'intent')::int,
      'thai_pragmatics',(r.ratings->>'thai_pragmatics')::int,
      'bff_voice',(r.ratings->>'bff_voice')::int,
      'lexical_social_fit',(r.ratings->>'lexical_social_fit')::int,
      'stance',(r.ratings->>'stance')::int,
      'composition',(r.ratings->>'composition')::int,
      'severity',r.severity,
      'flags',to_jsonb(r.flags),
      'care_mode',false
    )
  );
  if v_bad<>0 then raise exception 'qualification_human_integrity_gate:%',v_bad; end if;

  select encode(extensions.digest(string_agg(
    i.item_key||':'||i.scenario_sha256||':'||i.candidate_sha256||':'||encode(extensions.digest(i.gold::text,'sha256'),'hex')||':'||r.review_sha256,
    '|' order by i.item_key
  ),'sha256'),'hex') into v_evidence_manifest
  from private.tcj_evidence_items i
  join private.tcj_qualification_human_reviews r on r.evidence_item_id=i.id and r.protocol_id=p.id
  where i.evidence_set_id=p.evidence_set_id;

  v_human_manifest:=encode(extensions.digest(v_evidence_manifest||':'||p.threshold_sha256,'sha256'),'hex');

  update private.tcj_qualification_human_reviews
     set review_state='frozen',frozen_at=pg_catalog.now(),updated_at=pg_catalog.now()
   where protocol_id=p.id and review_state='draft';
  update private.tcj_evidence_sets
     set status='frozen',manifest_sha256=v_evidence_manifest,frozen_at=pg_catalog.now()
   where id=p.evidence_set_id and status='draft';
  update private.tcj_qualification_protocols
     set status='bank_frozen',human_manifest_sha256=v_human_manifest,human_review_frozen_at=pg_catalog.now(),bank_frozen_at=pg_catalog.now(),frozen_by=p_actor_user_id
   where id=p.id and status='draft_review';

  return jsonb_build_object('status','bank_frozen','items',v_items,'human_manifest_sha256',v_human_manifest,'evidence_manifest_sha256',v_evidence_manifest,'threshold_sha256',p.threshold_sha256);
end;
$$;

revoke all on table private.tcj_qualification_incident_supersessions from public, anon, authenticated;
grant select,insert on table private.tcj_qualification_incident_supersessions to service_role;
revoke all on function private.tcj_reject_incident_supersession_mutation() from public, anon, authenticated;
grant execute on function private.tcj_reject_incident_supersession_mutation() to service_role;