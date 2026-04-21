export function assignTier(score: number): 'starter' | 'pro' | 'enterprise' {
  if (score >= 80) return 'enterprise';
  if (score >= 50) return 'pro';
  return 'starter';
}
