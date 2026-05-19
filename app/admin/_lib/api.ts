/* Typed fetch wrappers for all admin API routes */
import type {
  StripeData, SupabaseUser, SentryData, SupportData,
  ActivationData, HealthData, PostHogData, AdminTask,
  DiagnoseResult, DraftReplyResult, ChurnData, EdgeFunction, LogEntry,
  OperatorProfile, FunnelData, SentryIssueDetail,
  PostHogEventsData, GmailThread, GmailThreadDetail,
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
  // Existing
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

  // New: Operator detail
  operator: (id: string) => get<OperatorProfile>(`/api/admin/operator/${id}`),

  // New: Activation funnel
  funnel: () => get<FunnelData>("/api/admin/funnel"),

  // New: Nudge email
  nudge: (userId: string, template: string) =>
    post<{ ok: boolean; emailId?: string; to?: string }>("/api/admin/nudge", {
      userId,
      template,
    }),

  // New: Sentry deep issue
  sentryIssue: (id: string) =>
    get<SentryIssueDetail>(`/api/admin/sentry/issue/${id}`),

  // New: PostHog events
  posthogEvents: (params?: { userId?: string; period?: string }) => {
    const qs = new URLSearchParams();
    if (params?.userId) qs.set("userId", params.userId);
    if (params?.period) qs.set("period", params.period);
    const query = qs.toString();
    return get<PostHogEventsData>(
      `/api/admin/posthog/events${query ? `?${query}` : ""}`
    );
  },

  // New: Gmail
  gmailSearch: (params?: { q?: string; label?: string }) => {
    const qs = new URLSearchParams();
    if (params?.q) qs.set("q", params.q);
    if (params?.label) qs.set("label", params.label);
    return get<{ threads: GmailThread[]; total: number }>(
      `/api/admin/gmail/search?${qs.toString()}`
    );
  },
  gmailThread: (id: string) =>
    get<GmailThreadDetail>(`/api/admin/gmail/thread/${id}`),
  gmailSend: (params: {
    to: string;
    subject: string;
    body: string;
    threadId?: string;
    inReplyTo?: string;
  }) => post<{ ok: boolean; messageId?: string }>("/api/admin/gmail/send", params),
};
