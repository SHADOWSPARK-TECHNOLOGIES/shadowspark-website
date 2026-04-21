"use client";

import { useEffect } from "react";
import { trackCheckoutView } from "@/app/actions/track-checkout";
import { useParams } from "next/navigation";

export default function CheckoutPage() {
  const params = useParams();
  const leadId = typeof params.leadId === 'string' ? params.leadId : Array.isArray(params.leadId) ? params.leadId[0] : '';

  useEffect(() => {
    if (leadId) {
      trackCheckoutView(leadId).catch(console.error);
    }
  }, [leadId]);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col items-center py-20 px-6 font-sans">
      <div className="max-w-2xl w-full">
        {/* Trust Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-400 tracking-widest uppercase">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Powered by ShadowSpark AI • Secure Checkout
          </div>
        </div>

        <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-white tracking-tight text-center mb-2">
            ShadowSpark System Audit
          </h1>
          <p className="text-center text-zinc-400 mb-8 font-medium">
            (Fully Refundable Deposit)
          </p>

          <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800/50 mb-8">
            <h3 className="text-sm uppercase tracking-widest text-zinc-500 font-bold mb-4">Deliverables:</h3>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-start gap-3">
                <span className="text-cyan-400">✓</span> Infrastructure Assessment
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400">✓</span> Security Gap Report
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400">✓</span> AI Optimization Roadmap
              </li>
            </ul>
          </div>

          <div className="text-center mb-8">
            <div className="text-5xl font-bold text-white tracking-tighter mb-2">$10</div>
            <p className="text-sm text-cyan-400/80 font-medium">
              Fully refundable upon audit completion
            </p>
          </div>

          {/* Paystack / Payment Integration Placeholder */}
          <button 
            className="w-full rounded-full bg-cyan-500 px-6 py-4 text-base font-bold text-black transition-all hover:bg-cyan-400 hover:scale-[1.02] shadow-[0_0_30px_rgba(0,255,255,0.2)]"
            onClick={() => alert(`Initiating payment for lead: ${leadId}`)}
          >
            Secure Your Slot
          </button>
        </div>

        <div className="mt-12">
          <h3 className="text-center text-sm uppercase tracking-widest text-zinc-500 font-bold mb-6">What happens next?</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-center">
              <div className="text-cyan-400 font-bold text-xl mb-2">1</div>
              <p className="text-sm text-zinc-400">Deposit locked & slot reserved instantly.</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-center">
              <div className="text-cyan-400 font-bold text-xl mb-2">2</div>
              <p className="text-sm text-zinc-400">Our architects analyze your current infrastructure.</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-center">
              <div className="text-cyan-400 font-bold text-xl mb-2">3</div>
              <p className="text-sm text-zinc-400">We present the roadmap and refund the deposit.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
