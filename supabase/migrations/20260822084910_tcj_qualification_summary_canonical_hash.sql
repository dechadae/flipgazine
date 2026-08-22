create or replace function private.tcj_qualification_summary_hash(
  p_run_id bigint,
  p_judge_candidate_id bigint,
  p_summary_version text,
  p_case_count integer,
  p_valid_count integer,
  p_terminal_count integer,
  p_dimension_metrics jsonb,
  p_global_metrics jsonb,
  p_dimension_decisions jsonb,
  p_global_gate_pass boolean,
  p_candidate_manifest_sha256 text
) returns text
language sql immutable
set search_path='pg_catalog','private','extensions'
as $$
  select encode(extensions.digest(jsonb_build_object(
    'run_id',p_run_id,
    'judge_candidate_id',p_judge_candidate_id,
    'summary_version',p_summary_version,
    'case_count',p_case_count,
    'valid_count',p_valid_count,
    'terminal_count',p_terminal_count,
    'dimension_metrics',p_dimension_metrics,
    'global_metrics',p_global_metrics,
    'dimension_decisions',p_dimension_decisions,
    'global_gate_pass',p_global_gate_pass,
    'candidate_manifest_sha256',p_candidate_manifest_sha256
  )::text,'sha256'),'hex')
$$;
revoke execute on function private.tcj_qualification_summary_hash(bigint,bigint,text,integer,integer,integer,jsonb,jsonb,jsonb,boolean,text) from public,anon,authenticated;