import fs from 'fs/promises';
import path from 'path';
import { prisma } from '../src/lib/prisma.ts';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '');
const embeddingModel = genAI.getGenerativeModel({ model: 'text-embedding-004' });

interface ChunkData {
  source: string;
  url: string;
  pageType: string;
  chunkIndex: number;
  content: string;
}

async function generateVector(text: string): Promise<number[]> {
  const result = await embeddingModel.embedContent(text);
  return result.embedding.values;
}

async function main() {
  if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
    console.warn('⚠️ GEMINI_API_KEY is not set. Looking in .env.local...');
  }

  console.log('🚀 Starting embedding generation with Gemini...');
  const filePath = path.join(process.cwd(), 'data', 'firecrawl-knowledge.json');
  const fileData = await fs.readFile(filePath, 'utf-8');
  const chunks: ChunkData[] = JSON.parse(fileData);
  let successCount = 0;

  for (const chunk of chunks) {
    try {
      console.log(`Embedding chunk ${chunk.chunkIndex} from ${chunk.source} (${chunk.url})...`);
      const vector = await generateVector(chunk.content);
      const vectorString = `[${vector.join(',')}]`;

      await prisma.$executeRaw`
        INSERT INTO "KnowledgeEmbedding" (id, source, url, "pageType", "chunkIndex", content, embedding, "createdAt", "updatedAt")
        VALUES (gen_random_uuid(), ${chunk.source}, ${chunk.url}, ${chunk.pageType}, ${chunk.chunkIndex}, ${chunk.content}, ${vectorString}::vector, NOW(), NOW())
        ON CONFLICT (id) DO NOTHING;
      `;
      successCount++;
    } catch (err: any) {
      console.error(`❌ Failed on ${chunk.url}:`, err.message);
      if (err.message.includes('API key')) {
        console.error('Stoping: API key missing or invalid.');
        process.exit(1);
      }
    }
    // Rate limit: 1 second between calls
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log(`\n✅ Migration complete. Inserted ${successCount} embeddings.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
