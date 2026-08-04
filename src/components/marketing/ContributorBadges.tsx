"use client";

import { useEffect, useState } from "react";
import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

export type Badge = {
  id: string;
  name: string;
  description: string;
  tier: "bronze" | "silver" | "gold";
};

const tierStyles: Record<Badge["tier"], string> = {
  bronze:
    "border-amber-700/40 bg-amber-900/20 text-amber-200",
  silver:
    "border-slate-500/40 bg-slate-700/30 text-slate-200",
  gold:
    "border-yellow-500/40 bg-yellow-500/10 text-yellow-200",
};

type ContributorBadgesProps = {
  email?: string;
  name?: string;
  className?: string;
};

export function ContributorBadges({ email, name, className }: ContributorBadgesProps) {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/rewards/catalog");
        if (!response.ok) {
          throw new Error(`Failed to load badges: ${response.status}`);
        }
        const data = (await response.json()) as { badges: Badge[] };
        if (!cancelled) {
          // MVP demo: show all badges. In production, filter by recipient.
          setBadges(data.badges ?? []);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={cn("rounded-2xl border border-slate-800 bg-slate-900/50 p-6", className)}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10">
          <Award className="h-5 w-5 text-indigo-300" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Contributor Profile</h3>
          <p className="text-xs text-slate-400">
            {name ?? email ?? "Anonymous"}
          </p>
        </div>
      </div>

      {loading ? (
        <p className="mt-4 text-sm text-slate-400">Loading badges…</p>
      ) : error ? (
        <p className="mt-4 text-sm text-red-400">{error}</p>
      ) : badges.length === 0 ? (
        <p className="mt-4 text-sm text-slate-400">No badges yet. Ship something.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {badges.map((badge) => (
            <li
              key={badge.id}
              className={cn(
                "flex flex-col rounded-lg border px-3 py-2",
                tierStyles[badge.tier],
              )}
            >
              <span className="text-sm font-semibold">{badge.name}</span>
              <span className="text-xs opacity-90">{badge.description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
