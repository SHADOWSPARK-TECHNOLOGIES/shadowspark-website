"use client";

import { useCalendly } from "@/components/calendly-modal";

const CALENDLY_HREF =
  "https://calendly.com/wonderstevie702/30min?utm_source=shadowspark&utm_medium=website&utm_campaign=enterprise";

type PricingCTAButtonProps = {
  tierName: string;
  highlighted: boolean;
  children: React.ReactNode;
};

export function PricingCTAButton({ tierName, highlighted, children }: PricingCTAButtonProps) {
  const { openCalendly } = useCalendly();
  const location = `pricing_${tierName.toLowerCase()}`;

  return (
    <a
      href={CALENDLY_HREF}
      onClick={(event) => {
        event.preventDefault();
        openCalendly(location);
      }}
      className={`mt-8 inline-flex w-full items-center justify-center rounded-lg px-6 py-3 text-sm font-bold uppercase tracking-widest transition-all ${
        highlighted
          ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 backdrop-blur-md hover:bg-emerald-500/20 hover:shadow-[0_0_40px_rgba(16,149,106,0.15)]"
          : "border border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800"
      }`}
      data-event="calendly_open"
      data-location={location}
      data-analytics={`pricing-${tierName.toLowerCase()}-cta`}
    >
      {children}
    </a>
  );
}
