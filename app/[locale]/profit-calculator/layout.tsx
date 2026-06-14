import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Field Service Profit Calculator | Opervo',
  description: 'Free profit calculator for window cleaners, pressure washers, landscapers, and other trades. See your real per-job profit after labor, materials, and mileage.',
  alternates: { canonical: 'https://www.opervo.io/profit-calculator' },
  openGraph: {
    title: 'Free Profit Calculator for Home Service Trades | Opervo',
    description: 'See your real per-job profit after labor, materials, and mileage. Free, no signup required.',
    url: 'https://www.opervo.io/profit-calculator',
    type: 'website',
  },
};

export default function ProfitCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
