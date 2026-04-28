"use client";

import { useCallback, useState } from "react";

// ──────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────

type VaspTier = "NONE" | "DAOP_RATOP" | "DAX_CUSTODIAN";

type CapitalStatus = {
  escrowAccount?: { id: string; type: string };
  seedTransactionId?: string;
  seedAmount: string;
  walletBalance: string;
  vaspTier: VaspTier;
  thresholdMet: boolean;
};

type ViewState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "error"; message: string }
  | { phase: "success"; data: CapitalStatus };

// ──────────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────────

const VASP_CAPITAL_FLOOR_DAOP_NAIRA = 1_000_000_000;
const VASP_CAPITAL_FLOOR_DAX_NAIRA  = 2_000_000_000;

// ──────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────

/**
 * Parse a BigInt-safe string (kobo) into its naira
 * display parts for the "bold naira, 35% kobo" style.
 */
function parseKobo(value: string): { whole: string; frac: string } {
  const raw = BigInt(value);
  const naira = raw / BigInt(100);
  const kobo = raw % BigInt(100);
  return {
    whole: `₦${naira.toLocaleString()}`,
    frac: `.${kobo.toString().padStart(2, "0")}`,
  };
}

/**
 * Progress fraction (0–1) of wallet balance toward the DAX ceiling.
 */
function progressFraction(walletBalance: string): number {
  const balance = BigInt(walletBalance);
  const ceiling = BigInt(VASP_CAPITAL_FLOOR_DAX_NAIRA) * BigInt(100);
  if (balance >= ceiling) return 1;
  if (balance <= BigInt(0)) return 0;
  return Number(balance) / Number(ceiling);
}

// ──────────────────────────────────────────────────
// NairaDisplay
// ──────────────────────────────────────────────────

function NairaDisplay({
  kobo,
  className = "",
}: {
  kobo: string;
  className?: string;
}) {
  const { whole, frac } = parseKobo(kobo);
  return (
    <span className={`tabular-nums tracking-tight ${className}`}>
      <span className="font-bold">{whole}</span>
      <span className="font-mono text-[0.9em] opacity-35">{frac}</span>
    </span>
  );
}

// ──────────────────────────────────────────────────
// Badge
// ──────────────────────────────────────────────────

function TierBadge({
  label,
  naira,
  met,
  color,
}: {
  label: string;
  naira: number;
  met: boolean;
  color: "emerald" | "gold";
}) {
  const activeClasses =
    color === "emerald"
      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
      : "border-gold-500/40 bg-gold-500/10 text-gold-400";
  const inactiveClasses = "border-zinc-700 bg-zinc-800/50 text-zinc-500";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-mono uppercase tracking-[0.12em] transition-colors ${
        met ? activeClasses : inactiveClasses
      }`}
    >
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full ${
          met
            ? color === "emerald"
              ? "bg-emerald-400"
              : "bg-gold-400"
            : "bg-zinc-600"
        }`}
      />
      {label} — ₦{naira.toLocaleString()}
    </span>
  );
}

// ──────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────

export default function CompliancePage() {
  const [leadId, setLeadId] = useState("");
  const [leadName, setLeadName] = useState("");
  const [state, setState] = useState<ViewState>({ phase: "idle" });

  const checkCapital = useCallback(async () => {
    if (!leadId.trim()) return;

    setState({ phase: "loading" });

    try {
      const params = new URLSearchParams();
      if (leadName.trim()) params.set("leadName", leadName.trim());

      const res = await fetch(
        `/api/vasp/capital/${encodeURIComponent(leadId.trim())}?${params.toString()}`,
      );
      const body = await res.json();

      if (!res.ok) {
        setState({ phase: "error", message: body.error ?? "Request failed" });
        return;
      }

      setState({ phase: "success", data: body as CapitalStatus });
    } catch (err) {
      setState({
        phase: "error",
        message: err instanceof Error ? err.message : "Network error",
      });
    }
  }, [leadId, leadName]);

  // ── Tier flags for badges ──
  const tier: VaspTier =
    state.phase === "success" ? state.data.vaspTier : "NONE";
  const metRatop = tier === "DAOP_RATOP" || tier === "DAX_CUSTODIAN";
  const metDax = tier === "DAX_CUSTODIAN";

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-10 text-zinc-100 sm:px-8">
      <div className="mx-auto max-w-4xl">
        {/* ── Header ── */}
        <div className="mb-8 border-b border-zinc-800 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            ShadowSpark Compliance Terminal
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white font-display">
            VASP Capital Reserve
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-zinc-400">
            SEC Circular 26-1 capital adequacy check. Enter a lead ID to verify
            wallet funding, determine VASP tier, and auto-provision the
            required capital reserve escrow.
          </p>
        </div>

        {/* ── Input Form ── */}
        <section className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-950/90 p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label
                htmlFor="leadId"
                className="mb-1.5 block text-xs font-mono uppercase tracking-[0.16em] text-zinc-500"
              >
                Lead ID
              </label>
              <input
                id="leadId"
                type="text"
                value={leadId}
                onChange={(e) => setLeadId(e.target.value)}
                placeholder="e.g. lead_abc123"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 font-mono text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-gold/60 focus:ring-1 focus:ring-gold/30"
                onKeyDown={(e) => e.key === "Enter" && checkCapital()}
              />
            </div>
            <div>
              <label
                htmlFor="leadName"
                className="mb-1.5 block text-xs font-mono uppercase tracking-[0.16em] text-zinc-500"
              >
                Lead Name <span className="text-zinc-600">(opt.)</span>
              </label>
              <input
                id="leadName"
                type="text"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                placeholder="e.g. Acme Corp"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 font-mono text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-gold/60 focus:ring-1 focus:ring-gold/30"
                onKeyDown={(e) => e.key === "Enter" && checkCapital()}
              />
            </div>
          </div>
          <button
            onClick={checkCapital}
            disabled={!leadId.trim() || state.phase === "loading"}
            className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gold/30 bg-gold/10 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-gold transition-all hover:bg-gold/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {state.phase === "loading" ? (
              <>
                <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-gold border-t-transparent" />
                Checking...
              </>
            ) : (
              "Check Capital Reserve"
            )}
          </button>
        </section>

        {/* ── Error ── */}
        {state.phase === "error" && (
          <section className="mb-8 rounded-3xl border border-rose-500/30 bg-rose-500/5 p-6">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-rose-400 text-lg leading-none">⚠</span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-rose-300">
                  Capital Check Failed
                </p>
                <p className="mt-1 font-mono text-sm text-zinc-300">
                  {state.message}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ── Loading ── */}
        {state.phase === "loading" && (
          <section className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-950/90 p-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 animate-pulse rounded-xl bg-zinc-800" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 animate-pulse rounded bg-zinc-800" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-zinc-800/70" />
              </div>
            </div>
          </section>
        )}

        {/* ── Results ── */}
        {state.phase === "success" && (
          <>
            {/* ── Verdict Banner ── */}
            <section
              className={`mb-6 rounded-3xl border p-6 ${
                state.data.thresholdMet
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-rose-500/30 bg-rose-500/5"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-500">
                    Verdict
                  </p>
                  <p className="mt-1 text-2xl font-bold tracking-tight font-display">
                    {state.data.thresholdMet
                      ? "Capital Threshold Met"
                      : "Below Capital Threshold"}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-mono uppercase tracking-[0.16em] ${
                    state.data.thresholdMet
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                      : "border-rose-500/40 bg-rose-500/10 text-rose-300"
                  }`}
                >
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      state.data.thresholdMet
                        ? "bg-emerald-400"
                        : "bg-rose-400"
                    }`}
                  />
                  {state.data.thresholdMet ? "PASS" : "FAIL"}
                </span>
              </div>
            </section>

            {/* ── Capital Gauges ── */}
            <section className="mb-6 rounded-3xl border border-zinc-800 bg-zinc-950/90 p-6">
              <p className="mb-4 text-xs font-mono uppercase tracking-[0.18em] text-gold">
                Wallet Balance
              </p>
              <NairaDisplay
                kobo={state.data.walletBalance}
                className="text-4xl font-display"
              />

              {/* ── Progress Bar ── */}
              <div className="mt-6">
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-zinc-800">
                  {/* RATOP marker at 50% (₦1B / ₦2B) */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-zinc-600 z-10"
                    style={{ left: "50%" }}
                  />
                  {/* Fill */}
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-gold transition-all duration-700 ease-out"
                    style={{
                      width: `${Math.min(progressFraction(state.data.walletBalance) * 100, 100)}%`,
                    }}
                  />
                </div>

                {/* Labels */}
                <div className="mt-2 flex justify-between text-xs font-mono text-zinc-500">
                  <span>₦0</span>
                  <span className="text-zinc-600">₦1B — RATOP</span>
                  <span>₦2B — DAX</span>
                </div>
              </div>
            </section>

            {/* ── Tier Badges ── */}
            <section className="mb-6 rounded-3xl border border-zinc-800 bg-zinc-950/90 p-6">
              <p className="mb-4 text-xs font-mono uppercase tracking-[0.18em] text-gold">
                SEC Circular 26-1 Tier Status
              </p>
              <div className="flex flex-wrap gap-3">
                <TierBadge
                  label="SEC RATOP"
                  naira={VASP_CAPITAL_FLOOR_DAOP_NAIRA}
                  met={metRatop}
                  color="emerald"
                />
                <TierBadge
                  label="SEC DAX"
                  naira={VASP_CAPITAL_FLOOR_DAX_NAIRA}
                  met={metDax}
                  color="gold"
                />
              </div>
            </section>

            {/* ── Escrow Detail ── */}
            {state.data.escrowAccount && (
              <section className="mb-6 rounded-3xl border border-zinc-800 bg-zinc-950/90 p-6">
                <p className="mb-4 text-xs font-mono uppercase tracking-[0.18em] text-gold">
                  Escrow Provisioning
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
                    <p className="text-xs font-mono uppercase tracking-[0.12em] text-zinc-500">
                      Escrow Account
                    </p>
                    <p className="mt-1 font-mono text-sm text-zinc-200">
                      {state.data.escrowAccount.id}
                    </p>
                    <p className="text-xs text-zinc-500">
                      Type: {state.data.escrowAccount.type}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
                    <p className="text-xs font-mono uppercase tracking-[0.12em] text-zinc-500">
                      Seed Amount
                    </p>
                    <NairaDisplay
                      kobo={state.data.seedAmount}
                      className="mt-1 text-lg font-display"
                    />
                  </div>
                </div>
                {state.data.seedTransactionId && (
                  <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
                    <p className="text-xs font-mono uppercase tracking-[0.12em] text-zinc-500">
                      Seed Transaction
                    </p>
                    <p className="mt-1 font-mono text-xs text-zinc-400 break-all">
                      {state.data.seedTransactionId}
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* ── Raw Response ── */}
            <details className="group">
              <summary className="cursor-pointer text-xs font-mono uppercase tracking-[0.16em] text-zinc-600 transition-colors hover:text-zinc-400">
                Raw API Response
              </summary>
              <pre className="mt-3 overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 font-mono text-xs leading-6 text-zinc-400">
                {JSON.stringify(state.data, null, 2)}
              </pre>
            </details>
          </>
        )}
      </div>
    </main>
  );
}
