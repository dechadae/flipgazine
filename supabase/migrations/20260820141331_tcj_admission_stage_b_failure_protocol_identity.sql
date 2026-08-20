alter table private.tcj_admission_stage_b_failures
  alter column protocol_version set not null;

alter table private.tcj_admission_stage_b_failures
  drop constraint if exists tcj_admission_stage_b_failure_campaign_id_evidence_item_id__key;

alter table private.tcj_admission_stage_b_failures
  add constraint tcj_stage_b_failure_protocol_cell_key
  unique (campaign_id,evidence_item_id,judge_candidate_id,protocol_version);

create index if not exists tcj_stage_b_failures_protocol_idx
  on private.tcj_admission_stage_b_failures(campaign_id,protocol_version,evidence_state);
