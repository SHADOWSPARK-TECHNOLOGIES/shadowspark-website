import type { Metadata } from "next";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/about"),
  title: "About",
  description:
    "ShadowSpark builds the AI Operating System for African fintech — automating loan origination, instant KYC, and intelligent recovery at enterprise scale.",
};

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

type Leader = {
  name: string;
  role: string;
  bio: string;
};

// ── Data ──────────────────────────────────────────────────────────────────

const valueProps: ValueProp[] = [
  {
    icon: Cpu,
    title: "AI-Native Lending Infrastructure",
    description:
      "End-to-end automation for loan intake, KYC, disbursement, and recovery — built as a single platform layer.",
  },
  {
    icon: Shield,
    title: "Built for African Regulation",
    description:
      "Deep integration with NDPA, CBN, SEC, and FIRS frameworks. Compliance is the default, not an afterthought.",
  },
  {
    icon: Zap,
    title: "Deployment-Ready Speed",
    description:
      "Go live in weeks, not quarters. Configured tenants, pre-built workflows, and enterprise SLAs from day one.",
  },
];

const leadership: Leader[] = [
  {
    name: "Stephen Okoronkwo",
    role: "Founder & Architect",
    bio: "Architect of the ShadowSpark platform. Deep expertise in distributed systems, AI/ML, and African fintech infrastructure.",
  },
  {
    name: "Chidi Okonkwo",
    role: "Chief Compliance Officer",
    bio: "Former SEC Nigeria senior examiner with 15+ years in financial regulation. Leads our regulatory framework integration across SEC, CBN, and FIRS mandates.",
  },
  {
    name: "Amara Eze",
    role: "Head of Engineering",
    bio: "Distributed systems engineer who built payment infrastructure processing over ₦50 billion in transaction volume across African fintech platforms.",
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
            Building the AI Operating System that powers the next generation of African
            fintech lending.
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
                    To provide African lenders with an AI-powered operating system that
                    automates loan operations, enforces compliance by design, and scales
                    from first disbursement to national deployment.
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
                    Founded in Nigeria, ShadowSpark began with the belief that African
                    lenders deserve infrastructure built for African markets — not adapted
                    from foreign systems. Today, our platform powers loan origination, KYC,
                    and recovery for fintechs and microfinance banks across the continent.
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

            {/* ── Leadership ───────────────────────────────────────── */}
            <section>
              <h2 className="mb-8 text-xl font-semibold text-zinc-100">Leadership</h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {leadership.map((leader) => (
                  <div
                    key={leader.name}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-colors hover:border-zinc-700/50"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10">
                      <span className="font-mono text-sm font-bold text-emerald-400">
                        {leader.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-zinc-100">{leader.name}</h3>
                    <p className="mb-3 mt-1 font-mono text-xs uppercase tracking-wider text-emerald-400/80">
                      {leader.role}
                    </p>
                    <p className="text-sm leading-6 text-zinc-400">{leader.bio}</p>
                  </div>
                ))}
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
                    Headquartered in Nigeria, serving enterprise lenders across Lagos,
                    Abuja, Nairobi, and emerging African fintech hubs.
                  </p>
                </div>
              </div>
            </section>
          </article>

          {/* ── Bottom CTA ─────────────────────────────────────────── */}
          <div className="mt-16 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
            <p className="text-sm text-zinc-400">
              Ready to deploy ShadowSpark infrastructure?
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
