import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { describe, expect, it } from 'vitest';

import { LODGIST_URL, LodgistCta } from '@/components/lodgist-cta';
import { Footer } from '@/components/sections/Footer';
import { Navigation } from '@/components/sections/Navigation';

const repositoryRoot = process.cwd();

describe('Lodgist deep-link CTA', () => {
  it('uses the absolute Lodgist URL and the existing click-event pattern', () => {
    expect(LODGIST_URL).toBe('https://lodgist.online');

    const markup = renderToStaticMarkup(
      createElement(LodgistCta, { location: 'home_hero' }),
    );

    expect(markup).toContain('href="https://lodgist.online"');
    expect(markup).not.toContain('https://lodgist.online/');
    expect(markup).toContain('data-event="lodgist_cta_click"');
    expect(markup).toContain('data-analytics="lodgist-cta-home_hero"');
    expect(markup).toContain('target="_blank"');
    expect(markup).toContain('rel="noopener noreferrer"');
    expect(markup).toContain('Open Lodgist');
    expect(markup).not.toContain('<iframe');
  });

  it('is present in primary navigation and the corporate footer', () => {
    const navigation = renderToStaticMarkup(createElement(Navigation));
    const footer = renderToStaticMarkup(createElement(Footer));

    expect(navigation).toContain('href="https://lodgist.online"');
    expect(navigation).toContain('data-analytics="lodgist-cta-primary_nav"');
    expect(footer).toContain('href="https://lodgist.online"');
    expect(footer).toContain('data-analytics="lodgist-cta-footer"');
  });

  it('sits with the marketing homepage hero actions', async () => {
    const [home, hero] = await Promise.all([
      readFile(path.join(repositoryRoot, 'src/app/page.tsx'), 'utf8'),
      readFile(path.join(repositoryRoot, 'src/components/sections/EnterpriseHero.tsx'), 'utf8'),
    ]);

    expect(home).toContain('<EnterpriseHero />');
    expect(hero).toContain('<LodgistCta location="home_hero" />');
    expect(hero).toContain('Book a Demo');
  });
});
