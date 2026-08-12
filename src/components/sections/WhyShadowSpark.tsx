'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Coins, Database, Lock, Scale } from 'lucide-react';

import { trackMetaEvent } from '@/components/meta-events';

const differentiators = [
  {
    icon: Database,
    title: 'Ledger Workflow Example',
    description:
      'A pilot can demonstrate balanced transaction records and operator-visible audit events.',
  },
  {
    icon: Scale,
    title: 'Regulatory Review Mapping',
    description:
      'Applicable requirements can be mapped to review tasks during pilot discovery.',
  },
  {
    icon: Lock,
    title: 'Identity-Control Example',
    description:
      'A pilot can evaluate consent, identity-provider boundaries, and evidence capture.',
  },
  {
    icon: Coins,
    title: 'Asset Workflow Example',
    description:
      'Illustrative collateral workflows can be explored without presenting them as a live service.',
  },
];

/** Presents proposed pilot capabilities without customer or competitor claims. */
export function WhyShadowSpark() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      trackMetaEvent('WhyShadowSparkView', { location: 'home_page' });
    }
  }, [isInView]);

  return (
    <section ref={ref} id='why' className='bg-slate-950 py-16 sm:py-20 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-12 text-center'>
          <span className='text-xs font-semibold uppercase tracking-widest text-amber-500'>
            Pilot program
          </span>
          <h2 className='mt-4 text-3xl font-bold text-white sm:text-4xl'>
            Evaluate Financial Workflows Before Production
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-base text-slate-400'>
            ShadowSpark pilot scopes combine example workflows, explicit operator review,
            and acceptance criteria agreed during discovery.
          </p>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {differentiators.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className='rounded-xl border border-slate-700 bg-slate-900 p-6 transition-colors hover:border-slate-600 hover:bg-slate-800'
            >
              <div className='mb-4 inline-flex rounded-lg bg-amber-500/10 p-3'>
                <item.icon className='h-6 w-6 text-amber-500' />
              </div>
              <h3 className='text-lg font-semibold text-slate-100'>{item.title}</h3>
              <p className='mt-2 text-sm leading-relaxed text-slate-400'>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <p className='mx-auto mt-10 max-w-3xl text-center text-sm text-slate-500'>
          Examples are proposed capabilities, not certifications, customer outcomes, or
          production availability commitments.
        </p>
      </div>
    </section>
  );
}
