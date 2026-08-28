alter table private.tcj_qualification_attempts
  add constraint tcj_qualification_attempts_exact_request_text_check
  check (request_payload_text is not null and request_sha256=encode(extensions.digest(request_payload_text,'sha256'),'hex'));

alter table private.tcj_qualification_attempts
  add constraint tcj_qualification_attempts_exact_system_text_check
  check (system_prompt_text is not null and system_prompt_sha256=encode(extensions.digest(system_prompt_text,'sha256'),'hex'));

alter table private.tcj_qualification_attempts
  add constraint tcj_qualification_attempts_exact_user_text_check
  check (user_payload_text is not null and user_payload_sha256=encode(extensions.digest(user_payload_text,'sha256'),'hex'));