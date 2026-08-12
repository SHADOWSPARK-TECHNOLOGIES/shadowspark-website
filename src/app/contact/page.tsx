import type { Metadata } from "next";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { marketingMetadata } from '@/lib/seo';

export const metadata: Metadata = marketingMetadata(
  '/contact',
  'Contact',
  'Request a ShadowSpark pilot-program conversation for your lending workflow.',
);

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black">
      <CTA />
      <Footer />
    </main>
  );
}
