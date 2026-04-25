import { Suspense } from "react";
import CheckoutClient from "@/components/CheckoutClient";

function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-lg bg-gray-800 ${className}`} />;
}

function CheckoutSkeleton() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-[2rem] border border-zinc-800 bg-zinc-950/90 p-6 sm:p-8">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-4 h-10 w-3/4" />
        <Skeleton className="mt-4 h-5 w-full" />
        <Skeleton className="mt-2 h-5 w-5/6" />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.5rem] border border-zinc-800 bg-zinc-900 p-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-4 h-4 w-full" />
            <Skeleton className="mt-3 h-4 w-11/12" />
            <Skeleton className="mt-3 h-4 w-4/5" />
          </div>

          <div className="rounded-[1.5rem] border border-zinc-800 bg-zinc-900 p-6">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="mt-4 h-4 w-full" />
            <Skeleton className="mt-3 h-4 w-10/12" />
            <Skeleton className="mt-3 h-4 w-3/4" />
          </div>
        </div>
      </section>

      <aside className="rounded-[2rem] border border-zinc-800 bg-zinc-950/90 p-6 sm:p-8">
        <Skeleton className="h-4 w-28" />
        <div className="mt-5 rounded-[1.5rem] border border-zinc-800 bg-zinc-900 p-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-4 h-10 w-32" />
          <Skeleton className="mt-4 h-4 w-5/6" />
        </div>
        <div className="mt-6 rounded-[1.5rem] border border-zinc-800 bg-zinc-900 p-5">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="mt-3 h-5 w-11/12" />
        </div>
        <Skeleton className="mt-6 h-14 w-full rounded-full" />
      </aside>
    </div>
  );
}

export default function NewCheckoutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-4">
      <Suspense fallback={<CheckoutSkeleton />}>
        <CheckoutClient />
      </Suspense>
    </div>
  );
}
