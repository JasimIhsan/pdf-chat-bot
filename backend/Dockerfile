# Stage 1: Official AWS Lambda Python 3.12 base image
FROM public.ecr.aws/lambda/python:3.12

# Set pip optimization environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Install dependencies in a separate layer for optimal Docker caching
COPY requirements.txt ${LAMBDA_TASK_ROOT}/
RUN pip install -r ${LAMBDA_TASK_ROOT}/requirements.txt

# Copy application code into Lambda task root
# This preserves the `app` directory structure so imports like `from app.core.config import settings` work seamlessly
COPY app/ ${LAMBDA_TASK_ROOT}/app/

# Set CMD to point directly to the Mangum handler in app/main.py
CMD ["app.main.handler"]
