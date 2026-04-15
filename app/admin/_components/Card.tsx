"use client";

import { T } from "../_lib/tokens";

export default function Card({
  title,
  count,
  countType,
  actions,
  children,
}: {
  title?: string;
  count?: string;
  countType?: "red" | "amber" | "blue" | "gray";
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const countColors: Record<string, { bg: string; color: string }> = {
    red: { bg: "rgba(239,68,68,0.1)", color: "#dc2626" },
    amber: { bg: "rgba(245,158,11,0.1)", color: "#d97706" },
    blue: { bg: "rgba(26,107,240,0.1)", color: T.blue },
    gray: { bg: T.warm, color: T.muted },
  };

  return (
    <div style={{
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 12,
      marginBottom: 12,
    }}>
      {(title || actions) && (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px 12px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {title && (
              <div style={{
                fontFamily: T.fontHeading,
                fontSize: 18,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: T.ink,
              }}>
                {title}
              </div>
            )}
            {count && (
              <span style={{
                background: countColors[countType || "gray"]?.bg || T.warm,
                color: countColors[countType || "gray"]?.color || T.muted,
                fontSize: 11,
                fontWeight: 700,
                padding: "3px 9px",
                borderRadius: 20,
              }}>
                {count}
              </span>
            )}
          </div>
          {actions && <div style={{ display: "flex", gap: 8 }}>{actions}</div>}
        </div>
      )}
      <div style={{ padding: title ? "0 20px 16px" : "20px" }}>
        {children}
      </div>
    </div>
  );
}
