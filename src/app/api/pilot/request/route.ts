import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

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

  // MVP: log event via existing rewards infrastructure by mirroring payload.
  // A future version persists to CRM / database.
  return NextResponse.json(
    {
      ok: true,
      message:
        "Pilot request received. The ShadowSpark team will respond within 2 business days.",
      requestId: crypto.randomUUID(),
    },
    { status: 201 },
  );
}
