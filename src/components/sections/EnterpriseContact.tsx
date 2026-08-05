"use client";

import { useState } from "react";
import { Send } from "lucide-react";

type FormStatus = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50";

export function EnterpriseContact() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  function setField<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Submission failed");

      setStatus("success");
      setForm({ name: "", company: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-slate-950 py-16 sm:py-20 lg:py-24" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            Enterprise Deployment
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Deploy ShadowSpark Infrastructure
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Get a custom implementation plan in 48 hours.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          {status === "success" ? (
            <div
              className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center"
              role="status"
            >
              <p className="text-lg font-bold text-white">Request received.</p>
              <p className="mt-2 text-slate-400">
                Our enterprise team will reach out within 48 hours with a tailored
                implementation plan.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              {status === "error" && (
                <p
                  className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300"
                  role="alert"
                >
                  Couldn&apos;t send right now. Please email us at{" "}
                  <a href="mailto:hello@shadowspark.ng" className="underline">
                    hello@shadowspark.ng
                  </a>
                  .
                </p>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="enterprise-name"
                    className="mb-1.5 block text-sm font-medium text-white"
                  >
                    Name <span className="text-amber-500">*</span>
                  </label>
                  <input
                    id="enterprise-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(event) => setField("name", event.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="enterprise-company"
                    className="mb-1.5 block text-sm font-medium text-white"
                  >
                    Company <span className="text-amber-500">*</span>
                  </label>
                  <input
                    id="enterprise-company"
                    type="text"
                    required
                    value={form.company}
                    onChange={(event) => setField("company", event.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="enterprise-email"
                  className="mb-1.5 block text-sm font-medium text-white"
                >
                  Email <span className="text-amber-500">*</span>
                </label>
                <input
                  id="enterprise-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => setField("email", event.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="enterprise-message"
                  className="mb-1.5 block text-sm font-medium text-white"
                >
                  Use case <span className="text-amber-500">*</span>
                </label>
                <textarea
                  id="enterprise-message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(event) => setField("message", event.target.value)}
                  className={inputClass}
                  placeholder="Tell us about your loan products, monthly volume, and compliance requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-amber-500 px-8 py-4 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Request Implementation Plan"}
                {status !== "sending" && <Send className="h-4 w-4" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
