from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(
    title="OpsGenieX API",
    description="AI-Powered IT Operations Automation Platform",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "OpsGenieX API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "OpsGenieX API"}

@app.get("/api/v1/dashboard/summary")
async def get_dashboard_summary():
    """Get dashboard summary data"""
    return {
        "activeAlerts": 24,
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
            },
            {
                "id": 3,
                "title": "SSL Certificate Expiring Soon",
                "severity": "low",
                "status": "resolved",
                "timestamp": "1 hour ago",
                "source": "Load Balancer"
            }
        ]
    }

@app.get("/api/v1/alerts")
async def get_alerts():
    """Get all alerts"""
    return [
        {
            "id": 1,
            "title": "Database Connection Timeout",
            "description": "Connection to primary database is timing out",
            "severity": "high",
            "status": "open",
            "source_system": "Database Monitor",
            "created_at": "2024-01-15T10:30:00Z"
        },
        {
            "id": 2,
            "title": "High CPU Usage",
            "description": "CPU usage above 90% for 5 minutes",
            "severity": "medium",
            "status": "in_progress",
            "source_system": "System Monitor",
            "created_at": "2024-01-15T10:15:00Z"
        }
    ]

if __name__ == "__main__":
    uvicorn.run(
        "main_simple:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )