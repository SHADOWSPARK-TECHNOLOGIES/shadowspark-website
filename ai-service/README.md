# ShadowSpark AI Service

Python FastAPI backend for heavy AI inference, async model jobs, and partner-facing model orchestration. Complements the Next.js/Vercel marketing and rewards platform.

## Stack
- **FastAPI** + **Pydantic v2** — typed APIs and validation
- **Uvicorn** — ASGI server
- **HTTPX** — async HTTP client with retries
- **Celery** + **Redis** — background task queue (or Modal distributed queue in serverless mode)
- **Moonshot AI** — primary LLM provider

## Quick start

```bash
cd ai-service
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# edit .env with your keys
uvicorn app.main:app --reload
```

## Routes
- `GET /health` — service health
- `POST /v1/chat/completions` — Moonshot AI chat completion
- `POST /v1/webhooks/{provider}` — inbound webhooks with HMAC verification

## Tests
```bash
pytest
```

## Deployment

Target platform: **Modal**.

1. Install the Modal CLI and authenticate:
   ```bash
   pip install modal
   modal token new
   ```
2. Create a Modal secret named `shadowspark-ai` with your environment variables.
3. Deploy:
   ```bash
   modal deploy modal_app.py
   ```
