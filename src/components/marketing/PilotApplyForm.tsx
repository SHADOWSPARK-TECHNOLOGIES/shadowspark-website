"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { products } from "@/data/products";

const productOptions = products
  .filter((product) => product.href || product.status !== "in-development")
  .map((product) => ({ value: product.name, label: product.name }));

const inputClass =
  "w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#1ABC9C] focus:outline-none focus:ring-2 focus:ring-[#1ABC9C]/40";

export function PilotApplyForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    productInterest: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/pilot/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Request failed");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6 text-emerald-200">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-6 w-6" />
          <h3 className="text-lg font-bold">Application received</h3>
        </div>
        <p className="mt-2 text-sm opacity-90">
          We will respond within two business days. Thanks for shipping with us.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8"
      aria-label="Pilot application form"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-300">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass}
            placeholder="Adaobi Nwosu"
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="organization" className="mb-1.5 block text-sm font-medium text-slate-300">
            Organisation
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            value={form.organization}
            onChange={(e) => update("organization", e.target.value)}
            className={inputClass}
            placeholder="Company or agency"
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="productInterest" className="mb-1.5 block text-sm font-medium text-slate-300">
            Product of interest
          </label>
          <select
            id="productInterest"
            name="productInterest"
            value={form.productInterest}
            onChange={(e) => update("productInterest", e.target.value)}
            className={cn(inputClass, "appearance-none")}
          >
            <option value="" className="bg-slate-900">
              Select a product
            </option>
            {productOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-slate-900">
                {option.label}
              </option>
            ))}
            <option value="Custom AI agent" className="bg-slate-900">
              Custom AI agent
            </option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-300">
            What are you trying to solve?
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className={inputClass}
            placeholder="Describe the problem, timeline, and any compliance needs."
          />
        </div>
      </div>

      {error ? (
        <p className="mt-4 text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#1ABC9C] to-[#FF6F3C] px-6 py-3 text-sm font-bold text-white transition hover:from-[#17a889] hover:to-[#e85e2c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1ABC9C] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        Request pilot access
      </button>
    </form>
  );
}
