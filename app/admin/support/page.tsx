"use client";

import { useState, useEffect, useCallback } from "react";
import AdminShell from "../_components/AdminShell";
import PageHeader from "../_components/PageHeader";
import StatStrip from "../_components/StatStrip";
import SupportTicket from "../_components/SupportTicket";
import { showToast } from "../_lib/toast";
import { T } from "../_lib/tokens";
import type { SupportData } from "../_lib/types";

export default function SupportPage() {
  const [support, setSupport] = useState<SupportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [resolved, setResolved] = useState<Set<string>>(new Set());
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/support");
      if (res.ok) setSupport(await res.json());
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleResolve = async (messageId: string) => {
    try {
      await fetch("/api/admin/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "resolve", messageId }),
      });
      setResolved(prev => new Set(prev).add(messageId));
      showToast("Ticket resolved ✓");
    } catch {
      showToast("Failed to resolve ticket");
    }
  };

  const handleEscalate = async (messageId: string) => {
    try {
      await fetch("/api/admin/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "escalate", messageId }),
      });
      showToast("Flagged as escalated — starred in Gmail");
    } catch {
      showToast("Failed to escalate");
    }
  };

  const visibleEmails = (support?.emails || []).filter(e => !resolved.has(e.id));
  const unreadCount = visibleEmails.filter(e => e.unread).length;

  return (
    <AdminShell badges={support?.unreadCount ? { Support: { count: support.unreadCount, color: T.amber } } : undefined}>
      <PageHeader
        eyebrow="Command"
        title="Support"
        lastRefresh={lastRefresh}
        loading={loading}
        onRefresh={fetchData}
      />

      <StatStrip stats={[
        { label: "Total in Queue", value: visibleEmails.length },
        { label: "Unread", value: unreadCount, valueColor: unreadCount > 0 ? T.amber : undefined },
        { label: "Resolved Today", value: resolved.size, pill: resolved.size > 0 ? { label: "✓", type: "green" } : undefined },
      ]} />

      <div style={{ display: "flex", gap: 8, marginBottom: 20, justifyContent: "flex-end" }}>
        <a
          href="https://mail.google.com/mail/u/3/#inbox"
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
          Open Gmail
        </a>
      </div>

      {support?.configured === false ? (
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          color: T.muted,
          fontSize: 14,
          background: T.surface,
          borderRadius: 12,
          border: `1px solid ${T.border}`,
        }}>
          Gmail not configured — set GMAIL_REFRESH_TOKEN in Vercel env vars
        </div>
      ) : visibleEmails.length > 0 ? (
        visibleEmails.map(email => (
          <SupportTicket
            key={email.id}
            email={email}
            onResolve={handleResolve}
            onEscalate={handleEscalate}
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
          No support emails in queue
        </div>
      )}
    </AdminShell>
  );
}
