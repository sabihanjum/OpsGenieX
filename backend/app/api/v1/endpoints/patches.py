from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_patches():
    """Get all patches"""
    return {"message": "Patches endpoint - coming soon"}


@router.post("/{patch_id}/deploy")
async def deploy_patch(patch_id: int):
    """Deploy a specific patch"""
    return {"message": f"Deploying patch {patch_id}"}