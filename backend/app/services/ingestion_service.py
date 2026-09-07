from datetime import datetime
from sqlalchemy.orm import Session

from app.models.job import Job


def normalize_adzuna_job(raw: dict) -> dict:
    """Map Adzuna's raw JSON shape onto our Job model's fields."""
    salary_min = raw.get("salary_min")
    salary_max = raw.get("salary_max")

    posted_at = None
    if raw.get("created"):
        try:
            posted_at = datetime.fromisoformat(raw["created"].replace("Z", "+00:00"))
        except ValueError:
            posted_at = None

    return {
        "external_id": str(raw["id"]),
        "source": "adzuna",
        "title": raw.get("title", "").strip(),
        "company": (raw.get("company") or {}).get("display_name"),
        "location": (raw.get("location") or {}).get("display_name"),
        "description": raw.get("description"),
        "salary_min": salary_min,
        "salary_max": salary_max,
        "remote": "unknown",  # Adzuna doesn't give this directly; refine later
        "url": raw.get("redirect_url"),
        "posted_at": posted_at,
    }


def upsert_jobs(db: Session, normalized_jobs: list[dict]) -> tuple[int, int]:
    """Insert new jobs, skip ones we already have. Returns (inserted, skipped)."""
    inserted = 0
    skipped = 0

    for job_data in normalized_jobs:
        exists = db.query(Job).filter(Job.external_id == job_data["external_id"]).first()
        if exists:
            skipped += 1
            continue

        job = Job(**job_data)
        db.add(job)
        inserted += 1

    db.commit()
    return inserted, skipped