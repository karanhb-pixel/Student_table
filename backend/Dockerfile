# Dockerfile for Backend (Express/Node.js)

# Use a Node.js image for the backend
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend application code
COPY . .

# Expose the backend port (e.g., 5000)
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
