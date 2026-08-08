"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Banknote,
  Users,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Activity,
  ArrowUpRight,
  Wallet,
} from "lucide-react";
import { trackMetaEvent } from "@/components/meta-events";

const kpis = [
  { label: "Ledger Balance", value: "₦2.4B", change: "+12.4%", icon: Wallet, color: "text-emerald-400" },
  { label: "Active Loans", value: "1,247", change: "+8.2%", icon: Banknote, color: "text-amber-400" },
  { label: "KYC Verified", value: "98.2%", change: "+2.1%", icon: ShieldCheck, color: "text-blue-400" },
  { label: "Recovery Rate", value: "94.2%", change: "+4.7%", icon: TrendingUp, color: "text-emerald-400" },
];

const pipeline = [
  { stage: "Application", count: 312, color: "bg-amber-500" },
  { stage: "KYC Verified", count: 198, color: "bg-blue-500" },
  { stage: "Approved", count: 124, color: "bg-emerald-500" },
  { stage: "Disbursed", count: 103, color: "bg-cyan-500" },
];

const alerts = [
  { level: "high", text: "SEC Circular 26-1 capital deadline: 47 days", icon: AlertCircle },
  { level: "medium", text: "CBN open banking guideline refresh detected", icon: Activity },
  { level: "low", text: "12 accounts queued for polite recovery nudge", icon: Users },
];

export function SovereignDashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      trackMetaEvent("DashboardPreviewView", { location: "home_page" });
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      id="dashboard-preview"
      className="overflow-hidden border-y border-slate-800 bg-slate-950 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            Command Center
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            One Dashboard for Every Naira
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
            See loan flow, compliance posture, and recovery signals in a single pane. Built from
            the shadcn-fintech dashboard pattern, adapted for ShadowSpark&apos;s sovereign
            financial node.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl sm:p-8"
        >
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Sovereign Operating Dashboard</h3>
              <p className="text-sm text-slate-500">Live view · Lagos Mainnet</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-emerald-400">System Operational</span>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((kpi, index) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="rounded-xl border border-slate-700 bg-slate-800/50 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500">{kpi.label}</p>
                  <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                </div>
                <p className="mt-2 text-2xl font-black text-white">{kpi.value}</p>
                <p className="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-400">
                  {kpi.change}
                  <ArrowUpRight className="h-3 w-3" />
                </p>
              </motion.div>
            ))}
          </div>

          {/* Pipeline */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-5">
              <h4 className="text-sm font-semibold text-slate-300">Loan Pipeline</h4>
              <div className="mt-4 space-y-4">
                {pipeline.map((item) => (
                  <div key={item.stage} className="flex items-center gap-4">
                    <span className="w-28 text-xs text-slate-500">{item.stage}</span>
                    <div className="flex-1 rounded-full bg-slate-700">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${(item.count / 312) * 100}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-xs font-semibold text-white">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-5">
              <h4 className="text-sm font-semibold text-slate-300">Regulatory & Recovery Alerts</h4>
              <div className="mt-4 space-y-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.text}
                    className={`flex items-start gap-3 rounded-lg border p-3 ${
                      alert.level === "high"
                        ? "border-amber-500/20 bg-amber-500/10"
                        : alert.level === "medium"
                          ? "border-blue-500/20 bg-blue-500/10"
                          : "border-slate-700 bg-slate-800/50"
                    }`}
                  >
                    <alert.icon
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        alert.level === "high"
                          ? "text-amber-400"
                          : alert.level === "medium"
                            ? "text-blue-400"
                            : "text-slate-400"
                      }`}
                    />
                    <p className="text-xs text-slate-300">{alert.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
