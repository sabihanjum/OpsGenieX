from sqlalchemy import Column, Integer, String, DateTime, Text, Enum, Boolean, JSON
from sqlalchemy.sql import func
import enum

from app.core.database import Base


class PatchStatus(str, enum.Enum):
    PENDING = "pending"
    SCHEDULED = "scheduled"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"
    ROLLED_BACK = "rolled_back"


class PatchSeverity(str, enum.Enum):
    CRITICAL = "critical"
    IMPORTANT = "important"
    MODERATE = "moderate"
    LOW = "low"


class Patch(Base):
    __tablename__ = "patches"

    id = Column(Integer, primary_key=True, index=True)
    patch_id = Column(String(100), unique=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    severity = Column(Enum(PatchSeverity), default=PatchSeverity.MODERATE)
    status = Column(Enum(PatchStatus), default=PatchStatus.PENDING)
    vendor = Column(String(100))
    product = Column(String(100))
    version = Column(String(50))
    kb_article = Column(String(100))
    download_url = Column(String(500))
    file_size = Column(Integer)
    prerequisites = Column(JSON)
    target_systems = Column(JSON)
    deployment_schedule = Column(DateTime(timezone=True))
    auto_approved = Column(Boolean, default=False)
    requires_reboot = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    deployed_at = Column(DateTime(timezone=True))