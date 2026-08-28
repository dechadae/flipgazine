import postgres from 'npm:postgres@3.4.7';

const dbUrl=Deno.env.get('SUPABASE_DB_URL');
if(!dbUrl) throw new Error('SUPABASE_DB_URL is required');
const sql=postgres(dbUrl,{prepare:false,max:2,idle_timeout:20,connect_timeout:10});
const SUPA=Deno.env.get('SUPABASE_URL')||'https://sjpvhgxacsiorrtijqua.supabase.co';
const TARGET=`${SUPA}/functions/v1/batch2-qwen-audit`;
const ALLOWED_ORIGIN='https://flipgazine.pages.dev';
const IDS=Array.from({length:20},(_,i)=>`B2-${String(i+21).padStart(4,'0')}`);

type Claims={sub:string;session_id:string};
function b64url(input:string){return atob(input.replace(/-/g,'+').replace(/_/g,'/')+'='.repeat((4-input.length%4)%4));}
function claims(req:Request):Claims|null{const m=(req.headers.get('authorization')||'').match(/^Bearer\s+([^\s]+)$/i);if(!m)return null;const p=m[1].split('.');if(p.length!==3)return null;try{const c=JSON.parse(b64url(p[1]));return typeof c?.sub==='string'&&typeof c?.session_id==='string'?{sub:c.sub,session_id:c.session_id}:null;}catch{return null;}}
function headers(req:Request){const origin=req.headers.get('origin')||'';const h:Record<string,string>={'content-type':'application/json; charset=utf-8','cache-control':'no-store, private, max-age=0','pragma':'no-cache','x-content-type-options':'nosniff'};if(origin===ALLOWED_ORIGIN){h['access-control-allow-origin']=origin;h['access-control-allow-headers']='authorization, content-type, x-client-info';h['access-control-allow-methods']='POST, OPTIONS';h['access-control-max-age']='600';h['vary']='Origin';}return h;}
function json(req:Request,body:unknown,status=200){return new Response(JSON.stringify(body),{status,headers:headers(req)});}
async function assertAdmin(c:Claims){return await sql.begin(async tx=>{const active=await tx`select exists(select 1 from auth.users u join auth.sessions s on s.user_id=u.id where u.id=${c.sub}::uuid and s.id=${c.session_id}::uuid and u.deleted_at is null and (u.banned_until is null or u.banned_until<=pg_catalog.now()) and (s.not_after is null or s.not_after>pg_catalog.now())) as ok`;if(!active?.[0]?.ok)return'unauthorized';await tx`select pg_catalog.set_config('request.jwt.claim.sub',${c.sub},true)`;const admin=await tx`select public.is_fg_admin() as ok`;return admin?.[0]?.ok?'ok':'forbidden';});}
async function status(){const rows=await sql`select source_id,tcj_run_id,created_at from private.batch2_tcj_links where purpose='calibration_rerun' and stage='pre_human' and source_id in ${sql(IDS)} order by source_id`;const done=new Set(rows.map((r:any)=>String(r.source_id)));return{total:IDS.length,done:done.size,pending:IDS.filter(id=>!done.has(id)),runs:rows.map((r:any)=>({source_id:r.source_id,tcj_run_id:Number(r.tcj_run_id),created_at:r.created_at}))};}

Deno.serve(async(req:Request)=>{
  if(req.method==='OPTIONS')return req.headers.get('origin')===ALLOWED_ORIGIN?new Response(null,{status:204,headers:headers(req)}):new Response(null,{status:403,headers:headers(req)});
  if(req.method!=='POST')return json(req,{error:'method_not_allowed'},405);
  if(req.headers.get('origin')!==ALLOWED_ORIGIN)return json(req,{error:'forbidden'},403);
  const c=claims(req);if(!c)return json(req,{error:'unauthorized'},401);
  const auth=await assertAdmin(c);if(auth==='unauthorized')return json(req,{error:'unauthorized'},401);if(auth==='forbidden')return json(req,{error:'forbidden'},403);
  let body:any;try{body=await req.json();}catch{return json(req,{error:'invalid_json'},400);}
  if(body?.action==='status')return json(req,{status:'ok',experiment:'B2-0021-0040-answers-bff-v2-pre-human-rerun',...(await status())});
  if(body?.action!=='run_next')return json(req,{error:'unknown_action'},422);
  const before=await status();if(!before.pending.length)return json(req,{status:'complete',experiment:'B2-0021-0040-answers-bff-v2-pre-human-rerun',...before});
  const sourceId=before.pending[0];
  const authorization=req.headers.get('authorization')||'';
  try{
    const r=await fetch(TARGET,{method:'POST',headers:{authorization,'content-type':'application/json'},body:JSON.stringify({source_id:sourceId,stage:'pre_human',action:'research_rerun'})});
    let payload:any=null;try{payload=await r.json();}catch{}
    if(!r.ok)return json(req,{error:'rerun_failed',source_id:sourceId,upstream_status:r.status,upstream:payload},r.status===429?429:502);
    const after=await status();return json(req,{status:'ok',source_id:sourceId,result:payload,progress:{done:after.done,total:after.total,pending:after.pending.length}});
  }catch(e){console.error('tcj-research-admin',e instanceof Error?e.message:'unknown');return json(req,{error:'service_unavailable',source_id:sourceId},503);}
});
