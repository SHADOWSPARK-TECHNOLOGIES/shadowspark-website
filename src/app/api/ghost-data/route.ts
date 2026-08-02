import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "edge";

const delay = (milliseconds: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });

export async function GET(request: Request) {
  await delay(1_500);

  const { success, headers } = await rateLimit(request, "ghost-data", 2, "1 m");
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429, headers });
  }

  return NextResponse.json(
    {
      catalog: [
        {
          id: "arc-91f",
          title: "Asterion Systems Inventory",
          availability: "pending-verification",
        },
      ],
      generatedAt: new Date().toISOString(),
    },
    {
      headers: {
        ...headers,
        "Cache-Control": "no-store",
      },
    },
  );
}
