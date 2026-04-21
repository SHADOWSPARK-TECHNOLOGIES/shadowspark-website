import FirecrawlApp from '@mendable/firecrawl-js';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Configuration
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '../data/knowledge.json');
const TARGET_URLS = [
  'https://docs.shadowspark.ai',      // Replace with actual targets
  'https://shadowspark.ai/pricing',
  'https://shadowspark.ai/features',
];
const MAX_CHUNK_SIZE = 500; // words

// Firecrawl client
const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY! });

interface Document {
  url: string;
  title: string;
  chunks: string[];
  metadata: {
    source: string;
    crawledAt: string;
  };
}

interface KnowledgeBase {
  lastUpdated: string;
  documents: Document[];
}

function cleanHtml(html: string): string {
  // Basic cleanup – in production use cheerio or similar
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function chunkText(text: string, maxWords: number): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += maxWords - 50) {
    const chunk = words.slice(i, i + maxWords).join(' ');
    if (chunk.length > 50) chunks.push(chunk);
  }
  return chunks;
}

export async function crawlAndProcess(): Promise<void> {
  console.log(`Starting crawl of ${TARGET_URLS.length} URLs...`);
  
  // Step 1: Map URLs (get all pages under each target)
  const allUrls: string[] = [];
  for (const baseUrl of TARGET_URLS) {
    try {
      const mapResult = await app.mapUrl(baseUrl);
      if (mapResult.success && mapResult.links) {
        allUrls.push(...mapResult.links);
        console.log(`Mapped ${baseUrl}: found ${mapResult.links.length} links`);
      }
    } catch (err) {
      console.warn(`Map failed for ${baseUrl}:`, err);
      allUrls.push(baseUrl); // fallback to just the base
    }
  }

  // Deduplicate
  const uniqueUrls = [...new Set(allUrls)];
  console.log(`Total unique URLs to scrape: ${uniqueUrls.length}`);

  // Step 2: Scrape each URL
  const documents: Document[] = [];
  for (const url of uniqueUrls) {
    try {
      const scrapeResult = await app.scrapeUrl(url, { formats: ['markdown', 'html'] });
      if (!scrapeResult.success) {
        console.warn(`Scrape failed for ${url}:`, scrapeResult.error);
        continue;
      }

      const rawContent = scrapeResult.markdown || scrapeResult.html || '';
      const cleaned = cleanHtml(rawContent);
      const chunks = chunkText(cleaned, MAX_CHUNK_SIZE);
      
      // Extract title from HTML if available
      let title = url;
      if (scrapeResult.html) {
        const titleMatch = scrapeResult.html.match(/<title[^>]*>([^<]+)<\/title>/i);
        if (titleMatch) title = titleMatch[1].trim();
      }

      documents.push({
        url,
        title,
        chunks,
        metadata: {
          source: 'firecrawl',
          crawledAt: new Date().toISOString(),
        },
      });

      console.log(`✓ Scraped ${url} – ${chunks.length} chunks`);
      
      // Polite delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      console.error(`Error processing ${url}:`, err);
    }
  }

  // Step 3: Write to JSON
  const knowledgeBase: KnowledgeBase = {
    lastUpdated: new Date().toISOString(),
    documents,
  };

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(knowledgeBase, null, 2));
  console.log(`Knowledge base saved to ${OUTPUT_PATH} (${documents.length} docs)`);
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  crawlAndProcess().catch(console.error);
}
