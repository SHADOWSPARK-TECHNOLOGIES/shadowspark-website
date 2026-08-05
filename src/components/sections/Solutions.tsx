import Link from "next/link";
import { MessageSquare, ShieldCheck, ScrollText, Bot, ArrowRight } from "lucide-react";

const solutions = [
  {
    icon: MessageSquare,
    title: "WhatsApp-Native Loan Applications",
    description:
      "Applicants complete full loan forms via WhatsApp — document upload, e-signature, and consent capture. No app download required. 97% of African internet users are already on WhatsApp [Askyazi, 2025].",
    cta: "See How It Works",
    href: "#contact",
  },
  {
    icon: ShieldCheck,
    title: "AI-Powered Identity Verification",
    description:
      "BVN validation, NIN verification, and document OCR in under 60 seconds. Automated fraud detection with immutable audit trails for CBN compliance.",
    cta: "Explore KYC Pipeline",
    href: "#contact",
  },
  {
    icon: ScrollText,
    title: "Regulatory-First Architecture",
    description:
      "Pre-built NDPA workflows, automated consent management, and WORM audit logging. Non-compliance penalties reach ₦10M or 2% of revenue [ICLG, 2026]. We make compliance automatic.",
    cta: "View Compliance Docs",
    href: "/security",
  },
  {
    icon: Bot,
    title: "AI Recovery Agents",
    description:
      "Polite, persistent payment reminders via WhatsApp and SMS with escalation logic. Reduce default rates with behavioral AI that knows when to nudge and when to escalate.",
    cta: "See Recovery Flow",
    href: "#contact",
  },
];

export function Solutions() {
  return (
    <section id="solutions" className="bg-black py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
            Platform Modules
          </span>
          <h2 className="font-display mt-4 text-3xl font-semibold text-white sm:text-4xl">
            The Fintech OS Modules
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            Four integrated systems that turn loan operations from a manual cost centre into an
            automated growth engine.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {solutions.map((solution) => (
            <div
              key={solution.title}
              className="group flex flex-col rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.06] sm:p-8"
            >
              <div className="mb-5 inline-flex w-fit rounded-lg bg-gold-500/10 p-3">
                <solution.icon className="h-6 w-6 text-gold-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-100">{solution.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                {solution.description}
              </p>
              <Link
                href={solution.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-400 transition-colors group-hover:text-gold-300"
              >
                {solution.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
