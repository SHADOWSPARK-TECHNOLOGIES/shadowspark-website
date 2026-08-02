"use client";

export default function GlobalError() {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-[#0B1B2B] px-6 text-white">
          <div className="max-w-md text-center">
            <h1 className="text-3xl font-bold">Something went wrong</h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              We could not load this page. Please try again.
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
