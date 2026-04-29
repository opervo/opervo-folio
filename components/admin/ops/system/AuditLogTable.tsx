'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

interface AuditRow {
  id: number;
  task_id: string | null;
  role_slug: string | null;
  phase: string;
  rationale: string | null;
  outcome: string | null;
  cost_usd: number | null;
  duration_ms: number | null;
  created_at: string;
}

interface AuditLogTableProps {
  initialRows: AuditRow[];
  totalCount: number;
}

const PHASE_COLORS: Record<string, 'green' | 'orange' | 'red' | 'blue' | 'gray' | 'yellow'> = {
  pre_action: 'gray',
  post_action: 'green',
  validation_failure: 'orange',
  auto_trip: 'red',
  kill_switch_block: 'gray',
  budget_block: 'red',
};

export default function AuditLogTable({ initialRows, totalCount }: AuditLogTableProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filter, setFilter] = useState({ role: '', outcome: '', phase: '' });

  const filtered = initialRows.filter(r => {
    if (filter.role && r.role_slug !== filter.role) return false;
    if (filter.outcome && r.outcome !== filter.outcome) return false;
    if (filter.phase && r.phase !== filter.phase) return false;
    return true;
  });

  const roles = Array.from(new Set(initialRows.map(r => r.role_slug).filter(Boolean))) as string[];

  return (
    <Card title="Audit Log" badge={`${totalCount} entries (last 30d)`}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, fontSize: 12, flexWrap: 'wrap' }}>
        <select value={filter.role} onChange={e => setFilter(f => ({ ...f, role: e.target.value }))}
          style={selectStyle}>
          <option value="">All roles</option>
          {roles.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={filter.phase} onChange={e => setFilter(f => ({ ...f, phase: e.target.value }))}
          style={selectStyle}>
          <option value="">All phases</option>
          {Object.keys(PHASE_COLORS).map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={filter.outcome} onChange={e => setFilter(f => ({ ...f, outcome: e.target.value }))}
          style={selectStyle}>
          <option value="">All outcomes</option>
          <option value="success">success</option>
          <option value="partial">partial</option>
          <option value="failure">failure</option>
          <option value="refused">refused</option>
        </select>
      </div>

      <div style={{ maxHeight: 400, overflowY: 'auto' }}>
        {filtered.length === 0 && (
          <div style={{ padding: 20, color: '#6B6B6B', textAlign: 'center', fontSize: 13 }}>
            No matching audit entries.
          </div>
        )}
        {filtered.map(row => (
          <div key={row.id}>
            <div
              onClick={() => setExpandedId(expandedId === row.id ? null : row.id)}
              style={{
                display: 'grid',
                gridTemplateColumns: '70px 1fr auto auto auto',
                gap: 12,
                padding: '8px 0',
                fontSize: 12,
                borderBottom: '1px solid #F0EDE8',
                cursor: 'pointer',
                alignItems: 'center',
              }}
            >
              <span style={{ fontFamily: 'ui-monospace, monospace', color: '#6B6B6B' }}>
                {new Date(row.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <span style={{ fontWeight: 600 }}>{row.role_slug ?? '—'}</span>
                {row.rationale && <span style={{ color: '#6B6B6B' }}> · {row.rationale}</span>}
              </span>
              <Badge size="small" color={PHASE_COLORS[row.phase] ?? 'gray'}>{row.phase}</Badge>
              {row.outcome && <Badge size="small" color={row.outcome === 'success' ? 'green' : row.outcome === 'partial' ? 'yellow' : 'red'}>{row.outcome}</Badge>}
              <span style={{ color: '#6B6B6B', fontFamily: 'ui-monospace, monospace', fontSize: 11 }}>
                {row.cost_usd ? `$${Number(row.cost_usd).toFixed(3)}` : ''}
              </span>
            </div>
            {expandedId === row.id && (
              <div style={{ background: '#F7F5F2', padding: 12, fontSize: 11, fontFamily: 'ui-monospace, monospace', borderBottom: '1px solid #F0EDE8' }}>
                <div>task_id: {row.task_id}</div>
                <div>duration: {row.duration_ms ?? '—'}ms</div>
                <div>full rationale: {row.rationale}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

const selectStyle: React.CSSProperties = {
  padding: '4px 8px',
  border: '1px solid #E8E4DE',
  borderRadius: 4,
  background: '#FFFFFF',
  fontSize: 12,
};
