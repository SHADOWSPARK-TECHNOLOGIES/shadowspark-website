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

/** House-specific money words. These are payment AND house context at once. */
const HOUSE_FEE_RE =
  /\b(?:caution|agency|agent|agents|inspection|legal|agreement|service|commission|viewing)\s+(?:fee|fees|charge|charges|money)\b|\b(?:house rent|rent money|rental payment|rent payment|pay(?:ing)? (?:my |the |di |our )?rent)\b/;
const PAYMENT_RE =
  /\b(pay|paid|paying|payment|payments|transfer|transferred|deposit|receipt|refund|invoice|bank details|account details|account number|acct number|acct no|fees?|send(?:ing)? (?:the |am |him |her |them )?money|sent (?:the |am |him |her |them )?money|don pay|don send|i don transfer|credit alert)\b/;
const LISTING_CHECK_RE =
  /\b(check (?:a|this|the|my|di|dis|am)? ?(?:listing|house|apartment|flat|agent|property|landlord)|verify|verified|is (?:this|it|the|dis|di) (?:\w+ )?(?:legit|real|genuine|fake|original)|(?:house|agent|listing|landlord|place|property|apartment|flat) (?:is|be|dey|na) (?:legit|real|genuine|fake|original)|(?:na|be|dey) (?:scam|fake|real|legit|genuine)|legit|scam|scammer|419|fake (?:agent|listing|house|landlord)|rental safety|safety check|listing \d+|listing id|before (?:i|we) pay)\b/;
const HOUSE_RE =
  /\b(house|houses|home|homes|apartment|apartments|flat|flats|mini flat|miniflat|rent|rental|renting|room|rooms|self[- ]?con(?:tain(?:ed)?)?|selfcon|room and parlou?r|duplex|bungalow|terrace|bq|boys quarters?|accommodation|accomodation|lodge|lodging|hostel|shortlet|short let|landlord|landlady|caretaker|bedroom|bedrooms|bed ?(?:room)?s?\b|property|properties|tenant|tenants|listing|listings|shop space|office space|estate|land for sale|plot)\b/;
/** Strong ShadowSpark words. Someone looking for a house almost never says these. */
const SHADOWSPARK_RE =
  /\b(shadowspark|shadow spark|software|website|web site|web app|webapp|mobile app|\bapp\b|apps|app development|build (?:me |us )?(?:a |an )?(?:app|site|website|bot|platform|system|portal)|developer|developers|programmer|automation|automate|ai agent|ai bot|chatbot|chat bot|whatsapp bot|fintech|loan app|lending|kyc|pilot|integration|api|saas|dashboard|consulting|demo|landing page|e-?commerce|erp|crm|pos system|portal|platform|system for)\b/;
const PAYMENT_RECOVERY_RE = /\bpayment[- ]recovery\b/;
const SCAM_RE = /\b(scam|scammer|419|legit|fake|genuine|real|original)\b/;
const GREETING_RE =
  /^(?:(?:good|gud) ?(?:morning|afternoon|evening|day)|morning|afternoon|evening|hi+|hello+|helo|hey+|hallo|how far|howfar|wetin dey|sup|greetings|hi there|hello there|hello o|hi o|hey there)[\s.!?,]*(?:o|oo|sir|ma|boss|please|pls|abeg)?[\s.!?,]*$/;

export function detectCity(text: string): string | undefined {
  const n = normalize(text);
  const hit = CITIES.find((city) => n.includes(city));
  if (!hit) return undefined;
  if (hit === "portharcourt") return "Port Harcourt";
  return hit.replace(/\b\w/g, (c) => c.toUpperCase());
}

function lodgistIntentFromText(n: string): LodgistIntent | null {
  const money = (PAYMENT_RE.test(n) || HOUSE_FEE_RE.test(n)) && !PAYMENT_RECOVERY_RE.test(n);
  // "inspection fee ... na scam?" is asking whether to pay, not how to pay.
  // "verify my payment" is still a payment question.
  if (LISTING_CHECK_RE.test(n) && (!money || SCAM_RE.test(n))) return "listing_check";
  if (money) return "payment";
  if (n === "check") return "listing_check";
  if (HOUSE_RE.test(n) || CITIES.some((c) => n.includes(c))) return "search";
  if (/\b(agent|staff|team|human|person|somebody|someone)\b/.test(n)) return "team";
  return null;
}

/** True when the message has Lodgist house context (house words or a house-specific fee). */
function hasHouseContext(n: string): boolean {
  return HOUSE_RE.test(n) || HOUSE_FEE_RE.test(n) || CITIES.some((c) => n.includes(c));
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
    if (/^(menu|help|start|lodgist|4)$/.test(n) || GREETING_RE.test(n) || !n) return lodgist("menu");
    if (n === "1") return lodgist("search");
    if (n === "2") return lodgist("listing_check");
    if (n === "3") return lodgist("payment");
    // A clear ShadowSpark request with no house words switches brand.
    if (SHADOWSPARK_RE.test(n) && !hasHouseContext(n) && !PAYMENT_RE.test(n)) {
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
      if (lodgistIntent !== "payment" || hasHouseContext(n)) return lodgist(lodgistIntent);
    }
    return { kind: "shadowspark", brand: "shadowspark" };
  }

  // No brand yet.
  if (mentionsLodgist) return lodgist(lodgistIntent ?? "menu");
  const house = hasHouseContext(n);
  if (lodgistIntent === "payment") {
    // Payment is deterministic, but a ShadowSpark client paying for a website
    // must not be sent to the Lodgist payments line. Without house context we
    // either stay on ShadowSpark (software words present) or ask one question.
    if (shadowsparkHit) return { kind: "shadowspark", brand: "shadowspark" };
    if (house) return lodgist("payment");
    return { kind: "clarify", brand: null };
  }
  if (lodgistIntent === "listing_check") return lodgist("listing_check");
  if (lodgistIntent === "search") {
    // "property management software", "app for our hostel bookings": the
    // software words describe the product, not a house hunt.
    return shadowsparkHit ? { kind: "shadowspark", brand: "shadowspark" } : lodgist("search");
  }
  if (shadowsparkHit) return { kind: "shadowspark", brand: "shadowspark" };
  // Greetings and the existing ShadowSpark menu keys: the overview menu
  // already lists both products, so the brand stays open.
  if (GREETING_RE.test(n) || /^(menu|help|start)$/.test(n)) return { kind: "overview", brand: null };
  if (/^(1|2|3|services?|book|book demo|human|person|talk to a person)$/.test(n)) {
    return { kind: "shadowspark", brand: "shadowspark" };
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
