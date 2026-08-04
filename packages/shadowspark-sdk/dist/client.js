export class ShadowSparkClient {
    baseUrl;
    apiKey;
    fetch;
    constructor(options) {
        this.baseUrl = options.baseUrl.replace(/\/$/, "");
        this.apiKey = options.apiKey;
        this.fetch = options.fetch ?? globalThis.fetch.bind(globalThis);
    }
    headers() {
        const headers = {
            "Content-Type": "application/json",
        };
        if (this.apiKey) {
            headers["Authorization"] = `Bearer ${this.apiKey}`;
        }
        return headers;
    }
    async getCatalog() {
        const response = await this.fetch(`${this.baseUrl}/api/rewards/catalog`, {
            method: "GET",
            headers: this.headers(),
        });
        const body = (await response.json());
        if (!response.ok) {
            throw new Error(`catalog request failed: ${response.status}`);
        }
        return body;
    }
    async recordEvent(payload) {
        const response = await this.fetch(`${this.baseUrl}/api/rewards/events`, {
            method: "POST",
            headers: this.headers(),
            body: JSON.stringify(payload),
        });
        const body = (await response.json());
        if (!response.ok) {
            throw new Error(`event request failed: ${response.status}`);
        }
        return body;
    }
    async issueBadge(payload) {
        const response = await this.fetch(`${this.baseUrl}/api/rewards/issue`, {
            method: "POST",
            headers: this.headers(),
            body: JSON.stringify(payload),
        });
        const body = (await response.json());
        if (!response.ok) {
            throw new Error(`issue request failed: ${response.status}`);
        }
        return body;
    }
}
