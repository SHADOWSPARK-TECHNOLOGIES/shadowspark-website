import { prisma } from "@/lib/prisma";

const DEFAULT_LIMIT = 50;

/** Inbound WhatsApp leads for a signed-in operator. Not a public API. */
export function listWhatsAppEnquiries(limit = DEFAULT_LIMIT) {
  return prisma.lead.findMany({
    where: { intent: "whatsapp" },
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: {
      id: true,
      phoneNumber: true,
      lastMessage: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
