"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Radio, FileText, AlertTriangle, TrendingUp, Clock } from "lucide-react";
import { trackMetaEvent } from "@/components/meta-events";

// Illustrative signals show the intended review workflow without claiming live data.
const signals = [
  {
    regulator: "SEC Nigeria",
    title: "Circular 26-1 VASP capital deadline",
    detail: "Example: a capital-base deadline can be mapped to an operator review task.",
    type: "deadline",
    date: "Example",
    confidence: 0.94,
  },
  {
    regulator: "CBN",
    title: "Open Banking guideline refresh",
    detail: "Example: a guidance update can trigger review of consent workflows.",
    type: "guideline",
    date: "Example",
    confidence: 0.87,
  },
  {
    regulator: "NITDA / NDPC",
    title: "Data Protection Act 2023 enforcement",
    detail: "Example: a policy change can trigger a consent-log control review.",
    type: "compliance",
    date: "Example",
    confidence: 0.91,
  },
  {
    regulator: "NIBSS",
    title: "NIP real-time settlement uplift",
    detail: "Example: an infrastructure notice can be routed to operations reviewers.",
    type: "infrastructure",
    date: "Example",
    confidence: 0.82,
  },
];

const typeIcons: Record<string, typeof FileText> = {
  deadline: AlertTriangle,
  guideline: FileText,
  compliance: Clock,
  infrastructure: TrendingUp,
};

const typeColors: Record<string, string> = {
  deadline: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  guideline: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  compliance: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  infrastructure: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
};

export function RegulatoryPulse() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      trackMetaEvent("RegulatoryPulseView", { location: "home_page" });
    }
  }, [isInView]);

  return (
    <section ref={ref} id="regulatory-pulse" className="bg-slate-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            Self-Improving Intelligence
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Regulatory Pulse
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
            This illustrative feed shows how configured public-source updates can be summarized
            for human review. It is not a live regulatory advisory service.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {signals.map((signal, index) => {
            const Icon = typeIcons[signal.type] ?? FileText;
            return (
              <motion.div
                key={signal.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex gap-4 rounded-xl border border-slate-700 bg-slate-900 p-5 transition-colors hover:border-slate-600 hover:bg-slate-800"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${typeColors[signal.type]}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
                      {signal.regulator}
                    </span>
                    <span className="text-xs text-slate-500">· {signal.date}</span>
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-slate-100">{signal.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{signal.detail}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-1.5 flex-1 max-w-[120px] rounded-full bg-slate-700">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{ width: `${signal.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500">
                      Example confidence {Math.round(signal.confidence * 100)}%
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-slate-400">
            <Radio className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
            Example feed · source refresh requires deployment configuration
          </p>
        </motion.div>
      </div>
    </section>
  );
}
