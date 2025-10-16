from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from datetime import datetime

from app.core.database import get_db
from app.models.alert import Alert, AlertSeverity, AlertStatus
from app.schemas.alert import AlertCreate, AlertUpdate, AlertResponse
from app.services.alert_service import AlertService
from app.services.ai_service import AIService

router = APIRouter()


@router.get("/", response_model=List[AlertResponse])
async def get_alerts(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    severity: Optional[AlertSeverity] = None,
    status: Optional[AlertStatus] = None,
    db: AsyncSession = Depends(get_db)
):
    """Get all alerts with optional filtering"""
    alert_service = AlertService(db)
    alerts = await alert_service.get_alerts(
        skip=skip, 
        limit=limit, 
        severity=severity, 
        status=status
    )
    return alerts


@router.post("/", response_model=AlertResponse)
async def create_alert(
    alert: AlertCreate,
    db: AsyncSession = Depends(get_db)
):
    """Create a new alert"""
    alert_service = AlertService(db)
    ai_service = AIService()
    
    # AI-powered alert classification and prioritization
    ai_analysis = await ai_service.analyze_alert(alert.title, alert.description)
    
    new_alert = await alert_service.create_alert(alert, ai_analysis)
    return new_alert


@router.get("/{alert_id}", response_model=AlertResponse)
async def get_alert(alert_id: int, db: AsyncSession = Depends(get_db)):
    """Get a specific alert by ID"""
    alert_service = AlertService(db)
    alert = await alert_service.get_alert(alert_id)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return alert


@router.put("/{alert_id}", response_model=AlertResponse)
async def update_alert(
    alert_id: int,
    alert_update: AlertUpdate,
    db: AsyncSession = Depends(get_db)
):
    """Update an existing alert"""
    alert_service = AlertService(db)
    updated_alert = await alert_service.update_alert(alert_id, alert_update)
    if not updated_alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return updated_alert


@router.post("/{alert_id}/resolve")
async def resolve_alert(alert_id: int, db: AsyncSession = Depends(get_db)):
    """Mark an alert as resolved"""
    alert_service = AlertService(db)
    resolved_alert = await alert_service.resolve_alert(alert_id)
    if not resolved_alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return {"message": "Alert resolved successfully"}


@router.get("/analytics/summary")
async def get_alert_analytics(db: AsyncSession = Depends(get_db)):
    """Get alert analytics summary"""
    alert_service = AlertService(db)
    analytics = await alert_service.get_analytics_summary()
    return analytics