from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "postgresql://user:password@localhost:5432/job_analytics"
    adzuna_app_id: str = ""
    adzuna_app_key: str = ""
    gemini_api_key: str = ""
    jwt_secret: str = "change-me-generate-a-real-secret"
    frontend_origin: str = "http://localhost:5173"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()