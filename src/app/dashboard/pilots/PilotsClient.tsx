"use client";

import { useEffect, useState } from "react";
import { Rocket, Loader2, AlertCircle, CheckCircle, Clock, UserCheck, XCircle } from "lucide-react";
import type { Pilot, PilotStatus } from "@/data/pilots";

const statusMeta: Record<
  PilotStatus,
  { label: string; icon: React.ComponentType<{ size?: number }>; className: string }
> = {
  applied: { label: "Applied", icon: Clock, className: "status-applied" },
  screening: { label: "Screening", icon: UserCheck, className: "status-screening" },
  approved: { label: "Approved", icon: CheckCircle, className: "status-approved" },
  live: { label: "Live", icon: Rocket, className: "status-live" },
  completed: { label: "Completed", icon: CheckCircle, className: "status-completed" },
  declined: { label: "Declined", icon: XCircle, className: "status-declined" },
};

type PilotListResponse = {
  ok: boolean;
  pilots: Pilot[];
  counts: Record<PilotStatus, number>;
  updatedAt: string;
};

export function PilotsClient() {
  const [data, setData] = useState<PilotListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const response = await fetch("/api/pilot/list");
        const payload = (await response.json()) as PilotListResponse;
        if (!response.ok || !payload.ok) {
          throw new Error("Failed to load pilots");
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
        Loading pilots…
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-red-200">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <span className="font-semibold">Error loading pilots</span>
        </div>
        <p className="mt-1 text-sm opacity-90">{error ?? "Unknown error"}</p>
      </div>
    );
  }

  const statuses = Object.keys(statusMeta) as PilotStatus[];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statuses.map((status) => {
          const meta = statusMeta[status];
          const Icon = meta.icon;
          return (
            <div
              key={status}
              className="rounded-xl border border-slate-700 bg-slate-800/50 p-4"
            >
              <div className="flex items-center gap-2 text-slate-400">
                <Icon size={16} />
                <span className="text-xs font-medium uppercase tracking-wide">{meta.label}</span>
              </div>
              <div className="mt-2 text-2xl font-bold text-white">
                {data.counts[status] ?? 0}
              </div>
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/60 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-3 font-medium">Applicant</th>
              <th className="px-4 py-3 font-medium">Organisation</th>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Region</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Applied</th>
              <th className="px-4 py-3 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {data.pilots.map((pilot) => {
              const meta = statusMeta[pilot.status];
              const Icon = meta.icon;
              return (
                <tr key={pilot.id} className="hover:bg-slate-700/30">
                  <td className="px-4 py-3 font-medium text-white">
                    {pilot.name}
                    <div className="text-xs text-slate-400">{pilot.email}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{pilot.organization}</td>
                  <td className="px-4 py-3 text-slate-300">{pilot.productInterest}</td>
                  <td className="px-4 py-3 text-slate-300">{pilot.region}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.className}`}>
                      <Icon size={12} />
                      {meta.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {new Date(pilot.appliedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-slate-400">{pilot.notes ?? "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500">
        Last updated: {new Date(data.updatedAt).toLocaleString()}
      </p>
    </div>
  );
}
