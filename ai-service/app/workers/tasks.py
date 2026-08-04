from celery import Celery
from app.config import settings

celery_app = Celery(
    "shadowspark_ai",
    broker=settings.redis_url,
    backend=settings.redis_url,
)


@celery_app.task(bind=True, max_retries=3)
def process_ai_job(self, job_type: str, payload: dict) -> dict:
    try:
        if job_type == "summarize":
            return {"status": "ok", "result": f"summarized: {payload.get('text', '')[:80]}"}
        return {"status": "ignored", "reason": "unknown job_type"}
    except Exception as exc:
        raise self.retry(exc=exc, countdown=2 ** self.request.retries)
