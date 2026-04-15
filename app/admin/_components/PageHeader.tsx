"use client";

import { T } from "../_lib/tokens";
import RefreshButton from "./RefreshButton";

export default function PageHeader({
  eyebrow,
  title,
  lastRefresh,
  loading,
  onRefresh,
}: {
  eyebrow?: string;
  title: string;
  lastRefresh: Date | null;
  loading: boolean;
  onRefresh: () => void;
}) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 32,
    }}>
      <div>
        {eyebrow && (
          <div style={{
            fontFamily: T.fontHeading,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: T.primary,
            marginBottom: 4,
          }}>
            {eyebrow}
          </div>
        )}
        <div style={{
          fontFamily: T.fontHeading,
          fontSize: 32,
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "-0.5px",
          color: T.ink,
        }}>
          {title}
        </div>
      </div>
      <RefreshButton lastRefresh={lastRefresh} loading={loading} onRefresh={onRefresh} />
    </div>
  );
}
