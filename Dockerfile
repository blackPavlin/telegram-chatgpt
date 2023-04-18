FROM node:19-alpine as build

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY src /app/src

RUN npm ci
RUN npm run build

FROM node:19-alpine

WORKDIR /app

COPY package*.json ./
COPY --from=build /app/build /app/build
COPY config /app/config

RUN npm ci --omit=dev

CMD ["node", "build/main.js"]
