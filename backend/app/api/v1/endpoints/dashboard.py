from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Dict, Any

from app.core.database import get_db
from app.services.alert_service import AlertService

router = APIRouter()


@router.get("/summary")
async def get_dashboard_summary(db: AsyncSession = Depends(get_db)) -> Dict[str, Any]:
    """Get dashboard summary data"""
    alert_service = AlertService(db)
    
    # Get alert analytics
    alert_analytics = await alert_service.get_analytics_summary()
    
    # Mock data for demonstration
    dashboard_data = {
        "activeAlerts": alert_analytics.get("total_alerts", 0),
        "patchesDeployed": 156,
        "automationRate": 78,
        "mttr": 2.5,
        "alertsChart": [
            {"name": "Mon", "alerts": 12},
            {"name": "Tue", "alerts": 19},
            {"name": "Wed", "alerts": 8},
            {"name": "Thu", "alerts": 15},
            {"name": "Fri", "alerts": 22},
            {"name": "Sat", "alerts": 6},
            {"name": "Sun", "alerts": 9},
        ],
        "patchStatus": [
            {"name": "Deployed", "value": 45, "color": "#10B981"},
            {"name": "Pending", "value": 25, "color": "#F59E0B"},
            {"name": "Failed", "value": 8, "color": "#EF4444"},
            {"name": "Scheduled", "value": 22, "color": "#3B82F6"},
        ],
        "recentAlerts": [
            {
                "id": 1,
                "title": "Database Connection Timeout",
                "severity": "high",
                "status": "open",
                "timestamp": "2 minutes ago",
                "source": "Production DB"
            },
            {
                "id": 2,
                "title": "High CPU Usage on Web Server",
                "severity": "medium",
                "status": "in_progress",
                "timestamp": "15 minutes ago",
                "source": "Web-01"
            }
        ]
    }
    
    return dashboard_data