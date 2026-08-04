import type { Metadata } from "next";
import { canonical } from "@/lib/seo";
import { SiteNav } from "@/components/landing/SiteNav";
import { ContributorBadges } from "@/components/marketing/ContributorBadges";

export const metadata: Metadata = {
  ...canonical("/contributors"),
  title: "Contributors — ShadowSpark",
  description:
    "Meet the collaborators shipping ShadowSpark forward and earning recognition through Copilot Rewards.",
  openGraph: {
    title: "Contributors — ShadowSpark",
    description:
      "Recognize the builders behind ShadowSpark. Live badges, shipped contributions, and trust-first collaboration.",
  },
};

export default function ContributorsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <SiteNav active="contributors" />

      <section className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-300">
            Copilot Rewards
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Shipped work gets recognised.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            Contributors earn badges for production impact, security hardening,
            and shipped integrations. AI Built for Nigeria. Shipped, Not Pitched.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <ContributorBadges name="Shadow Engineer" email="engineer@shadowspark-tech.org" />
          <ContributorBadges name="Growth Partner" email="partner@example.com" />
          <ContributorBadges name="Open Source Contributor" />
        </div>
      </section>
    </main>
  );
}
