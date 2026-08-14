# Any DockerFile Start By Getting RunTimeEnv
FROM node:alpine

# SetUp The Env Variables
ENV MONGODB_API_KEY = admin \
SUPABASE_API_KEY = password

# Execute a Linux Command -- THis Commands Runs Inside Docker Container
RUN echo "Hello World"

# copy files from my machine inside a folder /app 
COPY . /app

# Run Docker in 8000
EXPOSE 8000

# move to app folder
WORKDIR /app

# Execute Entry Point --> Run the Backend App --> docker run docker-image-name
# CMD ["node", "app.js"]

# In FastApI Case
# We 0.0.0.0 not 127.0.0.1 (this address work inside docker container only)
# But 0.0.0.0 is machine interface
CMD ["uvicorn", "main:app", "--host=0.0.0.0", "--port=8000"]
