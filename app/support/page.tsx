import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support — Opervo",
  description:
    "Get help with Opervo. Email help@opervo.io for any question about jobs, invoices, billing, or your account. Real human reply, typically within one business day.",
};

const FAQ: Array<[string, string]> = [
  [
    "How do I contact support?",
    "Email help@opervo.io. A real person reads every message. Typical reply time is under one business day. Include your account email and a screenshot if you can — it makes things faster.",
  ],
  [
    "I forgot my password. What do I do?",
    "On app.opervo.io, tap 'Forgot password' on the sign-in screen. You'll get a reset link at your account email. If the email doesn't arrive within a few minutes, check spam and then email help@opervo.io.",
  ],
  [
    "How do I cancel my subscription?",
    "Sign in at app.opervo.io, go to Settings → Subscription → Manage, and cancel from the Stripe billing portal. Your data stays intact until the end of the paid period; you can resume anytime.",
  ],
  [
    "How do I delete my account and all my data?",
    "Sign in, go to Settings → Account → Delete Account, type DELETE to confirm. This permanently removes your profile, jobs, invoices, estimates, clients, and all associated files. It cannot be undone.",
  ],
  [
    "I got charged but Opervo says my trial is still active.",
    "Subscription state can take up to a minute to sync after checkout. If it's been longer, force-refresh the app. If the issue persists, email help@opervo.io with the Stripe receipt.",
  ],
  [
    "I'm a client trying to pay an invoice — how?",
    "Open the invoice link your contractor sent you. You can pay with card, Apple Pay, Google Pay, or Cash App. No account required. Questions? Reply to the invoice email and your contractor will help.",
  ],
  [
    "Can I use Opervo on multiple devices?",
    "Yes. Sign in on your phone, tablet, and desktop browser. Everything syncs in real time. The app is a Progressive Web App — install it to your home screen for a native feel.",
  ],
  [
    "Do you have a native iOS or Android app?",
    "Native apps are rolling out in 2026. Today, Opervo runs as a Progressive Web App — install it to your home screen from Safari or Chrome for an app-like experience with push notifications.",
  ],
];

export default function SupportPage() {
  return (
    <div style={{ fontFamily: "'Barlow',sans-serif", background: "#F7F5F2", minHeight: "100vh", color: "#1a1a1a" }}>
      <header
        style={{
          background: "#fff",
          borderBottom: "1px solid #E8E4DE",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="https://opervo.io"
          style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontWeight: 900,
            fontSize: 22,
            color: "#0F0F0F",
            textDecoration: "none",
            letterSpacing: "-0.5px",
          }}
        >
          Opervo<span style={{ color: "#F5620F" }}>.</span>
        </a>
        <a href="https://opervo.io" style={{ fontSize: 14, color: "#6B6B6B", textDecoration: "none" }}>
          ← Back to Opervo
        </a>
      </header>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px 24px 80px" }}>
        <h1
          style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontWeight: 900,
            fontSize: 48,
            color: "#0F0F0F",
            marginBottom: 10,
            letterSpacing: "-1.5px",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          Support<span style={{ color: "#F5620F" }}>.</span>
        </h1>
        <p style={{ fontSize: 17, color: "#6B6B6B", marginBottom: 40, lineHeight: 1.5 }}>
          Questions, bugs, feature requests, or billing issues — one place, real human, fast reply.
        </p>

        {/* Contact card */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #E8E4DE",
            borderRadius: 14,
            padding: "28px 28px 24px",
            marginBottom: 48,
            boxShadow: "0 1px 2px rgba(15,15,15,0.04)",
          }}
        >
          <div
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              color: "#F5620F",
              marginBottom: 10,
            }}
          >
            Email us
          </div>
          <a
            href="mailto:help@opervo.io"
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontWeight: 900,
              fontSize: 34,
              color: "#0F0F0F",
              textDecoration: "none",
              letterSpacing: "-1px",
              display: "block",
              marginBottom: 12,
            }}
          >
            help@opervo.io
          </a>
          <p style={{ fontSize: 14, color: "#6B6B6B", lineHeight: 1.6, margin: 0 }}>
            Typical reply: <strong style={{ color: "#1a1a1a" }}>under 1 business day</strong>. Include your account email and
            a screenshot if you can — it makes things faster. We don't use a ticketing system; you'll hear back from a person,
            not a bot.
          </p>
        </div>

        {/* FAQ */}
        <h2
          style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontWeight: 900,
            fontSize: 28,
            color: "#0F0F0F",
            marginBottom: 24,
            letterSpacing: "-0.5px",
            textTransform: "uppercase",
          }}
        >
          Common questions
        </h2>
        <div>
          {FAQ.map(([q, a]) => (
            <div key={q} style={{ padding: "20px 0", borderTop: "1px solid #E8E4DE" }}>
              <h3
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 800,
                  fontSize: 18,
                  color: "#0F0F0F",
                  marginBottom: 8,
                  letterSpacing: "-0.2px",
                }}
              >
                {q}
              </h3>
              <p style={{ fontSize: 15, color: "#2d2d2d", lineHeight: 1.6, margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>

        {/* Legal links */}
        <div style={{ marginTop: 56, paddingTop: 32, borderTop: "1px solid #E8E4DE", display: "flex", gap: 24, flexWrap: "wrap" }}>
          <a href="/privacy" style={{ fontSize: 14, color: "#6B6B6B", textDecoration: "underline" }}>
            Privacy Policy
          </a>
          <a href="/tos" style={{ fontSize: 14, color: "#6B6B6B", textDecoration: "underline" }}>
            Terms of Service
          </a>
          <a href="https://opervo.io" style={{ fontSize: 14, color: "#6B6B6B", textDecoration: "underline" }}>
            Home
          </a>
        </div>

        <p style={{ fontSize: 12, color: "#9a9a9a", marginTop: 40 }}>Opervo · Austin, Texas · help@opervo.io</p>
      </div>
    </div>
  );
}
