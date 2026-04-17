import { NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = 'force-dynamic';

const UniversalTargetSchema = z.object({
  source: z.enum(['apollo', 'builtwith', 'linkedin', 'local', 'manual']),
  domain: z.string().url(),
  companyName: z.string().min(2),
  decisionMaker: z.object({
    firstName: z.string().optional(),
    email: z.string().email().optional(),
    linkedinUrl: z.string().url().optional(),
  }).optional(),
  signal: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.INGEST_API_KEY}`) {
      return NextResponse.json({ error: "Unauthorized ingestion request" }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate against the Universal Schema
    const target = UniversalTargetSchema.parse(body);

    // TODO: Save to Prisma database (Phase 2.1)
    // TODO: Dispatch to Cloud Tasks for Firecrawl/Gemini analysis
    
    console.log(`[SNIPER INGEST] Target Locked: ${target.domain} (Source: ${target.source})`);
    if (target.decisionMaker?.email) {
       console.log(`[SNIPER INGEST] Contact acquired: ${target.decisionMaker.email}`);
    }

    return NextResponse.json({ 
      status: 'ingested', 
      domain: target.domain,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid target payload", details: error.flatten().fieldErrors }, { status: 400 });
    }
    console.error("[SNIPER INGEST ERROR]", error);
    return NextResponse.json({ error: "Internal server error during ingestion" }, { status: 500 });
  }
}
