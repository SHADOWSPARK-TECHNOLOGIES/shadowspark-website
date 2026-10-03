import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { hasAdminIdentity } from "@/lib/auth/authorization";
import { listWhatsAppEnquiries } from "@/lib/whatsapp/enquiries";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!hasAdminIdentity(session?.user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await listWhatsAppEnquiries();
  return NextResponse.json({
    enquiries: rows.map((row) => ({
      id: row.id,
      phoneNumber: row.phoneNumber,
      lastMessage: row.lastMessage,
      status: row.status,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    })),
  });
}
