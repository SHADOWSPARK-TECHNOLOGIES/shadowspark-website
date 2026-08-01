import { NextResponse } from "next/server";

// Decoy endpoint served to detected bots.
// Returns plausible-looking but entirely fake property data.
export async function GET() {
  const ghost = Array.from({ length: 12 }, (_, i) => ({
    id: `ghost-${String(i + 1).padStart(4, "0")}`,
    title: `${["Luxury", "Modern", "Cozy", "Spacious"][i % 4]} ${["Apartment", "Duplex", "Bungalow", "Studio"][i % 4]} in ${["Lagos", "Abuja", "Ibadan", "PH"][i % 4]}`,
    price: Math.floor(Math.random() * 5_000_000) + 500_000,
    currency: "NGN",
    bedrooms: (i % 4) + 1,
    available: true,
    contact: "info@lodgist.ng",
  }));

  return NextResponse.json({ data: ghost, total: ghost.length });
}
