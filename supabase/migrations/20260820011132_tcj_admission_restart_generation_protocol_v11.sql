do $$
declare
  old_id bigint;
  new_id bigint;
begin
  select id into old_id from private.tcj_admission_campaigns where campaign_key='TCJ-JUDGE-ADMISSION-2026Q3-v1';
  if old_id is null then raise exception 'old admission campaign missing'; end if;
  if exists(select 1 from private.tcj_admission_human_reviews h join private.tcj_admission_generations g on g.id=h.generation_id where g.campaign_id=old_id) then
    raise exception 'cannot restart after human review';
  end if;

  update private.tcj_admission_campaigns set status='aborted' where id=old_id and status<>'aborted';

  insert into private.tcj_admission_campaigns(
    campaign_key,protocol_version,profile_id,status,stage_a_scenario_count,candidate_set_frozen_at,stage_a_frozen_at
  ) values(
    'TCJ-JUDGE-ADMISSION-2026Q3-v1.1','TCJ-JUDGE-ADMISSION-v1.1','answers-bff-v2','candidate_set_frozen',10,pg_catalog.now(),pg_catalog.now()
  )
  on conflict (campaign_key) do update set campaign_key=excluded.campaign_key
  returning id into new_id;

  insert into private.tcj_admission_campaign_candidates(campaign_id,judge_candidate_id)
  select new_id,judge_candidate_id from private.tcj_admission_campaign_candidates where campaign_id=old_id
  on conflict do nothing;

  insert into private.tcj_admission_scenarios(campaign_id,ordinal,scenario_key,scenario_text,scenario_sha256,phenomenon,frozen_at)
  select new_id,ordinal,scenario_key,scenario_text,scenario_sha256,phenomenon,pg_catalog.now()
  from private.tcj_admission_scenarios where campaign_id=old_id
  order by ordinal
  on conflict do nothing;
end $$;
