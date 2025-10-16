from sqlalchemy import Column, Integer, String, DateTime, Text, Enum, Boolean
from sqlalchemy.sql import func
import enum

from app.core.database import Base


class AlertSeverity(str, enum.Enum):
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class AlertStatus(str, enum.Enum):
    OPEN = "open"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"
    CLOSED = "closed"


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    severity = Column(Enum(AlertSeverity), default=AlertSeverity.MEDIUM)
    status = Column(Enum(AlertStatus), default=AlertStatus.OPEN)
    source_system = Column(String(100))
    source_id = Column(String(100))
    assigned_to = Column(String(100))
    ai_priority_score = Column(Integer, default=0)
    ai_classification = Column(String(100))
    auto_resolved = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    resolved_at = Column(DateTime(timezone=True))