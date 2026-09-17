import io, uuid, os
from dotenv import load_dotenv
from fastapi import APIRouter, File, HTTPException, UploadFile, status
from pypdf import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone

load_dotenv()

router = APIRouter(prefix="/documents", tags=["Documents"])

# 10 MB size limit
MAX_FILE_SIZE = 10 * 1024 * 1024

# --- 1. Google Gemini Embeddings Model ---
# Embeddings convert raw text into a list of 768 floating-point numbers (vectors)
# that represent the semantic meaning of the text for similarity searches.
embeddings = GoogleGenerativeAIEmbeddings(
	# The specific embedding model from Google Gemini (outputs 768-dimension vectors)
	model="models/gemini-embedding-2",
	# Authenticate with Google AI using the secret key loaded from your .env file
	api_key=os.getenv("GEMINI_API_KEY")
)

# --- 2. Pinecone Vector Database Connection ---
# Initialize the official Pinecone client with your account API key from .env
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

# Connect to the target Pinecone index (the database "collection/table" holding vectors).
# Uses the environment variable PINECONE_INDEX_NAME, defaulting to "pdf_chatbot" if not set.
index = pc.Index(os.getenv("PINECONE_INDEX_NAME", "pdf-chatbot"))

# --- 3. LangChain Vector Store Wrapper ---
# Combines your Pinecone index and Gemini embedding model into a unified LangChain store.
# This automatically handles embedding generation when saving documents or querying for similar text.
vector_store = PineconeVectorStore(index=index, embedding=embeddings)

@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
	# 1. Validate file extension and MIME type
	if not file.filename or not file.filename.lower().endswith(".pdf") or file.content_type != "application/pdf":
		raise HTTPException(
			status_code = status.HTTP_400_BAD_REQUEST,
			detail = "Only PDF files are supported.",
		)

	# 2. Read contents into memory
	contents = await file.read();
	
	if len(contents) > MAX_FILE_SIZE:
		raise HTTPException(
			status_code = status.HTTP_413_CONTENT_TOO_LARGE,
			detail = "File size exceeds the 10 MB limit."
		)

	# 3. Parse and extract text using pypdf
	try:
		pdf_stream = io.BytesIO(contents)
		reader = PdfReader(pdf_stream)
		extracted_text = ""

		for idx, page in enumerate(reader.pages):
			page_text = page.extract_text() or ""
			extracted_text += f"\n-- Page {idx + 1} ---\n" + page_text
		
		# print(f"👉 extracted_text: {extracted_text}")
	except Exception as exc:
		raise HTTPException(
			status_code = status.HTTP_422_UNPROCESSABLE_CONTENT,
			detail = f"Could not process the PDF file. It might be corrupted: {str(exc)}"
		)
	finally:
		await file.close()
	
	# 4. Convert that single huge string into smaller, overlapping chunks
	text_splitter = RecursiveCharacterTextSplitter(
		chunk_size=1000, # ~200-250 words per chuck
		chunk_overlap=200, # 200 charecters overlap with previous chunck
		separators=["\n\n", "\n", " ", ""] # Split by paragraphs first, then sentences, then words
	)

	# Suppose `extracted_text` is your raw string from the PDF
	# doc_id should be a unique ID for this PDF (e.g. str(uuid.uuid4()))
	doc_id = str(uuid.uuid4())

	# create_documents converts strings into LangChain Document objects with metadata
	chunks = text_splitter.create_documents(
		texts=[extracted_text],
		metadatas=[{
			"doc_id": doc_id,
			"filename": file.filename
		}]
	)

	# 5. Embed and Upsert to Vector Store (Gemini -> Pinecone)
	try:
		res = vector_store.add_documents(chunks)
		print(f"👉 Uploaded {res} vectors to Pinecone.")
	except Exception as exc:
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to index document in vector store: {str(exc)}"
		)


	return {
		"filename": file.filename,
		"total_pages": len(reader.pages),
		"file_size_bytes": len(contents),
		"charecter_count": len(extracted_text),
		}
