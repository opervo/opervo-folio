"use client";

import { useState } from "react";
import { T } from "../_lib/tokens";
import { api } from "../_lib/api";
import type { SupportEmail } from "../_lib/types";
import { timeAgo, initials } from "../_lib/formatters";

export default function SupportTicket({
  email,
  onResolve,
  onEscalate,
}: {
  email: SupportEmail;
  onResolve?: (id: string) => void;
  onEscalate?: (id: string) => void;
}) {
  const [drafting, setDrafting] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);
  const [showDraft, setShowDraft] = useState(false);

  const fromName = email.from.replace(/<[^>]+>/g, "").trim() || email.from;
  const fromInitial = initials(fromName);

  const handleDraft = async () => {
    if (draft) {
      setShowDraft(!showDraft);
      return;
    }
    setDrafting(true);
    setShowDraft(true);
    try {
      const result = await api.draftReply(email.from, email.subject, email.snippet);
      setDraft(result.draft);
    } catch {
      setDraft("Failed to generate draft — check ANTHROPIC_API_KEY.");
    } finally {
      setDrafting(false);
    }
  };

  return (
    <div style={{
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 12,
      marginBottom: 10,
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "16px 20px",
      }}>
        <div style={{
          width: 36,
          height: 36,
          background: T.warm,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: T.fontHeading,
          fontWeight: 900,
          fontSize: 15,
          color: T.muted,
          flexShrink: 0,
        }}>
          {fromInitial}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: T.ink }}>
            {fromName}
            {email.unread && (
              <span style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: T.primary,
                marginLeft: 8,
                verticalAlign: "middle",
              }} />
            )}
          </div>
          <div style={{ fontSize: 12.5, color: T.muted, marginTop: 1 }}>{email.subject}</div>
        </div>
        <div style={{ fontSize: 11.5, color: T.muted, flexShrink: 0 }}>
          {timeAgo(email.date)}
        </div>
      </div>

      {/* Snippet / AI summary */}
      {email.snippet && (
        <div style={{
          margin: "0 20px",
          padding: "10px 14px",
          background: T.bg,
          border: `1px solid ${T.border}`,
          borderRadius: 8,
          fontSize: 13,
          color: T.ink,
          lineHeight: 1.5,
          display: "flex",
          gap: 8,
        }}>
          <span style={{ color: T.blue, fontSize: 14, flexShrink: 0, marginTop: 1 }}>⚡</span>
          <span>{email.snippet}</span>
        </div>
      )}

      {/* Draft panel */}
      {showDraft && (
        <div style={{
          margin: "10px 20px 0",
          padding: "12px 14px",
          background: "rgba(26,107,240,0.04)",
          border: "1px solid rgba(26,107,240,0.15)",
          borderRadius: 8,
          fontSize: 13,
          color: T.ink,
          lineHeight: 1.55,
        }}>
          <div style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: T.blue,
            marginBottom: 6,
          }}>
            {drafting ? "Drafting..." : "Claude Draft Reply"}
          </div>
          {draft && <div>{draft}</div>}
        </div>
      )}

      {/* Actions */}
      <div style={{ padding: "12px 20px 14px", display: "flex", gap: 8 }}>
        <button onClick={handleDraft} disabled={drafting} style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "7px 14px",
          background: T.blue,
          color: "white",
          border: "none",
          borderRadius: 7,
          fontSize: 12,
          fontWeight: 600,
          cursor: drafting ? "wait" : "pointer",
          fontFamily: T.fontBody,
        }}>
          {drafting ? "..." : "✦ Draft Reply"}
        </button>
        {onEscalate && (
          <button onClick={() => onEscalate(email.id)} style={{
            padding: "7px 14px",
            background: T.surface,
            color: T.primary,
            border: `1px solid rgba(245,98,15,0.35)`,
            borderRadius: 7,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: T.fontBody,
          }}>
            ↑ Escalate
          </button>
        )}
        <a href={email.gmailUrl} target="_blank" rel="noopener noreferrer" style={{
          padding: "7px 14px",
          background: T.surface,
          color: T.muted,
          border: `1px solid ${T.border}`,
          borderRadius: 7,
          fontSize: 12,
          fontWeight: 600,
          textDecoration: "none",
          fontFamily: T.fontBody,
        }}>
          Open in Gmail
        </a>
        {onResolve && (
          <button onClick={() => onResolve(email.id)} style={{
            marginLeft: "auto",
            padding: "7px 14px",
            background: "transparent",
            color: T.green,
            border: `1px solid rgba(34,197,94,0.3)`,
            borderRadius: 7,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: T.fontBody,
          }}>
            ✓ Resolve
          </button>
        )}
      </div>
    </div>
  );
}
