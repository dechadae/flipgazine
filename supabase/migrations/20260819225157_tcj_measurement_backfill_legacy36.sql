-- Live Supabase migration mirror: 20260819225157_tcj_measurement_backfill_legacy36
-- Classifies the historical 36-case bank as exposed calibration/preliminary qualification evidence.

insert into private.tcj_evidence_sets
  (set_key,bank,profile_id,version,status,description,provenance,exposed_at,exposure_reason)
values
  ('TCJ-LEGACY-CALIBRATION-36-v1','calibration','answers-bff-v2','v1','legacy_exposed',
   'The existing 36-case Voice/Answers calibration bank. It has already influenced evaluator comparison and TCJ methodology. It is valid calibration and preliminary Stage B evidence only; it is permanently ineligible to serve as an untouched Assurance holdout or as sole final production-qualification proof.',
   jsonb_build_object('source_table','private.voice_eval_calibration_cases','case_count',36,'classification','legacy_calibration_preliminary_qualification'),
   now(),'Methodology/model-selection exposure before the vNext evidence-bank split'),
  ('TCJ-JUDGE-QUALIFICATION-v1','qualification','answers-bff-v2','v1','draft',
   'Fresh hidden judge-qualification bank. Items entering this bank must be frozen and must not be used to tune TCJ methodology before qualification measurement.',
   jsonb_build_object('clean_holdout',true),null,null),
  ('TCJ-ASSURANCE-HOLDOUT-v1','assurance','answers-bff-v2','v1','draft',
   'Fresh private Assurance holdout. Items must never be used for prompt tuning, guard creation, judge selection, threshold selection or weight fitting before an Assurance run.',
   jsonb_build_object('clean_holdout',true),null,null)
on conflict(set_key) do nothing;

insert into private.tcj_evidence_items
  (evidence_set_id,item_key,phenomenon,scenario_text,candidate_text,gold,provenance,source_table,source_id,exposure_state,exposure_note)
select s.id,c.id,c.category,c.question,c.candidate_response,c.gold,c.provenance,
       'private.voice_eval_calibration_cases',c.id,'methodology_exposed',
       'Legacy case already used in evaluator comparison/methodology development; calibration/preliminary qualification only.'
from private.voice_eval_calibration_cases c
join private.tcj_evidence_sets s on s.set_key='TCJ-LEGACY-CALIBRATION-36-v1'
on conflict(evidence_set_id,item_key) do nothing;

insert into private.tcj_item_health(evidence_item_id,health_version,exposure_state,review_note)
select i.id,1,'methodology_exposed',
       'Initial vNext classification. This item has prior methodology/model-selection exposure and cannot count as clean Assurance evidence.'
from private.tcj_evidence_items i
join private.tcj_evidence_sets s on s.id=i.evidence_set_id
where s.set_key='TCJ-LEGACY-CALIBRATION-36-v1'
on conflict(evidence_item_id,health_version) do nothing;

insert into private.tcj_judge_candidates
(candidate_key,opaque_candidate_id,provider,model_name,model_family,identity_state,lifecycle_state,provenance)
values
('hist-groq-qwen-qwen3.6-27b','HIST-QWEN-27B','groq','qwen/qwen3.6-27b','qwen','historical_known','active',jsonb_build_object('source','voice_eval_calibration_runs')),
('hist-groq-openai-gpt-oss-20b','HIST-GPTOSS-20B','groq','openai/gpt-oss-20b','gpt-oss','historical_known','active',jsonb_build_object('source','voice_eval_calibration_runs')),
('hist-groq-openai-gpt-oss-120b','HIST-GPTOSS-120B','groq','openai/gpt-oss-120b','gpt-oss','historical_known','active',jsonb_build_object('source','voice_eval_calibration_runs'))
on conflict(candidate_key) do nothing;

with agg as (
  select r.model,
    sum(coalesce((r.payload->'metrics'->>'cases')::int,0))::int cases,
    sum(coalesce((r.payload->'metrics'->>'valid')::int,0))::int valid,
    sum(coalesce((r.payload->'metrics'->>'failures')::int,0))::int failures,
    sum(coalesce((r.payload->'metrics'->>'severity_exact')::int,0))::int severity_exact,
    sum(coalesce((r.payload->'metrics'->>'flag_tp')::int,0))::int flag_tp,
    sum(coalesce((r.payload->'metrics'->>'flag_fp')::int,0))::int flag_fp,
    sum(coalesce((r.payload->'metrics'->>'flag_fn')::int,0))::int flag_fn,
    sum(coalesce((r.payload->'metrics'->>'rewrite_risk')::int,0))::int rewrite_risk,
    sum(coalesce((r.payload->'metrics'->>'latency_ms')::int,0))::bigint latency_ms
  from private.voice_eval_calibration_runs r group by r.model
), mapped as (
  select a.*,case a.model
    when 'qwen/qwen3.6-27b' then 'hist-groq-qwen-qwen3.6-27b'
    when 'openai/gpt-oss-20b' then 'hist-groq-openai-gpt-oss-20b'
    when 'openai/gpt-oss-120b' then 'hist-groq-openai-gpt-oss-120b'
  end candidate_key from agg a
)
insert into private.tcj_judge_passports
(judge_candidate_id,passport_version,profile_id,admission_protocol_version,qualification_state,evidence_set_id,evidence_item_count,judging_evidence,known_failure_clusters,uncertainty,requalification_condition)
select jc.id,'historical-preliminary-v1','answers-bff-v2','LEGACY-VOICE-CALIBRATION-36-v1','historical_preliminary',es.id,m.cases,
  jsonb_build_object('cases',m.cases,'valid',m.valid,'failures',m.failures,'severity_exact',m.severity_exact,'flag_tp',m.flag_tp,'flag_fp',m.flag_fp,'flag_fn',m.flag_fn,'rewrite_risk',m.rewrite_risk,'latency_ms_total',m.latency_ms,'status','preliminary_only','limitation','The same 36 cases already influenced evaluator comparison and TCJ methodology; these metrics cannot establish clean final qualification.'),
  '[]'::jsonb,
  jsonb_build_object('clean_holdout',false,'assurance_eligible',false,'final_qualification_sufficient',false),
  'Must complete blind Stage A, fresh hidden qualification evidence, robustness battery and version-specific requalification before production authority.'
from mapped m
join private.tcj_judge_candidates jc on jc.candidate_key=m.candidate_key
join private.tcj_evidence_sets es on es.set_key='TCJ-LEGACY-CALIBRATION-36-v1'
where m.candidate_key is not null
on conflict(judge_candidate_id,passport_version,profile_id) do nothing;

with dims as (
  select r.model,d.key dimension_key,
    sum(coalesce((r.payload->'metrics'->>'cases')::int,0))::int cases,
    sum(coalesce((r.payload->'metrics'->>'valid')::int,0))::int valid,
    sum(coalesce((d.value->>'exact')::int,0))::int exact,
    sum(coalesce((d.value->>'within_one')::int,0))::int within_one,
    sum(coalesce((d.value->>'abs_error_sum')::int,0))::int abs_error_sum
  from private.voice_eval_calibration_runs r
  cross join lateral jsonb_each(r.payload->'metrics'->'dimensions') d
  group by r.model,d.key
), mapped as (
  select dims.*,case model
    when 'qwen/qwen3.6-27b' then 'hist-groq-qwen-qwen3.6-27b'
    when 'openai/gpt-oss-20b' then 'hist-groq-openai-gpt-oss-20b'
    when 'openai/gpt-oss-120b' then 'hist-groq-openai-gpt-oss-120b'
  end candidate_key from dims
)
insert into private.tcj_judge_dimension_metrics
(passport_id,dimension_key,cases,valid,exact,within_one,abs_error_sum,mae,metrics)
select p.id,m.dimension_key,m.cases,m.valid,m.exact,m.within_one,m.abs_error_sum,
       case when m.valid>0 then round(m.abs_error_sum::numeric/m.valid,4) end,
       jsonb_build_object('exact_rate',case when m.valid>0 then round(m.exact::numeric/m.valid,4) end,
                          'within_one_rate',case when m.valid>0 then round(m.within_one::numeric/m.valid,4) end,
                          'evidence_class','legacy_preliminary')
from mapped m
join private.tcj_judge_candidates jc on jc.candidate_key=m.candidate_key
join private.tcj_judge_passports p on p.judge_candidate_id=jc.id and p.passport_version='historical-preliminary-v1' and p.profile_id='answers-bff-v2'
where m.candidate_key is not null
on conflict(passport_id,dimension_key) do nothing;

insert into private.tcj_admission_campaigns(campaign_key,protocol_version,profile_id,status,stage_a_scenario_count)
values('TCJ-JUDGE-ADMISSION-2026Q3-v1','TCJ-JUDGE-ADMISSION-v1','answers-bff-v2','draft',10)
on conflict(campaign_key) do nothing;
