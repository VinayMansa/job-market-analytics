from sqlalchemy.orm import Session

from app.models.profile import Profile
from app.schemas.profile import ProfileIn


def get_profile(db: Session, user_id: int) -> Profile | None:
    return db.query(Profile).filter(Profile.user_id == user_id).first()


def upsert_profile(db: Session, user_id: int, data: ProfileIn) -> Profile:
    profile = get_profile(db, user_id)

    if profile:
        for field, value in data.model_dump().items():
            setattr(profile, field, value)
    else:
        profile = Profile(user_id=user_id, **data.model_dump())
        db.add(profile)

    db.commit()
    db.refresh(profile)
    return profile