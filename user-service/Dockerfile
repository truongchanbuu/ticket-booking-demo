# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install

# Stage 2: Run
FROM node:20-alpine AS run
WORKDIR /app
COPY --from=builder /app .
RUN npm install
CMD ["npm", "start"]
