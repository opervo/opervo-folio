"use client";

import { T } from "../_lib/tokens";

export default function RefreshButton({
  lastRefresh,
  loading,
  onRefresh,
}: {
  lastRefresh: Date | null;
  loading: boolean;
  onRefresh: () => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {lastRefresh && (
        <div style={{ fontSize: 12, color: T.muted, fontWeight: 500 }}>
          Last synced: {lastRefresh.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
        </div>
      )}
      <button
        onClick={onRefresh}
        disabled={loading}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 14px",
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 600,
          color: T.ink,
          cursor: loading ? "wait" : "pointer",
          fontFamily: T.fontBody,
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "..." : "↻ Refresh"}
      </button>
    </div>
  );
}
