"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, MessageCircle, Clock, Wallet, TrendingDown, CheckCircle2, Banknote } from "lucide-react";
import { BookDemoButton } from "@/components/book-demo-button";
import { Footer } from "@/components/sections/Footer";
import { Navigation } from "@/components/sections/Navigation";

type Status = "SUBMITTED" | "KYC_PENDING" | "KYC_VERIFIED" | "APPROVED" | "DISBURSED";

const statusColors: Record<Status, string> = {
  SUBMITTED: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  KYC_PENDING: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  KYC_VERIFIED: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  APPROVED: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  DISBURSED: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
};

const statusLabels: Record<Status, string> = {
  SUBMITTED: "Application Submitted",
  KYC_PENDING: "KYC Verification in Progress",
  KYC_VERIFIED: "KYC Verified",
  APPROVED: "Loan Approved",
  DISBURSED: "Funds Disbursed",
};

function useStatusAnimation() {
  const [status, setStatus] = useState<Status>("SUBMITTED");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    if (!isInView) return;

    const sequence: Status[] = [
      "KYC_PENDING",
      "KYC_VERIFIED",
      "APPROVED",
      "DISBURSED",
    ];
    let index = 0;

    const interval = setInterval(() => {
      if (index < sequence.length) {
        setStatus(sequence[index]);
        index += 1;
      } else {
        clearInterval(interval);
      }
    }, 1800);

    return () => clearInterval(interval);
  }, [isInView]);

  return { status, ref };
}

function PhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      <div className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-slate-700 bg-slate-900 shadow-2xl">
        <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-slate-700" />
        <div className="flex h-10 items-end justify-center bg-slate-800 pb-2">
          <span className="text-xs font-medium text-slate-400">9:41</span>
        </div>
        <div className="min-h-[420px] bg-slate-950 p-4">{children}</div>
        <div className="h-12 bg-slate-800" />
      </div>
    </div>
  );
}

function WhatsAppChat() {
  const messages = [
    { sender: "bot", text: "Welcome to [Your Bank] Loans. What's your full name?" },
    { sender: "user", text: "Chukwuemeka Okafor" },
    { sender: "bot", text: "How much do you need?" },
    { sender: "user", text: "₦500,000" },
    { sender: "bot", text: "✓ Application submitted! Ref: LN-2026-001" },
  ];

  return (
    <div className="flex flex-col gap-3">
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: index * 0.25 }}
          className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
            message.sender === "user"
              ? "self-end rounded-br-md bg-emerald-600 text-white"
              : "self-start rounded-bl-md bg-slate-800 text-slate-200"
          }`}
        >
          {message.text}
        </motion.div>
      ))}
    </div>
  );
}

function DashboardCard({ status }: { status: Status }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Loan Officer Dashboard
        </h3>
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
            <Banknote className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-slate-400">New loan alert</p>
            <p className="text-base font-semibold text-white">Chukwuemeka Okafor</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
            <p className="text-xs text-slate-500">Amount</p>
            <p className="text-xl font-bold text-white">₦500,000</p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
            <p className="text-xs text-slate-500">Reference</p>
            <p className="text-sm font-mono font-semibold text-white">LN-2026-001</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-4">
          <p className="text-xs text-slate-500">Status</p>
          <div className="mt-2 flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${statusColors[status]}`}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
              </span>
              {status}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-400">{statusLabels[status]}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Pipeline progress</span>
            <span>
              {Math.max(
                1,
                ["SUBMITTED", "KYC_PENDING", "KYC_VERIFIED", "APPROVED", "DISBURSED"].indexOf(
                  status
                ) + 1
              )}{" "}
              / 5
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-700">
            <motion.div
              className="h-full rounded-full bg-amber-500"
              animate={{
                width: `${
                  ((["SUBMITTED", "KYC_PENDING", "KYC_VERIFIED", "APPROVED", "DISBURSED"].indexOf(
                    status
                  ) +
                    1) /
                    5) *
                  100
                }%`,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SMSNotification() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-sm rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
          <MessageCircle className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">SMS</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-200">
            Your loan of <span className="font-bold text-white">₦500,000</span> has been approved
            and disbursed. Repayment starts 30 Jan 2026.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function RepaymentSchedule() {
  const schedule = [
    { date: "30 Jan 2026", amount: "₦175,000", status: "Pending" },
    { date: "28 Feb 2026", amount: "₦175,000", status: "Pending" },
    { date: "30 Mar 2026", amount: "₦175,000", status: "Pending" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl border border-slate-700 bg-slate-900 p-6"
    >
      <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
        Auto-Generated Repayment Schedule
      </h4>
      <div className="mt-4 space-y-3">
        {schedule.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <Wallet className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{item.date}</p>
                <p className="text-xs text-slate-500">{item.status}</p>
              </div>
            </div>
            <p className="text-sm font-bold text-white">{item.amount}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const stats = [
  { label: "Application time", value: "2 min 47 sec", icon: Clock },
  { label: "Officer processing time", value: "4 min 12 sec", icon: TrendingDown },
  { label: "Total time saved", value: "11 days", icon: CheckCircle2 },
  {
    label: "Cost per application",
    value: "₦0",
    subtext: "vs ₦2,500 manual",
    icon: Banknote,
  },
];

export default function DemoPage() {
  const { status, ref: statusRef } = useStatusAnimation();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800 px-6 pb-20 pt-32">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-amber-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </span>
            Interactive Demo
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            See ShadowSpark in Action
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            Experience how your applicants apply for loans in under 3 minutes.
          </p>
        </div>
      </section>

      {/* Step 1 */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
              Step 1
            </span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              The Applicant&apos;s Phone
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
              No app download. The entire loan journey happens inside WhatsApp.
            </p>
          </motion.div>

          <PhoneMockup>
            <WhatsAppChat />
          </PhoneMockup>
        </div>
      </section>

      {/* Step 2 */}
      <section ref={statusRef} className="border-y border-slate-800 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
              Step 2
            </span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              The Loan Officer&apos;s Dashboard
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
              Applications flow straight into a real-time decision dashboard.
            </p>
          </motion.div>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <PhoneMockup>
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <p className="text-sm text-slate-400">Application synced to dashboard</p>
                <p className="text-xs text-slate-600">Ref: LN-2026-001</p>
              </div>
            </PhoneMockup>

            <DashboardCard status={status} />
          </div>
        </div>
      </section>

      {/* Step 3 */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
              Step 3
            </span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">The Disbursement</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
              Approved loans trigger instant SMS alerts and automatic repayment schedules.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            <SMSNotification />
            <RepaymentSchedule />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-slate-800 bg-slate-900/30 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-xl border border-slate-700 bg-slate-900 p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                  <stat.icon className="h-5 w-5" />
                </div>
                <p className="text-2xl font-black text-white">{stat.value}</p>
                {stat.subtext && <p className="text-xs text-slate-500">{stat.subtext}</p>}
                <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to see it with your own data?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
              Book a live demo and we&apos;ll walk you through a custom loan workflow for your
              institution.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <BookDemoButton location="demo_page_cta" variant="primary">
                Book a Live Demo
                <ArrowRight className="h-5 w-5" />
              </BookDemoButton>
              <a
                href="https://wa.me/2340000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-transparent px-8 py-4 text-sm font-bold text-slate-100 transition-colors hover:border-slate-500 hover:bg-slate-900"
              >
                <MessageCircle className="h-5 w-5" />
                Talk to Our Team
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
