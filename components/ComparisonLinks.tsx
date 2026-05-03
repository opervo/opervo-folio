import Link from 'next/link'

export default function ComparisonLinks() {
  return (
    <p style={{ fontSize: 13, color: '#6B6B6B', textAlign: 'center', marginTop: 16 }}>
      See detailed comparisons:{' '}
      <Link href="/compare/opervo-vs-jobber" title="Opervo vs Jobber — Feature Comparison" style={{ color: '#F5620F', textDecoration: 'none', fontWeight: 500 }}>Opervo vs Jobber</Link>
      {' · '}
      <Link href="/compare/opervo-vs-housecall-pro" title="Opervo vs Housecall Pro — Feature Comparison" style={{ color: '#F5620F', textDecoration: 'none', fontWeight: 500 }}>Opervo vs Housecall Pro</Link>
      {' · '}
      <Link href="/compare/opervo-vs-gorilladesk" title="Opervo vs GorillaDesk — Feature Comparison" style={{ color: '#F5620F', textDecoration: 'none', fontWeight: 500 }}>Opervo vs GorillaDesk</Link>
      {' · '}
      <Link href="/compare/opervo-vs-markate" title="Opervo vs Markate — Feature Comparison" style={{ color: '#F5620F', textDecoration: 'none', fontWeight: 500 }}>Opervo vs Markate</Link>
    </p>
  )
}
