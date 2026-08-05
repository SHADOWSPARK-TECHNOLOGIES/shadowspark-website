import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const metrics = [
  { value: "[X]", label: "AI search queries/day" },
  { value: "[Y]", label: "Property managers (multi-tenant isolation)" },
  { value: "Paystack", label: "Payment automation integration" },
];

export function CaseStudy() {
  return (
    <section id="case-study" className="bg-zinc-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
            Case Study
          </span>
          <h2 className="font-display mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Lodgist — ShadowSpark Architecture in Production
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-400">
              <Sparkles className="h-3.5 w-3.5" />
              Powered by ShadowSpark
            </div>
            <p className="text-base leading-relaxed text-zinc-300 sm:text-lg">
              Lodgist runs on the same ShadowSpark infrastructure that powers fintech lenders:
              AI search pipelines, Paystack payment orchestration, multi-tenant RBAC, and
              real-time analytics. This is what ShadowSpark&apos;s platform layer delivers at
              scale — not just for property tech, but for any high-volume African business.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Next.js 15", "TypeScript", "Prisma", "Neon PostgreSQL", "Paystack", "AI Search"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-500"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
            <Link
              href="https://lodgist.com.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gold-500 px-8 py-4 text-sm font-bold text-black transition-colors hover:bg-gold-400"
            >
              See Lodgist Live
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              >
                <p className="font-display text-2xl font-semibold text-white sm:text-3xl">
                  {metric.value}
                </p>
                <p className="mt-1 text-sm text-zinc-500">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
