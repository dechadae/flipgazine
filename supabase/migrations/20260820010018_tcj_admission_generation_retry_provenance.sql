create table if not exists private.tcj_admission_generation_failures (
  id bigint generated always as identity primary key,
  campaign_id bigint not null references private.tcj_admission_campaigns(id),
  scenario_id bigint not null references private.tcj_admission_scenarios(id),
  judge_candidate_id bigint not null references private.tcj_judge_candidates(id),
  attempt_count integer not null default 0 check (attempt_count >= 0),
  last_http_status integer,
  last_error_code text,
  failure_class text not null default 'transient_provider',
  first_failed_at timestamptz not null default now(),
  last_failed_at timestamptz not null default now(),
  next_retry_at timestamptz,
  resolved_at timestamptz,
  error_meta jsonb not null default '{}'::jsonb,
  unique(campaign_id,scenario_id,judge_candidate_id)
);

alter table private.tcj_admission_generation_failures enable row level security;
revoke all on private.tcj_admission_generation_failures from anon, authenticated;
create index if not exists tcj_admission_generation_failures_campaign_retry_idx on private.tcj_admission_generation_failures(campaign_id,resolved_at,next_retry_at);
create index if not exists tcj_admission_generation_failures_candidate_idx on private.tcj_admission_generation_failures(judge_candidate_id);
