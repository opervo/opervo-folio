"use client";

import { T } from "../_lib/tokens";
import type { SupabaseUser } from "../_lib/types";
import { initials, formatDate } from "../_lib/formatters";

function Check({ done, stalled }: { done: boolean; stalled?: boolean }) {
  if (done) return <span style={{ color: T.green, fontSize: 16 }}>✓</span>;
  if (stalled) return <span style={{ color: T.amber, fontSize: 16 }}>○</span>;
  return <span style={{ color: T.border, fontSize: 16 }}>○</span>;
}

export default function OnboardingRow({
  user,
  onNudge,
}: {
  user: SupabaseUser;
  onNudge?: (userId: string) => void;
}) {
  const ob = user.onboarding || { hasProfile: false, hasFirstJob: false, hasSentInvoice: false, hasCalendar: false, stalledDays: 0 };
  const steps = [ob.hasProfile, ob.hasFirstJob, ob.hasSentInvoice, ob.hasCalendar];
  const completed = steps.filter(Boolean).length;
  const total = steps.length;
  const pct = Math.round((completed / total) * 100);
  const isStalled = ob.stalledDays >= 3 && completed < total;

  const avatarColors = [T.primary, T.blue, T.amber, T.green, "#8b5cf6"];
  const colorIdx = user.email.charCodeAt(0) % avatarColors.length;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr repeat(4, 1fr) 1fr 100px",
      gap: 0,
      padding: "14px 20px",
      borderBottom: `1px solid ${T.border}`,
      alignItems: "center",
      background: isStalled ? "rgba(245,158,11,0.04)" : "transparent",
    }}>
      {/* User */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: T.fontHeading,
          fontWeight: 900,
          fontSize: 13,
          flexShrink: 0,
          color: "white",
          background: avatarColors[colorIdx],
        }}>
          {initials(user.first_name || user.business_name, user.email)}
        </div>
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: T.ink }}>
            {user.business_name || user.first_name || user.email.split("@")[0]}
            {isStalled && (
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 7px",
                background: "rgba(245,158,11,0.1)",
                color: "#d97706",
                borderRadius: 4,
                marginLeft: 6,
              }}>
                ⚠ Stalled
              </span>
            )}
          </div>
          <div style={{ fontSize: 11, color: T.muted }}>{user.email}</div>
        </div>
      </div>

      {/* Plan */}
      <div>
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          padding: "3px 8px",
          borderRadius: 4,
          background: user.plan === "team" || user.plan === "active" ? T.sidebar : T.warm,
          color: user.plan === "team" || user.plan === "active" ? T.sidebarTextActive : T.muted,
        }}>
          {user.plan === "team" ? "Team" : "Solo"}
        </span>
      </div>

      {/* Joined */}
      <div style={{ fontSize: 12, color: T.muted }}>
        {formatDate(user.created_at)}
      </div>

      {/* 4 check columns */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Check done={ob.hasProfile} stalled={isStalled && !ob.hasProfile} />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Check done={ob.hasFirstJob} stalled={isStalled && !ob.hasFirstJob} />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Check done={ob.hasSentInvoice} stalled={isStalled && !ob.hasSentInvoice} />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Check done={ob.hasCalendar} stalled={isStalled && !ob.hasCalendar} />
      </div>

      {/* Progress */}
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <div style={{ height: 5, background: T.border, borderRadius: 3, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            borderRadius: 3,
            background: isStalled ? T.amber : T.green,
            width: `${pct}%`,
          }} />
        </div>
        <div style={{ fontSize: 10, color: T.muted }}>{completed} / {total}</div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
        {isStalled && onNudge && (
          <button onClick={() => onNudge(user.id)} style={{
            padding: "5px 11px",
            background: T.primaryLight,
            color: T.primary,
            border: `1px solid rgba(245,98,15,0.2)`,
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: T.fontBody,
            whiteSpace: "nowrap",
          }}>
            Nudge
          </button>
        )}
      </div>
    </div>
  );
}
