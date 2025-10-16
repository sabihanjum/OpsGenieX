from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from app.models.alert import AlertSeverity, AlertStatus


class AlertBase(BaseModel):
    title: str
    description: Optional[str] = None
    severity: AlertSeverity = AlertSeverity.MEDIUM
    source_system: Optional[str] = None
    source_id: Optional[str] = None


class AlertCreate(AlertBase):
    pass


class AlertUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    severity: Optional[AlertSeverity] = None
    status: Optional[AlertStatus] = None
    assigned_to: Optional[str] = None


class AlertResponse(AlertBase):
    id: int
    status: AlertStatus
    assigned_to: Optional[str] = None
    ai_priority_score: int
    ai_classification: Optional[str] = None
    auto_resolved: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    resolved_at: Optional[datetime] = None

    class Config:
        from_attributes = True