"use client";

import { useState } from "react";

type ContactFormData = {
  name: string;
  email: string;
  company: string;
  monthlyLeadVolume: string;
  message: string;
};

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  company: "",
  monthlyLeadVolume: "0-100",
  message: "",
};

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function setField<K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) {
    setFormData((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.company.trim()) {
      setError("Name and company are required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Enter a valid email address.");
      return;
    }

    setSuccess(true);
    setFormData(initialFormData);
  }

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-14 text-zinc-100 sm:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.95fr]">
        <section className="rounded-[2rem] border border-zinc-800 bg-zinc-950/80 p-8 shadow-[0_0_70px_rgba(0,229,255,0.06)] backdrop-blur-md">
          <p className="text-xs font-mono uppercase tracking-[0.24em] text-cyan-300">
            Enterprise Contact
          </p>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Book an Enterprise Infrastructure Call
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
            For high-volume teams and specialized operations. We&apos;ll design a system tailored to your scale.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: "System Design", value: "Tailored to volume and workflow" },
              { label: "Response Time", value: "Within 4 business hours" },
              { label: "Engagement", value: "Consultative, not generic" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-md"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{item.label}</p>
                <p className="mt-3 text-base font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-zinc-800 bg-zinc-950/90 p-8 shadow-[0_0_50px_rgba(0,229,255,0.06)]">
          {success ? (
            <div className="rounded-[1.5rem] border border-cyan-400/30 bg-cyan-400/10 p-6">
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-cyan-200">
                Request Received
              </p>
              <h2 className="mt-4 text-2xl font-black text-white">Consultation requested</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-200">
                We respond within 4 business hours with next steps for your infrastructure call.
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
              <label className="mb-2 block text-sm font-medium text-zinc-200">Monthly Lead Volume</label>
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
                rows={5}
                className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                placeholder="Describe your current sales flow, volume, and where you need infrastructure support."
              />
            </div>

            {error ? <p className="text-sm text-red-400">{error}</p> : null}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#00E5FF] px-6 py-4 text-base font-bold text-black transition hover:brightness-110"
            >
              Request Consultation
            </button>
          </form>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-zinc-300 backdrop-blur-md">
            Optional scheduling embed can be added here later for Cal.com or Calendly.
          </div>
        </section>
      </div>
    </main>
  );
}
