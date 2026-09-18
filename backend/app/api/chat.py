from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.models.chat import ChatPayload
from app.services.chat_service import chat_service

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post("/")
async def chat_with_pdf(payload: ChatPayload):
   return StreamingResponse(
      chat_service.stream_rag_chat(doc_id=payload.doc_id, question=payload.question),
      media_type="text/plain",
   )
