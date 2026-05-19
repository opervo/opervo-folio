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

export interface SentryIssueDetail {
  issue: {
    id: string;
    title: string;
    culprit: string;
    level: string;
    count: number;
    userCount: number;
    firstSeen: string;
    lastSeen: string;
    permalink: string;
    status: string;
    platform: string;
    type: string;
    metadata: Record<string, string>;
  };
  stacktrace: string[];
  breadcrumbs: { category?: string; message?: string; timestamp?: string }[];
  tags: { key: string; values: { value: string; count: number }[] }[];
  eventCount: number;
  events: {
    id: string;
    date: string;
    user: string | null;
    browser: string | null;
    os: string | null;
    url: string | null;
  }[];
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

export interface PostHogEventsData {
  configured: boolean;
  period: string;
  featureAdoption: { event: string; count: number; users: number }[];
  dauTrend: { day: string; users: number }[];
  topPages: { url: string; views: number }[];
  userEvents?: { event: string; timestamp: string; url: string }[];
  error?: string;
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

// Operator detail
export interface OperatorProfile {
  profile: {
    id: string;
    email: string;
    business_name: string;
    owner_name: string;
    slug: string;
    phone: string;
    industry: string;
    subscription_status: string;
    subscription_plan: string;
    trial_start_date: string;
    created_at: string;
    last_sign_in: string | null;
    service_areas: string[];
  };
  stats: {
    totalJobs: number;
    completedJobs: number;
    totalInvoices: number;
    paidInvoices: number;
    totalRevenue: number;
    totalClients: number;
    totalEstimates: number;
    totalServices: number;
    teamSize: number;
  };
  features: Record<string, boolean>;
  featureCount: number;
  timeline: { type: string; date: string; title: string; detail?: string }[];
  recentJobs: { id: string; title: string; status: string; service_type: string; scheduled_date: string; created_at: string; total_price: number }[];
  recentInvoices: { id: string; invoice_number: string; status: string; total: number; created_at: string; paid_at: string | null }[];
  clients: { id: string; first_name: string; last_name: string; email: string; created_at: string }[];
  team: { id: string; name: string; email: string; role: string; status: string }[];
  services: { id: string; name: string; base_price: number; created_at: string }[];
}

// Funnel
export interface FunnelStep {
  step: string;
  count: number;
  total: number;
}

export interface FunnelCohort {
  week: string;
  total: number;
  steps: Record<string, number>;
}

export interface FunnelData {
  funnel: FunnelStep[];
  cohorts: FunnelCohort[];
  totalUsers: number;
}

// Gmail threads
export interface GmailThread {
  id: string;
  messageCount: number;
  from: string;
  subject: string;
  snippet: string;
  date: string;
  unread: boolean;
  labels: string[];
  gmailUrl: string;
}

export interface GmailMessage {
  id: string;
  threadId: string;
  from: string;
  to: string;
  cc: string;
  subject: string;
  date: string;
  snippet: string;
  body: string;
  unread: boolean;
  labels: string[];
}

export interface GmailThreadDetail {
  threadId: string;
  messages: GmailMessage[];
}
