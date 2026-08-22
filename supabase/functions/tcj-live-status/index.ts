import postgres from 'npm:postgres@3.4.7';

const DB=Deno.env.get('SUPABASE_DB_URL');
if(!DB) throw new Error('SUPABASE_DB_URL required');
const sql=postgres(DB,{prepare:false,max:2,idle_timeout:20,connect_timeout:10});
const ORIGIN='https://flipgazine.pages.dev';
const RUN_KEY='TCJ-JUDGE-QUALIFICATION-RUN-2026Q3-v1.1';
const ADMISSION_KEY='TCJ-JUDGE-ADMISSION-2026Q3-v1.2';

type Claims={sub:string;session_id:string};
function dec(s:string){return atob(s.replace(/-/g,'+').replace(/_/g,'/')+'='.repeat((4-s.length%4)%4));}
function claims(req:Request):Claims|null{const m=(req.headers.get('authorization')||'').match(/^Bearer\s+([^\s]+)$/i);if(!m)return null;try{const p=m[1].split('.');if(p.length!==3)return null;const c=JSON.parse(dec(p[1]));return typeof c?.sub==='string'&&typeof c?.session_id==='string'?{sub:c.sub,session_id:c.session_id}:null;}catch{return null;}}
function headers(origin:string|null){const h=new Headers({'content-type':'application/json; charset=utf-8','cache-control':'no-store, private, max-age=0','pragma':'no-cache','x-content-type-options':'nosniff','referrer-policy':'no-referrer'});if(origin===ORIGIN){h.set('access-control-allow-origin',ORIGIN);h.set('vary','Origin');h.set('access-control-allow-methods','POST, OPTIONS');h.set('access-control-allow-headers','content-type, authorization');h.set('access-control-max-age','600');}return h;}
function out(origin:string|null,body:unknown,status=200){return new Response(JSON.stringify(body),{status,headers:headers(origin)});}
async function admin(c:Claims){return sql.begin(async tx=>{const a=await tx`select exists(select 1 from auth.users u join auth.sessions s on s.user_id=u.id where u.id=${c.sub}::uuid and s.id=${c.session_id}::uuid and u.deleted_at is null and (u.banned_until is null or u.banned_until<=pg_catalog.now()) and (s.not_after is null or s.not_after>pg_catalog.now())) ok`;if(!a?.[0]?.ok)return false;await tx`select pg_catalog.set_config('request.jwt.claim.sub',${c.sub}::text,true)`;const r=await tx`select public.is_fg_admin() ok`;return !!r?.[0]?.ok;});}
function stage(n:number,key:string,title:string,status:string,detail:string,metric:string|null=null){return{n,key,title,status,detail,metric};}
async function snapshot(){
 const rows=await sql`select
  r.id run_id,r.status run_state,r.expected_cells,r.started_at,r.completed_at,r.run_manifest_sha256,
  p.id protocol_id,p.status protocol_state,p.threshold_sha256,p.human_manifest_sha256,
  s.id evidence_set_id,s.status bank_state,s.manifest_sha256 evidence_manifest,
  (select count(*)::int from private.tcj_qualification_human_reviews h where h.protocol_id=p.id and h.review_state='frozen') frozen_reviews,
  (select count(*)::int from private.tcj_evidence_items i where i.evidence_set_id=s.id and i.exposure_state='private') private_items,
  (select count(*)::int from private.tcj_evidence_items i where i.evidence_set_id=s.id and i.exposure_state='qualification_exposed') exposed_items,
  (select count(*)::int from private.tcj_qualification_dispatches d where d.run_id=r.id) dispatches,
  (select count(*)::int from private.tcj_qualification_responses x join private.tcj_qualification_dispatches d on d.id=x.dispatch_id where d.run_id=r.id) responses,
  (select count(*)::int from private.tcj_qualification_attempts a where a.run_id=r.id) attempts,
  (select count(*)::int from private.tcj_qualification_judgments j where j.run_id=r.id) judgments,
  (select count(*)::int from private.tcj_qualification_failures f where f.run_id=r.id and f.evidence_state='terminal') terminal_failures,
  (select count(*)::int from private.tcj_qualification_failures f where f.run_id=r.id and f.evidence_state='active') active_failures,
  (select count(*)::int from private.tcj_qualification_dispatches d where d.run_id=r.id and not exists(select 1 from private.tcj_qualification_responses x where x.dispatch_id=d.id)) open_dispatches,
  (select count(*)::int from private.tcj_qualification_run_incidents z where z.run_id=r.id) incident_count,
  (select count(*)::int from private.tcj_qualification_run_incidents z where z.run_id=r.id and z.severity in ('blocking','compromising')) blocking_incidents,
  (select count(*)::int from private.tcj_qualification_run_incidents z where z.run_id=r.id and z.severity='warning') warning_incidents,
  (select count(*)::int from private.tcj_qualification_hash_attestations h where h.run_id=r.id) hash_attestations,
  (select count(*)::int from private.tcj_qualification_summaries q where q.run_id=r.id) qualification_summaries,
  (select count(*)::int from private.tcj_panel_members) panel_members,
  (select count(*)::int from private.tcj_panel_runs) panel_runs,
  (select count(*)::int from private.tcj_panel_consensus) panel_consensus,
  (select count(*)::int from private.tcj_assurance_packs) assurance_packs,
  (select count(*)::int from private.tcj_assurance_pack_items) assurance_items,
  (select count(*)::int from private.tcj_assurance_pack_exposures) assurance_exposures,
  (select status from private.tcj_evidence_sets where bank='assurance' order by id desc limit 1) assurance_bank_state,
  (select status from private.tcj_admission_campaigns where campaign_key=${ADMISSION_KEY}::text limit 1) admission_state,
  (select count(*)::int from private.tcj_admission_stage_b_summaries b where b.campaign_id=(select id from private.tcj_admission_campaigns where campaign_key=${ADMISSION_KEY}::text limit 1)) stage_b_summaries,
  (select count(*)::int from private.tcj_admission_passport_dossiers d where d.campaign_id=(select id from private.tcj_admission_campaigns where campaign_key=${ADMISSION_KEY}::text limit 1)) passport_dossiers,
  (select count(*)::int from private.tcj_admission_robustness_summaries) robustness_summaries,
  (select count(*)::int from private.tcj_admission_robustness_packs) robustness_packs,
  (select row_to_json(w) from (select enabled,last_status,last_error,lease_owner,lease_until,updated_at from private.tcj_qualification_worker_state where run_key=${RUN_KEY}::text) w) worker,
  (select row_to_json(z) from (select incident_class,severity,provider_call_reached,exact_request_preserved,exact_response_preserved,details,created_at from private.tcj_qualification_run_incidents where run_id=r.id order by created_at desc limit 1) z) latest_incident
 from private.tcj_qualification_runs r
 join private.tcj_qualification_protocols p on p.id=r.protocol_id
 join private.tcj_evidence_sets s on s.id=p.evidence_set_id
 where r.run_key=${RUN_KEY}::text limit 1`;
 const x:any=rows[0]; if(!x)throw new Error('qualification_run_missing');
 const expected=Number(x.expected_cells||144),judgments=Number(x.judgments||0),terminal=Number(x.terminal_failures||0),done=judgments+terminal,pending=Math.max(0,expected-done),pct=expected?Math.round(done/expected*1000)/10:0;
 const admissionComplete=String(x.admission_state)==='complete'&&Number(x.stage_b_summaries)>=3;
 const robustnessComplete=Number(x.robustness_packs)>=2&&Number(x.robustness_summaries)>=6;
 const prelimPassportsComplete=Number(x.passport_dossiers)>=3;
 const humanBankComplete=Number(x.frozen_reviews)===48&&['frozen','running','complete'].includes(String(x.protocol_state));
 const qualificationBlocked=String(x.run_state)==='blocked'||Number(x.blocking_incidents)>0;
 const qualificationComplete=done>=expected&&Number(x.open_dispatches)===0&&!qualificationBlocked;
 const qualificationRunning=!qualificationComplete&&!qualificationBlocked&&String(x.run_state)==='running';
 const verificationComplete=Number(x.qualification_summaries)>=3&&qualificationComplete;
 const panelStarted=Number(x.panel_members)>0||Number(x.panel_runs)>0;
 const panelComplete=Number(x.panel_members)>0&&Number(x.panel_runs)>0&&Number(x.panel_consensus)>0;
 const assuranceStarted=Number(x.assurance_packs)>0||Number(x.assurance_items)>0||String(x.assurance_bank_state)==='frozen';
 const assuranceComplete=Number(x.assurance_exposures)>0&&String(x.assurance_bank_state)==='frozen';
 const foundationComplete=!!x.threshold_sha256&&!!x.human_manifest_sha256&&!!x.evidence_manifest;
 const stages=[
  stage(1,'foundation','Core architecture + frozen evaluation contract',foundationComplete?'complete':'pending',foundationComplete?'Core/profile, thresholds and evidence contracts are version-bound.':'Foundation contract is not fully frozen.'),
  stage(2,'admission','Candidate judge admission',admissionComplete?'complete':'pending',admissionComplete?'Admission v1.2 completed with frozen Stage B evidence.':'Admission evidence is incomplete.',String(x.stage_b_summaries||0)+' Stage B summaries'),
  stage(3,'robustness','Robustness + perturbation qualification',robustnessComplete?'complete':'pending',robustnessComplete?'Frozen-input and perturbation evidence are complete.':'Robustness evidence is incomplete.',String(x.robustness_summaries||0)+' summaries'),
  stage(4,'preliminary_passports','Preliminary research passports',prelimPassportsComplete?'complete':'pending',prelimPassportsComplete?'Preliminary passports exist; they do not grant production authority.':'Preliminary passport evidence is incomplete.',String(x.passport_dossiers||0)+' dossiers'),
  stage(5,'human_qualification','Hidden Qualification human gold',humanBankComplete?'complete':'pending',humanBankComplete?'48/48 native-human reviews are frozen and manifest-bound.':'Human Qualification bank is not frozen.',String(x.frozen_reviews||0)+' / 48'),
  stage(6,'machine_qualification','Machine Qualification',qualificationBlocked?'blocked':qualificationComplete?'complete':qualificationRunning?'running':'pending',qualificationBlocked?'Research-integrity block requires investigation before any continuation.':qualificationComplete?'All 144 qualification evidence cells are accounted for.':qualificationRunning?'Server-owned worker is evaluating the 144 hidden cells.':'Waiting to begin machine Qualification.',done+' / '+expected),
  stage(7,'verification','Qualification ledger verification + production Passports',verificationComplete?'complete':qualificationComplete?'ready':'pending',verificationComplete?'Qualification summaries are verified and production authority can be derived.':qualificationComplete?'Machine evidence is complete; independent verification is the next automatic gate.':'Starts only after 144/144 machine evidence cells.',String(x.qualification_summaries||0)+' summaries'),
  stage(8,'panel','Qualified Panel assembly + disagreement policy',panelComplete?'complete':panelStarted?'running':'pending',panelComplete?'Qualified panel evidence and consensus layer exist.':panelStarted?'Panel construction is in progress.':'Not started; waits for final dimension-level Qualification.',String(x.panel_members||0)+' members'),
  stage(9,'assurance','Independent Assurance holdout',assuranceComplete?'complete':assuranceStarted?'draft':'pending',assuranceComplete?'Separate Assurance evidence has been exercised.':assuranceStarted?'Assurance bank exists but is not yet a completed validation run.':'Separate holdout remains untouched.',String(x.assurance_items||0)+' items'),
  stage(10,'final_freeze','Final TCJ architecture freeze',assuranceComplete&&panelComplete&&verificationComplete?'ready':'pending','Final release gate: freeze architecture/runtime after Qualification, Panel and Assurance all pass.')
 ];
 const current=stages.find((s:any)=>s.status!=='complete')||stages[stages.length-1];
 const completeCount=stages.filter((s:any)=>s.status==='complete').length;
 const worker:any=x.worker||{};
 let humanNeeded=false,humanMessage='No human judgment required at this stage.';
 if(qualificationBlocked){humanNeeded=false;humanMessage='Automation is blocked by an integrity gate. Technical investigation is required before any human judgment.';}
 else if(current.key==='assurance'&&String(current.status)==='draft'){humanNeeded=true;humanMessage='A future Assurance human-review gate may require native judgment once its evidence bank is prepared.';}
 return{
  generated_at:new Date().toISOString(),
  overall:{current_stage:current.n,current_key:current.key,current_title:current.title,stage_count:stages.length,complete_gates:completeCount,human_needed:humanNeeded,human_message:humanMessage},
  qualification:{run_key:RUN_KEY,run_state:String(x.run_state),protocol_state:String(x.protocol_state),bank_state:String(x.bank_state),expected,done,pending,percent:pct,judgments,terminal_failures:terminal,dispatches:Number(x.dispatches||0),responses:Number(x.responses||0),attempts:Number(x.attempts||0),open_dispatches:Number(x.open_dispatches||0),active_failures:Number(x.active_failures||0),warning_incidents:Number(x.warning_incidents||0),blocking_incidents:Number(x.blocking_incidents||0),hash_attestations:Number(x.hash_attestations||0),started_at:x.started_at||null,completed_at:x.completed_at||null},
  worker:{enabled:!!worker.enabled,last_status:worker.last_status||null,last_error:worker.last_error||null,lease_until:worker.lease_until||null,updated_at:worker.updated_at||null},
  latest_incident:x.latest_incident||null,
  stages
 };
}
Deno.serve(async(req:Request)=>{const origin=req.headers.get('origin');if(req.method==='OPTIONS')return origin===ORIGIN?new Response(null,{status:204,headers:headers(origin)}):out(origin,{error:'forbidden'},403);if(origin!==ORIGIN)return out(origin,{error:'forbidden'},403);if(req.method!=='POST')return out(origin,{error:'method_not_allowed'},405);const c=claims(req);if(!c)return out(origin,{error:'unauthorized'},401);if(!(await admin(c)))return out(origin,{error:'forbidden'},403);try{return out(origin,await snapshot());}catch(e){console.error('tcj-live-status',e);return out(origin,{error:e instanceof Error?e.message:'status_unavailable'},503);}});
