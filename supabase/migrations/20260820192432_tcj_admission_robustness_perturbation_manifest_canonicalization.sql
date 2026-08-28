create or replace function private.tcj_robustness_pack_manifest_guard()
returns trigger
language plpgsql
set search_path to 'pg_catalog','private'
as $$
declare
  v_manifest text;
begin
  if new.pack_key='TCJ-JUDGE-ROBUSTNESS-PERTURB-2026Q3-v1'
     and new.status='frozen'
     and old.status is distinct from 'frozen' then
    select encode(digest(string_agg(
      c.case_key||':'||
      encode(digest(c.scenario_text,'sha256'),'hex')||':'||
      encode(digest(c.candidate_text,'sha256'),'hex')||':'||
      c.family||':'||c.expected_effect||':'||
      encode(digest(c.perturbation_spec::text,'sha256'),'hex'),
      '|' order by c.case_key
    ),'sha256'),'hex')
    into v_manifest
    from private.tcj_admission_robustness_cases c
    where c.pack_id=new.id and c.review_state='approved';

    if v_manifest is null or (select count(*) from private.tcj_admission_robustness_cases c where c.pack_id=new.id and c.review_state='approved')<>33 then
      raise exception 'perturbation_manifest_guard_incomplete_review';
    end if;

    new.manifest_sha256:=v_manifest;
  end if;
  return new;
end $$;

drop trigger if exists tcj_robustness_pack_manifest_guard on private.tcj_admission_robustness_packs;
create trigger tcj_robustness_pack_manifest_guard
before update of status,manifest_sha256 on private.tcj_admission_robustness_packs
for each row execute function private.tcj_robustness_pack_manifest_guard();