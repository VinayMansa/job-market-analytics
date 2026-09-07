from app.database import Base, engine
from app import models  # noqa: F401 — ensures models are registered

Base.metadata.create_all(bind=engine)
print("Tables created.")