import { Target, Lightbulb, TrendingUp } from "lucide-react";

const missionPoints = [
  {
    icon: Target,
    title: "The Problem",
    stat: "$32.2 billion",
    body: "Unmet MSME credit demand across Nigeria alone. Lenders still rely on spreadsheets, manual follow-ups, and disconnected WhatsApp chats.",
  },
  {
    icon: Lightbulb,
    title: "The Solution",
    stat: "End-to-end AI automation",
    body: "From WhatsApp-native intake and instant KYC to regulatory compliance and intelligent recovery — one platform layer for the entire loan lifecycle.",
  },
  {
    icon: TrendingUp,
    title: "The Traction",
    stat: "65% faster turnaround",
    body: "Modeled production workflows show loan processing compressed from days to minutes, with immutable audit trails for every decision.",
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
              ShadowSpark was founded to solve a critical infrastructure gap: African
              lenders still process loans on spreadsheets and WhatsApp chats. We built
              the AI Operating System that automates intake, verifies identities in
              seconds, and ensures every disbursement meets CBN and NDPA standards.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
              From microfinance banks in Lagos to digital lenders in Nairobi, ShadowSpark
              is the infrastructure layer powering the next generation of African credit.
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
