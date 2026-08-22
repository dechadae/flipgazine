alter table private.tcj_qualification_attempts
  add column if not exists dispatch_id bigint references private.tcj_qualification_dispatches(id),
  add column if not exists response_id bigint references private.tcj_qualification_responses(id);

do $$ begin
  if not exists (
    select 1 from pg_constraint where conname='tcj_qualification_attempts_dispatch_unique'
      and conrelid='private.tcj_qualification_attempts'::regclass
  ) then
    alter table private.tcj_qualification_attempts
      add constraint tcj_qualification_attempts_dispatch_unique unique(dispatch_id);
  end if;
  if not exists (
    select 1 from pg_constraint where conname='tcj_qualification_attempts_response_unique'
      and conrelid='private.tcj_qualification_attempts'::regclass
  ) then
    alter table private.tcj_qualification_attempts
      add constraint tcj_qualification_attempts_response_unique unique(response_id);
  end if;
end $$;
