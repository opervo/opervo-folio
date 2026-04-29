import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  badge?: string;
  badgeColor?: string;
  children: ReactNode;
  footer?: ReactNode;
  emphasis?: boolean;     // orange border for important cards
}

export default function Card({ title, badge, badgeColor, children, footer, emphasis }: CardProps) {
  return (
    <div style={{
      background: '#FFFFFF',
      border: emphasis ? '2px solid #F5620F' : '1px solid #E8E4DE',
      borderRadius: 12,
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}>
      {(title || badge) && (
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          {title && (
            <h3 style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 700,
              fontSize: 14,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              margin: 0,
              color: '#6B6B6B',
            }}>{title}</h3>
          )}
          {badge && (
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              color: badgeColor ?? '#6B6B6B',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>{badge}</span>
          )}
        </div>
      )}
      <div style={{ flex: 1 }}>{children}</div>
      {footer && (
        <div style={{ borderTop: '1px solid #E8E4DE', paddingTop: 12, fontSize: 13 }}>
          {footer}
        </div>
      )}
    </div>
  );
}
