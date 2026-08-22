alter table private.tcj_qualification_human_reviews
  add column if not exists review_origin text not null default 'native_direct',
  add column if not exists source_review_id bigint references private.tcj_qualification_human_reviews(id);

do $$ begin
  if not exists (
    select 1 from pg_constraint where conname='tcj_qualification_human_reviews_origin_check' and conrelid='private.tcj_qualification_human_reviews'::regclass
  ) then
    alter table private.tcj_qualification_human_reviews
      add constraint tcj_qualification_human_reviews_origin_check
      check (review_origin in ('native_direct','carry_forward_verified_unexposed'));
  end if;
end $$;

create or replace function private.tcj_prevent_frozen_qualification_item_mutation()
returns trigger
language plpgsql
security definer
set search_path=pg_catalog,private
as $$
declare v_status text; v_bank text;
begin
  select s.status,s.bank into v_status,v_bank from private.tcj_evidence_sets s where s.id=old.evidence_set_id;
  if v_bank='qualification' and v_status in ('frozen','active','retired','compromised') then
    raise exception 'frozen_qualification_item_immutable';
  end if;
  return case when tg_op='DELETE' then old else new end;
end;
$$;
revoke all on function private.tcj_prevent_frozen_qualification_item_mutation() from public,anon,authenticated;

insert into private.tcj_evidence_sets(set_key,bank,profile_id,version,status,description,provenance)
values(
  'TCJ-JUDGE-QUALIFICATION-v1.1','qualification','answers-bff-v2','TCJ-JUDGE-QUALIFICATION-v1.1','draft',
  'Recovery Qualification Bank after v1 infrastructure incident: 47 verified-unexposed cases carried forward plus one fresh replacement for the sole provider-dispatched case.',
  jsonb_build_object(
    'recovery_from','TCJ-JUDGE-QUALIFICATION-v1',
    'incident_key','TCJ-Q-RUN-2026Q3-v1-INC-001',
    'carried_forward_cases',47,
    'fresh_replacement_cases',1,
    'provider_dispatched_original_item','QF-BFF-01',
    'carry_forward_basis','Runner v1 sends at most one evidence cell per run_next. The sole failed run_next selected QF-BFF-01 x J-57BE65E2; subsequent control requests were status reconciliation and no attempt/judgment/failure evidence exists for any other item.',
    'human_first',true,
    'candidate_judge_exposure_before_freeze',false,
    'assurance_eligible',false
  )
)
on conflict(set_key) do nothing;

with oldp as (
  select * from private.tcj_qualification_protocols where protocol_key='TCJ-JUDGE-QUALIFICATION-2026Q3-v1'
), news as (
  select id from private.tcj_evidence_sets where set_key='TCJ-JUDGE-QUALIFICATION-v1.1'
)
insert into private.tcj_qualification_protocols(
  protocol_key,evidence_set_id,profile_id,protocol_version,status,item_target,candidate_target,
  threshold_spec,threshold_sha256,threshold_frozen_at
)
select 'TCJ-JUDGE-QUALIFICATION-2026Q3-v1.1',news.id,'answers-bff-v2','TCJ-JUDGE-QUALIFICATION-v1.1','draft_review',48,3,
       oldp.threshold_spec,oldp.threshold_sha256,pg_catalog.now()
from oldp,news
on conflict(protocol_key) do nothing;

with olds as (select id from private.tcj_evidence_sets where set_key='TCJ-JUDGE-QUALIFICATION-v1'),
news as (select id from private.tcj_evidence_sets where set_key='TCJ-JUDGE-QUALIFICATION-v1.1')
insert into private.tcj_evidence_items(
  evidence_set_id,item_key,phenomenon,scenario_text,candidate_text,scenario_sha256,candidate_sha256,gold,
  provenance,source_table,source_id,exposure_state,exposure_note
)
select news.id,i.item_key,i.phenomenon,i.scenario_text,i.candidate_text,i.scenario_sha256,i.candidate_sha256,i.gold,
       'Qualification v1.1 carry-forward: native-human frozen gold preserved; original item verified not provider-dispatched before v1 infrastructure abort.',
       'private.tcj_evidence_items',i.id::text,'private',
       'Carried forward only because this specific original item was not dispatched to any candidate judge; v1 lifecycle exposure flag was bank-wide activation metadata, not per-item provider delivery.'
from olds join private.tcj_evidence_items i on i.evidence_set_id=olds.id cross join news
where i.item_key<>'QF-BFF-01'
on conflict(evidence_set_id,item_key) do nothing;

with news as (select id from private.tcj_evidence_sets where set_key='TCJ-JUDGE-QUALIFICATION-v1.1')
insert into private.tcj_evidence_items(
  evidence_set_id,item_key,phenomenon,scenario_text,candidate_text,scenario_sha256,candidate_sha256,gold,
  provenance,source_table,source_id,exposure_state,exposure_note
)
select news.id,'QF-BFF-R01','bff_deadpan_replacement',
       'เพื่อนถาม “คืนเสื้อแฟนเก่าดีไหม หรือเก็บไว้ก่อน”',
       E'คืนค่ะ\nเสื้อไม่ผิด\nแต่ตู้เราไม่ใช่พิพิธภัณฑ์',
       encode(extensions.digest('เพื่อนถาม “คืนเสื้อแฟนเก่าดีไหม หรือเก็บไว้ก่อน”','sha256'),'hex'),
       encode(extensions.digest(E'คืนค่ะ\nเสื้อไม่ผิด\nแต่ตู้เราไม่ใช่พิพิธภัณฑ์','sha256'),'hex'),
       '{}'::jsonb,
       'Fresh Qualification v1.1 replacement constructed after v1 provider-dispatch incident; native-human gold pending; no candidate model exposure.',
       null,null,'private','Fresh replacement for contaminated QF-BFF-01. Hidden construction target remains withheld from native review UI.'
from news
on conflict(evidence_set_id,item_key) do nothing;

with oldp as (select id from private.tcj_qualification_protocols where protocol_key='TCJ-JUDGE-QUALIFICATION-2026Q3-v1'),
newp as (select id,evidence_set_id from private.tcj_qualification_protocols where protocol_key='TCJ-JUDGE-QUALIFICATION-2026Q3-v1.1'),
oldslot as (
  select d.review_order from private.tcj_qualification_case_designs d
  join private.tcj_evidence_items i on i.id=d.evidence_item_id
  where d.protocol_id=(select id from oldp) and i.item_key='QF-BFF-01'
),
clones as (
  select ni.id evidence_item_id,oi.item_key,od.review_order,od.primary_dimension,od.design_class,od.construction_note,
         ni.scenario_text,ni.candidate_text,ni.scenario_sha256,ni.candidate_sha256
  from oldp
  join private.tcj_qualification_case_designs od on od.protocol_id=oldp.id
  join private.tcj_evidence_items oi on oi.id=od.evidence_item_id and oi.item_key<>'QF-BFF-01'
  cross join newp
  join private.tcj_evidence_items ni on ni.evidence_set_id=newp.evidence_set_id and ni.item_key=oi.item_key
), allcases as (
  select evidence_item_id,item_key,review_order,primary_dimension,design_class,construction_note,scenario_text,candidate_text,scenario_sha256,candidate_sha256 from clones
  union all
  select ni.id,'QF-BFF-R01',oldslot.review_order,'bff_voice','constructed_likely_acceptable',
         'Fresh recovery replacement exercising BFF voice while all six dimensions remain human-rated. Target and design class are hidden from the human rating UI.',
         ni.scenario_text,ni.candidate_text,ni.scenario_sha256,ni.candidate_sha256
  from newp cross join oldslot join private.tcj_evidence_items ni on ni.evidence_set_id=newp.evidence_set_id and ni.item_key='QF-BFF-R01'
)
insert into private.tcj_qualification_case_designs(
  protocol_id,evidence_item_id,opaque_review_id,review_order,primary_dimension,design_class,construction_note,
  draft_scenario_text,draft_candidate_text,draft_scenario_sha256,draft_candidate_sha256,construction_provenance
)
select newp.id,a.evidence_item_id,
       'QH-'||upper(substr(encode(extensions.digest(a.item_key||':TCJ-JUDGE-QUALIFICATION-2026Q3-v1.1:review-id','sha256'),'hex'),1,12)),
       a.review_order,a.primary_dimension,a.design_class,a.construction_note,
       a.scenario_text,a.candidate_text,a.scenario_sha256,a.candidate_sha256,
       case when a.item_key='QF-BFF-R01'
            then 'OpenAI GPT-5.6 Sol recovery draft; native editorial owner reviews/edits and labels before v1.1 freeze.'
            else 'Carried forward unchanged from frozen native-human-reviewed Qualification v1 item verified not provider-dispatched.' end
from newp join allcases a on true
on conflict(evidence_item_id) do nothing;

with oldp as (select id from private.tcj_qualification_protocols where protocol_key='TCJ-JUDGE-QUALIFICATION-2026Q3-v1'),
newp as (select id,evidence_set_id from private.tcj_qualification_protocols where protocol_key='TCJ-JUDGE-QUALIFICATION-2026Q3-v1.1')
insert into private.tcj_qualification_human_reviews(
  protocol_id,evidence_item_id,reviewer_user_id,review_state,final_scenario_text,final_candidate_text,
  scenario_sha256,candidate_sha256,ratings,severity,flags,confidence,human_ambiguous,review_note,revision_no,review_sha256,
  review_origin,source_review_id
)
select newp.id,ni.id,orv.reviewer_user_id,'draft',orv.final_scenario_text,orv.final_candidate_text,
       orv.scenario_sha256,orv.candidate_sha256,orv.ratings,orv.severity,orv.flags,orv.confidence,orv.human_ambiguous,orv.review_note,
       orv.revision_no,orv.review_sha256,'carry_forward_verified_unexposed',orv.id
from oldp
join private.tcj_qualification_human_reviews orv on orv.protocol_id=oldp.id and orv.review_state='frozen'
join private.tcj_evidence_items oi on oi.id=orv.evidence_item_id and oi.item_key<>'QF-BFF-01'
cross join newp
join private.tcj_evidence_items ni on ni.evidence_set_id=newp.evidence_set_id and ni.item_key=oi.item_key
on conflict(evidence_item_id) do nothing;