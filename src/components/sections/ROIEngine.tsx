import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { BookDemoButton } from "@/components/book-demo-button";

const stats = [
  {
    number: "65%",
    label: "Faster Loan Processing",
    sub: "From 14 days to 4 minutes with automated intake and KYC",
    source: "Modeled from production workflows",
  },
  {
    number: "41.2%",
    label: "Instant Query Deflection",
    sub: "Enterprise median for AI-handled customer service",
    source: "Zendesk 2026",
  },
  {
    number: "$3.50",
    label: "ROI Per Dollar Invested",
    sub: "Average return on customer service automation",
    source: "Freshworks 2026",
  },
  {
    number: "₦10M+",
    label: "Non-Compliance Risk",
    sub: "Maximum NDPA penalty for fintech data breaches",
    source: "ICLG Nigeria",
  },
];

export function ROIEngine() {
  return (
    <section className="bg-black py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
            The Enterprise Math
          </span>
          <h2 className="font-display mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Why lenders choose ShadowSpark
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col rounded-xl border border-white/10 bg-white/[0.04] p-6"
            >
              <div className="font-display text-4xl font-semibold text-gold-400 sm:text-5xl">
                {stat.number}
              </div>
              <div className="mt-3 text-base font-semibold text-zinc-100">{stat.label}</div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">{stat.sub}</p>
              <div className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                {stat.source}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <BookDemoButton
            location="roi_engine_section"
            variant="primary"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold-500 px-8 py-4 text-sm font-bold text-black transition-colors hover:bg-gold-400"
          >
            Book a Demo
            <ArrowRight className="h-4 w-4" />
          </BookDemoButton>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-white transition-colors hover:border-white/20 hover:bg-white/10"
          >
            <Download className="h-4 w-4" />
            Download ROI Calculator
          </Link>
        </div>
      </div>
    </section>
  );
}
