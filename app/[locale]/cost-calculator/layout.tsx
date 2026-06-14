import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Field Service Cost Calculator | Opervo',
  description: 'See your real cost of field service software. Compare monthly, yearly, and 5-year totals against Jobber, Housecall Pro, and Markate. Free, no signup.',
  alternates: { canonical: 'https://www.opervo.io/cost-calculator' },
  openGraph: {
    title: 'Free Field Service Cost Calculator | Opervo',
    description: 'Compare your real cost of field service software vs Jobber, Housecall Pro, and Markate. Free, no signup.',
    url: 'https://www.opervo.io/cost-calculator',
    type: 'website',
  },
};

export default function CostCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
