# Use official Node.js LTS image as the base
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN yarn build

# Production image
FROM node:18-alpine

WORKDIR /app

# Copy only the built files and production dependencies
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/dist ./dist

# If you use .env files, uncomment the next line
# COPY .env .env

EXPOSE 3000

CMD ["node", "dist/main.js"]