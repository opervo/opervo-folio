"use client";

import { useState, useEffect, useCallback } from "react";
import AdminShell from "../_components/AdminShell";
import PageHeader from "../_components/PageHeader";
import StatStrip from "../_components/StatStrip";
import Card from "../_components/Card";
import Badge from "../_components/Badge";
import { T } from "../_lib/tokens";
import { timeAgo } from "../_lib/formatters";
import type {
  SentryData,
  SentryIssueDetail,
  PostHogEventsData,
  LogEntry,
  EdgeFunction,
} from "../_lib/types";

type Tab = "errors" | "analytics" | "logs" | "edge-fns";

const SEV_COLORS: Record<string, string> = {
  fatal: T.red,
  error: T.red,
  warning: T.amber,
  info: T.blue,
  default: T.blue,
};

export default function DevToolsPage() {
  const [tab, setTab] = useState<Tab>("errors");
  const [period, setPeriod] = useState("7d");
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  // Errors state
  const [sentry, setSentry] = useState<SentryData | null>(null);
  const [issueDetail, setIssueDetail] = useState<SentryIssueDetail | null>(
    null
  );
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  // PostHog state
  const [posthog, setPosthog] = useState<PostHogEventsData | null>(null);

  // Logs state
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [logEnv, setLogEnv] = useState<"production" | "preview">("production");
  const [logLevel, setLogLevel] = useState<"" | "error" | "warning" | "info">(
    ""
  );

  // Edge functions state
  const [edgeFns, setEdgeFns] = useState<EdgeFunction[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const promises: Promise<unknown>[] = [];
      if (tab === "errors" || tab === "analytics") {
        promises.push(
          fetch("/api/admin/sentry").then((r) =>
            r.ok ? r.json() : null
          ),
          fetch(`/api/admin/posthog/events?period=${period}`).then((r) =>
            r.ok ? r.json() : null
          )
        );
      }
      if (tab === "logs") {
        const qs = new URLSearchParams();
        qs.set("environment", logEnv);
        if (logLevel) qs.set("level", logLevel);
        qs.set("limit", "100");
        promises.push(
          fetch(`/api/admin/logs?${qs}`).then((r) => (r.ok ? r.json() : null))
        );
      }
      if (tab === "edge-fns") {
        promises.push(
          fetch("/api/admin/edge-functions").then((r) =>
            r.ok ? r.json() : null
          )
        );
      }
      const results = await Promise.allSettled(promises);

      let i = 0;
      if (tab === "errors" || tab === "analytics") {
        if (results[i].status === "fulfilled")
          setSentry(
            (results[i] as PromiseFulfilledResult<SentryData>).value
          );
        i++;
        if (results[i].status === "fulfilled")
          setPosthog(
            (results[i] as PromiseFulfilledResult<PostHogEventsData>).value
          );
        i++;
      }
      if (tab === "logs") {
        if (results[i]?.status === "fulfilled") {
          const data = (
            results[i] as PromiseFulfilledResult<{ logs: LogEntry[] }>
          ).value;
          setLogs(data?.logs || []);
        }
        i++;
      }
      if (tab === "edge-fns") {
        if (results[i]?.status === "fulfilled") {
          const data = (
            results[i] as PromiseFulfilledResult<{ functions: EdgeFunction[] }>
          ).value;
          setEdgeFns(data?.functions || []);
        }
      }
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
    }
  }, [tab, period, logEnv, logLevel]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const loadIssueDetail = async (issueId: string) => {
    setSelectedIssue(issueId);
    setIssueDetail(null);
    try {
      const res = await fetch(`/api/admin/sentry/issue/${issueId}`);
      if (res.ok) setIssueDetail(await res.json());
    } catch {
      // ignore
    }
  };

  const TABS: { key: Tab; label: string }[] = [
    { key: "errors", label: `Errors (${sentry?.uniqueIssues24h ?? 0})` },
    { key: "analytics", label: "Analytics" },
    { key: "logs", label: "Logs" },
    { key: "edge-fns", label: `Edge Fns (${edgeFns.length})` },
  ];

  const maxDau =
    posthog?.dauTrend.reduce((m, d) => Math.max(m, d.users), 0) || 1;
  const levelBadge = (l: string): "red" | "amber" | "blue" | "gray" => {
    if (l === "error" || l === "fatal") return "red";
    if (l === "warning" || l === "warn") return "amber";
    if (l === "info") return "blue";
    return "gray";
  };

  return (
    <AdminShell>
      <PageHeader
        eyebrow="Engineering"
        title="DevTools"
        lastRefresh={lastRefresh}
        loading={loading}
        onRefresh={fetchData}
      />

      <StatStrip
        stats={[
          {
            label: "Errors (24h)",
            value: sentry?.totalErrors24h ?? "...",
            valueColor:
              (sentry?.totalErrors24h || 0) > 0 ? T.red : undefined,
          },
          {
            label: "Unique Issues",
            value: sentry?.uniqueIssues24h ?? "...",
          },
          {
            label: "Users Affected",
            value: sentry?.affectedUsers24h ?? "...",
          },
          {
            label: "DAU",
            value: posthog?.dauTrend?.length
              ? posthog.dauTrend[posthog.dauTrend.length - 1]?.users ?? "..."
              : "...",
            pill: { label: period, type: "blue" as const },
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

      {/* Errors tab */}
      {tab === "errors" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: selectedIssue ? "1fr 1.5fr" : "1fr",
            gap: 16,
          }}
        >
          <div>
            {(sentry?.topIssues || []).map((issue) => (
              <div
                key={issue.id}
                onClick={() => loadIssueDetail(issue.id)}
                style={{
                  padding: "14px 16px",
                  background:
                    selectedIssue === issue.id ? T.primaryLight : T.surface,
                  border: `1px solid ${selectedIssue === issue.id ? T.primary : T.border}`,
                  borderRadius: 10,
                  marginBottom: 8,
                  cursor: "pointer",
                  borderLeft: `3px solid ${SEV_COLORS[issue.level] || T.muted}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: 13,
                    fontWeight: 600,
                    color: T.ink,
                    marginBottom: 4,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {issue.title}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    fontSize: 11,
                    color: T.muted,
                  }}
                >
                  <span>{issue.count}x</span>
                  <span>{issue.userCount} users</span>
                  {issue.lastSeen && (
                    <span>Last: {timeAgo(issue.lastSeen)}</span>
                  )}
                </div>
              </div>
            ))}
            {(!sentry?.topIssues || sentry.topIssues.length === 0) && (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                  color: T.muted,
                  fontSize: 14,
                  background: T.surface,
                  borderRadius: 12,
                  border: `1px solid ${T.border}`,
                }}
              >
                No open errors
              </div>
            )}
          </div>

          {selectedIssue && (
            <div
              style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: 12,
                padding: "20px",
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              {!issueDetail ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: T.muted,
                  }}
                >
                  Loading...
                </div>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 16,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "'Courier New', monospace",
                          fontSize: 15,
                          fontWeight: 700,
                          color: T.ink,
                        }}
                      >
                        {issueDetail.issue.title}
                      </div>
                      {issueDetail.issue.culprit && (
                        <div
                          style={{
                            fontSize: 12,
                            color: T.muted,
                            marginTop: 4,
                          }}
                        >
                          {issueDetail.issue.culprit}
                        </div>
                      )}
                    </div>
                    <a
                      href={issueDetail.issue.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: "6px 12px",
                        background: T.surface,
                        border: `1px solid ${T.border}`,
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 600,
                        color: T.muted,
                        textDecoration: "none",
                        fontFamily: T.fontBody,
                        flexShrink: 0,
                      }}
                    >
                      Sentry
                    </a>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 16,
                      marginBottom: 16,
                      fontSize: 12,
                    }}
                  >
                    <span>
                      <strong>{issueDetail.issue.count}</strong> events
                    </span>
                    <span>
                      <strong>{issueDetail.issue.userCount}</strong> users
                    </span>
                    <span>First: {timeAgo(issueDetail.issue.firstSeen)}</span>
                    <span>Last: {timeAgo(issueDetail.issue.lastSeen)}</span>
                  </div>

                  {issueDetail.stacktrace.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          color: T.red,
                          marginBottom: 6,
                        }}
                      >
                        Stacktrace
                      </div>
                      <pre
                        style={{
                          background: "#1a1a1a",
                          color: "#e5e5e5",
                          padding: "14px 16px",
                          borderRadius: 8,
                          fontSize: 11,
                          lineHeight: 1.5,
                          overflow: "auto",
                          maxHeight: 300,
                          fontFamily: "'Courier New', monospace",
                        }}
                      >
                        {issueDetail.stacktrace.join("\n\n")}
                      </pre>
                    </div>
                  )}

                  {issueDetail.events.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          color: T.muted,
                          marginBottom: 6,
                        }}
                      >
                        Recent Events
                      </div>
                      {issueDetail.events.map((ev) => (
                        <div
                          key={ev.id}
                          style={{
                            display: "flex",
                            gap: 12,
                            padding: "6px 0",
                            borderBottom: `1px solid ${T.border}`,
                            fontSize: 12,
                          }}
                        >
                          <span style={{ color: T.muted }}>
                            {timeAgo(ev.date)}
                          </span>
                          {ev.user && (
                            <span style={{ color: T.ink }}>{ev.user}</span>
                          )}
                          {ev.browser && (
                            <span style={{ color: T.muted }}>{ev.browser}</span>
                          )}
                          {ev.url && (
                            <span
                              style={{
                                color: T.primary,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: 200,
                              }}
                            >
                              {ev.url}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {issueDetail.breadcrumbs.length > 0 && (
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          color: T.muted,
                          marginBottom: 6,
                        }}
                      >
                        Breadcrumbs
                      </div>
                      <div
                        style={{
                          maxHeight: 200,
                          overflowY: "auto",
                          background: T.bg,
                          borderRadius: 8,
                          padding: "8px 12px",
                        }}
                      >
                        {issueDetail.breadcrumbs.map((b, i) => (
                          <div
                            key={i}
                            style={{
                              fontSize: 11,
                              color: T.muted,
                              padding: "3px 0",
                              borderBottom:
                                i < issueDetail.breadcrumbs.length - 1
                                  ? `1px solid ${T.border}`
                                  : "none",
                            }}
                          >
                            <span
                              style={{
                                fontWeight: 600,
                                color: T.ink,
                                marginRight: 6,
                              }}
                            >
                              [{b.category || "?"}]
                            </span>
                            {b.message || "..."}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Analytics tab */}
      {tab === "analytics" && posthog && (
        <>
          {/* Period selector */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 12,
              justifyContent: "flex-end",
            }}
          >
            {["24h", "7d", "30d"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{
                  padding: "5px 12px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: T.fontBody,
                  border: `1px solid ${period === p ? T.primary : T.border}`,
                  background: period === p ? T.primary : T.surface,
                  color: period === p ? "white" : T.muted,
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* DAU sparkline */}
          {posthog.dauTrend && posthog.dauTrend.length > 1 && (
            <div
              style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: 12,
                padding: "16px 20px",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: T.muted,
                  marginBottom: 8,
                }}
              >
                Daily Active Users
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 2,
                  height: 60,
                }}
              >
                {posthog.dauTrend.map((d, i) => (
                  <div
                    key={i}
                    title={`${d.day}: ${d.users} users`}
                    style={{
                      flex: 1,
                      height: `${Math.max(4, (d.users / maxDau) * 100)}%`,
                      background: T.primary,
                      borderRadius: "3px 3px 0 0",
                      opacity: 0.7 + 0.3 * (i / posthog.dauTrend.length),
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 10,
                  color: T.muted,
                  marginTop: 4,
                }}
              >
                <span>{posthog.dauTrend[0]?.day}</span>
                <span>{posthog.dauTrend[posthog.dauTrend.length - 1]?.day}</span>
              </div>
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            <Card title="Feature Adoption">
              {posthog.featureAdoption.length === 0 ? (
                <div style={{ color: T.muted, fontSize: 13, padding: 8 }}>
                  No events
                </div>
              ) : (
                posthog.featureAdoption.slice(0, 12).map((f, i) => {
                  const maxCount = posthog.featureAdoption[0]?.count || 1;
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "6px 0",
                        borderBottom: `1px solid ${T.border}`,
                      }}
                    >
                      <div
                        style={{
                          width: 140,
                          fontSize: 12,
                          fontWeight: 600,
                          color: T.ink,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {f.event}
                      </div>
                      <div
                        style={{
                          flex: 1,
                          height: 16,
                          background: T.warm,
                          borderRadius: 3,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${(f.count / maxCount) * 100}%`,
                            background: T.primary,
                            opacity: 0.8,
                          }}
                        />
                      </div>
                      <div
                        style={{
                          width: 50,
                          textAlign: "right",
                          fontSize: 12,
                          fontWeight: 700,
                          color: T.ink,
                        }}
                      >
                        {f.count}
                      </div>
                    </div>
                  );
                })
              )}
            </Card>

            <Card title="Top Pages">
              {posthog.topPages.length === 0 ? (
                <div style={{ color: T.muted, fontSize: 13, padding: 8 }}>
                  No page data
                </div>
              ) : (
                posthog.topPages.slice(0, 12).map((p, i) => {
                  const maxViews = posthog.topPages[0]?.views || 1;
                  let pathname = "?";
                  try {
                    pathname = p.url ? new URL(p.url).pathname : "?";
                  } catch {
                    pathname = p.url || "?";
                  }
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "6px 0",
                        borderBottom: `1px solid ${T.border}`,
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          fontSize: 12,
                          color: T.ink,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {pathname}
                      </div>
                      <div
                        style={{
                          width: 120,
                          height: 14,
                          background: T.warm,
                          borderRadius: 3,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${(p.views / maxViews) * 100}%`,
                            background: T.blue,
                            opacity: 0.7,
                          }}
                        />
                      </div>
                      <div
                        style={{
                          width: 50,
                          textAlign: "right",
                          fontSize: 12,
                          fontWeight: 700,
                          color: T.ink,
                        }}
                      >
                        {p.views}
                      </div>
                    </div>
                  );
                })
              )}
            </Card>
          </div>
        </>
      )}

      {/* Logs tab */}
      {tab === "logs" && (
        <>
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 12,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {(["production", "preview"] as const).map((e) => (
              <button
                key={e}
                onClick={() => setLogEnv(e)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: T.fontBody,
                  border: `1px solid ${logEnv === e ? T.primary : T.border}`,
                  background: logEnv === e ? T.primary : T.surface,
                  color: logEnv === e ? "white" : T.ink,
                  textTransform: "capitalize",
                }}
              >
                {e}
              </button>
            ))}
            <div style={{ width: 12 }} />
            {(
              [
                { key: "" as const, label: "All" },
                { key: "error" as const, label: "Error" },
                { key: "warning" as const, label: "Warn" },
                { key: "info" as const, label: "Info" },
              ]
            ).map((f) => (
              <button
                key={f.key}
                onClick={() => setLogLevel(f.key)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: T.fontBody,
                  border: `1px solid ${logLevel === f.key ? T.ink : T.border}`,
                  background: logLevel === f.key ? T.ink : T.surface,
                  color: logLevel === f.key ? "white" : T.ink,
                }}
              >
                {f.label}
              </button>
            ))}
            <span
              style={{
                marginLeft: "auto",
                fontSize: 12,
                color: T.muted,
              }}
            >
              {logs.length} entries
            </span>
          </div>

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
                gridTemplateColumns: "140px 70px 100px 1fr",
                padding: "10px 16px",
                background: T.bg,
                borderBottom: `1px solid ${T.border}`,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: T.muted,
              }}
            >
              <div>Timestamp</div>
              <div>Level</div>
              <div>Source</div>
              <div>Message</div>
            </div>
            <div style={{ maxHeight: 600, overflowY: "auto" }}>
              {logs.length > 0 ? (
                logs.map((log, i) => (
                  <div
                    key={log.id || i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "140px 70px 100px 1fr",
                      padding: "8px 16px",
                      borderBottom: `1px solid ${T.border}`,
                      alignItems: "flex-start",
                      fontSize: 12,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: 11,
                        color: T.muted,
                      }}
                    >
                      {log.timestamp
                        ? new Date(log.timestamp).toLocaleTimeString()
                        : "..."}
                    </div>
                    <div>
                      <Badge
                        type={levelBadge(log.level)}
                        label={log.level || "info"}
                      />
                    </div>
                    <div style={{ fontSize: 11, color: T.muted }}>
                      {log.source || "..."}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: 11.5,
                        color: T.ink,
                        lineHeight: 1.5,
                        wordBreak: "break-all",
                      }}
                    >
                      {log.message}
                      {log.statusCode && (
                        <span
                          style={{
                            marginLeft: 8,
                            color:
                              log.statusCode >= 400 ? T.red : T.green,
                            fontWeight: 600,
                          }}
                        >
                          [{log.statusCode}]
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px 20px",
                    color: T.muted,
                    fontSize: 14,
                  }}
                >
                  {loading ? "Loading logs..." : "No log entries"}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Edge functions tab */}
      {tab === "edge-fns" && (
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
              gridTemplateColumns: "2fr 1fr 80px 100px 100px",
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
            <div>Function</div>
            <div>Status</div>
            <div>Version</div>
            <div>Created</div>
            <div>Updated</div>
          </div>
          {edgeFns.length > 0 ? (
            edgeFns.map((fn) => (
              <div
                key={fn.id || fn.slug}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 80px 100px 100px",
                  padding: "12px 20px",
                  borderBottom: `1px solid ${T.border}`,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background:
                        fn.status === "active"
                          ? T.green
                          : fn.status === "error"
                            ? T.red
                            : T.muted,
                      flexShrink: 0,
                    }}
                  />
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: T.ink,
                      fontFamily: "'Courier New', monospace",
                    }}
                  >
                    {fn.name || fn.slug}
                  </div>
                </div>
                <div>
                  <Badge
                    type={
                      fn.status === "active"
                        ? "green"
                        : fn.status === "error"
                          ? "red"
                          : "gray"
                    }
                    label={fn.status || "unknown"}
                  />
                </div>
                <div style={{ fontSize: 12, color: T.muted }}>
                  v{fn.version}
                </div>
                <div style={{ fontSize: 12, color: T.muted }}>
                  {fn.created_at ? timeAgo(fn.created_at) : "..."}
                </div>
                <div style={{ fontSize: 12, color: T.muted }}>
                  {fn.updated_at ? timeAgo(fn.updated_at) : "..."}
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "40px 20px",
                color: T.muted,
                fontSize: 14,
              }}
            >
              {loading ? "Loading..." : "No edge functions"}
            </div>
          )}
        </div>
      )}
    </AdminShell>
  );
}
