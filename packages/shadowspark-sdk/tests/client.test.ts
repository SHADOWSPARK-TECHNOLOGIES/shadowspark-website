import { describe, it, expect, vi } from "vitest";
import { ShadowSparkClient } from "../src/client.js";

function mockFetch(response: Response): typeof fetch {
  return vi.fn().mockResolvedValue(response);
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("ShadowSparkClient", () => {
  it("strips trailing slash from baseUrl", async () => {
    const fetch = mockFetch(jsonResponse({ ok: true, badges: [] }));
    const client = new ShadowSparkClient({
      baseUrl: "https://example.com/",
      fetch,
    });
    await client.getCatalog();
    expect(fetch).toHaveBeenCalledWith(
      "https://example.com/api/rewards/catalog",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("records an event", async () => {
    const fetch = mockFetch(
      jsonResponse({
        ok: true,
        idempotent: false,
        eventId: "evt-1",
        impactScore: 42,
        suggestedBadges: [],
      }),
    );
    const client = new ShadowSparkClient({
      baseUrl: "https://example.com",
      fetch,
    });
    const result = await client.recordEvent({
      eventKey: "pr-1",
      type: "contribution.shipped",
      source: "github",
      actor: { email: "dev@example.com" },
      impact: { severity: "high", production: true, usersAffected: 1000 },
    });
    expect(result.ok).toBe(true);
    expect(result.impactScore).toBe(42);
  });

  it("sends Authorization header when apiKey is provided", async () => {
    const fetch = mockFetch(jsonResponse({ ok: true, badges: [] }));
    const client = new ShadowSparkClient({
      baseUrl: "https://example.com",
      apiKey: "ssk_test_12345",
      fetch,
    });
    await client.getCatalog();
    expect(fetch).toHaveBeenCalledWith(
      "https://example.com/api/rewards/catalog",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer ssk_test_12345",
        }),
      }),
    );
  });

  it("throws on non-ok response", async () => {
    const fetch = mockFetch(jsonResponse({ error: "rate limited" }, 429));
    const client = new ShadowSparkClient({
      baseUrl: "https://example.com",
      fetch,
    });
    await expect(client.getCatalog()).rejects.toThrow("catalog request failed: 429");
  });
});
