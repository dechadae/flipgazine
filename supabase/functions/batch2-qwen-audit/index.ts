const SUPA=Deno.env.get('SUPABASE_URL')||'https://sjpvhgxacsiorrtijqua.supabase.co';
const TARGET=`${SUPA}/functions/v1/tcj-engine`;
const MAX_BODY_BYTES=2200;
const BASE={'content-type':'application/json; charset=utf-8','cache-control':'no-store, private, max-age=0','pragma':'no-cache','x-content-type-options':'nosniff','referrer-policy':'no-referrer'};
function out(body:unknown,status=200){return new Response(JSON.stringify(body),{status,headers:BASE});}
Deno.serve(async(req:Request)=>{
  if(req.headers.get('origin'))return out({error:'browser_origin_forbidden'},403);
  if(req.method!=='POST')return out({error:'method_not_allowed'},405);
  const type=(req.headers.get('content-type')||'').toLowerCase();if(!type.includes('application/json'))return out({error:'unsupported_media_type'},415);
  const declared=Number(req.headers.get('content-length')||0);if(Number.isFinite(declared)&&declared>MAX_BODY_BYTES)return out({error:'payload_too_large'},413);
  let raw='';try{raw=await req.text();}catch{return out({error:'invalid_request'},400);}if(new TextEncoder().encode(raw).byteLength>MAX_BODY_BYTES)return out({error:'payload_too_large'},413);
  let body:any;try{body=JSON.parse(raw);}catch{return out({error:'invalid_json'},400);}
  if(body?.action==null)body.action='batch2_audit';
  const authorization=req.headers.get('authorization')||'';const apikey=req.headers.get('apikey')||'';
  if(!authorization)return out({error:'unauthorized'},401);
  try{
    const r=await fetch(TARGET,{method:'POST',headers:{authorization,'content-type':'application/json',...(apikey?{apikey}:{})},body:JSON.stringify(body)});
    const text=await r.text();const h=new Headers(BASE);const retry=r.headers.get('retry-after');if(retry)h.set('retry-after',retry);return new Response(text,{status:r.status,headers:h});
  }catch{return out({error:'service_unavailable'},503);}
});
