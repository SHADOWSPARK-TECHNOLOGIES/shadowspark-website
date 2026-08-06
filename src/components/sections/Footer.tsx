import Link from "next/link";
import { Zap } from "lucide-react";

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Loan Intake", href: "#solutions" },
      { label: "KYC", href: "#solutions" },
      { label: "Recovery", href: "#solutions" },
      { label: "Compliance", href: "#compliance" },
      { label: "API Docs", href: "/docs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "NDPA Compliance", href: "/security" },
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

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <Zap className="h-5 w-5" fill="currentColor" />
              </span>
              <span className="text-base font-bold tracking-tight">ShadowSpark</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              The AI Operating System for African fintech lenders.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
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
                      className="text-sm text-slate-500 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-xs text-slate-600">
          © 2026 ShadowSpark Technologies. Built for African Fintech.
        </div>
      </div>
    </footer>
  );
}
