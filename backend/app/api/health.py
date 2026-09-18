from app.core.config import settings
from app.models.common import HealthResponse
from fastapi import APIRouter

router = APIRouter();

@router.get("/health", tags=["Health"])
def check_health():
	return HealthResponse(
			status="UP",
			service=settings.PROJECT_NAME,
			version=settings.VERSION,
		)