alter table private.tcj_admission_human_reviews add column if not exists human_final_text text;
alter table private.tcj_admission_human_reviews add column if not exists human_final_sha256 text;
alter table private.tcj_admission_human_reviews add column if not exists voided_at timestamptz;
alter table private.tcj_admission_human_reviews add column if not exists void_reason text;

update private.tcj_admission_human_reviews h
set human_final_text=g.response_text,
    human_final_sha256=g.response_sha256
from private.tcj_admission_generations g
where g.id=h.generation_id
  and h.decision='ACCEPT'
  and h.voided_at is null
  and h.human_final_text is null;

update private.tcj_admission_human_reviews
set voided_at=pg_catalog.now(),
    void_reason='legacy_edit_or_rewrite_missing_human_final_text_before_v2'
where decision in ('EDIT','REWRITE')
  and voided_at is null
  and human_final_text is null;

alter table private.tcj_admission_human_reviews drop constraint if exists tcj_admission_human_reviews_generation_id_reviewer_key_key;
drop index if exists private.tcj_admission_human_reviews_generation_id_reviewer_key_key;
create unique index if not exists tcj_admission_human_reviews_active_generation_reviewer_uq
on private.tcj_admission_human_reviews(generation_id,reviewer_key)
where voided_at is null;

alter table private.tcj_admission_human_reviews drop constraint if exists tcj_admission_human_reviews_active_final_text_check;
alter table private.tcj_admission_human_reviews add constraint tcj_admission_human_reviews_active_final_text_check
check (
  voided_at is not null
  or (
    human_final_text is not null
    and length(btrim(human_final_text)) > 0
    and human_final_sha256 ~ '^[0-9a-f]{64}$'
  )
);

create index if not exists tcj_admission_human_reviews_active_reviewer_idx
on private.tcj_admission_human_reviews(reviewer_key,generation_id)
where voided_at is null;
