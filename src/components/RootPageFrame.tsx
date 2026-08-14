"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { CorporatePageLandmarks } from "@/components/CorporatePageLandmarks";
import { usesCorporatePageLandmarks } from "@/lib/navigation";

/**
 * Preserves established route framing while correcting the approved corporate page.
 *
 * A path guard avoids silently changing landmark ownership across unrelated admin,
 * dashboard, and marketing routes during this correction-only pass.
 */
export function RootPageFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (usesCorporatePageLandmarks(pathname)) {
    return <CorporatePageLandmarks>{children}</CorporatePageLandmarks>;
  }

  return (
    <main id="main-content" className="flex-1">
      {children}
    </main>
  );
}
