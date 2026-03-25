import Link from 'next/link'

export default function TradesMention() {
  return (
    <p style={{ fontSize: 14, color: '#6B6B6B', textAlign: 'center', lineHeight: 1.7, maxWidth: 640, margin: '0 auto' }}>
      Opervo is built for{' '}
      <Link href="/solar-panel-cleaning" title="Solar Panel Cleaning Software" style={{ color: '#F5620F', textDecoration: 'none' }}>solar panel cleaning</Link>,{' '}
      <Link href="/window-cleaning" title="Window Cleaning Software" style={{ color: '#F5620F', textDecoration: 'none' }}>window cleaning</Link>,{' '}
      <Link href="/pressure-washing" title="Pressure Washing Software" style={{ color: '#F5620F', textDecoration: 'none' }}>pressure washing</Link>, and{' '}
      <Link href="/landscaping" title="Landscaping Software" style={{ color: '#F5620F', textDecoration: 'none' }}>landscaping</Link> businesses.
    </p>
  )
}
