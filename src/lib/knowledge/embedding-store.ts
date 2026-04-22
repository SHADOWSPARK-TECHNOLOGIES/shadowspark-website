import { prisma } from '@/lib/prisma';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: 'text-embedding-004' }) : null;

export async function semanticSearch(query: string, limit: number = 5): Promise<string[]> {
  try {
    if (!model) throw new Error('No embedding model available');
    const embedResult = await model.embedContent(query);
    const vector = embedResult.embedding.values;
    const vectorStr = `[${vector.join(',')}]`;

    const results = await prisma.$queryRaw<any[]>`
      SELECT text, source, type,
             1 - (embedding <=> ${vectorStr}::vector) AS similarity
      FROM "KnowledgeEmbedding"
      ORDER BY similarity DESC
      LIMIT ${limit}
    `;
    return results.map(r => `[Source: ${r.source} | ${r.type}]\n${r.text}`);
  } catch (e) {
    console.error('[Semantic search error]', e);
    return [];
  }
}
