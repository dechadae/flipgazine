import postgres from 'npm:postgres@3.4.7';

const DB=Deno.env.get('SUPABASE_DB_URL');
if(!DB) throw new Error('SUPABASE_DB_URL required');
const sql=postgres(DB,{prepare:false,max:2,idle_timeout:20,connect_timeout:10});
const ORIGIN='https://flipgazine.pages.dev';
const CAMPAIGN='TCJ-JUDGE-ADMISSION-2026Q3-v1.2';
const REVIEW_PROTOCOL='TCJ-JUDGE-META-REVIEW-v1';
const DOSSIER_VERSION='TCJ-JUDGE-PASSPORT-DOSSIER-v1';
const PASSPORT_VERSION='admission-preliminary-v1';

type Claims={sub:string;session_id:string};
function dec(s:string){return atob(s.replace(/-/g,'+').replace(/_/g,'/')+'='.repeat((4-s.length%4)%4));}
function claims(req:Request):Claims|null{const m=(req.headers.get('authorization')||'').match(/^Bearer\s+([^\s]+)$/i);if(!m)return null;try{const p=m[1].split('.');if(p.length!==3)return null;const c=JSON.parse(dec(p[1]));return typeof c?.sub==='string'&&typeof c?.session_id==='string'?{sub:c.sub,session_id:c.session_id}:null;}catch{return null;}}
function headers(origin:string|null){const h=new Headers({'content-type':'application/json; charset=utf-8','cache-control':'no-store, private, max-age=0','pragma':'no-cache','x-content-type-options':'nosniff','referrer-policy':'no-referrer'});if(origin===ORIGIN){h.set('access-control-allow-origin',ORIGIN);h.set('vary','Origin');h.set('access-control-allow-methods','POST, OPTIONS');h.set('access-control-allow-headers','content-type, authorization');h.set('access-control-max-age','600');}return h;}
function out(origin:string|null,body:unknown,status=200){return new Response(JSON.stringify(body),{status,headers:headers(origin)});}
async function admin(c:Claims){return sql.begin(async tx=>{const a=await tx`select exists(select 1 from auth.users u join auth.sessions s on s.user_id=u.id where u.id=${c.sub}::uuid and s.id=${c.session_id}::uuid and u.deleted_at is null and (u.banned_until is null or u.banned_until<=pg_catalog.now()) and (s.not_after is null or s.not_after>pg_catalog.now())) ok`;if(!a?.[0]?.ok)return false;await tx`select pg_catalog.set_config('request.jwt.claim.sub',${c.sub},true)`;const r=await tx`select public.is_fg_admin() ok`;return !!r?.[0]?.ok;});}

async function status(){
  const q=await sql`
    select c.id,c.status,c.meta_reviews_frozen_at,c.identity_revealed_at,
      (select count(*)::int from private.tcj_admission_meta_reviews m where m.campaign_id=c.id and m.review_protocol_version=${REVIEW_PROTOCOL} and m.review_state='valid' and m.frozen_at is not null) valid_reviews,
      (select count(*)::int from private.tcj_admission_passport_dossiers d where d.campaign_id=c.id and d.dossier_version=${DOSSIER_VERSION}) dossiers,
      (select count(*)::int from private.tcj_admission_identity_reveal_events e where e.campaign_id=c.id) reveal_events,
      (select count(*)::int from private.tcj_judge_passports p join private.tcj_admission_campaign_candidates cc on cc.judge_candidate_id=p.judge_candidate_id where cc.campaign_id=c.id and p.passport_version=${PASSPORT_VERSION} and p.profile_id=c.profile_id and p.frozen_at is not null) passports,
      (select count(*)::int from private.tcj_admission_campaign_candidates cc join private.tcj_judge_candidates j on j.id=cc.judge_candidate_id where cc.campaign_id=c.id and j.identity_state='sealed') sealed,
      (select count(*)::int from private.tcj_admission_campaign_candidates cc join private.tcj_judge_candidates j on j.id=cc.judge_candidate_id where cc.campaign_id=c.id and j.identity_state='revealed') revealed
    from private.tcj_admission_campaigns c where c.campaign_key=${CAMPAIGN} limit 1`;
  const r=q[0]; if(!r) throw new Error('campaign_missing');
  const base:any={campaign_state:String(r.status),meta_reviews_frozen:!!r.meta_reviews_frozen_at,identity_revealed:!!r.identity_revealed_at,valid_reviews:Number(r.valid_reviews||0),dossiers:Number(r.dossiers||0),passports:Number(r.passports||0),sealed:Number(r.sealed||0),revealed:Number(r.revealed||0),reveal_event:Number(r.reveal_events||0)===1,passport_version:PASSPORT_VERSION};
  if(!base.identity_revealed) return base;
  const rows=await sql`
    select j.opaque_candidate_id,j.provider,j.model_name,j.model_family,j.model_snapshot,d.opaque_dossier_id,
      p.qualification_state,p.passport_sha256,p.qualified_dimensions,p.excluded_dimensions,p.uncertainty,
      (select jsonb_object_agg(m.reviewer_slot,jsonb_build_object('overall_recommendation',m.parsed_review->>'overall_recommendation','overall_confidence',m.parsed_review->>'overall_confidence','dimension_recommendations',m.parsed_review->'dimension_recommendations')) from private.tcj_admission_meta_reviews m where m.dossier_id=d.id and m.review_protocol_version=${REVIEW_PROTOCOL}) meta_reviews
    from private.tcj_admission_campaign_candidates cc
    join private.tcj_judge_candidates j on j.id=cc.judge_candidate_id
    join private.tcj_admission_passport_dossiers d on d.campaign_id=cc.campaign_id and d.judge_candidate_id=j.id and d.dossier_version=${DOSSIER_VERSION}
    left join private.tcj_judge_passports p on p.judge_candidate_id=j.id and p.passport_version=${PASSPORT_VERSION} and p.profile_id=(select profile_id from private.tcj_admission_campaigns where id=cc.campaign_id)
    where cc.campaign_id=${r.id}
    order by j.opaque_candidate_id`;
  base.candidates=rows;
  return base;
}

async function reveal(actor:string){
  const x=await sql`select private.tcj_reveal_admission_identities(${CAMPAIGN},${actor}::uuid) result`;
  return x[0]?.result;
}
async function assign(actor:string){
  const x=await sql`select private.tcj_assign_preliminary_passports(${CAMPAIGN},${actor}::uuid) result`;
  return x[0]?.result;
}

Deno.serve(async(req:Request)=>{
  const origin=req.headers.get('origin');
  if(req.method==='OPTIONS')return origin===ORIGIN?new Response(null,{status:204,headers:headers(origin)}):out(origin,{error:'forbidden'},403);
  if(origin!==ORIGIN)return out(origin,{error:'forbidden'},403);
  if(req.method!=='POST')return out(origin,{error:'method_not_allowed'},405);
  const c=claims(req);if(!c)return out(origin,{error:'unauthorized'},401);
  if(!(await admin(c)))return out(origin,{error:'forbidden'},403);
  let body:any={};try{body=await req.json();}catch{return out(origin,{error:'invalid_json'},400);}
  try{
    if(body?.action==='status') return out(origin,{status:'ok',...(await status())});
    if(body?.action==='reveal') return out(origin,{status:'ok',result:await reveal(c.sub),...(await status())});
    if(body?.action==='assign') return out(origin,{status:'ok',result:await assign(c.sub),...(await status())});
    return out(origin,{error:'invalid_action'},422);
  }catch(e){console.error('tcj-admission-passport',e);return out(origin,{error:e instanceof Error?e.message:'service_unavailable'},503);}
});
