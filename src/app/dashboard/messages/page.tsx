import type { Metadata } from "next";
import MessagesPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Messages — ShadowSpark",
  description: "Applicant communication center",
};

export default function MessagesPage() {
  return <MessagesPageClient />;
}
