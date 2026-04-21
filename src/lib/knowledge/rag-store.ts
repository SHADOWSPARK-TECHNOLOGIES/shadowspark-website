import fs from 'fs';
import path from 'path';

export interface KnowledgeChunk {
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
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as KnowledgeChunk[];
  } catch (e) {
    console.error('[RAG STORE] Failed to parse knowledge file', e);
    return [];
  }
}

export function detectIntent(query: string): 'pricing' | 'features' | 'limitations' {
  const q = query.toLowerCase();
  if (q.includes('price') || q.includes('cost') || q.includes('how much') || q.includes('$')) return 'pricing';
  if (q.includes('feature') || q.includes('what can') || q.includes('capabil') || q.includes('automate')) return 'features';
  return 'limitations';
}

function scoreChunk(chunk: KnowledgeChunk, query: string) {
  const qWords = query.toLowerCase().split(/\W+/).filter(Boolean);
  let score = 0;
  const t = chunk.text.toLowerCase();
  for (const w of qWords) {
    if (w.length < 3) continue;
    if (t.includes(w)) score += 1;
  }
  // boost if types match
  const intent = detectIntent(query);
  if (chunk.type === intent) score += 2;
  if (chunk.source !== 'unknown') score += 1;
  return score;
}

export function retrieveCompetitiveContext(query: string, max = 3): string {
  try {
    const data = loadData();
    if (data.length === 0) return '';
    const intent = detectIntent(query);

    const filtered = data.filter((c) => c.verified && c.type === intent);
    const scored = filtered
      .map((c) => ({ ...c, score: scoreChunk(c, query) }))
      .filter((c) => c.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, max);

    if (scored.length === 0) return '';

    // Return concise context: source, type, snippet
    return scored
      .map((c) => `Source: ${c.source} | Type: ${c.type}\n${c.text.trim().slice(0, 500)}${c.text.length > 500 ? '...' : ''}`)
      .join('\n\n');
  } catch (error) {
    console.error('[RAG STORE] retrieveCompetitiveContext error', error);
    return '';
  }
}
