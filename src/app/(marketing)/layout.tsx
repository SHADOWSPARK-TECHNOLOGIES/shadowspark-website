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
    "Explore ShadowSpark pilot workflows for African fintech operations.",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
