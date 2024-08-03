FROM node:16-alpine3.15 AS base

WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:16-alpine3.15 AS deploy

WORKDIR /app
COPY --from=base /app .
COPY . .
CMD [ "node", "src" ]
