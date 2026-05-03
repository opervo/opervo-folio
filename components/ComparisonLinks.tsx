import Link from 'next/link'

export default function ComparisonLinks() {
  return (
    <>
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
      <p style={{ fontSize: 13, color: '#6B6B6B', textAlign: 'center', marginTop: 6 }}>
        Or{' '}
        <Link href="/cost-calculator" title="Run your real cost interactively" style={{ color: '#F5620F', textDecoration: 'none', fontWeight: 600, borderBottom: '1px dashed rgba(245,98,15,0.4)', paddingBottom: 1 }}>run your real cost interactively →</Link>
      </p>
    </>
  )
}
