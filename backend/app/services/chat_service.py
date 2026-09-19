from typing import AsyncIterable
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

from app.core.config import settings
from app.services.vector_service import vector_service
from app.core.logging import logger

class ChatService:
	def __init__(self):
		self.prompt = ChatPromptTemplate([
			("system", "You are an expert AI document assistant. Answer the user's question accurately and concisely using strictly the context provided below from the uploaded PDF document.\n If the information is not contained in the context, state clearly: 'I cannot find that information in the provided document.'\n\nContext:\n{context}"),
			("human", "{question}")
		])

	@staticmethod
	def _format_docs(docs) -> str:
		return "\n\n".join(doc.page_content for doc in docs)

	def _get_llm(self) -> ChatGoogleGenerativeAI:
		return ChatGoogleGenerativeAI(
			model=settings.LLM_MODEL,
			temperature=settings.LLM_TEMPERATURE,
			google_api_key=settings.GEMINI_API_KEY,
			streaming=True
		)

	async def stream_rag_chat(self, doc_id: str, question: str) -> AsyncIterable[str]:
		logger.info(f"Streaming RAG query for doc_id '{doc_id}': '{question[:50]}...'")

		retriever = vector_service.get_retriever(doc_id=doc_id, k=4)
		llm = self._get_llm()

		rag_chain = (
			{"context": retriever | self._format_docs, "question": RunnablePassthrough()}
			| self.prompt
			| llm
			| StrOutputParser()
		)

		try:
			async for chunk in rag_chain.astream(question):
				if chunk:
					yield chunk
		except Exception as exc:
			logger.exception(f"Error streaming RAG response for doc_id '{doc_id}':")
			yield f"\n[Error streaming response: {str(exc)}]"

chat_service = ChatService()