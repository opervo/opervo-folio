"use client";

import { useState, useEffect, useCallback } from "react";
import AdminShell from "../_components/AdminShell";
import PageHeader from "../_components/PageHeader";
import StatStrip from "../_components/StatStrip";
import Badge from "../_components/Badge";
import { T } from "../_lib/tokens";
import { fmt$, timeAgo, initials } from "../_lib/formatters";
import type { StripeData, SupabaseUser } from "../_lib/types";

type Filter = "all" | "active" | "trialing" | "canceled";

export default function SubscribersPage() {
  const [stripe, setStripe] = useState<StripeData | null>(null);
  const [users, setUsers] = useState<SupabaseUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [stripeRes, usersRes] = await Promise.allSettled([
        fetch("/api/admin/stripe"),
        fetch("/api/admin/users"),
      ]);
      if (stripeRes.status === "fulfilled" && stripeRes.value.ok) setStripe(await stripeRes.value.json());
      if (usersRes.status === "fulfilled" && usersRes.value.ok) setUsers(await usersRes.value.json());
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = filter === "all" ? users : users.filter(u => {
    if (filter === "active") return u.plan === "active";
    if (filter === "trialing") return u.plan === "trialing" || !u.plan;
    if (filter === "canceled") return u.plan === "canceled";
    return true;
  });

  const FILTERS: { key: Filter; label: string }[] = [
    { key: "all", label: `All (${users.length})` },
    { key: "active", label: `Active (${users.filter(u => u.plan === "active").length})` },
    { key: "trialing", label: `Trialing (${users.filter(u => u.plan === "trialing" || !u.plan).length})` },
    { key: "canceled", label: `Canceled (${users.filter(u => u.plan === "canceled").length})` },
  ];

  const avatarColors = [T.primary, T.blue, T.amber, T.green, "#8b5cf6"];

  return (
    <AdminShell>
      <PageHeader
        eyebrow="Business"
        title="Subscribers"
        lastRefresh={lastRefresh}
        loading={loading}
        onRefresh={fetchData}
      />

      <StatStrip stats={[
        { label: "Total Subscribers", value: stripe ? stripe.activeCount + stripe.trialCount : "—" },
        { label: "Active Paid", value: stripe?.activeCount ?? "—", pill: { label: `${stripe?.soloCount ?? 0} solo · ${stripe?.teamCount ?? 0} team`, type: "green" } },
        { label: "On Trial", value: stripe?.trialCount ?? "—" },
        { label: "Churned (30d)", value: stripe?.churnedLast30 ?? "—", valueColor: (stripe?.churnedLast30 || 0) > 0 ? T.red : undefined },
      ]} />

      {/* Filter chips */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              padding: "7px 16px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: T.fontBody,
              border: `1px solid ${filter === f.key ? T.primary : T.border}`,
              background: filter === f.key ? T.primary : T.surface,
              color: filter === f.key ? "white" : T.ink,
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Subscriber table */}
      <div style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 12,
        overflow: "hidden",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2.5fr 1fr 1fr 1fr 1fr",
          padding: "12px 20px",
          background: T.bg,
          borderBottom: `1px solid ${T.border}`,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: T.muted,
        }}>
          <div>Subscriber</div>
          <div>Plan</div>
          <div>Status</div>
          <div>Folio</div>
          <div>Joined</div>
        </div>
        {filtered.map(u => (
          <div key={u.id} style={{
            display: "grid",
            gridTemplateColumns: "2.5fr 1fr 1fr 1fr 1fr",
            padding: "14px 20px",
            borderBottom: `1px solid ${T.border}`,
            alignItems: "center",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: T.fontHeading,
                fontWeight: 900,
                fontSize: 13,
                color: "white",
                background: avatarColors[u.email.charCodeAt(0) % avatarColors.length],
                flexShrink: 0,
              }}>
                {initials(u.first_name || u.business_name, u.email)}
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: T.ink }}>
                  {u.business_name || u.first_name || u.email.split("@")[0]}
                </div>
                <div style={{ fontSize: 11, color: T.muted }}>{u.email}</div>
              </div>
            </div>
            <div><Badge type={u.plan === "active" ? "team" : "solo"} label={u.plan === "active" ? "Paid" : u.plan || "Trial"} /></div>
            <div><Badge type={u.plan === "active" ? "green" : u.plan === "trialing" ? "amber" : u.plan === "canceled" ? "red" : "gray"} label={u.plan || "trialing"} /></div>
            <div>
              {u.slug ? (
                <a href={`https://www.opervo.io/p/${u.slug}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: T.primary, textDecoration: "none" }}>
                  /p/{u.slug}
                </a>
              ) : (
                <span style={{ fontSize: 12, color: T.muted }}>—</span>
              )}
            </div>
            <div style={{ fontSize: 12, color: T.muted }}>{timeAgo(u.created_at)}</div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: T.muted, fontSize: 14 }}>
            No subscribers matching this filter
          </div>
        )}
      </div>
    </AdminShell>
  );
}
