from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "OpsGenieX"
    
    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost/opsgenieX"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # Security
    SECRET_KEY: str = "your-secret-key-here"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    ALLOWED_HOSTS: List[str] = ["http://localhost:3000", "http://localhost:8000"]
    
    # Machine Learning Options
    AZURE_ML_ENABLED: bool = False
    AZURE_ML_WORKSPACE: str = ""
    AZURE_ML_SUBSCRIPTION_ID: str = ""
    AZURE_ML_RESOURCE_GROUP: str = ""
    
    # Local ML
    LOCAL_ML_ENABLED: bool = True
    ML_MODEL_PATH: str = "/app/models/"
    
    # Google Gemini AI
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-1.5-flash"
    GEMINI_MAX_TOKENS: int = 1000
    GEMINI_TEMPERATURE: float = 0.3
    
    # ServiceNow Integration
    SERVICENOW_INSTANCE: str = ""
    SERVICENOW_USERNAME: str = ""
    SERVICENOW_PASSWORD: str = ""
    
    # SCCM Integration
    SCCM_SERVER: str = ""
    SCCM_USERNAME: str = ""
    SCCM_PASSWORD: str = ""
    
    class Config:
        env_file = ".env"


settings = Settings()