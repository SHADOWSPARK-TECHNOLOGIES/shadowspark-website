import type { Metadata } from "next";
import { marketingMetadata } from '@/lib/seo';

export const metadata: Metadata = marketingMetadata(
  '/pricing',
  'Pricing',
  'Review illustrative ShadowSpark pilot configurations and request pricing for a scoped deployment.',
);

import Link from "next/link";
import { ArrowLeft, Check, Shield, Zap, Building2 } from "lucide-react";
import { BookDemoButton } from "@/components/book-demo-button";
import { PricingCTAButton } from "./pricing-cta-button";

type Tier = {
  name: string;
  price: string;
  period: string;
  description: string;
  icon: typeof Shield;
  highlighted?: boolean;
  features: string[];
  cta: string;
};

const tiers: Tier[] = [
  {
    name: "Starter",
    price: "Pilot quote",
    period: "",
    description: "Example starting scope for a focused workflow pilot",
    icon: Zap,
    features: [
      "One scoped workflow",
      "Example regulatory-control mapping",
      "Pilot onboarding session",
      "Operator review checkpoints",
    ],
    cta: "Discuss Pilot",
  },
  {
    name: "Professional",
    price: "Pilot quote",
    period: "",
    description: "Example multi-workflow evaluation for a growing team",
    icon: Building2,
    highlighted: true,
    features: [
      "Multiple scoped workflows",
      "Example identity-check integration",
      "WhatsApp workflow prototype",
      "Review dashboard",
      "Pilot support plan",
    ],
    cta: "Discuss Pilot",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Example discovery scope for institution-specific requirements",
    icon: Shield,
    features: [
      "Architecture discovery",
      "Integration assessment",
      "Security-control mapping",
      "Service-level planning",
      "Deployment recommendation",
    ],
    cta: "Request Discovery",
  },
];

const faqs = [
  {
    q: "Can the plan be upgraded at any time?",
    a: "Pilot scope can be revised during discovery. Any pricing or delivery impact is agreed before work begins.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Payment arrangements are confirmed in the written pilot proposal.",
  },
  {
    q: "Is there a setup fee?",
    a: "Any onboarding or integration cost is included explicitly in the pilot quote.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Demo and proof-of-concept availability depends on the requested workflow and integration readiness.",
  },
];

export default function PricingPage() {
  return (
    <main className="bg-obsidian min-h-screen font-sans text-zinc-400 selection:bg-emerald-500/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-800 px-6 pb-16 pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[200px]" />
          <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-gold-500/3 blur-[160px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-emerald-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-5 py-2 text-[11px] font-mono tracking-[0.22em] text-emerald-400 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            PRICING
          </div>

          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Pricing
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Example pilot configurations; final scope and pricing require a written quote
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl border bg-zinc-900/50 p-8 transition-all duration-300 hover:border-zinc-700/50 ${
                    tier.highlighted
                      ? "border-emerald-500/40 shadow-[0_0_40px_rgba(16,149,106,0.1)]"
                      : "border-zinc-800"
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 backdrop-blur-md">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </span>
                        EXAMPLE CONFIGURATION
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                      <Icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-zinc-100">{tier.name}</h2>
                    </div>
                  </div>

                  <div className="mt-6">
                    <span className="text-3xl font-bold tracking-tight text-white">{tier.price}</span>
                    {tier.period && (
                      <span className="ml-1 text-sm text-zinc-500">{tier.period}</span>
                    )}
                  </div>

                  <p className="mt-3 text-sm leading-6 text-zinc-400">{tier.description}</p>

                  <ul className="mt-8 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-zinc-400">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <PricingCTAButton tierName={tier.name} highlighted={!!tier.highlighted}>
                    {tier.cta}
                  </PricingCTAButton>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-zinc-800 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-semibold text-zinc-100">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
              >
                <h3 className="text-base font-medium text-zinc-100">{faq.q}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-zinc-800 px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8">
            <h2 className="text-xl font-semibold text-zinc-100">
              Not sure which pilot scope fits?
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              Discuss your workflow goals and the discovery needed for a scoped proposal.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <BookDemoButton
                location="pricing_page_cta"
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-6 py-3 text-sm font-bold uppercase tracking-widest text-emerald-400 backdrop-blur-md transition-colors hover:bg-emerald-500/20"
              >
                Request Pilot
              </BookDemoButton>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-emerald-400"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
