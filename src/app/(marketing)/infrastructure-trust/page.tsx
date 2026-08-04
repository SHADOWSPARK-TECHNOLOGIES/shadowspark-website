import type { Metadata } from "next";
import { canonical } from "@/lib/seo";
import { SiteNav } from "@/components/landing/SiteNav";

export const metadata: Metadata = {
  ...canonical("/infrastructure-trust"),
  title: "Trust and Verification Infrastructure",
  description:
    "The security layer behind ShadowSpark AI systems: trust controls, endpoint hardening, monitoring, and human-layer defense.",
  openGraph: {
    title: "Trust Infrastructure — ShadowSpark",
    description:
      "Security controls that protect ShadowSpark chatbot and AI agent deployments across high-risk channels.",
  },
};

const controls = [
  {
    title: "DMARC p=reject and SPF hardening",
    body: "Outbound communication channels are configured to reject spoofed senders and reduce impersonation risk around AI workflows.",
  },
  {
    title: "Hardened admin boundaries",
    body: "Critical operator and admin endpoints are removed from robots.txt indexing and segmented behind hardened access pathways with zero-trust assumptions.",
  },
  {
    title: "CSRF and abuse hardening",
    body: "User-facing forms and high-risk chatbot actions are protected with CSRF validation and adaptive abuse controls.",
  },
  {
    title: "Continuous domain monitoring",
    body: "Automated monitoring tracks phishing and domain abuse attempts targeting your brand and chatbot channels.",
  },
  {
    title: "The human firewall",
    body: "Quarterly social engineering simulations keep engineering and operations teams resilient against human-layer attacks.",
  },
];

export default function InfrastructureTrustPage() {
  return (
    <main className="min-h-screen bg-[#0B1B2B] text-white">
      <SiteNav active="infrastructure-trust" />

      <section className="mx-auto max-w-5xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            The silent muscle behind our AI
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-[#94A3B8]">
            Anyone can spin up an LLM. We engineer trust and verification
            infrastructure that keeps your AI agents and chatbot channels safe,
            with security as the silent muscle behind production delivery.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {controls.map((item) => (
            <article
              key={item.title}
              className={`rounded-xl border border-white/10 bg-[#142a40]/80 p-6 ${
                item.title === "The human firewall" ? "md:col-span-2" : ""
              }`}
            >
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <span className="pulse-trust h-2 w-2 rounded-full bg-[#1ABC9C]" />
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#c5d3e0]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
