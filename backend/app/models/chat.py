from pydantic import BaseModel, Field

class ChatPayload(BaseModel):
	doc_id: str = Field(..., description="Document identifier to scope retrieval")
	question: str = Field(..., min_length=3, description="Question asked by the user")

