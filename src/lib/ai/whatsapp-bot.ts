/**
 * WhatsApp replies for the ShadowSpark business number.
 *
 * MENU, 1, 2, 3, and 4 (and the other fixed menu phrases) stay on the
 * deterministic menu. Free text calls Gemini when GEMINI_API_KEY is set and
 * falls back to that menu when the key is missing or the call fails.
 */

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

import { optionalEnv } from "@/lib/env";
import {
  buildWhatsAppMenu,
  classifyWhatsAppMenu,
  WHATSAPP_MODEL_INSTRUCTIONS,
  type MenuTopic,
} from "@/lib/whatsapp/assistant-menu";

const GEMINI_MODEL = "gemini-2.5-flash";

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

function fixedMenu(topic: MenuTopic, freeText: boolean): WhatsAppReply {
  return {
    text: buildWhatsAppMenu(topic, {
      aiBlocked: true,
      freeText,
    }),
    usedFallback: true,
    handoff: topic === "human",
  };
}

/** Drop truthful negations so the checks below only see positive claims. */
function withoutNegatedClaims(text: string): string {
  return text
    .replace(/\b(?:not|isn't|isn’t|is not)\s+cac-registered\b/gi, "")
    .replace(/\b(?:not|isn't|isn’t|is not)\s+meta-verified\b/gi, "");
}

/**
 * Model output that states a price, a response-time promise, banking details,
 * or a CAC / Meta verification claim is discarded. The caller sends the menu.
 */
export function violatesWhatsAppReplyPolicy(text: string): boolean {
  const checked = withoutNegatedClaims(text);
  return (
    /₦/.test(checked) ||
    /\$\s?\d/.test(checked) ||
    /\b(?:usd|ngn)\s?\d/i.test(checked) ||
    /\b\d[\d,]*(?:\.\d+)?\s*(?:naira|ngn|usd)\b/i.test(checked) ||
    /\bcac-registered\b/i.test(checked) ||
    /\bmeta-verified\b/i.test(checked) ||
    /\baccount number\b/i.test(checked) ||
    /\bbank account\b/i.test(checked) ||
    /\bsort code\b/i.test(checked) ||
    /\biban\b/i.test(checked) ||
    /\brouting number\b/i.test(checked) ||
    /\b24\s*hours\b/i.test(checked) ||
    /\bwithin\s+\d+\s+(?:business\s+)?(?:hours?|days?|minutes?)\b/i.test(checked) ||
    /\b(?:respond|reply|get back)\s+within\b/i.test(checked) ||
    /\bresponse time of\b/i.test(checked)
  );
}

async function generateGeminiReply(userText: string, apiKey: string): Promise<string | null> {
  const google = createGoogleGenerativeAI({ apiKey });
  const { text } = await generateText({
    model: google(GEMINI_MODEL),
    system: WHATSAPP_MODEL_INSTRUCTIONS,
    prompt: userText,
    maxOutputTokens: 256,
    abortSignal: AbortSignal.timeout(20_000),
    providerOptions: { google: { thinkingConfig: { thinkingBudget: 0 } } },
  });
  const reply = text.trim();
  if (!reply || reply.includes(apiKey) || violatesWhatsAppReplyPolicy(reply)) {
    return null;
  }
  return reply;
}

/**
 * Never throws. Menu commands are exact. Free text uses Gemini only when the
 * key is set and the call returns a usable reply.
 */
export async function getWhatsAppReply(userText: string): Promise<WhatsAppReply> {
  const topic = classifyWhatsAppMenu(userText);
  if (topic !== null) {
    return fixedMenu(topic, false);
  }

  const apiKey = optionalEnv("GEMINI_API_KEY");
  if (apiKey) {
    try {
      const text = await generateGeminiReply(userText, apiKey);
      if (text) {
        return { text, usedFallback: false, handoff: false };
      }
      console.error("[whatsapp] Gemini reply discarded");
    } catch (error) {
      const name = error instanceof Error ? error.name : "Error";
      console.error("[whatsapp] Gemini reply failed", name);
    }
  }

  return fixedMenu("overview", true);
}
