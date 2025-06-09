# Use official Node.js image with Debian (includes Python install support)
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and install Node.js dependencies
COPY package*.json ./
RUN npm install

# Copy Python requirements and install Python 3 + pip
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    apt-get clean

# Copy and install Python libraries
COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the rest of the app (Node.js + Python scripts)
COPY . .

# Expose the port your Node.js app runs on (usually 3000)
EXPOSE 3000

# Start the Node.js server
CMD [ "node", "server.js" ]
