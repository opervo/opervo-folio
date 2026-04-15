"use client";

import { useState } from "react";
import { T } from "../_lib/tokens";
import { api } from "../_lib/api";
import type { SentryIssue } from "../_lib/types";
import { timeAgo } from "../_lib/formatters";

const SEV_MAP: Record<string, { label: string; borderColor: string; badgeBg: string; badgeColor: string }> = {
  fatal: { label: "FATAL", borderColor: T.red, badgeBg: "rgba(239,68,68,0.1)", badgeColor: "#dc2626" },
  error: { label: "ERROR", borderColor: T.red, badgeBg: "rgba(239,68,68,0.1)", badgeColor: "#dc2626" },
  warning: { label: "WARNING", borderColor: T.amber, badgeBg: "rgba(245,158,11,0.1)", badgeColor: "#d97706" },
  info: { label: "INFO", borderColor: T.blue, badgeBg: "rgba(26,107,240,0.1)", badgeColor: T.blue },
  default: { label: "INFO", borderColor: T.blue, badgeBg: "rgba(26,107,240,0.1)", badgeColor: T.blue },
};

export default function ErrorCard({
  issue,
  onDismiss,
}: {
  issue: SentryIssue;
  onDismiss?: (id: string) => void;
}) {
  const [diagnosing, setDiagnosing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<{ diagnosis: string; suggestedFix: string } | null>(null);
  const [showDiag, setShowDiag] = useState(false);

  const sev = SEV_MAP[issue.level] || SEV_MAP.default;

  const handleDiagnose = async () => {
    if (diagnosis) {
      setShowDiag(!showDiag);
      return;
    }
    setDiagnosing(true);
    setShowDiag(true);
    try {
      const result = await api.diagnose(
        issue.title,
        `Level: ${issue.level}, Occurrences: ${issue.count}, Users affected: ${issue.userCount}, Permalink: ${issue.permalink}`
      );
      setDiagnosis(result);
    } catch {
      setDiagnosis({ diagnosis: "Failed to diagnose — check ANTHROPIC_API_KEY.", suggestedFix: "" });
    } finally {
      setDiagnosing(false);
    }
  };

  const handleCopy = () => {
    const text = diagnosis
      ? `Error: ${issue.title}\nLevel: ${issue.level}\nOccurrences: ${issue.count}\nUsers: ${issue.userCount}\n\nDiagnosis: ${diagnosis.diagnosis}\n\nFix: ${diagnosis.suggestedFix}`
      : `Error: ${issue.title}\nLevel: ${issue.level}\nOccurrences: ${issue.count}\nUsers: ${issue.userCount}\nPermalink: ${issue.permalink}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div style={{
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderLeft: `3px solid ${sev.borderColor}`,
      borderRadius: 12,
      marginBottom: 12,
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "18px 20px 14px" }}>
        <span style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          padding: "3px 8px",
          borderRadius: 4,
          flexShrink: 0,
          marginTop: 2,
          background: sev.badgeBg,
          color: sev.badgeColor,
        }}>
          {sev.label}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 14,
            fontWeight: 600,
            color: T.ink,
            marginBottom: 3,
          }}>
            {issue.title}
          </div>
          <div style={{ fontSize: 12, color: T.muted, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <span>🔁 {issue.count} occurrences</span>
            <span>👤 {issue.userCount} users</span>
            {issue.firstSeen && <span>🕐 First: {timeAgo(issue.firstSeen)}</span>}
            {issue.lastSeen && <span>Last: {timeAgo(issue.lastSeen)}</span>}
          </div>
        </div>
      </div>

      {/* Diagnosis panel */}
      {showDiag && (
        <div style={{
          margin: "0 20px 14px",
          padding: "12px 14px",
          background: T.bg,
          border: `1px solid ${T.border}`,
          borderRadius: 8,
        }}>
          <div style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: T.primary,
            marginBottom: 6,
          }}>
            {diagnosing ? "Diagnosing..." : "Claude Diagnosis"}
          </div>
          {diagnosis && (
            <>
              <div style={{ color: T.ink, fontSize: 13, lineHeight: 1.55 }}>
                {diagnosis.diagnosis}
              </div>
              {diagnosis.suggestedFix && (
                <div style={{
                  marginTop: 8,
                  paddingTop: 8,
                  borderTop: `1px solid ${T.border}`,
                  fontSize: 12,
                  color: T.muted,
                }}>
                  <strong style={{ color: T.ink }}>Fix:</strong> {diagnosis.suggestedFix}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Actions */}
      <div style={{ padding: "0 20px 16px", display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={handleDiagnose} disabled={diagnosing} style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "7px 14px",
          background: T.primary,
          color: "white",
          border: "none",
          borderRadius: 7,
          fontSize: 12,
          fontWeight: 600,
          cursor: diagnosing ? "wait" : "pointer",
          fontFamily: T.fontBody,
          boxShadow: `0 3px 10px ${T.primaryGlow}`,
        }}>
          {diagnosing ? "..." : "⚡ Diagnose"}
        </button>
        <button onClick={handleCopy} style={{
          padding: "7px 14px",
          background: T.surface,
          color: T.ink,
          border: `1px solid ${T.border}`,
          borderRadius: 7,
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: T.fontBody,
        }}>
          Copy for Claude Code
        </button>
        {issue.permalink && (
          <a href={issue.permalink} target="_blank" rel="noopener noreferrer" style={{
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
            View in Sentry
          </a>
        )}
        {onDismiss && (
          <button onClick={() => onDismiss(issue.id)} style={{
            marginLeft: "auto",
            padding: "7px 14px",
            background: "transparent",
            color: T.muted,
            border: "1px solid transparent",
            borderRadius: 7,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: T.fontBody,
          }}>
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}
