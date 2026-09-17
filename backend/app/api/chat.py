import os
from app.api.documents import vector_store
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import AsyncIterable
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

router = APIRouter(prefix="/chat", tags=["Chat"])

class ChatPayload(BaseModel):
	doc_id: str
	question: str

def format_docs(docs):
	return "\n\n".join(doc.page_content for doc in docs)

@router.post("/")
async def chat_with_pdf(payload: ChatPayload):
	# 1. Restrict retrieval strictly to the uploaded doc_id
	retriever = vector_store.as_retriever(
		search_kwargs={
			"filter": {"doc_id": payload.doc_id},
			"k": 4  # Retrive top 4 most relevent chunks
		}
	)

	# 2. System prompt
	prompt = ChatPromptTemplate.from_messages([
		("system", "You are a helpful assistant. Use the following context from the uploaded PDF to answer the question. If the answer cannot be found in the context, say you don't know based on this document.\n\nContext:\n{context}"),
      ("human", "{question}")
	])

	# 3. Gemini LLM instance
	llm = ChatGoogleGenerativeAI(
		model="gemini-3.5-flash-lite",
		temperature=0.2,
		google_api_key=os.getenv("GEMINI_API_KEY"),
		streaming=True
	)

	# 4. LangChain LCEL Chain
	rag_chain = (
		{"context": retriever | format_docs, "question": RunnablePassthrough()}
		| prompt
		| llm
		| StrOutputParser()
	)

	# 5. Async Generator for streaming
	async def stream_generator() -> AsyncIterable[str]:
		async for chunck in rag_chain.astream(payload.question):
			yield chunck

	return StreamingResponse(stream_generator(), media_type="text/plain")


