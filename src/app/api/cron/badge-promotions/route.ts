import { NextResponse } from "next/server";
import { rewardBadges } from "@/data/rewards";

export async function GET(request: Request) {
  // Stub for automated badge promotion scan. Future version queries contributor
  // scores from a datastore and issues qualifying badges via /api/rewards/issue.
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    checkedBadges: rewardBadges.map((b) => b.id),
    promoted: [],
    message: "Badge promotion scan stub ran successfully. No persistent scores in MVP.",
  });
}
