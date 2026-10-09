from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.profile import ProfileIn, ProfileOut
from app.services import profile_service
from app.core.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/api/profile", tags=["profile"])


@router.get("", response_model=ProfileOut)
def read_profile(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    profile = profile_service.get_profile(db, current_user.id)
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No profile set up yet")
    return profile


@router.put("", response_model=ProfileOut)
def update_profile(
    data: ProfileIn,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return profile_service.upsert_profile(db, current_user.id, data)