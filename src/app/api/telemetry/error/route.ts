import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const payload =
      body && typeof body === "object"
        ? body as {
            message?: unknown;
            digest?: unknown;
            metadata?: { url?: unknown };
          }
        : {};

    await prisma.systemEvent.create({
      data: {
        type: "error",
        message:
          typeof payload.message === "string" ? payload.message.slice(0, 500) : "Unknown error",
        digest: typeof payload.digest === "string" ? payload.digest.slice(0, 200) : null,
        metadata: {
          url: typeof payload.metadata?.url === "string" ? payload.metadata.url.slice(0, 2_000) : null,
        },
      },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
