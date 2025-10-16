from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_workflows():
    """Get all workflows"""
    return {"message": "Workflows endpoint - coming soon"}


@router.post("/")
async def create_workflow():
    """Create a new workflow"""
    return {"message": "Creating workflow"}