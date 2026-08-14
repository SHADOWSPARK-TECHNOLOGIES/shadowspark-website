import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { ArchitectureDiagram } from '@/components/architecture/ArchitectureDiagram';
import { ArchitectureHero } from '@/components/architecture/ArchitectureHero';
import { RealityFlow } from '@/components/architecture/RealityFlow';
import { TrustLayer } from '@/components/architecture/TrustLayer';
import { architectureMetadataContent } from '@/components/architecture/architecture-model';
import { marketingMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...marketingMetadata(
    architectureMetadataContent.pathname,
    architectureMetadataContent.title,
    architectureMetadataContent.description,
  ),
  keywords: [...architectureMetadataContent.keywords],
};

const principles = [
  {
    number: 'I',
    title: 'Evidence before assertion',
    description: 'Public language should identify whether a capability is implemented, illustrative, or deployment-dependent.',
  },
  {
    number: 'II',
    title: 'Proposals before actions',
    description: 'Model output remains a proposal until deterministic controls and accountable authority approve its use.',
  },
  {
    number: 'III',
    title: 'Boundaries before scale',
    description: 'Clear input, context, access, action, and operations boundaries matter before performance claims do.',
  },
  {
    number: 'IV',
    title: 'Operations before guarantees',
    description: 'Events and health signals are foundations for inspection, not substitutes for verified operating evidence.',
  },
] as const;

/**
 * Renders ShadowSpark's public, evidence-labelled architecture narrative.
 *
 * RootPageFrame owns this route's corporate landmarks so the global header and
 * footer remain siblings of the page-specific main content.
 */
export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
        <ArchitectureHero />
        <ArchitectureDiagram />
        <RealityFlow />
        <TrustLayer />

        <section aria-labelledby="architecture-principles-title" className="border-t border-white/10 bg-[#0a0b0d] py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">
                Architecture principles
              </p>
              <h2 id="architecture-principles-title" className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                The invariants outlast the tools.
              </h2>
            </div>

            <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
              {principles.map((principle) => (
                <li key={principle.number} className="bg-slate-950 p-6 sm:p-8">
                  <span className="font-mono text-xs text-amber-400">{principle.number}</span>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">{principle.title}</h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">{principle.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="architecture-continuity-title" className="bg-amber-400 py-16 text-slate-950 sm:py-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-slate-700">
                Design for continuity
              </p>
              <h2 id="architecture-continuity-title" className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Products should degrade deliberately, not fail ambiguously.
              </h2>
            </div>
            <Link
              href="/#solutions"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-400 motion-reduce:transition-none"
            >
              Explore current systems
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </section>
    </div>
  );
}
