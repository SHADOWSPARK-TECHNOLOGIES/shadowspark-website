import fs from 'fs';
import path from 'path';

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY || '';
const TARGET_URLS = [
  'https://www.intercom.com/pricing',
  'https://www.zendesk.com/pricing',
  'https://www.drift.com/pricing'
];

function getSourceFromUrl(url: string): string {
  if (url.includes('intercom')) return 'intercom';
  if (url.includes('zendesk')) return 'zendesk';
  if (url.includes('drift')) return 'drift';
  return 'unknown';
}

function classifyChunk(text: string): 'pricing' | 'features' | 'limitations' {
  const t = text.toLowerCase();
  if (t.includes('price') || t.includes('$') || t.includes('cost')) return 'pricing';
  if (t.includes('feature') || t.includes('automation') || t.includes('capability')) return 'features';
  return 'limitations';
}

function isSafe(text: string): boolean {
  const banned = ['extremely', 'worst', 'terrible', 'destroy', 'crush', 'awful', 'horrible'];
  return !banned.some(word => text.toLowerCase().includes(word));
}

async function runCrawler() {
  console.log("🔥 Starting Firecrawl Competitor Intelligence Gather...");
  if (!FIRECRAWL_API_KEY) {
    console.warn("⚠️ FIRECRAWL_API_KEY not found in .env. Using mock data generation.");
    return;
  }

  const results: any[] = [];
  let chunkId = 1;

  for (const url of TARGET_URLS) {
    console.log(`Scraping: ${url}`);
    try {
      const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${FIRECRAWL_API_KEY}`
        },
        body: JSON.stringify({ url, formats: ['markdown'], onlyMainContent: true })
      });
      
      const data = await response.json();
      if (data.success && data.data.markdown) {
        const chunks = data.data.markdown.split('\n\n').filter((c: string) => c.length > 50);
        for (const text of chunks) {
          results.push({
            url,
            text,
            chunkId: chunkId++,
            source: getSourceFromUrl(url),
            type: classifyChunk(text),
            verified: isSafe(text)
          });
        }
      }
    } catch (e) {
      console.error(`Failed to scrape ${url}`, e);
    }
  }

  const outputPath = path.join(process.cwd(), 'data', 'firecrawl-knowledge.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`✅ Successfully saved ${results.length} intelligence chunks to ${outputPath}`);
}

runCrawler();