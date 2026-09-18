import { Worker } from "bullmq";
import { redis } from "../lib/redis";
import { prisma } from "../lib/prisma";
import { qualifyLead, statusFromIntentAnalysis } from "../lib/leads/qualification";
import { analyzeLeadIntent } from "../lib/scoring/intent-analysis";

async function triggerApexLeadActions(
  leadData: { phone?: string; phoneNumber?: string },
  score: number,
) {
  console.log(`\n[WARLORD TRIGGER] 🚀 APEX LEAD DETECTED! Score: ${score}`);
  console.log(`[WARLORD TRIGGER] Routing lead ${leadData.phone || leadData.phoneNumber} to immediate operator escalation pipeline.\n`);
}

export const leadWorker = new Worker(
  "lead-sync-queue",
  async (job) => {
    // Accommodating both 'message' and 'lastMessage' payload structures
    const { phone, name, businessType, goals, source, intent, message, lastMessage } = job.data;
    const leadMessage = message || lastMessage || goals || "";

    console.log(`[SES] Processing lead: ${phone} from ${source}`);

    // 1. PIS (Predictive Intent Scoring) via Local AnythingLLM
    const analysis = await analyzeLeadIntent(leadMessage);
    const scored = statusFromIntentAnalysis(analysis, intent);
    const finalScore = scored.leadScore;

    // 2. Perform Database Upsert — AI-unavailable must not write QUALIFIED
    const lead = await prisma.lead.upsert({
      where: { phoneNumber: phone },
      update: {
        lastMessage: `Sync from ${source || "external chatbot"}`,
        miniAuditData: {
          name,
          businessType,
          goals,
          source,
          originalMessage: leadMessage,
          reasoning: analysis.reasoning,
          scoringOk: analysis.ok,
        },
        status: scored.status,
        intent: intent || undefined,
        ...(finalScore == null ? {} : { leadScore: finalScore }),
      },
      create: {
        phoneNumber: phone,
        status: scored.status,
        intent: intent || "SYNC",
        leadScore: finalScore,
        lastMessage: `Initial sync from ${source || "external chatbot"}`,
        miniAuditData: {
          name,
          businessType,
          goals,
          source,
          originalMessage: leadMessage,
          reasoning: analysis.reasoning,
          scoringOk: analysis.ok,
        },
      },
    });

    // 3. SES Logic: Execute 'Warlord' Trigger if "High-Intent"
    const isQualified = qualifyLead(lead);

    if (analysis.ok && (isQualified || (finalScore ?? 0) > 85)) {
      await triggerApexLeadActions(job.data, finalScore ?? 0);
    }

    return { success: true, leadId: lead.id, score: finalScore, status: scored.status };
  },
  { connection: redis }
);

leadWorker.on("completed", (job, result) => {
  console.log(`[SES] Job ${job.id} completed. Lead Score: ${result?.score}`);
});

leadWorker.on("failed", (job, err) => {
  console.error(`[SES] Job ${job?.id} failed: ${err.message}`);
});
