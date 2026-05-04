import Link from 'next/link';
import { notFound } from 'next/navigation';
import { adminSupabase } from '@/lib/admin/supabase';
import { requireAdmin } from '@/lib/admin/auth';
import Card from '@/components/admin/ops/ui/Card';
import Stat from '@/components/admin/ops/ui/Stat';
import Badge from '@/components/admin/ops/ui/Badge';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

const TRIAL_LENGTH_DAYS = 30;

export default async function OperatorDetailPage({ params }: PageProps) {
  await requireAdmin();
  const { id } = await params;
  const sb = adminSupabase();

  const { data: profile } = await sb.from('profiles')
    .select('id, business_name, location, subscription_plan, has_completed_tour, created_at, updated_at, slug')
    .eq('id', id)
    .maybeSingle();

  if (!profile) notFound();

  // Fetch auth user for email + last_sign_in_at
  let email = '';
  let lastSignInAt: string | null = null;
  try {
    const { data: userRes } = await sb.auth.admin.getUserById(id);
    email = userRes.user?.email ?? '';
    lastSignInAt = userRes.user?.last_sign_in_at ?? null;
  } catch {
    // no auth user — fine
  }

  const monthStart = new Date(Date.now() - 30 * 86400000).toISOString();

  const [
    { data: jobs },
    { data: invoices },
    { data: estimates },
    { data: findings },
  ] = await Promise.all([
    sb.from('jobs').select('id, status, created_at, date, date, total').eq('user_id', id).order('created_at', { ascending: false }).limit(20),
    sb.from('invoices').select('id, status, total, due_date, created_at, paid_at, sent_at').eq('user_id', id).order('created_at', { ascending: false }).limit(20),
    sb.from('estimates').select('id, status, total, sent_at, created_at').eq('user_id', id).order('created_at', { ascending: false }).limit(10),
    sb.schema('ops').from('account_context')
      .select('id, role_slug, finding_kind, finding_text, severity, metadata, created_at, ttl_at')
      .eq('account_id', id)
      .or(`ttl_at.is.null,ttl_at.gt.${new Date().toISOString()}`)
      .gte('created_at', monthStart)
      .order('created_at', { ascending: false })
      .limit(50),
  ]);

  // Derive metrics
  const created = new Date(profile.created_at);
  const ageDays = Math.floor((Date.now() - created.getTime()) / (24 * 60 * 60 * 1000));
  const isTrial = !profile.subscription_plan && ageDays <= TRIAL_LENGTH_DAYS;
  const trialDaysLeft = isTrial ? Math.max(0, TRIAL_LENGTH_DAYS - ageDays) : null;

  const totalJobs = (jobs ?? []).length;
  const openJobs = (jobs ?? []).filter(j => !['completed', 'paid', 'cancelled'].includes(j.status as string)).length;
  const paidInvoices = (invoices ?? []).filter(i => i.status === 'paid');
  const totalRevenue = paidInvoices.reduce((s, i) => s + Number(i.total ?? 0), 0);
  const openEstimates = (estimates ?? []).filter(e => e.status === 'sent').length;

  // Build activity feed (combine jobs + invoices + estimates by date)
  type ActivityItem = { kind: string; date: string; description: string };
  const activity: ActivityItem[] = [];
  for (const j of jobs ?? []) {
    if (j.date) activity.push({ kind: 'job_completed', date: j.date as string, description: `Job completed${j.total ? ` ($${Number(j.total).toFixed(2)})` : ''}` });
    activity.push({ kind: 'job_created', date: j.created_at as string, description: `Job created (${j.status})` });
  }
  for (const inv of invoices ?? []) {
    if (inv.paid_at) activity.push({ kind: 'invoice_paid', date: inv.paid_at as string, description: `Invoice paid: $${Number(inv.total ?? 0).toFixed(2)}` });
    if (inv.sent_at) activity.push({ kind: 'invoice_sent', date: inv.sent_at as string, description: `Invoice sent: $${Number(inv.total ?? 0).toFixed(2)}` });
  }
  for (const e of estimates ?? []) {
    if (e.sent_at) activity.push({ kind: 'estimate_sent', date: e.sent_at as string, description: `Estimate sent: $${Number(e.total ?? 0).toFixed(2)}` });
  }
  activity.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Status badge
  const lastLogin = lastSignInAt ? new Date(lastSignInAt) : null;
  const staleLogin = lastLogin && (Date.now() - lastLogin.getTime()) > 10 * 24 * 60 * 60 * 1000;
  const status = !profile.subscription_plan && ageDays > TRIAL_LENGTH_DAYS ? 'churned'
    : isTrial ? 'trial'
    : staleLogin ? 'at_risk'
    : 'active';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Link href="/admin/ops/operators" style={{ color: '#6B6B6B', fontSize: 13, textDecoration: 'none' }}>
        ← Back to operators
      </Link>

      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
          <h1 style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900,
            fontSize: 36, textTransform: 'uppercase', letterSpacing: 0.5,
            margin: 0, lineHeight: 1.1,
          }}>
            {profile.business_name ?? '(no business name)'}
          </h1>
          <Badge color={status === 'active' ? 'green' : status === 'trial' ? 'yellow' : status === 'at_risk' ? 'orange' : 'red'}>
            {status === 'trial' && trialDaysLeft !== null ? `Trial ${trialDaysLeft}d left` : status}
          </Badge>
        </div>
        <div style={{ marginTop: 6, color: '#6B6B6B', fontSize: 14 }}>
          {email}
          {profile.location && <> · {profile.location}</>}
          {profile.subscription_plan && (
            <> · {profile.subscription_plan === 'solo' ? 'Solo $24.99/mo' : 'Team $54.99/mo'}</>
          )}
          {profile.created_at && <> · since {new Date(profile.created_at).toLocaleDateString()}</>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <Card>
          <Stat label="Jobs" value={`${totalJobs} (${openJobs} open)`} />
        </Card>
        <Card>
          <Stat label="Revenue" value={`$${totalRevenue.toFixed(2)}`} />
        </Card>
        <Card>
          <Stat label="Last login" value={lastSignInAt ? relativeTime(lastSignInAt) : '—'} />
        </Card>
        <Card>
          <Stat label="Open estimates" value={openEstimates} />
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, alignItems: 'start' }}>
        <Card title="Activity (last 30 days)">
          {activity.length === 0 ? (
            <div style={{ color: '#6B6B6B', fontSize: 13 }}>No recorded activity in this window.</div>
          ) : (
            <div style={{ maxHeight: 480, overflowY: 'auto' }}>
              {activity.slice(0, 50).map((a, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '90px 110px 1fr',
                  gap: 12, padding: '6px 0', borderBottom: '1px solid #F0EDE8',
                  fontSize: 12, alignItems: 'center',
                }}>
                  <span style={{ color: '#9A9A9A' }}>{new Date(a.date).toLocaleDateString()}</span>
                  <Badge size="small" color="gray">{a.kind}</Badge>
                  <span>{a.description}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card title="Findings (cross-role)">
          {(findings ?? []).length === 0 ? (
            <div style={{ color: '#6B6B6B', fontSize: 13 }}>No findings on this account.</div>
          ) : (findings ?? []).map(f => (
            <div key={f.id} style={{
              padding: '8px 0', fontSize: 12, borderBottom: '1px solid #F0EDE8',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 600 }}>
                  {f.severity === 'urgent' ? '🔴' : f.severity === 'flag' ? '🟡' : '·'} {f.finding_kind}
                </span>
                <span style={{ color: '#9A9A9A', fontSize: 10 }}>
                  {f.role_slug} · {new Date(f.created_at).toLocaleDateString()}
                </span>
              </div>
              {f.finding_text && (
                <div style={{ color: '#6B6B6B', marginTop: 2 }}>{f.finding_text}</div>
              )}
            </div>
          ))}
        </Card>
      </div>

      <Card title="Actions">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <ActionLink
            href={`/admin/ops/inbox?account=${id}`}
            primary
            label="💬 Draft a follow-up"
            sub="Opens an Inbox thread pre-loaded with this operator's context"
          />
          <ActionLink
            href={`https://mail.google.com/mail/u/0/#search/${encodeURIComponent(email)}`}
            external
            label="✉ Open in Gmail"
            sub={email ? `Search threads with ${email}` : 'No email on file'}
          />
          {profile.slug && (
            <ActionLink
              href={`https://www.opervo.io/p/${profile.slug}`}
              external
              label="🌐 View Folio"
              sub={`opervo.io/p/${profile.slug}`}
            />
          )}
          <ActionLink
            href={`https://app.opervo.io`}
            external
            label="📱 Open in app"
            sub="Visit app.opervo.io"
          />
        </div>
      </Card>
    </div>
  );
}

function ActionLink({
  href, label, sub, primary, external,
}: { href: string; label: string; sub: string; primary?: boolean; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{
        display: 'flex', flexDirection: 'column', gap: 4,
        background: primary ? '#0F0F0F' : '#FFFFFF',
        color: primary ? '#F7F5F2' : '#1a1a1a',
        border: `1px solid ${primary ? '#0F0F0F' : '#E8E4DE'}`,
        borderRadius: 8, padding: '12px 16px',
        textDecoration: 'none', minWidth: 200,
      }}
    >
      <span style={{ fontWeight: 600, fontSize: 14 }}>{label}</span>
      <span style={{ fontSize: 11, color: primary ? '#A0A0A0' : '#6B6B6B' }}>{sub}</span>
    </a>
  );
}

function relativeTime(iso: string): string {
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60_000);
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 60 * 24) return `${Math.floor(minutes / 60)}h ago`;
  return `${Math.floor(minutes / (60 * 24))}d ago`;
}
