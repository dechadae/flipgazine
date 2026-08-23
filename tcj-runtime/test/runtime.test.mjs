import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const SERVER = resolve(ROOT, 'src/server.mjs');
const PACK = resolve(HERE, 'fixtures/methodology-pack.json');
const VOICE = resolve(HERE, 'fixtures/voice-profile.json');

async function startServer(overrides={}) {
  const port = 19000 + Math.floor(Math.random() * 1000);
  const child = spawn(process.execPath, [SERVER], {
    cwd: ROOT,
    env: {
      ...process.env,
      TCJ_PORT: String(port),
      TCJ_JUDGE_MODE: 'mock',
      TCJ_ALLOW_EXTERNAL_JUDGE: 'false',
      TCJ_METHODOLOGY_PACK_PATH: PACK,
      TCJ_VOICE_PROFILE_PATH: VOICE,
      TCJ_PASSPORT_PATH: resolve(HERE, 'fixtures/not-issued.json'),
      ...overrides,
    },
    stdio: ['ignore','pipe','pipe'],
  });
  let stderr='';
  child.stderr.on('data', d => { stderr += d.toString(); });
  await new Promise((resolveReady,reject) => {
    const timer=setTimeout(()=>reject(new Error(`server_start_timeout:${stderr}`)),5000);
    child.stdout.on('data',d=>{
      if(d.toString().includes('TCJ runtime listening')){clearTimeout(timer);resolveReady();}
    });
    child.on('exit',code=>{clearTimeout(timer);reject(new Error(`server_exited:${code}:${stderr}`));});
  });
  return {port, child, stop:()=>child.kill('SIGTERM')};
}

const diagnosis = overrides => ({
  dimensions:{intent:4,thai_pragmatics:4,bff_voice:4,lexical_social_fit:4,stance:4,composition:4},
  severity:'PASS',flags:[],rationale:{overall:'fixture'},confidence:'high',escalated_dimensions:[],...overrides
});

async function post(port,path,body){
  const r=await fetch(`http://127.0.0.1:${port}${path}`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
  return {status:r.status,body:await r.json()};
}

test('mock runtime starts with external dispatch disabled and routes factual context', async t => {
  const s=await startServer(); t.after(s.stop);
  const health=await fetch(`http://127.0.0.1:${s.port}/v1/health`).then(r=>r.json());
  assert.equal(health.ok,true);
  assert.equal(health.external_dispatch_enabled,false);

  const out=await post(s.port,'/v1/evaluate',{
    scenario:'เพื่อนส่งหน้าร้านที่ระบุ Sunday 10:00–18:00 แล้วถามว่า ร้านนี้เปิดวันอาทิตย์ไหม',
    candidate:'เอาเสื้อสีเข้มไปดีกว่า',
    debug_mock_diagnosis:diagnosis({
      dimensions:{intent:1,thai_pragmatics:4,bff_voice:4,lexical_social_fit:4,stance:4,composition:4},
      severity:'MAJOR',flags:['smooth_nonanswer']
    })
  });
  assert.equal(out.status,200);
  assert.equal(out.body.decision,'REVISE');
  assert.ok(out.body.release.release_evidence.blockers.includes('concrete_factual_noncompletion'));
  assert.ok(out.body.selected_modules.includes('M01'));
  assert.equal(out.body.configuration.external_dispatch_enabled,false);
});

test('pairwise stance preference does not become automatic release rejection', async t => {
  const s=await startServer(); t.after(s.stop);
  const out=await post(s.port,'/v1/evaluate',{
    scenario:'เพื่อนเพิ่งคุยกับคนในแอปสองอาทิตย์ อีกฝ่ายขอให้ค้ำเงินกู้ แล้วถามว่า ช่วยเขาดีไหม',
    candidate:'ช่วยเลยค่ะ\nรักกันต้องเสี่ยง',
    debug_mock_diagnosis:diagnosis({
      dimensions:{intent:4,thai_pragmatics:4,bff_voice:4,lexical_social_fit:4,stance:2,composition:4},
      severity:'PASS',flags:['performative_hyperbole']
    })
  });
  assert.equal(out.status,200);
  assert.equal(out.body.decision,'ACCEPT');
  assert.equal(out.body.release.release_evidence.blockers.length,0);
  assert.ok(out.body.release.release_evidence.warnings.includes('stance_risk_escalation_requires_semantic_read'));
});

test('sarcastic BFF surface can remain shippable when semantic judge marks it PASS', async t => {
  const s=await startServer(); t.after(s.stop);
  const out=await post(s.port,'/v1/evaluate',{
    scenario:'เพื่อนบอกว่าเพิ่งโดนบริษัทเลิกจ้าง',
    candidate:'ยินดีด้วยนะ อย่างน้อยก็ได้พัก',
    debug_mock_diagnosis:diagnosis({flags:['bff_sarcasm']})
  });
  assert.equal(out.status,200);
  assert.equal(out.body.decision,'ACCEPT');
  assert.deepEqual(out.body.release.release_evidence.blockers,[]);
});

test('BYOK mode refuses dispatch before network when external gate is off', async t => {
  const s=await startServer({
    TCJ_JUDGE_MODE:'byok',
    TCJ_ALLOW_EXTERNAL_JUDGE:'false',
    TCJ_JUDGE_BASE_URL:'https://example.invalid/v1',
    TCJ_JUDGE_MODEL:'gpt-5.6',
    TCJ_JUDGE_API_KEY:'MUST_NOT_BE_USED'
  });
  t.after(s.stop);
  const out=await post(s.port,'/v1/evaluate',{scenario:'ทดสอบ',candidate:'ทดสอบ'});
  assert.equal(out.status,409);
  assert.equal(out.body.error,'external_judge_dispatch_disabled');
});

test('invalid mock diagnosis is rejected', async t => {
  const s=await startServer(); t.after(s.stop);
  const out=await post(s.port,'/v1/evaluate',{
    scenario:'เพื่อนถามว่า ร้านเปิดไหม',candidate:'เปิดนะ',
    debug_mock_diagnosis:diagnosis({dimensions:{intent:5,thai_pragmatics:4,bff_voice:4,lexical_social_fit:4,stance:4,composition:4}})
  });
  assert.equal(out.status,409);
  assert.equal(out.body.error,'diagnosis_dimension_invalid:intent');
});
