"use client";

import { useState, useEffect, useCallback } from "react";
import AdminShell from "../_components/AdminShell";
import PageHeader from "../_components/PageHeader";
import StatStrip from "../_components/StatStrip";
import OnboardingRow from "../_components/OnboardingRow";
import { showToast } from "../_lib/toast";
import { T } from "../_lib/tokens";
import type { SupabaseUser } from "../_lib/types";

export default function OnboardingPage() {
  const [users, setUsers] = useState<SupabaseUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) setUsers(await res.json());
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Only show users from last 30 days for onboarding tracking
  const thirtyDaysAgo = Date.now() - 30 * 86400000;
  const recentUsers = users.filter(u => new Date(u.created_at).getTime() > thirtyDaysAgo);

  const totalSteps = recentUsers.reduce((sum, u) => {
    const ob = u.onboarding;
    if (!ob) return sum;
    return sum + [ob.hasProfile, ob.hasFirstJob, ob.hasSentInvoice, ob.hasCalendar].filter(Boolean).length;
  }, 0);
  const maxSteps = recentUsers.length * 4;
  const completionRate = maxSteps > 0 ? Math.round((totalSteps / maxSteps) * 100) : 0;

  const stalledUsers = recentUsers.filter(u =>
    u.onboarding && u.onboarding.stalledDays >= 3 && (
      !u.onboarding.hasProfile || !u.onboarding.hasFirstJob ||
      !u.onboarding.hasSentInvoice || !u.onboarding.hasCalendar
    )
  );
  const fullyOnboarded = recentUsers.filter(u =>
    u.onboarding && u.onboarding.hasProfile && u.onboarding.hasFirstJob &&
    u.onboarding.hasSentInvoice && u.onboarding.hasCalendar
  );

  const handleNudge = (userId: string) => {
    const user = users.find(u => u.id === userId);
    showToast(`Nudge queued for ${user?.business_name || user?.email || "user"}`);
  };

  return (
    <AdminShell badges={stalledUsers.length > 0 ? { Onboarding: { count: stalledUsers.length, color: T.blue } } : undefined}>
      <PageHeader
        eyebrow="Command"
        title="Onboarding"
        lastRefresh={lastRefresh}
        loading={loading}
        onRefresh={fetchData}
      />

      <StatStrip stats={[
        { label: "Recent Signups (30d)", value: recentUsers.length },
        { label: "Fully Onboarded", value: fullyOnboarded.length, pill: fullyOnboarded.length > 0 ? { label: "✓", type: "green" } : undefined },
        { label: "Stalled (3+ days)", value: stalledUsers.length, valueColor: stalledUsers.length > 0 ? T.amber : undefined },
        { label: "Completion Rate", value: `${completionRate}%`, pill: { label: `${totalSteps}/${maxSteps} steps`, type: completionRate > 60 ? "green" : "amber" } },
      ]} />

      {stalledUsers.length > 0 && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <button
            onClick={() => {
              stalledUsers.forEach(u => handleNudge(u.id));
              showToast(`Nudge emails queued for ${stalledUsers.length} stalled users`);
            }}
            style={{
              padding: "8px 16px",
              background: T.primary,
              color: "white",
              border: "none",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: T.fontBody,
              boxShadow: `0 4px 12px ${T.primaryGlow}`,
            }}
          >
            Send Nudges ({stalledUsers.length})
          </button>
        </div>
      )}

      <div style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 12,
        overflow: "hidden",
      }}>
        {/* Table header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr repeat(4, 1fr) 1fr 100px",
          gap: 0,
          padding: "12px 20px",
          background: T.bg,
          borderBottom: `1px solid ${T.border}`,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: T.muted,
        }}>
          <div>Operator</div>
          <div>Plan</div>
          <div>Joined</div>
          <div style={{ textAlign: "center" }}>Profile</div>
          <div style={{ textAlign: "center" }}>First Job</div>
          <div style={{ textAlign: "center" }}>Invoice</div>
          <div style={{ textAlign: "center" }}>Calendar</div>
          <div>Progress</div>
          <div style={{ textAlign: "right" }}>Actions</div>
        </div>

        {recentUsers.length > 0 ? (
          recentUsers.map(user => (
            <OnboardingRow key={user.id} user={user} onNudge={handleNudge} />
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "40px 20px", color: T.muted, fontSize: 14 }}>
            No recent signups
          </div>
        )}
      </div>
    </AdminShell>
  );
}
