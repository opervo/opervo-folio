"use client";

import { useState, useEffect, useCallback } from "react";
import AdminShell from "../_components/AdminShell";
import PageHeader from "../_components/PageHeader";
import StatStrip from "../_components/StatStrip";
import Badge from "../_components/Badge";
import { T } from "../_lib/tokens";
import { timeAgo } from "../_lib/formatters";
import type { EdgeFunction } from "../_lib/types";

export default function EdgeFunctionsPage() {
  const [functions, setFunctions] = useState<EdgeFunction[]>([]);
  const [configured, setConfigured] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/edge-functions");
      if (res.ok) {
        const data = await res.json();
        setConfigured(data.configured !== false);
        setFunctions(data.functions || []);
        setError(data.error || null);
      }
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const activeCount = functions.filter(f => f.status === "active").length;

  return (
    <AdminShell>
      <PageHeader
        eyebrow="System"
        title="Edge Functions"
        lastRefresh={lastRefresh}
        loading={loading}
        onRefresh={fetchData}
      />

      <StatStrip stats={[
        { label: "Total Functions", value: functions.length },
        { label: "Active", value: activeCount, pill: activeCount > 0 ? { label: "✓", type: "green" } : undefined },
        { label: "Project", value: "sbnykmxckfwkkxvhrkot", sub: "us-east-1" },
      ]} />

      {!configured ? (
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          color: T.muted,
          fontSize: 14,
          background: T.surface,
          borderRadius: 12,
          border: `1px solid ${T.border}`,
        }}>
          {error || "Set SUPABASE_ACCESS_TOKEN in Vercel env vars to view edge functions"}
        </div>
      ) : (
        <div style={{
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 12,
          overflow: "hidden",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            padding: "12px 20px",
            background: T.bg,
            borderBottom: `1px solid ${T.border}`,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: T.muted,
          }}>
            <div>Function</div>
            <div>Status</div>
            <div>Version</div>
            <div>Created</div>
            <div>Updated</div>
          </div>
          {functions.length > 0 ? (
            functions.map(fn => (
              <div key={fn.id || fn.slug} style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                padding: "14px 20px",
                borderBottom: `1px solid ${T.border}`,
                alignItems: "center",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: fn.status === "active" ? T.green : fn.status === "error" ? T.red : T.muted,
                    flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: T.ink, fontFamily: "'Courier New', monospace" }}>
                      {fn.name || fn.slug}
                    </div>
                    {fn.slug !== fn.name && (
                      <div style={{ fontSize: 11, color: T.muted }}>{fn.slug}</div>
                    )}
                  </div>
                </div>
                <div>
                  <Badge
                    type={fn.status === "active" ? "green" : fn.status === "error" ? "red" : "gray"}
                    label={fn.status || "unknown"}
                  />
                </div>
                <div style={{ fontSize: 12, color: T.muted }}>v{fn.version}</div>
                <div style={{ fontSize: 12, color: T.muted }}>{fn.created_at ? timeAgo(fn.created_at) : "—"}</div>
                <div style={{ fontSize: 12, color: T.muted }}>{fn.updated_at ? timeAgo(fn.updated_at) : "—"}</div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "40px 20px", color: T.muted, fontSize: 14 }}>
              No edge functions found
            </div>
          )}
        </div>
      )}
    </AdminShell>
  );
}
