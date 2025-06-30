# Use official Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 4000

# Start the app
CMD ["npm", "start"]