import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Multi-Job Tracker — Opervo',
  description: 'Free multi-job tracker for home-service operators. Log revenue, hours, materials, helpers, and mileage across jobs to see daily and weekly profit at a glance.',
  alternates: { canonical: 'https://www.opervo.io/multi-job-tracker' },
  openGraph: {
    title: 'Free Multi-Job Tracker for Home Service Trades — Opervo',
    description: 'Track revenue, hours, materials, and mileage across jobs in one place. Free, no signup.',
    url: 'https://www.opervo.io/multi-job-tracker',
    type: 'website',
  },
};

export default function MultiJobTrackerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
