-- Public Thai Voice benchmark operational database objects.
-- User question/response text is deliberately not stored.

create table if not exists private.voice_eval_usage (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  ip_hash text not null check (length(ip_hash)=64),
  care_mode boolean not null default false,
  model text not null,
  reserved_tokens integer not null check (reserved_tokens between 1 and 6000),
  prompt_tokens integer,
  completion_tokens integer,
  latency_ms integer,
  status text not null default 'reserved' check (status in ('reserved','success','upstream_error','invalid_output','service_error')),
  error_code text
);

create index if not exists voice_eval_usage_ip_created_idx on private.voice_eval_usage(ip_hash,created_at desc);
create index if not exists voice_eval_usage_created_idx on private.voice_eval_usage(created_at desc);
revoke all on private.voice_eval_usage from public, anon, authenticated;

create or replace function private.voice_eval_claim(
  p_ip_hash text,
  p_care_mode boolean,
  p_model text,
  p_reserved_tokens integer
) returns jsonb
language plpgsql
security definer
set search_path = private, pg_catalog, pg_temp
as $$
declare
  v_now timestamptz := clock_timestamp();
  v_ip_min integer;
  v_ip_hour integer;
  v_ip_day integer;
  v_global_min_tokens bigint;
  v_global_day_count integer;
  v_global_day_tokens bigint;
  v_global_month_count integer;
  v_global_month_tokens bigint;
  v_id bigint;
begin
  if p_ip_hash !~ '^[a-f0-9]{64}$' or p_reserved_tokens < 1 or p_reserved_tokens > 6000 then
    return jsonb_build_object('status','invalid');
  end if;

  perform pg_advisory_xact_lock(hashtextextended('voice-eval-global',0));
  perform pg_advisory_xact_lock(hashtextextended(p_ip_hash,0));

  delete from private.voice_eval_usage where created_at < v_now - interval '45 days';

  select count(*) filter (where created_at >= v_now - interval '1 minute'),
         count(*) filter (where created_at >= v_now - interval '1 hour'),
         count(*) filter (where created_at >= v_now - interval '1 day')
    into v_ip_min,v_ip_hour,v_ip_day
  from private.voice_eval_usage where ip_hash=p_ip_hash;

  if v_ip_min >= 3 then return jsonb_build_object('status','blocked','reason','ip_minute','retry_after',60); end if;
  if v_ip_hour >= 20 then return jsonb_build_object('status','blocked','reason','ip_hour','retry_after',900); end if;
  if v_ip_day >= 50 then return jsonb_build_object('status','blocked','reason','ip_day','retry_after',3600); end if;

  select coalesce(sum(reserved_tokens),0) into v_global_min_tokens
  from private.voice_eval_usage where created_at >= v_now - interval '1 minute';
  if v_global_min_tokens + p_reserved_tokens > 6000 then
    return jsonb_build_object('status','blocked','reason','global_minute_tokens','retry_after',20);
  end if;

  select count(*),coalesce(sum(reserved_tokens),0) into v_global_day_count,v_global_day_tokens
  from private.voice_eval_usage where created_at >= v_now - interval '1 day';
  if v_global_day_count >= 120 or v_global_day_tokens + p_reserved_tokens > 160000 then
    return jsonb_build_object('status','blocked','reason','daily_budget','retry_after',3600);
  end if;

  select count(*),coalesce(sum(reserved_tokens),0) into v_global_month_count,v_global_month_tokens
  from private.voice_eval_usage where created_at >= v_now - interval '30 days';
  if v_global_month_count >= 1500 or v_global_month_tokens + p_reserved_tokens > 1500000 then
    return jsonb_build_object('status','blocked','reason','monthly_budget','retry_after',86400);
  end if;

  insert into private.voice_eval_usage(ip_hash,care_mode,model,reserved_tokens)
  values(p_ip_hash,p_care_mode,p_model,p_reserved_tokens)
  returning id into v_id;

  return jsonb_build_object('status','ok','usage_id',v_id);
end;
$$;
revoke all on function private.voice_eval_claim(text,boolean,text,integer) from public, anon, authenticated;

create or replace function private.voice_eval_finish(
  p_usage_id bigint,
  p_status text,
  p_prompt_tokens integer default null,
  p_completion_tokens integer default null,
  p_latency_ms integer default null,
  p_error_code text default null
) returns void
language plpgsql
security definer
set search_path = private, pg_catalog, pg_temp
as $$
begin
  if p_status not in ('success','upstream_error','invalid_output','service_error') then
    raise exception 'invalid status';
  end if;

  update private.voice_eval_usage
  set status=p_status,
      prompt_tokens=case when p_prompt_tokens is null then prompt_tokens else greatest(0,p_prompt_tokens) end,
      completion_tokens=case when p_completion_tokens is null then completion_tokens else greatest(0,p_completion_tokens) end,
      latency_ms=case when p_latency_ms is null then latency_ms else greatest(0,p_latency_ms) end,
      error_code=left(p_error_code,80)
  where id=p_usage_id;
end;
$$;
revoke all on function private.voice_eval_finish(bigint,text,integer,integer,integer,text) from public, anon, authenticated;
