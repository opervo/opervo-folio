"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "./_components/AdminShell";
import PageHeader from "./_components/PageHeader";
import StatStrip from "./_components/StatStrip";
import { T } from "./_lib/tokens";
import { fmt$ } from "./_lib/formatters";
import type {
  StripeData,
  SentryData,
  SupportData,
  SupabaseUser,
} from "./_lib/types";

type NavCard = {
  title: string;
  count?: number | string;
  countLabel?: string;
  countColor?: string;
  description: string;
  href: string;
};

export default function OverviewPage() {
  const router = useRouter();
  const [stripe, setStripe] = useState<StripeData | null>(null);
  const [sentry, setSentry] = useState<SentryData | null>(null);
  const [support, setSupport] = useState<SupportData | null>(null);
  const [users, setUsers] = useState<SupabaseUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [stripeRes, sentryRes, supportRes, usersRes] =
        await Promise.allSettled([
          fetch("/api/admin/stripe"),
          fetch("/api/admin/sentry"),
          fetch("/api/admin/support"),
          fetch("/api/admin/users"),
        ]);
      if (stripeRes.status === "fulfilled" && stripeRes.value.ok)
        setStripe(await stripeRes.value.json());
      if (sentryRes.status === "fulfilled" && sentryRes.value.ok)
        setSentry(await sentryRes.value.json());
      if (supportRes.status === "fulfilled" && supportRes.value.ok)
        setSupport(await supportRes.value.json());
      if (usersRes.status === "fulfilled" && usersRes.value.ok)
        setUsers(await usersRes.value.json());
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const stalledCount = users.filter(
    (u) =>
      u.onboarding &&
      u.onboarding.stalledDays >= 3 &&
      (!u.onboarding.hasProfile ||
        !u.onboarding.hasFirstJob ||
        !u.onboarding.hasSentInvoice)
  ).length;

  const badges: Record<string, { count: number; color?: string }> = {};
  if (sentry?.totalErrors24h)
    badges["DevTools"] = { count: sentry.totalErrors24h, color: T.red };
  if (support?.unreadCount)
    badges["Inbox"] = { count: support.unreadCount, color: T.amber };
  if (stalledCount)
    badges["Operators"] = { count: stalledCount, color: T.amber };

  const cards: NavCard[] = [
    {
      title: "Operators",
      count: users.length,
      countLabel: stalledCount > 0 ? `${stalledCount} stalled` : "users",
      countColor: stalledCount > 0 ? T.amber : T.muted,
      description:
        "Activation funnel, cohorts, per-operator profiles. Nudge stalled users.",
      href: "/admin/operators",
    },
    {
      title: "Inbox",
      count: support?.unreadCount ?? 0,
      countLabel: "unread",
      countColor: (support?.unreadCount || 0) > 0 ? T.amber : T.muted,
      description:
        "Full Gmail thread view, inline reply, search, archive.",
      href: "/admin/inbox",
    },
    {
      title: "DevTools",
      count: sentry?.totalErrors24h ?? 0,
      countLabel: "errors 24h",
      countColor: (sentry?.totalErrors24h || 0) > 0 ? T.red : T.muted,
      description:
        "Sentry stacktraces, PostHog analytics, runtime logs, edge functions.",
      href: "/admin/devtools",
    },
    {
      title: "Revenue",
      count: stripe ? fmt$(stripe.mrr) : "...",
      countLabel: "MRR",
      countColor: T.green,
      description:
        "MRR, recent charges, trial timeline, plan breakdown.",
      href: "/admin/revenue",
    },
  ];

  return (
    <AdminShell badges={badges}>
      <PageHeader
        eyebrow="Internal Dashboard"
        title="Opervo Corporate"
        lastRefresh={lastRefresh}
        loading={loading}
        onRefresh={fetchAll}
      />

      <StatStrip
        stats={[
          {
            label: "MRR",
            value: stripe ? fmt$(stripe.mrr) : "...",
            pill: { label: "monthly", type: "green" as const },
          },
          {
            label: "Active Subs",
            value: stripe?.activeCount ?? "...",
            pill: stripe
              ? { label: `${stripe.trialCount} trial`, type: "blue" as const }
              : undefined,
          },
          {
            label: "Errors 24h",
            value: sentry?.totalErrors24h ?? "...",
            valueColor:
              (sentry?.totalErrors24h || 0) > 0 ? T.red : undefined,
          },
          {
            label: "Stalled Users",
            value: stalledCount,
            valueColor: stalledCount > 0 ? T.amber : undefined,
          },
        ]}
      />

      {/* 4 nav cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        {cards.map((c) => (
          <div
            key={c.href}
            onClick={() => router.push(c.href)}
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              padding: "24px 24px 20px",
              cursor: "pointer",
              transition: "box-shadow 0.15s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(0,0,0,0.08)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  fontFamily: T.fontHeading,
                  fontSize: 22,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  color: T.ink,
                }}
              >
                {c.title}
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontFamily: T.fontHeading,
                    fontSize: 28,
                    fontWeight: 900,
                    color: c.countColor || T.ink,
                    lineHeight: 1,
                  }}
                >
                  {c.count}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: T.muted,
                    marginTop: 4,
                  }}
                >
                  {c.countLabel}
                </div>
              </div>
            </div>
            <div
              style={{
                fontSize: 13,
                color: T.muted,
                lineHeight: 1.5,
              }}
            >
              {c.description}
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
