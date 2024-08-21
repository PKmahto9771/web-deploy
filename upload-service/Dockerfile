# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Install Git using Alpine's package manager (apk)
RUN apk update && apk add git

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./
#COPY tsconfig.json ./

# Install dependencies, including TypeScript
RUN npm install

# Copy the rest of the backend application code to the container
COPY . .

# Compile TypeScript files to JavaScript
RUN npm run build

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the compiled JavaScript server
CMD ["node", "dist/index.js"]
