"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Landmark,
  Scale,
  Lock,
  Coins,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Database,
} from "lucide-react";
import { trackMetaEvent } from "@/components/meta-events";

const differentiators = [
  {
    icon: Database,
    title: "Double-Entry Ledger",
    description:
      "Bank-grade accounting for every transaction. Competitors log messages; we log debits and credits with full audit trails.",
  },
  {
    icon: Scale,
    title: "SEC Circular 26-1",
    description:
      "Automated VASP capital threshold monitoring and reserve provisioning. Built for the June 2027 deadline.",
  },
  {
    icon: Lock,
    title: "CBN BVN Lock Ready",
    description:
      "NDPA-compliant identity anchoring and BVN-phone linkage. Prepared for CBN regulatory shifts.",
  },
  {
    icon: Coins,
    title: "RWA Tokenization",
    description:
      "Tokenize Lagos real estate and private assets as collateral. A second revenue engine beyond digital lending.",
  },
];

const comparison = [
  { feature: "WhatsApp loan intake", shadowspark: true, crm: true, cx: true },
  { feature: "Double-entry ledger", shadowspark: true, crm: false, cx: false },
  { feature: "SEC Circular 26-1 monitoring", shadowspark: true, crm: false, cx: false },
  { feature: "CBN BVN Lock readiness", shadowspark: true, crm: false, cx: false },
  { feature: "RWA tokenization workflow", shadowspark: true, crm: false, cx: false },
  { feature: "Nigerian regulatory signal intelligence", shadowspark: true, crm: false, cx: false },
  { feature: "Per-seat pricing", shadowspark: false, crm: true, cx: true },
];

export function WhyShadowSpark() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      trackMetaEvent("WhyShadowSparkView", { location: "home_page" });
    }
  }, [isInView]);

  return (
    <section ref={ref} id="why" className="bg-slate-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            Why ShadowSpark
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Not a CRM. Not a Chatbot. A Sovereign Financial Node.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
            Competitors sell messaging seats. We sell financial infrastructure purpose-built for
            Nigerian regulation and African lending economics.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-xl border border-slate-700 bg-slate-900 p-6 transition-colors hover:border-slate-600 hover:bg-slate-800"
            >
              <div className="mb-4 inline-flex rounded-lg bg-amber-500/10 p-3">
                <item.icon className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900"
        >
          <div className="grid grid-cols-4 items-center border-b border-slate-700 bg-slate-800/50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 sm:px-6">
            <span className="col-span-1">Capability</span>
            <span className="col-span-1 text-center">ShadowSpark</span>
            <span className="col-span-1 hidden text-center sm:block">Generic CRM</span>
            <span className="col-span-1 hidden text-center sm:block">Global CX Tool</span>
            <span className="col-span-2 text-center sm:hidden">Generic Tools</span>
          </div>
          {comparison.map((row, index) => (
            <div
              key={row.feature}
              className={`grid grid-cols-4 items-center px-4 py-3 text-sm sm:px-6 ${
                index !== comparison.length - 1 ? "border-b border-slate-700/50" : ""
              }`}
            >
              <span className="col-span-1 text-slate-300">{row.feature}</span>
              <span className="col-span-1 flex justify-center">
                {row.shadowspark ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-slate-600" />
                )}
              </span>
              <span className="col-span-1 hidden justify-center sm:flex">
                {row.crm ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-slate-600" />
                )}
              </span>
              <span className="col-span-1 hidden justify-center sm:flex">
                {row.cx ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-slate-600" />
                )}
              </span>
              <span className="col-span-2 flex justify-center gap-8 sm:hidden">
                {row.crm ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-slate-600" />
                )}
                {row.cx ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-slate-600" />
                )}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
