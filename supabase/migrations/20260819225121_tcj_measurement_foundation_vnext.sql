-- Live Supabase migration mirror: 20260819225121_tcj_measurement_foundation_vnext
-- Additive TCJ vNext measurement foundation. Does not alter live TCJ Standard behavior.

create table if not exists private.tcj_evidence_sets (
  id bigint generated always as identity primary key,
  set_key text not null unique,
  bank text not null check (bank in ('calibration','qualification','assurance')),
  profile_id text not null,
  version text not null,
  status text not null check (status in ('draft','frozen','active','legacy_exposed','retired','compromised')),
  description text not null default '',
  provenance jsonb not null default '{}'::jsonb,
  manifest_sha256 text,
  frozen_at timestamptz,
  exposed_at timestamptz,
  exposure_reason text,
  created_at timestamptz not null default now()
);

create table if not exists private.tcj_evidence_items (
  id bigint generated always as identity primary key,
  evidence_set_id bigint not null references private.tcj_evidence_sets(id),
  item_key text not null,
  phenomenon text,
  scenario_text text,
  candidate_text text,
  scenario_sha256 text,
  candidate_sha256 text,
  gold jsonb not null default '{}'::jsonb,
  provenance text,
  source_table text,
  source_id text,
  exposure_state text not null default 'private' check (exposure_state in ('private','methodology_exposed','qualification_exposed','public','compromised')),
  exposure_note text,
  created_at timestamptz not null default now(),
  unique (evidence_set_id,item_key)
);

create table if not exists private.tcj_judge_candidates (
  id bigint generated always as identity primary key,
  candidate_key text not null unique,
  opaque_candidate_id text not null unique,
  provider text,
  model_name text,
  model_family text,
  model_snapshot text,
  identity_state text not null default 'sealed' check (identity_state in ('sealed','revealed','historical_known')),
  lifecycle_state text not null default 'candidate' check (lifecycle_state in ('candidate','active','retired')),
  provenance jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists private.tcj_judge_passports (
  id bigint generated always as identity primary key,
  judge_candidate_id bigint not null references private.tcj_judge_candidates(id),
  passport_version text not null,
  profile_id text not null,
  admission_protocol_version text not null,
  qualification_state text not null check (qualification_state in ('historical_preliminary','qualified','partially_qualified','research_only','rejected')),
  evidence_set_id bigint references private.tcj_evidence_sets(id),
  evidence_item_count integer not null default 0 check (evidence_item_count>=0),
  production_evidence jsonb not null default '{}'::jsonb,
  judging_evidence jsonb not null default '{}'::jsonb,
  robustness_evidence jsonb not null default '{}'::jsonb,
  qualified_dimensions text[] not null default '{}'::text[],
  excluded_dimensions text[] not null default '{}'::text[],
  known_failure_clusters jsonb not null default '[]'::jsonb,
  uncertainty jsonb not null default '{}'::jsonb,
  qualified_at timestamptz,
  expires_at timestamptz,
  requalification_condition text,
  created_at timestamptz not null default now(),
  unique (judge_candidate_id,passport_version,profile_id)
);

create table if not exists private.tcj_judge_dimension_metrics (
  id bigint generated always as identity primary key,
  passport_id bigint not null references private.tcj_judge_passports(id),
  dimension_key text not null,
  cases integer not null default 0 check(cases>=0),
  valid integer not null default 0 check(valid>=0),
  exact integer not null default 0 check(exact>=0),
  within_one integer not null default 0 check(within_one>=0),
  abs_error_sum integer not null default 0 check(abs_error_sum>=0),
  mae numeric,
  metrics jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (passport_id,dimension_key)
);

create table if not exists private.tcj_admission_campaigns (
  id bigint generated always as identity primary key,
  campaign_key text not null unique,
  protocol_version text not null,
  profile_id text not null,
  status text not null default 'draft' check (status in ('draft','candidate_set_frozen','stage_a_frozen','stage_b_frozen','meta_review_frozen','identity_revealed','complete','aborted')),
  stage_a_scenario_count integer not null default 10 check(stage_a_scenario_count>0),
  candidate_set_frozen_at timestamptz,
  stage_a_frozen_at timestamptz,
  stage_b_frozen_at timestamptz,
  meta_reviews_frozen_at timestamptz,
  identity_revealed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists private.tcj_admission_campaign_candidates (
  campaign_id bigint not null references private.tcj_admission_campaigns(id),
  judge_candidate_id bigint not null references private.tcj_judge_candidates(id),
  created_at timestamptz not null default now(),
  primary key(campaign_id,judge_candidate_id)
);

create table if not exists private.tcj_admission_scenarios (
  id bigint generated always as identity primary key,
  campaign_id bigint not null references private.tcj_admission_campaigns(id),
  ordinal integer not null check(ordinal>0),
  scenario_key text not null,
  scenario_text text not null,
  scenario_sha256 text not null,
  phenomenon text,
  frozen_at timestamptz,
  created_at timestamptz not null default now(),
  unique(campaign_id,ordinal),
  unique(campaign_id,scenario_key)
);

create table if not exists private.tcj_admission_generations (
  id bigint generated always as identity primary key,
  campaign_id bigint not null references private.tcj_admission_campaigns(id),
  scenario_id bigint not null references private.tcj_admission_scenarios(id),
  judge_candidate_id bigint not null references private.tcj_judge_candidates(id),
  opaque_response_id text not null unique,
  response_text text not null,
  response_sha256 text not null,
  generation_settings jsonb not null default '{}'::jsonb,
  latency_ms integer,
  usage jsonb not null default '{}'::jsonb,
  review_order integer,
  created_at timestamptz not null default now(),
  unique(campaign_id,scenario_id,judge_candidate_id)
);

create table if not exists private.tcj_admission_human_reviews (
  id bigint generated always as identity primary key,
  generation_id bigint not null references private.tcj_admission_generations(id),
  reviewer_key text not null,
  decision text not null check(decision in ('ACCEPT','EDIT','REWRITE')),
  reason_tags text[] not null default '{}'::text[],
  review_note text,
  blind_review boolean not null default true,
  frozen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique(generation_id,reviewer_key)
);

create table if not exists private.tcj_panel_runs (
  id bigint generated always as identity primary key,
  run_key text not null unique,
  profile_id text not null,
  mode text not null check(mode in ('shadow','panel','assurance')),
  status text not null default 'pending' check(status in ('pending','running','complete','uncertain','human_review_required','failed')),
  evidence_set_id bigint references private.tcj_evidence_sets(id),
  scenario_sha256 text,
  candidate_sha256 text,
  consensus_method text not null default 'shadow_median',
  methodology_sha256 text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists private.tcj_panel_members (
  id bigint generated always as identity primary key,
  panel_run_id bigint not null references private.tcj_panel_runs(id),
  judge_candidate_id bigint not null references private.tcj_judge_candidates(id),
  passport_id bigint references private.tcj_judge_passports(id),
  evaluation_run_id bigint references private.tcj_evaluation_runs(id),
  dimension_qualification jsonb not null default '{}'::jsonb,
  included_in_consensus boolean not null default true,
  created_at timestamptz not null default now(),
  unique(panel_run_id,judge_candidate_id)
);

create table if not exists private.tcj_panel_consensus (
  id bigint generated always as identity primary key,
  panel_run_id bigint not null references private.tcj_panel_runs(id),
  dimension_key text not null,
  qualified_judge_count integer not null default 0 check(qualified_judge_count>=0),
  ratings jsonb not null default '[]'::jsonb,
  median_rating numeric,
  consensus_distribution jsonb,
  agreement_level text,
  uncertainty jsonb not null default '{}'::jsonb,
  outlier_candidate_ids bigint[] not null default '{}'::bigint[],
  escalation_required boolean not null default false,
  created_at timestamptz not null default now(),
  unique(panel_run_id,dimension_key)
);

create table if not exists private.tcj_human_review_queue (
  id bigint generated always as identity primary key,
  panel_run_id bigint references private.tcj_panel_runs(id),
  evidence_item_id bigint references private.tcj_evidence_items(id),
  source_reason text not null,
  sampled_random boolean not null default false,
  priority integer not null default 100,
  status text not null default 'pending' check(status in ('pending','in_review','frozen','revealed','closed','cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists private.tcj_human_judgments (
  id bigint generated always as identity primary key,
  queue_id bigint not null references private.tcj_human_review_queue(id),
  reviewer_key text not null,
  profile_id text not null,
  dimension_ratings jsonb not null default '{}'::jsonb,
  decision text,
  reason_tags text[] not null default '{}'::text[],
  confidence text,
  human_ambiguous boolean not null default false,
  blind_review boolean not null default true,
  frozen_at timestamptz not null default now(),
  machine_revealed_at timestamptz,
  created_at timestamptz not null default now(),
  unique(queue_id,reviewer_key)
);

create table if not exists private.tcj_contrast_families (
  id bigint generated always as identity primary key,
  family_key text not null unique,
  profile_id text not null,
  phenomenon text not null,
  changed_variable text not null,
  held_constant_variables jsonb not null default '[]'::jsonb,
  expected_direction text,
  status text not null default 'draft' check(status in ('draft','validated','active','retired')),
  created_at timestamptz not null default now()
);

create table if not exists private.tcj_contrast_items (
  id bigint generated always as identity primary key,
  family_id bigint not null references private.tcj_contrast_families(id),
  item_key text not null,
  side text not null,
  scenario_text text not null,
  candidate_text text not null,
  scenario_sha256 text,
  candidate_sha256 text,
  exposure_state text not null default 'private' check(exposure_state in ('private','qualification_exposed','public','compromised')),
  created_at timestamptz not null default now(),
  unique(family_id,item_key)
);

create table if not exists private.tcj_contrast_human_validation (
  id bigint generated always as identity primary key,
  family_id bigint not null references private.tcj_contrast_families(id),
  reviewer_key text not null,
  direction_supported boolean,
  human_ambiguous boolean not null default false,
  reason_tags text[] not null default '{}'::text[],
  blind_review boolean not null default true,
  frozen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique(family_id,reviewer_key)
);

create table if not exists private.tcj_assurance_packs (
  id bigint generated always as identity primary key,
  pack_key text not null unique,
  profile_id text not null,
  version text not null,
  status text not null default 'draft' check(status in ('draft','frozen','active','limited','retired','compromised')),
  manifest_sha256 text,
  frozen_at timestamptz,
  retired_at timestamptz,
  retirement_reason text,
  created_at timestamptz not null default now()
);

create table if not exists private.tcj_assurance_pack_items (
  pack_id bigint not null references private.tcj_assurance_packs(id),
  evidence_item_id bigint not null references private.tcj_evidence_items(id),
  ordinal integer not null check(ordinal>0),
  item_sha256 text,
  created_at timestamptz not null default now(),
  primary key(pack_id,evidence_item_id),
  unique(pack_id,ordinal)
);

create table if not exists private.tcj_assurance_pack_exposures (
  id bigint generated always as identity primary key,
  pack_id bigint not null references private.tcj_assurance_packs(id),
  exposure_type text not null,
  exposure_note text,
  exposed_at timestamptz not null default now()
);

create table if not exists private.tcj_item_health (
  id bigint generated always as identity primary key,
  evidence_item_id bigint not null references private.tcj_evidence_items(id),
  health_version integer not null default 1 check(health_version>0),
  human_agreement jsonb not null default '{}'::jsonb,
  human_ambiguous boolean not null default false,
  judge_disagreement jsonb not null default '{}'::jsonb,
  observed_difficulty jsonb not null default '{}'::jsonb,
  discrimination jsonb not null default '{}'::jsonb,
  known_shortcuts text[] not null default '{}'::text[],
  formatting_sensitivity text[] not null default '{}'::text[],
  exposure_state text not null default 'private',
  review_note text,
  retirement_reason text,
  created_at timestamptz not null default now(),
  unique(evidence_item_id,health_version)
);

create index if not exists tcj_evidence_items_set_idx on private.tcj_evidence_items(evidence_set_id);
create index if not exists tcj_passports_candidate_idx on private.tcj_judge_passports(judge_candidate_id,profile_id);
create index if not exists tcj_dim_metrics_passport_idx on private.tcj_judge_dimension_metrics(passport_id);
create index if not exists tcj_admission_generations_campaign_idx on private.tcj_admission_generations(campaign_id,review_order);
create index if not exists tcj_panel_members_run_idx on private.tcj_panel_members(panel_run_id);
create index if not exists tcj_human_review_queue_status_idx on private.tcj_human_review_queue(status,priority,created_at);
create index if not exists tcj_item_health_item_idx on private.tcj_item_health(evidence_item_id,health_version desc);

alter table private.tcj_evidence_sets enable row level security;
alter table private.tcj_evidence_items enable row level security;
alter table private.tcj_judge_candidates enable row level security;
alter table private.tcj_judge_passports enable row level security;
alter table private.tcj_judge_dimension_metrics enable row level security;
alter table private.tcj_admission_campaigns enable row level security;
alter table private.tcj_admission_campaign_candidates enable row level security;
alter table private.tcj_admission_scenarios enable row level security;
alter table private.tcj_admission_generations enable row level security;
alter table private.tcj_admission_human_reviews enable row level security;
alter table private.tcj_panel_runs enable row level security;
alter table private.tcj_panel_members enable row level security;
alter table private.tcj_panel_consensus enable row level security;
alter table private.tcj_human_review_queue enable row level security;
alter table private.tcj_human_judgments enable row level security;
alter table private.tcj_contrast_families enable row level security;
alter table private.tcj_contrast_items enable row level security;
alter table private.tcj_contrast_human_validation enable row level security;
alter table private.tcj_assurance_packs enable row level security;
alter table private.tcj_assurance_pack_items enable row level security;
alter table private.tcj_assurance_pack_exposures enable row level security;
alter table private.tcj_item_health enable row level security;

revoke all on private.tcj_evidence_sets from anon,authenticated;
revoke all on private.tcj_evidence_items from anon,authenticated;
revoke all on private.tcj_judge_candidates from anon,authenticated;
revoke all on private.tcj_judge_passports from anon,authenticated;
revoke all on private.tcj_judge_dimension_metrics from anon,authenticated;
revoke all on private.tcj_admission_campaigns from anon,authenticated;
revoke all on private.tcj_admission_campaign_candidates from anon,authenticated;
revoke all on private.tcj_admission_scenarios from anon,authenticated;
revoke all on private.tcj_admission_generations from anon,authenticated;
revoke all on private.tcj_admission_human_reviews from anon,authenticated;
revoke all on private.tcj_panel_runs from anon,authenticated;
revoke all on private.tcj_panel_members from anon,authenticated;
revoke all on private.tcj_panel_consensus from anon,authenticated;
revoke all on private.tcj_human_review_queue from anon,authenticated;
revoke all on private.tcj_human_judgments from anon,authenticated;
revoke all on private.tcj_contrast_families from anon,authenticated;
revoke all on private.tcj_contrast_items from anon,authenticated;
revoke all on private.tcj_contrast_human_validation from anon,authenticated;
revoke all on private.tcj_assurance_packs from anon,authenticated;
revoke all on private.tcj_assurance_pack_items from anon,authenticated;
revoke all on private.tcj_assurance_pack_exposures from anon,authenticated;
revoke all on private.tcj_item_health from anon,authenticated;
