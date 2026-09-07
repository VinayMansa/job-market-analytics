from pydantic import BaseModel


class RemoteBreakdown(BaseModel):
    remote: int
    hybrid: int
    onsite: int
    unknown: int


class LocationCount(BaseModel):
    location: str
    count: int


class StatsOut(BaseModel):
    total_jobs: int
    avg_salary_min: float | None
    avg_salary_max: float | None
    remote_breakdown: RemoteBreakdown
    top_locations: list[LocationCount]