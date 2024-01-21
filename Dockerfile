FROM node:20-alpine3.16


ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
EXPOSE 4000

COPY package.json yarn.lock ./
RUN touch .env

RUN mkdir data
RUN set -x && yarn
RUN apk add --no-cache ffmpeg
COPY . .

CMD [ "yarn", "start:dev" ]