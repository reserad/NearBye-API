FROM node:18.16-alpine as install

WORKDIR /usr/src/app
ENV NODE_ENV=development
ADD package.json yarn.lock /usr/src/app/
RUN yarn

FROM install as development
