"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Plug, ShieldCheck, Rocket, ArrowRight } from "lucide-react";
import { trackMetaEvent } from "@/components/meta-events";

const steps = [
  {
    icon: Plug,
    title: "Connect",
    description:
      "Plug ShadowSpark into WhatsApp, your core banking system, and KYC providers in under 48 hours.",
  },
  {
    icon: ShieldCheck,
    title: "Verify",
    description:
      "Automate BVN/NIN checks, document OCR, and regulatory consent capture with immutable audit logs.",
  },
  {
    icon: Rocket,
    title: "Deploy",
    description:
      "Launch AI loan intake, recovery agents, and compliance monitoring across every channel your customers use.",
  },
];

export function SovereignPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      trackMetaEvent("PipelineStepView", { location: "home_page" });
    }
  }, [isInView]);

  return (
    <section ref={ref} id="pipeline" className="border-y border-slate-800 bg-slate-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            Deployment Flow
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            From Zero to Live in Three Steps
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
            No six-month implementation. No rip-and-replace. ShadowSpark layers on top of your
            existing stack and starts automating on day one.
          </p>
        </div>

        <div className="relative">
          {/* Connector line - hidden on mobile */}
          <div className="absolute left-0 right-0 top-16 hidden h-0.5 bg-slate-800 lg:block" />

          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-500 shadow-lg shadow-amber-500/5">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <div className="mt-6 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-amber-500">
                    {index + 1}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-400">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex justify-center py-6 lg:hidden">
                    <ArrowRight className="h-5 w-5 rotate-90 text-slate-700" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
