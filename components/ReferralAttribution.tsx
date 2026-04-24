"use client";

/**
 * Global referral attribution.
 *
 * Mounted in the root layout so it runs on every page (not just the landing
 * index.html, which also has its own banner + attribution logic that
 * short-circuits when this has already run).
 *
 * Job:
 *   1. Read ?ref= from the current URL. If missing, fall back to sessionStorage
 *      (set on first referral landing this session).
 *   2. If we have a code, stash it (or refresh the stash) in sessionStorage.
 *   3. Rewrite every href pointing at app.opervo.io so the code rides through
 *      to signup. Same rewrite runs on every route, so Features → Sign Up
 *      or Pricing → Sign Up still carries attribution.
 *
 * Does NOT render a banner — that lives only on the landing page index.html.
 */

import { useEffect } from "react";

export default function ReferralAttribution() {
  useEffect(() => {
    let code = "";
    try {
      const params = new URLSearchParams(window.location.search);
      code = (params.get("ref") || "").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 16);
    } catch {
      /* ignore */
    }

    if (!code) {
      try {
        code = (sessionStorage.getItem("opervo-ref") || "")
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "")
          .slice(0, 16);
      } catch {
        /* ignore */
      }
    }

    if (!code) return;

    try {
      sessionStorage.setItem("opervo-ref", code);
    } catch {
      /* ignore */
    }

    const rewrite = () => {
      const links = document.querySelectorAll<HTMLAnchorElement>('a[href*="app.opervo.io"]');
      links.forEach((a) => {
        const href = a.getAttribute("href");
        if (!href || href.indexOf("ref=") !== -1) return;
        a.setAttribute("href", href + (href.indexOf("?") === -1 ? "?" : "&") + "ref=" + code);
      });
    };

    // Run once now, and again after any client-side navigation re-renders new links.
    rewrite();
    const interval = window.setInterval(rewrite, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return null;
}
