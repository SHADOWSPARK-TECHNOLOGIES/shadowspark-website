import Link from "next/link";
import { SiteNav } from "@/components/landing/SiteNav";

export function Hero() {
  return (
    <>
      <SiteNav active="home" />
      <section className="bg-[#0B1B2B] pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1ABC9C]/30 bg-[#1ABC9C]/10 px-3 py-1 text-xs font-medium text-[#1ABC9C]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1ABC9C] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1ABC9C]" />
          </span>
          Production systems, not slides
        </div>

        <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] max-w-3xl">
          AI Built for Nigeria.
          <br />
          <span className="text-gradient-animate bg-gradient-to-r from-[#1ABC9C] to-[#FF6F3C] bg-clip-text text-transparent">
            Shipped, Not Pitched.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#94A3B8] max-w-2xl">
          We design and build secure, production-grade AI chatbots and trust
          infrastructure. From WhatsApp operations automation to identity
          verification, our conversational systems solve real problems for
          Nigerian operators.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/chatbot-products"
            className="inline-flex items-center gap-2 rounded-xl bg-[#FF6F3C] px-8 py-4 text-sm font-bold text-white hover:bg-[#e85e2c] transition-colors"
          >
            See What We&apos;ve Built
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            href="/infrastructure-trust"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-8 py-4 text-sm font-bold text-white hover:border-white/60 hover:bg-white/5 transition-colors"
          >
            View Trust Infrastructure
          </Link>
        </div>

        <p className="mt-10 text-xs text-[#94A3B8] tracking-wide">
          Built in Nigeria&nbsp;&nbsp;·&nbsp;&nbsp;Production systems, not slides&nbsp;&nbsp;·&nbsp;&nbsp;You talk to the builder
        </p>

        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#94A3B8]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-[#1ABC9C]">
            <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Built to SOC 2 Principles
        </div>
      </div>
      </section>
    </>
  );
}
