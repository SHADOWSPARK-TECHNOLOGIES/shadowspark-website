import type { Metadata } from "next";
import { canonical } from "@/lib/seo";
import { SiteNav } from "@/components/landing/SiteNav";
import { PilotApplyForm } from "@/components/marketing/PilotApplyForm";

export const metadata: Metadata = {
  ...canonical("/pilot-apply"),
  title: "Apply for a Pilot — ShadowSpark",
  description:
    "Apply for a ShadowSpark product pilot. Join the Nigerian-born AI startup shipping trusted infrastructure for property, public sector, and customer experience.",
  openGraph: {
    title: "Apply for a Pilot — ShadowSpark",
    description:
      "Apply for a ShadowSpark pilot. Production AI, built for Nigeria, shipped not pitched.",
  },
};

export default function PilotApplyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <SiteNav active="products" />

      <section className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-300">
            Pilot Access
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Ship with us first.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            Apply for an early pilot of Lodgist, the ShadowSpark Chatbot Engine, or
            a tailored AI agent. We respond within two business days.
          </p>
        </div>

        <div className="mt-12">
          <PilotApplyForm />
        </div>
      </section>
    </main>
  );
}
