'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Command, FileText, Keyboard, Search, Sparkles, X } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { loans } from '@/data/mock'

const pages = [
  { label: 'Dashboard', href: '/dashboard', group: 'Pages', detail: '' },
  { label: 'Loans', href: '/dashboard/loans', group: 'Pages', detail: '' },
  { label: 'KYC review', href: '/dashboard/kyc', group: 'Pages', detail: '' },
  { label: 'Messages', href: '/dashboard/messages', group: 'Pages', detail: '' },
  { label: 'Workflows', href: '/dashboard/workflows', group: 'Pages', detail: '' },
  { label: 'Analytics', href: '/dashboard/analytics', group: 'Pages', detail: '' },
  { label: 'Settings', href: '/dashboard/settings', group: 'Pages', detail: '' },
]

export function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return <span className="tooltip-wrap"><span aria-hidden="true">{children}</span><span role="tooltip" className="tooltip-content">{label}</span></span>
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  return <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: 'easeOut' }}>{children}</motion.div>
}

export function LoadingSkeleton({ rows = 4 }: { rows?: number }) {
  return <div className="panel loading-skeleton p-5" aria-label="Loading content" role="status"><div className="skeleton-block skeleton-heading"/>{Array.from({ length: rows }, (_, index) => <div className="skeleton-row" key={index}><div className="skeleton-block skeleton-avatar"/><div className="flex-1"><div className="skeleton-block skeleton-line"/><div className="skeleton-block skeleton-line short"/></div><div className="skeleton-block skeleton-pill"/></div>)}</div>
}

export function RetryState({ title = 'Something went wrong', description = 'We could not load this view.', onRetry }: { title?: string; description?: string; onRetry: () => void }) {
  return <div className="panel flex flex-col items-center justify-center gap-3 px-6 py-16 text-center" role="alert"><div className="rounded-full bg-rose-500/10 p-3 text-rose-400"><X/></div><h2 className="font-semibold text-slate-100">{title}</h2><p className="max-w-sm text-sm text-slate-500">{description}</p><button className="secondary-button" onClick={onRetry}>Try again</button></div>
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const results = useMemo(() => {
    const needle = query.toLowerCase()
    const loanResults = loans.filter((loan) => `${loan.applicantName} ${loan.id}`.toLowerCase().includes(needle)).slice(0, 5).map((loan) => ({ label: loan.applicantName, detail: `${loan.id} · ₦${loan.loanAmount.toLocaleString()}`, href: '/dashboard/loans', group: 'Loans' }))
    return [...pages, ...loanResults].filter((item) => !needle || `${item.label} ${item.detail ?? ''}`.toLowerCase().includes(needle)).slice(0, 10)
  }, [query])
  return <AnimatePresence>{open && <motion.div className="command-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}><motion.div className="command-dialog" initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12 }} onMouseDown={(event) => event.stopPropagation()}><div className="command-input-wrap"><Search/><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search loans, applicants, or pages..." aria-label="Search loans, applicants, or pages"/><kbd>ESC</kbd></div><div className="command-results">{results.length ? results.map((result) => <Link href={result.href} key={`${result.group}-${result.label}`} onClick={onClose} className="command-result"><div className="command-result-icon"><FileText/></div><div><strong>{result.label}</strong><span>{result.detail ?? result.group}</span></div><span className="command-result-group">{result.group}</span></Link>) : <div className="command-empty"><Search/><p>No results found</p></div>}</div><div className="command-footer"><span><Keyboard/> Navigate</span><span><Command/> Select</span><span>ESC Close</span></div></motion.div></motion.div>}</AnimatePresence>
}

export function ChangelogModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open && <motion.div className="command-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}><motion.div className="changelog-dialog" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} onMouseDown={(event) => event.stopPropagation()}><div className="flex items-start justify-between"><div><div className="mb-3 inline-flex rounded-lg bg-amber-500/10 p-2 text-amber-400"><Sparkles/></div><p className="eyebrow">Product updates</p><h2 className="mt-1 text-2xl font-semibold text-slate-100">What&apos;s new</h2><p className="mt-2 text-sm text-slate-500">A sharper lending workspace for your team.</p></div><button className="icon-button" aria-label="Close what's new" onClick={onClose}><X/></button></div><div className="changelog-list"><article><span className="changelog-date">AUG 07, 2026</span><h3>Command center search</h3><p>Jump to applicants, loans, and workspace pages with Cmd+K.</p></article><article><span className="changelog-date">AUG 05, 2026</span><h3>Workflow canvas</h3><p>Build and inspect KYC and approval automations visually.</p></article><article><span className="changelog-date">AUG 01, 2026</span><h3>Mobile operations</h3><p>Review queues and notifications from a compact bottom navigation.</p></article></div><button className="primary-button mt-6 w-full" onClick={onClose}>Continue to workspace</button></motion.div></motion.div>}</AnimatePresence>
}

export function PageLoading() { return <PageTransition><LoadingSkeleton/></PageTransition> }
