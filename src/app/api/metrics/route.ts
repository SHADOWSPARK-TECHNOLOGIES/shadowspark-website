import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { rewardBadges } from "@/data/rewards";
import { pilots, countByStatus } from "@/data/pilots";

export async function GET() {
  const productCounts = {
    live: products.filter((p) => p.status === "live").length,
    beta: products.filter((p) => p.status === "beta").length,
    inDevelopment: products.filter((p) => p.status === "in-development").length,
  };

  const badgeCounts = {
    total: rewardBadges.length,
    bronze: rewardBadges.filter((b) => b.tier === "bronze").length,
    silver: rewardBadges.filter((b) => b.tier === "silver").length,
    gold: rewardBadges.filter((b) => b.tier === "gold").length,
  };

  const pilotCounts = countByStatus(pilots);

  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    products: productCounts,
    badges: badgeCounts,
    pilots: pilotCounts,
    contributors: {
      // Seeded representative count until reward persistence is implemented.
      total: 12,
      activeThisMonth: 5,
    },
  });
}
