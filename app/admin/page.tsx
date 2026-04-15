"use client";

import { useState, useEffect, useCallback } from "react";
import AdminShell from "./_components/AdminShell";
import PageHeader from "./_components/PageHeader";
import StatStrip from "./_components/StatStrip";
import Card from "./_components/Card";
import ErrorCard from "./_components/ErrorCard";
import SupportTicket from "./_components/SupportTicket";
import OnboardingRow from "./_components/OnboardingRow";
import { T } from "./_lib/tokens";
import { fmt$ } from "./_lib/formatters";
import type { StripeData, SentryData, SupportData, SupabaseUser } from "./_lib/types";

export default function OverviewPage() {
  const [stripe, setStripe] = useState<StripeData | null>(null);
  const [sentry, setSentry] = useState<SentryData | null>(null);
  const [support, setSupport] = useState<SupportData | null>(null);
  const [users, setUsers] = useState<SupabaseUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [stripeRes, sentryRes, supportRes, usersRes] = await Promise.allSettled([
        fetch("/api/admin/stripe"),
        fetch("/api/admin/sentry"),
        fetch("/api/admin/support"),
        fetch("/api/admin/users"),
      ]);
      if (stripeRes.status === "fulfilled" && stripeRes.value.ok) setStripe(await stripeRes.value.json());
      if (sentryRes.status === "fulfilled" && sentryRes.value.ok) setSentry(await sentryRes.value.json());
      if (supportRes.status === "fulfilled" && supportRes.value.ok) setSupport(await supportRes.value.json());
      if (usersRes.status === "fulfilled" && usersRes.value.ok) setUsers(await usersRes.value.json());
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const stalledCount = users.filter(u => u.onboarding && u.onboarding.stalledDays >= 3 && (
    !u.onboarding.hasProfile || !u.onboarding.hasFirstJob || !u.onboarding.hasSentInvoice || !u.onboarding.hasCalendar
  )).length;

  const visibleErrors = (sentry?.topIssues || []).filter(i => !dismissed.has(i.id)).slice(0, 5);

  const badges: Record<string, { count: number; color?: string }> = {};
  if (sentry?.totalErrors24h) badges["Errors"] = { count: sentry.totalErrors24h };
  if (support?.unreadCount) badges["Support"] = { count: support.unreadCount, color: T.amber };
  if (stalledCount) badges["Onboarding"] = { count: stalledCount, color: T.blue };

  return (
    <AdminShell badges={badges}>
      <PageHeader
        eyebrow="Internal Dashboard"
        title="Opervo Corporate"
        lastRefresh={lastRefresh}
        loading={loading}
        onRefresh={fetchAll}
      />

      <StatStrip stats={[
        {
          label: "Active Subscribers",
          value: stripe?.activeCount ?? "—",
          pill: stripe ? { label: `${stripe.trialCount} trials`, type: "green" } : undefined,
        },
        {
          label: "Open Errors",
          value: sentry?.totalErrors24h ?? "—",
          valueColor: sentry?.totalErrors24h ? T.red : undefined,
          pill: sentry?.topIssues?.some(i => i.level === "fatal" || i.level === "error")
            ? { label: `${sentry.topIssues.filter(i => i.level === "fatal" || i.level === "error").length} critical`, type: "red" }
            : undefined,
        },
        {
          label: "Support Queue",
          value: support?.unreadCount ?? "—",
          valueColor: (support?.unreadCount || 0) > 0 ? T.amber : undefined,
          pill: support?.unreadCount ? { label: `${support.unreadCount} unread`, type: "amber" } : undefined,
        },
        {
          label: "Onboarding Stalled",
          value: stalledCount,
          pill: stalledCount > 0 ? { label: "Nudge ready", type: "blue" } : undefined,
        },
      ]} />

      {/* Error Feed */}
      <Card
        title="Error Feed"
        count={visibleErrors.length > 0 ? `${visibleErrors.length} open` : undefined}
        countType="red"
        actions={
          <a href="/admin/errors" style={{
            padding: "7px 14px",
            borderRadius: 7,
            fontSize: 12,
            fontWeight: 600,
            border: `1px solid ${T.border}`,
            background: T.surface,
            color: T.ink,
            textDecoration: "none",
            fontFamily: T.fontBody,
          }}>
            View All →
          </a>
        }
      >
        {visibleErrors.length > 0 ? (
          visibleErrors.map(issue => (
            <ErrorCard
              key={issue.id}
              issue={issue}
              onDismiss={(id) => setDismissed(prev => new Set(prev).add(id))}
            />
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "24px 0", color: T.muted, fontSize: 14 }}>
            {sentry?.configured === false ? "Sentry not configured" : "No open errors"}
          </div>
        )}
      </Card>

      <div style={{ height: 1, background: T.border, margin: "36px 0" }} />

      {/* Support Triage */}
      <Card
        title="Support Triage"
        count={support?.unreadCount ? `${support.unreadCount} unread` : undefined}
        countType="amber"
        actions={
          <a href="/admin/support" style={{
            padding: "7px 14px",
            borderRadius: 7,
            fontSize: 12,
            fontWeight: 600,
            border: `1px solid ${T.border}`,
            background: T.surface,
            color: T.ink,
            textDecoration: "none",
            fontFamily: T.fontBody,
          }}>
            View All →
          </a>
        }
      >
        {support?.emails && support.emails.length > 0 ? (
          support.emails.slice(0, 5).map(email => (
            <SupportTicket key={email.id} email={email} />
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "24px 0", color: T.muted, fontSize: 14 }}>
            {support?.configured === false ? "Gmail not configured" : "No support emails"}
          </div>
        )}
      </Card>

      <div style={{ height: 1, background: T.border, margin: "36px 0" }} />

      {/* Onboarding Status */}
      <Card
        title="Onboarding Status"
        count={stalledCount > 0 ? `${stalledCount} stalled` : undefined}
        countType="blue"
        actions={
          <a href="/admin/onboarding" style={{
            padding: "7px 14px",
            borderRadius: 7,
            fontSize: 12,
            fontWeight: 600,
            border: `1px solid ${T.border}`,
            background: T.surface,
            color: T.ink,
            textDecoration: "none",
            fontFamily: T.fontBody,
          }}>
            View All →
          </a>
        }
      >
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
          borderRadius: "8px 8px 0 0",
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
        {users.slice(0, 8).map(user => (
          <OnboardingRow key={user.id} user={user} />
        ))}
      </Card>
    </AdminShell>
  );
}
