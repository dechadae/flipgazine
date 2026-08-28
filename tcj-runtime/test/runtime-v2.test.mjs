import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const HERE=dirname(fileURLToPath(import.meta.url));
const ROOT=resolve(HERE,'..');
const SERVER=resolve(ROOT,'src/server-v2.mjs');
const PACK=resolve(HERE,'fixtures/methodology-pack.json');
const VOICE=resolve(HERE,'fixtures/voice-profile.json');

const rationale=()=>({intent:'fixture',thai_pragmatics:'fixture',bff_voice:'fixture',lexical_social_fit:'fixture',stance:'fixture',composition:'fixture',overall:'fixture'});
const diagnosis=(overrides={})=>({dimensions:{intent:4,thai_pragmatics:4,bff_voice:4,lexical_social_fit:4,stance:4,composition:4},severity:'PASS',flags:[],rationale:rationale(),confidence:'high',escalated_dimensions:[],...overrides});

async function listen(server){return await new Promise((resolveReady,reject)=>{server.listen(0,'127.0.0.1',()=>resolveReady(server.address().port));server.on('error',reject);});}
async function startRuntime(overrides={}){
  const port=19000+Math.floor(Math.random()*1000);
  const child=spawn(process.execPath,[SERVER],{cwd:ROOT,env:{...process.env,TCJ_PORT:String(port),TCJ_JUDGE_MODE:'mock',TCJ_ALLOW_EXTERNAL_JUDGE:'false',TCJ_METHODOLOGY_PACK_PATH:PACK,TCJ_VOICE_PROFILE_PATH:VOICE,TCJ_PASSPORT_PATH:resolve(HERE,'fixtures/not-issued.json'),...overrides},stdio:['ignore','pipe','pipe']});
  let stderr='';child.stderr.on('data',d=>stderr+=d.toString());
  await new Promise((resolveReady,reject)=>{const timer=setTimeout(()=>reject(new Error(`runtime_start_timeout:${stderr}`)),5000);child.stdout.on('data',d=>{if(d.toString().includes('TCJ runtime v2.1 listening')){clearTimeout(timer);resolveReady();}});child.on('exit',code=>{clearTimeout(timer);reject(new Error(`runtime_exited:${code}:${stderr}`));});});
  return{port,child,stop:()=>child.kill('SIGTERM')};
}
async function post(port,path,body){const r=await fetch(`http://127.0.0.1:${port}${path}`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});return{status:r.status,body:await r.json()};}

async function fakeEvidence(){
  const seen=[];
  const server=http.createServer(async(req,res)=>{let raw='';for await(const c of req)raw+=c;const body=raw?JSON.parse(raw):{};seen.push({url:req.url,body});res.setHeader('content-type','application/json');if(req.url==='/v1/session'){res.end(JSON.stringify({registered:true,evaluation_id:body.evaluation_id,max_calls:2}));return;}if(req.url==='/v1/assess'){res.end(JSON.stringify({tool_version:'TCJ-PRIVATE-EVIDENCE-ASSESS-v1.1',raw_evidence_exported:false,assessments:{factual_vs_social_intent:{task_class:'concrete_factual_or_confirmation',confidence:'high'}}}));return;}res.statusCode=404;res.end('{}');});
  const port=await listen(server);return{server,port,seen};
}

async function fakeResponsesProvider(){
  const requests=[];let n=0;
  const final=diagnosis({dimensions:{intent:1,thai_pragmatics:4,bff_voice:4,lexical_social_fit:4,stance:4,composition:4},severity:'MAJOR',flags:['smooth_nonanswer'],rationale:{...rationale(),intent:'Does not answer the concrete question.',overall:'Fluent but non-responsive.'}});
  const server=http.createServer(async(req,res)=>{let raw='';for await(const c of req)raw+=c;const body=JSON.parse(raw);requests.push(body);res.setHeader('content-type','application/json');n++;
    if(n===1){res.end(JSON.stringify({id:'resp_1',output:[{type:'function_call',name:'tcj_evidence_assess',call_id:'call_1',arguments:JSON.stringify({families:['factual_vs_social_intent'],dimensions:['intent']})}],usage:{input_tokens:100,output_tokens:20}}));return;}
    res.end(JSON.stringify({id:'resp_2',output_text:JSON.stringify(final),output:[],usage:{input_tokens:120,output_tokens:30}}));
  });
  const port=await listen(server);return{server,port,requests};
}

test('v2.1 mock runtime keeps external dispatch hard-off',async t=>{const s=await startRuntime();t.after(s.stop);const health=await fetch(`http://127.0.0.1:${s.port}/v1/health`).then(r=>r.json());assert.equal(health.architecture,'v2.1');assert.equal(health.external_dispatch_enabled,false);const out=await post(s.port,'/v1/evaluate',{scenario:'เพื่อนถามว่า ร้านเปิดไหม',candidate:'เปิดนะ',debug_mock_diagnosis:diagnosis()});assert.equal(out.status,200);assert.equal(out.body.decision,'ACCEPT');assert.equal(out.body.configuration.adapter,'TCJ-JUDGE-ADAPTER-v2.1');});

test('Responses tool follow-up re-sends TCJ instructions, tools and strict schema',async t=>{const evidence=await fakeEvidence();const provider=await fakeResponsesProvider();t.after(()=>evidence.server.close());t.after(()=>provider.server.close());const s=await startRuntime({TCJ_JUDGE_MODE:'local',TCJ_ALLOW_EXTERNAL_JUDGE:'true',TCJ_JUDGE_API_STYLE:'responses',TCJ_JUDGE_BASE_URL:`http://127.0.0.1:${provider.port}`,TCJ_JUDGE_MODEL:'fake-sol',TCJ_EVIDENCE_URL:`http://127.0.0.1:${evidence.port}`,TCJ_EVIDENCE_INTERNAL_KEY:'fixture'});t.after(s.stop);
  const out=await post(s.port,'/v1/evaluate',{scenario:'เพื่อนส่งป้ายเวลาแล้วถามว่า ร้านเปิดกี่โมง',candidate:'แต่งตัวสวยๆ ไป'});assert.equal(out.status,200);assert.equal(out.body.decision,'REVISE');assert.equal(provider.requests.length,2);const [first,second]=provider.requests;assert.equal(first.parallel_tool_calls,false);assert.equal(second.parallel_tool_calls,false);assert.ok(first.instructions.includes('Thai Conversation Judge'));assert.equal(second.instructions,first.instructions);assert.equal(first.tools[0].name,'tcj_evidence_assess');assert.equal(second.tools[0].name,'tcj_evidence_assess');assert.equal(first.tools[0].strict,true);assert.equal(first.text.format.type,'json_schema');assert.equal(first.text.format.strict,true);assert.ok(first.text.format.schema.required.includes('escalated_dimensions'));assert.equal(second.previous_response_id,'resp_1');assert.equal(second.input[0].type,'function_call_output');assert.equal(second.input[0].call_id,'call_1');assert.equal(evidence.seen.filter(x=>x.url==='/v1/assess').length,1);
});

test('BYOK still refuses before any provider network when external gate is false',async t=>{const s=await startRuntime({TCJ_JUDGE_MODE:'byok',TCJ_ALLOW_EXTERNAL_JUDGE:'false',TCJ_JUDGE_API_STYLE:'responses',TCJ_JUDGE_BASE_URL:'https://example.invalid/v1',TCJ_JUDGE_MODEL:'gpt-5.6',TCJ_JUDGE_API_KEY:'MUST_NOT_BE_USED'});t.after(s.stop);const out=await post(s.port,'/v1/evaluate',{scenario:'ทดสอบ',candidate:'ทดสอบ'});assert.equal(out.status,409);assert.equal(out.body.error,'external_judge_dispatch_disabled');});
