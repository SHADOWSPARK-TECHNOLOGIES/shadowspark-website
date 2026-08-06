"use client";

import Link from "next/link";
import { ArrowRight, Play, Bot } from "lucide-react";
import { useCalendly } from "@/components/calendly-modal";

const trustPills = [
  "65% faster loan processing",
  "41.2% instant query deflection",
  "$3.50 ROI per $1 invested",
  "NDPA & CBN Compliant",
];

const kpis = [
  { label: "Loans Today", value: "1,247" },
  { label: "Avg. KYC Time", value: "52s" },
  { label: "Recovery Rate", value: "94.2%" },
];

const pipeline = [
  { stage: "Application", count: 312, color: "bg-amber-500" },
  { stage: "KYC Verified", count: 198, color: "bg-emerald-500" },
  { stage: "Approved", count: 124, color: "bg-blue-500" },
];

export function EnterpriseHero() {
  const { openCalendly } = useCalendly();

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden bg-slate-950 py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-amber-500/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
              </span>
              Enterprise AI Infrastructure
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              ShadowSpark is the{" "}
              <span className="text-amber-500">AI Operating System</span> for
              African Fintech
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              Automate loan origination, instant KYC verification, and intelligent
              payment recovery. Built for microfinance banks and digital lenders
              processing the $32.2 billion MSME credit gap.
            </p>

            <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => openCalendly("hero")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-8 py-4 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-400"
                data-event="calendly_open"
                data-location="hero"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-transparent px-8 py-4 text-sm font-bold text-slate-100 transition-colors hover:border-slate-500 hover:bg-slate-900"
              >
                <Play className="h-4 w-4" />
                See How It Works
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl border border-slate-700 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-sm">
              <div className="mb-6 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <div className="ml-4 h-2 flex-1 rounded-full bg-slate-700" />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                {kpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="rounded-xl border border-slate-700 bg-slate-800/50 p-4"
                  >
                    <p className="text-xs text-slate-500">{kpi.label}</p>
                    <p className="mt-1 text-xl font-bold text-white">{kpi.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {pipeline.map((item) => (
                  <div key={item.stage} className="flex items-center gap-4">
                    <span className="w-28 text-xs text-slate-500">{item.stage}</span>
                    <div className="flex-1 rounded-full bg-slate-700">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${(item.count / 312) * 100}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-xs font-semibold text-white">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-amber-500/20 p-2">
                    <Bot className="h-4 w-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-amber-400">AI Recovery Agent</p>
                    <p className="mt-1 text-xs text-slate-500">
                      47 accounts flagged for polite WhatsApp nudge. Expected recovery: ₦2.4M.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-3 border-t border-slate-800 pt-10">
          {trustPills.map((pill) => (
            <span
              key={pill}
              className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-300"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
