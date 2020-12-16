FROM node:11-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/client

RUN rm -rf node_modules
RUN rm -f package-lock.json
RUN npm install --silent
RUN npm run build

WORKDIR /usr/src/app

RUN rm -rf node_modules
RUN rm -f package-lock.json

RUN npm install --silent

ENV PORT 4001

EXPOSE 4001

CMD ["node", "server.js"]