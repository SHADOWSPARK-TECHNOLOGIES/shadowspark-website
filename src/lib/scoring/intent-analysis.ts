import type { IntentAnalysis } from "../leads/qualification";

const ANYTHING_LLM_URL =
  process.env.ANYTHING_LLM_URL || "http://localhost:3001/api/v1/workspace/shadowspark-w/chat";
const LOCAL_LLM_KEY = process.env.LOCAL_LLM_KEY || "";

export async function analyzeLeadIntent(
  leadMessage: string,
  fetchImpl: typeof fetch = fetch,
): Promise<IntentAnalysis> {
  if (!leadMessage.trim()) {
    return { ok: false, reasoning: "No message provided for analysis." };
  }

  try {
    const prompt = `Analyze this lead message: "${leadMessage}". \nScore it from 0-100 based on conversion intent. \nProvide a short 1-sentence reasoning, then output ONLY the number at the very end.`;

    const response = await fetchImpl(ANYTHING_LLM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOCAL_LLM_KEY}`,
      },
      body: JSON.stringify({ message: prompt, mode: "chat" }),
    });

    if (!response.ok) {
      throw new Error(
        `AnythingLLM API responded with status: ${response.status} - ${await response.text()}`,
      );
    }

    const jsonResponse = (await response.json()) as {
      textResponse?: string;
      response?: string;
    };
    const rawText =
      jsonResponse?.textResponse || jsonResponse?.response || JSON.stringify(jsonResponse);

    const match = rawText.match(/\d+/g);
    if (!match) {
      return { ok: false, reasoning: `Scoring failed: no numeric score in model output` };
    }

    const score = Math.min(Math.max(parseInt(match[match.length - 1], 10), 0), 100);
    return {
      ok: true,
      score,
      reasoning: rawText.trim().replace(/\n/g, " ").slice(0, 200),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(
      `[PIS] Scoring failed (Ensure AnythingLLM is running on port 3001). Error:`,
      message,
    );
    return { ok: false, reasoning: `Scoring failed: ${message}` };
  }
}
