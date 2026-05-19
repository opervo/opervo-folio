"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "../_components/AdminShell";
import PageHeader from "../_components/PageHeader";
import StatStrip from "../_components/StatStrip";
import Card from "../_components/Card";
import { showToast } from "../_lib/toast";
import { T } from "../_lib/tokens";
import { initials, timeAgo, formatDate } from "../_lib/formatters";
import type { SupabaseUser, FunnelData } from "../_lib/types";

type Filter =
  | "all"
  | "trial"
  | "paid"
  | "stalled"
  | "churn_risk"
  | "onboarded";
type Tab = "users" | "funnel" | "cohorts";

const STEP_LABELS: Record<string, string> = {
  signed_up: "Signed Up",
  profile_set: "Profile Set",
  first_client: "First Client",
  first_job: "First Job",
  first_invoice: "First Invoice",
  first_payment: "First Payment",
  paid_subscription: "Paid Sub",
};

export default function OperatorsPage() {
  const router = useRouter();
  const [users, setUsers] = useState<SupabaseUser[]>([]);
  const [funnel, setFunnel] = useState<FunnelData | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [tab, setTab] = useState<Tab>("users");
  const [nudging, setNudging] = useState<Set<string>>(new Set());

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [usersRes, funnelRes] = await Promise.allSettled([
        fetch("/api/admin/users"),
        fetch("/api/admin/funnel"),
      ]);
      if (usersRes.status === "fulfilled" && usersRes.value.ok)
        setUsers(await usersRes.value.json());
      if (funnelRes.status === "fulfilled" && funnelRes.value.ok)
        setFunnel(await funnelRes.value.json());
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Derive computed signals once
  const enriched = useMemo(
    () =>
      users.map((u) => {
        const ob = u.onboarding || {
          hasProfile: false,
          hasFirstJob: false,
          hasSentInvoice: false,
          hasCalendar: false,
          stalledDays: 0,
        };
        const steps = [ob.hasProfile, ob.hasFirstJob, ob.hasSentInvoice];
        const completed = steps.filter(Boolean).length;
        const isOnboarded = completed === steps.length;
        const isStalled = !isOnboarded && ob.stalledDays >= 3;
        const isPaid = u.plan === "active";
        const isTrial = !isPaid && (u.plan === "trialing" || !u.plan);
        const trialStart = u.trial_start_date
          ? new Date(u.trial_start_date).getTime()
          : 0;
        const trialEnd = trialStart + 14 * 86400000;
        const trialDaysLeft = Math.max(
          0,
          Math.ceil((trialEnd - Date.now()) / 86400000)
        );
        const isChurnRisk =
          isTrial && trialDaysLeft <= 5 && !isOnboarded;
        return {
          ...u,
          steps,
          completed,
          isOnboarded,
          isStalled,
          isPaid,
          isTrial,
          trialDaysLeft,
          isChurnRisk,
        };
      }),
    [users]
  );

  const counts = useMemo(
    () => ({
      all: enriched.length,
      trial: enriched.filter((u) => u.isTrial).length,
      paid: enriched.filter((u) => u.isPaid).length,
      stalled: enriched.filter((u) => u.isStalled).length,
      churn_risk: enriched.filter((u) => u.isChurnRisk).length,
      onboarded: enriched.filter((u) => u.isOnboarded).length,
    }),
    [enriched]
  );

  const filtered = useMemo(() => {
    let list = enriched;
    if (filter === "trial") list = list.filter((u) => u.isTrial);
    if (filter === "paid") list = list.filter((u) => u.isPaid);
    if (filter === "stalled") list = list.filter((u) => u.isStalled);
    if (filter === "churn_risk") list = list.filter((u) => u.isChurnRisk);
    if (filter === "onboarded") list = list.filter((u) => u.isOnboarded);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) =>
          u.email.toLowerCase().includes(q) ||
          (u.business_name || "").toLowerCase().includes(q) ||
          (u.first_name || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [enriched, filter, search]);

  const handleNudge = async (
    userId: string,
    u: (typeof enriched)[number]
  ) => {
    const template = !u.onboarding?.hasProfile
      ? "profile"
      : !u.onboarding?.hasFirstJob
        ? "first_job"
        : !u.onboarding?.hasSentInvoice
          ? "first_invoice"
          : "general";
    setNudging((prev) => new Set(prev).add(userId));
    try {
      const res = await fetch("/api/admin/nudge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, template }),
      });
      const data = await res.json();
      if (data.ok) showToast(`Nudge sent to ${data.to}`);
      else showToast(`Failed: ${data.error}`);
    } catch {
      showToast("Failed to send");
    } finally {
      setNudging((prev) => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });
    }
  };

  const FILTERS: { key: Filter; label: string; color?: string }[] = [
    { key: "all", label: `All (${counts.all})` },
    { key: "paid", label: `Paid (${counts.paid})`, color: T.green },
    { key: "trial", label: `Trial (${counts.trial})` },
    { key: "stalled", label: `Stalled (${counts.stalled})`, color: T.amber },
    {
      key: "churn_risk",
      label: `Churn Risk (${counts.churn_risk})`,
      color: T.red,
    },
    {
      key: "onboarded",
      label: `Onboarded (${counts.onboarded})`,
      color: T.green,
    },
  ];

  const TABS: { key: Tab; label: string }[] = [
    { key: "users", label: "Users" },
    { key: "funnel", label: "Activation Funnel" },
    { key: "cohorts", label: "Cohorts" },
  ];

  const avatarColors = [T.primary, T.blue, T.amber, T.green, "#8b5cf6"];

  return (
    <AdminShell
      badges={
        counts.stalled > 0
          ? { Operators: { count: counts.stalled, color: T.amber } }
          : undefined
      }
    >
      <PageHeader
        eyebrow="Command"
        title="Operators"
        lastRefresh={lastRefresh}
        loading={loading}
        onRefresh={fetchData}
      />

      <StatStrip
        stats={[
          { label: "Total", value: counts.all },
          {
            label: "Paid",
            value: counts.paid,
            pill: { label: "active", type: "green" as const },
          },
          {
            label: "Churn Risk",
            value: counts.churn_risk,
            valueColor: counts.churn_risk > 0 ? T.red : undefined,
          },
          {
            label: "Conversion",
            value:
              counts.all > 0
                ? `${Math.round((counts.paid / counts.all) * 100)}%`
                : "0%",
            pill: { label: "signup to paid", type: "blue" as const },
          },
        ]}
      />

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 4,
          marginBottom: 16,
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: "10px 20px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: T.fontBody,
              border: "none",
              background: "transparent",
              color: tab === t.key ? T.primary : T.muted,
              borderBottom: `2px solid ${tab === t.key ? T.primary : "transparent"}`,
              marginBottom: -1,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Funnel tab */}
      {tab === "funnel" && funnel && (
        <Card title="Activation Funnel">
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {funnel.funnel.map((step, i) => {
              const pct = Math.round(
                (step.count / Math.max(step.total, 1)) * 100
              );
              const prev = i > 0 ? funnel.funnel[i - 1].count : step.total;
              const dropoff =
                i > 0 && prev > 0
                  ? Math.round(((prev - step.count) / prev) * 100)
                  : 0;
              return (
                <div
                  key={step.step}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 0",
                  }}
                >
                  <div
                    style={{
                      width: 130,
                      fontSize: 13,
                      fontWeight: 600,
                      color: T.ink,
                    }}
                  >
                    {STEP_LABELS[step.step] || step.step}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: 28,
                      background: T.warm,
                      borderRadius: 6,
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${pct}%`,
                        background:
                          i === 0 || pct > 50
                            ? T.green
                            : pct > 25
                              ? T.amber
                              : T.red,
                        borderRadius: 6,
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        left: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: 12,
                        fontWeight: 700,
                        color: pct > 15 ? "white" : T.ink,
                      }}
                    >
                      {step.count}
                    </span>
                  </div>
                  <div
                    style={{
                      width: 50,
                      textAlign: "right",
                      fontSize: 13,
                      fontWeight: 700,
                      color: T.ink,
                    }}
                  >
                    {pct}%
                  </div>
                  <div
                    style={{
                      width: 80,
                      textAlign: "right",
                      fontSize: 11,
                      color: dropoff > 0 ? T.red : T.muted,
                      fontWeight: 600,
                    }}
                  >
                    {i > 0 && dropoff > 0 ? `-${dropoff}% drop` : ""}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Cohorts tab */}
      {tab === "cohorts" && funnel && (
        <Card title="Weekly Cohorts">
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 12,
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "8px 12px",
                      fontWeight: 700,
                      color: T.muted,
                      fontSize: 10,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      borderBottom: `1px solid ${T.border}`,
                    }}
                  >
                    Week
                  </th>
                  <th
                    style={{
                      padding: "8px 12px",
                      fontWeight: 700,
                      color: T.muted,
                      fontSize: 10,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      borderBottom: `1px solid ${T.border}`,
                    }}
                  >
                    Signups
                  </th>
                  {Object.keys(STEP_LABELS)
                    .slice(1)
                    .map((s) => (
                      <th
                        key={s}
                        style={{
                          padding: "8px 8px",
                          fontWeight: 700,
                          color: T.muted,
                          fontSize: 10,
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          borderBottom: `1px solid ${T.border}`,
                          textAlign: "center",
                        }}
                      >
                        {STEP_LABELS[s]}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {funnel.cohorts.map((c) => (
                  <tr key={c.week}>
                    <td
                      style={{
                        padding: "8px 12px",
                        fontWeight: 600,
                        color: T.ink,
                        borderBottom: `1px solid ${T.border}`,
                      }}
                    >
                      {c.week}
                    </td>
                    <td
                      style={{
                        padding: "8px 12px",
                        textAlign: "center",
                        fontWeight: 700,
                        color: T.ink,
                        borderBottom: `1px solid ${T.border}`,
                      }}
                    >
                      {c.total}
                    </td>
                    {Object.keys(STEP_LABELS)
                      .slice(1)
                      .map((s) => {
                        const val = c.steps[s] || 0;
                        const pct =
                          c.total > 0 ? Math.round((val / c.total) * 100) : 0;
                        return (
                          <td
                            key={s}
                            style={{
                              padding: "8px 8px",
                              textAlign: "center",
                              borderBottom: `1px solid ${T.border}`,
                            }}
                          >
                            <span
                              style={{
                                display: "inline-block",
                                padding: "2px 8px",
                                borderRadius: 4,
                                fontSize: 11,
                                fontWeight: 700,
                                background:
                                  pct > 50
                                    ? "rgba(34,197,94,0.12)"
                                    : pct > 25
                                      ? "rgba(245,158,11,0.12)"
                                      : pct > 0
                                        ? "rgba(239,68,68,0.12)"
                                        : T.warm,
                                color:
                                  pct > 50
                                    ? T.green
                                    : pct > 25
                                      ? "#d97706"
                                      : pct > 0
                                        ? T.red
                                        : T.muted,
                              }}
                            >
                              {val > 0 ? `${val} (${pct}%)` : "-"}
                            </span>
                          </td>
                        );
                      })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Users tab */}
      {tab === "users" && (
        <>
          {/* Search + filter bar */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 12,
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="Search by name, email, or business..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                maxWidth: 320,
                padding: "8px 14px",
                borderRadius: 8,
                border: `1px solid ${T.border}`,
                fontSize: 13,
                fontFamily: T.fontBody,
                background: T.surface,
                color: T.ink,
                outline: "none",
              }}
            />
            {filter === "stalled" && counts.stalled > 0 && (
              <button
                onClick={() => {
                  for (const u of enriched.filter((x) => x.isStalled)) {
                    handleNudge(u.id, u);
                  }
                }}
                style={{
                  marginLeft: "auto",
                  padding: "8px 16px",
                  background: T.primary,
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: T.fontBody,
                }}
              >
                Nudge All Stalled ({counts.stalled})
              </button>
            )}
          </div>

          <div
            style={{
              display: "flex",
              gap: 6,
              marginBottom: 16,
              flexWrap: "wrap",
            }}
          >
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 7,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: T.fontBody,
                  border: `1px solid ${filter === f.key ? T.primary : T.border}`,
                  background: filter === f.key ? T.primary : T.surface,
                  color: filter === f.key ? "white" : f.color || T.ink,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Users table */}
          <div
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "2fr 90px 90px repeat(3, 60px) 110px 90px",
                gap: 0,
                padding: "12px 20px",
                background: T.bg,
                borderBottom: `1px solid ${T.border}`,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: T.muted,
              }}
            >
              <div>Operator</div>
              <div>Status</div>
              <div>Joined</div>
              <div style={{ textAlign: "center" }}>Profile</div>
              <div style={{ textAlign: "center" }}>Job</div>
              <div style={{ textAlign: "center" }}>Invoice</div>
              <div>Progress</div>
              <div style={{ textAlign: "right" }}>Actions</div>
            </div>

            {filtered.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                  color: T.muted,
                  fontSize: 14,
                }}
              >
                No operators match this filter
              </div>
            ) : (
              filtered.map((u) => {
                const pct = Math.round((u.completed / u.steps.length) * 100);
                const colorIdx =
                  u.email.charCodeAt(0) % avatarColors.length;
                return (
                  <div
                    key={u.id}
                    onClick={() => router.push(`/admin/operators/${u.id}`)}
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "2fr 90px 90px repeat(3, 60px) 110px 90px",
                      gap: 0,
                      padding: "14px 20px",
                      borderBottom: `1px solid ${T.border}`,
                      alignItems: "center",
                      background: u.isChurnRisk
                        ? "rgba(239,68,68,0.04)"
                        : u.isStalled
                          ? "rgba(245,158,11,0.04)"
                          : "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: T.fontHeading,
                          fontWeight: 900,
                          fontSize: 13,
                          flexShrink: 0,
                          color: "white",
                          background: avatarColors[colorIdx],
                        }}
                      >
                        {initials(
                          u.first_name || u.business_name,
                          u.email
                        )}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 13.5,
                            fontWeight: 600,
                            color: T.ink,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {u.business_name ||
                            u.first_name ||
                            u.email.split("@")[0]}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: T.muted,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {u.email}
                        </div>
                      </div>
                    </div>

                    <div>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          padding: "3px 7px",
                          borderRadius: 4,
                          background: u.isPaid
                            ? "rgba(34,197,94,0.12)"
                            : u.isChurnRisk
                              ? "rgba(239,68,68,0.12)"
                              : T.warm,
                          color: u.isPaid
                            ? T.green
                            : u.isChurnRisk
                              ? T.red
                              : T.muted,
                        }}
                      >
                        {u.isPaid
                          ? "PAID"
                          : u.isChurnRisk
                            ? `${u.trialDaysLeft}D LEFT`
                            : "TRIAL"}
                      </span>
                    </div>

                    <div style={{ fontSize: 12, color: T.muted }}>
                      {formatDate(u.created_at)}
                    </div>

                    {u.steps.map((done, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            color: done
                              ? T.green
                              : u.isStalled
                                ? T.amber
                                : T.border,
                            fontSize: 16,
                          }}
                        >
                          {done ? "+" : "o"}
                        </span>
                      </div>
                    ))}

                    <div>
                      <div
                        style={{
                          height: 5,
                          background: T.border,
                          borderRadius: 3,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            borderRadius: 3,
                            background: u.isOnboarded
                              ? T.green
                              : u.isStalled
                                ? T.amber
                                : T.blue,
                            width: `${pct}%`,
                          }}
                        />
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: T.muted,
                          marginTop: 2,
                        }}
                      >
                        {u.completed}/{u.steps.length}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: 6,
                        justifyContent: "flex-end",
                      }}
                    >
                      {(u.isStalled || u.isChurnRisk) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNudge(u.id, u);
                          }}
                          disabled={nudging.has(u.id)}
                          style={{
                            padding: "5px 11px",
                            background: T.primaryLight,
                            color: T.primary,
                            border: `1px solid rgba(245,98,15,0.2)`,
                            borderRadius: 6,
                            fontSize: 11,
                            fontWeight: 600,
                            cursor: nudging.has(u.id)
                              ? "wait"
                              : "pointer",
                            fontFamily: T.fontBody,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {nudging.has(u.id) ? "..." : "Nudge"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </AdminShell>
  );
}
