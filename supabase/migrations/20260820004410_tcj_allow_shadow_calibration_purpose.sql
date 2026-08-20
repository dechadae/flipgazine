alter table private.tcj_evaluation_runs drop constraint if exists tcj_evaluation_runs_purpose_check;
alter table private.tcj_evaluation_runs add constraint tcj_evaluation_runs_purpose_check check (purpose = any (array['production_qwen'::text,'calibration_rerun'::text,'public_transient_record'::text,'calibration_shadow_v3'::text]));

alter table private.batch2_tcj_links drop constraint if exists batch2_tcj_links_purpose_check;
alter table private.batch2_tcj_links add constraint batch2_tcj_links_purpose_check check (purpose = any (array['production_qwen'::text,'calibration_rerun'::text,'calibration_shadow_v3'::text]));
