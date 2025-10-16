from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from typing import List, Optional, Dict, Any
from datetime import datetime

from app.models.alert import Alert, AlertSeverity, AlertStatus
from app.schemas.alert import AlertCreate, AlertUpdate


class AlertService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_alerts(
        self,
        skip: int = 0,
        limit: int = 100,
        severity: Optional[AlertSeverity] = None,
        status: Optional[AlertStatus] = None
    ) -> List[Alert]:
        """Get alerts with optional filtering"""
        query = select(Alert)
        
        conditions = []
        if severity:
            conditions.append(Alert.severity == severity)
        if status:
            conditions.append(Alert.status == status)
        
        if conditions:
            query = query.where(and_(*conditions))
        
        query = query.offset(skip).limit(limit).order_by(Alert.created_at.desc())
        
        result = await self.db.execute(query)
        return result.scalars().all()

    async def get_alert(self, alert_id: int) -> Optional[Alert]:
        """Get a specific alert by ID"""
        result = await self.db.execute(select(Alert).where(Alert.id == alert_id))
        return result.scalar_one_or_none()

    async def create_alert(self, alert_data: AlertCreate, ai_analysis: Dict[str, Any]) -> Alert:
        """Create a new alert with AI analysis"""
        alert = Alert(
            **alert_data.dict(),
            ai_priority_score=ai_analysis.get("priority_score", 0),
            ai_classification=ai_analysis.get("classification")
        )
        
        self.db.add(alert)
        await self.db.commit()
        await self.db.refresh(alert)
        return alert

    async def update_alert(self, alert_id: int, alert_update: AlertUpdate) -> Optional[Alert]:
        """Update an existing alert"""
        alert = await self.get_alert(alert_id)
        if not alert:
            return None
        
        update_data = alert_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(alert, field, value)
        
        alert.updated_at = datetime.utcnow()
        await self.db.commit()
        await self.db.refresh(alert)
        return alert

    async def resolve_alert(self, alert_id: int) -> Optional[Alert]:
        """Mark an alert as resolved"""
        alert = await self.get_alert(alert_id)
        if not alert:
            return None
        
        alert.status = AlertStatus.RESOLVED
        alert.resolved_at = datetime.utcnow()
        alert.updated_at = datetime.utcnow()
        
        await self.db.commit()
        await self.db.refresh(alert)
        return alert

    async def get_analytics_summary(self) -> Dict[str, Any]:
        """Get alert analytics summary"""
        # Total alerts
        total_result = await self.db.execute(select(func.count(Alert.id)))
        total_alerts = total_result.scalar()
        
        # Alerts by status
        status_result = await self.db.execute(
            select(Alert.status, func.count(Alert.id))
            .group_by(Alert.status)
        )
        alerts_by_status = {status: count for status, count in status_result.all()}
        
        # Alerts by severity
        severity_result = await self.db.execute(
            select(Alert.severity, func.count(Alert.id))
            .group_by(Alert.severity)
        )
        alerts_by_severity = {severity: count for severity, count in severity_result.all()}
        
        return {
            "total_alerts": total_alerts,
            "alerts_by_status": alerts_by_status,
            "alerts_by_severity": alerts_by_severity
        }