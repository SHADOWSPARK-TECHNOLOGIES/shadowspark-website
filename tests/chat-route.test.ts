import type { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { generateTextMock, googleModelMock } = vi.hoisted(() => ({
  generateTextMock: vi.fn(),
  googleModelMock: vi.fn((id: string) => ({ modelId: id })),
}));

vi.mock('ai', () => ({ generateText: generateTextMock }));
vi.mock('@ai-sdk/google', () => ({
  createGoogleGenerativeAI: () => googleModelMock,
}));

import { POST } from '@/app/api/chat/route';

function chatRequest(): NextRequest {
  return new Request('http://localhost/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'user', content: 'What does ShadowSpark do?' }] }),
  }) as unknown as NextRequest;
}

describe('POST /api/chat provider selection', () => {
  beforeEach(() => {
    vi.stubEnv('GEMINI_API_KEY', '');
    vi.stubEnv('XAI_API_KEY', '');
    vi.stubEnv('ANTHROPIC_API_KEY', '');
    generateTextMock.mockReset();
    googleModelMock.mockClear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it('returns "Server not configured" when no provider key is set', async () => {
    const res = await POST(chatRequest());
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: 'Server not configured' });
  });

  it('prefers Gemini when GEMINI_API_KEY is set', async () => {
    vi.stubEnv('GEMINI_API_KEY', 'test-gemini');
    vi.stubEnv('XAI_API_KEY', 'test-xai');
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    generateTextMock.mockResolvedValue({ text: 'Gemini reply' });

    const res = await POST(chatRequest());
    expect(await res.json()).toEqual({ reply: 'Gemini reply' });
    expect(googleModelMock).toHaveBeenCalledWith('gemini-flash-latest');
    expect(googleModelMock).not.toHaveBeenCalledWith('gemini-2.5-flash');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('uses xAI when only XAI_API_KEY is set', async () => {
    vi.stubEnv('XAI_API_KEY', 'test-xai');
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ choices: [{ message: { content: 'Grok reply' } }] }), { status: 200 })
    );
    vi.stubGlobal('fetch', fetchMock);

    const res = await POST(chatRequest());
    expect(await res.json()).toEqual({ reply: 'Grok reply' });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.x.ai/v1/chat/completions');
    const body = JSON.parse(init.body);
    expect(body.messages[0].role).toBe('system');
    expect(body.messages[1]).toEqual({ role: 'user', content: 'What does ShadowSpark do?' });
    expect(generateTextMock).not.toHaveBeenCalled();
  });

  it('falls back to Anthropic when only ANTHROPIC_API_KEY is set', async () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'test-anthropic');
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ content: [{ type: 'text', text: 'Claude reply' }] }), { status: 200 })
    );
    vi.stubGlobal('fetch', fetchMock);

    const res = await POST(chatRequest());
    expect(await res.json()).toEqual({ reply: 'Claude reply' });
    expect(fetchMock.mock.calls[0][0]).toBe('https://api.anthropic.com/v1/messages');
  });
});
