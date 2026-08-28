# The Book of Answers — Outreach Engagement Tracking

> **Operational interpretation rule:** telemetry proves events, not recipient identity or buyer intent. Verify the live endpoint and retention configuration before relying on this historical deployment description for a new campaign.

**Status:** ACTIVE INTERNAL OPERATIONS SPEC  
**Created:** 19 August 2026  
**Project:** Flipgazine / The Book of Answers

---

## 1. Purpose

Track whether first-contact recipients actually engage with the public Book / Voice / Benchmark after outreach, without attempting to identify a person from an IP address or storing user-entered content.

This is commercial follow-up evidence, not identity proof.

---

## 2. Privacy boundary

The tracker does **not** store:

- raw IP address;
- IP-derived fingerprint;
- email address;
- recipient name;
- Book question text;
- Book answer text;
- benchmark question/scenario text;
- benchmark response text;
- full user-agent string;
- full referrer URL.

It stores only:

- server timestamp;
- event type;
- public page path;
- random session UUID held in `sessionStorage`;
- optional outreach source code from `?src=` / `utm_source`;
- referrer hostname only;
- coarse browser family;
- coarse OS family;
- automated/bot hint;
- minimal non-content interaction metadata such as input length or CARE boolean.

The private event table is `private.answers_outreach_events`.

RLS is enabled. `PUBLIC`, `anon` and `authenticated` have no table grants. Records are automatically pruned after 90 days.

---

## 3. Public ingestion endpoint

Edge Function:

`answers-outreach-track`

Current deployment uses Supabase JWT verification and accepts browser requests only from:

`https://flipgazine.pages.dev`

The endpoint validates event/page/session shape, sanitizes source/referrer fields, classifies browser/OS server-side, rate-limits per session, and stores only the whitelisted fields above.

---

## 4. Tracked events

### Book — `/answers.html`

- `page_view` — tracked controller mounted.
- `book_submit` — visitor submitted a non-empty Book question. Only question length is recorded.
- `book_reveal` — a server-selected answer was successfully revealed. Only CARE/non-CARE boolean is recorded.

### Voice — `/voice.html`

- `page_view` — tracked controller mounted.
- `benchmark_view` — the public benchmark section reached at least 25% viewport intersection.
- `benchmark_evaluate` — visitor pressed Evaluate with both fields populated. Only input lengths are recorded.
- `benchmark_result` — evaluator returned a valid result. Only CARE-mode boolean is recorded.

The resulting engagement ladder is therefore:

```text
page loaded
→ meaningful section reached
→ action attempted
→ action completed
```

This is intentionally stronger than treating a mail-preview fetch as a human visit.

---

## 5. Source tags

Future outreach / follow-up links may carry a campaign-origin tag:

```text
?src=openai
?src=kbtg
?src=typhoon
?src=sea
```

Examples:

```text
https://flipgazine.pages.dev/answers.html?src=kbtg
https://flipgazine.pages.dev/voice.html?src=kbtg
https://flipgazine.pages.dev/voice.html?src=kbtg#voice-benchmark
```

The source code persists only for the current browser tab/session so navigation from Book to Voice can remain associated with the same outreach origin.

**Interpretation rule:** `src=kbtg` means the visitor arrived through a link originating from the KBTG outreach thread. It does **not** prove that the visitor is Dr. Monchai, a KBTG employee, or even the original recipient; links can be forwarded.

---

## 6. Historical 19 August candidate visit

Before this tracking layer was activated, Supabase request logs showed a Windows / Chrome browser loading both `/answers.html` and `/voice.html` shortly after first-wave outreach.

At that point:

- KBTG had no observed bounce;
- both SCB 10X addresses had bounced;
- the Sea corporate address had bounced;
- OpenAI had been submitted through its official form.

That timing makes KBTG one plausible explanation, but the visit cannot be retrospectively attributed to Dr. Monchai or any organization. Preserve it only as an **unconfirmed candidate visit**.

Do not upgrade that inference to a claimed buyer identity.

---

## 7. Data Room link policy

The current live first-contact drafts may use source-tagged versions of the same three public URLs for future sends or follow-ups. The preserved pre-tracking backup remains untagged.

Tracking parameters do not unlock private content and do not change the public Book / Voice / Benchmark behavior.

---

## 8. Operational interpretation

Signal strength, weakest to strongest:

```text
page_view only
< Book + Voice page views in one session
< benchmark_view
< book_submit / benchmark_evaluate
< book_reveal / benchmark_result
< repeated engagement in a later session
< substantive email reply asking for methodology, samples, evaluation or a call
```

Do not treat one page load as buyer intent. A completed Book or Benchmark action is materially stronger evidence that a human engaged with the project.
