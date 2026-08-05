import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
} from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { organizationJsonLd } from "@/lib/seo";
import ChatWidget from "@/components/ChatWidget";
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
  metadataBase: new URL("https://shadowspark-tech.org"),
  title: "ShadowSpark — AI Operating System for African Fintech",
  description:
    "Automate loan origination, instant KYC verification, and intelligent recovery. The enterprise infrastructure layer for African lenders. NDPA & CBN compliant.",
  keywords: [
    "African fintech",
    "loan automation",
    "KYC verification",
    "WhatsApp banking",
    "NDPA compliance",
    "Nigeria fintech",
    "AI lending",
    "CBN compliance",
    "microfinance",
    "digital lending",
  ],
  openGraph: {
    title: "ShadowSpark — AI Operating System for African Fintech",
    description:
      "Automate loan origination, instant KYC, and intelligent recovery for African lenders.",
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShadowSpark — AI Operating System for African Fintech",
    description:
      "Automate loan origination, instant KYC, and intelligent recovery for African lenders.",
  },
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
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {/* Organization JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationJsonLd() }}
        />
        {/* Skip-to-content link for keyboard and screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:outline-none"
        >
          Skip to main content
        </a>
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Toaster theme="dark" position="bottom-right" />
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}
