import type { Metadata } from "next";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a demo of ShadowSpark. We build the AI Operating System for African fintech lenders.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black">
      <CTA />
      <Footer />
    </main>
  );
}
