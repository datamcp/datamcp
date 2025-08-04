# Use the official Node.js image as the base image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy backend package.json and package-lock.json
COPY package*.json ./

# Copy frontend package.json
COPY frontend/package*.json frontend/

# Install backend dependencies
RUN npm install 

# Copy the rest of the application code
COPY . .

# Build the React frontend
RUN cd frontend && npm run build

# Build the backend
RUN npm run build

# Start the application
CMD ["npm", "run", "start"]