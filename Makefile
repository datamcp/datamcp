# Makefile for DataMCP project

# Variables
IMAGE_TAG := latest
IMAGE_NAME := erezalster/datamcp

.PHONY: help start start-dev build docker-build docker-run docker-stop clean

# Default target
help:
	@echo "Available targets:"
	@echo "  start        - Start the application in production mode"
	@echo "  start-dev    - Start the application in development mode"
	@echo "  build        - Build the TypeScript application"
	@echo "  docker-build - Build the Docker image"
	@echo "  docker-run   - Run the Docker container"
	@echo "  docker-stop  - Stop the Docker container"
	@echo "  clean        - Clean build artifacts"

# Start application in production mode
start: build
	npm start

# Start application in development mode
start-dev:
	npm run dev

# Build TypeScript application
build:
	npm run build

# Build Docker image
docker-build:
	docker build -t $(IMAGE_NAME):$(IMAGE_TAG) .

docker-push:
	docker push $(IMAGE_NAME):$(IMAGE_TAG)

docker-all: docker-build docker-push

# Run Docker container
docker-run:
	docker run -d --name $(IMAGE_NAME) -p 3000:3000 $(IMAGE_NAME):$(IMAGE_TAG)

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
	rm -rf node_modules/