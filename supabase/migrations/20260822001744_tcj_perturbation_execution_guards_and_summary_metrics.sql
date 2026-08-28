alter table private.tcj_admission_robustness_summaries
  add column if not exists perturbation_metrics jsonb not null default '{}'::jsonb;

do $$ begin
  if not exists (
    select 1 from pg_constraint
    where conname='tcj_admission_robustness_summaries_perturbation_metrics_check'
      and conrelid='private.tcj_admission_robustness_summaries'::regclass
  ) then
    alter table private.tcj_admission_robustness_summaries
      add constraint tcj_admission_robustness_summaries_perturbation_metrics_check
      check (jsonb_typeof(perturbation_metrics)='object');
  end if;
end $$;

create or replace function private.tcj_perturbation_case_immutable_guard()
returns trigger
language plpgsql
set search_path to 'pg_catalog','private'
as $$
begin
  if old.frozen_at is not null and (
       new.pack_id is distinct from old.pack_id
    or new.case_key is distinct from old.case_key
    or new.family is distinct from old.family
    or new.scenario_text is distinct from old.scenario_text
    or new.candidate_text is distinct from old.candidate_text
    or new.scenario_sha256 is distinct from old.scenario_sha256
    or new.candidate_sha256 is distinct from old.candidate_sha256
    or new.source_evidence_item_id is distinct from old.source_evidence_item_id
    or new.source_generation_id is distinct from old.source_generation_id
    or new.source_generator_judge_id is distinct from old.source_generator_judge_id
    or new.source_meta is distinct from old.source_meta
    or new.expected_effect is distinct from old.expected_effect
    or new.perturbation_spec is distinct from old.perturbation_spec
    or new.review_state is distinct from old.review_state
    or new.reviewed_at is distinct from old.reviewed_at
    or new.reviewed_by is distinct from old.reviewed_by
    or new.pair_key is distinct from old.pair_key
    or new.variant_role is distinct from old.variant_role
    or new.survival_state is distinct from old.survival_state
    or new.survival_note is distinct from old.survival_note
    or new.survival_checked_at is distinct from old.survival_checked_at
    or new.frozen_at is distinct from old.frozen_at
  ) then
    raise exception 'frozen_perturbation_case_immutable';
  end if;
  return new;
end $$;

drop trigger if exists tcj_perturbation_case_immutable_trg on private.tcj_admission_robustness_cases;
create trigger tcj_perturbation_case_immutable_trg
before update on private.tcj_admission_robustness_cases
for each row
when (old.frozen_at is not null)
execute function private.tcj_perturbation_case_immutable_guard();

create or replace function private.tcj_perturbation_pack_state_guard()
returns trigger
language plpgsql
set search_path to 'pg_catalog','private'
as $$
declare
  v_manifest text;
  v_cases int;
  v_frozen int;
  v_survival int;
  v_done int;
  v_summaries int;
  v_sealed int;
  v_revealed timestamptz;
begin
  if new.pack_key <> 'TCJ-JUDGE-ROBUSTNESS-PERTURB-2026Q3-v1' then
    return new;
  end if;

  if old.status in ('frozen','running','complete') then
    if new.manifest_sha256 is distinct from old.manifest_sha256 then
      raise exception 'frozen_perturbation_manifest_immutable';
    end if;
    if new.frozen_at is distinct from old.frozen_at then
      raise exception 'frozen_perturbation_timestamp_immutable';
    end if;
  end if;

  if old.status='complete' and new.status is distinct from 'complete' then
    raise exception 'completed_perturbation_pack_immutable';
  end if;

  if old.status='frozen' and new.status='running' then
    select count(*)::int,
           count(*) filter(where c.frozen_at is not null)::int,
           count(*) filter(where c.review_state='approved' and c.survival_state='pass')::int,
           encode(extensions.digest(string_agg(
             c.case_key||':'||
             encode(extensions.digest(c.scenario_text,'sha256'),'hex')||':'||
             encode(extensions.digest(c.candidate_text,'sha256'),'hex')||':'||
             c.family||':'||c.expected_effect||':'||
             encode(extensions.digest(c.perturbation_spec::text,'sha256'),'hex'),
             '|' order by c.case_key
           ),'sha256'),'hex')
      into v_cases,v_frozen,v_survival,v_manifest
    from private.tcj_admission_robustness_cases c
    where c.pack_id=old.id;

    select count(*) filter(where j.identity_state='sealed')::int,
           max(ca.identity_revealed_at)
      into v_sealed,v_revealed
    from private.tcj_admission_campaigns ca
    join private.tcj_admission_campaign_candidates cc on cc.campaign_id=ca.id
    join private.tcj_judge_candidates j on j.id=cc.judge_candidate_id
    where ca.id=old.campaign_id;

    if v_cases<>33 or v_frozen<>33 or v_survival<>33 then
      raise exception 'perturbation_execution_case_gate_failed';
    end if;
    if old.manifest_sha256 is null or old.manifest_sha256<>v_manifest then
      raise exception 'perturbation_execution_manifest_gate_failed';
    end if;
    if v_sealed<>3 or v_revealed is not null then
      raise exception 'perturbation_execution_identity_gate_failed';
    end if;
  elsif old.status='running' and new.status='complete' then
    select
      (select count(*) from private.tcj_admission_robustness_judgments j
       where j.pack_id=old.id and j.protocol_version='TCJ-JUDGE-ROBUSTNESS-PERTURB-v1')
      +
      (select count(*) from private.tcj_admission_robustness_failures f
       where f.pack_id=old.id and f.protocol_version='TCJ-JUDGE-ROBUSTNESS-PERTURB-v1'
         and f.evidence_state='terminal' and f.failure_class='generation_contract')
      into v_done;

    select count(*)::int into v_summaries
    from private.tcj_admission_robustness_summaries s
    where s.pack_id=old.id and s.summary_version='TCJ-ROBUSTNESS-PERTURB-SUMMARY-v1';

    select count(*) filter(where j.identity_state='sealed')::int,
           max(ca.identity_revealed_at)
      into v_sealed,v_revealed
    from private.tcj_admission_campaigns ca
    join private.tcj_admission_campaign_candidates cc on cc.campaign_id=ca.id
    join private.tcj_judge_candidates j on j.id=cc.judge_candidate_id
    where ca.id=old.campaign_id;

    if v_done<>99 then raise exception 'perturbation_completion_cell_gate_failed:%',v_done; end if;
    if v_summaries<>3 then raise exception 'perturbation_completion_summary_gate_failed:%',v_summaries; end if;
    if v_sealed<>3 or v_revealed is not null then raise exception 'perturbation_completion_identity_gate_failed'; end if;
  elsif new.status is distinct from old.status then
    if not (old.status='draft' and new.status='frozen')
       and not (old.status='frozen' and new.status='running')
       and not (old.status='running' and new.status='complete') then
      raise exception 'invalid_perturbation_pack_transition:%->%',old.status,new.status;
    end if;
  end if;

  return new;
end $$;

drop trigger if exists tcj_perturbation_pack_state_guard_trg on private.tcj_admission_robustness_packs;
create trigger tcj_perturbation_pack_state_guard_trg
before update on private.tcj_admission_robustness_packs
for each row execute function private.tcj_perturbation_pack_state_guard();

revoke all on function private.tcj_perturbation_case_immutable_guard() from public, anon, authenticated;
revoke all on function private.tcj_perturbation_pack_state_guard() from public, anon, authenticated;
