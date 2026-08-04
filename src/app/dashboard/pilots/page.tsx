import type { Metadata } from "next";
import { PilotsClient } from "./PilotsClient";

export const metadata: Metadata = {
  title: "Pilots — ShadowSpark",
  description: "Track enterprise pilot applications and live deployments.",
};

export default function PilotsPage() {
  return <PilotsClient />;
}
