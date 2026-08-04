import Link from "next/link";

type NavKey =
  | "home"
  | "products"
  | "contributors"
  | "chatbot-products"
  | "infrastructure-trust"
  | "public-sector";

const links: Array<{ key: NavKey; label: string; href: string }> = [
  { key: "home", label: "Home", href: "/" },
  { key: "products", label: "Products", href: "/products" },
  { key: "contributors", label: "Contributors", href: "/contributors" },
  { key: "chatbot-products", label: "AI Chatbots", href: "/chatbot-products" },
  {
    key: "infrastructure-trust",
    label: "Trust Infrastructure",
    href: "/infrastructure-trust",
  },
  { key: "public-sector", label: "Public Sector", href: "/public-sector" },
];

export function SiteNav({ active = "home" }: { active?: NavKey }) {
  const baseLinkClass =
    "transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1ABC9C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1B2B] rounded-sm";

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0B1B2B]/90 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          className={`text-xl font-extrabold tracking-tight text-white ${baseLinkClass}`}
        >
          Shadow<span className="text-[#1ABC9C]">spark</span>
        </Link>
        <ul className="hidden items-center gap-8 text-sm font-medium text-[#94A3B8] md:flex">
          {links.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                className={`${baseLinkClass} ${
                  active === link.key ? "text-white" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="hidden rounded-lg bg-[#FF6F3C] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#e85e2c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1ABC9C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1B2B] md:inline-flex"
        >
          Start a Project
        </Link>
      </nav>
    </header>
  );
}
