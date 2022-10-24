# syntax=docker/dockerfile:1
FROM node:14-alpine
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --production
COPY . .
CMD ["yarn", "start"]
EXPOSE 3001