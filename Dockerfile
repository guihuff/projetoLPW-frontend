FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn

EXPOSE 3000