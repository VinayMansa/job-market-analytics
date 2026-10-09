from pydantic import BaseModel


class ProfileIn(BaseModel):
    headline: str | None = None
    skills: str | None = None  # comma-separated, e.g. "Python, React, SQL"
    experience_level: str | None = None
    preferred_location: str | None = None
    open_to_remote: bool = True
    desired_salary_min: float | None = None
    desired_salary_max: float | None = None
    resume_text: str | None = None


class ProfileOut(ProfileIn):
    id: int
    user_id: int

    class Config:
        from_attributes = True