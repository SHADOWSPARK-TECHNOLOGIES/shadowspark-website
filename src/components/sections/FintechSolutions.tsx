import { MessageSquare, ShieldCheck, ScrollText } from "lucide-react";

type Solution = {
  icon: typeof MessageSquare;
  title: string;
  description: string;
};

const solutions: Solution[] = [
  {
    icon: MessageSquare,
    title: "Automated Loan Intake",
    description:
      "Capture complete loan applications via WhatsApp, web, or API. Document upload, e-signature, and consent capture with no app download required.",
  },
  {
    icon: ShieldCheck,
    title: "Instant KYC Verification",
    description:
      "BVN, NIN, and document OCR verification in under 60 seconds. Automated fraud detection with immutable audit trails.",
  },
  {
    icon: ScrollText,
    title: "The Compliance Engine",
    description:
      "NDPA and CBN-ready architecture with pre-built consent workflows, WORM audit logging, and automated regulatory reporting.",
  },
];

export function FintechSolutions() {
  return (
    <section id="solutions" className="bg-slate-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            Platform Modules
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            The Fintech OS Modules
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {solutions.map((solution) => (
            <div
              key={solution.title}
              className="rounded-xl border border-slate-700 bg-slate-900 p-6 transition-colors hover:border-slate-600 hover:bg-slate-800 sm:p-8"
            >
              <div className="mb-5 inline-flex rounded-lg bg-amber-500/10 p-3">
                <solution.icon className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">{solution.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
