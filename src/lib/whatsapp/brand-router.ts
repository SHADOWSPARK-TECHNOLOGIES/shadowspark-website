/**
 * Per-conversation brand and intent routing for the shared ShadowSpark
 * WhatsApp number (+234 904 577 0572).
 *
 * One number serves two products:
 * - ShadowSpark Technologies (software services, demos)
 * - Lodgist (house search, listing checks, payment questions)
 *
 * Routing here is deterministic keyword matching so it works when every AI
 * provider is down. AI is only an optional enhancement for free text once the
 * brand is known (see src/lib/ai/whatsapp-bot.ts).
 *
 * Hard rules enforced by the replies in this file:
 * - The bot never confirms a payment and never marks anything PAID.
 * - Payment chats are handed to the Lodgist payments WhatsApp only.
 * - No bank details are ever produced.
 */

export type Brand = "shadowspark" | "lodgist";
export type StoredBrand = Brand | null;

export type LodgistIntent = "menu" | "search" | "listing_check" | "payment" | "team";

export const LODGIST_SITE_URL = "https://lodgist.online";
export const LODGIST_LISTINGS_URL = `${LODGIST_SITE_URL}/listings`;
/** Lodgist payments / staff WhatsApp. Staff confirm payments manually. */
export const LODGIST_PAYMENTS_WHATSAPP = "+2349136094315";
export const LODGIST_PAYMENTS_WHATSAPP_DISPLAY = "+234 913 609 4315";
export const LODGIST_PAYMENTS_WA_LINK = "https://wa.me/2349136094315";

export const CLARIFY_QUESTION =
  "Is this about ShadowSpark (software, AI automation, demos) or Lodgist (finding a house, checking a listing, or a rent payment)? Reply SHADOWSPARK or LODGIST.";

export type RouteDecision =
  /** Ask the one-line clarifying question. Brand stays unset. */
  | { kind: "clarify"; brand: null }
  /** Greeting with no brand yet: the ShadowSpark overview menu lists both products. */
  | { kind: "overview"; brand: null }
  /** Handle with the ShadowSpark flow (existing menu + optional AI). */
  | { kind: "shadowspark"; brand: "shadowspark" }
  /** Deterministic Lodgist reply. */
  | { kind: "lodgist"; brand: "lodgist"; intent: LodgistIntent; city?: string }
  /** Lodgist free text with no deterministic match; AI may answer, else Lodgist menu. */
  | { kind: "lodgist_freetext"; brand: "lodgist" };

function normalize(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

const CITIES = [
  "lagos",
  "abuja",
  "owerri",
  "port harcourt",
  "portharcourt",
  "ibadan",
  "enugu",
  "kano",
  "benin",
  "lekki",
  "ikeja",
  "yaba",
  "ajah",
  "surulere",
  "gwarinpa",
  "wuse",
  "uyo",
  "calabar",
  "abeokuta",
];

const PAYMENT_RE =
  /\b(pay|paid|paying|payment|payments|transfer|transferred|deposit|receipt|refund|invoice|bank details|account details|account number|caution fee|agency fee|inspection fee)\b/;
const LISTING_CHECK_RE =
  /\b(check (?:a|this|the|my)? ?(?:listing|house|apartment|flat|agent|property)|verify|verified|is (?:this|it) (?:legit|real|genuine)|legit|scam|fake (?:agent|listing|house)|rental safety|safety check|listing \d+|listing id)\b/;
const HOUSE_RE =
  /\b(house|houses|home|homes|apartment|apartments|flat|flats|rent|rental|renting|room|rooms|self[- ]?contain|selfcon|duplex|bungalow|accommodation|lodge|lodging|hostel|shortlet|short let|landlord|bedroom|bedrooms|property|properties|tenant|listing|listings)\b/;
const SHADOWSPARK_RE =
  /\b(shadowspark|shadow spark|software|website|web app|mobile app|app development|automation|automate|ai agent|chatbot|fintech|loan|lending|kyc|pilot|integration|saas|dashboard|consulting|demo)\b/;
const PAYMENT_RECOVERY_RE = /\bpayment[- ]recovery\b/;

export function detectCity(text: string): string | undefined {
  const n = normalize(text);
  const hit = CITIES.find((city) => n.includes(city));
  if (!hit) return undefined;
  if (hit === "portharcourt") return "Port Harcourt";
  return hit.replace(/\b\w/g, (c) => c.toUpperCase());
}

function lodgistIntentFromText(n: string): LodgistIntent | null {
  if (PAYMENT_RE.test(n) && !PAYMENT_RECOVERY_RE.test(n)) return "payment";
  if (LISTING_CHECK_RE.test(n) || n === "check") return "listing_check";
  if (HOUSE_RE.test(n) || CITIES.some((c) => n.includes(c))) return "search";
  if (/\b(agent|staff|team|human|person)\b/.test(n)) return "team";
  return null;
}

/**
 * Decide what to do with one inbound message given the brand this
 * conversation already chose (null when none yet).
 */
export function routeWhatsAppMessage(text: string, stored: StoredBrand): RouteDecision {
  const n = normalize(text);
  const lodgist = (intent: LodgistIntent): RouteDecision => ({
    kind: "lodgist",
    brand: "lodgist",
    intent,
    city: intent === "search" ? detectCity(text) : undefined,
  });

  // Explicit brand switches always win.
  if (/^(lodgist|4)$/.test(n) && stored !== "lodgist") return lodgist("menu");
  if (/^(shadowspark|shadow spark|0)$/.test(n)) return { kind: "shadowspark", brand: "shadowspark" };
  if (/^(switch|reset|start over|change)$/.test(n)) return { kind: "clarify", brand: null };

  if (stored === "lodgist") {
    if (/^(menu|help|start|hi|hello|hey|lodgist)$/.test(n) || !n) return lodgist("menu");
    if (n === "1") return lodgist("search");
    if (n === "2") return lodgist("listing_check");
    if (n === "3") return lodgist("payment");
    // A clear ShadowSpark request with no house words switches brand.
    if (SHADOWSPARK_RE.test(n) && !HOUSE_RE.test(n) && !PAYMENT_RE.test(n)) {
      return { kind: "shadowspark", brand: "shadowspark" };
    }
    const intent = lodgistIntentFromText(n);
    return intent ? lodgist(intent) : { kind: "lodgist_freetext", brand: "lodgist" };
  }

  const mentionsLodgist = n.includes("lodgist");
  const lodgistIntent = lodgistIntentFromText(n);
  const shadowsparkHit = SHADOWSPARK_RE.test(n) || PAYMENT_RECOVERY_RE.test(n);

  if (stored === "shadowspark") {
    // Stay on ShadowSpark unless the sender clearly moved to Lodgist.
    if (mentionsLodgist) return lodgist(lodgistIntent ?? "menu");
    if (lodgistIntent && lodgistIntent !== "team" && !shadowsparkHit) {
      // Payment words alone are ambiguous on a ShadowSpark chat; need house context.
      if (lodgistIntent !== "payment" || HOUSE_RE.test(n)) return lodgist(lodgistIntent);
    }
    return { kind: "shadowspark", brand: "shadowspark" };
  }

  // No brand yet.
  if (mentionsLodgist) return lodgist(lodgistIntent ?? "menu");
  if (lodgistIntent === "payment" && !shadowsparkHit) return lodgist("payment");
  if (lodgistIntent && lodgistIntent !== "team" && !shadowsparkHit) return lodgist(lodgistIntent);
  if (shadowsparkHit && !lodgistIntent) return { kind: "shadowspark", brand: "shadowspark" };
  // Greetings and the existing ShadowSpark menu keys: the overview menu
  // already lists both products, so the brand stays open.
  if (/^(menu|help|start|hi|hello|hey|1|2|3|services?|book|book demo|human|person|talk to a person)$/.test(n)) {
    return /^(menu|help|start|hi|hello|hey)$/.test(n)
      ? { kind: "overview", brand: null }
      : { kind: "shadowspark", brand: "shadowspark" };
  }
  return { kind: "clarify", brand: null };
}

export function buildLodgistReply(intent: LodgistIntent, city?: string): string {
  switch (intent) {
    case "search": {
      const url = city
        ? `${LODGIST_LISTINGS_URL}?search=${encodeURIComponent(city)}`
        : LODGIST_LISTINGS_URL;
      return (
        (city ? `Lodgist homes in ${city}:\n` : "Browse Lodgist homes:\n") +
        url +
        "\n\nHomes there are reviewed by Lodgist. Reviewed is not the same as verified; each listing says which it is. This chat cannot see live availability or prices.\n\n" +
        "Reply 2 to check a listing before you pay, 3 for payment help, or MENU."
      );
    }
    case "listing_check":
      return (
        "Before you pay any agent or landlord, check the listing.\n\n" +
        `Start a Rental Safety Check on ${LODGIST_SITE_URL}, or message the Lodgist team on WhatsApp: ${LODGIST_PAYMENTS_WA_LINK}\n\n` +
        "This chat does not verify houses or agents. Never send card numbers, PINs, or OTPs.\n\nReply MENU for other options."
      );
    case "payment":
      return (
        "This chat cannot take, check, or confirm payments, and it never shares bank details.\n\n" +
        `For any Lodgist payment, message the Lodgist payments team on WhatsApp: ${LODGIST_PAYMENTS_WA_LINK} (${LODGIST_PAYMENTS_WHATSAPP_DISPLAY}). ` +
        "Quote your booking or case reference as: Reference: WHATSAPP <your reference>.\n\n" +
        "Lodgist staff confirm payments by hand. Until they confirm, treat the payment as not confirmed."
      );
    case "team":
      return (
        `To reach the Lodgist team, message them on WhatsApp: ${LODGIST_PAYMENTS_WA_LINK} (${LODGIST_PAYMENTS_WHATSAPP_DISPLAY}).\n\n` +
        "This chat cannot page a person or promise a response time.\n\nReply MENU for other options."
      );
    case "menu":
    default:
      return (
        "Lodgist: find a place to live in Nigeria.\n\n" +
        "Reply with a number:\n" +
        "1 Find a house\n" +
        "2 Check a listing before you pay\n" +
        "3 Payment help\n\n" +
        `${LODGIST_SITE_URL}\n\n` +
        "Reply SHADOWSPARK for ShadowSpark software services."
      );
  }
}

/** Instructions for an optional model reply on Lodgist free text. */
export const LODGIST_MODEL_INSTRUCTIONS = `You are the WhatsApp assistant for Lodgist, a ShadowSpark property product for finding homes in Nigeria. Reply in plain text, 1 to 3 short sentences. No markdown.

Verified facts you may use:
- Site: ${LODGIST_SITE_URL}. Listings: ${LODGIST_LISTINGS_URL}.
- Listings are reviewed by Lodgist; reviewed is not the same as verified.
- For payments or a person, point to the Lodgist team WhatsApp ${LODGIST_PAYMENTS_WA_LINK}.
- You cannot see listings, prices, availability, bookings, or payment status. Do not invent any of them.
- Never say a payment was received, confirmed, or marked paid. Never give bank or account details.
- Do not ask for passwords, card numbers, PINs, or OTPs.
- If unsure, point to ${LODGIST_SITE_URL} or reply MENU.`;
