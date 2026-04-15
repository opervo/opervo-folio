"use client";

import { T } from "../_lib/tokens";

interface StatItem {
  label: string;
  value: string | number;
  valueColor?: string;
  pill?: { label: string; type: "green" | "red" | "amber" | "blue" };
  sub?: string;
}

const PILL_STYLES = {
  green: { bg: "rgba(34,197,94,0.1)", color: "#16a34a" },
  red: { bg: "rgba(239,68,68,0.1)", color: "#dc2626" },
  amber: { bg: "rgba(245,158,11,0.1)", color: "#d97706" },
  blue: { bg: "rgba(26,107,240,0.1)", color: T.blue },
};

export default function StatStrip({ stats }: { stats: StatItem[] }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
      gap: 16,
      marginBottom: 32,
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 12,
          padding: "20px 22px",
        }}>
          <div style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: T.muted,
            marginBottom: 8,
            fontFamily: T.fontBody,
          }}>
            {s.label}
          </div>
          <div style={{
            fontFamily: T.fontHeading,
            fontSize: 36,
            fontWeight: 900,
            color: s.valueColor || T.ink,
            lineHeight: 1,
          }}>
            {s.value}
          </div>
          {s.sub && (
            <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>
              {s.sub}
            </div>
          )}
          {s.pill && (
            <span style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: 20,
              marginTop: 6,
              background: PILL_STYLES[s.pill.type].bg,
              color: PILL_STYLES[s.pill.type].color,
            }}>
              {s.pill.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
