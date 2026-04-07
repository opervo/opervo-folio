# Opervo Command Center — Handoff

Password-protected founder dashboard at **opervo.io/admin** showing live data from Stripe, Supabase, and Resend, plus a Claude-powered "ask the command center" box.

Built April 2026. Lives in `opervo/opervo-folio` (Next.js 14 App Router on Vercel).

---

## File map

```
app/admin/
  page.tsx              # Client component — login screen + 7-tab dashboard
  HANDOFF.md            # This file

app/api/admin/
  login/route.ts        # POST { password } → sets httpOnly session cookie. DELETE → logs out.
  ask/route.ts          # POST { question, context } → proxies to Claude API
  stripe/route.ts       # GET → MRR (interval-aware), active/trial counts, plan breakdown, churned-30d, recent charges
  users/route.ts        # GET → profiles + emails from Supabase
  emails/route.ts       # GET → recent Resend emails
  posthog/route.ts      # GET → unique users 24h, events 24h, top events 7d (HogQL via PostHog query API)
  sentry/route.ts       # GET → total errors 24h, unique issues, affected users, top 5 issues
  health/route.ts       # GET → live probes against Supabase, Stripe, Resend, Vercel, Netlify
  tasks/route.ts        # GET / POST / PATCH / DELETE → CRUD over admin_tasks table

lib/
  admin-auth.ts         # isAdmin() — shared cookie-check used by all admin API routes

supabase/
  admin_tasks_migration.sql   # Schema + seed for admin_tasks table (already applied to prod)
```

---

## Auth flow

1. User visits `/admin` → sees password screen.
2. POST to `/api/admin/login` with `{ password }`.
3. Server compares against `ADMIN_PASSWORD` env var. If match, sets an httpOnly cookie `opervo_admin_session` whose value is `ADMIN_SESSION_SECRET` (8h expiry, `secure`, `sameSite: strict`).
4. Every other admin API route calls `isAdmin()` from `lib/admin-auth.ts`, which checks the cookie value matches the env secret. Mismatch → 401.
5. Logout: `DELETE /api/admin/login` clears the cookie. (No UI button yet — see Known Issues.)

**Why this design:** The original spec had a client-side `PASS = "opervo2026"` constant, which leaks the password into the JS bundle and leaves the API routes wide open. The current design holds the password and session secret server-side; the client only ever sees a 200 (logged in) or 401 (rejected).

**To rotate the password:** Change `ADMIN_PASSWORD` in Vercel env → redeploy. Active sessions stay valid until the cookie expires (8h). To force-invalidate all sessions, also rotate `ADMIN_SESSION_SECRET`.

---

## Data sources

| Tab / Card | Source | Notes |
|---|---|---|
| Overview → MRR, Active, Trials | Stripe `/v1/subscriptions?status=active` and `?status=trialing` | MRR is now interval-aware via `itemToMonthlyCents()` (handles yearly, weekly, multi-item, multi-quantity). |
| Overview → Churn (30d) | Stripe `/v1/subscriptions?status=canceled` | Counts subs where `canceled_at >= 30 days ago`. |
| Overview → DAU / Errors / Affected | `/api/admin/posthog` + `/api/admin/sentry` | PostHog DAU + 24h events; Sentry 24h error count + unique issues + affected users. Both gracefully no-op if env vars missing. |
| Overview → Total signups | Supabase `auth.users` count | Same data as Users tab. |
| Overview → Recent signups | Supabase `profiles` table | Latest 6 by `created_at` desc. |
| Overview → System health | `/api/admin/health` | Real probes against Supabase REST, Stripe `/v1/balance`, Resend `/domains`, opervo.io, app.opervo.io. Returns latency. 5s timeout per probe. |
| Overview → Top events (7d) | PostHog HogQL query | Top 5 non-system events. Hidden if PostHog not configured. |
| Overview → Top errors (24h) | Sentry issues sort=freq | Top 5 unresolved issues with deep links. Hidden if Sentry not configured. |
| Overview → Ask box | `/api/admin/ask` → Claude Sonnet 4.5 | Server proxy with `ANTHROPIC_API_KEY`. Context is a hand-built summary string. |
| Revenue → MRR / ARR / plan counts | Same Stripe call as Overview | Solo/Team identified by matching `STRIPE_SOLO_PRICE_ID` / `STRIPE_TEAM_PRICE_ID`. |
| Revenue → Recent charges | Stripe `/v1/charges?limit=20` | **Platform charges only** — Connect charges on connected accounts not included. |
| Users tab | `profiles` JOIN `auth.users` | Profiles via `from("profiles")`, emails via `auth.admin.listUsers()`. Limit 200 each. |
| Inbox → Recent emails | Resend `/emails?limit=40` | Each row links to `https://resend.com/emails/{id}` in a new tab. |
| Inbox → Support priorities | Hardcoded | Static. |
| Marketing tab | All hardcoded | Videos, content pipeline, competitor pulse, all literals in `page.tsx`. |
| Tasks tab | Supabase `admin_tasks` table | Full CRUD via `/api/admin/tasks`. Add form with priority + category. Click checkbox to toggle, hover row to see delete (×). |
| Links tab | Hardcoded `<QLink>` components | Update `page.tsx` to add/remove links. |

---

## Required Vercel env vars

| Variable | Used by | Required? |
|---|---|---|
| `ADMIN_PASSWORD` | login route | Yes |
| `ADMIN_SESSION_SECRET` | login route + isAdmin() | Yes (random ≥32 chars, e.g. `openssl rand -hex 32`) |
| `ANTHROPIC_API_KEY` | ask route | Optional (only AI box fails without it) |
| `STRIPE_SECRET_KEY` | stripe route | Yes |
| `STRIPE_SOLO_PRICE_ID` | stripe route | Yes (otherwise plan split is wrong) |
| `STRIPE_TEAM_PRICE_ID` | stripe route | Yes |
| `RESEND_API_KEY` | emails route + health probe | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | users route + tasks route | Yes (anon key won't work — need to read auth.users + bypass RLS on admin_tasks) |
| `NEXT_PUBLIC_SUPABASE_URL` | users route + tasks route + health probe | Yes (already set for the rest of the site) |
| `POSTHOG_PROJECT_ID` | posthog route | Optional (card hides if not set) — find at posthog.com → Project Settings (Project ID = `372011`) |
| `POSTHOG_PERSONAL_API_KEY` | posthog route | Optional — personal API key from posthog.com → Personal API Keys (starts with `phx_`) |
| `POSTHOG_HOST` | posthog route | Optional — defaults to `https://us.posthog.com` |
| `SENTRY_AUTH_TOKEN` | sentry route | Optional — sentry.io → Settings → Auth Tokens (needs `project:read` + `event:read`) |
| `SENTRY_ORG` | sentry route | Optional — defaults to `opervo` |
| `SENTRY_PROJECT` | sentry route | Optional — defaults to `javascript-react` |

`STRIPE_SECRET_KEY`, `RESEND_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_URL` already existed in the project for other routes — they're shared.

After changing any env var: **Vercel → Deployments → ⋯ on latest → Redeploy** (uncheck "Use existing Build Cache"). Env var changes don't apply to already-built deployments.

---

## How the page is structured

`app/admin/page.tsx` is one big client component. State:

```ts
authed         // boolean — gates the whole UI
pw, pwError, authLoading   // login form
tab            // current tab name
stripe, users, emails      // fetched data
loading, lastRefresh       // global refresh state
aiQ, aiA, aiLoading        // ask box
```

`fetchAll()` runs on mount-after-login and on the topbar refresh button. It hits all 3 data routes in parallel via `Promise.allSettled` so a slow Stripe call doesn't block users/emails.

Helper components defined in the same file (no external imports needed):
- `StatCard` — colored stat tile (orange when `accent`)
- `Section` — white card with orange uppercase title
- `Row` — left/right row inside a Section
- `Badge` — colored pill (green/amber/red/blue/gray)
- `QLink` — quick link button used in Links tab
- `TodoItem` — checkbox row in Tasks tab (in-memory state)
- `EmailRow` — clickable email row in Inbox tab (hover state)

Brand tokens are inlined as hex literals throughout — no Tailwind, no CSS modules. If you change brand colors, grep for `#F5620F` etc.

---

## Adding a new card

1. Decide which tab. Find the matching `{tab === "X" && (...)}` block in `page.tsx`.
2. Drop in a `<Section title="...">` with `<Row>` or `<StatCard>` children.
3. If you need new data, add a route under `app/api/admin/<thing>/route.ts` that calls `isAdmin()` first, fetch it from `fetchAll()`, store in a new state hook.

## Adding a new tab

1. Add the tab name to the `TABS` array (top of file, after helper components).
2. Add a new `{tab === "Newname" && (...)}` block at the bottom of the JSX, mirroring existing tabs.

---

## Known issues / TODO

| # | Issue | Severity | Status |
|---|---|---|---|
| 1 | AI box context is a hand-built summary string — can't answer questions about trial expiry dates, individual users, etc. | medium | open |
| 2 | Recent charges = platform charges only. Stripe Connect charges on connected accounts are invisible. | medium | open |
| 3 | ~~"Churn: 0" is hardcoded. Should query `subscriptions?status=canceled`.~~ | low | **FIXED Apr 7** — now shows churned-last-30d count |
| 4 | Marketing tab is 100% literals. | low | open |
| 5 | ~~Tasks tab state is `useState` — resets on reload.~~ | medium | **FIXED Apr 7** — now persisted to `admin_tasks` Supabase table with full CRUD |
| 6 | No logout button in the UI. Cookie auto-expires in 8h. | low | open |
| 7 | ~~MRR math sums first sub-item only — ignores quantity, multi-item subs, yearly plans.~~ | medium | **FIXED Apr 7** — `itemToMonthlyCents()` normalizes any interval/quantity to monthly equivalent |
| 8 | No per-card loading or error UI. If a route 500s the card just stays at "Loading…" forever. | medium | open |
| 9 | `profiles` query assumes columns `first_name, business_name, slug, plan` exist. | low | open |
| 10 | Hard limit of 200 on users query — won't scale past 200 accounts. | low | open |
| 11 | New signup / new charge highlighting — no visual diff between refreshes. | low | open |
| 12 | ~~System health badges are hardcoded — no real health probe.~~ | low | **FIXED Apr 7** — now real probes against Supabase, Stripe, Resend, Vercel, Netlify with latency |
| 13 | PostHog/Sentry routes use HogQL/sort=freq queries that may need indexing for large projects | low | new |
| 14 | Tasks reorder by drag-and-drop not implemented | low | new |

## Security model

- **Password is server-only** (env var, never in JS bundle).
- **Session cookie is httpOnly** — JS on the page can't read it, so XSS can't steal it.
- **Cookie value = `ADMIN_SESSION_SECRET`** — anyone who reads the env var can forge a session, but env vars are server-only on Vercel.
- **All admin API routes call `isAdmin()` first** — no exposed read endpoints.
- **No CSRF token** — `sameSite: strict` on the cookie blocks cross-site POSTs to `/api/admin/login`. Good enough for a single-user dashboard.
- **No rate limiting on `/api/admin/login`** — an attacker could brute-force the password. Mitigate by setting a long random `ADMIN_PASSWORD`.

---

## Deployment

This file is in `opervo/opervo-folio` which auto-deploys to Vercel project `opervo-folio-v2` on every push to `main`. Cycle:

1. Edit files
2. `npx tsc --noEmit` to typecheck
3. `git commit && git push origin main`
4. Vercel builds in ~30-60s
5. Live at https://opervo.io/admin (redirects to www.opervo.io)

To check deploy status: Vercel → opervo-folio-v2 → Deployments. To check runtime errors: Vercel → opervo-folio-v2 → Logs (filter to `/api/admin`).

---

## Quick reference

| | |
|---|---|
| Live URL | https://opervo.io/admin |
| Repo | `opervo/opervo-folio` |
| Vercel project | `opervo-folio-v2` |
| Vercel project ID | `prj_95HHHgVNcIN5b3377pZlwrqrqB1S` |
| Vercel org/team ID | `team_lqDtIwNF4TpPg8jCNvFE64jm` |
| Supabase project | `sbnykmxckfwkkxvhrkot` (unified) |
| Session cookie name | `opervo_admin_session` |
| Session expiry | 8 hours |
| Initial commits | `de6fb27` (page + routes), `7bda99d` (auth hardening), `785afc4` (clickable email rows) |
