from fastapi import APIRouter

router = APIRouter(prefix="/api/jobs", tags=["jobs"])

_MOCK_JOBS = [
    {"id": 1, "title": "Backend Engineer", "company": "Acme Corp", "location": "Remote",
     "salary_min": 90000, "salary_max": 120000, "remote": "remote", "source": "adzuna"},
    {"id": 2, "title": "Data Analyst", "company": "Northwind", "location": "Dublin, IE",
     "salary_min": 55000, "salary_max": 70000, "remote": "hybrid", "source": "remotive"},
    {"id": 3, "title": "ML Engineer", "company": "Globex", "location": "Berlin, DE",
     "salary_min": 80000, "salary_max": 110000, "remote": "onsite", "source": "adzuna"},
]


@router.get("")
def list_jobs():
    return {"count": len(_MOCK_JOBS), "results": _MOCK_JOBS}