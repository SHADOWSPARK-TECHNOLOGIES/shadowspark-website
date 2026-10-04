/**
 * WhatsApp replies for the ShadowSpark business number.
 *
 * Menu intents are deterministic. A live Gemini call was not proven here:
 * this environment has no GEMINI_API_KEY, and production secrets were not read.
 * Free text therefore stays on the fixed menu and is labeled AI-blocked.
 * The site chatbot pattern (`generateText` with `@ai-sdk/google`, model
 * gemini-2.5-flash) is not used until that call can be shown.
 */

import {
  buildWhatsAppMenu,
  classifyWhatsAppMenu,
} from "@/lib/whatsapp/assistant-menu";

export const WHATSAPP_FALLBACK_REPLY = buildWhatsAppMenu("overview", {
  aiBlocked: true,
  freeText: true,
});

export type WhatsAppReply = {
  text: string;
  usedFallback: boolean;
  /** True when the sender asked for a person. Does not mean anyone was paged. */
  handoff: boolean;
};

/**
 * Never throws. Model replies stay off, so every answer is the fixed menu.
 */
export async function getWhatsAppReply(userText: string): Promise<WhatsAppReply> {
  const topic = classifyWhatsAppMenu(userText);
  const resolved = topic ?? "overview";
  return {
    text: buildWhatsAppMenu(resolved, {
      aiBlocked: true,
      freeText: topic === null,
    }),
    usedFallback: true,
    handoff: resolved === "human",
  };
}
