"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { BookDemoButton } from "@/components/book-demo-button";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50";

export function CTA() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setForm({ name: "", company: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-black py-16 sm:py-20 lg:py-24" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
            Book a Demo
          </span>
          <h2 className="font-display mt-4 text-3xl font-semibold text-white sm:text-4xl">
            See ShadowSpark in action
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            Tell us about your loan operations and we&apos;ll show you a tailored demo.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          {status === "success" ? (
            <div
              className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center"
              role="status"
            >
              <p className="text-lg font-bold text-white">Demo request received.</p>
              <p className="mt-2 text-zinc-400">
                Our team will reach out within 24 hours to schedule your demo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              {status === "error" && (
                <p
                  className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300"
                  role="alert"
                >
                  Couldn&apos;t send right now. Please reach us directly at{" "}
                  <a href="mailto:hello@shadowspark.ng" className="underline">
                    hello@shadowspark.ng
                  </a>
                </p>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="demo-name" className="mb-1.5 block text-sm font-medium text-white">
                    Name <span className="text-gold-400">*</span>
                  </label>
                  <input
                    id="demo-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="demo-company"
                    className="mb-1.5 block text-sm font-medium text-white"
                  >
                    Company
                  </label>
                  <input
                    id="demo-company"
                    type="text"
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="demo-email" className="mb-1.5 block text-sm font-medium text-white">
                  Email <span className="text-gold-400">*</span>
                </label>
                <input
                  id="demo-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="demo-message" className="mb-1.5 block text-sm font-medium text-white">
                  What are you trying to build? <span className="text-gold-400">*</span>
                </label>
                <textarea
                  id="demo-message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  className={inputClass}
                  placeholder="Describe your loan products, monthly volume, and compliance needs..."
                />
              </div>

              <BookDemoButton
                location="cta_section"
                variant="primary"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-gold-500 px-8 py-4 text-sm font-bold text-black transition-colors hover:bg-gold-400"
              >
                Book a Demo
                <Send className="h-4 w-4" />
              </BookDemoButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
