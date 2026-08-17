from pathlib import Path

router = Path('supabase/functions/_shared/router-v124.mjs')
s = router.read_text()
old = "if(!fallback.length){for(var z=1;z<=answerCount;z++)if(recentIds.indexOf(z)<0)fallback.push(z)}\n    if(!fallback.length){for(var y=1;y<=answerCount;y++)fallback.push(y)}"
new = "if(!fallback.length){for(var z=1;z<=answerCount;z++)if(answerExists(z)&&recentIds.indexOf(z)<0)fallback.push(z)}\n    if(!fallback.length){for(var y=1;y<=answerCount;y++)if(answerExists(y))fallback.push(y)}"
if s.count(old) != 1:
    raise SystemExit(f'router fallback anchor mismatch: {s.count(old)}')
router.write_text(s.replace(old, new))

p = Path('supabase/functions/answers-service/index.ts')
s = p.read_text()
s = s.replace("const FROZEN_ANSWER_COUNT = 948;\n", "")
s = s.replace('select private.answer_prepare_claim(', 'select private.answer_prepare_claim_current(')
anchor = "  if (!claim.dictionary || !claim.index) throw new Error('routing assets missing');\n"
inject = """  if (!claim.dictionary || !claim.index) throw new Error('routing assets missing');
  const maxAnswerId = Number(claim.max_answer_id);
  const activeIds = Array.isArray(claim.active_ids) ? claim.active_ids.map(Number) : [];
  const activeSet = new Set(activeIds);
  if (!Number.isInteger(maxAnswerId) || maxAnswerId < 1 || !activeIds.length) throw new Error('active corpus missing');
"""
if s.count(anchor) != 1:
    raise SystemExit(f'service claim anchor mismatch: {s.count(anchor)}')
s = s.replace(anchor, inject)
s = s.replace('      answerCount: FROZEN_ANSWER_COUNT,\n', '      answerCount: maxAnswerId,\n      answerExists: (id: number) => activeSet.has(Number(id)),\n')
s = s.replace('if (!Number.isInteger(answerId) || answerId < 1 || answerId > FROZEN_ANSWER_COUNT) {', 'if (!Number.isInteger(answerId) || !activeSet.has(answerId)) {')
s = s.replace('select private.answer_reveal_guarded(', 'select private.answer_reveal_guarded_current(')
s = s.replace('const normal = Number.isInteger(revealed.id) && revealed.id >= 1 && revealed.id <= FROZEN_ANSWER_COUNT;', 'const normal = Number.isInteger(revealed.id) && revealed.id >= 1;')
p.write_text(s)
