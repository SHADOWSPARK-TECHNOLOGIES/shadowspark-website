import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { marketingMetadata, SITE_URL } from '@/lib/seo';

const repositoryRoot = process.cwd();

async function source(relativePath: string): Promise<string> {
  return readFile(path.join(repositoryRoot, relativePath), 'utf8');
}

describe('marketing doctrine', () => {
  it('uses the verified deployed URL for canonical and social metadata', () => {
    const metadata = marketingMetadata(
      '/pricing',
      'Pricing',
      'Pilot pricing and configuration options.',
    );

    expect(SITE_URL).toBe('https://www.shadowspark-tech.org');
    expect(metadata.metadataBase?.toString()).toBe(`${SITE_URL}/`);
    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/pricing`);
    expect(metadata.openGraph).toMatchObject({
      title: 'Pricing | ShadowSpark',
      url: `${SITE_URL}/pricing`,
    });
    expect(metadata.twitter).toMatchObject({
      card: 'summary_large_image',
      title: 'Pricing | ShadowSpark',
    });
  });

  it('routes every Sign In link to the dashboard login', async () => {
    const registerPage = await source('src/app/(auth)/register/page.tsx');

    expect(registerPage).toContain(
      "href='https://shadowspark-dashboard.vercel.app/login'",
    );
    expect(registerPage).not.toContain('href="/login"');
  });

  it('marks the public contact submit action for analytics', async () => {
    const contactSection = await source('src/components/sections/CTA.tsx');

    expect(contactSection).toContain("type='submit'");
    expect(contactSection).toContain("data-analytics='contact-submit'");
  });

  it('removes known unsupported customer and pricing claims from audited routes', async () => {
    const auditedFiles = await Promise.all(
      [
        'src/app/(marketing)/about/page.tsx',
        'src/app/(marketing)/pricing/page.tsx',
        'src/components/sections/About.tsx',
        'src/components/sections/CaseStudy.tsx',
        'src/components/sections/FinalCTA.tsx',
        'src/components/sections/Pricing.tsx',
        'src/components/sections/SovereignDashboardPreview.tsx',
      ].map(source),
    );
    const auditedText = auditedFiles.join('\n');

    expect(auditedText).not.toContain('Join Nigerian lenders already using ShadowSpark');
    expect(auditedText).not.toContain('platform powers loan origination');
    expect(auditedText).not.toContain('MOST POPULAR');
    expect(auditedText).not.toContain('Live view · Lagos Mainnet');
    expect(auditedText).toContain('Pilot program');
    expect(auditedText).toContain('Example');
  });
});
