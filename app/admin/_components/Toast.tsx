"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { T } from "../_lib/tokens";

interface ToastCtx {
  show: (msg: string) => void;
}

const Ctx = createContext<ToastCtx>({ show: () => {} });

export function useToast() {
  return useContext(Ctx);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);

  const show = useCallback((m: string) => {
    setMsg(m);
    setVisible(true);
    setTimeout(() => setVisible(false), 2800);
  }, []);

  return (
    <Ctx.Provider value={{ show }}>
      {children}
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
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "all 0.2s",
        zIndex: 1000,
        pointerEvents: "none",
      }}>
        {msg}
      </div>
    </Ctx.Provider>
  );
}
