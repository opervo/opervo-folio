interface Props {
  surface: string;
  description: string;
  phase: '3b' | '3c';
  builds_after: string;
}

export default function ComingSoon({ surface, description, phase, builds_after }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h1 style={{
        fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900,
        fontSize: 36, textTransform: 'uppercase', letterSpacing: 0.5,
        margin: 0, lineHeight: 1.1,
      }}>
        {surface}
      </h1>

      <div style={{
        background: '#FFFFFF',
        border: '1px dashed #E8E4DE',
        borderRadius: 12,
        padding: 48,
        textAlign: 'center',
        color: '#6B6B6B',
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#F5620F', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
          Coming in Phase {phase}
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 480, margin: '0 auto 16px' }}>
          {description}
        </p>
        <p style={{ fontSize: 12, color: '#9A9A9A', maxWidth: 480, margin: '0 auto' }}>
          Activates after: {builds_after}
        </p>
      </div>
    </div>
  );
}
