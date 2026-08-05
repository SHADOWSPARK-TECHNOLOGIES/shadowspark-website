import type { Metadata } from "next";
import AnalyticsPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Analytics — ShadowSpark",
  description: "Lending portfolio analytics and insights",
};

export default function AnalyticsPage() {
  return <AnalyticsPageClient />;
}
