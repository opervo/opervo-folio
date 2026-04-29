'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  badge?: number;
  status?: 'active' | 'coming_soon';
}

interface SidebarProps {
  approvalsCount?: number;
  inboxUnread?: number;
  killSwitchOn: boolean;
}

export default function Sidebar({ approvalsCount, inboxUnread, killSwitchOn }: SidebarProps) {
  const pathname = usePathname();
  const items: NavItem[] = [
    { label: 'Today',     href: '/admin/ops',           status: 'active' },
    { label: 'Queue',     href: '/admin/ops/queue',     status: 'active', badge: approvalsCount },
    { label: 'Inbox',     href: '/admin/ops/inbox',     status: 'active', badge: inboxUnread },
    { label: 'Operators', href: '/admin/ops/operators', status: 'active' },
    { label: 'Roles',     href: '/admin/ops/roles',     status: 'active' },
    { label: 'System',    href: '/admin/ops/system',    status: 'active' },
  ];

  return (
    <aside style={{
      width: 200,
      background: '#0F0F0F',
      borderRight: '1px solid #2A2A2A',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 0',
    }}>
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {items.map(item => {
          const isActive = item.href === pathname || (item.href !== '/admin/ops' && pathname.startsWith(item.href));
          const isComing = item.status === 'coming_soon';
          const Wrapper = isComing ? 'div' : Link;
          return (
            <Wrapper
              key={item.href}
              href={isComing ? '#' : item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 24px',
                color: isActive ? '#F5620F' : isComing ? '#4A4A4A' : '#F7F5F2',
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
                fontFamily: 'Barlow, sans-serif',
                textDecoration: 'none',
                cursor: isComing ? 'not-allowed' : 'pointer',
                borderLeft: isActive ? '3px solid #F5620F' : '3px solid transparent',
              }}
            >
              <span>
                {item.label}
                {isComing && <span style={{ marginLeft: 6, fontSize: 10, opacity: 0.6 }}>soon</span>}
              </span>
              {item.badge !== undefined && item.badge > 0 && (
                <span style={{
                  background: '#F5620F',
                  color: '#FFFFFF',
                  borderRadius: 10,
                  padding: '2px 8px',
                  fontSize: 11,
                  fontWeight: 700,
                  minWidth: 22,
                  textAlign: 'center',
                }}>
                  {item.badge}
                </span>
              )}
            </Wrapper>
          );
        })}
      </nav>

      <Link
        href="/admin/ops/system"
        style={{
          margin: '16px 24px 0',
          padding: '12px 16px',
          background: killSwitchOn ? '#1F2A1A' : '#3A1010',
          border: `1px solid ${killSwitchOn ? '#1F8C4A' : '#d94e08'}`,
          borderRadius: 8,
          color: killSwitchOn ? '#A2D9BC' : '#FDA98F',
          fontSize: 12,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: killSwitchOn ? '#1F8C4A' : '#d94e08',
        }} />
        {killSwitchOn ? 'Automation On' : 'Halted'}
      </Link>
    </aside>
  );
}
