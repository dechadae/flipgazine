/**
 * The Book of Answers — canonical server routing core.
 *
 * Behavioral source: live/frozen /fg-page-answers.js v124
 * Source controller MD5: c8a382f0562737422e891e3300bb08f6
 * Router core MD5: 0136cd0b127f4c6c30c8ec098d7ac2e8
 * CARE source MD5: 406dd4fb9bd3278e5300a1b46d86fd8e
 * Final fallback source MD5: 76abfbf89bb565575a48f2bead0c6981
 *
 * Migration rule: this module is a minimal server-side port, not a routing redesign.
 */

export const ROUTER_VERSION = '1.0.0-wip';
export const MIN_POOL = 2;
export const MAX_BROAD_WIDEN = 12;
export const RECENT_LIMIT = 6;

const INTENTS = [
  {id:'choice',re:/(?:หรือ|อันไหน|ไหนดี|เลือกอะไร|เลือกอัน|which|which one|\bor\b)/i},
  {id:'should',re:/(?:ควร|ดีไหม|ดีมั้ย|ได้ไหม|ได้มั้ย|เอาไหม|เอามั้ย|ไหม\??$|มั้ย\??$|should|worth it|can i|do i)/i},
  {id:'desire',re:/(?:อยาก|want|feel like)/i},
  {id:'timing',re:/(?:เมื่อไหร่|ตอนไหน|ตอนนี้|วันนี้|พรุ่งนี้|คืนนี้|กี่โมง|วันธรรมดา|เช้า|บ่าย|when|now|today|tomorrow|tonight|later|weekday|morning|afternoon)/i},
  {id:'reaction',re:/(?:ทำไง|ทำยังไง|เอาไง|ตอบยังไง|ควรทำยังไง|what should i do|how should i|how do i)/i},
  {id:'feeling',re:/(?:รู้สึก|เครียด|เหนื่อย|เหงา|เบื่อ|เศร้า|เซ็ง|คิดมาก|feel|stressed|tired|lonely|bored|sad|overwhelmed)/i}
];

export const CARE = [
  {re:/(suicid|self[- ]?harm|want to die|ไม่อยากอยู่|ทำร้ายตัวเอง)/i,a:{thai:"เรื่องนี้ไม่เอาฮา\nอยู่กับคนที่ไว้ใจได้ก่อน",english:"No jokes for this one. Stay with someone you trust and get real help now."}},
  {re:/(หมอ|โรงพยาบาล|ยาอะไร|กินยา|หยุดยา|เลือด|หายใจไม่ออก|ปวดหน้าอก|doctor|hospital|medicine|dose|chest pain)/i,a:{thai:"เรื่องนี้ถามหมอดีกว่า\nหนังสือไม่มีใบประกอบ",english:"Ask a clinician. This book has no medical license."}},
  {re:/(โดนทำร้าย|ถูกทำร้าย|ไม่ปลอดภัย|ขู่|abuse|unsafe|violence|threat)/i,a:{thai:"ถ้าไม่ปลอดภัย\nออกจากตรงนั้นก่อน",english:"If you are unsafe, get somewhere safer and contact someone you trust."}}
];

function uniq(a){var o={},r=[];(a||[]).forEach(function(x){if(x!=null&&!o[x]){o[x]=1;r.push(x)}});return r}
function escRe(s){return String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}
export function normalize(text){
  var s=String(text==null?'':text);
  try{s=s.normalize('NFKC')}catch(e){}
  return s.toLowerCase()
    .replace(/[“”„‟«»]/g,'"').replace(/[‘’‚‛]/g,"'")
    .replace(/[‐‑‒–—―]/g,'-')
    .replace(/[\u200B-\u200D\uFEFF]/g,'')
    .replace(/[!?！？,，;；:：()\[\]{}<>\/\\|*_~`]+/g,' ')
    .replace(/\.{2,}/g,' ')
    .replace(/\s+/g,' ').trim();
}
function hasLatin(s){return /[a-z0-9]/i.test(s)}
function aliasSpans(text,alias){
  var out=[],i=0;
  if(!alias)return out;
  if(hasLatin(alias)){
    var re=new RegExp('(^|[^a-z0-9])('+escRe(alias)+')(?=$|[^a-z0-9])','ig'),m;
    while((m=re.exec(text))){var start=m.index+m[1].length;out.push({start:start,end:start+m[2].length});if(re.lastIndex===m.index)re.lastIndex++}
    return out;
  }
  while((i=text.indexOf(alias,i))>=0){out.push({start:i,end:i+alias.length});i+=Math.max(1,alias.length)}
  return out;
}
function buildAliasTable(dictionary){
  var out=[];
  (dictionary.concepts||[]).forEach(function(c){
    (c.aliases||[]).forEach(function(a){out.push({alias:normalize(a),id:c.id,kind:c.kind,source:'alias',topics:c.topics||[],helpers:c.helpers||[]})});
    (c.typos||[]).forEach(function(a){out.push({alias:normalize(a),id:c.id,kind:c.kind,source:'typo',topics:c.topics||[],helpers:c.helpers||[]})});
  });
  out.sort(function(a,b){return b.alias.length-a.alias.length||a.alias.localeCompare(b.alias)});
  return out;
}
export function parseQuestion(question,dictionary){
  var normalized=normalize(question),table=buildAliasTable(dictionary),candidates=[],hits=[];
  table.forEach(function(x){aliasSpans(normalized,x.alias).forEach(function(sp){candidates.push(Object.assign({},x,sp,{len:sp.end-sp.start}))})});
  candidates.sort(function(a,b){return b.len-a.len||a.start-b.start||a.alias.localeCompare(b.alias)});
  var occupied=[],supportOccupied=[];
  candidates.forEach(function(x){
    var lane=x.kind==='support'?supportOccupied:occupied;
    var overlap=lane.some(function(s){return x.start<s.end&&x.end>s.start});
    if(!overlap){hits.push(x);lane.push({start:x.start,end:x.end})}
  });
  hits.sort(function(a,b){return a.start-b.start||b.len-a.len});
  var focuses=[],slang=[],bridges=[],supports=[],topics=[],topicExplicit=[],helpers=[];
  hits.forEach(function(h){
    if(h.kind==='focus')focuses.push(h.id);
    else if(h.kind==='slang')slang.push(h.id);
    else if(h.kind==='bridge')bridges.push(h.id);
    else if(h.kind==='support')supports.push(h.id);
    else if(h.kind==='topic'){topics.push(h.id);topicExplicit.push(h.id)}
    (h.topics||[]).forEach(function(t){topics.push(t)});
    (h.helpers||[]).forEach(function(x){helpers.push(x)});
  });
  focuses=uniq(focuses);
  /* Resolve useful short Thai aliases without reviving substring traps. */
  if(focuses.indexOf('colleague')>=0&&focuses.indexOf('friend')>=0){
    var friendProbe=normalized.replace(/เพื่อนร่วมงาน/g,'');
    if(friendProbe.indexOf('เพื่อน')<0&&!/\b(?:friend|friends|bestie)\b/i.test(friendProbe))focuses=focuses.filter(function(x){return x!=='friend'});
  }
  if(focuses.indexOf('work')>=0&&(focuses.indexOf('colleague')>=0||focuses.indexOf('hobby')>=0)){
    var workProbe=normalized.replace(/เพื่อนร่วมงาน|งานอดิเรก|งานฝีมือ/g,'');
    if(workProbe.indexOf('งาน')<0&&!/\b(?:work|job)\b/i.test(workProbe))focuses=focuses.filter(function(x){return x!=='work'});
  }
  if(focuses.indexOf('reply')>=0&&normalized.indexOf('คำตอบ')>=0){
    var replyProbe=normalized.replace(/คำตอบ/g,'');
    if(replyProbe.indexOf('ตอบ')<0&&!/\brepl(?:y|ied|ying)\b/i.test(replyProbe))focuses=focuses.filter(function(x){return x!=='reply'});
  }
  var intents=[];INTENTS.forEach(function(x){if(x.re.test(normalized))intents.push(x.id)});
  if(intents.some(function(x){return x==='choice'||x==='should'||x==='reaction'}))helpers.push('decision');
  if(intents.indexOf('timing')>=0)helpers.push('timing');
  return {raw:String(question||''),normalized:normalized,focus:focuses,slang:uniq(slang),bridges:uniq(bridges),support:uniq(supports),topics:uniq(topics),topicExplicit:uniq(topicExplicit),helpers:uniq(helpers),intents:uniq(intents),aliasHits:hits};
}
function intersectLists(lists){
  if(!lists.length)return [];
  var base=(lists[0]||[]).slice(),sets=lists.slice(1).map(function(a){var o={};(a||[]).forEach(function(x){o[x]=1});return o});
  return base.filter(function(x){return sets.every(function(s){return !!s[x]})});
}
function unionLists(lists){var o={},r=[];lists.forEach(function(a){(a||[]).forEach(function(x){if(!o[x]){o[x]=1;r.push(x)}})});return r.sort(function(a,b){return a-b})}
function idsFor(map,keys){return (keys||[]).map(function(k){return (map&&map[k])||[]})}
function rarestFocus(focus,index){
  var best=null,n=Infinity;(focus||[]).forEach(function(f){var c=((index.focus||{})[f]||[]).length;if(c&&c<n){n=c;best=f}});return best;
}
function filterByAny(ids,allowed){var s={};(allowed||[]).forEach(function(x){s[x]=1});return (ids||[]).filter(function(x){return !!s[x]})}
function makeTier(name,ids,meta){return {name:name,ids:uniq(ids).sort(function(a,b){return a-b}),meta:meta||{}}}
export function buildTiers(parsed,index){
  var semantic=parsed.focus.length?parsed.focus:parsed.slang;
  var excludedSet={};(index.generic||[]).forEach(function(id){excludedSet[id]=1});
  Object.keys(index.support||{}).forEach(function(k){(index.support[k]||[]).forEach(function(id){excludedSet[id]=1})});
  function stripSpecial(lists){return lists.map(function(a){return (a||[]).filter(function(id){return !excludedSet[id]})})}
  var focusLists=stripSpecial(idsFor(index.focus,semantic)),topicLists=stripSpecial(idsFor(index.topics,parsed.topics)),helperLists=stripSpecial(idsFor(index.helpers,parsed.helpers||[])),tiers=[];
  if(semantic.length){
    tiers.push(makeTier('all-focus',intersectLists(focusLists),{focus:semantic.slice(),required:semantic.length}));
    if(semantic.length>=2){
      var counts={},threshold=Math.max(1,semantic.length-1),near=[];
      semantic.forEach(function(f){((index.focus||{})[f]||[]).forEach(function(id){if(!excludedSet[id])counts[id]=(counts[id]||0)+1})});
      Object.keys(counts).forEach(function(id){if(counts[id]>=threshold)near.push(+id)});
      tiers.push(makeTier('near-focus',near,{focus:semantic.slice(),required:threshold}));
    }
    tiers.push(makeTier('any-focus',unionLists(focusLists),{focus:semantic.slice(),required:1}));
  }
  if(parsed.topics.length){
    tiers.push(makeTier('all-topics',intersectLists(topicLists),{topics:parsed.topics.slice()}));
    tiers.push(makeTier('any-topic',unionLists(topicLists),{topics:parsed.topics.slice()}));
  }
  if((parsed.helpers||[]).length){
    tiers.push(makeTier('all-helpers',intersectLists(helperLists),{helpers:parsed.helpers.slice()}));
    tiers.push(makeTier('any-helper',unionLists(helperLists),{helpers:parsed.helpers.slice()}));
  }
  var generic=[];
  if(index.generic)generic=index.generic.slice();
  tiers.push(makeTier('generic',generic,{}));
  var seen={},out=[];tiers.forEach(function(t){var key=t.name+'|'+t.ids.join(',');if(!seen[key]&&t.ids.length){seen[key]=1;out.push(t)}});return out;
}
export function selectTier(tiers,minPool,maxBroadWiden){
  minPool=minPool||MIN_POOL;maxBroadWiden=maxBroadWiden||MAX_BROAD_WIDEN;
  function focusTier(name){return name==='all-focus'||name==='near-focus'||name==='any-focus'}
  function containsAll(hay,need){var s={};hay.forEach(function(x){s[x]=1});return need.every(function(x){return !!s[x]})}
  var seed=null,seedIndex=-1;
  for(var z=0;z<tiers.length;z++)if(focusTier(tiers[z].name)&&tiers[z].ids.length){seed=tiers[z].ids;seedIndex=z;break}
  for(var i=0;i<tiers.length;i++){
    var t=tiers[i];if(t.name==='generic'||t.ids.length<minPool)continue;
    if(seed&&!containsAll(t.ids,seed))continue;
    if(focusTier(t.name)||t.ids.length<=maxBroadWiden)return {tier:t,widened:seedIndex>=0?i>seedIndex:i>0};
  }
  if(seed)return {tier:tiers[seedIndex],widened:false,small:true};
  for(var j=0;j<tiers.length;j++)if(tiers[j].name!=='generic'&&tiers[j].ids.length)return {tier:tiers[j],widened:j>0,small:true};
  return {tier:tiers[tiers.length-1]||makeTier('generic',[]),widened:true,fallback:true};
}
export function removeRecent(ids,recent){
  var r=(recent||[]).slice(-RECENT_LIMIT),ban={};r.forEach(function(x){ban[x]=1});
  var filtered=(ids||[]).filter(function(x){return !ban[x]});
  return filtered.length?filtered:(ids||[]).slice();
}
export function uniformPick(ids,rng){
  if(!ids||!ids.length)return null;rng=rng||Math.random;return ids[Math.floor(rng()*ids.length)];
}
function sampleDistinct(ids,n,rng){
  var pool=(ids||[]).slice(),out=[];rng=rng||Math.random;
  while(pool.length&&out.length<n){var i=Math.floor(rng()*pool.length);out.push(pool.splice(i,1)[0])}
  return out;
}
export function resolve(question,dictionary,index,recent,options){
  options=options||{};
  var parsed=parseQuestion(question,dictionary),tiers=buildTiers(parsed,index),chosen=selectTier(tiers,options.minPool||MIN_POOL,options.maxBroadWiden||MAX_BROAD_WIDEN);
  var supportKeys=uniq([].concat(parsed.focus||[],parsed.slang||[],parsed.support||[]));
  var supportPool=unionLists(idsFor(index.support,supportKeys));
  var hasSubject=!!((parsed.focus||[]).length||(parsed.slang||[]).length||(parsed.topicExplicit||[]).length);
  if(supportPool.length&&(chosen.tier.name==='generic'||!hasSubject)){
    chosen={tier:makeTier('support',supportPool,{support:supportKeys.slice()}),widened:false,small:supportPool.length<(options.minPool||MIN_POOL),fallback:false};
  }
  var chosenSet={};(chosen.tier.ids||[]).forEach(function(x){chosenSet[x]=1});
  var supportAdds=supportPool.filter(function(x){return !chosenSet[x]});
  var mixedPool=chosen.tier.name==='generic'?(chosen.tier.ids||[]).slice():uniq((chosen.tier.ids||[]).concat(supportAdds)).sort(function(a,b){return a-b});
  var baseEligible=removeRecent(mixedPool,recent||[]),universalAdds=[],eligible=baseEligible.slice();
  if(chosen.tier.name!=='generic'){
    var recentSet={},baseSet={};
    (recent||[]).forEach(function(x){recentSet[x]=1});baseEligible.forEach(function(x){baseSet[x]=1});
    var universalCandidates=(index.generic||[]).filter(function(x){return !recentSet[x]&&!baseSet[x]});
    if(universalCandidates.length<2)universalCandidates=(index.generic||[]).filter(function(x){return !baseSet[x]});
    universalAdds=sampleDistinct(universalCandidates,2,options.rng);
    eligible=baseEligible.concat(universalAdds);
  }
  var id=uniformPick(eligible,options.rng);
  return {parsed:parsed,tiers:tiers,selectedTier:chosen.tier.name,basePool:chosen.tier.ids,supportKeys:supportKeys,supportAdds:supportAdds,pool:mixedPool.concat(universalAdds),eligible:eligible,universalAdds:universalAdds,pick:id,widened:!!chosen.widened,small:!!chosen.small,fallback:!!chosen.fallback,probability:eligible.length?1/eligible.length:0,minPool:options.minPool||MIN_POOL,maxBroadWiden:options.maxBroadWiden||MAX_BROAD_WIDEN};
}

/**
 * Server-side port of live chooseAnswer() selection semantics.
 * It is intentionally pure: it does not mutate recent history. The service layer
 * is responsible for appending a normal answer ID only after a successful reveal.
 *
 * `answerExists(id)` must reflect the corpus revision being routed. For frozen
 * v124, IDs 1..948 are all present.
 */
export function chooseAnswer(question, dictionary, index, recent, options){
  options=options||{};
  var care=options.care||CARE;
  var rng=options.rng||Math.random;
  for(var c=0;c<care.length;c++)if(care[c].re.test(question))return{index:-1,id:null,answer:care[c].a,care:true,route:null};

  var route=resolve(question,dictionary,index,recent||[],{
    rng:rng,
    minPool:options.minPool||MIN_POOL,
    maxBroadWiden:options.maxBroadWiden||MAX_BROAD_WIDEN
  });
  var id=route&&route.pick;
  var answerCount=options.answerCount||948;
  var answerExists=options.answerExists||function(x){return x>0&&x<=answerCount};

  if(!answerExists(id)){
    var recentIds=recent||[];
    var fallback=(index.generic||[]).filter(function(x){return recentIds.indexOf(x)<0});
    if(!fallback.length)fallback=(index.generic||[]).slice();
    if(!fallback.length){for(var z=1;z<=answerCount;z++)if(answerExists(z)&&recentIds.indexOf(z)<0)fallback.push(z)}
    if(!fallback.length){for(var y=1;y<=answerCount;y++)if(answerExists(y))fallback.push(y)}
    id=fallback[Math.floor(rng()*fallback.length)]||1;
  }

  return{index:id-1,id:id,answer:null,care:false,focus:true,tier:route&&route.selectedTier?route.selectedTier:'generic',route:route};
}

export const SOURCE_FINGERPRINTS = Object.freeze({
  sourceControllerMd5:'c8a382f0562737422e891e3300bb08f6',
  routerCoreMd5:'0136cd0b127f4c6c30c8ec098d7ac2e8',
  careSourceMd5:'406dd4fb9bd3278e5300a1b46d86fd8e',
  intentsSourceMd5:'895bdcb00bfeddb1fe0f33be0fe83bcb',
  routerConstantsMd5:'fdda764fa67985aa66bd396630ec3cd6',
  finalFallbackMd5:'76abfbf89bb565575a48f2bead0c6981'
});

// Kept only to document frozen v124's internal surface. These are intentionally
// not exported or used by consumers, matching the fact they were unused in resolve().
void rarestFocus;
void filterByAny;