import type { Metadata } from "next";
import KYCPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "KYC — ShadowSpark",
  description: "Know Your Customer document verification",
};

export default function KYCPage() {
  return <KYCPageClient />;
}
