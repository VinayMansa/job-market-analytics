from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models.job import Job


def list_jobs(
    db: Session,
    search: str | None = None,
    location: str | None = None,
    remote: str | None = None,
    limit: int = 20,
    offset: int = 0,
) -> tuple[list[Job], int]:
    query = db.query(Job)

    if search:
        query = query.filter(
            or_(Job.title.ilike(f"%{search}%"), Job.company.ilike(f"%{search}%"))
        )
    if location:
        query = query.filter(Job.location.ilike(f"%{location}%"))
    if remote:
        query = query.filter(Job.remote == remote)

    total = query.count()
    results = query.order_by(Job.posted_at.desc().nullslast()).offset(offset).limit(limit).all()
    return results, total