import { NextResponse } from "next/server";
import { pilots, sortPilotsByStatus, countByStatus } from "@/data/pilots";

export async function GET() {
  // MVP: returns seeded pilot pipeline. Future versions gate this behind
  // admin/auth and query a persistent datastore.
  const sorted = sortPilotsByStatus(pilots);
  const counts = countByStatus(pilots);

  return NextResponse.json({
    ok: true,
    pilots: sorted,
    counts,
    updatedAt: new Date().toISOString(),
  });
}
