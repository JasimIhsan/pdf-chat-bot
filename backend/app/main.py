from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.health import router as health_router
from app.api.documents import router as document_router
from app.api.chat import router as chat_router

app = FastAPI(
	title="PDF Chatbot API",
	description="PDF Chatbot API",
	version="1.0.0"
)

# Enable CORS for local frontend development
app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

# Register routes
app.include_router(health_router)
app.include_router(document_router)
app.include_router(chat_router)
app.include_router(chat_router, prefix="/documents")

@app.get("/")
def root():
	return {"message": "Welcome to PDF Chatbot Backend."}
