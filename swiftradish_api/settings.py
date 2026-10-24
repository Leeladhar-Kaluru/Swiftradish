"""Application settings.

Startup reads ``backend/.env`` when that file exists. Database, JWKS, and
Backblaze values are ignored until a later phase turns those features on.
"""

from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

ROOT = Path(__file__).resolve().parents[1]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=ROOT / "backend" / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "Swiftradish API"
    app_env: str = "development"
    log_level: str = "info"
    api_v1_prefix: str = "/api/v1"
    frontend_origins: str = "http://localhost:3000"

    @property
    def allowed_origins(self) -> list[str]:
        return [origin.strip() for origin in self.frontend_origins.split(",") if origin.strip()]
