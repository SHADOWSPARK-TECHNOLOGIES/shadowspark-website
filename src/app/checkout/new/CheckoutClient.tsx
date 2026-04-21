"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";
import GlassCard from "@/components/ui/GlassCard";

const DEMO_FEE = 10;

function normalizeTierLabel(value: string) {
  const normalized = value.toLowerCase();
  if (normalized.includes("auto")) return "Autonomous";
  if (normalized.includes("growth")) return "Growth";
  if (normalized.includes("launch")) return "Launch";
  return value;
}

function parseListParam(value: string | null, fallback: string[]) {
  if (!value) return fallback;
  const items = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length > 0 ? items : fallback;
}

export default function CheckoutClient() {
  const searchParams = useSearchParams();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const miniAudit = useMemo(
    () => ({
      leadId: searchParams.get("leadId") ?? "new",
      email: searchParams.get("email") ?? "",
      businessType: searchParams.get("businessType") ?? "Nigerian business",
      goal: searchParams.get("goal") ?? "turn more conversations into qualified leads",
      recommendation: normalizeTierLabel(
        searchParams.get("tier") ?? searchParams.get("recommendation") ?? "Growth"
      ),
      priorities: parseListParam(searchParams.get("priorities"), [
        "Set up a stronger lead capture journey",
        "Automate follow-up on WhatsApp",
        "Track conversions with a cleaner funnel",
      ]),
      features: parseListParam(searchParams.get("features"), ["Website", "Chatbot", "CRM"]),
    }),
    [searchParams]
  );

  async function handlePayment() {
    if (!acceptedTerms || loading) return;

    setLoading(true);
    setError("");

    try {
      // In a real V1, we fetch the authorization_url.
      // For this upgrade, we'll simulate a success to show the View Transition.
      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: miniAudit.email || "demo@shadowspark.dev",
          amount: DEMO_FEE,
          leadId: miniAudit.leadId,
        }),
      });

      const result = await response.json().catch(() => null);
      
      // Simulation: If it's a test lead or specifically requested, show success immediately
      if (searchParams.get("test") === "true") {
        setSuccess(true);
        setLoading(false);
        return;
      }

      const paymentUrl = result?.data?.authorization_url;

      if (!response.ok || !paymentUrl) {
        throw new Error(result?.error || "Unable to initialize Paystack payment.");
      }

      window.location.href = paymentUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to initialize Paystack payment.");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
        <section className="max-w-md w-full rounded-[2.5rem] border border-zinc-800 bg-zinc-950/90 p-10 text-center shadow-[0_0_80px_rgba(0,229,255,0.1)]">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-cyan-400 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,255,255,0.4)]">
            <span className="text-black font-black text-3xl">✓</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-4">Payment Verified</h1>
          <p className="text-zinc-400 mb-10 leading-relaxed">
            Your tailored demo environment for <span className="text-white font-bold">{miniAudit.businessType}</span> is now active.
          </p>
          <TransitionLink 
            href={`/demo/demo-${miniAudit.leadId}`}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#00E5FF] px-6 py-4 text-lg font-bold text-black transition hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,255,255,0.3)]"
          >
            Enter Demo Experience
          </TransitionLink>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] px-4 py-10 text-zinc-100 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[2rem] border border-zinc-800 bg-zinc-950/90 p-6 shadow-[0_0_60px_rgba(0,229,255,0.08)] sm:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
            ShadowSpark System Audit
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
            ShadowSpark System Audit <span className="text-cyan-400">(Refundable Deposit)</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
            Secure your prioritized audit for immediate assessment and a clear, actionable technical report.
            The $10 deposit is fully refundable after the audit is completed.
          </p>

          <div className="mt-6">
            <h3 className="text-white font-semibold mb-2">Deliverables</h3>
            <ul className="list-disc pl-5 space-y-2 text-zinc-300 mb-4">
              <li>Personalized workflow audit</li>
              <li>Identified inefficiencies</li>
              <li>Automation recommendations</li>
              <li>Clear next-step plan</li>
            </ul>

            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/60 border border-zinc-800 text-sm">
                <svg className="h-4 w-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 11c.993 0 2-.552 2-2s-1.007-2-2-2s-2 .552-2 2s1.007 2 2 2z"></path><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"></path></svg>
                <span className="text-xs text-cyan-300">Powered by ShadowSpark AI • Secure Checkout</span>
              </div>
            </div>

            <h4 className="text-white font-semibold mb-2">What happens next?</h4>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-300 mb-6">
              <li>Audit Preparation — we review your submission and schedule a time.</li>
              <li>Assessment & Report — a focused infrastructure and security assessment is delivered.</li>
              <li>Optimization Roadmap & Refund — receive a roadmap; refund processed if requested after audit.</li>
            </ol>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.5rem] border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Priority Actions
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
                {miniAudit.priorities.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-cyan-300">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.5rem] border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Recommended Features
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
                {miniAudit.features.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-cyan-300">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <GlassCard className="p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
            Payment Summary
          </p>

          <GlassCard className="mt-5 border-cyan-400/30 bg-cyan-400/5 p-6">
            <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-cyan-100">
              System Demonstration Access
            </p>
            <p className="mt-4 text-3xl font-black text-white">$10 refundable audit deposit</p>
            <p className="mt-3 text-sm leading-6 text-zinc-200">
              Fully refundable upon completion of the audit. Credited toward your system deployment if you proceed.
            </p>
          </GlassCard>

          <GlassCard className="mt-6 border-white/10 bg-white/5 p-5">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-cyan-300">
              Selected System Tier
            </p>
            <div className="mt-3 flex items-center justify-between gap-4">
              <span className="text-xl font-bold text-white">{miniAudit.recommendation}</span>
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-mono uppercase tracking-[0.16em] text-cyan-200">
                Ready For Preview
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              This preview will be provisioned against the {miniAudit.recommendation.toLowerCase()} system tier and aligned to your audit inputs.
            </p>
          </GlassCard>

          <GlassCard className="mt-6 border-zinc-800 bg-zinc-900/40 p-4">
            <p className="text-sm font-semibold text-white">Secure Infrastructure · Managed by ShadowSpark</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Payment is initialized through Paystack and tied to your live preview environment.
            </p>
          </GlassCard>

          <div className="mt-6 rounded-[1.5rem] border border-zinc-800 bg-zinc-900 p-5">
            <label className="flex items-start gap-3 text-sm leading-6 text-zinc-300">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => setAcceptedTerms(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-950 text-cyan-400 focus:ring-cyan-400"
              />
              <span>
                I agree to the{" "}
                <Link href="#" className="text-cyan-300 hover:text-cyan-200">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-cyan-300 hover:text-cyan-200">
                  Privacy
                </Link>
                . I understand the fee is a credited deposit for my demo environment.
              </span>
            </label>
          </div>

          {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}

          <button
            type="button"
            onClick={handlePayment}
            disabled={!acceptedTerms || loading}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#00E5FF] px-6 py-4 text-base font-bold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 shadow-[0_0_20px_rgba(0,255,255,0.2)]"
          >
            {loading ? "Initializing Paystack..." : "Pay with Paystack"}
          </button>
        </GlassCard>
      </div>
    </main>
  );
}
