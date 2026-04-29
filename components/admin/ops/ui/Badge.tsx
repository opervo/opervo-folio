type BadgeColor = 'green' | 'orange' | 'red' | 'blue' | 'gray' | 'yellow';

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  size?: 'small' | 'medium';
}

const COLORS: Record<BadgeColor, { bg: string; fg: string; border: string }> = {
  green:  { bg: '#E8F5EE', fg: '#1F8C4A', border: '#C5E5D2' },
  orange: { bg: '#FEE7DA', fg: '#d94e08', border: '#FBC8A8' },
  red:    { bg: '#FEE2E2', fg: '#B91C1C', border: '#FCA5A5' },
  blue:   { bg: '#E0EDFF', fg: '#1A6BF0', border: '#B6D2FA' },
  yellow: { bg: '#FEF3C7', fg: '#92400E', border: '#FDE68A' },
  gray:   { bg: '#F3F0EC', fg: '#6B6B6B', border: '#E8E4DE' },
};

export default function Badge({ children, color = 'gray', size = 'medium' }: BadgeProps) {
  const { bg, fg, border } = COLORS[color];
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      background: bg,
      color: fg,
      border: `1px solid ${border}`,
      borderRadius: 4,
      padding: size === 'small' ? '2px 6px' : '4px 8px',
      fontSize: size === 'small' ? 10 : 11,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 0.3,
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}
