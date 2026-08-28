do $$
declare
  v_reviews integer;
  v_set_id bigint;
  v_affected integer;
begin
  select count(*) into v_reviews
  from private.tcj_qualification_human_reviews r
  join private.tcj_qualification_protocols p on p.id=r.protocol_id
  where p.protocol_key='TCJ-JUDGE-QUALIFICATION-2026Q3-v1';
  if v_reviews<>0 then raise exception 'qualification_linebreak_fix_requires_zero_reviews'; end if;

  select id into v_set_id
  from private.tcj_evidence_sets
  where set_key='TCJ-JUDGE-QUALIFICATION-v1' and status='draft';
  if v_set_id is null then raise exception 'qualification_draft_set_missing'; end if;

  select count(*) into v_affected
  from private.tcj_evidence_items
  where evidence_set_id=v_set_id and strpos(candidate_text,E'\\n')>0;
  if v_affected<>34 then raise exception 'qualification_linebreak_expected_34_got:%',v_affected; end if;

  update private.tcj_evidence_items
     set candidate_text=replace(candidate_text,E'\\n',E'\n'),
         candidate_sha256=encode(extensions.digest(replace(candidate_text,E'\\n',E'\n'),'sha256'),'hex'),
         provenance=case
           when provenance like '%pre-review composition balance correction%' then provenance||'; pre-review linebreak normalization'
           else 'fresh qualification v1 constructed draft; native-human gold pending; pre-review linebreak normalization'
         end
   where evidence_set_id=v_set_id and strpos(candidate_text,E'\\n')>0;

  update private.tcj_qualification_case_designs d
     set draft_candidate_text=i.candidate_text,
         draft_candidate_sha256=i.candidate_sha256,
         construction_provenance=d.construction_provenance||' Pre-review storage normalization converted literal backslash-n separators to real line breaks; no semantic wording change.'
    from private.tcj_evidence_items i
   where d.evidence_item_id=i.id
     and i.evidence_set_id=v_set_id
     and d.draft_candidate_text is distinct from i.candidate_text;
end $$;
