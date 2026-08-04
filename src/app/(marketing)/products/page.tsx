import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/seo";
import { SiteNav } from "@/components/landing/SiteNav";
import { products, type Product, type ProductStatus } from "@/data/products";

export const metadata: Metadata = {
  ...canonical("/products"),
  title: "Products Showcase",
  description:
    "A data-driven showcase of ShadowSpark products: live systems, beta releases, and in-development AI infrastructure.",
  openGraph: {
    title: "Products Showcase — ShadowSpark",
    description:
      "Explore ShadowSpark products from Lodgist to the chatbot engine, each with delivery status and trust posture.",
  },
};

const statusStyles: Record<ProductStatus, string> = {
  live: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  beta: "bg-indigo-500/15 text-indigo-300 border-indigo-400/30",
  "in-development": "bg-amber-500/15 text-amber-300 border-amber-400/30",
};

function productCtaHref(product: Product): string {
  if (product.href) return product.href;
  return `mailto:hello@shadowspark-tech.org?subject=${encodeURIComponent(
    `[${product.name}] access request`,
  )}`;
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <SiteNav active="products" />

      <section className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-300">
            Products
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Built for Nigeria. Shipped, not pitched.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            A data-driven showcase of ShadowSpark products across live, beta,
            and in-development tracks.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.slug}
              className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-bold text-white">{product.name}</h2>
                <span
                  className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${statusStyles[product.status]}`}
                >
                  {product.status}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {product.tagline}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-700 bg-slate-800/70 px-2.5 py-1 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
                {product.repo ? (
                  <span className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2.5 py-1 text-xs text-indigo-300">
                    repo: {product.repo}
                  </span>
                ) : null}
              </div>

              {product.security.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {product.security.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}

              <Link
                href={productCtaHref(product)}
                className="mt-7 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#1ABC9C] to-[#FF6F3C] px-4 py-2.5 text-sm font-bold text-white transition hover:from-[#17a889] hover:to-[#e85e2c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1ABC9C] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                {product.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
