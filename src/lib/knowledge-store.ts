import fs from 'fs/promises';
import path from 'path';

const KNOWLEDGE_PATH = path.join(process.cwd(), 'data/knowledge.json');

export async function getKnowledgeBase() {
  try {
    const data = await fs.readFile(KNOWLEDGE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { lastUpdated: null, documents: [] };
  }
}

export async function searchChunks(query: string): Promise<string[]> {
  // Simple keyword search – replace with embeddings later
  const kb = await getKnowledgeBase();
  const allChunks = kb.documents.flatMap((doc: any) => doc.chunks);
  const queryTerms = query.toLowerCase().split(/\s+/);
  return allChunks.filter((chunk: string) =>
    queryTerms.some(term => chunk.toLowerCase().includes(term))
  ).slice(0, 5);
}
