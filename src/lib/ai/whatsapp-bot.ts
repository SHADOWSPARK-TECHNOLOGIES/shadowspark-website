/**
 * WhatsApp replies for the ShadowSpark business number.
 *
 * MENU, 1, 2, 3, and 4 (and the other fixed menu phrases) stay on the
 * deterministic menu. Free text calls Gemini when GEMINI_API_KEY is set.
 * If that call fails or returns nothing usable and XAI_API_KEY is set, the
 * reply falls through to xAI/Grok. The fixed menu is last.
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

/**
 * New AI Studio keys get HTTP 404 for models/gemini-2.5-flash. The SDK calls
 * `{base}/models/{id}:generateContent`, and gemini-flash-latest is the
 * documented alias those keys can call.
 */
const GEMINI_MODEL = "gemini-flash-latest";
/** Same non-reasoning Grok model the public site chat uses. */
const XAI_MODEL = "grok-4.20-0309-non-reasoning";
const XAI_CHAT_URL = "https://api.x.ai/v1/chat/completions";
const SAFE_ERROR_TOKEN = /^[A-Za-z0-9_.:-]{1,64}$/;

type GeminiFailureLog = {
  name: string;
  httpStatus?: number;
  status?: string;
  code?: string | number;
  reason?: string;
  retry?: string;
};

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

function usableModelText(text: string, secrets: string[]): string | null {
  const reply = text.trim();
  if (!reply || secrets.some((secret) => secret.length > 0 && reply.includes(secret))) {
    return null;
  }
  if (violatesWhatsAppReplyPolicy(reply)) return null;
  return reply;
}

function readSafeToken(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return SAFE_ERROR_TOKEN.test(trimmed) ? trimmed : undefined;
}

function readCode(value: unknown): string | number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  return readSafeToken(value);
}

function readProviderError(value: unknown): {
  status?: string;
  code?: string | number;
  reason?: string;
} {
  const source =
    typeof value === "string"
      ? (() => {
          try {
            return JSON.parse(value) as unknown;
          } catch {
            return undefined;
          }
        })()
      : value;
  if (!source || typeof source !== "object" || Array.isArray(source)) return {};
  const record = source as Record<string, unknown>;
  const error =
    record.error && typeof record.error === "object" && !Array.isArray(record.error)
      ? (record.error as Record<string, unknown>)
      : record;
  let reason: string | undefined;
  if (Array.isArray(error.details)) {
    for (const detail of error.details) {
      if (!detail || typeof detail !== "object" || Array.isArray(detail)) continue;
      reason = readSafeToken((detail as { reason?: unknown }).reason);
      if (reason) break;
    }
  }
  return {
    status: readSafeToken(error.status),
    code: readCode(error.code),
    reason,
  };
}

function relatedErrors(error: unknown): object[] {
  const seen = new Set<unknown>();
  const related: object[] = [];
  const queue: unknown[] = [error];
  while (queue.length > 0 && related.length < 6) {
    const current = queue.shift();
    if (!current || typeof current !== "object" || seen.has(current)) continue;
    seen.add(current);
    related.push(current);
    const record = current as Record<string, unknown>;
    if ("cause" in record) queue.push(record.cause);
    if ("lastError" in record) queue.push(record.lastError);
    if (Array.isArray(record.errors)) queue.push(...record.errors.slice(0, 3));
  }
  return related;
}

const RETRY_REASONS = new Set(["maxRetriesExceeded", "errorNotRetryable", "abort"]);

/**
 * Status, code, and reason only. Gemini bodies and SDK messages can echo the
 * prompt or the API key, so those strings are never copied into the log.
 */
function geminiFailureLog(error: unknown): GeminiFailureLog {
  const named =
    typeof error === "object" && error !== null && "name" in error
      ? readSafeToken((error as { name?: unknown }).name)
      : undefined;
  const log: GeminiFailureLog = { name: named ?? "Error" };
  let retry: string | undefined;

  for (const node of relatedErrors(error)) {
    const record = node as Record<string, unknown>;
    if (log.httpStatus === undefined && typeof record.statusCode === "number" && Number.isFinite(record.statusCode)) {
      log.httpStatus = record.statusCode;
    }
    const parsedBody = readProviderError(record.responseBody);
    const parsedData = readProviderError(record.data);
    const status = parsedBody.status ?? parsedData.status;
    const code = parsedBody.code ?? parsedData.code;
    const reason = parsedBody.reason ?? parsedData.reason;
    if (log.status === undefined && status !== undefined) log.status = status;
    if (log.code === undefined && code !== undefined) log.code = code;
    if (log.reason === undefined && reason !== undefined) log.reason = reason;
    const nodeReason = readSafeToken(record.reason);
    if (!retry && nodeReason && RETRY_REASONS.has(nodeReason)) retry = nodeReason;
  }

  if (retry) log.retry = retry;
  if (!log.reason && retry) log.reason = retry;
  return log;
}

async function generateGeminiReply(
  userText: string,
  apiKey: string,
  secrets: string[],
): Promise<string | null> {
  const google = createGoogleGenerativeAI({ apiKey });
  const { text } = await generateText({
    model: google(GEMINI_MODEL),
    system: WHATSAPP_MODEL_INSTRUCTIONS,
    prompt: userText,
    // Thought tokens count toward this cap. "low" is the smallest level the
    // current Flash models behind gemini-flash-latest all accept.
    maxOutputTokens: 1024,
    abortSignal: AbortSignal.timeout(20_000),
    providerOptions: { google: { thinkingConfig: { thinkingLevel: "low" } } },
  });
  return usableModelText(text, secrets);
}

function readXaiText(payload: unknown): string {
  if (!payload || typeof payload !== "object") return "";
  const choices = (payload as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || !choices[0] || typeof choices[0] !== "object") return "";
  const message = (choices[0] as { message?: unknown }).message;
  if (!message || typeof message !== "object") return "";
  const content = (message as { content?: unknown }).content;
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .map((part) => {
      if (typeof part === "string") return part;
      if (part && typeof part === "object" && "text" in part && typeof part.text === "string") {
        return part.text;
      }
      return "";
    })
    .join("");
}

async function generateXaiReply(
  userText: string,
  apiKey: string,
  secrets: string[],
): Promise<{ text: string } | { discarded: boolean }> {
  const response = await fetch(XAI_CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: XAI_MODEL,
      max_tokens: 1024,
      messages: [
        { role: "system", content: WHATSAPP_MODEL_INSTRUCTIONS },
        { role: "user", content: userText },
      ],
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) {
    console.error("[whatsapp] xAI reply failed", { httpStatus: response.status });
    return { discarded: false };
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (error) {
    const name = error instanceof Error ? error.name : "Error";
    console.error("[whatsapp] xAI reply failed", { name });
    return { discarded: false };
  }

  const text = usableModelText(readXaiText(payload), secrets);
  return text ? { text } : { discarded: true };
}

/**
 * Never throws. Menu commands are exact. Free text tries Gemini, then xAI
 * when XAI_API_KEY is set, then the fixed menu.
 */
export async function getWhatsAppReply(userText: string): Promise<WhatsAppReply> {
  const topic = classifyWhatsAppMenu(userText);
  if (topic !== null) {
    return fixedMenu(topic, false);
  }

  const geminiKey = optionalEnv("GEMINI_API_KEY");
  const xaiKey = optionalEnv("XAI_API_KEY");
  const secrets = [geminiKey, xaiKey].filter((value): value is string => Boolean(value));

  if (geminiKey) {
    try {
      const text = await generateGeminiReply(userText, geminiKey, secrets);
      if (text) {
        return { text, usedFallback: false, handoff: false };
      }
      console.error("[whatsapp] Gemini reply discarded");
    } catch (error) {
      console.error("[whatsapp] Gemini reply failed", geminiFailureLog(error));
    }
  }

  if (xaiKey) {
    try {
      const attempt = await generateXaiReply(userText, xaiKey, secrets);
      if ("text" in attempt) {
        return { text: attempt.text, usedFallback: false, handoff: false };
      }
      if (attempt.discarded) console.error("[whatsapp] xAI reply discarded");
    } catch (error) {
      const name = error instanceof Error ? error.name : "Error";
      console.error("[whatsapp] xAI reply failed", { name });
    }
  }

  return fixedMenu("overview", true);
}
