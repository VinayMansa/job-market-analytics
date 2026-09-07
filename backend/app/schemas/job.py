from pydantic import BaseModel
from datetime import datetime


class JobOut(BaseModel):
    id: int
    title: str
    company: str | None = None
    location: str | None = None
    salary_min: float | None = None
    salary_max: float | None = None
    remote: str | None = None
    source: str
    url: str | None = None
    posted_at: datetime | None = None

    class Config:
        from_attributes = True


class JobListResponse(BaseModel):
    count: int
    results: list[JobOut]