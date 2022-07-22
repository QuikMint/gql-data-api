FROM node:14.19.3-alpine as builder
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm config set unsafe-perm true
RUN npm install -g typescript
USER node
RUN npm install
COPY --chown=node:node . .
RUN npm run build

FROM node:14.19.3-alpine as runner
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm install --production
COPY --from=builder /home/node/app/lib ./lib

ENV NODE_ENV=production
ENV MONGODB_URI=mongodb://localhost:27017/test

EXPOSE 3000
CMD ["node", "lib/index.js"]