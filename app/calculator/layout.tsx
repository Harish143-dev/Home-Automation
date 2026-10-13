import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smart Automation Calculators — Energy & ROI Savings',
  description:
    'Explore our interactive calculators to estimate the potential energy savings, cost savings and efficiency benefits of intelligent automation for your home, office or hospitality project.',
  openGraph: {
    title: 'Smart Automation Calculators | AT Smart Living',
    description:
      'Estimate potential annual energy savings, cost reductions, and payback timelines for smart homes, commercial offices, and hotels with AT Smart Living.',
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
