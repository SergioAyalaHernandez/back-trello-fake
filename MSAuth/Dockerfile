# Use an official Node.js runtime as a parent image
FROM node:18

# Create and set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy all source code to the working directory
COPY . .

# Expose the port on which your Node.js app runs (e.g., 8080)

ENV PORT=${PORT:-8081}

EXPOSE ${PORT}

# Define the command to run your application
CMD ["node", "index.js"]