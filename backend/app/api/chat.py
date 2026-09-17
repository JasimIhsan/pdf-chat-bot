import os
from typing import AsyncIterable

from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_google_genai import ChatGoogleGenerativeAI
from pydantic import BaseModel

from app.api.documents import vector_store

# Initialize FastAPI router for chat-related endpoints
router = APIRouter(prefix="/chat", tags=["Chat"])


class ChatPayload(BaseModel):
	doc_id: str
	question: str


def format_docs(docs):
	"""
	Helper function to combine retrieved document chunks into a single formatted string.
	This string is injected into the prompt's {context} variable for the LLM.
	"""
	return "\n\n".join(doc.page_content for doc in docs)


@router.post("/")
async def chat_with_pdf(payload: ChatPayload):
	"""
	Endpoint to perform streaming Retrieval-Augmented Generation (RAG) on a specific PDF.
	
	Workflow:
	1. Retrieves the most relevant text chunks from the vector store for the given document ID.
	2. Constructs a prompt embedding the retrieved context and user question with anti-hallucination instructions.
	3. Configures the Gemini LLM with streaming support.
	4. Builds a LangChain LCEL pipeline to execute retrieval, formatting, prompting, model inference, and output parsing.
	5. Streams the generated answer tokens back to the client in real-time.
	"""

	# -------------------------------------------------------------------------
	# Step 1: Configure Document Retriever
	# Purpose: Query ChromaDB vector store only for chunks belonging to this specific doc_id.
	# - "filter": Ensures isolation between documents so answers are scoped to the right PDF.
	# - "k": 4 retrieves the top 4 most semantically similar text chunks.
	# -------------------------------------------------------------------------
	retriever = vector_store.as_retriever(
		search_kwargs={
			"filter": {"doc_id": payload.doc_id},
			"k": 4  # Retrieve top 4 most relevant chunks
		}
	)

	# -------------------------------------------------------------------------
	# Step 2: Define System and Human Prompt Template
	# Purpose: Instruct the LLM on its role, ground it strictly on the retrieved context,
	# and prevent hallucinations by instructing it to admit when information is missing.
	# -------------------------------------------------------------------------
	prompt = ChatPromptTemplate.from_messages([
		(
			"system",
			"You are a helpful assistant. Use the following context from the uploaded PDF to answer the question. "
			"If the answer cannot be found in the context, say you don't know based on this document.\n\n"
			"Context:\n{context}"
		),
		("human", "{question}")
	])

	# -------------------------------------------------------------------------
	# Step 3: Initialize Google Gemini LLM Instance
	# Purpose: Instantiate the chat model configured for low temperature (more factual/deterministic)
	# and enable token streaming for responsive real-time generation.
	# -------------------------------------------------------------------------
	llm = ChatGoogleGenerativeAI(
		model="gemini-3.5-flash-lite",
		temperature=0.2,
		google_api_key=os.getenv("GEMINI_API_KEY"),
		streaming=True
	)

	# -------------------------------------------------------------------------
	# Step 4: Assemble LangChain Expression Language (LCEL) RAG Chain
	# Purpose: Declare the end-to-end data pipeline:
	# - "context": Passes the user question to the retriever and joins the resulting chunks via `format_docs`.
	# - "question": Passes through the raw user question unchanged.
	# - `| prompt`: Formats the prompt template with context and question.
	# - `| llm`: Sends the structured prompt to Gemini.
	# - `| StrOutputParser()`: Parses the model's message response into clean text string chunks.
	# -------------------------------------------------------------------------
	rag_chain = (
		{"context": retriever | format_docs, "question": RunnablePassthrough()}
		| prompt
		| llm
		| StrOutputParser()
	)

	# -------------------------------------------------------------------------
	# Step 5: Create Async Streaming Generator
	# Purpose: Asynchronously iterate over incoming token chunks produced by the RAG chain
	# so they can be yielded incrementally as they arrive from the LLM.
	# -------------------------------------------------------------------------
	async def stream_generator() -> AsyncIterable[str]:
		async for chunk in rag_chain.astream(payload.question):
			yield chunk

	# -------------------------------------------------------------------------
	# Step 6: Return Streaming HTTP Response
	# Purpose: Sends text chunks via HTTP streaming (Transfer-Encoding: chunked)
	# to the client frontend as plain text.
	# -------------------------------------------------------------------------
	return StreamingResponse(stream_generator(), media_type="text/plain")



