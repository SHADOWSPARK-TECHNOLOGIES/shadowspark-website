import Link from "next/link";
import { MessageSquare, ShieldCheck, ScrollText, Bot, ArrowRight } from "lucide-react";

type Solution = {
  icon: typeof MessageSquare;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href: string;
};

const solutions: Solution[] = [
  {
    icon: MessageSquare,
    eyebrow: "Automated Loan Intake",
    title: "WhatsApp-Native Applications",
    description:
      "Applicants complete full loan forms via WhatsApp — document upload, e-signature, consent capture. No app download. 97% of African internet users are already on WhatsApp.",
    cta: "See How It Works",
    href: "#",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Instant KYC Verification",
    title: "AI-Powered Identity Verification",
    description:
      "BVN validation, NIN verification, document OCR in under 60 seconds. Automated fraud detection with immutable audit trails for CBN compliance.",
    cta: "Explore KYC Pipeline",
    href: "#",
  },
  {
    icon: ScrollText,
    eyebrow: "The Compliance Engine",
    title: "Regulatory-First Architecture",
    description:
      "Pre-built NDPA workflows, automated consent management, WORM audit logging. Non-compliance penalties reach ₦10M or 2% of revenue. We make compliance automatic.",
    cta: "View Compliance Docs",
    href: "#",
  },
  {
    icon: Bot,
    eyebrow: "Intelligent Recovery",
    title: "AI Recovery Agents",
    description:
      "Polite, persistent payment reminders via WhatsApp and SMS with behavioral escalation. Reduce default rates with AI that knows when to nudge and when to escalate.",
    cta: "See Recovery Flow",
    href: "#",
  },
];

export function FintechSolutions() {
  return (
    <section id="solutions" className="border-y border-slate-800 bg-slate-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            The Fintech OS
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Four Modules. One Platform. Zero Manual Work.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
            Everything you need to originate, verify, disburse, and recover loans — on a
            single AI-native platform.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {solutions.map((solution) => (
            <div
              key={solution.title}
              className="group rounded-xl border border-slate-700 bg-slate-900 p-6 transition-colors hover:border-slate-600 hover:bg-slate-800 sm:p-8"
            >
              <div className="mb-5 inline-flex rounded-lg bg-amber-500/10 p-3">
                <solution.icon className="h-6 w-6 text-amber-500" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">
                {solution.eyebrow}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-100">{solution.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {solution.description}
              </p>
              <Link
                href={solution.href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 transition-colors hover:text-amber-300"
              >
                {solution.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
