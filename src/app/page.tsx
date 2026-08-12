import type { Metadata } from 'next';
import { marketingMetadata } from '@/lib/seo';
import { Navigation } from "@/components/sections/Navigation";
import { EnterpriseHero } from "@/components/sections/EnterpriseHero";
import { WhyShadowSpark } from "@/components/sections/WhyShadowSpark";
import { SovereignDashboardPreview } from "@/components/sections/SovereignDashboardPreview";
import { SovereignPipeline } from "@/components/sections/SovereignPipeline";
import { RegulatoryPulse } from "@/components/sections/RegulatoryPulse";
import { Problem } from "@/components/sections/Problem";
import { FintechSolutions } from "@/components/sections/FintechSolutions";
import { RoiMetrics } from "@/components/sections/RoiMetrics";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { About } from "@/components/sections/About";
import { Pricing } from "@/components/sections/Pricing";
import { TrustCompliance } from "@/components/sections/TrustCompliance";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

const homeDescription =
  'Explore ShadowSpark pilot workflows for loan intake, identity checks, compliance review, and payment recovery.';

export const metadata: Metadata = {
  ...marketingMetadata(
    '/',
    'ShadowSpark — Pilot Infrastructure for African Fintech',
    homeDescription,
  ),
  keywords: [
    "African fintech",
    "loan automation",
    "KYC verification",
    "WhatsApp banking",
    "NDPA compliance",
    "Nigeria fintech",
    "AI lending",
    "microfinance automation",
    "CBN compliance",
    "digital lending",
  ],
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <EnterpriseHero />
      <WhyShadowSpark />
      <SovereignDashboardPreview />
      <SovereignPipeline />
      <RegulatoryPulse />
      <Problem />
      <FintechSolutions />
      <RoiMetrics />
      <CaseStudy />
      <About />
      <Pricing />
      <TrustCompliance />
      <FinalCTA />
      <Footer />
    </main>
  );
}
