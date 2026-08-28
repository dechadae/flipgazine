create or replace function private.tcj_assign_preliminary_passports(p_campaign_key text,p_actor_user_id uuid default null)
returns jsonb
language plpgsql
security definer
set search_path=pg_catalog,private,extensions
as $$
declare
  v_campaign private.tcj_admission_campaigns%rowtype;
  v_count integer;
  v_evidence_count integer;
  v_assignment_sha text;
  v_rows jsonb;
begin
  select * into v_campaign from private.tcj_admission_campaigns where campaign_key=p_campaign_key for update;
  if not found then raise exception 'campaign_missing'; end if;
  if v_campaign.status not in ('identity_revealed','complete') or v_campaign.identity_revealed_at is null then raise exception 'passport_assignment_reveal_gate'; end if;
  if not exists(select 1 from private.tcj_admission_identity_reveal_events e where e.campaign_id=v_campaign.id) then raise exception 'passport_assignment_reveal_event_missing'; end if;

  if (select count(*) from private.tcj_admission_meta_reviews m where m.campaign_id=v_campaign.id and m.review_protocol_version='TCJ-JUDGE-META-REVIEW-v1' and m.review_state='valid' and m.frozen_at is not null)<>6 then
    raise exception 'passport_assignment_review_gate';
  end if;

  select
    coalesce((select max((d.dossier#>>'{production_evidence,reviewed_count}')::int) from private.tcj_admission_passport_dossiers d where d.campaign_id=v_campaign.id and d.dossier_version='TCJ-JUDGE-PASSPORT-DOSSIER-v1'),0)
    + coalesce((select max((d.dossier#>>'{judging_evidence,case_count}')::int) from private.tcj_admission_passport_dossiers d where d.campaign_id=v_campaign.id and d.dossier_version='TCJ-JUDGE-PASSPORT-DOSSIER-v1'),0)
    + coalesce((select count(*) from private.tcj_admission_robustness_cases c join private.tcj_admission_robustness_packs p on p.id=c.pack_id where p.campaign_id=v_campaign.id and p.pack_key='TCJ-JUDGE-ROBUSTNESS-2026Q3-v1'),0)
    + coalesce((select count(*) from private.tcj_admission_robustness_cases c join private.tcj_admission_robustness_packs p on p.id=c.pack_id where p.campaign_id=v_campaign.id and p.pack_key='TCJ-JUDGE-ROBUSTNESS-PERTURB-2026Q3-v1'),0)
  into v_evidence_count;

  with src as (
    select d.*,
      (select jsonb_object_agg(m.reviewer_slot,jsonb_build_object(
          'reviewer_provider',m.reviewer_provider,
          'reviewer_model',m.reviewer_model,
          'raw_output_sha256',m.raw_output_sha256,
          'parsed_review_sha256',m.parsed_review_sha256,
          'review',m.parsed_review
        )) from private.tcj_admission_meta_reviews m where m.dossier_id=d.id and m.review_protocol_version='TCJ-JUDGE-META-REVIEW-v1') meta_reviews,
      (select coalesce(jsonb_agg(distinct x.val),'[]'::jsonb)
         from private.tcj_admission_meta_reviews m
         cross join lateral jsonb_array_elements_text(m.parsed_review->'failure_clusters') x(val)
        where m.dossier_id=d.id and m.review_protocol_version='TCJ-JUDGE-META-REVIEW-v1') failure_clusters
    from private.tcj_admission_passport_dossiers d
    where d.campaign_id=v_campaign.id and d.dossier_version='TCJ-JUDGE-PASSPORT-DOSSIER-v1'
  ), built as (
    select s.*,
      jsonb_build_object(
        'judge_candidate_id',s.judge_candidate_id,
        'passport_version','admission-preliminary-v1',
        'profile_id',s.profile_id,
        'admission_protocol_version',s.admission_protocol_version,
        'qualification_state','research_only',
        'evidence_item_count',v_evidence_count,
        'production_evidence',s.dossier->'production_evidence',
        'judging_evidence',(s.dossier->'judging_evidence')||jsonb_build_object('blind_meta_reviews',s.meta_reviews),
        'robustness_evidence',s.dossier->'robustness_evidence',
        'qualified_dimensions','[]'::jsonb,
        'excluded_dimensions',jsonb_build_array('intent','thai_pragmatics','bff_voice','lexical_social_fit','stance','composition'),
        'known_failure_clusters',s.failure_clusters,
        'uncertainty',jsonb_build_object(
          'evidence_class','preliminary_admission_mixed_exposure',
          'clean_holdout',false,
          'hidden_qualification_bank_completed',false,
          'assurance_eligible',false,
          'final_qualification_sufficient',false,
          'production_authority',false,
          'meta_review_consensus','research_only',
          'reviewer_recommendations',jsonb_build_object(
             'chatgpt',s.meta_reviews#>>'{chatgpt,review,overall_recommendation}',
             'grok',s.meta_reviews#>>'{grok,review,overall_recommendation}'
          ),
          'reviewer_dimension_recommendations',jsonb_build_object(
             'chatgpt',s.meta_reviews#>'{chatgpt,review,dimension_recommendations}',
             'grok',s.meta_reviews#>'{grok,review,dimension_recommendations}'
          )
        ),
        'requalification_condition','Complete a fresh hidden Qualification Bank under a versioned blind protocol before any production authority; Assurance remains separately required.'
      ) canonical
    from src s
  )
  insert into private.tcj_judge_passports(
    judge_candidate_id,passport_version,profile_id,admission_protocol_version,qualification_state,evidence_set_id,evidence_item_count,
    production_evidence,judging_evidence,robustness_evidence,qualified_dimensions,excluded_dimensions,known_failure_clusters,uncertainty,
    qualified_at,expires_at,requalification_condition,passport_sha256,frozen_at
  )
  select judge_candidate_id,'admission-preliminary-v1',profile_id,admission_protocol_version,'research_only',null,v_evidence_count,
    canonical->'production_evidence',canonical->'judging_evidence',canonical->'robustness_evidence','{}'::text[],array['intent','thai_pragmatics','bff_voice','lexical_social_fit','stance','composition']::text[],
    canonical->'known_failure_clusters',canonical->'uncertainty',null,null,canonical->>'requalification_condition',
    encode(extensions.digest(canonical::text,'sha256'),'hex'),pg_catalog.now()
  from built
  on conflict(judge_candidate_id,passport_version,profile_id) do nothing;

  select count(*) into v_count from private.tcj_judge_passports p
  join private.tcj_admission_campaign_candidates cc on cc.judge_candidate_id=p.judge_candidate_id
  where cc.campaign_id=v_campaign.id and p.passport_version='admission-preliminary-v1' and p.profile_id=v_campaign.profile_id and p.frozen_at is not null;

  if v_count<>3 then raise exception 'passport_assignment_count_gate:%',v_count; end if;

  select encode(extensions.digest(string_agg(j.opaque_candidate_id||':'||p.passport_sha256,'|' order by j.opaque_candidate_id),'sha256'),'hex')
    into v_assignment_sha
  from private.tcj_judge_passports p
  join private.tcj_judge_candidates j on j.id=p.judge_candidate_id
  join private.tcj_admission_campaign_candidates cc on cc.judge_candidate_id=j.id
  where cc.campaign_id=v_campaign.id and p.passport_version='admission-preliminary-v1' and p.profile_id=v_campaign.profile_id;

  insert into private.tcj_admission_passport_assignment_events(campaign_id,passport_version,passport_count,assignment_manifest_sha256,actor_user_id)
  values(v_campaign.id,'admission-preliminary-v1',3,v_assignment_sha,p_actor_user_id)
  on conflict(campaign_id) do nothing;

  if exists(select 1 from private.tcj_admission_passport_assignment_events e where e.campaign_id=v_campaign.id and e.assignment_manifest_sha256<>v_assignment_sha) then
    raise exception 'passport_assignment_manifest_mismatch';
  end if;

  update private.tcj_admission_campaigns set status='complete' where id=v_campaign.id and status='identity_revealed';

  select jsonb_agg(jsonb_build_object(
    'opaque_candidate_id',j.opaque_candidate_id,
    'provider',j.provider,
    'model_name',j.model_name,
    'model_family',j.model_family,
    'model_snapshot',j.model_snapshot,
    'qualification_state',p.qualification_state,
    'passport_version',p.passport_version,
    'passport_sha256',p.passport_sha256,
    'qualified_dimensions',to_jsonb(p.qualified_dimensions),
    'excluded_dimensions',to_jsonb(p.excluded_dimensions),
    'uncertainty',p.uncertainty
  ) order by j.opaque_candidate_id)
  into v_rows
  from private.tcj_judge_passports p
  join private.tcj_judge_candidates j on j.id=p.judge_candidate_id
  join private.tcj_admission_campaign_candidates cc on cc.judge_candidate_id=j.id
  where cc.campaign_id=v_campaign.id and p.passport_version='admission-preliminary-v1' and p.profile_id=v_campaign.profile_id;

  return jsonb_build_object('status','complete','passport_version','admission-preliminary-v1','passport_count',3,'assignment_manifest_sha256',v_assignment_sha,'passports',coalesce(v_rows,'[]'::jsonb));
end;
$$;
revoke all on function private.tcj_assign_preliminary_passports(text,uuid) from public,anon,authenticated;
