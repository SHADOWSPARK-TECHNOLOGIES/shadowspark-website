import type { Metadata } from "next";
import { Navigation } from "@/components/sections/Navigation";
import { EnterpriseHero } from "@/components/sections/EnterpriseHero";
import { FintechSolutions } from "@/components/sections/FintechSolutions";
import { RoiMetrics } from "@/components/sections/RoiMetrics";
import { EnterpriseContact } from "@/components/sections/EnterpriseContact";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "ShadowSpark | AI Infrastructure for African Fintech",
  description:
    "Automate loan origination, instant KYC, and compliance. The enterprise AI infrastructure layer for African fintech lenders.",
  keywords: [
    "African fintech",
    "loan automation",
    "KYC verification",
    "NDPA compliance",
    "CBN compliance",
    "Nigeria fintech",
    "AI lending",
  ],
  openGraph: {
    title: "ShadowSpark | AI Infrastructure for African Fintech",
    description:
      "Automate loan origination, instant KYC, and compliance for African fintech lenders.",
    type: "website",
    url: "https://shadowspark-tech.org",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <EnterpriseHero />
      <FintechSolutions />
      <RoiMetrics />
      <EnterpriseContact />
      <Footer />
    </main>
  );
}
