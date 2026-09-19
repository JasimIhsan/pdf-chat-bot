from langchain_core.documents import Document
from typing import List, Optional
from fastapi import status
from app.core.logging import logger
from pinecone import Pinecone
from app.core.config import settings
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from fastapi import HTTPException

class VectorService:
	def __init__(self):
		self._vector_store: Optional[PineconeVectorStore]= None

	def initialize(self) -> None:
		if settings.IS_MOCK:
			logger.info("MOCK MODE active: Skipping Pinecone initialization.")
			return

		# Initialize the Pinecone index connection and Gemini embeddings.
		try:
			embedding = GoogleGenerativeAIEmbeddings(
				model=settings.EMBEDDING_MODEL,
				api_key=settings.GEMINI_API_KEY
			)

			pc = Pinecone(api_key=settings.PINECONE_API_KEY)
			index = pc.Index(settings.PINECONE_INDEX_NAME)
			self._vector_store = PineconeVectorStore(
				index=index,
				embedding=embedding
			)
			logger.info(f"Pinecone Vector Store initialized with index: {settings.PINECONE_INDEX_NAME}")

		except Exception as exc:
			logger.exception("Failed to initialize Vector Store:")
			raise HTTPException(
				status_code=status.HTTP_502_BAD_GATEWAY,
				detail=f"Vector Store initialization failed: {str(exc)}"
			)

	@property
	def store(self) -> PineconeVectorStore:
		if self._vector_store is None:
			self.initialize()

		if self._vector_store is None:
			raise HTTPException(
				status_code=status.HTTP_502_BAD_GATEWAY,
				detail="Vector store failed to initialize."
			)
			
		return self._vector_store

	async def add_documents(self, chunks: List[Document]) -> None:
		if settings.IS_MOCK:
			logger.info(f"MOCK MODE active: Skipped upserting {len(chunks)} chunks to Pinecone.")
			return

		try:
			self.store.add_documents(chunks)
			logger.info(f"Successfully upserted {len(chunks)} chunks to Pinecone.")
		except Exception as exc:
			logger.exception("Failed to upsert vectors to Pinecone:")
			raise HTTPException(
				status_code=status.HTTP_502_BAD_GATEWAY,
				detail=f"Failed to upsert vectors: {str(exc)}"
			)

	def get_retriever(self, doc_id: str, k: int = 4):
		return self.store.as_retriever(
			search_kwargs={
				"filter": {"doc_id": doc_id},
				"k": k
			}
		)

vector_service = VectorService()