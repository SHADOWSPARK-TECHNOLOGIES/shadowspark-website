import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/seo";
import { SiteNav } from "@/components/landing/SiteNav";

export const metadata: Metadata = {
  ...canonical("/chatbot-products"),
  title: "AI Chatbot Products",
  description:
    "Production-grade conversational AI systems by ShadowSpark, from WhatsApp operations agents to Lodgist trust bots and enterprise automation.",
  openGraph: {
    title: "AI Chatbot Products — ShadowSpark",
    description:
      "Explore ShadowSpark deployment tiers for chatbot systems, from operations agents to enterprise trust bots.",
  },
};

const tiers = [
  {
    title: "Operations Agents",
    intro: "WhatsApp and internal automation bots.",
    bullets: [
      "WhatsApp Business API integration",
      "Web form CSRF protection, CAPTCHA on risky flows, and abuse controls",
      "Custom LLM behavior and escalation design",
    ],
    cta: "Request Scope",
    href: "/contact",
    featured: false,
  },
  {
    title: "Lodgist Trust Bots",
    intro: "Identity-verified housing and verification agents.",
    bullets: [
      "Biometric and ID verification journeys",
      "Hardened admin pathways for operator tooling",
      "Continuous domain monitoring workflows",
      "Fraud-collapse decision logic",
    ],
    cta: "Deploy Trust Bot",
    href: "/contact",
    featured: true,
  },
  {
    title: "Enterprise Platforms",
    intro: "Full-scale AI infrastructure and GovTech deployment.",
    bullets: [
      "All Lodgist Trust Bot features",
      "Email and domain trust control enforcement",
      "Dedicated security operations integration",
      "Quarterly social engineering defense drills",
    ],
    cta: "Enterprise Inquiry",
    href: "/contact",
    featured: false,
  },
];

export default function ChatbotProductsPage() {
  return (
    <main className="min-h-screen bg-[#0B1B2B] text-white">
      <SiteNav active="chatbot-products" />

      <section className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Production-Grade Conversational AI
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#94A3B8]">
            We do not build prototypes. We ship secure, automated chatbot
            systems integrated into your real operations.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.title}
              className={`flex flex-col rounded-2xl p-8 ${
                tier.featured
                  ? "border-2 border-[#1ABC9C] bg-[#142a40]"
                  : "border border-white/10 bg-[#142a40]/80"
              }`}
            >
              {tier.featured && (
                <span className="mb-5 inline-flex w-fit rounded-full bg-[#1ABC9C] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#0B1B2B]">
                  Flagship
                </span>
              )}
              <h2 className="text-2xl font-bold">{tier.title}</h2>
              <p className="mt-2 text-sm text-[#94A3B8]">{tier.intro}</p>

              <ul className="mt-7 flex-1 space-y-3 text-sm text-[#dbe5ef]">
                {tier.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1ABC9C]" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`mt-8 inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-bold transition-colors ${
                  tier.featured
                    ? "bg-[#FF6F3C] text-white hover:bg-[#e85e2c]"
                    : "border border-white/25 text-white hover:border-white/60 hover:bg-white/5"
                }`}
              >
                {tier.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
