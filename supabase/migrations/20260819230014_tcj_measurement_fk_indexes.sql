-- Live Supabase migration mirror: 20260819230014_tcj_measurement_fk_indexes
-- Added after Supabase performance-advisor verification of the initial measurement foundation.

create index if not exists tcj_admission_campaign_candidates_judge_idx on private.tcj_admission_campaign_candidates(judge_candidate_id);
create index if not exists tcj_admission_generations_scenario_idx on private.tcj_admission_generations(scenario_id);
create index if not exists tcj_admission_generations_judge_idx on private.tcj_admission_generations(judge_candidate_id);
create index if not exists tcj_assurance_pack_exposures_pack_idx on private.tcj_assurance_pack_exposures(pack_id);
create index if not exists tcj_assurance_pack_items_evidence_idx on private.tcj_assurance_pack_items(evidence_item_id);
create index if not exists tcj_human_review_queue_evidence_idx on private.tcj_human_review_queue(evidence_item_id);
create index if not exists tcj_human_review_queue_panel_idx on private.tcj_human_review_queue(panel_run_id);
create index if not exists tcj_judge_passports_evidence_set_idx on private.tcj_judge_passports(evidence_set_id);
create index if not exists tcj_panel_members_eval_run_idx on private.tcj_panel_members(evaluation_run_id);
create index if not exists tcj_panel_members_judge_idx on private.tcj_panel_members(judge_candidate_id);
create index if not exists tcj_panel_members_passport_idx on private.tcj_panel_members(passport_id);
create index if not exists tcj_panel_runs_evidence_set_idx on private.tcj_panel_runs(evidence_set_id);
