'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export interface OperatorRow {
  id: string;
  business_name: string | null;
  email: string;
  location: string | null;
  subscription_plan: 'solo' | 'team' | null;
  has_completed_tour: boolean;
  created_at: string;
  last_login_at: string | null;
  jobs_count: number;
  revenue_total: number;
  stuck_count: number;
  trial_days_left: number | null;     // null if not on trial
  status: 'trial' | 'active' | 'at_risk' | 'churned';
}

type Filter = 'all' | 'trial' | 'solo' | 'team' | 'churned' | 'stuck' | 'high_value' | 'onboarding_stuck';

export default function OperatorsClient({ operators }: { operators: OperatorRow[] }) {
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let out = operators;
    if (filter === 'trial') out = out.filter(o => o.status === 'trial');
    else if (filter === 'solo') out = out.filter(o => o.subscription_plan === 'solo');
    else if (filter === 'team') out = out.filter(o => o.subscription_plan === 'team');
    else if (filter === 'churned') out = out.filter(o => o.status === 'churned');
    else if (filter === 'stuck') out = out.filter(o => o.stuck_count > 0);
    else if (filter === 'high_value') out = out.filter(o => o.revenue_total >= 300);
    else if (filter === 'onboarding_stuck') out = out.filter(o =>
      !o.has_completed_tour ||
      (o.jobs_count === 0 && daysSince(o.created_at) >= 7)
    );

    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter(o =>
        (o.business_name ?? '').toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        (o.location ?? '').toLowerCase().includes(q)
      );
    }

    return out;
  }, [operators, filter, search]);

  const counts = useMemo(() => ({
    all: operators.length,
    trial: operators.filter(o => o.status === 'trial').length,
    solo: operators.filter(o => o.subscription_plan === 'solo').length,
    team: operators.filter(o => o.subscription_plan === 'team').length,
    churned: operators.filter(o => o.status === 'churned').length,
    stuck: operators.filter(o => o.stuck_count > 0).length,
    high_value: operators.filter(o => o.revenue_total >= 300).length,
    onboarding_stuck: operators.filter(o =>
      !o.has_completed_tour || (o.jobs_count === 0 && daysSince(o.created_at) >= 7)
    ).length,
  }), [operators]);

  return (
    <>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>All ({counts.all})</FilterChip>
        <FilterChip active={filter === 'trial'} onClick={() => setFilter('trial')}>Trials ({counts.trial})</FilterChip>
        <FilterChip active={filter === 'solo'} onClick={() => setFilter('solo')}>Solo ({counts.solo})</FilterChip>
        <FilterChip active={filter === 'team'} onClick={() => setFilter('team')}>Team ({counts.team})</FilterChip>
        <FilterChip active={filter === 'churned'} onClick={() => setFilter('churned')}>Churned 30d ({counts.churned})</FilterChip>
        <FilterChip active={filter === 'stuck'} onClick={() => setFilter('stuck')}>Has stuck items ({counts.stuck})</FilterChip>
        <FilterChip active={filter === 'high_value'} onClick={() => setFilter('high_value')}>High value ({counts.high_value})</FilterChip>
        <FilterChip active={filter === 'onboarding_stuck'} onClick={() => setFilter('onboarding_stuck')}>Onboarding stuck ({counts.onboarding_stuck})</FilterChip>

        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search name, email, location"
          style={{
            marginLeft: 'auto', minWidth: 220, padding: '8px 12px',
            border: '1px solid #E8E4DE', borderRadius: 6, fontSize: 13,
          }}
        />
      </div>

      {filtered.length === 0 ? (
        <div style={{
          background: '#FFFFFF', border: '1px dashed #E8E4DE', borderRadius: 12,
          padding: 60, textAlign: 'center', color: '#6B6B6B', fontSize: 14,
        }}>
          No operators match this filter.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(op => <OperatorCard key={op.id} op={op} />)}
        </div>
      )}

      <div style={{ fontSize: 12, color: '#6B6B6B', marginTop: 16, textAlign: 'right' }}>
        {filtered.length} of {operators.length}
      </div>
    </>
  );
}

function OperatorCard({ op }: { op: OperatorRow }) {
  const statusColor = op.status === 'active' ? 'green'
    : op.status === 'trial' ? 'yellow'
    : op.status === 'at_risk' ? 'orange'
    : 'red';
  const statusLabel = op.status === 'active' ? 'Active'
    : op.status === 'trial' ? `Trial${op.trial_days_left !== null ? ` ${op.trial_days_left}/30` : ''}`
    : op.status === 'at_risk' ? 'At risk'
    : 'Churned';

  return (
    <div style={{
      background: '#FFFFFF', border: '1px solid #E8E4DE', borderRadius: 8,
      padding: 16, display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: 16,
      alignItems: 'center',
    }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>{op.business_name ?? '(no business name)'}</span>
          <span style={{ color: '#6B6B6B', fontSize: 13 }}>{op.email}</span>
        </div>
        <div style={{ color: '#6B6B6B', fontSize: 12 }}>
          {op.location ?? 'no location'} · signed up {new Date(op.created_at).toLocaleDateString()}
          {op.last_login_at && ` · last login ${relativeTime(op.last_login_at)}`}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Badge color={statusColor as never} size="small">{statusLabel}</Badge>
        {op.subscription_plan && (
          <span style={{ fontSize: 12, color: '#6B6B6B' }}>
            {op.subscription_plan === 'solo' ? 'Solo $24.99' : 'Team $54.99'}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: '#6B6B6B' }}>
        <span>{op.jobs_count} jobs · ${op.revenue_total.toFixed(0)}</span>
        {op.stuck_count > 0 && (
          <span style={{ color: '#d94e08', fontWeight: 600 }}>
            ⚠ {op.stuck_count} stuck
          </span>
        )}
        {!op.has_completed_tour && (
          <span style={{ color: '#F5620F', fontWeight: 600 }}>
            ⚠ tour incomplete
          </span>
        )}
      </div>

      <Link
        href={`/admin/ops/operators/${op.id}`}
        style={{ color: '#F5620F', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}
      >
        Open →
      </Link>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      background: active ? '#0F0F0F' : '#FFFFFF',
      color: active ? '#FFFFFF' : '#1a1a1a',
      border: `1px solid ${active ? '#0F0F0F' : '#E8E4DE'}`,
      borderRadius: 999, padding: '6px 14px',
      fontSize: 12, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
    }}>{children}</button>
  );
}

function daysSince(iso: string): number {
  return Math.floor((Date.now() - new Date(iso).getTime()) / (24 * 60 * 60 * 1000));
}

function relativeTime(iso: string): string {
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60_000);
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 60 * 24) return `${Math.floor(minutes / 60)}h ago`;
  return `${Math.floor(minutes / (60 * 24))}d ago`;
}
