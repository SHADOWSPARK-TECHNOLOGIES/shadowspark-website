import Link from "next/link";
import { ArrowRight, BookOpen, ShieldCheck, Lock, Server, Bot } from "lucide-react";
import { BookDemoButton } from "@/components/book-demo-button";

const stats = [
  { value: "65%", label: "Faster Loan Processing", source: "Modeled case study data" },
  { value: "41.2%", label: "Instant Query Deflection", source: "Zendesk CX Trends 2026" },
  { value: "$3.50", label: "ROI Per $1 Invested", source: "Freshworks Research" },
  { value: "NDPA & CBN", label: "Compliant", source: "ICLG Nigeria 2026" },
];

const trustBadges = [
  { icon: ShieldCheck, label: "Bank-Grade Security" },
  { icon: Lock, label: "NDPA Compliant" },
  { icon: Server, label: "99.9% Uptime SLA" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-gold-500/5 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-500" />
              </span>
              Enterprise AI Infrastructure
            </div>

            <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              ShadowSpark is the{" "}
              <span className="text-gold-400">AI Operating System</span> for
              African Fintech
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              Automate loan origination, instant KYC, and intelligent recovery — built for
              the $32.2 billion MSME finance gap.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <BookDemoButton
                location="old_hero_section"
                variant="primary"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold-500 px-8 py-4 text-sm font-bold text-black transition-colors hover:bg-gold-400"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </BookDemoButton>
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-white transition-colors hover:border-white/20 hover:bg-white/10"
              >
                <BookOpen className="h-4 w-4" />
                View Documentation
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-xs font-medium text-zinc-500"
                >
                  <badge.icon className="h-4 w-4 text-gold-400" />
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-sm">
              <div className="mb-6 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-gold-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <div className="ml-4 h-2 flex-1 rounded-full bg-white/10" />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                {[
                  { label: "Loans Today", value: "1,247" },
                  { label: "Avg. KYC Time", value: "52s" },
                  { label: "Recovery Rate", value: "94.2%" },
                ].map((kpi) => (
                  <div
                    key={kpi.label}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <p className="text-xs text-zinc-500">{kpi.label}</p>
                    <p className="mt-1 text-xl font-bold text-white">{kpi.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {[
                  { stage: "Application", count: 312, color: "bg-gold-500" },
                  { stage: "KYC Verified", count: 198, color: "bg-emerald-500" },
                  { stage: "Approved", count: 124, color: "bg-blue-500" },
                ].map((item) => (
                  <div key={item.stage} className="flex items-center gap-4">
                    <span className="w-28 text-xs text-zinc-500">{item.stage}</span>
                    <div className="flex-1 rounded-full bg-white/10">
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

              <div className="mt-6 rounded-xl border border-gold-500/20 bg-gold-500/10 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-gold-500/20 p-2">
                    <Bot className="h-4 w-4 text-gold-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gold-400">AI Recovery Agent</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      47 accounts flagged for polite WhatsApp nudge. Expected recovery: ₦2.4M.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-4 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <div className="font-display text-3xl font-semibold text-white sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-semibold text-zinc-300">{stat.label}</div>
              <div className="mt-1 text-xs text-zinc-600">{stat.source}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
