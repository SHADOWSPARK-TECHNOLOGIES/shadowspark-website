import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

const recordPath = 'docs/deployments/PRODUCTION_2026-08-22.md';

async function source(relativePath: string): Promise<string> {
  return readFile(path.join(process.cwd(), relativePath), 'utf8');
}

describe('named production environment evidence', () => {
  it('indexes the dated production record from the deployment evidence authority', async () => {
    const index = await source('docs/deployments/README.md');

    expect(index).toContain('PRODUCTION_2026-08-22.md');
    expect(index).not.toContain(
      'No deployment record in this directory currently verifies a production topology.',
    );
  });

  it('records the verified domain, project, deployment, and source revision', async () => {
    const record = await source(recordPath);

    expect(record).toContain('https://www.shadowspark-tech.org');
    expect(record).toContain('shadow-team-e059c792');
    expect(record).toContain('shadowspark-website-lsny');
    expect(record).toContain('dpl_HiMKjsc11PESTd3qMcrszmKrQUE4');
    expect(record).toContain('62051ad660663d91e0c9b6db2af25582383ec8cf');
  });

  it('classifies every issue 11 topology boundary and its limitations', async () => {
    const record = await source(recordPath);

    for (const requiredSection of [
      'Canonical and redirect verification',
      'Routes and feature boundaries',
      'Runtime services and ownership',
      'Worker and queue activation',
      'Production AI and provider topology',
      'Health, logging, retention, backup, and recovery',
      'Verification method',
      'Limitations and required follow-up',
    ]) {
      expect(record).toContain(requiredSection);
    }

    expect(record).toContain('VERIFIED');
    expect(record).toContain('INFERRED');
    expect(record).toContain('UNKNOWN');
  });

  it('contains secret names and boundaries only, never credential-shaped values', async () => {
    const record = await source(recordPath);

    expect(record).not.toMatch(/(?:sk_(?:live|test|ant)|pk_(?:live|test)|AIza|fc_|re_)[A-Za-z0-9_-]{8,}/);
    expect(record).not.toMatch(/postgres(?:ql)?:\/\/[^\s*]+/i);
    expect(record).not.toMatch(/rediss?:\/\/[^\s*]+/i);
    expect(record).not.toMatch(/Bearer\s+[A-Za-z0-9._~-]{8,}/i);
  });
});
