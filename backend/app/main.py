from fastapi import FastAPI
from app.api.health import router as health_router
from app.api.documents import router as document_router
from app.api.chat import router as chat_router

app = FastAPI(
	title="PDF Chatbot API",
	description="PDF Chatbot API",
	version="1.0.0"
)

# Register routes
app.include_router(health_router)
app.include_router(document_router)
app.include_router(chat_router)

@app.get("/")
def root():
	return {"message": "Welcom to PDF Chatbot Backend."}
