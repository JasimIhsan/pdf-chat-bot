from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings
from app.core.logging import logger
from app.services.vector_service import vector_service

# Run one-time initialization during application startup
try:
	logger.info("Initializing vector service...")
	vector_service.initialize()
	logger.info(f"{settings.PROJECT_NAME} initialized.")
except Exception as e:
	logger.exception("Failed to initialize vector service on startup:")

app = FastAPI(
	title=settings.PROJECT_NAME,
	description="Production-grade RAG PDF Chatbot Backend API with Google Gemini and Pinecone",
	version=settings.VERSION,
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
	logger.exception(f"Unhandled exception on {request.method} {request.url}:")
	return JSONResponse(
		status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
		content={"detail": "An internal server error occurred.", "error": str(exc)},
	)

# CORS Configuration
if settings.is_production:
	# Production: strictly allow configured explicit origins
	app.add_middleware(
		CORSMiddleware,
		allow_origins=settings.CORS_ORIGINS,
		allow_credentials=True,
		allow_methods=["*"],
		allow_headers=["*"],
	)
else:
	# Development: allow localhost ports and development origins
	app.add_middleware(
		CORSMiddleware,
		allow_origins=settings.CORS_ORIGINS,
		allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
		allow_credentials=True,
		allow_methods=["*"],
		allow_headers=["*"],
	)

# Register API Routers
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
	return {
		"service": settings.PROJECT_NAME,
		"version": settings.VERSION,
		"docs_url": "/docs",
		"api_v1": settings.API_V1_STR,
	}