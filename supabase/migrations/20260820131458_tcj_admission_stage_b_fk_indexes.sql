create index if not exists tcj_stage_a_summaries_judge_idx
  on private.tcj_admission_stage_a_summaries(judge_candidate_id);

create index if not exists tcj_stage_b_judgments_evidence_idx
  on private.tcj_admission_stage_b_judgments(evidence_item_id);
create index if not exists tcj_stage_b_judgments_judge_idx
  on private.tcj_admission_stage_b_judgments(judge_candidate_id);

create index if not exists tcj_stage_b_failures_evidence_idx
  on private.tcj_admission_stage_b_failures(evidence_item_id);
create index if not exists tcj_stage_b_failures_judge_idx
  on private.tcj_admission_stage_b_failures(judge_candidate_id);

create index if not exists tcj_stage_b_summaries_judge_idx
  on private.tcj_admission_stage_b_summaries(judge_candidate_id);
create index if not exists tcj_stage_b_summaries_evidence_set_idx
  on private.tcj_admission_stage_b_summaries(evidence_set_id);
