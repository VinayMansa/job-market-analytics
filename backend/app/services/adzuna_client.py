import httpx

from app.config import settings

BASE_URL = "https://api.adzuna.com/v1/api/jobs"


def fetch_jobs(country: str = "gb", what: str = "software engineer", results_per_page: int = 20, page: int = 1) -> list[dict]:
    """Fetch a page of raw job listings from Adzuna's search endpoint."""
    url = f"{BASE_URL}/{country}/search/{page}"
    params = {
        "app_id": settings.adzuna_app_id,
        "app_key": settings.adzuna_app_key,
        "what": what,
        "results_per_page": results_per_page,
        "content-type": "application/json",
    }
    response = httpx.get(url, params=params, timeout=15)
    response.raise_for_status()
    return response.json().get("results", [])