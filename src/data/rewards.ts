export type RewardBadgeTier = "bronze" | "silver" | "gold";

export type RewardBadgeGrant =
  | "recognition"
  | "priority-access"
  | "pilot-fastlane";

export type RewardBadge = {
  id: string;
  name: string;
  description: string;
  tier: RewardBadgeTier;
  minScore: number;
  grant: RewardBadgeGrant;
};

export type RewardContributionType =
  | "contribution.merged"
  | "contribution.shipped"
  | "incident.fixed"
  | "security.hardened"
  | "pilot.closed";

export type RewardContributionPayload = {
  eventKey: string;
  type: RewardContributionType;
  source: "github" | "vercel" | "internal";
  actor: {
    id?: string;
    email?: string;
    name?: string;
  };
  impact: {
    severity: "low" | "medium" | "high" | "critical";
    usersAffected?: number;
    production?: boolean;
  };
  metadata?: Record<string, unknown>;
};

const severityWeight: Record<
  RewardContributionPayload["impact"]["severity"],
  number
> = {
  low: 5,
  medium: 12,
  high: 24,
  critical: 40,
};

const typeWeight: Record<RewardContributionType, number> = {
  "contribution.merged": 8,
  "contribution.shipped": 14,
  "incident.fixed": 18,
  "security.hardened": 20,
  "pilot.closed": 24,
};

export const rewardBadges: RewardBadge[] = [
  {
    id: "builder-bronze",
    name: "Builder Bronze",
    description: "Consistent delivery on meaningful product milestones.",
    tier: "bronze",
    minScore: 30,
    grant: "recognition",
  },
  {
    id: "trust-silver",
    name: "Trust Silver",
    description: "High-impact reliability or security contributions.",
    tier: "silver",
    minScore: 70,
    grant: "priority-access",
  },
  {
    id: "flagship-gold",
    name: "Flagship Gold",
    description: "Exceptional contribution with production-level impact.",
    tier: "gold",
    minScore: 120,
    grant: "pilot-fastlane",
  },
];

export function computeImpactScore(payload: RewardContributionPayload): number {
  const base = typeWeight[payload.type] + severityWeight[payload.impact.severity];
  const productionBoost = payload.impact.production ? 10 : 0;
  const userScaleBoost = Math.min(20, Math.floor((payload.impact.usersAffected ?? 0) / 500));
  return base + productionBoost + userScaleBoost;
}

export function resolveBadges(totalScore: number): RewardBadge[] {
  return rewardBadges.filter((badge) => totalScore >= badge.minScore);
}

export function findBadgeById(badgeId: string): RewardBadge | undefined {
  return rewardBadges.find((badge) => badge.id === badgeId);
}
