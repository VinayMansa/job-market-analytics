from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.job import JobListResponse, JobOut
from app.services import job_service

router = APIRouter(prefix="/api/jobs", tags=["jobs"])


@router.get("", response_model=JobListResponse)
def list_jobs(
    search: str | None = None,
    location: str | None = None,
    remote: str | None = None,
    limit: int = Query(20, le=100),
    offset: int = 0,
    db: Session = Depends(get_db),
):
    results, total = job_service.list_jobs(db, search, location, remote, limit, offset)
    return JobListResponse(
        count=total,
        results=[JobOut.model_validate(job) for job in results],
    )