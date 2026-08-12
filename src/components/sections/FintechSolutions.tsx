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
    eyebrow: "Loan Intake Example",
    title: "WhatsApp Workflow Prototype",
    description:
      "Pilot scope can model application intake, document upload, e-signature, and consent capture through a WhatsApp workflow.",
    cta: "See How It Works",
    href: "/demo",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Identity Check Example",
    title: "Operator-Reviewed Verification",
    description:
      "Example integrations can coordinate BVN or NIN checks, document OCR, review outcomes, and auditable operator decisions.",
    cta: "Explore KYC Pipeline",
    href: "/demo",
  },
  {
    icon: ScrollText,
    eyebrow: "Compliance Review Example",
    title: "Regulation-Aware Architecture",
    description:
      "Pilot controls can demonstrate consent management, audit logging, and evidence collection for review against applicable requirements.",
    cta: "View Compliance Docs",
    href: "/demo",
  },
  {
    icon: Bot,
    eyebrow: "Recovery Workflow Example",
    title: "Operator-Reviewed Recovery",
    description:
      "Example recovery workflows can draft WhatsApp or SMS reminders and route escalation decisions to an operator.",
    cta: "See Recovery Flow",
    href: "/demo",
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
            Four Example Modules. One Pilot Scope.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
            Explore how intake, identity checks, compliance review, and recovery could be
            coordinated within a scoped pilot.
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
                data-analytics={`solution-${solution.eyebrow.toLowerCase().replaceAll(" ", "-")}`}
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
