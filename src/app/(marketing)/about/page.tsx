import type { Metadata } from "next";
import { marketingMetadata } from '@/lib/seo';

export const metadata: Metadata = marketingMetadata(
  '/about',
  'About',
  'Learn why ShadowSpark is developing pilot workflow infrastructure for African fintech teams.',
  '/hero/about-visual.png',
);

import Link from "next/link";
import {
  ArrowLeft,
  Target,
  BookOpen,
  Zap,
  Shield,
  Cpu,
  MapPin,
} from "lucide-react";
import { BookDemoButton } from "@/components/book-demo-button";

// ── Types ─────────────────────────────────────────────────────────────────

type ValueProp = {
  icon: typeof Zap;
  title: string;
  description: string;
};

// ── Data ──────────────────────────────────────────────────────────────────

const valueProps: ValueProp[] = [
  {
    icon: Cpu,
    title: "Pilot Workflow Scope",
    description:
      "Example workflows cover loan intake, identity checks, disbursement review, and recovery coordination.",
  },
  {
    icon: Shield,
    title: "Regulation-Aware Design",
    description:
      "Pilot controls can be mapped to applicable NDPA, CBN, SEC, and FIRS requirements during discovery.",
  },
  {
    icon: Zap,
    title: "Staged Deployment",
    description:
      "Each pilot defines its integrations, review gates, delivery timing, and service expectations before launch.",
  },
];

// ── Page ───────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="bg-obsidian min-h-screen font-sans text-zinc-400 selection:bg-emerald-500/30">
      {/* ── Hero Section ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-zinc-800 px-6 pb-16 pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[200px]" />
          <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-gold-500/3 blur-[160px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-emerald-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-5 py-2 text-[11px] font-mono tracking-[0.22em] text-emerald-400 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            ABOUT
          </div>

          <h1 className="font-display mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            About ShadowSpark
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Developing a pilot-stage workflow platform for African fintech operations.
          </p>
        </div>
      </section>

      {/* ── Content ────────────────────────────────────────────────── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <article className="space-y-12">
            {/* ── Our Mission ──────────────────────────────────────── */}
            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-colors hover:border-zinc-700/50">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                  <Target className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-zinc-100">Our Mission</h2>
                  <p className="mt-4 text-sm leading-7 text-zinc-400">
                    To help African lending teams evaluate automation with explicit human
                    review, compliance mapping, and measurable pilot criteria.
                  </p>
                </div>
              </div>
            </section>

            {/* ── Our Story ────────────────────────────────────────── */}
            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-colors hover:border-zinc-700/50">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                  <BookOpen className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-zinc-100">Our Story</h2>
                  <p className="mt-4 text-sm leading-7 text-zinc-400">
                    ShadowSpark is developing example loan-origination, identity-check,
                    and recovery workflows for an African fintech pilot program. The
                    program is currently exploratory rather than a claim of production use.
                  </p>
                </div>
              </div>
            </section>

            {/* ── What Sets Us Apart ───────────────────────────────── */}
            <section>
              <h2 className="mb-8 text-xl font-semibold text-zinc-100">What Sets Us Apart</h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {valueProps.map((prop) => {
                  const Icon = prop.icon;
                  return (
                    <div
                      key={prop.title}
                      className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-colors hover:border-zinc-700/50"
                    >
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                        <Icon className="h-5 w-5 text-emerald-400" />
                      </div>
                      <h3 className="mb-2 text-base font-semibold text-zinc-100">
                        {prop.title}
                      </h3>
                      <p className="text-sm leading-6 text-zinc-400">{prop.description}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── Our Presence ─────────────────────────────────────── */}
            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-colors hover:border-zinc-700/50">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                  <MapPin className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-zinc-100">Our Presence</h2>
                  <p className="mt-4 text-sm leading-7 text-zinc-400">
                    The current example materials focus on Nigerian lending workflows.
                    Requirements for other African markets would be evaluated during discovery.
                  </p>
                </div>
              </div>
            </section>
          </article>

          {/* ── Bottom CTA ─────────────────────────────────────────── */}
          <div className="mt-16 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
            <p className="text-sm text-zinc-400">
              Ready to explore a ShadowSpark pilot?
            </p>
            <div className="mt-6">
              <BookDemoButton
                location="about_page_cta"
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-6 py-3 text-sm font-bold uppercase tracking-widest text-emerald-400 backdrop-blur-md transition-colors hover:bg-emerald-500/20"
              >
                Book a Demo
              </BookDemoButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
