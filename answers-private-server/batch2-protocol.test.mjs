import assert from 'node:assert/strict';
import {
  SOURCE_COUNT, BLIND_COUNT, BLIND_SEED, assignBlindControl, auditIndex,
  qualitativeVerdict, qwenReasons, sha256,
} from './batch2-protocol.mjs';

const ids = Array.from({ length: SOURCE_COUNT }, (_, i) => `B2-${String(i + 1).padStart(4, '0')}`);
const a = assignBlindControl(ids);
const b = assignBlindControl([...ids].reverse());
assert.equal(a.length, SOURCE_COUNT);
assert.equal(a.filter(x => x.blind_control).length, BLIND_COUNT);
assert.equal(new Set(a.map(x => x.blind_rank)).size, SOURCE_COUNT);
assert.deepEqual(a.map(x => [x.id,x.blind_rank,x.blind_control]), b.map(x => [x.id,x.blind_rank,x.blind_control]));
assert.equal(a[0].blind_rank, 1);
assert.equal(a[99].blind_control, true);
assert.equal(a[100].blind_control, false);
assert.equal(sha256(`${BLIND_SEED}\n${a[0].id}`), a[0].digest);

assert.equal(auditIndex({intent:4,thai_pragmatics:4,bff_voice:4,lexical_social_fit:4,stance:4,composition:4}), 100);
assert.equal(auditIndex({intent:1,thai_pragmatics:1,bff_voice:1,lexical_social_fit:1,stance:1,composition:1}), 0);
assert.equal(auditIndex({intent:2,thai_pragmatics:2,bff_voice:2,lexical_social_fit:2,stance:2,composition:2}), 33.33);

const fluent = {intent:4,thai_pragmatics:4,bff_voice:4,lexical_social_fit:4,stance:4,composition:4,severity:'PASS',flags:[],confidence:'high',rationale:'No material issue detected.'};
assert.equal(qualitativeVerdict(fluent), 'fluent');
assert.deepEqual(qwenReasons({audit:fluent}), ['fluent','thai_pragmatics_4']);
const low = {...fluent, thai_pragmatics:3, composition:3, severity:'MINOR', confidence:'low'};
assert.equal(qualitativeVerdict(low), 'minor_problem');
assert.deepEqual(qwenReasons({audit:low,careCase:true}), ['care_case','low_confidence']);
const drift = {...fluent, intent:3, severity:'MINOR', flags:['semantic_drift']};
assert.equal(qualitativeVerdict(drift), 'not_acceptable');

console.log('batch2 protocol tests: PASS');
console.log(JSON.stringify({ firstBlind:a[0], lastBlind:a[99], firstAssisted:a[100] }, null, 2));
