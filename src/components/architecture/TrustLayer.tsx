import { CircleCheck, Eye, KeyRound, Scale } from 'lucide-react';

import { trustPlane } from '@/components/architecture/architecture-model';

const trustControls = [
  {
    title: 'Input is evidence, not instruction',
    description: 'Retrieved text and user content remain untrusted until application rules validate their use.',
    boundary: 'Input trust boundary',
    icon: Eye,
  },
  {
    title: 'Identity does not imply authority',
    description: 'Authentication establishes identity; the requested operation still needs an explicit authorization decision.',
    boundary: 'Access boundary',
    icon: KeyRound,
  },
  {
    title: 'Consequences require accountability',
    description: 'Consequential, customer-facing, or irreversible actions should preserve a responsible human or policy decision point.',
    boundary: 'Action boundary',
    icon: Scale,
  },
  {
    title: 'Events are evidence, not certainty',
    description: 'Recorded signals support inspection, but coverage and retention must be verified in each deployment.',
    boundary: 'Reliability boundary',
    icon: CircleCheck,
  },
] as const;

/**
 * Expands the trust plane that crosses every structural layer.
 *
 * The cards describe review requirements rather than certifications so the
 * public page cannot convert control intent into an unsupported assurance.
 */
export function TrustLayer() {
  return (
    <section aria-labelledby="trust-layer-title" className="bg-slate-950 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-amber-400">
              Cross-cutting trust plane
            </p>
            <h2 id="trust-layer-title" className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Trust is a plane, not a checkpoint.
            </h2>
            <p className="mt-6 text-sm leading-7 text-slate-400">
              {trustPlane.label}. A control example is not certification; applicable
              controls and operating evidence require review for each deployment.
            </p>
            <p className="mt-6 w-fit rounded-full border border-slate-600/50 bg-slate-500/10 px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-slate-300">
              {trustPlane.evidence}
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {trustControls.map((control) => (
              <article key={control.title} className="bg-[#0a0b0d] p-6 sm:p-8">
                <control.icon aria-hidden="true" className="h-6 w-6 text-emerald-400" strokeWidth={1.5} />
                <p className="mt-8 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-slate-400">
                  {control.boundary}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-white">{control.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-400">{control.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
