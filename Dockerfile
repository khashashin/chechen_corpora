# Build client Vite based React app
FROM node:18-alpine AS build

# Set working directory
RUN mkdir -p /app
WORKDIR /app

# Copy package.json
COPY frontend/package*.json ./

# Update npm
RUN npm install -g npm@latest

# Install dependencies
RUN npm install -D --silent

# Copy source code
COPY frontend/ ./

# Build app
RUN npm run build


# Prepare nginx
FROM nginx:1.21.3-alpine

# Copy build files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
