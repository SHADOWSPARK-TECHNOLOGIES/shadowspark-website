import {
  Bot,
  Database,
  Globe,
  PanelTop,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

import { ArchitectureLayer } from '@/components/architecture/ArchitectureLayer';
import {
  architectureLayers,
  trustPlane,
  type ArchitectureLayerId,
} from '@/components/architecture/architecture-model';

const layerIcons: Record<ArchitectureLayerId, LucideIcon> = {
  'experience-interface': PanelTop,
  'application-workflow': Workflow,
  'applied-ai-context': Bot,
  'platform-integrations': Globe,
  'data-infrastructure': Database,
};

/**
 * Presents the approved structural model and its cross-cutting trust plane.
 *
 * The ordered list describes responsibility boundaries, not request sequence.
 * RealityFlow owns behavioral order so the two diagrams cannot drift together.
 */
export function ArchitectureDiagram() {
  return (
    <section
      id="system-map"
      data-model-kind="structure"
      aria-labelledby="system-map-title"
      className="bg-slate-950 py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-amber-400">
              Product & applied-AI architecture
            </p>
            <h2
              id="system-map-title"
              className="mt-4 max-w-4xl font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl"
            >
              Five structural layers. One cross-cutting trust plane.
            </h2>
          </div>
          <p className="border-l border-emerald-400/40 pl-5 text-sm leading-6 text-slate-400">
            <strong className="text-emerald-300">Company-wide pattern:</strong>{' '}
            not every product uses every layer, and source-code presence does not
            establish production configuration.
          </p>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl shadow-black/20 md:grid-cols-2 xl:grid-cols-5">
          {architectureLayers.map((layer) => (
            <li key={layer.id} className="min-w-0">
              <ArchitectureLayer {...layer} icon={layerIcons[layer.id]} />
            </li>
          ))}
        </ol>

        <aside
          aria-labelledby="trust-plane-summary-title"
          className="mt-5 grid gap-6 rounded-2xl border border-emerald-400/25 bg-emerald-400/5 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center"
        >
          <div>
            <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Cross-cutting plane
            </p>
            <h3
              id="trust-plane-summary-title"
              className="mt-3 text-2xl font-semibold tracking-tight text-white"
            >
              {trustPlane.label}
            </h3>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-400">
              {trustPlane.description}
            </p>
          </div>
          <div>
            <ul className="grid gap-2 text-xs leading-5 text-slate-300 sm:grid-cols-2 lg:grid-cols-1">
              {trustPlane.concerns.map((concern) => (
                <li key={concern} className="flex gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-300"
                  />
                  {concern}
                </li>
              ))}
            </ul>
            <p className="mt-5 w-fit rounded-full border border-slate-400/40 bg-slate-400/10 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-slate-200">
              {trustPlane.evidence}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
