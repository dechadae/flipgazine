const SUPA=Deno.env.get('SUPABASE_URL')||'https://sjpvhgxacsiorrtijqua.supabase.co';
const TARGET=`${SUPA}/functions/v1/tcj-engine`;
const ALLOWED_ORIGIN='https://flipgazine.pages.dev';
const MAX_BODY_BYTES=9000;

function headers(origin:string|null){
  const h=new Headers({'content-type':'application/json; charset=utf-8','cache-control':'no-store, private, max-age=0','pragma':'no-cache','x-content-type-options':'nosniff','referrer-policy':'no-referrer'});
  if(origin===ALLOWED_ORIGIN){h.set('access-control-allow-origin',origin);h.set('vary','Origin');h.set('access-control-allow-methods','POST, OPTIONS');h.set('access-control-allow-headers','content-type');h.set('access-control-max-age','600');}
  return h;
}
function out(origin:string|null,body:unknown,status=200){return new Response(JSON.stringify(body),{status,headers:headers(origin)});}

Deno.serve(async(req:Request)=>{
  const origin=req.headers.get('origin');
  if(req.method==='OPTIONS')return origin===ALLOWED_ORIGIN?new Response(null,{status:204,headers:headers(origin)}):new Response(null,{status:403,headers:headers(origin)});
  if(req.method!=='POST')return out(origin,{error:'method_not_allowed'},405);
  if(origin!==ALLOWED_ORIGIN)return out(origin,{error:'forbidden'},403);
  const type=(req.headers.get('content-type')||'').toLowerCase();if(!type.includes('application/json'))return out(origin,{error:'unsupported_media_type'},415);
  const declared=Number(req.headers.get('content-length')||0);if(Number.isFinite(declared)&&declared>MAX_BODY_BYTES)return out(origin,{error:'payload_too_large'},413);
  let raw='';try{raw=await req.text();}catch{return out(origin,{error:'invalid_request'},400);}if(new TextEncoder().encode(raw).byteLength>MAX_BODY_BYTES)return out(origin,{error:'payload_too_large'},413);
  let parsed:any;try{parsed=JSON.parse(raw);}catch{return out(origin,{error:'invalid_json'},400);}
  if(parsed?.profile==null)parsed.profile='general-v1';
  try{
    const r=await fetch(TARGET,{method:'POST',headers:{'content-type':'application/json','origin':ALLOWED_ORIGIN},body:JSON.stringify(parsed)});
    const text=await r.text();
    const h=headers(origin);h.set('content-type',r.headers.get('content-type')||'application/json; charset=utf-8');
    const retry=r.headers.get('retry-after');if(retry)h.set('retry-after',retry);
    return new Response(text,{status:r.status,headers:h});
  }catch{return out(origin,{error:'service_unavailable'},503);}
});
