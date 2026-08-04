import type { RewardCatalogResponse, RewardEventPayload, RewardEventResponse, RewardIssuePayload, RewardIssueResponse } from "./types.js";
export type ShadowSparkClientOptions = {
    baseUrl: string;
    apiKey?: string;
    fetch?: typeof globalThis.fetch;
};
export declare class ShadowSparkClient {
    private readonly baseUrl;
    private readonly apiKey?;
    private readonly fetch;
    constructor(options: ShadowSparkClientOptions);
    private headers;
    getCatalog(): Promise<RewardCatalogResponse>;
    recordEvent(payload: RewardEventPayload): Promise<RewardEventResponse>;
    issueBadge(payload: RewardIssuePayload): Promise<RewardIssueResponse>;
}
