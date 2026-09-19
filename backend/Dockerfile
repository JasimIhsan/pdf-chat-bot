# Production Dockerfile optimized for GCP Cloud Run & Container environments
FROM python:3.12-slim

# Set environment variables for Python performance & unbuffered logging
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PORT=8080

WORKDIR /backend

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source code
COPY app/ ./app/

# Expose default GCP Cloud Run port
EXPOSE 8080

# Launch Uvicorn server tuned for GCP Cloud Run
CMD ["sh", "-c", "exec uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8080} --workers 2"]
