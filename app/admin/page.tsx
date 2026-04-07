"use client";

import { useState, useEffect, useCallback } from "react";

const PASS = "opervo2026";

interface StripeData {
  mrr: number;
  activeCount: number;
  trialCount: number;
  soloCount: number;
  teamCount: number;
  recentCharges: { id: string; amount: number; email: string; created: number }[];
}

interface SupabaseUser {
  id: string;
  email: string;
  created_at: string;
  first_name?: string;
  business_name?: string;
  slug?: string;
  plan?: string;
}

interface ResendEmail {
  id: string;
  to: string[];
  subject: string;
  created_at: string;
  last_event: string;
}

function fmt$(n: number) {
  return "$" + (n / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function timeAgo(ts: number | string) {
  const d = typeof ts === "number" ? ts * 1000 : new Date(ts).getTime();
  const diff = (Date.now() - d) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return Math.floor(diff / 60) + "m ago";
  if (diff < 86400) return Math.floor(diff / 3600) + "h ago";
  return Math.floor(diff / 86400) + "d ago";
}
function initials(name?: string, email?: string) {
  if (name) return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  if (email) return email.slice(0, 2).toUpperCase();
  return "??";
}

function Badge({ type, label }: { type: "green" | "amber" | "red" | "blue" | "gray"; label: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    green: { bg: "#d1fae5", color: "#065f46" },
    amber: { bg: "#fef3c7", color: "#92400e" },
    red:   { bg: "#fee2e2", color: "#991b1b" },
    blue:  { bg: "#dbeafe", color: "#1e3a8a" },
    gray:  { bg: "#f3f4f6", color: "#374151" },
  };
  const { bg, color } = map[type];
  return (
    <span style={{ background: bg, color, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 6, whiteSpace: "nowrap" as const }}>
      {label}
    </span>
  );
}

function StatCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div style={{ background: accent ? "#F5620F" : "#fff", border: "1px solid #E8E4DE", borderRadius: 12, padding: "16px 18px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" as const, color: accent ? "rgba(255,255,255,0.75)" : "#6B6B6B", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: accent ? "#fff" : "#0F0F0F", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: accent ? "rgba(255,255,255,0.65)" : "#6B6B6B", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #E8E4DE", borderRadius: 12, padding: "18px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" as const, color: "#F5620F", marginBottom: 14 }}>{title}</div>
      {children}
    </div>
  );
}

function Row({ left, right, sub }: { left: string; right: React.ReactNode; sub?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #F3F0EB" }}>
      <div>
        <div style={{ fontSize: 13, color: "#1a1a1a" }}>{left}</div>
        {sub && <div style={{ fontSize: 11, color: "#6B6B6B" }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

function QLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", border: "1px solid #E8E4DE", borderRadius: 8, fontSize: 13, color: "#1a1a1a", textDecoration: "none", background: "#F7F5F2" }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#F5620F", flexShrink: 0 }} />
      {label}
    </a>
  );
}

function TodoItem({ text, priority }: { text: string; priority: "high" | "med" | "low" }) {
  const [done, setDone] = useState(false);
  const colors = { high: "#fee2e2", med: "#fef3c7", low: "#f3f4f6" };
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: "1px solid #F3F0EB", cursor: "pointer" }} onClick={() => setDone(!done)}>
      <div style={{ width: 18, height: 18, borderRadius: 5, border: done ? "none" : "1.5px solid #E8E4DE", background: done ? "#F5620F" : "#fff", flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {done && <span style={{ color: "#fff", fontSize: 11 }}>✓</span>}
      </div>
      <span style={{ fontSize: 13, color: done ? "#9CA3AF" : "#1a1a1a", textDecoration: done ? "line-through" : "none", flex: 1 }}>{text}</span>
      {!done && <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: colors[priority], color: "#374151", flexShrink: 0 }}>{priority}</span>}
    </div>
  );
}

const TABS = ["Overview", "Revenue", "Users", "Inbox", "Marketing", "Tasks", "Links"];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [tab, setTab] = useState("Overview");
  const [stripe, setStripe] = useState<StripeData | null>(null);
  const [users, setUsers] = useState<SupabaseUser[]>([]);
  const [emails, setEmails] = useState<ResendEmail[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [aiQ, setAiQ] = useState("");
  const [aiA, setAiA] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [stripeRes, usersRes, emailsRes] = await Promise.allSettled([
        fetch("/api/admin/stripe"),
        fetch("/api/admin/users"),
        fetch("/api/admin/emails"),
      ]);
      if (stripeRes.status === "fulfilled" && stripeRes.value.ok) setStripe(await stripeRes.value.json());
      if (usersRes.status === "fulfilled" && usersRes.value.ok) setUsers(await usersRes.value.json());
      if (emailsRes.status === "fulfilled" && emailsRes.value.ok) setEmails(await emailsRes.value.json());
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (authed) fetchAll(); }, [authed, fetchAll]);

  const askAI = async () => {
    if (!aiQ.trim()) return;
    setAiLoading(true);
    setAiA("");
    const context = `Opervo SaaS data — MRR: ${stripe ? fmt$(stripe.mrr) : "unknown"}, Active subscribers: ${stripe?.activeCount ?? "?"}, Trials: ${stripe?.trialCount ?? "?"}, Total users in DB: ${users.length}, Solo plan: $24.99/mo, Team plan: $54.99/mo. Recent users: ${users.slice(0, 5).map(u => u.email).join(", ")}.`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 400,
          system: `You are a concise business intelligence assistant for Opervo, a field service management SaaS for solo home service operators. Answer the founder's questions using the data provided. Be direct, specific, and practical. No fluff. Data: ${context}`,
          messages: [{ role: "user", content: aiQ }],
        }),
      });
      const data = await res.json();
      setAiA(data.content?.[0]?.text ?? "No response.");
    } catch {
      setAiA("Error reaching AI. Check console.");
    } finally {
      setAiLoading(false);
    }
  };

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#0F0F0F", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: "40px 48px", width: 360, textAlign: "center" }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 32, fontWeight: 900, color: "#0F0F0F", letterSpacing: -1, marginBottom: 4 }}>
            Opervo<span style={{ color: "#F5620F" }}>.</span>
          </div>
          <div style={{ fontSize: 13, color: "#6B6B6B", marginBottom: 28 }}>Command Center</div>
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === "Enter" && pw === PASS && setAuthed(true)}
            style={{ width: "100%", padding: "10px 14px", border: "1px solid #E8E4DE", borderRadius: 8, fontSize: 14, color: "#1a1a1a", marginBottom: 12, outline: "none", boxSizing: "border-box" as const }}
          />
          <button onClick={() => pw === PASS && setAuthed(true)} style={{ width: "100%", padding: 11, background: "#F5620F", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Enter
          </button>
          {pw && pw !== PASS && <div style={{ fontSize: 12, color: "#991b1b", marginTop: 10 }}>Incorrect password</div>}
        </div>
      </div>
    );
  }

  const mrr = stripe?.mrr ?? 0;

  return (
    <div style={{ minHeight: "100vh", background: "#F7F5F2" }}>
      {/* Topbar */}
      <div style={{ background: "#0F0F0F", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 900, color: "#F7F5F2", letterSpacing: -0.5 }}>
          Opervo<span style={{ color: "#F5620F" }}>.</span>{" "}
          <span style={{ fontSize: 14, fontWeight: 400, color: "#6B6B6B" }}>Command Center</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {lastRefresh && <span style={{ fontSize: 12, color: "#6B6B6B" }}>Updated {lastRefresh.toLocaleTimeString()}</span>}
          <button onClick={fetchAll} disabled={loading} style={{ padding: "6px 14px", background: "transparent", border: "1px solid #333", borderRadius: 7, color: "#F7F5F2", fontSize: 12, cursor: "pointer" }}>
            {loading ? "Refreshing…" : "↻ Refresh"}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px" }}>
        {/* Tab bar */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" as const, marginBottom: 24 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", border: "1px solid", borderColor: tab === t ? "#F5620F" : "#E8E4DE", background: tab === t ? "#F5620F" : "#fff", color: tab === t ? "#fff" : "#6B6B6B" }}>
              {t}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {tab === "Overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 12, marginBottom: 20 }}>
              <StatCard label="MRR" value={fmt$(mrr)} sub={`ARR: $${((mrr * 12) / 100).toFixed(0)}`} accent />
              <StatCard label="Active users" value={String(stripe?.activeCount ?? "—")} sub="paid subscribers" />
              <StatCard label="Trial users" value={String(stripe?.trialCount ?? "—")} sub="30-day window" />
              <StatCard label="Churn" value="0" sub="no cancellations" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <Section title="Recent signups">
                {users.slice(0, 6).map(u => (
                  <Row key={u.id} left={u.business_name || u.email} sub={timeAgo(u.created_at)} right={<Badge type="blue" label={u.plan || "Trial"} />} />
                ))}
                {users.length === 0 && <div style={{ fontSize: 13, color: "#6B6B6B" }}>Loading…</div>}
              </Section>
              <Section title="System health">
                <Row left="Supabase DB" right={<Badge type="green" label="Healthy" />} />
                <Row left="Stripe" right={<Badge type="green" label="Live mode" />} />
                <Row left="Resend email" right={<Badge type="green" label="Delivering" />} />
                <Row left="Google OAuth" right={<Badge type="amber" label="Pending verify" />} />
                <Row left="Netlify (app)" right={<Badge type="green" label="Auto-deploy on" />} />
                <Row left="Vercel (folio)" right={<Badge type="green" label="Auto-deploy on" />} />
              </Section>
            </div>
            <Section title="Ask the command center">
              <div style={{ display: "flex", gap: 8, marginBottom: aiA ? 12 : 0 }}>
                <input value={aiQ} onChange={e => setAiQ(e.target.value)} onKeyDown={e => e.key === "Enter" && askAI()} placeholder="e.g. which trials expire this week? What's ARR if all trials convert?" style={{ flex: 1, padding: "9px 14px", border: "1px solid #E8E4DE", borderRadius: 8, fontSize: 13, color: "#1a1a1a", background: "#F7F5F2", outline: "none" }} />
                <button onClick={askAI} disabled={aiLoading} style={{ padding: "9px 18px", background: "#F5620F", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  {aiLoading ? "…" : "Ask"}
                </button>
              </div>
              {aiA && <div style={{ background: "#F7F5F2", border: "1px solid #E8E4DE", borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#1a1a1a", lineHeight: 1.6 }}>{aiA}</div>}
            </Section>
          </div>
        )}

        {/* REVENUE */}
        {tab === "Revenue" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 12, marginBottom: 20 }}>
              <StatCard label="MRR" value={fmt$(mrr)} accent />
              <StatCard label="ARR projected" value={`$${((mrr * 12) / 100).toFixed(0)}`} />
              <StatCard label="Solo subscribers" value={String(stripe?.soloCount ?? "—")} sub="$24.99/mo" />
              <StatCard label="Team subscribers" value={String(stripe?.teamCount ?? "—")} sub="$54.99/mo" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Section title="Recent charges">
                {(stripe?.recentCharges ?? []).slice(0, 8).map(c => (
                  <Row key={c.id} left={c.email} sub={timeAgo(c.created)} right={<span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{fmt$(c.amount)}</span>} />
                ))}
                {!stripe && <div style={{ fontSize: 13, color: "#6B6B6B" }}>Loading…</div>}
              </Section>
              <Section title="Plan breakdown">
                <Row left="Solo · $24.99/mo" right={<span style={{ fontSize: 13, fontWeight: 600 }}>{stripe?.soloCount ?? "—"} users</span>} />
                <Row left="Team · $54.99/mo" right={<span style={{ fontSize: 13, fontWeight: 600 }}>{stripe?.teamCount ?? "—"} users</span>} />
                <Row left="Active trials" right={<Badge type="amber" label={`${stripe?.trialCount ?? "—"} users`} />} />
                <Row left="FOUNDING promo" right={<Badge type="blue" label="3 mo free" />} />
                <div style={{ marginTop: 16, padding: "12px 14px", background: "#F7F5F2", borderRadius: 8 }}>
                  <div style={{ fontSize: 11, color: "#6B6B6B", marginBottom: 4, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1 }}>If all trials convert</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#F5620F" }}>
                    {fmt$(mrr + (stripe?.trialCount ?? 0) * 2499)}/mo
                  </div>
                </div>
              </Section>
            </div>
          </div>
        )}

        {/* USERS */}
        {tab === "Users" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 12, marginBottom: 20 }}>
              <StatCard label="Total users" value={String(users.length)} accent />
              <StatCard label="With business name" value={String(users.filter(u => u.business_name).length)} />
              <StatCard label="With folio slug" value={String(users.filter(u => u.slug).length)} />
            </div>
            <Section title="All users">
              <div style={{ overflowX: "auto" as const }}>
                <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 13 }}>
                  <thead>
                    <tr>
                      {["User", "Business", "Folio", "Joined", "Plan"].map(h => (
                        <th key={h} style={{ textAlign: "left" as const, padding: "6px 10px", fontSize: 11, fontWeight: 700, color: "#6B6B6B", textTransform: "uppercase" as const, letterSpacing: 1, borderBottom: "1px solid #E8E4DE" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} style={{ borderBottom: "1px solid #F3F0EB" }}>
                        <td style={{ padding: "8px 10px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#F5620F", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                              {initials(u.first_name, u.email)}
                            </div>
                            <div>
                              <div style={{ color: "#1a1a1a", fontWeight: 500 }}>{u.first_name || "—"}</div>
                              <div style={{ color: "#6B6B6B", fontSize: 11 }}>{u.email}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "8px 10px", color: "#1a1a1a" }}>{u.business_name || <span style={{ color: "#9CA3AF" }}>—</span>}</td>
                        <td style={{ padding: "8px 10px" }}>
                          {u.slug ? <a href={`https://opervo.io/p/${u.slug}`} target="_blank" rel="noopener noreferrer" style={{ color: "#F5620F", fontSize: 12 }}>/p/{u.slug}</a> : <span style={{ color: "#9CA3AF" }}>—</span>}
                        </td>
                        <td style={{ padding: "8px 10px", color: "#6B6B6B" }}>{timeAgo(u.created_at)}</td>
                        <td style={{ padding: "8px 10px" }}><Badge type="blue" label={u.plan || "Trial"} /></td>
                      </tr>
                    ))}
                    {users.length === 0 && <tr><td colSpan={5} style={{ padding: 20, textAlign: "center" as const, color: "#6B6B6B" }}>Loading…</td></tr>}
                  </tbody>
                </table>
              </div>
            </Section>
          </div>
        )}

        {/* INBOX */}
        {tab === "Inbox" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Section title="Resend — recent emails">
              {emails.slice(0, 12).map(e => (
                <div key={e.id} style={{ padding: "8px 0", borderBottom: "1px solid #F3F0EB" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                    <span style={{ fontSize: 13, color: "#1a1a1a", fontWeight: 500 }}>{e.to?.[0] || "—"}</span>
                    <span style={{ fontSize: 11, color: "#6B6B6B" }}>{timeAgo(e.created_at)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#6B6B6B" }}>{e.subject}</span>
                    <Badge type={e.last_event === "delivered" ? "green" : e.last_event === "bounced" ? "red" : "gray"} label={e.last_event || "sent"} />
                  </div>
                </div>
              ))}
              {emails.length === 0 && <div style={{ fontSize: 13, color: "#6B6B6B" }}>Loading…</div>}
            </Section>
            <Section title="Support priorities">
              <Row left="Google Calendar connection" sub="OAuth pending Google verify" right={<Badge type="amber" label="Known issue" />} />
              <Row left="Invoice email delivery" sub="Monitor via Resend logs" right={<Badge type="blue" label="Watch" />} />
              <Row left="Recurring jobs" sub="Feature request — V2 candidate" right={<Badge type="gray" label="Backlog" />} />
              <div style={{ marginTop: 14 }}>
                <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#F5620F", fontWeight: 600, textDecoration: "none" }}>
                  Open help@opervo.io →
                </a>
              </div>
            </Section>
          </div>
        )}

        {/* MARKETING */}
        {tab === "Marketing" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 12, marginBottom: 20 }}>
              <StatCard label="Videos scripted" value="21" sub="Ready to film" accent />
              <StatCard label="TikTok live" value="0" sub="Filming pending" />
              <StatCard label="Instagram ad" value="Ready" sub="1080×1080 approved" />
              <StatCard label="SEO pages" value="22" sub="8 Tier 1 targets" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Section title="Content pipeline">
                {([
                  { name: "TikTok — first 5 videos", status: "Filming", pct: 30, badge: "amber" },
                  { name: "Instagram ad campaign", status: "Ready to launch", pct: 85, badge: "green" },
                  { name: "SEO landing pages (Tier 1)", status: "In progress", pct: 10, badge: "amber" },
                  { name: "Affiliate / ambassador program", status: "Planned", pct: 5, badge: "gray" },
                  { name: "Beehiiv email list", status: "Not wired yet", pct: 20, badge: "red" },
                ] as { name: string; status: string; pct: number; badge: "green" | "amber" | "red" | "blue" | "gray" }[]).map(item => (
                  <div key={item.name} style={{ padding: "9px 0", borderBottom: "1px solid #F3F0EB" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, color: "#1a1a1a" }}>{item.name}</span>
                      <Badge type={item.badge} label={item.status} />
                    </div>
                    <div style={{ height: 4, background: "#EDE9E3", borderRadius: 2 }}>
                      <div style={{ width: `${item.pct}%`, height: 4, background: "#F5620F", borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </Section>
              <Section title="Competitor pulse">
                <Row left="QuoteIQ" sub="AI Autopilot shipped Feb 2026 · $29.99 floor" right={<Badge type="red" label="Watch closely" />} />
                <Row left="Jobber" sub="AI add-on $99/mo · drifting upmarket" right={<Badge type="gray" label="Less threat" />} />
                <Row left="Housecall Pro" sub="No route optimization · bloated" right={<Badge type="gray" label="Drifting" />} />
                <Row left="ServiceWizard" sub="$14.99 · credibility issues" right={<Badge type="gray" label="Low threat" />} />
                <div style={{ marginTop: 14, padding: "12px 14px", background: "#F7F5F2", borderRadius: 8, fontSize: 12, color: "#6B6B6B" }}>
                  Opervo moat: D2D canvassing + folio page — no competitor has this at any price.
                </div>
              </Section>
            </div>
          </div>
        )}

        {/* TASKS */}
        {tab === "Tasks" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Section title="This week">
              <TodoItem text="Follow up Google OAuth verification email" priority="high" />
              <TodoItem text="Test invoice Resend email end to end" priority="high" />
              <TodoItem text="Investigate invoice email bug (Dustin)" priority="high" />
              <TodoItem text="Film first 3 TikTok videos" priority="med" />
              <TodoItem text="Wire Beehiiv waitlist to landing page" priority="med" />
              <TodoItem text="Upload orange PWA icons (#F5620F)" priority="med" />
              <TodoItem text="Delete test data from Supabase" priority="low" />
              <TodoItem text="Regenerate GitHub token (30-day)" priority="low" />
            </Section>
            <Section title="V2 pipeline">
              <TodoItem text="D2D canvassing map — begin Lovable build" priority="high" />
              <TodoItem text="Onboarding wow flow — folio reveal screen" priority="high" />
              <TodoItem text="AI invoice/job creation (Claude API)" priority="med" />
              <TodoItem text="Gelato print-on-demand integration spec" priority="med" />
              <TodoItem text="SEO Tier 1 landing pages (8 pages)" priority="med" />
              <TodoItem text="Affiliate program structure + launch" priority="low" />
              <TodoItem text="Annual plan pricing lever" priority="low" />
              <TodoItem text="Recurring jobs feature" priority="low" />
            </Section>
          </div>
        )}

        {/* LINKS */}
        {tab === "Links" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 16 }}>
            <Section title="App & infrastructure">
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
                <QLink href="https://app.opervo.io" label="app.opervo.io (PWA)" />
                <QLink href="https://opervo.io" label="opervo.io (landing)" />
                <QLink href="https://lovable.dev/projects/1321fdcc-acf5-4d61-811d-3dafe2f86092" label="Lovable project" />
                <QLink href="https://supabase.com/dashboard/project/sbnykmxckfwkkxvhrkot" label="Supabase dashboard" />
                <QLink href="https://app.netlify.com/sites/splendid-moxie-3f9a51" label="Netlify dashboard" />
                <QLink href="https://vercel.com" label="Vercel dashboard" />
                <QLink href="https://github.com/opervo/opervo-folio" label="opervo-folio repo" />
                <QLink href="https://github.com/opervo/opervo-work-flow" label="opervo-work-flow repo" />
              </div>
            </Section>
            <Section title="Revenue & email">
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
                <QLink href="https://dashboard.stripe.com" label="Stripe dashboard" />
                <QLink href="https://resend.com/emails" label="Resend email logs" />
                <QLink href="https://mail.google.com" label="help@opervo.io inbox" />
                <QLink href="https://resend.com/domains" label="Resend domain health" />
              </div>
            </Section>
            <Section title="Marketing & content">
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
                <QLink href="https://www.tiktok.com/@opervo" label="TikTok @opervo" />
                <QLink href="https://console.cloud.google.com/auth/verification?project=project-89b6e33d-9488-47e6-843" label="Google OAuth verify" />
                <QLink href="https://youtu.be/cQRXUKIUeAs" label="OAuth demo video" />
                <QLink href="https://opervo.io/p/opervo-test-company" label="Test folio page" />
                <QLink href="https://beehiiv.com" label="Beehiiv" />
                <QLink href="https://github.com/settings/tokens" label="GitHub tokens (regenerate)" />
              </div>
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}
