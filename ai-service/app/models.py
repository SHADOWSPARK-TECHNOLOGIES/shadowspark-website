from typing import Literal
from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    role: Literal["system", "user", "assistant"] = "user"
    content: str


class ChatCompletionRequest(BaseModel):
    messages: list[ChatMessage] = Field(..., min_length=1)
    model: str | None = None
    temperature: float = Field(0.7, ge=0.0, le=2.0)
    max_tokens: int | None = Field(None, ge=1)


class ChatCompletionResponse(BaseModel):
    reply: str
    model: str
    usage: dict | None = None


class HealthResponse(BaseModel):
    status: str
    version: str = "0.1.0"
