"use client";

import { useEffect, useState } from "react";
import { generateAuditAction } from "@/app/actions/generate-audit";
import { Badge } from "./ui/badge";
import { Loader2, CheckCircle2 } from "lucide-react";

interface AuditData {
  recommendedPackage: string;
  headline: string;
  bullets: string[];
}

interface MiniAuditProps {
  businessType?: string;
  goals?: string;
  features?: string[];
  recommendedPackage?: string;
  showCta?: boolean;
}

export default function MiniAudit({ 
  businessType = "Logistics", 
  goals = "Scaling operations", 
  features = ["WhatsApp Automation"],
  recommendedPackage,
  showCta = true
}: MiniAuditProps) {
  const [data, setData] = useState<AuditData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function runAudit() {
      const result = await generateAuditAction({ businessType, goals, features });
      // If a package was explicitly passed (e.g. from QualificationForm), use it
      if (recommendedPackage) {
        result.recommendedPackage = recommendedPackage.charAt(0).toUpperCase() + recommendedPackage.slice(1);
      }
      setData(result);
      setLoading(false);
    }
    runAudit();
  }, [businessType, goals, features, recommendedPackage]);

  if (loading) {
    return (
      <div className="w-full max-w-2xl bg-zinc-900/50 border border-zinc-800 rounded-3xl p-10 animate-pulse">
        <div className="h-4 w-24 bg-zinc-800 rounded-full mb-6" />
        <div className="h-10 w-3/4 bg-zinc-800 rounded-lg mb-8" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-6 w-full bg-zinc-800 rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="audit-reveal w-full max-w-2xl bg-[#0A0A0A] border border-[#00FFFF]/20 rounded-3xl p-10 shadow-[0_0_50px_rgba(0,255,255,0.05)]">
      <Badge variant="outline" className="mb-6 border-[#00FFFF]/40 text-[#00FFFF] px-4 py-1 font-mono uppercase tracking-widest text-xs">
        {data?.recommendedPackage} Tier Recommended
      </Badge>
      
      <h3 className="text-3xl font-black text-white mb-8 leading-tight tracking-tight">
        {data?.headline}
      </h3>
      
      <ul className="space-y-6">
        {data?.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-4 group" data-index={i}>
            <CheckCircle2 className="w-6 h-6 text-[#00FFFF] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
            <p className="text-zinc-400 text-lg leading-relaxed">{bullet}</p>
          </li>
        ))}
      </ul>

      {showCta && (
        <div className="mt-10 pt-8 border-t border-zinc-900 text-center">
           <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest">Diagnostic ID: SS-AUDIT-{Math.floor(Math.random() * 10000)}</p>
        </div>
      )}
    </section>
  );
}
