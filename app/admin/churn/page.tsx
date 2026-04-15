"use client";

import { useState, useEffect, useCallback } from "react";
import AdminShell from "../_components/AdminShell";
import PageHeader from "../_components/PageHeader";
import StatStrip from "../_components/StatStrip";
import Card from "../_components/Card";
import Badge from "../_components/Badge";
import { showToast } from "../_lib/toast";
import { T } from "../_lib/tokens";
import { initials } from "../_lib/formatters";
import type { ChurnData, ChurnUser } from "../_lib/types";

function ChurnRow({ user, onReachOut }: { user: ChurnUser; onReachOut?: (id: string) => void }) {
  const avatarColors = [T.red, T.amber, "#8b5cf6", T.blue];
  const colorIdx = (user.email || "").charCodeAt(0) % avatarColors.length;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 0",
      borderBottom: `1px solid ${T.border}`,
    }}>
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: T.fontHeading,
        fontWeight: 900,
        fontSize: 14,
        color: "white",
        background: avatarColors[colorIdx],
        flexShrink: 0,
      }}>
        {initials(user.first_name || user.business_name, user.email)}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: T.ink }}>
          {user.business_name || user.first_name || user.email?.split("@")[0] || "Unknown"}
        </div>
        <div style={{ fontSize: 11, color: T.muted }}>{user.email}</div>
      </div>
      <div style={{ textAlign: "right", marginRight: 12 }}>
        <div style={{ fontSize: 12, color: T.muted }}>{user.detail}</div>
      </div>
      {onReachOut && (
        <button onClick={() => onReachOut(user.id)} style={{
          padding: "6px 14px",
          background: T.primaryLight,
          color: T.primary,
          border: `1px solid rgba(245,98,15,0.2)`,
          borderRadius: 7,
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: T.fontBody,
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}>
          Reach Out
        </button>
      )}
    </div>
  );
}

export default function ChurnPage() {
  const [data, setData] = useState<ChurnData | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/churn");
      if (res.ok) setData(await res.json());
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const totalAtRisk = (data?.trialExpiring.length || 0) + (data?.inactive.length || 0) + (data?.paymentFailed.length || 0);

  const handleReachOut = (userId: string) => {
    showToast("Reach-out email drafted — check Support tab");
  };

  return (
    <AdminShell>
      <PageHeader
        eyebrow="Business"
        title="Churn Risk"
        lastRefresh={lastRefresh}
        loading={loading}
        onRefresh={fetchData}
      />

      <StatStrip stats={[
        { label: "Total At Risk", value: totalAtRisk, valueColor: totalAtRisk > 0 ? T.red : undefined },
        { label: "Trial Expiring", value: data?.trialExpiring.length ?? "—", valueColor: T.amber },
        { label: "Inactive Users", value: data?.inactive.length ?? "—" },
        { label: "Payment Failed", value: data?.paymentFailed.length ?? "—", valueColor: (data?.paymentFailed.length || 0) > 0 ? T.red : undefined },
      ]} />

      {/* Trial Expiring */}
      <Card
        title="Trial Expiring Soon"
        count={data?.trialExpiring.length ? `${data.trialExpiring.length}` : undefined}
        countType="amber"
      >
        {data?.trialExpiring.length ? (
          data.trialExpiring.map(u => (
            <ChurnRow key={u.id} user={u} onReachOut={handleReachOut} />
          ))
        ) : (
          <div style={{ color: T.muted, fontSize: 13, padding: "12px 0" }}>No trials expiring within 5 days</div>
        )}
      </Card>

      {/* Payment Failed */}
      <Card
        title="Payment Failed"
        count={data?.paymentFailed.length ? `${data.paymentFailed.length}` : undefined}
        countType="red"
      >
        {data?.paymentFailed.length ? (
          data.paymentFailed.map(u => (
            <ChurnRow key={u.id} user={u} onReachOut={handleReachOut} />
          ))
        ) : (
          <div style={{ color: T.muted, fontSize: 13, padding: "12px 0" }}>No failed payments</div>
        )}
      </Card>

      {/* Inactive */}
      <Card
        title="Inactive Users (No Jobs Created)"
        count={data?.inactive.length ? `${data.inactive.length}` : undefined}
        countType="gray"
      >
        {data?.inactive.length ? (
          data.inactive.map(u => (
            <ChurnRow key={u.id} user={u} onReachOut={handleReachOut} />
          ))
        ) : (
          <div style={{ color: T.muted, fontSize: 13, padding: "12px 0" }}>All users are active</div>
        )}
      </Card>
    </AdminShell>
  );
}
