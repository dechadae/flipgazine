create or replace function private.tcj_stage_b_judgments_jsonb_guard()
returns trigger
language plpgsql
set search_path=pg_catalog,private
as $$
declare
  a_usage jsonb;
  a_latency integer;
  a_finish text;
  a_index integer;
  want_role text;
begin
  if jsonb_typeof(new.diagnosis)='string' then new.diagnosis := (new.diagnosis #>> '{}')::jsonb; end if;
  if jsonb_typeof(new.raw_output)='string' then new.raw_output := (new.raw_output #>> '{}')::jsonb; end if;
  if jsonb_typeof(new.generation_settings)='string' then new.generation_settings := (new.generation_settings #>> '{}')::jsonb; end if;
  if new.usage is not null and jsonb_typeof(new.usage)='string' then new.usage := (new.usage #>> '{}')::jsonb; end if;

  if new.usage is not null and new.usage->>'finish_reason'='recovered' then
    want_role := case when coalesce((new.generation_settings->>'repair_used')::boolean,false) then 'repair' else 'primary' end;
    select a.usage,a.latency_ms,a.finish_reason,a.attempt_index into a_usage,a_latency,a_finish,a_index
    from private.tcj_admission_stage_b_attempts a
    where a.campaign_id=new.campaign_id
      and a.evidence_item_id=new.evidence_item_id
      and a.judge_candidate_id=new.judge_candidate_id
      and a.protocol_version=new.protocol_version
      and a.attempt_role=want_role
      and a.outcome_class='valid'
      and a.evidence_eligible=true
    order by a.attempt_index desc
    limit 1;

    if a_usage is not null then
      new.usage := jsonb_build_object(
        'prompt_tokens',coalesce((a_usage->>'prompt_tokens')::integer,0),
        'completion_tokens',coalesce((a_usage->>'completion_tokens')::integer,0),
        'total_tokens',coalesce((a_usage->>'total_tokens')::integer,0),
        'reasoning_tokens',coalesce((a_usage#>>'{completion_tokens_details,reasoning_tokens}')::integer,0),
        'finish_reason',a_finish
      );
      new.latency_ms := a_latency;
      new.generation_settings := new.generation_settings || jsonb_build_object('recovered_from_preserved_attempt',true,'recovered_attempt_index',a_index);
    end if;
  end if;
  return new;
end $$;
