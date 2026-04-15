/* Shared formatting helpers */

export function fmt$(n: number) {
  return "$" + (n / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function timeAgo(ts: number | string) {
  const d = typeof ts === "number" ? ts * 1000 : new Date(ts).getTime();
  const diff = (Date.now() - d) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return Math.floor(diff / 60) + "m ago";
  if (diff < 86400) return Math.floor(diff / 3600) + "h ago";
  return Math.floor(diff / 86400) + "d ago";
}

export function initials(name?: string, email?: string) {
  if (name) return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  if (email) return email.slice(0, 2).toUpperCase();
  return "??";
}

export function formatDate(ts: string) {
  const d = new Date(ts);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
