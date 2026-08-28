import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import vm from 'node:vm';
import { isDeepStrictEqual } from 'node:util';
import {
  CARE,
  MAX_BROAD_WIDEN,
  MIN_POOL,
  RECENT_LIMIT,
  SOURCE_FINGERPRINTS,
  chooseAnswer as serverChooseAnswer,
  resolve as serverResolve,
} from './router-v124.mjs';

const LIVE_URL = 'https://flipgazine.pages.dev/fg-page-answers.js';
const EXPECTED = Object.freeze({
  controllerMd5: 'c8a382f0562737422e891e3300bb08f6',
  answersLiteralMd5: 'c8e159c6f32ce9513056fbbe4585830d',
  careMd5: '406dd4fb9bd3278e5300a1b46d86fd8e',
  dictionaryMd5: 'c488cef1270aed127cfd0e6d86452bfd',
  indexMd5: '0fca819ceb7bc2832d052e2e56b801f9',
  intentsMd5: '895bdcb00bfeddb1fe0f33be0fe83bcb',
  constantsMd5: 'fdda764fa67985aa66bd396630ec3cd6',
  routerCoreMd5: '0136cd0b127f4c6c30c8ec098d7ac2e8',
  finalFallbackMd5: '76abfbf89bb565575a48f2bead0c6981',
});

const md5 = (s) => crypto.createHash('md5').update(s, 'utf8').digest('hex');
const host = (value) => JSON.parse(JSON.stringify(value));
const unique = (xs) => [...new Set(xs.filter(Boolean))];

function marker(source, needle) {
  const at = source.indexOf(needle);
  assert.ok(at >= 0, `missing frozen marker: ${needle}`);
  return at;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function rng() {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

async function fetchFrozenController() {
  const response = await fetch(LIVE_URL, {
    headers: { 'user-agent': 'flipgazine-v124-parity-harness' },
    cache: 'no-store',
  });
  assert.equal(response.status, 200, `reference fetch failed: HTTP ${response.status}`);
  const source = await response.text();
  return { source, transportMd5: md5(source), transportBytes: Buffer.byteLength(source, 'utf8') };
}

function extractFrozenSlices(source) {
  const p = {
    answers: marker(source, 'var answers='),
    care: marker(source, 'var CARE=['),
    dict: marker(source, 'var FOCUS_DICT='),
    index: marker(source, 'var FOCUS_INDEX='),
    root: marker(source, 'var FOCUS_ROOT={};'),
    intents: marker(source, 'var INTENTS=['),
    constants: marker(source, 'var MIN_POOL=2;'),
    core: marker(source, 'function uniq'),
    rootClose: marker(source, '})(FOCUS_ROOT);'),
    engine: marker(source, 'var FOCUS_ENGINE'),
    choose: marker(source, 'function chooseAnswer'),
    thaiSource: marker(source, 'var thaiSource'),
  };

  const routerEnd = p.core + 11680;
  const slices = {
    answersLiteral: source.slice(p.answers, p.care),
    care: source.slice(p.care, p.dict),
    dictionary: source.slice(p.dict, p.index),
    index: source.slice(p.index, p.root),
    intents: source.slice(p.intents, p.constants),
    constants: source.slice(p.constants, p.core),
    routerCore: source.slice(p.core, routerEnd),
    rootRuntime: source.slice(p.root, p.engine),
    engineAndChoose: source.slice(p.engine, p.thaiSource),
    finalFallback: source.slice(p.choose, p.thaiSource),
  };

  // Cloudflare transport may alter bytes outside the routing/corpus spans. The hard gate
  // is the exact Phase A source fingerprints of every migration-critical span.
  assert.equal(md5(slices.answersLiteral), EXPECTED.answersLiteralMd5, 'answers literal fingerprint mismatch');
  assert.equal(md5(slices.care), EXPECTED.careMd5, 'CARE fingerprint mismatch');
  assert.equal(md5(slices.dictionary), EXPECTED.dictionaryMd5, 'FOCUS_DICT fingerprint mismatch');
  assert.equal(md5(slices.index), EXPECTED.indexMd5, 'FOCUS_INDEX fingerprint mismatch');
  assert.equal(md5(slices.intents), EXPECTED.intentsMd5, 'INTENTS fingerprint mismatch');
  assert.equal(md5(slices.constants), EXPECTED.constantsMd5, 'router constants fingerprint mismatch');
  assert.equal(md5(slices.routerCore), EXPECTED.routerCoreMd5, 'router core fingerprint mismatch');
  assert.equal(md5(slices.finalFallback), EXPECTED.finalFallbackMd5, 'chooseAnswer fallback fingerprint mismatch');
  return slices;
}

function buildReference(slices) {
  const context = vm.createContext({ console });
  context.Math = Object.create(Math);
  context.answers = Array.from({ length: 948 }, (_, i) => ({ id: i + 1 }));
  context.recentAnswers = [];
  context.remember = () => {};

  vm.runInContext(
    `${slices.care}\n${slices.dictionary}\n${slices.index}\n${slices.rootRuntime}\n${slices.engineAndChoose}\n` +
    `this.__router=FOCUS_ROOT.FGFocusRouterCandidate;this.__dict=FOCUS_DICT;this.__index=FOCUS_INDEX;this.__care=CARE;this.__choose=chooseAnswer;`,
    context,
    { filename: 'frozen-v124-reference.js' },
  );

  return {
    context,
    router: context.__router,
    dictionary: host(context.__dict),
    index: host(context.__index),
    care: context.__care,
    choose: context.__choose,
  };
}

function routeState(route) {
  return host({
    parsed: route.parsed,
    tiers: route.tiers,
    selectedTier: route.selectedTier,
    basePool: route.basePool,
    supportKeys: route.supportKeys,
    supportAdds: route.supportAdds,
    pool: route.pool,
    eligible: route.eligible,
    universalAdds: route.universalAdds,
    pick: route.pick,
    widened: route.widened,
    small: route.small,
    fallback: route.fallback,
    probability: route.probability,
    minPool: route.minPool,
    maxBroadWiden: route.maxBroadWiden,
  });
}

function buildQuestionCorpus(dictionary) {
  const out = new Set([
    'จะเอายังไงดี',
    'เรื่องนี้โอไหม',
    'abc xyz no semantic match',
    'เพื่อนร่วมงานจะไปต่อดีไหม',
    'งานอดิเรกหรือทำงานดี',
    'ควรตอบคำตอบนี้ไหม',
    'ควร reply คำตอบนี้ไหม',
    'crush ทักมาควร reply ไหม',
    'coffee หรือ matcha ดี',
    'ชาไทยตอนบ่ายดีไหม',
    'barista หล่อ ควรจีบไหม',
    'bartender handsome should I flirt',
    'หมูกระทะกับส้มตำคืนนี้ดีไหม',
    'deadline พรุ่งนี้ ขอเพิ่มเวลาดีไหม',
    'เพื่อน ghosted me should I go back',
    'lowkey delulu about my crush',
    'ทำถึงไหม หรือคิดไปเอง',
    'เวลากะเทยกี่โมง',
    'should I just do it and take the risk',
    'ยกเลิกดีไหม หรือไปต่อ',
  ]);

  const reps = [];
  for (const concept of dictionary.concepts || []) {
    const terms = unique([...(concept.aliases || []), ...(concept.typos || [])]);
    const rep = terms[0];
    if (rep) reps.push({ id: concept.id, kind: concept.kind, rep });
    for (const term of terms) {
      out.add(term);
      out.add(`ควร ${term} ไหม`);
      out.add(`${term} ตอนนี้ดีไหม`);
      if (/[a-z0-9]/i.test(term)) out.add(`should I ${term}?`);
    }
  }

  for (let i = 0; i < reps.length; i++) {
    for (const jump of [1, 7, 23]) {
      const j = (i + jump) % reps.length;
      if (i !== j) out.add(`${reps[i].rep} ${reps[j].rep} ดีไหม`);
    }
  }

  return [...out];
}

function recentScenarios(referenceRouter, question, dictionary, index) {
  const probe = referenceRouter.resolve(question, dictionary, index, [], { rng: mulberry32(0xC0FFEE) });
  const scenarios = [[], index.generic.slice(0, 6)];
  if (probe.basePool?.length) scenarios.push(probe.basePool.slice(0, 6));
  if (probe.eligible?.length) scenarios.push(probe.eligible.slice(-6));
  return unique(scenarios.map((x) => JSON.stringify(x))).map((x) => JSON.parse(x));
}

function assertRoutingInvariants(route, index, label) {
  assert.equal(route.minPool, MIN_POOL, `${label}: MIN_POOL drift`);
  assert.equal(route.maxBroadWiden, MAX_BROAD_WIDEN, `${label}: MAX_BROAD_WIDEN drift`);
  assert.ok(route.eligible.length > 0, `${label}: eligible unexpectedly empty`);
  assert.equal(route.probability, 1 / route.eligible.length, `${label}: probability is not uniform 1/N`);

  if (route.selectedTier !== 'generic') {
    assert.equal(route.universalAdds.length, 2, `${label}: matched non-generic route must add exactly 2 Universals`);
    assert.equal(new Set(route.universalAdds).size, 2, `${label}: Universal additions must be distinct`);
    for (const id of route.universalAdds) {
      assert.ok(index.generic.includes(id), `${label}: Universal addition ${id} is not generic`);
    }
  } else {
    assert.equal(route.universalAdds.length, 0, `${label}: generic route must not add another 2 Universals`);
  }
}

function compareRoute(reference, question, recent, seed, failures) {
  const refRoute = reference.router.resolve(question, reference.dictionary, reference.index, recent, { rng: mulberry32(seed) });
  const newRoute = serverResolve(question, reference.dictionary, reference.index, recent, { rng: mulberry32(seed) });
  const a = routeState(refRoute);
  const b = routeState(newRoute);

  if (!isDeepStrictEqual(a, b)) {
    failures.push({ question, recent, seed, reference: a, server: b });
    return false;
  }
  assertRoutingInvariants(b, reference.index, `${question} seed=${seed} recent=${JSON.stringify(recent)}`);
  return true;
}

function compareCare(reference) {
  const samples = [
    'I want to die',
    'ไม่อยากอยู่แล้ว',
    'chest pain ควรทำไง',
    'กินยาอะไรดี',
    'I feel unsafe and threatened',
    'โดนทำร้าย ไม่ปลอดภัย',
  ];
  for (const question of samples) {
    reference.context.recentAnswers = [];
    reference.context.Math.random = mulberry32(123);
    const oldResult = host(reference.choose.call(reference.context, question, 0.5));
    const newResult = host(serverChooseAnswer(question, reference.dictionary, reference.index, [], { rng: mulberry32(123) }));
    assert.equal(oldResult.care, true, `reference CARE did not fire: ${question}`);
    assert.equal(newResult.care, true, `server CARE did not fire: ${question}`);
    assert.deepEqual(newResult.answer, oldResult.answer, `CARE answer drift: ${question}`);
  }
  assert.equal(CARE.length, 3, 'server CARE count drift');
}

function compareChooseNormal(reference) {
  const questions = [
    'coffee หรือ matcha ดี',
    'barista หล่อ ควรจีบไหม',
    'deadline พรุ่งนี้ดีไหม',
    'abc xyz no semantic match',
    'ยกเลิกดีไหม หรือไปต่อ',
  ];
  for (const seed of [1, 42, 0xDEADBEEF]) {
    for (const question of questions) {
      const recent = reference.index.generic.slice(0, 3);
      reference.context.answers = Array.from({ length: 948 }, (_, i) => ({ id: i + 1 }));
      reference.context.recentAnswers = recent.map((id) => id - 1);
      reference.context.Math.random = mulberry32(seed);
      const oldResult = host(reference.choose.call(reference.context, question, 0.73));
      const newResult = host(serverChooseAnswer(question, reference.dictionary, reference.index, recent, { rng: mulberry32(seed), answerCount: 948 }));
      assert.equal(newResult.id, oldResult.index + 1, `chooseAnswer ID drift: ${question} seed=${seed}`);
      assert.equal(newResult.tier, oldResult.tier, `chooseAnswer tier drift: ${question} seed=${seed}`);
      assert.equal(oldResult.care, undefined, `unexpected CARE on normal question: ${question}`);
    }
  }
}

function compareFinalFallback(reference) {
  const tests = [
    {
      name: 'fallback-generic-excluding-recent',
      question: 'coffee',
      index: reference.index,
      recent: reference.index.generic.slice(0, 6),
      seed: 77,
      answerCount: 948,
    },
    {
      name: 'fallback-full-generic',
      question: 'nonsense',
      index: { ...reference.index, generic: [38, 59] },
      recent: [38, 59],
      seed: 88,
      answerCount: 948,
    },
    {
      name: 'fallback-all-excluding-recent',
      question: 'nonsense',
      index: { ...reference.index, generic: [] },
      recent: [1, 2, 3, 4, 5, 6],
      seed: 99,
      answerCount: 948,
    },
    {
      name: 'fallback-full-all',
      question: 'nonsense',
      index: { ...reference.index, generic: [] },
      recent: Array.from({ length: 948 }, (_, i) => i + 1),
      seed: 111,
      answerCount: 948,
    },
  ];

  for (const t of tests) {
    reference.context.FOCUS_INDEX = t.index;
    reference.context.answers = Array(t.answerCount).fill(null);
    reference.context.recentAnswers = t.recent.map((id) => id - 1);
    reference.context.Math.random = mulberry32(t.seed);
    const oldResult = host(reference.choose.call(reference.context, t.question, 0.5));

    const newResult = host(serverChooseAnswer(t.question, reference.dictionary, t.index, t.recent, {
      rng: mulberry32(t.seed),
      answerCount: t.answerCount,
      answerExists: () => false,
    }));

    assert.equal(newResult.id, oldResult.index + 1, `${t.name}: fallback ID drift`);
  }

  reference.context.FOCUS_INDEX = reference.index;
}

async function main() {
  assert.equal(SOURCE_FINGERPRINTS.sourceControllerMd5, EXPECTED.controllerMd5, 'server provenance marker drift');
  assert.equal(SOURCE_FINGERPRINTS.routerCoreMd5, EXPECTED.routerCoreMd5, 'server router provenance marker drift');
  assert.equal(RECENT_LIMIT, 6, 'RECENT_LIMIT drift');

  const fetched = await fetchFrozenController();
  const source = fetched.source;
  const slices = extractFrozenSlices(source);
  const reference = buildReference(slices);

  if (fetched.transportMd5 !== EXPECTED.controllerMd5) {
    console.warn(`Cloudflare transport MD5 ${fetched.transportMd5} differs from stored v124 MD5 ${EXPECTED.controllerMd5}; all migration-critical source-slice hashes matched frozen Phase A.`);
  }

  assert.equal(reference.router.MIN_POOL, MIN_POOL, 'reference/server MIN_POOL differ');
  assert.equal(reference.router.MAX_BROAD_WIDEN, MAX_BROAD_WIDEN, 'reference/server MAX_BROAD_WIDEN differ');
  assert.equal(reference.router.RECENT_LIMIT, RECENT_LIMIT, 'reference/server RECENT_LIMIT differ');
  assert.equal(reference.dictionary.concepts.length, 268, 'frozen dictionary concept count drift');
  assert.equal(reference.index.generic.length, 75, 'frozen Universal count drift');
  assert.equal(Object.keys(reference.index.focus).length, 220, 'frozen Focus index key count drift');
  assert.equal(Object.keys(reference.index.support).length, 36, 'frozen Support index key count drift');

  const questions = buildQuestionCorpus(reference.dictionary);
  const seeds = [1, 42, 0xC0FFEE];
  const failures = [];
  let routeCases = 0;

  outer:
  for (const question of questions) {
    const recents = recentScenarios(reference.router, question, reference.dictionary, reference.index);
    for (const recent of recents) {
      for (const seed of seeds) {
        routeCases++;
        compareRoute(reference, question, recent, seed, failures);
        if (failures.length >= 20) break outer;
      }
    }
  }

  if (failures.length) {
    console.error(JSON.stringify({ status: 'FAIL', routeCases, failures }, null, 2));
    process.exitCode = 1;
    return;
  }

  compareCare(reference);
  compareChooseNormal(reference);
  compareFinalFallback(reference);

  const summary = {
    status: 'PASS',
    storedSourceControllerMd5: EXPECTED.controllerMd5,
    transportControllerMd5: fetched.transportMd5,
    transportBytes: fetched.transportBytes,
    frozenCriticalSlicesVerified: true,
    dictionaryConcepts: reference.dictionary.concepts.length,
    focusIndexKeys: Object.keys(reference.index.focus).length,
    supportIndexKeys: Object.keys(reference.index.support).length,
    universalIds: reference.index.generic.length,
    generatedQuestions: questions.length,
    deterministicSeeds: seeds,
    routeCases,
    routeDifferences: 0,
    careCases: 6,
    normalChooseAnswerCases: 15,
    finalFallbackCases: 4,
    invariants: {
      minPool: MIN_POOL,
      maxBroadWiden: MAX_BROAD_WIDEN,
      recentLimit: RECENT_LIMIT,
      exactlyTwoUniversalOnMatchedNonGeneric: true,
      uniformProbabilityOneOverEligible: true,
    },
  };
  console.log('PHASE_D_PARITY_RESULT=' + JSON.stringify(summary));
}

await main();
