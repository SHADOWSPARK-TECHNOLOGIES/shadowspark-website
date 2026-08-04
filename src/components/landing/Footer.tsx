import Link from "next/link";
import { products } from "@/data/products";

export function Footer() {
  const linkFocus =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1ABC9C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1B2B] rounded-sm";
  const productLinks = products.map((product) => ({
    label: product.name,
    href:
      product.href ??
      `mailto:hello@shadowspark-tech.org?subject=${encodeURIComponent(`[${product.name}] access request`)}`,
    external: !product.href,
  }));

  return (
    <footer className="bg-[#0B1B2B] border-t border-white/10 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-bold text-white text-base mb-2">ShadowSpark Technologies</p>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              A Nigerian AI agency.
              <br />
              We build production AI for businesses that need real solutions, not slides.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#94A3B8] mb-4">Products</p>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/products"
                  className={`text-sm text-[#94A3B8] hover:text-white transition-colors ${linkFocus}`}
                >
                  All Products
                </Link>
              </li>
              {productLinks.map((product) => (
                <li key={product.label}>
                  <Link
                    href={product.href}
                    target={product.external ? "_blank" : undefined}
                    rel={product.external ? "noopener noreferrer" : undefined}
                    className={`text-sm text-[#94A3B8] hover:text-white transition-colors ${linkFocus}`}
                  >
                    {product.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#94A3B8] mb-4">Company</p>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Home", href: "/" },
                { label: "AI Chatbots", href: "/chatbot-products" },
                { label: "Trust Infrastructure", href: "/infrastructure-trust" },
                { label: "Public Sector", href: "/public-sector" },
                { label: "Contributors", href: "/contributors" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm text-[#94A3B8] hover:text-white transition-colors ${linkFocus}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-[#94A3B8]">
          {/* TODO: needs real value from operator — add RC number when available */}
          © 2026 ShadowSpark Technologies · Registered in Nigeria
        </div>
      </div>
    </footer>
  );
}
