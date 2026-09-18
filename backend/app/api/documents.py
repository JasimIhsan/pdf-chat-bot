from fastapi import APIRouter, File, UploadFile
from app.models.document import DocumentUploadResponse
from app.services.document_service import document_service
from app.services.vector_service import vector_service

router = APIRouter(prefix="/documents", tags=["Documents"])


@router.post("/upload", response_model=DocumentUploadResponse)
async def upload_document(file: UploadFile = File(...)):
	# 1. Read & Validate file
	contents = await document_service.validate_and_read(file)

	# 2. Extract text & create chunk documents
	doc_id, chunks, total_pages, char_count = await document_service.process_pdf(
		pdf_bytes=contents,
		filename=file.filename or "uploaded_document.pdf"
	)

	# 3. Embed and upsert chunks into Pinecone
	await vector_service.add_documents(chunks)

	return DocumentUploadResponse(
		status="success",
		doc_id=doc_id,
		filename=file.filename or "uploaded_document.pdf",
		total_pages=total_pages,
		total_chunks=len(chunks),
		file_size_bytes=len(contents),
		character_count=char_count,
	)
