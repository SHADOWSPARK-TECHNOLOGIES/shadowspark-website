import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  findMany: vi.fn(),
}));

vi.mock("@/auth", () => ({
  auth: mocks.auth,
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    lead: { findMany: mocks.findMany },
  },
}));

import { GET } from "@/app/api/operator/whatsapp-enquiries/route";

describe("GET /api/operator/whatsapp-enquiries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects anonymous requests before reading leads", async () => {
    mocks.auth.mockResolvedValue(null);
    const response = await GET();
    expect(response.status).toBe(401);
    expect(mocks.findMany).not.toHaveBeenCalled();
    expect(response.headers.get("access-control-allow-origin")).toBeNull();
  });

  it("rejects a signed-in user who is not an admin", async () => {
    mocks.auth.mockResolvedValue({ user: { id: "user-1", role: "user" } });
    const response = await GET();
    expect(response.status).toBe(401);
    expect(mocks.findMany).not.toHaveBeenCalled();
  });

  it("returns WhatsApp enquiries to an admin and does not open a public lead API", async () => {
    mocks.auth.mockResolvedValue({ user: { id: "admin-1", role: "admin" } });
    mocks.findMany.mockResolvedValue([
      {
        id: "lead-1",
        phoneNumber: "+2348012345678",
        lastMessage: "Need a pilot",
        status: "NEW",
        createdAt: new Date("2026-10-03T00:00:00.000Z"),
        updatedAt: new Date("2026-10-03T01:00:00.000Z"),
      },
    ]);

    const response = await GET();
    expect(response.status).toBe(200);
    expect(response.headers.get("access-control-allow-origin")).toBeNull();
    expect(mocks.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { intent: "whatsapp" },
        orderBy: { updatedAt: "desc" },
      }),
    );
    expect(await response.json()).toEqual({
      enquiries: [
        {
          id: "lead-1",
          phoneNumber: "+2348012345678",
          lastMessage: "Need a pilot",
          status: "NEW",
          createdAt: "2026-10-03T00:00:00.000Z",
          updatedAt: "2026-10-03T01:00:00.000Z",
        },
      ],
    });
  });
});
