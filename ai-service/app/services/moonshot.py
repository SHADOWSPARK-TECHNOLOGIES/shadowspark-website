import httpx
from app.models import ChatCompletionRequest, ChatCompletionResponse


class MoonshotClient:
    def __init__(
        self,
        api_key: str,
        base_url: str = "https://api.moonshot.cn/v1",
        default_model: str = "moonshot-v1-8k",
        timeout: float = 30.0,
    ):
        self.api_key = api_key
        self.base_url = base_url.rstrip("/")
        self.default_model = default_model
        self.timeout = timeout

    async def complete(self, request: ChatCompletionRequest) -> ChatCompletionResponse:
        if not self.api_key:
            raise RuntimeError("MOONSHOT_API_KEY is not configured")
        model = request.model or self.default_model
        payload = {
            "model": model,
            "messages": [m.model_dump() for m in request.messages],
            "temperature": request.temperature,
        }
        if request.max_tokens is not None:
            payload["max_tokens"] = request.max_tokens

        async with httpx.AsyncClient(timeout=self.timeout) as client:
            response = await client.post(
                f"{self.base_url}/chat/completions",
                headers={
                    "Authorization": f"Bearer {self.api_key}",
                    "Content-Type": "application/json",
                },
                json=payload,
            )
            response.raise_for_status()
            data = response.json()

        choice = data.get("choices", [{}])[0]
        message = choice.get("message", {})
        return ChatCompletionResponse(
            reply=message.get("content", ""),
            model=model,
            usage=data.get("usage"),
        )
