# Base image
FROM node:18-alpine

WORKDIR /app

# Install dependencies (including ts-node for production use in this specific setup)
# Note: For optimized builds, we'd compile TS to JS, but for this hackathon speed setup, running ts-node is fine.
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source
COPY . .

# Build Next.js (required for the frontend assets)
# The server will ignore the built server and use custom 'server.ts' via ts-node,
# but Next needs '.next' folder for pages.
RUN npm run build

# Expose Port
EXPOSE 3000

# Set Env
ENV NODE_ENV=production
ENV PORT=3000

# Start Command
# We use the 'start' script from package.json which runs: ts-node server.ts
CMD ["npm", "start"]
