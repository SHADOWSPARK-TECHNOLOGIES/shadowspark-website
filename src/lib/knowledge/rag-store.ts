import fs from 'fs';
import path from 'path';

interface KnowledgeChunk {
  url: string;
  text: string;
  chunkId: number;
  source: string;
  type: 'pricing' | 'features' | 'limitations';
  verified: boolean;
}

function loadData(): KnowledgeChunk[] {
  const filePath = path.join(process.cwd(), 'data', 'firecrawl-knowledge.json');
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function detectIntent(query: string): 'pricing' | 'features' | 'limitations' {
  const q = query.toLowerCase();
  if (q.includes('price') || q.includes('cost') || q.includes('how much')) return 'pricing';
  if (q.includes('feature') || q.includes('what can') || q.includes('capability')) return 'features';
  return 'limitations';
}

export function retrieveCompetitiveContext(query: string): string {
  try {
    const data = loadData();
    const intent = detectIntent(query);

    const filtered = data
      .filter((c: KnowledgeChunk) => c.verified)
      .filter((c: KnowledgeChunk) => c.type === intent);

    const scored = filtered.map((chunk: KnowledgeChunk) => {
      let score = 0;
      query.split(/\W+/).forEach((word) => {
        if (word.length > 2 && chunk.text.toLowerCase().includes(word.toLowerCase())) score++;
      });
      return { ...chunk, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

    if (scored.length === 0) return '';
    return scored.map((c: any) => c.text).join('\n\n');
  } catch (error) {
    console.error('[RAG STORE ERROR]', error);
    return '';
  }
}
