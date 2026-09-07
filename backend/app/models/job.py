from sqlalchemy import Column, Integer, String, Numeric, DateTime, Text
from sqlalchemy.sql import func

from app.database import Base


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    external_id = Column(String, unique=True, index=True, nullable=False)
    source = Column(String, nullable=False)
    title = Column(String, nullable=False, index=True)
    company = Column(String, index=True)
    location = Column(String, index=True)
    description = Column(Text)
    salary_min = Column(Numeric)
    salary_max = Column(Numeric)
    remote = Column(String)
    url = Column(String)
    posted_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    extracted_skills = Column(Text)
    seniority = Column(String)