import {
  Check,
  FileSearch,
  Fingerprint,
  MessageSquareText,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

import {
  operationalSteps,
  type OperationalStepId,
} from '@/components/architecture/architecture-model';

const stepIcons: Record<OperationalStepId, LucideIcon> = {
  receive: MessageSquareText,
  ground: FileSearch,
  propose: Workflow,
  authorize: Fingerprint,
  'act-record': Check,
};

/**
 * Explains operational behavior without redefining structural ownership.
 *
 * The sequence remains technology-neutral so authorization and evidence survive
 * changes to models, storage systems, and deployment providers.
 */
export function RealityFlow() {
  return (
    <section
      data-model-kind="behavior"
      aria-labelledby="reality-flow-title"
      className="border-y border-white/10 bg-[#0a0b0d] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">
              Operational Reality Flow
            </p>
            <h2
              id="reality-flow-title"
              className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl"
            >
              A model proposes. The system decides what may happen.
            </h2>
          </div>
          <p className="text-sm leading-6 text-slate-400">
            This is behavioral order, not another layer model. It preserves
            context, authority, and evidence between a request and an action.
          </p>
        </div>

        <div className="relative mt-12">
          <div
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-gradient-to-r from-amber-400/20 via-emerald-400/60 to-amber-400/20 lg:block"
          />
          <ol className="grid gap-0 divide-y divide-white/10 sm:grid-cols-2 sm:gap-4 sm:divide-y-0 lg:grid-cols-5">
            {operationalSteps.map((step) => {
              const Icon = stepIcons[step.id];

              return (
                <li
                  key={step.id}
                  className="relative flex items-start gap-4 py-6 first:pt-0 last:pb-0 sm:block sm:rounded-2xl sm:border sm:border-white/10 sm:bg-slate-950/80 sm:p-5"
                >
                  <div className="flex w-10 shrink-0 flex-col items-center gap-2 sm:w-auto sm:flex-row sm:justify-between sm:gap-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/30 bg-[#0a0b0d] text-amber-300 sm:h-12 sm:w-12">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      {step.number}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 sm:mt-5">
                    <h3 className="text-lg font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400 sm:mt-3">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
