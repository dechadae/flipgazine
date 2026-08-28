#!/usr/bin/env node
import fs from 'node:fs';
import { assignBlindControl, BLIND_SEED, BLIND_SEED_VERSION, BLIND_COUNT, SOURCE_COUNT, sha256 } from './batch2-protocol.mjs';

function usage() {
  console.error('Usage: node batch2-prepare-source-set.mjs <sources.jsonl> [output.jsonl]');
  process.exit(2);
}

const input = process.argv[2];
const output = process.argv[3] || '-';
if (!input) usage();
const lines = fs.readFileSync(input, 'utf8').split(/\r?\n/).filter(Boolean);
const rows = lines.map((line, i) => {
  let row;
  try { row = JSON.parse(line); } catch { throw new Error(`invalid JSON at line ${i + 1}`); }
  const id = String(row.id || '').trim();
  const q = String(row.question_or_scenario || '').trim();
  if (!id) throw new Error(`missing id at line ${i + 1}`);
  if (!q) throw new Error(`missing question_or_scenario at line ${i + 1}`);
  return { ...row, id, question_or_scenario: q, source_ordinal: i + 1 };
});
if (rows.length !== SOURCE_COUNT) throw new Error(`expected exactly ${SOURCE_COUNT} sources; got ${rows.length}`);
const assignment = new Map(assignBlindControl(rows.map(r => r.id)).map(r => [r.id, r]));
const prepared = rows.map(row => {
  const a = assignment.get(row.id);
  return {
    ...row,
    blind_control: a.blind_control,
    blind_rank: a.blind_rank,
    blind_seed_version: BLIND_SEED_VERSION,
    scenario_sha256: sha256(row.question_or_scenario),
  };
});
if (prepared.filter(r => r.blind_control).length !== BLIND_COUNT) throw new Error('blind-control cardinality invariant failed');
const manifestText = prepared.map(r => [
  r.id,r.source_ordinal,r.question_or_scenario,r.domain || '',r.intended_focus || '',
  Boolean(r.care_case),r.blind_control,r.blind_rank,r.blind_seed_version,
].join('\t')).join('\n');
const manifest = {
  source_count: prepared.length,
  blind_count: BLIND_COUNT,
  blind_seed_version: BLIND_SEED_VERSION,
  blind_seed: BLIND_SEED,
  blind_algorithm: 'sha256(seed + newline + source_id), ascending rank',
  source_manifest_sha256: sha256(manifestText),
};
const rendered = prepared.map(r => JSON.stringify(r)).join('\n') + '\n';
if (output === '-') process.stdout.write(rendered);
else fs.writeFileSync(output, rendered);
process.stderr.write(JSON.stringify(manifest) + '\n');
