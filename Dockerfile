# syntax = docker/dockerfile:1

# Use Bun instead of Node.js
FROM oven/bun:1.2.19 AS base

LABEL fly_launch_runtime="Bun"

# App lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential 

# Copy package files
COPY --link package.json bun.lock ./
COPY --link apps/web/package.json ./apps/web/

# Install dependencies
RUN bun install --frozen-lockfile

# Copy application code
COPY --link . .

# Build application
RUN bun run build

# Remove development dependencies
RUN bun install --production

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Expose the port the app runs on
EXPOSE 4173

# Start the server by default, this can be overwritten at runtime
CMD [ "bun", "run", "--filter", "web", "serve" ]
