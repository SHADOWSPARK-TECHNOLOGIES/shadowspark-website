import type { Metadata } from "next";
import { Navigation } from "@/components/sections/Navigation";
import { EnterpriseHero } from "@/components/sections/EnterpriseHero";
import { Problem } from "@/components/sections/Problem";
import { FintechSolutions } from "@/components/sections/FintechSolutions";
import { RoiMetrics } from "@/components/sections/RoiMetrics";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { About } from "@/components/sections/About";
import { Pricing } from "@/components/sections/Pricing";
import { TrustCompliance } from "@/components/sections/TrustCompliance";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://shadowspark-tech.org"),
  title: "ShadowSpark — AI Operating System for African Fintech",
  description:
    "Automate loan origination, instant KYC verification, and intelligent recovery. The enterprise infrastructure layer for African lenders. NDPA & CBN compliant.",
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
  openGraph: {
    title: "ShadowSpark — AI Operating System for African Fintech",
    description:
      "Automate loan origination, instant KYC, and intelligent recovery for African lenders.",
    type: "website",
    url: "https://shadowspark-tech.org",
    locale: "en_NG",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShadowSpark — AI Operating System for African Fintech",
    description:
      "Automate loan origination, instant KYC, and intelligent recovery for African lenders.",
    images: ["/og-image.png"],
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <EnterpriseHero />
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
