import type { Metadata } from "next";
import { canonical } from "@/lib/seo";
import { SiteNav } from "@/components/landing/SiteNav";

export const metadata: Metadata = {
  ...canonical("/public-sector"),
  title: "Public Sector AI",
  description:
    "Citizen-facing conversational AI and GovTech automation designed for data sovereignty, compliance, and high-volume service delivery in Nigeria.",
  openGraph: {
    title: "Public Sector AI Systems — ShadowSpark",
    description:
      "Citizen-service chatbots and AI agent automation for public-sector delivery with sovereignty and compliance controls.",
  },
};

const features = [
  "Localized NLP behavior for regional context",
  "Data residency and encryption controls",
  "Auditable service interactions and routing",
];

const matrix = [
  { label: "Data Sovereignty", value: "Verified" },
  { label: "DMARC Enforcement", value: "Enabled" },
  { label: "Audit Trail Retention", value: "13 Months" },
];

export default function PublicSectorPage() {
  return (
    <main className="min-h-screen bg-[#0B1B2B] text-white">
      <SiteNav active="public-sector" />

      <section className="mx-auto max-w-5xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            AI for the public sector
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#94A3B8]">
            Citizen-facing chatbots and GovTech automation require strict data
            sovereignty and resilient security. We build conversational agents
            that satisfy high-compliance public sector requirements.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-10 md:grid-cols-2">
          <article>
            <h2 className="text-2xl font-bold">Citizen Service Automation</h2>
            <p className="mt-4 text-base leading-relaxed text-[#c5d3e0]">
              Deploy WhatsApp and web AI agents that handle high volumes of
              citizen enquiries, from onboarding flows to policy FAQs, with safe
              escalation paths and sensitive-data controls.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-[#dbe5ef]">
              {features.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1ABC9C]" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <aside className="rounded-2xl border border-white/10 bg-[#142a40]/80 p-8">
            <h3 className="text-lg font-bold text-[#1ABC9C]">Compliance Matrix</h3>
            <div className="mt-6 space-y-4">
              {matrix.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between border-b border-white/10 pb-2"
                >
                  <span className="text-sm text-[#dbe5ef]">{row.label}</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1ABC9C]">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
