/* Typed fetch wrappers for all admin API routes */
import type {
  StripeData, SupabaseUser, SentryData, SupportData,
  ActivationData, HealthData, PostHogData, AdminTask,
  DiagnoseResult, DraftReplyResult, ChurnData, EdgeFunction, LogEntry,
} from "./types";

async function get<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  return res.json();
}

async function post<T>(url: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  return res.json();
}

export const api = {
  stripe: () => get<StripeData>("/api/admin/stripe"),
  users: () => get<SupabaseUser[]>("/api/admin/users"),
  sentry: () => get<SentryData>("/api/admin/sentry"),
  support: () => get<SupportData>("/api/admin/support"),
  activation: () => get<ActivationData>("/api/admin/activation"),
  health: () => get<HealthData>("/api/admin/health"),
  posthog: () => get<PostHogData>("/api/admin/posthog"),
  tasks: () => get<{ tasks: AdminTask[] }>("/api/admin/tasks"),
  churn: () => get<ChurnData>("/api/admin/churn"),
  edgeFunctions: () => get<{ functions: EdgeFunction[] }>("/api/admin/edge-functions"),
  logs: (params?: { environment?: string; level?: string; limit?: number }) => {
    const qs = new URLSearchParams();
    if (params?.environment) qs.set("environment", params.environment);
    if (params?.level) qs.set("level", params.level);
    if (params?.limit) qs.set("limit", String(params.limit));
    const query = qs.toString();
    return get<{ logs: LogEntry[] }>(`/api/admin/logs${query ? `?${query}` : ""}`);
  },
  diagnose: (title: string, metadata?: string) =>
    post<DiagnoseResult>("/api/admin/diagnose", { title, metadata }),
  draftReply: (from: string, subject: string, snippet: string) =>
    post<DraftReplyResult>("/api/admin/draft-reply", { from, subject, snippet }),
  supportAction: (action: "resolve" | "escalate", messageId: string) =>
    post<{ ok: boolean }>("/api/admin/support", { action, messageId }),
  askAI: (question: string, context: string) =>
    post<{ answer: string }>("/api/admin/ask", { question, context }),
};
