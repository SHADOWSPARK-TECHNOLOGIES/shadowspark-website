from fastapi import FastAPI
from app.routers import health, chat

app = FastAPI(
    title="ShadowSpark AI Service",
    description="Python AI inference and model orchestration backend.",
    version="0.1.0",
)

app.include_router(health.router)
app.include_router(chat.router)
