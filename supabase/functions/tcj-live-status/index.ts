import postgres from 'npm:postgres@3.4.7';
const DB=Deno.env.get('SUPABASE_DB_URL'); if(!DB) throw new Error('SUPABASE_DB_URL required');
const sql=postgres(DB,{prepare:false,max:2,idle_timeout:20,connect_timeout:10});
const ORIGIN='https://flipgazine.pages.dev';
const RUN_KEY='TCJ-JUDGE-QUALIFICATION-RUN-2026Q3-v1.1';
const ADMISSION_KEY='TCJ-JUDGE-ADMISSION-2026Q3-v1.2';
const QUAL_PASSPORT_VERSION='qualification-v1.1';
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
  p.status protocol_state,p.threshold_sha256,p.human_manifest_sha256,s.status bank_state,s.manifest_sha256 evidence_manifest,
  (select count(*)::int from private.tcj_qualification_human_reviews h where h.protocol_id=p.id and h.review_state='frozen') frozen_reviews,
  (select count(*)::int from private.tcj_qualification_dispatches d where d.run_id=r.id) dispatches,
  (select count(*)::int from private.tcj_qualification_responses x join private.tcj_qualification_dispatches d on d.id=x.dispatch_id where d.run_id=r.id) responses,
  (select count(*)::int from private.tcj_qualification_attempts a where a.run_id=r.id) attempts,
  (select count(*)::int from private.tcj_qualification_judgments j where j.run_id=r.id) judgments,
  (select count(*)::int from private.tcj_qualification_failures f where f.run_id=r.id and f.evidence_state='terminal') terminal_failures,
  (select count(*)::int from private.tcj_qualification_failures f where f.run_id=r.id and f.evidence_state='active') active_failures,
  (select count(*)::int from private.tcj_qualification_dispatches d where d.run_id=r.id and not exists(select 1 from private.tcj_qualification_responses x where x.dispatch_id=d.id)) open_dispatches,
  (select count(*)::int from private.tcj_qualification_run_incidents z where z.run_id=r.id and not exists(select 1 from private.tcj_qualification_incident_supersessions ss where ss.incident_id=z.id)) effective_incidents,
  (select count(*)::int from private.tcj_qualification_run_incidents z where z.run_id=r.id and z.severity in ('blocking','compromising') and not exists(select 1 from private.tcj_qualification_incident_supersessions ss where ss.incident_id=z.id)) blocking_incidents,
  (select count(*)::int from private.tcj_qualification_run_incidents z where z.run_id=r.id and z.severity='warning' and not exists(select 1 from private.tcj_qualification_incident_supersessions ss where ss.incident_id=z.id)) warning_incidents,
  (select count(*)::int from private.tcj_qualification_incident_supersessions ss where ss.run_id=r.id) superseded_incidents,
  (select count(*)::int from private.tcj_qualification_hash_attestations h where h.run_id=r.id) hash_attestations,
  (select count(*)::int from private.tcj_qualification_summaries q where q.run_id=r.id) qualification_summaries,
  (select count(*)::int from private.tcj_judge_passports jp where jp.evidence_set_id=s.id and jp.passport_version=${QUAL_PASSPORT_VERSION}::text and jp.profile_id=p.profile_id) qualification_passports,
  (select count(*)::int from private.tcj_judge_passports jp where jp.evidence_set_id=s.id and jp.passport_version=${QUAL_PASSPORT_VERSION}::text and jp.profile_id=p.profile_id and jp.qualification_state in ('qualified','partially_qualified')) authority_passports,
  (select coalesce(sum(cardinality(jp.qualified_dimensions)),0)::int from private.tcj_judge_passports jp where jp.evidence_set_id=s.id and jp.passport_version=${QUAL_PASSPORT_VERSION}::text and jp.profile_id=p.profile_id) qualified_dimensions,
  (select coalesce(sum(case when jsonb_typeof(jp.judging_evidence->'partially_qualified_dimensions')='array' then jsonb_array_length(jp.judging_evidence->'partially_qualified_dimensions') else 0 end),0)::int from private.tcj_judge_passports jp where jp.evidence_set_id=s.id and jp.passport_version=${QUAL_PASSPORT_VERSION}::text and jp.profile_id=p.profile_id) partial_dimensions,
  (select count(*)::int from private.tcj_panel_members) panel_members,
  (select count(*)::int from private.tcj_panel_runs) panel_runs,
  (select count(*)::int from private.tcj_panel_consensus) panel_consensus,
  (select count(*)::int from private.tcj_assurance_pack_items) assurance_items,
  (select count(*)::int from private.tcj_assurance_pack_exposures) assurance_exposures,
  (select status from private.tcj_evidence_sets where bank='assurance' order by id desc limit 1) assurance_bank_state,
  (select status from private.tcj_admission_campaigns where campaign_key=${ADMISSION_KEY}::text limit 1) admission_state,
  (select count(*)::int from private.tcj_admission_stage_b_summaries b where b.campaign_id=(select id from private.tcj_admission_campaigns where campaign_key=${ADMISSION_KEY}::text limit 1)) stage_b_summaries,
  (select count(*)::int from private.tcj_admission_passport_dossiers d where d.campaign_id=(select id from private.tcj_admission_campaigns where campaign_key=${ADMISSION_KEY}::text limit 1)) passport_dossiers,
  (select count(*)::int from private.tcj_admission_robustness_summaries) robustness_summaries,
  (select count(*)::int from private.tcj_admission_robustness_packs) robustness_packs,
  (select row_to_json(w) from (select enabled,last_status,last_error,lease_owner,lease_until,updated_at from private.tcj_qualification_worker_state where run_key=${RUN_KEY}::text) w) worker,
  (select row_to_json(z) from (select z.incident_class,z.severity,z.provider_call_reached,z.exact_request_preserved,z.exact_response_preserved,z.details,z.created_at from private.tcj_qualification_run_incidents z where z.run_id=r.id and not exists(select 1 from private.tcj_qualification_incident_supersessions ss where ss.incident_id=z.id) order by z.created_at desc limit 1) z) latest_incident
 from private.tcj_qualification_runs r join private.tcj_qualification_protocols p on p.id=r.protocol_id join private.tcj_evidence_sets s on s.id=p.evidence_set_id where r.run_key=${RUN_KEY}::text limit 1`;
 const x:any=rows[0]; if(!x) throw new Error('qualification_run_missing');
 const expected=Number(x.expected_cells||144),judgments=Number(x.judgments||0),terminal=Number(x.terminal_failures||0),done=judgments+terminal,pending=Math.max(0,expected-done),pct=expected?Math.round(done/expected*1000)/10:0;
 const foundationComplete=!!x.threshold_sha256&&!!x.human_manifest_sha256&&!!x.evidence_manifest;
 const admissionComplete=String(x.admission_state)==='complete'&&Number(x.stage_b_summaries)>=3;
 const robustnessComplete=Number(x.robustness_packs)>=2&&Number(x.robustness_summaries)>=6;
 const prelimComplete=Number(x.passport_dossiers)>=3;
 const humanComplete=Number(x.frozen_reviews)===48;
 const machineComplete=done>=expected&&Number(x.open_dispatches)===0&&Number(x.blocking_incidents)===0;
 const verificationComplete=machineComplete&&String(x.run_state)==='complete'&&String(x.protocol_state)==='complete'&&!!x.run_manifest_sha256&&Number(x.qualification_summaries)>=3&&Number(x.qualification_passports)>=3;
 const authorityAvailable=Number(x.authority_passports)>0&&(Number(x.qualified_dimensions)+Number(x.partial_dimensions)>0);
 const noQualifiedJudges=verificationComplete&&!authorityAvailable;
 const panelStarted=Number(x.panel_members)>0||Number(x.panel_runs)>0;
 const panelComplete=Number(x.panel_members)>0&&Number(x.panel_runs)>0&&Number(x.panel_consensus)>0;
 const assuranceStarted=Number(x.assurance_items)>0||String(x.assurance_bank_state)==='frozen';
 const assuranceComplete=Number(x.assurance_exposures)>0&&String(x.assurance_bank_state)==='frozen';
 const stages=[
  stage(1,'foundation','Core architecture + frozen evaluation contract',foundationComplete?'complete':'pending',foundationComplete?'Core/profile, thresholds and evidence contracts are version-bound.':'Foundation contract incomplete.'),
  stage(2,'admission','Candidate judge admission',admissionComplete?'complete':'pending',admissionComplete?'Admission v1.2 complete.':'Admission incomplete.',String(x.stage_b_summaries||0)+' Stage B summaries'),
  stage(3,'robustness','Robustness + perturbation qualification',robustnessComplete?'complete':'pending',robustnessComplete?'Robustness evidence complete.':'Robustness evidence incomplete.',String(x.robustness_summaries||0)+' summaries'),
  stage(4,'preliminary_passports','Preliminary research passports',prelimComplete?'complete':'pending',prelimComplete?'Preliminary research passports complete.':'Preliminary passport evidence incomplete.',String(x.passport_dossiers||0)+' dossiers'),
  stage(5,'human_qualification','Hidden Qualification human gold',humanComplete?'complete':'pending',humanComplete?'48/48 native-human reviews are frozen and authoritative. Design labels are hypotheses, not answer keys.':'Human Qualification bank incomplete.',String(x.frozen_reviews||0)+' / 48'),
  stage(6,'machine_qualification','Machine Qualification',machineComplete?'complete':'pending',machineComplete?'144/144 machine judgments complete with durable provenance.':'Machine Qualification incomplete.',done+' / '+expected),
  stage(7,'verification','Qualification ledger verification + Qualification Passports',verificationComplete?'complete':machineComplete?'ready':'pending',verificationComplete?(authorityAvailable?'Qualification complete with authority-bearing dimensions.':'Qualification complete. All tested candidates remain research-only under preregistered thresholds.'):'Awaiting ledger verification.',String(x.qualification_summaries||0)+' summaries · '+String(x.qualification_passports||0)+' Passports'),
  stage(8,'panel','Qualified Panel assembly + disagreement policy',panelComplete?'complete':panelStarted?'running':noQualifiedJudges?'blocked':'pending',panelComplete?'Qualified Panel complete.':panelStarted?'Panel construction in progress.':noQualifiedJudges?'No candidate earned production authority. Use v1.1 as research/dev evidence to correct judge failure modes; any changed judge/profile must face a fresh hidden Qualification bank before Panel admission.':'Waiting for authority-bearing Qualification.',noQualifiedJudges?'0 qualified judges':String(x.panel_members||0)+' members'),
  stage(9,'assurance','Independent Assurance holdout',assuranceComplete?'complete':assuranceStarted?'draft':'pending',assuranceComplete?'Independent Assurance exercised.':assuranceStarted?'Assurance bank exists but is not completed.':'Separate holdout untouched.',String(x.assurance_items||0)+' items'),
  stage(10,'final_freeze','Final TCJ architecture freeze',assuranceComplete&&panelComplete&&verificationComplete?'ready':'pending','Release only after valid Qualification, Panel and Assurance pass.')
 ];
 const current=stages.find((s:any)=>s.status!=='complete')||stages[stages.length-1]; const completeCount=stages.filter((s:any)=>s.status==='complete').length; const worker:any=x.worker||{};
 const humanNeeded=false; const humanMessage=noQualifiedJudges?'No human judgment required yet. v1.1 is now research/dev evidence for automated judge remediation. A fresh native-human hidden bank will be required only after the revised TCJ judge configuration is ready for requalification.':'No human judgment required at this stage.';
 return {generated_at:new Date().toISOString(),overall:{current_stage:current.n,current_key:current.key,current_title:current.title,stage_count:stages.length,complete_gates:completeCount,human_needed:humanNeeded,human_message:humanMessage},qualification:{run_key:RUN_KEY,run_state:String(x.run_state),protocol_state:String(x.protocol_state),bank_state:String(x.bank_state),expected,done,pending,percent:pct,judgments,terminal_failures:terminal,dispatches:Number(x.dispatches||0),responses:Number(x.responses||0),attempts:Number(x.attempts||0),open_dispatches:Number(x.open_dispatches||0),active_failures:Number(x.active_failures||0),warning_incidents:Number(x.warning_incidents||0),blocking_incidents:Number(x.blocking_incidents||0),superseded_incidents:Number(x.superseded_incidents||0),hash_attestations:Number(x.hash_attestations||0),summaries:Number(x.qualification_summaries||0),passports:Number(x.qualification_passports||0),authority_passports:Number(x.authority_passports||0),qualified_dimensions:Number(x.qualified_dimensions||0),partial_dimensions:Number(x.partial_dimensions||0),run_manifest_sha256:x.run_manifest_sha256||null,started_at:x.started_at||null,completed_at:x.completed_at||null},worker:{enabled:!!worker.enabled,last_status:worker.last_status||null,last_error:worker.last_error||null,lease_until:worker.lease_until||null,updated_at:worker.updated_at||null},latest_incident:x.latest_incident||null,stages};
}
Deno.serve(async(req:Request)=>{const origin=req.headers.get('origin');if(req.method==='OPTIONS')return origin===ORIGIN?new Response(null,{status:204,headers:headers(origin)}):out(origin,{error:'forbidden'},403);if(origin!==ORIGIN)return out(origin,{error:'forbidden'},403);if(req.method!=='POST')return out(origin,{error:'method_not_allowed'},405);const c=claims(req);if(!c)return out(origin,{error:'unauthorized'},401);if(!(await admin(c)))return out(origin,{error:'forbidden'},403);try{return out(origin,await snapshot());}catch(e){console.error('tcj-live-status',e);return out(origin,{error:e instanceof Error?e.message:'status_unavailable'},503);}});
