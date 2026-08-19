import postgres from 'npm:postgres@3.4.7';

const dbUrl=Deno.env.get('SUPABASE_DB_URL');
if(!dbUrl) throw new Error('SUPABASE_DB_URL is required');
const sql=postgres(dbUrl,{prepare:false,max:2,idle_timeout:20,connect_timeout:10});
const ALLOWED_ORIGIN='https://flipgazine.pages.dev';
const REASON_TAGS=new Set([
  'translation-shaped','unnatural lexical choice','over-explained','pronoun/subject issue',
  'particle/stance issue','register mismatch','semantic drift','code-mixing issue','humor/timing issue',
  'generic/cliche','metaphor issue','line-composition issue','too formal','too verbose','other'
]);

type Claims={sub:string;session_id:string};
function b64url(input:string){return atob(input.replace(/-/g,'+').replace(/_/g,'/')+'='.repeat((4-input.length%4)%4));}
function claims(req:Request):Claims|null{
  const m=(req.headers.get('authorization')||'').match(/^Bearer\s+([^\s]+)$/i);if(!m)return null;
  const p=m[1].split('.');if(p.length!==3)return null;
  try{const c=JSON.parse(b64url(p[1]));return typeof c?.sub==='string'&&typeof c?.session_id==='string'?{sub:c.sub,session_id:c.session_id}:null;}catch{return null;}
}
function headers(req:Request){const origin=req.headers.get('origin')||'';const h:Record<string,string>={'content-type':'application/json; charset=utf-8','cache-control':'no-store, private, max-age=0','pragma':'no-cache','x-content-type-options':'nosniff'};if(origin===ALLOWED_ORIGIN){h['access-control-allow-origin']=origin;h['access-control-allow-headers']='authorization, content-type, x-client-info';h['access-control-allow-methods']='POST, OPTIONS';h['access-control-max-age']='600';h['vary']='Origin';}return h;}
function json(req:Request,body:unknown,status=200){return new Response(JSON.stringify(body),{status,headers:headers(req)});}
async function admin<T>(c:Claims,fn:(tx:any,actor:string)=>Promise<T>){return await sql.begin(async tx=>{
  const active=await tx`select exists(select 1 from auth.users u join auth.sessions s on s.user_id=u.id where u.id=${c.sub}::uuid and s.id=${c.session_id}::uuid and u.deleted_at is null and (u.banned_until is null or u.banned_until<=pg_catalog.now()) and (s.not_after is null or s.not_after>pg_catalog.now())) as ok`;
  if(!active?.[0]?.ok)return{kind:'unauthorized'} as const;
  await tx`select pg_catalog.set_config('request.jwt.claim.sub',${c.sub},true)`;
  const a=await tx`select public.is_fg_admin() as ok`;if(!a?.[0]?.ok)return{kind:'forbidden'} as const;
  return{kind:'ok',value:await fn(tx,c.sub)} as const;
});}
function campaignKey(body:any){return String(body?.campaign_key||'TCJ-JUDGE-ADMISSION-2026Q3-v1').trim();}
function cleanDecision(v:any){const s=String(v||'').toUpperCase();return ['ACCEPT','EDIT','REWRITE'].includes(s)?s:'';}
function cleanTags(v:any){if(!Array.isArray(v))return[];return [...new Set(v.map(x=>String(x||'').trim()).filter(x=>REASON_TAGS.has(x)))].slice(0,8);}

Deno.serve(async(req:Request)=>{
  if(req.method==='OPTIONS')return req.headers.get('origin')===ALLOWED_ORIGIN?new Response(null,{status:204,headers:headers(req)}):new Response(null,{status:403,headers:headers(req)});
  if(req.method!=='POST')return json(req,{error:'method_not_allowed'},405);
  if(req.headers.get('origin')!==ALLOWED_ORIGIN)return json(req,{error:'forbidden'},403);
  const c=claims(req);if(!c)return json(req,{error:'unauthorized'},401);
  let body:any;try{body=await req.json();}catch{return json(req,{error:'invalid_json'},400);}
  try{
    const result=await admin(c,async(tx,actor)=>{
      const key=campaignKey(body);
      const campaigns=await tx`select id,campaign_key,protocol_version,profile_id,status,stage_a_scenario_count,candidate_set_frozen_at,stage_a_frozen_at,stage_b_frozen_at,meta_reviews_frozen_at,identity_revealed_at,created_at from private.tcj_admission_campaigns where campaign_key=${key} limit 1`;
      if(!campaigns.length)return{status:'invalid',error:'campaign_not_found'};
      const camp=campaigns[0];
      if(body?.action==='status'){
        const totals=await tx`select count(*)::int total,count(*) filter(where h.id is not null)::int reviewed from private.tcj_admission_generations g left join private.tcj_admission_human_reviews h on h.generation_id=g.id and h.reviewer_key=${actor} where g.campaign_id=${camp.id}`;
        const decisions=await tx`select h.decision,count(*)::int n from private.tcj_admission_human_reviews h join private.tcj_admission_generations g on g.id=h.generation_id where g.campaign_id=${camp.id} and h.reviewer_key=${actor} group by h.decision order by h.decision`;
        return{status:'ok',campaign:{campaign_key:camp.campaign_key,protocol_version:camp.protocol_version,profile_id:camp.profile_id,state:camp.status,stage_a_scenario_count:Number(camp.stage_a_scenario_count)},progress:{total:Number(totals[0]?.total||0),reviewed:Number(totals[0]?.reviewed||0)},decision_counts:decisions};
      }
      if(body?.action==='next_review'){
        if(!['candidate_set_frozen','stage_a_frozen'].includes(String(camp.status)))return{status:'invalid',error:'review_not_open'};
        const totals=await tx`select count(*)::int total,count(*) filter(where h.id is not null)::int reviewed from private.tcj_admission_generations g left join private.tcj_admission_human_reviews h on h.generation_id=g.id and h.reviewer_key=${actor} where g.campaign_id=${camp.id}`;
        const rows=await tx`select g.opaque_response_id,g.review_order,s.ordinal scenario_ordinal,s.scenario_key,s.scenario_text,s.phenomenon,g.response_text from private.tcj_admission_generations g join private.tcj_admission_scenarios s on s.id=g.scenario_id left join private.tcj_admission_human_reviews h on h.generation_id=g.id and h.reviewer_key=${actor} where g.campaign_id=${camp.id} and h.id is null order by g.review_order nulls last,g.id limit 1`;
        return{status:'ok',campaign_state:camp.status,progress:{total:Number(totals[0]?.total||0),reviewed:Number(totals[0]?.reviewed||0)},item:rows.length?rows[0]:null,blindness:{candidate_identity_exposed:false,model_metadata_exposed:false,aggregate_candidate_performance_exposed:false}};
      }
      if(body?.action==='save_review'){
        if(camp.status!=='candidate_set_frozen')return{status:'invalid',error:'review_not_writable'};
        const opaque=String(body?.opaque_response_id||'').trim();const decision=cleanDecision(body?.decision);if(!opaque||!decision)return{status:'invalid',error:'review_input_required'};
        const tags=cleanTags(body?.reason_tags);const note=String(body?.review_note||'').trim().slice(0,1200);
        const gen=await tx`select g.id from private.tcj_admission_generations g where g.campaign_id=${camp.id} and g.opaque_response_id=${opaque} limit 1`;
        if(!gen.length)return{status:'invalid',error:'response_not_found'};
        const exists=await tx`select id,decision,frozen_at from private.tcj_admission_human_reviews where generation_id=${gen[0].id} and reviewer_key=${actor} limit 1`;
        if(exists.length)return{status:'already_frozen',decision:exists[0].decision,frozen_at:exists[0].frozen_at};
        const saved=await tx`insert into private.tcj_admission_human_reviews(generation_id,reviewer_key,decision,reason_tags,review_note,blind_review,frozen_at) values(${gen[0].id},${actor},${decision},${tags},${note||null},true,pg_catalog.now()) returning decision,reason_tags,frozen_at`;
        return{status:'ok',review:saved[0]};
      }
      if(body?.action==='review_summary'){
        const totals=await tx`select count(*)::int total,count(*) filter(where h.id is not null)::int reviewed from private.tcj_admission_generations g left join private.tcj_admission_human_reviews h on h.generation_id=g.id and h.reviewer_key=${actor} where g.campaign_id=${camp.id}`;
        const decisions=await tx`select h.decision,count(*)::int n from private.tcj_admission_human_reviews h join private.tcj_admission_generations g on g.id=h.generation_id where g.campaign_id=${camp.id} and h.reviewer_key=${actor} group by h.decision order by h.decision`;
        return{status:'ok',progress:{total:Number(totals[0]?.total||0),reviewed:Number(totals[0]?.reviewed||0)},decision_counts:decisions,identity_revealed:!!camp.identity_revealed_at};
      }
      return{status:'invalid',error:'unknown_action'};
    });
    if(result.kind==='unauthorized')return json(req,{error:'unauthorized'},401);
    if(result.kind==='forbidden')return json(req,{error:'forbidden'},403);
    const v:any=result.value;if(v?.status==='invalid')return json(req,v,422);return json(req,v,200);
  }catch(e){console.error('tcj-admission-admin',e instanceof Error?e.message:'unknown');return json(req,{error:'service_unavailable'},503);}
});
