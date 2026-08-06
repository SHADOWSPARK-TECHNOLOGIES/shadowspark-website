import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-slate-800 bg-slate-950 py-20 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          Ready to Transform Your Loan Operations?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base text-slate-400 sm:text-lg">
          Join Nigerian lenders already using ShadowSpark to automate intake, verify
          identities, and recover payments with AI.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-10 py-4 text-base font-bold text-slate-950 transition-colors hover:bg-amber-400"
          >
            Book a Demo
            <ArrowRight className="h-5 w-5" />
          </Link>
          <a
            href="https://wa.me/2340000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-transparent px-10 py-4 text-base font-bold text-slate-100 transition-colors hover:border-slate-500 hover:bg-slate-900"
          >
            <MessageCircle className="h-5 w-5" />
            Chat on WhatsApp
          </a>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          No long-term contracts. Transparent pricing. Security-first deployment.
        </p>
      </div>
    </section>
  );
}
