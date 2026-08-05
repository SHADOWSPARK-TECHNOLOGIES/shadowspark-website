import type { Metadata } from "next";
import LoansPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Loans — ShadowSpark",
  description: "Manage loans and applications",
};

export default function LoansPage() {
  return <LoansPageClient />;
}
