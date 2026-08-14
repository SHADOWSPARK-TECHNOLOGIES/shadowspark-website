import Link from "next/link";
import { Zap } from "lucide-react";

const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Systems", href: "/#solutions" },
      { label: "Architecture", href: "/architecture" },
      { label: "Selected Work", href: "/#case-study" },
      { label: "Workflow Demo", href: "/demo" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Twitter / X", href: "https://x.com/shadowspark" },
      { label: "LinkedIn", href: "https://linkedin.com/company/shadowspark" },
      { label: "GitHub", href: "https://github.com/shadowspark-technologies" },
    ],
  },
];

/** Renders the corporate footer without reducing the company to one product area. */
export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <Zap aria-hidden="true" className="h-5 w-5" fill="currentColor" />
              </span>
              <span className="text-base font-bold tracking-tight">ShadowSpark</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              An independent product and technology company building digital
              products, applied-AI systems, and experimental technology.
            </p>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={`${column.title} links`}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                {column.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="rounded text-sm text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-xs text-slate-400">
          © 2026 ShadowSpark Technologies. Products, systems, and experiments.
        </div>
      </div>
    </footer>
  );
}
