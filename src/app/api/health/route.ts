import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
const THRESHOLD = 0.6;

export async function GET() {
  try {
    const result = await prisma.$queryRaw<Array<{ count: number | bigint }>>`
      SELECT COUNT(*) AS count
      FROM "KnowledgeEmbedding"
    `;

    const rawCount = result[0]?.count ?? 0;
    const vectorCount = typeof rawCount === "bigint" ? Number(rawCount) : Number(rawCount);

    return NextResponse.json({
      status: "ok",
      vectorCount,
      threshold: THRESHOLD,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[api][health] failed to read vector health", error);

    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown health check error",
      },
      { status: 500 }
    );
  }
}
