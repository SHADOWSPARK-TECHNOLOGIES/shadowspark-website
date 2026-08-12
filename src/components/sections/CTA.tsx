'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50';

type ContactForm = {
  name: string;
  company: string;
  email: string;
  message: string;
};

const EMPTY_FORM: ContactForm = {
  name: '',
  company: '',
  email: '',
  message: '',
};

/** Renders and submits the public pilot-program contact form. */
export function CTA() {
  const [form, setForm] = useState<ContactForm>(EMPTY_FORM);
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');

  function set<K extends keyof ContactForm>(key: K, value: string): void {
    setForm((currentForm) => ({ ...currentForm, [key]: value }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error('Contact request failed');
      }

      setStatus('success');
      setForm(EMPTY_FORM);
      toast.success('Demo request accepted by the website.');
    } catch {
      setStatus('error');
      toast.error('Could not submit the demo request. Please try again.');
    }
  }

  return (
    <section className='bg-black py-16 sm:py-20 lg:py-24' id='contact'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl text-center'>
          <span className='text-xs font-semibold uppercase tracking-widest text-gold-400'>
            Pilot program
          </span>
          <h1 className='font-display mt-4 text-3xl font-semibold text-white sm:text-4xl'>
            See an example ShadowSpark workflow
          </h1>
          <p className='mt-4 text-base text-zinc-400'>
            Tell us about your loan operations and we will scope a relevant pilot
            conversation.
          </p>
        </div>

        <div className='mx-auto mt-10 max-w-2xl'>
          {status === 'success' ? (
            <div
              className='rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center'
              role='status'
            >
              <p className='text-lg font-bold text-white'>Demo request accepted.</p>
              <p className='mt-2 text-zinc-400'>
                The site validated your request and sent it through the configured
                lead-capture path.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
              {status === 'error' && (
                <p
                  className='rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300'
                  role='alert'
                >
                  The request could not be submitted. Please try again.
                </p>
              )}

              <div className='grid gap-5 sm:grid-cols-2'>
                <div>
                  <label htmlFor='demo-name' className='mb-1.5 block text-sm font-medium text-white'>
                    Name <span className='text-gold-400'>*</span>
                  </label>
                  <input
                    id='demo-name'
                    type='text'
                    required
                    minLength={2}
                    maxLength={100}
                    value={form.name}
                    onChange={(event) => set('name', event.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor='demo-company'
                    className='mb-1.5 block text-sm font-medium text-white'
                  >
                    Company
                  </label>
                  <input
                    id='demo-company'
                    type='text'
                    maxLength={200}
                    value={form.company}
                    onChange={(event) => set('company', event.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor='demo-email' className='mb-1.5 block text-sm font-medium text-white'>
                  Email <span className='text-gold-400'>*</span>
                </label>
                <input
                  id='demo-email'
                  type='email'
                  required
                  maxLength={254}
                  value={form.email}
                  onChange={(event) => set('email', event.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor='demo-message' className='mb-1.5 block text-sm font-medium text-white'>
                  What are you trying to build? <span className='text-gold-400'>*</span>
                </label>
                <textarea
                  id='demo-message'
                  required
                  minLength={10}
                  maxLength={5_000}
                  rows={5}
                  value={form.message}
                  onChange={(event) => set('message', event.target.value)}
                  className={inputClass}
                  placeholder='Describe your loan products, volume, and compliance needs.'
                />
              </div>

              <button
                type='submit'
                disabled={status === 'sending'}
                data-analytics='contact-submit'
                className='inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-gold-500 px-8 py-4 text-sm font-bold text-black transition-colors hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60'
              >
                {status === 'sending' ? 'Submitting…' : 'Request a Demo'}
                <Send className='h-4 w-4' />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
