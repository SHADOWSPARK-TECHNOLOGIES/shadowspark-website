import type { LucideIcon } from 'lucide-react';

import type {
  ArchitectureEvidence,
  ArchitectureLayerDefinition,
} from '@/components/architecture/architecture-model';

/** Content needed to render one typed architecture boundary. */
export interface ArchitectureLayerProps extends ArchitectureLayerDefinition {
  /** Decorative icon paired with a text label. */
  icon: LucideIcon;
}

const evidenceStyles: Record<ArchitectureEvidence, string> = {
  'Implemented in repository': 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  'Reference pattern': 'border-amber-400/30 bg-amber-400/10 text-amber-300',
  'Deployment verification required': 'border-slate-500/40 bg-slate-500/10 text-slate-300',
};

/**
 * Renders one architecture boundary with its evidence classification.
 *
 * Evidence remains adjacent to the claim so visual layout cannot separate a
 * capability statement from the qualification that makes it truthful.
 */
export function ArchitectureLayer({
  index,
  label,
  title,
  description,
  details,
  evidence,
  icon: Icon,
}: ArchitectureLayerProps) {
  return (
    <article className="flex h-full flex-col bg-slate-950 p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs text-slate-400" aria-hidden="true">
          {index}
        </span>
        <Icon aria-hidden="true" className="h-5 w-5 text-amber-400" strokeWidth={1.5} />
      </div>
      <p className="mt-8 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-emerald-400">
        {label}
      </p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-4 text-sm leading-6 text-slate-400">{description}</p>
      <ul className="mt-6 space-y-2 border-t border-white/10 pt-5">
        {details.map((detail) => (
          <li key={detail} className="flex gap-2 text-xs leading-5 text-slate-400">
            <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400/70" />
            {detail}
          </li>
        ))}
      </ul>
      <p className={`mt-6 w-fit rounded-full border px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] ${evidenceStyles[evidence]}`}>
        {evidence}
      </p>
    </article>
  );
}
