# The Book of Answers — Voice Public Operations Audit

**Date:** 18 August 2026  
**Status:** PASS WITH ONE PROVIDER-SIDE ACCOUNT CHECK  
**Supabase project:** `sjpvhgxacsiorrtijqua`  
**Public page:** `/voice.html`  
**Live page version at audit:** `33`  
**Production evaluator:** `voice-eval` v9

## 1. Purpose

This follow-up verifies three operational questions raised after the Voice evaluator became public:

1. whether the public privacy statement is true in the live implementation;
2. whether app-level rate/usage exhaustion fails gracefully rather than appearing broken;
3. whether the current app-level quota has reasonable headroom.

A separate provider-side Groq billing/spend-limit setting cannot be inspected from Supabase and remains an account-console check.

---

## 2. Submitted text persistence

Live schema inspection of `private.voice_eval_usage` shows exactly these columns:

```text
id
created_at
ip_hash
care_mode
model
reserved_tokens
prompt_tokens
completion_tokens
latency_ms
status
error_code
```

There is no `question`, `response`, prompt body, candidate text, request body, input text or output text column.

The production Edge Function does not insert submitted Thai text into any table and does not `console.log` the submitted question or candidate response.

Supabase Edge Function logs inspected during the audit contain request metadata such as method, URL, status, deployment and execution time; the submitted question/response body is not present in those log events.

Therefore the accurate project-level claim is:

> **Flipgazine does not permanently store the submitted question or response.**

The public copy was narrowed to that exact wording in `/voice.html` v33 rather than making a broader promise about third-party inference-provider retention controls.

The submitted text is still sent transiently to the configured Groq inference endpoint because evaluation requires model inference.

---

## 3. App-level quota and rate controls

`private.voice_eval_claim(...)` currently enforces:

```text
per IP
  3 requests / minute
  20 requests / hour
  50 requests / day

global
  6,000 reserved tokens / rolling minute
  120 requests / rolling day
  160,000 reserved tokens / rolling day
  1,500 requests / rolling 30 days
  1,500,000 reserved tokens / rolling 30 days
```

Usage rows older than 45 days are opportunistically removed during claims.

### Live headroom at audit time

```text
calls in last minute       1
calls in last day          18 / 120
calls in last 30 days      18 / 1,500

reserved tokens 1 minute   1,905 / 6,000
reserved tokens 1 day      34,321 / 160,000
reserved tokens 30 days    34,321 / 1,500,000

actual prompt tokens day   14,758
actual completion day      2,929
```

Approximate utilization:

```text
daily call cap              15.0%
daily reserved-token cap    21.5%
30-day call cap               1.2%
30-day reserved-token cap     2.3%
```

The current traffic is therefore comfortably below the configured public-app ceilings.

---

## 4. Exhaustion behavior

A rollback-only database simulation inserted temporary synthetic usage rows inside a transaction, called the real `private.voice_eval_claim(...)` function, observed the cap result, and rolled the transaction back.

Observed cap response:

```json
{
  "status": "blocked",
  "reason": "daily_budget",
  "retry_after": 3600
}
```

Post-rollback verification showed the real usage table unchanged at 18 rows and 34,321 reserved tokens.

The public page already catches `rate_limited` / `temporarily_busy` responses rather than exposing an exception or broken interface.

In `/voice.html` v33 the visitor-facing message was made deliberately broader and more truthful for both short throttles and longer budget exhaustion:

> **The public evaluator has reached a usage limit for now. Please try again later.**

This avoids promising that a daily/monthly exhaustion will recover “shortly.”

---

## 5. Provider-side Groq control

Supabase confirms only the application-side controls above. It cannot inspect the organization/account billing settings in the external Groq Console.

Therefore the following must not be claimed as verified from this audit:

- that a Groq paid-tier monthly spend limit is configured;
- the exact Groq organization/project tier;
- whether Groq Zero Data Retention is enabled for the organization.

Recommended provider-side account checks before broad promotion:

1. If the Groq organization is on a paid tier, configure a conservative monthly spend limit and alerts in the Groq Console.
2. Review the project/organization model rate limits and keep them at or above the app requirements.
3. Review Groq Data Controls and enable Zero Data Retention if desired for the public diagnostic.

These are belt-and-suspenders controls. The Flipgazine app-level request/token ceilings remain enforced independently.

---

## 6. Public copy change

Live `/voice.html` advanced from v32 to v33 during this audit.

Privacy copy changed from:

```text
This benchmark does not permanently store the submitted question or response.
```

to:

```text
Flipgazine does not permanently store the submitted question or response.
```

Usage-limit copy changed from:

```text
The evaluator is busy right now. Try again shortly.
```

to:

```text
The public evaluator has reached a usage limit for now. Please try again later.
```

No evaluator rubric, judge model, CORS rule, CARE behavior or private-corpus boundary changed in this follow-up.

---

## 7. Conclusion

The public Voice diagnostic passes the app-side operations audit:

- submitted text is not permanently stored by Flipgazine;
- usage metadata contains no submitted Thai/response content;
- Supabase Edge logs inspected do not expose request bodies;
- rate and spend-protection logic is active;
- cap exhaustion produces a controlled blocked state;
- public UI failure messaging is graceful;
- current public usage has substantial headroom.

The only remaining operational item is an **external Groq account-console check** for provider-side spend limits and optional Zero Data Retention. That setting is outside the Supabase project and was not represented as verified here.
