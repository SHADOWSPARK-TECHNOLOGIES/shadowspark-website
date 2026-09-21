import type { Metadata } from 'next';
import { marketingMetadata } from '@/lib/seo';

export const metadata: Metadata = marketingMetadata(
  '/demo',
  'Demo',
  'Walk through an example ShadowSpark loan workflow from intake to disbursement.',
);

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
