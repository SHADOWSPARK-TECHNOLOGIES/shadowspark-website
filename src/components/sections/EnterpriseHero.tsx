import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function EnterpriseHero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-amber-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </span>
            Enterprise AI Infrastructure
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            The AI Operating System for African Fintech.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Automate loan origination, instant KYC, and compliance. Built for lenders across
            Nigeria, Kenya, and the wider African market.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-8 py-4 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-400"
            >
              Book a Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-transparent px-8 py-4 text-sm font-bold text-white transition-colors hover:border-slate-500 hover:bg-slate-900"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
