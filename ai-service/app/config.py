from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    moonshot_api_key: str = ""
    moonshot_base_url: str = "https://api.moonshot.cn/v1"
    moonshot_model: str = "moonshot-v1-8k"

    webhook_secret_github: str = ""
    webhook_secret_vercel: str = ""
    webhook_secret_meta: str = ""

    redis_url: str = "redis://localhost:6379/0"
    api_key: str = ""

    request_timeout_seconds: float = 30.0


settings = Settings()
