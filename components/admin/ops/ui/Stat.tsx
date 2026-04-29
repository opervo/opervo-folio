interface StatProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaColor?: 'positive' | 'negative' | 'neutral';
  size?: 'small' | 'medium' | 'large';
}

export default function Stat({ label, value, delta, deltaColor = 'neutral', size = 'medium' }: StatProps) {
  const valueSize = size === 'large' ? 32 : size === 'small' ? 18 : 24;
  const deltaShade = deltaColor === 'positive' ? '#1A6BF0' : deltaColor === 'negative' ? '#d94e08' : '#6B6B6B';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div style={{
        fontSize: 11,
        color: '#6B6B6B',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        fontWeight: 600,
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'Barlow Condensed, sans-serif',
        fontWeight: 700,
        fontSize: valueSize,
        color: '#0F0F0F',
        lineHeight: 1.1,
      }}>
        {value}
      </div>
      {delta && (
        <div style={{ fontSize: 12, color: deltaShade, fontWeight: 500 }}>
          {delta}
        </div>
      )}
    </div>
  );
}
