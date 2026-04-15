"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { T } from "../_lib/tokens";
import { onToast } from "../_lib/toast";
import Sidebar from "./Sidebar";

export default function AdminShell({
  children,
  badges,
}: {
  children: React.ReactNode;
  badges?: Record<string, { count: number; color?: string }>;
}) {
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  // Subscribe to global toast events
  useEffect(() => {
    return onToast((msg) => {
      setToastMsg(msg);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2800);
    });
  }, []);

  useEffect(() => {
    fetch("/api/admin/health").then((res) => {
      if (res.status === 401) {
        router.replace("/admin/login");
      } else {
        setAuthed(true);
      }
    }).catch(() => {
      router.replace("/admin/login");
    });
  }, [router]);

  if (authed === null) {
    return (
      <div style={{
        minHeight: "100vh",
        background: T.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          fontFamily: T.fontHeading,
          fontSize: 22,
          fontWeight: 900,
          color: T.muted,
        }}>
          Loading<span style={{ color: T.primary }}>...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar badges={badges} />
        <main style={{
          marginLeft: 220,
          flex: 1,
          padding: "36px 40px",
          maxWidth: "calc(100vw - 220px)",
          background: T.bg,
          minHeight: "100vh",
        }}>
          {children}
        </main>
      </div>
      {/* Toast */}
      <div style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        background: T.sidebar,
        color: T.sidebarTextActive,
        padding: "12px 20px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 500,
        fontFamily: T.fontBody,
        opacity: toastVisible ? 1 : 0,
        transform: toastVisible ? "translateY(0)" : "translateY(8px)",
        transition: "all 0.2s",
        zIndex: 1000,
        pointerEvents: "none",
      }}>
        {toastMsg}
      </div>
    </>
  );
}
