/**
 * Regulatory signal types for high-intent compliance/regulatory queries.
 * These supplement the legacy engagement signals below.
 */
export type RegulatorySignalType =
  | 'cbn_sandbox_inquiry'
  | 'sec_digital_asset_query'
  | 'nitda_data_protection_view'
  | 'nibss_interoperability_check';

/**
 * All supported signal types (legacy + regulatory).
 */
export type SignalType =
  | 'pricing_page_view'
  | 'demo_requested'
  | 'whitepaper_download'
  | 'checkout_initiated'
  | 'email_opened'
  | 'email_link_clicked'
  | RegulatorySignalType;

export function evaluateIntentSignal(metadata: any): number {
  if (!metadata) return 0;
  
  let delta = 0;
  
  // Basic heuristic intent scoring
  const signalType: string = metadata.signalType || metadata.action || metadata.type;
  
  switch (signalType) {
    case 'pricing_page_view':
      delta += 5;
      break;
    case 'demo_requested':
      delta += 20;
      break;
    case 'whitepaper_download':
      delta += 10;
      break;
    case 'checkout_initiated':
      delta += 15;
      break;
    case 'email_opened':
      delta += 2;
      break;
    case 'email_link_clicked':
      delta += 5;
      break;

    // ── Regulatory signals (Phase 1 — Executive Shield) ──────────────────────
    case 'cbn_sandbox_inquiry':
      delta += 40;  // CBN Regulatory Sandbox inquiry = high intent
      break;
    case 'sec_digital_asset_query':
      delta += 50;  // SEC Digital Asset compliance = highest intent
      break;
    case 'nitda_data_protection_view':
      delta += 25;  // NITDA Data Protection
      break;
    case 'nibss_interoperability_check':
      delta += 30;  // NIBSS Payment Infrastructure
      break;

    default:
      // Base engagement for unknown signals
      delta += 1;
  }
  
  // Bonus for deep engagement
  if (metadata.timeSpentSeconds && typeof metadata.timeSpentSeconds === 'number' && metadata.timeSpentSeconds > 60) {
    delta += 2;
  }

  return delta;
}
