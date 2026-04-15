"use client";

import { T } from "../_lib/tokens";

type BadgeType = "fatal" | "warning" | "info" | "green" | "amber" | "red" | "blue" | "gray" | "accent" | "solo" | "team";

const BADGE_STYLES: Record<BadgeType, { bg: string; color: string }> = {
  fatal: { bg: "rgba(239,68,68,0.1)", color: "#dc2626" },
  warning: { bg: "rgba(245,158,11,0.1)", color: "#d97706" },
  info: { bg: "rgba(26,107,240,0.1)", color: T.blue },
  green: { bg: "rgba(34,197,94,0.1)", color: "#16a34a" },
  amber: { bg: "rgba(245,158,11,0.1)", color: "#d97706" },
  red: { bg: "rgba(239,68,68,0.1)", color: "#dc2626" },
  blue: { bg: "rgba(26,107,240,0.1)", color: T.blue },
  gray: { bg: T.warm, color: T.muted },
  accent: { bg: T.primaryLight, color: T.primary },
  solo: { bg: T.warm, color: T.muted },
  team: { bg: T.sidebar, color: T.sidebarTextActive },
};

export default function Badge({ type, label }: { type: BadgeType; label: string }) {
  const s = BADGE_STYLES[type] || BADGE_STYLES.gray;
  return (
    <span style={{
      display: "inline-block",
      background: s.bg,
      color: s.color,
      fontSize: 11,
      fontWeight: 700,
      padding: "3px 8px",
      borderRadius: 4,
      whiteSpace: "nowrap",
      letterSpacing: "0.03em",
      fontFamily: T.fontBody,
    }}>
      {label}
    </span>
  );
}
