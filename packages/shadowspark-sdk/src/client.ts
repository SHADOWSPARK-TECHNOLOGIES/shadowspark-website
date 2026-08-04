import type {
  RewardCatalogResponse,
  RewardEventPayload,
  RewardEventResponse,
  RewardIssuePayload,
  RewardIssueResponse,
} from "./types.js";

export type ShadowSparkClientOptions = {
  baseUrl: string;
  apiKey?: string;
  fetch?: typeof globalThis.fetch;
};

export class ShadowSparkClient {
  private readonly baseUrl: string;
  private readonly apiKey?: string;
  private readonly fetch: typeof globalThis.fetch;

  constructor(options: ShadowSparkClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
    this.apiKey = options.apiKey;
    this.fetch = options.fetch ?? globalThis.fetch.bind(globalThis);
  }

  private headers(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (this.apiKey) {
      headers["Authorization"] = `Bearer ${this.apiKey}`;
    }
    return headers;
  }

  async getCatalog(): Promise<RewardCatalogResponse> {
    const response = await this.fetch(`${this.baseUrl}/api/rewards/catalog`, {
      method: "GET",
      headers: this.headers(),
    });

    const body = (await response.json()) as RewardCatalogResponse;
    if (!response.ok) {
      throw new Error(`catalog request failed: ${response.status}`);
    }
    return body;
  }

  async recordEvent(payload: RewardEventPayload): Promise<RewardEventResponse> {
    const response = await this.fetch(`${this.baseUrl}/api/rewards/events`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(payload),
    });

    const body = (await response.json()) as RewardEventResponse;
    if (!response.ok) {
      throw new Error(`event request failed: ${response.status}`);
    }
    return body;
  }

  async issueBadge(payload: RewardIssuePayload): Promise<RewardIssueResponse> {
    const response = await this.fetch(`${this.baseUrl}/api/rewards/issue`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(payload),
    });

    const body = (await response.json()) as RewardIssueResponse;
    if (!response.ok) {
      throw new Error(`issue request failed: ${response.status}`);
    }
    return body;
  }
}
