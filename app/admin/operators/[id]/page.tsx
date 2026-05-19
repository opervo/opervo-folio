"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminShell from "../../_components/AdminShell";
import PageHeader from "../../_components/PageHeader";
import StatStrip from "../../_components/StatStrip";
import Card from "../../_components/Card";
import { showToast } from "../../_lib/toast";
import { T } from "../../_lib/tokens";
import { fmt$, timeAgo, initials } from "../../_lib/formatters";
import type { OperatorProfile } from "../../_lib/types";

const FEATURE_LABELS: Record<string, string> = {
  hasProfile: "Business Profile",
  hasJobs: "Created Jobs",
  hasInvoices: "Sent Invoices",
  hasClients: "Added Clients",
  hasEstimates: "Sent Estimates",
  hasServices: "Service Catalog",
  hasTeam: "Team Members",
  hasSupplies: "Supplies Tracking",
  hasMileage: "Mileage Tracking",
  hasExpenses: "Expense Tracking",
  hasFolio: "Public Folio",
  hasCalendar: "Google Calendar",
  hasStripe: "Stripe Connected",
  hasSquare: "Square Connected",
};

const TIMELINE_COLORS: Record<string, string> = {
  job: T.blue,
  invoice: T.amber,
  payment: T.green,
  estimate: "#8b5cf6",
};

export default function OperatorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [data, setData] = useState<OperatorProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [nudging, setNudging] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/operator/${id}`);
      if (res.ok) setData(await res.json());
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleNudge = async (template: string) => {
    setNudging(true);
    try {
      const res = await fetch("/api/admin/nudge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: id, template }),
      });
      const result = await res.json();
      if (result.ok) showToast(`Nudge sent to ${result.to}`);
      else showToast(`Failed: ${result.error}`);
    } catch {
      showToast("Failed to send");
    } finally {
      setNudging(false);
    }
  };

  if (!data) {
    return (
      <AdminShell>
        <PageHeader
          eyebrow="Command"
          title="Operator"
          lastRefresh={lastRefresh}
          loading={loading || !data}
          onRefresh={fetchData}
        />
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: T.muted,
            fontSize: 14,
          }}
        >
          {loading ? "Loading operator data..." : "Operator not found"}
        </div>
      </AdminShell>
    );
  }

  const p = data.profile;
  const s = data.stats;

  const trialStart = p.trial_start_date
    ? new Date(p.trial_start_date).getTime()
    : 0;
  const trialEnd = trialStart + 14 * 86400000;
  const trialDaysLeft = Math.max(
    0,
    Math.ceil((trialEnd - Date.now()) / 86400000)
  );

  return (
    <AdminShell>
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() => router.back()}
          style={{
            background: "none",
            border: "none",
            color: T.muted,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: T.fontBody,
            padding: 0,
          }}
        >
          &larr; Back
        </button>
      </div>

      <PageHeader
        eyebrow="Operator"
        title={p.business_name || p.owner_name || p.email}
        lastRefresh={lastRefresh}
        loading={loading}
        onRefresh={fetchData}
      />

      {/* Profile header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 24,
          padding: "20px 24px",
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 12,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: T.fontHeading,
            fontWeight: 900,
            fontSize: 22,
            color: "white",
            background: T.primary,
            flexShrink: 0,
          }}
        >
          {initials(p.owner_name || p.business_name, p.email)}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: T.ink,
              fontFamily: T.fontHeading,
            }}
          >
            {p.business_name || p.owner_name}
            {p.industry && (
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: T.muted,
                  marginLeft: 10,
                }}
              >
                {p.industry}
              </span>
            )}
          </div>
          <div style={{ fontSize: 13, color: T.muted, marginTop: 2 }}>
            {p.email}
            {p.phone && ` | ${p.phone}`}
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 6,
              fontSize: 12,
              color: T.muted,
            }}
          >
            <span>Joined {timeAgo(p.created_at)}</span>
            {p.last_sign_in && (
              <span>Last login: {timeAgo(p.last_sign_in)}</span>
            )}
            {p.slug && (
              <a
                href={`https://www.opervo.io/p/${p.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: T.primary, textDecoration: "none" }}
              >
                /p/{p.slug}
              </a>
            )}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: 6,
              background:
                p.subscription_status === "active"
                  ? "rgba(34,197,94,0.12)"
                  : "rgba(245,158,11,0.12)",
              color:
                p.subscription_status === "active" ? T.green : "#d97706",
            }}
          >
            {p.subscription_status === "active"
              ? `PAID (${p.subscription_plan || "solo"})`
              : `TRIAL (${trialDaysLeft}d left)`}
          </span>
          <button
            onClick={() => handleNudge("general")}
            disabled={nudging}
            style={{
              padding: "6px 14px",
              background: T.primary,
              color: "white",
              border: "none",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              cursor: nudging ? "wait" : "pointer",
              fontFamily: T.fontBody,
            }}
          >
            {nudging ? "Sending..." : "Send Nudge"}
          </button>
        </div>
      </div>

      <StatStrip
        stats={[
          { label: "Jobs", value: s.totalJobs, pill: { label: `${s.completedJobs} done`, type: "green" as const } },
          { label: "Invoices", value: s.totalInvoices, pill: { label: `${s.paidInvoices} paid`, type: "green" as const } },
          { label: "Revenue", value: fmt$(s.totalRevenue * 100) },
          { label: "Clients", value: s.totalClients },
          { label: "Features Used", value: `${data.featureCount}/14` },
        ]}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        {/* Feature usage */}
        <Card title="Feature Adoption">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 4,
            }}
          >
            {Object.entries(FEATURE_LABELS).map(([key, label]) => {
              const active = data.features[key];
              return (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 0",
                    fontSize: 12,
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      background: active
                        ? "rgba(34,197,94,0.12)"
                        : T.warm,
                      color: active ? T.green : T.muted,
                    }}
                  >
                    {active ? "+" : "-"}
                  </span>
                  <span style={{ color: active ? T.ink : T.muted }}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Activity timeline */}
        <Card title="Recent Activity">
          {data.timeline.length === 0 ? (
            <div style={{ color: T.muted, fontSize: 13, padding: 8 }}>
              No activity yet
            </div>
          ) : (
            <div style={{ maxHeight: 400, overflowY: "auto" }}>
              {data.timeline.map((ev, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: "8px 0",
                    borderBottom:
                      i < data.timeline.length - 1
                        ? `1px solid ${T.border}`
                        : "none",
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background:
                        TIMELINE_COLORS[ev.type] || T.muted,
                      marginTop: 5,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: T.ink,
                      }}
                    >
                      {ev.title}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: T.muted,
                        display: "flex",
                        gap: 8,
                      }}
                    >
                      <span>{timeAgo(ev.date)}</span>
                      {ev.detail && (
                        <span
                          style={{
                            padding: "1px 6px",
                            borderRadius: 3,
                            background: T.warm,
                            fontSize: 10,
                            fontWeight: 600,
                          }}
                        >
                          {ev.detail}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        {/* Recent jobs */}
        <Card title={`Jobs (${s.totalJobs})`}>
          {data.recentJobs.length === 0 ? (
            <div style={{ color: T.muted, fontSize: 13, padding: 8 }}>
              No jobs
            </div>
          ) : (
            data.recentJobs.map((j) => (
              <div
                key={j.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: `1px solid ${T.border}`,
                  fontSize: 13,
                }}
              >
                <div>
                  <span style={{ fontWeight: 600, color: T.ink }}>
                    {j.title || j.service_type || "Untitled"}
                  </span>
                  <span
                    style={{
                      marginLeft: 8,
                      fontSize: 10,
                      fontWeight: 600,
                      padding: "2px 6px",
                      borderRadius: 3,
                      background:
                        j.status === "completed" || j.status === "paid"
                          ? "rgba(34,197,94,0.1)"
                          : T.warm,
                      color:
                        j.status === "completed" || j.status === "paid"
                          ? T.green
                          : T.muted,
                    }}
                  >
                    {j.status}
                  </span>
                </div>
                <span style={{ color: T.muted, fontSize: 12 }}>
                  {timeAgo(j.created_at)}
                </span>
              </div>
            ))
          )}
        </Card>

        {/* Recent invoices */}
        <Card title={`Invoices (${s.totalInvoices})`}>
          {data.recentInvoices.length === 0 ? (
            <div style={{ color: T.muted, fontSize: 13, padding: 8 }}>
              No invoices
            </div>
          ) : (
            data.recentInvoices.map((inv) => (
              <div
                key={inv.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: `1px solid ${T.border}`,
                  fontSize: 13,
                }}
              >
                <div>
                  <span style={{ fontWeight: 600, color: T.ink }}>
                    #{inv.invoice_number || "..."}
                  </span>
                  <span
                    style={{
                      marginLeft: 8,
                      fontSize: 10,
                      fontWeight: 600,
                      padding: "2px 6px",
                      borderRadius: 3,
                      background:
                        inv.status === "paid"
                          ? "rgba(34,197,94,0.1)"
                          : "rgba(245,158,11,0.1)",
                      color: inv.status === "paid" ? T.green : "#d97706",
                    }}
                  >
                    {inv.status}
                  </span>
                </div>
                <span style={{ fontWeight: 700, color: T.ink }}>
                  {fmt$(inv.total * 100)}
                </span>
              </div>
            ))
          )}
        </Card>
      </div>

      {/* Team + Services */}
      {(data.team.length > 0 || data.services.length > 0) && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginTop: 16,
          }}
        >
          {data.team.length > 0 && (
            <Card title={`Team (${data.team.length})`}>
              {data.team.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    borderBottom: `1px solid ${T.border}`,
                    fontSize: 13,
                  }}
                >
                  <span style={{ fontWeight: 600, color: T.ink }}>
                    {m.name}
                  </span>
                  <span style={{ fontSize: 11, color: T.muted }}>
                    {m.role} ({m.status})
                  </span>
                </div>
              ))}
            </Card>
          )}

          {data.services.length > 0 && (
            <Card title={`Services (${data.services.length})`}>
              {data.services.map((svc) => (
                <div
                  key={svc.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    borderBottom: `1px solid ${T.border}`,
                    fontSize: 13,
                  }}
                >
                  <span style={{ fontWeight: 600, color: T.ink }}>
                    {svc.name}
                  </span>
                  <span style={{ color: T.muted }}>
                    {svc.base_price ? fmt$(svc.base_price * 100) : "No price"}
                  </span>
                </div>
              ))}
            </Card>
          )}
        </div>
      )}
    </AdminShell>
  );
}
