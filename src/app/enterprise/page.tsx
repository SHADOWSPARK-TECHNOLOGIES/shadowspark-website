"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, MessageSquareQuote, Waves } from "lucide-react";
import { GlassCard } from "@/components/ui/templates/GlassCard";
import { SovereignHero } from "@/components/ui/templates/SovereignHero";

type EnterpriseFormData = {
  name: string;
  email: string;
  company: string;
  monthlyLeadVolume: string;
  message: string;
};

const initialFormData: EnterpriseFormData = {
  name: "",
  email: "",
  company: "",
  monthlyLeadVolume: "0-100",
  message: "",
};

export default function EnterprisePage() {
  const [formData, setFormData] = useState<EnterpriseFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function setField<K extends keyof EnterpriseFormData>(
    key: K,
    value: EnterpriseFormData[K]
  ) {
    setFormData((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess(false);

    if (!formData.name.trim() || !formData.company.trim()) {
      setError("Name and company are required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSuccess(true);
      setFormData(initialFormData);
    } catch {
      setError("Unable to submit your request right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-black font-sans text-zinc-400 selection:bg-cyan-500/30">
      <SovereignHero
        headline={
          <>
            Deploy Enterprise <span className="text-cyan-500">Infrastructure</span>
          </>
        }
        subheadline="Custom systems for high-volume operations."
        ctaText="Request Consultation"
        ctaLink="#enterprise-form"
        secondaryCtaText="View Solutions"
        secondaryCtaLink="/solutions"
      />

      <section id="enterprise-form" className="border-t border-zinc-900 bg-zinc-950/40 py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="space-y-6"
          >
            <GlassCard
              title="Built for operational complexity"
              description="Enterprise deployments are designed for teams handling serious volume, multiple handoff points, and specialized routing logic."
              icon={<Building2 className="h-6 w-6" />}
              highlighted
            >
              <div className="space-y-3">
                <p className="text-sm leading-7 text-zinc-300">
                  We scope channel strategy, qualification logic, operator visibility,
                  approvals, and integrations around your actual revenue workflow.
                </p>
              </div>
            </GlassCard>

            <GlassCard
              title="What this consultation covers"
              description="Use the request form to define current volume, channel pressure, and the handoff model your team needs."
              icon={<MessageSquareQuote className="h-6 w-6" />}
            >
              <div className="space-y-3 text-sm leading-7 text-zinc-300">
                <p>Lead intake architecture across web, WhatsApp, and workflow automation.</p>
                <p>Routing design for high-value enquiries and human escalation paths.</p>
                <p>Support model, operator visibility, and phased deployment planning.</p>
              </div>
            </GlassCard>

            <GlassCard
              title="Deployment profile"
              description="A fast way to tell us whether this is a growth system, an enterprise stack, or a multi-channel rebuild."
              icon={<Waves className="h-6 w-6" />}
            >
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Response Speed", value: "Instant-first" },
                  { label: "Routing Logic", value: "Custom" },
                  { label: "Support Model", value: "Managed" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-black/25 p-4"
                  >
                    <p className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-500">
                      {item.label}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            <GlassCard
              title="Request Consultation"
              description="Tell us how your operation works and where the current system loses momentum."
              highlighted
              className="h-full"
            >
              {success ? (
                <div className="mb-6 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-5">
                  <p className="text-xs font-mono uppercase tracking-[0.22em] text-cyan-200">
                    Request Received
                  </p>
                  <p className="mt-3 text-sm leading-7 text-zinc-200">
                    Your consultation request has been logged. We will follow up with next steps.
                  </p>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-200">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) => setField("name", event.target.value)}
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-200">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) => setField("email", event.target.value)}
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-200">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(event) => setField("company", event.target.value)}
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-200">
                    Monthly Lead Volume
                  </label>
                  <select
                    value={formData.monthlyLeadVolume}
                    onChange={(event) => setField("monthlyLeadVolume", event.target.value)}
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                  >
                    <option value="0-100">0 - 100</option>
                    <option value="101-500">101 - 500</option>
                    <option value="501-2000">501 - 2,000</option>
                    <option value="2000+">2,000+</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-200">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(event) => setField("message", event.target.value)}
                    rows={6}
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                    placeholder="Describe your current lead flow, team structure, channels, and where you need infrastructure support."
                  />
                </div>

                {error ? <p className="text-sm text-red-400">{error}</p> : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-500 px-6 py-4 text-base font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Request Consultation"}
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
