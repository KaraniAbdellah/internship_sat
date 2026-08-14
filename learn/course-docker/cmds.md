# Docker & Linux Commands

## Docker Commands

**Start Docker**
```text
sudo systemctl start docker
```

**Check Docker Status**
```text
sudo systemctl status docker
```

**Build an Image**
```text
docker build --tag hello-world:v0 .
```
> `.` is the directory where the `Dockerfile` exists.

**List Images**
```text
docker image ls
```

**Run an Image**
```text
docker run hello-world
```

**Pull an Image**
```text
docker pull image-name
```
> the image will be pull from docker HUB


**Login to Docker**
```text
docker login -u USERNAME -p PASSWORD
```

**Stop a Container**
```text
docker stop container-id
```

**Delete a Container**
```text
docker rm container-name
```

**Delete an Image**
```text
docker rmi image-id -f
```

**Delete a Container and Image**
```text
docker rm container-name && docker rmi image-id -f
```

**List All Containers**
```text
docker ps -a
```

**List Running Containers**
```text
docker ps
```

**Run a Container in Interactive Mode**
```text
docker run -it ubuntu /bin/sh
```

**Run Docker with Port**
```text
docker run -p 8000:8000 docker-image-name
```

> `-p HOST_PORT:CONTAINER_PORT`

**Run Docker with a Specific Host**
```text
docker run -p 8000:8000 -h 127.0.0.1 solar:v0
```

**Tag an Image for Azure**
```text
docker tag image-name mccdockerfastapi42.azurecr.io/docker-image
```

**Push Image to Azure**
```text
docker push mccdockerfastapi42.azurecr.io/mcc-backend:v0
```

---

## Docker Notes

- Dockerfile → Image → Container.

---

# Linux Commands

**Basic Commands**
```bash
find . -name "*.py" # Find Python Files
grep "hello" names.txt # Search Text in a File
history # get history
uname # Linux OS
free # Memory Usage
nslookup # get info about domain name
ssh-keygen -t rsa 
```


