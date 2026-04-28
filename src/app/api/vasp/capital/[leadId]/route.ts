import { NextResponse } from "next/server";

import { LedgerService } from "@/lib/ledger";

export const runtime = "nodejs";

// ──────────────────────────────────────────────────
// BigInt → string serialisation for JSON transport
// ──────────────────────────────────────────────────

function serialise(input: unknown): unknown {
  if (typeof input === "bigint") return input.toString();
  if (Array.isArray(input)) return input.map(serialise);
  if (input !== null && typeof input === "object") {
    return Object.fromEntries(
      Object.entries(input).map(([k, v]) => [k, serialise(v)]),
    );
  }
  return input;
}

// ──────────────────────────────────────────────────
// GET  /api/vasp/capital/[leadId]
// ──────────────────────────────────────────────────

export async function GET(
  request: Request,
  { params }: { params: Promise<{ leadId: string }> },
) {
  try {
    const { leadId } = await params;
    if (!leadId) {
      return NextResponse.json(
        { error: "leadId is required" },
        { status: 400 },
      );
    }

    const { searchParams } = new URL(request.url);
    const leadName = searchParams.get("leadName") ?? "Unnamed Lead";

    const result = await LedgerService.checkAndProvisionCapitalReserve(
      leadId,
      leadName,
    );

    return NextResponse.json(serialise(result));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Capital reserve check failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
