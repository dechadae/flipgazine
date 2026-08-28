alter table private.tcj_admission_campaigns
  add column if not exists human_review_frozen_at timestamptz;

alter table private.tcj_admission_campaigns
  drop constraint if exists tcj_admission_campaigns_status_check;

alter table private.tcj_admission_campaigns
  add constraint tcj_admission_campaigns_status_check
  check (status = any (array[
    'draft'::text,
    'candidate_set_frozen'::text,
    'stage_a_frozen'::text,
    'human_review_frozen'::text,
    'stage_b'::text,
    'stage_b_frozen'::text,
    'meta_review_frozen'::text,
    'identity_revealed'::text,
    'complete'::text,
    'aborted'::text
  ]));

create table if not exists private.tcj_admission_stage_a_summaries (
  id bigint generated always as identity primary key,
  campaign_id bigint not null references private.tcj_admission_campaigns(id),
  judge_candidate_id bigint not null references private.tcj_judge_candidates(id),
  opaque_candidate_id text not null,
  summary_version text not null default 'TCJ-STAGE-A-SUMMARY-v1',
  reviewed_count integer not null check (reviewed_count >= 0),
  accept_count integer not null check (accept_count >= 0),
  edit_count integer not null check (edit_count >= 0),
  rewrite_count integer not null check (rewrite_count >= 0),
  changed_count integer not null check (changed_count >= 0),
  evidence_manifest_sha256 text not null check (evidence_manifest_sha256 ~ '^[0-9a-f]{64}$'),
  summary jsonb not null default '{}'::jsonb,
  frozen_at timestamptz not null,
  created_at timestamptz not null default now(),
  unique (campaign_id, judge_candidate_id)
);

create table if not exists private.tcj_admission_stage_b_judgments (
  id bigint generated always as identity primary key,
  campaign_id bigint not null references private.tcj_admission_campaigns(id),
  evidence_item_id bigint not null references private.tcj_evidence_items(id),
  judge_candidate_id bigint not null references private.tcj_judge_candidates(id),
  opaque_judgment_id text not null unique,
  protocol_version text not null,
  prompt_version text not null,
  methodology_sha256 text not null check (methodology_sha256 ~ '^[0-9a-f]{64}$'),
  diagnosis jsonb not null check (jsonb_typeof(diagnosis)='object'),
  diagnosis_sha256 text not null check (diagnosis_sha256 ~ '^[0-9a-f]{64}$'),
  raw_output jsonb not null check (jsonb_typeof(raw_output)='object'),
  predicted_verdict text not null check (predicted_verdict in ('fluent','minor_problem','major_problem','not_acceptable')),
  generation_settings jsonb not null default '{}'::jsonb,
  usage jsonb,
  latency_ms integer,
  created_at timestamptz not null default now(),
  unique (campaign_id, evidence_item_id, judge_candidate_id)
);

create table if not exists private.tcj_admission_stage_b_failures (
  id bigint generated always as identity primary key,
  campaign_id bigint not null references private.tcj_admission_campaigns(id),
  evidence_item_id bigint not null references private.tcj_evidence_items(id),
  judge_candidate_id bigint not null references private.tcj_judge_candidates(id),
  attempt_count integer not null default 1 check (attempt_count > 0),
  last_http_status integer,
  last_error_code text not null,
  failure_class text not null check (failure_class in ('transient_provider','generation_contract','infrastructure')),
  first_failed_at timestamptz not null default now(),
  last_failed_at timestamptz not null default now(),
  next_retry_at timestamptz,
  resolved_at timestamptz,
  error_meta jsonb not null default '{}'::jsonb,
  unique (campaign_id, evidence_item_id, judge_candidate_id)
);

create table if not exists private.tcj_admission_stage_b_summaries (
  id bigint generated always as identity primary key,
  campaign_id bigint not null references private.tcj_admission_campaigns(id),
  judge_candidate_id bigint not null references private.tcj_judge_candidates(id),
  evidence_set_id bigint not null references private.tcj_evidence_sets(id),
  summary_version text not null default 'TCJ-STAGE-B-SUMMARY-v1',
  case_count integer not null check (case_count >= 0),
  valid_count integer not null check (valid_count >= 0),
  dimension_metrics jsonb not null default '{}'::jsonb,
  error_metrics jsonb not null default '{}'::jsonb,
  evidence_manifest_sha256 text not null check (evidence_manifest_sha256 ~ '^[0-9a-f]{64}$'),
  frozen_at timestamptz not null,
  created_at timestamptz not null default now(),
  unique (campaign_id, judge_candidate_id)
);

alter table private.tcj_admission_stage_a_summaries enable row level security;
alter table private.tcj_admission_stage_b_judgments enable row level security;
alter table private.tcj_admission_stage_b_failures enable row level security;
alter table private.tcj_admission_stage_b_summaries enable row level security;

revoke all on table private.tcj_admission_stage_a_summaries from anon, authenticated;
revoke all on table private.tcj_admission_stage_b_judgments from anon, authenticated;
revoke all on table private.tcj_admission_stage_b_failures from anon, authenticated;
revoke all on table private.tcj_admission_stage_b_summaries from anon, authenticated;

create index if not exists tcj_stage_a_summaries_campaign_idx on private.tcj_admission_stage_a_summaries(campaign_id);
create index if not exists tcj_stage_b_judgments_campaign_idx on private.tcj_admission_stage_b_judgments(campaign_id);
create index if not exists tcj_stage_b_judgments_candidate_idx on private.tcj_admission_stage_b_judgments(campaign_id,judge_candidate_id);
create index if not exists tcj_stage_b_failures_campaign_idx on private.tcj_admission_stage_b_failures(campaign_id) where resolved_at is null;
create index if not exists tcj_stage_b_summaries_campaign_idx on private.tcj_admission_stage_b_summaries(campaign_id);

do $$
declare
  cid bigint;
  expected_count integer;
  generation_count integer;
  active_count integer;
  active_generation_count integer;
  bad_count integer;
begin
  select id into cid
  from private.tcj_admission_campaigns
  where campaign_key='TCJ-JUDGE-ADMISSION-2026Q3-v1.2';

  if cid is null then
    raise exception 'TCJ v1.2 campaign missing';
  end if;

  select count(*)::int into generation_count
  from private.tcj_admission_generations
  where campaign_id=cid;

  select count(*)::int into expected_count
  from private.tcj_admission_campaign_candidates cc
  cross join private.tcj_admission_scenarios s
  where cc.campaign_id=cid and s.campaign_id=cid;

  select count(*)::int, count(distinct h.generation_id)::int
  into active_count, active_generation_count
  from private.tcj_admission_human_reviews h
  join private.tcj_admission_generations g on g.id=h.generation_id
  where g.campaign_id=cid and h.voided_at is null;

  select count(*)::int into bad_count
  from private.tcj_admission_generations g
  left join private.tcj_admission_human_reviews h
    on h.generation_id=g.id and h.voided_at is null
  where g.campaign_id=cid
    and (
      g.review_order is null
      or h.id is null
      or h.frozen_at is null
      or h.blind_review is distinct from true
      or h.human_final_text is null
      or btrim(h.human_final_text)=''
      or h.human_final_sha256 !~ '^[0-9a-f]{64}$'
      or h.human_final_sha256 <> encode(extensions.digest(convert_to(h.human_final_text,'UTF8'),'sha256'),'hex')
      or (h.decision='ACCEPT' and h.human_final_text <> g.response_text)
      or (h.decision in ('EDIT','REWRITE') and btrim(h.human_final_text)=btrim(g.response_text))
    );

  if generation_count <> expected_count or expected_count <> 30 or active_count <> 30 or active_generation_count <> 30 or bad_count <> 0 then
    raise exception 'Stage A integrity gate failed: generated %, expected %, active %, distinct %, bad %', generation_count, expected_count, active_count, active_generation_count, bad_count;
  end if;

  insert into private.tcj_admission_stage_a_summaries(
    campaign_id,judge_candidate_id,opaque_candidate_id,reviewed_count,accept_count,edit_count,rewrite_count,changed_count,evidence_manifest_sha256,summary,frozen_at
  )
  select
    cid,
    j.id,
    j.opaque_candidate_id,
    count(*)::int,
    count(*) filter(where h.decision='ACCEPT')::int,
    count(*) filter(where h.decision='EDIT')::int,
    count(*) filter(where h.decision='REWRITE')::int,
    count(*) filter(where h.decision in ('EDIT','REWRITE'))::int,
    encode(extensions.digest(convert_to(string_agg(g.review_order::text||':'||g.response_sha256||':'||h.decision||':'||h.human_final_sha256,'|' order by g.review_order),'UTF8'),'sha256'),'hex'),
    jsonb_build_object(
      'blind_review',true,
      'human_final_present',count(*) filter(where h.human_final_text is not null)=count(*),
      'voided_rows_excluded',true,
      'source_review_count',count(*)
    ),
    now()
  from private.tcj_admission_campaign_candidates cc
  join private.tcj_judge_candidates j on j.id=cc.judge_candidate_id
  join private.tcj_admission_generations g on g.campaign_id=cc.campaign_id and g.judge_candidate_id=j.id
  join private.tcj_admission_human_reviews h on h.generation_id=g.id and h.voided_at is null
  where cc.campaign_id=cid
  group by j.id,j.opaque_candidate_id
  on conflict(campaign_id,judge_candidate_id) do nothing;

  update private.tcj_admission_campaigns
  set status='human_review_frozen', human_review_frozen_at=coalesce(human_review_frozen_at,now())
  where id=cid and identity_revealed_at is null;
end $$;
