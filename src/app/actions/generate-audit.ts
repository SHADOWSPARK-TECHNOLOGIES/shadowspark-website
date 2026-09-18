"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

export type MiniAuditResult = {
  recommendedPackage: string;
  headline: string;
  bullets: string[];
  usedFallback: boolean;
};

export function miniAuditFallback(): MiniAuditResult {
  return {
    recommendedPackage: "Growth",
    headline: "Example recommendation. The audit model is unavailable.",
    bullets: [
      "Automate initial lead qualification on WhatsApp.",
      "Implement a custom dashboard to track conversion metrics.",
      "Deploy 24/7 AI support nodes for sovereign operations.",
    ],
    usedFallback: true,
  };
}

export async function generateAuditAction(data: {
  businessType: string;
  goals: string;
  features: string[];
}): Promise<MiniAuditResult> {
  const prompt = `
    You are ShadowSpark's audit engine. 
    Analyze this business:
    Type: ${data.businessType}
    Goals: ${data.goals}
    Desired Features: ${data.features.join(", ")}

    Recommend one of our packages: Launch, Growth, or Automation.
    Provide 3-4 specific, actionable bullet points tailored to this industry to optimize their operations using AI and high-performance web systems.
    
    Output strictly as JSON in this format:
    {
      "recommendedPackage": "Package Name",
      "headline": "Personalized Headline",
      "bullets": ["bullet 1", "bullet 2", "bullet 3"]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonStr = text.match(/\{[\s\S]*\}/)?.[0] || text;
    const parsed = JSON.parse(jsonStr) as Omit<MiniAuditResult, "usedFallback">;
    if (!parsed.headline || !Array.isArray(parsed.bullets)) {
      return miniAuditFallback();
    }
    return { ...parsed, usedFallback: false };
  } catch (error) {
    console.error("AI Audit failed:", error);
    return miniAuditFallback();
  }
}
