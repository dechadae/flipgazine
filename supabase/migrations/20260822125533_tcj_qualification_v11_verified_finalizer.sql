create or replace function private.tcj_qualification_passport_hash_v1(
  p_judge_candidate_id bigint,
  p_passport_version text,
  p_profile_id text,
  p_admission_protocol_version text,
  p_qualification_state text,
  p_evidence_set_id bigint,
  p_evidence_item_count integer,
  p_production_evidence jsonb,
  p_judging_evidence jsonb,
  p_robustness_evidence jsonb,
  p_qualified_dimensions text[],
  p_excluded_dimensions text[],
  p_known_failure_clusters jsonb,
  p_uncertainty jsonb,
  p_requalification_condition text
) returns text
language sql
immutable
set search_path to 'pg_catalog','private','extensions'
as $$
  select encode(extensions.digest(jsonb_build_object(
    'judge_candidate_id',p_judge_candidate_id,
    'passport_version',p_passport_version,
    'profile_id',p_profile_id,
    'admission_protocol_version',p_admission_protocol_version,
    'qualification_state',p_qualification_state,
    'evidence_set_id',p_evidence_set_id,
    'evidence_item_count',p_evidence_item_count,
    'production_evidence',p_production_evidence,
    'judging_evidence',p_judging_evidence,
    'robustness_evidence',p_robustness_evidence,
    'qualified_dimensions',to_jsonb(p_qualified_dimensions),
    'excluded_dimensions',to_jsonb(p_excluded_dimensions),
    'known_failure_clusters',p_known_failure_clusters,
    'uncertainty',p_uncertainty,
    'requalification_condition',p_requalification_condition
  )::text,'sha256'),'hex')
$$;

create or replace function private.tcj_finalize_qualification_run_v1(p_run_key text)
returns jsonb
language plpgsql
security definer
set search_path to 'pg_catalog','private','extensions'
as $$
declare
  v_run private.tcj_qualification_runs%rowtype;
  v_protocol private.tcj_qualification_protocols%rowtype;
  v_set private.tcj_evidence_sets%rowtype;
  v_bad integer;
  v_candidate record;
  v_dim_metrics jsonb;
  v_dim_decisions jsonb;
  v_global_metrics jsonb;
  v_candidate_manifest text;
  v_summary_sha text;
  v_global_gate boolean;
  v_terminal integer;
  v_false_fluent integer;
  v_qualified_dimensions text[];
  v_partial_dimensions text[];
  v_excluded_dimensions text[];
  v_qualification_state text;
  v_production_evidence jsonb;
  v_judging_evidence jsonb;
  v_robustness_evidence jsonb := jsonb_build_object('evidence_boundary','qualification_only','preliminary_robustness_used_for_authority',false);
  v_known_failures jsonb;
  v_uncertainty jsonb;
  v_requalification text;
  v_passport_version text;
  v_passport_sha text;
  v_now timestamptz := clock_timestamp();
  v_run_manifest text;
  v_summary_count integer;
  v_passport_count integer;
begin
  select * into v_run from private.tcj_qualification_runs where run_key=p_run_key for update;
  if not found then raise exception 'qualification_run_not_found'; end if;

  select * into v_protocol from private.tcj_qualification_protocols where id=v_run.protocol_id for update;
  select * into v_set from private.tcj_evidence_sets where id=v_protocol.evidence_set_id;

  if v_run.status='complete' then
    select count(*) into v_summary_count from private.tcj_qualification_summaries where run_id=v_run.id;
    select count(*) into v_passport_count from private.tcj_judge_passports where evidence_set_id=v_set.id and passport_version=('qualification-'||regexp_replace(v_protocol.protocol_key,'^.*-','')) and profile_id=v_protocol.profile_id;
    return jsonb_build_object('status','already_complete','run_id',v_run.id,'summaries',v_summary_count,'passports',v_passport_count,'run_manifest_sha256',v_run.run_manifest_sha256);
  end if;

  if v_run.status<>'running' or v_protocol.status<>'running' then raise exception 'qualification_not_running'; end if;
  if v_set.status<>'frozen' then raise exception 'qualification_evidence_set_not_frozen'; end if;
  if v_run.threshold_sha256<>v_protocol.threshold_sha256 then raise exception 'qualification_threshold_hash_mismatch'; end if;
  if v_run.human_manifest_sha256<>v_protocol.human_manifest_sha256 then raise exception 'qualification_human_manifest_hash_mismatch'; end if;
  if v_run.evidence_manifest_sha256<>v_set.manifest_sha256 then raise exception 'qualification_evidence_manifest_hash_mismatch'; end if;

  select count(*) into v_bad from private.tcj_evidence_items where evidence_set_id=v_set.id;
  if v_bad<>v_protocol.item_target then raise exception 'qualification_item_count_mismatch:%',v_bad; end if;
  select count(*) into v_bad from private.tcj_evidence_items where evidence_set_id=v_set.id and exposure_state='qualification_exposed';
  if v_bad<>v_protocol.item_target then raise exception 'qualification_exposure_count_mismatch:%',v_bad; end if;
  select count(*) into v_bad from private.tcj_qualification_exposure_events where run_id=v_run.id and item_count=v_protocol.item_target and config_sha256=v_run.config_sha256 and threshold_sha256=v_run.threshold_sha256 and human_manifest_sha256=v_run.human_manifest_sha256 and evidence_manifest_sha256=v_run.evidence_manifest_sha256;
  if v_bad<>1 then raise exception 'qualification_exposure_event_mismatch:%',v_bad; end if;

  select count(*) into v_bad from private.tcj_qualification_judgments where run_id=v_run.id;
  if v_bad<>v_run.expected_cells then raise exception 'qualification_judgment_count_mismatch:%',v_bad; end if;
  select count(*) into v_bad from (select evidence_item_id,judge_candidate_id from private.tcj_qualification_judgments where run_id=v_run.id group by evidence_item_id,judge_candidate_id) q;
  if v_bad<>v_run.expected_cells then raise exception 'qualification_unique_cell_mismatch:%',v_bad; end if;
  select count(*) into v_bad from private.tcj_qualification_failures where run_id=v_run.id and resolved_at is null;
  if v_bad<>0 then raise exception 'qualification_unresolved_failures:%',v_bad; end if;
  select count(*) into v_bad from private.tcj_qualification_failures where run_id=v_run.id and failure_class='generation_contract_terminal';
  if v_bad<>0 then raise exception 'qualification_terminal_failures:%',v_bad; end if;
  select count(*) into v_bad from private.tcj_qualification_run_incidents where run_id=v_run.id and severity in ('blocking','compromising');
  if v_bad<>0 then raise exception 'qualification_blocking_incidents:%',v_bad; end if;

  select count(*) into v_bad from private.tcj_qualification_dispatches d where d.run_id=v_run.id and (
    d.request_sha256<>encode(extensions.digest(d.request_payload_text,'sha256'),'hex') or
    d.system_prompt_sha256<>encode(extensions.digest(d.system_prompt_text,'sha256'),'hex') or
    d.user_payload_sha256<>encode(extensions.digest(d.user_payload_text,'sha256'),'hex') or
    d.request_payload_text::jsonb<>d.request_payload
  );
  if v_bad<>0 then raise exception 'qualification_dispatch_hash_integrity:%',v_bad; end if;

  select count(*) into v_bad from private.tcj_qualification_responses s join private.tcj_qualification_dispatches d on d.id=s.dispatch_id where d.run_id=v_run.id and (
    s.provider_response_sha256<>encode(extensions.digest(s.provider_response_text,'sha256'),'hex') or
    (s.assistant_output_sha256 is not null and s.assistant_output_sha256<>encode(extensions.digest(s.assistant_output_text,'sha256'),'hex'))
  );
  if v_bad<>0 then raise exception 'qualification_response_hash_integrity:%',v_bad; end if;

  select count(*) into v_bad from (
    select d.id,count(s.id) n from private.tcj_qualification_dispatches d left join private.tcj_qualification_responses s on s.dispatch_id=d.id where d.run_id=v_run.id group by d.id having count(s.id)<>1
  ) q;
  if v_bad<>0 then raise exception 'qualification_response_cardinality:%',v_bad; end if;

  select count(*) into v_bad from private.tcj_qualification_attempts a
    left join private.tcj_qualification_dispatches d on d.id=a.dispatch_id
    left join private.tcj_qualification_responses s on s.id=a.response_id
    where a.run_id=v_run.id and (
      a.dispatch_id is null or a.response_id is null or d.run_id<>v_run.id or
      a.request_sha256<>d.request_sha256 or a.system_prompt_sha256<>d.system_prompt_sha256 or a.user_payload_sha256<>d.user_payload_sha256 or
      a.provider_response_sha256<>s.provider_response_sha256 or a.raw_output_sha256<>s.assistant_output_sha256 or
      a.raw_output_text<>s.assistant_output_text or a.provider_response_text<>s.provider_response_text or
      a.http_status<>s.http_status or a.finish_reason is distinct from s.finish_reason or a.outcome_class is distinct from s.outcome_class
    );
  if v_bad<>0 then raise exception 'qualification_attempt_projection_integrity:%',v_bad; end if;

  select count(*) into v_bad from (
    select evidence_item_id,judge_candidate_id,count(*) filter(where attempt_role='primary') primaries,count(*) filter(where attempt_role='repair') repairs,count(*) attempts,max(attempt_index) max_idx
    from private.tcj_qualification_attempts where run_id=v_run.id group by evidence_item_id,judge_candidate_id
    having count(*) filter(where attempt_role='primary')<>1 or count(*) filter(where attempt_role='repair')>1 or count(*)>2 or max(attempt_index)>2
  ) q;
  if v_bad<>0 then raise exception 'qualification_attempt_policy_violation:%',v_bad; end if;

  select count(*) into v_bad from private.tcj_qualification_judgments j left join private.tcj_qualification_attempts a on a.id=j.source_attempt_id where j.run_id=v_run.id and (
    a.id is null or a.run_id<>v_run.id or a.outcome_class<>'valid' or not a.evidence_eligible or j.request_sha256<>a.request_sha256 or j.generation_settings<>a.generation_settings
  );
  if v_bad<>0 then raise exception 'qualification_judgment_source_integrity:%',v_bad; end if;

  select count(*) into v_bad from private.tcj_qualification_judgments j where j.run_id=v_run.id and j.diagnosis_sha256<>encode(extensions.digest(j.diagnosis::text,'sha256'),'hex') and not exists (
    select 1 from private.tcj_qualification_hash_attestations a where a.judgment_id=j.id and a.run_id=v_run.id and a.original_sha256=j.diagnosis_sha256 and a.canonical_sha256=encode(extensions.digest(j.diagnosis::text,'sha256'),'hex') and a.diagnosis_matches_normalized_source and a.provenance_chain_ok
  );
  if v_bad<>0 then raise exception 'qualification_unattested_diagnosis_hash:%',v_bad; end if;

  select count(*) into v_bad from private.tcj_qualification_dispatches d
    cross join lateral jsonb_array_elements_text(v_run.config->'leakage_exclusions') k(key)
    where d.run_id=v_run.id and d.request_payload_text ilike ('%'||k.key||'%');
  if v_bad<>0 then raise exception 'qualification_hidden_metadata_leakage:%',v_bad; end if;

  select count(*) into v_bad from private.tcj_qualification_dispatches d
    join private.tcj_qualification_human_reviews h on h.protocol_id=v_protocol.id and h.evidence_item_id=d.evidence_item_id
    cross join lateral (select (d.request_payload->'messages'->1->>'content')::jsonb user_json) u
    where d.run_id=v_run.id and d.attempt_role='primary' and (
      (select count(*) from jsonb_each(u.user_json))<>2 or
      not (u.user_json ? 'question_or_scenario' and u.user_json ? 'candidate_response') or
      u.user_json->>'question_or_scenario'<>h.final_scenario_text or
      u.user_json->>'candidate_response'<>h.final_candidate_text or
      encode(extensions.digest(u.user_json->>'question_or_scenario','sha256'),'hex')<>h.scenario_sha256 or
      encode(extensions.digest(u.user_json->>'candidate_response','sha256'),'hex')<>h.candidate_sha256
    );
  if v_bad<>0 then raise exception 'qualification_primary_payload_alignment:%',v_bad; end if;

  select count(*) into v_bad from private.tcj_qualification_dispatches d
    join private.tcj_judge_candidates jc on jc.id=d.judge_candidate_id
    join lateral (
      select elem from jsonb_array_elements(v_run.config->'candidate_models') elem where (elem->>'judge_candidate_id')::bigint=d.judge_candidate_id limit 1
    ) cm on true
    where d.run_id=v_run.id and (
      d.provider<>jc.provider or d.model_name<>jc.model_name or d.provider<>cm.elem->>'provider' or d.model_name<>cm.elem->>'model_name' or
      d.protocol_version<>v_run.run_protocol_version or d.prompt_version<>v_run.prompt_version or
      (d.generation_settings->>'temperature')::numeric<>(v_run.config->>'temperature')::numeric or
      (d.generation_settings->>'max_completion_tokens')::integer<>(v_run.config->>'max_completion_tokens')::integer or
      d.generation_settings->>'response_format'<>v_run.config->>'response_format' or
      d.generation_settings->>'reasoning_effort'<>cm.elem->>'reasoning_effort' or
      d.generation_settings->>'canonical_core_version'<>v_run.config->>'canonical_core_version' or
      d.generation_settings->>'canonical_core_blob_sha'<>v_run.config->>'canonical_core_blob_sha' or
      (d.generation_settings->>'repair')::boolean<>(d.attempt_role='repair')
    );
  if v_bad<>0 then raise exception 'qualification_provider_config_mismatch:%',v_bad; end if;

  v_passport_version := 'qualification-'||regexp_replace(v_protocol.protocol_key,'^.*-(v[0-9].*)$','\1');

  for v_candidate in
    select jc.id,jc.model_name from private.tcj_judge_candidates jc where jc.id in (select distinct judge_candidate_id from private.tcj_qualification_judgments where run_id=v_run.id) order by jc.id
  loop
    with dims(dim,ord) as (values ('intent',1),('thai_pragmatics',2),('bff_voice',3),('lexical_social_fit',4),('stance',5),('composition',6)),
    b as (
      select d.dim,d.ord,(h.ratings->>d.dim)::int hr,(j.diagnosis->'ratings'->>d.dim)::int jr,(c.primary_dimension=d.dim) target
      from private.tcj_qualification_judgments j
      join private.tcj_qualification_human_reviews h on h.protocol_id=v_protocol.id and h.evidence_item_id=j.evidence_item_id
      join private.tcj_qualification_case_designs c on c.protocol_id=v_protocol.id and c.evidence_item_id=j.evidence_item_id
      cross join dims d where j.run_id=v_run.id and j.judge_candidate_id=v_candidate.id
    ), m as (
      select dim,ord,count(*)::int valid_cells,count(*) filter(where hr=jr)::int exact_match_count,count(*) filter(where abs(hr-jr)<=1)::int within_one_count,
        round(avg(abs(hr-jr))::numeric,4) mae,
        count(*) filter(where (hr<=2 and jr=4) or (hr=4 and jr<=2))::int extreme_reversals,
        count(*) filter(where target)::int primary_target_case_count,
        count(*) filter(where target and abs(hr-jr)<=1)::int primary_target_within_one
      from b group by dim,ord
    )
    select jsonb_object_agg(dim,jsonb_build_object(
      'valid_cells',valid_cells,'exact_match_count',exact_match_count,'within_one_count',within_one_count,'mae',mae,
      'extreme_reversals',extreme_reversals,'primary_target_case_count',primary_target_case_count,'primary_target_within_one',primary_target_within_one
    ) order by ord) into v_dim_metrics from m;

    select count(*)::int into v_terminal from private.tcj_qualification_failures where run_id=v_run.id and judge_candidate_id=v_candidate.id and failure_class='generation_contract_terminal';
    select count(*)::int into v_false_fluent from private.tcj_qualification_judgments j join private.tcj_qualification_human_reviews h on h.protocol_id=v_protocol.id and h.evidence_item_id=j.evidence_item_id where j.run_id=v_run.id and j.judge_candidate_id=v_candidate.id and j.predicted_verdict='fluent' and h.severity in ('MAJOR','CRITICAL');
    v_global_gate := (v_terminal<=coalesce((v_protocol.threshold_spec#>>'{global_authority_gates,max_terminal_generation_contract_failures}')::int,0) and v_false_fluent<=coalesce((v_protocol.threshold_spec#>>'{global_authority_gates,max_false_fluent_on_human_major_or_critical}')::int,0));

    with dims(dim,ord) as (values ('intent',1),('thai_pragmatics',2),('bff_voice',3),('lexical_social_fit',4),('stance',5),('composition',6)), x as (
      select d.dim,d.ord,v_dim_metrics->d.dim m from dims d
    ), y as (
      select dim,ord,m,
        ((m->>'valid_cells')::int >= (v_protocol.threshold_spec#>>'{qualified_dimension,min_valid_cells}')::int and
         (m->>'mae')::numeric <= (v_protocol.threshold_spec#>>'{qualified_dimension,max_mae}')::numeric and
         (m->>'within_one_count')::int >= (v_protocol.threshold_spec#>>'{qualified_dimension,min_within_one_cells}')::int and
         (m->>'extreme_reversals')::int <= (v_protocol.threshold_spec#>>'{qualified_dimension,max_extreme_reversals}')::int and
         (m->>'primary_target_case_count')::int = (v_protocol.threshold_spec#>>'{qualified_dimension,primary_target_case_count}')::int and
         (m->>'primary_target_within_one')::int >= (v_protocol.threshold_spec#>>'{qualified_dimension,min_primary_target_within_one_cells}')::int) qpass,
        ((m->>'valid_cells')::int >= (v_protocol.threshold_spec#>>'{partially_qualified_dimension,min_valid_cells}')::int and
         (m->>'mae')::numeric <= (v_protocol.threshold_spec#>>'{partially_qualified_dimension,max_mae}')::numeric and
         (m->>'within_one_count')::int >= (v_protocol.threshold_spec#>>'{partially_qualified_dimension,min_within_one_cells}')::int and
         (m->>'extreme_reversals')::int <= (v_protocol.threshold_spec#>>'{partially_qualified_dimension,max_extreme_reversals}')::int and
         (m->>'primary_target_case_count')::int = (v_protocol.threshold_spec#>>'{partially_qualified_dimension,primary_target_case_count}')::int and
         (m->>'primary_target_within_one')::int >= (v_protocol.threshold_spec#>>'{partially_qualified_dimension,min_primary_target_within_one_cells}')::int) ppass
      from x
    ) select jsonb_object_agg(dim,jsonb_build_object(
        'qualified_gate_pass',qpass,'partial_gate_pass',ppass,
        'threshold_state',case when qpass then 'qualified' when ppass then 'partially_qualified' else 'research_only' end,
        'authority_state',case when v_global_gate and qpass then 'qualified' when v_global_gate and ppass then 'partially_qualified' else 'research_only' end
      ) order by ord) into v_dim_decisions from y;

    select array_agg(key order by array_position(array['intent','thai_pragmatics','bff_voice','lexical_social_fit','stance','composition'],key)) filter(where value->>'authority_state'='qualified'),
           array_agg(key order by array_position(array['intent','thai_pragmatics','bff_voice','lexical_social_fit','stance','composition'],key)) filter(where value->>'authority_state'='partially_qualified'),
           array_agg(key order by array_position(array['intent','thai_pragmatics','bff_voice','lexical_social_fit','stance','composition'],key)) filter(where value->>'authority_state'='research_only')
      into v_qualified_dimensions,v_partial_dimensions,v_excluded_dimensions
      from jsonb_each(v_dim_decisions);
    v_qualified_dimensions:=coalesce(v_qualified_dimensions,array[]::text[]);
    v_partial_dimensions:=coalesce(v_partial_dimensions,array[]::text[]);
    v_excluded_dimensions:=coalesce(v_excluded_dimensions,array[]::text[]);
    if not v_global_gate then v_qualification_state:='research_only';
    elsif cardinality(v_excluded_dimensions)=0 and cardinality(v_partial_dimensions)=0 and cardinality(v_qualified_dimensions)=6 then v_qualification_state:='qualified';
    elsif cardinality(v_qualified_dimensions)>0 or cardinality(v_partial_dimensions)>0 then v_qualification_state:='partially_qualified';
    else v_qualification_state:='research_only'; end if;

    select jsonb_build_object(
      'case_count',count(distinct j.evidence_item_id),
      'rating_cells',count(*)*6,
      'rating_exact',(select count(*) from private.tcj_qualification_judgments j2 join private.tcj_qualification_human_reviews h2 on h2.protocol_id=v_protocol.id and h2.evidence_item_id=j2.evidence_item_id cross join lateral (values ('intent'),('thai_pragmatics'),('bff_voice'),('lexical_social_fit'),('stance'),('composition')) d(dim) where j2.run_id=v_run.id and j2.judge_candidate_id=v_candidate.id and (h2.ratings->>d.dim)::int=(j2.diagnosis->'ratings'->>d.dim)::int),
      'rating_within_one',(select count(*) from private.tcj_qualification_judgments j2 join private.tcj_qualification_human_reviews h2 on h2.protocol_id=v_protocol.id and h2.evidence_item_id=j2.evidence_item_id cross join lateral (values ('intent'),('thai_pragmatics'),('bff_voice'),('lexical_social_fit'),('stance'),('composition')) d(dim) where j2.run_id=v_run.id and j2.judge_candidate_id=v_candidate.id and abs((h2.ratings->>d.dim)::int-(j2.diagnosis->'ratings'->>d.dim)::int)<=1),
      'false_fluent_major_or_critical',v_false_fluent,
      'terminal_generation_contract_failures',v_terminal,
      'severity_exact',count(*) filter(where (case j.predicted_verdict when 'fluent' then 'PASS' when 'minor_problem' then 'MINOR' when 'major_problem' then 'MAJOR' when 'not_acceptable' then 'CRITICAL' end)=h.severity),
      'provider_attempts',(select count(*) from private.tcj_qualification_attempts a where a.run_id=v_run.id and a.judge_candidate_id=v_candidate.id),
      'repair_attempts',(select count(*) from private.tcj_qualification_attempts a where a.run_id=v_run.id and a.judge_candidate_id=v_candidate.id and a.attempt_role='repair'),
      'prompt_tokens',(select coalesce(sum((a.usage->>'prompt_tokens')::bigint),0) from private.tcj_qualification_attempts a where a.run_id=v_run.id and a.judge_candidate_id=v_candidate.id),
      'completion_tokens',(select coalesce(sum((a.usage->>'completion_tokens')::bigint),0) from private.tcj_qualification_attempts a where a.run_id=v_run.id and a.judge_candidate_id=v_candidate.id),
      'total_tokens',(select coalesce(sum((a.usage->>'total_tokens')::bigint),0) from private.tcj_qualification_attempts a where a.run_id=v_run.id and a.judge_candidate_id=v_candidate.id),
      'blocking_or_compromising_incidents',(select count(*) from private.tcj_qualification_run_incidents i where i.run_id=v_run.id and i.severity in ('blocking','compromising')),
      'warning_incidents',(select count(*) from private.tcj_qualification_run_incidents i where i.run_id=v_run.id and i.severity='warning'),
      'diagnosis_hash_attestations',(select count(*) from private.tcj_qualification_hash_attestations a join private.tcj_qualification_judgments j2 on j2.id=a.judgment_id where a.run_id=v_run.id and j2.judge_candidate_id=v_candidate.id),
      'integrity_pass',true,
      'global_authority_gate_pass',v_global_gate
    ) into v_global_metrics
    from private.tcj_qualification_judgments j join private.tcj_qualification_human_reviews h on h.protocol_id=v_protocol.id and h.evidence_item_id=j.evidence_item_id
    where j.run_id=v_run.id and j.judge_candidate_id=v_candidate.id;

    select encode(extensions.digest(jsonb_build_object(
      'run_key',v_run.run_key,'judge_candidate_id',v_candidate.id,'evidence_manifest_sha256',v_run.evidence_manifest_sha256,'human_manifest_sha256',v_run.human_manifest_sha256,
      'cells',jsonb_agg(jsonb_build_object(
        'evidence_item_id',j.evidence_item_id,'human_review_sha256',h.review_sha256,'primary_dimension',c.primary_dimension,
        'source_attempt_id',j.source_attempt_id,'request_sha256',j.request_sha256,
        'diagnosis_sha256',coalesce(ha.canonical_sha256,j.diagnosis_sha256),'predicted_verdict',j.predicted_verdict,
        'provider_response_sha256',a.provider_response_sha256,'raw_output_sha256',a.raw_output_sha256
      ) order by j.evidence_item_id)
    )::text,'sha256'),'hex') into v_candidate_manifest
    from private.tcj_qualification_judgments j
    join private.tcj_qualification_human_reviews h on h.protocol_id=v_protocol.id and h.evidence_item_id=j.evidence_item_id
    join private.tcj_qualification_case_designs c on c.protocol_id=v_protocol.id and c.evidence_item_id=j.evidence_item_id
    join private.tcj_qualification_attempts a on a.id=j.source_attempt_id
    left join lateral (select max(x.canonical_sha256) canonical_sha256 from private.tcj_qualification_hash_attestations x where x.judgment_id=j.id and x.provenance_chain_ok and x.diagnosis_matches_normalized_source) ha on true
    where j.run_id=v_run.id and j.judge_candidate_id=v_candidate.id;

    v_summary_sha:=private.tcj_qualification_summary_hash(v_run.id,v_candidate.id,'TCJ-JUDGE-QUALIFICATION-SUMMARY-v1',48,48,v_terminal,v_dim_metrics,v_global_metrics,v_dim_decisions,v_global_gate,v_candidate_manifest);
    insert into private.tcj_qualification_summaries(run_id,judge_candidate_id,summary_version,case_count,valid_count,terminal_count,dimension_metrics,global_metrics,dimension_decisions,global_gate_pass,candidate_manifest_sha256,summary_sha256,frozen_at)
    values(v_run.id,v_candidate.id,'TCJ-JUDGE-QUALIFICATION-SUMMARY-v1',48,48,v_terminal,v_dim_metrics,v_global_metrics,v_dim_decisions,v_global_gate,v_candidate_manifest,v_summary_sha,v_now);

    v_production_evidence:=jsonb_build_object('stage','hidden_qualification','protocol_key',v_protocol.protocol_key,'run_key',v_run.run_key,'evidence_boundary','qualification_only','evidence_manifest_sha256',v_run.evidence_manifest_sha256,'human_manifest_sha256',v_run.human_manifest_sha256,'threshold_sha256',v_run.threshold_sha256,'summary_sha256',v_summary_sha,'candidate_manifest_sha256',v_candidate_manifest,'global_gate_pass',v_global_gate);
    v_judging_evidence:=jsonb_build_object('stage','hidden_qualification_judging_competence','case_count',48,'valid_count',48,'dimension_metrics',v_dim_metrics,'dimension_decisions',v_dim_decisions,'global_metrics',v_global_metrics,'qualified_dimensions',to_jsonb(v_qualified_dimensions),'partially_qualified_dimensions',to_jsonb(v_partial_dimensions),'excluded_dimensions',to_jsonb(v_excluded_dimensions),'evidence_boundary','qualification_only','preliminary_evidence_used_for_authority',false);
    v_known_failures:=jsonb_build_object('qualification_v1_1',jsonb_build_object('global_gate_pass',v_global_gate,'dimension_decisions',v_dim_decisions));
    v_uncertainty:=jsonb_build_object('evidence_boundary','hidden_qualification_v1.1','assurance_completed',false,'assurance_eligible',(v_qualification_state in ('qualified','partially_qualified')),'note',case when v_qualification_state='research_only' then 'No production authority established by hidden Qualification v1.1.' else 'Qualification authority remains subject to independent Assurance.' end);
    v_requalification:=case when v_qualification_state='research_only' then 'No production dimension passed hidden Qualification v1.1. Do not retune against the now-exposed bank; any new candidate or changed judge configuration requires a fresh hidden Qualification bank before production authority.' else 'Independent Assurance is required before final production use; requalify after material model, prompt, profile, or runtime change.' end;
    v_passport_sha:=private.tcj_qualification_passport_hash_v1(v_candidate.id,v_passport_version,v_protocol.profile_id,v_protocol.protocol_key,v_qualification_state,v_set.id,48,v_production_evidence,v_judging_evidence,v_robustness_evidence,v_qualified_dimensions,v_excluded_dimensions,v_known_failures,v_uncertainty,v_requalification);
    insert into private.tcj_judge_passports(judge_candidate_id,passport_version,profile_id,admission_protocol_version,qualification_state,evidence_set_id,evidence_item_count,production_evidence,judging_evidence,robustness_evidence,qualified_dimensions,excluded_dimensions,known_failure_clusters,uncertainty,qualified_at,expires_at,requalification_condition,passport_sha256,frozen_at)
    values(v_candidate.id,v_passport_version,v_protocol.profile_id,v_protocol.protocol_key,v_qualification_state,v_set.id,48,v_production_evidence,v_judging_evidence,v_robustness_evidence,v_qualified_dimensions,v_excluded_dimensions,v_known_failures,v_uncertainty,case when v_qualification_state in ('qualified','partially_qualified') then v_now else null end,null,v_requalification,v_passport_sha,v_now);
  end loop;

  select count(*) into v_summary_count from private.tcj_qualification_summaries where run_id=v_run.id;
  if v_summary_count<>v_protocol.candidate_target then raise exception 'qualification_summary_count_mismatch:%',v_summary_count; end if;
  select count(*) into v_passport_count from private.tcj_judge_passports where evidence_set_id=v_set.id and passport_version=v_passport_version and profile_id=v_protocol.profile_id;
  if v_passport_count<>v_protocol.candidate_target then raise exception 'qualification_passport_count_mismatch:%',v_passport_count; end if;

  select encode(extensions.digest(jsonb_build_object(
    'run_key',v_run.run_key,'config_sha256',v_run.config_sha256,'threshold_sha256',v_run.threshold_sha256,'human_manifest_sha256',v_run.human_manifest_sha256,'evidence_manifest_sha256',v_run.evidence_manifest_sha256,
    'exposure_events',(select jsonb_agg(jsonb_build_object('id',e.id,'event_sha256',e.event_sha256) order by e.id) from private.tcj_qualification_exposure_events e where e.run_id=v_run.id),
    'dispatches',(select jsonb_agg(jsonb_build_object('id',d.id,'request_sha256',d.request_sha256) order by d.id) from private.tcj_qualification_dispatches d where d.run_id=v_run.id),
    'responses',(select jsonb_agg(jsonb_build_object('id',s.id,'dispatch_id',s.dispatch_id,'provider_response_sha256',s.provider_response_sha256,'assistant_output_sha256',s.assistant_output_sha256) order by s.id) from private.tcj_qualification_responses s join private.tcj_qualification_dispatches d on d.id=s.dispatch_id where d.run_id=v_run.id),
    'judgments',(select jsonb_agg(jsonb_build_object('id',j.id,'candidate_id',j.judge_candidate_id,'evidence_item_id',j.evidence_item_id,'request_sha256',j.request_sha256,'diagnosis_sha256',coalesce(a.canonical_sha256,j.diagnosis_sha256)) order by j.id) from private.tcj_qualification_judgments j left join lateral (select max(x.canonical_sha256) canonical_sha256 from private.tcj_qualification_hash_attestations x where x.judgment_id=j.id and x.provenance_chain_ok and x.diagnosis_matches_normalized_source) a on true where j.run_id=v_run.id),
    'incidents',(select coalesce(jsonb_agg(jsonb_build_object('id',i.id,'incident_sha256',i.incident_sha256) order by i.id),'[]'::jsonb) from private.tcj_qualification_run_incidents i where i.run_id=v_run.id),
    'attestations',(select coalesce(jsonb_agg(jsonb_build_object('id',a.id,'attestation_sha256',a.attestation_sha256) order by a.id),'[]'::jsonb) from private.tcj_qualification_hash_attestations a where a.run_id=v_run.id),
    'summaries',(select jsonb_agg(jsonb_build_object('candidate_id',s.judge_candidate_id,'summary_sha256',s.summary_sha256) order by s.judge_candidate_id) from private.tcj_qualification_summaries s where s.run_id=v_run.id),
    'passports',(select jsonb_agg(jsonb_build_object('candidate_id',p.judge_candidate_id,'passport_sha256',p.passport_sha256) order by p.judge_candidate_id) from private.tcj_judge_passports p where p.evidence_set_id=v_set.id and p.passport_version=v_passport_version and p.profile_id=v_protocol.profile_id)
  )::text,'sha256'),'hex') into v_run_manifest;

  update private.tcj_qualification_runs set status='complete',completed_at=v_now,run_manifest_sha256=v_run_manifest where id=v_run.id;
  update private.tcj_qualification_protocols set status='complete',completed_at=v_now where id=v_protocol.id;

  return jsonb_build_object('status','complete','run_id',v_run.id,'summaries',v_summary_count,'passports',v_passport_count,'run_manifest_sha256',v_run_manifest,'passport_version',v_passport_version);
end
$$;

revoke all on function private.tcj_finalize_qualification_run_v1(text) from public;
grant execute on function private.tcj_finalize_qualification_run_v1(text) to service_role;
revoke all on function private.tcj_qualification_passport_hash_v1(bigint,text,text,text,text,bigint,integer,jsonb,jsonb,jsonb,text[],text[],jsonb,jsonb,text) from public;
grant execute on function private.tcj_qualification_passport_hash_v1(bigint,text,text,text,text,bigint,integer,jsonb,jsonb,jsonb,text[],text[],jsonb,jsonb,text) to service_role;
