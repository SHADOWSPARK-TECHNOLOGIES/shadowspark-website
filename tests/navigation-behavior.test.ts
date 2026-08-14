import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import {
  CorporatePageLandmarks,
} from '@/components/CorporatePageLandmarks';
import { Navigation } from '@/components/sections/Navigation';
import {
  handleNavigationEscape,
  navigationLinks,
  nextNavigationMenuState,
  navigationModeForWidth,
  usesCorporatePageLandmarks,
} from '@/lib/navigation';

describe('corporate navigation behavior', () => {
  it('uses stable home-qualified destinations from every shared route', () => {
    const origins = ['/', '/architecture', '/demo'];
    const homeSectionLinks = navigationLinks.filter((link) =>
      link.href.startsWith('/#'),
    );

    expect(homeSectionLinks.length).toBeGreaterThan(0);
    for (const origin of origins) {
      for (const link of homeSectionLinks) {
        const destination = new URL(
          link.href,
          `https://www.shadowspark-tech.org${origin}`,
        );
        expect(destination.pathname).toBe('/');
        expect(destination.hash).not.toBe('');
      }
    }
  });

  it('models mobile open, toggle, link-close, and Escape transitions', () => {
    expect(nextNavigationMenuState(false, 'toggle')).toBe(true);
    expect(nextNavigationMenuState(true, 'toggle')).toBe(false);
    expect(nextNavigationMenuState(true, 'close')).toBe(false);

    const close = vi.fn();
    const focus = vi.fn();
    const trigger = { focus };

    expect(handleNavigationEscape('Enter', close, trigger)).toBe(false);
    expect(close).not.toHaveBeenCalled();
    expect(focus).not.toHaveBeenCalled();

    expect(handleNavigationEscape('Escape', close, trigger)).toBe(true);
    expect(close).toHaveBeenCalledOnce();
    expect(focus).toHaveBeenCalledOnce();
  });

  it('locks the navigation mode around the Tailwind lg breakpoint', () => {
    expect(navigationModeForWidth(1023)).toBe('mobile');
    expect(navigationModeForWidth(1024)).toBe('desktop');
  });

  it('renders closed mobile controls and corporate destinations', () => {
    const markup = renderToStaticMarkup(createElement(Navigation));

    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain('aria-controls="primary-mobile-navigation"');
    for (const link of navigationLinks) {
      expect(markup).toContain(`href="${link.href}"`);
    }
  });

  it('owns top-level architecture landmarks without changing other routes', () => {
    expect(usesCorporatePageLandmarks('/architecture')).toBe(true);
    expect(usesCorporatePageLandmarks('/demo')).toBe(false);

    const markup = renderToStaticMarkup(
      createElement(
        CorporatePageLandmarks,
        null,
        createElement('section', { id: 'architecture-test-content' }),
      ),
    );

    expect(markup.indexOf('<header')).toBeLessThan(markup.indexOf('<main'));
    expect(markup.indexOf('<main')).toBeLessThan(markup.indexOf('<footer'));
    expect(markup).toContain('<main id="main-content"');
  });
});
