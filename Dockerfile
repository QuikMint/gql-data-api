FROM node:14.19.3-alpine as dependencies

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package-lock.json ./src/

RUN npm i

COPY ./src .

FROM dependencies as build

RUN npm run build

FROM build as run

EXPOSE 3000

CMD ["node", "lib/index.js"]