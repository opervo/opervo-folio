# Opervo.io — Deep SEO + AI Search Optimization (AEO/GEO) Audit

**Date:** 2026-06-13
**Scope:** www.opervo.io (Next.js 16 App Router landing site, `opervo-folio` repo) — full technical SEO, on-page SEO, structured data, AI-search citability (AEO/GEO), keyword landscape, competitor SEO, content gaps.
**Method:** Local codebase inspection + live-site fetches (curl/WebFetch) + web research. No SEO tool (Ahrefs/Semrush) connected — volume/difficulty figures are estimates; connect one via MCP for exact data.
**Type:** Read-only audit. No code changed.

---

## Executive summary

Opervo.io has an **unusually strong content layer** for a 3-month-old domain — the commercial pages (pricing, `/compare/*`, trade landing pages) are near-best-in-class for answer-engine citation: direct quotable answers, real price tables, honest competitor pros, question-style headings, and original stat-style data points. There is already hard proof the approach works: the window-cleaning blog post **ranks page 1 and is being cited in AI answers** for "best app for a solo window cleaner."

The weaknesses are almost entirely in the **plumbing**, not the prose:

1. **Homepage has no canonical, no `lang` attribute, and serves a generic inherited title** — the single most important page is the least optimized. (Critical)
2. **i18n is an SEO liability as shipped:** `/es` serves English content with no `lang`, no `hreflang`, and a canonical pointing back to the English URL. (High)
3. **No `llms.txt`** — the highest-ROI AEO quick win, and trivial to generate from the existing sitemap. (High)
4. **The 39-post blog is under-marked-up:** no FAQPage, no HowTo, no `dateModified`, no `image` in Article schema — and the blog is the bulk of the corpus and the main GEO surface. (High)
5. **Sitewide em dashes in ~68 titles + 15 descriptions** — a brand-rule violation (Opervo bans em dashes) shipped across the site. (High, brand)
6. **Render-blocking Google Fonts, no `next/font`, no `next/image`** — Core Web Vitals / LCP drag. (High)

Overall assessment: **strong foundation, fixable plumbing.** Closing the structured-data + canonical + `llms.txt` gaps would move the site from "great content, thin markup" to fully optimized for both Google and answer engines. The strategic growth lever is the **"alternative to" / comparison playbook** in the solo-operator + price-sensitive niche the DR-80+ incumbents don't defend.

**Top 3 priorities by impact:**
1. Fix the homepage (canonical + `lang` + real metadata) and the `/es` i18n SEO (lang/hreflang/locale-aware canonicals).
2. Ship `llms.txt` + backfill blog structured data (FAQPage, HowTo, `dateModified`, `image`, BreadcrumbList).
3. Execute the comparison/"alternative" content plan — starting with the missing `opervo-vs-quoteiq` page and a solo-framed "Jobber alternative" post.

---

## Part 1 — Technical SEO

### 1.1 Canonicalization & redirects

| Check | Status | Detail |
|---|---|---|
| Apex → www redirect | ⚠️ Warning | `opervo.io` → `www.opervo.io` is **307 (temporary)**; should be **308 (permanent)** for canonical consolidation. Configured in Vercel dashboard (no `vercel.json` in repo). |
| HTTPS | ✅ Pass | HTTP→HTTPS 308, HSTS via Vercel. |
| Homepage canonical | ❌ **Critical** | `app/[locale]/page.tsx` has **no `metadata` export** and emits **no canonical**. It renders the raw `public/index.html` body but strips its `<head>`. |
| Calculator canonicals | ❌ High | `/cost-calculator`, `/profit-calculator`, `/multi-job-tracker` are client components with no metadata → no canonical, generic inherited title. All three are in the sitemap. |
| Other pages canonical | ✅ Pass | 63 pages set `alternates.canonical` (hardcoded absolute www URLs). |
| Canonical is locale-aware | ❌ High | Canonicals are static strings, so `/es/pricing` emits `canonical → /pricing` (English). |

### 1.2 Internationalization (i18n) — High risk as shipped

- **No `lang` attribute anywhere.** `app/layout.tsx:38` is `<html suppressHydrationWarning>` (no `lang`); `[locale]/layout.tsx` never sets it. Verified live on `/` and `/es`.
- **No `hreflang` anywhere.** No page uses `alternates.languages`; no `<link rel="alternate" hreflang>` and no `x-default`.
- **`/es` serves English content** (only nav/footer/homepage are translated) under a missing `lang`, with a canonical conceding to the English URL. Google will treat `/es/*` as thin/duplicate of English — best case deindexed, worst case a duplicate-content flag.
- Ironic detail: `public/index.html` is `<html lang="en">` and `public/index-es.html` is `<html lang="es">` with a proper Spanish title — but the homepage component drops the `<head>`, so neither survives.

**Decision needed:** either (a) properly localize + add lang/hreflang/x-default and localized canonicals, or (b) if Spanish isn't ready, `noindex` the `/es` routes until they are. Shipping half-localized `/es` to the index is the worst of both.

### 1.3 Sitemap & robots

- `robots.ts`: allows all, disallows `/api/` and `/p/*/edit`, points to `https://www.opervo.io/sitemap.xml`. Correct. AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) are all unblocked — good for AEO.
- **Sitemap missing live indexable pages (High):** `/sites`, `/lifetime`, `/apprentice` exist with full metadata + JSON-LD but are **absent from `app/sitemap.ts`**. Blog coverage is complete (all 38 post dirs listed); no sitemap entry points to a 404.
- **Sitemap `lastModified` bug (Medium):** `pathToFile()` in `app/sitemap.ts:8` resolves to `app${urlPath}/page.tsx`, but pages live under `app/[locale]/...`. The candidate never exists, so every non-home URL falls back to `buildTime` — the git-based freshness signal is dead for all pages.
- **No `/es` alternates in the sitemap** (no `xhtml:link` hreflang annotations) — compounds 1.2.

### 1.4 On-page (titles, descriptions, headings)

- **Meta descriptions over 160 chars on ~17 key pages (Medium).** Trade pages are worst: solar-panel-cleaning **243**, window-cleaning **226**, pressure-washing **219**, auto-detailing **216**. They truncate in SERPs.
- **Title outliers (Medium):** `/sites` title is **76 chars** (truncates); `/support` is **16 chars** ("Support — Opervo", no keyword).
- **Homepage title is the weaker one.** Live serves the root-layout title "Opervo — Run Your Trade Business Like a Pro"; the stronger `public/index.html` title ("Opervo | Stop looking like a side hustle") and its better description are discarded with the stripped head.
- **Em dashes in ~68 titles + 15 descriptions (High, brand violation).** Opervo bans em dashes (`feedback_no_em_dashes.md`); the ` — ` separator is used in nearly every page title. Not an SEO ranking issue, but a shipped brand-consistency violation and easy to fix.
- **H1:** trade pages, blog posts, `/sites`, and all 23 static pages have exactly 1 H1 (good). Live homepage shows **2 H1s** but `public/index.html` source has exactly 1 — likely deploy drift or script injection; **re-check live DOM after next deploy.**

### 1.5 Core Web Vitals / performance

- **Render-blocking Google Fonts (High).** `app/layout.tsx:39-41` injects a synchronous `<link rel="stylesheet">` to `fonts.googleapis.com` (Barlow + Barlow Condensed). Preconnect is present (good) but there's **no `next/font` anywhere**. Migrate to `next/font/google` to self-host, kill the blocking request + gstatic round-trip, and get `font-display: swap` — direct LCP win.
- **No `next/image` anywhere (Medium).** All images are raw `<img>` / CSS backgrounds → no responsive `srcset`, no lazy-load, no modern formats. LCP/CLS risk on image-heavy pages (folio, trade heroes, blog).
- `next.config.ts` has no `images` config, no `headers()` (no cache/security headers), one redirect (`/about → /founder`, 308).

### 1.6 Other technical

| Check | Status | Detail |
|---|---|---|
| Web manifest / PWA | ❌ Medium | No `manifest.json`/`app/manifest.ts`, no favicon/touch icons (`app/icon.*`, `favicon.ico` absent). No declared favicon. |
| Custom 404 | ❌ Medium | No `app/not-found.tsx` — invalid routes render Next's default 404; missed internal-linking/UX. |
| `viewport`/`themeColor` | ⚠️ Low | No `export const viewport`, no theme-color. |
| OG images | ⚠️ Medium | 62 of 63 pages share one generic `/og-image.png`. No per-route `opengraph-image.tsx`. |
| noindex hygiene | ✅ Pass | `robots:{index:false}` correctly on `/preview/*`, `/print/order`, `/print/success`, `/delete-account`, `/apprentice/credits`, admin. No production content noindexed. |
| Server rendering | ✅ Pass | All fetched pages contain full body/headings/prices in initial HTML — AI bots and crawlers see real content. |

---

## Part 2 — AI Search Optimization (AEO / GEO)

Goal: maximize how often ChatGPT/Perplexity/Google AI Overviews/Claude/Gemini **cite and quote** Opervo.

### 2.1 `llms.txt` — MISSING (High, #1 quick win)

No `llms.txt` or `llms-full.txt`. Generate a curated, one-line-annotated map of key URLs (product, pricing, features, each trade, top comparisons, founder, support) from the existing `app/sitemap.ts` array so it never drifts. Serve via `app/llms.txt/route.ts`. Suggested skeleton is in §4.

### 2.2 Structured data for answer engines

Strong on commercial pages, weak on the blog.

| Schema | Coverage | Gap / action |
|---|---|---|
| FAQPage | 7 (pricing, sites, support, 4 compare pages) | **Trade pages render visible Q&A but ship no FAQPage schema** — add it. **Zero blog posts** have FAQPage — add to top commercial posts. (High) |
| HowTo | 2 (`/guide`, `/embed-guide` only) | The 6 `how-to-*` blog posts have only bare Article — add HowTo + HowToStep (copy the `/guide` pattern). (High) |
| Article (blog) | 38 | Missing `dateModified` (0/39) and `image` (0/39). Add both — reuse sitemap git-date logic. (High) |
| SoftwareApplication | 7 | Homepage block lacks `aggregateRating`, `review`, `featureList` despite visible "5-star review" social proof. Add (real numbers only). (Medium) |
| BreadcrumbList | **0** | Add to blog/compare/trade (Home › Blog › Post). (Medium) |
| Product/Offer on /pricing | FAQPage only | Add explicit `Product`/`Offer` with `priceValidUntil` + `availability` to lock prices as citable facts. (High) |
| `/compare/servicewizard` | **No JSON-LD** | The only compare page with none — add SoftwareApplication + Offer + FAQPage to match the others. (Medium) |

### 2.3 Content answerability (live page ratings)

- `/window-cleaning` — **9.5/10.** Best AEO page on the site: direct opener, 6-Q FAQ, comparison table, original cited numbers ("40+ min saved", "70% recurring revenue", "$1,128/yr vs Jobber"). Only gap: FAQ not backed by FAQPage schema.
- `/pricing` — **9/10.** "Every feature, every plan, no per-user fees," real prices, competitor prices inline, clear "we take zero cut" answer.
- `/compare/opervo-vs-jobber` — **9/10.** Self-contained definition, real side-by-side table, honest "when Jobber is better," 7-Q FAQPage.
- `/blog/cheapest-field-service-management-software` — **7/10.** Strong dated lead + ranked competitor list, but no TL;DR, no real `<table>`, no FAQ/FAQPage. Adding those → 9.

### 2.4 Entity & authority (GEO)

- **Founder entity inconsistency (Medium):** homepage schema says "Maximiliano Ballesteros," blog author says "Max Ballesteros," and the live `/founder` page **never states the name in prose**. Reconcile to one canonical name and state it visibly on `/founder`.
- **`sameAs` too thin:** Organization `sameAs` is just `["https://app.opervo.io"]`. Add the Instagram + Facebook already linked on `/founder`, plus LinkedIn/Crunchbase. `sameAs` is a primary entity-disambiguation signal.
- Differentiators are concrete and citable (good): flat $24.99/$54.99, zero payment markup, Folio public page, "built on a truck." Keep leaning into original stat-style numbers.

### 2.5 Top 10 AEO/GEO moves
1. Generate `llms.txt` from the sitemap array.
2. Add FAQPage schema to all 5 trade pages (Q&A already rendered).
3. Add FAQPage + TL;DR + real comparison table to top commercial blog posts.
4. Add `dateModified` + `image` to all 39 blog Article blocks.
5. Add HowTo schema to the 6 how-to posts.
6. Enrich homepage SoftwareApplication (`featureList`, defensible `aggregateRating`).
7. Expand Organization `sameAs` (IG/FB/LinkedIn).
8. Name the founder in `/founder` prose; reconcile name across schema.
9. Add BreadcrumbList to blog/compare/trade.
10. Add Product/Offer with `priceValidUntil` on `/pricing`.

---

## Part 3 — Keyword opportunities

Estimates calibrated to a new, low-authority domain. "AIO" = AI-Overview/ChatGPT-prone.

| # | Keyword | Intent | Difficulty | Demand | Opportunity | Has it? | AIO |
|---|---|---|---|---|---|---|---|
| 1 | jobber alternative for solo operators | commercial | moderate | med | **high** | No | Yes |
| 2 | cheap field service management software | commercial | moderate | high | **high** | Partial | Yes |
| 3 | best app for solo window cleaner | commercial | easy | med | **high** | **Yes (ranking p1)** | Yes |
| 4 | opervo vs quoteiq / quoteiq alternative | commercial | easy | med | **high** | No | Yes |
| 5 | best app for pressure washing business | commercial | moderate | high | **high** | Partial | Yes |
| 6 | gorilladesk alternative for lawn care | commercial | easy | med | **high** | Partial | Yes |
| 7 | housecall pro alternative cheaper | commercial | moderate | high | **high** | Partial | Yes |
| 8 | do I need a CRM as a solo contractor | informational | easy | med | **high** | **Yes** | Yes |
| 9 | gutter cleaning business software/app | commercial | easy | low-med | **high** | No | Yes |
| 10 | roof cleaning business software | commercial | easy | low-med | **high** | No | Yes |
| 11 | flat rate field service software no per user fee | commercial | easy | med | **high** | No | Yes |
| 12 | best field service app under $30/month | commercial | easy | low-med | **high** | No | Yes |
| 13 | best crm for window cleaning business | commercial | easy | med | **high** | Yes | Yes |
| 14 | holiday lighting business software | commercial | easy | low (seasonal) | med | No | Yes |
| 15 | how to price window cleaning jobs | informational | hard | high | med | Partial (calc) | Yes |
| 16 | how to price pressure washing jobs | informational | hard | high | med | Partial (calc) | Yes |
| 17 | servicetitan alternative for small business | commercial | moderate | high | med | No | Yes |
| 18 | service fusion alternative | commercial | easy | low-med | med | No | Yes |
| 19 | window cleaning estimate template free | transactional | hard | med | med | No (generic only) | Partial |
| 20 | lawn care invoice template free | transactional | hard | high | med | No | Partial |
| 21 | how to start a window cleaning business | informational | hard | high | med | No (only solar) | Yes |
| 22 | invoicing app no monthly fee for trades | transactional | moderate | high | med | No | Yes |
| 23 | best software for auto detailing business | commercial | moderate | med | med | Partial | Yes |
| 24 | free invoicing app for contractors | transactional | hard | high | med | Partial | Yes |
| 25 | best field service app for one person | commercial | easy | med | **high** | Partial | Yes |

Rows 1, 4, 6, 9, 10, 11, 12 are the highest-leverage **new** assets — low difficulty, real demand, niche the incumbents ignore. Avoid head terms ("field service management software"), generic "how to price X," and generic templates — walled off by DR-80+ academies; chase those only paired with the calculators.

---

## Part 4 — Competitor SEO snapshot

| Competitor | Authority | Owns | Opervo can win |
|---|---|---|---|
| **Jobber** (getjobber.com + academy) | DR 80+, content machine | "how to price [trade]", per-trade free tools/templates, "[trade] marketing/SEO" | "jobber alternative for solo operators", "jobber too expensive" — exploit per-user pricing |
| **Housecall Pro** | DR 80+ | `/industries/[trade]-software/`, pricing-guide academy, farms its own "best Jobber alternatives" | "housecall pro alternative cheaper", sub-$30 buckets (their base is $79) |
| **GorillaDesk** | Mid | lawn care/pest control verticals | "gorilladesk alternative for lawn care", per-route cost framing |
| **Markate** | Low | narrow footprint, weak comparisons | easiest to out-rank on alternative terms |
| **QuoteIQ** (myquoteiq.com) | Peer challenger | aggressive programmatic compare/alternative pages ($29.99, no per-user fee) | **The template to copy — and Opervo has NO opervo-vs-quoteiq page** |

QuoteIQ is the true peer: same positioning, running the exact long-tail comparison playbook Opervo should own. Copy it and out-execute on honesty + price math.

---

## Part 5 — Content gaps (existing assets accounted for)

| # | Topic / keyword | Why | Format | Priority | Effort |
|---|---|---|---|---|---|
| 1 | opervo-vs-quoteiq | direct peer, actively out-ranking, zero coverage | Compare page | **P0** | Low |
| 2 | "Jobber alternative for solo operators" | highest-intent wedge, exploits per-user pricing | Listicle/explainer | **P0** | Low |
| 3 | Gutter cleaning trade LP + listicle | underserved, easy ranking | Trade LP | P1 | Med |
| 4 | Roof cleaning trade LP + listicle | underserved soft-wash niche | Trade LP | P1 | Med |
| 5 | Holiday lighting trade LP + seasonal | Q3-Q4 spike, low comp, off-season overlap | Trade LP + article | P1 | Med |
| 6 | Per-trade estimate/invoice templates | replicable, converts, feeds product | Template pages (HTML+PDF+CTA) | P1 | Med |
| 7 | "No per-user fee / flat-rate FSM" explainer | attacks incumbent pricing model, AIO bait | Explainer + table | P1 | Low |
| 8 | "Best field service app under $30/month" | explicit budget intent, Opervo wins by definition | Listicle | P1 | Low |
| 9 | "How to start a [trade] business" series (beyond solar) | high demand pillar, links to LPs+calculators | Pillar guides | P2 | High |
| 10 | Glossary / definitions hub | cheap AIO wins, internal-link hub | Glossary | P2 | Med |
| 11 | Seasonal content (slow-season, what trades to add) | recurring traffic, speaks to solos | Blog series | P2 | Med |
| 12 | GorillaDesk/Markate per-route & per-user cost breakdowns | contrast vs Opervo flat pricing | Cost-analysis posts | P2 | Low |

### Conversational AI-search queries to win
"cheapest field service software" · "best app for a solo window cleaner" (already cited) · "Jobber too expensive cheaper alternative" · "do I need a CRM as a solo contractor" · "FSM software with no per-user fee" · "QuoteIQ vs Jobber which is cheapest" · "field service app under $30/month" · "best software for gutter/roof cleaning business" · "is Housecall Pro worth it for a small business" · "what software to start a pressure washing business."

---

## Part 6 — Prioritized action plan

### Quick wins (this week — < 2 hrs each, high impact)
1. **Homepage metadata + canonical + `lang`.** Give `app/[locale]/page.tsx` a real `metadata` export (self-referencing canonical, the stronger "Stop looking like a side hustle" title/description) and set `<html lang>`. (Critical)
2. **Generate `llms.txt`** from the sitemap array (`app/llms.txt/route.ts`). (High AEO)
3. **Add `/sites`, `/lifetime`, `/apprentice` to `app/sitemap.ts`.** (High)
4. **Fix the sitemap `lastModified` path bug** (`app/[locale]${urlPath}/page.tsx`) so git freshness works. (Medium)
5. **Trim ~17 meta descriptions to ≤160 chars** (trade pages first) and shorten the `/sites` title. (Medium)
6. **Strip em dashes from titles/descriptions** sitewide (brand compliance) — period/comma/pipe separators. (High brand)
7. **Add canonical + real titles to the 3 calculators.** (High)
8. **Add FAQPage JSON-LD to the 5 trade pages** (Q&A already on-page). (High AEO)
9. **Expand Organization `sameAs`** (IG/FB) + name the founder on `/founder`. (Medium GEO)
10. **Switch apex→www to 308** in Vercel. (Medium)

### Strategic (this quarter)
1. **Fix `/es` i18n SEO** — lang + hreflang + x-default + locale-aware canonicals, or `noindex` `/es` until fully localized. (High)
2. **Backfill blog structured data** — `dateModified` + `image` on all 39 Articles, HowTo on the 6 how-tos, FAQPage + TL;DR + tables on top commercial posts, BreadcrumbList sitewide. (High AEO)
3. **Migrate to `next/font` + adopt `next/image`** for Core Web Vitals. (High)
4. **Comparison/"alternative" content sprint** — ship `opervo-vs-quoteiq`, "Jobber alternative for solo operators," the flat-rate + under-$30 explainers, and the gorilladesk/service-fusion/servicetitan alternative pages. Structure each for both rankings and AI citation (honest verdict up top, real price-math table, genuine competitor wins, FAQPage). (High)
5. **Underserved-trade LPs** — gutter cleaning, roof cleaning, holiday lighting (replicate the proven `TradeLandingPage` template). (Medium-High)
6. **Per-route OG images + web manifest/favicons + custom 404.** (Medium)
7. **Product/Offer schema on /pricing**, homepage SoftwareApplication enrichment. (Medium AEO)

### Top 5 highest-ROI bets
1. Build `opervo-vs-quoteiq` (P0).
2. Ship solo-framed "Jobber alternative for solo operators" (P0).
3. Launch gutter/roof/holiday-lighting trade LPs (P1).
4. "No per-user fee" + "under $30/month" explainer pair (P1).
5. Replicate the proven window-cleaning "best app for [trade]" format across pressure washing, lawn care, auto detailing (P1).

**Realism caveat:** don't expect to rank for head terms or "how to price X" against DR-80+ academies — win the solo/price-sensitive/alternative long-tail and the AI-citation game, where clear honest content beats domain authority (already proven by the window-cleaning post).
