import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  CARE,
  MAX_BROAD_WIDEN,
  MIN_POOL,
  RECENT_LIMIT,
  SOURCE_FINGERPRINTS,
} from './router-v124.mjs';

const FROZEN = Object.freeze({
  sourceControllerMd5: 'c8a382f0562737422e891e3300bb08f6',
  routerCoreMd5: '0136cd0b127f4c6c30c8ec098d7ac2e8',
  careMd5: '406dd4fb9bd3278e5300a1b46d86fd8e',
  finalFallbackMd5: '76abfbf89bb565575a48f2bead0c6981',
  routeCases: 64626,
});

const proof = JSON.parse(fs.readFileSync(new URL('./phase-i-acceptance-proof.json', import.meta.url), 'utf8'));
assert.equal(proof.status, 'PASS', 'Phase I acceptance proof is not PASS');
assert.equal(proof.deterministic_parity.status, 'PASS', 'frozen deterministic parity proof is not PASS');
assert.equal(proof.deterministic_parity.route_cases, FROZEN.routeCases, 'frozen route-case count drift');
assert.equal(proof.deterministic_parity.route_differences, 0, 'frozen deterministic parity had differences');
assert.equal(proof.deterministic_parity.stored_source_controller_md5, FROZEN.sourceControllerMd5, 'frozen source MD5 drift');
assert.equal(proof.deterministic_parity.exactly_two_universals, true, '2-Universal invariant not proved');
assert.equal(proof.deterministic_parity.uniform_probability, true, 'uniform probability invariant not proved');
assert.equal(proof.deterministic_parity.min_pool, 2);
assert.equal(proof.deterministic_parity.max_broad_widen, 12);
assert.equal(proof.deterministic_parity.recent_limit, 6);

assert.equal(SOURCE_FINGERPRINTS.sourceControllerMd5, FROZEN.sourceControllerMd5, 'live canonical router provenance source MD5 drift');
assert.equal(SOURCE_FINGERPRINTS.routerCoreMd5, FROZEN.routerCoreMd5, 'live canonical router core provenance drift');
assert.equal(SOURCE_FINGERPRINTS.careMd5, FROZEN.careMd5, 'live CARE provenance drift');
assert.equal(SOURCE_FINGERPRINTS.finalFallbackMd5, FROZEN.finalFallbackMd5, 'live final fallback provenance drift');
assert.equal(MIN_POOL, 2);
assert.equal(MAX_BROAD_WIDEN, 12);
assert.equal(RECENT_LIMIT, 6);
assert.equal(CARE.length, 3);

console.log('POSTCUTOVER_V124_GUARD=' + JSON.stringify({
  status: 'PASS',
  frozen_full_parity_run_id: proof.deterministic_parity.workflow_run_id,
  frozen_full_parity_job_id: proof.deterministic_parity.job_id,
  frozen_route_cases: proof.deterministic_parity.route_cases,
  frozen_route_differences: proof.deterministic_parity.route_differences,
  source_controller_md5: SOURCE_FINGERPRINTS.sourceControllerMd5,
  router_core_md5: SOURCE_FINGERPRINTS.routerCoreMd5,
  care_md5: SOURCE_FINGERPRINTS.careMd5,
  final_fallback_md5: SOURCE_FINGERPRINTS.finalFallbackMd5,
  min_pool: MIN_POOL,
  max_broad_widen: MAX_BROAD_WIDEN,
  recent_limit: RECENT_LIMIT,
  exactly_two_universals_proved: true,
  uniform_probability_proved: true,
  note: 'After Phase J the public controller is intentionally slim; the immutable full 64,626-case Phase I proof is the frozen reference, while current router unit tests guard the deployed canonical implementation.'
}));
