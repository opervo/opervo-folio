"use client";

import { useState, useEffect, useCallback } from "react";
import AdminShell from "../_components/AdminShell";
import PageHeader from "../_components/PageHeader";
import StatStrip from "../_components/StatStrip";
import ErrorCard from "../_components/ErrorCard";
import { T } from "../_lib/tokens";
import type { SentryData } from "../_lib/types";

type Filter = "all" | "fatal" | "error" | "warning" | "info";

export default function ErrorsPage() {
  const [sentry, setSentry] = useState<SentryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/sentry");
      if (res.ok) setSentry(await res.json());
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const allIssues = (sentry?.topIssues || []).filter(i => !dismissed.has(i.id));
  const filtered = filter === "all" ? allIssues : allIssues.filter(i => i.level === filter);

  const fatalCount = allIssues.filter(i => i.level === "fatal" || i.level === "error").length;
  const warningCount = allIssues.filter(i => i.level === "warning").length;
  const infoCount = allIssues.filter(i => i.level === "info" || i.level === "default").length;

  const FILTERS: { key: Filter; label: string }[] = [
    { key: "all", label: `All (${allIssues.length})` },
    { key: "error", label: `Fatal/Error (${fatalCount})` },
    { key: "warning", label: `Warning (${warningCount})` },
    { key: "info", label: `Info (${infoCount})` },
  ];

  const handleDiagnoseAll = () => {
    // Trigger diagnose on each visible card by toggling their state
    // This is handled by individual ErrorCard components
  };

  return (
    <AdminShell>
      <PageHeader
        eyebrow="Command"
        title="Errors"
        lastRefresh={lastRefresh}
        loading={loading}
        onRefresh={fetchData}
      />

      <StatStrip stats={[
        { label: "Total Errors (24h)", value: sentry?.totalErrors24h ?? "—", valueColor: T.red },
        { label: "Unique Issues", value: sentry?.uniqueIssues24h ?? "—" },
        { label: "Users Affected", value: sentry?.affectedUsers24h ?? "—" },
        { label: "Critical", value: fatalCount, valueColor: fatalCount > 0 ? T.red : undefined },
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
        <div style={{ flex: 1 }} />
        <a
          href="https://opervo.sentry.io"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "7px 14px",
            borderRadius: 7,
            fontSize: 12,
            fontWeight: 600,
            border: `1px solid ${T.border}`,
            background: T.surface,
            color: T.ink,
            textDecoration: "none",
            fontFamily: T.fontBody,
          }}
        >
          Open Sentry
        </a>
      </div>

      {/* Error list */}
      {sentry?.configured === false ? (
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          color: T.muted,
          fontSize: 14,
          background: T.surface,
          borderRadius: 12,
          border: `1px solid ${T.border}`,
        }}>
          Sentry not configured — set SENTRY_AUTH_TOKEN in Vercel env vars
        </div>
      ) : filtered.length > 0 ? (
        filtered.map(issue => (
          <ErrorCard
            key={issue.id}
            issue={issue}
            onDismiss={(id) => setDismissed(prev => new Set(prev).add(id))}
          />
        ))
      ) : (
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          color: T.muted,
          fontSize: 14,
          background: T.surface,
          borderRadius: 12,
          border: `1px solid ${T.border}`,
        }}>
          No errors matching this filter
        </div>
      )}
    </AdminShell>
  );
}
