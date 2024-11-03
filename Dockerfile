# Use Node.js 18 Alpine as the base image for a smaller image size
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies, including dev dependencies
RUN npm install --force

# Copy the entire application code and db directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
