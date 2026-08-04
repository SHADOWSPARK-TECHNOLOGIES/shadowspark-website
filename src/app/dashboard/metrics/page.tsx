import type { Metadata } from "next";
import { MetricsClient } from "./MetricsClient";

export const metadata: Metadata = {
  title: "Metrics — ShadowSpark",
  description: "Monitor product, reward, and pilot metrics.",
};

export default function MetricsPage() {
  return <MetricsClient />;
}
