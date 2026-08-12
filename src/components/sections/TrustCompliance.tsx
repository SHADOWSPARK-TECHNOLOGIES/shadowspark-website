"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Lock,
  Database,
  FileCheck,
  Server,
  ClipboardList,
  Activity,
  ShieldCheck,
  Landmark,
} from "lucide-react";
import { trackMetaEvent } from "@/components/meta-events";

const badges = [
  {
    icon: Landmark,
    label: "Regulatory Review Mapping",
    detail: "Pilot control",
  },
  {
    icon: ShieldCheck,
    label: "Security Control Inventory",
    detail: "Example evidence set",
  },
  {
    icon: FileCheck,
    label: "Consent Evidence Workflow",
    detail: "Pilot configuration",
  },
  {
    icon: Database,
    label: "Encryption Review",
    detail: "Deployment requirement",
  },
  {
    icon: ClipboardList,
    label: "Ledger Control Example",
    detail: "Pilot workflow",
  },
  {
    icon: Server,
    label: "Environment Isolation",
    detail: "Architecture review",
  },
  {
    icon: Lock,
    label: "Transport Security",
    detail: "Deployment requirement",
  },
  {
    icon: Activity,
    label: "Availability Planning",
    detail: "No published SLA",
  },
];

export function TrustCompliance() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      trackMetaEvent("ComplianceSectionView", { location: "home_page" });
    }
  }, [isInView]);

  return (
    <section ref={ref} id="compliance" className="bg-slate-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            Security & Compliance
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Pilot Security and Compliance Review
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
            Example controls are mapped during discovery and must be verified for each
            deployment before any compliance claim is made.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group flex items-center gap-4 rounded-xl border border-slate-700 bg-slate-900 p-4 transition-colors hover:border-amber-500/30 hover:bg-slate-800"
            >
              <div className="rounded-lg bg-emerald-500/10 p-2.5 transition-colors group-hover:bg-emerald-500/20">
                <badge.icon className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold text-slate-200">{badge.label}</span>
                <span className="text-xs text-slate-500">{badge.detail}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-slate-400">
          Pilot materials are not legal advice, certification, or proof of regulatory
          compliance. Applicable controls and data-processing terms require documented review
          before deployment.
        </p>
      </div>
    </section>
  );
}
