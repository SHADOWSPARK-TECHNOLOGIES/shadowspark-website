import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { streamTextMock, googleModelMock } = vi.hoisted(() => ({
  streamTextMock: vi.fn(),
  googleModelMock: vi.fn((id: string) => ({ modelId: id })),
}));

vi.mock('ai', () => ({ streamText: streamTextMock }));
vi.mock('@ai-sdk/google', () => ({
  createGoogleGenerativeAI: () => googleModelMock,
}));
vi.mock('@/lib/knowledge/rag-store', () => ({
  retrieveCompetitiveContext: vi.fn(async () => ''),
}));
vi.mock('@/lib/rag/retrieve', () => ({
  retrieveRagContext: vi.fn(async () => null),
}));

import { POST } from '@/app/api/assistant/route';

function assistantRequest(): Request {
  return new Request('http://localhost/api/assistant', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: 'user', content: 'What does ShadowSpark do?' }],
    }),
  });
}

describe('POST /api/assistant model', () => {
  beforeEach(() => {
    vi.stubEnv('GEMINI_API_KEY', 'test-gemini');
    streamTextMock.mockReset();
    googleModelMock.mockClear();
    streamTextMock.mockResolvedValue({
      textStream: (async function* () {
        yield 'ok';
      })(),
    });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('calls Gemini with gemini-flash-latest', async () => {
    const res = await POST(assistantRequest());

    expect(res.status).toBe(200);
    expect(googleModelMock).toHaveBeenCalledWith('gemini-flash-latest');
    expect(googleModelMock).not.toHaveBeenCalledWith('gemini-2.5-flash');
    expect(streamTextMock).toHaveBeenCalledWith(
      expect.objectContaining({
        model: { modelId: 'gemini-flash-latest' },
      }),
    );
  });
});
