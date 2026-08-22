alter table private.tcj_qualification_attempts add column if not exists request_payload_text text;
alter table private.tcj_qualification_attempts add column if not exists system_prompt_text text;
alter table private.tcj_qualification_attempts add column if not exists user_payload_text text;