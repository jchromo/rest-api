FROM node:12-alpine as base

FROM base as builder

MAINTAINER Joe Chromo

RUN apk add --update --no-cache \
    python \
    make \
    g++ \
    git \
    bash

WORKDIR /workspace

COPY .npmrc /workspace/.npmrc
COPY src /workspace/src
COPY package.json /workspace/package.json

RUN npm install --production

FROM base
MAINTAINER Joe Chromo

WORKDIR /home/node

COPY --from=builder /workspace/src /home/node/src
COPY --from=builder /workspace/node_modules /home/node/node_modules
COPY --from=builder /workspace/package.json /home/node/package.json
COPY --from=builder /workspace/package-lock.json /home/node/package-lock.json

# Application port
EXPOSE 8080

# gRPC port
EXPOSE 50051

# Admin port (e.g., for probes and metrics)
EXPOSE 8081

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US
ENV LC_ALL en_US.UTF-8

# build arguments passed in by Skaffold to paramterize the Docker build
ARG START_SCRIPT
ARG DOCKER_USER

# use the username from the build argument
USER ${DOCKER_USER}

# START_SCRIPT build argument will be set as env variable to be available at runtime
ENV START_SCRIPT ${START_SCRIPT}
CMD npm run ${START_SCRIPT}
