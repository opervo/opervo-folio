# Opervo — Tech Stack & Infrastructure Reference

> **CRITICAL FOR ALL FUTURE SESSIONS:** Read this before making any changes to avoid deploying to the wrong platform.

---

## Overview

Opervo has **two completely separate sites** on **two different platforms**. They are not the same codebase, not the same repo, and not the same host.

| Site | URL | Platform | Repo | Framework |
|------|-----|----------|------|-----------|
| Landing + Legal | `opervo.io` | **Vercel** | `opervo/opervo-folio` | Next.js (App Router) |
| Web App (PWA) | `app.opervo.io` | **Netlify** | `opervo/opervo-work-flow` | Vite + React (SPA) |

---

## Site 1 — opervo.io (Landing Page + Legal Pages)

- **Platform:** Vercel
- **Framework:** Next.js 14 App Router
- **Repo:** github.com/opervo/opervo-folio (public)
- **Auto-deploy:** Push to main → Vercel deploys automatically in ~30 seconds
- **Pages live here:** / (landing), /privacy, /tos, /p/[slug] (operator folios)
- **How to add new pages:** Create app/[route]/page.tsx in opervo-folio repo and push to main
- **Do NOT use:** Netlify, static HTML files, _redirects, or Lovable for this site

---

## Site 2 — app.opervo.io (The Web App / PWA)

- **Platform:** Netlify (site ID: splendid-moxie-3f9a51)
- **Framework:** Vite + React (SPA)
- **Repo:** github.com/opervo/opervo-work-flow (private)
- **Built with:** Lovable.dev (project ID: 1321fdcc-acf5-4d61-811d-3dafe2f86092)
- **All app changes go through Lovable prompts — do not edit code directly**
- **Do NOT:** Try to serve HTML pages here via _redirects, edit app logic in GitHub directly

---

## Backend

- **Supabase:** cbbvfxjkdotudgzwfmzv.supabase.co — database, auth, edge functions, storage
- **Stripe:** Payments — Solo $24.99/mo, Team $54.99/mo — webhook at supabase edge function
- **Resend:** welcome@opervo.io — triggered by send-welcome-email edge function on signup
- **Google Calendar OAuth:** Job scheduling sync

---

## Common Mistakes to Avoid

1. Do NOT push Privacy/ToS/legal pages to Netlify or Lovable — they belong on opervo-folio (Vercel)
2. Do NOT edit app logic directly in GitHub — use Lovable prompts for opervo-work-flow
3. Do NOT confuse the two sites — opervo.io != app.opervo.io, different repos, different platforms
4. SVG icons used as PWA icons must not reference external URLs — Safari blocks them and breaks the app

*Last verified: March 18, 2026*