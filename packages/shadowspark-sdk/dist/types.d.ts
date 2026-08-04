export type RewardBadgeTier = "bronze" | "silver" | "gold";
export type RewardBadgeGrant = "recognition" | "priority-access" | "pilot-fastlane";
export type RewardBadge = {
    id: string;
    name: string;
    description: string;
    tier: RewardBadgeTier;
    minScore: number;
    grant: RewardBadgeGrant;
};
export type RewardContributionType = "contribution.merged" | "contribution.shipped" | "incident.fixed" | "security.hardened" | "pilot.closed";
export type RewardEventPayload = {
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
export type RewardIssuePayload = {
    idempotencyKey: string;
    badgeId: string;
    reason: string;
    grantedBy: string;
    recipient: {
        id?: string;
        email?: string;
        name?: string;
    };
};
export type RewardEventResponse = {
    ok: boolean;
    idempotent: boolean;
    eventId: string;
    impactScore: number;
    suggestedBadges: RewardBadge[];
};
export type RewardIssueResponse = {
    ok: boolean;
    idempotent: boolean;
    issueId: string;
    badge: RewardBadge;
    reason: string;
    grantedBy: string;
    recipient: RewardIssuePayload["recipient"];
};
export type RewardCatalogResponse = {
    ok: boolean;
    badges: RewardBadge[];
};
export type { ShadowSparkClientOptions } from "./client.js";
