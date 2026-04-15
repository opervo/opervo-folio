"use client";

import { useState, useEffect, useCallback } from "react";
import AdminShell from "../_components/AdminShell";
import PageHeader from "../_components/PageHeader";
import Badge from "../_components/Badge";
import { T } from "../_lib/tokens";
import type { LogEntry } from "../_lib/types";

type Level = "" | "error" | "warning" | "info";
type Env = "production" | "preview";

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [configured, setConfigured] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [env, setEnv] = useState<Env>("production");
  const [level, setLevel] = useState<Level>("");
  const [limit, setLimit] = useState(50);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("environment", env);
      if (level) params.set("level", level);
      params.set("limit", String(limit));
      const res = await fetch(`/api/admin/logs?${params}`);
      if (res.ok) {
        const data = await res.json();
        setConfigured(data.configured !== false);
        setLogs(data.logs || []);
        setError(data.error || null);
      }
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
    }
  }, [env, level, limit]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const levelColor = (l: string) => {
    if (l === "error" || l === "fatal") return T.red;
    if (l === "warning" || l === "warn") return T.amber;
    return T.blue;
  };

  const levelBadge = (l: string): "red" | "amber" | "blue" | "gray" => {
    if (l === "error" || l === "fatal") return "red";
    if (l === "warning" || l === "warn") return "amber";
    if (l === "info") return "blue";
    return "gray";
  };

  return (
    <AdminShell>
      <PageHeader
        eyebrow="System"
        title="Logs"
        lastRefresh={lastRefresh}
        loading={loading}
        onRefresh={fetchData}
      />

      {/* Filter bar */}
      <div style={{
        display: "flex",
        gap: 12,
        marginBottom: 20,
        alignItems: "center",
        flexWrap: "wrap",
      }}>
        {/* Environment */}
        <div style={{ display: "flex", gap: 4 }}>
          {(["production", "preview"] as Env[]).map(e => (
            <button
              key={e}
              onClick={() => setEnv(e)}
              style={{
                padding: "7px 14px",
                borderRadius: 7,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: T.fontBody,
                border: `1px solid ${env === e ? T.primary : T.border}`,
                background: env === e ? T.primary : T.surface,
                color: env === e ? "white" : T.ink,
                textTransform: "capitalize",
              }}
            >
              {e}
            </button>
          ))}
        </div>

        {/* Level filter */}
        <div style={{ display: "flex", gap: 4 }}>
          {([
            { key: "" as Level, label: "All Levels" },
            { key: "error" as Level, label: "Error" },
            { key: "warning" as Level, label: "Warning" },
            { key: "info" as Level, label: "Info" },
          ]).map(f => (
            <button
              key={f.key}
              onClick={() => setLevel(f.key)}
              style={{
                padding: "7px 14px",
                borderRadius: 7,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: T.fontBody,
                border: `1px solid ${level === f.key ? T.ink : T.border}`,
                background: level === f.key ? T.ink : T.surface,
                color: level === f.key ? "white" : T.ink,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <span style={{ fontSize: 12, color: T.muted }}>{logs.length} entries</span>
      </div>

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
          {error || "Set VERCEL_TOKEN in Vercel env vars to view runtime logs"}
        </div>
      ) : (
        <div style={{
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 12,
          overflow: "hidden",
        }}>
          {/* Log header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "160px 80px 100px 1fr",
            padding: "10px 16px",
            background: T.bg,
            borderBottom: `1px solid ${T.border}`,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: T.muted,
          }}>
            <div>Timestamp</div>
            <div>Level</div>
            <div>Source</div>
            <div>Message</div>
          </div>

          {/* Log entries */}
          <div style={{ maxHeight: 600, overflowY: "auto" }}>
            {logs.length > 0 ? (
              logs.map((log, i) => (
                <div key={log.id || i} style={{
                  display: "grid",
                  gridTemplateColumns: "160px 80px 100px 1fr",
                  padding: "8px 16px",
                  borderBottom: `1px solid ${T.border}`,
                  alignItems: "flex-start",
                  fontSize: 12,
                }}>
                  <div style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: 11,
                    color: T.muted,
                  }}>
                    {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : "—"}
                  </div>
                  <div>
                    <Badge type={levelBadge(log.level)} label={log.level || "info"} />
                  </div>
                  <div style={{ fontSize: 11, color: T.muted }}>{log.source || "—"}</div>
                  <div style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: 11.5,
                    color: T.ink,
                    lineHeight: 1.5,
                    wordBreak: "break-all",
                  }}>
                    {log.message}
                    {log.statusCode && (
                      <span style={{
                        marginLeft: 8,
                        color: log.statusCode >= 400 ? T.red : T.green,
                        fontWeight: 600,
                      }}>
                        [{log.statusCode}]
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "40px 20px", color: T.muted, fontSize: 14 }}>
                {loading ? "Loading logs..." : "No log entries found"}
              </div>
            )}
          </div>

          {/* Load more */}
          {logs.length >= limit && (
            <div style={{ textAlign: "center", padding: "12px", borderTop: `1px solid ${T.border}` }}>
              <button
                onClick={() => setLimit(prev => prev + 50)}
                style={{
                  padding: "7px 20px",
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: 7,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: T.fontBody,
                  color: T.ink,
                }}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}
    </AdminShell>
  );
}
