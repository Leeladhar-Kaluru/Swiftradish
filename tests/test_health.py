from fastapi.testclient import TestClient

from swiftradish_api.app import create_app
from swiftradish_api.settings import Settings


def _client() -> TestClient:
    settings = Settings(_env_file=None, frontend_origins="http://localhost:3000")
    return TestClient(create_app(settings))


def test_health_does_not_require_a_database() -> None:
    response = _client().get("/api/v1/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_health_allows_the_configured_frontend_origin() -> None:
    response = _client().get(
        "/api/v1/health",
        headers={"Origin": "http://localhost:3000"},
    )

    assert response.headers["access-control-allow-origin"] == "http://localhost:3000"


def test_health_does_not_reflect_an_unknown_origin() -> None:
    response = _client().get(
        "/api/v1/health",
        headers={"Origin": "https://example.invalid"},
    )

    assert response.headers.get("access-control-allow-origin") is None
