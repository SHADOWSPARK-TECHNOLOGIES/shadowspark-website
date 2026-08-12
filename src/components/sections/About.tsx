import { Target, Lightbulb, TrendingUp } from "lucide-react";

const missionPoints = [
  {
    icon: Target,
    title: "The Problem",
    stat: "Pilot program",
    body: "The pilot program focuses on spreadsheet handoffs, manual follow-up, and disconnected customer conversations.",
  },
  {
    icon: Lightbulb,
    title: "The Solution",
    stat: "Example workflow",
    body: "A pilot can model intake, identity checks, compliance review, and recovery coordination with operator checkpoints.",
  },
  {
    icon: TrendingUp,
    title: "The Traction",
    stat: "Measured pilot",
    body: "Each pilot defines baseline measures and acceptance criteria before any outcome is reported.",
  },
];

export function About() {
  return (
    <section id="about" className="bg-slate-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
              Our Mission
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Built for African Fintech Scale
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-400 sm:text-lg">
              ShadowSpark&apos;s pilot program explores repeated handoffs across
              spreadsheets, messaging, document review, and payment follow-up. It tests
              where software and operator review could reduce that friction.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
              ShadowSpark is currently presenting example workflows and defining measurable
              pilot scopes rather than claiming unverified production outcomes.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {missionPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl border border-slate-700 bg-slate-900 p-6 transition-colors hover:border-slate-600 hover:bg-slate-800"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-amber-500/10 p-3">
                    <point.icon className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      {point.title}
                    </p>
                    <p className="mt-1 text-lg font-bold text-white">{point.stat}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {point.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
