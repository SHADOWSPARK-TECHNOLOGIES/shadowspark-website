from fastapi import APIRouter, HTTPException, Header
from app.models import ChatCompletionRequest, ChatCompletionResponse
from app.services.moonshot import MoonshotClient
from app.config import settings

router = APIRouter(prefix="/v1/chat", tags=["chat"])


def _require_api_key(x_api_key: str | None) -> None:
    if not settings.api_key:
        return
    if not x_api_key or x_api_key != settings.api_key:
        raise HTTPException(status_code=401, detail="Invalid or missing API key")


@router.post("/completions", response_model=ChatCompletionResponse)
async def chat_completions(
    body: ChatCompletionRequest,
    x_api_key: str | None = Header(None, alias="x-api-key"),
) -> ChatCompletionResponse:
    _require_api_key(x_api_key)
    client = MoonshotClient(
        api_key=settings.moonshot_api_key,
        base_url=settings.moonshot_base_url,
        default_model=settings.moonshot_model,
        timeout=settings.request_timeout_seconds,
    )
    return await client.complete(body)
