from fastapi import APIRouter

from app.api.v1.endpoints import alerts, patches, workflows, dashboard, integrations

api_router = APIRouter()

api_router.include_router(alerts.router, prefix="/alerts", tags=["alerts"])
api_router.include_router(patches.router, prefix="/patches", tags=["patches"])
api_router.include_router(workflows.router, prefix="/workflows", tags=["workflows"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(integrations.router, prefix="/integrations", tags=["integrations"])