import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CARE,
  MAX_BROAD_WIDEN,
  MIN_POOL,
  RECENT_LIMIT,
  chooseAnswer,
  normalize,
  parseQuestion,
  removeRecent,
  resolve
} from './router-v124.mjs';

function sequenceRng(values){
  let i=0;
  return () => {
    if(i>=values.length) throw new Error('rng sequence exhausted');
    return values[i++];
  };
}

const dictionary={concepts:[
  {id:'coffee',kind:'focus',aliases:['coffee','กาแฟ'],typos:[],topics:['beverage'],helpers:[]},
  {id:'friend',kind:'focus',aliases:['friend','เพื่อน'],typos:[],topics:[],helpers:[]},
  {id:'colleague',kind:'focus',aliases:['colleague','เพื่อนร่วมงาน'],typos:[],topics:[],helpers:[]},
  {id:'work',kind:'focus',aliases:['work','งาน'],typos:[],topics:[],helpers:[]},
  {id:'reply',kind:'focus',aliases:['reply','ตอบ','คำตอบ'],typos:[],topics:[],helpers:[]},
  {id:'retry',kind:'support',aliases:['try again'],typos:[],topics:[],helpers:[]},
  {id:'food',kind:'topic',aliases:['food'],typos:[],topics:[],helpers:[]}
]};

const index={
  generic:[90,91,92,93,94],
  focus:{coffee:[1,2,90],friend:[3,4],colleague:[5,6],work:[7,8],reply:[9,10]},
  support:{coffee:[20,21],retry:[22]},
  topics:{beverage:[1,2,30],food:[31,32]},
  helpers:{decision:[40,41],timing:[42,43]}
};

test('constants remain frozen',()=>{
  assert.equal(MIN_POOL,2);
  assert.equal(MAX_BROAD_WIDEN,12);
  assert.equal(RECENT_LIMIT,6);
});

test('normalization preserves v124 behavior',()=>{
  assert.equal(normalize('  “COFFEE”…!?  '),'"coffee"');
  assert.equal(normalize('A\u200BB—C'),'ab-c');
});

test('Thai collision repair keeps colleague and removes friend/work substrings',()=>{
  const p=parseQuestion('เพื่อนร่วมงาน',dictionary);
  assert.deepEqual(p.focus,['colleague']);
});

test('NFKC behavior is preserved even where it prevents the composed คำตอบ repair literal from matching',()=>{
  const p=parseQuestion('คำตอบ',dictionary);
  assert.equal(p.normalized,'คําตอบ');
  assert.deepEqual(p.focus,['reply']);
});

test('recent removal uses only last six and restores pool if filtering empties it',()=>{
  assert.deepEqual(removeRecent([1,2],[8,9,10,11,12,13,1]),[2]);
  assert.deepEqual(removeRecent([1,2],[9,10,11,12,1,2]),[1,2]);
});

test('generic route is the Universal pool and does not add two more Universals',()=>{
  const route=resolve('completely unmatched',dictionary,index,[],{rng:sequenceRng([0.4])});
  assert.equal(route.selectedTier,'generic');
  assert.deepEqual(route.universalAdds,[]);
  assert.deepEqual(route.eligible,[90,91,92,93,94]);
  assert.equal(route.probability,1/5);
  assert.equal(route.pick,92);
});

test('matched focus route appends support then exactly two distinct Universals and one uniform final pick',()=>{
  const route=resolve('coffee',dictionary,index,[],{rng:sequenceRng([0.0,0.5,0.99])});
  assert.equal(route.selectedTier,'all-focus');
  assert.deepEqual(route.basePool,[1,2]);
  assert.deepEqual(route.supportAdds,[20,21]);
  assert.deepEqual(route.universalAdds,[90,93]);
  assert.deepEqual(route.eligible,[1,2,20,21,90,93]);
  assert.equal(new Set(route.universalAdds).size,2);
  assert.equal(route.probability,1/6);
  assert.equal(route.pick,93);
});

test('Universal sampling first excludes recent; fallback excludes only base eligible when fewer than two remain',()=>{
  const smallIndex={...index,generic:[90,91,92],focus:{...index.focus,coffee:[1,2]}};
  const route=resolve('coffee',dictionary,smallIndex,[90,91,92],{rng:sequenceRng([0,0,0])});
  assert.deepEqual(route.universalAdds,[90,91]);
  assert.equal(route.universalAdds.length,2);
});

test('CARE has precedence and bypasses normal routing',()=>{
  const out=chooseAnswer('I want to die and coffee',dictionary,index,[],{rng:()=>{throw new Error('rng should not run')}});
  assert.equal(out.care,true);
  assert.equal(out.index,-1);
  assert.deepEqual(out.answer,CARE[0].a);
  assert.equal(out.route,null);
});

test('final fallback preserves generic -> full generic -> all nonrecent -> all IDs order with injected RNG',()=>{
  const brokenIndex={generic:[90,91],focus:{coffee:[999,1000]},support:{},topics:{beverage:[999,1000]},helpers:{}};
  const out=chooseAnswer('coffee',dictionary,brokenIndex,[],{
    answerCount:100,
    answerExists:id=>id>=1&&id<=100,
    rng:sequenceRng([0,0,0,0.99])
  });
  assert.equal(out.id,91);
});

test('chooseAnswer is pure and does not mutate caller recent history',()=>{
  const recent=[1,2,3];
  const before=recent.slice();
  chooseAnswer('coffee',dictionary,index,recent,{rng:sequenceRng([0,0,0])});
  assert.deepEqual(recent,before);
});
