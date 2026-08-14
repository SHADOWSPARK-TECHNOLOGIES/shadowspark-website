/** Evidence labels permitted beside public architecture claims. */
export const architectureEvidenceLabels = [
  'Implemented in repository',
  'Reference pattern',
  'Deployment verification required',
] as const;

/** Evidence category attached to a public architecture statement. */
export type ArchitectureEvidence =
  (typeof architectureEvidenceLabels)[number];

/** Stable identifier for a structural layer in the public architecture. */
export type ArchitectureLayerId =
  | 'experience-interface'
  | 'application-workflow'
  | 'applied-ai-context'
  | 'platform-integrations'
  | 'data-infrastructure';

/** Content contract for one company-wide structural architecture layer. */
export interface ArchitectureLayerDefinition {
  id: ArchitectureLayerId;
  index: string;
  label: string;
  title: string;
  description: string;
  details: readonly string[];
  evidence: ArchitectureEvidence;
}

/**
 * Public structural model approved for ShadowSpark product architecture.
 *
 * These layers describe responsibility ownership, not runtime sequence. Keeping
 * that invariant in data prevents control flow from silently becoming taxonomy.
 */
export const architectureLayers = [
  {
    id: 'experience-interface',
    index: '01',
    label: 'Experience & Interface',
    title: 'Product encounter',
    description:
      'Interfaces and route boundaries shape how people and systems enter a product.',
    details: [
      'Next.js App Router surfaces',
      'Typed UI and route code',
      'Explicit input boundaries',
    ],
    evidence: 'Implemented in repository',
  },
  {
    id: 'application-workflow',
    index: '02',
    label: 'Application & Workflow',
    title: 'Product behavior',
    description:
      'Application rules and queued workflows coordinate what the product may do.',
    details: [
      'Route and service logic',
      'Deterministic workflow rules',
      'Queue and worker code',
    ],
    evidence: 'Implemented in repository',
  },
  {
    id: 'applied-ai-context',
    index: '03',
    label: 'Applied AI & Context',
    title: 'Grounded intelligence',
    description:
      'Selected product paths can retrieve context and prepare model-assisted proposals.',
    details: [
      'Retrieval and embedding paths',
      'Model-client boundaries',
      'No implied operational authority',
    ],
    evidence: 'Implemented in repository',
  },
  {
    id: 'platform-integrations',
    index: '04',
    label: 'Platform Integrations',
    title: 'External capabilities',
    description:
      'Provider boundaries connect products to services without making those services the product core.',
    details: [
      'Payment and crawling clients',
      'Messaging and calendar code',
      'Explicit provider boundaries',
    ],
    evidence: 'Implemented in repository',
  },
  {
    id: 'data-infrastructure',
    index: '05',
    label: 'Data & Infrastructure',
    title: 'Durable foundations',
    description:
      'Schemas, storage, queues, and deployment configuration support product state and delivery.',
    details: [
      'Prisma and PostgreSQL schemas',
      'Redis and BullMQ code',
      'File and cloud-storage paths',
    ],
    evidence: 'Implemented in repository',
  },
] as const satisfies readonly ArchitectureLayerDefinition[];

/** Cross-cutting concerns that apply to every structural layer. */
export const trustPlane = {
  label: 'Trust Plane — Security, Governance & Reliability',
  description:
    'Identity, authorization, evidence, failure handling, and operating controls must cross every layer; their deployment state requires separate verification.',
  concerns: [
    'Security and access decisions',
    'Governance and accountable authority',
    'Reliability and graceful degradation',
    'Operational evidence and review',
  ],
  evidence: 'Deployment verification required',
} as const satisfies {
  label: string;
  description: string;
  concerns: readonly string[];
  evidence: ArchitectureEvidence;
};

/** Stable identifier for one step in the operational reality flow. */
export type OperationalStepId =
  | 'receive'
  | 'ground'
  | 'propose'
  | 'authorize'
  | 'act-record';

/** Content contract for one behavioral step, distinct from structural layers. */
export interface OperationalStepDefinition {
  id: OperationalStepId;
  number: string;
  title: string;
  description: string;
}

/** Runtime behavior model retained beneath the structural architecture. */
export const operationalSteps = [
  {
    id: 'receive',
    number: '01',
    title: 'Receive',
    description:
      'Capture the request and the identity, channel, and policy context available to it.',
  },
  {
    id: 'ground',
    number: '02',
    title: 'Ground',
    description:
      'Retrieve relevant material and preserve where that context came from.',
  },
  {
    id: 'propose',
    number: '03',
    title: 'Propose',
    description:
      'Combine model output with deterministic rules without granting the model authority.',
  },
  {
    id: 'authorize',
    number: '04',
    title: 'Authorize',
    description:
      'Apply validation, access, policy, and human-review requirements before action.',
  },
  {
    id: 'act-record',
    number: '05',
    title: 'Act & Record',
    description:
      'Perform only the approved operation and leave evidence for inspection and learning.',
  },
] as const satisfies readonly OperationalStepDefinition[];

/** Route metadata content kept adjacent to the approved public model. */
export const architectureMetadataContent = {
  pathname: '/architecture',
  title: 'Product & Applied-AI Architecture',
  description:
    'A company-wide view of how ShadowSpark structures product interfaces, workflows, applied AI, integrations, data, and cross-cutting trust.',
  keywords: [
    'ShadowSpark Technologies',
    'product architecture',
    'applied AI architecture',
    'technology company architecture',
    'AI system trust boundaries',
  ],
} as const;
