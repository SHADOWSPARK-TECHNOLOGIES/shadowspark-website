import type { ReactNode } from 'react';

import { Footer } from '@/components/sections/Footer';
import { Navigation } from '@/components/sections/Navigation';

/**
 * Gives corporate pages top-level banner, main, and contentinfo landmarks.
 *
 * The main landmark deliberately excludes shared navigation and footer content so
 * the global skip link reaches the page-specific reading experience.
 */
export function CorporatePageLandmarks({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
