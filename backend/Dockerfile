FROM node:9 as builder

ARG APP_DIR=/srv/howyoucanhelpus
WORKDIR ${APP_DIR}

ADD package*json ${APP_DIR}/

RUN npm install

# Doing a multi-stage build to reset some stuff for a smaller image
FROM node:9-alpine

ARG APP_DIR=/srv/howyoucanhelpus
WORKDIR ${APP_DIR}

COPY --from=builder ${APP_DIR} .

COPY src ${APP_DIR}/src
COPY config ${APP_DIR}/config
COPY public ${APP_DIR}/public

EXPOSE 3030

CMD npm run start
