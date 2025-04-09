# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Run
FROM node:20-alpine AS run
WORKDIR /app
COPY --from=builder /app .

EXPOSE 3000

ENTRYPOINT ["npm", "run", "dev"]