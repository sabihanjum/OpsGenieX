from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_integrations():
    """Get all integrations"""
    return {"message": "Integrations endpoint - coming soon"}