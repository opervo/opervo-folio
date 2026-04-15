"use client";

import { useState, useEffect, useCallback } from "react";
import AdminShell from "../_components/AdminShell";
import PageHeader from "../_components/PageHeader";
import StatStrip from "../_components/StatStrip";
import Card from "../_components/Card";
import Badge from "../_components/Badge";
import { T } from "../_lib/tokens";
import { fmt$, timeAgo, initials } from "../_lib/formatters";
import type { StripeData, SupabaseUser } from "../_lib/types";

export default function RevenuePage() {
  const [stripe, setStripe] = useState<StripeData | null>(null);
  const [users, setUsers] = useState<SupabaseUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

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

  const mrr = stripe?.mrr ?? 0;

  // Trial expiration data
  const trials = users
    .filter(u => (u.plan === "trialing" || !u.plan) && u.trial_start_date)
    .map(u => {
      const start = new Date(u.trial_start_date!).getTime();
      const expiry = start + 30 * 86400000;
      const daysLeft = Math.max(0, Math.ceil((expiry - Date.now()) / 86400000));
      return { ...u, daysLeft };
    })
    .sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <AdminShell>
      <PageHeader
        eyebrow="Business"
        title="Revenue"
        lastRefresh={lastRefresh}
        loading={loading}
        onRefresh={fetchData}
      />

      <StatStrip stats={[
        { label: "MRR", value: fmt$(mrr), pill: { label: "Monthly", type: "green" } },
        { label: "Projected ARR", value: fmt$(mrr * 12) },
        { label: "Solo ($24.99)", value: stripe?.soloCount ?? "—" },
        { label: "Team ($54.99)", value: stripe?.teamCount ?? "—" },
      ]} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        {/* Recent charges */}
        <Card title="Recent Charges">
          {stripe?.recentCharges?.slice(0, 12).map(ch => (
            <div key={ch.id} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "9px 0",
              borderBottom: `1px solid ${T.border}`,
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: T.ink }}>{ch.email}</div>
                <div style={{ fontSize: 11, color: T.muted }}>{timeAgo(ch.created)}</div>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: T.green }}>{fmt$(ch.amount)}</span>
            </div>
          )) || (
            <div style={{ color: T.muted, fontSize: 13 }}>No charges yet</div>
          )}
        </Card>

        {/* Plan breakdown */}
        <Card title="Plan Breakdown">
          <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${T.border}` }}>
            <span style={{ fontSize: 13, color: T.ink }}>Active paid subscribers</span>
            <span style={{ fontWeight: 700, color: T.ink }}>{stripe?.activeCount ?? 0}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${T.border}` }}>
            <span style={{ fontSize: 13, color: T.ink }}>Active trials (30-day)</span>
            <span style={{ fontWeight: 700, color: T.ink }}>{stripe?.trialCount ?? 0}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${T.border}` }}>
            <span style={{ fontSize: 13, color: T.ink }}>Churned (last 30 days)</span>
            <span style={{ fontWeight: 700, color: (stripe?.churnedLast30 || 0) > 0 ? T.red : T.ink }}>{stripe?.churnedLast30 ?? 0}</span>
          </div>
          {/* Conversion projection */}
          <div style={{
            marginTop: 12,
            padding: 14,
            background: T.primaryLight,
            borderRadius: 10,
          }}>
            <div style={{ fontSize: 12, color: T.primary, fontWeight: 600 }}>
              If all {stripe?.trialCount ?? 0} trials convert at Solo:
            </div>
            <div style={{
              fontFamily: T.fontHeading,
              fontSize: 24,
              fontWeight: 900,
              color: T.ink,
              marginTop: 4,
            }}>
              {fmt$((stripe?.trialCount ?? 0) * 2499 + mrr)}/mo
            </div>
          </div>
        </Card>
      </div>

      {/* Trial expiration timeline */}
      <Card title="Trial Expiration Timeline">
        {trials.length === 0 ? (
          <div style={{ color: T.muted, fontSize: 13, padding: 8 }}>No active trials</div>
        ) : (
          trials.map(t => (
            <div key={t.id} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: `1px solid ${T.border}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: t.daysLeft <= 5 ? "rgba(239,68,68,0.15)" : t.daysLeft <= 14 ? "rgba(245,158,11,0.15)" : "rgba(34,197,94,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: t.daysLeft <= 5 ? T.red : t.daysLeft <= 14 ? T.amber : T.green,
                }}>
                  {initials(t.first_name || t.business_name, t.email)}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>{t.business_name || t.first_name || t.email.split("@")[0]}</div>
                  <div style={{ fontSize: 11, color: T.muted }}>{t.email}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 60, height: 4, borderRadius: 2, background: T.border, overflow: "hidden" }}>
                  <div style={{
                    height: "100%",
                    borderRadius: 2,
                    width: `${Math.max(3, (t.daysLeft / 30) * 100)}%`,
                    background: t.daysLeft <= 5 ? T.red : t.daysLeft <= 14 ? T.amber : T.green,
                  }} />
                </div>
                <Badge
                  type={t.daysLeft <= 5 ? "red" : t.daysLeft <= 14 ? "amber" : "green"}
                  label={t.daysLeft === 0 ? "Expired" : `${t.daysLeft}d left`}
                />
              </div>
            </div>
          ))
        )}
      </Card>
    </AdminShell>
  );
}
