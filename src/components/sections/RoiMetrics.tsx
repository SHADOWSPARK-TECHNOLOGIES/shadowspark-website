"use client";

import { ArrowRight, Download } from "lucide-react";
import { useCalendly } from "@/components/calendly-modal";

type Metric = {
  value: string;
  label: string;
  body: string;
  source: string;
};

const metrics: Metric[] = [
  {
    value: "65%",
    label: "Faster Loan Processing",
    body: "From 14 days to 4 minutes with automated intake and KYC.",
    source: "Modeled from production workflows",
  },
  {
    value: "41.2%",
    label: "Instant Query Deflection",
    body: "Enterprise median for AI-handled customer service.",
    source: "Zendesk CX Trends 2026",
  },
  {
    value: "$3.50",
    label: "ROI Per Dollar Invested",
    body: "Average return on customer service automation.",
    source: "Freshworks Research 2026",
  },
  {
    value: "₦10M+",
    label: "Non-Compliance Risk",
    body: "Maximum NDPA penalty for fintech data breaches.",
    source: "ICLG Nigeria 2026",
  },
];

export function RoiMetrics() {
  const { openCalendly } = useCalendly();

  return (
    <section id="roi" className="bg-slate-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            The Enterprise Math
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Why Lenders Choose ShadowSpark
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col rounded-xl border border-slate-700 bg-slate-900 p-6 text-center transition-colors hover:border-slate-600 hover:bg-slate-800"
            >
              <div className="text-4xl font-black text-amber-500 sm:text-5xl">
                {metric.value}
              </div>
              <div className="mt-3 text-base font-semibold text-slate-100">
                {metric.label}
              </div>
              <div className="mt-2 text-sm text-slate-400">{metric.body}</div>
              <div className="mt-auto pt-4 text-xs text-slate-500">{metric.source}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => openCalendly("roi")}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-8 py-4 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-400"
            data-event="calendly_open"
            data-location="roi"
          >
            Book a Demo
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-transparent px-8 py-4 text-sm font-bold text-slate-100 transition-colors hover:border-slate-500 hover:bg-slate-900"
          >
            <Download className="h-4 w-4" />
            Download ROI Calculator
          </button>
        </div>
      </div>
    </section>
  );
}
