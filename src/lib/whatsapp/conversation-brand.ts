/**
 * Remembers which brand (ShadowSpark or Lodgist) a WhatsApp conversation
 * chose. Stored on the sender's Lead row (one lead per phone number) under
 * metadata.whatsappBrand, so no schema migration is needed.
 */
import type { StoredBrand } from "@/lib/whatsapp/brand-router";

type LeadDb = {
  lead: {
    findUnique(args: {
      where: { id: string };
      select: { metadata: true };
    }): Promise<{ metadata: unknown } | null>;
    update(args: { where: { id: string }; data: { metadata: object } }): Promise<unknown>;
  };
};

export const BRAND_METADATA_KEY = "whatsappBrand";

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? { ...(value as Record<string, unknown>) }
    : {};
}

export function readBrand(metadata: unknown): StoredBrand {
  const value = asRecord(metadata)[BRAND_METADATA_KEY];
  return value === "shadowspark" || value === "lodgist" ? value : null;
}

/** Never throws; returns null when there is no lead or storage fails. */
export async function loadConversationBrand(
  db: LeadDb,
  leadId: string | undefined,
): Promise<StoredBrand> {
  if (!leadId) return null;
  try {
    const lead = await db.lead.findUnique({ where: { id: leadId }, select: { metadata: true } });
    return readBrand(lead?.metadata);
  } catch (error) {
    const name = error instanceof Error ? error.name : "Error";
    console.error("[whatsapp:brand] load failed", name);
    return null;
  }
}

/** Never throws. Writes only when the brand changed. */
export async function saveConversationBrand(
  db: LeadDb,
  leadId: string | undefined,
  previous: StoredBrand,
  next: StoredBrand | undefined,
): Promise<void> {
  if (!leadId || next === undefined || next === previous) return;
  try {
    const lead = await db.lead.findUnique({ where: { id: leadId }, select: { metadata: true } });
    const metadata = asRecord(lead?.metadata);
    if (next === null) delete metadata[BRAND_METADATA_KEY];
    else metadata[BRAND_METADATA_KEY] = next;
    await db.lead.update({ where: { id: leadId }, data: { metadata } });
  } catch (error) {
    const name = error instanceof Error ? error.name : "Error";
    console.error("[whatsapp:brand] save failed", name);
  }
}
