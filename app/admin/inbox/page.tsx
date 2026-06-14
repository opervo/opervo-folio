"use client";

import { useState, useEffect, useCallback } from "react";
import AdminShell from "../_components/AdminShell";
import PageHeader from "../_components/PageHeader";
import StatStrip from "../_components/StatStrip";
import { showToast } from "../_lib/toast";
import { T } from "../_lib/tokens";
import { timeAgo, initials } from "../_lib/formatters";
import type { GmailThread, GmailThreadDetail } from "../_lib/types";

export default function InboxPage() {
  const [threads, setThreads] = useState<GmailThread[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  // Thread detail
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [threadDetail, setThreadDetail] = useState<GmailThreadDetail | null>(
    null
  );
  const [threadLoading, setThreadLoading] = useState(false);

  // Reply
  const [replyBody, setReplyBody] = useState("");
  const [sending, setSending] = useState(false);

  // Actions
  const [resolved, setResolved] = useState<Set<string>>(new Set());

  const fetchThreads = useCallback(async (q?: string) => {
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      if (q) qs.set("q", q);
      const res = await fetch(`/api/admin/gmail/search?${qs.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setThreads(data.threads || []);
        setTotal(data.total || 0);
      }
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  const handleSearch = () => {
    setActiveSearch(search);
    fetchThreads(search || undefined);
  };

  const loadThread = async (threadId: string) => {
    setSelectedThread(threadId);
    setThreadDetail(null);
    setReplyBody("");
    setThreadLoading(true);
    try {
      const res = await fetch(`/api/admin/gmail/thread/${threadId}`);
      if (res.ok) setThreadDetail(await res.json());
    } finally {
      setThreadLoading(false);
    }
  };

  const handleReply = async () => {
    if (!threadDetail || !replyBody.trim()) return;
    const lastMsg = threadDetail.messages[threadDetail.messages.length - 1];
    if (!lastMsg) return;

    setSending(true);
    try {
      const res = await fetch("/api/admin/gmail/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: lastMsg.from,
          subject: lastMsg.subject.startsWith("Re:")
            ? lastMsg.subject
            : `Re: ${lastMsg.subject}`,
          body: replyBody,
          threadId: threadDetail.threadId,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        showToast("Reply sent");
        setReplyBody("");
        loadThread(threadDetail.threadId);
      } else {
        showToast(`Failed: ${data.error}`);
      }
    } catch {
      showToast("Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  const handleResolve = async (threadId: string) => {
    // Archive by removing INBOX label on first message
    try {
      await fetch("/api/admin/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "resolve", messageId: threadId }),
      });
      setResolved((prev) => new Set(prev).add(threadId));
      if (selectedThread === threadId) {
        setSelectedThread(null);
        setThreadDetail(null);
      }
      showToast("Thread archived");
    } catch {
      showToast("Failed to archive");
    }
  };

  const handleEscalate = async (threadId: string) => {
    try {
      await fetch("/api/admin/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "escalate", messageId: threadId }),
      });
      showToast("Starred in Gmail");
    } catch {
      showToast("Failed to escalate");
    }
  };

  const visibleThreads = threads.filter((t) => !resolved.has(t.id));
  const unreadCount = visibleThreads.filter((t) => t.unread).length;

  return (
    <AdminShell
      badges={
        unreadCount > 0
          ? { Inbox: { count: unreadCount, color: T.amber } }
          : undefined
      }
    >
      <PageHeader
        eyebrow="Command"
        title="Inbox"
        lastRefresh={lastRefresh}
        loading={loading}
        onRefresh={() => fetchThreads(activeSearch || undefined)}
      />

      <StatStrip
        stats={[
          { label: "Threads", value: visibleThreads.length },
          {
            label: "Unread",
            value: unreadCount,
            valueColor: unreadCount > 0 ? T.amber : undefined,
          },
          { label: "Total Matched", value: total },
          {
            label: "Resolved",
            value: resolved.size,
            pill:
              resolved.size > 0
                ? { label: "archived", type: "green" as const }
                : undefined,
          },
        ]}
      />

      {/* Search bar */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <input
          type="text"
          placeholder="Search emails... (Gmail syntax: from:, subject:, has:attachment)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          style={{
            flex: 1,
            padding: "10px 16px",
            borderRadius: 8,
            border: `1px solid ${T.border}`,
            fontSize: 13,
            fontFamily: T.fontBody,
            background: T.surface,
            color: T.ink,
            outline: "none",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            background: T.primary,
            color: "white",
            border: "none",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: T.fontBody,
          }}
        >
          Search
        </button>
        {activeSearch && (
          <button
            onClick={() => {
              setSearch("");
              setActiveSearch("");
              fetchThreads();
            }}
            style={{
              padding: "10px 14px",
              background: T.surface,
              color: T.muted,
              border: `1px solid ${T.border}`,
              borderRadius: 8,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: T.fontBody,
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Split view: thread list + detail */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: selectedThread ? "380px 1fr" : "1fr",
          gap: 16,
          minHeight: 500,
        }}
      >
        {/* Thread list */}
        <div
          style={{
            background: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {visibleThreads.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: T.muted,
                fontSize: 14,
              }}
            >
              No emails found
            </div>
          ) : (
            visibleThreads.map((t) => (
              <div
                key={t.id}
                onClick={() => loadThread(t.id)}
                style={{
                  padding: "14px 16px",
                  borderBottom: `1px solid ${T.border}`,
                  cursor: "pointer",
                  background:
                    selectedThread === t.id
                      ? T.primaryLight
                      : t.unread
                        ? "rgba(245,158,11,0.04)"
                        : "transparent",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 4,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 7,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: T.fontHeading,
                      fontWeight: 900,
                      fontSize: 11,
                      color: "white",
                      background: t.unread ? T.primary : T.muted,
                      flexShrink: 0,
                    }}
                  >
                    {initials(t.from)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: t.unread ? 700 : 500,
                        color: T.ink,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t.from}
                      {t.messageCount > 1 && (
                        <span
                          style={{
                            fontSize: 10,
                            color: T.muted,
                            marginLeft: 6,
                          }}
                        >
                          ({t.messageCount})
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      color: T.muted,
                      flexShrink: 0,
                    }}
                  >
                    {t.date ? timeAgo(t.date) : ""}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    fontWeight: t.unread ? 600 : 400,
                    color: T.ink,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginLeft: 38,
                  }}
                >
                  {t.subject}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: T.muted,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginLeft: 38,
                    marginTop: 2,
                  }}
                >
                  {t.snippet}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Thread detail */}
        {selectedThread && (
          <div
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              display: "flex",
              flexDirection: "column",
              maxHeight: "80vh",
            }}
          >
            {threadLoading ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px",
                  color: T.muted,
                }}
              >
                Loading thread...
              </div>
            ) : threadDetail ? (
              <>
                {/* Thread header */}
                <div
                  style={{
                    padding: "16px 20px",
                    borderBottom: `1px solid ${T.border}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: T.ink,
                        fontFamily: T.fontHeading,
                      }}
                    >
                      {threadDetail.messages[0]?.subject || "(no subject)"}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: T.muted,
                        marginTop: 2,
                      }}
                    >
                      {threadDetail.messages.length} message
                      {threadDetail.messages.length !== 1 ? "s" : ""}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() => handleEscalate(selectedThread)}
                      style={{
                        padding: "6px 12px",
                        background: T.surface,
                        color: T.primary,
                        border: `1px solid rgba(245,98,15,0.3)`,
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: T.fontBody,
                      }}
                    >
                      Star
                    </button>
                    <button
                      onClick={() => handleResolve(selectedThread)}
                      style={{
                        padding: "6px 12px",
                        background: T.surface,
                        color: T.green,
                        border: `1px solid rgba(34,197,94,0.3)`,
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: T.fontBody,
                      }}
                    >
                      Archive
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "0 20px",
                  }}
                >
                  {threadDetail.messages.map((msg, i) => {
                    const fromName = msg.from
                      .replace(/<[^>]+>/g, "")
                      .trim();
                    return (
                      <div
                        key={msg.id}
                        style={{
                          padding: "16px 0",
                          borderBottom:
                            i < threadDetail.messages.length - 1
                              ? `1px solid ${T.border}`
                              : "none",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 10,
                          }}
                        >
                          <div>
                            <span
                              style={{
                                fontSize: 13,
                                fontWeight: 700,
                                color: T.ink,
                              }}
                            >
                              {fromName}
                            </span>
                            <span
                              style={{
                                fontSize: 11,
                                color: T.muted,
                                marginLeft: 8,
                              }}
                            >
                              to {msg.to.replace(/<[^>]+>/g, "").trim()}
                            </span>
                          </div>
                          <span
                            style={{
                              fontSize: 11,
                              color: T.muted,
                            }}
                          >
                            {msg.date
                              ? timeAgo(new Date(msg.date).toISOString())
                              : ""}
                          </span>
                        </div>

                        {/* Email body.
                            HTML emails are rendered inside a sandboxed iframe
                            (no scripts, no forms, no top-nav, no plugins) so a
                            malicious email body can't steal the admin session.
                            Was: dangerouslySetInnerHTML directly, XSS surface
                            because Gmail bodies are externally controlled. */}
                        {msg.body.includes("<") ? (
                          <iframe
                            sandbox=""
                            srcDoc={`<!doctype html><html><head><meta charset="utf-8"><base target="_blank"></head><body style="margin:0;padding:12px 16px;font:13px/1.6 -apple-system,system-ui,sans-serif;color:${T.ink};background:${T.bg};">${msg.body}</body></html>`}
                            style={{
                              width: "100%",
                              maxHeight: 400,
                              minHeight: 200,
                              borderRadius: 8,
                              border: `1px solid ${T.border}`,
                              background: T.bg,
                            }}
                            title="Email body"
                          />
                        ) : (
                          <div
                            style={{
                              fontSize: 13,
                              lineHeight: 1.6,
                              color: T.ink,
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {msg.body}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Reply box */}
                <div
                  style={{
                    padding: "16px 20px",
                    borderTop: `1px solid ${T.border}`,
                    background: T.bg,
                  }}
                >
                  <textarea
                    value={replyBody}
                    onChange={(e) => setReplyBody(e.target.value)}
                    placeholder="Type your reply..."
                    style={{
                      width: "100%",
                      minHeight: 80,
                      padding: "10px 14px",
                      borderRadius: 8,
                      border: `1px solid ${T.border}`,
                      fontSize: 13,
                      fontFamily: T.fontBody,
                      background: T.surface,
                      color: T.ink,
                      resize: "vertical",
                      outline: "none",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 8,
                      marginTop: 8,
                    }}
                  >
                    <button
                      onClick={handleReply}
                      disabled={!replyBody.trim() || sending}
                      style={{
                        padding: "8px 20px",
                        background:
                          replyBody.trim() && !sending
                            ? T.primary
                            : T.muted,
                        color: "white",
                        border: "none",
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor:
                          replyBody.trim() && !sending
                            ? "pointer"
                            : "not-allowed",
                        fontFamily: T.fontBody,
                      }}
                    >
                      {sending ? "Sending..." : "Send Reply"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px",
                  color: T.muted,
                }}
              >
                Failed to load thread
              </div>
            )}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
