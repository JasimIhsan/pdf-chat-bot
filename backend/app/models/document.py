from pydantic import BaseModel, Field

class DocumentUploadResponse(BaseModel):
	status: str = "success"
	doc_id: str = Field(..., description="Unique document identifier")
	filename: str = Field(..., description="Original filename")
	total_pages: int = Field(..., description="Total pages parsed")
	total_chunks: int = Field(..., description="Total chucks indexed into vector store")
	file_size_bytes: int = Field(..., description="File size in bytes")
	character_count: int = Field(..., description="Total characters extracted from PDF")