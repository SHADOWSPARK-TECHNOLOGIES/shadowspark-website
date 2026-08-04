import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";

const requestSchema = z.object({
  name: z.string().min(2, "Name is too short").max(120),
  email: z.email("Invalid email address"),
  organization: z.string().min(2).max(160).optional(),
  productInterest: z.string().max(80).optional(),
  message: z.string().max(2000).optional(),
});

export type PilotRequestBody = z.infer<typeof requestSchema>;

export async function POST(request: Request) {
  const rate = await rateLimit(request, "pilot:request", 5, "1 h");
  if (!rate.success) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please try again later." },
      { status: 429, headers: rate.headers },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const requestId = crypto.randomUUID();

  try {
    await prisma.systemEvent.create({
      data: {
        type: "pilot_request",
        digest: `pilot:request:${requestId}`,
        message: `Pilot request from ${parsed.data.name} at ${parsed.data.organization ?? "(no org)"}`,
        metadata: {
          ...parsed.data,
          requestId,
          receivedAt: new Date().toISOString(),
        },
      },
    });
  } catch (error) {
    console.error("[api][pilot][request] persistence failed:", error);
    return NextResponse.json(
      { error: "Unable to store pilot request. Please try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      message:
        "Pilot request received. The ShadowSpark team will respond within 2 business days.",
      requestId,
    },
    { status: 201 },
  );
}
