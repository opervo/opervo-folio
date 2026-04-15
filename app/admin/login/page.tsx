"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { T } from "../_lib/tokens";

export default function AdminLogin() {
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!pw.trim() || loading) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: T.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 20,
        padding: "48px 44px",
        width: 380,
        textAlign: "center",
      }}>
        <div style={{
          fontFamily: T.fontHeading,
          fontSize: 36,
          fontWeight: 900,
          color: T.ink,
          letterSpacing: -1,
          marginBottom: 2,
        }}>
          Opervo<span style={{ color: T.primary }}>.</span>
        </div>
        <div style={{
          fontFamily: T.fontHeading,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: T.muted,
          marginBottom: 36,
        }}>
          Corporate
        </div>
        <input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setError(false); }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          style={{
            width: "100%",
            padding: "12px 16px",
            border: `1px solid ${error ? T.red : T.border}`,
            borderRadius: 10,
            fontSize: 14,
            color: T.ink,
            background: T.surface,
            marginBottom: 14,
            outline: "none",
            boxSizing: "border-box",
            fontFamily: T.fontBody,
          }}
        />
        <button
          onClick={submit}
          disabled={loading}
          style={{
            width: "100%",
            padding: 13,
            background: T.primary,
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontFamily: T.fontHeading,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            cursor: loading ? "wait" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Checking..." : "Enter"}
        </button>
        {error && (
          <div style={{ fontSize: 12, color: T.red, marginTop: 12 }}>
            Incorrect password
          </div>
        )}
      </div>
    </div>
  );
}
