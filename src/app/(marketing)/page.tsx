/**
 * ═══════════════════════════════════════════════════════════════
 * EXECUTIVE TERMINAL — Primary Marketing Interface
 * ═══════════════════════════════════════════════════════════════
 *
 * Aesthetic: OBSIDIAN HUD (Glassmorphism 2.0)
 *   - Obsidian Black (#0a0b0d) base
 *   - Deep Emerald (#10956a) primary
 *   - Sovereign Gold (#c9922a) compliance accents
 *   - Liquid Glass: blur(12px) saturate(160%) Tier I panels
 *   - Golden Curve: cubic-bezier(0.16, 1, 0.3, 1) transitions
 *
 * Sections:
 *   1. Topbar — "The Compliance Anchor" (SEC ARIP + BVN Shield badges)
 *   2. Hero — "Institutional Intent" (Dynamic copy + Ledger display)
 *   3. Executive Shield — Anti-Deepfake Identity (Orbital Scan Ring)
 *   4. Market Pulse — RAG Regulatory Feed (Vertical glass cards)
 *   5. RWA Securitization — Epe/Ikoyi/Patek Philippe token cards
 *   6. Final CTA — "Initialize Onboarding" + Trust signals
 *
 * Zero hydration errors: client sub-components use "use client"
 * while the shell is an async Server Component.
 * ═══════════════════════════════════════════════════════════════
 */

import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Shield, FileText, ScrollText } from "lucide-react";
import { Topbar } from "@/components/marketing/Topbar";
import { SovereignLogo } from "@/components/marketing/SovereignLogo";
import { MarketPulse } from "@/components/marketing/MarketPulse";
import { LedgerTransparency } from "@/components/marketing/LedgerTransparency";
import { OrbitalScanRing } from "@/components/marketing/OrbitalScanRing";
import { RWASecuritization } from "@/components/marketing/RWASecuritization";

// ── Types ─────────────────────────────────────────────────────────────────

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// ── Hero copy variants ────────────────────────────────────────────────────

type HeroCopy = {
  badge: string;
  headline: string;
  subheadline: string;
};

const HERO_COPIES: Record<string, HeroCopy> = {
  default: {
    badge: "SOVEREIGN FINANCIAL NODE — LAGOS MAINNET",
    headline:
      "Total Visibility. Sovereign Wealth. Anti-Fragile Architecture.",
    subheadline:
      "Institutional-grade financial infrastructure for High-Net-Worth liquidity movers in the 2026 Lagos market. Real-time ledger transparency, automated regulatory compliance, and AI-powered treasury operations — hardened for the May 1st BVN-Phone Lock.",
  },
  vasp: {
    badge: "SEC CIRCULAR 26-1 COMPLIANCE ENGINE",
    headline:
      "SEC Circular 26-1 Compliance. Automated. Institutional-Grade.",
    subheadline:
      "VASP capital requirement deadline June 2027. Shadowspark automates your compliance pipeline — capital reserve provisioning, regulatory reporting, and treasury custody — so you meet the ₦2 billion threshold before the regulator's deadline.",
  },
  rwa: {
    badge: "RWA SECURITIZATION ENGINE",
    headline:
      "Fractional Liquidity for Lagos Real Estate. Securitized in Kobo.",
    subheadline:
      "Tokenize high-value Lagos real estate into liquid, tradeable fractions. Each kobo-denominated share is backed by title-deeded assets — Epe, Ikoyi, Banana Island. Smart-contract custody with full on-chain transparency.",
  },
};

// ── Section 1: Topbar ─────────────────────────────────────────────────────
// Injected via Topbar client component (fixed position)

// ── Section 2: Hero — "Institutional Intent" ─────────────────────────────

async function HeroSection({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const trigger =
    typeof params?.vasp !== "undefined"
      ? "vasp"
      : typeof params?.rwa !== "undefined"
        ? "rwa"
        : typeof params?.intent === "string" && params.intent === "vasp"
          ? "vasp"
          : typeof params?.intent === "string" && params.intent === "rwa"
            ? "rwa"
            : "default";

  const copy = HERO_COPIES[trigger] ?? HERO_COPIES.default;

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28">
      {/* Vortex background glow — emerald/gold */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[200px]" />
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-gold-500/3 blur-[160px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-emerald-500/3 blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        {/* Sovereign Node Logo */}
        <div className="mb-8 golden-transition">
          <SovereignLogo size={64} animated variant="emerald" />
        </div>

        {/* HUD Status Badge */}
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-5 py-2 text-[11px] font-mono tracking-[0.22em] text-emerald-400 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {copy.badge}
          <span className="text-zinc-600">v1.0</span>
        </div>

        {/* Headline — using font-display (Cormorant Garamond) */}
        <h1 className="font-display max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl golden-transition">
          {copy.headline}
        </h1>

        {/* Subheadline */}
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg md:text-xl font-sans">
          {copy.subheadline}
        </p>

        {/* Predictive UI — Ledger Liquidity Display */}
        <div className="mt-12 w-full max-w-lg">
          <Suspense
            fallback={
              <div className="h-28 w-full animate-pulse rounded-2xl bg-white/[0.03]" />
            }
          >
            <LedgerTransparency />
          </Suspense>
        </div>

        {/* CTA Cluster */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/checkout/new"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-8 py-4 text-sm font-bold uppercase tracking-widest text-emerald-400 backdrop-blur-md golden-transition duration-300 hover:bg-emerald-500/20 hover:shadow-[0_0_40px_rgba(16,149,106,0.15)]"
          >
            {/* HUD scanline */}
            <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(16,149,106,0.08),transparent)] translate-x-[-100%] golden-transition duration-700 group-hover:translate-x-[100%]" />
            <Shield className="h-4 w-4" />
            Initialize Onboarding
            <ArrowRight className="h-4 w-4 golden-transition duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/admin/health"
            className="inline-flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] px-8 py-4 text-sm font-medium text-zinc-300 backdrop-blur-md golden-transition duration-300 hover:border-white/20 hover:bg-white/10"
          >
            <FileText className="h-4 w-4" />
            View Q2 2026 Regulatory Intelligence
          </Link>
        </div>

        {/* BVN Lock Anchor */}
        <div className="mt-10 flex items-center gap-3 rounded-full border border-gold-500/20 bg-gold-500/5 px-5 py-2 text-[10px] font-mono uppercase tracking-wider text-gold-400/80">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-500" />
          </span>
          CBN BVN-PHONE LOCK: MAY 1st — IDENTITY ANCHORED & COMPLIANT
        </div>
      </div>
    </section>
  );
}

// ── Section 3: Executive Shield (Anti-Deepfake Identity) ─────────────────

function ExecutiveShieldSection() {
  return (
    <section className="relative border-t border-white/5 py-24">
      {/* Background depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,149,106,0.04),transparent_50%)]" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Section badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/10 bg-emerald-500/5 px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.22em] text-emerald-400">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
          The Executive Shield
        </div>

        <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white md:text-5xl golden-transition">
          Anti-Deepfake Identity Infrastructure
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 font-sans">
          69% of biometric fraud is now AI-generated. Shadowspark deploys
          Active Liveness + Passive Behavioral Biometrics to secure every
          identity verification — hardware-backed FIDO2, liveness detection,
          and behavioral profiling that runs silently in the background.
        </p>

        {/* Orbital Scan Ring */}
        <div className="mt-12 flex justify-center">
          <OrbitalScanRing />
        </div>
      </div>
    </section>
  );
}

// ── Section 4: Market Pulse (RAG Regulatory Feed) ────────────────────────

function MarketPulseSection() {
  return (
    <section className="relative border-t border-white/5 py-24">
      {/* Background depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(201,146,42,0.03),transparent_50%)]" />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Section header */}
        <div className="mb-4 flex items-center gap-2.5">
          <ScrollText className="h-4 w-4 text-gold-500" />
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-white font-display">
              Market Pulse
            </h2>
            <p className="text-[10px] font-mono text-zinc-600">
              REGULATORY SIGNAL FEED — FIRECRAWL RAG BRIDGE
            </p>
          </div>
        </div>

        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-zinc-500 font-sans">
          Real-time regulatory signals ingested from CBN, SEC, NITDA, and NIBSS
          portals via the Firecrawl semantic bridge. Each signal includes a
          Semantic Proximity score indicating alignment strength.
        </p>

        <Suspense
          fallback={
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 w-full animate-pulse rounded-xl bg-white/[0.03]"
                />
              ))}
            </div>
          }
        >
          <MarketPulse />
        </Suspense>

        {/* CTA link */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/admin/health"
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-gold-400 golden-transition duration-300 hover:text-gold-300"
          >
            <FileText className="h-3.5 w-3.5" />
            View Full Q2 2026 Regulatory Intelligence Report
            <ArrowRight className="h-3.5 w-3.5 golden-transition duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Section 5: RWA Securitization ────────────────────────────────────────

// Handled by RWASecuritization server component

// ── Section 6: Final CTA — Executive Access ──────────────────────────────

function FinalCTASection() {
  return (
    <section className="relative border-t border-white/5 py-24">
      {/* Background depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,149,106,0.03),transparent_50%)]" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* HUD Section Header */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/10 bg-emerald-500/5 px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.22em] text-emerald-400">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Executive Access
        </div>

        <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white md:text-5xl golden-transition">
          Deploy Your Sovereign Financial Node
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 font-sans">
          Initialize your institutional onboarding to access the full Shadowspark
          treasury suite — real-time ledger, automated regulatory compliance,
          AI-powered liquidity management, and RWA securitization for the Lagos
          market. Hardened for the May 1st BVN-Phone Lock.
        </p>

        {/* CTA cluster */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/checkout/new"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-10 py-5 text-sm font-bold uppercase tracking-widest text-emerald-400 backdrop-blur-md golden-transition duration-300 hover:bg-emerald-500/20 hover:shadow-[0_0_60px_rgba(16,149,106,0.2)]"
          >
            <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(16,149,106,0.1),transparent)] translate-x-[-100%] golden-transition duration-700 group-hover:translate-x-[100%]" />
            <Shield className="h-5 w-5" />
            Initialize Onboarding
            <ArrowRight className="h-5 w-5 golden-transition duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/admin/health"
            className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-10 py-5 text-sm font-medium text-zinc-300 backdrop-blur-md golden-transition duration-300 hover:border-white/20 hover:bg-white/10"
          >
            <FileText className="h-5 w-5" />
            View Q2 2026 Regulatory Intelligence
          </Link>
        </div>

        {/* Trust signals */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">
          <span className="flex items-center gap-2">
            <span className="inline-block h-1 w-1 rounded-full bg-emerald-500" />
            SOC 2 Type II
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1 w-1 rounded-full bg-emerald-500" />
            AES-256 Encrypted
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1 w-1 rounded-full bg-emerald-500" />
            NDPC Compliant
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1 w-1 rounded-full bg-emerald-500" />
            Double-Entry Ledger
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1 w-1 rounded-full bg-emerald-500" />
            BVN-Phone Lock Ready
          </span>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────

function TerminalFooter() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <SovereignLogo size={28} animated={false} variant="emerald" />
            <span className="text-sm font-bold tracking-tight text-white font-sans">
              SHADOWSPARK
            </span>
          </div>

          <p className="text-[10px] font-mono tracking-[0.15em] text-zinc-700">
            SOVEREIGN FINANCIAL NODE — LAGOS MAINNET
          </p>

          <div className="flex items-center gap-6 text-[11px] text-zinc-600">
            <span>v1.0.0</span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              OPERATIONAL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────

export default async function ExecutiveTerminal({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div className="bg-obsidian font-sans text-zinc-400 selection:bg-emerald-500/30">
      {/* Section 1: Fixed Compliance Anchor Topbar */}
      <Topbar />

      {/* Spacer for fixed topbar */}
      <div className="h-14" />

      {/* Section 2: Hero — Institutional Intent */}
      <HeroSection searchParams={searchParams} />

      {/* Section 3: Executive Shield — Anti-Deepfake Identity */}
      <ExecutiveShieldSection />

      {/* Section 4: Market Pulse — RAG Regulatory Feed */}
      <MarketPulseSection />

      {/* Section 5: RWA Securitization */}
      <RWASecuritization />

      {/* Section 6: Final CTA */}
      <FinalCTASection />

      {/* Footer */}
      <TerminalFooter />
    </div>
  );
}
