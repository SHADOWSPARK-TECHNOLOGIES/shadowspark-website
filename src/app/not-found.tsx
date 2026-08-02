import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B1B2B] px-6 text-white">
      <div className="max-w-md text-center">
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-[#1ABC9C]">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold">Page not found</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          The page you requested is unavailable or may have moved.
        </p>
        <Link
          className="mt-8 inline-flex rounded-full bg-[#FF6F3C] px-5 py-3 text-sm font-semibold text-[#0B1B2B]"
          href="/"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
