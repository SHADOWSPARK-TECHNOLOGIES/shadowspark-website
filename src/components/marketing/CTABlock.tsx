"use client";

import Link from "next/link";
import { ShieldCheck, ChevronRight } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";

export default function CTABlock() {
  return (
    <section className="w-full max-w-5xl px-6 py-20">
      <GlassCard className="p-10 md:p-16 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-left max-w-xl">
            <div className="inline-flex items-center gap-2 mb-6 text-[color:var(--spark-cyan)] font-mono text-xs uppercase tracking-widest">
              <ShieldCheck className="w-5 h-5" /> Infrastructure Deployment
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              Ready for<br /><span className="text-[color:var(--spark-cyan)]">Autonomous Operations.</span>
            </h3>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Get a tailored system preview for <span className="text-white font-bold">$1 (₦1,000)</span> – fully credited toward your deployment if you choose to proceed.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="#features" className="flex items-center gap-2">
                See System Architecture <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="bg-zinc-950/50 border border-zinc-800 rounded-3xl p-8 text-center min-w-[280px]">
            <div className="text-5xl font-black text-white mb-2">$1</div>
            <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-8">Credited Deposit</div>
            <Button size="lg" className="w-full h-14 rounded-xl font-bold bg-[color:var(--spark-cyan)] text-black hover:brightness-110" asChild>
              <Link href="/checkout/new">Preview System</Link>
            </Button>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
