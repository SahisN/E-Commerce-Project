# -------- Build stage
FROM node:22-alpine AS build

WORKDIR /app

RUN apk add --no-cache python3 make g++ libc-dev

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# --------------

# ------ server stage
FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/dist ./

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", ".", "-l", "3000"]