/**
 * WhatsApp replies for the ShadowSpark business number.
 *
 * Menu intents (services, demo, human, Lodgist) are deterministic.
 * Free text uses Gemini when GEMINI_API_KEY is set, otherwise Claude when
 * ANTHROPIC_API_KEY is set. If neither credential is set, or the model call
 * fails, the reply is the fixed menu and is labeled AI-blocked.
 * Keys are never logged.
 */

import Anthropic from "@anthropic-ai/sdk";

import { optionalEnv } from "@/lib/env";
import {
  buildWhatsAppMenu,
  classifyWhatsAppMenu,
  WHATSAPP_MODEL_INSTRUCTIONS,
} from "@/lib/whatsapp/assistant-menu";

/** Same model id the public site chatbot already calls. */
const GEMINI_MODEL = "gemini-2.5-flash";
const CLAUDE_MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 400;
const MODEL_TIMEOUT_MS = 8_000;

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

let claudeClient: Anthropic | null = null;

function blockedMenu(topic: ReturnType<typeof classifyWhatsAppMenu> = "overview", freeText = false): WhatsAppReply {
  const resolved = topic ?? "overview";
  return {
    text: buildWhatsAppMenu(resolved, { aiBlocked: true, freeText }),
    usedFallback: true,
    handoff: resolved === "human",
  };
}

function menuReply(topic: NonNullable<ReturnType<typeof classifyWhatsAppMenu>>, aiBlocked: boolean): WhatsAppReply {
  return {
    text: buildWhatsAppMenu(topic, { aiBlocked }),
    usedFallback: aiBlocked,
    handoff: topic === "human",
  };
}

async function geminiReply(userText: string, apiKey: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: WHATSAPP_MODEL_INSTRUCTIONS }] },
        contents: [{ role: "user", parts: [{ text: userText }] }],
        generationConfig: { maxOutputTokens: MAX_TOKENS },
      }),
      signal: AbortSignal.timeout(MODEL_TIMEOUT_MS),
    },
  );
  if (!response.ok) {
    throw new Error(`Gemini request failed (${response.status})`);
  }
  const data = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  return (
    data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("")
      .trim() ?? ""
  );
}

async function claudeReply(userText: string): Promise<string> {
  if (!claudeClient) claudeClient = new Anthropic();
  const response = await claudeClient.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: MAX_TOKENS,
    system: WHATSAPP_MODEL_INSTRUCTIONS,
    messages: [{ role: "user", content: userText }],
  });
  return response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("")
    .trim();
}

/**
 * Never throws. A missing or failed model returns the fixed menu.
 */
export async function getWhatsAppReply(userText: string): Promise<WhatsAppReply> {
  const topic = classifyWhatsAppMenu(userText);
  const geminiKey = optionalEnv("GEMINI_API_KEY");
  const anthropicKey = optionalEnv("ANTHROPIC_API_KEY");
  const modelConfigured = Boolean(geminiKey || anthropicKey);

  if (topic) return menuReply(topic, !modelConfigured);
  if (!modelConfigured) return blockedMenu("overview", true);

  try {
    const text = geminiKey ? await geminiReply(userText, geminiKey) : await claudeReply(userText);
    if (!text) return blockedMenu("overview", true);
    return { text, usedFallback: false, handoff: false };
  } catch (error) {
    const name = error instanceof Error ? error.name : "Error";
    console.error("[whatsapp:bot] model reply failed; sending fixed menu", name);
    return blockedMenu("overview", true);
  }
}
