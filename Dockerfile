#
# -- Base --
FROM node:14-alpine as base

LABEL MAINTAINER="Mateus Grunheidt Lacerda"

RUN mkdir -p /usr/src/scraper-challenge \
    && chown -R node:node /usr/src/scraper-challenge

WORKDIR /usr/src/scraper-challenge

COPY --chown=node:node ./package.json .

#
# -- Only production dependencies --
FROM base AS dependencies

RUN apk update && apk upgrade \
    && apk add --no-cache --virtual build-deps git build-base openssh

USER node

RUN npm install
#
# -- Final image --
FROM base AS release

USER node

COPY --chown=node:node --from=dependencies /usr/src/scraper-challenge/node_modules ./node_modules
COPY --chown=node:node ./ ./

RUN mkdir /tmp/LogDir/ &&  touch /tmp/LogDir/output.log
EXPOSE 3300
CMD npm run app 2>&1 | tee /tmp/LogDir/output.log
