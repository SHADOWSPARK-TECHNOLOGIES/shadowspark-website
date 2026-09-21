import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata(
  "/demo",
  "Interactive Demo",
  "Run a live ShadowSpark loan simulation — apply, get approved, and see repayment scheduling in under 3 minutes.",
);

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
