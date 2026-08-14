import Link from 'next/link';
import { ArrowDownRight, BadgeCheck, Braces, ShieldCheck } from 'lucide-react';

const evidenceSignals = [
  { icon: Braces, label: 'Repository-backed' },
  { icon: BadgeCheck, label: 'Reference patterns labelled' },
  { icon: ShieldCheck, label: 'Trust boundaries visible' },
] as const;

/**
 * Introduces the architecture page and its evidence standard.
 *
 * The hero intentionally avoids live-system language because repository code
 * proves implementation, not production configuration or operating state.
 */
export function ArchitectureHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-slate-950">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(to_right,rgba(201,146,42,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,146,42,0.12)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-36 top-10 -z-10 h-80 w-80 rounded-full border border-emerald-400/20 bg-emerald-400/5 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-8 lg:py-32">
        <div className="max-w-4xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-amber-400">
            ShadowSpark / Architecture note 01
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[0.94] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">
            Product architecture, with the evidence left visible.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            A company-wide view of interfaces, workflows, applied AI, integrations,
            data, and trust—without implying that every product uses every layer.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#system-map"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none"
            >
              Read the system structure
              <ArrowDownRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              href="/#solutions"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none"
            >
              Explore current systems
            </Link>
          </div>
        </div>

        <aside
          aria-label="Architecture evidence standard"
          className="self-end border-l border-amber-400/40 pl-6 pr-20 sm:pr-0 lg:mb-2"
        >
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-slate-400">
            Reading protocol
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            This page separates implemented source code from reference architecture
            and deployment claims that still need operating evidence.
          </p>
          <ul className="mt-6 space-y-3">
            {evidenceSignals.map((signal) => (
              <li key={signal.label} className="flex items-center gap-3 text-sm text-slate-400">
                <signal.icon aria-hidden="true" className="h-4 w-4 text-emerald-400" />
                {signal.label}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
