"use client";

import { ExternalLink } from "lucide-react";

import { gaEvent } from "@/components/google-analytics";
import { cn } from "@/lib/utils";

/** Absolute product URL. Deep link only — do not iframe or rewrite. */
export const LODGIST_URL = "https://lodgist.online";

type LodgistCtaProps = {
  location: string;
  label?: string;
  variant?: "button" | "nav" | "link";
  className?: string;
  onClick?: () => void;
};

const variantClassName = {
  button:
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-transparent px-8 py-4 text-sm font-bold text-slate-100 transition-colors hover:border-slate-500 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none",
  nav: "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-sm font-bold text-slate-100 transition-colors hover:border-slate-500 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none",
  link: "inline-flex items-center gap-1.5 rounded text-sm text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none",
} as const;

/** Secondary product CTA that opens Lodgist in a new tab and records the click. */
export function LodgistCta({
  location,
  label = "Open Lodgist",
  variant = "button",
  className,
  onClick,
}: LodgistCtaProps) {
  return (
    <a
      href={LODGIST_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      data-analytics={`lodgist-cta-${location}`}
      data-event="lodgist_cta_click"
      data-location={location}
      onClick={() => {
        onClick?.();
        gaEvent("lodgist_cta_click", { location });
      }}
      className={cn(variantClassName[variant], className)}
    >
      {label}
      <ExternalLink aria-hidden="true" className={variant === "link" ? "h-3.5 w-3.5" : "h-4 w-4"} />
    </a>
  );
}
