import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found | ShadowSpark — Pilot Infrastructure for African Fintech',
  description:
    'Explore ShadowSpark pilot workflows for loan intake, identity checks, compliance review, and payment recovery.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="text-4xl font-semibold">404</h1>
      <p className="text-slate-400">This page could not be found.</p>
      <Link href="/" className="underline underline-offset-4">
        Go to the ShadowSpark home page
      </Link>
    </section>
  );
}
