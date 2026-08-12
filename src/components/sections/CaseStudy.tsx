import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const metrics = [
  { value: "Example", label: "AI-assisted search workflow" },
  { value: "Example", label: "Tenant-isolation pattern" },
  { value: "Example", label: "Payment-orchestration boundary" },
];

export function CaseStudy() {
  return (
    <section id="case-study" className="border-y border-slate-800 bg-slate-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            Architecture Example
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Example Implementation: Lending Operations
          </h2>
          <p className="mt-2 text-lg text-slate-400">
            Reference architecture, not a customer-performance claim
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 sm:p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Sparkles className="h-3.5 w-3.5" />
              Example pattern
            </div>
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
              This reference example illustrates reusable patterns for AI-assisted search,
              payment orchestration, tenant-aware authorization, and operational analytics.
              It does not represent verified lender volume or performance.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Web application", "Typed workflows", "Relational data", "Payment boundary", "AI-assisted search"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 text-xs text-slate-500"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
            <Link
              href="/demo"
              data-analytics="case-study-view-example"
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-6 py-3 text-sm font-bold text-amber-400 transition-colors hover:bg-amber-500/20"
            >
              View Workflow Example
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-slate-700 bg-slate-900 p-6"
              >
                <p className="text-2xl font-bold text-white sm:text-3xl">{metric.value}</p>
                <p className="mt-1 text-sm text-slate-500">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
