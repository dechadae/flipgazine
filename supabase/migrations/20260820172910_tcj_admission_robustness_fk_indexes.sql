create index if not exists tcj_robustness_attempts_case_idx on private.tcj_admission_robustness_attempts(case_id);
create index if not exists tcj_robustness_failures_case_idx on private.tcj_admission_robustness_failures(case_id);
create index if not exists tcj_robustness_judgments_case_idx on private.tcj_admission_robustness_judgments(case_id);