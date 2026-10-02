/**
 * Deterministic ShadowSpark WhatsApp replies.
 * Facts are limited to pages checked on 2026-10-02:
 * - https://shadowspark-tech.com (canonical; shadowspark-tech.org returned 404)
 * - https://shadowspark-tech.com/demo (public WhatsApp CTA)
 * - https://calendly.com/wonderstevie702/30min (live booking page)
 * - https://lodgist.online (separate property product)
 * No prices, response-time promises, banking details, or registration claims.
 */

export const PUBLIC_SITE_URL = "https://shadowspark-tech.com";
export const DEMO_BOOKING_URL = "https://calendly.com/wonderstevie702/30min";
export const LODGIST_URL = "https://lodgist.online";

export type MenuTopic = "overview" | "services" | "demo" | "human" | "lodgist";

const AI_BLOCKED_LINE =
  "AI replies are blocked on this chat. This is a fixed menu, not a live model.";

export function classifyWhatsAppMenu(text: string): MenuTopic | null {
  const normalized = text.trim().toLowerCase().replace(/\s+/g, " ");
  if (!normalized) return "overview";
  if (/^(menu|help|start|hi|hello|hey)$/.test(normalized)) return "overview";
  if (/^(1|services?)$/.test(normalized)) return "services";
  if (/^(2|demo|book|book demo)$/.test(normalized)) return "demo";
  if (/^(3|human|person|talk to a person)$/.test(normalized)) return "human";
  if (/^(4|lodgist)$/.test(normalized) || normalized.includes("lodgist")) return "lodgist";
  return null;
}

export function buildWhatsAppMenu(
  topic: MenuTopic,
  options: { aiBlocked?: boolean; freeText?: boolean } = {},
): string {
  const banner = options.aiBlocked ? `${AI_BLOCKED_LINE}\n\n` : "";
  const freeText = options.freeText
    ? "I can't answer that in free text while AI replies are blocked. Reply MENU, 1, 2, 3, or 4.\n\n"
    : "";

  switch (topic) {
    case "services":
      return (
        banner +
        "ShadowSpark Technologies builds software products. The public site describes pilot workflows for African fintech teams: loan intake, identity checks, and payment-recovery follow-up, with a person reviewing the work.\n\n" +
        "Figures and dashboards on the site are examples. They are not customer results, a price list, or a compliance certificate. CAC registration is pending. This chat is not Meta-verified.\n\n" +
        PUBLIC_SITE_URL +
        "\n\nReply MENU for the other options."
      );
    case "demo":
      return (
        banner +
        "Book a 30-minute call with Stephen Okoronkwo:\n" +
        DEMO_BOOKING_URL +
        "\n\nNo price is quoted in this chat. Scope is agreed on the call.\n\nReply MENU for the other options."
      );
    case "human":
      return (
        banner +
        "This chat cannot page a person, and it does not promise a response time.\n\n" +
        "The verified way to reach a person is the same 30-minute booking link:\n" +
        DEMO_BOOKING_URL +
        "\n\nReply MENU for the other options."
      );
    case "lodgist":
      return (
        banner +
        "Lodgist is a separate ShadowSpark property product for finding a place in Nigeria. It is not the fintech pilot.\n\n" +
        LODGIST_URL +
        "\n\nReply MENU for the other options."
      );
    case "overview":
    default:
      return (
        banner +
        freeText +
        "ShadowSpark Technologies\n" +
        "CAC registration is pending. This chat is not Meta-verified.\n\n" +
        "Reply with a number:\n" +
        "1 Services\n" +
        "2 Demo\n" +
        "3 Human\n" +
        "4 Lodgist (property search, separate product)\n\n" +
        PUBLIC_SITE_URL
      );
  }
}

/** Stable instructions for a model. No prices, SLAs, banking, or verification claims. */
export const WHATSAPP_MODEL_INSTRUCTIONS = `You are the WhatsApp assistant for ShadowSpark Technologies. Reply in plain text, 1 to 3 short sentences. No markdown.

Verified facts you may use:
- Public site: ${PUBLIC_SITE_URL}. shadowspark-tech.org is not the live site.
- The site describes pilot workflows for African fintech teams (loan intake, identity checks, payment-recovery follow-up) with operator review. Site figures are examples, not customer results or a price list.
- CAC registration is pending. Do not say the company is CAC-registered or Meta-verified.
- Demo booking: ${DEMO_BOOKING_URL} (30 minutes with Stephen Okoronkwo). Do not promise a response time.
- This chat cannot page a person. For a person, give the booking link.
- Lodgist is a separate property product: ${LODGIST_URL}.
- Do not invent prices, timelines, banking details, payment instructions, or email addresses.
- Do not ask for passwords, card numbers, OTPs, or other secrets.
- If you are unsure, say so and point to the booking link or the public site.`;
