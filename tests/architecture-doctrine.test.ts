import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import sitemap from '@/app/sitemap';
import { metadata } from '@/app/architecture/page';
import { ArchitectureDiagram } from '@/components/architecture/ArchitectureDiagram';
import { ArchitectureHero } from '@/components/architecture/ArchitectureHero';
import { RealityFlow } from '@/components/architecture/RealityFlow';
import { TrustLayer } from '@/components/architecture/TrustLayer';
import {
  architectureLayers,
  operationalSteps,
  trustPlane,
} from '@/components/architecture/architecture-model';
import { Footer } from '@/components/sections/Footer';
import {
  organizationJsonLd,
  organizationStructuredData,
  SITE_URL,
} from '@/lib/seo';

function render(component: Parameters<typeof createElement>[0]): string {
  return renderToStaticMarkup(createElement(component));
}

async function source(relativePath: string): Promise<string> {
  return readFile(path.join(process.cwd(), relativePath), 'utf8');
}

const structuralLabels = [
  'Experience & Interface',
  'Application & Workflow',
  'Applied AI & Context',
  'Platform Integrations',
  'Data & Infrastructure',
] as const;

const expectedOperationalSteps = [
  'Receive',
  'Ground',
  'Propose',
  'Authorize',
  'Act & Record',
] as const;

describe('public architecture doctrine', () => {
  it('uses the route metadata that defines the approved corporate search intent', () => {
    expect(metadata).toMatchObject({
      title: { absolute: 'Product & Applied-AI Architecture | ShadowSpark' },
      description: expect.stringContaining('company-wide'),
      alternates: { canonical: `${SITE_URL}/architecture` },
      openGraph: {
        title: 'Product & Applied-AI Architecture | ShadowSpark',
        url: `${SITE_URL}/architecture`,
      },
    });
    expect(metadata.keywords).toEqual(
      expect.arrayContaining([
        'product architecture',
        'applied AI architecture',
        'technology company architecture',
      ]),
    );
  });

  it('describes the parent organization as a product and technology company', () => {
    const organization = organizationStructuredData();

    expect(organization.description).toContain('product and technology company');
    expect(organization.description).toContain('experimental technology');
    expect(organization.description).not.toContain('fintech workflow infrastructure');
  });

  it('renders Model B as structure and keeps the operational flow separate', () => {
    const structure = `${render(ArchitectureDiagram)}${render(TrustLayer)}`;
    const flow = render(RealityFlow);

    expect(architectureLayers.map((layer) => layer.label)).toEqual(structuralLabels);
    expect(trustPlane.label).toBe(
      'Trust Plane — Security, Governance & Reliability',
    );
    expect(operationalSteps.map((step) => step.title)).toEqual(
      expectedOperationalSteps,
    );
    expect(structure).toContain('data-model-kind="structure"');
    expect(flow).toContain('data-model-kind="behavior"');
    expect(structure).toContain('Five structural layers. One cross-cutting trust plane.');
    expect(flow).toContain('This is behavioral order, not another layer model.');
    expect(structure).not.toContain('Receive intent');
    expect(structure).not.toContain('Assemble context');
  });

  it('renders evidence qualifications beside the structural claims', () => {
    const structure = render(ArchitectureDiagram);

    expect(structure.match(/Implemented in repository/g)?.length).toBe(5);
    expect(structure).toContain('Deployment verification required');
    expect(structure).toContain('source-code presence does not establish production configuration');
  });

  it('keeps informative architecture and footer text on AA-capable tokens', () => {
    const publicMarkup = [
      render(ArchitectureHero),
      render(ArchitectureDiagram),
      render(RealityFlow),
      render(TrustLayer),
      render(Footer),
    ].join('\n');

    expect(publicMarkup).not.toMatch(/text-slate-(500|600)/);
  });

  it('keeps the focused skip link off the known non-AA color pairing', async () => {
    const layout = await source('src/app/layout.tsx');

    // This guards the measured 3.77:1 regression; it does not replace computed
    // contrast or browser-level accessibility review.
    expect(layout).not.toContain('focus:bg-emerald-600');
    expect(layout).toContain('focus:bg-emerald-700');
  });

  it('publishes architecture through the verified canonical sitemap', () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain(`${SITE_URL}/architecture`);
  });

  it('assigns explicit authority to current, public, deployment, and historical docs', async () => {
    const [doctrine, inventory, deployments, historical] = await Promise.all([
      source('docs/architecture/SHADOWSPARK_APPLIED_AI.md'),
      source('docs/ARCHITECTURE.md'),
      source('docs/deployments/README.md'),
      source('docs/architecture/SOVEREIGN_STACK.md'),
    ]);

    expect(doctrine).toContain('PUBLIC ARCHITECTURE DOCTRINE');
    expect(inventory).toContain('INTERNAL CURRENT-STATE INVENTORY');
    expect(deployments).toContain('DEPLOYMENT-SPECIFIC EVIDENCE');
    expect(historical).toContain('HISTORICAL / STALE');
    expect(inventory).not.toContain('16.2.0-canary.98');
    expect(inventory).not.toContain('There is no `pgvector`');
    expect(inventory).toContain('gemini-embedding-001');
    expect(inventory).toContain('text-embedding-004');
  });

  it('retains the established commercial-flow component for later governance', async () => {
    const establishedComponent = await source(
      'src/components/SystemArchitecture.tsx',
    );

    expect(establishedComponent).toContain(
      'export default function SystemArchitecture()',
    );
  });

  it('keeps the prohibited-claim check as a smoke test, not a truth proof', () => {
    const publicMarkup = [
      render(ArchitectureHero),
      render(ArchitectureDiagram),
      render(RealityFlow),
      render(TrustLayer),
      render(Footer),
      organizationJsonLd(),
    ]
      .join('\n')
      .toLowerCase();
    const prohibitedClaims = [
      'zero leakage',
      'enterprise-grade security',
      'fully autonomous',
      '24/7/365',
      'zero-downtime',
      'vercel pro',
      'aws/gcp',
      'lodgist',
    ];

    for (const claim of prohibitedClaims) {
      expect(publicMarkup).not.toContain(claim);
    }
  });
});
