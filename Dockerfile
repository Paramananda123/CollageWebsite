# Use official Node + Python base image
FROM node:18-bullseye

# Install Python
RUN apt update && apt install -y python3 python3-pip

# Set working directory
WORKDIR /app

# Copy your files
COPY . .

# Install Node.js dependencies
RUN npm install

# Expose your app port
EXPOSE 10000

# Start the server
CMD ["npm", "start"]
