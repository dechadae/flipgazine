# TCJ GPT-Live Availability & Dependency Policy

**Date:** 24 August 2026  
**Status:** GOVERNING MODEL-DEPENDENCY POLICY  
**Scope:** GPT-Live, Realtime API candidates, TCJ production architecture, research use

## 1. Current availability fact

As of 24 August 2026, GPT-Live-1 is available to eligible ChatGPT users through ChatGPT Voice, but OpenAI has not yet made GPT-Live-1 generally callable through the public API.

OpenAI's public launch material says API support is planned and provides a notification signup rather than normal public model documentation/usage.

Therefore:

> **TCJ production architecture must not depend on GPT-Live-1 today.**

A capability available only through the consumer ChatGPT Voice experience is not a deployable judge dependency for buyer/private-server TCJ.

## 2. GPT-Live may be used only as an R&D reference while API access is unavailable

GPT-Live may still be useful for exploratory linguistic comparison because its conversational Thai may reveal strong footing, stance, omission, register and social-timing behavior.

But such work must be interpreted as:

```text
research reference / linguistic probe
NOT
production runtime qualification
```

Do not spend large amounts of human-review time building a GPT-Live-specific production architecture before public API availability exists.

## 3. If GPT-Live becomes public, TCJ simplifies

If OpenAI later exposes GPT-Live through a stable public API and it proves strong on Thai evaluation + rewrite, TCJ should not recreate GPT-Live's native conversational intelligence unnecessarily.

A simpler architecture becomes possible:

```text
writer/source draft
→ TCJ orchestration
→ pinned Voice/Profile + repository context
→ bounded private evidence
→ GPT-Live semantic judge/rewriter
→ TCJ deterministic release policy
→ audit / provenance / recheck
```

In that architecture TCJ is intentionally a control plane around a strong semantic model.

Its differentiated value becomes:

- private native-human evidence;
- customer/tenant Voice Profiles;
- repository-connected conceptual memory;
- focus + discourse reachability;
- model/configuration qualification;
- protected hidden tests;
- deterministic release policy;
- provenance/audit/hash/version control;
- customer privacy and deployment boundary;
- automatic improvement/rollback discipline;
- model replacement/abstraction when better models become available.

That is a valid product architecture. TCJ does not need to pretend the underlying semantic intelligence is proprietary if an external model supplies it.

## 4. "Middle man" is acceptable if it controls something valuable

If GPT-Live itself is the best judge and rewriter, TCJ becomes middleware/control infrastructure rather than the primary language model.

That is acceptable only if TCJ measurably adds value beyond calling GPT-Live directly.

Required value tests would include:

```text
GPT-Live alone
vs
GPT-Live + TCJ repository context
vs
GPT-Live + TCJ repository context + private native evidence
vs
full TCJ release/control policy
```

If TCJ adds no meaningful lift, the architecture should be simplified rather than preserving unnecessary layers.

## 5. Public Realtime API models are not assumed equivalent

OpenAI currently lists public realtime models such as `gpt-realtime-2.1` and `gpt-realtime-2.1-mini` with public API pricing.

These are not automatically equivalent to GPT-Live-1.

Do not substitute them merely because they are realtime/audio models.

A public realtime candidate must independently demonstrate:

- natural Thai conversational competence;
- footing reconstruction;
- exact-copy judgment;
- rewrite lift;
- meaning preservation;
- register/hierarchy handling;
- reproducibility and usable API contracts.

Only evidence can establish equivalence or superiority.

## 6. Production architecture rule

The governing model abstraction is therefore:

```text
TCJ semantic engine = replaceable qualified model
```

not:

```text
TCJ semantic engine = GPT-Live-1
```

Today, GPT-Live-1 is a research reference only.

If/when it becomes publicly callable, it may become a candidate semantic engine and could radically simplify the system.

## 7. Research priority

Do not make a GPT-Live-vs-text transcript benchmark the main TCJ development track merely because Voice appears stronger.

Current priorities remain:

1. footing-first linguistic model;
2. rewrite-capable judge contract;
3. native-human discourse/footing analysis;
4. profile-scoped research for formal enterprise Thai and BFF stress testing;
5. evaluation of publicly deployable model candidates.

GPT-Live probing is optional and opportunistic until API availability changes.

## 8. Availability watch trigger

When OpenAI publicly releases GPT-Live API access:

1. verify official model/API documentation and pricing;
2. verify whether text output / structured output / tool use satisfy TCJ needs;
3. run a small fresh native-human Thai judge+rewrite pilot;
4. compare direct GPT-Live vs GPT-Live under TCJ control;
5. if strong, reconsider the architecture immediately rather than continuing to recreate already-solved intelligence.

## 9. Governing principle

> **Do not build TCJ around an unavailable model.**

And if that model later becomes public and already solves the hard linguistic problem:

> **Use it. Let TCJ control, qualify, protect and improve the system instead of duplicating intelligence for its own sake.**
