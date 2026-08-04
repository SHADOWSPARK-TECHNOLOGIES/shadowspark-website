"use client";

import { useEffect, useState } from "react";
import { BarChart3, Loader2, AlertCircle } from "lucide-react";

type MetricsResponse = {
  ok: boolean;
  generatedAt: string;
  products: { live: number; beta: number; inDevelopment: number };
  badges: { total: number; bronze: number; silver: number; gold: number };
  pilots: Record<string, number>;
  contributors: { total: number; activeThisMonth: number };
};

function Card({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-2 text-3xl font-bold text-white">{value}</div>
      {sub ? <div className="mt-1 text-xs text-slate-500">{sub}</div> : null}
    </div>
  );
}

export function MetricsClient() {
  const [data, setData] = useState<MetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const response = await fetch("/api/metrics");
        const payload = (await response.json()) as MetricsResponse;
        if (!response.ok || !payload.ok) {
          throw new Error("Failed to load metrics");
        }
        if (!cancelled) setData(payload);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-slate-400">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading metrics…
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-red-200">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <span className="font-semibold">Error loading metrics</span>
        </div>
        <p className="mt-1 text-sm opacity-90">{error ?? "Unknown error"}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card label="Live products" value={data.products.live} sub="Shipping now" />
        <Card label="Beta products" value={data.products.beta} sub="In partner testing" />
        <Card label="In development" value={data.products.inDevelopment} sub="On the roadmap" />
        <Card label="Total badges" value={data.badges.total} sub="Recognition tiers" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card label="Bronze badges" value={data.badges.bronze} />
        <Card label="Silver badges" value={data.badges.silver} />
        <Card label="Gold badges" value={data.badges.gold} />
        <Card label="Contributors" value={data.contributors.total} sub={`${data.contributors.activeThisMonth} active this month`} />
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
          <BarChart3 size={16} />
          Pilot pipeline
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(data.pilots).map(([status, count]) => (
            <div
              key={status}
              className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-3"
            >
              <span className="text-sm capitalize text-slate-300">{status.replace("-", " ")}</span>
              <span className="text-lg font-bold text-white">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Generated at: {new Date(data.generatedAt).toLocaleString()}
      </p>
    </div>
  );
}
