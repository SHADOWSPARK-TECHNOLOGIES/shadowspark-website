export const NEEDS_REVIEW_STATUS = "NEEDS_REVIEW";
export const QUALIFIED_STATUS = "QUALIFIED";

export function qualifyLead(lead: { leadScore?: number | null; intent?: string | null }) {
  if (!lead) return false;
  if (lead.leadScore == null) return false;
  return lead.leadScore >= 50 && lead.intent !== "junk" && lead.intent !== "unknown";
}

export type IntentAnalysis =
  | { ok: true; score: number; reasoning: string }
  | { ok: false; reasoning: string };

export function statusFromIntentAnalysis(
  analysis: IntentAnalysis,
  intent?: string | null,
): { status: typeof QUALIFIED_STATUS | typeof NEEDS_REVIEW_STATUS; leadScore: number | null } {
  if (!analysis.ok) {
    return { status: NEEDS_REVIEW_STATUS, leadScore: null };
  }
  const qualified = qualifyLead({ leadScore: analysis.score, intent });
  return {
    status: qualified ? QUALIFIED_STATUS : NEEDS_REVIEW_STATUS,
    leadScore: analysis.score,
  };
}
