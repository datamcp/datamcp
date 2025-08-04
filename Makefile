# Makefile for DataMCP project

# Variables
IMAGE_TAG := 0.0.2
IMAGE_NAME := erezalster/datamcp
CONTAINER_NAME := datamcp

.PHONY: help start start-dev build build-frontend docker-build docker-run docker-stop clean install

# Default target
help:
	@echo "Available targets:"
	@echo "  install      - Install all dependencies (backend + frontend)"
	@echo "  start        - Start the application in production mode"
	@echo "  start-dev    - Start the application in development mode"
	@echo "  build        - Build the full application (frontend + backend)"
	@echo "  build-frontend - Build only the React frontend"
	@echo "  docker-build - Build the Docker image"
	@echo "  docker-run   - Run the Docker container"
	@echo "  docker-stop  - Stop the Docker container"
	@echo "  clean        - Clean build artifacts"

# Install all dependencies
install:
	npm install
	cd frontend && npm install

# Start application in production mode
start: build
	npm start

start-frontend:
	npm run dev:react

# Start application in development mode
start-dev:
	npm run dev

# Build React frontend
build-frontend:
	cd frontend && npm run build

# Build full application (frontend + backend)  
build: build-frontend
	tsc

# Build Docker image
docker-build:
	docker build -t $(IMAGE_NAME):$(IMAGE_TAG) .

docker-push:
	docker push $(IMAGE_NAME):$(IMAGE_TAG)

docker-all: docker-build docker-push

# Run Docker container
docker-run:
	docker run -d --name $(CONTAINER_NAME) -p 3000:3000 $(IMAGE_NAME):$(IMAGE_TAG)

# Stop Docker container
docker-stop:
	docker stop $(IMAGE_NAME) 2>/dev/null || true
	docker rm $(IMAGE_NAME) 2>/dev/null || true

deploy-api:
	kubectl apply -f k8s
	IMAGE_NAME=$(IMAGE_NAME) IMAGE_TAG=$(IMAGE_TAG) envsubst < k8s/deployment.yaml | kubectl apply -f -

# Clean build artifacts
clean:
	rm -rf dist/
	rm -rf frontend/build/
	rm -rf node_modules/
	rm -rf frontend/node_modules/