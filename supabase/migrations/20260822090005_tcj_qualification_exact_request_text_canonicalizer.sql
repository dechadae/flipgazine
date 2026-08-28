create or replace function private.tcj_qualification_request_text(p jsonb)
returns text
language sql immutable
set search_path='pg_catalog','private'
as $$
  select
    '{"model":' || to_jsonb(p->>'model')::text ||
    ',"temperature":' || (p->'temperature')::text ||
    ',"max_completion_tokens":' || (p->'max_completion_tokens')::text ||
    ',"reasoning_effort":' || to_jsonb(p->>'reasoning_effort')::text ||
    ',"response_format":{"type":' || to_jsonb(p#>>'{response_format,type}')::text || '}' ||
    ',"stream":' || (p->'stream')::text ||
    ',"messages":[{"role":"system","content":' || to_jsonb(p#>>'{messages,0,content}')::text ||
    '},{"role":"user","content":' || to_jsonb(p#>>'{messages,1,content}')::text || '}]}';
$$;

create or replace function private.tcj_fill_qualification_exact_request_text()
returns trigger
language plpgsql
set search_path='pg_catalog','private'
as $$
begin
  new.request_payload_text := private.tcj_qualification_request_text(new.request_payload);
  new.system_prompt_text := new.request_payload #>> '{messages,0,content}';
  new.user_payload_text := new.request_payload #>> '{messages,1,content}';
  return new;
end $$;

drop trigger if exists tcj_qualification_exact_request_text_trg on private.tcj_qualification_attempts;
create trigger tcj_qualification_exact_request_text_trg
before insert on private.tcj_qualification_attempts
for each row execute function private.tcj_fill_qualification_exact_request_text();

revoke execute on function private.tcj_qualification_request_text(jsonb) from public,anon,authenticated;
revoke execute on function private.tcj_fill_qualification_exact_request_text() from public,anon,authenticated;