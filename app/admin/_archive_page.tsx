"use client";

import { useState, useEffect, useCallback } from "react";

/* ────── Types ────── */
interface StripeData {
  mrr: number;
  activeCount: number;
  trialCount: number;
  soloCount: number;
  teamCount: number;
  churnedLast30: number;
  recentCharges: { id: string; amount: number; email: string; created: number }[];
}
interface SupabaseUser {
  id: string; email: string; created_at: string; trial_start_date?: string;
  first_name?: string; business_name?: string; slug?: string; plan?: string;
}
interface ResendEmail {
  id: string; to: string[]; subject: string; created_at: string; last_event: string;
}
interface PostHogData {
  configured: boolean; events24h?: number; uniqueUsers24h?: number;
  topEvents7d?: { event: string; count: number }[];
}
interface SentryData {
  configured: boolean; totalErrors24h?: number; uniqueIssues24h?: number;
  affectedUsers24h?: number;
  topIssues?: { id: string; title: string; count: number; userCount: number; level: string; permalink: string }[];
}
interface HealthProbe {
  service: string; status: "healthy" | "degraded" | "down" | "unknown";
  detail?: string; latencyMs?: number;
}
interface HealthData { probes: HealthProbe[]; checkedAt: string }
interface ActivationData {
  signedUp: number; onboarded: number; createdClient: number;
  createdJob: number; sentInvoice: number; gotPaid: number;
}
interface AdminTask {
  id: string; text: string; priority: "high" | "med" | "low";
  category: "week" | "v2" | "marketing" | "other"; done: boolean; created_at: string;
}

/* ────── Helpers ────── */
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

/* ────── Design tokens ────── */
const C = {
  bg: "#0A0A0A",
  surface: "rgba(255,255,255,0.04)",
  surfaceHover: "rgba(255,255,255,0.07)",
  border: "rgba(255,255,255,0.08)",
  borderLight: "rgba(255,255,255,0.04)",
  text: "#F7F5F2",
  textSub: "rgba(247,245,242,0.5)",
  textMuted: "rgba(247,245,242,0.3)",
  accent: "#F5620F",
  accentDim: "rgba(245,98,15,0.15)",
  green: "#22c55e",
  amber: "#f59e0b",
  red: "#ef4444",
  blue: "#3b82f6",
};

/* ────── UI primitives (dark mode) ────── */
function Badge({ type, label }: { type: "green" | "amber" | "red" | "blue" | "gray" | "accent"; label: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    green: { bg: "rgba(34,197,94,0.15)", color: "#4ade80" },
    amber: { bg: "rgba(245,158,11,0.15)", color: "#fbbf24" },
    red: { bg: "rgba(239,68,68,0.15)", color: "#f87171" },
    blue: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa" },
    gray: { bg: "rgba(255,255,255,0.06)", color: C.textSub },
    accent: { bg: C.accentDim, color: "#F5620F" },
  };
  const { bg, color } = map[type] || map.gray;
  return (
    <span style={{ background: bg, color, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6, whiteSpace: "nowrap" as const, letterSpacing: "0.03em" }}>
      {label}
    </span>
  );
}

function StatCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div style={{
      background: accent ? "linear-gradient(135deg, #F5620F 0%, #d94e08 100%)" : C.surface,
      border: `1px solid ${accent ? "transparent" : C.border}`,
      borderRadius: 14, padding: "20px 22px",
    }}>
      <div style={{
        fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 700,
        letterSpacing: "0.14em", textTransform: "uppercase" as const,
        color: accent ? "rgba(255,255,255,0.7)" : C.textSub, marginBottom: 8,
      }}>{label}</div>
      <div style={{
        fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 900,
        color: accent ? "#fff" : C.text, lineHeight: 1, letterSpacing: "-0.5px",
      }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: accent ? "rgba(255,255,255,0.6)" : C.textSub, marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: C.surface, border: `1px solid ${C.border}`,
      borderRadius: 14, padding: "20px 22px",
    }}>
      <div style={{
        fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 700,
        letterSpacing: "0.14em", textTransform: "uppercase" as const,
        color: C.accent, marginBottom: 16,
      }}>{title}</div>
      {children}
    </div>
  );
}

function Row({ left, right, sub }: { left: string; right: React.ReactNode; sub?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${C.borderLight}` }}>
      <div>
        <div style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{left}</div>
        {sub && <div style={{ fontSize: 11, color: C.textSub }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

function QLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "8px 14px", border: `1px solid ${C.border}`, borderRadius: 10,
      fontSize: 13, color: C.text, textDecoration: "none", background: C.surface,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, flexShrink: 0 }} />
      {label}
    </a>
  );
}

function TaskRow({ task, onToggle, onDelete }: { task: AdminTask; onToggle: (id: string, done: boolean) => void; onDelete: (id: string) => void }) {
  const colors = { high: "rgba(239,68,68,0.15)", med: "rgba(245,158,11,0.15)", low: "rgba(255,255,255,0.06)" };
  const textColors = { high: "#f87171", med: "#fbbf24", low: C.textSub };
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 0", borderBottom: `1px solid ${C.borderLight}` }}>
      <div onClick={() => onToggle(task.id, !task.done)} style={{
        width: 18, height: 18, borderRadius: 5,
        border: task.done ? "none" : `1.5px solid ${C.border}`,
        background: task.done ? C.accent : "transparent",
        flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
      }}>
        {task.done && <span style={{ color: "#fff", fontSize: 11 }}>✓</span>}
      </div>
      <span onClick={() => onToggle(task.id, !task.done)} style={{
        fontSize: 13, color: task.done ? C.textMuted : C.text,
        textDecoration: task.done ? "line-through" : "none", flex: 1, cursor: "pointer",
      }}>{task.text}</span>
      {!task.done && <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 5, background: colors[task.priority], color: textColors[task.priority], fontWeight: 600 }}>{task.priority}</span>}
      {hover && (
        <button onClick={() => onDelete(task.id)} style={{ background: "transparent", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 14, padding: "0 4px" }} title="Delete">×</button>
      )}
    </div>
  );
}

function EmailRow({ email }: { email: ResendEmail }) {
  const [hover, setHover] = useState(false);
  return (
    <a href={`https://resend.com/emails/${email.id}`} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "block", padding: "9px 10px", margin: "0 -10px",
        borderBottom: `1px solid ${C.borderLight}`, textDecoration: "none", color: "inherit",
        background: hover ? C.surfaceHover : "transparent", transition: "background 0.12s ease", borderRadius: 6,
      }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{email.to?.[0] || "—"}</span>
        <span style={{ fontSize: 11, color: C.textMuted }}>{timeAgo(email.created_at)}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: C.textSub }}>{email.subject}</span>
        <Badge type={email.last_event === "delivered" ? "green" : email.last_event === "bounced" ? "red" : "gray"} label={email.last_event || "sent"} />
      </div>
    </a>
  );
}

/* ────── Responsive styles injected once ────── */
const RESPONSIVE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600;700&display=swap');
@media (max-width: 768px) {
  .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
  .grid-3 { grid-template-columns: 1fr !important; }
  .grid-2 { grid-template-columns: 1fr !important; }
  .tab-bar { overflow-x: auto; flex-wrap: nowrap !important; -webkit-overflow-scrolling: touch; }
  .tab-bar::-webkit-scrollbar { display: none; }
}
`;

/* ────── Main ────── */
const TABS = ["Overview", "Revenue", "Users", "Support", "Emails", "Marketing", "Tasks", "Links"];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [tab, setTab] = useState("Overview");
  const [stripe, setStripe] = useState<StripeData | null>(null);
  const [users, setUsers] = useState<SupabaseUser[]>([]);
  const [emails, setEmails] = useState<ResendEmail[]>([]);
  const [posthog, setPosthog] = useState<PostHogData | null>(null);
  const [sentry, setSentry] = useState<SentryData | null>(null);
  const [health, setHealth] = useState<HealthData | null>(null);
  const [tasks, setTasks] = useState<AdminTask[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"high" | "med" | "low">("med");
  const [newTaskCategory, setNewTaskCategory] = useState<"week" | "v2" | "marketing">("week");
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [activation, setActivation] = useState<ActivationData | null>(null);
  const [support, setSupport] = useState<{ configured: boolean; emails: { id: string; from: string; subject: string; snippet: string; date: string; unread: boolean; gmailUrl: string }[]; unreadCount: number } | null>(null);
  const [aiQ, setAiQ] = useState("");
  const [aiA, setAiA] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [stripeRes, usersRes, emailsRes, posthogRes, sentryRes, healthRes, tasksRes, activationRes, supportRes] = await Promise.allSettled([
        fetch("/api/admin/stripe"),
        fetch("/api/admin/users"),
        fetch("/api/admin/emails"),
        fetch("/api/admin/posthog"),
        fetch("/api/admin/sentry"),
        fetch("/api/admin/health"),
        fetch("/api/admin/tasks"),
        fetch("/api/admin/activation"),
        fetch("/api/admin/support"),
      ]);
      if (stripeRes.status === "fulfilled" && stripeRes.value.ok) setStripe(await stripeRes.value.json());
      if (usersRes.status === "fulfilled" && usersRes.value.ok) setUsers(await usersRes.value.json());
      if (emailsRes.status === "fulfilled" && emailsRes.value.ok) setEmails(await emailsRes.value.json());
      if (posthogRes.status === "fulfilled" && posthogRes.value.ok) setPosthog(await posthogRes.value.json());
      if (sentryRes.status === "fulfilled" && sentryRes.value.ok) setSentry(await sentryRes.value.json());
      if (healthRes.status === "fulfilled" && healthRes.value.ok) setHealth(await healthRes.value.json());
      if (tasksRes.status === "fulfilled" && tasksRes.value.ok) {
        const data = await tasksRes.value.json();
        setTasks(data.tasks ?? []);
      }
      if (activationRes.status === "fulfilled" && activationRes.value.ok) setActivation(await activationRes.value.json());
      if (supportRes.status === "fulfilled" && supportRes.value.ok) setSupport(await supportRes.value.json());
      setLastRefresh(new Date());
    } finally { setLoading(false); }
  }, []);

  const toggleTask = async (id: string, done: boolean) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done } : t)));
    await fetch("/api/admin/tasks", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, done }) });
  };
  const deleteTask = async (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    await fetch(`/api/admin/tasks?id=${id}`, { method: "DELETE" });
  };
  const addTask = async () => {
    if (!newTaskText.trim()) return;
    const res = await fetch("/api/admin/tasks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: newTaskText.trim(), priority: newTaskPriority, category: newTaskCategory }) });
    if (res.ok) { const { task } = await res.json(); setTasks((prev) => [...prev, task]); setNewTaskText(""); }
  };

  useEffect(() => { if (authed) fetchAll(); }, [authed, fetchAll]);

  const submitLogin = async () => {
    if (!pw.trim() || authLoading) return;
    setAuthLoading(true); setPwError(false);
    try {
      const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
      if (res.ok) { setAuthed(true); setPw(""); } else { setPwError(true); }
    } catch { setPwError(true); } finally { setAuthLoading(false); }
  };

  const askAI = async () => {
    if (!aiQ.trim()) return;
    setAiLoading(true); setAiA("");
    const context = `MRR: ${stripe ? fmt$(stripe.mrr) : "unknown"}, Active subscribers: ${stripe?.activeCount ?? "?"}, Trials: ${stripe?.trialCount ?? "?"}, Solo: ${stripe?.soloCount ?? "?"}, Team: ${stripe?.teamCount ?? "?"}, Total users in DB: ${users.length}. Recent users: ${users.slice(0, 5).map(u => u.email).join(", ")}.`;
    try {
      const res = await fetch("/api/admin/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: aiQ, context }) });
      const data = await res.json();
      setAiA(data.answer ?? data.error ?? "No response.");
    } catch { setAiA("Error reaching AI."); } finally { setAiLoading(false); }
  };

  /* ── Login ── */
  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: "48px 44px", width: 380, textAlign: "center" }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 900, color: C.text, letterSpacing: -1, marginBottom: 2 }}>
            Opervo<span style={{ color: C.accent }}>.</span>
          </div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: C.textMuted, marginBottom: 36 }}>Corporate</div>
          <input
            type="password" placeholder="Password" value={pw}
            onChange={e => { setPw(e.target.value); setPwError(false); }}
            onKeyDown={e => e.key === "Enter" && submitLogin()}
            style={{ width: "100%", padding: "12px 16px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, color: C.text, background: "rgba(255,255,255,0.03)", marginBottom: 14, outline: "none", boxSizing: "border-box" as const }}
          />
          <button onClick={submitLogin} disabled={authLoading} style={{
            width: "100%", padding: 13, background: C.accent, color: "#fff", border: "none", borderRadius: 10,
            fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" as const,
            cursor: authLoading ? "wait" : "pointer", opacity: authLoading ? 0.7 : 1,
          }}>
            {authLoading ? "Checking..." : "Enter"}
          </button>
          {pwError && <div style={{ fontSize: 12, color: C.red, marginTop: 12 }}>Incorrect password</div>}
        </div>
      </div>
    );
  }

  const mrr = stripe?.mrr ?? 0;
  const todaySignups = users.filter(u => {
    const d = new Date(u.created_at);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  }).length;
  const weekSignups = users.filter(u => {
    const d = new Date(u.created_at).getTime();
    return Date.now() - d < 7 * 86400000;
  }).length;

  /* ── Dashboard shell ── */
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text }}>
      <style dangerouslySetInnerHTML={{ __html: RESPONSIVE_CSS }} />
      {/* ── Header ── */}
      <div style={{ background: "rgba(255,255,255,0.02)", borderBottom: `1px solid ${C.border}`, padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 900, color: C.text, letterSpacing: -0.5 }}>
            Opervo<span style={{ color: C.accent }}>.</span>
          </span>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: C.textMuted }}>Corporate</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {lastRefresh && <span style={{ fontSize: 11, color: C.textMuted }}>{lastRefresh.toLocaleTimeString()}</span>}
          <button onClick={fetchAll} disabled={loading} style={{
            padding: "6px 16px", background: "transparent", border: `1px solid ${C.border}`,
            borderRadius: 8, color: C.textSub, fontSize: 12, cursor: "pointer", fontWeight: 500,
          }}>
            {loading ? "..." : "↻ Refresh"}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "24px 24px 60px" }}>
        {/* ── Tab bar ── */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" as const, marginBottom: 28 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "8px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
              border: `1px solid ${tab === t ? C.accent : C.border}`,
              background: tab === t ? C.accent : "transparent",
              color: tab === t ? "#fff" : C.textSub,
              fontFamily: "'Barlow', sans-serif",
              display: "inline-flex", alignItems: "center", gap: 6,
            }}>
              {t}
              {t === "Support" && support?.unreadCount != null && support.unreadCount > 0 && (
                <span style={{ background: C.red, color: "#fff", fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 10, minWidth: 16, textAlign: "center" as const }}>{support.unreadCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* ═════════ OVERVIEW ═════════ */}
        {tab === "Overview" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
              <StatCard label="Signups today" value={String(todaySignups)} sub={`${weekSignups} this week`} accent />
              <StatCard label="Active trials" value={String(stripe?.trialCount ?? 0)} sub={`${stripe?.activeCount ?? 0} paid`} />
              <StatCard label="MRR" value={fmt$(mrr)} sub={`ARR ${fmt$(mrr * 12)}`} />
              <StatCard label="Errors 24h" value={String(sentry?.totalErrors24h ?? 0)} sub={`${sentry?.affectedUsers24h ?? 0} users affected`} />
            </div>

            {/* Activation funnel */}
            {activation && (
              <Section title="Activation funnel (30 days)">
                <div style={{ display: "flex", gap: 4, alignItems: "flex-end", padding: "8px 0" }}>
                  {[
                    { label: "Signed up", value: activation.signedUp },
                    { label: "Onboarded", value: activation.onboarded },
                    { label: "Created client", value: activation.createdClient },
                    { label: "Created job", value: activation.createdJob },
                    { label: "Sent invoice", value: activation.sentInvoice },
                    { label: "Got paid", value: activation.gotPaid },
                  ].map((stage, i, arr) => {
                    const maxVal = Math.max(arr[0].value, 1);
                    const pct = Math.max(8, (stage.value / maxVal) * 100);
                    const prev = i > 0 ? arr[i - 1].value : 0;
                    const dropoff = i > 0 && prev > 0 ? Math.round(((prev - stage.value) / prev) * 100) : null;
                    return (
                      <div key={stage.label} style={{ flex: 1, textAlign: "center" as const }}>
                        <div style={{
                          fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 900,
                          color: i === 0 ? C.accent : stage.value > 0 ? C.text : C.textMuted,
                        }}>{stage.value}</div>
                        {dropoff !== null && dropoff > 0 && (
                          <div style={{ fontSize: 10, color: C.red, fontWeight: 600, marginBottom: 4 }}>-{dropoff}%</div>
                        )}
                        <div style={{
                          height: 6, borderRadius: 3, margin: "6px auto",
                          width: `${pct}%`, minWidth: 8,
                          background: i === arr.length - 1 && stage.value > 0
                            ? C.green
                            : stage.value > 0 ? C.accent : C.border,
                          transition: "width 0.5s ease",
                        }} />
                        <div style={{ fontSize: 10, color: C.textSub, fontWeight: 600, letterSpacing: "0.02em" }}>{stage.label}</div>
                      </div>
                    );
                  })}
                </div>
              </Section>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20, marginTop: 14 }}>
              <Section title="Recent signups">
                {users.slice(0, 8).map(u => (
                  <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: `1px solid ${C.borderLight}` }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.accent, flexShrink: 0 }}>
                      {initials(u.first_name || u.business_name, u.email)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.text, whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" }}>{u.business_name || u.first_name || u.email}</div>
                      <div style={{ fontSize: 11, color: C.textMuted }}>{u.email}</div>
                    </div>
                    <div style={{ textAlign: "right" as const, flexShrink: 0 }}>
                      <Badge type={u.plan === "active" ? "green" : u.plan === "trialing" ? "amber" : "gray"} label={u.plan || "trial"} />
                      <div style={{ fontSize: 10, color: C.textMuted, marginTop: 3 }}>{timeAgo(u.created_at)}</div>
                    </div>
                  </div>
                ))}
              </Section>

              <Section title="System health">
                {health?.probes?.map(p => (
                  <div key={p.service} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.borderLight}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.status === "healthy" ? C.green : p.status === "degraded" ? C.amber : C.red }} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{p.service}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {p.latencyMs != null && <span style={{ fontSize: 11, color: C.textMuted }}>{p.latencyMs}ms</span>}
                      <Badge type={p.status === "healthy" ? "green" : p.status === "degraded" ? "amber" : "red"} label={p.status} />
                    </div>
                  </div>
                )) || <div style={{ fontSize: 13, color: C.textMuted }}>Loading...</div>}
              </Section>
            </div>

            {/* PostHog + Sentry sections */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
              {posthog?.configured && posthog.topEvents7d && (
                <Section title="Top events (7d)">
                  {posthog.topEvents7d.map(ev => (
                    <Row key={ev.event} left={ev.event} right={<span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{ev.count.toLocaleString()}</span>} />
                  ))}
                </Section>
              )}
              {sentry?.configured && sentry.topIssues && sentry.topIssues.length > 0 && (
                <Section title="Top errors (24h)">
                  {sentry.topIssues.map(issue => (
                    <a key={issue.id} href={issue.permalink} target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "8px 0", borderBottom: `1px solid ${C.borderLight}`, textDecoration: "none" }}>
                      <div style={{ fontSize: 13, color: C.text, fontWeight: 500, marginBottom: 2 }}>{issue.title.slice(0, 80)}</div>
                      <div style={{ display: "flex", gap: 12, fontSize: 11, color: C.textMuted }}>
                        <span>{issue.count} events</span>
                        <span>{issue.userCount} users</span>
                      </div>
                    </a>
                  ))}
                </Section>
              )}
            </div>

            {/* AI Ask */}
            <Section title="Ask Opervo Corporate">
              <div style={{ display: "flex", gap: 10 }}>
                <input value={aiQ} onChange={e => setAiQ(e.target.value)} onKeyDown={e => e.key === "Enter" && askAI()}
                  placeholder="e.g. How many users signed up this week?"
                  style={{ flex: 1, padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, background: "rgba(255,255,255,0.03)", outline: "none" }}
                />
                <button onClick={askAI} disabled={aiLoading} style={{
                  padding: "10px 20px", background: C.accent, color: "#fff", border: "none", borderRadius: 10,
                  fontSize: 13, fontWeight: 700, cursor: aiLoading ? "wait" : "pointer",
                }}>
                  {aiLoading ? "..." : "Ask"}
                </button>
              </div>
              {aiA && <div style={{ marginTop: 14, padding: 16, background: "rgba(255,255,255,0.02)", borderRadius: 10, border: `1px solid ${C.borderLight}`, fontSize: 13, color: C.text, lineHeight: 1.65, whiteSpace: "pre-wrap" as const }}>{aiA}</div>}
            </Section>
          </>
        )}

        {/* ═════════ REVENUE ═════════ */}
        {tab === "Revenue" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
              <StatCard label="MRR" value={fmt$(mrr)} accent />
              <StatCard label="Projected ARR" value={fmt$(mrr * 12)} />
              <StatCard label="Solo subscribers" value={String(stripe?.soloCount ?? 0)} sub="$24.99/mo" />
              <StatCard label="Team subscribers" value={String(stripe?.teamCount ?? 0)} sub="$54.99/mo" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <Section title="Recent charges">
                {stripe?.recentCharges?.slice(0, 12).map(ch => (
                  <Row key={ch.id} left={ch.email} right={<span style={{ fontSize: 14, fontWeight: 700, color: C.green }}>{fmt$(ch.amount)}</span>} sub={timeAgo(ch.created)} />
                )) || <div style={{ color: C.textMuted, fontSize: 13 }}>No charges yet</div>}
              </Section>
              <Section title="Plan breakdown">
                <Row left="Active paid subscribers" right={<span style={{ fontWeight: 700, color: C.text }}>{stripe?.activeCount ?? 0}</span>} />
                <Row left="Active trials (30-day)" right={<span style={{ fontWeight: 700, color: C.text }}>{stripe?.trialCount ?? 0}</span>} />
                <Row left="Churned (last 30 days)" right={<span style={{ fontWeight: 700, color: stripe?.churnedLast30 ? C.red : C.text }}>{stripe?.churnedLast30 ?? 0}</span>} />
                <Row left="Founding members ($14.99)" right={<Badge type="accent" label="25 slots" />} />
                <div style={{ marginTop: 12, padding: 14, background: C.accentDim, borderRadius: 10 }}>
                  <div style={{ fontSize: 12, color: C.accent, fontWeight: 600 }}>If all {stripe?.trialCount ?? 0} trials convert at Solo:</div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 900, color: C.text, marginTop: 4 }}>
                    {fmt$((stripe?.trialCount ?? 0) * 2499 + mrr)}/mo
                  </div>
                </div>
              </Section>
            </div>

            {/* Trial expiration timeline */}
            <Section title="Trial expiration timeline">
              {(() => {
                const trials = users
                  .filter(u => u.plan === "trialing" && u.trial_start_date)
                  .map(u => {
                    const start = new Date(u.trial_start_date!).getTime();
                    const expiry = start + 30 * 86400000;
                    const daysLeft = Math.max(0, Math.ceil((expiry - Date.now()) / 86400000));
                    return { ...u, expiry, daysLeft };
                  })
                  .sort((a, b) => a.daysLeft - b.daysLeft);

                if (trials.length === 0) return <div style={{ fontSize: 13, color: C.textMuted, padding: 8 }}>No active trials</div>;

                return trials.map(t => (
                  <div key={t.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.borderLight}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: t.daysLeft <= 5 ? "rgba(239,68,68,0.15)" : t.daysLeft <= 14 ? "rgba(245,158,11,0.15)" : "rgba(34,197,94,0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 700,
                        color: t.daysLeft <= 5 ? C.red : t.daysLeft <= 14 ? C.amber : C.green,
                      }}>
                        {initials(t.first_name || t.business_name, t.email)}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{t.business_name || t.first_name || t.email.split("@")[0]}</div>
                        <div style={{ fontSize: 11, color: C.textMuted }}>{t.email}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 60, height: 4, borderRadius: 2, background: C.border, overflow: "hidden",
                      }}>
                        <div style={{
                          height: "100%", borderRadius: 2,
                          width: `${Math.max(3, (t.daysLeft / 30) * 100)}%`,
                          background: t.daysLeft <= 5 ? C.red : t.daysLeft <= 14 ? C.amber : C.green,
                        }} />
                      </div>
                      <Badge
                        type={t.daysLeft <= 5 ? "red" : t.daysLeft <= 14 ? "amber" : "green"}
                        label={t.daysLeft === 0 ? "Expired" : `${t.daysLeft}d left`}
                      />
                    </div>
                  </div>
                ));
              })()}
            </Section>
          </>
        )}

        {/* ═════════ USERS ═════════ */}
        {tab === "Users" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
              <StatCard label="Total users" value={String(users.length)} accent />
              <StatCard label="With business name" value={String(users.filter(u => u.business_name).length)} />
              <StatCard label="With folio slug" value={String(users.filter(u => u.slug).length)} />
            </div>
            <Section title="All users">
              <div style={{ overflowX: "auto" as const }}>
                <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                      {["User", "Business", "Folio", "Joined", "Plan"].map(h => (
                        <th key={h} style={{ textAlign: "left" as const, padding: "8px 10px", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: C.textMuted }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} style={{ borderBottom: `1px solid ${C.borderLight}` }}>
                        <td style={{ padding: "10px 10px", display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 30, height: 30, borderRadius: 8, background: C.accentDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: C.accent, flexShrink: 0 }}>
                            {initials(u.first_name || u.business_name, u.email)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: C.text }}>{u.first_name || u.email.split("@")[0]}</div>
                            <div style={{ fontSize: 11, color: C.textMuted }}>{u.email}</div>
                          </div>
                        </td>
                        <td style={{ padding: "10px", color: u.business_name ? C.text : C.textMuted }}>{u.business_name || "—"}</td>
                        <td style={{ padding: "10px" }}>
                          {u.slug ? <a href={`https://www.opervo.io/p/${u.slug}`} target="_blank" rel="noopener noreferrer" style={{ color: C.accent, textDecoration: "none", fontSize: 12 }}>/p/{u.slug}</a> : <span style={{ color: C.textMuted }}>—</span>}
                        </td>
                        <td style={{ padding: "10px", color: C.textSub }}>{timeAgo(u.created_at)}</td>
                        <td style={{ padding: "10px" }}><Badge type={u.plan === "active" ? "green" : u.plan === "trialing" ? "amber" : "gray"} label={u.plan || "trial"} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          </>
        )}

        {/* ═════════ SUPPORT ═════════ */}
        {tab === "Support" && (
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
            <Section title={`Support inbox${support?.unreadCount ? ` (${support.unreadCount} unread)` : ""}`}>
              {/* Gmail emails from API */}
              {support?.configured && support.emails.length > 0 ? (
                support.emails.map(em => (
                  <a key={em.id} href={em.gmailUrl} target="_blank" rel="noopener noreferrer" style={{
                    display: "block", padding: "12px 0", borderBottom: `1px solid ${C.borderLight}`,
                    textDecoration: "none", color: "inherit",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {em.unread && <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, flexShrink: 0 }} />}
                        <span style={{ fontSize: 13, fontWeight: em.unread ? 700 : 500, color: C.text }}>{em.from}</span>
                      </div>
                      <span style={{ fontSize: 11, color: C.textMuted, flexShrink: 0 }}>{timeAgo(em.date)}</span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: em.unread ? 600 : 400, color: em.unread ? C.text : C.textSub, marginBottom: 2, marginLeft: em.unread ? 14 : 0 }}>{em.subject}</div>
                    <div style={{ fontSize: 12, color: C.textMuted, marginLeft: em.unread ? 14 : 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{em.snippet}</div>
                  </a>
                ))
              ) : (
                /* Fallback: always show a working Gmail link */
                <div style={{ textAlign: "center" as const, padding: 30 }}>
                  <div style={{ fontSize: 13, color: C.textSub, marginBottom: 16 }}>
                    {support?.configured === false ? "Gmail API connecting..." : "Open your inbox to view and reply to support emails."}
                  </div>
                  <a href="https://mail.google.com/mail/u/3/#inbox" target="_blank" rel="noopener noreferrer" style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "12px 28px", background: C.accent, color: "#fff", borderRadius: 10,
                    textDecoration: "none", fontWeight: 700, fontSize: 14,
                  }}>Open help@opervo.io</a>
                </div>
              )}
            </Section>
            <div>
              <Section title="Quick actions">
                <div style={{ marginBottom: 8 }}><QLink href="https://mail.google.com/mail/u/3/#inbox" label="Inbox" /></div>
                <div style={{ marginBottom: 8 }}><QLink href="https://mail.google.com/mail/u/3/#sent" label="Sent" /></div>
                <div style={{ marginBottom: 8 }}><QLink href="https://mail.google.com/mail/u/3/#starred" label="Starred" /></div>
              </Section>
              {support?.unreadCount != null && support.unreadCount > 0 && (
                <div style={{ marginTop: 14, padding: 16, background: C.accentDim, borderRadius: 14, textAlign: "center" as const }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 900, color: C.accent }}>{support.unreadCount}</div>
                  <div style={{ fontSize: 11, color: C.textSub, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>Unread</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═════════ EMAILS ═════════ */}
        {tab === "Emails" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Section title="Recent outbound emails (Resend)">
              {emails.slice(0, 15).map(em => <EmailRow key={em.id} email={em} />)}
              {emails.length === 0 && <div style={{ color: C.textMuted, fontSize: 13 }}>No emails found</div>}
            </Section>
            <Section title="Quick actions">
              <QLink href="https://resend.com/emails" label="Resend dashboard" />
              <div style={{ height: 8 }} />
              <QLink href="https://resend.com/domains" label="Domain settings" />
              <div style={{ height: 8 }} />
              <QLink href="https://mail.google.com/mail/u/3/#inbox" label="help@opervo.io inbox" />
            </Section>
          </div>
        )}

        {/* ═════════ MARKETING ═════════ */}
        {tab === "Marketing" && (
          <>
            {/* Add marketing task */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center" }}>
              <input value={newTaskCategory === "marketing" ? newTaskText : ""} onChange={e => { setNewTaskCategory("marketing"); setNewTaskText(e.target.value); }}
                onKeyDown={e => { if (e.key === "Enter") { setNewTaskCategory("marketing"); addTask(); } }}
                placeholder="Add content pipeline item..."
                style={{ flex: 1, padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, background: "rgba(255,255,255,0.03)", outline: "none" }} />
              <select value={newTaskPriority} onChange={e => setNewTaskPriority(e.target.value as "high" | "med" | "low")}
                style={{ padding: "10px 12px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 12, color: C.text, background: C.bg, outline: "none" }}>
                <option value="high">Active</option>
                <option value="med">In progress</option>
                <option value="low">Planned</option>
              </select>
              <button onClick={() => { setNewTaskCategory("marketing"); addTask(); }} style={{ padding: "10px 20px", background: C.accent, color: "#fff", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Add</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Section title="Content pipeline">
                {tasks.filter(t => t.category === "marketing").length === 0 && (
                  <div style={{ fontSize: 13, color: C.textMuted, padding: 8 }}>No pipeline items. Add one above.</div>
                )}
                {tasks.filter(t => t.category === "marketing").map(t => {
                  const statusLabel = t.done ? "Done" : t.priority === "high" ? "Active" : t.priority === "med" ? "In progress" : "Planned";
                  const badgeType = t.done ? "green" as const : t.priority === "high" ? "accent" as const : t.priority === "med" ? "amber" as const : "gray" as const;
                  return (
                    <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${C.borderLight}` }}>
                      <div onClick={() => toggleTask(t.id, !t.done)} style={{
                        width: 18, height: 18, borderRadius: 5,
                        border: t.done ? "none" : `1.5px solid ${C.border}`,
                        background: t.done ? C.green : "transparent",
                        flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                      }}>
                        {t.done && <span style={{ color: "#fff", fontSize: 11 }}>✓</span>}
                      </div>
                      <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: t.done ? C.textMuted : C.text, textDecoration: t.done ? "line-through" : "none" }}>{t.text}</span>
                      <Badge type={badgeType} label={statusLabel} />
                      <button onClick={() => deleteTask(t.id)} style={{ background: "transparent", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 14, padding: "0 4px" }} title="Delete">×</button>
                    </div>
                  );
                })}
              </Section>
              <Section title="Competitor pulse">
                {[
                  { name: "Jobber", note: "Market leader, $50+/mo", threat: "Low" },
                  { name: "Housecall Pro", note: "Similar market, higher price", threat: "Low" },
                  { name: "GorillaDesk", note: "Niche competitor", threat: "Med" },
                  { name: "thecontractor.app", note: "New entrant, website builder", threat: "Watch" },
                ].map(c => (
                  <Row key={c.name} left={c.name} right={<Badge type={c.threat === "Low" ? "green" : c.threat === "Med" ? "amber" : "blue"} label={c.threat} />} sub={c.note} />
                ))}
                <div style={{ marginTop: 12, padding: 12, background: C.accentDim, borderRadius: 8, fontSize: 12, color: C.accent, fontWeight: 500 }}>
                  Moat: operator-built credibility + folio portfolio pages + sub-$25 pricing
                </div>
              </Section>
            </div>
          </>
        )}

        {/* ═════════ TASKS ═════════ */}
        {tab === "Tasks" && (
          <>
            <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center" }}>
              <input value={newTaskText} onChange={e => setNewTaskText(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask()}
                placeholder="New task..." style={{ flex: 1, padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, background: "rgba(255,255,255,0.03)", outline: "none" }} />
              <select value={newTaskCategory} onChange={e => setNewTaskCategory(e.target.value as "week" | "v2")}
                style={{ padding: "10px 12px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 12, color: C.text, background: C.bg, outline: "none" }}>
                <option value="week">This week</option>
                <option value="v2">V2 pipeline</option>
              </select>
              <select value={newTaskPriority} onChange={e => setNewTaskPriority(e.target.value as "high" | "med" | "low")}
                style={{ padding: "10px 12px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 12, color: C.text, background: C.bg, outline: "none" }}>
                <option value="high">High</option>
                <option value="med">Med</option>
                <option value="low">Low</option>
              </select>
              <button onClick={addTask} style={{ padding: "10px 20px", background: C.accent, color: "#fff", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Add</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Section title="This week">
                {tasks.filter(t => t.category === "week").map(t => <TaskRow key={t.id} task={t} onToggle={toggleTask} onDelete={deleteTask} />)}
                {tasks.filter(t => t.category === "week").length === 0 && <div style={{ fontSize: 13, color: C.textMuted }}>No tasks this week</div>}
              </Section>
              <Section title="V2 pipeline">
                {tasks.filter(t => t.category === "v2").map(t => <TaskRow key={t.id} task={t} onToggle={toggleTask} onDelete={deleteTask} />)}
                {tasks.filter(t => t.category === "v2").length === 0 && <div style={{ fontSize: 13, color: C.textMuted }}>No V2 tasks</div>}
              </Section>
            </div>
          </>
        )}

        {/* ═════════ LINKS ═════════ */}
        {tab === "Links" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            <Section title="App & infrastructure">
              {[
                ["https://app.opervo.io", "app.opervo.io"],
                ["https://www.opervo.io", "opervo.io (landing)"],
                ["https://supabase.com/dashboard/project/sbnykmxckfwkkxvhrkot", "Supabase dashboard"],
                ["https://app.netlify.com/sites/splendid-moxie-3f9a51", "Netlify (app deploy)"],
                ["https://vercel.com/opervo", "Vercel (landing deploy)"],
                ["https://github.com/opervo/opervo-work-flow", "GitHub — app repo"],
                ["https://github.com/opervo/opervo-folio", "GitHub — landing repo"],
              ].map(([href, label]) => <div key={href} style={{ marginBottom: 6 }}><QLink href={href} label={label} /></div>)}
            </Section>
            <Section title="Revenue & email">
              {[
                ["https://dashboard.stripe.com", "Stripe dashboard"],
                ["https://resend.com/emails", "Resend emails"],
                ["https://resend.com/domains", "Resend domains"],
                ["https://mail.google.com/mail/u/3/#inbox", "help@opervo.io"],
              ].map(([href, label]) => <div key={href} style={{ marginBottom: 6 }}><QLink href={href} label={label} /></div>)}
            </Section>
            <Section title="Analytics & monitoring">
              {[
                ["https://us.posthog.com/project/372011", "PostHog analytics"],
                ["https://opervo.sentry.io", "Sentry errors"],
                ["https://portal.telnyx.com", "Telnyx SMS"],
                ["https://console.cloud.google.com", "Google Cloud"],
                ["https://search.google.com/search-console", "Search Console"],
              ].map(([href, label]) => <div key={href} style={{ marginBottom: 6 }}><QLink href={href} label={label} /></div>)}
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}
