"use client";

import { usePathname, useRouter } from "next/navigation";
import { T } from "../_lib/tokens";

interface NavItem {
  label: string;
  path: string;
  icon: string;
  badge?: { count: number; color?: string };
}

const NAV_SECTIONS: { label: string; items: NavItem[] }[] = [
  {
    label: "Command",
    items: [
      { label: "Overview", path: "/admin", icon: "⬡" },
      { label: "Errors", path: "/admin/errors", icon: "⚠" },
      { label: "Support", path: "/admin/support", icon: "✉" },
      { label: "Onboarding", path: "/admin/onboarding", icon: "◎" },
    ],
  },
  {
    label: "Business",
    items: [
      { label: "Subscribers", path: "/admin/subscribers", icon: "◈" },
      { label: "Revenue", path: "/admin/revenue", icon: "$" },
      { label: "Churn Risk", path: "/admin/churn", icon: "↑" },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Edge Functions", path: "/admin/edge-functions", icon: "▷" },
      { label: "Logs", path: "/admin/logs", icon: "≡" },
    ],
  },
];

export default function Sidebar({
  badges,
}: {
  badges?: Record<string, { count: number; color?: string }>;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    if (path === "/admin") return pathname === "/admin";
    return pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside style={{
      width: 220,
      background: T.sidebar,
      display: "flex",
      flexDirection: "column",
      padding: "28px 0 24px",
      flexShrink: 0,
      position: "fixed",
      top: 0,
      left: 0,
      bottom: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ padding: "0 24px 32px" }}>
        <div style={{
          fontFamily: T.fontHeading,
          fontWeight: 900,
          fontSize: 22,
          letterSpacing: "-0.5px",
          color: T.sidebarTextActive,
        }}>
          Opervo<span style={{ color: T.primary }}>.</span>
        </div>
        <div style={{
          fontFamily: T.fontBody,
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "#444",
          marginTop: 2,
        }}>
          Corporate
        </div>
      </div>

      {/* Nav sections */}
      {NAV_SECTIONS.map((section) => (
        <div key={section.label}>
          <div style={{
            fontFamily: T.fontBody,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: T.sidebarSection,
            padding: "0 24px 8px",
            marginTop: 8,
          }}>
            {section.label}
          </div>
          {section.items.map((item) => {
            const active = isActive(item.path);
            const badge = badges?.[item.label];
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(item.path);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 24px",
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: active ? T.sidebarTextActive : T.sidebarText,
                  cursor: "pointer",
                  borderLeft: `3px solid ${active ? T.primary : "transparent"}`,
                  background: active ? T.sidebarActive : "transparent",
                  textDecoration: "none",
                  fontFamily: T.fontBody,
                }}
              >
                <span style={{ fontSize: 15, width: 18, textAlign: "center" }}>{item.icon}</span>
                {item.label}
                {badge && badge.count > 0 && (
                  <span style={{
                    marginLeft: "auto",
                    background: badge.color || T.primary,
                    color: "white",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 7px",
                    borderRadius: 20,
                    fontFamily: T.fontBody,
                  }}>
                    {badge.count}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      ))}

      {/* Footer */}
      <div style={{
        marginTop: "auto",
        padding: "16px 24px 0",
        borderTop: `1px solid ${T.sidebarBorder}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{
            width: 32,
            height: 32,
            background: T.primary,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: T.fontHeading,
            fontWeight: 900,
            fontSize: 14,
            color: "white",
          }}>
            M
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#ccc" }}>Max B.</div>
            <div style={{ fontSize: 11, color: "#555" }}>Founder</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            border: "none",
            color: T.sidebarText,
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
            padding: 0,
            fontFamily: T.fontBody,
          }}
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
