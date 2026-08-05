import type { Metadata } from "next";

/**
 * Marketing section base metadata.
 * Individual pages can override these values via their own metadata exports.
 */
export const metadata: Metadata = {
  title: {
    default: "ShadowSpark — AI Operating System for African Fintech",
    template: "%s | ShadowSpark",
  },
  description:
    "Automate loan origination, instant KYC verification, and intelligent recovery. The enterprise infrastructure layer for African lenders.",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
