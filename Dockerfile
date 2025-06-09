# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy Node dependencies
COPY package*.json ./
RUN npm install

# Install Python and pip
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    apt-get clean

# Copy and install Python libraries with break-system-packages flag
COPY requirements.txt ./
RUN pip3 install --no-cache-dir --break-system-packages -r requirements.txt

# Copy the rest of the codebase
COPY . .

# Expose port
EXPOSE 3000

# Run the Node.js server
CMD [ "node", "server.js" ]
