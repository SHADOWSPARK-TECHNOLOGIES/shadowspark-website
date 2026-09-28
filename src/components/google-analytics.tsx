import Script from "next/script";

// Inlined at build time: NEXT_PUBLIC_GA_ID must be set when `next build` runs.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}

/** Fire a GA4 event. No-op on the server or when gtag is not loaded. Never pass PII. */
export function gaEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}
