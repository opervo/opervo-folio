/* Shared TypeScript interfaces for the admin dashboard */

export interface StripeData {
  mrr: number;
  activeCount: number;
  trialCount: number;
  soloCount: number;
  teamCount: number;
  churnedLast30: number;
  recentCharges: { id: string; amount: number; email: string; created: number }[];
}

export interface SupabaseUser {
  id: string;
  email: string;
  created_at: string;
  trial_start_date?: string;
  first_name?: string;
  business_name?: string;
  slug?: string;
  plan?: string;
  // Onboarding steps
  onboarding?: {
    hasProfile: boolean;
    hasFirstJob: boolean;
    hasSentInvoice: boolean;
    hasCalendar: boolean;
    stalledDays: number;
  };
}

export interface SentryIssue {
  id: string;
  title: string;
  count: number;
  userCount: number;
  level: string;
  permalink: string;
  firstSeen?: string;
  lastSeen?: string;
}

export interface SentryData {
  configured: boolean;
  totalErrors24h?: number;
  uniqueIssues24h?: number;
  affectedUsers24h?: number;
  topIssues?: SentryIssue[];
  error?: string;
}

export interface SupportEmail {
  id: string;
  from: string;
  subject: string;
  snippet: string;
  date: string;
  unread: boolean;
  gmailUrl: string;
}

export interface SupportData {
  configured: boolean;
  emails: SupportEmail[];
  unreadCount: number;
  error?: string;
}

export interface ActivationData {
  signedUp: number;
  onboarded: number;
  createdClient: number;
  createdJob: number;
  sentInvoice: number;
  gotPaid: number;
  period: string;
}

export interface HealthProbe {
  service: string;
  status: "healthy" | "degraded" | "down" | "unknown";
  detail?: string;
  latencyMs?: number;
}

export interface HealthData {
  probes: HealthProbe[];
  checkedAt: string;
}

export interface PostHogData {
  configured: boolean;
  events24h?: number;
  uniqueUsers24h?: number;
  topEvents7d?: { event: string; count: number }[];
}

export interface AdminTask {
  id: string;
  text: string;
  priority: "high" | "med" | "low";
  category: "week" | "v2" | "marketing" | "other";
  done: boolean;
  created_at: string;
}

export interface DiagnoseResult {
  diagnosis: string;
  suggestedFix: string;
}

export interface DraftReplyResult {
  draft: string;
}

export interface ChurnUser {
  id: string;
  email: string;
  first_name?: string;
  business_name?: string;
  plan?: string;
  reason: string;
  detail: string;
  daysInactive?: number;
  trialDaysLeft?: number;
}

export interface ChurnData {
  trialExpiring: ChurnUser[];
  inactive: ChurnUser[];
  paymentFailed: ChurnUser[];
}

export interface EdgeFunction {
  id: string;
  slug: string;
  name: string;
  status: string;
  version: number;
  created_at: string;
  updated_at: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: string;
  message: string;
  source?: string;
  requestPath?: string;
  statusCode?: number;
}
