import { createHash } from 'node:crypto';

export const BATCH2_PROTOCOL = Object.freeze({
  generation: 'B2-GEN-v1',
  selfAudit: 'B2-SELF-AUDIT-v1',
  blind: 'B2-BLIND-v1',
  qwenAudit: 'B2-QWEN-AUDIT-v1',
});

export const BLIND_SEED_VERSION = 'B2-BLIND-v1';
export const BLIND_SEED = 'flipgazine-batch2-blind-control-2026-08-18-v1';
export const SOURCE_COUNT = 1000;
export const BLIND_COUNT = 100;

export const DIMENSIONS = Object.freeze([
  ['intent', 0.20],
  ['thai_pragmatics', 0.25],
  ['bff_voice', 0.20],
  ['lexical_social_fit', 0.15],
  ['stance', 0.10],
  ['composition', 0.10],
]);

export const FLAGS = Object.freeze([
  'over_explained','too_complete','advisor_like','translation_shaped','weak_stance',
  'excessive_hedging','semantic_drift','unnatural_lexical_choice','inappropriate_code_mixing',
  'particle_stance_problem','register_mismatch','generic_cliche','culturally_implausible',
  'forced_humor','forced_camp','overly_slangy','weak_social_grounding','weak_composition',
  'grammatical_not_designed_breaks','weak_final_landing',
]);

const FLAG_SET = new Set(FLAGS);
const SCORE = Object.freeze({ 1: 0, 2: 100 / 3, 3: 200 / 3, 4: 100 });

export function sha256(value) {
  return createHash('sha256').update(String(value), 'utf8').digest('hex');
}

export function blindDigest(sourceId, seed = BLIND_SEED) {
  return sha256(`${seed}\n${sourceId}`);
}

export function assignBlindControl(sourceIds, { seed = BLIND_SEED, blindCount = BLIND_COUNT } = {}) {
  if (!Array.isArray(sourceIds)) throw new TypeError('sourceIds must be an array');
  if (new Set(sourceIds).size !== sourceIds.length) throw new Error('source IDs must be unique');
  if (!Number.isInteger(blindCount) || blindCount < 0 || blindCount > sourceIds.length) throw new Error('invalid blindCount');
  return sourceIds
    .map(id => ({ id, digest: blindDigest(id, seed) }))
    .sort((a, b) => a.digest.localeCompare(b.digest) || String(a.id).localeCompare(String(b.id)))
    .map((row, index) => ({ ...row, blind_rank: index + 1, blind_control: index < blindCount }));
}

export function auditIndex(ratings) {
  let total = 0;
  for (const [name, weight] of DIMENSIONS) {
    const rating = Number(ratings?.[name]);
    if (!Number.isInteger(rating) || rating < 1 || rating > 4) throw new Error(`invalid ${name}`);
    total += SCORE[rating] * weight;
  }
  return Math.round(total * 100) / 100;
}

export function qualitativeVerdict(audit) {
  const values = DIMENSIONS.map(([name]) => Number(audit?.[name]));
  for (let i = 0; i < values.length; i++) {
    if (!Number.isInteger(values[i]) || values[i] < 1 || values[i] > 4) throw new Error(`invalid ${DIMENSIONS[i][0]}`);
  }
  const flags = Array.isArray(audit?.flags) ? audit.flags : [];
  const severity = String(audit?.severity || '').toUpperCase();
  if (severity === 'CRITICAL' || Number(audit.intent) === 1 || flags.includes('semantic_drift')) return 'not_acceptable';
  if (severity === 'MAJOR' || values.some(v => v <= 2)) return 'major_problem';
  if (severity === 'MINOR' || values.some(v => v === 3)) return 'minor_problem';
  return 'fluent';
}

export function validateSelfAudit(audit) {
  if (!audit || typeof audit !== 'object' || Array.isArray(audit)) throw new Error('audit must be an object');
  auditIndex(audit);
  if (!['PASS','MINOR','MAJOR','CRITICAL'].includes(String(audit.severity || '').toUpperCase())) throw new Error('invalid severity');
  if (!Array.isArray(audit.flags) || audit.flags.length > 8 || audit.flags.some(f => !FLAG_SET.has(f))) throw new Error('invalid flags');
  if (!['high','medium','low'].includes(String(audit.confidence || '').toLowerCase())) throw new Error('invalid confidence');
  if (typeof audit.rationale !== 'string' || audit.rationale.trim().length < 5) throw new Error('invalid rationale');
  return true;
}

export function qwenReasons({ audit, careCase = false, extraReasons = [] } = {}) {
  const reasons = new Set();
  if (audit) {
    validateSelfAudit(audit);
    if (audit.thai_pragmatics === 4) reasons.add('thai_pragmatics_4');
    if (qualitativeVerdict(audit) === 'fluent') reasons.add('fluent');
    if (String(audit.confidence).toLowerCase() === 'low') reasons.add('low_confidence');
  }
  if (careCase) reasons.add('care_case');
  for (const reason of extraReasons || []) reasons.add(String(reason));
  return [...reasons].sort();
}
