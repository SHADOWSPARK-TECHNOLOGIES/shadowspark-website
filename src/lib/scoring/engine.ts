export function evaluateIntentSignal(metadata: any): number {
  if (!metadata) return 0;
  
  let delta = 0;
  
  // Basic heuristic intent scoring
  const signalType = metadata.signalType || metadata.action || metadata.type;
  
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
