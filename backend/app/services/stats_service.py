from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.job import Job
from app.schemas.stats import StatsOut, RemoteBreakdown, LocationCount


def get_stats(db: Session) -> StatsOut:
    total_jobs = db.query(func.count(Job.id)).scalar() or 0

    avg_min = db.query(func.avg(Job.salary_min)).filter(Job.salary_min.isnot(None)).scalar()
    avg_max = db.query(func.avg(Job.salary_max)).filter(Job.salary_max.isnot(None)).scalar()

    remote_counts_raw = db.query(Job.remote, func.count(Job.id)).group_by(Job.remote).all()
    remote_counts: dict[str | None, int] = {remote: count for remote, count in remote_counts_raw}

    top_locations_raw = (
        db.query(Job.location, func.count(Job.id).label("count"))
        .filter(Job.location.isnot(None))
        .group_by(Job.location)
        .order_by(func.count(Job.id).desc())
        .limit(8)
        .all()
    )

    remote_breakdown = RemoteBreakdown(
        remote=remote_counts.get("remote", 0),
        hybrid=remote_counts.get("hybrid", 0),
        onsite=remote_counts.get("onsite", 0),
        unknown=remote_counts.get("unknown", 0),
    )

    top_locations = [
        LocationCount(location=loc, count=cnt) for loc, cnt in top_locations_raw
    ]

    return StatsOut(
        total_jobs=total_jobs,
        avg_salary_min=float(avg_min) if avg_min else None,
        avg_salary_max=float(avg_max) if avg_max else None,
        remote_breakdown=remote_breakdown,
        top_locations=top_locations,
    )