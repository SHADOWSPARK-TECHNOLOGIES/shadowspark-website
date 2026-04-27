/**
 * Firecrawl Semantic Bridge
 *
 * Parses lead intents against regulatory keyword clusters derived from
 * the Firecrawl knowledge base to produce proportional scoring bonuses.
 *
 * Phase 2 — Executive Shield
 */

// ── Data structure for regulatory keyword clusters ─────────────────────────

interface RegulatoryCluster {
  keywords: string[];
  signalType:
    | 'cbn_sandbox_inquiry'
    | 'sec_digital_asset_query'
    | 'nitda_data_protection_view'
    | 'nibss_interoperability_check';
  baseBonus: number;
}

const REGULATORY_SIGNALS: Record<string, RegulatoryCluster> = {
  cbn: {
    keywords: [
      'cbn',
      'central bank',
      'regulatory sandbox',
      'open banking',
      'payment service bank',
      'psb license',
      'digital banking',
      'digital lending',
      'cybersecurity',
      'contactless payments',
      'forex liberalization',
      'nigerian banking',
    ],
    signalType: 'cbn_sandbox_inquiry',
    baseBonus: 40,
  },
  sec: {
    keywords: [
      'sec',
      'securities exchange',
      'digital asset',
      'crypto license',
      'arip',
      'investment platform',
      'tokenized',
      'blockchain compliance',
    ],
    signalType: 'sec_digital_asset_query',
    baseBonus: 50,
  },
  nitda: {
    keywords: [
      'nitda',
      'data protection',
      'data privacy',
      'ndpr',
      'nigerian data protection',
      'compliance officer',
      'data audit',
    ],
    signalType: 'nitda_data_protection_view',
    baseBonus: 25,
  },
  nibss: {
    keywords: [
      'nibss',
      'nip',
      'interoperability',
      'payment infrastructure',
      'bank verification',
      'bvn',
      'transaction switching',
    ],
    signalType: 'nibss_interoperability_check',
    baseBonus: 30,
  },
};

// ── Exported functions ─────────────────────────────────────────────────────

export interface RegulatorySignalResult {
  signalType: string;
  confidence: number;
  bonus: number;
}

/**
 * Tokenizes the intent text and checks keyword overlap against each
 * regulatory cluster.
 *
 * @param intent  The raw intent / query text from a lead
 * @returns The matched signal (with confidence & bonus) or null
 */
export function detectRegulatorySignal(
  intent: string,
): RegulatorySignalResult | null {
  if (!intent || typeof intent !== 'string') return null;

  const tokens = intent.toLowerCase().split(/\s+/);

  for (const cluster of Object.values(REGULATORY_SIGNALS)) {
    let matchedCount = 0;

    for (const keyword of cluster.keywords) {
      // Multi-word keywords require phrase matching on the full intent text
      if (keyword.includes(' ')) {
        if (intent.toLowerCase().includes(keyword)) {
          matchedCount++;
        }
      } else {
        // Single-word keywords: check token-level match
        if (tokens.includes(keyword)) {
          matchedCount++;
        }
      }
    }

    if (matchedCount > 0) {
      const confidence = matchedCount / cluster.keywords.length;
      const bonus = Math.round(cluster.baseBonus * confidence);

      return {
        signalType: cluster.signalType,
        confidence,
        bonus,
      };
    }
  }

  return null;
}

/**
 * Evaluates the regulatory impact of an intent on a base score.
 * Calls `detectRegulatorySignal()` and adds the bonus, capping at 100.
 *
 * Math Engine:
 *   Score_final = Score_base + (Confidence_RRF × 30)
 *
 * @param intent     The raw intent / query text
 * @param baseScore  The current score before regulatory bonus
 * @returns          Modified score capped at 100
 */
export function evaluateRegulatoryImpact(
  intent: string,
  baseScore: number,
): number {
  const signal = detectRegulatorySignal(intent);

  if (!signal) return baseScore;

  // Apply the RRF (Reciprocal Rank Fusion) style formula
  const scoreFinal = baseScore + Math.round(signal.confidence * 30);

  return Math.min(100, scoreFinal);
}

/**
 * Returns the regulatory signal type string (e.g. `'cbn_sandbox_inquiry'`)
 * for a given intent, or null if no regulatory match is found.
 *
 * @param intent  The raw intent / query text
 * @returns       The signal type string or null
 */
export function getRegulatorySignalType(intent: string): string | null {
  const signal = detectRegulatorySignal(intent);
  return signal ? signal.signalType : null;
}
