export async function requireEmbeddingProvider(
  embed: (text: string) => Promise<number[]>,
): Promise<number[]> {
  const vector = await embed("availability-probe");
  if (!Array.isArray(vector) || vector.length === 0) {
    throw new Error("Embedding provider preflight failed: empty vector");
  }
  return vector;
}
