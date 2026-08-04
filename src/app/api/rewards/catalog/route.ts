import { NextResponse } from "next/server";
import { rewardBadges } from "@/data/rewards";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    ok: true,
    badges: rewardBadges,
  });
}
