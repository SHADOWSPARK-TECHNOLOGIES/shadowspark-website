import fs from "node:fs/promises";
import path from "node:path";
import "dotenv/config";
import FirecrawlApp from "@mendable/firecrawl-js";

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;

if (!FIRECRAWL_API_KEY) {
  console.error("Missing FIRECRAWL_API_KEY in environment");
  process.exit(1);
}

const fc = new FirecrawlApp({ apiKey: FIRECRAWL_API_KEY });

const TARGETS = [
  "https://www.chatbase.co/pricing",
  "https://www.intercom.com/pricing",
  "https://botpress.com/pricing"
];

async function main() {
  console.log(`[Competitor Scraper] Initiating Extraction Protocol...`);
  
  const outDir = path.join(process.cwd(), "data", "rag");
  await fs.mkdir(outDir, { recursive: true }).catch(() => {});

  let combinedIntel = "# COMPETITOR INTELLIGENCE & OBJECTION HANDLING\n\n";

  for (const url of TARGETS) {
    console.log(`\n> Scraping target: ${url}`);
    try {
      const response = await fc.extract([url], {
        prompt: "Extract the exact pricing plans, limitations of each plan, the core value proposition, and any sales objections they implicitly handle (e.g., 'no coding required', 'setup in 5 minutes').",
        schema: {
          type: "object",
          properties: {
             productName: { type: "string" },
             coreValueProp: { type: "string" },
             pricingTiers: { 
               type: "array", 
               items: { 
                 type: "object",
                 properties: {
                   name: { type: "string" },
                   price: { type: "string" },
                   limitations: { type: "array", items: { type: "string" } }
                 }
               } 
             },
             objectionsHandled: { type: "array", items: { type: "string" } },
          },
          required: ["productName", "pricingTiers"]
        }
      });

      if (!response.success || !response.data) {
        console.warn(`[!] Failed to extract from ${url}. Result:`, response);
        continue;
      }

      const intel = response.data;
      console.log(`[+] Captured Intel for: ${intel.productName || url}`);

      combinedIntel += `## ${intel.productName || 'Unknown Product'}\n`;
      combinedIntel += `**Core Value:** ${intel.coreValueProp || 'N/A'}\n\n`;
      combinedIntel += `### Pricing Tiers\n`;
      for (const tier of intel.pricingTiers || []) {
        combinedIntel += `- **${tier.name}**: ${tier.price}\n`;
        if (tier.limitations && tier.limitations.length > 0) {
          combinedIntel += `  - Limitations: ${tier.limitations.join(", ")}\n`;
        }
      }
      combinedIntel += `\n### Handled Objections\n`;
      for (const obj of intel.objectionsHandled || []) {
        combinedIntel += `- ${obj}\n`;
      }
      combinedIntel += `\n---\n\n`;

    } catch (error) {
      console.error(`[!] Error scraping ${url}:`, error);
    }
  }

  const intelPath = path.join(outDir, "competitor-intel.md");
  await fs.writeFile(intelPath, combinedIntel, "utf-8");
  console.log(`\n[SUCCESS] Intelligence compiled and saved to ${intelPath}`);
  console.log(`[NEXT STEP] Ensure this file is ingested into your RAG sync.`);
}

main().catch(console.error);
