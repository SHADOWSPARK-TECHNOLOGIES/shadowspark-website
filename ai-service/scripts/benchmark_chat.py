import asyncio
import time
from app.services.moonshot import MoonshotClient
from app.models import ChatCompletionRequest, ChatMessage


async def main():
    client = MoonshotClient(
        api_key="dummy-key-for-benchmark",
        default_model="moonshot-v1-8k",
    )
    request = ChatCompletionRequest(
        messages=[ChatMessage(role="user", content="Hello, benchmark.")]
    )

    iterations = 10000
    start = time.perf_counter()
    for _ in range(iterations):
        # Exclude actual HTTP by measuring serialization only
        request.model_dump_json()
    elapsed = (time.perf_counter() - start) * 1000
    print(f"Serialization iterations: {iterations}")
    print(f"Total: {elapsed:.2f} ms")
    print(f"Per iteration: {elapsed / iterations * 1000:.3f} µs")


if __name__ == "__main__":
    asyncio.run(main())
