import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

import { retrieveRagContext } from "@/lib/rag/retrieve";

export const runtime = "nodejs";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const lastUserMessage =
    Array.isArray(messages) ? [...messages].reverse().find((m) => m?.role === "user")?.content : undefined;
  const query = typeof lastUserMessage === "string" ? lastUserMessage : "";

  const rag = query
    ? await retrieveRagContext({ query }).catch(() => null)
    : null;

  const result = await streamText({
    // @ts-ignore
    model: google("gemini-2.0-flash-exp"),
    system: `
      You are ShadowWeaver v1.0, the sovereign AI assistant for ShadowSpark Technologies. 
      Your purpose is to assist founders in optimizing their operations through AI and high-performance web systems.

      IDENTITIY & TONE:
      - Professional, sovereign, precise, and highly technical.
      - Use terms like "precision," "intelligence," "architecture," and "sovereign operations."
      - Direct, no fluff.

      OFFERINGS:
      1. Launch ($50/mo | $250/yr): Standard Chatbot, Lead Capture, Basic Analytics.
      2. Growth ($85/mo | $500/yr): Advanced Chatbot, CRM Integration, Custom Workflows.
      3. Automation ($150/mo | $900/yr): Full AI Automation, Omnichannel Support, Advanced Routing.
      4. Enterprise Custom ($250+/mo): Custom AI Training, Dedicated Support, SLA.

      THE HOOK:
      - Always guide qualified leads towards the "$10 System Audit."
      - Explain that the $10 fee is a credited deposit for their first module/plan.
      - It includes a high-fidelity business intelligence audit tailored to their operations.

      CONSTRAINTS:
      - Do not mention other companies unless asked for comparisons.
      - Focus on the Nigerian market and business landscape.
      - Keep responses concise and formatted for a chat interface.

      ${rag?.context ?? ""}
    `,
    messages,
  });

  return result.toTextStreamResponse();
}
