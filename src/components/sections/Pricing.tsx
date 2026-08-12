"use client";

import { Check } from "lucide-react";
import { useCalendly } from "@/components/calendly-modal";
import { trackMetaInitiateCheckout } from "@/components/meta-events";

type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  location: string;
  highlighted?: boolean;
};

const tiers: PricingTier[] = [
  {
    name: "Starter",
    price: "Pilot quote",
    description: "Example scope for one focused workflow.",
    features: [
      "One scoped channel",
      "Example workflow configuration",
      "Operator review checkpoints",
      "Pilot onboarding session",
    ],
    cta: "Discuss Pilot",
    location: "pricing_starter",
  },
  {
    name: "Growth",
    price: "Pilot quote",
    description: "Example multi-workflow scope for a growing team.",
    features: [
      "Selected channel prototypes",
      "Example dashboard",
      "Lead-capture integration",
      "CRM boundary assessment",
      "Pilot support plan",
    ],
    cta: "Discuss Pilot",
    location: "pricing_growth",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Example discovery scope for institution-specific needs.",
    features: [
      "Architecture discovery",
      "Integration assessment",
      "Security-control mapping",
      "Service-level planning",
      "Deployment recommendation",
    ],
    cta: "Request Discovery",
    location: "pricing_enterprise",
  },
];

export function Pricing() {
  const { openCalendly } = useCalendly();

  return (
    <section id="pricing" className="border-y border-slate-800 bg-slate-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            Pricing
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Pilot Configurations
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
            These are example scopes, not published price or service commitments. Final
            terms require a written pilot quote.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 ${
                tier.highlighted
                  ? "border-amber-500/50 bg-amber-500/5"
                  : "border-slate-700 bg-slate-900"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-slate-950">
                  Example Configuration
                </span>
              )}
              <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
              <p className="mt-2 text-3xl font-black text-amber-500">{tier.price}</p>
              <p className="mt-2 text-sm text-slate-400">{tier.description}</p>

              <ul className="mt-6 flex flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => {
                  trackMetaInitiateCheckout({
                    value: 0,
                    currency: "NGN",
                    content_name: tier.name,
                    content_type: "pricing_tier",
                  });
                  openCalendly(tier.location);
                }}
                className={`mt-8 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-bold transition-colors ${
                  tier.highlighted
                    ? "bg-amber-500 text-slate-950 hover:bg-amber-400"
                    : "border border-slate-700 text-slate-100 hover:border-slate-500 hover:bg-slate-800"
                }`}
                data-event="calendly_open"
                data-location={tier.location}
                data-analytics={`home-${tier.location}-cta`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
