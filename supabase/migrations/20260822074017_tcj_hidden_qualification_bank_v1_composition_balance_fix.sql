do $$
declare v_reviews integer; v_set_id bigint; v_item_id bigint; v_scenario text; v_candidate text;
begin
  select count(*) into v_reviews from private.tcj_qualification_human_reviews r join private.tcj_qualification_protocols p on p.id=r.protocol_id where p.protocol_key='TCJ-JUDGE-QUALIFICATION-2026Q3-v1';
  if v_reviews<>0 then raise exception 'qualification_balance_fix_requires_zero_reviews'; end if;
  select s.id into v_set_id from private.tcj_evidence_sets s where s.set_key='TCJ-JUDGE-QUALIFICATION-v1' and s.status='draft';
  if v_set_id is null then raise exception 'qualification_draft_set_missing'; end if;
  select id,scenario_text into v_item_id,v_scenario from private.tcj_evidence_items where evidence_set_id=v_set_id and item_key='QF-CMP-04';
  if v_item_id is null then raise exception 'qualification_cmp04_missing'; end if;
  v_candidate:=E'ตัดค่ะ\nผมยาวกลับมาได้\nแต่ความอยากตอนนี้\nรอไม่เก่ง';
  update private.tcj_evidence_items
     set candidate_text=v_candidate,
         candidate_sha256=encode(extensions.digest(v_candidate,'sha256'),'hex'),
         provenance='fresh qualification v1 constructed draft; native-human gold pending; pre-review composition balance correction'
   where id=v_item_id;
  update private.tcj_qualification_case_designs
     set design_class='constructed_likely_acceptable',
         construction_note='Constructed as a concise authored landing for composition sensitivity. The target and design class are hidden from the human rating UI.',
         draft_candidate_text=v_candidate,
         draft_candidate_sha256=encode(extensions.digest(v_candidate,'sha256'),'hex')
   where evidence_item_id=v_item_id;
end $$;
