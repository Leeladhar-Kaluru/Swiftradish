"""FastAPI application factory.

The health route does not open a database connection or read storage credentials.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from swiftradish_api.settings import Settings


def create_app(settings: Settings | None = None) -> FastAPI:
    active = settings if settings is not None else Settings()
    app = FastAPI(title=active.app_name)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=active.allowed_origins,
        allow_credentials=False,
        allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["Authorization", "Content-Type"],
    )

    @app.get(f"{active.api_v1_prefix}/health")
    def health() -> dict[str, str]:
        return {"status": "ok"}

    return app


app = create_app()
