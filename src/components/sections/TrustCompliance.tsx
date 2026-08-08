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
  ExternalLink,
} from "lucide-react";
import { trackMetaEvent } from "@/components/meta-events";

const badges = [
  {
    icon: Landmark,
    label: "SEC ARIP Incubation",
    detail: "License path active",
    href: "#",
  },
  {
    icon: ShieldCheck,
    label: "SOC 2 Type II Aligned",
    detail: "Controls mapped",
    href: "/docs/HARDENING_VERIFICATION_REPORT.md",
  },
  {
    icon: FileCheck,
    label: "NDPA Aligned",
    detail: "Consent + DPA ready",
    href: "#",
  },
  {
    icon: Database,
    label: "AES-256 at Rest",
    detail: "Ledger encrypted",
    href: "#",
  },
  {
    icon: ClipboardList,
    label: "Double-Entry Ledger",
    detail: "∑D − ∑C = ₦0",
    href: "#",
  },
  {
    icon: Server,
    label: "Isolated Environments",
    detail: "Tenant-scoped infra",
    href: "#",
  },
  {
    icon: Lock,
    label: "TLS 1.3 Encrypted",
    detail: "In-transit protection",
    href: "#",
  },
  {
    icon: Activity,
    label: "99.9% Uptime Target",
    detail: "Vercel Edge SLA",
    href: "#",
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

  const handleBadgeClick = (label: string) => {
    trackMetaEvent("ComplianceBadgeClick", { label, location: "home_page" });
  };

  return (
    <section ref={ref} id="compliance" className="bg-slate-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            Security & Compliance
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Bank-Grade Security. African Compliance.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
            Verifiable controls designed for Nigerian fintech regulation and institutional due
            diligence.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge, index) => (
            <motion.a
              key={badge.label}
              href={badge.href}
              onClick={() => handleBadgeClick(badge.label)}
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
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold text-slate-200">{badge.label}</span>
                  <ExternalLink className="h-3 w-3 text-slate-600 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <span className="text-xs text-slate-500">{badge.detail}</span>
              </div>
            </motion.a>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-slate-400">
          ShadowSpark is designed in alignment with Nigeria&apos;s National Data Protection
          Regulation (NDPA). We do not sell, share, or use your customer data for any purpose
          outside your service agreement. Data Processing Addendums available on request.
        </p>
      </div>
    </section>
  );
}
