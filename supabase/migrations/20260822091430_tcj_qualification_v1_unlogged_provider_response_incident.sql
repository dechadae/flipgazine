create table if not exists private.tcj_qualification_run_incidents (
  id bigint generated always as identity primary key,
  run_id bigint not null references private.tcj_qualification_runs(id),
  incident_key text not null unique,
  incident_class text not null check (incident_class in ('unlogged_provider_response','ambiguous_dispatch','adapter_contract','infrastructure')),
  severity text not null check (severity in ('warning','blocking','compromising')),
  evidence_item_id bigint references private.tcj_evidence_items(id),
  judge_candidate_id bigint references private.tcj_judge_candidates(id),
  provider_call_reached boolean not null default false,
  exact_request_preserved boolean not null default false,
  exact_response_preserved boolean not null default false,
  details jsonb not null default '{}'::jsonb check (jsonb_typeof(details)='object'),
  incident_sha256 text not null check (length(incident_sha256)=64),
  created_at timestamptz not null default pg_catalog.now()
);

alter table private.tcj_qualification_run_incidents enable row level security;
revoke all on private.tcj_qualification_run_incidents from anon,authenticated;
revoke all on sequence private.tcj_qualification_run_incidents_id_seq from anon,authenticated;

create or replace function private.tcj_reject_qualification_incident_mutation()
returns trigger language plpgsql set search_path='pg_catalog','private' as $$
begin
  raise exception 'qualification_incident_append_only';
end $$;
revoke execute on function private.tcj_reject_qualification_incident_mutation() from public,anon,authenticated;

drop trigger if exists tcj_qualification_run_incidents_append_only_trg on private.tcj_qualification_run_incidents;
create trigger tcj_qualification_run_incidents_append_only_trg
before update or delete on private.tcj_qualification_run_incidents
for each row execute function private.tcj_reject_qualification_incident_mutation();

with x as (
  select r.id run_id,i.id evidence_item_id,j.id judge_candidate_id,
         jsonb_build_object(
           'run_key',r.run_key,
           'item_key',i.item_key,
           'opaque_candidate_id',j.opaque_candidate_id,
           'provider',j.provider,
           'model_name',j.model_name,
           'edge_function_version',1,
           'edge_http_status',503,
           'postgres_error','tcj_qualification_attempts_exact_request_text_check',
           'observed_at_utc','2026-08-22T09:10:36Z',
           'reason','Provider response was received in Edge Function memory, then attempt-row insertion was rejected by the exact-request hash CHECK. No immutable attempt/response row exists, so the response cannot be used as qualification evidence.',
           'research_disposition','Block run; preserve exposure event; do not retry this cell as equivalent evidence.'
         ) details
  from private.tcj_qualification_runs r
  join private.tcj_qualification_protocols p on p.id=r.protocol_id
  join private.tcj_evidence_items i on i.evidence_set_id=p.evidence_set_id and i.item_key='QF-BFF-01'
  join private.tcj_admission_campaign_candidates cc on cc.campaign_id=r.campaign_id
  join private.tcj_judge_candidates j on j.id=cc.judge_candidate_id and j.opaque_candidate_id='J-57BE65E2'
  where r.run_key='TCJ-JUDGE-QUALIFICATION-RUN-2026Q3-v1'
)
insert into private.tcj_qualification_run_incidents(
  run_id,incident_key,incident_class,severity,evidence_item_id,judge_candidate_id,
  provider_call_reached,exact_request_preserved,exact_response_preserved,details,incident_sha256
)
select run_id,'TCJ-Q-RUN-2026Q3-v1-INC-001','unlogged_provider_response','compromising',evidence_item_id,judge_candidate_id,
       true,false,false,details,
       encode(extensions.digest(jsonb_build_object(
         'incident_key','TCJ-Q-RUN-2026Q3-v1-INC-001',
         'run_id',run_id,
         'evidence_item_id',evidence_item_id,
         'judge_candidate_id',judge_candidate_id,
         'provider_call_reached',true,
         'exact_request_preserved',false,
         'exact_response_preserved',false,
         'details',details
       )::text,'sha256'),'hex')
from x
on conflict(incident_key) do nothing;

update private.tcj_qualification_runs
set status='blocked'
where run_key='TCJ-JUDGE-QUALIFICATION-RUN-2026Q3-v1' and status='running';

update private.tcj_qualification_protocols
set status='compromised'
where protocol_key='TCJ-JUDGE-QUALIFICATION-2026Q3-v1' and status='running';

update private.tcj_evidence_sets
set status='compromised'
where set_key='TCJ-JUDGE-QUALIFICATION-v1' and status='frozen';