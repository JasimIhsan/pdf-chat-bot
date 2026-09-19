from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
	PROJECT_NAME: str = "PDF Chat API"
	VERSION: str = "1.0.0"
	API_V1_STR: str = "/api/v1"

	# API Keys & Cloud Configuration
	GEMINI_API_KEY: str = "mock-gemini-key"
	PINECONE_API_KEY: str = "mock-pinecone-key"
	PINECONE_INDEX_NAME: str = "pdf-chatbot"

	# Models and LLMs
	EMBEDDING_MODEL: str = "models/gemini-embedding-2"
	LLM_MODEL: str = "gemini-3.5-flash-lite"
	LLM_TEMPERATURE: float = 0.2

	# Ingestion Constraint & Chunking
	MAX_FILE_SIZE_MB: int = 10
	CHUNK_SIZE: int = 1000
	CHUNK_OVERLAP: int = 200

	# Environment & Security
	ENVIRONMENT: str = "development"
	IS_MOCK: bool = True  # Set to False to enable real Gemini and Pinecone calls
	CORS_ORIGINS: List[str] = [
		"https://pdfchatbot.jasimihsan.in",
		"http://localhost:3000",
	]

	model_config = SettingsConfigDict(
		env_file=".env", 
		case_sensitive=True, 
		extra="ignore"
	)

	@property
	def is_production(self) -> bool:
		return self.ENVIRONMENT.lower() in ("production", "prod")

	@property
	def max_file_size_bytes(self) -> int:
		return self.MAX_FILE_SIZE_MB * 1024 * 1024

settings = Settings()