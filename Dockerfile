# Stage 1: Build the application
FROM node:18 AS builder
# Changed base image

# Set working directory
WORKDIR /app

# Install specific pnpm version
RUN npm install -g pnpm@10.6.5

# Copy dependency definitions
COPY package.json pnpm-lock.yaml ./

# Clear pnpm cache and install dependencies
RUN pnpm store prune
RUN pnpm install

# ----> DIAGNOSTIC STEP <----
# Check if next executable directory exists after install
RUN ls -la /app/node_modules/next/dist/bin/ || echo "next/dist/bin directory NOT FOUND after install"

# Copy application code
COPY . .

# Build the Next.js application
RUN pnpm build

# Stage 2: Production image
FROM node:18
# Changed base image

WORKDIR /app

# Install specific pnpm version for running the start command
RUN npm install -g pnpm@10.6.5

# Copy necessary files from the builder stage
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose the port the app runs on (default for Next.js is 3000)
EXPOSE 3000

# Set environment variable for Node.js
ENV NODE_ENV production

# Command to run the application
CMD ["pnpm", "start"]
