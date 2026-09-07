from app.database import SessionLocal
from app.services.adzuna_client import fetch_jobs
from app.services.ingestion_service import normalize_adzuna_job, upsert_jobs

# A handful of searches to build a reasonably varied dataset.
# Extend this list as you go — each entry is (country, search term).
SEARCHES = [
    ("gb", "software engineer"),
    ("gb", "data analyst"),
    ("gb", "product manager"),
    ("us", "backend engineer"),
]


def run():
    db = SessionLocal()
    total_inserted = 0
    total_skipped = 0

    try:
        for country, term in SEARCHES:
            print(f"Fetching '{term}' in {country}...")
            raw_jobs = fetch_jobs(country=country, what=term, results_per_page=20)
            normalized = [normalize_adzuna_job(j) for j in raw_jobs]
            inserted, skipped = upsert_jobs(db, normalized)
            total_inserted += inserted
            total_skipped += skipped
            print(f"  inserted={inserted} skipped={skipped}")
    finally:
        db.close()

    print(f"\nDone. Total inserted={total_inserted}, skipped={total_skipped}")


if __name__ == "__main__":
    run()