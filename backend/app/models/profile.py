from datetime import datetime
from sqlalchemy import String, Numeric, DateTime, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.database import Base


class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True, index=True, nullable=False)

    headline: Mapped[str | None] = mapped_column(String)  # e.g. "Backend Engineer, 4 yrs"
    skills: Mapped[str | None] = mapped_column(Text)  # comma-separated for now
    experience_level: Mapped[str | None] = mapped_column(String)  # junior | mid | senior | lead
    preferred_location: Mapped[str | None] = mapped_column(String)
    open_to_remote: Mapped[bool] = mapped_column(default=True)
    desired_salary_min: Mapped[float | None] = mapped_column(Numeric)
    desired_salary_max: Mapped[float | None] = mapped_column(Numeric)
    resume_text: Mapped[str | None] = mapped_column(Text)  # pasted resume text, for now

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )