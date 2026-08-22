create or replace function private.tcj_protect_carried_qualification_review()
returns trigger
language plpgsql
security definer
set search_path=pg_catalog,private
as $$
begin
  if old.review_origin='carry_forward_verified_unexposed' then
    if tg_op='DELETE' then
      raise exception 'carried_qualification_review_immutable';
    end if;
    if tg_op='UPDATE'
       and old.review_state='draft'
       and new.review_state='frozen'
       and new.frozen_at is not null
       and new.id is not distinct from old.id
       and new.protocol_id is not distinct from old.protocol_id
       and new.evidence_item_id is not distinct from old.evidence_item_id
       and new.reviewer_user_id is not distinct from old.reviewer_user_id
       and new.final_scenario_text is not distinct from old.final_scenario_text
       and new.final_candidate_text is not distinct from old.final_candidate_text
       and new.scenario_sha256 is not distinct from old.scenario_sha256
       and new.candidate_sha256 is not distinct from old.candidate_sha256
       and new.ratings is not distinct from old.ratings
       and new.severity is not distinct from old.severity
       and new.flags is not distinct from old.flags
       and new.confidence is not distinct from old.confidence
       and new.human_ambiguous is not distinct from old.human_ambiguous
       and new.review_note is not distinct from old.review_note
       and new.revision_no is not distinct from old.revision_no
       and new.review_sha256 is not distinct from old.review_sha256
       and new.created_at is not distinct from old.created_at
       and new.review_origin is not distinct from old.review_origin
       and new.source_review_id is not distinct from old.source_review_id
    then
      return new;
    end if;
    raise exception 'carried_qualification_review_immutable';
  end if;
  return case when tg_op='DELETE' then old else new end;
end;
$$;
revoke all on function private.tcj_protect_carried_qualification_review() from public,anon,authenticated;

drop trigger if exists tcj_qualification_carried_review_immutable_trg on private.tcj_qualification_human_reviews;
create trigger tcj_qualification_carried_review_immutable_trg
before update or delete on private.tcj_qualification_human_reviews
for each row execute function private.tcj_protect_carried_qualification_review();