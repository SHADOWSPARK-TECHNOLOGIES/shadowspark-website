import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import {
  Cormorant_Garamond,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
} from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { RootPageFrame } from '@/components/RootPageFrame';
import {
  marketingMetadata,
  ORGANIZATION_DESCRIPTION,
  organizationJsonLd,
} from '@/lib/seo';
import ChatWidget from "@/components/ChatWidget";
import { CalendlyProvider } from "@/components/calendly-modal";
import { MetaPixel } from "@/components/meta-pixel";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  ...marketingMetadata(
    '/',
    'ShadowSpark Technologies — Products, Systems & Applied AI',
    ORGANIZATION_DESCRIPTION,
  ),
  keywords: [
    "ShadowSpark Technologies",
    "technology products",
    "product development",
    "applied AI systems",
    "venture building",
    "software engineering",
    "African technology",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <head>
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <CalendlyProvider>
          {/* Organization JSON-LD structured data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: organizationJsonLd() }}
          />
          {/* Skip-to-content link for keyboard and screen-reader users */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-emerald-700 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:outline-none"
          >
            Skip to main content
          </a>
          <RootPageFrame>{children}</RootPageFrame>
          <Toaster theme="dark" position="bottom-right" />
          <ChatWidget />
          <Analytics />
        </CalendlyProvider>
      </body>
    </html>
  );
}
