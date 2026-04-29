'use client';

import { useState, useTransition } from 'react';
import { createBrowserClient } from '@supabase/ssr';

interface Props {
  slug: string;
  initialEnabled: boolean;
}

export default function RoleEnableToggle({ slug, initialEnabled }: Props) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function flip() {
    const next = !enabled;
    if (!next) {
      const ok = confirm(`Disable ${slug}? Queued tasks will be cancelled and no new tasks accepted.`);
      if (!ok) return;
    }

    startTransition(async () => {
      setError(null);
      const sb = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
      const { error: e } = await sb.schema('ops').from('role_registry')
        .update({ enabled: next })
        .eq('slug', slug)
        ;
      if (e) {
        setError(e.message);
        return;
      }
      setEnabled(next);
    });
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {error && <span style={{ color: '#d94e08', fontSize: 12 }}>{error}</span>}
      <button
        onClick={flip}
        disabled={isPending}
        style={{
          background: enabled ? '#1F8C4A' : '#E8E4DE',
          border: 'none',
          borderRadius: 999,
          width: 48,
          height: 28,
          padding: 2,
          cursor: isPending ? 'wait' : 'pointer',
          position: 'relative',
        }}
      >
        <span style={{
          position: 'absolute',
          top: 2,
          left: enabled ? 22 : 2,
          width: 24,
          height: 24,
          background: '#FFFFFF',
          borderRadius: '50%',
          transition: 'left 0.15s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }} />
      </button>
    </div>
  );
}
