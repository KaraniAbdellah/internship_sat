FROM python:3.12-slim

WORKDIR /app/

COPY * /app/

# --no-cache-dir: for not caching the dependencies in the docker image, which will reduce the size of the image
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host=0.0.0.0", "--port=8080"]
