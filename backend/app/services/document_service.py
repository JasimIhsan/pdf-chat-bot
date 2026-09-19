import io
import uuid
from fastapi import UploadFile, HTTPException, status
from fastapi.concurrency import run_in_threadpool
from pypdf import PdfReader
from typing import Tuple, List
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document

from app.core.config import settings
from app.core.logging import logger

class DocumentService:
	def __init__(self):
		self.text_splitter = RecursiveCharacterTextSplitter(
			chunk_size=settings.CHUNK_SIZE,
			chunk_overlap=settings.CHUNK_OVERLAP,
			separators=["\n\n", "\n", " ", ""],
		)

	@staticmethod
	def _extract_text_and_pages_sync(pdf_bytes: bytes) -> Tuple[str, int]:
		try:
			pdf_streams = io.BytesIO(pdf_bytes)
			reader = PdfReader(pdf_streams)
			extracted_text = ""

			for idx, page in enumerate(reader.pages):
				page_text = page.extract_text() or ""
				extracted_text += f"\n--- Page {idx + 1} ----\n{page_text}"
			
			return extracted_text, len(reader.pages)
		except Exception as exc:
			logger.exception(f"Failed to process PDF file:")
			raise HTTPException(
				status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
				detail=f"Could not process the PDF file. It might be corrupted: {str(exc)}"
			)

	async def validate_and_read(self, file: UploadFile) -> bytes:
		if not file.filename or not file.filename.lower().endswith(".pdf") or file.content_type != "application/pdf":
			raise HTTPException(
				status_code=status.HTTP_400_BAD_REQUEST,
				detail="Only PDF files (.pdf) are supported",
			)

		contents = await file.read()
		if len(contents) > settings.max_file_size_bytes:
			raise HTTPException(
				status_code=status.HTTP_413_CONTENT_TOO_LARGE,
				detail=f"File exceeds the {settings.MAX_FILE_SIZE_MB}MB size limit."
			)

		return contents

	async def process_pdf(self, pdf_bytes: bytes, filename: str) -> Tuple[str, List[Document], int, int]:
		if settings.IS_MOCK:
			doc_id = str(uuid.uuid4())
			mock_text = f"Mock document content for {filename}. Key revenue growth was 28% YoY driven by enterprise cloud services."
			
			mock_chunks = [
				Document(
					page_content=mock_text,
					metadata={"doc_id": doc_id, "filename": filename, "page": 1}
				)
			]
			
			total_pages = 3
			total_chars = len(mock_text)
			
			logger.info(f"[TEMPORARY MOCK] Returned mock PDF processing result for '{filename}' (doc_id: {doc_id}).")
			return doc_id, mock_chunks, total_pages, total_chars

		# Real processing when MOCK_MODE = False
		extracted_text, total_pages = await run_in_threadpool(
			self._extract_text_and_pages_sync, pdf_bytes
		)

		doc_id = str(uuid.uuid4())

		chunks = self.text_splitter.create_documents(
			texts=[extracted_text],
			metadatas=[{
				"doc_id": doc_id,
				"filename": filename
			}]
		)

		logger.info(f"Processed PDF '{filename}' (doc_id: {doc_id}): {total_pages} pages, {len(chunks)} chunks.")

		return doc_id, chunks, total_pages, len(extracted_text)

document_service = DocumentService()