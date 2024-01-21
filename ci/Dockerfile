#Production Image
FROM node:20-alpine3.16

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
EXPOSE 4000

COPY package.json yarn.lock ./

RUN touch .env

RUN mkdir data
RUN apk add --no-cache ffmpeg
RUN set -x && yarn --production=true

COPY --from=builder /app/dist/ ./dist

CMD ["yarn", "start:prod"]


